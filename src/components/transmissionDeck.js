/* CLIENT TESTIMONIAL / TRANSMISSION DECK */
(function(w){
  var U=w.UmerPortfolio,Q=U&&U.Utils;
  if(!Q)return;
  Q.ready(function(){
    /* Correct the legacy biography wording everywhere in rendered text. */
    var root=document.body,walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),node;
    while((node=walker.nextNode())){
      var t=node.nodeValue;
      if(!t)continue;
      node.nodeValue=t
        .replace(/I\s+was\s+raised\s+in\s+(?:the\s+)?UAE/gi,'I spent parts of my childhood and adolescence in the UAE')
        .replace(/I\s+was\s+raised\s+in\s+(?:the\s+)?United Arab Emirates/gi,'I spent parts of my childhood and adolescence in the UAE')
        .replace(/(?:raised|grew up)\s+in\s+(?:the\s+)?UAE/gi,'spent parts of my childhood and adolescence in the UAE')
        .replace(/(?:raised|grew up)\s+in\s+(?:the\s+)?United Arab Emirates/gi,'spent parts of my childhood and adolescence in the UAE')
        .replace(/UAE[-\s]+raised/gi,'spent parts of my childhood and adolescence in the UAE');
    }

    var deck=document.querySelector('.transmissions-deck');
    var cards=deck?Q.$$('.transmissions-deck .quote'):[];
    if(!deck||!cards.length)return;

    /*
      The old renderer positioned the incoming card relative to the CARD height.
      That made the next card enter the middle of the current card, producing the
      broken overlap seen on mobile and desktop. This renderer uses the viewport as
      the movement unit: every transition starts with the next card completely
      below the viewport, then brings it to the exact center while the old card
      recedes behind it.
    */
    var raf=0,deckTop=0,deckHeight=0,vh=0,n=cards.length;
    var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;

    function viewport(){return Math.max(320,window.innerHeight||document.documentElement.clientHeight||720);}

    function measure(){
      vh=viewport();
      deckTop=deck.getBoundingClientRect().top+(window.scrollY||window.pageYOffset||0);
      /* One full viewport for each card. */
      deckHeight=vh*n;
      deck.style.height=deckHeight+'px';
      deck.style.minHeight=deckHeight+'px';
      render();
    }

    function render(){
      raf=0;
      var y=(window.scrollY||window.pageYOffset||0)-deckTop;
      var travel=Math.max(1,deckHeight-vh);
      var p=Q.clamp(y/travel,0,1);
      var stage=p*(n-1);
      var active=Math.min(n-1,Math.floor(stage));
      var frac=active===n-1?0:stage-active;

      for(var i=0;i<n;i++){
        var card=cards[i];
        var cardH=card.offsetHeight||Math.min(vh*.62,560);
        var yoff=0,scale=1,rot=0,opacity=1,z=10,blur=0;

        if(i<active){
          /* Completed cards settle behind the current one. */
          var behind=active-i;
          yoff=-Math.min(vh*.10,28+behind*10);
          scale=Math.max(.90,1-behind*.035);
          rot=-Math.min(2.2,behind*.75);
          opacity=Math.max(.34,1-behind*.16);
          z=20-behind;
          blur=Math.min(1.2,behind*.35);
        }else if(i===active){
          /* Current card yields backwards as the incoming card takes over. */
          yoff=-frac*Math.min(vh*.075,54);
          scale=1-frac*.055;
          rot=-frac*1.35;
          opacity=1-frac*.18;
          z=100;
          blur=frac*.55;
        }else if(i===active+1){
          /* Incoming card begins BELOW the entire viewport, not inside the card. */
          var start=vh+cardH*.55;
          yoff=(1-frac)*start;
          scale=.965+frac*.035;
          rot=(1-frac)*2.0;
          opacity=.98;
          z=200;
          blur=(1-frac)*.8;
        }else{
          /* Future cards stay completely out of the way. */
          var ahead=i-active-1;
          yoff=vh+cardH*.55+ahead*24;
          scale=.965;
          rot=2;
          opacity=0;
          z=1;
          blur=1;
        }

        if(reduced){
          yoff=i===active?0:(i===active+1?(1-frac)*(vh+cardH*.55):vh+cardH);
          scale=1;rot=0;blur=0;opacity=i===active||i===active+1?1:0;
        }

        card.style.transform='translate3d(-50%,calc(-50% + '+yoff.toFixed(2)+'px),0) rotateZ('+rot.toFixed(2)+'deg) scale('+scale.toFixed(4)+')';
        card.style.opacity=opacity.toFixed(3);
        card.style.zIndex=String(z);
        card.style.filter=blur>0?'blur('+blur.toFixed(2)+'px)':'none';
        card.classList.toggle('is-active',i===active);
      }
    }

    function schedule(){if(raf)return;raf=requestAnimationFrame(render);}

    /* Hard CSS contract so no legacy transition/position rule can fight JS. */
    if(!document.getElementById('transmission-stack-fix')){
      var style=document.createElement('style');
      style.id='transmission-stack-fix';
      style.textContent='\
.transmissions-deck{position:relative!important;display:block!important;overflow:hidden!important;isolation:isolate!important;}\
.transmissions-deck .quote{position:absolute!important;left:50%!important;top:50%!important;margin:0!important;transition:none!important;animation:none!important;will-change:transform,opacity,filter!important;backface-visibility:hidden!important;transform-origin:center center!important;}\
@media(max-width:700px){.transmissions-deck .quote{width:min(92vw,620px)!important;max-width:92vw!important;}}';
      document.head.appendChild(style);
    }

    measure();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',measure,{passive:true});
    window.addEventListener('orientationchange',function(){setTimeout(measure,80)},{passive:true});
    if(window.visualViewport)window.visualViewport.addEventListener('resize',measure,{passive:true});
    if(window.ResizeObserver){
      var ro=new ResizeObserver(function(){
        /* Ignore our own height write; only remeasure when card dimensions change. */
        var next=viewport();
        if(Math.abs(next-vh)>1)measure();
      });
      ro.observe(deck);
    }
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);

    U.Components=U.Components||{};
    U.Components.transmissionDeck={render:render,measure:measure};
  });
})(window);
