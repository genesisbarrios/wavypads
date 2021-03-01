var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wavy Pads', notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], octaves: [ 1, 2, 3, 4, 5, 6, 7], def: 4 , synths: ['FM Synth', 'AM Synth', 'Mono Synth', 'Synth'], defaultSynth: 'Synth'});
});

module.exports = router;
