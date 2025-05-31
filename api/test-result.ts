import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const testResultSchema = z.object({
  personalSubmissionId: z.number(),
  score: z.number(),
  totalQuestions: z.number(),
  percentage: z.number(),
  timeSpent: z.number(),
  answers: z.record(z.number()),
  referenceNumber: z.string(),
});

// Simple in-memory storage for demo
let testResults: any[] = [];
let testResultId = 1;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = testResultSchema.parse(req.body);
    const result = {
      ...validatedData,
      id: testResultId++,
      submittedAt: new Date(),
    };
    testResults.push(result);
    
    res.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid data', errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}