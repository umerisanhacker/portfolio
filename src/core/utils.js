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
   *
   * main.js contains an older global scroll animation that also writes an
   * inline transform to #tlTrack. Inline writes were the reason the timeline
   * repeatedly became stuck after the later fixes. We intentionally make the
   * transform a CSS !important rule driven by a custom property. Legacy inline
   * transform writes can no longer win the cascade.
   *
   * Vertical page scrolling remains completely native. The vertical distance
   * through #life is mapped 1:1 to horizontal travel of the timeline track.
   */
  (function(){
    'use strict';

    function clamp(v,a,b){return Math.max(a,Math.min(b,v));}

    function install(){
      var life=document.getElementById('life');
      var sticky=life&&life.querySelector('.tl-sticky');
      var oldTrack=life&&life.querySelector('#tlTrack');
      if(!life||!sticky||!oldTrack||life.getAttribute('data-life-controller')==='active')return;
      life.setAttribute('data-life-controller','active');

      /* CSS !important beats the legacy inline transform from main.js. */
      if(!document.getElementById('life-timeline-authority')){
        var css=document.createElement('style');
        css.id='life-timeline-authority';
        css.textContent='#life .tl-track{transform:translate3d(var(--life-track-x,0px),0,0)!important;}';
        document.head.appendChild(css);
      }

      var track=oldTrack;
      var raf=0;
      var topY=0;
      var travel=0;
      var viewportH=0;
      var sectionH=0;
      var measured=false;
      var measuring=false;

      function getViewportHeight(){
        return Math.max(1,Math.round(window.innerHeight||document.documentElement.clientHeight||1));
      }

      function measure(){
        if(measuring||!life||!track)return;
        measuring=true;

        track.style.setProperty('--life-track-x','0px');
        track.style.setProperty('transform','translate3d(0,0,0)','');

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

        /* Keep the measured runway authoritative if legacy code changes it. */
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

      if(window.ResizeObserver){
        var ro=new window.ResizeObserver(function(){measure();});
        ro.observe(track);
      }

      window.requestAnimationFrame(measure);
      setTimeout(measure,250);
    }

    if(document.readyState==='complete')setTimeout(install,0);
    else window.addEventListener('load',function(){setTimeout(install,0)},{once:true});
  })();
})(window);
