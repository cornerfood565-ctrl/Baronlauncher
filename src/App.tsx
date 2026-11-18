import { useMemo, useState } from "react";
import {
  Activity, ArrowRight, Bell, Box, Check, ChevronDown, ChevronRight,
  CircleHelp, CloudDownload, Code2, Cpu, Folder, Gamepad2, HardDrive,
  Home, Layers, Menu, Minus, Monitor, MoreVertical, Package, Play,
  Plus, Puzzle, RefreshCw, Search, Settings, Shirt, Sparkles, UserRound,
  X, Zap, Coffee, Newspaper, ShieldCheck, SlidersHorizontal
} from "lucide-react";

type Nav = "Home" | "Instances" | "Mods" | "Accounts" | "Skins" | "Settings";
type Instance = { name: string; detail: string; version: string; color: string; loader: string };
const initialInstances: Instance[] = [
  { name: "Vanilla", detail: "Clean & classic", version: "1.21.8", color: "vanilla", loader: "Vanilla" },
  { name: "Fabric PvP", detail: "Optimized for PvP", version: "1.21.8", color: "pvp", loader: "Fabric" },
  { name: "Modded SMP", detail: "Better together", version: "1.20.4", color: "smp", loader: "Forge" },
  { name: "Optifine Ultra", detail: "Max performance", version: "1.20.1", color: "optifine", loader: "OptiFine" },
  { name: "Create Mod", detail: "Engineering & automation", version: "1.20.1", color: "create", loader: "Forge" },
];
const news = [
  { category: "GAME UPDATES", title: "New biome details revealed in latest snapshot", time: "2 days ago", art: "news-forest" },
  { category: "COMMUNITY", title: "Top 10 survival builds from this week", time: "4 days ago", art: "news-build" },
  { category: "TIPS & GUIDES", title: "How to optimize your game performance", time: "6 days ago", art: "news-cave" },
  { category: "MODDING", title: "Fabric API 0.100 brings major changes", time: "1 week ago", art: "news-purple" },
  { category: "EVENTS", title: "Join the community build contest this weekend", time: "1 week ago", art: "news-event" },
];
const slides = [
  { label: "FEATURED WORLD", title: "SURVIVAL", sub: "Build, explore, survive. A new world awaits.\nWill you make it to the end?", scene: "scene-one" },
  { label: "COMMUNITY SPOTLIGHT", title: "BUILD BIGGER", sub: "Create something extraordinary.\nYour next adventure starts here.", scene: "scene-two" },
  { label: "MODDED ADVENTURE", title: "NEW FRONTIER", sub: "Discover new dimensions, tools and\nways to play with your favorite mods.", scene: "scene-three" },
  { label: "YOUR NEXT CHAPTER", title: "PLAY TOGETHER", sub: "Bring your friends and build a world\nworth remembering.", scene: "scene-four" },
];
const versions = ["Fabric 1.21.8", "Forge 1.20.4", "Vanilla 1.21.8"];

