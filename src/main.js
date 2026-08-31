
/* hand-built, no frameworks — view source & smile */
(function(){
var UmerPortfolio=window.UmerPortfolio||{};
'use strict';
var CONFIG=UmerPortfolio.Data.CONFIG,LINKS=UmerPortfolio.Data.LINKS,CASES=UmerPortfolio.Data.CASES;
var Q=UmerPortfolio.Utils,$=Q.$,$$=Q.$$;var clamp=Q.clamp,lerp=Q.lerp,map=Q.map,toast=Q.toast;
var mailSub=encodeURIComponent('Project inquiry — via portfolio');
var mailBody=encodeURIComponent('Hey Umer,\n\nI saw your portfolio and I want to talk about a build.\n\n— ');

document.getElementById('ctMail').href='mailto:'+CONFIG.email+'?subject='+mailSub+'&body='+mailBody;
document.getElementById('ctGmail').href='https://mail.google.com/mail/?view=cm&fs=1&to='+CONFIG.email+'&su='+mailSub+'&body='+mailBody;
document.getElementById('ctCall').href='tel:'+CONFIG.phoneTel;
document.getElementById('ctWA').href='https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(CONFIG.waMessage);
document.getElementById('ctMailTxt').textContent=CONFIG.email;
document.getElementById('ctCallTxt').textContent=CONFIG.phoneDisplay;
document.getElementById('mWA').href='https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(CONFIG.waMessage);
document.getElementById('mCall').href='tel:'+CONFIG.phoneTel;
document.getElementById('mMail').href='mailto:'+CONFIG.email+'?subject='+mailSub+'&body='+mailBody;
document.getElementById('waBubble').href='https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(CONFIG.waMessage);
$$('[data-link]').forEach(function(a){var k=a.getAttribute('data-link');if(LINKS[k])a.href=LINKS[k];});

var FINE=matchMedia('(pointer: fine)').matches;

console.log('%cUMER ABDULLAH PV','font-size:24px;font-weight:900;color:#63F6E7;background:#050811;padding:8px 16px');
console.log('%cHand-built, no frameworks. Like what you see? → umerpv2007@gmail.com','color:#9AA6BF');

(function(){var c=document.createElement('canvas');c.width=600;c.height=314;var x=c.getContext('2d');x.fillStyle='#050811';x.fillRect(0,0,600,314);x.fillStyle='#63F6E7';x.font='900 60px sans-serif';x.fillText('UMER PV',40,150);x.font='20px monospace';x.fillText('ARCHITECT OF CODE & COMMERCE',40,200);var m=document.getElementById('ogImg');if(m)m.content=c.toDataURL();})();
(function(){var c=document.createElement('canvas');c.width=32;c.height=32;var x=c.getContext('2d');var f=document.createElement('link');f.rel='icon';document.head.appendChild(f);var t=0;(function d(){t+=.1;x.clearRect(0,0,32,32);x.fillStyle='#050811';x.fillRect(0,0,32,32);x.fillStyle='rgba(99,246,231,'+(0.6+0.4*Math.sin(t))+')';x.font='900 16px sans-serif';x.fillText('U',8,22);f.href=c.toDataURL();requestAnimationFrame(d)})();})();

var loader=$('#loader'),pct=$('#loadPct'),t0=performance.now();
(function tick(t){var p=clamp((t-t0)/1500,0,1),e=1-Math.pow(1-p,3);pct.textContent=String(Math.floor(e*100)).padStart(2,'0');if(p<1){requestAnimationFrame(tick)}else{setTimeout(function(){loader.classList.add('done');setTimeout(function(){loader.remove()},1100);typeHero();if(!sessionStorage.getItem('hint')){setTimeout(function(){toast('F = LIGHTS · ` = TERMINAL · ? = KEYS');sessionStorage.setItem('hint','1')},2000)}},250);}})(t0);
function typeHero(){var el=$('#heroType');if(!el)return;var roles=['ENGINEER','COMMERCE OPERATOR','TRANSFORMATION COACH','SELF-TAUGHT BUILDER'];var ri=0;
 (function cycle(){var target=roles[ri%roles.length];ri++;var i=0;el.textContent='';(function ty(){el.textContent=target.slice(0,++i);if(i<target.length)setTimeout(ty,30);else setTimeout(cycle,2600)})()})();}

var burger=$('#burger');
burger.addEventListener('click',function(){var open=document.body.classList.toggle('menu-open');burger.setAttribute('aria-expanded',open)});
$$('#menu a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('menu-open');burger.setAttribute('aria-expanded','false')})});

$$('[data-split]').forEach(function(el){var words=el.textContent.trim().split(/\s+/),i=0;
 el.innerHTML=words.map(function(w){return '<span class="w">'+Array.from(w).map(function(c){return '<span class="ch" style="--i:'+(i++)+'">'+c+'</span>'}).join('')+'</span>'}).join(' ')});
$$('.cap-row h3').forEach(function(h){var txt=h.textContent;
 h.innerHTML=Array.from(txt).map(function(c){if(c===' ')return ' ';return '<span class="ch" style="--tx:'+(Math.random()*14-7).toFixed(1)+'px;--ty:'+(Math.random()*12-6).toFixed(1)+'px;--tr:'+(Math.random()*16-8).toFixed(1)+'deg">'+c+'</span>'}).join('')});

function scrambleText(el){if(el._done)return;el._done=true;var orig=el.getAttribute('data-text')||el.textContent;el.setAttribute('data-text',orig);var GLY='#01▓$%&/<>*+=';var frame=0,total=Math.max(18,orig.length*2.4);
 (function step(){var out='';for(var i=0;i<orig.length;i++){var set=(i/orig.length)*total*.7;out+=frame>set+6?orig[i]:(orig[i]===' '?' ':GLY[Math.random()*GLY.length|0])}el.textContent=out;frame++;if(frame<total)requestAnimationFrame(step);else el.textContent=orig})()}
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');if(en.target.hasAttribute&&en.target.hasAttribute('data-scramble'))scrambleText(en.target);io.unobserve(en.target)}})},{threshold:.15});
$$('[data-reveal],[data-split],.sec-head,[data-scramble]').forEach(function(el){io.observe(el)});

$$('img').forEach(function(im){if(im.complete)im.classList.add('ld');else im.addEventListener('load',function(){im.classList.add('ld')})});

var mx=innerWidth/2,my=innerHeight/2,gx=mx,gy=my;
addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;
 var g=$('.gridfx');if(g)g.style.transform='translate('+((e.clientX/innerWidth-.5)*10)+'px,'+((e.clientY/innerHeight-.5)*10)+'px)'});
var glow=$('#glow');
if(!FINE)glow.style.display='none';
(function(){var h=new Date().getHours();var c=h<6?'rgba(155,140,255,.12)':h<12?'rgba(99,246,231,.14)':h<18?'rgba(255,138,0,.12)':'rgba(155,140,255,.12)';glow.style.background='radial-gradient(circle at center,'+c+',transparent 62%)'}());



(function(){var tools=$('#arsTools');if(!tools)return;
 tools.innerHTML='<button class="fchip on" data-f="all">ALL</button><button class="fchip" data-f="tools">TOOLS</button><button class="fchip" data-f="commerce">COMMERCE</button><button class="fchip" data-f="edtech">EDTECH</button><button class="fchip" data-f="client">CLIENT</button><input id="arsSearch" placeholder="SEARCH THE ARSENAL…">';
 var rows=$$('.arow');
 function apply(){var f=tools.querySelector('.fchip.on').dataset.f;var q=($('#arsSearch').value||'').toLowerCase();
  rows.forEach(function(r){var ok=(f==='all'||r.dataset.cat===f)&&(!q||r.textContent.toLowerCase().indexOf(q)>-1);r.classList.toggle('hide',!ok)})}
 tools.addEventListener('click',function(e){var c=e.target.closest('.fchip');if(!c)return;tools.querySelectorAll('.fchip').forEach(function(x){x.classList.remove('on')});c.classList.add('on');apply()});
 $('#arsSearch').addEventListener('input',apply)})();

var mani=$('#mani');
mani.innerHTML=mani.textContent.trim().split(/\s+/).map(function(w){var clean=w.replace(/[^\w₹+.\-]/g,'');var HL=['receipts','100kg','35kg','70kg','₹14.9L','₹20L+','self-taught'];var SR=['skeletal','rebuilt','cinematic'];var cls=HL.indexOf(clean)>-1?'wd hl':(SR.indexOf(clean)>-1?'wd sr':'wd');return '<span class="'+cls+'">'+w+'</span>'}).join(' ');
var mWords=mani.querySelectorAll('.wd');

var CUR={sym:'₹',rate:1,loc:'en-IN'};
function fmtCur(v){var x=v*CUR.rate;if(CUR.loc==='en-IN')return '₹'+Math.round(x).toLocaleString('en-IN');return CUR.sym+Math.round(x).toLocaleString('en-US')}
function setCur(k){if(k==='USD')CUR={sym:'$',rate:1/83,loc:'en-US'};else if(k==='AED')CUR={sym:'AED ',rate:1/22.6,loc:'en-US'};else CUR={sym:'₹',rate:1,loc:'en-IN'};
 $$('[data-inr]').forEach(function(el){el.classList.remove('flip');void el.offsetWidth;el.classList.add('flip');el.textContent=fmtCur(+el.dataset.inr)});
 $$('.curbtn').forEach(function(b){b.classList.toggle('on',b.dataset.cur===k)})}
$$('.curbtn').forEach(function(b){b.addEventListener('click',function(){setCur(b.dataset.cur)})});

document.addEventListener('click',function(e){var c=e.target.closest('[data-count]');if(c&&window.__count)window.__count(c,+c.dataset.count)});
window.__count=function(el,to,dur){dur=dur||1700;var d=+el.dataset.dec||0,l=el.dataset.loc,suf=el.dataset.suffix||'',from=el._v||0,t0=performance.now();
 (function s(t){var p=clamp((t-t0)/dur,0,1),e=1-Math.pow(1-p,4);el.textContent=fmt(from+(to-from)*e,d,l)+suf;if(p<1)requestAnimationFrame(s);else el._v=to})(t0)};
function count(el,to){window.__count(el,to)}
var cio=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){count(en.target,+en.target.dataset.count);cio.unobserve(en.target)}})},{threshold:.5});
$$('[data-count]').forEach(function(el){cio.observe(el)});

