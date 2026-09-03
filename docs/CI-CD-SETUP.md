# CI/CD Setup Guide untuk CVKu

## ✅ Workflows Sudah Dibuat

1. **`.github/workflows/ci.yml`** — TSC + lint + build setiap push/PR
2. **`.github/workflows/deploy.yml`** — Auto-deploy ke 192.168.1.89 saat push ke `main`

## 📊 Notifikasi Status

Deploy status muncul di **GitHub Actions UI** (tab Actions di GitHub) + **GitHub Step Summary** (rich markdown di akhir workflow run).

Untuk monitor deploy, Mas Ubim bisa:
- Buka `https://github.com/kerubims/cvku/actions` → lihat workflow run terakhir
- Subscribe ke email notifikasi GitHub: Settings → Notifications → "Send notifications for failed workflows only"

---

## 🛠️ Setup yang Harus Mas Ubim Lakukan

### 1. Dapatkan SSH Known Hosts (1 menit)

Jalankan di laptop lokal:

```bash
ssh-keyscan -H 192.168.1.89
```

Outputnya akan ada 3 baris (ssh-ed25519, ecdsa-sha2, ssh-rsa). **Copy semua**, simpan ke `SERVER_SSH_KNOWN_HOSTS` di GitHub Secrets (1 string multi-line).

### 2. Setup GitHub Secrets (5 menit)

Buka: `https://github.com/kerubims/cvku/settings/secrets/actions`

Klik **"New repository secret"** untuk setiap secret di bawah:

| # | Secret Name | Value | Sumber |
|---|---|---|---|
| 1 | `SERVER_HOST` | `192.168.1.89` | IP server CVKu |
| 2 | `SERVER_USER` | `cvku-ops` | SSH user yang sudah ada |
| 3 | `SERVER_SSH_KEY` | (isi file `~/.ssh/id_ed25519` di laptop Mas Ubim) | Private key SSH cvku-ops |
| 4 | `SERVER_SSH_KNOWN_HOSTS` | (output `ssh-keyscan -H 192.168.1.89`) | Server fingerprint |

**Cara isi `SERVER_SSH_KEY`:**

```bash
# Di laptop
cat ~/.ssh/id_ed25519
# Copy SEMUA output (mulai dari -----BEGIN ... sampai -----END ...)
# Paste ke value secret di GitHub
```

### 3. Setup Server (1-time, ~10 menit)

Jalankan via SSH ke server (sebagai user `roo` atau punya akses root):

```bash
# Login ke server
ssh roo@192.168.1.89

# 1. Buat folder untuk cvku-ops
sudo mkdir -p /home/cvku-ops/cvku
sudo chown cvku-ops:cvku-ops /home/cvku-ops/cvku

# 2. Copy .env dari /home/roo ke /home/cvku-ops
sudo cp /home/roo/Documents/project_joki/cvku/.env /home/cvku-ops/cvku/.env
sudo chown cvku-ops:cvku-ops /home/cvku-ops/cvku/.env
sudo chmod 600 /home/cvku-ops/cvku/.env

# 3. Buat folder backups
sudo mkdir -p /home/cvku-ops/backups
sudo chown cvku-ops:cvku-ops /home/cvku-ops/backups

# 4. Switch ke cvku-ops dan git clone
sudo su - cvku-ops
cd /home/cvku-ops/cvku
git clone https://github.com/kerubims/cvku.git .

# 5. Setup git config untuk cvku-ops
git config user.email "cvku-ops@cvku.ksm.web.id"
git config user.name "CVKu Deploy Bot"

# 6. Test build manual
cd /home/cvku-ops/cvku
sudo /usr/bin/docker compose build web
sudo /usr/bin/docker compose up -d --force-recreate web
sleep 15
curl -fsS http://127.0.0.1:9013/ -o /dev/null && echo "✅ Container OK"

exit
```

**PENTING**: Pastikan `docker compose down` di `/home/roo/...` **TIDAK dijalankan** selama transisi, supaya production tetap hidup.

### 4. Test CI/CD (5 menit)

1. **Push ke branch test**:
   ```bash
   git checkout -b chore/test-ci
   git commit --allow-empty -m "ci: test workflow"
   git push origin chore/test-ci
   ```

2. **Buka GitHub Actions**: `https://github.com/kerubims/cvku/actions`
3. Workflow `CI` harus jalan dan **pass** ✅
4. **Buat PR** ke `main` (bisa langsung merge atau hold)
5. Setelah merge ke `main`, workflow `Deploy` jalan otomatis
6. **Buka https://cvku.ksm.web.id** — pastikan website masih hidup & update

---

## 🔄 Daily Usage

```bash
# Buat fitur/fix
git checkout -b feature/nama-fitur
# ... edit code ...
git add .
git commit -m "feat: ..."
git push origin feature/nama-fitur

# Buat PR di GitHub
# → CI jalan otomatis, kasih status check
# → Review code
# → Merge ke main

# Setelah merge:
# → Deploy jalan otomatis
# → Production update dalam 2-5 menit
```

## 🔙 Manual Rollback

Kalau deploy rusak & perlu rollback cepat:

```bash
# SSH ke server
ssh cvku-ops@192.168.1.89
cd /home/cvku-ops/cvku

# Lihat commit yang sebelumnya deployed
cat /home/cvku-ops/.last-deployed-commit

# Checkout ke commit sebelumnya
git checkout <commit-sha-yang-aman>
sudo /usr/bin/docker compose build web
sudo /usr/bin/docker compose up -d --force-recreate web
```

## 📊 Monitoring

| Yang dimonitor | Tools |
|---|---|
| Workflow status | GitHub Actions tab |
| Deploy summary | Step Summary di setiap run (markdown) |
| Backup files | `/home/cvku-ops/backups/` (30 file terakhir) |
| Container health | `docker ps` di server |
| Production uptime | https://cvku.ksm.web.id (manual check) |

## 🐛 Troubleshooting

| Problem | Solusi |
|---|---|
| CI gagal di `tsc` | Ada type error di code, fix & push lagi |
| CI gagal di `build` | NEXT_PUBLIC_SITE_URL atau env ada yang missing |
| Deploy gagal di SSH | Cek SERVER_SSH_KEY validity |
| Deploy gagal di `git pull` | Pastikan cvku-ops punya write access ke folder |
| Deploy gagal di `docker compose` | Cek apakah cvku-db healthy |
| Health check 000 | Container butuh waktu start, tunggu 1-2 menit |

## 🔐 Security Notes

- `SERVER_SSH_KEY` adalah private key — **JANGAN PERNAH** di-share atau di-commit
- `.env` di server TIDAK boleh masuk git — pastikan `.env` di `.gitignore`
- `KNOWN_HOSTS` untuk mencegah MITM attack — pakai `ssh-keyscan`, bukan `*`
