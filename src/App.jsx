import { useEffect, useMemo, useRef, useState } from "react";

const paths = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  back: "M19 12H5m6 6-6-6 6-6",
  check: "m5 12 4 4L19 6",
  lock: "M6 10V7a6 6 0 0 1 12 0v3m1 0H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Z",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6M8 13h8M8 17h6",
  bank: "M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M3 21h18M12 3 3 7h18l-9-4Z",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z",
  people: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  message: "M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4",
  upload: "M12 16V4m-5 5 5-5 5 5M4 15v5h16v-5",
  spark: "m12 2 1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2Z",
  play: "m8 5 11 7-11 7V5Z",
  mic: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Zm-7 9a7 7 0 0 0 14 0M12 18v4m-4 0h8",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-16v6l4 2",
  key: "M21 2 13.6 9.4a5 5 0 1 0 1 3.6L17 11h2V9h2V7h2V2h-2ZM7.5 17.5h.01",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M18 6 6 18M6 6l12 12",
  home: "M3 11 12 3l9 8M5 10v11h14V10M9 21v-7h6v7",
  gift: "M20 12v10H4V12M2 7h20v5H2V7Zm10 15V7m0 0H7.5A2.5 2.5 0 1 1 10 4.5L12 7Zm0 0h4.5A2.5 2.5 0 1 0 14 4.5L12 7Z",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  camera: "M14.5 4 16 6h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3l1.5-2h5ZM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm-2 3 10 7L22 7",
  plus: "M12 5v14M5 12h14",
  logout: "M10 17l5-5-5-5m5 5H3m10-9h7a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-7",
};

function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

function Logo({ light = false }) {
  return (
    <div className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-door"><i /></span>
      <span>oneplace</span>
    </div>
  );
}

function useScrollToTop(value) {
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [value]);
}

const explorers = [
  { id: "coral", name: "Your guide", description: "Warm & brave", style: "Coral coat", skin: "#8f563f", hair: "#35251f", coat: "#df5e59" },
  { id: "blue", name: "Your guide", description: "Calm & steady", style: "Blue coat", skin: "#d29a72", hair: "#5b3929", coat: "#4775a5" },
  { id: "violet", name: "Your guide", description: "Bright & curious", style: "Violet coat", skin: "#6d4032", hair: "#1f1b24", coat: "#7758a5" },
  { id: "rose", name: "Your guide", description: "Kind & hopeful", style: "Rose coat", skin: "#e0ad88", hair: "#b36942", coat: "#bd526e" },
];

function Explorer({ explorer = explorers[0], size = 54 }) {
  return (
    <span className="explorer" style={{ "--size": `${size}px`, "--skin": explorer.skin, "--hair": explorer.hair, "--coat": explorer.coat }}>
      <i className="explorer-hair" />
      <i className="explorer-head"><b /><b /></i>
      <i className="explorer-body" />
      <i className="explorer-pack" />
      <i className="explorer-leg leg-left" />
      <i className="explorer-leg leg-right" />
    </span>
  );
}

const chapters = [
  { name: "Basecamp", icon: "home", color: "coral", short: "Start with what matters" },
  { name: "Paper Port", icon: "file", color: "red", short: "The papers they’ll need" },
  { name: "Money Meadow", icon: "bank", color: "purple", short: "Accounts without the hunt" },
  { name: "Safety Harbor", icon: "shield", color: "blue", short: "Insurance and care" },
  { name: "Kindred Grove", icon: "people", color: "iris", short: "The right access" },
  { name: "Memory Lake", icon: "message", color: "pink", short: "More than paperwork" },
];

const questions = [
  {
    chapter: 0,
    eyebrow: "Let’s make it yours",
    title: "Who are you preparing this for?",
    copy: "Choose everyone who comes to mind. This helps us shape the questions around your life.",
    type: "multi",
    options: ["My spouse or partner", "My children", "Extended family", "A close friend", "Someone else"],
    reward: 10,
  },
  {
    chapter: 0,
    eyebrow: "A little about you",
    title: "What should your family call this place?",
    copy: "It can simply be your name, your family name, or something more personal.",
    type: "name",
    reward: 10,
  },
  {
    chapter: 1,
    eyebrow: "Paper Port · Important documents",
    title: "Do you have a will?",
    copy: "No judgment either way. Your answer helps us give you the right next step.",
    type: "single",
    options: ["Yes, I have one", "I’m working on it", "Not yet", "I’m not sure"],
    reward: 15,
  },
  {
    chapter: 1,
    eyebrow: "Bring it into OnePlace",
    title: "Want to add your will now?",
    copy: "Upload a copy, take a photo, or tell us where the original is kept.",
    type: "upload",
    reward: 25,
  },
  {
    chapter: 2,
    eyebrow: "Money Meadow · Accounts",
    title: "Where do you keep everyday accounts?",
    copy: "We’ll make a simple inventory first. You decide whether to add account details or passwords later.",
    type: "banks",
    options: ["Chase", "Wells Fargo", "Mountain America", "Capital One", "Another institution"],
    reward: 20,
  },
  {
    chapter: 2,
    eyebrow: "One helpful detail",
    title: "How should your family identify this account?",
    copy: "For this concept, use fictional information only.",
    type: "account",
    reward: 20,
  },
  {
    chapter: 3,
    eyebrow: "Safety Harbor · Protection",
    title: "Which protections do you already have?",
    copy: "Select anything that applies. We’ll create a short task for each one.",
    type: "multi",
    options: ["Life insurance", "Disability insurance", "Health insurance", "Long-term care", "Advance directive", "Power of attorney"],
    reward: 20,
  },
  {
    chapter: 4,
    eyebrow: "Kindred Grove · Your people",
    title: "Who should be your first trusted person?",
    copy: "They won’t see anything until you explicitly choose what to share.",
    type: "person",
    reward: 25,
  },
  {
    chapter: 4,
    eyebrow: "Kindred Grove · Possessions & keepsakes",
    title: "Is there something special you want someone to receive?",
    copy: "Start with one meaningful possession. You can build a complete “who gets what” list later.",
    type: "possessions",
    reward: 25,
  },
  {
    chapter: 5,
    eyebrow: "Memory Lake · Your voice",
    title: "Would you like to leave a hello?",
    copy: "A short voice note can mean more than every document combined.",
    type: "voice",
    reward: 30,
  },
];