var dob=new Date('2007-12-19T00:00:00');
function ageTick(){var n=Date.now(),d=n-dob;var yrs=Math.floor(d/31557600000);var rem=d-yrs*31557600000;var days=Math.floor(rem/86400000);rem-=days*86400000;var h=Math.floor(rem/3600000),m=Math.floor(rem%3600000/60000),s=Math.floor(rem%60000/1000);var el=document.getElementById('ageTick');if(el)el.textContent=yrs+'y '+days+'d '+('0'+h).slice(-2)+':'+('0'+m).slice(-2)+':'+('0'+s).slice(-2)}
setInterval(ageTick,1000);ageTick();

(function(){var hm=document.querySelector('.hero-meta');if(!hm)return;var d=document.createElement('div');d.innerHTML='<small>KER / UAE</small><span id="dualT">--</span>';hm.appendChild(d);
 function u(){try{document.getElementById('dualT').textContent=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'})+' / '+new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Dubai',hour:'2-digit',minute:'2-digit'})}catch(e){}}
 u();setInterval(u,1000)})();

(function(){var ist=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit'});var h=+ist;var on=h>=9&&h<21;var a=$('#availTxt');if(a)a.textContent=on?'Online now · replies < 1h':'Sleeping · WhatsApp still open';var e=$('#etaTxt');if(e)e.textContent='REPLY ETA: '+(on?'< 1 HOUR':'~ MORNING IST')})();

var M24=[];(function(){var names=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];for(var y=23;y<=24;y++)for(var m=0;m<12;m++)M24.push(names[m]+" '"+y)})();
var RANGES={
 '24M':{max:150000,from:'JAN 2023',to:'DEC 2024',k:{rev:1492450,ord:1285,conv:2.35,aov:1160.45,ret:28.6},d:['▲82%','▲71%','▲18%','▲7%','▲15%'],sales:[.04,.06,.05,.09,.11,.1,.14,.17,.16,.2,.24,.22,.28,.33,.31,.38,.44,.42,.52,.6,.58,.7,.82,1],bars:[8,10,9,12,14,13,17,19,18,22,24,23,28,31,30,35,38,37,43,47,46,52,58,64]},
 '90D':{max:60000,from:'WEEK 1',to:'WEEK 12',k:{rev:412300,ord:356,conv:2.41,aov:1158.2,ret:29.2},d:['▲24%','▲19%','▲9%','▲4%','▲6%'],sales:[.3,.34,.32,.38,.41,.4,.45,.47,.46,.5,.53,.52,.56,.58,.57,.62,.65,.64,.7,.74,.73,.8,.86,1],bars:[30,33,31,36,38,37,41,43,42,46,48,47,51,53,52,56,58,57,61,63,62,66,70,74]},
 '30D':{max:5200,from:'DAY 1',to:'DAY 30',k:{rev:138900,ord:121,conv:2.52,aov:1148,ret:31.4},d:['▲11%','▲8%','▲5%','▲2%','▲3%'],sales:[.4,.55,.42,.6,.5,.68,.58,.72,.64,.8,.7,.86,.76,.9,.82,.95,.88,1,.92,1,.96,1,.98,1],bars:[40,55,42,60,50,68,58,72,64,80,70,86,76,90,82,95,88,100,92,100,96,100,98,100]}};
var curRange='24M',chartBoost=1,jit=1.2;
function labFor(i){if(curRange==='24M')return M24[i];if(curRange==='90D')return 'W'+(i+1);return 'D'+(i+1)}
RANGES['24M'].bars.forEach(function(v,i){$('#bars').insertAdjacentHTML('beforeend','<div class="bar" style="--bd:'+(i*45)+'ms;height:'+(4+v*1.4)+'%"></div>')});
var barEls=$$('#bars .bar');
(function(){var rt=$('#rtabs');var pill=document.createElement('span');pill.className='pill';rt.appendChild(pill);
 function move(){var on=rt.querySelector('.rtab.on');pill.style.left=on.offsetLeft+'px';pill.style.width=on.offsetWidth+'px'}
 move();addEventListener('resize',move);
 rt.addEventListener('click',function(e){var b=e.target.closest('.rtab');if(!b)return;rt.querySelectorAll('.rtab').forEach(function(x){x.classList.remove('on')});b.classList.add('on');move();
  curRange=b.dataset.r;chartBoost=0;var R=RANGES[curRange];
  count($('#kOrd'),R.k.ord);count($('#kConv'),R.k.conv);count($('#kRet'),R.k.ret);
  $('#kRev').textContent=fmtCur(R.k.rev);$('#kAov').textContent=fmtCur(R.k.aov);
  var dels=$$('.kpi .delta');R.d.forEach(function(t,i){if(dels[i])dels[i].textContent=t});
  barEls.forEach(function(el,i){el.style.height=(4+R.bars[i]*1.4)+'%'});
  $('#barsFrom').textContent=R.from;$('#barsTo').textContent=R.to})})();
function drawChart(p){var S=RANGES[curRange].sales;var line=$('#linePath'),area=$('#areaPath'),dotE=$('#endDot');
 var total=(S.length-1)*p,idx=Math.floor(total),frac=total-idx;var d='M10 '+(220-S[0]*200),i;
 for(i=1;i<=idx;i++){var j=Math.sin(i*7.3)*jit;d+=' L '+(10+i*(580/(S.length-1)))+' '+(220-S[i]*200+j)}
 var ex=10+idx*(580/(S.length-1)),ey=220-S[idx]*200;
 if(idx<S.length-1){var nx=10+(idx+1)*(580/(S.length-1)),ny=220-S[idx+1]*200;ex=lerp(ex,nx,frac);ey=lerp(ey,ny,frac);d+=' L '+ex+' '+ey}
 line.setAttribute('d',d);area.setAttribute('d',d+' L '+ex+' 220 L 10 220 Z');
 dotE.setAttribute('cx',ex);dotE.setAttribute('cy',ey);dotE.style.opacity=p>0?1:0}
var chartWrap=$('.chartwrap'),chartX=$('#chartX'),chartTip=$('#chartTip');
chartWrap.addEventListener('mousemove',function(e){var r=chartWrap.getBoundingClientRect();var ratio=clamp((e.clientX-r.left)/r.width,0,1);var S=RANGES[curRange].sales,idx=Math.round(ratio*(S.length-1));chartX.style.left=(ratio*100)+'%';chartX.style.opacity=1;chartTip.style.left=(ratio*100)+'%';chartTip.style.opacity=1;chartTip.textContent=labFor(idx)+' · '+fmtCur(S[idx]*RANGES[curRange].max)});
chartWrap.addEventListener('mouseleave',function(){chartX.style.opacity=0;chartTip.style.opacity=0});
var segCircles=[];
(function(svg,segs){var C=2*Math.PI*54,st=0,html='<circle cx="70" cy="70" r="54" fill="none" stroke="rgba(237,237,234,.06)" stroke-width="26"></circle>';
 segs.forEach(function(s,i){var len=C*s[0]/100,off=-C*st/100;st+=s[0];html+='<circle class="seg" cx="70" cy="70" r="54" stroke="'+s[1]+'" stroke-dasharray="0 '+C+'" data-t="'+len+' '+(C-len)+'" stroke-dashoffset="'+off+'" transform="rotate(-90 70 70)" style="transition-delay:'+(i*.18)+'s"></circle>'});
 html+='<text class="hole" x="70" y="78" text-anchor="middle">84%</text>';svg.innerHTML=html})($('#chDonut'),[[84,'#63F6E7'],[12,'#9B8CFF'],[3,'#FF5C8A'],[1,'#44506A']]);
var dio=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.querySelectorAll('.seg').forEach(function(c){c.setAttribute('stroke-dasharray',c.dataset.t)});en.target.classList.add('drawn');segCircles=Array.prototype.slice.call(en.target.querySelectorAll('.seg'));dio.unobserve(en.target)}})},{threshold:.35});
dio.observe($('#chDonut'));dio.observe($('#barsPanel'));
$$('#chLegend li').forEach(function(li,i){
 li.addEventListener('mouseenter',function(){var hole=$('#chDonut .hole');if(hole)hole.textContent=li.dataset.p+'%';segCircles.forEach(function(c,j){c.style.opacity=j===i?1:.3;c.style.strokeWidth=j===i?32:26})});
 li.addEventListener('mouseleave',function(){var hole=$('#chDonut .hole');if(hole)hole.textContent='84%';segCircles.forEach(function(c){c.style.opacity=1;c.style.strokeWidth=26})})});

