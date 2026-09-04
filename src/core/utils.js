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

  /*
   * LIFE TIMELINE — one authoritative renderer.
   * The timeline converts page vertical scroll into horizontal track movement.
   * Desktop wheel and mobile touch are explicitly forwarded to page scrolling
   * when the pointer/finger begins over the sticky timeline surface.
   */
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
        measuring=true;
        track.style.setProperty('--life-track-x','0px');
        viewportH=getViewportHeight();
        var viewportW=Math.max(1,window.innerWidth||document.documentElement.clientWidth||1);
        travel=Math.max(0,track.scrollWidth-viewportW);
        sectionH=viewportH+travel;
        life.style.setProperty('height',sectionH+'px','important');
        life.style.setProperty('min-height',viewportH+'px','important');
        sticky.style.setProperty('height',viewportH+'px','important');
        sticky.style.setProperty('top','0px','important');
        topY=life.getBoundingClientRect().top+(window.scrollY||window.pageYOffset||0);
        measured=true;
        measuring=false;
        render();
      }

      function render(){
        raf=0;
        if(!measured||!life||!track)return;
        var y=window.scrollY||window.pageYOffset||0;
        var local=y-topY;
        var x=clamp(local,0,travel);
        track.style.setProperty('--life-track-x',(-x).toFixed(2)+'px');
        if(Math.abs((parseFloat(getComputedStyle(life).height)||0)-sectionH)>1){
          life.style.setProperty('height',sectionH+'px','important');
        }
      }
      function schedule(){if(!raf)raf=window.requestAnimationFrame(render);}

      measure();
      window.addEventListener('scroll',schedule,{passive:true});
      window.addEventListener('resize',measure,{passive:true});
      window.addEventListener('orientationchange',function(){setTimeout(measure,80)},{passive:true});
      if(window.visualViewport)window.visualViewport.addEventListener('resize',measure,{passive:true});
      if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);
      if(window.ResizeObserver){var ro=new window.ResizeObserver(function(){measure();});ro.observe(track);}
      window.requestAnimationFrame(measure);
      setTimeout(measure,250);

      /* Desktop wheel: forward vertical wheel intent to native page scroll. */
      life.addEventListener('wheel',function(e){
        if(('ontouchstart' in window)||window.matchMedia('(max-width:700px)').matches)return;
        if(!e||(!e.deltaY&&!e.deltaX))return;
        if(Math.abs(e.deltaY)<Math.abs(e.deltaX))return;
        e.preventDefault();
        window.scrollBy(0,e.deltaY);
      },{passive:false});

      /* Mobile touch: forward vertical finger movement to native page scroll. */
      var touchStartY=0,touchStartX=0,touchActive=false,touchMoved=false,mobileQuery=window.matchMedia('(max-width:700px)');
      function isMobile(){return mobileQuery.matches||('ontouchstart' in window);}
      life.addEventListener('touchstart',function(e){
        if(!isMobile()||!e.touches||e.touches.length!==1)return;
        touchStartY=e.touches[0].clientY;
        touchStartX=e.touches[0].clientX;
        touchActive=true;
        touchMoved=false;
      },{passive:true});
      life.addEventListener('touchmove',function(e){
        if(!touchActive||!isMobile()||!e.touches||e.touches.length!==1)return;
        var y=e.touches[0].clientY,x=e.touches[0].clientX,dy=y-touchStartY,dx=x-touchStartX;
        if(!touchMoved){if(Math.abs(dy)<4)return;touchMoved=true;}
        if(Math.abs(dy)>=Math.abs(dx)){
          e.preventDefault();
          window.scrollBy(0,-dy);
          touchStartY=y;
          touchStartX=x;
        }
      },{passive:false});
      life.addEventListener('touchend',function(){touchActive=false;touchMoved=false;},{passive:true});
      life.addEventListener('touchcancel',function(){touchActive=false;touchMoved=false;},{passive:true});
    }

    if(document.readyState==='complete')setTimeout(install,0);
    else window.addEventListener('load',function(){setTimeout(install,0)},{once:true});
  })();

  /*
   * CRUCIBLE ECG — independent animation.
   * The heartbeat line must remain alive even when the page is not scrolling.
   * We animate its stroke and a subtle amplitude pulse separately from the
   * scroll-driven 100 → 35 → 70 kg story controller in main.js.
   */
  (function(){
    function installHeartbeat(){
      var root=document.getElementById('crucible')||document;
      var path=root.querySelector('.ecg path');
      if(!path||path.getAttribute('data-ecg-live')==='1')return;
      path.setAttribute('data-ecg-live','1');
      path.style.strokeDasharray='0.16 0.84';
      path.style.strokeDashoffset='0';
      path.style.transformBox='fill-box';
      path.style.transformOrigin='center';
      path.style.willChange='stroke-dashoffset,transform,opacity,filter';
      path.style.animation='ecgMove 5s linear infinite';

      var phase=0,last=performance.now(),raf=0;
      function frame(now){
        var dt=Math.min(64,now-last);last=now;
        phase+=dt/1000;
        var pulse=(Math.sin(phase*6.4)+Math.sin(phase*12.8)*0.22)*0.5;
        var scaleY=1+Math.max(-.018,Math.min(.028,pulse*.018));
        var opacity=.78+.16*(Math.sin(phase*3.2)*.5+.5);
        path.style.transform='scaleY('+scaleY.toFixed(4)+')';
        path.style.opacity=opacity.toFixed(3);
        path.style.filter='drop-shadow(0 0 '+(5+Math.max(0,pulse)*3).toFixed(1)+'px rgba(99,246,231,.6))';
        raf=window.requestAnimationFrame(frame);
      }
      raf=window.requestAnimationFrame(frame);
      window.addEventListener('pagehide',function(){if(raf)cancelAnimationFrame(raf)},{once:true});
    }
    if(document.readyState==='complete')setTimeout(installHeartbeat,0);
    else window.addEventListener('load',function(){setTimeout(installHeartbeat,0)},{once:true});
  })();
})(window);