const mapStops = [
  { name: "Basecamp", icon: "home", x: 18, y: 80, className: "basecamp" },
  { name: "Paper Port", icon: "file", x: 12, y: 42, className: "paper-port" },
  { name: "Money Meadow", icon: "bank", x: 36, y: 20, className: "money-meadow" },
  { name: "Safety Harbor", icon: "shield", x: 68, y: 79, className: "safety-harbor" },
  { name: "Kindred Grove", icon: "people", x: 84, y: 43, className: "kindred-grove" },
  { name: "Memory Lake", icon: "message", x: 53, y: 49, className: "memory-lake" },
  { name: "Mount Vault", icon: "key", x: 79, y: 14, className: "mount-vault" },
];

function WorldMap({ chapter = 0, explorer = explorers[0], compact = false, preview = false }) {
  const position = mapStops[Math.min(chapter, 5)];
  return (
    <div className={`world-map ${compact ? "map-compact" : ""} ${preview ? "map-preview" : ""}`}>
      <div className="map-paper">
        <svg className="map-contours" viewBox="0 0 700 530" preserveAspectRatio="none" aria-hidden="true">
          <path className="map-shore" d="M65 390C20 315 56 215 133 179c55-26 66-116 169-122 91-6 118 69 188 77 115 13 166 80 140 169-21 72 5 128-83 164-100 41-157-4-237 12-103 21-199-14-245-89Z" />
          <path d="M97 361c-22-76 33-124 88-151 63-31 70-99 143-106 69-6 105 69 173 70 67 1 111 47 89 111-25 74 13 118-70 143-75 23-137-8-204 9-80 20-192-15-219-76Z" />
          <path d="M154 339c-9-56 40-86 79-106 48-25 71-78 126-73 48 4 74 42 119 43 58 1 78 40 58 84-26 57 0 86-57 104-58 19-96-4-147 9-64 16-165-7-178-61Z" />
          <path className="trail-line" d="M119 406C93 326 78 267 95 228s108-47 151-97 158 70 145 129 82 134 78 90 79-117 105-131 9-77 8-112" />
          <path className="river-line" d="M338 112c12 70 93 65 60 132s-15 98 46 143" />
        </svg>
        <div className="map-water water-one"><i /><i /><i /></div>
        <div className="map-mountains"><i /><i /><i /><span>▲</span></div>
        <div className="map-trees trees-a">{Array.from({ length: 6 }).map((_, i) => <i key={i} />)}</div>
        <div className="map-trees trees-b">{Array.from({ length: 5 }).map((_, i) => <i key={i} />)}</div>
        <div className="map-compass" aria-label="Map compass pointing north"><b>NORTH</b><i /><span>✦</span></div>
        {mapStops.map((stop, index) => (
          <div className={`map-stop ${stop.className} ${index === chapter ? "current" : ""} ${index <= chapter || preview ? "unlocked" : "locked"}`} style={{ left: `${stop.x}%`, top: `${stop.y}%` }} key={stop.name}>
            <span><Icon name={stop.icon} size={15} /></span>
            <strong>{stop.name}</strong>
            {stop.name === "Mount Vault" && <small>Codes & digital keys</small>}
          </div>
        ))}
        {!preview && <div className={`map-explorer map-explorer-${position.className}`} style={{ left: `${position.x}%`, top: `${position.y}%` }}><span className="map-explorer-character"><Explorer explorer={explorer} size={compact ? 42 : 54} /></span><span>You are here</span></div>}
        {preview && <div className="map-preview-note"><Icon name="spark" size={13} /> Your family map begins here</div>}
      </div>
    </div>
  );
}

function AvatarPicker({ onChoose, onBack }) {
  const [selected, setSelected] = useState(explorers[0]);
  const [guideName, setGuideName] = useState("");
  const chosenGuide = { ...selected, name: guideName.trim() || selected.name };
  const continueLabel = guideName.trim() ? `Travel with ${guideName.trim()}` : "Continue with this guide";
  return (
    <main className="avatar-screen">
      <header><Logo /><button onClick={onBack}><Icon name="back" size={17} /> Back</button></header>
      <section>
        <div className="avatar-copy">
          <p className="question-eyebrow">BEFORE WE SET OUT</p>
          <h1>Pick your character.</h1>
          <p>Choose the explorer that feels right. They’ll celebrate each completed task and travel with you around your family map.</p>
          <div className="explorer-options">
            {explorers.map((item) => <button className={selected.id === item.id ? "selected" : ""} onClick={() => setSelected(item)} key={item.id}><Explorer explorer={item} size={64} /><strong>{item.description}</strong><span>{item.style}</span><i>{selected.id === item.id && <Icon name="check" size={13} />}</i></button>)}
          </div>
          <label className="guide-name">Name your character <span>Optional</span><input value={guideName} maxLength="24" onChange={(event) => setGuideName(event.target.value)} placeholder="Type any name, or leave this blank" /></label>
          <button className="continue-button avatar-continue" onClick={() => onChoose(chosenGuide)}>{continueLabel} <Icon name="arrow" /></button>
        </div>
        <div className="avatar-map"><WorldMap chapter={0} explorer={chosenGuide} compact /><div><Explorer explorer={chosenGuide} size={76} /><p><strong>{chosenGuide.name} is ready.</strong><span>First stop: Basecamp</span></p></div></div>
      </section>
    </main>
  );
}

