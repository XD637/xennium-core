import clientPromise from '../../lib/mongodb';

const handler = async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    // Create or update user profile
    const { username, name, bio, dob, links } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('test');
      const collection = db.collection('profiles');

      // Check if the profile exists
      const existingProfile = await collection.findOne({ username });

      if (existingProfile) {
        // Update existing profile
        await collection.updateOne(
          { username },
          { $set: { name, bio, dob, links } }
        );
      } else {
        // Create new profile
        await collection.insertOne({ username, name, bio, dob, links });
      }

      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  } else if (method === 'GET') {
    // Fetch user profile
    const { username } = req.query;

    try {
      const client = await clientPromise;
      const db = client.db('test');
      const collection = db.collection('profiles');

      const profile = await collection.findOne({ username });

      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
