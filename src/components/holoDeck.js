/* HOLO DECK — automatic spatial coverflow reel. No pointer/wheel scrubbing. */
(function(w){
  var U=w.UmerPortfolio,D=U.Data,Q=U.Utils;
  Q.ready(function(){
    var wrap=document.getElementById('ringWrap'),ring=document.getElementById('ring');
    if(!wrap||!ring||!D)return;
    var projects=D.HOLO_PROJECTS||[],live=D.HOLO_LIVE||[];
    ring.innerHTML='';
    var cards=[];
    var current=0;
    var autoplayMs=3200;
    var timer=null;

    function normalize(n){n%=projects.length;return n<0?n+projects.length:n;}
    function isMobile(){return innerWidth<720;}
    function geometry(){
      var m=isMobile();
      return {
        spread:m?Math.max(145,Math.min(175,innerWidth*.24)):Math.max(255,Math.min(330,innerWidth*.205)),
        depth:m?34:54,
        fan:m?7:6.5,
        scale:m?.085:.075,
        max:m?1:2,
        cardShiftY:m?8:0
      };
    }
    function shortest(i){
      var d=i-current,n=projects.length;
      if(d>n/2)d-=n;
      if(d<-n/2)d+=n;
      return d;
    }
    function setMeta(){
      var p=projects[normalize(Math.round(current))];
      var title=document.getElementById('ringMetaTitle'),sub=document.getElementById('ringMetaSub'),st=document.getElementById('ringMetaStatus');
      if(title)title.textContent=p[1];
      if(sub)sub.textContent=p[2]+' · '+(p[5]==='local'?'LOCAL BUILD':p[5]==='internal'?'INTERNAL EXPERIENCE':'LIVE SYSTEM');
      if(st)st.textContent=p[5]==='local'?'NOT HOSTED':p[5]==='internal'?'INTERNAL BUILD':'LIVE BUILD';
    }
    function render(){
      var g=geometry();
      cards.forEach(function(card,i){
        var d=shortest(i),ad=Math.abs(d);
        var hidden=ad>g.max;
        var x=d*g.spread;
        var z=hidden?-300:Math.max(-180,270-ad*g.depth);
        var ry=d*g.fan;
        var sc=Math.max(.70,1-ad*g.scale);
        var op=hidden?0:(ad===0?1:ad===1?.88:ad===2?.48:.22);
        card.style.transform='translate3d(calc(-50% + '+x.toFixed(1)+'px),calc(-50% + '+(Math.abs(d)*g.cardShiftY).toFixed(1)+'px),'+z.toFixed(1)+'px) rotateY('+(-ry).toFixed(2)+'deg) scale('+sc.toFixed(3)+')';
        card.style.zIndex=String(100-Math.round(ad*10));
        card.style.opacity=op.toFixed(3);
        card.style.pointerEvents=hidden?'none':'auto';
        card.classList.toggle('is-active',i===normalize(Math.round(current)));
        card.setAttribute('aria-hidden',hidden?'true':'false');
        card.setAttribute('aria-current',i===normalize(Math.round(current))?'true':'false');
      });
      setMeta();
    }
    function go(delta){
      current=normalize(Math.round(current)+delta);
      render();
    }

    projects.forEach(function(p,i){
      var a=document.createElement('a');
      var isLive=p[5]==='live',isInternal=p[5]==='internal';
      a.className='rcard';
      a.href=isLive?(live[p[0]]||'#'):'#';
      if(isLive){a.target='_blank';a.rel='noopener';}
      a.dataset.accent=p[6];
      a.dataset.index=i;
      a.dataset.key=p[0];
      a.setAttribute('aria-label','Open '+p[1]);
      a.innerHTML='<img src="'+p[3]+'" alt="'+p[1]+'" loading="lazy" decoding="async"><span class="rn">'+p[1]+'</span><span class="rt">'+p[2]+' · '+(p[5]==='local'?'LOCAL BUILD':(isInternal?'OPEN':'LIVE ↗'))+'</span>';
      ring.appendChild(a);cards.push(a);
      a.addEventListener('click',function(e){
        var d=Math.abs(shortest(i));
        if(d!==0){e.preventDefault();current=i;render();return;}
        if(p[5]==='local'){e.preventDefault();if(window.openCase)window.openCase(p[0]);}
        if(p[5]==='internal'){e.preventDefault();var target=document.getElementById('commerce');if(target)target.scrollIntoView({behavior:'smooth',block:'start'});}
      });
    });

    // Metadata lives inside the deck so the section doesn't create a giant dead zone below it.
    var meta=document.createElement('div');
    meta.className='ring-meta';
    meta.innerHTML='<div class="ring-meta-main"><b id="ringMetaTitle">WEBCUT PRO</b><small id="ringMetaSub">BROWSER NLE · LIVE SYSTEM</small></div><div class="ring-meta-signal"><i></i><span id="ringMetaStatus">LIVE BUILD</span></div>';
    wrap.appendChild(meta);

    document.addEventListener('keydown',function(e){
      if(e.target&&/input|textarea|select/i.test(e.target.tagName))return;
      if(e.key==='ArrowRight'){e.preventDefault();go(1);}
      else if(e.key==='ArrowLeft'){e.preventDefault();go(-1);}
    });
    addEventListener('resize',render,{passive:true});
    render();
    timer=setInterval(function(){if(!document.hidden)go(1);},autoplayMs);
    U.Components=U.Components||{};
    U.Components.holoDeck={render:render,go:go,getCurrent:function(){return projects[normalize(Math.round(current))]}};
  });
})(window);
