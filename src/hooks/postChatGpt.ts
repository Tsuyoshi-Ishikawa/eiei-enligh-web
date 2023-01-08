import { useCallback, useState } from 'react';
import { handleError } from '@/utils';

interface ChangePasswordState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

interface postChatGptProp {
  prompt: string;
}

export const usePostChatGpt = () => {
  const [state, setState] = useState<ChangePasswordState>({
    isLoading: false,
    isError: false,
    errorMessage: '',
  });

  // todo: use graphql
  const postChatGpt = useCallback(
    async ({
      prompt
    }: postChatGptProp) => {
      setState({ isLoading: true, isError: false, errorMessage: '' });

      try {
        const response = await fetch(
          '/api/chatGpt',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt: prompt})
          }
        );
        setState({ isLoading: false, isError: false, errorMessage: '' });
        return response.json();
      } catch (err) {
        const callback = (errMessage: string) => {
          setState({
            isLoading: false,
            isError: true,
            errorMessage: errMessage,
          });
        };
        handleError(err, callback);
      }
    },
    []
  );

  return {
    postChatGpt,
    ...state,
  };
};

