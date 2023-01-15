import { Configuration, OpenAIApi } from 'openai';
import { Deepgram } from '@deepgram/sdk';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

const DEEPGRAM_API_KEY = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY ?? '';
export const deepgram = new Deepgram(DEEPGRAM_API_KEY);