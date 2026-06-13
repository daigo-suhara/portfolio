import type { BlogPost } from "@/lib/blog";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  const publishedAt = new Date(post.publishedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <a href={`/posts/${post.id}`} className="group block h-full">
      <div className="h-full flex flex-col p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-sm transition-all duration-200">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h2 className="font-semibold text-[0.9375rem] leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-150">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1">
            {post.excerpt}
          </p>
        )}

        <time
          dateTime={post.publishedAt}
          className="block mt-4 text-xs text-muted-foreground/60"
        >
          {publishedAt}
        </time>
      </div>
    </a>
  );
}