function Welcome({ onStart, onPreview }) {
  return (
    <main className="welcome-screen">
      <header className="welcome-nav">
        <Logo light />
        <div><span><Icon name="lock" size={14} /> Private concept demo</span><button onClick={onPreview}>Preview the app</button></div>
      </header>
      <div className="welcome-glow glow-red" /><div className="welcome-glow glow-blue" />
      <section className="welcome-layout">
        <div className="welcome-copy">
          <span className="hello-pill"><i /> A kinder way to get prepared</span>
          <h1>Build the one place<br />they’ll know to look.</h1>
          <p>We’ll ask the questions, organize the answers, and help you leave less searching—and more of you.</p>
          <button className="journey-button" onClick={onStart}>Build my OnePlace <Icon name="arrow" /></button>
          <div className="welcome-promises">
            <span><Icon name="clock" /> Go at your pace</span>
            <span><Icon name="shield" /> You choose who sees what</span>
            <span><Icon name="heart" /> Pause anytime</span>
          </div>
        </div>
        <WorldMap chapter={0} preview />
      </section>
      <footer className="welcome-footer">
        <span>One question at a time.</span>
        <div><i className="active" /><i /><i /><i /></div>
        <span>No real information is stored.</span>
      </footer>
    </main>
  );
}

const journeyIntroSlides = [
  {
    eyebrow: "HOW THE JOURNEY WORKS · 1 OF 3",
    icon: "check",
    title: "One small step at a time.",
    copy: "We’ll ask one clear question at a time. Add what you know, skip what you don’t, and come back whenever you’re ready.",
    note: "There is no deadline and no perfect way to begin.",
  },
  {
    eyebrow: "HOW THE JOURNEY WORKS · 2 OF 3",
    icon: "spark",
    title: "Your guide lights the way.",
    copy: "Choose a character to travel across your family map. Every finished task earns Glow and brings another important place to life.",
    note: "Discover new places, then light them by making progress.",
  },
  {
    eyebrow: "HOW THE JOURNEY WORKS · 3 OF 3",
    icon: "shield",
    title: "You stay in control.",
    copy: "You choose what to add, who can see it, and when they can access it. Adding a trusted person never gives them automatic access.",
    note: "For this concept, use fictional information only.",
  },
];

