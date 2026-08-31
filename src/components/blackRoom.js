(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded',function(){
    var room=document.getElementById('blackRoom'),close=document.getElementById('blackRoomX'); if(!room)return;
    function open(){room.hidden=false;room.classList.add('open');document.body.style.overflow='hidden'}
    function hide(){room.classList.remove('open');room.hidden=true;document.body.style.overflow=''}
    close.addEventListener('click',hide);room.addEventListener('click',function(e){if(e.target===room)hide()});
    room.querySelectorAll('[data-jump]').forEach(function(b){b.addEventListener('click',function(){hide();location.hash=b.dataset.jump.slice(1)})});
    document.addEventListener('keydown',function(e){if(e.target&&(/input|textarea|select/i.test(e.target.tagName)))return;if(e.key.toLowerCase()==='b'){if(room.hidden)open();else hide()}if(e.key==='Escape'&&!room.hidden)hide()});
  });
})();
