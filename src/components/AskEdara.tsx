"use client";

import React from "react";
import { Reveal } from "@/components/Reveal";

/**
 * "Ask Edara" pre-footer widget — a Tesla-style pill that answers questions
 * about Edara from a built-in knowledge base. Runs fully client-side: it tries
 * an optional injected `window.claude.complete` if present, and otherwise
 * degrades gracefully to keyword-matched canned replies.
 */

const ASK_PLACEHOLDERS = [
  "What does Edara actually do?",
  "How much does it cost?",
  "Can you run events outside Germany?",
  "Agency or Department — what's the difference?",
  "Do I need to run events regularly?",
];

const ASK_SUGGESTIONS = ["What does Edara do?", "How does pricing work?", "Where do you operate?"];

/* Local fallback — keyword-matched canned replies kept in sync with site copy. */
function localFallback(q: string): string {
  const s = q.toLowerCase();
  if (/(price|cost|how much|pricing|fee|€|\$|budget|plan)/.test(s))
    return "We partner two ways. The Agency model is a flat 12% of the event budget we manage — best for variable, big-budget events. The Department model is a fixed fractional events team billed quarterly: Planner €3,000/mo, Fractional €5,000/mo, and Unlimited €8,000/mo.";
  if (/(where|country|countries|location|germany|global|outside)/.test(s))
    return "Edara is a German company with worldwide operations — we've delivered events in 20+ countries. Wherever your event is, we can run it on the ground.";
  if (/(what|do you|handle|service|include|offer)/.test(s))
    return "We're your events department on demand: booth design and build, sponsorship and speaking slots, venue and vendor logistics, merchandise and on-site execution — all under one team and one point of contact.";
  if (/(who|for whom|right for|fit)/.test(s))
    return "We're built for tech and AI teams without a dedicated events department — whether it's your first booth or your tenth this year.";
  return "Great question. The fastest way to get a precise answer is a 30-minute strategy call, or email us at edaraevents@gmail.com — we reply within one business day.";
}

/* Strip light markdown so bubbles show clean prose. */
function cleanText(s: string): string {
  return (s || "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/(^|\n)\s*[-*]\s+/g, "$1")
    .replace(/(^|\n)#{1,6}\s+/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

type Msg = { role: "user" | "edara"; text: string };

// Optional model bridge that some host environments inject onto window.
type ClaudeBridge = {
  complete?: (opts: { messages: { role: string; content: string }[] }) => Promise<string>;
};
declare global {
  interface Window {
    claude?: ClaudeBridge;
  }
}

export function AskEdara() {
  const [thread, setThread] = React.useState<Msg[]>([]);
  const [value, setValue] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [phIndex, setPhIndex] = React.useState(0);
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const threadRef = React.useRef<HTMLDivElement>(null);

  // Rotate the example placeholder while idle.
  React.useEffect(() => {
    if (focused || value || busy) return;
    const t = setInterval(() => setPhIndex((i) => (i + 1) % ASK_PLACEHOLDERS.length), 3200);
    return () => clearInterval(t);
  }, [focused, value, busy]);

  // Keep the thread scrolled to the latest message.
  React.useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [thread, busy]);

  async function ask(question?: string) {
    const q = (question == null ? value : question).trim();
    if (!q || busy) return;
    setValue("");
    const history: Msg[] = [...thread, { role: "user", text: q }];
    setThread(history);
    setBusy(true);

    let answer = "";
    try {
      if (typeof window !== "undefined" && window.claude && typeof window.claude.complete === "function") {
        const messages = history.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.text,
        }));
        answer = (await window.claude.complete({ messages })) || "";
        answer = answer.trim();
      }
    } catch {
      answer = "";
    }
    if (!answer) answer = localFallback(q);

    setThread((t) => [...t, { role: "edara", text: answer }]);
    setBusy(false);
    if (inputRef.current) inputRef.current.focus();
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  }

  const hasThread = thread.length > 0;
  const canSend = value.trim().length > 0 && !busy;

  return (
    <section className="ek-ask" aria-label="Ask Edara">
      <div className="ek-ask__glow" aria-hidden="true" />
      <div className="ek-container ek-ask__inner">
        <Reveal className="ek-ask__head">
          <span className="ek-ask__eyebrow">ASK EDARA</span>
          <h2 className="ek-ask__title">Have a question? Ask away.</h2>
          <p className="ek-ask__sub">
            Pricing, services, logistics, where we operate — ask and get an instant answer.
          </p>
        </Reveal>

        {hasThread && (
          <div className="ek-ask__thread" ref={threadRef}>
            {thread.map((m, i) => (
              <div key={i} className={"ek-ask__msg ek-ask__msg--" + m.role}>
                {m.role === "edara" && (
                  <span className="ek-ask__avatar material-symbols-outlined">forum</span>
                )}
                <div className="ek-ask__bubble">
                  {cleanText(m.text)
                    .split(/\n+/)
                    .map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                </div>
              </div>
            ))}
            {busy && (
              <div className="ek-ask__msg ek-ask__msg--edara">
                <span className="ek-ask__avatar material-symbols-outlined">forum</span>
                <div className="ek-ask__bubble ek-ask__bubble--typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>
        )}

        <div className={"ek-askbar" + (focused ? " is-focused" : "")}>
          <span className="ek-askbar__icon material-symbols-outlined">forum</span>
          <span className="ek-askbar__label">Ask Edara</span>
          <input
            ref={inputRef}
            className="ek-askbar__input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={onKey}
            placeholder={hasThread ? "Ask a follow-up…" : `"${ASK_PLACEHOLDERS[phIndex]}"`}
            aria-label="Ask Edara a question"
            disabled={busy}
          />
          <button
            className={"ek-askbar__send" + (canSend ? " is-active" : "")}
            onClick={() => ask()}
            disabled={!canSend}
            aria-label="Send question"
          >
            <span className="material-symbols-outlined">{busy ? "more_horiz" : "arrow_upward"}</span>
          </button>
        </div>

        {!hasThread && (
          <div className="ek-ask__chips">
            {ASK_SUGGESTIONS.map((s) => (
              <button key={s} className="ek-ask__chip" onClick={() => ask(s)} disabled={busy}>
                {s}
              </button>
            ))}
          </div>
        )}
        {hasThread && (
          <div className="ek-ask__foot">
            <button
              className="ek-ask__clear"
              onClick={() => {
                setThread([]);
                setValue("");
              }}
            >
              <span className="material-symbols-outlined">restart_alt</span>
              Clear conversation
            </button>
            <span className="ek-ask__disclaim">
              Answers are AI-generated. For anything binding, book a strategy call.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export default AskEdara;
