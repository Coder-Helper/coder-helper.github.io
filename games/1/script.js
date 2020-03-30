var resultTxt;
var balanceTxt;
var choiceTxt;
var betTxt;

var redBtn;
var greenBtn;
var blackBtn;

var col;

var result;
var selection = '';
var balance;
var bet;

var recentCircs = [,,,,,,,,,];
var recents     = [,,,,,,,,,];
var rCnt = 0;

var greenHex = '#05AC54';

var wheelSlots = [];
//var slotIds = ['s0','s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13','s14','s15','s16','s17','s18','s19','s20','s21','s22','s23','s24','s25','s26','s27','s28','s28','s29'];

var slotId2 = [];

var amntNew = 120;

var landOffset = 24;
var slotRand = [];
var idCnt = 0;

var wheel;
var wb;

var theWnr;
var winnings;
var winlose;

var instructionPage;

function allin()
{

    if(balance > 0)
    {
    bet += balance;
    balance = 0;
    setBet();
    }
}

function openRules()
{
    instructionPage.style.visibility='visible';
}

function onLoad()
{
    
    balance = prompt("Укажите, сколько денег(виртуальных) у Вас будет в начале игры (500 - рекомендуемая сумма)","500");
    balance = parseInt(balance);
    winlose = document.getElementById('winlose');
    winnings = document.getElementById('winnings');

    winnings.style.visibility ='hidden';
    winlose.style.visibility = 'hidden';

wb = document.getElementById('wheelback')
wb.style.visibility = 'hidden';
for(i=0;i< amntNew;i++)
{    
var slotParent = document.getElementsByTagName
("tr");
 var newSlot = document.createElement('td');
 var newId = 's'+idCnt;
 slotId2[idCnt] = newId;
 newSlot.setAttribute('id', newId);
 newSlot.innerHTML = "new";
 slotparent.appendChild(newSlot);
 idCnt++;
}


for(i=0;i < slotId2.length-1;i++){
    wheelSlots[i] = document.getElementById(slotId2[i]);
}

wheel = document.getElementById('wheel');
wheel.style.visibility = 'hidden';

recentCircs[0] = document.getElementById('c0');
recentCircs[1] = document.getElementById('c1');
recentCircs[2] = document.getElementById('c2');
recentCircs[3] = document.getElementById('c3');
recentCircs[4] = document.getElementById('c4');
recentCircs[5] = document.getElementById('c5');
recentCircs[6] = document.getElementById('c6');
recentCircs[7] = document.getElementById('c7');
recentCircs[8] = document.getElementById('c8');
recentCircs[9] = document.getElementById('c9');

instructionPage = document.getElementById('instructions');

instructionPage.style.visibility='hidden';

redBtn = document.getElementById('redbtn');
greenBtn = document.getElementById('greenbtn');
blackBtn = document.getElementById('blackbtn');

resultTxt = document.getElementById('result');
balanceTxt = document.getElementById('money');
//choiceTxt =document.getElementById('choice');
//choiceTxt.style.visibility = 'hidden';
betTxt = document.getElementById('wager');

//balance = 500;
bet = 0;

setBet();
//spin();
}

/*function spinAnim(){
    var distance = 1000;
    var speed = 2;
    var pos = 0;
    var id = setInterval(frame, 1);
    function frame(){
        if(pos == distance){
            clearInterval();
        }
        else{
            
            if(distance > distance * .75){
                speed = 1;
            }
            pos++;
            wheel.style.right = (pos * speed) + 'vw';
        }
    }
    
}*/

function closeWheel()
{
    wheel.style.visibility = 'hidden';
    wb.style.visibility = 'hidden';
    winnings.style.visibility ='hidden';
    winlose.style.visibility = 'hidden';
    bet = 0;
    setBet();
    
    //addMore();
    
}

function winText()
{
    winnings.style.visibility = 'visible';
    winlose.style.visibility = 'visible';
    
    if(theWnr == selection){
        winlose.innerHTML = "Поздравляем! 😃";
        if(theWnr == 'green'){
        winnings.innerHTML = '+$' + (bet * 15);
        }
        else{
            winnings.innerHTML = '+$' + (bet * 2);
        }
    }
    else{
        winlose.innerHTML ="Сочувствуем... 😞"
        winnings.innerHTML = '-$' + bet;
    }
}

function spin(){
    
    "use strict";
    wb.style.visibility = 'visible';
    wheel.style.visibility = 'visible';
    wheel.style.WebkitAnimationPlayState = "paused";
    //setTimeout(restartAnim, 2000);
    
    
    wheel.style.animation = 'true';
    wheel.offsetHeight;
    wheel.style.animation = null;
    
    setTimeout(winText, 3500);
    setTimeout(closeWheel, 5000);
    
    
    //setTimeout(closeWheel, 3500);
    
    for(i = 0; i < wheelSlots.length; i++)
    {
        var randTemp = Math.floor(Math.random() * Math.floor(15));
        slotRand[i] = randTemp;
        switch (randTemp){
            case 0:
            case 2:
            case 4:
            case 6:
            case 8:
            case 10:
            case 12:
                wheelSlots[i].style.backgroundColor = 'black';
                break;
            case 1:
            case 3:
            case 5:
            case 7:
            case 9:
            case 11:
            case 13:
                wheelSlots[i].style.backgroundColor = 'red';
                break;
            case 14:
                wheelSlots[i].style.backgroundColor = greenHex;
                break;
        }
    }
    for(i = 0; i < wheelSlots.length; i++)
    {
     wheelSlots[i].innerHTML = slotRand[i] + 1;
    }
    wheelSlots[wheelSlots.length - landOffset].innerHTML = result + 1;
    wheelSlots[wheelSlots.length -landOffset].style.backgroundColor = col;
    wheelSlots[wheelSlots.length - landOffset].style.borderWidth = '6px';
    
}

