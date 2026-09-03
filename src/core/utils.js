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
        if(measuring||!life||!sticky||!track)return;measuring=true;
        track.style.setProperty('--life-track-x','0px');
        viewportH=getViewportHeight();var viewportW=Math.max(1,window.innerWidth||document.documentElement.clientWidth||1);
        travel=Math.max(0,track.scrollWidth-viewportW);sectionH=viewportH+travel;
        life.style.setProperty('height',sectionH+'px','important');life.style.setProperty('min-height',viewportH+'px','important');
        sticky.style.setProperty('height',viewportH+'px','important');sticky.style.setProperty('top','0px','important');
        topY=life.getBoundingClientRect().top+(window.scrollY||window.pageYOffset||0);measured=true;measuring=false;render();
      }
      function render(){raf=0;if(!measured||!life||!track)return;var y=window.scrollY||window.pageYOffset||0;var local=y-topY;var x=clamp(local,0,travel);track.style.setProperty('--life-track-x',(-x).toFixed(2)+'px');if(Math.abs((parseFloat(getComputedStyle(life).height)||0)-sectionH)>1)life.style.setProperty('height',sectionH+'px','important');}
      function schedule(){if(!raf)raf=window.requestAnimationFrame(render);}
      measure();window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',measure,{passive:true});window.addEventListener('orientationchange',function(){setTimeout(measure,80)},{passive:true});
      if(window.visualViewport)window.visualViewport.addEventListener('resize',measure,{passive:true});if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);
      if(window.ResizeObserver){var ro=new window.ResizeObserver(function(){measure();});ro.observe(track);}window.requestAnimationFrame(measure);setTimeout(measure,250);
      var touchStartY=0,touchStartX=0,touchActive=false,touchMoved=false,mobileQuery=window.matchMedia('(max-width:700px)');
      function isMobile(){return mobileQuery.matches||('ontouchstart' in window);}
      life.addEventListener('touchstart',function(e){if(!isMobile()||!e.touches||e.touches.length!==1)return;touchStartY=e.touches[0].clientY;touchStartX=e.touches[0].clientX;touchActive=true;touchMoved=false;},{passive:true});
      life.addEventListener('touchmove',function(e){if(!touchActive||!isMobile()||!e.touches||e.touches.length!==1)return;var y=e.touches[0].clientY,x=e.touches[0].clientX,dy=y-touchStartY,dx=x-touchStartX;if(!touchMoved){if(Math.abs(dy)<4)return;touchMoved=true;}if(Math.abs(dy)>=Math.abs(dx)){e.preventDefault();window.scrollBy(0,-dy);touchStartY=y;touchStartX=x;}},{passive:false});
      life.addEventListener('touchend',function(){touchActive=false;touchMoved=false;},{passive:true});life.addEventListener('touchcancel',function(){touchActive=false;touchMoved=false;},{passive:true});
    }
    if(document.readyState==='complete')setTimeout(install,0);else window.addEventListener('load',function(){setTimeout(install,0)},{once:true});
  })();

  /* PROFESSIONAL THEME SWITCH — dark is the default; preference persists locally. */
  (function(){
    function setupTheme(){
      var root=document.documentElement;
      var saved=null;try{saved=localStorage.getItem('umer-theme')}catch(e){}
      root.setAttribute('data-theme',saved==='light'?'light':'dark');

      if(!document.getElementById('professional-theme-runtime')){
        var style=document.createElement('style');style.id='professional-theme-runtime';
        style.textContent=''+
          ':root[data-theme="light"] .nav,:root[data-theme="light"] .cmdk-box,:root[data-theme="light"] .tourbar,:root[data-theme="light"] .case-box,:root[data-theme="light"] .lb-box,:root[data-theme="light"] .term-bar{background:linear-gradient(180deg,rgba(249,248,244,.94),rgba(232,230,224,.92))!important;color:var(--fg)}'+
          ':root[data-theme="light"] .frame,:root[data-theme="light"] .dossier,:root[data-theme="light"] .sframe,:root[data-theme="light"] .panel,:root[data-theme="light"] .tl-item,:root[data-theme="light"] .rcard{background:linear-gradient(145deg,rgba(255,255,255,.82),rgba(231,229,223,.94))!important;color:var(--fg);box-shadow:0 18px 55px rgba(32,40,42,.08)!important}'+
          ':root[data-theme="light"] .tl-item p,:root[data-theme="light"] .dim{color:var(--dim)!important}'+
          ':root[data-theme="light"] .theme-toggle{background:rgba(255,255,255,.58)}';
        document.head.appendChild(style);
      }

      var nav=document.querySelector('.nav-right')||document.querySelector('.nav');
      if(!nav||document.getElementById('themeToggle'))return;
      var btn=document.createElement('button');btn.id='themeToggle';btn.className='theme-toggle';btn.type='button';btn.setAttribute('aria-label','Switch color theme');btn.setAttribute('title','Switch light / dark theme');
      btn.innerHTML='<span class="theme-icon">◐</span><span class="theme-label">LIGHT</span>';
      nav.appendChild(btn);

      function paint(){var light=root.getAttribute('data-theme')==='light';btn.querySelector('.theme-icon').textContent=light?'☼':'◐';btn.querySelector('.theme-label').textContent=light?'DARK':'LIGHT';btn.setAttribute('aria-label',light?'Switch to dark theme':'Switch to light theme');}
      paint();
      btn.addEventListener('click',function(){var light=root.getAttribute('data-theme')==='light';root.setAttribute('data-theme',light?'dark':'light');try{localStorage.setItem('umer-theme',light?'dark':'light')}catch(e){}paint();});
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupTheme,{once:true});else setupTheme();
  })();
})(window);
