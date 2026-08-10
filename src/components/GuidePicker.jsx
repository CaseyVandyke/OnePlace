import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { companionGuides } from "../data/companionGuides.js";
import CompanionGuide from "./CompanionGuide.jsx";
import "./GuidePicker.css";

const focusableSelector = [
  "button:not([disabled])",
  "input:not([disabled])",
  "[href]",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export default function GuidePicker({ selectedGuideId, onSelect, onClose, returnFocusRef }) {
  const [draftGuideId, setDraftGuideId] = useState(selectedGuideId);
  const panelRef = useRef(null);
  const selectedGuide = companionGuides.find(({ id }) => id === draftGuideId) ?? companionGuides[0];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const returnFocusTarget = returnFocusRef?.current;
    const appRoot = document.getElementById("root");
    const rootWasInert = appRoot?.inert ?? false;
    const previousAriaHidden = appRoot?.getAttribute("aria-hidden");
    document.body.style.overflow = "hidden";
    if (appRoot) {
      appRoot.inert = true;
      appRoot.setAttribute("aria-hidden", "true");
    }
    panelRef.current?.focus({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = [...panelRef.current.querySelectorAll(focusableSelector)];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      if (appRoot) {
        appRoot.inert = rootWasInert;
        if (previousAriaHidden === null) appRoot.removeAttribute("aria-hidden");
        else appRoot.setAttribute("aria-hidden", previousAriaHidden);
      }
      returnFocusTarget?.focus({ preventScroll: true });
    };
  }, [onClose, returnFocusRef]);

  const confirmSelection = () => {
    onSelect(draftGuideId);
    onClose();
  };

  return createPortal(
    <div className="guide-picker-overlay">
      <button className="guide-picker-backdrop" type="button" onClick={onClose} aria-label="Close guide picker" />
      <section
        ref={panelRef}
        className="guide-picker-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-picker-title"
        aria-describedby="guide-picker-description"
        tabIndex="-1"
      >
        <header>
          <div>
            <p className="question-eyebrow">YOUR TRAVELING COMPANION</p>
            <h2 id="guide-picker-title">Choose the companion who guides you.</h2>
            <p id="guide-picker-description">This is optional. You can change your guide anytime.</p>
          </div>
          <button className="guide-picker-close" type="button" onClick={onClose} aria-label="Close guide picker">×</button>
        </header>

        <fieldset className="guide-options">
          <legend className="sr-only">Available companion guides</legend>
          {companionGuides.map((guide) => (
            <label className={guide.id === draftGuideId ? "selected" : ""} key={guide.id}>
              <input
                type="radio"
                name="companion-guide"
                value={guide.id}
                checked={guide.id === draftGuideId}
                onChange={() => setDraftGuideId(guide.id)}
              />
              <span className="guide-option-art"><CompanionGuide guideId={guide.id} size={76} /></span>
              <span className="guide-option-copy">
                <strong>{guide.name}</strong>
                <b>{guide.title}</b>
                <small>{guide.description}</small>
              </span>
              <span className="guide-option-check" aria-hidden="true">✓</span>
            </label>
          ))}
        </fieldset>

        <footer>
          <button className="guide-picker-cancel" type="button" onClick={onClose}>Keep my current guide</button>
          <button className="continue-button" type="button" onClick={confirmSelection}>Travel with {selectedGuide.name}</button>
        </footer>
      </section>
    </div>,
    document.body,
  );
}
