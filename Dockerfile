# syntax=docker/dockerfile:1.7
# CVKu (Next.js 16) — production image
# Multi-stage: install deps + build -> small runtime

ARG NODE_VERSION=22

# --- 1) deps ---
FROM node:${NODE_VERSION}-bookworm-slim AS deps
WORKDIR /app
# Cache npm install via lockfile
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# --- 2) build ---
FROM node:${NODE_VERSION}-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- 3) runtime ---
FROM node:${NODE_VERSION}-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Non-root user (uid 1001 matches cvku-ops convention)
RUN groupadd -g 1001 cvku && useradd -u 1001 -g cvku -m -s /bin/bash cvku

# Puppeteer runtime deps + Chromium (skip system download, use bundled)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 \
    libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 \
    libgbm1 libgcc-s1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 \
    libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 \
    libxss1 libxtst6 lsb-release wget xdg-utils \
    && rm -rf /var/lib/apt/lists/*

# Skip Puppeteer's Chromium download (use system; install below if needed)
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Install Google Chrome stable for Puppeteer (PDF export)
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub \
    | gpg --dearmor -o /usr/share/keyrings/google-chrome.gpg \
    && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-chrome.gpg] http://dl.google.com/linux/chrome/deb/ stable main" \
       > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Copy built app (Next standalone output, includes .next/static + public)
COPY --from=build --chown=cvku:cvku /app/public ./public
COPY --from=build --chown=cvku:cvku /app/.next ./.next
COPY --from=build --chown=cvku:cvku /app/node_modules ./node_modules
COPY --from=build --chown=cvku:cvku /app/package.json ./package.json
COPY --from=build --chown=cvku:cvku /app/next.config.ts ./next.config.ts

# Puppeteer cache dir (matches .puppeteerrc.cjs -> .chrome)
RUN mkdir -p /app/.chrome && chown -R cvku:cvku /app/.chrome

USER cvku
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD node -e "require('http').get('http://127.0.0.1:3000/',r=>process.exit(r.statusCode<400?0:1)).on('error',()=>process.exit(1))"

CMD ["npm", "run", "start"]
