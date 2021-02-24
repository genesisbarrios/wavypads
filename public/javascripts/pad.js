//Author:Genesis Barrios
//09/2020

//this will be in the settings table. 
//whenever the user saves a session or song 
//this data will be saved together in another table
var gain = 5;
var reverb = 5;
var eq = 10;
var decay = 4;

var root; // let user choose
var familyOfTriads = [[0,4,7],[0,3,7],[0,3,6],[0,4,8]];

//Tone.js objects
//Synth
var synth = new Tone.Synth().toMaster();

//Chord PolySYnth
var synth2 = new Tone.PolySynth(3, Tone.Synth, {
    oscillator : {
      type : "sine"
    }
  });

//EQ
const filter = new Tone.Filter();
filter.set({
    frequency: eq,
    type: "lowpass"
});

//Reverb
var freeverb = new Tone.Freeverb();
freeverb.dampening.value = reverb;

// synth->filter->reverb->master
//synth2.connect(filter);  
synth2.connect(freeverb);
freeverb.connect(Tone.Master);

//setters
function setGain(num){
    gain = Math.round(num / 10);
    Tone.Master.volume.value = gain;
}

function setReverb(num){
    reverb = Math.round(num) * 100;
    freeverb.dampening.value = reverb;
    console.log(reverb);
}

function setEQ(num){
    eq = Math.round(num * 100);
    console.log(eq)
}

function setDecay(num){
    decay = Math.round(num / 10);
    console.log(decay);
}

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

//knobs event listeners
var knob1 = document.getElementById("knob1").children[0];//Decay
var knob2 = document.getElementById("knob2").children[0];//EQ
var knob3 = document.getElementById("knob3").children[0];//Reverb
var knob4 = document.getElementById("knob4").children[0];//Gain

knob1.addEventListener('change', function() {
    setDecay(knob1.value)
});

knob2.addEventListener('change', function() {
    setEQ(knob2.value)
});

knob3.addEventListener('change', function() {
    setReverb(knob3.value)
});

knob4.addEventListener('change', function() {
    setGain(knob4.value)
    console.log('gain set to ' + gain);
});

//Pad Press Listeners
var pads = document.querySelectorAll(".pad");
for (const pad of pads) {
    pad.addEventListener('click', function(event) {
        console.log('pad clicked');
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

//todo: make key input on midi pad display alphabet, but value be int for array indexing
function getNoteFromNum(num, key){
    var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

    return notes[key + num % 12 - 1];//key is our starting note. 
                                    //num is the number of the note(pad) 
                                    //in the scale that wants to be played.
                                    //minus 1 because the pads start at 1.
}

function getChordFromNum_MajorScale(num, key, octave){
    //todo: fix last note should be in next octave?

    var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    var padNumToNotesIndex = {//pad number corresponds to notes in scale which are indexed from notes array.
        1: 0,
        2: 2,
        3: 4,
        4: 5,
        5: 7,
        6: 8,
        7: 9,
        8: 0
      };

    var notesIndex = padNumToNotesIndex[num];
    var note = notes[key + notesIndex % 12];
    
    if(num == 1 || num == 4 || num == 5 || num == 8){//major chords
        var chord = [note + octave, notes[(key + notesIndex + 4) % 12] + octave, notes[(key + notesIndex + 7) % 12] + octave];
        return chord;
    }

    if(num == 2 || num == 3){//minor chords
        return [note + octave, notes[(key + notesIndex + 3) % 12] + octave, notes[(key + notesIndex + 7) % 12] + octave];
    }

    if(num == 7){//diminished
        return [note + octave, notes[(key + notesIndex + 3) % 12] + octave, notes[(key + notesIndex + 6) % 12] + octave];
    }
}

//play sound
//todo: add input for octave for octave to parameters
//todo: add key input from knob to parameters, and pass to getNoteFromNum() second parameter
//todo: set eq reverb gain
function playSound(num){
    var octave = 4;
    var chord = getChordFromNum_MajorScale(num, 0, octave);
    console.log(chord);
    console.log('play chord');
    synth2.triggerAttackRelease(chord, decay + 'n');
}