function JourneyIntro({ onContinue, onSkip }) {
  const [slide, setSlide] = useState(0);
  const item = journeyIntroSlides[slide];
  const isLast = slide === journeyIntroSlides.length - 1;
  useEffect(() => {
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, []);
  return (
    <main className="journey-intro-screen" role="dialog" aria-modal="true" aria-labelledby="journey-intro-title">
      <section className="journey-intro-card">
        <header><Logo /><button onClick={onSkip}>Skip introduction</button></header>
        <div className="journey-intro-content">
          <div className="journey-intro-art">
            <span><Icon name={item.icon} size={38} /></span>
            {slide === 1 && <Explorer explorer={explorers[0]} size={82} />}
            <i /><i /><i />
          </div>
          <div>
            <p className="question-eyebrow">{item.eyebrow}</p>
            <h1 id="journey-intro-title">{item.title}</h1>
            <p>{item.copy}</p>
            <aside><Icon name={slide === 2 ? "lock" : "heart"} size={20} /> {item.note}</aside>
          </div>
        </div>
        <footer>
          <div className="intro-dots" aria-label={`Introduction screen ${slide + 1} of ${journeyIntroSlides.length}`}>
            {journeyIntroSlides.map((_, index) => <i className={index === slide ? "active" : ""} key={index} />)}
          </div>
          <div>
            <button className="back-button" disabled={slide === 0} onClick={() => setSlide((value) => value - 1)}><Icon name="back" size={18} /> Back</button>
            <button className="continue-button" onClick={() => isLast ? onContinue() : setSlide((value) => value + 1)}>
              {isLast ? "Choose my character" : "Next"} <Icon name="arrow" size={18} />
            </button>
          </div>
        </footer>
      </section>
    </main>
  );
}

function JourneyHeader({ current, points, onExit }) {
  const chapter = questions[current]?.chapter ?? 0;
  return (
    <header className="journey-header">
      <Logo />
      <div className="chapter-track">
        {chapters.map((item, index) => (
          <div className={`${index < chapter ? "complete" : ""} ${index === chapter ? "current" : ""}`} key={item.name}>
            <span>{index < chapter ? <Icon name="check" size={13} /> : index + 1}</span><small>{item.name}</small>
          </div>
        ))}
      </div>
      <div className="journey-points"><Icon name="spark" size={16} /><strong>{points}</strong><span>glow</span></div>
      <button className="exit-button" onClick={onExit} aria-label="Exit setup"><Icon name="close" /></button>
    </header>
  );
}

function QuestionBody({ question, answer, setAnswer, uploaded, setUploaded }) {
  const fileRef = useRef(null);
  if (question.type === "multi") {
    const selected = Array.isArray(answer) ? answer : [];
    return <div className="answer-list multi-answer">{question.options.map((option) =>
      <button className={selected.includes(option) ? "selected" : ""} onClick={() => setAnswer(selected.includes(option) ? selected.filter((x) => x !== option) : [...selected, option])} key={option}>
        <span>{selected.includes(option) && <Icon name="check" size={15} />}</span>{option}
      </button>)}</div>;
  }
  if (question.type === "single") {
    return <div className="answer-list">{question.options.map((option) =>
      <button className={answer === option ? "selected" : ""} onClick={() => setAnswer(option)} key={option}><span>{answer === option && <Icon name="check" size={15} />}</span>{option}</button>)}</div>;
  }
  if (question.type === "name") {
    return <div className="name-answer"><label>Your place’s name<input autoFocus value={answer || ""} onChange={(e) => setAnswer(e.target.value)} placeholder="The Morgan family’s OnePlace" /></label><div className="name-preview"><span className="brand-door mini"><i /></span><p>Welcome to</p><strong>{answer || "your OnePlace"}</strong></div></div>;
  }
  if (question.type === "upload") {
    return <div className="upload-answer">
      <input ref={fileRef} type="file" accept=".pdf,image/*" onChange={(e) => { if (e.target.files[0]) { setUploaded(e.target.files[0].name); setAnswer("uploaded"); } }} />
      <button className={uploaded ? "upload-zone has-file" : "upload-zone"} onClick={() => fileRef.current?.click()}>
        <span><Icon name={uploaded ? "check" : "upload"} /></span>
        <strong>{uploaded || "Choose a file or take a photo"}</strong>
        <small>{uploaded ? "Ready to keep safely at Paper Port" : "PDF, JPG or PNG · Concept only"}</small>
      </button>
      <button className="location-choice" onClick={() => setAnswer("location")}><Icon name="home" /><span><strong>Tell us where the original is</strong><small>Example: fireproof box in the home office</small></span><i className={answer === "location" ? "chosen" : ""} /></button>
    </div>;
  }
  if (question.type === "banks") {
    const selected = Array.isArray(answer) ? answer : [];
    return <div className="bank-answer">{question.options.map((option, index) =>
      <button className={selected.includes(option) ? "selected" : ""} onClick={() => setAnswer(selected.includes(option) ? selected.filter((x) => x !== option) : [...selected, option])} key={option}>
        <span className={`bank-logo logo-${index}`}>{option === "Another institution" ? <Icon name="plus" /> : option.split(" ").map((x) => x[0]).join("").slice(0, 2)}</span>
        <strong>{option}</strong><i>{selected.includes(option) && <Icon name="check" size={14} />}</i>
      </button>)}</div>;
  }
  if (question.type === "account") {
    const value = answer || {};
    return <div className="account-answer">
      <label>Nickname<input value={value.nickname || ""} onChange={(e) => setAnswer({ ...value, nickname: e.target.value })} placeholder="Everyday checking" /></label>
      <div><label>Institution<input value={value.bank || ""} onChange={(e) => setAnswer({ ...value, bank: e.target.value })} placeholder="Mountain America" /></label>
      <label>Last 4 digits<input inputMode="numeric" maxLength="4" value={value.last4 || ""} onChange={(e) => setAnswer({ ...value, last4: e.target.value.replace(/\D/g, "") })} placeholder="••••" /></label></div>
      <p><Icon name="lock" size={15} /> In the real product, sensitive details would be encrypted before leaving your device.</p>
    </div>;
  }
  if (question.type === "person") {
    const value = answer || {};
    const createAccessCode = () => {
      const code = `ONE-${Math.floor(1000 + Math.random() * 9000)}`;
      setAnswer({ ...value, inviteMethod: "code", inviteCode: code, inviteSent: false });
    };
    return <div className="person-answer">
      <div className="person-avatar">{value.name ? value.name.split(" ").map((x) => x[0]).join("").slice(0, 2) : <Icon name="people" />}</div>
      <label>Full name<input value={value.name || ""} onChange={(e) => setAnswer({ ...value, name: e.target.value })} placeholder="Daniel Morgan" /></label>
      <label>Relationship<select value={value.relationship || ""} onChange={(e) => setAnswer({ ...value, relationship: e.target.value })}><option value="">Choose one</option><option>Spouse or partner</option><option>Child</option><option>Relative</option><option>Friend</option><option>Professional</option></select></label>
      <label className="contact-email">Email address <span>Optional</span><input type="email" inputMode="email" autoCapitalize="none" value={value.email || ""} onChange={(e) => setAnswer({ ...value, email: e.target.value, inviteSent: false })} placeholder="daniel@example.com" /></label>
      <div className="invite-choice">
        <p>How would you like to connect them?</p>
        <div>
          <button className={value.inviteMethod === "email" ? "selected" : ""} onClick={() => setAnswer({ ...value, inviteMethod: "email", inviteCode: "", inviteSent: false })}>
            <span><Icon name="mail" /></span><strong>Email invitation</strong><small>Prepare a secure link</small>
          </button>
          <button className={value.inviteMethod === "code" ? "selected" : ""} onClick={createAccessCode}>
            <span><Icon name="key" /></span><strong>Private code</strong><small>Share it another way</small>
          </button>
        </div>
        {value.inviteMethod === "email" && <div className="invite-result">
          <div><Icon name={value.inviteSent ? "check" : "mail"} /><span><strong>{value.inviteSent ? "Invitation prepared" : "Ready when you are"}</strong><small>{value.inviteSent ? `For ${value.email}` : "Concept demo—no real email will be sent."}</small></span></div>
          <button disabled={!value.email} onClick={() => setAnswer({ ...value, inviteSent: true })}>{value.inviteSent ? "Prepared" : "Preview invitation"}</button>
        </div>}
        {value.inviteMethod === "code" && <div className="invite-result code-result">
          <div><Icon name="key" /><span><strong>{value.inviteCode}</strong><small>Demo code—share privately with your trusted person.</small></span></div>
          <button onClick={createAccessCode}>New code</button>
        </div>}
      </div>
      <div className="access-note"><Icon name="eye" /><span><strong>No access yet</strong><small>You’ll choose specific items and timing later.</small></span></div>
    </div>;
  }
  if (question.type === "possessions") {
    const items = Array.isArray(answer) && answer.length ? answer : [{ item: "", recipient: "", location: "", note: "", photo: "", photoName: "" }];
    const updateItem = (index, field, nextValue) => {
      setAnswer(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, [field]: nextValue } : entry));
    };
    const updateItemFields = (index, changes) => {
      setAnswer(items.map((entry, itemIndex) => itemIndex === index ? { ...entry, ...changes } : entry));
    };
    const addItem = () => setAnswer([...items, { item: "", recipient: "", location: "", note: "", photo: "", photoName: "" }]);
    const removeItem = (index) => setAnswer(items.filter((_, itemIndex) => itemIndex !== index));
    return <div className="possession-answer">
      {items.map((entry, index) => <section className="possession-entry" key={index}>
        <header><span><Icon name="gift" size={18} /></span><strong>Possession {index + 1}</strong>{items.length > 1 && <button onClick={() => removeItem(index)}>Remove</button>}</header>
        <div>
          <label>What is it?<input value={entry.item} onChange={(event) => updateItem(index, "item", event.target.value)} placeholder="Grandmother’s ring" /></label>
          <label>Who should receive it?<input value={entry.recipient} onChange={(event) => updateItem(index, "recipient", event.target.value)} placeholder="Emma Morgan" /></label>
          <label>Where is it kept?<input value={entry.location} onChange={(event) => updateItem(index, "location", event.target.value)} placeholder="Jewelry box in the bedroom" /></label>
          <label>Personal note <span>Optional</span><textarea value={entry.note} onChange={(event) => updateItem(index, "note", event.target.value)} placeholder="Why this belongs with them…" /></label>
          <KeepsakePhoto entry={entry} index={index} onChange={(changes) => updateItemFields(index, changes)} />
        </div>
      </section>)}
      <button className="add-possession" onClick={addItem}><Icon name="plus" /> Add another possession</button>
      <p className="possession-legal-note"><Icon name="file" size={17} /> Personal wishes are helpful, but legally significant gifts should also be included in an estate plan.</p>
    </div>;
  }
  if (question.type === "voice") {
    return <div className="voice-answer">
      <div className={`voice-orb ${answer ? "recorded" : ""}`}><button onClick={() => setAnswer(answer ? "" : "recorded")}><Icon name={answer ? "check" : "mic"} size={27} /></button><i /><i /></div>
      <strong>{answer ? "A little hello is ready" : "Tap to record a demo message"}</strong>
      <p>{answer ? "0:14 · For my family" : "Nothing has to be perfect. Just sound like you."}</p>
      {answer && <div className="voice-wave">{Array.from({ length: 24 }).map((_, i) => <i key={i} style={{ height: `${6 + ((i * 7) % 19)}px` }} />)}</div>}
    </div>;
  }
  return null;
}

