import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, address } = req.body;

    if (!username || !address) {
      return res.status(400).json({ message: 'Username and address are required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('test'); // Specify the database name

      const existingUser = await db.collection('address').findOne({ username });

      if (existingUser) {
        const addressExists = existingUser.addresses.includes(address);

        if (!addressExists) {
          await db.collection('address').updateOne(
            { username },
            { $addToSet: { addresses: address } }
          );
          return res.status(200).json({ message: 'Address saved successfully' });
        } else {
          return res.status(200).json({ message: 'Address already exists for this user' });
        }
      } else {
        await db.collection('address').insertOne({
          username,
          addresses: [address], // Initialize with the first address
        });
        return res.status(200).json({ message: 'User and address saved successfully' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
