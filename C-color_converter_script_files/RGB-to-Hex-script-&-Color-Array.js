function rgbToHex(R,G,B) { return toHex(R)+toHex(G)+toHex(B); }
function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}

function cutHex(h) { return (h.charAt(0)=="#") ? h.substring(1,7) : h}
function hexToR(h) { return parseInt((cutHex(h)).substring(0,2),16) }
function hexToG(h) { return parseInt((cutHex(h)).substring(2,4),16) }
function hexToB(h) { return parseInt((cutHex(h)).substring(4,6),16) }

function setBgColorById(id,sColor) {
 var elem;
 if (document.getElementById) {
  if (elem=document.getElementById(id)) {
   if (elem.style) elem.style.backgroundColor=sColor;
  }
 }
}
function toggleDiv(n) {
 var curState, el=document.getElementById('explanation'+n);
 if (el==null) return;
 if (el.style) {
  curState = el.style.visibility;
  if (curState == 'hidden') {
   el.style.visibility = 'visible';
   el.style.display    = 'inline';
  }
  else {
   el.style.visibility = 'hidden';
   el.style.display    = 'none';
  }
 }
 el=document.getElementById('i'+n);
}