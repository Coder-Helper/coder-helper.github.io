var tester;
var time;
var starter;
var result = 0;
var interval;
var timeout;
var best;
var worst;
var average;
var scores = [];
window.onload = function(){
        tester = document.getElementById("tester");
        starter = document.getElementById("starter");
        tester.onclick = test;
}
function test(){
    if(tester.style.backgroundColor=="rgb(255, 0, 0)"){
        scores.push(result);
        var sum = 0;
        var b = true;
        var w = true;
        for(var v=0; v<scores.length; v++){
            if(result>scores[v]){
                b = false;
            }
            if(result<scores[v]){
                w = false;
            }
            sum += scores[v];
        }
        if(b){
            best = result;
        }
        if(w){
            worst = result;
        }
        average = sum/scores.length;
        alert("Ваше текущее время реакции: "+result+"ms\nЛучшее: "+best+"ms\nХудшее: "+worst+"ms\nСреднее арифметическое всех Ваших реакций: "+average+"ms");
        result = 0;
        clearInterval(interval);
        tester.style.backgroundColor = "#0F0";
    }
    else if(tester.style.backgroundColor=="rgb(0, 255, 0)"){
        //Если нажал на зелёную кнопку
        alert("Фальстарт!");
        clearTimeout(timeout);
        tester.style.backgroundColor = "#00F";
    }
    starter.style.display = "block";
}
function start(){
    tester.style.backgroundColor = "#0F0";
    starter.style.display = "none";
    //рандомайзер
    time = Math.floor(Math.random()*10000+5000);
    timeout = setTimeout(change, time);
}
function change(){
    tester.style.backgroundColor = "#F00";
    interval = setInterval(function(){
        result += 1;
       // tester.innerHTML = result;
    }, 1);
}