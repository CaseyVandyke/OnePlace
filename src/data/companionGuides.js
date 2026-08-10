export const DEFAULT_COMPANION_GUIDE_ID = "golden-retriever";

export const companionGuides = [
  {
    id: DEFAULT_COMPANION_GUIDE_ID,
    species: "dog",
    name: "Golden Retriever",
    title: "Loyal & Encouraging",
    description: "A sunny companion who celebrates every step forward.",
  },
  {
    id: "labrador",
    species: "dog",
    name: "Labrador",
    title: "Friendly & Steady",
    description: "A calm companion who helps the path feel manageable.",
  },
  {
    id: "beagle",
    species: "dog",
    name: "Beagle",
    title: "Curious & Cheerful",
    description: "A bright companion who is always ready for the next stop.",
  },
  {
    id: "mixed-breed",
    species: "dog",
    name: "Mixed-Breed Pup",
    title: "One of a Kind",
    description: "A spirited companion with a wonderfully unique look.",
  },
  {
    id: "tabby-cat",
    species: "cat",
    name: "Tabby Cat",
    title: "Calm & Curious",
    description: "A thoughtful companion who notices every little detail.",
  },
];

export const companionVoices = {
  dog: {
    ready: "Woof! I’m ready!",
    cues: [
      "Woof! Let’s go!",
      "Arf! This way!",
      "Woof! Nice work!",
      "Yip! Keep going!",
      "Woof! Friends ahead!",
      "Arf! Story time!",
    ],
    simple: ["Woof!", "Arf!"],
  },
  cat: {
    ready: "Meow! I’m ready!",
    cues: [
      "Meow! Let’s go!",
      "Mrrp! This way!",
      "Purr! Nice work!",
      "Meow! Keep going!",
      "Mrrp! Friends ahead!",
      "Purr! Story time!",
    ],
    simple: ["Meow!", "Purr!"],
  },
};

export function getCompanionGuide(guideId) {
  return companionGuides.find(({ id }) => id === guideId) ?? companionGuides[0];
}

export function getCompanionVoice(guide) {
  return companionVoices[guide.species] ?? companionVoices.dog;
}
