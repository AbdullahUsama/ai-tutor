import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export interface ChatContext {
  subject: string;
  chapter: string;
  topic: string;
}

export async function getChatResponse(message: string, context: ChatContext) {
  try {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error("API key is not configured");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an AI tutor helping a student understand ${context.subject}, 
specifically the chapter on ${context.chapter} and the topic of ${context.topic}.
The student's message is: "${message}"

Provide a helpful, educational response that:
1. Is clear and concise
2. Uses examples when appropriate
3. Breaks down complex concepts
4. Encourages critical thinking
`;

    console.log('Sending request to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

export async function getChatResponseStream(
  message: string, 
  context: ChatContext,
  onChunk: (chunk: string) => void
) {
  try {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      throw new Error("API key is not configured");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are an AI tutor helping a student understand ${context.subject}, 
specifically the chapter on ${context.chapter} and the topic of ${context.topic}.
The student's message is: "${message}"

Provide a helpful, educational response that:
1. Is clear and concise
2. Uses examples when appropriate
3. Breaks down complex concepts
4. Encourages critical thinking
`;

    console.log('Sending streaming request to Gemini API...');
    
    try {
      const result = await model.generateContentStream(prompt);
      
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        onChunk(chunkText);
      }
    } catch (streamError) {
      console.warn('Streaming failed, falling back to regular API:', streamError);
      
      // Fallback to non-streaming API
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const fullText = response.text();
      
      // Simulate streaming by sending chunks
      const words = fullText.split(' ');
      for (let i = 0; i < words.length; i++) {
        const chunk = (i === 0 ? '' : ' ') + words[i];
        onChunk(chunk);
        // Small delay to simulate streaming
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
  } catch (error) {
    console.error('Gemini API Streaming Error:', error);
    throw error;
  }
}