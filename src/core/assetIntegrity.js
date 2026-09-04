/* Local asset integrity diagnostics */
(function(w){
  function scan(){var els=[].slice.call(document.querySelectorAll('img[src],video source[src],video[data-video],*[data-video]')),seen={};els.forEach(function(el){var u=el.getAttribute('src')||el.getAttribute('data-video');if(!u||/^https?:/i.test(u)||seen[u])return;seen[u]=1;var probe=new Image();probe.onerror=function(){console.warn('[PORTFOLIO V6] Missing local asset:',u)};probe.src=u})}
  w.UmerPortfolio=w.UmerPortfolio||{};w.UmerPortfolio.Core=w.UmerPortfolio.Core||{};w.UmerPortfolio.Core.assetIntegrity={scan:scan};

  var items=[
    ['UI / UX','UI / UX','Brand Monk Academy / NSDC','03 SEP 2026','SMAPARMQ0761168','assets/certificates/ui-ux-2026.svg'],
    ['VIDEO EDITING','VIDEO EDITING','Brand Monk Academy / NSDC','04 SEP 2026','SMAPARMQ0761301','assets/certificates/video-editing-2026.svg'],
    ['DIGITAL MARKETING','DIGITAL MARKETING','Brand Monk Academy / NSDC','04 SEP 2026','SMAPARMQ0761316','assets/certificates/digital-marketing-2026.svg']
  ];

  function addNewCertificates(){
    var track=document.getElementById('cvTrack');
    if(!track||track.querySelector('[data-new-meta]'))return;
    items.forEach(function(item,i){
      var card=document.createElement('article');card.className='cv-card cv-new-2026';
      card.dataset.certIndex=String(track.querySelectorAll('.cv-card').length);card.dataset.newMeta=JSON.stringify(item.slice(0,5));card.tabIndex=0;
      card.setAttribute('aria-label','Certificate: '+item[1]);
      card.innerHTML='<div class="cv-card-top"><span>CERT '+String(16+i).padStart(2,'0')+'</span><span>'+item[0]+'</span></div><div class="cv-card-image"><img src="'+item[5]+'" alt="'+item[1]+' certificate — Umer Abdullah PV" loading="lazy" decoding="async"></div>';
      track.appendChild(card);
    });
    var stage=document.getElementById('cvStage');if(stage)stage.querySelectorAll('.sec-count,.cv-readout small').forEach(function(el){el.textContent=el.textContent.replace(/15/g,'18')});
  }

  function bridgeCertificateMeta(){
    var stage=document.getElementById('cvStage'),track=document.getElementById('cvTrack');
    if(!stage||!track||track.__newCertBridge)return;
    track.__newCertBridge=true;
    function sync(){
      var cards=stage.querySelectorAll('.cv-card'),active=stage.querySelector('.cv-card[data-new-meta].is-active');if(!active)return;
      var m=JSON.parse(active.dataset.newMeta||'[]'),idx=Array.prototype.indexOf.call(cards,active)+1;
      var cat=document.getElementById('cvCategory'),title=document.getElementById('cvTitle'),issuer=document.getElementById('cvIssuer'),current=document.getElementById('cvCurrent'),fill=document.getElementById('cvMeterFill');
      if(cat)cat.textContent=m[0]||'';if(title)title.textContent=m[1]||'';if(issuer)issuer.textContent=(m[2]||'')+' · '+(m[3]||'');if(current)current.textContent=String(idx).padStart(2,'0');if(fill)fill.style.width=(idx/cards.length*100).toFixed(2)+'%';
    }
    new MutationObserver(sync).observe(track,{subtree:true,attributes:true,attributeFilter:['class']});
    stage.querySelectorAll('.cv-card[data-new-meta]').forEach(function(card){
      card.addEventListener('click',function(e){
        if(!card.classList.contains('is-active'))return;
        e.preventDefault();e.stopImmediatePropagation();
        var m=JSON.parse(card.dataset.newMeta||'[]'),modal=document.getElementById('cvModal');if(!modal)return;
        var img=modal.querySelector('img'),md=modal.querySelector('.cv-modal-meta'),cards=stage.querySelectorAll('.cv-card'),idx=Array.prototype.indexOf.call(cards,card)+1;
        if(img){img.src=card.querySelector('img').src;img.alt=m[1]||'';}if(md)md.textContent=idx+' / '+cards.length+' · '+(m[1]||'')+' · '+(m[2]||'')+' · '+(m[3]||' · ID '+m[4]);
        modal.classList.add('is-open');modal.setAttribute('aria-hidden','false');
      },true);
    });
    sync();
  }

  function boot(){addNewCertificates();setTimeout(bridgeCertificateMeta,0);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})(window);