function SetupJourney({ onComplete, onExit, explorer }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [points, setPoints] = useState(0);
  const [uploaded, setUploaded] = useState("");
  const [reward, setReward] = useState(null);
  const question = questions[current];
  const answer = answers[current];
  useScrollToTop(current);
  const completedChapters = new Set(questions.slice(0, current).map((q) => q.chapter)).size;
  const canContinue = useMemo(() => {
    if (!answer) return false;
    if (Array.isArray(answer)) {
      if (!answer.length) return false;
      if (typeof answer[0] === "object") return answer.some((entry) => Object.values(entry).some(Boolean));
      return true;
    }
    if (typeof answer === "object") return Object.values(answer).some(Boolean);
    return String(answer).trim().length > 0;
  }, [answer]);

  const continueJourney = () => {
    if (!canContinue) return;
    const earned = question.reward;
    setPoints((value) => value + earned);
    setReward(earned);
    window.setTimeout(() => {
      setReward(null);
      if (current === questions.length - 1) onComplete(points + earned);
      else setCurrent((value) => value + 1);
    }, 780);
  };

  return (
    <main className="journey-screen">
      <JourneyHeader current={current} points={points} onExit={onExit} />
      <section className="journey-layout">
        <aside className="journey-place">
          <div className="journey-place-copy"><span>YOUR PLACE</span><strong>{Math.round((current / questions.length) * 100)}% lit</strong></div>
          <WorldMap chapter={question.chapter} explorer={explorer} compact />
          <div className="next-unlock"><span><Icon name={chapters[question.chapter].icon} size={17} /></span><div><small>NOW BUILDING</small><strong>{chapters[question.chapter].name}</strong></div></div>
        </aside>
        <article className="question-stage" key={current}>
          <div className="question-counter"><span>Question {current + 1} of {questions.length}</span><i><b style={{ width: `${((current + 1) / questions.length) * 100}%` }} /></i><small>About 4 min left</small></div>
          <p className="question-eyebrow">{question.eyebrow}</p>
          <h1>{question.title}</h1>
          <p className="question-copy">{question.copy}</p>
          <QuestionBody question={question} answer={answer} setAnswer={(value) => setAnswers({ ...answers, [current]: value })} uploaded={uploaded} setUploaded={setUploaded} />
          <div className="question-actions">
            <button className="back-button" disabled={current === 0} onClick={() => setCurrent((value) => Math.max(0, value - 1))}><Icon name="back" size={18} /> Back</button>
            <button className="continue-button" disabled={!canContinue} onClick={continueJourney}>Save & continue <Icon name="arrow" size={18} /></button>
          </div>
          <button className="skip-question" onClick={() => current === questions.length - 1 ? onComplete(points) : setCurrent((value) => value + 1)}>I’ll come back to this</button>
        </article>
      </section>
      {reward && <div className="reward-pop"><span><Icon name="spark" size={24} /></span><strong>+{reward} glow</strong><small>Your OnePlace just got brighter</small></div>}
    </main>
  );
}

