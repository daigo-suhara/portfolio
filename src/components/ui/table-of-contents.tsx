"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  label: string;
  level?: 1 | 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
  activeId?: string;
  className?: string;
  onItemClick?: (id: string) => void;
}

export function TableOfContents({
  items,
  title = "目次",
  activeId: externalActiveId,
  className,
  onItemClick,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>(
    externalActiveId ?? items[0]?.id ?? "",
  );

  React.useEffect(() => {
    if (externalActiveId !== undefined) {
      setActiveId(externalActiveId);
      return;
    }

    const headingEls = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const onScroll = () => {
      const offset = 80;
      const scrollY = window.scrollY + offset;
      let currentId = headingEls[0]?.id ?? "";
      for (const el of headingEls) {
        if (el.offsetTop <= scrollY) currentId = el.id;
        else break;
      }
      setActiveId(currentId);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items, externalActiveId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
    onItemClick?.(id);
  };

  return (
    <nav
      className={cn(
        "rounded-2xl border border-border/60 bg-muted/30 p-4",
        className,
      )}
    >
      {title && (
        <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
          <span className="h-px flex-1 bg-primary/30" />
          {title}
          <span className="h-px flex-1 bg-primary/30" />
        </p>
      )}
      <div className="flex flex-col gap-0.5">
        {items.map((item) => {
          const level = item.level ?? 1;
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "group relative rounded-lg px-3 py-1.5 text-sm leading-snug transition-all duration-150",
                level === 2 && "pl-6 text-sm",
                level === 3 && "pl-9 text-xs",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {level >= 2 && (
                <span
                  className={cn(
                    "absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px]",
                    level === 3 && "left-5",
                    isActive ? "text-primary" : "text-border",
                  )}
                >
                  ›
                </span>
              )}
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
