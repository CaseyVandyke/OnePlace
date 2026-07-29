import { useMemo, useState } from "react";

const icons = {
  home: "M3 10.8 12 3l9 7.8V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.8Z",
  vault: "M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm4 9h8m-4-4v8",
  people: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  message: "M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4",
  settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.09A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.09A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.4 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.12.37.34.72.6 1 .3.3.68.5 1.1.6h.09v4h-.09a1.7 1.7 0 0 0-1.7.4Z",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6M8 13h8M8 17h6",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z",
  bank: "M3 10h18M5 10v8m4-8v8m6-8v8m4-8v8M3 21h18M12 3 3 7h18l-9-4Z",
  key: "M21 2 13.6 9.4a5 5 0 1 0 1 3.6L17 11h2V9h2V7h2V2h-2ZM7.5 17.5h.01",
  house: "M3 11 12 3l9 8M5 10v11h14V10M9 21v-7h6v7",
  chevron: "m9 18 6-6-6-6",
  plus: "M12 5v14M5 12h14",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  lock: "M6 10V7a6 6 0 0 1 12 0v3m1 0H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Z",
  play: "m8 5 11 7-11 7V5Z",
  check: "m5 12 4 4L19 6",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-16v6l4 2",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  search: "m21 21-4.35-4.35M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  menu: "M4 6h16M4 12h16M4 18h16",
  x: "M18 6 6 18M6 6l12 12",
};

function Icon({ name, size = 20, strokeWidth = 1.8 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icons[name]} />
    </svg>
  );
}

const navItems = [
  ["home", "Home"],
  ["vault", "My OnePlace"],
  ["people", "My People"],
  ["message", "Messages"],
  ["shield", "Access plan"],
];

const categories = [
  { icon: "file", name: "Important documents", count: 8, tone: "rose", detail: "Will, IDs & certificates" },
  { icon: "bank", name: "Money & accounts", count: 6, tone: "violet", detail: "Banking, retirement & debts" },
  { icon: "heart", name: "Insurance & care", count: 4, tone: "blue", detail: "Policies & medical wishes" },
  { icon: "house", name: "Home & property", count: 5, tone: "plum", detail: "Property, vehicles & utilities" },
  { icon: "key", name: "Digital life", count: 11, tone: "indigo", detail: "Accounts, devices & access" },
  { icon: "message", name: "Personal wishes", count: 3, tone: "coral", detail: "Messages, memories & plans" },
];

const people = [
  { initials: "DM", name: "Daniel Morgan", role: "Spouse", color: "blue", access: "12 items" },
  { initials: "EM", name: "Emma Morgan", role: "Daughter", color: "rose", access: "5 items" },
  { initials: "JM", name: "Jack Morgan", role: "Son", color: "violet", access: "5 items" },
];

const recent = [
  { icon: "file", name: "Last will & testament", meta: "Important documents · PDF", time: "Updated today" },
  { icon: "bank", name: "Mountain West Credit Union", meta: "Money & accounts · Account", time: "Updated Monday" },
  { icon: "heart", name: "Life insurance policy", meta: "Insurance & care · PDF", time: "Updated Jul 18" },
];

const vaultItems = [
  ...recent,
  { icon: "house", name: "Home deed and mortgage", meta: "Home & property · 3 files", time: "Updated Jul 12" },
  { icon: "key", name: "Password vault recovery", meta: "Digital life · Secure note", time: "Updated Jul 8" },
  { icon: "message", name: "My funeral wishes", meta: "Personal wishes · Note", time: "Updated Jun 30" },
];

function Logo() {
  return (
    <div className="logo">
      <span className="logo-mark"><span /></span>
      <span>oneplace</span>
    </div>
  );
}

