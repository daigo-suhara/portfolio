import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface TimelineItem {
  year: string;
  title: string;
  description?: string;
}

function TimelineEntry({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      className="relative flex gap-6 pb-10 last:pb-0"
    >
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.3, delay: index * 0.08 }}
          className="w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 shrink-0 mt-1"
        />
        <div className="w-px flex-1 bg-border mt-2 last:hidden" />
      </div>

      <div className="pb-2">
        <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
          {item.year}
        </span>
        <h3 className="mt-2 font-semibold text-foreground">{item.title}</h3>
        {item.description && (
          <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="mt-4">
      {items.map((item, i) => (
        <TimelineEntry key={i} item={item} index={i} />
      ))}
    </div>
  );
}
