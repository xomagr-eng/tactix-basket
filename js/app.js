/* ============================================================
   TACTIX BASKET — Κύρια εφαρμογή
   ============================================================ */
/* Λογότυπο — δυναμική μπάλα μπάσκετ σε κίνηση + βέλος τακτικής (πιασάρικο) */
function LOGO_SVG(px){
  const s = px ? `width="${px}" height="${px}"` : `width="100%" height="100%"`;
  return `<svg viewBox="0 0 100 100" ${s} xmlns="http://www.w3.org/2000/svg" style="display:block">
    <defs>
      <linearGradient id="txg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f04651"/><stop offset="1" stop-color="#9c1019"/></linearGradient>
      <linearGradient id="txball" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e7edf6"/></linearGradient>
    </defs>
    <rect x="5" y="5" width="90" height="90" rx="24" fill="url(#txg)"/>
    <path d="M5 29 Q40 6 95 20 L95 5 Q60 5 5 5 Z" fill="#ffffff" opacity=".10"/>
    <!-- βέλος κίνησης (δυναμικό, κάτω από τη μπάλα) -->
    <path d="M17 83 Q46 96 78 76" fill="none" stroke="#fde047" stroke-width="6.5" stroke-linecap="round"/>
    <path d="M78 76 l-9 1.5 M78 76 l-2.5 -8.6" fill="none" stroke="#fde047" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
    <!-- μπάλα -->
    <circle cx="47" cy="45" r="26" fill="url(#txball)" stroke="#0b1220" stroke-width="1.4"/>
    <g fill="none" stroke="#0b1220" stroke-width="3" stroke-linecap="round">
      <path d="M47 19 L47 71 M21 45 L73 45"/>
      <path d="M27 26 Q47 45 27 64"/><path d="M67 26 Q47 45 67 64"/>
    </g>
  </svg>`;
}

