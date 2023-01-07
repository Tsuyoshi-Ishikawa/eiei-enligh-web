import { handleError, postChatGpt, speak } from '@/utils';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from '@/components/atoms';
import { LoadingModal, ErrorModal } from '@/components/organisms';

export default function Home() {
  const [errMessage, setErrMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    transcript,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      setErrMessage('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
      setIsError(true);
    }
  }, []);

  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB',
    });
  };
  const askChatGpt = async () => {
    try {
      setIsLoading(true);
      SpeechRecognition.stopListening();
      if (!transcript) throw new Error('You have to talk at least one phrase.');
      const answer = await postChatGpt(transcript);
      speak(answer);
    } catch (e) {
      handleError(e, setErrMessage);
    }
    resetTranscript();
    setIsLoading(false);
  };
  return (
    <div>
      {isLoading && <LoadingModal />}
      {isError && <ErrorModal errorMessage={errMessage} setModalState={setIsError} />}
      <div>
        <div>
          <Button
            handleClick={listenContinuously}
          >
            Speech
          </Button>
          <Button
            handleClick={askChatGpt}
          >
            Get Response
          </Button>
        </div>
      </div>
      <div>
        <span>{transcript}</span>
      </div>
    </div>
  );
}
