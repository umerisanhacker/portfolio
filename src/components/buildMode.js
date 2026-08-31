(function(w){
  'use strict';
  var root=w.UmerPortfolio=w.UmerPortfolio||{},D=root.Data;
  document.addEventListener('DOMContentLoaded',function(){
    var tabs=document.getElementById('buildModeTabs'), title=document.getElementById('buildTitle'), problem=document.getElementById('buildProblem'), solution=document.getElementById('buildSolution'), tags=document.getElementById('buildTags'), id=document.getElementById('buildId'), big=document.getElementById('buildBig'), kind=document.getElementById('buildKind'), state=document.getElementById('buildState'), open=document.getElementById('buildOpen'), preview=document.getElementById('buildPreview'), visual=document.getElementById('buildVisual');
    if(!tabs||!D)return;
    var ids=['nova','studyflow','webcut','luxzy','yip','sunora'];
    var items=D.HOLO_PROJECTS.filter(function(x){return ids.indexOf(x[0])>-1});
    var byId={}; D.HOLO_PROJECTS.forEach(function(x){byId[x[0]]=x});
    function select(key){
      var item=byId[key], c=D.CASES[key]||{};if(!item)return;
      tabs.querySelectorAll('button').forEach(function(b){b.classList.toggle('on',b.dataset.key===key)});
      var idx=(D.HOLO_PROJECTS.findIndex(function(x){return x[0]===key})+1); id.textContent='P-'+String(idx).padStart(2,'0'); big.textContent=item[1]; kind.textContent=item[2]; title.textContent=item[1]; state.textContent=item[5]==='local'?'LOCAL BUILD':item[5]==='internal'?'INTERNAL EXPERIENCE':'LIVE SYSTEM'; problem.textContent=c.p||'Project brief available in the case study.';solution.textContent=c.s||'Build details available in the case study.';tags.innerHTML=(c.m||[]).map(function(m){return '<span>'+m+'</span>'}).join('');
      visual.style.setProperty('--node',item[6]==='violet'?'#9B8CFF':item[6]==='magenta'?'#FF5C8A':item[6]==='gold'?'#F4B860':'#63F6E7');
      visual.style.backgroundImage='linear-gradient(135deg,rgba(5,8,17,.72),rgba(5,8,17,.9)),url("'+item[3]+'")'; visual.style.backgroundSize='cover'; visual.style.backgroundPosition='center';
      open.onclick=function(){if(typeof w.openCase==='function')w.openCase(key)};
      preview.onclick=function(){var src=item[4]; if(src){var v=document.createElement('video');v.src=src;v.controls=true;v.autoplay=true;v.muted=false;v.playsInline=true;v.style.cssText='position:fixed;inset:6vh 5vw;z-index:1480;width:90vw;height:88vh;object-fit:contain;background:#000;border:1px solid var(--acid);box-shadow:0 0 0 9999px rgba(2,2,4,.86)';document.body.appendChild(v);var close=function(){v.pause();v.remove();document.removeEventListener('keydown',esc)};var esc=function(e){if(e.key==='Escape')close()};v.addEventListener('click',close);document.addEventListener('keydown',esc);v.play().catch(function(){})}else if(typeof w.openCase==='function')w.openCase(key)};
    }
    items.forEach(function(item){var b=document.createElement('button');b.type='button';b.dataset.key=item[0];b.textContent=item[1];tabs.appendChild(b);b.addEventListener('click',function(){select(item[0])})});
    select('nova');
  });
})(window);
