import { useEffect, useState } from "react";
import { DEFAULT_DOG_GUIDE_ID, getDogGuide } from "../data/dogGuides.js";

const DOG_GUIDE_STORAGE_KEY = "oneplace.dogGuide";

function readStoredGuideId() {
  if (typeof window === "undefined") return DEFAULT_DOG_GUIDE_ID;
  try {
    return getDogGuide(window.localStorage.getItem(DOG_GUIDE_STORAGE_KEY)).id;
  } catch {
    return DEFAULT_DOG_GUIDE_ID;
  }
}

export default function useDogGuide() {
  const [guideId, setGuideId] = useState(readStoredGuideId);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(DOG_GUIDE_STORAGE_KEY, guideId);
    } catch {
      // The preference remains available for this visit if storage is blocked.
    }
  }, [guideId]);

  const selectGuide = (nextGuideId) => {
    setGuideId(getDogGuide(nextGuideId).id);
  };

  return [getDogGuide(guideId), selectGuide];
}
