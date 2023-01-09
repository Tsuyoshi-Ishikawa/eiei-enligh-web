export const speak = (text: string, callback: () => void) => {
  const voices = speechSynthesis.getVoices();
  const voice = voices.find((voice) => {
    if (voice.name === 'Samantha' || voice.name === 'Victoria') return true;
    return false;
  });

  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.lang = 'en-US';
  utterance.rate = 1;
  utterance.pitch = 1.2;
  if (voice) utterance.voice = voice;
  speechSynthesis.speak(utterance);
  utterance.onend = (event) => {
    callback();
    console.log(`Utterance has finished being spoken after ${event.elapsedTime} seconds.`);
  };
};