function Complete({ points, onEnter, explorer }) {
  return (
    <main className="complete-screen">
      <div className="confetti">{Array.from({ length: 18 }).map((_, i) => <i key={i} />)}</div>
      <Logo light />
      <section>
        <div className="complete-art"><WorldMap chapter={5} explorer={explorer} compact /></div>
        <div className="complete-copy">
          <span className="hello-pill"><Icon name="spark" size={15} /> First path complete</span>
          <h1>Look what you’ve<br />already made.</h1>
          <p>Your family now has a starting point. Keep going whenever you’re ready—OnePlace remembers the path.</p>
          <div className="complete-stats"><div><strong>{points}</strong><span>glow earned</span></div><div><strong>6</strong><span>places discovered</span></div><div><strong>1</strong><span>person protected</span></div></div>
          <button className="journey-button" onClick={onEnter}>Enter my OnePlace <Icon name="arrow" /></button>
        </div>
      </section>
    </main>
  );
}

function AppHeader({ active, setActive, onJourney, explorer }) {
  const [menu, setMenu] = useState(false);
  const items = ["My path", "My things", "My people", "Messages"];
  return (
    <header className="app-header">
      <Logo />
      <nav className={menu ? "open" : ""}>{items.map((item) => <button className={active === item ? "active" : ""} onClick={() => { setActive(item); setMenu(false); }} key={item}>{item}</button>)}</nav>
      <div className="app-header-actions"><span><Icon name="spark" size={15} /> 95 glow</span><button onClick={onJourney}>Continue my path</button><div className="app-avatar"><Explorer explorer={explorer} size={32} /></div><button className="mobile-menu" onClick={() => setMenu(!menu)}><Icon name={menu ? "close" : "menu"} /></button></div>
    </header>
  );
}

const pathStops = [
  { chapter: "The essentials", title: "Make your legal papers easy to find", copy: "Will, identification, powers of attorney", icon: "file", state: "complete", count: "3 of 3" },
  { chapter: "Money map", title: "Leave a clear trail—not a treasure hunt", copy: "Banking, investments, debts and bills", icon: "bank", state: "current", count: "2 of 6" },
  { chapter: "Protection", title: "Connect the policies that protect your family", copy: "Life, disability, medical and care wishes", icon: "shield", state: "", count: "1 of 6" },
  { chapter: "Digital keys", title: "Show them how to reach your digital life", copy: "Devices, accounts and recovery access", icon: "key", state: "", count: "0 of 4" },
  { chapter: "Only you", title: "Leave the stories no document can tell", copy: "Voice notes, letters and personal wishes", icon: "heart", state: "", count: "1 of 5" },
];

function PathHome({ onContinue, explorer }) {
  return (
    <div className="path-page">
      <section className="path-intro">
        <div><span className="hello-pill"><i /> Wednesday’s small win</span><h1>Your place is<br /><em>42% glowing.</em></h1><p>One thoughtful answer today will make the path clearer for your family tomorrow.</p><button className="continue-button" onClick={onContinue}>Take today’s 3-minute step <Icon name="arrow" /></button></div>
        <WorldMap chapter={2} explorer={explorer} compact />
      </section>
      <section className="today-quest">
        <div className="quest-number"><span>+20</span><small>GLOW</small></div>
        <div><p>TODAY’S STEP · MONEY MAP</p><h2>Add where your retirement account is held.</h2><span>We only need the institution to start. Details can come later.</span></div>
        <button onClick={onContinue}>Let’s do it <Icon name="arrow" /></button>
      </section>
      <section className="path-section">
        <div className="path-heading"><div><p>YOUR JOURNEY</p><h2>A little clearer with every stop.</h2></div><span>7 of 23 essentials cared for</span></div>
        <div className="winding-path">
          <svg viewBox="0 0 900 720" preserveAspectRatio="none" aria-hidden="true"><path d="M160 0 C160 100 730 70 730 190 S170 285 170 390 S730 480 730 570 S380 690 160 720" /></svg>
          {pathStops.map((stop, index) => <article className={`path-stop stop-${index} ${stop.state}`} key={stop.chapter}>
            <span className="stop-icon">{stop.state === "complete" ? <Icon name="check" /> : <Icon name={stop.icon} />}</span>
            <div><p>{stop.chapter}</p><h3>{stop.title}</h3><span>{stop.copy}</span></div>
            <small>{stop.count}</small>
            {stop.state === "current" && <button onClick={onContinue}>Continue <Icon name="arrow" size={15} /></button>}
          </article>)}
        </div>
      </section>
      <section className="achievement-strip">
        <div><Icon name="gift" size={27} /><span><small>NEW KEEPSAKE</small><strong>The Trail Starter</strong></span></div>
        <p>You mapped your first account and gave your family a clear place to begin.</p>
        <div className="badge-stack"><i /><i /><i /><span>+2</span></div>
      </section>
    </div>
  );
}