const App = (() => {
  const KEY = "cosmos_bball_coach_v1";
  let DB, state = { view:"dashboard", tacticId:null, designer:null, cmpA:null, cmpB:null, drawTab:"offense", boardTool:"move", dTool:"move" };

  /* ---------- Αποθήκευση ---------- */
  function load(){
    try{ DB = JSON.parse(localStorage.getItem(KEY)); }catch(e){ DB=null; }
    if(!DB){
      DB = {
        club:{ name:"Η Ομάδα μου", short:"BC", system:"5-Out (Motion)" },
        players: PLAYERS_SEED,
        tactics: TACTICS_SEED.map(t=>({...t, custom:false})),
        drills: DRILLS_SEED.map(d=>({...d, custom:false})),
        sessions: [],
        matches: [ demoMatch() ],
        microcycle: defaultMicro(),
        events: []
      };
      save();
    }
    // ασφάλεια για παλιές εκδόσεις
    DB.microcycle = DB.microcycle || defaultMicro();
    DB.events = DB.events || [];
    DB.settings = DB.settings || { autoLandscape:true };
    if(DB.settings.autoLandscape===undefined) DB.settings.autoLandscape=true;
    DB.rotation = DB.rotation || { periods:4, periodMin:10, grid:{} };
    if(!DB.club.system && DB.club.formation) DB.club.system = DB.club.formation;
    // merge νέων seed τακτικών/ασκήσεων (χωρίς να χαθούν τα δικά σου)
    let added=false;
    TACTICS_SEED.forEach(t=>{ if(!DB.tactics.some(x=>x.id===t.id)){ DB.tactics.push({...t,custom:false}); added=true; } });
    DRILLS_SEED.forEach(d=>{ if(!DB.drills.some(x=>x.id===d.id)){ DB.drills.push({...d,custom:false}); added=true; } });
    // sync νέων πεδίων (cat/full/customPositions) σε ΥΠΑΡΧΟΝΤΑ seed (π.χ. οι παλιές στημένες → Playbook)
    TACTICS_SEED.forEach(s=>{ if(s.cat){ const ex=DB.tactics.find(x=>x.id===s.id); if(ex && !ex.custom && !ex.cat){ ex.cat=s.cat; ex.full=s.full; if(!ex.customPositions&&s.customPositions) ex.customPositions=s.customPositions; added=true; } } });
    // θέσεις-κλειδιά ανά συνεργασία (για φίλτρο θέσης)
    if(typeof PLAY_POS!=="undefined") DB.tactics.forEach(t=>{ if(t.cat && (!t.pos||!t.pos.length) && PLAY_POS[t.id]){ t.pos=PLAY_POS[t.id]; added=true; } });
    // migration πεδίων παίκτη
    DB.players.forEach(pl=>{
      if(pl.height==null) pl.height=200;
      if(pl.weight==null) pl.weight=95;
      if(!pl.pastPositions) pl.pastPositions=[pl.pos];
      if(!pl.suitability) pl.suitability={[pl.pos]:"good"};
      if(pl.points==null) pl.points=pl.goals||0;
      if(pl.rebounds==null) pl.rebounds=0;
      if(pl.gp==null) pl.gp=0;
      if(!pl.status) pl.status="available";
      added=true;
    });
    if(added) save();
    // επαναφορά μόνο CUSTOM συστημάτων στο FORMATIONS (οι συνεργασίες κρατούν customPositions χωρίς να μπαίνουν στα dropdowns)
    DB.tactics.forEach(t=>{ const sys=t.system||t.formation; if(t.custom && t.customPositions && sys && !FORMATIONS[sys]) FORMATIONS[sys]=t.customPositions.map(p=>({r:p.r,x:p.x,y:p.y})); });
  }
  function save(){ localStorage.setItem(KEY, JSON.stringify(DB)); }
  function tacSystem(t){ return t.system || t.formation || "5-Out (Motion)"; }
  function isFull(sys){ return typeof FULLCOURT!=="undefined" && FULLCOURT.includes(sys); }
  function boardFull(t){ return !!(t && t.full) || isFull(tacSystem(t)); }
  // Ετικέτες «φάσεων»: για συνεργασίες (plays) διαφορετικές από τα συστήματα
  const PLAY_PHASE_LABELS = {
    offense:   {t:"▶️ Εκτέλεση", c:"pt-att"},
    defense:   {t:"🧠 Ανάγνωση / Άμυνα", c:"pt-def"},
    transition:{t:"🔁 Μετάβαση / Ισορροπία", c:"pt-tr"},
    special:   {t:"🗣️ Coaching Points", c:"pt-sp"}
  };
  function phaseLabels(t){ return (t && t.cat) ? PLAY_PHASE_LABELS : PHASE_LABELS; }

  function demoMatch(){
    return { id:"m_demo", opp:"Α.Ο. Αντιπάλων", date:nextSaturday(), home:true, comp:"Πρωτάθλημα",
      system:"5-Out (Motion)", tacticId:"my-hybrid", pf:null, pa:null, status:"upcoming",
      oppNotes:"Παίζουν drop coverage, επικίνδυνοι στη μετάβαση. Αδύναμοι στο αμυντικό ριμπάουντ.",
      scorers:[], lineup:[] };
  }
  function nextSaturday(){
    const d=new Date(); d.setDate(d.getDate()+((6-d.getDay()+7)%7||7));
    return d.toISOString().slice(0,10);
  }
  function defaultMicro(){
    // Εβδομαδιαίος μικρόκυκλος μπάσκετ (εβδομάδα με 1 αγώνα, GD = Κυριακή)
    return [
      {day:"Δευτέρα",  code:"GD+1", load:25, name:"Αποθεραπεία & Video", color:"#38bdf8",
        items:["Recovery / κινητικότητα","Ανάλυση βίντεο προηγ. αγώνα","Ελαφριά σουτ"]},
      {day:"Τρίτη",    code:"GD-5", load:60, name:"Ατομικά & Σουτ", color:"#3b82f6",
        items:["Ball handling / footwork","Catch & shoot — 5 σημεία","Closeout & ατομική άμυνα","Ελεύθερες βολές"]},
      {day:"Τετάρτη",  code:"GD-4", load:85, name:"Δύναμη & Μετάβαση", color:"#f59e0b",
        items:["Δύναμη / εκρηκτικότητα","Fast break 3v2 → 2v1","Ριμπάουντ & box-out","Conditioning"]},
      {day:"Πέμπτη",   code:"GD-3", load:100, name:"Τακτική Επίθεσης (peak)", color:"#ef4444",
        items:["Motion / 5-out reads","Pick & roll εκτέλεση","Στημένες (Horns/Box)","Live 5v5"]},
      {day:"Παρασκευή",code:"GD-2", load:75, name:"Τακτική Άμυνας & Scout", color:"#a855f7",
        items:["Shell drill & rotations","PnR coverages (drop/switch)","Scouting αντιπάλου","Zone (2-3 / 1-3-1)"]},
      {day:"Σάββατο",  code:"GD-1", load:35, name:"Shootaround & Στημένες", color:"#22d3ee",
        items:["Walkthrough πλάνου","ATO / SLOB / BLOB","Χαμηλός όγκος, υψηλή ένταση","Ελεύθερες βολές"]},
      {day:"Κυριακή",  code:"GD",   load:100, name:"ΑΓΩΝΑΣ", color:"#e11d48",
        items:["Προαγωνιστική προθέρμανση","ΑΓΩΝΑΣ","Εφαρμογή πλάνου"]}
    ];
  }

  /* ---------- Βοηθητικά ---------- */
  const $ = s => document.querySelector(s);
  const esc = s => (s==null?"":(""+s)).replace(/[<>&"]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));
  function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),2200); }
  function avg(arr){ return arr.length? arr.reduce((a,b)=>a+b,0)/arr.length : 0; }
  function ovr(pl){ const v=Object.values(pl.attrs); return Math.round(avg(v)); }
  function attrColor(v){ return v>=15?"#fbbf24": v>=12?"#f59e0b": v>=9?"#fb923c":"#64748b"; }
  function loadColor(l){ return l>=90?"#ef4444": l>=60?"#f59e0b": l>=30?"#3b82f6":"#64748b"; }

  /* ---------- Modal ---------- */
  function modal(title, bodyHTML, footHTML){
    $("#modal").innerHTML = `<header><h3 style="margin:0">${title}</h3><button class="x" onclick="App.closeModal()">×</button></header>
      <div class="body">${bodyHTML}</div>${footHTML?`<div class="foot">${footHTML}</div>`:""}`;
    $("#modalBg").classList.add("open");
  }
  function closeModal(){ $("#modalBg").classList.remove("open"); }

  /* ---------- Navigation ---------- */
  const NAV = [
    {id:"dashboard", ic:"🏠", t:"Πίνακας"},
    {id:"squad",     ic:"👥", t:"Ρόστερ"},
    {id:"tactics",   ic:"🅱️", t:"Συστήματα"},
    {id:"playbook",  ic:"📋", t:"Συνεργασίες"},
    {id:"training",  ic:"🏋️", t:"Προπονήσεις"},
    {id:"matches",   ic:"🏀", t:"Αγώνες"},
    {id:"analytics", ic:"📊", t:"Αναλυτικά"},
    {id:"schedule",  ic:"📅", t:"Πρόγραμμα"},
    {id:"academy",   ic:"🎓", t:"Ακαδημία Τακτικής"}
  ];
  function renderNav(){
    $("#nav").innerHTML = NAV.map(n=>`<button class="${n.id===state.view?'active':''}" onclick="App.go('${n.id}')">
      <span class="ico">${n.ic}</span>${n.t}</button>`).join("");
  }
  function go(v){ state.view=v; renderNav();
    document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));
    $("#view-"+v).classList.add("active");
    ({dashboard:renderDashboard,squad:renderSquad,tactics:renderTactics,playbook:renderPlaybook,training:renderTraining,
      matches:renderMatches,analytics:renderAnalytics,schedule:renderSchedule,academy:renderAcademy}[v])();
    window.scrollTo(0,0);
  }

  /* ============================================================
     1) DASHBOARD
     ============================================================ */
  function renderDashboard(){
    const next = DB.matches.filter(m=>m.status==="upcoming").sort((a,b)=>a.date.localeCompare(b.date))[0];
    const days = next? Math.ceil((new Date(next.date)-new Date())/864e5) : null;
    const played = DB.matches.filter(m=>m.status==="played");
    const w=played.filter(m=>m.pf>m.pa).length, l=played.filter(m=>m.pf<m.pa).length;
    const ages = DB.players.map(p=>p.age);
    const curTac = DB.tactics.find(t=>!t.cat && tacSystem(t)===DB.club.system) || DB.tactics.find(t=>!t.cat);

    $("#view-dashboard").innerHTML = `
    <div class="sectionhead">
      <h2>🏠 Πίνακας Ελέγχου</h2>
      <div class="sub2">${esc(DB.club.name)} · Βασικό σύστημα ${esc(DB.club.system)}</div>
    </div>
    <div class="grid g4" style="margin-bottom:16px">
      <div class="kpi"><div class="ic">👥</div><div class="stat"><b>${DB.players.length}</b><span>Παίκτες ρόστερ</span></div></div>
      <div class="kpi"><div class="ic">📈</div><div class="stat"><b>${Math.round(avg(DB.players.map(ovr)))||0}</b><span>Μ.Ο. αξιολόγησης</span></div></div>
      <div class="kpi"><div class="ic">🎂</div><div class="stat"><b>${ages.length?Math.round(avg(ages)):0}</b><span>Μ.Ο. ηλικίας</span></div></div>
      <div class="kpi"><div class="ic">🏆</div><div class="stat"><b>${w}-${l}</b><span>Ν-Η (${played.length} αγ.)</span></div></div>
    </div>

    <div class="grid g2">
      <div class="card">
        <h3>🏀 Επόμενος Αγώνας <span class="tag">match center</span></h3>
        ${next? `
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:10px">
            <div style="font-size:40px">${days<=0?'🔴':'🗓️'}</div>
            <div>
              <div style="font-size:20px;font-weight:800">${esc(DB.club.short)} ${next.home?'🆚':'@'} ${esc(next.opp)}</div>
              <div class="sub">${esc(next.comp)} · ${fmtDate(next.date)} · ${days<=0?'ΣΗΜΕΡΑ':'σε '+days+' ημέρες'}</div>
            </div>
          </div>
          <div class="sub"><b>Πλάνο:</b> ${esc((DB.tactics.find(t=>t.id===next.tacticId)||{}).name||'—')} · Σύστημα ${esc(next.system||'—')}</div>
          <div class="sub" style="margin-top:6px"><b>Αντίπαλος:</b> ${esc(next.oppNotes||'—')}</div>
          <div style="margin-top:12px"><button class="btn primary sm" onclick="App.go('matches')">Άνοιγμα Match Center →</button></div>
        ` : `<div class="empty"><div class="big">🗓️</div>Δεν υπάρχει προγραμματισμένος αγώνας.<br><button class="btn sm primary" style="margin-top:10px" onclick="App.go('matches')">Πρόσθεσε αγώνα</button></div>`}
      </div>

      <div class="card">
        <h3>🅱️ Τρέχον Σύστημα <span class="tag">${esc(curTac.coach||'')}</span></h3>
        <div style="font-size:16px;font-weight:800;margin-bottom:4px">${curTac.emoji||'🏀'} ${esc(curTac.name)}</div>
        <div class="sub" style="margin-bottom:10px">${esc(curTac.summary)}</div>
        <div class="pill-row">${(curTac.style||[]).map(s=>`<span class="chip g">${esc(s)}</span>`).join("")}</div>
        <div style="margin-top:12px"><button class="btn blue sm" onclick="App.go('tactics');App.openTactic('${curTac.id}')">Ανάλυση συστήματος →</button></div>
      </div>
    </div>

    <div class="card" style="margin-top:16px">
      <h3>📅 Εβδομαδιαίος Μικρόκυκλος <span class="tag">Περιοδισμός</span></h3>
      ${microHTML()}
      <div class="legend">
        <span><i class="dotc" style="background:#3b82f6"></i>Χαμηλό φορτίο</span>
        <span><i class="dotc" style="background:#ef4444"></i>Peak (GD-3)</span>
        <span><i class="dotc" style="background:#a855f7"></i>Τακτική άμυνας</span>
        <span><i class="dotc" style="background:#e11d48"></i>Αγώνας</span>
      </div>
    </div>`;
  }

  function microHTML(){
    return `<div class="micro">${DB.microcycle.map((m,i)=>`
      <div class="md">
        <div class="dh"><span>${esc(m.day)}</span><span>${esc(m.code)}</span></div>
        <div class="dname">${esc(m.name)}</div>
        <div class="load-bar"><i style="width:${m.load}%;background:${m.color}"></i></div>
        <ul>${m.items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
      </div>`).join("")}</div>`;
  }
  function fmtDate(s){ if(!s) return "—"; const d=new Date(s); return d.toLocaleDateString("el-GR",{weekday:'short',day:'2-digit',month:'short'}); }

  /* ============================================================
     2) ΡΟΣΤΕΡ
     ============================================================ */
  const POS_ORDER = ["PG","SG","SF","PF","C"];
  const STATUS = { available:{t:"Διαθέσιμος",c:"b",ic:"✓"}, doubtful:{t:"Αμφίβολος",c:"a",ic:"?"}, injured:{t:"Τραυματίας",c:"r",ic:"➕"}, out:{t:"Εκτός",c:"g",ic:"✕"} };
  const STATUS_CYCLE = ["available","doubtful","injured","out"];
  let squadTab = "roster";
  function renderSquad(){
    const players = [...DB.players].sort((a,b)=>POS_ORDER.indexOf(a.pos)-POS_ORDER.indexOf(b.pos));
    $("#view-squad").innerHTML = `
      <div class="sectionhead">
        <h2>👥 Ρόστερ & Ανάλυση Παικτών</h2>
        <div class="sub2">${DB.players.length} παίκτες · ${DB.players.filter(p=>(p.status||'available')!=='available').length} μη διαθέσιμοι</div>
        <div class="sp">${squadTab==='roster'?'<button class="btn primary sm" onclick="App.editPlayer()">＋ Νέος Παίκτης</button>':'<button class="btn sm ghost" onclick="App.printRotation()">⇩ PDF</button>'}</div>
      </div>
      <div class="tabs">
        <button class="${squadTab==='roster'?'on':''}" onclick="App.squadTab('roster')">👤 Παίκτες</button>
        <button class="${squadTab==='rotation'?'on':''}" onclick="App.squadTab('rotation')">🔁 Rotation (λεπτά)</button>
      </div>
      <div id="squadBody"></div>`;
    if(squadTab==='rotation') renderRotation(); else renderRosterTable(players);
  }
  function squadTabSet(t){ squadTab=t; renderSquad(); }
  function renderRosterTable(players){
    $("#squadBody").innerHTML = `
      <div class="card">
        <div class="tbl-wrap">
        <table>
          <thead><tr><th>Παίκτης</th><th>Θέση</th><th class="center">Διαθεσιμότητα</th><th class="center">Ηλικ.</th><th class="center">Υ/Β</th><th class="center">OVR</th>
          <th>Φυσ. κατάσταση</th><th>Ηθικό</th><th class="center">Λεπτά</th><th class="center">Π/Ασ/Ρ</th><th></th></tr></thead>
          <tbody>${players.map(pl=>{
            const o=ovr(pl); const st=STATUS[pl.status||'available'];
            return `<tr style="${(pl.status&&pl.status!=='available')?'opacity:.82':''}">
              <td><b>${esc(pl.name)}</b></td>
              <td><span class="chip">${esc(pl.pos)}</span></td>
              <td class="center"><span class="chip ${st.c}" style="cursor:pointer" title="Κλικ για αλλαγή" onclick="App.cycleStatus('${pl.id}')">${st.ic} ${st.t}</span></td>
              <td class="center">${pl.age}</td>
              <td class="center" style="color:var(--mut);font-size:12px">${pl.height||'—'}<span style="color:var(--dim)">/</span>${pl.weight||'—'}</td>
              <td class="center"><b style="color:${attrColor(o)}">${o}</b></td>
              <td>${bar(pl.fitness,'#22d3ee')}</td>
              <td>${bar(pl.morale,'#3b82f6')}</td>
              <td class="center">${pl.minutes||0}</td>
              <td class="center">${pl.points||0}/${pl.assists||0}/${pl.rebounds||0}</td>
              <td class="right">
                <button class="btn sm" onclick="App.viewPlayer('${pl.id}')">Ανάλυση</button>
                <button class="btn sm ghost" onclick="App.editPlayer('${pl.id}')">✎</button>
              </td></tr>`;
          }).join("")}</tbody>
        </table>
        </div>
      </div>`;
  }
  function cycleStatus(id){ const pl=DB.players.find(p=>p.id===id); if(!pl)return; const i=STATUS_CYCLE.indexOf(pl.status||'available'); pl.status=STATUS_CYCLE[(i+1)%STATUS_CYCLE.length]; save(); renderSquad(); }

  /* ---- Rotation planner (λεπτά ανά περίοδο) ---- */
  function renderRotation(){
    const r=DB.rotation; const P=r.periods||4; const players=[...DB.players].sort((a,b)=>POS_ORDER.indexOf(a.pos)-POS_ORDER.indexOf(b.pos));
    const avail=players.filter(p=>(p.status||'available')!=='out');
    const grid=r.grid||{};
    const cnt=Array(P).fill(0);
    avail.forEach(pl=>{ const row=grid[pl.id]||[]; for(let q=0;q<P;q++) if(row[q]) cnt[q]++; });
    const totalMin = pl=>{ const row=grid[pl.id]||[]; let n=0; for(let q=0;q<P;q++) if(row[q]) n++; return n*(r.periodMin||10); };
    $("#squadBody").innerHTML = `
      <div class="card">
        <div class="tools" style="align-items:center">
          <label style="margin:0">Περίοδοι:</label>
          <select style="max-width:90px" onchange="App.rotSet('periods',this.value)">${[2,4].map(n=>`<option ${P===n?'selected':''}>${n}</option>`).join("")}</select>
          <label style="margin:0 0 0 8px">Λεπτά/περίοδο:</label>
          <input type="number" style="max-width:80px" value="${r.periodMin||10}" onchange="App.rotSet('periodMin',this.value)">
          <button class="btn sm ghost" onclick="App.rotClear()">🗑️ Καθαρισμός</button>
          <span class="sub" style="font-size:11.5px">Κλικ στα κελιά για να ορίσεις ποιοι 5 παίζουν κάθε περίοδο</span>
        </div>
        <div class="tbl-wrap">
        <table>
          <thead><tr><th>Παίκτης</th><th>Θέση</th>${Array.from({length:P},(_,q)=>`<th class="center">Π${q+1}</th>`).join("")}<th class="center">Λεπτά</th></tr></thead>
          <tbody>${avail.map(pl=>{
            const row=grid[pl.id]||[]; const tm=totalMin(pl);
            return `<tr><td><b>${esc(pl.name)}</b>${(pl.status&&pl.status!=='available')?` <span class="chip ${STATUS[pl.status].c}" style="font-size:10px">${STATUS[pl.status].ic}</span>`:''}</td>
              <td><span class="chip">${esc(pl.pos)}</span></td>
              ${Array.from({length:P},(_,q)=>`<td class="center"><button class="btn sm ${row[q]?'primary':'ghost'}" style="min-width:34px;padding:5px 8px" onclick="App.toggleRot('${pl.id}',${q})">${row[q]?'✓':'·'}</button></td>`).join("")}
              <td class="center"><b style="color:${tm>0?'var(--acc)':'var(--dim)'}">${tm}′</b></td></tr>`;
          }).join("")}</tbody>
          <tfoot><tr><td colspan="2" class="right" style="color:var(--mut)">Στο παρκέ / περίοδο:</td>
            ${cnt.map(c=>`<td class="center"><b style="color:${c===5?'#22d3ee':'#ef4444'}">${c}/5</b></td>`).join("")}<td></td></tr></tfoot>
        </table>
        </div>
        <div class="sub" style="font-size:11.5px;margin-top:8px">Στόχος: <b>5 παίκτες</b> στο παρκέ κάθε περίοδο (πράσινο/γαλάζιο = σωστό, κόκκινο = λάθος αριθμός). Οι «Εκτός» δεν εμφανίζονται.</div>
      </div>`;
  }
  function toggleRot(id,q){ const g=DB.rotation.grid; const row=g[id]||(g[id]=[]); row[q]=!row[q]; save(); renderRotation(); }
  function rotSet(k,v){ DB.rotation[k]=Math.max(1,+v||(k==='periods'?4:10)); save(); renderRotation(); }
  function rotClear(){ if(!confirm("Καθαρισμός rotation;"))return; DB.rotation.grid={}; save(); renderRotation(); }
  function printRotation(){
    const r=DB.rotation, P=r.periods||4, players=[...DB.players].sort((a,b)=>POS_ORDER.indexOf(a.pos)-POS_ORDER.indexOf(b.pos)).filter(p=>(p.status||'available')!=='out');
    const grid=r.grid||{};
    const head=["Παίκτης","Θέση",...Array.from({length:P},(_,q)=>"Π"+(q+1)),"Λεπτά"];
    const body=players.map(pl=>{ const row=grid[pl.id]||[]; let n=0; const cells=Array.from({length:P},(_,q)=>{ if(row[q])n++; return row[q]?"●":"·"; }); return [pl.name,pl.pos,...cells,(n*(r.periodMin||10))+"′"]; });
    ensurePrint(`<div class="pdoc">${pHead("Rotation — Λεπτά Παικτών", DB.club.name+" · "+P+" περίοδοι × "+(r.periodMin||10)+"′")}${ptable(head,body)}${pFoot()}</div>`);
  }
  function bar(v,c){ v=Math.max(0,Math.min(100,v||0)); return `<div class="attr-bar" style="width:90px"><i style="width:${v}%;background:${c}"></i></div>`; }
  function suitabilityHTML(pl){
    const s=pl.suitability||{[pl.pos]:"good"};
    const groups={good:[],ok:[],no:[]};
    POS_ORDER.forEach(pos=>{ if(s[pos]) groups[s[pos]].push(pos); });
    const row=lvl=>groups[lvl].length? `<div style="display:grid;grid-template-columns:74px 1fr;gap:8px;align-items:center;margin-bottom:6px">
       <span class="chip ${SUIT[lvl].c}">${SUIT[lvl].t}</span>
       <div class="pill-row">${groups[lvl].map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div></div>`:"";
    const html=row("good")+row("ok")+row("no");
    return html || '<div class="sub">Δεν έχει οριστεί καταλληλότητα.</div>';
  }

  function viewPlayer(id){
    const pl = DB.players.find(p=>p.id===id); if(!pl) return;
    const entries = Object.entries(pl.attrs);
    modal(`${esc(pl.name)} — ${ROLE_NAMES[pl.pos]||pl.pos}`, `
      <div class="pmodal">
        <div>${radarSVG(entries, Court.roleColor(pl.pos))}</div>
        <div>
          <div class="stat" style="margin-bottom:10px"><b style="color:${attrColor(ovr(pl))}">${ovr(pl)}</b><span>Συνολική Αξιολόγηση (OVR)</span></div>
          <div class="mini-bars">${entries.map(([k,v])=>`
            <div class="mb"><b style="color:var(--txt);text-align:left">${esc(k)}</b>
              <div class="attr-bar"><i style="width:${v/20*100}%;background:${attrColor(v)}"></i></div>
              <b>${v}</b></div>`).join("")}</div>
          <div class="row" style="margin-top:12px">
            <div class="kpi" style="padding:8px 10px"><div class="ic" style="width:34px;height:34px;font-size:16px">📏</div><div class="stat"><b style="font-size:18px">${pl.height||'—'}<small style="font-size:11px;color:var(--mut)"> cm</small></b><span>Ύψος</span></div></div>
            <div class="kpi" style="padding:8px 10px"><div class="ic" style="width:34px;height:34px;font-size:16px">⚖️</div><div class="stat"><b style="font-size:18px">${pl.weight||'—'}<small style="font-size:11px;color:var(--mut)"> kg</small></b><span>Βάρος</span></div></div>
          </div>
          <div class="row" style="margin-top:10px">
            <div><label>Φυσ. κατάσταση</label><div>${bar(pl.fitness,'#22d3ee')} ${pl.fitness}%</div></div>
            <div><label>Ηθικό</label><div>${bar(pl.morale,'#3b82f6')} ${pl.morale}%</div></div>
          </div>
        </div>
      </div>
      <div class="detail-block" style="margin-top:14px"><h4>🎽 Θέσεις που έχει παίξει</h4>
        <div class="pill-row">${(pl.pastPositions&&pl.pastPositions.length?pl.pastPositions:[pl.pos]).map(x=>`<span class="chip b">${esc(x)}<small style="color:var(--dim)"> ${esc(ROLE_NAMES[x]||'')}</small></span>`).join("")}</div></div>
      <div class="detail-block"><h4>🎯 Καταλληλότητα Θέσεων</h4>
        ${suitabilityHTML(pl)}</div>
      ${pl.notes?`<div class="detail-block"><h4>📝 Σημειώσεις</h4><div class="sub">${esc(pl.notes)}</div></div>`:""}`,
      `<button class="btn" onclick="App.editPlayer('${pl.id}')">✎ Επεξεργασία</button>
       <button class="btn primary" onclick="App.closeModal()">Κλείσιμο</button>`);
  }

  function editPlayer(id){
    const pl = id? DB.players.find(p=>p.id===id) : null;
    const attrKeys = pl? Object.keys(pl.attrs) : ["σουτ","τρίποντο","πάσα","ντρίμπλα","άμυνα","ριμπάουντ"];
    const attrRows = attrKeys.map(k=>`
      <div class="mb" style="display:grid;grid-template-columns:1fr 90px;gap:8px;align-items:center;margin-bottom:6px">
        <label style="margin:0">${esc(k)}</label>
        <input type="number" min="1" max="20" value="${pl?pl.attrs[k]:12}" data-attr="${esc(k)}"></div>`).join("");
    modal(pl?"Επεξεργασία Παίκτη":"Νέος Παίκτης", `
      <div class="row"><div class="field"><label>Όνομα</label><input id="pName" value="${pl?esc(pl.name):''}"></div>
        <div class="field" style="max-width:130px"><label>Θέση</label>
          <select id="pPos">${POS_ORDER.map(p=>`<option ${pl&&pl.pos===p?'selected':''}>${p}</option>`).join("")}</select></div>
        <div class="field" style="max-width:90px"><label>Ηλικία</label><input type="number" id="pAge" value="${pl?pl.age:22}"></div></div>
      <div class="row"><div class="field"><label>Ύψος (cm)</label><input type="number" id="pHt" value="${pl?pl.height:200}"></div>
        <div class="field"><label>Βάρος (kg)</label><input type="number" id="pWt" value="${pl?pl.weight:95}"></div>
        <div class="field"><label>Φυσ. κατάσταση %</label><input type="number" id="pFit" value="${pl?pl.fitness:90}"></div>
        <div class="field"><label>Ηθικό %</label><input type="number" id="pMor" value="${pl?pl.morale:80}"></div></div>
      <div class="field"><label>Θέσεις που έχει παίξει (χωρισμένες με κόμμα)</label>
        <input id="pPast" value="${pl?esc((pl.pastPositions||[]).join(', ')):''}" placeholder="π.χ. PG, SG"></div>
      <div class="detail-block"><h4>Χαρακτηριστικά (1-20)</h4><div id="pAttrs">${attrRows}</div>
        <button class="btn sm ghost" onclick="App.addAttrRow()">＋ Χαρακτηριστικό</button></div>
      <div class="detail-block"><h4>🎯 Καταλληλότητα ανά θέση</h4>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px 12px">
          ${POS_ORDER.map(pos=>{ const cur=pl&&pl.suitability?pl.suitability[pos]:''; return `
            <div style="display:grid;grid-template-columns:44px 1fr;gap:6px;align-items:center">
              <span class="chip">${pos}</span>
              <select data-suit="${pos}">
                <option value="" ${!cur?'selected':''}>—</option>
                <option value="good" ${cur==='good'?'selected':''}>Καλά</option>
                <option value="ok" ${cur==='ok'?'selected':''}>Μέτρια</option>
                <option value="no" ${cur==='no'?'selected':''}>Καθόλου</option>
              </select></div>`; }).join("")}
        </div></div>
      <div class="field"><label>Σημειώσεις</label><textarea id="pNotes">${pl?esc(pl.notes):''}</textarea></div>`,
      `${pl?`<button class="btn danger" onclick="App.delPlayer('${pl.id}')">Διαγραφή</button>`:''}
       <button class="btn" onclick="App.closeModal()">Άκυρο</button>
       <button class="btn primary" onclick="App.savePlayer('${id||''}')">Αποθήκευση</button>`);
  }
  function addAttrRow(){
    const div=document.createElement("div"); div.className="mb";
    div.style.cssText="display:grid;grid-template-columns:1fr 90px;gap:8px;align-items:center;margin-bottom:6px";
    div.innerHTML=`<input type="text" placeholder="όνομα χαρακτηριστικού" oninput="this.nextElementSibling.dataset.attr=this.value.trim()">
      <input type="number" min="1" max="20" value="12" data-attr="">`;
    $("#pAttrs").appendChild(div); div.querySelector('input').focus();
  }
  function savePlayer(id){
    const attrs={}; document.querySelectorAll('#pAttrs input[data-attr]').forEach(i=>{ const k=(i.dataset.attr||'').trim(); if(k) attrs[k]=Math.max(1,Math.min(20,+i.value||1)); });
    const suitability={}; document.querySelectorAll('select[data-suit]').forEach(s=>{ if(s.value) suitability[s.dataset.suit]=s.value; });
    const past=$("#pPast").value.split(",").map(x=>x.trim()).filter(Boolean);
    const pos=$("#pPos").value;
    if(!suitability[pos]) suitability[pos]="good";
    const data={ name:$("#pName").value.trim()||"Παίκτης", pos, age:+$("#pAge").value||20,
      height:+$("#pHt").value||200, weight:+$("#pWt").value||95,
      pastPositions: past.length?past:[pos], suitability,
      fitness:+$("#pFit").value||90, morale:+$("#pMor").value||80, attrs, notes:$("#pNotes").value.trim() };
    if(id){ Object.assign(DB.players.find(p=>p.id===id), data); }
    else { DB.players.push({ id:"pl_"+Math.random().toString(36).slice(2,9), minutes:0,points:0,assists:0,rebounds:0, ...data }); }
    save(); closeModal(); renderSquad(); toast("Αποθηκεύτηκε");
  }
  function delPlayer(id){ if(!confirm("Διαγραφή παίκτη;")) return; DB.players=DB.players.filter(p=>p.id!==id); save(); closeModal(); renderSquad(); }

  /* radar SVG */
  function radarSVG(entries, color){
    const n=entries.length, cx=90,cy=90,R=72, max=20;
    const pt=(i,r)=>[cx+r*Math.cos(-Math.PI/2+i*2*Math.PI/n), cy+r*Math.sin(-Math.PI/2+i*2*Math.PI/n)];
    let grid="";
    [0.25,0.5,0.75,1].forEach(f=>{ grid+=`<polygon points="${entries.map((_,i)=>pt(i,R*f).join(",")).join(" ")}" fill="none" stroke="#2f4370" stroke-width="1"/>`; });
    entries.forEach((_,i)=>{ const[x,y]=pt(i,R); grid+=`<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#2f4370" stroke-width="1"/>`; });
    const poly=entries.map(([_,v],i)=>pt(i,R*Math.min(v,max)/max).join(",")).join(" ");
    const labels=entries.map(([k],i)=>{ const[x,y]=pt(i,R+13); return `<text x="${x}" y="${y}" font-size="9" fill="#9fb0cc" text-anchor="middle" dominant-baseline="middle">${esc(k)}</text>`; }).join("");
    return `<svg viewBox="0 0 180 180" style="width:100%;max-width:280px">
      ${grid}<polygon points="${poly}" fill="${color}44" stroke="${color}" stroke-width="2"/>
      ${entries.map(([_,v],i)=>{const[x,y]=pt(i,R*Math.min(v,max)/max);return `<circle cx="${x}" cy="${y}" r="2.4" fill="${color}"/>`;}).join("")}
      ${labels}</svg>`;
  }

  /* ============================================================
     3) ΣΥΣΤΗΜΑΤΑ / ΤΑΚΤΙΚΕΣ
     ============================================================ */
  function renderTactics(){
    const systems = DB.tactics.filter(t=>!t.cat);
    if(!state.tacticId || !systems.some(t=>t.id===state.tacticId)) state.tacticId = systems[0].id;
    $("#view-tactics").innerHTML = `
      <div class="sectionhead">
        <h2>🅱️ Συστήματα — Πίνακας & Ανάλυση</h2>
        <div class="sub2">Βιβλιοθήκη μεγάλων προπονητών + δικά σου</div>
        <div class="sp">
          <button class="btn sm" onclick="App.openDesigner()">✏️ Σχεδιαστής</button>
          <button class="btn primary sm" onclick="App.newTactic()">＋ Νέο Σύστημα</button>
        </div>
      </div>
      <div class="board-wrap">
        <div class="card">
          <div id="boardArea"></div>
        </div>
        <div>
          <div class="card" style="margin-bottom:16px">
            <h3>📚 Βιβλιοθήκη Συστημάτων</h3>
            <div id="tacList" style="max-height:320px;overflow:auto">${systems.map(t=>`
              <div class="list-item ${t.id===state.tacticId?'sel':''}" onclick="App.openTactic('${t.id}')">
                <div class="em">${t.emoji||'🏀'}</div>
                <div class="meta"><b>${esc(t.name)}</b><small>${esc(t.coach||'')} · ${esc(tacSystem(t))}</small></div>
                ${t.custom?'<span class="chip a">δικό μου</span>':''}
              </div>`).join("")}</div>
          </div>
          <div class="card" id="tacDetail"></div>
        </div>
      </div>`;
    openTactic(state.tacticId);
  }

  function openTactic(id){
    state.tacticId=id; state.designer=null;
    const t = DB.tactics.find(x=>x.id===id); if(!t) return;
    if(!t.positions){
      t.positions = (FORMATIONS[tacSystem(t)]||t.customPositions||FORMATIONS["5-Out (Motion)"]).map(p=>({r:p.r,x:p.x,y:p.y}));
      save();
    }
    document.querySelectorAll("#tacList .list-item").forEach(el=>el.classList.remove("sel"));
    drawTactBoard(t);
    renderTacticDetail(t);
    const li=[...document.querySelectorAll("#tacList .list-item")].find(el=>el.getAttribute("onclick").includes("'"+id+"'"));
    if(li) li.classList.add("sel");
  }

  function drawTactBoard(t){
    Court.render($("#boardArea"), t.positions, {
      arrows:t.movements||[], draws:t.draws||[], opp:t.opp||[], oppLabelMode:t.oppLabel, oppColor:t.oppColor, draggable:true, tool:state.boardTool, full:boardFull(t), ball:t.ball||null,
      onOppMove:(oi,pos)=>{ if(t.opp&&t.opp[oi]){ t.opp[oi].x=pos.x; t.opp[oi].y=pos.y; save(); } },
      onMove:()=>save(), onBallMove:(b)=>{ t.ball=b; save(); },
      onToken:(i)=>assignRole(t.id,i),
      onArrow:(from,to,type)=>{ (t.movements=t.movements||[]).push({from,to,type}); save(); drawTactBoard(t); }
    });
    const seg = (v,ic,lbl)=>`<button class="${state.boardTool===v?'on':''}" onclick="App.boardTool('${v}')">${ic} ${lbl}</button>`;
    $("#boardArea").insertAdjacentHTML("afterbegin", `
      <div class="tools">
        <div style="font-weight:800;font-size:15px">${t.emoji||'🏀'} ${esc(t.name)}</div>
        <div style="margin-left:auto;display:flex;gap:6px;align-items:center">
          <span class="chip">${esc(tacSystem(t))}</span>
          <button class="btn sm" onclick="App.whiteboard('${t.id}')" title="Ταμπλό Timeout — πλήρης οθόνη / landscape με γραφίδα">📐 Ταμπλό</button>
          <button class="btn sm blue" onclick="App.present('${t.id}')">🖥️ Προβολή</button>
          <button class="btn sm ghost" onclick="App.printTactic('${t.id}')">⇩ PDF</button>
          <button class="btn sm ghost" onclick="App.snapImage('#boardArea','sistima')" title="Αποθήκευση εικόνας PNG">📷</button>
          <button class="btn sm primary" onclick="App.useTactic('${t.id}')">Βασικό</button>
        </div>
      </div>
      <div class="tools">
        <div class="seg">${seg('move','🖐','Θέσεις')}${seg('run','➡️','Κίνηση')}${seg('pass','⚡','Πάσα')}${seg('screen','⛌','Μπλόκο')}</div>
        <button class="btn sm ghost" onclick="App.clearArrows('${t.id}')">🗑️ Βελάκια</button>
        <span class="sub" style="font-size:11.5px">${state.boardTool==='move'?'Σύρε πιόνι για θέση · κλικ σε πιόνι για ΡΟΛΟ':'Σύρε πάνω στο γήπεδο για να τραβήξεις γραμμή'}</span>
      </div>
      <div class="legend" style="margin-bottom:8px">
        <span><i class="dotc" style="background:#fde047"></i>Κίνηση</span>
        <span><i class="dotc" style="background:#38bdf8"></i>Πάσα</span>
        <span><i class="dotc" style="background:#f59e0b"></i>Μπλόκο (screen)</span>
        <span><i class="dotc" style="background:#ff8a8a"></i>Ρόλος θέσης</span>
      </div>`);
  }
  function boardTool(v){ state.boardTool=v; drawTactBoard(DB.tactics.find(t=>t.id===state.tacticId)); }
  function clearArrows(id){ const t=DB.tactics.find(x=>x.id===id); t.movements=[]; save(); drawTactBoard(t); toast("Καθαρίστηκαν τα βελάκια"); }

  /* ---- Λειτουργία Προβολής (Presentation / Projector) ---- */
  const PR_SLIDES=[{k:"overview"},{k:"offense"},{k:"defense"},{k:"transition"},{k:"special"}];
  function present(id){
    const t=DB.tactics.find(x=>x.id===id); if(!t) return;
    if(!t.positions){ t.positions=(FORMATIONS[tacSystem(t)]||t.customPositions||FORMATIONS["5-Out (Motion)"]).map(p=>({r:p.r,x:p.x,y:p.y})); save(); }
    state.present={id, slide:0, arrows:true, tool:"move"};
    let ov=$("#present"); if(!ov){ ov=document.createElement("div"); ov.id="present"; document.body.appendChild(ov); }
    ov.classList.add("on");
    ov.ontouchstart=e=>{ ov._tx=e.changedTouches[0].clientX; };
    ov.ontouchend=e=>{ const dx=e.changedTouches[0].clientX-(ov._tx||0); if(Math.abs(dx)>50) presentNav(dx<0?1:-1); };
    document.addEventListener("keydown", presentKey);
    renderPresent();
    try{ const rf=ov.requestFullscreen||ov.webkitRequestFullscreen; if(rf){ const r=rf.call(ov); if(r&&r.catch) r.catch(()=>{}); } }catch(_){}
  }
  function renderPresent(){
    const ov=$("#present"); const {id,slide,arrows,tool}=state.present;
    const t=DB.tactics.find(x=>x.id===id); const cur=PR_SLIDES[slide];
    const ballOn=!!t.ball;
    const isOv=cur.k==="overview";
    const title=isOv?(t.cat?"📋 Επισκόπηση Συνεργασίας":"📋 Επισκόπηση Συστήματος"):phaseLabels(t)[cur.k].t;
    const dotc=isOv?"#e4222f":(cur.k==="defense"?"#ef4444":cur.k==="transition"?"#f59e0b":cur.k==="special"?"#a855f7":"#3b82f6");
    const tag=`<span class="dotc" style="width:16px;height:16px;border-radius:50%;background:${dotc};display:inline-block"></span>`;
    const bullets=isOv?[t.summary, "Στυλ: "+(t.style||[]).join(" · "), "Ένταση: "+(t.intensity||"—"), "Κλειδιά: "+(t.keyRoles||[]).join(" · ")].filter(x=>x&&!/:\s*$/.test(x)) : (t.phases[cur.k]||[]);
    ov.innerHTML=`
      <div class="pr-top">
        <div class="badge" style="width:38px;height:38px;font-size:18px">${LOGO_SVG(20)}</div>
        <div class="name">${t.emoji||""} ${esc(t.name)}</div>
        <span class="chip">${esc(tacSystem(t))}</span>
        <span class="chip b">${esc(t.coach||"")}</span>
        <div style="margin-left:auto;display:flex;gap:6px;flex-wrap:wrap;align-items:center">
          <div class="seg">
            <button class="${tool==="move"?"on":""}" onclick="App.presentTool('move')" title="Μετακίνηση παικτών/μπάλας">🖐</button>
            <button class="${tool==="run"?"on":""}" onclick="App.presentTool('run')" title="Βέλος κίνησης">➡️</button>
            <button class="${tool==="pass"?"on":""}" onclick="App.presentTool('pass')" title="Βέλος πάσας">⚡</button>
            <button class="${tool==="screen"?"on":""}" onclick="App.presentTool('screen')" title="Μπλόκο (screen)">⛌</button>
          </div>
          <button class="btn pr-btn ${ballOn?"blue":"ghost"}" onclick="App.presentBall()" title="Εμφάνιση/κρύψιμο μπάλας">🏀 Μπάλα</button>
          <button class="btn pr-btn ghost" onclick="App.presentClear()" title="Καθαρισμός γραμμών">🗑️</button>
          <button class="btn pr-btn" onclick="App.presentArrows()">Βελάκια: ${arrows?"ON":"OFF"}</button>
          <button class="btn danger pr-btn" onclick="App.presentExit()">✕ Έξοδος</button>
        </div>
      </div>
      <div class="pr-body">
        <div class="pr-pitch" id="prPitch"></div>
        <div class="pr-panel">
          <div class="pr-phase">${tag} ${esc(title)} <span class="chip b" style="font-size:14px;font-weight:700">${slide+1}/${PR_SLIDES.length}</span></div>
          <ul class="pr-list">${bullets.map(b=>`<li>${esc(b)}</li>`).join("")}</ul>
          <div class="sub" style="margin-top:10px;font-size:13px">${tool==="move"?"🖐 Σύρε παίκτες ή τη μπάλα":"Σύρε πάνω στο γήπεδο για γραμμή"} · 🏀 για κίνηση με/χωρίς μπάλα</div>
        </div>
      </div>
      <div class="pr-foot">
        <button class="btn pr-btn" onclick="App.presentNav(-1)">← Προηγ.</button>
        <div class="pr-dots">${PR_SLIDES.map((s,i)=>`<span class="pr-dot ${i===slide?"on":""}" onclick="App.presentGo(${i})" title="${i===0?"Επισκόπηση":phaseLabels(t)[s.k].t}"></span>`).join("")}</div>
        <button class="btn primary pr-btn" onclick="App.presentNav(1)">Επόμ. →</button>
      </div>`;
    Court.render($("#prPitch"), t.positions, {
      arrows:arrows?(t.movements||[]):[], draws:t.draws||[], opp:t.opp||[], oppLabelMode:t.oppLabel, oppColor:t.oppColor, draggable:true, tool:tool, ball:t.ball||null, full:boardFull(t),
      onOppMove:(oi,pos)=>{ if(t.opp&&t.opp[oi]){ t.opp[oi].x=pos.x; t.opp[oi].y=pos.y; save(); } },
      onMove:()=>save(),
      onArrow:(from,to,type)=>{ (t.movements=t.movements||[]).push({from,to,type}); save(); renderPresent(); },
      onBallMove:(b)=>{ t.ball=b; save(); }
    });
  }
  function presentTool(v){ state.present.tool=v; renderPresent(); }
  function presentBall(){ const t=DB.tactics.find(x=>x.id===state.present.id); if(t.ball) delete t.ball; else t.ball={x:50,y:35}; save(); renderPresent(); }
  function presentClear(){ const t=DB.tactics.find(x=>x.id===state.present.id); t.movements=[]; save(); renderPresent(); }
  function presentNav(d){ state.present.slide=Math.max(0,Math.min(PR_SLIDES.length-1,state.present.slide+d)); renderPresent(); }
  function presentGo(i){ state.present.slide=i; renderPresent(); }
  function presentArrows(){ state.present.arrows=!state.present.arrows; renderPresent(); }
  function presentKey(e){
    if(!state.present) return;
    if(e.key==="ArrowRight"||e.key===" "||e.key==="PageDown"){ e.preventDefault(); presentNav(1); }
    else if(e.key==="ArrowLeft"||e.key==="PageUp"){ e.preventDefault(); presentNav(-1); }
    else if(e.key==="Escape"){ presentExit(); }
  }
  function presentExit(){
    const ov=$("#present"); if(ov) ov.classList.remove("on");
    document.removeEventListener("keydown", presentKey);
    state.present=null;
    try{ if(document.fullscreenElement) document.exitFullscreen(); }catch(_){}
  }

  /* ---- Ταμπλό Timeout (landscape πλήρης οθόνη, γραφίδα) ---- */
  const WB_COLORS=["#ffffff","#fde047","#ef4444","#38bdf8","#f59e0b"];
  const WB_WIDTHS=[{w:1.0,t:"Λεπτό"},{w:1.8,t:"Μεσαίο"},{w:2.8,t:"Χοντρό"}];
  function whiteboard(id){
    const t=DB.tactics.find(x=>x.id===id); if(!t) return;
    if(!t.positions){ t.positions=(t.customPositions||FORMATIONS[tacSystem(t)]||FORMATIONS["5-Out (Motion)"]).map(p=>({...p})); save(); }
    state.wb={id, tool:"move", flip:false, color:"#ffffff", w:1.8, labels:"role"};
    let ov=$("#whiteboard"); if(!ov){ ov=document.createElement("div"); ov.id="whiteboard"; document.body.appendChild(ov); }
    ov.classList.add("on");
    document.addEventListener("keydown", wbKey);
    renderWhiteboard();
    try{
      const rf=ov.requestFullscreen||ov.webkitRequestFullscreen;
      const lock=()=>{ try{ if(screen.orientation&&screen.orientation.lock) screen.orientation.lock('landscape').catch(()=>{}); }catch(_){} };
      if(rf){ const r=rf.call(ov); if(r&&r.then) r.then(lock).catch(lock); else lock(); } else lock();
    }catch(_){}
  }
  function renderWhiteboard(){
    const ov=$("#whiteboard"); const wb=state.wb; const t=DB.tactics.find(x=>x.id===wb.id); if(!t) return;
    const ballOn=!!t.ball;
    const seg=(v,ic,lbl)=>`<button class="${wb.tool===v?'on':''}" onclick="App.wbTool('${v}')">${ic} ${lbl}</button>`;
    const palette = wb.tool==="draw" ? `
      <div class="wb-top" style="border-top:1px solid var(--line);border-bottom:1px solid var(--line2);padding-top:6px;padding-bottom:6px">
        <span class="wb-hint" style="font-weight:700">Χρώμα:</span>
        ${WB_COLORS.map(c=>`<button onclick="App.wbColor('${c}')" title="${c}" style="width:26px;height:26px;border-radius:50%;background:${c};border:2px solid ${wb.color===c?'#fff':'transparent'};box-shadow:0 0 0 1px #0b1220"></button>`).join("")}
        <span class="wb-hint" style="font-weight:700;margin-left:10px">Πάχος:</span>
        <div class="seg">${WB_WIDTHS.map(x=>`<button class="${wb.w===x.w?'on':''}" onclick="App.wbWidth(${x.w})">${x.t}</button>`).join("")}</div>
        <button class="btn sm ghost" onclick="App.wbUndo()" style="margin-left:8px">↶ Αναίρεση</button>
        <span class="wb-hint">Ζωγράφισε ελεύθερα με γραφίδα/δάχτυλο</span>
      </div>` : "";
    const oppOn=!!(t.opp&&t.opp.length);
    const lseg=(v,lbl)=>`<button class="${(wb.labels||'role')===v?'on':''}" onclick="App.wbLabels('${v}')">${lbl}</button>`;
    ov.innerHTML=`
      <div class="wb-top">
        <div class="badge" style="width:32px;height:32px">${LOGO_SVG(18)}</div>
        <b style="font-size:15px">${t.emoji||''} ${esc(stripEmoji(t.name))}</b>
        <div class="seg" style="margin-left:auto">${seg('move','🖐','Θέσεις')}${seg('run','➡️','Κίνηση')}${seg('pass','⚡','Πάσα')}${seg('screen','⛌','Μπλόκο')}${seg('draw','✏️','Σχέδιο')}${seg('erase','🧽','Γόμα')}</div>
        <button class="btn sm ${ballOn?'blue':'ghost'}" onclick="App.wbBall()">🏀 Μπάλα</button>
        <button class="btn sm ${oppOn?'blue':'ghost'}" onclick="App.wbOpp()" title="Αντίπαλα πιόνια (X)">❌ Αντίπαλοι</button>
        <button class="btn sm ${wb.flip?'blue':'ghost'}" onclick="App.wbFlip()" title="Αντιστροφή γηπέδου (καλάθι κάτω)">↕️ Αντιστροφή</button>
        <button class="btn sm ghost" onclick="App.wbSnapshot()" title="Αποθήκευση ταμπλό ως εικόνα PNG">📷 Εικόνα</button>
        <button class="btn sm ghost" onclick="App.wbClear()">🗑️ Καθαρισμός</button>
        <button class="btn danger sm" onclick="App.wbExit()">✕ Έξοδος</button>
      </div>
      <div class="wb-top" style="border-bottom:1px solid var(--line2);padding-top:6px;padding-bottom:6px">
        <span class="wb-hint" style="font-weight:700">🏷️ Ετικέτες:</span>
        <div class="seg">${lseg('role','Ρόλοι')}${lseg('num','Νούμερα')}${lseg('name','Ονόματα')}</div>
        ${wb.labels==='name' ? `<button class="btn sm ghost" onclick="App.editStarters()" title="Όρισε βασική πεντάδα">⚙️ Βασικοί</button>` : ""}
        ${oppOn ? `<span class="wb-hint" style="font-weight:700;margin-left:12px">❌ Αντίπαλοι:</span>
          <div class="seg"><button class="${(t.oppLabel||'x')==='x'?'on':''}" onclick="App.wbOppLabel('x')">X</button><button class="${t.oppLabel==='num'?'on':''}" onclick="App.wbOppLabel('num')">1-5</button></div>
          ${['#1e293b','#0b1220','#64748b','#7f1d1d'].map(c=>`<button onclick="App.wbOppColor('${c}')" title="χρώμα αντιπάλων" style="width:22px;height:22px;border-radius:50%;background:${c};border:2px solid ${(t.oppColor||'#1e293b')===c?'#fff':'transparent'};box-shadow:0 0 0 1px #0b1220"></button>`).join("")}` : ""}
        ${wb.tool==="draw" ? `<span class="wb-hint" style="font-weight:700;margin-left:12px">🎨 Χρώμα:</span>
          ${WB_COLORS.map(c=>`<button onclick="App.wbColor('${c}')" title="${c}" style="width:24px;height:24px;border-radius:50%;background:${c};border:2px solid ${wb.color===c?'#fff':'transparent'};box-shadow:0 0 0 1px #0b1220"></button>`).join("")}
          <div class="seg" style="margin-left:6px">${WB_WIDTHS.map(x=>`<button class="${wb.w===x.w?'on':''}" onclick="App.wbWidth(${x.w})">${x.t}</button>`).join("")}</div>
          <button class="btn sm ghost" onclick="App.wbUndo()">↶ Αναίρεση</button>` : ""}
        ${wb.tool==="erase" ? `<span class="wb-hint" style="margin-left:12px">🧽 Άγγιξε μια γραμμή/βελάκι για να τη σβήσεις</span>` : ""}
      </div>
      <div class="wb-body" id="wbBoard"></div>`;
    Court.render($("#wbBoard"), t.positions, {
      arrows:t.movements||[], draws:t.draws||[], opp:t.opp||[], draggable:true, tool:wb.tool, ball:t.ball||null, full:boardFull(t), flip:wb.flip,
      drawColor:wb.color, drawWidth:wb.w, labelMode:wb.labels||"role", names:startersNames(), oppLabelMode:t.oppLabel||"x", oppColor:t.oppColor||"#1e293b",
      onMove:()=>save(), onBallMove:(b)=>{ t.ball=b; save(); },
      onOppMove:(oi,pos)=>{ if(t.opp&&t.opp[oi]){ t.opp[oi].x=pos.x; t.opp[oi].y=pos.y; save(); } },
      onArrow:(from,to,type)=>{ (t.movements=t.movements||[]).push({from,to,type}); save(); renderWhiteboard(); },
      onDraw:(stroke)=>{ (t.draws=t.draws||[]).push(stroke); save(); renderWhiteboard(); },
      onErase:(hit)=>{ if(hit.kind==="draw"&&t.draws) t.draws.splice(hit.index,1); else if(hit.kind==="arrow"&&t.movements) t.movements.splice(hit.index,1); save(); renderWhiteboard(); }
    });
    const svg=$("#wbBoard svg"); if(svg){ svg.style.maxWidth="97vw"; svg.style.height=(boardFull(t)?"84vh":(wb.tool==="draw"?"78vh":"84vh")); svg.style.width="auto"; }
  }
  function wbTool(v){ state.wb.tool=v; renderWhiteboard(); }
  function wbColor(c){ state.wb.color=c; renderWhiteboard(); }
  function wbWidth(w){ state.wb.w=w; renderWhiteboard(); }
  function wbFlip(){ state.wb.flip=!state.wb.flip; renderWhiteboard(); }
  function wbUndo(){ const t=DB.tactics.find(x=>x.id===state.wb.id); if(t.draws&&t.draws.length){ t.draws.pop(); save(); renderWhiteboard(); } }
  function wbLabels(v){ state.wb.labels=v; renderWhiteboard(); }
  function wbOpp(){ const t=DB.tactics.find(x=>x.id===state.wb.id);
    if(t.opp&&t.opp.length){ delete t.opp; }
    else { t.opp=[{x:50,y:52,label:"X"},{x:24,y:60,label:"X"},{x:76,y:60,label:"X"},{x:38,y:74,label:"X"},{x:60,y:80,label:"X"}]; if(!t.oppLabel)t.oppLabel="x"; if(!t.oppColor)t.oppColor="#1e293b"; }
    save(); renderWhiteboard();
  }
  function wbOppLabel(v){ const t=DB.tactics.find(x=>x.id===state.wb.id); t.oppLabel=v; save(); renderWhiteboard(); }
  function wbOppColor(c){ const t=DB.tactics.find(x=>x.id===state.wb.id); t.oppColor=c; save(); renderWhiteboard(); }
  // Starters → επώνυμα για ετικέτες «Ονόματα» (DB.club.starters αν οριστεί, αλλιώς καλύτερος OVR)
  function surnameOf(pl){ if(!pl) return ""; const parts=pl.name.trim().split(/\s+/); return parts[parts.length-1].slice(0,10); }
  function startersNames(){
    const names={}; const st=(DB.club&&DB.club.starters)||{};
    ["PG","SG","SF","PF","C"].forEach(pos=>{
      let pl = st[pos] ? DB.players.find(p=>p.id===st[pos]) : null;
      if(!pl) pl = DB.players.filter(p=>p.pos===pos).sort((a,b)=>ovr(b)-ovr(a))[0];
      if(pl) names[pos]=surnameOf(pl);
    });
    return names;
  }
  function editStarters(){
    const st=(DB.club&&DB.club.starters)||{};
    modal("⚙️ Βασική Πεντάδα (για ετικέτες «Ονόματα»)", `
      <div class="sub" style="margin-bottom:10px">Διάλεξε ποιος παίκτης εμφανίζεται σε κάθε θέση στο ταμπλό. Κενό = αυτόματα ο κορυφαίος σε αξιολόγηση.</div>
      ${["PG","SG","SF","PF","C"].map(pos=>{
        const opts=DB.players.slice().sort((a,b)=>ovr(b)-ovr(a)).map(p=>`<option value="${p.id}" ${st[pos]===p.id?'selected':''}>${esc(p.name)} (${p.pos}, OVR ${ovr(p)})</option>`).join("");
        return `<div class="row" style="align-items:center;margin-bottom:8px"><div style="width:44px"><span class="chip">${pos}</span></div>
          <div style="flex:1"><select data-st="${pos}"><option value="">— αυτόματα —</option>${opts}</select></div></div>`;
      }).join("")}`,
      `<button class="btn" onclick="App.closeModal()">Άκυρο</button><button class="btn primary" onclick="App.saveStarters()">Αποθήκευση</button>`);
  }
  function saveStarters(){
    DB.club.starters=DB.club.starters||{};
    document.querySelectorAll('select[data-st]').forEach(s=>{ if(s.value) DB.club.starters[s.dataset.st]=s.value; else delete DB.club.starters[s.dataset.st]; });
    save(); closeModal(); if(state.wb) renderWhiteboard(); toast("Αποθηκεύτηκε η πεντάδα");
  }
  /* Αποθήκευση ταμπλό ως εικόνα PNG (offline: SVG→canvas) */
  function saveBoardImage(svgEl, name){
    if(!svgEl){ toast("Δεν βρέθηκε ταμπλό"); return; }
    const vb=svgEl.viewBox.baseVal, w=vb.width||100, h=vb.height||94;
    const scale=Math.max(3, Math.round(1700/Math.max(w,h)));
    const clone=svgEl.cloneNode(true); clone.removeAttribute("style");
    clone.setAttribute("width", w*scale); clone.setAttribute("height", h*scale);
    const xml=new XMLSerializer().serializeToString(clone);
    const src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(xml);
    const img=new Image();
    img.onload=()=>{ const c=document.createElement("canvas"); c.width=w*scale; c.height=h*scale; const ctx=c.getContext("2d");
      ctx.fillStyle="#0b1220"; ctx.fillRect(0,0,c.width,c.height); ctx.drawImage(img,0,0,c.width,c.height);
      try{ c.toBlob(b=>{ if(!b){ toast("Σφάλμα εικόνας"); return; } const a=document.createElement("a"); a.href=URL.createObjectURL(b); a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1500); toast("Αποθηκεύτηκε εικόνα"); }, "image/png"); }catch(e){ toast("Σφάλμα εικόνας"); } };
    img.onerror=()=>toast("Σφάλμα εικόνας");
    img.src=src;
  }
  function snapImage(sel, base){ saveBoardImage(document.querySelector(sel+" svg"), (base||"tamplo")+"_"+new Date().toISOString().slice(0,10)+".png"); }
  function wbSnapshot(){ const t=DB.tactics.find(x=>x.id===state.wb.id); saveBoardImage(document.querySelector("#wbBoard svg"), "tamplo_"+slug(stripEmoji(t?t.name:"board"))+".png"); }
  function wbBall(){ const t=DB.tactics.find(x=>x.id===state.wb.id); if(t.ball) delete t.ball; else t.ball={x:50,y:boardFull(t)?60:35}; save(); renderWhiteboard(); }
  function wbClear(){ const t=DB.tactics.find(x=>x.id===state.wb.id); t.movements=[]; t.draws=[]; save(); renderWhiteboard(); toast("Καθαρίστηκε το ταμπλό"); }
  function wbKey(e){ if(state.wb && e.key==="Escape") wbExit(); }
  function wbExit(){
    const ov=$("#whiteboard"); if(ov) ov.classList.remove("on");
    document.removeEventListener("keydown", wbKey); state.wb=null;
    try{ if(screen.orientation&&screen.orientation.unlock) screen.orientation.unlock(); }catch(_){}
    try{ if(document.fullscreenElement) document.exitFullscreen(); }catch(_){}
  }

  /* ---- Εξαγωγή PDF (offline, μέσω print → «Αποθήκευση ως PDF») ---- */
  function ensurePrint(html, afterRender){
    let pa=$("#printArea"); if(!pa){ pa=document.createElement("div"); pa.id="printArea"; document.body.appendChild(pa); }
    pa.innerHTML=html; document.body.classList.add("printing");
    if(afterRender) afterRender();
    setTimeout(()=>{ window.print(); }, 300);
  }
  function pHead(title, sub){ return `<div class="phead"><div class="lg">${LOGO_SVG(52)}</div><div><h1>${esc(title)}</h1><div class="psub">${esc(sub||"")}</div></div><div class="pbrand">TACTIX<span style="font-weight:400"> BASKET</span></div></div>`; }
  function pFoot(){ return `<div class="pfoot"><span>TACTIX BASKET — Επαγγελματικό Εργαλείο Προπονητή Μπάσκετ</span><span>${new Date().toLocaleDateString("el-GR")}</span></div>`; }

  function printTactic(id){
    const t=DB.tactics.find(x=>x.id===id); if(!t) return;
    if(!t.positions) t.positions=(FORMATIONS[tacSystem(t)]||t.customPositions||FORMATIONS["5-Out (Motion)"]).map(p=>({r:p.r,x:p.x,y:p.y}));
    const phases=["offense","defense","transition","special"];
    ensurePrint(`<div class="pdoc">
      ${pHead(t.name, (t.coach?t.coach+" · ":"")+(t.team?t.team+" · ":"")+(t.cat?"Συνεργασία":"Σύστημα ")+tacSystem(t))}
      <div class="pgrid">
        <div class="ppitch" id="printPitch"></div>
        <div>
          <h3>Περιγραφή</h3><p>${esc(t.summary)}</p>
          <div class="pchips">${(t.style||[]).map(s=>`<span class="pchip">${esc(s)}</span>`).join("")}</div>
          <p class="pmeta"><b>Ένταση:</b> ${esc(t.intensity||"—")}<br><b>Κλειδιά:</b> ${(t.keyRoles||[]).join(", ")||"—"}</p>
        </div>
      </div>
      ${phases.map(k=>((t.phases[k]||[]).length?`<h3>${phaseLabels(t)[k].t}</h3><ul>${t.phases[k].map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:"")).join("")}
      ${pFoot()}
    </div>`, ()=> Court.render($("#printPitch"), t.positions, {arrows:t.movements||[], draws:t.draws||[], opp:t.opp||[], oppLabelMode:t.oppLabel, oppColor:t.oppColor, full:boardFull(t), ball:t.ball||null}));
  }

  function printSessionDoc(id){
    const s=DB.sessions.find(x=>x.id===id); if(!s) return;
    const drills=s.drills.map(did=>DB.drills.find(d=>d.id===did)).filter(Boolean);
    ensurePrint(`<div class="pdoc">
      ${pHead(s.title, "Πλάνο Προπόνησης · "+(s.goal||"")+" · Σύνολο "+s.total+"′")}
      ${drills.map((d,i)=>`<div class="pdrill"><h4>${i+1}. ${esc(d.name)} — ${d.dur}′ <span style="font-weight:400;color:#666">(${esc(d.cat)} · ${esc(d.intensity)})</span></h4>
        <p><b>🎯 Στόχος:</b> ${esc(d.goal)}</p>
        ${d.setup?`<p><b>⚙️ Στήσιμο:</b> ${esc(d.setup)}</p>`:""}
        ${d.coaching&&d.coaching.length?`<b>🗣️ Coaching points:</b><ul>${d.coaching.map(c=>`<li>${esc(c)}</li>`).join("")}</ul>`:""}
        ${d.progression?`<p><b>📈 Εξέλιξη:</b> ${esc(d.progression)}</p>`:""}</div>`).join("")}
      ${pFoot()}
    </div>`);
  }

  function printMicro(){
    ensurePrint(`<div class="pdoc">
      ${pHead("Εβδομαδιαίος Μικρόκυκλος", "Περιοδισμός Προπόνησης · "+DB.club.name)}
      <div class="pmicro">${DB.microcycle.map(m=>`<div class="pmd"><b>${esc(m.day)} · ${esc(m.code)}</b>${esc(m.name)} — ${m.load}%<ul style="padding-left:13px;margin:3px 0">${m.items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div>
      ${pFoot()}
    </div>`);
  }

  function assignRole(tacticId,i){
    const t=DB.tactics.find(x=>x.id===tacticId); const pos=t.positions[i];
    const roles=POSITION_ROLES[pos.r]||[];
    modal(`Ρόλος θέσης — ${ROLE_NAMES[pos.r]||pos.r} <span class="chip">${esc(pos.r)}</span>`,
      `<div class="sub" style="margin-bottom:10px">Διάλεξε αρχέτυπο ρόλου (όπως στον αληθινό κόσμο):</div>
       ${roles.map(r=>`<div class="list-item ${pos.roleCode===r.code?'sel':''}" onclick="App.setRole('${tacticId}',${i},'${r.code}')">
          <div class="em" style="font-size:13px;font-weight:800">${esc(r.code)}</div>
          <div class="meta"><b>${esc(r.name)}</b><small>${esc(r.desc)}</small></div>
          ${pos.roleCode===r.code?'<span class="chip g">✓</span>':''}</div>`).join("")}
       <div style="margin-top:8px"><button class="btn ghost sm" onclick="App.setRole('${tacticId}',${i},'')">✕ Καθαρισμός ρόλου</button></div>`,
      `<button class="btn primary" onclick="App.closeModal()">Κλείσιμο</button>`);
  }
  function setRole(tid,i,code){
    const t=DB.tactics.find(x=>x.id===tid); const pos=t.positions[i];
    const r=(POSITION_ROLES[pos.r]||[]).find(x=>x.code===code);
    if(code){ pos.roleCode=code; pos.roleName=r?r.name:code; } else { delete pos.roleCode; delete pos.roleName; }
    save(); closeModal(); drawTactBoard(t);
  }

  function renderTacticDetail(t){
    const tabs = ["offense","defense","transition","special"];
    $("#tacDetail").innerHTML = `
      <h3>🔎 Ανάλυση κατά Φάση</h3>
      <div class="sub" style="margin-bottom:10px">${esc(t.summary)}</div>
      <div class="pill-row" style="margin-bottom:12px">${(t.style||[]).map(s=>`<span class="chip g">${esc(s)}</span>`).join("")}</div>
      <div class="tabs">${tabs.map(k=>`<button class="${k===state.drawTab?'on':''}" onclick="App.tacTab('${t.id}','${k}')">${phaseLabels(t)[k].t}</button>`).join("")}</div>
      <div class="detail-block">
        <span class="phase-tag ${phaseLabels(t)[state.drawTab].c}">${phaseLabels(t)[state.drawTab].t}</span>
        <ul style="margin-top:10px">${(t.phases[state.drawTab]||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
      </div>
      ${(t.keyRoles&&t.keyRoles.length)?`<div class="detail-block"><h4>🔑 Κλειδιά</h4><div class="pill-row">${t.keyRoles.map(r=>`<span class="chip b">${esc(r)}</span>`).join("")}</div></div>`:''}
      ${t.custom?`<div style="margin-top:10px"><button class="btn danger sm" onclick="App.delTactic('${t.id}')">Διαγραφή</button></div>`:''}`;
  }
  function tacTab(id,k){ state.drawTab=k; renderTacticDetail(DB.tactics.find(t=>t.id===id)); }
  function useTactic(id){ const t=DB.tactics.find(x=>x.id===id); DB.club.system=tacSystem(t); save(); toast("Ορίστηκε ως βασικό σύστημα: "+t.name); }

  function newTactic(){ openDesigner(true); }

  /* ---- Σχεδιαστής συστήματος (draggable) ---- */
  function openDesigner(blank){
    const t = blank? null : DB.tactics.find(x=>x.id===state.tacticId);
    const system = t? tacSystem(t) : "5-Out (Motion)";
    const basePos = (t && t.positions) ? t.positions : (FORMATIONS[system]||FORMATIONS["5-Out (Motion)"]);
    state.designer = { positions: basePos.map(p=>({...p,label:p.r})), system, arrows: t?JSON.parse(JSON.stringify(t.movements||[])):[] };
    state.dTool="move";
    $("#view-tactics").innerHTML = `
      <div class="sectionhead">
        <h2>✏️ Σχεδιαστής Συστήματος</h2>
        <div class="sub2">Σύρε πιόνια · κλικ σε πιόνι για ρόλο · τράβα βελάκια κίνησης/πάσας/μπλόκου</div>
        <div class="sp"><button class="btn sm" onclick="App.renderTactics()">← Πίσω</button></div>
      </div>
      <div class="board-wrap">
        <div class="card">
          <div class="tools">
            <label style="margin:0">Σύστημα:</label>
            <select id="dForm" style="max-width:220px" onchange="App.designerForm(this.value)">
              ${Object.keys(FORMATIONS).map(f=>`<option ${f===system?'selected':''}>${f}</option>`).join("")}</select>
          </div>
          <div class="tools">
            <div class="seg" id="dSeg"></div>
            <button class="btn sm ghost" onclick="App.dClearArrows()">🗑️ Βελάκια</button>
            <span class="sub" id="dHint" style="font-size:11.5px"></span>
          </div>
          <div id="designerBoard"></div>
          <div class="legend" style="margin-top:8px">
            <span><i class="dotc" style="background:#fde047"></i>Κίνηση</span>
            <span><i class="dotc" style="background:#38bdf8"></i>Πάσα</span>
            <span><i class="dotc" style="background:#f59e0b"></i>Μπλόκο</span>
            <span><i class="dotc" style="background:#ff8a8a"></i>Ρόλος</span>
          </div>
        </div>
        <div class="card">
          <h3>💾 Αποθήκευση Συστήματος</h3>
          <div class="field"><label>Όνομα</label><input id="tName" value="${t?esc(t.name):'Νέο σύστημά μου'}"></div>
          <div class="row">
            <div class="field"><label>Προπονητής</label><input id="tCoach" value="${t?esc(t.coach):'Ο Προπονητής μου'}"></div>
            <div class="field"><label>Ένταση</label><input id="tInt" value="${t?esc(t.intensity):'Υψηλή'}"></div>
          </div>
          <div class="field"><label>Στυλ (χωρισμένα με κόμμα)</label><input id="tStyle" value="${t?esc((t.style||[]).join(', ')):'Motion, Spacing'}"></div>
          <div class="field"><label>Περιγραφή</label><textarea id="tSum">${t?esc(t.summary):''}</textarea></div>
          <div class="field"><label>Επίθεση (μία γραμμή ανά σημείο)</label><textarea id="tOff">${t?esc((t.phases.offense||[]).join('\n')):''}</textarea></div>
          <div class="field"><label>Άμυνα</label><textarea id="tDef">${t?esc((t.phases.defense||[]).join('\n')):''}</textarea></div>
          <div class="field"><label>Μετάβαση</label><textarea id="tTr">${t?esc((t.phases.transition||[]).join('\n')):''}</textarea></div>
          <div class="field"><label>Στημένες & Ριμπάουντ</label><textarea id="tSp">${t?esc((t.phases.special||[]).join('\n')):''}</textarea></div>
          <button class="btn primary" onclick="App.saveTactic()">💾 Αποθήκευση ως δικό μου</button>
        </div>
      </div>`;
    drawDesigner();
  }
  function designerForm(f){ state.designer.system=f; state.designer.positions=FORMATIONS[f].map(p=>({...p,label:p.r})); state.designer.arrows=[]; drawDesigner(); }
  function drawDesigner(){
    const d=state.designer;
    Court.render($("#designerBoard"), d.positions, {
      draggable:true, tool:state.dTool, arrows:d.arrows, full:isFull(d.system),
      onMove:()=>{},
      onToken:(i)=>designerRole(i),
      onArrow:(from,to,type)=>{ d.arrows.push({from,to,type}); drawDesigner(); }
    });
    const seg=(v,ic,lbl)=>`<button class="${state.dTool===v?'on':''}" onclick="App.dTool('${v}')">${ic} ${lbl}</button>`;
    const sg=$("#dSeg"); if(sg) sg.innerHTML=seg('move','🖐','Θέσεις')+seg('run','➡️','Κίνηση')+seg('pass','⚡','Πάσα')+seg('screen','⛌','Μπλόκο');
    const h=$("#dHint"); if(h) h.textContent = state.dTool==='move'?'Σύρε πιόνι · κλικ για ρόλο':'Σύρε πάνω στο γήπεδο για γραμμή';
  }
  function dTool(v){ state.dTool=v; drawDesigner(); }
  function dClearArrows(){ state.designer.arrows=[]; drawDesigner(); }
  function designerRole(i){
    const pos=state.designer.positions[i];
    const roles=POSITION_ROLES[pos.r]||[];
    modal(`Ρόλος θέσης — ${ROLE_NAMES[pos.r]||pos.r} <span class="chip">${esc(pos.r)}</span>`,
      `<div class="sub" style="margin-bottom:10px">Διάλεξε αρχέτυπο ρόλου:</div>
       ${roles.map(r=>`<div class="list-item ${pos.roleCode===r.code?'sel':''}" onclick="App.setDesignerRole(${i},'${r.code}')">
          <div class="em" style="font-size:13px;font-weight:800">${esc(r.code)}</div>
          <div class="meta"><b>${esc(r.name)}</b><small>${esc(r.desc)}</small></div></div>`).join("")}
       <div style="margin-top:8px"><button class="btn ghost sm" onclick="App.setDesignerRole(${i},'')">✕ Καθαρισμός</button></div>`,
      `<button class="btn primary" onclick="App.closeModal()">Κλείσιμο</button>`);
  }
  function setDesignerRole(i,code){
    const pos=state.designer.positions[i];
    const r=(POSITION_ROLES[pos.r]||[]).find(x=>x.code===code);
    if(code){ pos.roleCode=code; pos.roleName=r?r.name:code; } else { delete pos.roleCode; delete pos.roleName; }
    closeModal(); drawDesigner();
  }
  function saveTactic(){
    const d=state.designer;
    const lines = s => (s.value||"").split("\n").map(x=>x.trim()).filter(Boolean);
    const t = {
      id:"cust_"+Math.random().toString(36).slice(2,8), custom:true,
      name:$("#tName").value.trim()||"Νέο σύστημα", coach:$("#tCoach").value.trim(), team:DB.club.name,
      system:d.system, emoji:"⭐", intensity:$("#tInt").value.trim(),
      style:$("#tStyle").value.split(",").map(x=>x.trim()).filter(Boolean),
      summary:$("#tSum").value.trim(),
      phases:{ offense:lines($("#tOff")), defense:lines($("#tDef")), transition:lines($("#tTr")), special:lines($("#tSp")) },
      movements: JSON.parse(JSON.stringify(d.arrows||[])), keyRoles:[]
    };
    const pos = d.positions.map(p=>{ const o={r:p.r,x:p.x,y:p.y}; if(p.roleCode){o.roleCode=p.roleCode;o.roleName=p.roleName;} return o; });
    t.positions = pos;
    t.customPositions = pos;
    FORMATIONS["★ "+t.name] = pos.map(p=>({r:p.r,x:p.x,y:p.y}));
    t.system = "★ "+t.name;
    DB.tactics.push(t); save(); toast("Το σύστημα αποθηκεύτηκε!"); state.tacticId=t.id; renderTactics();
  }
  function delTactic(id){ if(!confirm("Διαγραφή;"))return; DB.tactics=DB.tactics.filter(t=>t.id!==id); state.tacticId=DB.tactics.filter(t=>!t.cat)[0].id; save(); renderTactics(); }

  /* ============================================================
     3β) ΒΙΒΛΙΟΘΗΚΗ ΣΥΝΕΡΓΑΣΙΩΝ (PLAYBOOK)
     ============================================================ */
  let playCat = "setplay", playPos = "all", playSearch = "";
  const CAT_SHORT = { setplay:"Στημένες", off2:"2 Παίκτες", off3:"3 Παίκτες", team:"Ομαδικές", buildup:"Build-up", def:"Άμυνα", press:"Πίεση" };
  const stripEmoji = s => (s||"").replace(/^([📋🤝👥🏀⬆️🛡️🕸️⭐]\s*)/,"");
  function playsIn(cat,pos){ return DB.tactics.filter(t=>t.cat===cat && (pos==="all" || (t.pos||[]).includes(pos))); }

  function renderPlaybook(){
    const cat=playCat;
    const q=(playSearch||"").trim().toLowerCase();
    const plays = q
      ? DB.tactics.filter(t=>t.cat && (stripEmoji(t.name)+" "+(t.summary||"")+" "+(t.system||"")+" "+((t.pos||[]).join(" "))).toLowerCase().includes(q))
      : playsIn(cat,playPos);
    if(!plays.some(p=>p.id===state.playId)) state.playId = plays[0] && plays[0].id;
    if(!["offense","defense","transition","special"].includes(state.drawTab)) state.drawTab="offense";
    const duty = (playPos!=="all" && typeof POSITION_DUTIES!=="undefined") ? POSITION_DUTIES[playPos] : null;
    $("#view-playbook").innerHTML = `
      <div class="sectionhead">
        <h2>📋 Βιβλιοθήκη Συνεργασιών</h2>
        <div class="sub2">Στημένες φάσεις, συνεργασίες 2/3/5, build-up, άμυνα & πίεση — με σχέδια</div>
        <div class="sp"><span class="sub" style="font-size:11.5px;align-self:center">⇩ Playbook:</span><button class="btn sm ghost" onclick="App.printPlaybook()">PDF</button><button class="btn sm ghost" onclick="App.exportPlaybookWord()">Word</button><button class="btn sm ghost" onclick="App.exportPlaybookExcel()">Excel</button><button class="btn primary sm" onclick="App.newPlay()">＋ Νέα</button></div>
      </div>
      <div class="tabs" style="margin-bottom:10px">${Object.keys(PLAY_CATS).map(c=>`<button class="${c===cat?'on':''}" onclick="App.playbookCat('${c}')">${PLAY_CATS[c].ic} ${CAT_SHORT[c]}</button>`).join("")}</div>
      <div class="tools" style="margin-bottom:14px;align-items:center">
        <span class="sub" style="font-size:12px;font-weight:700">🎽 Θέση:</span>
        <div class="seg">
          <button class="${playPos==='all'?'on':''}" onclick="App.playbookPos('all')">Όλες</button>
          ${POS_ORDER.map(p=>`<button class="${playPos===p?'on':''}" onclick="App.playbookPos('${p}')">${p}</button>`).join("")}
        </div>
        <input id="pbSearch" value="${esc(playSearch)}" oninput="App.playbookSearch(this.value)" placeholder="🔎 Αναζήτηση συνεργασίας..." style="max-width:260px;margin-left:auto">
      </div>
      ${duty?`<div class="card" style="margin-bottom:16px;border-color:var(--acc)">
        <h3>${duty.ic} Καθήκοντα Θέσης — ${esc(duty.name)}</h3>
        <div class="grid g2">
          <div class="detail-block"><h4>🏀 Επίθεση</h4><ul>${duty.off.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
          <div class="detail-block"><h4>🛡️ Άμυνα</h4><ul>${duty.def.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>
        </div></div>`:''}
      <div class="board-wrap">
        <div class="card"><div id="pbBoard"></div></div>
        <div>
          <div class="card" style="margin-bottom:16px">
            <h3>${PLAY_CATS[cat].ic} ${esc(CAT_SHORT[cat])}${playPos!=='all'?' · '+playPos:''} <span class="tag">${plays.length}</span></h3>
            <div id="pbList" style="max-height:300px;overflow:auto">${plays.map(t=>`
              <div class="list-item ${t.id===state.playId?'sel':''}" onclick="App.openPlay('${t.id}')">
                <div class="em">${t.emoji||'📋'}</div>
                <div class="meta"><b>${esc(stripEmoji(t.name))}</b><small>${(t.pos||[]).join(' · ')||esc(t.system||'')}${t.full?' · full court':''}</small></div>
                ${t.custom?'<span class="chip a">δικό μου</span>':''}
              </div>`).join("")||'<div class="empty" style="padding:20px">Καμία συνεργασία για τη θέση αυτή</div>'}</div>
          </div>
          <div class="card" id="pbDetail"></div>
        </div>
      </div>`;
    if(state.playId) openPlay(state.playId);
    else { $("#pbBoard").innerHTML='<div class="empty"><div class="big">📋</div>—</div>'; $("#pbDetail").innerHTML=''; }
  }
  function playbookCat(c){ playCat=c; const first=playsIn(c,playPos)[0]; state.playId=first&&first.id; renderPlaybook(); }
  function playbookPos(p){ playPos=p; const first=playsIn(playCat,p)[0]; state.playId=first&&first.id; renderPlaybook(); }
  function playbookSearch(v){ playSearch=v; renderPlaybook(); const si=$("#pbSearch"); if(si){ si.focus(); try{ si.setSelectionRange(si.value.length,si.value.length); }catch(_){} } }
  function openPlay(id){
    state.playId=id; const t=DB.tactics.find(x=>x.id===id); if(!t) return;
    if(!t.positions){ t.positions=(t.customPositions||FORMATIONS[tacSystem(t)]||FORMATIONS["5-Out (Motion)"]).map(p=>({...p})); save(); }
    drawPlayBoard(t); renderPlayDetail(t);
    document.querySelectorAll("#pbList .list-item").forEach(el=>el.classList.remove("sel"));
    const li=[...document.querySelectorAll("#pbList .list-item")].find(el=>el.getAttribute("onclick").includes("'"+id+"'")); if(li) li.classList.add("sel");
  }
  function drawPlayBoard(t){
    Court.render($("#pbBoard"), t.positions, {
      arrows:t.movements||[], draws:t.draws||[], opp:t.opp||[], oppLabelMode:t.oppLabel, oppColor:t.oppColor, draggable:true, tool:state.boardTool, full:boardFull(t), ball:t.ball||null,
      onOppMove:(oi,pos)=>{ if(t.opp&&t.opp[oi]){ t.opp[oi].x=pos.x; t.opp[oi].y=pos.y; save(); } },
      onMove:()=>save(), onBallMove:(b)=>{ t.ball=b; save(); },
      onToken:(i)=>assignRole(t.id,i),
      onArrow:(from,to,type)=>{ (t.movements=t.movements||[]).push({from,to,type}); save(); drawPlayBoard(t); }
    });
    const seg=(v,ic,lbl)=>`<button class="${state.boardTool===v?'on':''}" onclick="App.playTool('${v}')">${ic} ${lbl}</button>`;
    $("#pbBoard").insertAdjacentHTML("afterbegin", `
      <div class="tools">
        <div style="font-weight:800;font-size:15px">${t.emoji||'📋'} ${esc(stripEmoji(t.name))}</div>
        <div style="margin-left:auto;display:flex;gap:6px;align-items:center">
          ${t.full?'<span class="chip">full court</span>':''}
          <button class="btn sm" onclick="App.whiteboard('${t.id}')" title="Ταμπλό Timeout — πλήρης οθόνη / landscape με γραφίδα">📐 Ταμπλό</button>
          <button class="btn sm blue" onclick="App.present('${t.id}')">🖥️ Προβολή</button>
          <button class="btn sm ghost" onclick="App.printTactic('${t.id}')">⇩ PDF</button>
          <button class="btn sm ghost" onclick="App.snapImage('#pbBoard','synergasia')" title="Αποθήκευση εικόνας PNG">📷</button>
        </div>
      </div>
      <div class="tools">
        <div class="seg">${seg('move','🖐','Θέσεις')}${seg('run','➡️','Κίνηση')}${seg('pass','⚡','Πάσα')}${seg('screen','⛌','Μπλόκο')}</div>
        <button class="btn sm ghost" onclick="App.clearPlayArrows('${t.id}')">🗑️ Βελάκια</button>
        <span class="sub" style="font-size:11.5px">${state.boardTool==='move'?'Σύρε πιόνι για θέση':'Σύρε πάνω στο γήπεδο για γραμμή'}</span>
      </div>
      <div class="legend" style="margin-bottom:8px">
        <span><i class="dotc" style="background:#fde047"></i>Κίνηση</span>
        <span><i class="dotc" style="background:#38bdf8"></i>Πάσα</span>
        <span><i class="dotc" style="background:#f59e0b"></i>Μπλόκο (screen)</span>
      </div>`);
  }
  function playTool(v){ state.boardTool=v; drawPlayBoard(DB.tactics.find(t=>t.id===state.playId)); }
  function clearPlayArrows(id){ const t=DB.tactics.find(x=>x.id===id); t.movements=[]; save(); drawPlayBoard(t); toast("Καθαρίστηκαν τα βελάκια"); }
  function renderPlayDetail(t){
    const tabs=["offense","defense","transition","special"];
    $("#pbDetail").innerHTML = `
      <h3>🔎 Ανάλυση Συνεργασίας</h3>
      <div class="sub" style="margin-bottom:10px">${esc(t.summary)}</div>
      <div class="pill-row" style="margin-bottom:12px">${(t.style||[]).map(s=>`<span class="chip g">${esc(s)}</span>`).join("")}</div>
      <div class="tabs">${tabs.map(k=>`<button class="${k===state.drawTab?'on':''}" onclick="App.playTab('${k}')">${phaseLabels(t)[k].t}</button>`).join("")}</div>
      <div class="detail-block">
        <span class="phase-tag ${phaseLabels(t)[state.drawTab].c}">${phaseLabels(t)[state.drawTab].t}</span>
        <ul style="margin-top:10px">${(t.phases[state.drawTab]||[]).map(x=>`<li>${esc(x)}</li>`).join("")||'<li class="sub" style="list-style:none;margin-left:-14px">—</li>'}</ul>
      </div>
      ${t.custom?`<div style="margin-top:10px;display:flex;gap:8px"><button class="btn sm" onclick="App.editPlay('${t.id}')">✎ Στοιχεία</button><button class="btn danger sm" onclick="App.delPlay('${t.id}')">Διαγραφή</button></div>`:''}`;
  }
  function playTab(k){ state.drawTab=k; renderPlayDetail(DB.tactics.find(t=>t.id===state.playId)); }
  function delPlay(id){ if(!confirm("Διαγραφή συνεργασίας;"))return; DB.tactics=DB.tactics.filter(t=>t.id!==id); const f=DB.tactics.filter(t=>t.cat===playCat)[0]; state.playId=f&&f.id; save(); renderPlaybook(); }
  function newPlay(){ editPlay(""); }
  function editPlay(id){
    const t=id?DB.tactics.find(x=>x.id===id):null;
    modal(t?"Επεξεργασία Συνεργασίας":"Νέα Συνεργασία", `
      <div class="row"><div class="field"><label>Όνομα</label><input id="plName" value="${t?esc(stripEmoji(t.name)):''}"></div>
        <div class="field" style="max-width:160px"><label>Κατηγορία</label><select id="plCat">${Object.keys(PLAY_CATS).map(c=>`<option value="${c}" ${((t?t.cat:playCat)===c)?'selected':''}>${CAT_SHORT[c]}</option>`).join("")}</select></div></div>
      ${t?'':`<div class="field"><label>Βασικός σχηματισμός / alignment</label><select id="plAlign">${Object.keys(FORMATIONS).map(f=>`<option>${f}</option>`).join("")}</select><div class="sub" style="font-size:11px;margin-top:4px">Μετά την αποθήκευση, σχεδίασε στο ταμπλό τις κινήσεις (🖐 θέσεις, ➡️/⚡/⛌ βέλη).</div></div>`}
      <div class="field"><label>Περιγραφή</label><textarea id="plSum">${t?esc(t.summary):''}</textarea></div>
      <div class="field"><label>▶️ Εκτέλεση (μία γραμμή ανά βήμα)</label><textarea id="plOff">${t?esc((t.phases.offense||[]).join('\n')):''}</textarea></div>
      <div class="field"><label>🗣️ Coaching Points</label><textarea id="plCoach">${t?esc((t.phases.special||[]).join('\n')):''}</textarea></div>
      <div class="field"><label>🧠 Ανάγνωση / Άμυνα (προαιρετικό)</label><textarea id="plDef">${t?esc((t.phases.defense||[]).join('\n')):''}</textarea></div>`,
      `<button class="btn" onclick="App.closeModal()">Άκυρο</button><button class="btn primary" onclick="App.savePlay('${id||''}')">Αποθήκευση</button>`);
  }
  function savePlay(id){
    const lines=v=>(v||"").split("\n").map(x=>x.trim()).filter(Boolean);
    const cat=$("#plCat").value, emoji=PLAY_CATS[cat].ic, name=$("#plName").value.trim()||"Συνεργασία";
    const data={ name:emoji+" "+name, cat, emoji, summary:$("#plSum").value.trim(),
      phases:{ offense:lines($("#plOff").value), defense:lines($("#plDef").value),
               transition:(id&&DB.tactics.find(x=>x.id===id)?DB.tactics.find(x=>x.id===id).phases.transition||[]:[]),
               special:lines($("#plCoach").value) } };
    if(id){ const t=DB.tactics.find(x=>x.id===id); Object.assign(t,data); }
    else{
      const align=$("#plAlign").value, base=(FORMATIONS[align]||FORMATIONS["5-Out (Motion)"]).map(p=>({r:p.r,x:p.x,y:p.y}));
      const t={ id:"play-cust-"+Math.random().toString(36).slice(2,7), custom:true, kind:"play", intensity:"—",
        coach:"Δική μου συνεργασία", team:"Custom", system:align, full:isFull(align),
        customPositions:base, positions:base.map(p=>({...p})), movements:[], style:[], ...data };
      DB.tactics.push(t); state.playId=t.id; playCat=t.cat;
    }
    save(); closeModal(); renderPlaybook(); toast("Αποθηκεύτηκε");
  }

  /* ============================================================
     4) ΠΡΟΠΟΝΗΣΕΙΣ
     ============================================================ */
  let trainTab="library";
  function renderTraining(){
    $("#view-training").innerHTML = `
      <div class="sectionhead">
        <h2>🏋️ Προπονήσεις & Περιοδισμός</h2>
        <div class="sp"><button class="btn primary sm" onclick="App.newDrill()">＋ Νέα Άσκηση</button></div>
      </div>
      <div class="tabs">
        <button class="${trainTab==='library'?'on':''}" onclick="App.trainTab('library')">📋 Βιβλιοθήκη Ασκήσεων</button>
        <button class="${trainTab==='micro'?'on':''}" onclick="App.trainTab('micro')">📅 Μικρόκυκλος</button>
        <button class="${trainTab==='session'?'on':''}" onclick="App.trainTab('session')">🗂️ Πλάνο Προπόνησης</button>
      </div>
      <div id="trainBody"></div>`;
    trainBody();
  }
  function trainTabSet(t){ trainTab=t; renderTraining(); }
  function trainBody(){
    if(trainTab==="library"){
      $("#trainBody").innerHTML = `<div class="grid g3">${DB.drills.map(d=>`
        <div class="card" style="cursor:pointer" onclick="App.viewDrill('${d.id}')">
          <h3>${esc(d.name)} <span class="tag">${d.dur}′</span></h3>
          <div class="pill-row" style="margin-bottom:8px"><span class="chip b">${esc(d.cat)}</span><span class="chip ${d.intensity.includes('κρα')?'r':'a'}">${esc(d.intensity)}</span>${d.src?'<span class="chip p">📖 πηγή</span>':''}</div>
          <div class="sub">${esc(d.goal)}</div>
          <div class="pill-row" style="margin-top:8px">${(d.tags||[]).map(x=>`<span class="chip">${esc(x)}</span>`).join("")}</div>
        </div>`).join("")}</div>`;
    } else if(trainTab==="micro"){
      $("#trainBody").innerHTML = `<div class="card">
        <h3>📅 Εβδομαδιαίος Μικρόκυκλος <span class="tag" style="margin-left:auto"><button class="btn sm ghost" onclick="App.printMicro()">⇩ PDF</button></span></h3>
        <div class="sub" style="margin-bottom:12px">Κατανομή φορτίου με peak τακτικής στο GD-3 και σταδιακή αποφόρτιση προς τον αγώνα. Κλικ σε ημέρα για επεξεργασία.</div>
        <div class="micro">${DB.microcycle.map((m,i)=>`
          <div class="md" style="cursor:pointer" onclick="App.editMicro(${i})">
            <div class="dh"><span>${esc(m.day)}</span><span>${esc(m.code)}</span></div>
            <div class="dname">${esc(m.name)}</div>
            <div class="load-bar"><i style="width:${m.load}%;background:${m.color}"></i></div>
            <div style="font-size:10px;color:var(--dim);margin-bottom:4px">Φορτίο ${m.load}%</div>
            <ul>${m.items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>
          </div>`).join("")}</div>
        <div class="detail-block" style="margin-top:16px">
          <h4>Αρχές Περιοδισμού</h4>
          <ul>
            <li><b>GD+1</b> (αποθεραπεία): πολύ χαμηλό φορτίο, recovery + video.</li>
            <li><b>GD-5/-4</b> (ατομικά & δύναμη): skills, σουτ, εκρηκτικότητα, μετάβαση.</li>
            <li><b>GD-3</b> (peak): μεγάλος όγκος τακτικής επίθεσης (5v5, PnR, στημένες).</li>
            <li><b>GD-2</b> (άμυνα & scout): shell, coverages, ανάλυση αντιπάλου.</li>
            <li><b>GD-1</b> (ενεργοποίηση): shootaround, ATO, χαμηλός όγκος.</li>
          </ul>
        </div></div>`;
    } else {
      const list = DB.sessions;
      $("#trainBody").innerHTML = `<div class="grid g2">
        <div class="card">
          <h3>🗂️ Δημιουργία Πλάνου Προπόνησης</h3>
          <div class="field"><label>Τίτλος / Ημέρα</label><input id="sTitle" placeholder="π.χ. Πέμπτη GD-3 — Τακτική"></div>
          <div class="field"><label>Στόχος συνεδρίας</label><input id="sGoal" placeholder="π.χ. motion & pick and roll"></div>
          <label>Επίλεξε ασκήσεις:</label>
          <div style="max-height:240px;overflow:auto;margin-top:6px">${DB.drills.map(d=>`
            <label class="list-item" style="cursor:pointer">
              <input type="checkbox" value="${d.id}" class="sDrill" style="width:auto;flex:0 0 auto">
              <div class="meta"><b>${esc(d.name)}</b><small>${d.dur}′ · ${esc(d.cat)}</small></div></label>`).join("")}</div>
          <button class="btn primary" style="margin-top:10px" onclick="App.saveSession()">💾 Αποθήκευση πλάνου</button>
        </div>
        <div class="card">
          <h3>📁 Αποθηκευμένα Πλάνα <span class="tag">${list.length}</span></h3>
          ${list.length? list.map(s=>`
            <div class="list-item">
              <div class="em">🗂️</div>
              <div class="meta"><b>${esc(s.title)}</b><small>${s.drills.length} ασκ. · ${s.total}′ · ${esc(s.goal||'')}</small></div>
              <button class="btn sm" onclick="App.viewSession('${s.id}')">Άνοιγμα</button>
              <button class="btn sm ghost" onclick="App.printSessionDoc('${s.id}')">⇩ PDF</button>
              <button class="btn sm danger" onclick="App.delSession('${s.id}')">✕</button>
            </div>`).join("")
            : `<div class="empty"><div class="big">🗂️</div>Δεν υπάρχουν πλάνα ακόμη.</div>`}
        </div></div>`;
    }
  }
  function viewDrill(id){
    const d=DB.drills.find(x=>x.id===id);
    modal(`${esc(d.name)}`, `
      <div class="pill-row" style="margin-bottom:12px">
        <span class="chip b">${esc(d.cat)}</span><span class="chip">${d.dur}′</span>
        <span class="chip a">${esc(d.intensity)}</span><span class="chip">${esc(d.players)} παίκτες</span></div>
      ${d.src?`<div class="detail-block"><h4>📖 Πηγή μεθοδολογίας</h4><div class="sub">${esc(d.src)}</div></div>`:''}
      <div class="detail-block"><h4>🎯 Στόχος</h4><div class="sub">${esc(d.goal)}</div></div>
      <div class="detail-block"><h4>⚙️ Στήσιμο</h4><div class="sub">${esc(d.setup)}</div></div>
      <div class="detail-block"><h4>🗣️ Coaching Points</h4><ul>${(d.coaching||[]).map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>
      ${d.progression?`<div class="detail-block"><h4>📈 Εξέλιξη</h4><div class="sub">${esc(d.progression)}</div></div>`:''}`,
      `${d.custom?`<button class="btn danger" onclick="App.delDrill('${d.id}')">Διαγραφή</button>`:''}
       <button class="btn primary" onclick="App.closeModal()">Κλείσιμο</button>`);
  }
  function newDrill(){
    modal("Νέα Άσκηση", `
      <div class="field"><label>Όνομα</label><input id="dName"></div>
      <div class="row"><div class="field"><label>Κατηγορία</label><input id="dCat" value="Τακτική"></div>
        <div class="field" style="max-width:100px"><label>Λεπτά</label><input type="number" id="dDur" value="15"></div>
        <div class="field"><label>Ένταση</label><input id="dInt" value="Μεσαία"></div></div>
      <div class="field"><label>Παίκτες</label><input id="dPl" value="8+"></div>
      <div class="field"><label>🎯 Στόχος</label><textarea id="dGoal"></textarea></div>
      <div class="field"><label>⚙️ Στήσιμο</label><textarea id="dSetup"></textarea></div>
      <div class="field"><label>🗣️ Coaching points (μία γραμμή ανά σημείο)</label><textarea id="dCoach"></textarea></div>
      <div class="field"><label>📈 Εξέλιξη</label><input id="dProg"></div>`,
      `<button class="btn" onclick="App.closeModal()">Άκυρο</button>
       <button class="btn primary" onclick="App.saveDrill()">Αποθήκευση</button>`);
  }
  function saveDrill(){
    DB.drills.push({ id:"cust_"+Math.random().toString(36).slice(2,8), custom:true,
      name:$("#dName").value.trim()||"Άσκηση", cat:$("#dCat").value.trim(), dur:+$("#dDur").value||15,
      intensity:$("#dInt").value.trim(), players:$("#dPl").value.trim(),
      goal:$("#dGoal").value.trim(), setup:$("#dSetup").value.trim(),
      coaching:$("#dCoach").value.split("\n").map(x=>x.trim()).filter(Boolean),
      progression:$("#dProg").value.trim(), tags:[] });
    save(); closeModal(); renderTraining(); toast("Η άσκηση αποθηκεύτηκε");
  }
  function delDrill(id){ if(!confirm("Διαγραφή;"))return; DB.drills=DB.drills.filter(d=>d.id!==id); save(); closeModal(); renderTraining(); }
  function saveSession(){
    const ids=[...document.querySelectorAll(".sDrill:checked")].map(c=>c.value);
    if(!ids.length){ toast("Επίλεξε τουλάχιστον μία άσκηση"); return; }
    const drills=ids.map(id=>DB.drills.find(d=>d.id===id));
    DB.sessions.push({ id:"s_"+Math.random().toString(36).slice(2,8), title:$("#sTitle").value.trim()||"Προπόνηση",
      goal:$("#sGoal").value.trim(), drills:ids, total:drills.reduce((a,d)=>a+(d.dur||0),0) });
    save(); renderTraining(); toast("Πλάνο αποθηκεύτηκε");
  }
  function viewSession(id){
    const s=DB.sessions.find(x=>x.id===id);
    const drills=s.drills.map(did=>DB.drills.find(d=>d.id===did)).filter(Boolean);
    modal(`🗂️ ${esc(s.title)}`, `<div class="sub" style="margin-bottom:12px">${esc(s.goal||'')} · Σύνολο ${s.total}′</div>
      ${drills.map((d,i)=>`<div class="detail-block"><h4>${i+1}. ${esc(d.name)} — ${d.dur}′</h4>
        <div class="sub">${esc(d.goal)}</div>
        <ul style="margin-top:6px">${(d.coaching||[]).slice(0,3).map(c=>`<li>${esc(c)}</li>`).join("")}</ul></div>`).join("")}`,
      `<button class="btn" onclick="App.printSessionDoc('${id}')">⇩ Εξαγωγή PDF</button>
       <button class="btn primary" onclick="App.closeModal()">Κλείσιμο</button>`);
  }
  function delSession(id){ DB.sessions=DB.sessions.filter(s=>s.id!==id); save(); renderTraining(); }
  function editMicro(i){
    const m=DB.microcycle[i];
    modal(`📅 ${esc(m.day)} (${esc(m.code)})`, `
      <div class="row"><div class="field"><label>Θέμα</label><input id="mName" value="${esc(m.name)}"></div>
        <div class="field" style="max-width:120px"><label>Φορτίο %</label><input type="number" id="mLoad" value="${m.load}"></div></div>
      <div class="field"><label>Περιεχόμενο (μία γραμμή ανά σημείο)</label><textarea id="mItems" style="min-height:120px">${m.items.join("\n")}</textarea></div>`,
      `<button class="btn" onclick="App.closeModal()">Άκυρο</button>
       <button class="btn primary" onclick="App.saveMicro(${i})">Αποθήκευση</button>`);
  }
  function saveMicro(i){
    const m=DB.microcycle[i]; m.name=$("#mName").value.trim(); m.load=Math.max(0,Math.min(100,+$("#mLoad").value||0));
    m.color=loadColor(m.load); m.items=$("#mItems").value.split("\n").map(x=>x.trim()).filter(Boolean);
    save(); closeModal(); renderTraining();
  }

  /* ============================================================
     5) ΑΓΩΝΕΣ
     ============================================================ */
  function renderMatches(){
    const up=DB.matches.filter(m=>m.status==="upcoming").sort((a,b)=>a.date.localeCompare(b.date));
    const pl=DB.matches.filter(m=>m.status==="played").sort((a,b)=>b.date.localeCompare(a.date));
    $("#view-matches").innerHTML = `
      <div class="sectionhead"><h2>🏀 Match Center</h2>
        <div class="sp"><button class="btn primary sm" onclick="App.editMatch()">＋ Νέος Αγώνας</button></div></div>
      <div class="grid g2">
        <div class="card"><h3>🗓️ Προσεχείς</h3>
          ${up.length?up.map(matchRow).join(""):'<div class="empty">Κανένας προγραμματισμένος</div>'}</div>
        <div class="card"><h3>📊 Αποτελέσματα</h3>
          ${pl.length?pl.map(matchRow).join(""):'<div class="empty">Κανένα αποτέλεσμα</div>'}</div>
      </div>`;
  }
  function matchRow(m){
    const res = m.status==="played"? `<b style="font-size:16px;color:${m.pf>m.pa?'#22d3ee':m.pf<m.pa?'#ef4444':'#f59e0b'}">${m.pf}–${m.pa}</b>` : `<span class="chip b">${fmtDate(m.date)}</span>`;
    return `<div class="list-item" onclick="App.openMatch('${m.id}')">
      <div class="em">${m.status==='played'?'📊':'🏀'}</div>
      <div class="meta"><b>${esc(DB.club.short)} ${m.home?'🆚':'@'} ${esc(m.opp)}</b><small>${esc(m.comp)} · ${esc(m.system||'')}</small></div>
      ${res}</div>`;
  }
  function openMatch(id){
    const m=DB.matches.find(x=>x.id===id);
    const tac=DB.tactics.find(t=>t.id===m.tacticId);
    modal(`${esc(DB.club.short)} ${m.home?'vs':'@'} ${esc(m.opp)}`, `
      <div class="pill-row" style="margin-bottom:12px"><span class="chip b">${esc(m.comp)}</span>
        <span class="chip">${fmtDate(m.date)}</span><span class="chip">${esc(m.system||'')}</span>
        ${m.status==='played'?`<span class="chip ${m.pf>m.pa?'g':m.pf<m.pa?'r':'a'}">${m.pf}–${m.pa}</span>`:'<span class="chip a">επερχόμενος</span>'}</div>
      <div class="detail-block"><h4>🅱️ Πλάνο</h4><div class="sub">${tac?esc(tac.name):'—'}</div></div>
      <div class="detail-block"><h4>🕵️ Ανάλυση Αντιπάλου (scouting)</h4><div class="sub">${esc(m.oppNotes||'—')}</div></div>
      ${m.status==='played'&&m.scorers&&m.scorers.length?`<div class="detail-block"><h4>👟 Κορυφαίοι</h4><div class="sub">${m.scorers.map(esc).join(", ")}</div></div>`:''}
      ${m.status==='played'&&m.box&&Object.keys(m.box).length?`<div class="detail-block"><h4>📤 Εξαγωγή Boxscore</h4><div class="row"><button class="btn sm" onclick="App.printBoxscore('${m.id}')">⇩ PDF</button><button class="btn sm" onclick="App.exportBoxWord('${m.id}')">⇩ Word</button><button class="btn sm" onclick="App.exportBoxExcel('${m.id}')">⇩ Excel</button></div></div>`:''}`,
      `<button class="btn danger" onclick="App.delMatch('${m.id}')">Διαγραφή</button>
       <button class="btn" onclick="App.editMatch('${m.id}')">✎ Επεξεργασία</button>
       ${m.status==='upcoming'?`<button class="btn primary" onclick="App.resultMatch('${m.id}')">Καταχώρηση Αποτελέσματος</button>`:`<button class="btn primary" onclick="App.resultMatch('${m.id}')">📊 Στατιστικά Αγώνα</button>`}`);
  }
  function editMatch(id){
    const m=id?DB.matches.find(x=>x.id===id):null;
    modal(m?"Επεξεργασία Αγώνα":"Νέος Αγώνας",`
      <div class="row"><div class="field"><label>Αντίπαλος</label><input id="mOpp" value="${m?esc(m.opp):''}"></div>
        <div class="field" style="max-width:140px"><label>Ημερομηνία</label><input type="date" id="mDate" value="${m?m.date:nextSaturday()}"></div></div>
      <div class="row"><div class="field"><label>Διοργάνωση</label><input id="mComp" value="${m?esc(m.comp):'Πρωτάθλημα'}"></div>
        <div class="field" style="max-width:120px"><label>Έδρα</label><select id="mHome"><option value="1" ${!m||m.home?'selected':''}>Εντός</option><option value="0" ${m&&!m.home?'selected':''}>Εκτός</option></select></div></div>
      <div class="row"><div class="field"><label>Σύστημα</label><select id="mForm">${Object.keys(FORMATIONS).map(f=>`<option ${m&&m.system===f?'selected':''}>${f}</option>`).join("")}</select></div>
        <div class="field"><label>Τακτική/Σύστημα</label><select id="mTac">${DB.tactics.map(t=>`<option value="${t.id}" ${m&&m.tacticId===t.id?'selected':''}>${esc(t.name)}</option>`).join("")}</select></div></div>
      <div class="field"><label>🕵️ Ανάλυση αντιπάλου (scouting)</label><textarea id="mNotes">${m?esc(m.oppNotes):''}</textarea></div>`,
      `<button class="btn" onclick="App.closeModal()">Άκυρο</button><button class="btn primary" onclick="App.saveMatch('${id||''}')">Αποθήκευση</button>`);
  }
  function saveMatch(id){
    const data={ opp:$("#mOpp").value.trim()||"Αντίπαλος", date:$("#mDate").value, comp:$("#mComp").value.trim(),
      home:$("#mHome").value==="1", system:$("#mForm").value, tacticId:$("#mTac").value, oppNotes:$("#mNotes").value.trim() };
    if(id){ Object.assign(DB.matches.find(m=>m.id===id), data); }
    else{ DB.matches.push({ id:"m_"+Math.random().toString(36).slice(2,8), status:"upcoming", pf:null,pa:null,scorers:[],lineup:[], ...data }); }
    save(); closeModal(); renderMatches(); toast("Αποθηκεύτηκε");
  }
  function resultMatch(id){
    const m=DB.matches.find(x=>x.id===id);
    const box=m.box||{};
    const rows=[...DB.players].sort((a,b)=>POS_ORDER.indexOf(a.pos)-POS_ORDER.indexOf(b.pos)).map(pl=>{
      const b=box[pl.id]||{};
      const inp=(k,ph)=>`<input type="number" min="0" style="width:60px;padding:6px" data-bx="${pl.id}" data-k="${k}" value="${b[k]!=null?b[k]:''}" placeholder="${ph}">`;
      return `<tr><td style="white-space:nowrap"><b>${esc(pl.name)}</b> <span class="chip">${pl.pos}</span></td>
        <td class="center">${inp('p','0')}</td><td class="center">${inp('a','0')}</td><td class="center">${inp('r','0')}</td><td class="center">${inp('min','0')}</td></tr>`;
    }).join("");
    modal(m.status==='played'?"✎ Επεξεργασία Στατιστικών":"Καταχώρηση Αποτελέσματος",`
      <div class="row"><div class="field"><label>${esc(DB.club.short)} (πόντοι)</label><input type="number" id="rGf" value="${m.pf!=null?m.pf:0}"></div>
        <div class="field"><label>${esc(m.opp)} (πόντοι)</label><input type="number" id="rGa" value="${m.pa!=null?m.pa:0}"></div></div>
      <div class="detail-block"><h4>📊 Boxscore Παικτών <span style="font-weight:400;text-transform:none;color:var(--mut)">— τροφοδοτεί τα «Αναλυτικά»</span></h4>
        <div class="tbl-wrap"><table><thead><tr><th>Παίκτης</th><th class="center">Πόντ</th><th class="center">Ασίστ</th><th class="center">Ριμπ</th><th class="center">Λεπτά</th></tr></thead><tbody>${rows}</tbody></table></div>
        <div class="sub" style="font-size:11px;margin-top:6px">Άφησε κενό ό,τι δεν ισχύει. Σύνολα, μέσοι όροι & top σκόρερ ενημερώνονται αυτόματα.</div></div>`,
      `<button class="btn" onclick="App.closeModal()">Άκυρο</button><button class="btn primary" onclick="App.saveResult('${id}')">Αποθήκευση</button>`);
  }
  function applyBox(m,sign){
    const box=m.box||{}; Object.keys(box).forEach(pid=>{ const pl=DB.players.find(p=>p.id===pid); if(!pl)return; const b=box[pid];
      pl.points=Math.max(0,(pl.points||0)+sign*(b.p||0)); pl.assists=Math.max(0,(pl.assists||0)+sign*(b.a||0));
      pl.rebounds=Math.max(0,(pl.rebounds||0)+sign*(b.r||0)); pl.minutes=Math.max(0,(pl.minutes||0)+sign*(b.min||0));
      if(b.gp) pl.gp=Math.max(0,(pl.gp||0)+sign*1);
    });
  }
  function saveResult(id){
    const m=DB.matches.find(x=>x.id===id);
    if(m.box) applyBox(m,-1);            // αναίρεση προηγούμενων (σε επεξεργασία)
    const box={};
    document.querySelectorAll('input[data-bx]').forEach(inp=>{ const pid=inp.dataset.bx, k=inp.dataset.k, v=+inp.value||0; if(v){ (box[pid]=box[pid]||{})[k]=v; } });
    Object.keys(box).forEach(pid=>{ const b=box[pid]; if((b.min||0)>0 || b.p || b.a || b.r) b.gp=1; });
    m.pf=+$("#rGf").value||0; m.pa=+$("#rGa").value||0; m.status="played"; m.box=box;
    m.scorers=Object.keys(box).map(pid=>({pl:DB.players.find(p=>p.id===pid), b:box[pid]})).filter(x=>x.pl)
      .sort((a,b)=>(b.b.p||0)-(a.b.p||0)).slice(0,4).map(x=>`${x.pl.name} ${x.b.p||0}π${x.b.r?(' '+x.b.r+'ρ'):''}${x.b.a?(' '+x.b.a+'ασ'):''}`);
    applyBox(m,+1);
    save(); closeModal(); renderMatches(); toast("Αποτέλεσμα & στατιστικά καταχωρήθηκαν");
  }
  function delMatch(id){ if(!confirm("Διαγραφή αγώνα;"))return; const m=DB.matches.find(x=>x.id===id); if(m&&m.status==='played'&&m.box) applyBox(m,-1); DB.matches=DB.matches.filter(m=>m.id!==id); save(); closeModal(); renderMatches(); }

  /* ---- Εξαγωγή στατιστικών (Excel/CSV & PDF) ---- */
  function downloadFile(name, text, mime){ const blob=new Blob([text],{type:mime||"text/plain;charset=utf-8"}); const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1500); toast("Εξήχθη: "+name); }
  function csvCell(v){ v=(v==null?"":""+v); return /[";\n"]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v; }
  function csvText(rows){ return "﻿"+rows.map(r=>r.map(csvCell).join(";")).join("\r\n"); }
  function slug(s){ return (s||"").replace(/[^0-9A-Za-zΑ-Ωα-ωΆ-Ώά-ώ]+/g,"_").replace(/^_+|_+$/g,"").slice(0,40)||"export"; }
  const orderPlayers = () => [...DB.players].sort((a,b)=>POS_ORDER.indexOf(a.pos)-POS_ORDER.indexOf(b.pos));
  function ptable(head, bodyRows){
    return `<table style="width:100%;border-collapse:collapse;font-size:12px;margin-top:6px">
      <thead><tr>${head.map((h,i)=>`<th style="border:1px solid #bbb;padding:5px 7px;background:#f2dede;color:#111;text-align:${i?'center':'left'}">${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${bodyRows.map(r=>`<tr>${r.map((c,i)=>`<td style="border:1px solid #ccc;padding:4px 7px;text-align:${i?'center':'left'}">${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }

  function exportBoxExcel(id){
    const m=DB.matches.find(x=>x.id===id); if(!m||!m.box||!Object.keys(m.box).length){ toast("Δεν υπάρχουν στατιστικά αγώνα"); return; }
    const rows=[["Αγώνας", DB.club.short+(m.home?" vs ":" @ ")+m.opp],["Διοργάνωση", m.comp||""],["Ημερομηνία", m.date||""],
      ["Σκορ", DB.club.short+" "+(m.pf||0)+" - "+(m.pa||0)+" "+m.opp],[],
      ["Παίκτης","Θέση","Πόντοι","Ασίστ","Ριμπάουντ","Λεπτά"]];
    orderPlayers().forEach(pl=>{ const b=m.box[pl.id]; if(b) rows.push([pl.name,pl.pos,b.p||0,b.a||0,b.r||0,b.min||0]); });
    downloadFile("boxscore_"+slug(m.opp)+"_"+(m.date||"")+".csv", csvText(rows), "text/csv;charset=utf-8");
  }
  function printBoxscore(id){
    const m=DB.matches.find(x=>x.id===id); if(!m||!m.box||!Object.keys(m.box).length){ toast("Δεν υπάρχουν στατιστικά αγώνα"); return; }
    const body=orderPlayers().filter(pl=>m.box[pl.id]).map(pl=>{ const b=m.box[pl.id]; return [pl.name,pl.pos,b.p||0,b.a||0,b.r||0,b.min||0]; });
    ensurePrint(`<div class="pdoc">
      ${pHead("Boxscore Αγώνα", DB.club.short+(m.home?" vs ":" @ ")+m.opp+" · "+(m.comp||"")+" · "+(m.date||""))}
      <h3>Τελικό Σκορ: ${esc(DB.club.short)} ${m.pf||0} – ${m.pa||0} ${esc(m.opp)}</h3>
      ${ptable(["Παίκτης","Θέση","Πόντοι","Ασίστ","Ριμπάουντ","Λεπτά"], body)}
      ${pFoot()}
    </div>`);
  }
  function exportSeasonExcel(){
    const played=DB.matches.filter(m=>m.status==="played");
    const rows=[["Σεζόν — "+DB.club.name],["Αγώνες", played.length],[],
      ["Παίκτης","Θέση","Αγώνες","Πόντοι","Π/αγ","Ριμπ","Ρ/αγ","Ασίστ","Ασ/αγ","Λεπτά","Λ/αγ"]];
    orderPlayers().forEach(pl=>{ const gp=pl.gp||0, pg=v=>gp?(v/gp).toFixed(1):"0";
      rows.push([pl.name,pl.pos,gp,pl.points||0,pg(pl.points||0),pl.rebounds||0,pg(pl.rebounds||0),pl.assists||0,pg(pl.assists||0),pl.minutes||0,pg(pl.minutes||0)]); });
    downloadFile("statistika_sezon_"+new Date().toISOString().slice(0,10)+".csv", csvText(rows), "text/csv;charset=utf-8");
  }
  function printSeasonStats(){
    const played=DB.matches.filter(m=>m.status==="played");
    const body=orderPlayers().map(pl=>{ const gp=pl.gp||0, pg=v=>gp?(v/gp).toFixed(1):"0";
      return [pl.name,pl.pos,gp,pl.points||0,pg(pl.points||0),pl.rebounds||0,pg(pl.rebounds||0),pl.assists||0,pg(pl.assists||0)]; });
    ensurePrint(`<div class="pdoc">
      ${pHead("Στατιστικά Σεζόν", DB.club.name+" · "+played.length+" αγώνες")}
      ${ptable(["Παίκτης","Θέση","Αγ.","Πόντοι","Π/αγ","Ριμπ","Ρ/αγ","Ασίστ","Ασ/αγ"], body)}
      ${pFoot()}
    </div>`);
  }

  /* ---- Word helpers & εξαγωγή στατιστικών σε Word ---- */
  function wtable(head, rows){
    return `<table border="1" cellspacing="0" cellpadding="4" style="border-collapse:collapse;font-size:12px">
      <thead><tr>${head.map(h=>`<th style="background:#f2dede;color:#111">${esc(h)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }
  function wordDoc(title, sub, inner){
    return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>${esc(title)}</title></head><body style="font-family:Calibri,Arial,sans-serif;font-size:12px"><h1 style="color:#c81b28">${esc(title)}</h1>${sub?`<p><i>${esc(sub)}</i></p>`:""}${inner}</body></html>`;
  }
  function exportBoxWord(id){
    const m=DB.matches.find(x=>x.id===id); if(!m||!m.box||!Object.keys(m.box).length){ toast("Δεν υπάρχουν στατιστικά αγώνα"); return; }
    const body=orderPlayers().filter(pl=>m.box[pl.id]).map(pl=>{ const b=m.box[pl.id]; return [pl.name,pl.pos,b.p||0,b.a||0,b.r||0,b.min||0]; });
    const inner=`<h3>Τελικό Σκορ: ${esc(DB.club.short)} ${m.pf||0} – ${m.pa||0} ${esc(m.opp)}</h3>${wtable(["Παίκτης","Θέση","Πόντοι","Ασίστ","Ριμπάουντ","Λεπτά"],body)}`;
    downloadFile("boxscore_"+slug(m.opp)+"_"+(m.date||"")+".doc","﻿"+wordDoc("Boxscore Αγώνα", DB.club.short+(m.home?" vs ":" @ ")+m.opp+" · "+(m.comp||"")+" · "+(m.date||""), inner),"application/msword");
  }
  function exportSeasonWord(){
    const played=DB.matches.filter(m=>m.status==="played");
    const rows=orderPlayers().map(pl=>{ const gp=pl.gp||0, pg=v=>gp?(v/gp).toFixed(1):"0";
      return [pl.name,pl.pos,gp,pl.points||0,pg(pl.points||0),pl.rebounds||0,pg(pl.rebounds||0),pl.assists||0,pg(pl.assists||0)]; });
    const inner=wtable(["Παίκτης","Θέση","Αγ.","Πόντοι","Π/αγ","Ριμπ","Ρ/αγ","Ασίστ","Ασ/αγ"], rows);
    downloadFile("statistika_sezon_"+new Date().toISOString().slice(0,10)+".doc","﻿"+wordDoc("Στατιστικά Σεζόν", DB.club.name+" · "+played.length+" αγώνες", inner),"application/msword");
  }

  /* ---- Εξαγωγή ΟΛΟΥ του Playbook σε PDF ---- */
  function printPlaybook(){
    const cats=Object.keys(PLAY_CATS);
    const renders=[];
    let html=`<div class="pdoc">${pHead("Βιβλιοθήκη Συνεργασιών (Playbook)", DB.club.name+" · TACTIX BASKET")}`;
    let total=0;
    cats.forEach(c=>{
      const plays=DB.tactics.filter(t=>t.cat===c);
      if(!plays.length) return;
      html+=`<h2 style="color:#c81b28;border-bottom:2px solid #e4222f;padding-bottom:3px;margin:16px 0 8px;font-size:15px">${PLAY_CATS[c].ic} ${esc(PLAY_CATS[c].t)}</h2>`;
      plays.forEach(t=>{
        total++;
        if(!t.positions) t.positions=(t.customPositions||FORMATIONS[tacSystem(t)]||FORMATIONS["5-Out (Motion)"]).map(p=>({...p}));
        const cid="pp"+total;
        html+=`<div class="pdrill" style="break-inside:avoid"><div class="pgrid">
          <div class="ppitch" id="${cid}"></div>
          <div><h4 style="margin:0 0 3px">${esc(t.name)}</h4>
            <div style="font-size:10.5px;color:#777;margin-bottom:4px">${esc(tacSystem(t))}${(t.pos&&t.pos.length)?' · '+esc(t.pos.join(', ')):''}${t.full?' · full court':''}</div>
            <p style="font-size:11px;margin:2px 0;color:#333">${esc(t.summary||'')}</p>
            ${(t.phases.offense||[]).length?`<b style="font-size:11px;color:#111">▶️ Εκτέλεση</b><ul style="margin:2px 0 4px;padding-left:15px">${t.phases.offense.map(x=>`<li style="font-size:10.5px;margin-bottom:2px">${esc(x)}</li>`).join("")}</ul>`:''}
            ${(t.phases.special||[]).length?`<b style="font-size:11px;color:#111">🗣️ Coaching</b><ul style="margin:2px 0;padding-left:15px">${t.phases.special.map(x=>`<li style="font-size:10.5px;margin-bottom:2px">${esc(x)}</li>`).join("")}</ul>`:''}
          </div></div></div>`;
        renders.push({cid,t});
      });
    });
    html+=`<div style="margin-top:8px;font-size:11px;color:#666">Σύνολο: ${total} συνεργασίες</div>${pFoot()}</div>`;
    ensurePrint(html, ()=>{ renders.forEach(r=>{ const el=$("#"+r.cid); if(el) Court.render(el, r.t.positions, {arrows:r.t.movements||[], draws:r.t.draws||[], opp:r.t.opp||[], oppLabelMode:r.t.oppLabel, oppColor:r.t.oppColor, full:boardFull(r.t), ball:r.t.ball||null}); }); });
  }
  function exportPlaybookWord(){
    let body=`<h1 style="color:#c81b28">Βιβλιοθήκη Συνεργασιών (Playbook)</h1><p><i>${esc(DB.club.name)} · TACTIX BASKET · ${new Date().toLocaleDateString("el-GR")}</i></p>`;
    Object.keys(PLAY_CATS).forEach(c=>{
      const plays=DB.tactics.filter(t=>t.cat===c); if(!plays.length) return;
      body+=`<h2 style="color:#c81b28;border-bottom:2px solid #e4222f">${PLAY_CATS[c].ic} ${esc(PLAY_CATS[c].t)}</h2>`;
      plays.forEach(t=>{
        body+=`<h3>${esc(t.name)}</h3><p style="color:#666"><i>${esc(tacSystem(t))}${(t.pos&&t.pos.length)?' · Θέσεις: '+esc(t.pos.join(', ')):''}${t.full?' · full court':''}</i></p>`;
        if(t.summary) body+=`<p>${esc(t.summary)}</p>`;
        const sec=(lbl,arr)=>{ if(arr&&arr.length){ body+=`<p><b>${lbl}</b></p><ul>${arr.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`; } };
        sec("▶️ Εκτέλεση", t.phases.offense); sec("🧠 Ανάγνωση / Άμυνα", t.phases.defense);
        sec("🔁 Μετάβαση", t.phases.transition); sec("🗣️ Coaching Points", t.phases.special);
      });
    });
    const doc=`<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>Playbook</title></head><body style="font-family:Calibri,Arial,sans-serif;font-size:12px">${body}<p style="color:#888;font-size:10px">Σημ.: τα διαγράμματα γηπέδου διατίθενται στην εξαγωγή PDF.</p></body></html>`;
    downloadFile("playbook_"+new Date().toISOString().slice(0,10)+".doc", "﻿"+doc, "application/msword");
  }
  function exportPlaybookExcel(){
    const rows=[["Κατηγορία","Όνομα","Σύστημα","Θέσεις","Full court","Περιγραφή","Εκτέλεση","Coaching"]];
    Object.keys(PLAY_CATS).forEach(c=>{
      DB.tactics.filter(t=>t.cat===c).forEach(t=>{
        rows.push([ CAT_SHORT[c]||c, stripEmoji(t.name), tacSystem(t), (t.pos||[]).join(", "),
          t.full?"ΝΑΙ":"", t.summary||"",
          (t.phases.offense||[]).join(" | "), (t.phases.special||[]).join(" | ") ]);
      });
    });
    downloadFile("playbook_"+new Date().toISOString().slice(0,10)+".csv", csvText(rows), "text/csv;charset=utf-8");
  }

  /* ============================================================
     6) ΑΝΑΛΥΤΙΚΑ
     ============================================================ */
  function renderAnalytics(){
    const players=DB.players;
    if(!state.cmpA) state.cmpA=players[0]&&players[0].id;
    if(!state.cmpB) state.cmpB=players[1]&&players[1].id;
    const a=players.find(p=>p.id===state.cmpA), b=players.find(p=>p.id===state.cmpB);
    const played=DB.matches.filter(m=>m.status==="played");
    const pf=played.reduce((s,m)=>s+(m.pf||0),0), pa=played.reduce((s,m)=>s+(m.pa||0),0);
    const topScorers=[...players].sort((x,y)=>(y.points||0)-(x.points||0)).slice(0,5);

    const lineAvg = keys => Math.round(avg(players.filter(p=>keys.includes(p.pos)).map(ovr))||0);

    $("#view-analytics").innerHTML = `
      <div class="sectionhead"><h2>📊 Αναλυτικά</h2>
        <div class="sp"><span class="sub" style="font-size:11.5px;align-self:center">⇩ Στατιστικά:</span><button class="btn sm ghost" onclick="App.printSeasonStats()">PDF</button><button class="btn sm ghost" onclick="App.exportSeasonWord()">Word</button><button class="btn sm ghost" onclick="App.exportSeasonExcel()">Excel</button></div></div>
      <div class="grid g4" style="margin-bottom:16px">
        <div class="kpi"><div class="ic">🏀</div><div class="stat"><b>${played.length?(pf/played.length).toFixed(1):'0'}</b><span>Πόντοι υπέρ/αγ.</span></div></div>
        <div class="kpi"><div class="ic">🛡️</div><div class="stat"><b>${played.length?(pa/played.length).toFixed(1):'0'}</b><span>Πόντοι κατά/αγ.</span></div></div>
        <div class="kpi"><div class="ic">➕</div><div class="stat"><b>${pf-pa>=0?'+':''}${pf-pa}</b><span>Διαφορά (σύνολο)</span></div></div>
        <div class="kpi"><div class="ic">🏆</div><div class="stat"><b>${played.filter(m=>m.pf>m.pa).length}-${played.filter(m=>m.pf<m.pa).length}</b><span>Ν-Η (${played.length} αγ.)</span></div></div>
      </div>

      <div class="grid g2">
        <div class="card">
          <h3>⚖️ Σύγκριση Παικτών</h3>
          <div class="row" style="margin-bottom:12px">
            <div><label>Παίκτης Α (κόκκινο)</label><select onchange="App.setCmp('A',this.value)">${players.map(p=>`<option value="${p.id}" ${p.id===state.cmpA?'selected':''}>${esc(p.name)} (${p.pos})</option>`).join("")}</select></div>
            <div><label>Παίκτης Β (μπλε)</label><select onchange="App.setCmp('B',this.value)">${players.map(p=>`<option value="${p.id}" ${p.id===state.cmpB?'selected':''}>${esc(p.name)} (${p.pos})</option>`).join("")}</select></div>
          </div>
          ${a&&b?compareRadar(a,b):'<div class="empty">Επίλεξε παίκτες</div>'}
        </div>
        <div>
          <div class="card" style="margin-bottom:16px">
            <h3>📈 Μ.Ο. Αξιολόγησης ανά Γραμμή</h3>
            <div class="mini-bars">
              ${lineBar("Γκαρντ (PG/SG)", lineAvg(["PG","SG"]))}
              ${lineBar("Φόργουορντ (SF/PF)", lineAvg(["SF","PF"]))}
              ${lineBar("Σέντερ (C)", lineAvg(["C"]))}
            </div>
          </div>
          <div class="card">
            <h3>👟 Ηγέτες Στατιστικών <span class="tag">ανά αγώνα</span></h3>
            ${players.some(p=>p.points||p.rebounds||p.assists)? `<div class="tbl-wrap"><table>
              <thead><tr><th>Παίκτης</th><th class="center">Π/αγ</th><th class="center">Ρ/αγ</th><th class="center">Ασ/αγ</th><th class="center">Σύν. π</th></tr></thead>
              <tbody>${topScorers.filter(p=>p.points||p.rebounds||p.assists).map((p,i)=>{ const gp=p.gp||0; const pg=v=>gp?(v/gp).toFixed(1):'—';
              return `<tr><td>${i+1}. <b>${esc(p.name)}</b> <small style="color:var(--dim)">${p.pos}</small></td>
                <td class="center"><b style="color:var(--acc)">${pg(p.points||0)}</b></td><td class="center">${pg(p.rebounds||0)}</td><td class="center">${pg(p.assists||0)}</td>
                <td class="center" style="color:var(--mut)">${p.points||0}</td></tr>`; }).join("")}</tbody></table></div>
              <div class="sub" style="font-size:11px;margin-top:6px">Οι μέσοι όροι προκύπτουν αυτόματα από τα boxscore στο Match Center (📊 Στατιστικά Αγώνα).</div>`
              : '<div class="empty">Δεν έχουν καταγραφεί στατιστικά.<br>Καταχώρησέ τα ανά αγώνα στο <b>Match Center → 📊 Στατιστικά</b>.</div>'}
          </div>
        </div>
      </div>`;
  }
  function lineBar(name,v){ return `<div class="mb"><b style="text-align:left;color:var(--txt)">${name}</b><div class="attr-bar"><i style="width:${v/20*100}%;background:${attrColor(v)}"></i></div><b>${v}</b></div>`; }
  function setCmp(w,id){ if(w==='A')state.cmpA=id; else state.cmpB=id; renderAnalytics(); }
  function compareRadar(a,b){
    const keys=[...new Set([...Object.keys(a.attrs),...Object.keys(b.attrs)])].slice(0,8);
    const n=keys.length,cx=110,cy=110,R=88,max=20;
    const pt=(i,r)=>[cx+r*Math.cos(-Math.PI/2+i*2*Math.PI/n),cy+r*Math.sin(-Math.PI/2+i*2*Math.PI/n)];
    let grid="";[0.25,.5,.75,1].forEach(f=>grid+=`<polygon points="${keys.map((_,i)=>pt(i,R*f).join(",")).join(" ")}" fill="none" stroke="#2f4370"/>`);
    const poly=o=>keys.map((k,i)=>pt(i,R*Math.min(o.attrs[k]||0,max)/max).join(",")).join(" ");
    const labels=keys.map((k,i)=>{const[x,y]=pt(i,R+14);return `<text x="${x}" y="${y}" font-size="9" fill="#9fb0cc" text-anchor="middle" dominant-baseline="middle">${esc(k)}</text>`;}).join("");
    return `<div class="center"><svg viewBox="0 0 220 220" style="width:100%;max-width:340px">${grid}
      <polygon points="${poly(a)}" fill="#e4222f33" stroke="#e4222f" stroke-width="2"/>
      <polygon points="${poly(b)}" fill="#3b82f633" stroke="#3b82f6" stroke-width="2"/>${labels}</svg>
      <div class="legend" style="justify-content:center"><span><i class="dotc" style="background:#e4222f"></i>${esc(a.name)} (OVR ${ovr(a)})</span><span><i class="dotc" style="background:#3b82f6"></i>${esc(b.name)} (OVR ${ovr(b)})</span></div></div>`;
  }

  /* ============================================================
     7) ΠΡΟΓΡΑΜΜΑ
     ============================================================ */
  function renderSchedule(){
    const items=[
      ...DB.matches.map(m=>({date:m.date, type:'match', title:`${DB.club.short} ${m.home?'vs':'@'} ${m.opp}`, sub:`${m.comp} · ${m.system||''}`+(m.status==='played'?` · ${m.pf}–${m.pa}`:''), ic:'🏀'})),
      ...DB.events.map(e=>({...e, ic:e.type==='training'?'🏋️':'📌'}))
    ].sort((a,b)=>(a.date||'').localeCompare(b.date||''));
    $("#view-schedule").innerHTML = `
      <div class="sectionhead"><h2>📅 Πρόγραμμα</h2>
        <div class="sp"><button class="btn primary sm" onclick="App.addEvent()">＋ Γεγονός</button></div></div>
      <div class="card">${items.length?items.map(it=>`
        <div class="list-item"><div class="em">${it.ic}</div>
          <div class="meta"><b>${esc(it.title)}</b><small>${esc(it.sub||'')}</small></div>
          <span class="chip b">${fmtDate(it.date)}</span></div>`).join(""):'<div class="empty"><div class="big">📅</div>Κενό πρόγραμμα</div>'}</div>`;
  }
  function addEvent(){
    modal("Νέο Γεγονός",`
      <div class="field"><label>Τίτλος</label><input id="eTitle"></div>
      <div class="row"><div class="field"><label>Τύπος</label><select id="eType"><option value="training">Προπόνηση</option><option value="other">Άλλο</option></select></div>
        <div class="field"><label>Ημερομηνία</label><input type="date" id="eDate" value="${new Date().toISOString().slice(0,10)}"></div></div>
      <div class="field"><label>Σημείωση</label><input id="eSub"></div>`,
      `<button class="btn" onclick="App.closeModal()">Άκυρο</button><button class="btn primary" onclick="App.saveEvent()">Αποθήκευση</button>`);
  }
  function saveEvent(){ DB.events.push({date:$("#eDate").value,type:$("#eType").value,title:$("#eTitle").value.trim()||"Γεγονός",sub:$("#eSub").value.trim()}); save(); closeModal(); renderSchedule(); }

  /* ============================================================
     8) ΑΚΑΔΗΜΙΑ ΤΑΚΤΙΚΗΣ (γνώση)
     ============================================================ */
  function renderAcademy(){
    $("#view-academy").innerHTML = `
      <div class="sectionhead"><h2>🎓 Ακαδημία Τακτικής</h2>
        <div class="sub2">Έννοιες, αρχές & μεθοδολογία μπάσκετ — για τον επαγγελματία προπονητή</div></div>
      <div class="grid g2">
        ${acaCard("⚙️","Οι 4 Φάσεις του Παιχνιδιού",[
          "<b>Στημένη Επίθεση</b> — έχεις τη μπάλα, η άμυνα οργανωμένη (half-court).",
          "<b>Στημένη Άμυνα</b> — δεν έχεις τη μπάλα, στήνεις man ή zone.",
          "<b>Θετική Μετάβαση</b> — μόλις κέρδισες τη μπάλα (fast break, early offense).",
          "<b>Αρνητική Μετάβαση</b> — μόλις έχασες τη μπάλα (transition D, σταμάτα τη μπάλα)."])}
        ${acaCard("🧱","Το Pick & Roll — Το «Α» και το «Ω»",[
          "Το πιο σημαντικό όπλο του μοντέρνου μπάσκετ: 2 παίκτες, άπειρες λύσεις.",
          "Ο χειριστής διαβάζει το coverage: <b>roll</b> (κόψιμο), <b>pop</b> (άνοιγμα), pocket pass, skip.",
          "«Χρησιμοποίησε το μπλόκο κολλητά» — τρίψου στον screener για να κερδίσεις χώρο.",
          "Third side: αν κλείσει η πρώτη λύση, γρήγορη αντιστροφή στην αδύναμη πλευρά."])}
        ${acaCard("🛡️","Άμυνες στο Pick & Roll (Coverages)",[
          "<b>Drop</b>: ο ψηλός κάθεται κάτω, προστατεύει τη ρακέτα — δίνει pull-up/pop.",
          "<b>Hedge/Show</b>: ο ψηλός βγαίνει επιθετικά να καθυστερήσει, μετά recover.",
          "<b>Switch</b>: αλλάζουν αντιπάλους — σβήνει το μπλόκο, δημιουργεί mismatch.",
          "<b>Blitz/Trap</b>: διπλή πίεση στον χειριστή — τον αναγκάζει σε γρήγορη απόφαση.",
          "<b>ICE (down)</b>: στο πλάγιο PnR σπρώχνεις τη μπάλα στη γραμμή, μακριά από το κέντρο."])}
        ${acaCard("↔️","Spacing & Pace — Το Μοντέρνο Μπάσκετ",[
          "Spacing: 4.5μ αποστάσεις — κάθε drive έχει kick-out επιλογές.",
          "Ιεράρχηση σουτ: καλάθι & τρίποντο (ειδικά γωνίας) — αποφυγή μακρινού δίποντου.",
          "Pace: γρήγορη μεταφορά & early offense πριν στηθεί η άμυνα.",
          "5-out & positionless: όλοι χειρίζονται, μπλοκάρουν, σουτάρουν."])}
        ${acaCard("🔄","Motion Offense (Read & React)",[
          "Αρχές αντί για απομνημόνευση — οι παίκτες διαβάζουν την άμυνα.",
          "Pass & cut, drive & kick, fill, back-cut στο overplay.",
          "Κανόνας «0.5»: αποφασίζεις σε μισό δευτ. — πάσα/σουτ/ντρίμπλα.",
          "Σειρά διδασκαλίας: αρχή → 2-man → 3-man → πλήρες 5-man."])}
        ${acaCard("🇪🇺","EuroLeague vs NBA — Δύο Σχολές",[
          "EuroLeague: πιο ομαδική, αργότερος ρυθμός (~70-80 κατοχές), αυστηρή δομή & set plays.",
          "Μικρότερο γήπεδο & πιο κοντινό τρίποντο → πυκνότερη ρακέτα, δυσκολότερη διείσδυση.",
          "NBA: περισσότερος χώρος, ρυθμός, pick & roll & iso, βαρύτητα στο τρίποντο.",
          "Ευρωπαϊκή άμυνα: ζητά και από τους 5· NBA: ατομική κυριαρχία & προστασία ρακέτας."])}
        ${acaCard("🧭","Άμυνα: Man vs Zone",[
          "<b>Man-to-man</b>: πίεση στην μπάλα, βοήθεια & recover, ball–you–man θέση.",
          "<b>2-3 Zone</b>: προστατεύει τη ρακέτα, ευάλωτη στο σουτ από το high-post & γωνίες.",
          "<b>1-3-1 / 3-2</b>: πιέζει ψηλά, trapping, αναγκάζει λάθη — ρίσκο στο ριμπάουντ.",
          "Junk (box-and-one, triangle-and-two): ειδικά για τον αστέρα του αντιπάλου."])}
        ${acaCard("💪","Ριμπάουντ & Μετάβαση",[
          "Box-out: βρες σώμα πριν τη μπάλα — κάθε άμυνα τελειώνει με αμυντικό ριμπάουντ.",
          "Outlet & push: γρήγορη μπάλα μπροστά για early offense.",
          "Transition D: πρώτος στόχος να σταματήσεις τη μπάλα, μετά matchup.",
          "Transition balance: 1-2 παίκτες πάντα έτοιμοι για την επιστροφή."])}
      </div>
      <div class="card" style="margin-top:16px">
        <h3>📐 Οι Ζώνες του Γηπέδου</h3>
        <div class="board-wrap">
          <div>${zonesSVG()}</div>
          <div class="detail-block">
            <h4>Περιμετρικά σημεία</h4>
            <ul><li>Κορυφή (top of the key) — εκκίνηση PnR & οργάνωση</li>
            <li>Πτέρυγες (wings) — δημιουργία & αντιστροφές</li>
            <li>Γωνίες (corners) — το πιο αποδοτικό τρίποντο (corner three)</li></ul>
            <h4>Εσωτερικά σημεία</h4>
            <ul><li>Elbows — high post, DHO, στημένες (Horns)</li>
            <li>Ρακέτα / low block — post-up & finishing</li>
            <li>Dunker spot — κάτω από το καλάθι για lob & offensive rebound</li></ul>
          </div>
        </div>
      </div>
      <div class="card" style="margin-top:16px">
        <h3>📖 Πηγές & Περαιτέρω Μελέτη</h3>
        <div class="sub">Οι έννοιες βασίζονται σε δημόσια τακτική βιβλιογραφία & ανάλυση:</div>
        <ul class="sub" style="margin-top:8px">
          <li>Breakthrough Basketball — Offenses & Motion (breakthroughbasketball.com)</li>
          <li>Coach's Clipboard — Basketball Offenses & Defenses (coachesclipboard.net)</li>
          <li>Pick & Roll Coverages Explained — Drop/Switch/Blitz/ICE (hoopbrief.com)</li>
          <li>EuroLeague Basketball — Tactical analysis (euroleaguebasketball.net, eurohoops.net)</li>
        </ul>
      </div>`;
  }
  function acaCard(ic,title,items){ return `<div class="card"><h3>${ic} ${esc(title)}</h3><ul class="detail-block" style="margin:0;padding-left:18px">${items.map(x=>`<li style="margin-bottom:6px;font-size:13px;line-height:1.5">${x}</li>`).join("")}</ul></div>`; }
  function zonesSVG(){
    // Ημιγήπεδο μπάσκετ με σημειωμένες ζώνες
    let s=`<svg viewBox="0 0 100 94" style="width:100%;max-width:300px;border-radius:10px">`;
    s+=`<rect x="0" y="0" width="100" height="94" fill="#12203c"/>`;
    const L="rgba(255,255,255,.55)";
    // ρακέτα
    s+=`<rect x="35" y="4" width="30" height="34" fill="rgba(228,34,47,.20)" stroke="${L}" stroke-width=".6"/>`;
    s+=`<path d="M35 38 A 12 12 0 0 1 65 38" fill="none" stroke="${L}" stroke-width=".6"/>`;
    // τρίποντο
    s+=`<line x1="9" y1="4" x2="9" y2="20" stroke="${L}" stroke-width=".6"/>`;
    s+=`<line x1="91" y1="4" x2="91" y2="20" stroke="${L}" stroke-width=".6"/>`;
    s+=`<path d="M9 20 A 41 41 0 0 0 91 20" fill="none" stroke="${L}" stroke-width=".6"/>`;
    s+=`<circle cx="50" cy="11" r="2.4" fill="none" stroke="#ff8a5c" stroke-width=".7"/>`;
    s+=`<rect x="0" y="0" width="100" height="94" fill="none" stroke="${L}" stroke-width=".6"/>`;
    // σημεία ζωνών
    const dot=(x,y,c)=>`<circle cx="${x}" cy="${y}" r="2.6" fill="${c}"/>`;
    s+=dot(50,30,"#3b82f6")+dot(20,40,"#3b82f6")+dot(80,40,"#3b82f6");   // top & wings (μπλε)
    s+=dot(9,14,"#e4222f")+dot(91,14,"#e4222f");                          // corners (κόκκινο)
    s+=dot(38,34,"#f59e0b")+dot(62,34,"#f59e0b");                         // elbows (πορτοκαλί)
    s+=dot(42,14,"#e2e8f0")+dot(58,14,"#e2e8f0");                         // low blocks
    s+=`<text x="50" y="46" fill="#fff" font-size="4.6" text-anchor="middle">ΚΟΡΥΦΗ</text>`;
    s+=`<text x="9" y="24" fill="#fecaca" font-size="4.2" text-anchor="middle">ΓΩΝΙΑ</text>`;
    s+=`<text x="91" y="24" fill="#fecaca" font-size="4.2" text-anchor="middle">ΓΩΝΙΑ</text>`;
    s+=`<text x="50" y="26" fill="#fff" font-size="4.2" text-anchor="middle">ΡΑΚΕΤΑ</text>`;
    s+=`</svg>`;
    return s;
  }

  /* ============================================================
     Club / Export / Import
     ============================================================ */
  function editClub(){
    modal("Ρυθμίσεις Ομάδας",`
      <div class="row"><div class="field"><label>Όνομα</label><input id="cName" value="${esc(DB.club.name)}"></div>
        <div class="field" style="max-width:100px"><label>Αρκτικόλεξο</label><input id="cShort" value="${esc(DB.club.short)}" maxlength="4"></div></div>
      <div class="field"><label>Βασικό σύστημα</label><select id="cForm">${Object.keys(FORMATIONS).map(f=>`<option ${f===DB.club.system?'selected':''}>${f}</option>`).join("")}</select></div>
      <label class="list-item" style="cursor:pointer;margin-top:4px">
        <input type="checkbox" id="cAutoLand" ${(!DB.settings||DB.settings.autoLandscape!==false)?'checked':''} style="width:auto;flex:0 0 auto">
        <div class="meta"><b>📐 Αυτόματο Ταμπλό σε οριζόντια θέση</b><small>Σε κινητό/τάμπλετ, γυρίζοντας οριζόντια ανοίγει το μεγάλο ταμπλό</small></div></label>`,
      `<button class="btn" onclick="App.closeModal()">Άκυρο</button><button class="btn primary" onclick="App.saveClub()">Αποθήκευση</button>`);
  }
  function saveClub(){ DB.club.name=$("#cName").value.trim()||"Η Ομάδα μου"; DB.club.short=($("#cShort").value.trim()||"BC").toUpperCase(); DB.club.system=$("#cForm").value; DB.settings=DB.settings||{}; DB.settings.autoLandscape=$("#cAutoLand").checked; save(); closeModal(); syncHeader(); go(state.view); }
  function syncHeader(){ $("#clubName").textContent=DB.club.name; $("#clubDot").textContent=DB.club.short.slice(0,3); }

  function exportData(){
    const blob=new Blob([JSON.stringify(DB,null,2)],{type:"application/json"});
    const a=document.createElement("a"); a.href=URL.createObjectURL(blob);
    a.download="tactix-basket-"+new Date().toISOString().slice(0,10)+".json"; a.click(); toast("Εξήχθη");
  }
  function importData(ev){
    const f=ev.target.files[0]; if(!f) return;
    const r=new FileReader(); r.onload=()=>{ try{ DB=JSON.parse(r.result); save(); syncHeader(); go("dashboard"); toast("Εισήχθη επιτυχώς"); }catch(e){ toast("Σφάλμα αρχείου"); } };
    r.readAsText(f); ev.target.value="";
  }

  /* ---------- init ---------- */
  /* ---- Αυτόματο μεγάλο Ταμπλό όταν γυρίζεις το κινητό/τάμπλετ οριζόντια ---- */
  function orientState(){
    const mm = q => window.matchMedia ? window.matchMedia(q).matches : false;
    const landscape = window.matchMedia ? mm("(orientation: landscape)") : (window.innerWidth>window.innerHeight);
    // «Συσκευή αφής» = κινητό ή τάμπλετ ΟΠΟΙΑΣΔΗΠΟΤΕ ίντσας (coarse pointer), όχι desktop με ποντίκι
    const touch = mm("(pointer: coarse)") || ('ontouchstart' in window) || (navigator.maxTouchPoints||0)>0;
    return { landscape, touch };
  }
  function onOrient(){
    if(DB.settings && DB.settings.autoLandscape===false) return;   // απενεργοποιημένο από ρυθμίσεις
    const {landscape,touch}=orientState();
    if(!touch) return;                              // μόνο κινητά/τάμπλετ (όλων των ιντσών), όχι desktop
    if(landscape){
      if(state.wb || state.present) return;          // ήδη σε μεγάλη προβολή
      let id = state.view==="playbook" ? state.playId : state.tacticId;
      if(!id){ const t=DB.tactics.find(x=>!x.cat && tacSystem(x)===DB.club.system) || DB.tactics.find(x=>!x.cat); id=t&&t.id; }
      if(id) whiteboard(id);
    } else {
      if(state.wb) wbExit();                          // πίσω σε κατακόρυφο → κλείσε το ταμπλό
    }
  }

  function showOnboarding(){
    modal("👋 Καλωσόρισες στο TACTIX BASKET", `
      <div class="sub" style="margin-bottom:10px">Επαγγελματικό εργαλείο προπονητή μπάσκετ — όλα <b>offline</b>, στο κινητό & στο τάμπλετ σου.</div>
      <div class="detail-block"><h4>🅱️ Συστήματα & 📋 Συνεργασίες</h4><div class="sub">12 συστήματα + 57 συνεργασίες με σχέδια. Κλικ σε πιόνι για ρόλο· εργαλεία κίνηση/πάσα/μπλόκο· φίλτρο ανά θέση & αναζήτηση.</div></div>
      <div class="detail-block"><h4>📐 Ταμπλό Timeout</h4><div class="sub">Πάτα το κόκκινο κουμπί <b>📐</b> ή <b>γύρισε το κινητό/τάμπλετ οριζόντια</b> → ανοίγει μεγάλο ταμπλό. Σχεδίασε με γραφίδα (χρώμα/πάχος/γόμα), βάλε αντιπάλους, ονόματα, screenshot.</div></div>
      <div class="detail-block"><h4>🏀 Αγώνες & 📊 Αναλυτικά</h4><div class="sub">Καταχώρησε boxscore ανά αγώνα → αυτόματα μέσοι όροι & ηγέτες. Εξαγωγή PDF/Word/Excel.</div></div>
      <div class="detail-block"><h4>🔁 Rotation & 🩹 Διαθεσιμότητα</h4><div class="sub">Στο Ρόστερ: όρισε ποιοι παίζουν κάθε περίοδο (λεπτά) & σημείωσε τραυματίες/εκτός.</div></div>
      <div class="detail-block"><h4>📲 Εγκατάσταση</h4><div class="sub">Πρόσθεσέ το στην αρχική οθόνη για να δουλεύει σαν κανονική εφαρμογή, ακόμη & χωρίς ίντερνετ.</div></div>`,
      `<button class="btn primary" onclick="App.finishOnboarding()">Ξεκίνα! 🏀</button>`);
  }
  function finishOnboarding(){ DB.settings=DB.settings||{}; DB.settings.onboarded=true; save(); closeModal(); }

  function quickBoard(){
    let id = state.view==="playbook" ? state.playId : state.tacticId;
    if(!id){ const t=DB.tactics.find(x=>!x.cat && tacSystem(x)===DB.club.system) || DB.tactics.find(x=>!x.cat); id=t&&t.id; }
    if(id) whiteboard(id); else toast("Δεν υπάρχει σύστημα/συνεργασία");
  }
  function installPWA(){
    const e=window.__deferredPrompt, bar=$("#installBar");
    if(!e){ toast("Μενού browser → «Προσθήκη στην αρχική οθόνη»"); return; }
    e.prompt(); e.userChoice.finally(()=>{ window.__deferredPrompt=null; if(bar) bar.classList.remove("show"); });
  }

  function init(){
    load(); renderNav(); syncHeader();
    const bl=$("#brandLogo"); if(bl) bl.innerHTML=LOGO_SVG();
    try{ const fav=$("#favicon"); if(fav) fav.href="data:image/svg+xml;utf8,"+encodeURIComponent(LOGO_SVG(64)); }catch(_){}
    $("#clubPill").onclick=editClub;
    $("#modalBg").addEventListener("click",e=>{ if(e.target===$("#modalBg")) closeModal(); });
    try{
      window.addEventListener("orientationchange", ()=>setTimeout(onOrient,350));
      const mq=window.matchMedia && window.matchMedia("(orientation: landscape)");
      if(mq){ if(mq.addEventListener) mq.addEventListener("change", ()=>setTimeout(onOrient,200)); else if(mq.addListener) mq.addListener(()=>setTimeout(onOrient,200)); }
    }catch(_){}
    go("dashboard");
    if(!DB.settings || !DB.settings.onboarded) setTimeout(showOnboarding, 500);
  }

  return {
    init, go, closeModal, export:exportData, import:importData,
    viewPlayer, editPlayer, savePlayer, delPlayer, addAttrRow,
    squadTab:squadTabSet, cycleStatus, toggleRot, rotSet, rotClear, printRotation,
    renderTactics, openTactic, tacTab, useTactic, newTactic, openDesigner, designerForm, saveTactic, delTactic,
    boardTool, clearArrows, setRole, dTool, dClearArrows, setDesignerRole,
    // playbook
    renderPlaybook, playbookCat, playbookPos, playbookSearch, openPlay, playTool, clearPlayArrows, playTab, newPlay, editPlay, savePlay, delPlay,
    // exports στατιστικών
    exportBoxExcel, printBoxscore, exportSeasonExcel, printSeasonStats, printPlaybook, exportPlaybookWord, exportPlaybookExcel, exportBoxWord, exportSeasonWord,
    present, presentNav, presentGo, presentArrows, presentExit, presentTool, presentBall, presentClear,
    whiteboard, wbTool, wbBall, wbClear, wbExit, wbColor, wbWidth, wbFlip, wbUndo, wbLabels, wbOpp, wbOppLabel, wbOppColor, wbSnapshot, snapImage, editStarters, saveStarters,
    printTactic, printSessionDoc, printMicro,
    trainTab:trainTabSet, viewDrill, newDrill, saveDrill, delDrill, saveSession, viewSession, delSession, editMicro, saveMicro,
    openMatch, editMatch, saveMatch, resultMatch, saveResult, delMatch,
    setCmp,
    addEvent, saveEvent,
    editClub, saveClub, quickBoard, installPWA, showOnboarding, finishOnboarding
  };
})();
document.addEventListener("DOMContentLoaded", App.init);
