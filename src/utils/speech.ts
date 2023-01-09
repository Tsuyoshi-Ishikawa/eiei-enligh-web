export const speak = (text: string, callback: () => void) => {
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.lang = 'en-US';
  utterance.rate = 1;
  utterance.pitch = 1.2;
  speechSynthesis.speak(utterance);
  utterance.onend = (event) => {
    callback();
    console.log(`Utterance has finished being spoken after ${event.elapsedTime} seconds.`);
  };
};