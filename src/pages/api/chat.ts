// /pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { messages, mode }: { messages: any[]; mode: 'lite' | 'power' } = JSON.parse(req.body);

    const completion = await openai.chat.completions.create({
      model: mode === 'power' ? 'gpt-4' : 'gpt-3.5-turbo',
      messages,
    });

    const response = completion.choices[0].message?.content ?? '[No response from GPT]';

    res.status(200).json({ response });
  } catch (error: any) {
    console.error('GPT API error:', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
