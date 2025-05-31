import type { VercelRequest, VercelResponse } from '@vercel/node';

// Shared storage (in production, use a database like PostgreSQL or MongoDB)
const getPersonalSubmissions = () => {
  if (typeof global !== 'undefined' && global.personalSubmissions) {
    return global.personalSubmissions;
  }
  return [];
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const submissions = getPersonalSubmissions();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}