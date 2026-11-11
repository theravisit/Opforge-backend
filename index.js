<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="theme-color" content="#08080a">
<title>OPFORGE V13</title>
<style>
  :root{--bg:#08080a;--bg2:#101014;--bg3:#18181f;--bg4:#202028;--fg:#ececf0;--dim:#7a7a88;--line:#24242e;--acc:#ff3d5c;--acc2:#3dff9a;--acc3:#3d9aff;--acc4:#ffb03d;--safe-top:env(safe-area-inset-top,0px);--safe-bot:env(safe-area-inset-bottom,0px);}
  *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
  html,body{margin:0;padding:0;background:var(--bg);color:var(--fg);font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,sans-serif;font-size:16px;line-height:1.5;-webkit-font-smoothing:antialiased;overscroll-behavior-y:none;}
  body{padding-top:var(--safe-top);padding-bottom:var(--safe-bot);}
  header{position:sticky;top:0;z-index:60;background:rgba(8,8,10,.94);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);border-bottom:1px solid var(--line);padding:12px 14px 0;}
  .brand{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px;}
  .brand h1{margin:0;font-size:18px;letter-spacing:.16em;font-weight:800;text-transform:uppercase;}
  .brand h1 span{color:var(--acc);}
  .brand .ver{font-size:10px;color:var(--dim);letter-spacing:.1em;}
  .target-bar{display:flex;gap:6px;margin-bottom:10px;}
  .target-bar input{flex:1;padding:10px 12px;background:var(--bg3);border:1px solid var(--line);border-radius:9px;color:var(--fg);font-size:14px;font-family:inherit;outline:none;}
  .target-bar input:focus{border-color:var(--acc);}
  .target-bar .lock{padding:10px 12px;border-radius:9px;background:var(--bg3);border:1px solid var(--line);color:var(--acc2);font-size:12px;font-weight:700;letter-spacing:.06em;cursor:pointer;user-select:none;}
  .target-bar .lock:active{opacity:.6;}
  nav.tabs{display:flex;gap:4px;padding-bottom:10px;overflow-x:auto;}
  nav.tabs button{flex:1;min-width:0;padding:9px 4px;border:1px solid var(--line);background:var(--bg2);color:var(--dim);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;border-radius:7px;font-weight:700;font-family:inherit;transition:.15s;white-space:nowrap;}
  nav.tabs button.active{background:var(--acc);color:#fff;border-color:var(--acc);}
  main{padding:14px 12px 60px;}
  .view{display:none;}
  .view.active{display:block;}
  .search{width:100%;padding:11px 14px;background:var(--bg2);border:1px solid var(--line);border-radius:10px;color:var(--fg);font-size:14px;font-family:inherit;margin-bottom:12px;outline:none;}
  .search:focus{border-color:var(--acc);}
  .card{background:var(--bg2);border:1px solid var(--line);border-radius:12px;padding:13px 15px;margin-bottom:9px;cursor:pointer;transition:.12s;}
  .card:active{background:var(--bg3);transform:scale(.985);}
  .card .title{font-size:14.5px;font-weight:700;margin-bottom:3px;display:flex;align-items:center;gap:8px;}
  .card .title .tag{font-size:9.5px;padding:2px 6px;border-radius:4px;letter-spacing:.06em;font-weight:700;text-transform:uppercase;}
  .tag.op{background:#2a0f18;color:var(--acc);}
  .tag.goal{background:#0f2a1a;color:var(--acc2);}
  .tag.tool{background:#0f1a2a;color:var(--acc3);}
  .tag.live{background:#1f0f2a;color:#c04dff;}
  .card .desc{font-size:12.5px;color:var(--dim);line-height:1.45;}
  .section-label{font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--dim);margin:20px 0 9px;padding-left:3px;font-weight:700;}
  .section-label:first-child{margin-top:0;}
  .detail{animation:fade .18s ease;}
  @keyframes fade{from{opacity:0;transform:translateY(5px);}to{opacity:1;transform:none;}}
  .back{display:inline-flex;align-items:center;gap:6px;color:var(--acc);font-size:14px;font-weight:700;margin-bottom:12px;cursor:pointer;padding:6px 0;user-select:none;}
  .back:active{opacity:.6;}
  .detail h2{font-size:20px;margin:0 0 4px;letter-spacing:.01em;}
  .detail .kicker{font-size:11px;color:var(--dim);letter-spacing:.1em;text-transform:uppercase;margin-bottom:16px;}
  .op-block{background:var(--bg2);border:1px solid var(--line);border-radius:12px;padding:14px 15px;margin-bottom:11px;}
  .op-block h3{font-size:12px;text-transform:uppercase;letter-spacing:.1em;color:var(--acc);margin:0 0 10px;font-weight:800;display:flex;align-items:center;gap:7px;}
  .op-block h3 .step-n{background:var(--acc);color:#fff;width:18px;height:18px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;}
  .step-line{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid var(--line);}
  .step-line:last-child{border-bottom:none;}
  .step-line .num{width:20px;height:20px;border-radius:50%;background:var(--bg4);color:var(--acc2);font-size:10.5px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px;}
  .step-line .body{flex:1;font-size:13.5px;line-height:1.55;color:#d8d8e0;}
  .step-line .body b{color:#fff;font-weight:700;}
  .link-chip{display:inline-flex;align-items:center;gap:5px;padding:4px 9px;background:var(--bg4);border:1px solid var(--line);border-radius:6px;font-family:"SF Mono",ui-monospace,Menlo,monospace;font-size:11.5px;color:var(--acc3);text-decoration:none;margin:3px 3px 3px 0;word-break:break-all;cursor:pointer;transition:.12s;}
  .link-chip:active{background:var(--bg3);}
  .link-chip.copy{color:var(--acc4);}
  .link-chip.copy::after{content:" ⧉";}
  .query-box{background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:9px 11px;margin:6px 0;font-family:"SF Mono",ui-monospace,monospace;font-size:11.5px;color:var(--acc2);word-break:break-all;position:relative;}
  .query-box .copy-btn{position:absolute;top:6px;right:6px;background:var(--bg4);border:none;color:var(--acc4);font-size:10px;padding:3px 7px;border-radius:4px;cursor:pointer;font-family:inherit;font-weight:700;letter-spacing:.05em;}
  .query-box .copy-btn:active{opacity:.6;}
  .fallback{background:linear-gradient(180deg,#1a0a0e 0%,#12080a 100%);border:1px solid #3a1a22;border-radius:12px;padding:14px 15px;margin-top:14px;}
  .fallback h3{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--acc);margin:0 0 10px;font-weight:800;display:flex;align-items:center;gap:7px;}
  .fallback h3::before{content:"";width:6px;height:6px;background:var(--acc);border-radius:50%;animation:pulse 1.6s infinite;}
  @keyframes pulse{0%,100%{opacity:1;}50%{opacity:.3;}}
  .fallback ol{margin:0;padding-left:20px;}
  .fallback li{font-size:13px;line-height:1.55;margin-bottom:8px;color:#e0d0d8;}
  .fallback li:last-child{margin-bottom:0;}
  .note-area{width:100%;min-height:70px;margin-top:12px;padding:10px 12px;background:var(--bg3);border:1px solid var(--line);border-radius:9px;color:var(--fg);font-size:13px;font-family:inherit;outline:none;resize:vertical;}
  .note-area:focus{border-color:var(--acc2);}
  .note-label{font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);margin-top:12px;margin-bottom:5px;font-weight:700;}
  .toast{position:fixed;bottom:calc(20px + var(--safe-bot));left:50%;transform:translateX(-50%);background:var(--bg4);border:1px solid var(--acc2);color:var(--acc2);padding:10px 18px;border-radius:10px;font-size:13px;font-weight:700;z-index:999;opacity:0;transition:.2s;pointer-events:none;}
  .toast.show{opacity:1;}
  .empty{color:var(--dim);font-size:13.5px;text-align:center;padding:30px 20px;}
  .live-selector{display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;}
  .live-selector button{flex:1;min-width:70px;padding:10px 6px;background:var(--bg2);border:1px solid var(--line);border-radius:8px;color:var(--dim);font-size:12px;font-weight:700;font-family:inherit;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;}
  .live-selector button.active{background:var(--acc3);color:#fff;border-color:var(--acc3);}
  .live-run{width:100%;padding:14px;background:var(--acc2);border:none;color:#000;font-weight:800;font-size:14px;letter-spacing:.08em;border-radius:10px;font-family:inherit;cursor:pointer;margin-bottom:12px;}
  .live-run:active{opacity:.7;}
  .live-run:disabled{opacity:.5;}
  .live-result{background:var(--bg2);border:1px solid var(--line);border-radius:10px;padding:12px;margin-bottom:10px;}
  .live-result h4{margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--acc3);font-weight:800;}
  .live-result pre{margin:0;font-family:"SF Mono",ui-monospace,monospace;font-size:11px;color:#c8c8d0;white-space:pre-wrap;word-break:break-word;line-height:1.5;max-height:300px;overflow:auto;}
  .live-result a{color:var(--acc3);text-decoration:underline;}
  .live-result.err h4{color:var(--acc);}
  
  .hit { color: var(--acc2) !important; }
  .miss { color: var(--dim) !important; }
  
  .matrix-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px; }
  .matrix-grid a { background: var(--bg4); border: 1px solid var(--line); border-radius: 6px; padding: 8px; text-align: center; color: var(--acc3); text-decoration: none; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; }
  .matrix-grid a:active { background: var(--bg3); }
  
  .ai-script-box { background: linear-gradient(180deg, #120508 0%, #08080a 100%); border: 1px solid var(--acc); border-radius: 12px; padding: 16px; margin-bottom: 14px; box-shadow: 0 0 15px rgba(255,61,92,0.15); }
  .ai-script-box h4 { color: var(--acc); margin: 0 0 12px; font-size: 12px; letter-spacing: .12em; font-weight: 900; display: flex; align-items: center; gap: 8px; }
  .ai-script-box h4::before { content: "⚡"; font-size: 14px; }
  .ai-script-box ol { margin: 0; padding-left: 22px; }
  .ai-script-box li { color: #e8e8e8; font-size: 13px; line-height: 1.6; margin-bottom: 10px; }
  .ai-script-box li:last-child { margin-bottom: 0; }
  .ai-script-box li b { color: var(--acc2); }
</style>
</head>
<body>

<header>
  <div class="brand">
    <h1>OP<span>FORGE</span></h1>
    <div class="ver">v13 · SOVEREIGN</div>
  </div>
  <div class="target-bar">
    <input id="targetInput" placeholder="target — name / handle / email / phone / IP" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
    <div class="lock" onclick="lockTarget()">LOCK</div>
  </div>
  <nav class="tabs">
    <button id="tab-live" class="active" onclick="showTab('live')">Live</button>
    <button id="tab-ops" onclick="showTab('ops')">Ops</button>
    <button id="tab-targets" onclick="showTab('targets')">Targets</button>
    <button id="tab-tools" onclick="showTab('tools')">Arsenal</button>
    <button id="tab-build" onclick="showTab('build')">Build</button>
  </nav>
</header>

<main>
  <div id="view-live" class="view active">
    <div class="section-label">query type</div>
    <div class="live-selector" id="liveType">
      <button data-type="username" class="active">Username</button>
      <button data-type="name">Name</button>
      <button data-type="email">Email</button>
      <button data-type="phone">Phone</button>
      <button data-type="ip">IP</button>
    </div>
    <button class="live-run" id="liveRun" onclick="runLive()">QUERY TARGET NOW</button>
    <div id="liveResults"></div>
  </div>

  <div id="view-ops" class="view">
    <input class="search" id="opsSearch" placeholder="filter ops…" oninput="filterOps(this.value)">
    <div id="opsList"></div>
  </div>

  <div id="view-targets" class="view">
    <input class="search" id="targetsSearch" placeholder="what do you want to find?" oninput="filterTargets(this.value)">
    <div id="targetsList"></div>
  </div>

  <div id="view-tools" class="view">
    <input class="search" id="toolsSearch" placeholder="search arsenal…" oninput="filterTools(this.value)">
    <div id="toolsList"></div>
  </div>

  <div id="view-build" class="view">
    <div class="section-label">Dork Constructor</div>
    <div style="background:var(--bg2);border:1px solid var(--line);border-radius:12px;padding:14px;">
      <div class="note-label">base query</div>
      <input class="search" id="dorkBase" placeholder='e.g. "First Last" city' style="margin-bottom:8px;">
      <div class="note-label">site filter (optional)</div>
      <input class="search" id="dorkSite" placeholder="e.g. linkedin.com" style="margin-bottom:8px;">
      <div class="note-label">filetype filter (optional)</div>
      <input class="search" id="dorkFile" placeholder="e.g. pdf, docx" style="margin-bottom:12px;">
      <button onclick="buildDork()" style="width:100%;padding:12px;background:var(--acc);border:none;color:#fff;font-weight:800;font-size:13px;letter-spacing:.08em;border-radius:9px;font-family:inherit;cursor:pointer;">BUILD + COPY</button>
      <div id="dorkOutput" style="margin-top:12px;"></div>
    </div>
    <div class="section-label">Saved Findings</div>
    <div id="savedNotes" style="background:var(--bg2);border:1px solid var(--line);border-radius:12px;padding:14px;"></div>
  </div>

  <div id="view-detail" class="view"></div>
</main>

<div class="toast" id="toast">copied</div>

<script>
const DENO_URL = "https://opforge-v13.onrender.com";

let TARGET = "";
try { TARGET = localStorage.getItem("opforge_target") || ""; } catch(e) {}
document.getElementById("targetInput").value = TARGET;

function lockTarget(){
  TARGET = document.getElementById("targetInput").value.trim();
  try { localStorage.setItem("opforge_target", TARGET); } catch(e) {}
  toast(TARGET ? "target locked" : "cleared");
}
function toast(m){
  const t = document.getElementById("toast");
  t.textContent = m; t.classList.add("show");
  clearTimeout(t._t); t._t = setTimeout(()=>t.classList.remove("show"), 1400);
}
function fillTarget(s){ return s ? s.replace(/\{target\}/g, TARGET||"{target}") : s; }
async function copyText(txt, lbl){
  try{ await navigator.clipboard.writeText(txt); toast("copied "+(lbl||"")); }
  catch(e){
    const ta=document.createElement("textarea"); ta.value=txt;
    ta.style.position="fixed"; ta.style.opacity="0"; document.body.appendChild(ta);
    ta.select(); document.execCommand("copy"); ta.remove(); toast("copied "+(lbl||""));
  }
}
function escapeHtml(s){ return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return escapeHtml(text).replace(urlRegex, function(url) {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
}

let liveType = "username";
document.getElementById("liveType").addEventListener("click", e=>{
  if(e.target.tagName !== "BUTTON") return;
  document.querySelectorAll("#liveType button").forEach(b=>b.classList.remove("active"));
  e.target.classList.add("active");
  liveType = e.target.dataset.type;
});

async function runLive(){
  if(!TARGET){ toast("set a target first"); return; }
  if(DENO_URL === "YOUR_DENO_URL_HERE"){ toast("set DENO_URL in the HTML"); return; }
  const btn = document.getElementById("liveRun");
  btn.disabled = true; btn.textContent = "QUERYING…";
  const box = document.getElementById("liveResults");
  box.innerHTML = '<div class="empty">pulling dossier… (may take 30s to wake up if asleep)</div>';
  try{
    const u = `${DENO_URL}?type=${encodeURIComponent(liveType)}&q=${encodeURIComponent(TARGET)}`;
    const r = await fetch(u);
    const data = await r.json();
    box.innerHTML = "";
    
    if (data["FORGE_AI_SCRIPT"] && data["FORGE_AI_SCRIPT"].length > 0) {
      const scriptDiv = document.createElement("div");
      scriptDiv.className = "ai-script-box";
      let ol = "<h4>FORGE AI SCRIPT</h4><ol>";
      for(const step of data["FORGE_AI_SCRIPT"]) {
         ol += `<li>${step}</li>`;
      }
      ol += "</ol>";
      scriptDiv.innerHTML = ol;
      box.appendChild(scriptDiv);
    }

    for(const [key, val] of Object.entries(data)){
      if (key === "50_PLATFORM_MATRIX" || key === "FORGE_AI_SCRIPT") continue;

      const el = document.createElement("div");
      el.className = "live-result";
      
      let pretty = "";
      let isMiss = false;

      if (typeof val === "string" || typeof val === "number") {
        pretty = val;
        if (val === "Not found" || val === "None" || val === "No data" || val === null) isMiss = true;
      } else if (Array.isArray(val)) {
        pretty = val.join("\n");
      } else if (val !== null && typeof val === "object") {
        pretty = Object.entries(val).map(([k,v]) => {
           let strV = JSON.stringify(v).replace(/"/g, '');
           if (strV === 'null' || strV === 'undefined' || strV === '') strV = 'Not found';
           return `<span style="color:#7a7a88">${k}:</span> <span style="color:#fff">${linkify(strV)}</span>`;
        }).join("\n");
      } else {
        pretty = JSON.stringify(val);
      }

      let h4Style = isMiss ? 'style="color: var(--dim)"' : 'style="color: var(--acc2)"';
      el.innerHTML = `<h4 ${h4Style}>${key.replace(/_/g, ' ')}</h4><pre>${pretty}</pre>`;
      if(val && val.error) el.classList.add("err");
      box.appendChild(el);
    }

    if (data["50_PLATFORM_MATRIX"]) {
      const matrixDiv = document.createElement("div");
      matrixDiv.className = "live-result";
      matrixDiv.innerHTML = `<h4 style="color:var(--acc4)">50 PLATFORM FINAL MATRIX</h4>`;
      
      let gridHtml = '<div class="matrix-grid">';
      for (const [name, url] of Object.entries(data["50_PLATFORM_MATRIX"])) {
        gridHtml += `<a href="${url}" target="_blank">${name.replace(/_/g, ' ')}</a>`;
      }
      gridHtml += '</div>';
      matrixDiv.innerHTML += gridHtml;
      box.appendChild(matrixDiv);
    }

    if(!box.children.length) {
       box.innerHTML = `<div class="live-result"><pre>No public data found.</pre></div>`;
    }
  }catch(e){
    box.innerHTML = `<div class="live-result err"><h4>worker error</h4><pre>${escapeHtml(String(e))}</pre></div>`;
  }
  btn.disabled = false; btn.textContent = "QUERY TARGET NOW";
}

// OPS AND GOALS
const OPS = [
  {id:"u1",cat:"Username",title:"Handle → every platform",desc:"One handle to every account.",steps:[{t:"open multi-site checker",url:"https://whatsmyname.app/?q={target}"},{t:"scroll results — green = confirmed hit"},{t:"copy each hit URL into notes"},{t:"cross-check on Namechk",url:"https://namechk.com/?q={target}"}],fallback:["try sherlock CLI: <code>sherlock {target}</code>","try Maigret: <code>maigret {target}</code>"],pivots:["email","fullname"]},
  {id:"n1",cat:"Full Name",title:"Name → Google/Bing deep search",desc:"Quote it, layer context.",steps:[{t:"open Google quoted",url:'https://www.google.com/search?q=%22{target}%22'},{t:"open Bing",url:'https://www.bing.com/search?q=%22{target}%22'},{t:"add LinkedIn filter",url:'https://www.google.com/search?q=%22{target}%22+site%3Alinkedin.com%2Fin'},{t:"add PDFs",url:'https://www.google.com/search?q=%22{target}%22+filetype%3Apdf'}],fallback:["try Yandex","try DuckDuckGo html"],pivots:["address","employment"]},
  {id:"n2",cat:"Full Name",title:"Name → address history",desc:"TruePeopleSearch.",steps:[{t:"open TPS",url:"https://www.truepeoplesearch.com/results?name={target}"},{t:"tap the matching card"},{t:"copy each address"},{t:"open Zillow for owner record",url:"https://www.zillow.com/homes/{target}_rb/"}],fallback:["try fastpeoplesearch.com","try thatsthem.com"],pivots:["address","phone"]},
  {id:"e1",cat:"Email",title:"Email → breaches",desc:"HIBP + LeakCheck.",steps:[{t:"open HIBP",url:"https://haveibeenpwned.com/account/{target}"},{t:"note every breach"},{t:"open LeakCheck",url:"https://leakcheck.io/"},{t:"paste email, run check"}],fallback:["try dehashed.com","try snusbase.com"],pivots:["socials","fullname"]},
  {id:"e2",cat:"Email",title:"Email → Google identity",desc:"Epieos.",steps:[{t:"open Epieos",url:"https://epieos.com/?q={target}&t=email"},{t:"read output: name, photo, YouTube"}],fallback:["try ghunt","search email in quotes on Google"],pivots:["socials","fullname"]},
  {id:"p1",cat:"Phone",title:"Phone → name + carrier",desc:"Truecaller + carrier lookup.",steps:[{t:"open Truecaller",url:"https://www.truecaller.com/search/us/{target}"},{t:"read name + region"},{t:"check WhatsApp",url:"https://wa.me/{target}"},{t:"check Telegram",url:"https://t.me/+{target}"}],fallback:["try spydialer.com","try numlookup.com"],pivots:["fullname","address"]},
  {id:"a1",cat:"Address",title:"Address → parcel + owner",desc:"County assessor.",steps:[{t:"find the county assessor",url:'https://www.google.com/search?q=county+assessor+%22{target}%22'},{t:"enter the address in their parcel search"},{t:"read owner + purchase record"}],fallback:["try zillow property record","try redfin public record"],pivots:["fullname"]}
];

const GOALS = [
  {title:"I want their address",desc:"Name → every address.",ops:["n2","a1"]},
  {title:"I want their email",desc:"Handle/name → working address.",ops:["u1","n1"]},
  {title:"I want their full name",desc:"Handle/photo → identity.",ops:["u1","e2"]},
  {title:"I want their socials",desc:"Every platform.",ops:["u1"]},
  {title:"I want their leaked data",desc:"Breach dumps.",ops:["e1"]}
];

const TOOLS = [];
(function(){ const seen = new Set();for(const op of OPS){ for(const s of op.steps||[]){ if(s.url){try{ const u = new URL(s.url.replace(/\{target\}/g,"x")); const h = u.hostname.replace(/^www\./,"");if(!seen.has(h)){ seen.add(h); TOOLS.push({n:h, u:s.url, d:op.title}); }}catch(e){} }}}TOOLS.sort((a,b)=>a.n.localeCompare(b.n));})();

function el(t,c,h){ const e=document.createElement(t); if(c)e.className=c; if(h!==undefined)e.innerHTML=h; return e; }
function chip(url,label){ const u=fillTarget(url); const isCopy=!u.startsWith("http");return `<a class="link-chip ${isCopy?'copy':''}" href="${isCopy?'#':u}" ${isCopy?'onclick="event.preventDefault();copyText(\''+escapeHtml(u)+'\')"':'target="_blank" rel="noopener"'}>${escapeHtml(label||u)}</a>`;}
function renderOpsList(){const list = document.getElementById("opsList"); list.innerHTML="";const cats={}; for(const op of OPS){ if(!cats[op.cat])cats[op.cat]=[]; cats[op.cat].push(op); }for(const cat of Object.keys(cats)){list.appendChild(el("div","section-label",cat));for(const op of cats[cat]){ const c=el("div","card");c.innerHTML=`<div class="title">${op.title}<span class="tag op">op</span></div><div class="desc">${op.desc}</div>`;c.onclick=()=>renderOp(op); list.appendChild(c);}}}
function renderTargetsList(){const list=document.getElementById("targetsList"); list.innerHTML="";for(const g of GOALS){ const c=el("div","card");c.innerHTML=`<div class="title">${g.title}<span class="tag goal">goal</span></div><div class="desc">${g.desc}</div>`;c.onclick=()=>renderGoal(g); list.appendChild(c);}}
function renderToolsList(){const list=document.getElementById("toolsList"); list.innerHTML="";for(const t of TOOLS){ const c=el("div","card");c.innerHTML=`<div class="title">${t.n}<span class="tag tool">tool</span></div><div class="desc">${t.d}</div>`;c.onclick=()=>{ navigator.clipboard&&copyText(t.u,t.n); window.open(fillTarget(t.u),"_blank"); };list.appendChild(c);}}
function renderOp(op){const d=document.getElementById("view-detail"); d.innerHTML="";const back=el("div","back","‹ back"); back.onclick=()=>showTab(currentTab); d.appendChild(back);d.appendChild(el("h2","",op.title)); d.appendChild(el("div","kicker",op.cat+" · "+op.desc));const block=el("div","op-block"); block.appendChild(el("h3","",'<span class="step-n">▶</span>execute — click by click'));let i=0;for(const s of op.steps){ i++; let inner=s.t;if(s.url) inner+="<br>"+chip(s.url,s.url.replace(/\{target\}/g,TARGET||"{target}"));block.innerHTML+=`<div class="step-line"><div class="num">${i}</div><div class="body">${inner}</div></div>`;}d.appendChild(block);if(op.fallback&&op.fallback.length){ const fb=el("div","fallback"); let ol="<h3>if this fails</h3><ol>";for(const f of op.fallback) ol+=`<li>${f}</li>`; ol+="</ol>"; fb.innerHTML=ol; d.appendChild(fb);}const noteLabel=el("div","note-label","saved findings for this op"); d.appendChild(noteLabel);const ta=document.createElement("textarea"); ta.className="note-area"; ta.placeholder="paste URLs, names, addresses — saved automatically";try{ta.value=localStorage.getItem("opforge_note_"+op.id)||"";}catch(e){}ta.oninput=()=>{try{localStorage.setItem("opforge_note_"+op.id,ta.value);}catch(e){}};d.appendChild(ta); switchView("detail");}
function renderGoal(g){const d=document.getElementById("view-detail"); d.innerHTML="";const back=el("div","back","‹ back"); back.onclick=()=>showTab(currentTab); d.appendChild(back);d.appendChild(el("h2","",g.title)); d.appendChild(el("div","kicker","goal playbook · "+g.ops.length+" ops"));for(const opId of g.ops){const op=OPS.find(o=>o.id===opId); if(!op) continue;const block=el("div","op-block"); block.appendChild(el("h3","",'<span class="step-n">▶</span>'+op.title));let i=0;for(const s of op.steps){ i++; let inner=s.t;if(s.url) inner+="<br>"+chip(s.url,s.url.replace(/\{target\}/g,TARGET||"{target}"));block.innerHTML+=`<div class="step-line"><div class="num">${i}</div><div class="body">${inner}</div></div>`;}d.appendChild(block);if(op.fallback&&op.fallback.length){ const fb=el("div","fallback"); let ol="<h3>if this fails</h3><ol>";for(const f of op.fallback) ol+=`<li>${f}</li>`; ol+="</ol>"; fb.innerHTML=ol; d.appendChild(fb);}}switchView("detail");}
function filterOps(q){q=q.toLowerCase(); const list=document.getElementById("opsList"); list.innerHTML="";const cats={};for(const op of OPS){if(q&&!op.title.toLowerCase().includes(q)&&!op.desc.toLowerCase().includes(q)&&!op.cat.toLowerCase().includes(q)) continue;if(!cats[op.cat])cats[op.cat]=[]; cats[op.cat].push(op);}for(const cat of Object.keys(cats)){ list.appendChild(el("div","section-label",cat));for(const op of cats[cat]){ const c=el("div","card");c.innerHTML=`<div class="title">${op.title}<span class="tag op">op</span></div><div class="desc">${op.desc}</div>`;c.onclick=()=>renderOp(op); list.appendChild(c);}}if(!list.children.length) list.appendChild(el("div","empty","no matches."));}
function filterTargets(q){q=q.toLowerCase(); const list=document.getElementById("targetsList"); list.innerHTML="";for(const g of GOALS){ if(q&&!g.title.toLowerCase().includes(q)&&!g.desc.toLowerCase().includes(q)) continue;const c=el("div","card");c.innerHTML=`<div class="title">${g.title}<span class="tag goal">goal</span></div><div class="desc">${g.desc}</div>`;c.onclick=()=>renderGoal(g); list.appendChild(c);}if(!list.children.length) list.appendChild(el("div","empty","no matches."));}
function filterTools(q){q=q.toLowerCase(); const list=document.getElementById("toolsList"); list.innerHTML="";for(const t of TOOLS){ if(q&&!t.n.toLowerCase().includes(q)&&!t.d.toLowerCase().includes(q)) continue;const c=el("div","card");c.innerHTML=`<div class="title">${t.n}<span class="tag tool">tool</span></div><div class="desc">${t.d}</div>`;c.onclick=()=>{copyText(t.u,t.n);window.open(fillTarget(t.u),"_blank");}; list.appendChild(c);}if(!list.children.length) list.appendChild(el("div","empty","no matches."));}
function buildDork(){const base=document.getElementById("dorkBase").value.trim();const site=document.getElementById("dorkSite").value.trim();const file=document.getElementById("dorkFile").value.trim();let parts=[];if(base)parts.push(base.replace(/\{target\}/g,TARGET||"{target}"));if(site)parts.push("site:"+site.replace(/^https?:\/\//,""));if(file)parts.push("filetype:"+file.replace(/^\./,""));const q=parts.join(" "); const out=document.getElementById("dorkOutput");out.innerHTML=`<div class="query-box"><button class="copy-btn" onclick="copyText('${escapeHtml(q)}')">COPY</button>${escapeHtml(q)}</div><a class="link-chip" href="https://www.google.com/search?q=${encodeURIComponent(q)}" target="_blank">open in google</a><a class="link-chip" href="https://www.bing.com/search?q=${encodeURIComponent(q)}" target="_blank">open in bing</a><a class="link-chip" href="https://duckduckgo.com/html/?q=${encodeURIComponent(q)}" target="_blank">open in ddg</a>`;}
function renderSavedNotes(){const box=document.getElementById("savedNotes"); let any=false, html="";for(const op of OPS){let v=""; try{v=localStorage.getItem("opforge_note_"+op.id)||"";}catch(e){}if(!v.trim()) continue; any=true;html+=`<div style="padding:10px 0;border-bottom:1px solid var(--line);"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--acc2);font-weight:700;margin-bottom:4px;">${op.title}</div><div style="font-size:12.5px;color:#c8c8d0;white-space:pre-wrap;word-break:break-word;">${escapeHtml(v)}</div></div>`;}box.innerHTML=any?html:'<div class="empty">no saved findings yet. open any op and type into the notes box — it saves automatically.</div>';}
let currentTab="live";
function showTab(t){currentTab=t; document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));document.querySelectorAll("nav.tabs button").forEach(b=>b.classList.remove("active"));document.getElementById("view-"+t).classList.add("active"); document.getElementById("tab-"+t).classList.add("active");if(t==="build") renderSavedNotes();}
function switchView(v){ document.querySelectorAll(".view").forEach(e=>e.classList.remove("active")); document.getElementById("view-"+v).classList.add("active"); window.scrollTo(0,0); }
function refreshCurrentView(){if(currentTab==="ops") filterOps(document.getElementById("opsSearch").value);if(currentTab==="targets") filterTargets(document.getElementById("targetsSearch").value);if(currentTab==="tools") filterTools(document.getElementById("toolsSearch").value);}
document.getElementById("targetInput").addEventListener("input",(e)=>{TARGET=e.target.value.trim(); try{localStorage.setItem("opforge_target",TARGET);}catch(e){} refreshCurrentView();});
renderOpsList(); renderTargetsList(); renderToolsList();
</script>
</body>
</html>
