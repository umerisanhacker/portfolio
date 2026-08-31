/* HOLO DECK — automatic spatial project reel. Pointer/wheel/touch scrubbing intentionally disabled. */
(function(w){
  var U=w.UmerPortfolio,D=U.Data,Q=U.Utils;
  Q.ready(function(){
    var wrap=document.getElementById('ringWrap'),ring=document.getElementById('ring');
    if(!wrap||!ring||!D)return;
    var projects=D.HOLO_PROJECTS||[],live=D.HOLO_LIVE||{};
    ring.innerHTML='';
    var cards=[];

    projects.forEach(function(p,i){
      var a=document.createElement('a');
      a.className='rcard';
      var isLive=p[5]==='live';
      var isInternal=p[5]==='internal';
      a.href=isLive?(live[p[0]]||'#'):(isInternal?'#':'#');
      if(isLive){a.target='_blank';a.rel='noopener';}
      a.dataset.accent=p[6];
      a.dataset.index=i;
      a.dataset.key=p[0];
      a.setAttribute('aria-label','Open '+p[1]);
      a.innerHTML='<img src="'+p[3]+'" alt="'+p[1]+'" loading="lazy" decoding="async"><span class="rn">'+p[1]+'</span><span class="rt">'+p[2]+' · '+(p[5]==='local'?'LOCAL BUILD':(isInternal?'OPEN':'LIVE ↗'))+'</span>';
      ring.appendChild(a);cards.push(a);
    });

    var meta=document.createElement('div');
    meta.className='ring-meta';
    meta.innerHTML='<div class="ring-meta-main"><b id="ringMetaTitle">WEBCUT PRO</b><small id="ringMetaSub">BROWSER NLE · LIVE SYSTEM</small></div><div class="ring-meta-signal"><i></i><span id="ringMetaStatus">LIVE BUILD</span></div>';
    wrap.insertAdjacentElement('afterend',meta);

    var current=0;
    var autoplayMs=4200;
    var timer=null;

    function normalize(n){n%=projects.length;return n<0?n+projects.length:n;}
    function shortest(i){
      var d=i-current,n=projects.length;
      if(d>n/2)d-=n;
      if(d<-n/2)d+=n;
      return d;
    }
    function geometry(){
      var mobile=innerWidth<700;
      return {
        spread:mobile?Math.max(190,Math.min(205,innerWidth*.53)):Math.max(270,Math.min(310,innerWidth*.205)),
        depth:mobile?38:48,
        fan:mobile?5:5.5,
        scaleStep:mobile?.055:.052
      };
    }
    function setMeta(){
      var p=projects[normalize(Math.round(current))];
      var title=document.getElementById('ringMetaTitle'),sub=document.getElementById('ringMetaSub'),st=document.getElementById('ringMetaStatus');
      if(title)title.textContent=p[1];
      if(sub)sub.textContent=p[2]+' · '+(p[5]==='local'?'LOCAL BUILD':p[5]==='internal'?'INTERNAL EXPERIENCE':'LIVE SYSTEM');
      if(st)st.textContent=p[5]==='local'?'NOT HOSTED':p[5]==='internal'?'INTERNAL BUILD':'LIVE BUILD';
    }
    function render(){
      var active=normalize(Math.round(current)),g=geometry();
      cards.forEach(function(card,i){
        var d=shortest(i),ad=Math.abs(d);
        var x=d*g.spread;
        var z=Math.max(-220,300-ad*g.depth);
        var ry=d*g.fan;
        var sc=Math.max(.70,1-ad*g.scaleStep);
        var op=ad>5?0:Math.max(.12,1-ad*.12);
        card.style.transform='translate3d(calc(-50% + '+x.toFixed(1)+'px),-50%,'+z.toFixed(1)+'px) rotateY('+(-ry).toFixed(2)+'deg) scale('+sc.toFixed(3)+')';
        card.style.zIndex=String(100-Math.round(ad*5));
        card.style.opacity=op.toFixed(3);
        card.classList.toggle('is-active',i===active);
        card.setAttribute('aria-current',i===active?'true':'false');
      });
      setMeta();
    }
    function go(delta){current=normalize(Math.round(current)+delta);render();}
    function schedule(){
      if(timer)clearInterval(timer);
      timer=setInterval(function(){if(!document.hidden)go(1)},autoplayMs);
    }
    cards.forEach(function(card,i){
      card.addEventListener('click',function(e){
        var d=Math.abs(shortest(i));
        if(d>.35){e.preventDefault();current=i;render();return;}
        if(projects[i][5]==='local'){
          e.preventDefault();
          if(window.openCase)window.openCase(projects[i][0]);
        }
      });
    });
    document.addEventListener('keydown',function(e){
      if(e.target&&/input|textarea|select/i.test(e.target.tagName))return;
      if(e.key==='ArrowRight'){e.preventDefault();go(1);}
      else if(e.key==='ArrowLeft'){e.preventDefault();go(-1);}
    });
    addEventListener('resize',render,{passive:true});
    render();
    schedule();
    U.Components=U.Components||{};
    U.Components.holoDeck={render:render,go:go,getCurrent:function(){return projects[normalize(Math.round(current))]}};
  });
})(window);