function ThingsPage({ onContinue, onPossessions }) {
  const rooms = [
    ["file", "Paper Port", "3 items", "Your important papers are in good order", "red"],
    ["bank", "Money Meadow", "2 items", "Four steps will make the trail clear", "purple"],
    ["shield", "Safety Harbor", "1 item", "Add life or disability insurance next", "blue"],
    ["key", "Mount Vault", "Not started", "Vault codes, devices and digital access", "iris"],
    ["heart", "Memory Lake", "1 message", "Stories and wishes in your own words", "pink"],
    ["gift", "Possessions & keepsakes", "2 wishes", "Meaningful belongings and who should receive them", "plum"],
  ];
  return <div className="collection-page"><header><p>MY THINGS</p><h1>Every part of your life,<br />given a proper place.</h1><span>Seven items are safely organized in this concept.</span></header><div className="room-shelf">{rooms.map(([icon, name, count, copy, color], i) => <button className={`room-block room-${color}`} onClick={name === "Possessions & keepsakes" ? onPossessions : undefined} key={name}><span className="room-number">0{i + 1}</span><span className="room-icon"><Icon name={icon} /></span><small>{count}</small><strong>{name}</strong><p>{copy}</p><i><Icon name="arrow" /></i></button>)}</div><button className="floating-add" onClick={onContinue}><Icon name="plus" /> Add something</button></div>;
}

function KeepsakePhoto({ entry, index, onChange }) {
  const photoRef = useRef(null);
  const choosePhoto = () => photoRef.current?.click();
  const addPhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      onChange({ photo: reader.result, photoName: file.name });
    });
    reader.readAsDataURL(file);
    event.target.value = "";
  };
  const removePhoto = () => {
    onChange({ photo: "", photoName: "" });
  };
  const itemName = entry.item.trim() || `possession ${index + 1}`;

  return (
    <div className={`keepsake-photo ${entry.photo ? "has-photo" : ""}`}>
      <input
        ref={photoRef}
        className="keepsake-photo-input"
        type="file"
        accept="image/*"
        capture="environment"
        onChange={addPhoto}
        aria-label={`Take or add a photo of ${itemName}`}
      />
      {entry.photo ? (
        <>
          <img src={entry.photo} alt={`Preview of ${itemName}`} />
          <div className="keepsake-photo-copy">
            <span><Icon name="check" size={17} /> Photo added</span>
            <strong>{entry.photoName || "Keepsake photo"}</strong>
            <small>Kept only in this browser session.</small>
          </div>
          <div className="keepsake-photo-actions">
            <button onClick={choosePhoto}><Icon name="camera" size={18} /> Change photo</button>
            <button className="remove-photo" onClick={removePhoto}>Remove photo</button>
          </div>
        </>
      ) : (
        <button className="add-keepsake-photo" onClick={choosePhoto}>
          <span><Icon name="camera" size={24} /></span>
          <span><strong>Take or add a photo</strong><small>Use your camera or choose an existing picture. The photo stays in this browser session.</small></span>
          <Icon name="plus" size={20} />
        </button>
      )}
    </div>
  );
}

function PossessionsPage({ onBack }) {
  const [items, setItems] = useState([
    { id: 1, item: "Grandmother’s ring", recipient: "Emma", location: "Jewelry box", note: "Tell her the story of our first family reunion.", photo: "", photoName: "" },
    { id: 2, item: "Dad’s woodworking tools", recipient: "Jack", location: "Garage cabinet", note: "Keep the small hand plane in the family.", photo: "", photoName: "" },
  ]);
  const updateItem = (id, field, value) => setItems((currentItems) => currentItems.map((item) => item.id === id ? { ...item, [field]: value } : item));
  const addItem = () => setItems((currentItems) => [...currentItems, { id: Date.now(), item: "", recipient: "", location: "", note: "", photo: "", photoName: "" }]);
  const removeItem = (id) => setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  return (
    <div className="possessions-page">
      <button className="possessions-back" onClick={onBack}><Icon name="back" /> Back to My Things</button>
      <header>
        <div><p>POSSESSIONS & KEEPSAKES</p><h1>Who gets what,<br />made clear.</h1><span>Record the belongings that matter and the people you want to receive them.</span></div>
        <aside><Icon name="gift" size={30} /><strong>{items.length} wishes</strong><span>Saved in this concept</span></aside>
      </header>
      <section className="keepsake-list" aria-label="Possessions and recipients">
        {items.map((entry, index) => <article className="keepsake-card" key={entry.id}>
          <div className="keepsake-number"><span>{String(index + 1).padStart(2, "0")}</span><Icon name="gift" /></div>
          <div className="keepsake-fields">
            <label>Possession<input value={entry.item} onChange={(event) => updateItem(entry.id, "item", event.target.value)} placeholder="What would you like to leave?" /></label>
            <label>Who should receive it?<input value={entry.recipient} onChange={(event) => updateItem(entry.id, "recipient", event.target.value)} placeholder="Name or relationship" /></label>
            <label>Where is it kept?<input value={entry.location} onChange={(event) => updateItem(entry.id, "location", event.target.value)} placeholder="Help them find it" /></label>
            <label className="keepsake-note">Personal note <span>Optional</span><textarea value={entry.note} onChange={(event) => updateItem(entry.id, "note", event.target.value)} placeholder="Share the story or meaning behind it…" /></label>
            <KeepsakePhoto entry={entry} index={index} onChange={(changes) => setItems((currentItems) => currentItems.map((item) => item.id === entry.id ? { ...item, ...changes } : item))} />
          </div>
          <button className="remove-keepsake" onClick={() => removeItem(entry.id)} aria-label={`Remove possession ${index + 1}`}><Icon name="close" /> Remove</button>
        </article>)}
      </section>
      <button className="add-keepsake" onClick={addItem}><Icon name="plus" /> Add another possession</button>
      <div className="keepsake-guidance"><Icon name="file" /><p><strong>A helpful list, not a legal substitute.</strong><span>For valuable or legally significant gifts, include the same wishes in your will or trust and review them with an estate professional.</span></p></div>
    </div>
  );
}