var ORDERS=[['Aisha N.','AuraGlow Night Cream','₹1,980'],['Rahul M.','Sunora Pure Face Wash','₹649'],['Fatima S.','Radiant Skin Serum','₹1,450'],['George K.','Hydra Boost Moisturizer','₹1,120'],['Meera P.','Sunora Organic Soap ×3','₹999'],['Anand V.','AuraGlow Night Cream','₹1,980'],['Sara T.','Radiant Skin Serum','₹1,450'],['Vikram R.','Pure Face Wash ×2','₹1,298']];
var oi=0,feedList=$('#feedList');
function pushOrder(){var o=ORDERS[oi++%ORDERS.length],el=document.createElement('div');el.className='feed-item';el.dataset.case='sunora';
 el.innerHTML='<div class="who"><b>'+o[0]+'</b><small>'+o[1]+'</small></div><span class="amt">+'+o[2]+'</span>';
 feedList.prepend(el);while(feedList.children.length>5)feedList.lastChild.remove()}
for(var f0=0;f0<5;f0++)pushOrder();
setInterval(pushOrder,3400);
feedList.addEventListener('click',function(e){var it=e.target.closest('.feed-item');if(it&&it.dataset.case)openCase(it.dataset.case)});

(function(){var v=1024;setInterval(function(){v+=Math.floor(Math.random()*3);var el=$('#visitors');if(el)el.textContent=v.toLocaleString('en-IN')},7000)})();

/* PHOTO-FIRST MEDIA SYSTEM — videos removed for faster, quieter portfolio loading. */
if(FINE){
  $$('.arow').forEach(function(row){
    var thumb=row.querySelector('.athumb'), img=thumb&&thumb.querySelector('img');
    if(!thumb||!img)return;
    row.addEventListener('mouseenter',function(){thumb.classList.add('photo-focus')});
    row.addEventListener('mousemove',function(e){
      var r=thumb.getBoundingClientRect(),x=((e.clientX-r.left)/r.width)*100,y=((e.clientY-r.top)/r.height)*100;
      thumb.style.setProperty('--photo-x',x.toFixed(1)+'%');
      thumb.style.setProperty('--photo-y',y.toFixed(1)+'%');
    });
    row.addEventListener('mouseleave',function(){thumb.classList.remove('photo-focus');thumb.style.removeProperty('--photo-x');thumb.style.removeProperty('--photo-y')});
  });
  $$('.sframe').forEach(function(fr){
    var media=fr.querySelector('.vmedia'),img=media&&media.querySelector('img');
    if(!media||!img)return;
    fr.addEventListener('mouseenter',function(){media.classList.add('photo-focus');fr.classList.add('tilt')});
    fr.addEventListener('mouseleave',function(){media.classList.remove('photo-focus');fr.classList.remove('tilt');fr.style.transform='';media.style.removeProperty('--photo-x');media.style.removeProperty('--photo-y')});
    fr.addEventListener('mousemove',function(e){
      var r=fr.getBoundingClientRect(),dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;
      fr.style.transform='perspective(1100px) rotateY('+(dx*8).toFixed(2)+'deg) rotateX('+(dy*-8).toFixed(2)+'deg) scale(1.035)';
      var x=((e.clientX-r.left)/r.width)*100,y=((e.clientY-r.top)/r.height)*100;
      media.style.setProperty('--photo-x',x.toFixed(1)+'%');media.style.setProperty('--photo-y',y.toFixed(1)+'%');
    });
  });
} else {
  $$('.sframe').forEach(function(fr){fr.addEventListener('touchstart',function(){var m=fr.querySelector('.vmedia');if(m)m.classList.add('photo-focus')},{passive:true})});
}

var lightbox=$('#lightbox'),lbImg=$('#lbImg'),lbTitle=$('#lbTitle'),lbLink=$('#lbLink'),lbList=[],lbI=0,lbZ=1;
function lbClose(){lightbox.hidden=true;lbZ=1;lbImg.style.transform=''}
$('#lbX').addEventListener('click',lbClose);
lightbox.addEventListener('click',function(e){if(e.target===lightbox)lbClose()});
lightbox.addEventListener('wheel',function(e){e.preventDefault();lbZ=clamp(lbZ+(e.deltaY<0?.15:-.15),1,3);lbImg.style.transform='scale('+lbZ+')'},{passive:false});
document.addEventListener('keydown',function(e){if(lightbox.hidden)return;if(e.key==='ArrowRight'){lbI=(lbI+1)%lbList.length;showLb(lbI)}if(e.key==='ArrowLeft'){lbI=(lbI-1+lbList.length)%lbList.length;showLb(lbI)}});
function showLb(i){var fr=lbList[i];var img=fr.querySelector('img');lbImg.src=img.currentSrc||img.src;lbTitle.textContent=fr.querySelector('figcaption b').textContent+' — '+fr.querySelector('figcaption span').textContent;lbLink.href=fr.href||'#'}
$$('.sframe').forEach(function(fr,i){lbList.push(fr);fr.addEventListener('click',function(e){e.preventDefault();lbI=i;showLb(i);lightbox.hidden=false})});

var caseModal=$('#caseModal');
function openCase(k){var c=CASES[k];if(!c)return;var hp=(UmerPortfolio.Data.HOLO_PROJECTS||[]).find(function(x){return x[0]===k})||null;$('#caseTitle').textContent=(hp?hp[1]:k.toUpperCase())+' — CASE STUDY';$('#caseP').textContent=c.p;$('#caseS').textContent=c.s;$('#caseSt').textContent=c.st;$('#caseM').innerHTML=c.m.map(function(m){return '<span>'+m+'</span>'}).join('');var cl=$('#caseLink');var live=!!LINKS[k]&&LINKS[k]!=='#'&&c.live!==false;if(live){cl.hidden=false;cl.href=LINKS[k];cl.textContent='OPEN LIVE ↗';cl.target='_blank'}else{cl.hidden=false;cl.removeAttribute('href');cl.removeAttribute('target');cl.textContent='NOT HOSTED — LOCAL BUILD';}var im=$('#caseMediaImg'),mode=$('#caseMode'),ci=$('#caseIndex');if(hp){ci.textContent='P-'+String((UmerPortfolio.Data.HOLO_PROJECTS||[]).indexOf(hp)+1).padStart(2,'0');mode.textContent=hp[5]==='live'?'LIVE SYSTEM':hp[5]==='local'?'LOCAL BUILD':'INTERNAL EXPERIENCE';im.src=hp[3]||'';im.alt=hp[1]+' project preview'}else{im.removeAttribute('src')}caseModal.hidden=false}

