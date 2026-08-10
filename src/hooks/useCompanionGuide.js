import { useEffect, useState } from "react";
import { DEFAULT_COMPANION_GUIDE_ID, getCompanionGuide } from "../data/companionGuides.js";

const COMPANION_GUIDE_STORAGE_KEY = "oneplace.companionGuide";
const LEGACY_DOG_GUIDE_STORAGE_KEY = "oneplace.dogGuide";

function readStoredGuideId() {
  if (typeof window === "undefined") return DEFAULT_COMPANION_GUIDE_ID;
  try {
    const storedGuideId = window.localStorage.getItem(COMPANION_GUIDE_STORAGE_KEY)
      ?? window.localStorage.getItem(LEGACY_DOG_GUIDE_STORAGE_KEY);
    return getCompanionGuide(storedGuideId).id;
  } catch {
    return DEFAULT_COMPANION_GUIDE_ID;
  }
}

export default function useCompanionGuide() {
  const [guideId, setGuideId] = useState(readStoredGuideId);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(COMPANION_GUIDE_STORAGE_KEY, guideId);
      window.localStorage.removeItem(LEGACY_DOG_GUIDE_STORAGE_KEY);
    } catch {
      // The preference remains available for this visit if storage is blocked.
    }
  }, [guideId]);

  const selectGuide = (nextGuideId) => {
    setGuideId(getCompanionGuide(nextGuideId).id);
  };

  return [getCompanionGuide(guideId), selectGuide];
}
