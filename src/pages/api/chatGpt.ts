// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { openai } from '@/config';
import { handleError } from '@/utils';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}

type Data = {
  answer?: string;
  error?: string;
  
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const prompt = req.body.prompt;
    const answer = await postChatGpt(prompt);
    res.status(200).json({ answer: answer });
  } catch (e) {
    if (e instanceof Error) 
      res.status(500).json({ error: e.message });
    res.status(500).json({ error: 'failed to load data' });
  }
}

const postChatGpt = async (prompt: string) => {
  prompt += ' Briefly answer in 100 words or less.';
  prompt +=
    ' Please return me one question to get the discussion on this topic going.';
  console.log(prompt);
  const completion = await openai.createCompletion({
    model: 'text-davinci-003', // GPT3.5
    prompt: prompt,
    temperature: 0,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  let text = '';
  completion.data.choices.forEach((choice) => {
    text += choice.text;
  });
  console.log('ChatGptAnswer is', text);
  return text;
};
