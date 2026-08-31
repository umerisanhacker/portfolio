(function(w){
  'use strict';
  var root=w.UmerPortfolio=w.UmerPortfolio||{}, D=root.Data, Q=root.Utils||{};
  function ready(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  ready(function(){
    var stage=document.getElementById('universeStage'),nodesEl=document.getElementById('universeNodes');
    if(!stage||!nodesEl||!D)return;
    var items=(D.HOLO_PROJECTS||[]).slice();
    var palette={cyan:'#63F6E7',violet:'#9B8CFF',magenta:'#FF5C8A',gold:'#F4B860'};
    var nodes=[],rot=0,targetRot=0,drag=false,lastX=0,lastT=0,vel=0;
    var status=document.getElementById('universeStatus'),project=document.getElementById('universeProject'),meta=document.getElementById('universeMeta');
    var mobile=innerWidth<760;

    function ringInfo(i,n){
      var counts=[6,6,5],start=0;
      for(var r=0;r<counts.length;r++){
        if(i<start+counts[r])return {ring:r,index:i-start,count:counts[r]};
        start+=counts[r];
      }
      return {ring:0,index:0,count:n};
    }
    function pos(i,n){
      var inf=ringInfo(i,n);
      var radiiX=mobile?[.43,.34,.26]:[.38,.30,.22];
      var radiiY=mobile?[.31,.24,.19]:[.28,.22,.16];
      var phase=[0,Math.PI/6,Math.PI/5][inf.ring];
      var a=(inf.index/inf.count)*Math.PI*2+phase+rot*.01745;
      return {x:50+Math.cos(a)*(radiiX[inf.ring]*100),y:50+Math.sin(a)*(radiiY[inf.ring]*100),z:Math.cos(a)};
    }
    function select(i,flash){
      nodes.forEach(function(o){o.el.classList.remove('active','flash');});
      var o=nodes[i];if(!o)return;
      o.el.classList.add('active');if(flash){void o.el.offsetWidth;o.el.classList.add('flash');}
      status.textContent=o.mode==='live'?'LIVE SIGNAL':o.mode==='internal'?'INTERNAL BUILD':'LOCAL BUILD';
      project.textContent=o.item[1];meta.textContent=o.item[2]+' · '+(o.mode==='local'?'NOT HOSTED YET':'READY');
    }
    items.forEach(function(item,i){
      var b=document.createElement('button');b.type='button';b.className='universe-node';
      b.style.setProperty('--node',palette[item[6]]||palette.cyan);
      b.innerHTML='<img src="'+item[3]+'" alt="" aria-hidden="true" loading="lazy" decoding="async"><span class="universe-node-shade"></span><span class="universe-node-copy"><b>'+item[1]+'</b><small>'+item[2]+'</small></span>';
      var mode=item[5]||'live';
      b.addEventListener('pointerenter',function(){select(i,false);});
      b.addEventListener('focus',function(){select(i,false);});
      b.addEventListener('click',function(e){e.stopPropagation();select(i,true);if(typeof w.openCase==='function')w.openCase(item[0]);});
      nodesEl.appendChild(b);nodes.push({el:b,item:item,mode:mode,phase:i});
    });
    var count=document.getElementById('universeCount');if(count)count.textContent=items.length;
    function render(){
      rot+=(targetRot-rot)*.08;targetRot+=vel*.08;vel*=.92;
      nodes.forEach(function(o,i){
        var p=pos(i,items.length);
        o.el.style.left=p.x+'%';o.el.style.top=p.y+'%';
        o.el.style.zIndex=String(10+Math.round((p.z+1)*20));
        o.el.style.opacity=(.58+.42*((p.z+1)/2)).toFixed(2);
        o.el.style.setProperty('--node-depth',((p.z+1)/2).toFixed(2));
      });
      requestAnimationFrame(render);
    }
    stage.addEventListener('pointerdown',function(e){drag=true;stage.classList.add('dragging');lastX=e.clientX;lastT=performance.now();try{stage.setPointerCapture(e.pointerId);}catch(_){} });
    stage.addEventListener('pointermove',function(e){if(!drag)return;var now=performance.now(),dx=e.clientX-lastX;vel=dx/Math.max(16,now-lastT)*2.2;targetRot+=dx*.45;lastX=e.clientX;lastT=now;});
    function end(){drag=false;stage.classList.remove('dragging');}
    stage.addEventListener('pointerup',end);stage.addEventListener('pointercancel',end);
    stage.addEventListener('wheel',function(e){if(innerWidth>760){e.preventDefault();targetRot+=e.deltaY*.06;}},{passive:false});
    var random=document.getElementById('universeRandom');if(random)random.addEventListener('click',function(){select(Math.floor(Math.random()*nodes.length),true);targetRot+=Math.random()*160-80;});
    var reset=document.getElementById('universeReset');if(reset)reset.addEventListener('click',function(){targetRot=0;vel=0;select(0,false);});
    addEventListener('resize',function(){mobile=innerWidth<760;},{passive:true});
    select(0,false);render();
  });
})(window);
