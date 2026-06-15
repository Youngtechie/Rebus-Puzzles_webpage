import { AnimatePresence, motion } from "framer-motion";

/**
 * PuzzleCard — the centrepiece of the game.
 *
 * Signature behaviour:
 *   • Rests at a subtle tilt (rotate: 1.5deg) — like a card on a table.
 *   • Hover brings it flat (rotate: 0) — like picking it up.
 *   • Navigation slides the card in/out in the direction of travel.
 *
 * Props:
 *   pattern   {string}  — raw HTML string (emoji + styled spans)
 *   pageKey   {number}  — unique key per puzzle, drives AnimatePresence
 *   direction {-1|1}    — -1 = going back, 1 = going forward
 */
export default function PuzzleCard({ pattern, pageKey, direction }) {
  const SLIDE_DIST = 60;

  const variants = {
    enter: (dir) => ({
      x: dir * SLIDE_DIST,
      opacity: 0,
      rotate: dir * 3,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 1.5,        // signature resting tilt
      scale: 1,
    },
    exit: (dir) => ({
      x: dir * -SLIDE_DIST,
      opacity: 0,
      rotate: dir * -3,
      scale: 0.96,
    }),
  };

  return (
    /* Clip wrapper keeps slide from overflowing the card area */
    <div style={{ overflow: "hidden", borderRadius: 20 }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={pageKey}
          className="rb-puzzle-card"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x:       { type: "spring", stiffness: 340, damping: 32 },
            opacity: { duration: 0.2 },
            rotate:  { type: "spring", stiffness: 200, damping: 24 },
            scale:   { duration: 0.22, ease: "easeOut" },
          }}
          whileHover={{
            rotate: 0,
            scale: 1.01,
            borderColor: "rgba(245, 166, 35, 0.3)",
            transition: { duration: 0.25, ease: "easeOut" },
          }}
        >
          <div style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "center",}}
            className="rb-puzzle-text"
            dangerouslySetInnerHTML={{ __html: pattern }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}