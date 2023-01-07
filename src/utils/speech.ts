export const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.lang = 'en-US';
  utterance.rate = 1;
  utterance.pitch = 1.2;
  speechSynthesis.speak(utterance)
};