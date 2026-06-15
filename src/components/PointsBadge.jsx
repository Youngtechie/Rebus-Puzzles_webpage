import { motion, AnimatePresence } from "framer-motion";

/**
 * Animated points badge.
 * Re-keys on points value so Framer re-mounts and pops the number.
 */

export default function PointsBadge({ points }) {
  return (
    <div className="rb-pts-badge">
      {/* Amber coin dot */}
      <motion.div
        className="rb-pts-icon"
        animate={{ scale: [1, 1.25, 1] }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        key={points} // triggers on every change
      />
      <AnimatePresence mode="popLayout">
        <motion.span
          key={points}
          className="rb-pts-val"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {points.toLocaleString()}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}