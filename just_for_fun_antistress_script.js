var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var friction = 0.7;
var gravity = 1;
function random(min,max) {
    return Math.floor(Math.random()*(max -min +1) + min);
}
var colorArray = [
    "#7ECEFD",
    "#FFF6E5",
    "#FF7F66",
    "#024959",
    "#FFFFFA",
    "#F24C27",
    "#5F5448"
];
window.addEventListener("resize",function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
var flag =1;
var mouse = {
    x:undefined,
    y:undefined
};
var circleArray2 = [];
window.addEventListener("click",function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    var radius = random(8,20);
    var dx = random(-2,2);
    var dy = random(-2,2);
    circleArray2.push(new Createcircle(mouse.x,mouse.y,dx,dy,radius));
    if(flag ===1) {
        animate2();
        flag = 2;
    }
});
function animate2() {
    requestAnimationFrame(animate2)
    for( var j = 0; j < circleArray2.length; j++) {
        circleArray2[j].update()
    }
}
function Createcircle(x,y,dx,dy,radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor((Math.random()*colorArray.length) )];
    this.draw = function() {
        c.beginPath();
c.arc(this.x,this.y,this.radius,0,2*Math.PI);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    };
    this.update = function() {
        if(this.y + this.radius + this.dy > canvas.height ) {
            this.dy = -this.dy*friction;
        } else {
            this.dy += gravity ;
        }
        if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0 ) {
            this.dx = -this.dx;
        }
        this.y += this.dy;
        this.x += this.dx;
        this.draw();
    }
}
var circleArray = [];
function init() {
    circleArray = [];
    for(var i = 0; i <10 ;i++) {
        var radius = random(8,20);
        var x = random(radius,canvas.width - radius);
        var y = random(0,canvas.height-radius);
        var dx = random(-2,2);
        var dy = random(-2,2);
        circleArray.push(new Createcircle(x,y,dx,dy,radius));
    }
}
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    for(var j = 0; j < circleArray.length; j++) {
        circleArray[j].update()
    }
}
animate();
init();