/**
 * RebusGame.jsx — main orchestrator
 *
 * All styles live in  src/styles/game.css
 * Motion components:  PuzzleCard, PointsBadge, Toast
 *
 * Framer Motion usage summary:
 *   • Game card   — mount animation (scale + fade)
 *   • PuzzleCard  — slide in/out per puzzle with direction awareness
 *   • PointsBadge — number pop on points change
 *   • Submit btn  — scale tap feedback
 *   • Nav buttons — scale tap feedback
 *   • Hint box    — expand from height 0
 *   • Toast       — slide down / fade (in Toast.jsx)
 *   • Input shake — waggle on wrong answer
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

import rebuses from "../Rebuses";
import PuzzleCard from "./PuzzleCard";
import PointsBadge from "./PointsBadge";
import Toast from "./Toast";
import "../assests/styles/Rebuses.css";

// ─── Storage ──────────────────────────────────────────────────────
const STORAGE_KEY = "rebus_state_v2";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return { points: 1000, solved: [], hinted: [], page: 0 };
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
}

// ─── Inline SVG icons (no external icon font needed) ──────────────
const IconBulb = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.22-1.21 4.16-3 5.2V17H9v-2.8A6 6 0 0 1 6 9a6 6 0 0 1 6-6z"/>
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 18l-6-6 6-6"/>
  </svg>
);

const IconChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);

const IconGrid = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

// ─── Shake animation for wrong answer ─────────────────────────────
const shakeVariants = {
  idle:  { x: 0 },
  shake: {
    x: [0, -10, 10, -8, 8, -4, 4, 0],
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

// ─── Main component ────────────────────────────────────────────────
export default function RebusGame() {
  const [state, setState]       = useState(loadState);
  const [page, setPage]         = useState(() => loadState().page || 0);
  const [direction, setDirection] = useState(1);
  const [answerVal, setAnswerVal] = useState("");
  const [inputState, setInputState] = useState("idle"); // "idle" | "solved" | "wrong"
  const [hintVisible, setHintVisible] = useState(false);
  const [toast, setToast]       = useState({ msg: "", type: "" });
  const toastTimer              = useRef(null);
  const shakeControls           = useAnimation();

  const rebus    = rebuses[page];
  const isSolved = (state.solved || []).includes(page);
  const isHinted = (state.hinted || []).includes(page);
  const solvedCount = (state.solved || []).length;

  // Persist on every change
  useEffect(() => {
    saveState({ ...state, page });
  }, [state, page]);

  // Reset UI when page changes
  useEffect(() => {
    setHintVisible(isSolved || isHinted);
    setAnswerVal(isSolved ? rebus.answer.trim() : "");
    setInputState(isSolved ? "solved" : "idle");
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Toast helper ──────────────────────────────────────────────
  const showToast = useCallback((msg, type = "") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    toastTimer.current = setTimeout(
      () => setToast({ msg: "", type: "" }),
      2400
    );
  }, []);

  // ── Mutations ─────────────────────────────────────────────────
  const mutatePoints = (delta) => {
    setState((s) => ({ ...s, points: Math.max(0, s.points + delta) }));
  };

  const markSolved = () => {
    setState((s) => ({
      ...s,
      solved: s.solved.includes(page) ? s.solved : [...s.solved, page],
    }));
  };

  const markHinted = () => {
    setState((s) => ({
      ...s,
      hinted: s.hinted.includes(page) ? s.hinted : [...s.hinted, page],
    }));
  };

  // ── Actions ───────────────────────────────────────────────────
  const handleHint = () => {
    if (isSolved)         { showToast("Already solved!"); return; }
    if (isHinted)         { showToast("Hint is already showing"); return; }
    if (state.points < 50){ showToast("Need 50 pts for a hint", "bad"); return; }
    mutatePoints(-50);
    markHinted();
    setHintVisible(true);
    showToast("Hint unlocked  −50 pts");
  };

  const handleReveal = () => {
    if (isSolved)           { showToast("Already solved!"); return; }
    if (state.points < 250) { showToast("Need 250 pts to reveal", "bad"); return; }
    mutatePoints(-250);
    markSolved();
    markHinted();
    setAnswerVal(rebus.answer.trim());
    setInputState("solved");
    setHintVisible(true);
    showToast("Answer revealed  −250 pts", "bad");
  };

  const handleSubmit = () => {
    const val     = answerVal.trim().toLowerCase();
    const correct = rebus.answer.trim().toLowerCase();
    if (!val) { showToast("Type an answer first"); return; }

    if (val === correct) {
      if (!isSolved) {
        markSolved();
        mutatePoints(200);
        showToast("Correct! +200 pts  🎉", "good");
      }
      setInputState("solved");
      setHintVisible(true);
      setTimeout(() => {
        if (page < rebuses.length - 1) {
          setDirection(1);
          setPage((p) => p + 1);
        } else {
          showToast("All puzzles complete! 🏆", "good");
        }
      }, 900);
    } else {
      setInputState("wrong");
      shakeControls.start("shake").then(() => {
        setInputState("idle");
      });
      showToast("Not quite — try again!", "bad");
    }
  };

  const navigate = (delta) => {
    const next = page + delta;
    if (next < 0 || next >= rebuses.length) return;
    setDirection(delta);
    setPage(next);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const progress = ((page + 1) / rebuses.length) * 100;

  // ── Render ────────────────────────────────────────────────────
  return (
    <>
      <Toast message={toast.msg} type={toast.type} />

      {/* Game card entrance animation */}
      <motion.div
        className="rb-game"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── Header ── */}
        <header className="rb-header">
          <div className="rb-logo">ReBuS</div>
          <PointsBadge points={state.points} />
        </header>

        {/* ── Action buttons ── */}
        <div className="rb-actions">
          <motion.button
            className="rb-action-btn hint"
            onClick={handleHint}
            whileTap={{ scale: 0.96 }}
          >
            <IconBulb />
            Hint <span className="rb-cost">−50</span>
          </motion.button>

          <motion.button
            className="rb-action-btn reveal"
            onClick={handleReveal}
            whileTap={{ scale: 0.96 }}
          >
            <IconEye />
            Reveal <span className="rb-cost">−250</span>
          </motion.button>
        </div>

        {/* ── Progress ── */}
        <div className="rb-progress">
          <div className="rb-prog-meta">
            <span className="rb-prog-label">
              Puzzle {page + 1} of {rebuses.length}
            </span>
            <span className="rb-prog-solved">{solvedCount} solved</span>
          </div>
          <div className="rb-prog-track">
            <div className="rb-prog-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* ── Puzzle + inputs ── */}
        <div className="rb-puzzle-area">
          <PuzzleCard
            pattern={rebus.pattern}
            pageKey={page}
            direction={direction}
          />

          {/* Shake wrapper on input */}
          <motion.div
            variants={shakeVariants}
            animate={shakeControls}
            initial="idle"
          >
            <input
              type="text"
              className={`rb-ans-input${inputState !== "idle" ? ` ${inputState}` : ""}`}
              value={answerVal}
              onChange={(e) => setAnswerVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer…"
              readOnly={isSolved}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Answer input"
            />
          </motion.div>

          <motion.button
            className="rb-submit-btn"
            onClick={handleSubmit}
            disabled={isSolved}
            whileTap={!isSolved ? { scale: 0.97 } : {}}
          >
            Submit Answer
          </motion.button>

          {/* Hint box — expands from 0 height */}
          <AnimatePresence>
            {hintVisible && (
              <motion.div
                className="rb-hint-box"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
              >
                <span className="rb-hint-icon">💡</span>
                {rebus.hint}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Nav row ── */}
        <div className="rb-nav-row">
          <motion.button
            className="rb-nav-btn"
            onClick={() => navigate(-1)}
            disabled={page === 0}
            whileTap={page > 0 ? { scale: 0.93 } : {}}
            aria-label="Previous puzzle"
          >
            <IconChevronLeft />
          </motion.button>

          <div className="rb-chips">
            <div className="rb-chip green">
              <IconCheck />
              {solvedCount}
            </div>
            <div className="rb-chip dim">
              <IconGrid />
              {rebuses.length}
            </div>
          </div>

          <motion.button
            className="rb-nav-btn"
            onClick={() => navigate(1)}
            disabled={page === rebuses.length - 1}
            whileTap={page < rebuses.length - 1 ? { scale: 0.93 } : {}}
            aria-label="Next puzzle"
          >
            <IconChevronRight />
          </motion.button>
        </div>

        {/* ── Footer ── */}
        <footer className="rb-footer">
          Olaegbe Abdul-Rahmon &copy; 2026
        </footer>
      </motion.div>
    </>
  );
}