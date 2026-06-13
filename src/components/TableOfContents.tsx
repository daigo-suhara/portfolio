import type { Heading } from "@/lib/extract-headings";
import { TableOfContents as TOCUI } from "@/components/ui/table-of-contents";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  if (headings.length === 0) return null;

  const items = headings.map((h) => ({
    id: h.id,
    label: h.text,
    level: Math.min(Math.max(h.level, 1), 3) as 1 | 2 | 3,
  }));

  return <TOCUI items={items} />;
}
