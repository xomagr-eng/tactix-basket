/* ============================================================
   TACTIX BASKET — Σχεδίαση Γηπέδου (SVG, offline, χωρίς libs)
   Δύο λειτουργίες: ΗΜΙΓΗΠΕΔΟ (default) & ΟΛΟΚΛΗΡΟ ΓΗΠΕΔΟ (opts.full — για press).
   Σύστημα δεδομένων: x 0..100 (αριστερά→δεξιά), y 0..100.
     • Ημιγήπεδο: y 0 = μεσαία γραμμή (κάτω), y 100 = καλάθι (πάνω).
     • Ολόκληρο:  y 0 = δικό μας baseline (κάτω), y 100 = αντίπαλο baseline (πάνω).
   Επίθεση/κατεύθυνση προς τα πάνω.
   ============================================================ */
const Court = (() => {

  function geom(full,flip){
    const W=100, H = full?180:94;
    const X0=4, X1=96, Y0 = full?6:4, Y1 = full?174:90;
    const fx = dx => X0 + (dx/100)*(X1-X0);
    const fy = dy => flip ? (Y0 + (dy/100)*(Y1-Y0)) : (Y1 - (dy/100)*(Y1-Y0));
    const inv = (px,py) => ({
      x: Math.max(2, Math.min(98, ((px-X0)/(X1-X0))*100)),
      y: Math.max(2, Math.min(98, (flip ? ((py-Y0)/(Y1-Y0)) : ((Y1-py)/(Y1-Y0)))*100))
    });
    return {W,H,X0,X1,Y0,Y1,fx,fy,inv,full,flip};
  }

  // Χρώμα πιονιού ανά θέση
  const roleColor = r => {
    if(["PG","SG","1","2"].includes(r)) return "#3b82f6";
    if(["SF","3"].includes(r)) return "#e2e8f0";
    return "#e4222f";
  };

  const L = "rgba(255,255,255,.62)";
  const PAINT = "rgba(228,34,47,.20)";

  // Μαρκάρισμα ενός καλαθιού. baseY=γραμμή τερμάτων, s=+1 (προς τα κάτω) ή -1 (προς τα πάνω)
  function markEnd(g, baseY, s){
    let out="";
    const BX=50, BY=baseY + s*7;
    const laneW=30, laneX0=50-laneW/2, ftY=baseY + s*34;
    const ry0=Math.min(baseY,ftY), rh=Math.abs(ftY-baseY);
    // ρακέτα
    out += `<rect x="${laneX0}" y="${ry0}" width="${laneW}" height="${rh}" fill="${PAINT}" stroke="${L}" stroke-width=".55"/>`;
    // κύκλος βολών (συμπαγές προς baseline, διακεκομμένο προς κέντρο)
    const solid = s>0?1:0;
    out += `<path d="M ${laneX0} ${ftY} A 12 12 0 0 ${solid} ${laneX0+laneW} ${ftY}" fill="none" stroke="${L}" stroke-width=".55"/>`;
    out += `<path d="M ${laneX0} ${ftY} A 12 12 0 0 ${1-solid} ${laneX0+laneW} ${ftY}" fill="none" stroke="${L}" stroke-width=".45" stroke-dasharray="1.6 1.6"/>`;
    // ταμπλό + στεφάνι
    out += `<line x1="${BX-6}" y1="${baseY+s*4}" x2="${BX+6}" y2="${baseY+s*4}" stroke="${L}" stroke-width=".7"/>`;
    out += `<line x1="${BX}" y1="${baseY+s*4}" x2="${BX}" y2="${BY-s*2.6}" stroke="${L}" stroke-width=".5"/>`;
    out += `<circle cx="${BX}" cy="${BY}" r="2.6" fill="none" stroke="#ff8a5c" stroke-width=".7"/>`;
    // no-charge arc
    const naSweep = s>0?0:1;
    out += `<path d="M ${BX-8} ${BY} A 8 8 0 0 ${naSweep} ${BX+8} ${BY}" fill="none" stroke="${L}" stroke-width=".45"/>`;
    // τρίποντο
    const R3=41, CX0=g.X0+5, CX1=g.X1-5, cornerTop=baseY + s*16, arcSweep = s>0?0:1;
    out += `<line x1="${CX0}" y1="${baseY}" x2="${CX0}" y2="${cornerTop}" stroke="${L}" stroke-width=".55"/>`;
    out += `<line x1="${CX1}" y1="${baseY}" x2="${CX1}" y2="${cornerTop}" stroke="${L}" stroke-width=".55"/>`;
    out += `<path d="M ${CX0} ${cornerTop} A ${R3} ${R3} 0 0 ${arcSweep} ${CX1} ${cornerTop}" fill="none" stroke="${L}" stroke-width=".55"/>`;
    return out;
  }

  function courtSVG(g){
    const wood1="#14223f", wood2="#0f1830";
    let s="";
    const bands = g.full?12:6;
    for(let i=0;i<bands;i++){
      const y = g.Y0 + i*((g.Y1-g.Y0)/bands);
      s += `<rect x="${g.X0}" y="${y}" width="${g.X1-g.X0}" height="${(g.Y1-g.Y0)/bands}" fill="${i%2?wood1:wood2}"/>`;
    }
    // περίγραμμα
    s += `<rect x="${g.X0}" y="${g.Y0}" width="${g.X1-g.X0}" height="${g.Y1-g.Y0}" fill="none" stroke="${L}" stroke-width=".6"/>`;
    if(g.full){
      const yMid=(g.Y0+g.Y1)/2;
      s += `<line x1="${g.X0}" y1="${yMid}" x2="${g.X1}" y2="${yMid}" stroke="${L}" stroke-width=".55"/>`;
      s += `<circle cx="50" cy="${yMid}" r="11" fill="none" stroke="${L}" stroke-width=".55"/>`;
      s += `<circle cx="50" cy="${yMid}" r=".8" fill="${L}"/>`;
      s += markEnd(g, g.Y0, +1);   // αντίπαλο καλάθι (πάνω)
      s += markEnd(g, g.Y1, -1);   // δικό μας καλάθι (κάτω)
    } else if(!g.flip){
      s += markEnd(g, g.Y0, +1);   // καλάθι (πάνω)
      // μεσαία γραμμή & μισός κεντρικός κύκλος (κάτω)
      s += `<line x1="${g.X0}" y1="${g.Y1}" x2="${g.X1}" y2="${g.Y1}" stroke="${L}" stroke-width=".55"/>`;
      s += `<path d="M ${50-11} ${g.Y1} A 11 11 0 0 1 ${50+11} ${g.Y1}" fill="none" stroke="${L}" stroke-width=".55"/>`;
      s += `<circle cx="50" cy="${g.Y1}" r=".8" fill="${L}"/>`;
    } else {
      s += markEnd(g, g.Y1, -1);   // καλάθι (κάτω) — αντεστραμμένο
      // μεσαία γραμμή & μισός κεντρικός κύκλος (πάνω)
      s += `<line x1="${g.X0}" y1="${g.Y0}" x2="${g.X1}" y2="${g.Y0}" stroke="${L}" stroke-width=".55"/>`;
      s += `<path d="M ${50-11} ${g.Y0} A 11 11 0 0 0 ${50+11} ${g.Y0}" fill="none" stroke="${L}" stroke-width=".55"/>`;
      s += `<circle cx="50" cy="${g.Y0}" r=".8" fill="${L}"/>`;
    }
    return s;
  }

  function drawsSVG(g, draws){
    if(!draws||!draws.length) return "";
    return draws.map(d=>{
      if(!d.pts||d.pts.length<2) return "";
      const pts=d.pts.map(p=>g.fx(p[0]).toFixed(2)+","+g.fy(p[1]).toFixed(2)).join(" ");
      return `<polyline points="${pts}" fill="none" stroke="${d.color||'#fff'}" stroke-width="${d.w||1.2}" stroke-linecap="round" stroke-linejoin="round" opacity=".95"/>`;
    }).join("");
  }

  const POSNUM = {PG:1,SG:2,SF:3,PF:4,C:5};
  function tokenSVG(g, pl, i, opts){
    opts = opts||{};
    const c = roleColor(pl.r);
    const x = g.fx(pl.x), y = g.fy(pl.y);
    const R = g.full?5.2:4.3, F1 = g.full?4.7:3.9, F2 = g.full?4:3.4, F3 = g.full?3.6:3.1;
    const lm = opts.labelMode || "role";
    let label = pl.label ? pl.label : (pl.r||i);
    if((lm==="num"||lm==="name") && POSNUM[pl.r]!=null) label = POSNUM[pl.r];
    let below="";
    if(pl.roleCode) below=`<text y="${R*2.1}" text-anchor="middle" font-size="${F2}" font-weight="800" fill="#ff8a8a" style="paint-order:stroke;stroke:#0b1220;stroke-width:.9px">${esc(pl.roleCode)}</text>`;
    else if(lm==="name" && opts.names && opts.names[pl.r]) below=`<text y="${R*2.05}" text-anchor="middle" font-size="${F3}" font-weight="700" fill="#fff" style="paint-order:stroke;stroke:#0b1220;stroke-width:.9px">${esc(opts.names[pl.r])}</text>`;
    else if(pl.name) below=`<text y="${R*2.15}" text-anchor="middle" font-size="${F3}" font-weight="700" fill="#fff" style="paint-order:stroke;stroke:#0b1220;stroke-width:.7px">${esc(pl.name)}</text>`;
    return `<g class="tok" data-i="${i}" transform="translate(${x},${y})">
      <circle r="${R}" fill="${c}" stroke="#0b1220" stroke-width=".6"/>
      <text y="1.4" text-anchor="middle" font-size="${F1}" font-weight="800" fill="#fff" style="paint-order:stroke;stroke:#0b1220;stroke-width:.9px">${label}</text>
      ${below}
    </g>`;
  }
  function oppTokenSVG(g, o, i, opts){
    opts=opts||{};
    const x=g.fx(o.x), y=g.fy(o.y); const R=g.full?5.2:4.3, F=g.full?4.6:3.8;
    const mode=opts.oppLabelMode||"x";
    const label = mode==="num" ? (i+1) : (o.label!=null ? o.label : "X");
    const fill = opts.oppColor || "#1e293b";
    return `<g class="otok" data-i="${i}" transform="translate(${x},${y})">
      <circle r="${R}" fill="${fill}" stroke="#cbd5e1" stroke-width=".8"/>
      <text y="1.5" text-anchor="middle" font-size="${F}" font-weight="800" fill="#e2e8f0" style="paint-order:stroke;stroke:#0b1220;stroke-width:.8px">${esc(label)}</text>
    </g>`;
  }
  function hitTest(opts, dx, dy){
    const th=4.5; let best=null;
    const seg=(px,py,ax,ay,bx,by)=>{ const vx=bx-ax,vy=by-ay,L=vx*vx+vy*vy||1; let t=((px-ax)*vx+(py-ay)*vy)/L; t=Math.max(0,Math.min(1,t)); return Math.hypot(px-(ax+t*vx),py-(ay+t*vy)); };
    (opts.draws||[]).forEach((d,i)=>{ if(!d.pts)return; for(let k=1;k<d.pts.length;k++){ const dd=seg(dx,dy,d.pts[k-1][0],d.pts[k-1][1],d.pts[k][0],d.pts[k][1]); if(dd<th&&(!best||dd<best.dist)) best={kind:"draw",index:i,dist:dd}; } });
    (opts.arrows||[]).forEach((a,i)=>{ const dd=seg(dx,dy,a.from[0],a.from[1],a.to[0],a.to[1]); if(dd<th&&(!best||dd<best.dist)) best={kind:"arrow",index:i,dist:dd}; });
    return best;
  }

  function arrowsSVG(g, arrows){
    if(!arrows||!arrows.length) return "";
    let s = `<defs>
      <marker id="ah" markerWidth="5" markerHeight="5" refX="3.5" refY="2.5" orient="auto">
        <path d="M0,0 L5,2.5 L0,5 Z" fill="#fde047"/></marker>
      <marker id="ah2" markerWidth="5" markerHeight="5" refX="3.5" refY="2.5" orient="auto">
        <path d="M0,0 L5,2.5 L0,5 Z" fill="#38bdf8"/></marker>
    </defs>`;
    arrows.forEach(a=>{
      const x1=g.fx(a.from[0]),y1=g.fy(a.from[1]),x2=g.fx(a.to[0]),y2=g.fy(a.to[1]);
      if(a.type==="screen"){
        const dx=x2-x1, dy=y2-y1, len=Math.hypot(dx,dy)||1, nx=-dy/len, ny=dx/len;
        s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#f59e0b" stroke-width=".9"/>`;
        s += `<line x1="${x2+nx*2.6}" y1="${y2+ny*2.6}" x2="${x2-nx*2.6}" y2="${y2-ny*2.6}" stroke="#f59e0b" stroke-width="1.1"/>`;
        return;
      }
      const pass = a.type==="pass";
      const col = pass?"#38bdf8":"#fde047";
      const dash = pass?'stroke-dasharray="2 2"':'';
      s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${col}" stroke-width=".9" ${dash} marker-end="url(#${pass?'ah2':'ah'})"/>`;
    });
    return s;
  }

  function basketPt(g){ return { bx:50, by: g.flip ? (g.Y1-7) : (g.Y0+7) }; }
  function isThree(g, px, py){ const {bx,by}=basketPt(g); return Math.hypot(px-bx, py-by) > 41; }
  function shotsSVG(g, shots){
    if(!shots||!shots.length) return "";
    const r=g.full?2.5:2.1;
    return shots.map(s=>{
      const x=g.fx(s.x), y=g.fy(s.y);
      if(s.made) return `<circle cx="${x}" cy="${y}" r="${r}" fill="${s.is3?'#22d3ee':'#3b82f6'}" stroke="#0b1220" stroke-width=".45"/>`;
      return `<g stroke="#ef4444" stroke-width="1.1" stroke-linecap="round"><line x1="${x-r}" y1="${y-r}" x2="${x+r}" y2="${y+r}"/><line x1="${x+r}" y1="${y-r}" x2="${x-r}" y2="${y+r}"/></g>`;
    }).join("");
  }

  function ballSVG(g, b){
    const x=g.fx(b.x), y=g.fy(b.y);
    return `<g class="ball" style="cursor:grab" transform="translate(${x},${y})">
      <circle r="3" fill="#f97316" stroke="#0b1220" stroke-width=".6"/>
      <path d="M-3,0 L3,0 M0,-3 L0,3 M-2.1,-2.1 Q0,0 2.1,2.1 M2.1,-2.1 Q0,0 -2.1,2.1" fill="none" stroke="#0b1220" stroke-width=".45"/>
    </g>`;
  }

  function render(container, positions, opts={}){
    const g = geom(opts.full, opts.flip);
    const svg = `<svg id="courtSVG" viewBox="0 0 ${g.W} ${g.H}" xmlns="http://www.w3.org/2000/svg">
      ${courtSVG(g)}
      ${drawsSVG(g, opts.draws)}
      ${shotsSVG(g, opts.shots)}
      ${arrowsSVG(g, opts.arrows)}
      ${(opts.opp||[]).map((o,i)=>oppTokenSVG(g,o,i,opts)).join("")}
      ${positions.map((pl,i)=>tokenSVG(g,pl,i,opts)).join("")}
      ${opts.ball?ballSVG(g,opts.ball):""}
    </svg>`;
    container.innerHTML = svg;
    const el = container.querySelector("#courtSVG");
    el.setAttribute("id","court");
    el.style.maxWidth = g.full ? "340px" : "560px";
    if(opts.draggable || opts.onToken || opts.onArrow || opts.ball || opts.onDraw || opts.onOppMove || opts.onErase || opts.onShot) enableInteract(el, positions, opts, g);
    return el;
  }

  function enableInteract(svg, positions, opts, g){
    const tool = opts.tool || "move";
    const SVGNS = "http://www.w3.org/2000/svg";
    const pt = svg.createSVGPoint();
    const toSVG = (evt)=>{ pt.x=evt.clientX; pt.y=evt.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); };
    let active=null, activeBall=false, activeOpp=false, moved=false, aStart=null, preview=null;
    const canDrag = opts.draggable || opts.ball || opts.onOppMove;

    svg.querySelectorAll(".tok").forEach(gr=>{
      gr.addEventListener("pointerdown", e=>{
        if(tool!=="move") return;
        active=gr; activeBall=false; activeOpp=false; moved=false;
        try{ gr.setPointerCapture(e.pointerId); }catch(_){}
        e.stopPropagation();
      });
    });
    svg.querySelectorAll(".otok").forEach(gr=>{
      gr.addEventListener("pointerdown", e=>{
        if(tool!=="move") return;
        active=gr; activeOpp=true; activeBall=false; moved=false;
        try{ gr.setPointerCapture(e.pointerId); }catch(_){}
        e.stopPropagation();
      });
    });
    const ballEl=svg.querySelector(".ball");
    if(ballEl){ ballEl.addEventListener("pointerdown", e=>{
        if(tool!=="move") return;
        active=ballEl; activeBall=true; moved=false;
        try{ ballEl.setPointerCapture(e.pointerId); }catch(_){}
        e.stopPropagation();
      });
    }

    let drawing=false, dRaw=null, dData=null, dPoly=null;
    const roundPt=d=>[Math.round(d.x*10)/10, Math.round(d.y*10)/10];

    svg.addEventListener("pointerdown", e=>{
      if(active) return;
      if(tool==="erase"){ const p=toSVG(e); const d=g.inv(p.x,p.y); const hit=hitTest(opts,d.x,d.y); if(hit&&opts.onErase) opts.onErase(hit); return; }
      if(tool==="shot"){ const p=toSVG(e); const d=g.inv(p.x,p.y); opts.onShot&&opts.onShot({x:Math.round(d.x),y:Math.round(d.y),is3:isThree(g,p.x,p.y)}); return; }
      if(tool==="draw"){ const p=toSVG(e); drawing=true; dRaw=[[p.x,p.y]]; dData=[roundPt(g.inv(p.x,p.y))]; try{ svg.setPointerCapture(e.pointerId); }catch(_){} }
      else if(tool==="run" || tool==="pass" || tool==="screen"){ aStart=toSVG(e); moved=false; }
    });

    svg.addEventListener("pointermove", e=>{
      const p=toSVG(e);
      if(active && canDrag){ active.setAttribute("transform",`translate(${p.x},${p.y})`); moved=true; }
      else if(drawing){ dRaw.push([p.x,p.y]); dData.push(roundPt(g.inv(p.x,p.y))); updateDrawPoly(); }
      else if(aStart){ moved=true; drawPreview(aStart,p); }
    });

    svg.addEventListener("pointerup", e=>{
      const p=toSVG(e);
      if(active){
        if(activeBall){
          if(moved){ const d=g.inv(p.x,p.y); opts.onBallMove&&opts.onBallMove({x:Math.round(d.x),y:Math.round(d.y)}); }
          active=null; activeBall=false; return;
        }
        if(activeOpp){
          const oi=+active.dataset.i;
          if(moved){ const d=g.inv(p.x,p.y); opts.onOppMove&&opts.onOppMove(oi,{x:Math.round(d.x),y:Math.round(d.y)}); }
          active=null; activeOpp=false; return;
        }
        const i=+active.dataset.i;
        if(opts.draggable && moved){ const d=g.inv(p.x,p.y); positions[i].x=Math.round(d.x); positions[i].y=Math.round(d.y); opts.onMove&&opts.onMove(i,positions[i]); }
        else if(!moved && opts.onToken){ opts.onToken(i); }
        active=null;
      } else if(drawing){
        drawing=false;
        if(dData && dData.length>1 && opts.onDraw) opts.onDraw({color:opts.drawColor||"#ffffff", w:opts.drawWidth||1.4, pts:dData});
        if(dPoly){ dPoly.remove(); dPoly=null; } dRaw=dData=null;
      } else if(aStart){
        if(moved && opts.onArrow){
          const a=g.inv(aStart.x,aStart.y), b=g.inv(p.x,p.y);
          if(Math.hypot(b.x-a.x,b.y-a.y)>3) opts.onArrow([Math.round(a.x),Math.round(a.y)],[Math.round(b.x),Math.round(b.y)], tool);
        }
        aStart=null; removePreview();
      }
    });

    function updateDrawPoly(){
      if(!dPoly){ dPoly=document.createElementNS(SVGNS,"polyline"); dPoly.setAttribute("fill","none");
        dPoly.setAttribute("stroke",opts.drawColor||"#ffffff"); dPoly.setAttribute("stroke-width",opts.drawWidth||1.4);
        dPoly.setAttribute("stroke-linecap","round"); dPoly.setAttribute("stroke-linejoin","round"); svg.appendChild(dPoly); }
      dPoly.setAttribute("points", dRaw.map(p=>p[0].toFixed(2)+","+p[1].toFixed(2)).join(" "));
    }

    function drawPreview(a,b){
      removePreview();
      preview=document.createElementNS(SVGNS,"line");
      preview.setAttribute("x1",a.x); preview.setAttribute("y1",a.y);
      preview.setAttribute("x2",b.x); preview.setAttribute("y2",b.y);
      const col = tool==="pass"?"#38bdf8": tool==="screen"?"#f59e0b":"#fde047";
      preview.setAttribute("stroke", col);
      preview.setAttribute("stroke-width",".9");
      if(tool==="pass") preview.setAttribute("stroke-dasharray","2 2");
      svg.appendChild(preview);
    }
    function removePreview(){ if(preview){ preview.remove(); preview=null; } }
  }

  function esc(s){return (s+"").replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));}

  return { render, roleColor };
})();
