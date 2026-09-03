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
})(window);

/*
 * LIFE TIMELINE — single authoritative scroll controller.
 *
 * The portfolio has accumulated several experimental timeline controllers over
 * time. Some of them keep a reference to #tlTrack and continue writing its
 * transform. We install this controller after the whole page has loaded and
 * replace the track node, which cleanly detaches those stale references.
 *
 * The browser owns vertical scrolling. The timeline simply maps the vertical
 * distance travelled through #life to horizontal translation of the track.
 * This works on touch, wheel, trackpad and normal mouse scrolling without a
 * second nested scroll area.
 */
(function(w,d){
  'use strict';

  function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
  function ready(fn){
    if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',fn,{once:true});
    else fn();
  }

  ready(function(){
    function install(){
      var life=d.getElementById('life');
      var sticky=life&&life.querySelector('.tl-sticky');
      var oldTrack=life&&life.querySelector('#tlTrack');
      if(!life||!sticky||!oldTrack||life.getAttribute('data-life-controller')==='active')return;

      life.setAttribute('data-life-controller','active');

      /*
       * Detach any earlier scroll handlers that captured the original track.
       * The replacement keeps the same id/classes/children, so the visual DOM
       * remains identical while old closures can no longer move the live node.
       */
      var track=oldTrack.cloneNode(true);
      oldTrack.replaceWith(track);

      var raf=0;
      var topY=0;
      var travel=0;
      var viewportH=0;
      var sectionH=0;
      var measured=false;
      var measuring=false;

      function getViewportHeight(){
        var vv=w.visualViewport;
        return Math.max(1,Math.round(vv&&vv.height?w.innerHeight&&vv.height:window.innerHeight||d.documentElement.clientHeight||1));
      }

      function measure(){
        if(measuring||!life||!sticky||!track)return;
        measuring=true;

        /* Always measure from the neutral position. */
        track.style.setProperty('transform','translate3d(0,0,0)','important');

        viewportH=getViewportHeight();
        var viewportW=Math.max(1,w.innerWidth||d.documentElement.clientWidth||1);

        /* scrollWidth includes the timeline's horizontal padding and all cards. */
        travel=Math.max(0,track.scrollWidth-viewportW);
        sectionH=viewportH+travel;

        life.style.setProperty('height',sectionH+'px','important');
        life.style.setProperty('min-height',viewportH+'px','important');
        sticky.style.setProperty('height',viewportH+'px','important');
        sticky.style.setProperty('top','0px','important');

        topY=life.getBoundingClientRect().top+(w.scrollY||w.pageYOffset||0);
        measured=true;
        measuring=false;
        render();
      }

      function render(){
        raf=0;
        if(!measured||!life||!track)return;

        var y=w.scrollY||w.pageYOffset||0;
        var local=y-topY;
        var x=clamp(local,0,travel);

        /* Reassert the geometry so legacy code cannot shrink the runway. */
        if(Math.abs((parseFloat(getComputedStyle(life).height)||0)-sectionH)>1){
          life.style.setProperty('height',sectionH+'px','important');
        }

        track.style.setProperty('transform','translate3d('+(-x).toFixed(2)+'px,0,0)','important');
      }

      function schedule(){
        if(!raf)raf=w.requestAnimationFrame(render);
      }

      measure();
      w.addEventListener('scroll',schedule,{passive:true});
      w.addEventListener('resize',measure,{passive:true});
      w.addEventListener('orientationchange',function(){setTimeout(measure,80)},{passive:true});
      if(w.visualViewport)w.visualViewport.addEventListener('resize',measure,{passive:true});
      if(d.fonts&&d.fonts.ready)d.fonts.ready.then(measure);

      if(w.ResizeObserver){
        var ro=new w.ResizeObserver(function(){measure();});
        ro.observe(track);
      }

      /* A final pass catches late-loaded images/fonts and inline legacy scripts. */
      w.requestAnimationFrame(measure);
      setTimeout(measure,250);
    }

    /* Run after all external and inline page scripts have registered. */
    if(d.readyState==='complete')setTimeout(install,0);
    else w.addEventListener('load',function(){setTimeout(install,0)},{once:true});
  });
})(window,document);
