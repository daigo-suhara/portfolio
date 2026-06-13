import { useState } from "react";
import { House, Sparkles, NotebookPen, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "HOME" },
  { href: "/works", label: "WORKS" },
  { href: "/blog", label: "BLOG" },
];

const icons: Record<string, React.FC<{ className?: string; strokeWidth?: number }>> = {
  "/": House,
  "/works": Sparkles,
  "/blog": NotebookPen,
};

const socialLinks = [
  {
    href: "https://github.com/daigo-suhara",
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
      </svg>
    ),
  },
  {
    href: "https://x.com/daigo_suhara",
    label: "X",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.632 5.905-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

interface MobileNavProps {
  currentPath: string;
}

export function MobileNav({ currentPath }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full"
          aria-label="メニューを開く"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-72 bg-background border-l-2 border-primary/30 p-0"
      >
        <SheetHeader className="px-6 pt-8 pb-4">
          <SheetTitle
            className="text-2xl text-primary"
            style={{ fontFamily: "var(--font-header)" }}
          >
            Daigo Suhara
          </SheetTitle>
          <SheetDescription className="sr-only">
            ナビゲーションメニューを表示します。
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 pb-4">
          <div className="h-px bg-gradient-to-r from-primary/50 via-primary/20 to-transparent rounded-full" />
        </div>

        <nav className="flex flex-col gap-2 px-4">
          {navLinks.map(({ href, label }) => {
            const isActive =
              href === "/" ? currentPath === "/" : currentPath.startsWith(href);
            const Icon = icons[href];
            return (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-lg transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                style={{ fontFamily: "var(--font-header)" }}
              >
                {Icon && (
                  <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                )}
                {label}
                {isActive && (
                  <span className="ml-auto text-primary text-xs">●</span>
                )}
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-primary/50 rounded-full mb-6" />
          <p
            className="text-xs text-muted-foreground mb-3"
            style={{ fontFamily: "var(--font-header)" }}
          >
            Find me on
          </p>
          <div className="flex gap-3">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all duration-200"
              >
                {icon}
                <span
                  className="text-sm"
                  style={{ fontFamily: "var(--font-header)" }}
                >
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
