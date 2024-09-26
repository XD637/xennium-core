// pages/api/searchUser.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('test');
      const users = await db
        .collection('users')
        .find({ username: { $regex: query, $options: 'i' } })
        .toArray();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
