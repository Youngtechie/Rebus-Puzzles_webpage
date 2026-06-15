import { AnimatePresence, motion } from "framer-motion";

export default function Toast({ message, type }) {
  return (
    <div className="rb-toast-wrap">
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message + type}
            className={`rb-toast${type ? ` ${type}` : ""}`}
            initial={{ opacity: 0, y: -16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}