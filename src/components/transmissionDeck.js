/* CLIENT TESTIMONIAL / TRANSMISSION DECK */
(function(w){
  var U=w.UmerPortfolio,Q=U.Utils;
  Q.ready(function(){
    var deck=document.querySelector('.transmissions-deck');
    var cards=deck?Q.$$('.transmissions-deck .quote'):[];
    if(!deck||!cards.length)return;

    function render(){
      var rr=deck.getBoundingClientRect();
      var total=Math.max(1,rr.height-innerHeight);
      var p=Q.clamp(-rr.top/total,0,1);
      var n=cards.length;
      var stage=p*(n-1);
      var active=Math.floor(stage);
      var frac=stage-active;

      for(var q=0;q<n;q++){
        var card=cards[q];
        var h=card.offsetHeight||Math.min(innerHeight*.62,560);
        var y=0,x=0,scale=1,rot=0,op=1,z=10,rx=0;

        if(q<active){
          var behind=active-q;
          y=-Math.min(h*.12,34+behind*14);
          scale=Math.max(.88,1-behind*.045);
          rot=-Math.min(2.5,behind*1.1);
          op=Math.max(.42,1-behind*.14);
          z=20-behind;
          rx=Math.min(3,behind*1.1);
        }else if(q===active){
          /* The current card yields backwards as the next card takes the front. */
          y=-frac*Math.min(h*.055,28);
          scale=1-frac*.045;
          rot=-frac*1.2;
          op=1-frac*.08;
          z=100-Math.round(frac*40);
          rx=-frac*1.5;
        }else if(q===active+1){
          /* The incoming card starts fully below the stage and rises cleanly. */
          y=(1-frac)*h*1.02;
          scale=.955+frac*.045;
          rot=(1-frac)*2.2;
          op=.98;
          z=200;
          rx=(1-frac)*2;
        }else{
          var ahead=q-active-1;
          y=h*(1.04+Math.min(ahead,2)*.035);
          scale=.95;
          rot=2.2;
          op=0;
          z=1;
          rx=2;
        }

        card.style.transform='translate3d(calc(-50% + '+x.toFixed(2)+'px),calc(-50% + '+y.toFixed(2)+'px),0) rotateX('+rx.toFixed(2)+'deg) rotateZ('+rot.toFixed(2)+'deg) scale('+scale.toFixed(4)+')';
        card.style.opacity=op.toFixed(3);
        card.style.filter=op<.9?'blur('+Math.min(1.4,(1-op)*3).toFixed(2)+'px) saturate(.94)':'none';
        card.style.zIndex=String(z);
        card.classList.toggle('is-active',q===active&&!frac);
      }
    }

    var tick=false;
    function schedule(){
      if(tick)return;
      tick=true;
      requestAnimationFrame(function(){render();tick=false;});
    }
    addEventListener('scroll',schedule,{passive:true});
    addEventListener('resize',schedule,{passive:true});
    if(window.ResizeObserver){
      var ro=new ResizeObserver(schedule);
      ro.observe(deck);
    }
    render();
    U.Components=U.Components||{};
    U.Components.transmissionDeck={render:render};
  });
})(window);
