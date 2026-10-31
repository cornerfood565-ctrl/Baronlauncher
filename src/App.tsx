import { useMemo, useState, type ReactNode } from "react";
import {
  Activity, ArrowDownToLine, ArrowLeft, ArrowRight, Bell, Box, Check,
  ChevronDown, ChevronRight, CircleHelp, CloudDownload, Code2, Cpu,
  Download, ExternalLink, FileArchive, Folder, Gamepad2, HardDrive,
  Home, Layers3, Library, Monitor, MoreHorizontal, Palette, Play,
  Plus, Puzzle, RefreshCw, Search, Settings, ShieldCheck, SlidersHorizontal,
  Sparkles, Terminal, Trash2, UserRound, Users, X, Zap
} from "lucide-react";

type Page = "Home" | "Versions" | "Mods" | "Modpacks" | "Profiles" | "Customization" | "Settings";
type Profile = { name: string; version: string; loader: string; mods: number; color: string };

const navItems: { label: Page; icon: typeof Home; section: string }[] = [
  { label: "Home", icon: Home, section: "LIBRARY" },
  { label: "Versions", icon: Layers3, section: "LIBRARY" },
  { label: "Mods", icon: Puzzle, section: "LIBRARY" },
  { label: "Modpacks", icon: FileArchive, section: "LIBRARY" },
  { label: "Profiles", icon: Users, section: "MANAGE" },
  { label: "Customization", icon: Palette, section: "MANAGE" },
  { label: "Settings", icon: Settings, section: "SYSTEM" },
];

const initialProfiles: Profile[] = [
  { name: "Main Survival", version: "1.21.4", loader: "Fabric", mods: 18, color: "red" },
  { name: "PvP Practice", version: "1.21.1", loader: "Fabric", mods: 7, color: "blue" },
  { name: "Vanilla World", version: "1.21.4", loader: "Vanilla", mods: 0, color: "silver" },
];

const mods = [
  { name: "Sodium", detail: "Rendering engine · Fabric", version: "0.6.5", tag: "PERFORMANCE", icon: "S", color: "violet" },
  { name: "Lithium", detail: "Game logic optimization · Fabric", version: "0.15.3", tag: "PERFORMANCE", icon: "L", color: "green" },
  { name: "Iris Shaders", detail: "Shader support · Fabric", version: "1.8.8", tag: "VISUAL", icon: "I", color: "blue" },
  { name: "Mod Menu", detail: "In-game mod configuration · Fabric", version: "11.0.3", tag: "UTILITY", icon: "M", color: "orange" },
];

