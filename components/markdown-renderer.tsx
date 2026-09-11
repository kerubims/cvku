import React from "react";

export function MarkdownRenderer({ content }: { content: string }) {
  // Simple clean markdown parser for headings, lists, bold, links, and paragraphs
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-4 space-y-2 list-disc list-inside text-zinc-700">
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    // Heading 1
    if (trimmed.startsWith("# ")) {
      flushList();
      elements.push(
        <h1 key={idx} className="mt-8 mb-4 text-3xl font-bold tracking-tight text-zinc-900">
          {trimmed.replace(/^#\s+/, "")}
        </h1>
      );
      return;
    }

    // Heading 2
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={idx} className="mt-8 mb-4 text-2xl font-bold tracking-tight text-zinc-900">
          {trimmed.replace(/^##\s+/, "")}
        </h2>
      );
      return;
    }

    // Heading 3
    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={idx} className="mt-6 mb-3 text-xl font-semibold text-zinc-900">
          {trimmed.replace(/^###\s+/, "")}
        </h3>
      );
      return;
    }

    // List item
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const itemText = trimmed.replace(/^[-*]\s+/, "");
      currentList.push(
        <li key={idx} className="leading-relaxed">
          {itemText}
        </li>
      );
      return;
    }

    // Paragraph
    flushList();
    elements.push(
      <p key={idx} className="my-3 leading-relaxed text-zinc-700 text-base">
        {trimmed}
      </p>
    );
  });

  flushList();

  return <div className="prose prose-zinc max-w-none">{elements}</div>;
}
