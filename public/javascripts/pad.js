//Author:Genesis Barrios
//09/2020

var gain = 5;
var reverb = 5;
var eq = 10;

var keyToNumber = {
    "w": 1,
    "e": 2,
    "r": 3,
    "t": 4,
    "s": 5,
    "d": 6,
    "f": 7,
    "g": 8,
    "x": 9,
    "c": 10,
    "v": 11,
    "b": 12
  };

//Key Press Listener
document.addEventListener('keypress', getKey);

//Pad Press Listeners
var pads = document.querySelectorAll(".pad");
for (const pad of pads) {
    pad.addEventListener('click', function(event) {
      playSound(pad.id.replace("pad", ""));
    });
}

//Get Key Pressed
function getKey(e) {
  key = e.code;
  keyPressed(e.code);
}

//Convert Key to Num and playSound()
function keyPressed(code){
    var padNum = keyToNumber[code.replace("Key", "").toLowerCase()];
    playSound(padNum);
}

//play sound
function playSound(num){
    console.log(num);
}



