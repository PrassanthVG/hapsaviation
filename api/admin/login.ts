import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // Simple admin credentials
    if (username !== 'admin' || password !== 'haps2024') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ success: true, user: { id: 1, username: 'admin' } });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}