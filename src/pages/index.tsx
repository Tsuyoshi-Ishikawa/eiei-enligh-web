import React, { useEffect, useState } from 'react';
import Image from 'next/future/image';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button } from '@/components/atoms';
import { LoadingModal, ErrorModal, Chat } from '@/components/organisms';
import { usePostChatGpt } from '@/hooks';
import { handleError, setChat, speak, chatHistory } from '@/utils';

export default function Home() {
  const [errMessage, setErrMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const {
    postChatGpt,
    isLoading,
    errorMessage: chatGptErrorMessage,
  } = usePostChatGpt();
  
  const {
    transcript,
    resetTranscript,
  } = useSpeechRecognition();


  // const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  // const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  // const [recording, setRecording] = useState(false);
  

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      setErrMessage('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
      setIsError(true);
    }


    // navigator.mediaDevices
    //   .getUserMedia({ audio: true })
    //   .then((stream) => {
    //     const newRecorder = new MediaRecorder(stream);
    //     setRecorder(newRecorder);
    //     newRecorder.addEventListener('dataavailable', (event) => {
    //       console.log("data dataavailable called.");
    //       setAudioBlob(event.data);
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
      // const res = await postChatGpt({ prompt: 'Hi! Nice to meet you.' });
      SpeechRecognition.stopListening();
      if (!transcript) throw new Error('You have to talk at least one phrase.');
      const res = await postChatGpt({ prompt: transcript }); // todo: use graphql
      const answer = res.answer as string;
      if (!answer) throw new Error('Sorry. Chat Answer is empty.');

      setIsSpeaking(true);
      const callback = () => {
        setIsSpeaking(false);
      };

      speak(answer, callback);
      setChat({
        userComment: transcript,
        aiComment: answer
      });
    } catch (e) {
      setIsError(true);
      handleError(e, setErrMessage)
    }
    resetTranscript();
  };

  // const startRecording = () => {
  //   if (recorder) {
  //     setRecording(true);
  //     recorder.start();
  //   }
  // };

  // const stopRecording = () => {
  //   if (recorder) {
  //     setRecording(false);
  //     recorder.stop();
  //   }
  // };

  return (
    <div className='space-y-8 text-sm md:text-base lg:text-lg xl:text-xl lg:text-lg'>
      {isLoading && <LoadingModal />}
      {isError &&
        <ErrorModal
          errorMessage={errMessage}
          setModalState={setIsError}
        />
      }
      <div className='flex justify-center items-center'>
        {!isSpeaking &&
          <Image
            src='https://media.giphy.com/media/EdqFrdeIIFdLKhAxaM/giphy.gif'
            alt='Girl'
            width={500} height={500}
          />
        }
        {isSpeaking && <Image
            src="https://media.giphy.com/media/WremZ4D6Th94U9zuV6/giphy.gif"
            alt="Girl Speaking"
            width={500} height={500}
          />
        }
      </div>
      <div className='flex justify-center items-center space-x-2'>
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
        <Chat chats={chatHistory}/>
      </div>
    </div>

    /* <div className='space-y-8 text-sm md:text-base lg:text-lg xl:text-xl lg:text-lg'>
    {isLoading && <LoadingModal />}
    {isError &&
      <ErrorModal
        errorMessage={errMessage}
        setModalState={setIsError}
      />
    }
    <div className='flex justify-center items-center'>
      {!recording &&
        <Image
          src='https://media.giphy.com/media/EdqFrdeIIFdLKhAxaM/giphy.gif'
          alt='Girl'
          width={500} height={500}
        />
      }
      {recording && <Image
          src="https://media.giphy.com/media/WremZ4D6Th94U9zuV6/giphy.gif"
          alt="Girl Speaking"
          width={500} height={500}
        />
      }
    </div>
    <div className='flex justify-center items-center space-x-2'>
      <Button
        handleClick={startRecording}
      >
        Speech
      </Button>
      <Button
        handleClick={stopRecording}
      >
        Get Response
      </Button>
    </div>
    {audioBlob && <audio src={URL.createObjectURL(audioBlob)} controls />}
    <div>
      <Chat chats={chatHistory}/>
    </div>
    </div> */
  );
}