function PeoplePage() {
  return <div className="people-page"><header><p>MY PEOPLE</p><h1>A circle built on trust.</h1><span>Each person sees only what you choose, when you choose.</span></header><section className="people-orbit"><div className="orbit-center"><span className="brand-door"><i /></span><strong>Your<br />OnePlace</strong></div><i className="orbit-line line-a" /><i className="orbit-line line-b" /><div className="orbit-person person-one"><span>DM</span><strong>Daniel</strong><small>12 items · access now</small></div><div className="orbit-person person-two"><span>EM</span><strong>Emma</strong><small>5 items · when needed</small></div><div className="orbit-person person-three"><span>JM</span><strong>Jack</strong><small>5 items · when needed</small></div><button className="orbit-add"><Icon name="plus" /> Invite someone</button></section><div className="trust-note"><Icon name="shield" /><div><strong>You are always in control.</strong><p>Adding someone never gives them automatic access. Every item has its own sharing choice.</p></div><button>Review access</button></div></div>;
}

function MessagesPage() {
  return <div className="messages-page"><header><p>MESSAGES</p><h1>Leave more than instructions.</h1><span>Your voice, your stories, your way of saying what matters.</span></header><section className="message-stage"><div className="record-disc"><button><Icon name="play" size={30} /></button><i /><i /></div><div><small>FOR MY FAMILY · 0:14</small><h2>“There are a few things I hope you’ll always remember...”</h2><div className="big-wave">{Array.from({ length: 38 }).map((_, i) => <i key={i} style={{ height: `${7 + ((i * 11) % 29)}px` }} />)}</div><button><Icon name="mic" /> Record another message</button></div></section><section className="message-prompts"><p>NOT SURE WHAT TO SAY?</p><div>{["Tell the story behind something you treasure.", "Share a family tradition you hope continues.", "Say what you’re most proud of.", "Leave advice for a future milestone."].map((prompt, i) => <button key={prompt}><span>0{i + 1}</span><strong>{prompt}</strong><Icon name="arrow" /></button>)}</div></section></div>;
}

function MainApp({ onRestart, explorer }) {
  const [active, setActive] = useState("My path");
  const [resume, setResume] = useState(false);
  useScrollToTop(active);
  return (
    <main className="main-app">
      <AppHeader active={active === "Possessions" ? "My things" : active} setActive={setActive} onJourney={() => setResume(true)} explorer={explorer} />
      {active === "My path" && <PathHome onContinue={() => setResume(true)} explorer={explorer} />}
      {active === "My things" && <ThingsPage onContinue={() => setResume(true)} onPossessions={() => setActive("Possessions")} />}
      {active === "Possessions" && <PossessionsPage onBack={() => setActive("My things")} />}
      {active === "My people" && <PeoplePage />}
      {active === "Messages" && <MessagesPage />}
      <footer className="app-footer"><Logo /><p>Everything that matters, ready for the people who matter.</p><button onClick={onRestart}><Icon name="logout" size={15} /> Replay first-time experience</button></footer>
      {resume && <MiniQuest onClose={() => setResume(false)} />}
    </main>
  );
}

function MiniQuest({ onClose }) {
  const [done, setDone] = useState(false);
  return <div className="quest-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className="mini-quest"><button className="quest-close" onClick={onClose}><Icon name="close" /></button>{done ? <div className="mini-done"><span><Icon name="spark" size={27} /></span><p>+20 GLOW</p><h2>Another light is on.</h2><p>Your family will know exactly where to begin.</p><button className="continue-button" onClick={onClose}>Back to my path <Icon name="arrow" /></button></div> : <><p className="question-eyebrow">TODAY’S 3-MINUTE STEP</p><h2>Where is your retirement account held?</h2><p>You can add more detail later. The institution is enough for today.</p><div className="quick-options">{["Fidelity", "Vanguard", "Charles Schwab", "Another institution"].map((x) => <button onClick={() => setDone(true)} key={x}><span>{x.slice(0, 2).toUpperCase()}</span><strong>{x}</strong><Icon name="arrow" /></button>)}</div><button className="skip-question" onClick={onClose}>Not today</button></>}</div></div>;
}

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [points, setPoints] = useState(0);
  const [explorer, setExplorer] = useState(explorers[0]);
  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    let touchStartY = 0;
    const handleTouchStart = (event) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };
    const handleTouchMove = (event) => {
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      if (window.scrollY <= 0 && currentY > touchStartY) {
        event.preventDefault();
      }
    };
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.history.scrollRestoration = previousRestoration;
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
  useScrollToTop(screen);
  if (screen === "welcome") return <Welcome onStart={() => setScreen("intro")} onPreview={() => setScreen("app")} />;
  if (screen === "intro") return <JourneyIntro onSkip={() => setScreen("avatar")} onContinue={() => setScreen("avatar")} />;
  if (screen === "avatar") return <AvatarPicker onBack={() => setScreen("intro")} onChoose={(value) => { setExplorer(value); setScreen("journey"); }} />;
  if (screen === "journey") return <SetupJourney explorer={explorer} onExit={() => setScreen("welcome")} onComplete={(value) => { setPoints(value); setScreen("complete"); }} />;
  if (screen === "complete") return <Complete explorer={explorer} points={points} onEnter={() => setScreen("app")} />;
  return <MainApp explorer={explorer} onRestart={() => setScreen("welcome")} />;
}