function App() {
  const [activeNav, setActiveNav] = useState<Nav>("Home");
  const [query, setQuery] = useState("");
  const [instances, setInstances] = useState(initialInstances);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const [slide, setSlide] = useState(0);
  const [version, setVersion] = useState(versions[0]);
  const [versionOpen, setVersionOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);
  const currentSlide = slides[slide];
  const filtered = useMemo(() => instances.filter(item => item.name.toLowerCase().includes(query.toLowerCase())), [instances, query]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }
  function play() {
    setPlaying(true);
    setLoading(true);
    notify("Preparing launch · Demo mode");
    window.setTimeout(() => { setPlaying(false); setLoading(false); }, 2200);
  }
  function action(label: string) {
    if (label === "Open Game Folder") {
      window.baron?.selectDirectory().then(path => path && notify("Selected folder: " + path)).catch(() => notify("Folder picker unavailable in browser preview"));
      return;
    }
    notify(label + " · UI preview");
  }
  function instanceAction(actionName: string, item: Instance) {
    setMenuFor(null);
    if (actionName === "Delete") {
      setInstances(list => list.filter(entry => entry.name !== item.name));
      notify(item.name + " removed from this demo list");
    } else notify(actionName + " · " + item.name);
  }

  const navItems = [
    { label: "Home" as Nav, icon: Home },
    { label: "Instances" as Nav, icon: Box },
    { label: "Mods" as Nav, icon: Puzzle },
    { label: "Accounts" as Nav, icon: UserRound },
    { label: "Skins" as Nav, icon: Shirt },
    { label: "Settings" as Nav, icon: Settings },
  ];
  const quickActions = [
    { icon: Plus, title: "New Instance", detail: "Create a fresh instance" },
    { icon: Package, title: "Import Modpack", detail: "Add from file or URL" },
    { icon: Puzzle, title: "Install Mod", detail: "Browse & install mods" },
    { icon: RefreshCw, title: "Check for Updates", detail: "Keep everything up to date" },
    { icon: Folder, title: "Open Game Folder", detail: "Access your files directly" },
  ];

  return (
    <div className="desktop-backdrop">
      <div className="app-shell">
        <header className="titlebar">
          <div className="brand-mark" aria-label="Baron Launcher"><span/><i/><b/></div>
          <div className="global-search"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search instances, mods, packs..." /></div>
          <button className="user-chip" onClick={() => setActiveNav("Accounts")}><span className="user-avatar">M</span><b>MagMad</b><ChevronDown size={15}/></button>
          <div className="window-controls">
            <button aria-label="Minimize" onClick={() => window.baron?.windowControl("minimize")}><Minus size={17}/></button>
            <button aria-label="Maximize" onClick={() => window.baron?.windowControl("toggle-maximize")}><span className="maximize-icon"/></button>
            <button aria-label="Close" onClick={() => window.baron?.windowControl("close")}><X size={19}/></button>
          </div>
        </header>
        {loading && <div className="loading-track"><i/></div>}
        <div className="workspace">
          <aside className="sidebar">
            <nav>{navItems.map(item => { const Icon = item.icon; return <button key={item.label} className={activeNav === item.label ? "nav-item active" : "nav-item"} onClick={() => setActiveNav(item.label)}><Icon size={19}/><span>{item.label}</span></button>; })}</nav>
            <div className="sidebar-footer">
              <div className="mountain-mark"><span/><i/></div>
              <p>Play <b>·</b> Create <b>·</b> Explore</p>
              <small>Your World, Your Rules</small>
            </div>
          </aside>

          <main className="main-content">
            {activeNav === "Home" ? (
              <>
                <div className="top-grid">
                  <section className={"hero " + currentSlide.scene}>
                    <div className="hero-landscape"><div className="sun"/><div className="mountain mountain-back"/><div className="mountain mountain-front"/><div className="block-trees"/></div>
                    <div className="hero-overlay"/>
                    <div className="hero-copy">
                      <div className="eyebrow">{currentSlide.label}</div>
                      <h1>{currentSlide.title} <em>//</em> SEASON 01</h1>
                      <p>{currentSlide.sub}</p>
                      <div className="hero-buttons">
                        <button className={"play-button " + (playing ? "is-playing" : "")} onClick={play}><Play size={18} fill="currentColor"/>{playing ? "STARTING..." : "PLAY"}</button>
                        <div className="version-wrap">
                          <button className="version-select" onClick={() => setVersionOpen(v => !v)}>{version}<ChevronDown size={16}/></button>
                          {versionOpen && <div className="version-menu">{versions.map(v => <button key={v} onClick={() => {setVersion(v);setVersionOpen(false);}}>{v}{version === v && <Check size={14}/>}</button>)}</div>}
                        </div>
                      </div>
                    </div>
                    <div className="slide-dots">{slides.map((s,i) => <button aria-label={"Show slide " + (i+1)} key={s.title} className={slide === i ? "selected" : ""} onClick={() => setSlide(i)}/>)}</div>
                  </section>
                  <section className="panel status-panel">
                    <h2><i/>Account &amp; Status</h2>
                    <StatusRow icon={<div className="microsoft-mark"><i/><i/><i/><i/></div>} title="Microsoft account" value="Connected" good/>
                    <StatusRow icon={<Coffee size={23}/>} title="Java 21" value="Runtime"/>
                    <StatusRow icon={<HardDrive size={23}/>} title="RAM 6 GB" value="Allocated"/>
                    <StatusRow icon={<Check size={22}/>} title="Ready to play" value="All systems good" good last/>
                  </section>
                </div>

                <div className="dashboard-grid">
                  <section className="panel instances-panel">
                    <div className="panel-heading"><h2><Box size={20}/>Your Instances</h2><button onClick={() => setActiveNav("Instances")}>{instances.length} total <ChevronRight size={16}/></button></div>
                    <div className="instance-list">{filtered.map(item => (
                      <div className="instance-row" key={item.name}>
                        <div className={"instance-thumb " + item.color}><div className="thumb-sun"/><div className="thumb-hill"/></div>
                        <div className="instance-info"><b>{item.name}</b><small>{item.detail}</small><span className="version-badge">{item.version}</span></div>
                        <div className="ready-state"><i/>Ready</div>
                        <div className="instance-menu-wrap"><button className="dots-button" aria-label={"More options for " + item.name} onClick={() => setMenuFor(menuFor === item.name ? null : item.name)}><MoreVertical size={17}/></button>{menuFor === item.name && <div className="instance-menu">{["Launch","Edit","Duplicate","Delete"].map(a => <button key={a} onClick={() => instanceAction(a,item)}>{a}</button>)}</div>}</div>
                      </div>
                    ))}{filtered.length === 0 && <div className="empty-search">No instances match “{query}”.</div>}</div>
                  </section>

                  <section className="panel news-panel">
                    <div className="panel-heading"><h2><Newspaper size={20}/>Recent News</h2><button onClick={() => notify("News feed preview")}>View all <ChevronRight size={16}/></button></div>
                    <div className="news-list">{news.map(item => <button className="news-row" key={item.title} onClick={() => notify(item.title)}>
                      <div className={"news-thumb " + item.art}><span/></div><div className="news-copy"><small>{item.category}</small><b>{item.title}</b><span>{item.time}</span></div><ChevronRight size={16}/>
                    </button>)}</div>
                  </section>

                  <section className="panel quick-panel">
                    <div className="panel-heading"><h2><Zap size={21} fill="currentColor"/>Quick Actions</h2></div>
                    <div className="quick-list">{quickActions.map(item => {const Icon = item.icon; return <button className="quick-action" key={item.title} onClick={() => action(item.title)}><span className="quick-icon"><Icon size={23}/></span><span className="quick-copy"><b>{item.title}</b><small>{item.detail}</small></span><ChevronRight size={17}/></button>;})}</div>
                  </section>
                </div>
              </>
            ) : (
              <section className="placeholder-page panel">
                <div className="placeholder-icon">{activeNav === "Instances" ? <Layers/> : activeNav === "Mods" ? <Puzzle/> : activeNav === "Accounts" ? <UserRound/> : activeNav === "Skins" ? <Shirt/> : <Settings/>}</div>
                <div className="eyebrow">BARON LAUNCHER</div><h1>{activeNav}</h1>
                <p>{activeNav === "Instances" ? "Your game instances will be managed here." : activeNav === "Mods" ? "Browse and manage your Minecraft mods." : activeNav === "Accounts" ? "Manage your Microsoft account and player profiles." : activeNav === "Skins" ? "Preview and manage your player skins." : "Configure your launcher preferences."}</p>
                <button className="back-home" onClick={() => setActiveNav("Home")}><Home size={15}/> Back to Home</button>
              </section>
            )}
          </main>
        </div>
        {toast && <div className="toast"><Check size={15}/>{toast}</div>}
      </div>
    </div>
  );
}

function StatusRow({icon,title,value,good,last}:{icon:React.ReactNode;title:string;value:string;good?:boolean;last?:boolean}) {
  return <div className={"status-row " + (last ? "last" : "")}><div className={"status-icon " + (good ? "good" : "")}>{icon}</div><div><b>{title}</b><small className={good ? "green-text" : ""}>{value}</small></div></div>;
}

export default App;
