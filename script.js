const inputField = document.getElementById('input');
const submitButton = document.getElementById('submit');
const audioElement = document.getElementById('audio');

submitButton.addEventListener('click', () => {
  const userInput = inputField.value.trim();
  if (userInput !== '') {
    fetch(`https://api.ai.google.com/texttospeech/v1/text:synthesize?text=${userInput}&voice=en-US-Wavenet-C&audioConfig=mp3`)
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const audioContext = new AudioContext();
        const audioBufferSourceNode = audioContext.createBufferSource();
        audioBufferSourceNode.buffer = buffer;
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.5;
        audioBufferSourceNode.connect(gainNode);
        gainNode.connect(audioContext.destination);
        audioBufferSourceNode.start();
      });
    inputField.value = '';
  }
});