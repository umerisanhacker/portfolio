(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded',function(){
    var canvas=document.getElementById('labParticles'); if(!canvas)return;
    var ctx=canvas.getContext('2d'), rect, pts=[], pointer={x:-999,y:-999,down:false}, dpr=Math.min(2,window.devicePixelRatio||1);
    function resize(){var r=canvas.getBoundingClientRect();canvas.width=Math.floor(r.width*dpr);canvas.height=Math.floor(r.height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);rect=r}
    function reset(){pts=[];var w=canvas.getBoundingClientRect().width,h=canvas.getBoundingClientRect().height;for(var i=0;i<95;i++)pts.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:1+Math.random()*2})}
    function loop(){var w=canvas.clientWidth,h=canvas.clientHeight;ctx.clearRect(0,0,w,h);var grad=ctx.createRadialGradient(w*.5,h*.5,0,w*.5,h*.5,Math.max(w,h)*.6);grad.addColorStop(0,'rgba(99,246,231,.08)');grad.addColorStop(1,'rgba(5,8,17,0)');ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
      pts.forEach(function(p){var dx=pointer.x-p.x,dy=pointer.y-p.y,dist=Math.hypot(dx,dy);if(dist<180&&dist>2){var f=(180-dist)/180*.035;p.vx+=dx/dist*f;p.vy+=dy/dist*f}p.vx*=.995;p.vy*=.995;p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(99,246,231,.65)';ctx.fill()});
      for(var i=0;i<pts.length;i++)for(var j=i+1;j<pts.length;j++){var dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.hypot(dx,dy);if(d<76){ctx.strokeStyle='rgba(155,140,255,'+(1-d/76)*.16+')';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke()}}
      requestAnimationFrame(loop);
    }
    function move(e){var r=canvas.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top}
    canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerleave',function(){pointer.x=-999;pointer.y=-999});canvas.addEventListener('pointerdown',function(){pointer.down=true});window.addEventListener('resize',function(){resize();reset()});resize();reset();loop();
    document.querySelectorAll('.lab-reset[data-reset="particles"]').forEach(function(b){b.addEventListener('click',reset)});
    var ti=document.getElementById('typeInput'),to=document.getElementById('typeOut'),tr=document.getElementById('typeRange'),tv=document.getElementById('typeVal');
    function syncType(){to.textContent=(ti.value||'UMER').toUpperCase();to.style.fontSize=tr.value+'px';tv.textContent=tr.value+'PX'} ti.addEventListener('input',syncType);tr.addEventListener('input',syncType);syncType();
    var cp=document.getElementById('colorPreview');function syncColor(){var c=+document.querySelector('[data-col="c"]').value,v=+document.querySelector('[data-col="v"]').value,m=+document.querySelector('[data-col="m"]').value;cp.style.background='conic-gradient(from 180deg,rgba(99,246,231,'+(c/100)+'),rgba(155,140,255,'+(v/100)+'),rgba(255,92,138,'+(m/100)+'),#F4B860,rgba(99,246,231,'+(c/100)+'))'}document.querySelectorAll('[data-col]').forEach(function(i){i.addEventListener('input',syncColor)});syncColor();document.querySelectorAll('.lab-reset[data-reset="color"]').forEach(function(b){b.addEventListener('click',function(){document.querySelector('[data-col="c"]').value=80;document.querySelector('[data-col="v"]').value=65;document.querySelector('[data-col="m"]').value=35;syncColor()})});
  });
})();
