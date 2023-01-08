import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from '@/components/atoms';
import { LoadingModal, ErrorModal } from '@/components/organisms';
import { usePostChatGpt } from '@/hooks';
import { handleError, setComment, speak, commentHistory } from '@/utils';

export default function Home() {
  const [errMessage, setErrMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const {
    postChatGpt,
    isLoading,
    errorMessage: chatGptErrorMessage,
  } = usePostChatGpt();
  
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

  useEffect(() => {
    if (chatGptErrorMessage) {
      setErrMessage(chatGptErrorMessage);
      setIsError(true);
    }
  }, [errMessage, chatGptErrorMessage]);

  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-GB',
    });
  };
  const askChatGpt = async () => {
    try {
      SpeechRecognition.stopListening();
      if (!transcript) throw new Error('You have to talk at least one phrase.');
      const res = await postChatGpt({ prompt: transcript }); // todo: use graphql
      const answer = res.answer as string;
      if (!answer) throw new Error('Sorry. Chat Answer is empty.');
      speak(answer);
      setComment({
        isUser: true,
        text: transcript,
      });
      setComment({
        isUser: false,
        text: answer,
      });
    } catch (e) {
      handleError(e, setErrMessage)
    }
    resetTranscript();
  };
  return (
    <>
      {isLoading && <LoadingModal />}
      {isError && <ErrorModal errorMessage={errMessage} setModalState={setIsError} />}
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
      <div>
        {commentHistory.map((comment, index) => {
          if (comment.isUser) {
            return (
              <div key={index}>You: { comment.text}</div>
            )
          } else {
            return (
              <div key={index}>AI: { comment.text}</div>
            )
          }
        })}
      </div>
    </>
  );
}
