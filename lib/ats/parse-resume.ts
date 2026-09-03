/**
 * Resume file parser: PDF & DOCX → plain text.
 * Wrapper di pdf-parse & mammoth.
 *
 * Limit: 5MB untuk PDF, 5MB untuk DOCX (biar tidak overwhelm memory).
 */

import mammoth from "mammoth";
// pdf-parse-fixed is CommonJS, use require for interop
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse-fixed");

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export interface ParseResult {
  text: string;
  meta: {
    fileType: "pdf" | "docx";
    fileSize: number;
    pageCount?: number; // PDF only
    parseDurationMs: number;
  };
}

export class ParseError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "ParseError";
  }
}

/**
 * Parse file Buffer ke plain text.
 * Auto-detect file type dari MIME atau nama file.
 */
export async function parseResumeFile(
  buffer: Buffer,
  fileName: string,
  mimeType?: string
): Promise<ParseResult> {
  const start = Date.now();

  if (buffer.length > MAX_FILE_SIZE) {
    throw new ParseError(
      `File terlalu besar (${(buffer.length / 1024 / 1024).toFixed(1)}MB). Maksimal 5MB.`,
      "FILE_TOO_LARGE"
    );
  }

  const lowerName = fileName.toLowerCase();
  const isPdf =
    mimeType === "application/pdf" || lowerName.endsWith(".pdf");
  const isDocx =
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    lowerName.endsWith(".docx") ||
    lowerName.endsWith(".doc");

  if (!isPdf && !isDocx) {
    throw new ParseError(
      "Format file tidak didukung. Upload PDF atau DOCX.",
      "UNSUPPORTED_FORMAT"
    );
  }

  try {
    if (isPdf) {
      const data = await pdfParse(buffer);
      return {
        text: cleanText(data.text),
        meta: {
          fileType: "pdf",
          fileSize: buffer.length,
          pageCount: data.numpages,
          parseDurationMs: Date.now() - start,
        },
      };
    } else {
      // DOCX
      const result = await mammoth.extractRawText({ buffer });
      return {
        text: cleanText(result.value),
        meta: {
          fileType: "docx",
          fileSize: buffer.length,
          parseDurationMs: Date.now() - start,
        },
      };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    throw new ParseError(
      `Gagal membaca file: ${message}. Coba paste CV sebagai teks saja.`,
      "PARSE_FAILED"
    );
  }
}

/**
 * Clean extracted text: remove excessive whitespace, normalize line breaks.
 * Memastikan output konsisten untuk scoring.
 */
function cleanText(text: string): string {
  return text
    // Normalize line breaks
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    // Remove form feed & other control chars
    // eslint-disable-next-line no-control-regex
    .replace(/[\f\v\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    // Collapse 3+ spaces to 1
    .replace(/   +/g, " ")
    // Collapse 3+ newlines to 2
    .replace(/\n\n\n+/g, "\n\n")
    .trim();
}
