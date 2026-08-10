export const DEFAULT_DOG_GUIDE_ID = "golden-retriever";

export const dogGuides = [
  {
    id: DEFAULT_DOG_GUIDE_ID,
    breed: "Golden Retriever",
    title: "Loyal & Encouraging",
    description: "A sunny companion who celebrates every step forward.",
  },
  {
    id: "labrador",
    breed: "Labrador",
    title: "Friendly & Steady",
    description: "A calm companion who helps the path feel manageable.",
  },
  {
    id: "beagle",
    breed: "Beagle",
    title: "Curious & Cheerful",
    description: "A bright companion who is always ready for the next stop.",
  },
  {
    id: "mixed-breed",
    breed: "Mixed-Breed Pup",
    title: "One of a Kind",
    description: "A spirited companion with a wonderfully unique look.",
  },
];

export function getDogGuide(guideId) {
  return dogGuides.find(({ id }) => id === guideId) ?? dogGuides[0];
}