window.openCase=openCase;
$('#caseX').addEventListener('click',function(){caseModal.hidden=true});
caseModal.addEventListener('click',function(e){if(e.target===caseModal)caseModal.hidden=true});
document.addEventListener('click',function(e){var idx=e.target.closest?e.target.closest('.idx'):null;if(!idx)return;var key=idx.getAttribute('data-case');if(key&&CASES[key]){e.preventDefault();e.stopPropagation();openCase(key)}},true);
/* Local-only projects never navigate to a fake URL. */
$$('.no-live').forEach(function(el){el.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('.idx'))return;e.preventDefault();var k=el.getAttribute('data-case');if(k)openCase(k)})});


var ba=$('#baSlider'),baPos=50,baTouched=false;
function setBAv(p){baPos=clamp(p,4,96);ba.style.setProperty('--pos',baPos+'%')}
if(ba){
 ba.addEventListener('pointerdown',function(e){baTouched=true;ba.classList.add('touched');ba.setPointerCapture(e.pointerId);var r=ba.getBoundingClientRect();setBAv((e.clientX-r.left)/r.width*100);
  var mv=function(ev){var rr=ba.getBoundingClientRect();setBAv((ev.clientX-rr.left)/rr.width*100)};
  ba.addEventListener('pointermove',mv);
  ba.addEventListener('pointerup',function(){ba.removeEventListener('pointermove',mv)},{once:true});
  ba.addEventListener('pointercancel',function(){ba.removeEventListener('pointermove',mv)},{once:true})});
 ba.addEventListener('dblclick',function(){setBAv(50)});
 ba.addEventListener('keydown',function(e){if(e.key==='ArrowLeft'){e.preventDefault();setBAv(baPos-4)}if(e.key==='ArrowRight'){e.preventDefault();setBAv(baPos+4)}});
 var bo=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting&&!baTouched){var t0=performance.now();(function sw(t){var p=(t-t0)/1600;if(p>=1){setBAv(50);return}setBAv(50+Math.sin(p*Math.PI)*30);requestAnimationFrame(sw)})(t0);bo.disconnect()}})},{threshold:.5});
 bo.observe(ba)}

var PHOTOS=[
 {b:'assets/photos/fat-2',t:'ACT I · THE LAKE · 100 KG'},
 {b:'assets/photos/fat-1',t:'ACT I · MIRROR CHECK · 100 KG'},
 {b:'assets/photos/fat-3',t:'ACT I · THE HEAVY YEARS'},
 {b:'assets/photos/fat-4',t:'ACT I · LAST OF THE OLD ME'},
 {b:'assets/photos/fit-6',t:'ACT III · FIRST LEAN PHOTOS'},
 {b:'assets/photos/fit-1',t:'ACT III · DOUBLE BICEP · 70 KG'},
 {b:'assets/photos/fit-2',t:'ACT III · THE OVAL MIRROR'},
 {b:'assets/photos/fit-3',t:'ACT III · SIDE PROFILE'},
 {b:'assets/photos/fit-4',t:'ACT III · SHADOW WORK'},
 {b:'assets/photos/fit-5',t:'ACT III · BACK DETAIL'},
 {b:'assets/photos/fit-7',t:'ACT III · ARMS CROSSED'},
 {b:'assets/photos/studio-1',t:'ACT III · STUDIO SESSION · 70 KG'}];
var galStage=$('#galStage'),galCap=$('#galCap'),galDots=$('#galDots');
var galSlides=[];
PHOTOS.forEach(function(ph,i){var el=document.createElement('div');el.className='gal-slide';
 el.innerHTML='<img src="'+ph.b+'.jpg" data-base="'+ph.b+'" data-fb="https://picsum.photos/seed/transform-'+i+'/600/800" alt="Transformation photo '+(i+1)+'"><span class="gt">'+ph.t+'</span>';
 galStage.appendChild(el);galSlides.push({el:el});
 var dot=document.createElement('button');dot.setAttribute('aria-label','Go to photo '+(i+1));dot.addEventListener('click',function(){galJump(i)});galDots.appendChild(dot)});
var galDotsEls=galDots.querySelectorAll('button');
var galCur=0,galTarget=0,galDragging=false,galPending=false,galIntent=null,galStartX=0,galStartY=0,galDragStart=0,galLast=Date.now(),galHover=false;
$('#gal').addEventListener('mouseenter',function(){galHover=true});
$('#gal').addEventListener('mouseleave',function(){galHover=false});
$('#galPrev').addEventListener('click',function(){galTarget-=1;galLast=Date.now()});
$('#galNext').addEventListener('click',function(){galTarget+=1;galLast=Date.now()});
galStage.addEventListener('pointerdown',function(e){galPending=true;galIntent=null;galDragging=false;galStartX=e.clientX;galStartY=e.clientY;galDragStart=galTarget;galLast=Date.now()});
galStage.addEventListener('pointermove',function(e){if(!galPending&&!galDragging)return;var dx=e.clientX-galStartX,dy=e.clientY-galStartY;
 if(!galIntent){if(Math.abs(dx)>8||Math.abs(dy)>8){if(Math.abs(dx)>Math.abs(dy)){galIntent='h';galDragging=true;galPending=false;try{galStage.setPointerCapture(e.pointerId)}catch(err){}galStage.style.touchAction='none'}else{galIntent='v';galPending=false}}else return}
 if(galIntent==='h'&&galDragging){galTarget=galDragStart-dx/220;galLast=Date.now()}});
function galRelease(e){if(galDragging){var dx=e.clientX-galStartX;var skip=Math.round(Math.abs(dx)/120)||(Math.abs(dx)>70?1:0);galTarget=galDragStart+(dx<0?skip:-skip);galLast=Date.now()}
 galPending=false;galDragging=false;galIntent=null;galStage.style.touchAction=''}
galStage.addEventListener('pointerup',galRelease);
galStage.addEventListener('pointercancel',galRelease);
galStage.addEventListener('dblclick',function(){var g=$('#gal');if(document.fullscreenElement)document.exitFullscreen();else if(g.requestFullscreen)g.requestFullscreen()});
function galJump(i){var n=PHOTOS.length;var cur=((Math.round(galTarget)%n)+n)%n;var d=i-cur;if(d>n/2)d-=n;if(d<-n/2)d+=n;galTarget+=d;galLast=Date.now()}
function galRender(){var n=PHOTOS.length;for(var i=0;i<n;i++){var d=i-galCur;d=((d%n)+n)%n;if(d>n/2)d-=n;var ad=Math.abs(d);var s=galSlides[i];var sc=Math.max(.62,1.16-ad*.16);var x=d*Math.min(250,innerWidth*.22);
 s.el.style.transform='translate(-50%,-50%) translateX('+x+'px) scale('+sc+') rotateY('+(-d*10)+'deg)';
 s.el.style.zIndex=String(60-Math.round(ad*10));
 s.el.style.filter=ad<.35?'none':'blur('+Math.min(7,ad*3).toFixed(1)+'px) brightness('+Math.max(.35,.75-ad*.12).toFixed(2)+')';
 s.el.style.opacity=ad>3.6?'0':'1';
 s.el.classList.toggle('act',((Math.round(galCur)%n)+n)%n===i)}
 var idx=((Math.round(galCur)%n)+n)%n;galCap.textContent=PHOTOS[idx].t;
 for(var k=0;k<galDotsEls.length;k++)galDotsEls[k].classList.toggle('on',k===idx)}
$$('.pola').forEach(function(p){p.addEventListener('click',function(){p.classList.toggle('flip')})});

var cruc=$('#crucible'),cNum=$('#cNum'),cAct=$('#cAct'),cDesc=$('#cDesc'),cProg=$('#cProg'),crucSticky=$('#crucSticky');
var cbR=$('#cbR'),cbG=$('#cbG'),cbA=$('#cbA'),ghost=$('#ghostW');
var ACTS=[
 {t:'ACT I — THE BURDEN',d:'Obese at fourteen. Decided, once and for all, to change.',g:'BURDEN',c:'var(--ember)',hex:'#FF5C8A',bpm:62},
 {t:'ACT II — THE OVERSHOOT',d:'Thirty-five kilos. The skeletal diagram in the chemistry lab. Discipline without direction is another failure.',g:'LESSON',c:'var(--dim)',hex:'#7F8BA3',bpm:148},
 {t:'ACT III — THE REBUILD',d:'Seventy kilos, athletic. Regained with intent — now I coach others through their own arc.',g:'REBUILT',c:'var(--acid)',hex:'#63F6E7',bpm:72}];
