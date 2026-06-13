import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Heading } from "@/lib/extract-headings";
import { TableOfContents as TOCUI } from "@/components/ui/table-of-contents";

interface FloatingTOCProps {
  headings: Heading[];
}

export function FloatingTOC({ headings }: FloatingTOCProps) {
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  const items = headings.map((h) => ({
    id: h.id,
    label: h.text,
    level: Math.min(Math.max(h.level, 1), 3) as 1 | 2 | 3,
  }));

  return (
    <div className="fixed top-[5.5rem] right-6 z-40 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            className="h-10 px-4 rounded-full shadow-lg text-sm font-medium"
            aria-label="目次を表示"
          >
            目次
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle className="sr-only">目次</SheetTitle>
            <SheetDescription className="sr-only">
              記事の目次を表示します。
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 overflow-y-auto pb-8 h-[calc(100vh-8rem)]">
            <TOCUI
              items={items}
              className="border-none"
              onItemClick={() => setOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
