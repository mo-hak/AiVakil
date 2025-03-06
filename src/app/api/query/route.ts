import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const MODEL_CACHE_DIR = path.join(process.env.USERPROFILE || '', '.cache', 'kagglehub', 'models', 'mohak1802', 'aivakil', 'tensorFlow2', 'default', '1');

interface QAEntry {
  question: string;
  answer: string;
  context?: string;
}

async function loadQAData(): Promise<QAEntry[]> {
  try {
    const modelPath = path.join(MODEL_CACHE_DIR, 'constitution_qa.json');
    const modelData = await fs.readFile(modelPath, 'utf-8');
    return JSON.parse(modelData);
  } catch (error) {
    console.error('Error loading QA data:', error);
    throw error;
  }
}

function findBestMatch(prompt: string, qaData: QAEntry[]): QAEntry | null {
  // Convert prompt to lowercase for case-insensitive matching
  const normalizedPrompt = prompt.toLowerCase();
  
  // Find the best matching question based on keyword overlap
  let bestMatch: QAEntry | null = null;
  let maxOverlap = 0;

  for (const qa of qaData) {
    const questionWords = new Set(qa.question.toLowerCase().split(/\s+/));
    const promptWords = new Set(normalizedPrompt.split(/\s+/));
    
    // Count how many words overlap between the prompt and the question
    const overlap = [...promptWords].filter(word => questionWords.has(word)).length;
    
    if (overlap > maxOverlap) {
      maxOverlap = overlap;
      bestMatch = qa;
    }
  }

  return bestMatch;
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    try {
      // Load QA data
      const qaData = await loadQAData();
      
      // Find best matching response
      const match = findBestMatch(prompt, qaData);
      
      if (!match) {
        return NextResponse.json({ 
          result: {
            prompt,
            response: "I'm sorry, I couldn't find a relevant answer to your question about the Indian Constitution. Please try rephrasing your question.",
            confidence: 0
          }
        });
      }

      return NextResponse.json({ 
        result: {
          prompt,
          response: match.answer,
          context: match.context,
          matched_question: match.question
        }
      });

    } catch (modelError) {
      console.error('Model Error:', modelError);
      return NextResponse.json(
        { 
          error: 'Failed to process query',
          details: modelError instanceof Error ? modelError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 