var lastAct=-1;
function crucible(){var r=cruc.getBoundingClientRect();var p=clamp(-r.top/(r.height-innerHeight),0,1);
 cProg.style.width=(p*100)+'%';
 var val=p<.5?lerp(100,35,p/.5):lerp(35,70,(p-.5)/.5);
 cNum.innerHTML=Math.round(val)+'<small>kg</small>';
 var act=p<.34?0:(p<.67?1:2);
 cNum.style.color=ACTS[act].c;
 cbR.style.opacity=act===0?1:0;cbG.style.opacity=act===1?1:0;cbA.style.opacity=act===2?1:0;
 crucSticky.style.setProperty('--pc',ACTS[act].hex);
 if(act!==lastAct){lastAct=act;cAct.innerHTML=ACTS[act].t+' · <span id="bpm">'+ACTS[act].bpm+'</span> BPM';cDesc.textContent=ACTS[act].d;ghost.textContent=ACTS[act].g;
  ghost.classList.remove('on');void ghost.offsetWidth;ghost.classList.add('on');
  cNum.classList.remove('pop');void cNum.offsetWidth;cNum.classList.add('pop')}}

var TOUR=[
 {sel:'#hero',cap:'THE OPERATOR — 18 · self-taught · Kerala ⇄ UAE'},
 {sel:'#manifesto',cap:'MANIFESTO — receipts, not resumes'},
 {sel:'#dossier',cap:'DOSSIER — the human behind the builds'},
 {sel:'#arsenal',cap:'THE ARSENAL — 14 builds, hover = live'},
 {sel:'#screens',cap:'INTERFACE ARCHIVE — click any frame for the lightbox'},
 {sel:'#commerce',cap:'COMMERCE ENGINE — ₹14.9L flagship store'},
 {sel:'#crucible',cap:'THE CRUCIBLE — 100 → 35 → 70 kg'},
 {sel:'#rebuild',cap:'THE PROOF — drag, swipe, believe'},
 {sel:'#contact',cap:'PICK A CHANNEL — let’s build yours'}];
var tourOn=false,tourI=0,tourT=null;
var tourbar=$('#tourbar'),tourCap=$('#tourCap'),tourIdx=$('#tourIdx');
function tourGo(i){tourI=clamp(i,0,TOUR.length-1);var s=TOUR[tourI];var el=document.querySelector(s.sel);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});tourCap.textContent=s.cap;tourIdx.textContent=(tourI+1)+' / '+TOUR.length}
function tourSchedule(){clearTimeout(tourT);tourT=setTimeout(function(){if(!tourOn)return;if(tourI<TOUR.length-1){tourGo(tourI+1);tourSchedule()}else endTour()},3400)}
function startTour(){tourOn=true;document.body.classList.add('touring');tourGo(0);tourSchedule()}
function endTour(){tourOn=false;clearTimeout(tourT);document.body.classList.remove('touring')}
$('#tourBtn').addEventListener('click',startTour);
$('#tourNext').addEventListener('click',function(){tourGo(tourI+1);tourSchedule()});
$('#tourExit').addEventListener('click',endTour);

var cmdk=$('#cmdk'),cmdkIn=$('#cmdkIn'),cmdkList=$('#cmdkList');
var CMDS=[
 {t:'GO → HERO',k:'hero top start',run:function(){location.hash='#top'}},
 {t:'GO → MANIFESTO',k:'manifesto story',run:function(){location.hash='#manifesto'}},
 {t:'GO → DOSSIER',k:'dossier about profile',run:function(){location.hash='#dossier'}},
 {t:'GO → ARSENAL',k:'arsenal projects work',run:function(){location.hash='#arsenal'}},
 {t:'GO → HOLO DECK',k:'holo ring 3d',run:function(){location.hash='#holo'}},
 {t:'GO → LIFE TIMELINE',k:'life timeline story',run:function(){location.hash='#life'}},
 {t:'GO → THE RECEIPT',k:'receipt money total',run:function(){location.hash='#receipt'}},
 {t:'GO → INTERFACE ARCHIVE',k:'screens interfaces',run:function(){location.hash='#screens'}},
 {t:'GO → COMMERCE ENGINE',k:'commerce shopify sunora',run:function(){location.hash='#commerce'}},
 {t:'GO → REBUILD / TRANSFORMATION',k:'rebuild transformation body',run:function(){location.hash='#rebuild'}},
 {t:'GO → CONTACT',k:'contact hire',run:function(){location.hash='#contact'}},
 {t:'ACTION → PLAY THE STORY',k:'tour story cinematic play',run:startTour},
 {t:'ACTION → LIGHTS OUT (FLASHLIGHT)',k:'lights flashlight dark f',run:function(){document.body.classList.toggle('lights-off')}},
 {t:'ACTION → OPEN TERMINAL (AI TWIN)',k:'terminal ai twin console',run:function(){tOpen()}},
 {t:'ACTION → WHATSAPP',k:'whatsapp chat',run:function(){window.open('https://wa.me/'+CONFIG.whatsapp,'_blank')}},
 {t:'ACTION → COPY EMAIL',k:'email mail copy',run:function(){if(navigator.clipboard)navigator.clipboard.writeText(CONFIG.email);toast('EMAIL COPIED')}},
 {t:'ACTION → BACK TO TOP',k:'top up',run:function(){scrollTo({top:0,behavior:'smooth'})}}];
var cmdSel=0,cmdShown=[];
function cmdRender(q){q=(q||'').toLowerCase();cmdShown=CMDS.filter(function(c){return !q||c.t.toLowerCase().indexOf(q)>-1||c.k.indexOf(q)>-1});cmdSel=0;
 cmdkList.innerHTML=cmdShown.map(function(c,i){return '<div class="cmdk-item'+(i===cmdSel?' sel':'')+'" data-i="'+i+'">'+c.t+'<small>↵</small></div>'}).join('')||'<div class="cmdk-item">NO MATCH</div>'}
function cmdOpen(){cmdk.hidden=false;cmdkIn.value='';cmdRender('');cmdkIn.focus()}
function cmdClose(){cmdk.hidden=true}
function cmdRun(i){var c=cmdShown[i];cmdClose();if(c&&c.run)c.run()}
cmdkIn.addEventListener('input',function(){cmdRender(cmdkIn.value)});
cmdkIn.addEventListener('keydown',function(e){if(e.key==='ArrowDown'){e.preventDefault();cmdSel=Math.min(cmdSel+1,cmdShown.length-1);cmdRender(cmdkIn.value)}else if(e.key==='ArrowUp'){e.preventDefault();cmdSel=Math.max(cmdSel-1,0);cmdRender(cmdkIn.value)}else if(e.key==='Enter'){cmdRun(cmdSel)}else if(e.key==='Escape'){cmdClose()}});
cmdkList.addEventListener('click',function(e){var it=e.target.closest?e.target.closest('.cmdk-item'):null;if(it&&it.dataset.i!==undefined)cmdRun(+it.dataset.i)});
$('#cmdkBtn').addEventListener('click',function(){cmdk.hidden?cmdOpen():cmdClose()});

var keysOv=$('#keysOv');
keysOv.querySelector('.kb').innerHTML='<b>F</b> lights-out · <b>`</b> terminal · <b>Ctrl K</b> palette · <b>?</b> this card · <b>←/→</b> sections · <b>↑↑↓↓←→←→BA</b> god mode · <b>dbl-click</b> confetti';
document.addEventListener('keydown',function(e){if(e.key==='?'){keysOv.style.display=keysOv.style.display==='flex'?'none':'flex'}
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();cmdk.hidden?cmdOpen():cmdClose();return}
 if(e.key==='Escape'){cmdClose();endTour();caseModal.hidden=true;keysOv.style.display='none';return}
 if(e.target&&e.target.tagName==='INPUT')return;
 if(e.key.toLowerCase()==='f'){document.body.classList.toggle('lights-off');return}
 if(!cmdk.hidden)return;
 if(e.key==='ArrowRight'){e.preventDefault();var c=clamp((window.__cur||0)+1,0,8);var ids=['top','manifesto','dossier','arsenal','screens','commerce','crucible','rebuild','contact'];var el=document.getElementById(ids[c]);if(el)el.scrollIntoView({behavior:'smooth'})}
 if(e.key==='ArrowLeft'){e.preventDefault();var c2=clamp((window.__cur||0)-1,0,8);var ids2=['top','manifesto','dossier','arsenal','screens','commerce','crucible','rebuild','contact'];var el2=document.getElementById(ids2[c2]);if(el2)el2.scrollIntoView({behavior:'smooth'})}});
