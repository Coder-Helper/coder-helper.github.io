var computedC;
var computedM;
var computedY;
var computedK;

function hexToCMYK (hex) {
 computedC = 0;
 computedM = 0;
 computedY = 0;
 computedK = 0;

 hex = (hex.charAt(0)=="#") ? hex.substring(1,7) : hex;

 if (hex.length != 6)                  {alert ('Invalid length of the input hex value!'); return; }
 if (/[0-9a-f]{6}/i.test(hex) != true) {alert ('Invalid digits in the input hex value!'); return; }

 var r = parseInt(hex.substring(0,2),16); 
 var g = parseInt(hex.substring(2,4),16); 
 var b = parseInt(hex.substring(4,6),16); 

 // BLACK
 if (r==0 && g==0 && b==0) {
  computedK = 1;
  return [0,0,0,1];
 }

 computedC = 1 - (r/255);
 computedM = 1 - (g/255);
 computedY = 1 - (b/255);

 var minCMY = Math.min(computedC,Math.min(computedM,computedY));

 computedC = (computedC - minCMY) / (1 - minCMY) ;
 computedM = (computedM - minCMY) / (1 - minCMY) ;
 computedY = (computedY - minCMY) / (1 - minCMY) ;
 computedK = minCMY;

 return [computedC,computedM,computedY,computedK];
}
