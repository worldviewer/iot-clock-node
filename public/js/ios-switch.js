var toggle = {
      el: document.getElementById("switch-wrap-1"), 
      hit: false,
      pos: 0
    },
    acceptableSwipeDistance = 80;

function toggleHit(t){
  /* Tells CSS it's time to use animations now. This prevents the initial animation on page load. */
  if(!t.hit) { t.hit = true; t.el.classList.add("hit"); }
};

/* Both mouse and touch devices will resolve to this event */
toggle.el.onclick = function(e){ toggleHit(toggle); };

/* Touch Events */
toggle.el.ontouchstart = function(e){ toggle.pos = e.touches[0].screenY; };
toggle.el.ontouchmove  = function(e){ e.preventDefault(); };
toggle.el.ontouchend   = function(e){
  var pos    = e.changedTouches[0].screenY,
      tpos   = toggle.pos,
      buffer = acceptableSwipeDistance;
  /* Check if the vertical movement was within acceptable distance to trigger a change. */
  if( pos <= (tpos + buffer) && pos >=  (tpos - buffer) ){
    e.preventDefault();
    e.target.click();   
  }else{
   toggle.pos = 0; 
  }
};