keysOv.addEventListener('click',function(){keysOv.style.display='none'});
var buf5='';
document.addEventListener('keypress',function(e){if(e.target&&e.target.tagName==='INPUT')return;buf5=(buf5+e.key.toLowerCase()).slice(-5);
 if(buf5.slice(-4)==='hire'){location.hash='#contact';stamp('GOOD CHOICE')}
 if(buf5.slice(-5)==='money'){location.hash='#receipt'}});
document.addEventListener('dblclick',function(e){if(e.target.closest('.gal-stage'))return;spawnConfetti(12,e.clientX,e.clientY)});
function spawnConfetti(n,x,y){var cols=['#63F6E7','#FF5C8A','#F4F7FF','#9B8CFF'];for(var i=0;i<n;i++){var c=document.createElement('i');c.className='conf';c.style.left=(x!==undefined?clamp(x+(Math.random()-.5)*240,0,innerWidth):Math.random()*innerWidth)+'px';if(y!==undefined)c.style.top=clamp(y+(Math.random()-.5)*160,0,innerHeight)+'px';c.style.background=cols[i%4];c.style.animationDuration=(1+Math.random()*1.2)+'s';c.style.animationDelay=(Math.random()*.3)+'s';document.body.appendChild(c);(function(el){setTimeout(function(){el.remove()},2400)})(c)}}
function stamp(txt){var st=document.createElement('div');st.className='stamp';st.textContent=txt;document.body.appendChild(st);requestAnimationFrame(function(){st.classList.add('on')});setTimeout(function(){st.remove()},1800)}
var ctx=$('#ctxmenu');
ctx.innerHTML='<button data-a="src">VIEW SOURCE</button><button data-a="hire">HIRE UMER</button><button data-a="god">GOD MODE</button><button data-a="mail">COPY EMAIL</button>';
document.addEventListener('contextmenu',function(e){e.preventDefault();ctx.style.display='flex';ctx.style.left=e.clientX+'px';ctx.style.top=e.clientY+'px'});
document.addEventListener('click',function(){ctx.style.display='none'});
ctx.addEventListener('click',function(e){var a=e.target.dataset.a;
 if(a==='hire')location.hash='#contact';
 if(a==='god')godMode();
 if(a==='mail'&&navigator.clipboard){navigator.clipboard.writeText(CONFIG.email);toast('EMAIL COPIED')}
 if(a==='src')toast('HAND-BUILT · NO FRAMEWORKS')});
var logo=$('.logo'),holdT=null;
logo.addEventListener('pointerdown',function(){holdT=setTimeout(function(){stamp('CHARGED ⚡');spawnConfetti(60)},2000)});
logo.addEventListener('pointerup',function(){clearTimeout(holdT)});
logo.addEventListener('pointerleave',function(){clearTimeout(holdT)});
document.addEventListener('click',function(e){var b=e.target.closest('.btn,.cmdk-btn,.gal-arrow');if(!b)return;var r=b.getBoundingClientRect(),s=document.createElement('span');s.className='rip';var sz=Math.max(r.width,r.height);s.style.width=s.style.height=sz+'px';s.style.left=(e.clientX-r.left-sz/2)+'px';s.style.top=(e.clientY-r.top-sz/2)+'px';b.appendChild(s);setTimeout(function(){s.remove()},600)});
var selbar=$('#selbar');
selbar.innerHTML='<button data-s="c">COPY</button><button data-s="w">WHATSAPP</button>';
document.addEventListener('mouseup',function(e){var s=getSelection();if(s&&s.toString().length>2){var r=s.getRangeAt(0).getBoundingClientRect();selbar.style.display='flex';selbar.style.left=r.left+'px';selbar.style.top=(r.top-36)+'px';selbar._txt=s.toString()}else selbar.style.display='none'});
selbar.addEventListener('click',function(e){var a=e.target.dataset.s;if(!a)return;var t=selbar._txt||'';if(a==='c'&&navigator.clipboard){navigator.clipboard.writeText(t);toast('SELECTION COPIED')}if(a==='w')window.open('https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(t),'_blank')});
var tip=$('#tip');
document.addEventListener('mouseover',function(e){var t=e.target.closest?e.target.closest('[data-def]'):null;if(t){tip.textContent=t.dataset.def;tip.style.display='block';var r=t.getBoundingClientRect();tip.style.left=r.left+'px';tip.style.top=(r.bottom+8)+'px'}else tip.style.display='none'});
var idle=setTimeout(function(){var h=$('#hireBtn');if(h)h.classList.add('hire-pulse')},10000);
document.addEventListener('pointermove',function(){clearTimeout(idle);var h=$('#hireBtn');if(h)h.classList.remove('hire-pulse');idle=setTimeout(function(){var h2=$('#hireBtn');if(h2)h2.classList.add('hire-pulse')},10000)});
document.addEventListener('visibilitychange',function(){document.title=document.hidden?'come back 👀 — UMER':'UMER ABDULLAH PV — Architect of Code & Commerce';if(!document.hidden)toast('WELCOME BACK')});
(function(){var c1=document.querySelector('.chip-1'),c2=document.querySelector('.chip-2');if(!c1)return;var sets=[['REVENUE · <b>₹20L+</b>','100→70KG · REBUILT'],['12 SHIPS · <b>ZERO ABANDONED</b>','400+ SESSIONS'],['SELF-TAUGHT · <b>NO BOSS</b>','24/7 BUILDER']];var i=0;setInterval(function(){i=(i+1)%sets.length;c1.innerHTML=sets[i][0];c2.innerHTML=sets[i][1]},5000)})();
$$('.nav-links a').forEach(function(a){a.addEventListener('mouseenter',function(){scrambleText(a)})});
var hn=$('#heroName');
if(hn)hn.addEventListener('mousemove',function(e){var r=hn.getBoundingClientRect();var dx=(e.clientX-r.left)/r.width-.5;hn.querySelectorAll(':scope>span').forEach(function(s,i){s.style.transform='translateX('+(dx*(i+1)*8)+'px)'})});
var rocket=$('#rocket');
rocket.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});
var sndOn=false,AC=null,lofiT=null;
function blip(f){if(!sndOn)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();var o=AC.createOscillator(),g=AC.createGain();o.frequency.value=f||520;o.type='square';g.gain.value=.04;o.connect(g);g.connect(AC.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+.12);o.stop(AC.currentTime+.13)}catch(e){}}
function lofi(on){if(lofiT){clearInterval(lofiT);lofiT=null}if(on){var chords=[[220,277,330],[196,247,294],[174,220,262],[196,247,294]];var ci=0;lofiT=setInterval(function(){var ch=chords[ci%4];ci++;ch.forEach(function(f,i){setTimeout(function(){if(!sndOn)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();var o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;g.gain.value=.03;o.connect(g);g.connect(AC.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+.9);o.stop(AC.currentTime+1)}catch(e){}},i*120)})},2000)}}
$('#sndBtn').addEventListener('click',function(){sndOn=!sndOn;this.textContent=sndOn?'SND ON':'SND OFF';lofi(sndOn);blip(660)});
document.addEventListener('click',function(){blip(520)},true);
$('#vcfBtn').addEventListener('click',function(){var v='BEGIN:VCARD\nVERSION:3.0\nFN:Umer Abdullah PV\nTEL;TYPE=CELL:'+CONFIG.phoneTel+'\nEMAIL:'+CONFIG.email+'\nURL:https://wa.me/'+CONFIG.whatsapp+'\nEND:VCARD';var b=new Blob([v],{type:'text/vcard'});var a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='umer-abdullah-pv.vcf';a.click();toast('CONTACT SAVED')});
$('#shareBtn').addEventListener('click',function(){if(navigator.share){navigator.share({title:'Umer Abdullah PV — Portfolio',text:'18. Self-taught. ₹20L+ self-made. 100kg→70kg.',url:location.href}).catch(function(){})}else if(navigator.clipboard){navigator.clipboard.writeText(location.href);toast('LINK COPIED')}});
function briefMsg(){return 'Hey Umer! Brief: '+$('#bfType').value+' · Budget '+$('#bfBudget').value+' · Timeline '+$('#bfTime').value+' — via your portfolio.'}
$('#bfWA').addEventListener('click',function(){window.open('https://wa.me/'+CONFIG.whatsapp+'?text='+encodeURIComponent(briefMsg()),'_blank')});
$('#bfMail').addEventListener('click',function(){location.href='mailto:'+CONFIG.email+'?subject='+encodeURIComponent('Project brief')+'&body='+encodeURIComponent(briefMsg())});
[$('#bfType'),$('#bfBudget'),$('#bfTime')].forEach(function(s){s.addEventListener('change',function(){$('#briefOut').textContent='BRIEF → '+briefMsg()})});
$('#calcBtn').addEventListener('click',function(){var c=+$('#calcCur').value,g=+$('#calcGoal').value,m=+$('#calcMonths').value,out=$('#calcOut');
 if(!c||!g||!m){out.textContent='ENTER ALL THREE NUMBERS.';var c2=$('.calc');c2.classList.remove('shake');void c2.offsetWidth;c2.classList.add('shake');return}
 var diff=Math.abs(c-g),rate=diff/m,safe=rate<=4;
 out.textContent='DELTA: '+diff+' kg over '+m+' mo → '+rate.toFixed(1)+' kg/mo '+(safe?'(SAFE ZONE ✓)':'(TOO FAST — UMER SAYS SLOW DOWN)')+'\nSESSIONS: '+(rate>2?5:4)+'×/week · '+(rate>2?45:40)+' min\nRULES: protein first · 10k steps · sleep 7h+ · no liquid calories\nREVIEW: weigh weekly, adjust ±10% calories.'});