function closeInst()
{
    instructionPage.style.visibility='hidden';
}

function newRecent(color)
{
    //if(rCnt > 9){
        
    for(i = recents.length - 1; i > 0; i--)
    {
        recents[i] = recents[i-1];
        recentCircs[i].innerHTML = recentCircs[i-1].innerHTML;
        recentCircs[i].style.color = 'white';
        
    }
    recents[0] = color;
    recentCircs[0].innerHTML = result + 1;
    recentCircs[0].style.color = 'white';
    //alert(recents);
    //}
    //else{
    //recents[rCnt] = color;
    //rCnt++;
    //alert(recents + 'normal fill');
        //alert(recents.length);
    //}
    for(i = 0; i < recents.length ; i++)
    {
        if(recents[i] == 'green')
        {
            recentCircs[i].style.backgroundColor = greenHex;
        }
         else if(recents[i] == 'red')
        {
            recentCircs[i].style.backgroundColor = 'red';
        }
         else if(recents[i] == 'black')
        {
            recentCircs[i].style.backgroundColor = 'black';
        }
        
        
    }
    
}

function choose(color)
{
    switch(color)
    {
    case 'red':
        selection = 'red';
        //redBtn.style.fontSize = '20px';
        //blackBtn.style.fontSize = '12px';
        //greenBtn.style.fontSize = '12px';
        redBtn.style.borderWidth = '4px';
        blackBtn.style.borderWidth = '1px';
        greenBtn.style.borderWidth = '1px';
        break;
    case 'black':
        selection = 'black';
        //redBtn.style.fontSize = '12px';
        //blackBtn.style.fontSize = '20px';
        //greenBtn.style.fontSize = '12px';
        redBtn.style.borderWidth = '1px';
        blackBtn.style.borderWidth = '4px';
        greenBtn.style.borderWidth = '1px';
        break;
    case 'green':
        selection = 'green';
        //redBtn.style.fontSize = '12px';
        //blackBtn.style.fontSize = '12px';
        //greenBtn.style.fontSize = '20px';
        redBtn.style.borderWidth = '1px';
        blackBtn.style.borderWidth = '1px';
        greenBtn.style.borderWidth = '4px';
        break;
    }
    //choiceTxt.innerHTML = 'Color: ' + selection;
}

function changeBet(change)
{

    addMore();
    if(change < 0)
    {
        if(bet >= Math.abs(change))
        {
            bet += change;
            balance -= change;
            setBet();
        }
    }
    else if(balance >= change)
    {
        bet += change;
        balance -= change;
        setBet();
    }
}

function addMore(){
    if(bet <= 0 && balance <= 0){
    alert ("Вы банкрот 😞")
    balance = prompt("Хотите пополнить свой баланс?", "500");
    balance = parseInt(balance);
}
setBet();
}

function placeBet()
{

addMore();

if(selection == '')
{
alert('Вам нужно указать цвет!');
return;
}
else{
    if(balance == 0 && bet == 0)
    {
        alert("У вас нет денег!");
    }
else
{

if(bet > 0)
{
    getRand(15);
    
    switch(result)
    {
        case 0:
        case 2:
        case 4:
        case 6:
        case 8:
        case 10:
        case 12:
            win('black');
            col = 'black';
            newRecent('black');
            fnt = 'white';
            break;
        case 1:
        case 3:
        case 5:
        case 7:
        case 9:
        case 11:
        case 13:
            win('red');
            col = 'red';
            newRecent('red');
            fnt = 'white';
            break;
        case 14:
            win('green');
            col = greenHex;
            newRecent('green');
            fnt = 'black';
            break;
    }
    spin();
}        
    
}
}

}

function win(winner)
{
    theWnr = winner;
    resultTxt.innerHTML = 'Result: ' + winner;
    if(selection == 'red' && winner == 'red')
    {
        balance += (bet * 2);
        
    } 
    else if(selection == 'black' && winner == 'black')
    {
        balance += (bet * 2);
        
    }
    else if(selection == 'green' && winner == 'green')
    {
        balance += ((bet * 15));
        
    }
    else{
        setBet();
    }
    
    setBal();
}

function setBal()
{
    balanceTxt.innerHTML = '$' + balance;
}

function setBet()
{
    betTxt.innerHTML = '$' + bet;
    setBal();
}
function getRand(max){
    result = Math.floor(Math.random() * Math.floor(max));
}