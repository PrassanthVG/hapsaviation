import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

const personalSubmissionSchema = z.object({
  fullName: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  parentName: z.string().min(1),
  parentOccupation: z.string().min(1),
  education: z.string().min(1),
});

// Simple in-memory storage for demo (in production, use a database)
let personalSubmissions: any[] = [];
let personalSubmissionId = 1;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const validatedData = personalSubmissionSchema.parse(req.body);
    const submission = {
      ...validatedData,
      id: personalSubmissionId++,
      submittedAt: new Date(),
    };
    personalSubmissions.push(submission);
    
    res.json(submission);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Invalid data', errors: error.errors });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}