var KON=['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'],kbuf=[];
document.addEventListener('keydown',function(e){if(e.target&&e.target.tagName==='INPUT')return;kbuf.push(e.key.toLowerCase());if(kbuf.length>10)kbuf.shift();if(kbuf.join(',')===KON.join(',')){kbuf=[];godMode()}});
function godMode(){stamp('GOD MODE');var c=document.createElement('canvas');c.id='matrix';document.body.appendChild(c);var x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;var cols=Math.floor(c.width/14),drops=[],i;for(i=0;i<cols;i++)drops[i]=Math.random()*-100;var G='UMERABDULLAH01₹$<>/{}#';var t0=performance.now();(function dr(){x.fillStyle='rgba(6,6,8,.12)';x.fillRect(0,0,c.width,c.height);x.fillStyle='#63F6E7';x.font='12px monospace';for(var i2=0;i2<cols;i2++){x.fillText(G.charAt(Math.floor(Math.random()*G.length)),i2*14,drops[i2]*14);if(drops[i2]*14>c.height&&Math.random()>.975)drops[i2]=0;drops[i2]++}if(performance.now()-t0<5200)requestAnimationFrame(dr);else c.remove()})()}
(function(){var hud=document.getElementById('hud');
 document.getElementById('hudTog').addEventListener('click',function(){hud.classList.toggle('open')});
 var fr=0,last=performance.now();
 (function fps(){fr++;var n=performance.now();if(n-last>=1000){var el=document.getElementById('hudFps');if(el)el.textContent=fr;window.fpsVal=fr;fr=0;last=n}requestAnimationFrame(fps)})();
 function res(){var el=document.getElementById('hudRes');if(el)el.textContent=innerWidth+'×'+innerHeight}
 res();addEventListener('resize',res);
 if(navigator.getBattery){navigator.getBattery().then(function(b){var set=function(){var el=document.getElementById('hudBat');if(el)el.textContent=Math.round(b.level*100)+'%'+(b.charging?'+':'')};set();b.addEventListener('levelchange',set);b.addEventListener('chargingchange',set)}).catch(function(){})}
 var up0=Date.now();setInterval(function(){var s=Math.floor((Date.now()-up0)/1000);var el=document.getElementById('hudUp');if(el)el.textContent=('0'+Math.floor(s/60)).slice(-2)+':'+('0'+(s%60)).slice(-2)},1000)})();
var term=document.getElementById('term'),termBody=document.getElementById('termBody'),termIn=document.getElementById('termIn');
function tPrint(html,cls){var d=document.createElement('div');d.className='t-line'+(cls?' '+cls:'');d.innerHTML=html;termBody.appendChild(d);termBody.scrollTop=termBody.scrollHeight}
function tOpen(){term.hidden=false;if(!term._booted){term._booted=true;tPrint('UMER-OS v18.12.2007 — kernel: discipline','t-sys');tPrint('AI TWIN online. type <b>help</b> to see what I can do.')}termIn.focus()}
function tClose(){term.hidden=true}
document.getElementById('termX').addEventListener('click',tClose);
document.getElementById('termBtn').addEventListener('click',function(){term.hidden?tOpen():tClose()});
document.addEventListener('keydown',function(e){if(e.key==='`'){e.preventDefault();term.hidden?tOpen():tClose()}});
(function(){var bar=document.getElementById('termBar'),dx=0,dy=0,drag=false;
 bar.addEventListener('pointerdown',function(e){drag=true;try{bar.setPointerCapture(e.pointerId)}catch(err){}var r=term.getBoundingClientRect();dx=e.clientX-r.left;dy=e.clientY-r.top;term.style.right='auto';term.style.bottom='auto'});
 bar.addEventListener('pointermove',function(e){if(!drag)return;term.style.left=(e.clientX-dx)+'px';term.style.top=(e.clientY-dy)+'px'});
 bar.addEventListener('pointerup',function(){drag=false});
 bar.addEventListener('pointercancel',function(){drag=false})})();
document.getElementById('termForm').addEventListener('submit',function(e){e.preventDefault();var raw=termIn.value;termIn.value='';var q=raw.trim().toLowerCase(),out=[];tPrint('➜ ~ '+raw.replace(/</g,'&lt;'));
 if(!q)out=[['type <b>help</b> for commands.','t-sys']];
 else if(q.indexOf('clear')===0){termBody.innerHTML='';return}
 else if(q.indexOf('help')>-1)out=[['<b>whoami</b> — who is umer'],['<b>projects</b> — the arsenal'],['<b>universe</b> — project planetarium'],['<b>build</b> — engineering lens'],['<b>lab</b> — interactive experiments'],['<b>revenue</b> — the receipts'],['<b>body</b> — the transformation'],['<b>contact</b> / <b>hire</b> — reach him'],['<b>skills</b> — the stack'],['<b>time</b> — local time'],['<b>open webcut</b> (or luxzy, omni…) — open a build'],['<b>sudo hire umer</b> — try it'],['<b>konami</b> — a rumour…']];
 else if(q.indexOf('whoami')>-1||q.indexOf('about')>-1)out=[['Umer Abdullah PV · 18 · b. 19.12.2007'],['Kerala-born, UAE-raised. Self-taught engineer,'],['commerce operator, transformation coach.'],['₹20L+ self-made. Zero funding. Zero excuses.']];
 else if(q.indexOf('universe')>-1){out=[['project universe online.'],['drag / scroll to rotate the field.'],['type <b>open nova</b> or <b>open studyflow</b> to inspect a build.']]}
 else if(q.indexOf('build mode')>-1||q==='build')out=[['build mode — engineering lens online.'],['choose a project to inspect problem, solution, stack and signals.']];
 else if(q.indexOf('lab')>-1)out=[['the lab contains three interactive experiments.'],['particles · type reactor · color reactor.'],['jump to <b>#lab</b> to interact.']];
 else if(q.indexOf('project')>-1||q.indexOf('arsenal')>-1)out=[['17 builds indexed → 12 shipped + 5 local previews.'],['WebCut Pro · Luxzy · OmniPress · File Compressor · UAPV ·'],['QuizCraft · ClassroomChat · Noufa\'s Kitchen · Client Portfolio ·'],['KMCT IETM · Yip-9.0 · Sunora Aura · Nova-AI · StudyFlow-AI ·'],['Aura Routine App · LogoCraft Studio · ScamShield AI.'],['type <b>open webcut</b> etc. to open one live.']];
 else if(q.indexOf('open ')===0){var key=q.slice(5).trim().replace(/\s+/g,'');var hit=null;Object.keys(LINKS).forEach(function(k){if(key&&(k.indexOf(key)>-1||key.indexOf(k)>-1))hit=k});if(key==='omni')hit='omnipress';
  if(hit){out=[['opening <b>'+hit+'</b> …','t-sys']];setTimeout(function(){var u=LINKS[hit];if(u.charAt(0)==='#')location.hash=u;else window.open(u,'_blank')},400)}else out=[['no build matches "'+key.replace(/</g,'&lt;')+'"','t-err']]}
 else if(q.indexOf('revenue')>-1||q.indexOf('money')>-1)out=[['₹20,00,000+ self-made by 18.'],['Sunora Aura alone: ₹14,92,450 · 1,285 orders ·'],['2.35% conv · ₹1,160 AOV · 28.6% returning.'],['scroll to THE RECEIPT and watch it print.']];
 else if(q.indexOf('body')>-1||q.indexOf('weight')>-1||q.indexOf('fitness')>-1)out=[['100 kg at 14 → 35 kg (overshoot) → 70 kg athletic.'],['400+ sessions. Now coaching others.'],['try the DISCIPLINE CALCULATOR in REBUILD.']];
 else if(q.indexOf('sudo hire')===0)out=[['[sudo] password for visitor: ********'],['ACCESS GRANTED — welcome aboard. 🤝'],['he replies fastest on WhatsApp.']];
 else if(q.indexOf('contact')>-1||q.indexOf('hire')>-1)out=[['email  : umerpv2007@gmail.com'],['phone  : +91 96333 16131'],['whats  : wa.me/919633316131'],['fastest: whatsapp. always.']];
 else if(q.indexOf('skill')>-1)out=[['vanilla JS · canvas · WebGL shaders ·'],['shopify/liquid · CRO · SEO ·'],['ffmpeg pipelines · tauri+react ·'],['motion design · discipline-as-a-service.']];
 else if(q.indexOf('time')>-1)out=[[new Date().toString(),'t-sys']];
 else if(q.indexOf('konami')>-1)out=[['rumour: ↑ ↑ ↓ ↓ ← → ← → B A','t-sys']];
 else if(q.indexOf('hello')===0||q==='hi'||q==='hey')out=[['hey. you found the twin. ask me anything — try <b>help</b>.']];
 else out=[['command not found: '+q.replace(/</g,'&lt;'),'t-err'],['type <b>help</b>.','t-sys']];
 out.forEach(function(line,i){setTimeout(function(){tPrint(line[0],line[1])},120*i)})});