function App() {
  const [page, setPage] = useState<Page>("Home");
  const [selectedProfile, setSelectedProfile] = useState("Main Survival");
  const [profiles, setProfiles] = useState(initialProfiles);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAddProfile, setShowAddProfile] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [playing, setPlaying] = useState(false);
  const [enabledMods, setEnabledMods] = useState(["Sodium", "Lithium", "Iris Shaders", "Mod Menu"]);
  const [accent, setAccent] = useState("red");
  const [compact, setCompact] = useState(false);

  const activeProfile = profiles.find(p => p.name === selectedProfile) ?? profiles[0];
  const filteredMods = useMemo(() => mods.filter(m => (m.name + m.detail + m.tag).toLowerCase().includes(search.toLowerCase())), [search]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function launchGame() {
    setPlaying(true);
    notify("Launcher UI demo · Game engine is not connected yet");
    window.setTimeout(() => setPlaying(false), 2400);
  }

  function addProfile() {
    const name = profileName.trim();
    if (!name) return;
    const next = { name, version: "1.21.4", loader: "Fabric", mods: 0, color: "silver" };
    setProfiles(current => [...current, next]);
    setSelectedProfile(name);
    setProfileName("");
    setShowAddProfile(false);
    notify("Profile created");
  }

  return (
    <div className={`app-shell accent-${accent} ${compact ? "compact" : ""}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><span>B</span><i /></div>
          <div className="brand-copy"><strong>BARON</strong><small>LAUNCHER <b>0.1</b></small></div>
          <button className="icon-button sidebar-collapse" title="Toggle compact sidebar" onClick={() => setCompact(v => !v)}><SlidersHorizontal size={16}/></button>
        </div>
        <div className="sidebar-scroll">
          {["LIBRARY", "MANAGE", "SYSTEM"].map(section => (
            <div className="nav-group" key={section}>
              <div className="nav-label">{section}</div>
              {navItems.filter(item => item.section === section).map(item => {
                const Icon = item.icon;
                return <button key={item.label} className={`nav-item ${page === item.label ? "active" : ""}`} onClick={() => setPage(item.label)}>
                  <Icon size={17}/><span>{item.label}</span>{page === item.label && <i className="active-dot"/>}
                </button>;
              })}
            </div>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="storage-card">
            <div className="storage-top"><HardDrive size={14}/><span>GAME STORAGE</span><b>—</b></div>
            <div className="storage-bar"><i/></div>
            <small>Connect game directory to view usage</small>
          </div>
          <button className="help-link" onClick={() => notify("Help center will be available in a future build")}><CircleHelp size={16}/> Help & support <ExternalLink size={12}/></button>
          <div className="sidebar-version"><span className="status-pulse"/> All systems ready <span>v0.1.0</span></div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <div className="breadcrumb"><span>BARON</span><ChevronRight size={13}/><strong>{page.toUpperCase()}</strong></div>
          <div className="top-actions">
            <div className="online-status"><i/> Launcher ready</div>
            <button className="icon-button notification-button" onClick={() => notify("You're all caught up")} title="Notifications"><Bell size={17}/><i/></button>
            <div className="top-divider"/>
            <button className="account-button" onClick={() => setShowProfileMenu(v => !v)}>
              <div className="avatar">P</div><span><b>Player</b><small>Not signed in</small></span><ChevronDown size={14}/>
            </button>
            {showProfileMenu && <div className="account-menu"><b>Microsoft account</b><p>Connect your account in a future authentication build.</p><button onClick={() => {setShowProfileMenu(false);notify("Microsoft sign-in is planned for Phase 3")}}>Connect account <ArrowRight size={14}/></button></div>}
          </div>
        </header>

        <div className="page-content">
          {page === "Home" && <HomePage profile={activeProfile} profiles={profiles} selected={selectedProfile} onSelect={setSelectedProfile} onLaunch={launchGame} playing={playing} onPage={setPage} onNotify={notify}/>}
          {page === "Versions" && <VersionsPage onNotify={notify}/>}
          {page === "Mods" && <ModsPage search={search} setSearch={setSearch} filteredMods={filteredMods} enabledMods={enabledMods} setEnabledMods={setEnabledMods} onNotify={notify}/>}
          {page === "Modpacks" && <ModpacksPage onNotify={notify}/>}
          {page === "Profiles" && <ProfilesPage profiles={profiles} selected={selectedProfile} onSelect={setSelectedProfile} onAdd={() => setShowAddProfile(true)} onNotify={notify}/>}
          {page === "Customization" && <CustomizationPage accent={accent} setAccent={setAccent} onNotify={notify}/>}
          {page === "Settings" && <SettingsPage onNotify={notify}/>}
        </div>
        <footer className="app-footer"><span>BARON LAUNCHER <b>0.1.0</b></span><span><i className="status-pulse"/> UI PREVIEW · MINECRAFT ENGINE NOT CONNECTED</span><span>BUILT FOR JAVA EDITION</span></footer>
      </main>

      {showAddProfile && <div className="modal-backdrop" onClick={() => setShowAddProfile(false)}><div className="modal" onClick={e => e.stopPropagation()}><div className="modal-head"><div><small>PROFILE MANAGER</small><h2>Create profile</h2></div><button className="icon-button" onClick={() => setShowAddProfile(false)}><X size={17}/></button></div><label>PROFILE NAME</label><input autoFocus value={profileName} onChange={e => setProfileName(e.target.value)} placeholder="e.g. Skyblock Setup" onKeyDown={e => e.key === "Enter" && addProfile()}/><div className="modal-actions"><button className="button secondary" onClick={() => setShowAddProfile(false)}>Cancel</button><button className="button primary" onClick={addProfile} disabled={!profileName.trim()}><Plus size={15}/> Create profile</button></div></div></div>}
      {toast && <div className="toast"><Check size={16}/>{toast}</div>}
    </div>
  );
}

function PageHeading({eyebrow, title, description, action}: {eyebrow: string; title: string; description: string; action?: ReactNode}) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

function HomePage({profile, profiles, selected, onSelect, onLaunch, playing, onPage, onNotify}: {profile: Profile; profiles: Profile[]; selected: string; onSelect: (v:string)=>void; onLaunch:()=>void; playing:boolean; onPage:(p:Page)=>void; onNotify:(m:string)=>void}) {
  return <div className="home-page">
    <div className="hero">
      <div className="hero-image"/>
      <div className="hero-shade"/>
      <div className="hero-content">
        <div className="hero-kicker"><span className="red-line"/> YOUR NEXT ADVENTURE STARTS HERE</div>
        <div className="hero-title">MAKE YOUR<br/><em>WORLD.</em></div>
        <p>One launcher. Every way you play.</p>
        <div className="hero-actions"><button className="button play-button" onClick={onLaunch} disabled={playing}><Play size={17} fill="currentColor"/>{playing ? "PREPARING..." : "PLAY MINECRAFT"}<span>↗</span></button><button className="button hero-secondary" onClick={() => onPage("Versions")}>MANAGE VERSIONS <ArrowRight size={15}/></button></div>
      </div>
      <div className="hero-index"><b>01</b><span>/</span> 03</div>
      <div className="hero-caption">MINECRAFT JAVA EDITION <span>·</span> UNOFFICIAL COMMUNITY LAUNCHER</div>
    </div>

    <div className="section-row"><div><div className="eyebrow">QUICK ACCESS</div><h2>Your game space</h2></div><button className="text-button" onClick={() => onPage("Profiles")}>ALL PROFILES <ArrowRight size={14}/></button></div>
    <div className="profile-strip">
      {profiles.slice(0,3).map((p,i) => <button className={`profile-card ${selected === p.name ? "selected" : ""}`} key={p.name} onClick={() => onSelect(p.name)}>
        <div className={`profile-art art-${p.color}`}><span>{["MS","PVP","VW"][i] ?? "MC"}</span><div className="art-grid"/></div>
        <div className="profile-card-info"><div><b>{p.name}</b><small>{p.version} <i/> {p.loader}</small></div><ChevronRight size={16}/></div>
        <div className="profile-card-foot"><span><Puzzle size={12}/>{p.mods} mods</span><span className={selected === p.name ? "selected-label" : ""}>{selected === p.name ? "SELECTED" : "OPEN PROFILE"}</span></div>
      </button>)}
      <button className="new-profile-card" onClick={() => onPage("Profiles")}><div className="plus-circle"><Plus size={20}/></div><b>Create a profile</b><small>Build a new game setup</small></button>
    </div>

    <div className="bottom-grid">
      <div className="panel activity-panel"><div className="panel-heading"><div><div className="eyebrow">SYSTEM OVERVIEW</div><h3>Launcher status</h3></div><span className="live-label"><i/> LIVE</span></div><div className="stat-grid"><div className="stat"><Cpu size={17}/><small>JAVA RUNTIME</small><b>Not configured</b><span>Will be detected during setup</span></div><div className="stat"><HardDrive size={17}/><small>GAME DIRECTORY</small><b>Not connected</b><span>Choose a location in settings</span></div><div className="stat"><Activity size={17}/><small>GAME PROCESS</small><b>Not running</b><span>Ready when you are</span></div></div></div>
      <div className="panel update-panel"><div className="panel-heading"><div><div className="eyebrow">WHAT'S NEXT</div><h3>Coming to Baron</h3></div><Sparkles size={18}/></div><div className="update-item"><div className="update-icon"><ShieldCheck size={16}/></div><div><b>Secure Microsoft sign-in</b><small>Account linking and profile switching</small></div><span>01</span></div><div className="update-item"><div className="update-icon"><CloudDownload size={16}/></div><div><b>Real game installation</b><small>Versions, loaders and Java runtime</small></div><span>02</span></div><button className="panel-link" onClick={() => onNotify("Development roadmap is available in the repository README")}>VIEW DEVELOPMENT ROADMAP <ArrowRight size={13}/></button></div>
    </div>
  </div>;
}

function VersionsPage({onNotify}:{onNotify:(m:string)=>void}) {
  const versions = [{v:"1.21.4",type:"LATEST RELEASE",loader:"Vanilla",status:"Not installed"},{v:"1.21.1",type:"RELEASE",loader:"Fabric",status:"Not installed"},{v:"1.20.4",type:"RELEASE",loader:"Forge",status:"Not installed"},{v:"1.20.1",type:"POPULAR",loader:"NeoForge",status:"Not installed"}];
  return <><PageHeading eyebrow="GAME LIBRARY" title="Versions" description="Install and organize your Minecraft game versions." action={<button className="button primary" onClick={() => onNotify("Version installation will be connected to the game engine in Phase 3")}><Plus size={16}/> Install version</button>}/><div className="notice"><ShieldCheck size={17}/><span><b>Installation engine not connected.</b> This screen is a UI preview; no game files will be downloaded yet.</span></div><div className="toolbar"><div className="search-box"><Search size={16}/><input placeholder="Search versions..."/></div><button className="button secondary"><SlidersHorizontal size={15}/> Filters</button></div><div className="version-list">{versions.map(v=><div className="version-row" key={v.v}><div className="version-cube"><Box size={20}/></div><div className="version-main"><b>Minecraft {v.v}</b><small>{v.type} <i/> {v.loader}</small></div><span className="muted-tag">{v.status}</span><button className="button secondary small" onClick={() => onNotify("Version installer is planned for Phase 3")}>Install <ArrowDownToLine size={14}/></button><button className="icon-button"><MoreHorizontal size={17}/></button></div>)}</div></>;
}

function ModsPage({search,setSearch,filteredMods,enabledMods,setEnabledMods,onNotify}:{search:string;setSearch:(v:string)=>void;filteredMods:typeof mods;enabledMods:string[];setEnabledMods:(v:string[]|((old:string[])=>string[]))=>void;onNotify:(m:string)=>void}) {
  return <><PageHeading eyebrow="MOD LIBRARY" title="Mods" description="Manage your mods and shape the way you play." action={<button className="button primary" onClick={() => onNotify("Modrinth and CurseForge discovery will be connected in Phase 4")}><Plus size={16}/> Discover mods</button>}/><div className="notice"><Puzzle size={17}/><span><b>Local demo data.</b> Mod downloads, compatibility checks and provider integrations are not connected yet.</span></div><div className="toolbar"><div className="search-box"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search installed mods..."/></div><button className="button secondary"><SlidersHorizontal size={15}/> Filter</button><div className="toolbar-count">{filteredMods.length} MODS SHOWN</div></div><div className="mod-list">{filteredMods.map(m=><div className="mod-row" key={m.name}><div className={`mod-icon ${m.color}`}>{m.icon}</div><div className="mod-main"><b>{m.name}</b><small>{m.detail}</small></div><span className="mod-tag">{m.tag}</span><span className="mod-version">v{m.version}</span><button className={`toggle ${enabledMods.includes(m.name)?"on":""}`} onClick={()=>setEnabledMods(old=>old.includes(m.name)?old.filter(x=>x!==m.name):[...old,m.name])} aria-label={`Toggle ${m.name}`}><i/></button><button className="icon-button" onClick={()=>onNotify("Mod actions will be available after provider integration")}><MoreHorizontal size={17}/></button></div>)}</div></>;
}

function ModpacksPage({onNotify}:{onNotify:(m:string)=>void}) {
  return <><PageHeading eyebrow="COLLECTIONS" title="Modpacks" description="Keep complete modded experiences organized and ready." action={<button className="button primary" onClick={() => onNotify("Modpack import will be implemented with the mod engine")}><Plus size={16}/> Import modpack</button>}/><div className="empty-state"><div className="empty-graphic"><FileArchive size={32}/><span/></div><div className="eyebrow">YOUR COLLECTION STARTS HERE</div><h2>No modpacks yet</h2><p>Import a compatible modpack archive or create a pack from one of your profiles.</p><div className="empty-actions"><button className="button primary" onClick={() => onNotify("Modpack import is planned for Phase 4")}><ArrowDownToLine size={15}/> Import a modpack</button><button className="button secondary" onClick={() => onNotify("Profile-to-modpack export is planned")}>Create from profile</button></div></div></>;
}

function ProfilesPage({profiles,selected,onSelect,onAdd,onNotify}:{profiles:Profile[];selected:string;onSelect:(v:string)=>void;onAdd:()=>void;onNotify:(m:string)=>void}) {
  return <><PageHeading eyebrow="CONFIGURATIONS" title="Profiles" description="Separate game setups for every play style." action={<button className="button primary" onClick={onAdd}><Plus size={16}/> New profile</button>}/><div className="profile-grid">{profiles.map((p,i)=><div className={`profile-large ${selected===p.name?"is-selected":""}`} key={p.name}><div className={`profile-large-art art-${p.color}`}><span>{String(i+1).padStart(2,"0")}</span><Gamepad2 size={36}/></div><div className="profile-large-body"><div className="profile-large-title"><div><b>{p.name}</b><small>{p.version} · {p.loader}</small></div>{selected===p.name&&<span className="selected-label">ACTIVE</span>}</div><div className="profile-meta"><span><Puzzle size={13}/>{p.mods} mods</span><span><Folder size={13}/> Separate directory</span></div><div className="profile-actions"><button className="button secondary small" onClick={()=>{onSelect(p.name);onNotify("Active profile changed")}}>{selected===p.name?"Selected":"Select profile"}</button><button className="icon-button" onClick={()=>onNotify("Profile editing is planned for a future milestone")}><MoreHorizontal size={17}/></button></div></div></div>)}</div></>;
}

function CustomizationPage({accent,setAccent,onNotify}:{accent:string;setAccent:(v:string)=>void;onNotify:(m:string)=>void}) {
  const colors = [{id:"red",name:"Baron Red",hex:"#e34b55"},{id:"blue",name:"Arctic Blue",hex:"#5b9cff"},{id:"violet",name:"Pulse Violet",hex:"#a78bfa"},{id:"green",name:"Toxic Green",hex:"#76c99a"}];
  return <><PageHeading eyebrow="MAKE IT YOURS" title="Customization" description="Tune the look and feel of your launcher."/><div className="settings-layout"><div className="panel settings-panel"><div className="panel-heading"><div><div className="eyebrow">APPEARANCE</div><h3>Accent colour</h3></div><Palette size={18}/></div><p className="panel-description">Choose a highlight colour for active navigation, buttons and interface details.</p><div className="color-options">{colors.map(c=><button className={`color-option ${accent===c.id?"chosen":""}`} key={c.id} onClick={()=>setAccent(c.id)}><i style={{background:c.hex}}/><span>{c.name}</span>{accent===c.id&&<Check size={15}/>}</button>)}</div></div><div className="panel preview-panel"><div className="eyebrow">LIVE PREVIEW</div><div className="mini-preview"><div className="mini-sidebar"><i/><i/><i/></div><div className="mini-content"><div/><div/><button/></div></div><button className="button secondary full" onClick={()=>{setAccent("red");onNotify("Default Baron theme restored")}}>Reset to Baron theme <RefreshCw size={14}/></button></div></div><div className="panel coming-panel"><Sparkles size={18}/><div><b>More customization is on the way</b><p>Custom backgrounds, dashboard widgets, sidebar layouts and animation controls are planned.</p></div></div></>;
}

function SettingsPage({onNotify}:{onNotify:(m:string)=>void}) {
  const groups = [{icon:Cpu,title:"Memory allocation",desc:"Choose how much RAM Minecraft can use.",value:"Auto · Not configured"},{icon:Code2,title:"Java runtime",desc:"Select or automatically detect a Java installation.",value:"Not detected"},{icon:Folder,title:"Game directory",desc:"Choose where Baron stores game versions and profiles.",value:"Not selected"},{icon:Monitor,title:"Game resolution",desc:"Set the window size used when Minecraft launches.",value:"System default"},{icon:RefreshCw,title:"Launcher updates",desc:"Keep Baron Launcher up to date.",value:"Automatic checks · Planned"}];
  return <><PageHeading eyebrow="PREFERENCES" title="Settings" description="Configure the launcher and your Minecraft environment."/><div className="settings-layout"><div className="panel settings-panel"><div className="panel-heading"><div><div className="eyebrow">GAME CONFIGURATION</div><h3>Launcher preferences</h3></div><Settings size={18}/></div>{groups.map(g=>{const Icon=g.icon;return <div className="setting-row" key={g.title}><div className="setting-icon"><Icon size={17}/></div><div className="setting-copy"><b>{g.title}</b><small>{g.desc}</small></div><div className="setting-value">{g.value}</div><button className="button secondary small" onClick={()=>onNotify("This setting will be connected to the launcher engine in a later phase")}>Configure</button></div>})}</div><div className="panel settings-panel"><div className="panel-heading"><div><div className="eyebrow">ACCOUNT</div><h3>Microsoft account</h3></div><UserRound size={18}/></div><div className="account-placeholder"><div className="avatar large">P</div><div><b>No account connected</b><small>Sign in with Microsoft to launch your owned Minecraft Java Edition.</small></div></div><button className="button primary full" onClick={()=>onNotify("Secure Microsoft authentication is planned for Phase 3")}>Connect Microsoft account <ArrowRight size={15}/></button><div className="setting-divider"/><div className="panel-heading"><div><div className="eyebrow">DATA & SAFETY</div><h3>Backup and recovery</h3></div><ShieldCheck size={18}/></div><p className="panel-description">Profile backups will include launcher configuration and mod lists. Cloud backup will be optional.</p><button className="button secondary full" onClick={()=>onNotify("Backup and restore are planned for Phase 5")}>Backup settings <ArrowRight size={14}/></button></div></div></>;
}

export default App;
