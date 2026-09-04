/* Local asset integrity diagnostics + stable certificate vault */
(function(w){
  function scan(){var els=[].slice.call(document.querySelectorAll('img[src],video source[src],video[data-video],*[data-video]')),seen={};els.forEach(function(el){var u=el.getAttribute('src')||el.getAttribute('data-video');if(!u||/^https?:/i.test(u)||seen[u])return;seen[u]=1;var probe=new Image();probe.onerror=function(){console.warn('[PORTFOLIO V6] Missing local asset:',u)};probe.src=u})}
  w.UmerPortfolio=w.UmerPortfolio||{};w.UmerPortfolio.Core=w.UmerPortfolio.Core||{};w.UmerPortfolio.Core.assetIntegrity={scan:scan};
  var items=[
    ['UI / UX','UI / UX','Brand Monk Academy / NSDC','03 SEP 2026','SMAPARMQ0761168','assets/certificates/ui-ux-2026.svg'],
    ['VIDEO EDITING','VIDEO EDITING','Brand Monk Academy / NSDC','04 SEP 2026','SMAPARMQ0761301','assets/certificates/video-editing-2026.svg'],
    ['DIGITAL MARKETING','DIGITAL MARKETING','Brand Monk Academy / NSDC','04 SEP 2026','SMAPARMQ0761316','assets/certificates/digital-marketing-2026.svg']
  ];
  function addNew(track){
    if(track.querySelector('[data-new-meta]'))return;
    items.forEach(function(x,i){var c=document.createElement('article');c.className='cv-card cv-new-2026';c.dataset.newMeta=JSON.stringify(x.slice(0,5));c.tabIndex=0;c.setAttribute('aria-label','Certificate: '+x[1]);c.innerHTML='<div class="cv-card-top"><span>CERT '+String(16+i).padStart(2,'0')+'</span><span>'+x[0]+'</span></div><div class="cv-card-image"><img src="'+x[5]+'" alt="'+x[1]+' certificate — Umer Abdullah PV" loading="lazy" decoding="async"></div><div class="cv-card-bottom"><div><strong>'+x[1]+'</strong><small>'+x[2]+' · '+x[3]+'</small></div><button type="button" class="cv-inspect">INSPECT ↗</button></div>';track.appendChild(c)});
  }
  function stableVault(){
    var old=document.getElementById('cvStage');if(!old||old.dataset.stableVault)return;var ot=old.querySelector('#cvTrack');if(!ot)return;
    addNew(ot);
    var stage=old.cloneNode(true);stage.dataset.stableVault='1';old.replaceWith(stage);
    var track=stage.querySelector('#cvTrack'),cards=[].slice.call(track.querySelectorAll('.cv-card')),prev=stage.querySelector('.cv-prev'),next=stage.querySelector('.cv-next'),n=cards.length,cur=0,timer=0,auto=true,busy=false,drag=null;
    if(!n)return;
    stage.querySelectorAll('.cv-hud span:last-child,.sec-count,.cv-readout small').forEach(function(e){e.textContent=String(n)});
    function wrap(i){return(i+n)%n}
    function meta(c){var nm=c.dataset.newMeta;if(nm){try{return JSON.parse(nm)}catch(e){}}var a=c.querySelector('.cv-card-top span:nth-child(2)'),b=c.querySelector('.cv-card-bottom strong'),d=c.querySelector('.cv-card-bottom small');return[a?a.textContent:'CERTIFICATE',b?b.textContent:'',d?d.textContent:'','']}
    function render(){cards.forEach(function(c,i){var d=i-cur;if(d>n/2)d-=n;if(d<-n/2)d+=n;var a=d===0,s=Math.abs(d)===1,x=a?0:(d<0?-82:82),sc=a?1:.86,o=a?1:(s?.28:0);c.classList.toggle('is-active',a);c.classList.toggle('is-prev',d===-1);c.classList.toggle('is-next',d===1);c.classList.toggle('is-far',!a&&!s);c.style.setProperty('transform','translate3d(calc(-50% + '+x+'%),-50%,0) scale('+sc+') rotateY('+(a?0:(d<0?4:-4))+'deg)','important');c.style.setProperty('opacity',String(o),'important');c.style.setProperty('z-index',String(a?50:(s?20:1)),'important');c.style.setProperty('pointer-events',a?'auto':'none','important')});var m=meta(cards[cur]),idx=cur+1,e=document.getElementById('cvCurrent');if(e)e.textContent=String(idx).padStart(2,'0');e=document.getElementById('cvMeterFill');if(e)e.style.width=(idx/n*100).toFixed(2)+'%';e=document.getElementById('cvCategory');if(e)e.textContent=m[0]||'';e=document.getElementById('cvTitle');if(e)e.textContent=m[1]||'';e=document.getElementById('cvIssuer');if(e)e.textContent=m[2]||''}
    function stop(){clearTimeout(timer);timer=0}function arm(){stop();if(auto&&!document.hidden)timer=setTimeout(function(){go(1)},5000)}function go(d){if(busy)return;busy=true;stop();cur=wrap(cur+d);render();setTimeout(function(){busy=false;arm()},360)}
    function open(){var modal=document.getElementById('cvModal');if(!modal)return;var c=cards[cur],m=meta(c),im=modal.querySelector('img'),md=modal.querySelector('.cv-modal-meta'),src=c.querySelector('img');if(im&&src){im.src=src.src;im.alt=m[1]||''}if(md)md.textContent=cur+1+' / '+n+' · '+(m[1]||'')+' · '+(m[2]||'')+' · '+(m[3]||'');modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');stop()}
    if(prev)prev.onclick=function(e){e.preventDefault();e.stopPropagation();go(-1)};if(next)next.onclick=function(e){e.preventDefault();e.stopPropagation();go(1)};
    cards.forEach(function(c,i){c.onclick=function(e){e.preventDefault();if(i===cur)open();else{cur=i;render();arm()}};var b=c.querySelector('.cv-inspect');if(b)b.onclick=function(e){e.preventDefault();e.stopPropagation();cur=i;render();open()};c.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();if(i===cur)open();else{cur=i;render();arm()}}}});
    stage.addEventListener('pointerdown',function(e){if(e.target.closest&&e.target.closest('.cv-nav'))return;drag={id:e.pointerId,x:e.clientX,y:e.clientY};stop()},{passive:true});stage.addEventListener('pointerup',function(e){if(!drag||e.pointerId!==drag.id)return;var dx=e.clientX-drag.x;drag=null;if(Math.abs(dx)>45)go(dx<0?1:-1);else arm()},{passive:true});stage.addEventListener('pointercancel',function(){drag=null;arm()},{passive:true});
    var ab=document.getElementById('cvAutoplay');if(ab)ab.onclick=function(e){e.preventDefault();auto=!auto;ab.textContent=auto?'AUTO · ON':'AUTO · OFF';auto?arm():stop()};var ob=document.getElementById('cvOpen');if(ob)ob.onclick=function(e){e.preventDefault();open()};
    render();arm();
  }
  function boot(){setTimeout(stableVault,0)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})(window);
