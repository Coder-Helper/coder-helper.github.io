var rock = document.querySelector('.rock');
var paper = document.querySelector('.Paper');
var scissors = document.querySelector('.scissors');
var userScore_div = document.querySelector('.userScore');
var compScore_div = document.querySelector('.compScore');
var spantxt = document.querySelector('.spantxt');
var popapWin_div = document.querySelector('.popap-win');
var popapLose_div = document.querySelector('.popap-lose');
var close = document.querySelector('.close');
var repeat = document.querySelector('.return'); 
var oneMore = document.querySelector('.repeat');
var userScore = 0;
var compScore = 0;

function compGame(){
  const arr = ["r", "p", "s"];
  const result = Math.floor(Math.random() * 3);
  return arr[result];
}

function convert(letter) {
  if (letter === "r") { return "Камень" }
  if (letter === "p") { return "Бумага" }
  return "Ножницы"
}
function popapWin(){
  popapWin_div.style.top = "0px";
  popapWin_div.style.transition = "0.5s";
}
function popapLose(){
  popapLose_div.style.top = "0px";
  popapLose_div.style.transition = "0.5s";
}

function game(param){
  var c = compGame();
  console.log(param+c);
  convert(param, c);
  if (param+c === "rs" || param+c === "pr" || param+c === "sp") {
    userScore++;
    userScore_div.textContent = userScore;
    spantxt.textContent = convert(param)+ " " + "(Вы)" + " " + "бьет" + " " + convert(c) + " " + "(ИИ)" + "." + " " + "Ты выиграл.";
    document.getElementById(param).classList.add("green");
    setTimeout(() => {
      document.getElementById(param).classList.remove("green");
    }, 500)
    if (userScore == 10){
      popapWin();
    }
   }
  else if (param+c === "rr" || param+c === "pp" || param+c === "ss") {
    console.log("draw")
    spantxt.textContent = convert(param)+ " "+ "(Вы)" + " " + "и" + " " + convert(c) + " " + "(ИИ)" + " " + "." + " " + "Ничья.";
     document.getElementById(param).classList.add("grey");
    setTimeout(() => {
      document.getElementById(param).classList.remove("grey");
    }, 500)
  } else {
    compScore++;
    compScore_div.textContent = compScore;
    spantxt.textContent = convert(param)+ " " + "(Вы)" + " " + "не бьет" + " " + convert(c) + " " + "(ИИ)" + " " + "." + " " + "Ты проиграл.";
     document.getElementById(param).classList.add("red");
    setTimeout(() => {
      document.getElementById(param).classList.remove("red");
    }, 500)
     if (compScore == 10){
      popapLose();
    }
  }
}

rock.addEventListener('click', () => {
  game("r");
});

paper.addEventListener('click', () => {
  game("p");
});

scissors.addEventListener('click', () => {
  game("s");
});

document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains("close") || e.target.classList.contains("close_lose")) {
    console.log(e.target)
    popapWin_div.style.top = "9999px";
    popapWin_div.style.transition = "0.5s";
    popapLose_div.style.top = "9999px";
    popapLose_div.style.transition = "0.5s";
  }
});

document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains("return")) {
    popapLose_div.style.top = "9999px";
    popapLose_div.style.transition = "0.5s";
    popapWin_div.style.top = "9999px";
    popapWin_div.style.transition = "0.5s";
    userScore = 0;
    compScore = 0;
    userScore_div.textContent = userScore;
    compScore_div.textContent = compScore;
    spantxt.textContent = "";
   }
});

oneMore.addEventListener('click', () => {
  userScore = 0;
  compScore = 0;
  userScore_div.textContent = userScore;
  compScore_div.textContent = compScore;
  spantxt.textContent = "";
});