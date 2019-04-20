let lstm;
let textInput;
let lengthSlider;
let tempSlider;
let button;

function setup() {
  noCanvas();

  // Create the LSTM Generator passing it the model directory
  lstm = ml5.LSTMGenerator('/data/', modelReady);

  // Grab the DOM elements
  textInput = select('#seed');
  lengthSlider = select('#length');
  tempSlider = select('#chaosLevel');
  button = select('#generate');

  // DOM element events
  button.mousePressed(generate);
}

function modelReady() {
  select('#generate').removeAttribute('disabled');
  select('#generate').html('Generate Tweet');
}

// Generate new text
function generate() {
  // Update the status log
  select('#generate').attribute('disabled', '');
  select('#generate').html('Generating...')

  // Grab the original text
  let original = textInput.value();
  // Make it to lower case
  let txt = original.toLowerCase();

  // Check if there's something to send
  if (txt.length > 0) {
    // This is what the LSTM generator needs
    // Seed text, temperature, length to outputs
    // TODO: What are the defaults?
    let data = {
      seed: txt,
      temperature: tempSlider.value()/100,
      length: lengthSlider.value()
    };

    // Generate text with the lstm
    lstm.generate(data, gotData);

    // When it's done
    function gotData(err, result) {
      // Update the status log
      select('#generate').removeAttribute('disabled');
      select('#generate').html('Generate Tweet');

      $('#resultModal').modal('show');
      select('#result').html(txt + result);
    }
  } 
}