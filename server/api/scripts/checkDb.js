const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const mongoose = require('mongoose');

const DB_URI = process.env.MONGO_URI;

async function check() {
  if (!DB_URI) {
    console.error('MONGO_URI is not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(DB_URI, { tls: true, serverSelectionTimeoutMS: 10000 });
    console.log('Connected to MongoDB');
    console.log('DB name:', mongoose.connection.name);
    console.log('Ready state:', mongoose.connection.readyState);

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('Collections found:', collections.map(c => c.name).join(', ') || '(none)');

    // Print counts for common collections if present
    const wanted = ['users', 'items'];
    for (const name of wanted) {
      const exists = collections.some(c => c.name === name);
      if (exists) {
        const count = await db.collection(name).countDocuments();
        console.log(`Collection ${name} count:`, count);
      } else {
        console.log(`Collection ${name} not found`);
      }
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('DB check failed:', err.message || err);
    process.exit(1);
  }
}

check();
