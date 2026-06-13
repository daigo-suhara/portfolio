export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(markdown: string): Heading[] {
  if (!markdown) return [];

  const lines = markdown.split(/\r?\n/);
  const results: Heading[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    const match = trimmedLine.match(/^(#{1,4})\s*(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].trim();

    if (!text) continue;

    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w぀-ヿ㐀-䶿一-鿿-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (id) {
      results.push({ id, text, level });
    }
  }

  return results;
}
