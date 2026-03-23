const textEl = document.getElementById("text");
const inputEl = document.getElementById("input");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

const texts = [
"JavaScript makes web pages interactive and fun.",
"Practice coding daily to become a better developer.",
"Frontend development is all about creativity and logic.",
"Consistency is the key to success in programming."
];

let totalTime = 15;
let time = totalTime;
let timer = null;
let currentText = "";

function loadText(){
currentText = texts[Math.floor(Math.random()*texts.length)];

textEl.innerHTML = currentText.split("").map((char,i)=>{
return `<span class="${i===0 ? 'active' : ''}">${char}</span>`;
}).join("");
}

loadText();

inputEl.addEventListener("input", startTest);

function startTest(){

if(timer === null){
timer = setInterval(updateTime, 1000);
}

const input = inputEl.value;
const textSpans = textEl.querySelectorAll("span");

let correct = 0;

textSpans.forEach((char, index) => {

if(input[index] == null){
char.classList.remove("correct","wrong");
}
else if(input[index] === char.innerText){
char.classList.add("correct");
char.classList.remove("wrong");
correct++;
}
else{
char.classList.add("wrong");
char.classList.remove("correct");
}

char.classList.remove("active");
if(index === input.length){
char.classList.add("active");
}

});

updateStats(correct, input.length);

if(input.trim() === currentText.trim()){
clearInterval(timer);
inputEl.disabled = true;
showResult();
}

}

function updateTime(){
time--;
timeEl.innerText = time;

if(time === 0){
clearInterval(timer);
inputEl.disabled = true;
showResult();
}
}

function updateStats(correctChars, totalChars){

let minutes = (totalTime - time) / 60;

if(minutes === 0){
wpmEl.innerText = 0;
return;
}

let wpm = Math.round((correctChars / 5) / minutes);
wpmEl.innerText = isFinite(wpm) ? wpm : 0;

let accuracy = totalChars === 0 ? 100 : Math.round((correctChars / totalChars) * 100);
accuracyEl.innerText = accuracy;

}

function showResult(){

alert(`Time's up!\nWPM: ${wpmEl.innerText}\nAccuracy: ${accuracyEl.innerText}%`);

}

function resetTest(){

clearInterval(timer);
timer = null;

time = totalTime;

inputEl.value = "";
inputEl.disabled = false;

timeEl.innerText = totalTime;
wpmEl.innerText = 0;
accuracyEl.innerText = 100;

loadText();

}