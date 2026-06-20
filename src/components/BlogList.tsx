import { useState, useMemo } from "react";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import { PostCard } from "@/components/PostCard";
import type { BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

interface BlogListProps {
  posts: BlogPost[];
  allTags: string[];
}

export function BlogList({ posts, allTags }: BlogListProps) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery =
        query === "" ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((t) => post.tags.includes(t));

      return matchesQuery && matchesTags;
    });
  }, [posts, query, selectedTags]);

  const isFiltering = query !== "" || selectedTags.length > 0;

  return (
    <div>
      {/* 検索バー */}
      <div className="relative mb-4">
        <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 pointer-events-none" />
        <input
          type="text"
          placeholder="タイトル・タグで検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-border bg-background text-sm placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            aria-label="検索をクリア"
          >
            <RiCloseLine className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* タグフィルター */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {allTags.map((tag) => {
            const active = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all duration-150",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
              >
                {tag}
              </button>
            );
          })}
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="px-3 py-1 rounded-full text-xs text-muted-foreground/60 hover:text-muted-foreground flex items-center gap-1 transition-colors"
            >
              <RiCloseLine className="h-3 w-3" />
              クリア
            </button>
          )}
        </div>
      )}

      {/* 件数 */}
      <p className="text-xs text-muted-foreground/60 mb-5">
        {filtered.length} 件{isFiltering && " — フィルター中"}
      </p>

      {/* カードグリッド */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-muted-foreground text-sm">
            該当する記事が見つかりませんでした。
          </p>
          {isFiltering && (
            <button
              onClick={() => { setQuery(""); setSelectedTags([]); }}
              className="mt-3 text-xs text-primary hover:underline"
            >
              フィルターをリセット
            </button>
          )}
        </div>
      )}
    </div>
  );
}
