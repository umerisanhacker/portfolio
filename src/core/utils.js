/* Shared DOM/math utilities. Kept as classic scripts for file:// compatibility. */
(function(w){
  w.UmerPortfolio=w.UmerPortfolio||{};
  w.UmerPortfolio.Utils={
    $:function(s,root){return (root||document).querySelector(s)},
    $$:function(s,root){return Array.prototype.slice.call((root||document).querySelectorAll(s))},
    clamp:function(v,a,b){return Math.min(b,Math.max(a,v))},
    lerp:function(a,b,n){return (1-n)*a+n*b},
    map:function(n,a,b,c,d){return ((n-a)/(b-a))*(d-c)+c},
    toast:function(m){var host=document.getElementById('toasts');if(!host)return;var t=document.createElement('div');t.className='toast';t.textContent=m;host.appendChild(t);setTimeout(function(){t.remove()},3200)},
    ready:function(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn()}
  };

  /* LIFE TIMELINE — one authoritative renderer. */
  (function(){
    'use strict';
    function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
    function install(){
      var life=document.getElementById('life');
      var sticky=life&&life.querySelector('.tl-sticky');
      var track=life&&life.querySelector('#tlTrack');
      if(!life||!sticky||!track||life.getAttribute('data-life-controller')==='active')return;
      life.setAttribute('data-life-controller','active');
      if(!document.getElementById('life-timeline-authority')){
        var css=document.createElement('style');css.id='life-timeline-authority';
        css.textContent='#life .tl-sticky{touch-action:pan-y!important}#life .tl-track{touch-action:pan-y!important;transform:translate3d(var(--life-track-x,0px),0,0)!important}#life .tl-item{touch-action:pan-y!important}';
        document.head.appendChild(css);
      }
      var raf=0,topY=0,travel=0,viewportH=0,sectionH=0,measured=false,measuring=false;
      function getViewportHeight(){return Math.max(1,Math.round(window.innerHeight||document.documentElement.clientHeight||1));}
      function measure(){
        if(measuring||!life||!sticky||!track)return;
        measuring=true;track.style.setProperty('--life-track-x','0px');viewportH=getViewportHeight();
        var viewportW=Math.max(1,window.innerWidth||document.documentElement.clientWidth||1);
        travel=Math.max(0,track.scrollWidth-viewportW);sectionH=viewportH+travel;
        life.style.setProperty('height',sectionH+'px','important');life.style.setProperty('min-height',viewportH+'px','important');
        sticky.style.setProperty('height',viewportH+'px','important');sticky.style.setProperty('top','0px','important');
        topY=life.getBoundingClientRect().top+(window.scrollY||window.pageYOffset||0);measured=true;measuring=false;render();
      }
      function render(){
        raf=0;if(!measured||!life||!track)return;
        var y=window.scrollY||window.pageYOffset||0,local=y-topY,x=clamp(local,0,travel);
        track.style.setProperty('--life-track-x',(-x).toFixed(2)+'px');
        if(Math.abs((parseFloat(getComputedStyle(life).height)||0)-sectionH)>1)life.style.setProperty('height',sectionH+'px','important');
      }
      function schedule(){if(!raf)raf=window.requestAnimationFrame(render);}
      measure();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',measure,{passive:true});
      window.addEventListener('orientationchange',function(){setTimeout(measure,80)},{passive:true});
      if(window.visualViewport)window.visualViewport.addEventListener('resize',measure,{passive:true});
      if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);
      if(window.ResizeObserver){var ro=new window.ResizeObserver(function(){measure();});ro.observe(track);}
      window.requestAnimationFrame(measure);setTimeout(measure,250);
      life.addEventListener('wheel',function(e){
        if(('ontouchstart' in window)||window.matchMedia('(max-width:700px)').matches)return;
        if(!e||(!e.deltaY&&!e.deltaX)||Math.abs(e.deltaY)<Math.abs(e.deltaX))return;
        e.preventDefault();window.scrollBy({top:e.deltaY,left:0,behavior:'auto'});
      },{passive:false});
      var touchStartY=0,touchStartX=0,touchActive=false,touchMoved=false,mobileQuery=window.matchMedia('(max-width:700px)');
      function isMobile(){return mobileQuery.matches||('ontouchstart' in window);}
      life.addEventListener('touchstart',function(e){if(!isMobile()||!e.touches||e.touches.length!==1)return;touchStartY=e.touches[0].clientY;touchStartX=e.touches[0].clientX;touchActive=true;touchMoved=false;},{passive:true});
      life.addEventListener('touchmove',function(e){if(!touchActive||!isMobile()||!e.touches||e.touches.length!==1)return;var y=e.touches[0].clientY,x=e.touches[0].clientX,dy=y-touchStartY,dx=x-touchStartX;if(!touchMoved){if(Math.abs(dy)<4)return;touchMoved=true;}if(Math.abs(dy)>=Math.abs(dx)){e.preventDefault();window.scrollBy({top:-dy,left:0,behavior:'auto'});touchStartY=y;touchStartX=x;}},{passive:false});
      life.addEventListener('touchend',function(){touchActive=false;touchMoved=false;},{passive:true});life.addEventListener('touchcancel',function(){touchActive=false;touchMoved=false;},{passive:true});
    }
    if(document.readyState==='complete')setTimeout(install,0);else window.addEventListener('load',function(){setTimeout(install,0)},{once:true});
  })();

  /* CRUCIBLE ECG — independent from scroll. */
  (function(){
    function installHeartbeat(){
      var root=document.getElementById('crucible')||document;
      var path=root.querySelector('.ecg path');
      if(!path||path.getAttribute('data-ecg-live')==='1')return;
      path.setAttribute('data-ecg-live','1');path.style.strokeDasharray='0.16 0.84';path.style.strokeDashoffset='0';path.style.transformBox='fill-box';path.style.transformOrigin='center';path.style.willChange='stroke-dashoffset,transform,opacity,filter';path.style.animation='ecgMove 5s linear infinite';
      var phase=0,last=performance.now(),raf=0;
      function frame(now){var dt=Math.min(64,now-last);last=now;phase+=dt/1000;var pulse=(Math.sin(phase*6.4)+Math.sin(phase*12.8)*.22)*.5;var scaleY=1+Math.max(-.018,Math.min(.028,pulse*.018));var opacity=.78+.16*(Math.sin(phase*3.2)*.5+.5);path.style.transform='scaleY('+scaleY.toFixed(4)+')';path.style.opacity=opacity.toFixed(3);path.style.filter='drop-shadow(0 0 '+(5+Math.max(0,pulse)*3).toFixed(1)+'px rgba(99,246,231,.6))';raf=window.requestAnimationFrame(frame)}
      raf=window.requestAnimationFrame(frame);window.addEventListener('pagehide',function(){if(raf)cancelAnimationFrame(raf)},{once:true});
    }
    if(document.readyState==='complete')setTimeout(installHeartbeat,0);else window.addEventListener('load',function(){setTimeout(installHeartbeat,0)},{once:true});
  })();

  /* PORTFOLIO V4 — evidence, navigation, hiring, story and performance. */
  (function(){
    'use strict';
    function q(s,r){return (r||document).querySelector(s)}
    function qa(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
    function module(title,kicker,sub){var el=document.createElement('section');el.className='ux-module';el.innerHTML='<span class="ux-kicker">'+kicker+'</span><h2 class="ux-title">'+title+'</h2><p class="ux-sub">'+sub+'</p>';return el}
    function insertAfter(node,target){if(!target||!target.parentNode)return false;target.parentNode.insertBefore(node,target.nextSibling);return true}
    function visibleControls(){
      var ai=q('#termBtn'),cmd=q('#cmdkBtn');
      if(ai){ai.setAttribute('aria-label','Open AI terminal');ai.title='Open AI terminal';ai.dataset.uxReady='1'}
      if(cmd){cmd.setAttribute('aria-label','Open command center (⌘K)');cmd.title='Open command center — ⌘K';cmd.dataset.uxReady='1'}
      if(!q('.ux-quick-actions')){var rail=document.createElement('div');rail.className='ux-quick-actions';rail.setAttribute('aria-label','Quick actions');rail.innerHTML='<button type="button" data-ux-ai>AI</button><button type="button" data-ux-cmd>⌘K</button>';document.body.appendChild(rail);var a=rail.querySelector('[data-ux-ai]'),c=rail.querySelector('[data-ux-cmd]');if(a)a.addEventListener('click',function(){if(ai)ai.click()});if(c)c.addEventListener('click',function(){if(cmd)cmd.click()})}
    }
    function skills(){
      if(q('#uxSkills')||!q('#arsenal'))return;
      var m=module('SKILLS MATRIX','11 // CAPABILITY MAP','A project-backed view of the systems I actually work across — not a generic keyword cloud.');m.id='uxSkills';
      var data=[['FRONTEND SYSTEMS','Primary','Interfaces, motion, responsive UI and interaction architecture','HTML · CSS · JavaScript · React'],['COMMERCE','Primary','Storefronts, conversion surfaces, catalog and operating dashboards','Shopify · CRO · Analytics'],['AUTOMATION','Applied','Workflow logic, repetitive-task elimination and operator tooling','APIs · Scripts · Integrations'],['PRODUCT BUILDING','Primary','From rough idea to usable product, landing page or internal tool','Prototyping · UX · Shipping'],['AI / INTERFACES','Applied','AI-assisted workflows, terminal-style interfaces and product experiments','AI UX · Prompting · Agents'],['VISUAL ENGINEERING','Experimental','Motion systems, cinematic transitions and high-density interfaces','CSS Motion · Canvas · SVG']];
      var grid=document.createElement('div');grid.className='ux-skill-grid';grid.innerHTML=data.map(function(x){return '<article class="ux-skill"><strong>'+x[0]+'</strong><small>'+x[1]+' · '+x[2]+'</small><div class="ux-skill-tags">'+x[3].split(' · ').map(function(t){return '<span>'+t+'</span>'}).join('')+'</div></article>'}).join('');m.appendChild(grid);insertAfter(m,q('#arsenal'));
    }
    function receipts(){
      if(q('#uxReceipts')||!q('#commerce'))return;
      var m=module('RECEIPTS','06 // PROOF, NOT PROMISES','Evidence of building, operating and iterating — not just polished screenshots.');m.id='uxReceipts';
      var data=[['01','COMMERCE','Sunora Aura is presented as a commerce operating system inside the portfolio.'],['02','PRODUCTS','The Arsenal surfaces shipped builds instead of hiding everything behind a single gallery.'],['03','TRANSFORMATION','The 100 KG → 70 KG arc becomes evidence of a long-running rebuild, not a decorative before/after.'],['04','ENGINEERING','The portfolio itself uses custom timeline, canvas, SVG, media and interaction systems.'],['05','ITERATION','The build log makes ongoing improvement visible without inventing fake client activity.'],['06','VERIFICATION','Where a project or metric has a live source, visitors are directed toward the underlying evidence.']];
      var g=document.createElement('div');g.className='ux-receipts';g.innerHTML=data.map(function(x){return '<article class="ux-receipt"><b>'+x[0]+' · '+x[1]+'</b><strong>RECEIPT</strong><p>'+x[2]+'</p></article>'}).join('');m.appendChild(g);insertAfter(m,q('#commerce'));
    }
    function buildLog(){
      if(q('#uxBuildLog')||!q('#commerce'))return;
      var m=module('BUILD LOG','08 // SHIP · BREAK · REBUILD','A compact operating log that makes the portfolio feel alive without inventing fake client activity or metrics.');m.id='uxBuildLog';
      var rows=[['NOW','PORTFOLIO V4','interaction layer + mobile performance'],['RECENT','TIMELINE ENGINE','desktop wheel + touch-safe horizontal renderer'],['RECENT','CRUCIBLE','independent CPR/ECG motion system'],['RECENT','MOBILE','lighter visual pipeline and reduced offscreen work'],['NEXT','CASE STUDIES','deeper project evidence and measurable outcomes']];
      var log=document.createElement('div');log.className='ux-log';log.innerHTML=rows.map(function(x){return '<div class="ux-log-row"><time>'+x[0]+'</time><strong>'+x[1]+'</strong><span>'+x[2]+'</span></div>'}).join('');m.appendChild(log);insertAfter(m,q('#commerce'));
    }
    function rebuild(){
      if(q('#uxRebuild')||!q('#crucible'))return;
      var m=module('THE REBUILD','13 // BODY → MIND → SYSTEM','The transformation story is deliberately simple: change the physical system, then the operating system behind it.');m.id='uxRebuild';
      var g=document.createElement('div');g.className='ux-rebuild';g.innerHTML='<article class="ux-rebuild-card"><b>100 KG</b><p>The old system: inconsistent inputs, accumulated habits and a body that no longer matched the person I wanted to become.</p><span class="ux-arrow">IDENTIFY → REMOVE → REPEAT</span></article><article class="ux-rebuild-card"><b>70 KG</b><p>The rebuilt system: structure, consistency and a willingness to measure what was actually changing. The same mindset now shows up in how I build.</p><span class="ux-arrow">BUILD → TEST → ITERATE</span></article>';m.appendChild(g);insertAfter(m,q('#crucible'));
    }
    function hiring(){
      if(q('#uxHire')||!q('#contact'))return;
      var m=module('START A BUILD','15 // ENGAGEMENT','Tell me what you are trying to build. Pick a direction and the contact flow will prepare a focused brief.');m.id='uxHire';
      var grid=document.createElement('div');grid.className='ux-hire-grid';grid.innerHTML='<div class="ux-options"><button class="ux-option" data-hire="PRODUCT / WEBSITE">PRODUCT / WEBSITE</button><button class="ux-option" data-hire="ECOMMERCE">ECOMMERCE</button><button class="ux-option" data-hire="AUTOMATION">AUTOMATION</button><button class="ux-option" data-hire="AI SYSTEM">AI SYSTEM</button><button class="ux-option" data-hire="REDESIGN / REBUILD">REDESIGN / REBUILD</button><button class="ux-option" data-hire="EXPERIMENT">SOMETHING WEIRD</button></div><div class="ux-hire-copy"><b id="uxHireLabel">SELECT A BUILD TYPE</b><p id="uxHireText">Choose the closest match. You can change it before sending.</p><a class="ux-start" id="uxStart" href="mailto:umerpv2007@gmail.com?subject=Project%20inquiry%20%E2%80%94%20via%20portfolio">START A PROJECT ↗</a></div>';m.appendChild(grid);insertAfter(m,q('#contact'));
      qa('.ux-option',m).forEach(function(btn){btn.addEventListener('click',function(){qa('.ux-option',m).forEach(function(x){x.classList.remove('on')});btn.classList.add('on');var type=btn.dataset.hire;q('#uxHireLabel',m).textContent=type;q('#uxHireText',m).textContent='Good. Include your goal, deadline and what already exists when you send the brief.';q('#uxStart',m).href='mailto:umerpv2007@gmail.com?subject='+encodeURIComponent(type+' — portfolio inquiry')+'&body='+encodeURIComponent('Hey Umer,\n\nBuild type: '+type+'\n\nGoal:\n\nDeadline:\n\nWhat exists already:\n\n— ')})});
    }
    function sound(){
      var snd=q('#sndBtn');if(!snd||snd.dataset.uxSound==='1')return;snd.dataset.uxSound='1';var ctx=null;
      function beep(freq,dur){if(snd.textContent.indexOf('OFF')>-1)return;try{ctx=ctx||(window.AudioContext?new AudioContext():new window.webkitAudioContext());var o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(.0001,ctx.currentTime);g.gain.exponentialRampToValueAtTime(.025,ctx.currentTime+.01);g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+dur);o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+dur)}catch(e){}}
      document.addEventListener('click',function(e){if(e.target.closest('button,.ux-option,.ux-start,.cmdk-item'))beep(520,.045)});
    }
    function easter(){
      if(q('#ux-easter'))return;var e=document.createElement('div');e.id='ux-easter';e.innerHTML='<div class="ux-easter-box"><h3>DEVELOPER MODE // UNLOCKED</h3><p>There is no secret framework behind this portfolio. Just a lot of stubborn iteration.<br><br>Try the command center, inspect the interface, or press ESC to return.</p></div>';document.body.appendChild(e);e.addEventListener('click',function(ev){if(ev.target===e)e.classList.remove('on')});document.addEventListener('keydown',function(ev){if(ev.key==='Escape')e.classList.remove('on')});var seq='';var timer=0;document.addEventListener('keydown',function(ev){if(ev.key.length!==1)return;seq=(seq+ev.key.toLowerCase()).slice(-4);clearTimeout(timer);timer=setTimeout(function(){seq=''},900);if(seq==='umer')e.classList.add('on')});
    }
    function mobilePerformance(){
      var mobile=window.matchMedia('(max-width:680px)').matches;document.body.classList.toggle('mobile-lite',mobile);if(!mobile)return;
      qa('img').forEach(function(im){if(!im.closest('.nav')){im.loading='lazy';im.decoding='async'}});
      qa('video').forEach(function(v){v.preload='none';if(!v.closest('.vmedia')||!v.closest('.vmedia').matches(':hover')){v.pause();v.removeAttribute('autoplay')}});
      if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(en){var el=en.target;if(!en.isIntersecting)el.style.animationPlayState='paused';else el.style.animationPlayState='running'})},{rootMargin:'120px 0px'});qa('.sweep,.grain').forEach(function(x){io.observe(x)})}
    }
    function boot(){visibleControls();skills();receipts();buildLog();rebuild();hiring();sound();easter();mobilePerformance();}
    if(document.readyState==='complete')boot();else window.addEventListener('load',boot,{once:true});
  })();
})(window);