var waShown=false,waKilled=false;
$('#waX').addEventListener('click',function(e){e.preventDefault();e.stopPropagation();waKilled=true;$('#waBubble').classList.remove('show')});
var railLinks=$$('.rail a');
var secIds=['top','manifesto','dossier','arsenal','holo','universe','buildmode','life','screens','commerce','receipt','crucible','rebuild','capabilities','lab','words','contact'];
var mqs=$$('.mq');


var tick=false,lastY=scrollY;
addEventListener('scroll',function(){if(tick)return;tick=true;
 requestAnimationFrame(function(){var y=scrollY,vh=innerHeight;var prog=y/(document.body.scrollHeight-vh);
  $('#pbar').style.width=(prog*100)+'%';
  document.getElementById('hudDepth').textContent=Math.round(prog*100)+'%';
  if(prog>.6){$('#rocket').classList.add('show')}else{$('#rocket').classList.remove('show')}
  if(prog>.6&&!waShown&&!waKilled){waShown=true;$('#waBubble').classList.add('show')}
  if(prog>.98&&!window.__done){window.__done=true;toast('YOU SAW EVERYTHING. HIRE HIM.')}
  var v=y-lastY;lastY=y;
  mqs.forEach(function(m){m.style.transform='skewY('+clamp(v*.08,-4,4)+'deg)'});
  chartBoost=lerp(chartBoost,1,.08);
  drawChart(clamp(map($('#revChart').getBoundingClientRect().top,vh*.9,vh*.25,0,1),0,1)*chartBoost);
  var mr=mani.getBoundingClientRect();var mp=clamp(map(mr.top,vh*.85,vh*.25,0,1),0,1);
  mWords.forEach(function(w,i){w.classList.toggle('on',mp>(i/mWords.length))});
  $$('.sec').forEach(function(s){var r=s.getBoundingClientRect();s.classList.toggle('far',(r.bottom<0||r.top>vh))});
  var pr=$('#receipt').getBoundingClientRect();
  if(pr.top<vh&&pr.bottom>0){var pp=clamp(-pr.top/(pr.height-vh),0,1);var rp=$('#receiptPaper');rp.style.transform='translateY('+((1-pp)*102)+'%)';if(pp>=.99&&!rp.classList.contains('torn')){rp.classList.add('torn');blip(120)}}
  var sp=document.querySelector('.sig-svg path');
  if(sp){var sr=sp.getBoundingClientRect();if(sr.top<vh&&sr.bottom>0){var sp2=clamp(map(sr.top,vh*.9,vh*.3,0,1),0,1);sp.style.strokeDashoffset=1-sp2}}
  var tr=$('#tlTrack').parentElement.getBoundingClientRect();
  if(tr.top<vh&&tr.bottom>0){var wrapR=$('#tlTrack').parentElement.parentElement.getBoundingClientRect();var tp=clamp(-wrapR.top/(wrapR.height-vh),0,1);var max=$('#tlTrack').scrollWidth-innerWidth;$('#tlTrack').style.transform='translateX('+(-tp*max)+'px)'}
  if(cruc.getBoundingClientRect().top<vh&&cruc.getBoundingClientRect().bottom>0)crucible();
  var tilt=clamp(v*-.04,-6,6),i,el,r,c;
  var arows=$$('.arow');
  for(i=0;i<arows.length;i++){el=arows[i];r=el.getBoundingClientRect();if(r.bottom<-120||r.top>vh+120)continue;c=(r.top+r.height/2-vh/2)/vh;el.style.transform='perspective(1100px) rotateX('+tilt.toFixed(2)+'deg) translateY('+(c*26).toFixed(1)+'px)'}
  var strips=$$('.strip');
  for(i=0;i<strips.length;i++){el=strips[i];r=el.getBoundingClientRect();if(r.bottom<-80||r.top>vh+80)continue;c=(r.top+r.height/2-vh/2)/vh;el.style.transform='translateY('+(c*(i%2?34:-34)).toFixed(1)+'px)'}
  var capRows=$$('.cap-row');
  for(i=0;i<capRows.length;i++){el=capRows[i];r=el.getBoundingClientRect();if(r.bottom<-80||r.top>vh+80)continue;c=(r.top+r.height/2-vh/2)/vh;el.style.transform='translateX('+(c*46).toFixed(1)+'px)'}
  var kpiEls=$$('.kpi');
  for(i=0;i<kpiEls.length;i++){el=kpiEls[i];r=el.getBoundingClientRect();if(r.bottom<-80||r.top>vh+80)continue;c=(r.top+r.height/2-vh/2)/vh;el.style.transform='translateY('+(c*(i%2?14:-14)).toFixed(1)+'px)'}
  var cur=0;
  secIds.forEach(function(id,i){var el2=document.getElementById(id);if(el2&&el2.getBoundingClientRect().top<vh*.5)cur=i});
  window.__cur=cur;
  railLinks.forEach(function(a,i){a.classList.toggle('on',i===cur)});
  railLinks.forEach(function(a){a.dataset.p=Math.round(prog*100)+'%'});
  tick=false});
},{passive:true});
if(location.hash){var t=document.querySelector(location.hash);if(t){t.classList.add('flash');setTimeout(function(){t.classList.remove('flash')},1200)}}
addEventListener('hashchange',function(){var t=document.querySelector(location.hash);if(t){t.classList.add('flash');setTimeout(function(){t.classList.remove('flash')},1200)}});
var linePath=$('#linePath');
(function loop(){
 if(FINE){gx=lerp(gx,mx,.07);gy=lerp(gy,my,.07);glow.style.transform='translate('+gx+'px,'+gy+'px) translate(-50%,-50%)'}
 if(!galDragging&&!galHover&&Date.now()-galLast>5000){galLast=Date.now();galTarget+=1}
 galCur=lerp(galCur,galTarget,.12);
 galRender();
 requestAnimationFrame(loop)})();
['mq1','mq2'].forEach(function(id){var t=document.getElementById(id);t.innerHTML+=t.innerHTML});
$$('.strip-track').forEach(function(t){t.innerHTML+=t.innerHTML});
function clock(){var s=new Date().toLocaleTimeString('en-GB');$('#navTime').textContent=s;$('#footTime').textContent=s+' LOCAL'}
clock();setInterval(clock,1000);
drawChart(0);
galRender();
  if(UmerPortfolio.Core&&UmerPortfolio.Core.assetIntegrity){setTimeout(UmerPortfolio.Core.assetIntegrity.scan,1200)}
})();
