import { getCompanionGuide } from "../data/companionGuides.js";
import "./CompanionGuide.css";

const dogShapes = {
  "golden-retriever": {
    tail: "M73 82c11 3 21-3 22-13 1-8-3-14-10-17 3 8 0 14-7 17-6 2-9 7-5 13Z",
    body: "M28 58c5-8 38-8 44 0 6 9 5 34-1 42-7 9-35 9-42 0-6-8-7-33-1-42Z",
    leftEar: "M30 18C14 18 9 35 17 49c3 5 8 8 13 9l8-28Z",
    rightEar: "M70 18c16 0 21 17 13 31-3 5-8 8-13 9l-8-28Z",
    headRadiusX: 29,
    headRadiusY: 28,
  },
  labrador: {
    tail: "M73 83c13 0 21-8 21-19 0-6-3-10-7-13 1 9-3 16-12 20-5 2-7 7-2 12Z",
    body: "M26 58c6-9 42-9 48 0 6 10 4 35-2 43-8 9-37 9-45 0-6-9-7-34-1-43Z",
    leftEar: "M31 19C17 16 11 29 17 42c3 7 8 12 15 15l8-27Z",
    rightEar: "M69 19c14-3 20 10 14 23-3 7-8 12-15 15l-8-27Z",
    headRadiusX: 30,
    headRadiusY: 27,
  },
  beagle: {
    tail: "M72 82c12 1 17-9 14-20-1-5 1-9 5-10 4 12-1 24-14 27-5 1-7 0-5 3Z",
    body: "M27 59c6-8 40-8 46 0 5 10 4 34-2 42-8 9-35 9-43 0-6-8-7-33-1-42Z",
    leftEar: "M29 18C13 18 9 36 17 52c3 6 9 10 15 9l7-31Z",
    rightEar: "M71 18c16 0 20 18 12 34-3 6-9 10-15 9l-7-31Z",
    headRadiusX: 28,
    headRadiusY: 28,
  },
  "mixed-breed": {
    tail: "M72 83c13 2 22-6 20-17-1-6-5-10-10-11 5 7 3 14-4 18-7 4-9 7-6 10Z",
    body: "M27 58c6-8 40-8 46 0 6 10 4 35-2 43-8 9-35 9-43 0-6-9-7-34-1-43Z",
    leftEar: "M32 22 17 7c-3 16 1 34 15 47l8-25Z",
    rightEar: "M69 19c15-2 20 14 13 28-3 7-8 11-14 12l-7-29Z",
    headRadiusX: 29,
    headRadiusY: 28,
  },
};

function DogArtwork({ guide }) {
  const shape = dogShapes[guide.id];
  return (
    <>
      <path className="dog-tail" d={shape.tail} />
      {guide.id === "beagle" && <circle className="dog-tail-tip" cx="89" cy="56" r="4.5" />}
      <rect className="companion-pack" x="14" y="60" width="29" height="31" rx="11" />
      <path className="dog-body" d={shape.body} />
      {guide.id === "beagle" && <path className="dog-saddle" d="M25 60c9-10 34-10 48 0 3 6 3 17 2 24-13-7-33-8-50-1-1-8-2-17 0-23Z" />}
      {guide.id === "mixed-breed" && <path className="dog-body-patch" d="M49 55c12-2 22 0 25 7 3 8 2 22-1 30-12-1-19-9-23-18-3-7-4-13-1-19Z" />}
      <path className="dog-chest" d="M39 62c5 5 17 5 22 0 1 13-2 28-11 36-9-8-12-23-11-36Z" />
      <path className="dog-leg" d="M31 89v18c0 5 9 5 10 0l2-18M69 89v18c0 5-9 5-10 0l-2-18" />
      <path className="dog-ear" d={shape.leftEar} />
      <path className="dog-ear" d={shape.rightEar} />
      <ellipse className="dog-head" cx="50" cy="38" rx={shape.headRadiusX} ry={shape.headRadiusY} />
      {guide.id !== "labrador" && <path className="dog-blaze" d="M50 11c-8 8-9 18-4 26l8 1c5-9 4-19-4-27Z" />}
      {guide.id === "mixed-breed" && <path className="dog-face-patch" d="M52 11c15 1 25 12 26 25-6 6-14 8-22 5-6-9-8-20-4-30Z" />}
      <circle className="companion-eye" cx="39" cy="36" r="3.4" />
      <circle className="companion-eye" cx="61" cy="36" r="3.4" />
      <ellipse className="dog-muzzle" cx="50" cy="49" rx="13" ry="10" />
      <path className="companion-nose" d="M45 46c0-4 10-4 10 0 0 3-3 5-5 5s-5-2-5-5Z" />
      <path className="companion-smile" d="M50 51c-1 5-7 6-9 3m9-3c1 5 7 6 9 3" />
      <path className="companion-collar" d="M28 61c13 7 31 7 44 0" />
      <circle className="companion-tag" cx="50" cy="68" r="5" />
    </>
  );
}

function CatArtwork() {
  return (
    <>
      <path className="cat-tail" d="M70 88c18 5 27-5 23-18-2-7-8-10-13-6" />
      <rect className="companion-pack" x="14" y="62" width="28" height="29" rx="10" />
      <ellipse className="cat-body" cx="50" cy="79" rx="24" ry="29" />
      <path className="cat-chest" d="M40 61c5 5 15 5 20 0 1 17-2 31-10 39-8-8-11-22-10-39Z" />
      <path className="cat-leg" d="M34 89v18m32-18v18" />
      <path className="cat-ear" d="M28 27 25 8l19 13Zm44 0 3-19-19 13Z" />
      <ellipse className="cat-head" cx="50" cy="39" rx="27" ry="25" />
      <path className="cat-stripe" d="m43 16 3 12m11-12-3 12M28 34l10 3m34-3-10 3M33 72l10 4m24-4-10 4" />
      <ellipse className="cat-eye" cx="39" cy="38" rx="3.2" ry="4.1" />
      <ellipse className="cat-eye" cx="61" cy="38" rx="3.2" ry="4.1" />
      <ellipse className="cat-muzzle" cx="44" cy="50" rx="8" ry="7" />
      <ellipse className="cat-muzzle" cx="56" cy="50" rx="8" ry="7" />
      <path className="companion-nose" d="M46 46h8c0 4-2 6-4 6s-4-2-4-6Z" />
      <path className="companion-smile" d="M50 51c-1 5-6 6-8 4m8-4c1 5 6 6 8 4" />
      <path className="cat-whiskers" d="M39 49 23 46m16 8-17 3m39-8 16-3m-16 8 17 3" />
      <path className="companion-collar" d="M29 60c12 6 30 6 42 0" />
      <circle className="companion-tag" cx="50" cy="67" r="5" />
    </>
  );
}

export default function CompanionGuide({ guideId, size = 54 }) {
  const guide = getCompanionGuide(guideId);
  return (
    <svg
      className={`companion-guide companion-guide-${guide.id}`}
      width={size}
      height={size * 1.16}
      viewBox="0 0 100 116"
      aria-hidden="true"
    >
      {guide.species === "cat" ? <CatArtwork /> : <DogArtwork guide={guide} />}
    </svg>
  );
}
