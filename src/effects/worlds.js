(function(w){
  'use strict';
  document.addEventListener('DOMContentLoaded',function(){
    var secs=[['hero','cyan'],['manifesto','violet'],['dossier','cyan'],['arsenal','cyan'],['holo','violet'],['universe','violet'],['buildmode','cyan'],['life','magenta'],['screens','magenta'],['commerce','gold'],['receipt','gold'],['crucible','magenta'],['rebuild','cyan'],['capabilities','violet'],['lab','magenta'],['words','gold'],['contact','cyan']];
    var root=document.documentElement;
    var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){root.style.setProperty('--world-accent',getComputedStyle(en.target).getPropertyValue('--accent-local')||({'cyan':'#63F6E7','violet':'#9B8CFF','magenta':'#FF5C8A','gold':'#F4B860'}[en.target.dataset.world||'cyan']));document.body.dataset.world=en.target.dataset.world||'cyan';}})},{threshold:.55});
    secs.forEach(function(x){var el=document.getElementById(x[0]);if(el){el.dataset.world=x[1];el.style.setProperty('--accent-local',({cyan:'#63F6E7',violet:'#9B8CFF',magenta:'#FF5C8A',gold:'#F4B860'}[x[1]]));io.observe(el)}});
    var rootStyle=document.documentElement.style;rootStyle.setProperty('--world-accent','#63F6E7');
  });
})(window);
