import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("splashShown")) return;
    sessionStorage.setItem("splashShown", "1");
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, rotate: 360 }}
              transition={{
                scale: { type: "spring", stiffness: 260, damping: 18, delay: 0.1 },
                opacity: { duration: 0.3, delay: 0.1 },
                rotate: { duration: 1.6, delay: 0.1, ease: "linear", repeat: Infinity },
              }}
              className="w-32 h-32"
            >
              <img
                src="/loading-icon.png"
                alt="Loading"
                className="w-full h-full object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-end gap-0.5 text-sm text-muted-foreground tracking-widest"
              style={{ fontFamily: "var(--font-header)" }}
            >
              {"Now Loading".split("").map((char, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut",
                  }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={`dot-${i}`}
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: "Now Loading".length * 0.05 + i * 0.05,
                    ease: "easeInOut",
                  }}
                >
                  .
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