function Sidebar({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="sidebar-top">
          <Logo />
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu"><Icon name="x" /></button>
        </div>
        <nav>
          <p className="nav-label">Your space</p>
          {navItems.map(([icon, label]) => (
            <button
              key={label}
              className={page === label ? "active" : ""}
              onClick={() => { setPage(label); setMobileOpen(false); }}
            >
              <Icon name={icon} />
              <span>{label}</span>
              {label === "My OnePlace" && <small>37</small>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="privacy-note">
            <span><Icon name="lock" size={16} /></span>
            <div><strong>Private by design</strong><p>Your choices stay yours.</p></div>
          </div>
          <button className="settings-button"><Icon name="settings" /><span>Settings</span></button>
          <div className="profile">
            <div className="avatar avatar-main">MM</div>
            <div><strong>Mara Morgan</strong><span>Personal plan</span></div>
            <Icon name="chevron" size={16} />
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({ setMobileOpen, onAdd }) {
  return (
    <header className="topbar">
      <button className="menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
      <div className="mobile-logo"><Logo /></div>
      <div className="top-actions">
        <span className="demo-pill">Concept demo</span>
        <button className="icon-button" aria-label="Notifications"><Icon name="bell" size={19} /><i /></button>
        <button className="primary small" onClick={onAdd}><Icon name="plus" size={17} /> Add something</button>
      </div>
    </header>
  );
}

function ProgressRing({ value = 68, size = 118 }) {
  const radius = 49;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 112 112">
        <circle className="ring-bg" cx="56" cy="56" r={radius} />
        <circle
          className="ring-value"
          cx="56"
          cy="56"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
        />
      </svg>
      <div><strong>{value}%</strong><span>ready</span></div>
    </div>
  );
}

function HomePage({ setPage, openJourney, openAdd }) {
  return (
    <div className="page home-page">
      <section className="welcome">
        <div>
          <p className="eyebrow">Wednesday, July 29</p>
          <h1>Good morning, Mara.</h1>
          <p>You’re making life a little easier for the people you love.</p>
        </div>
        <button className="text-button"><Icon name="shield" size={18} /> Your information is protected</button>
      </section>

      <section className="readiness-card">
        <div className="readiness-copy">
          <span className="soft-badge"><i /> Your readiness</span>
          <h2>You’ve already made meaningful progress.</h2>
          <p>Three more small steps will bring your essential plan to 80%.</p>
          <button className="primary" onClick={openJourney}>Continue my plan <Icon name="arrow" size={18} /></button>
        </div>
        <div className="readiness-visual">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="orb orb-three" />
          <div className="glow-path"><i /><i /><i /><i /><i /></div>
          <ProgressRing />
          <p><Icon name="check" size={15} /> 23 of 34 essentials added</p>
        </div>
      </section>

      <div className="section-heading">
        <div><p className="eyebrow">Everything, organized</p><h2>Your OnePlace</h2></div>
        <button className="link-button" onClick={() => setPage("My OnePlace")}>View everything <Icon name="arrow" size={17} /></button>
      </div>
      <section className="category-grid">
        {categories.map((category) => (
          <button className="category-card" key={category.name} onClick={() => setPage("My OnePlace")}>
            <span className={`category-icon ${category.tone}`}><Icon name={category.icon} /></span>
            <span className="category-count">{category.count}</span>
            <strong>{category.name}</strong>
            <small>{category.detail}</small>
            <span className="card-arrow"><Icon name="arrow" size={17} /></span>
          </button>
        ))}
      </section>

      <section className="two-column">
        <div className="panel">
          <div className="panel-head">
            <div><p className="eyebrow">Your circle</p><h3>People you trust</h3></div>
            <button className="link-button" onClick={() => setPage("My People")}>Manage</button>
          </div>
          <div className="people-stack">
            {people.map((person) => (
              <div className="person-row" key={person.name}>
                <span className={`avatar ${person.color}`}>{person.initials}</span>
                <div><strong>{person.name}</strong><span>{person.role}</span></div>
                <small>{person.access}</small>
                <Icon name="chevron" size={17} />
              </div>
            ))}
          </div>
          <button className="quiet-button full" onClick={() => setPage("My People")}><Icon name="plus" size={16} /> Add someone you trust</button>
        </div>

        <div className="panel message-panel">
          <div className="panel-head">
            <div><p className="eyebrow">In your own words</p><h3>Leave something personal</h3></div>
            <span className="category-icon coral"><Icon name="message" /></span>
          </div>
          <p>Record a thought, tell a story, or simply say what matters most.</p>
          <div className="recording">
            <button aria-label="Play message"><Icon name="play" size={18} /></button>
            <div><strong>For my family</strong><span><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></span></div>
            <small>1:42</small>
          </div>
          <button className="quiet-button full" onClick={() => setPage("Messages")}><Icon name="plus" size={16} /> Create a message</button>
        </div>
      </section>

      <section className="recent-section">
        <div className="section-heading compact">
          <div><p className="eyebrow">Recently cared for</p><h2>Latest updates</h2></div>
        </div>
        <div className="recent-list">
          {recent.map((item) => <ItemRow item={item} key={item.name} />)}
          <button className="add-row" onClick={openAdd}><span><Icon name="plus" /></span><div><strong>Add something important</strong><small>It only takes a minute or two</small></div><Icon name="arrow" size={18} /></button>
        </div>
      </section>
    </div>
  );
}

function ItemRow({ item }) {
  return (
    <button className="item-row">
      <span className="item-icon"><Icon name={item.icon} /></span>
      <div><strong>{item.name}</strong><small>{item.meta}</small></div>
      <time>{item.time}</time>
      <Icon name="chevron" size={18} />
    </button>
  );
}

function VaultPage({ openAdd }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => vaultItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())), [search]);
  return (
    <div className="page inner-page">
      <div className="inner-hero">
        <div><p className="eyebrow">Your private space</p><h1>My OnePlace</h1><p>Everything important, thoughtfully organized and easy to find.</p></div>
        <button className="primary" onClick={openAdd}><Icon name="plus" size={17} /> Add something</button>
      </div>
      <div className="overview-strip">
        <div><strong>37</strong><span>items protected</span></div>
        <div><strong>6</strong><span>categories</span></div>
        <div><strong>3</strong><span>trusted people</span></div>
        <div className="overview-safe"><Icon name="shield" /><strong>All secure</strong><span>Last reviewed today</span></div>
      </div>
      <div className="vault-tools">
        <label><Icon name="search" size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your OnePlace" /></label>
        <div>{["All", "Documents", "Accounts", "Wishes"].map((name) => <button key={name} className={filter === name ? "active" : ""} onClick={() => setFilter(name)}>{name}</button>)}</div>
      </div>
      <div className="vault-layout">
        <div className="vault-list panel">
          <div className="panel-head"><div><p className="eyebrow">Your essentials</p><h3>{filtered.length} items</h3></div><span className="view-note">Updated recently</span></div>
          {filtered.map((item) => <ItemRow item={item} key={item.name} />)}
          {!filtered.length && <div className="empty-state"><Icon name="search" /><strong>Nothing found</strong><p>Try a different search.</p></div>}
        </div>
        <aside className="vault-aside">
          <div className="panel gentle-card">
            <span className="category-icon violet"><Icon name="heart" /></span>
            <p className="eyebrow">A gentle suggestion</p>
            <h3>Add your healthcare wishes</h3>
            <p>Help your family understand what matters to you if they ever need to make decisions.</p>
            <button className="quiet-button full" onClick={openAdd}>Add my wishes</button>
          </div>
          <div className="panel mini-progress">
            <div><strong>68%</strong><span>readiness</span></div>
            <p><span style={{ width: "68%" }} /></p>
            <small>You’re making wonderful progress.</small>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PeoplePage() {
  return (
    <div className="page inner-page">
      <div className="inner-hero">
        <div><p className="eyebrow">Your trusted circle</p><h1>My People</h1><p>You decide who can see what—and when they can see it.</p></div>
        <button className="primary"><Icon name="plus" size={17} /> Invite someone</button>
      </div>
      <section className="people-grid">
        {people.map((person, index) => (
          <article className="person-card panel" key={person.name}>
            <div className="person-card-top">
              <span className={`avatar large ${person.color}`}>{person.initials}</span>
              <span className={index === 0 ? "status live" : "status"}>{index === 0 ? "Access now" : "When needed"}</span>
            </div>
            <h3>{person.name}</h3><p>{person.role}</p>
            <div className="access-summary"><Icon name="lock" size={17} /><span><strong>{person.access}</strong> shared privately</span></div>
            <button className="quiet-button full">Review their access <Icon name="arrow" size={16} /></button>
          </article>
        ))}
        <button className="invite-card">
          <span><Icon name="plus" /></span><strong>Add someone you trust</strong><p>You can change their access anytime.</p>
        </button>
      </section>
      <section className="panel access-explainer">
        <div className="access-illustration"><span><Icon name="shield" size={30} /></span><i /><i /><i /></div>
        <div><p className="eyebrow">You stay in control</p><h2>Private until you say otherwise.</h2><p>Share selected information today, prepare emergency access, or arrange for information to become available only after a carefully verified life event.</p></div>
        <button className="quiet-button">See how access works</button>
      </section>
    </div>
  );
}

function MessagesPage() {
  return (
    <div className="page inner-page">
      <div className="inner-hero">
        <div><p className="eyebrow">In your own words</p><h1>Messages</h1><p>Stories, guidance, and love—saved for the people who matter most.</p></div>
        <button className="primary"><Icon name="plus" size={17} /> Create a message</button>
      </div>
      <div className="message-feature">
        <div className="message-feature-art"><span><Icon name="message" size={32} /></span><i className="wave-a" /><i className="wave-b" /></div>
        <div><span className="soft-badge">A message for everyone</span><h2>For my family</h2><p>“There are a few things I hope you’ll always remember...”</p>
          <div className="audio-player"><button><Icon name="play" /></button><div><span><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></span><small>0:00</small><small>1:42</small></div></div>
        </div>
      </div>
      <div className="section-heading"><div><p className="eyebrow">Saved with care</p><h2>Your messages</h2></div><button className="link-button">View all</button></div>
      <section className="message-grid">
        {[
          ["EM", "For Emma", "A note for your wedding day", "Written note", "rose"],
          ["JM", "For Jack", "The story behind Grandpa’s watch", "Audio · 3:08", "violet"],
          ["DM", "For Daniel", "Things I never want you to forget", "Written note", "blue"],
        ].map(([initials, title, copy, type, color]) => (
          <article className="message-card panel" key={title}><span className={`avatar ${color}`}>{initials}</span><small>{type}</small><h3>{title}</h3><p>{copy}</p><button className="link-button">Open message <Icon name="arrow" size={15} /></button></article>
        ))}
      </section>
    </div>
  );
}

function AccessPage() {
  return (
    <div className="page inner-page">
      <div className="inner-hero">
        <div><p className="eyebrow">Prepared, your way</p><h1>Access plan</h1><p>Choose how the right information reaches the right people.</p></div>
        <button className="primary">Review my plan</button>
      </div>
      <section className="access-timeline panel">
        <div className="timeline-intro"><span className="category-icon blue"><Icon name="shield" /></span><h2>Your plan at a glance</h2><p>You can adjust these choices at any time.</p></div>
        {[
          ["check", "Shared access", "Daniel can access 12 selected items now.", "Complete"],
          ["clock", "Emergency access", "A 72-hour waiting period gives you time to decline.", "Set up"],
          ["shield", "Legacy access", "Requires two verifiers and supporting documentation.", "Review"],
        ].map(([icon, title, copy, action], i) => (
          <div className="timeline-step" key={title}><span className={`step-dot step-${i}`}><Icon name={icon} size={17} /></span><div><strong>{title}</strong><p>{copy}</p></div><button>{action}</button></div>
        ))}
      </section>
      <section className="two-column access-bottom">
        <div className="panel checklist-card"><p className="eyebrow">Your safeguards</p><h3>A plan built around certainty</h3>{["Owner notifications on every request", "Waiting period before emergency release", "Two trusted verifiers required", "A complete access history"].map((x) => <p className="checkline" key={x}><span><Icon name="check" size={14} /></span>{x}</p>)}</div>
        <div className="panel calm-card"><Icon name="heart" /><p className="eyebrow">Peace of mind</p><h3>Nothing happens silently.</h3><p>OnePlace checks, waits, and verifies before protected information is ever released.</p><button className="link-button">Learn about verification <Icon name="arrow" size={16} /></button></div>
      </section>
    </div>
  );
}

function JourneyModal({ onClose }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: "heart", kicker: "A small step today", title: "Who should speak for your healthcare wishes?", copy: "Choose someone you trust to understand your values and make decisions if you cannot.", options: ["Daniel Morgan", "Someone else", "I’m not sure yet"] },
    { icon: "file", kicker: "One more detail", title: "Do you have an advance healthcare directive?", copy: "You can upload it now, note where it’s kept, or come back to this later.", options: ["Yes, I’ll add it", "Not yet", "I’m not sure"] },
    { icon: "check", kicker: "Beautifully done", title: "Your care plan is taking shape.", copy: "We saved your choices. You can review or change them whenever life changes.", options: [] },
  ];
  const current = steps[step];
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="journey-modal" role="dialog" aria-modal="true" aria-label="Continue your plan">
        <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
        <div className="modal-progress">{steps.map((_, i) => <span key={i} className={i <= step ? "filled" : ""} />)}</div>
        <span className="modal-icon"><Icon name={current.icon} size={28} /></span>
        <p className="eyebrow">{current.kicker}</p><h2>{current.title}</h2><p>{current.copy}</p>
        {current.options.length > 0 ? <div className="choice-list">{current.options.map((option, i) => <button key={option} onClick={() => setStep(step + 1)}><span>{i === 0 ? "DM" : <Icon name={i === 1 ? "plus" : "clock"} size={16} />}</span>{option}<Icon name="arrow" size={16} /></button>)}</div> : <button className="primary modal-done" onClick={onClose}>Back to my home <Icon name="arrow" size={17} /></button>}
        {step < 2 && <button className="skip" onClick={() => setStep(step + 1)}>I’ll do this later</button>}
      </div>
    </div>
  );
}

function AddModal({ onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="add-modal" role="dialog" aria-modal="true" aria-label="Add something">
        <button className="modal-close" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
        <p className="eyebrow">Add to your OnePlace</p><h2>What would you like to care for?</h2><p>Choose a starting point. We’ll guide you through the rest.</p>
        <div className="add-grid">{categories.map((category) => <button key={category.name} onClick={onClose}><span className={`category-icon ${category.tone}`}><Icon name={category.icon} /></span><strong>{category.name}</strong><Icon name="arrow" size={16} /></button>)}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const pages = {
    Home: <HomePage setPage={setPage} openJourney={() => setJourneyOpen(true)} openAdd={() => setAddOpen(true)} />,
    "My OnePlace": <VaultPage openAdd={() => setAddOpen(true)} />,
    "My People": <PeoplePage />,
    Messages: <MessagesPage />,
    "Access plan": <AccessPage />,
  };
  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main>
        <Header setMobileOpen={setMobileOpen} onAdd={() => setAddOpen(true)} />
        {pages[page]}
        <footer><Logo /><p>Everything that matters, ready for the people who matter.</p><span>Fictional concept · No real information is stored</span></footer>
      </main>
      {journeyOpen && <JourneyModal onClose={() => setJourneyOpen(false)} />}
      {addOpen && <AddModal onClose={() => setAddOpen(false)} />}
    </div>
  );
}
