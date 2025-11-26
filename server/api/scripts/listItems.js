const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const mongoose = require('mongoose');
const Item = require('../../models/Item');

const DB_URI = process.env.MONGO_URI;

async function listItems() {
  if (!DB_URI) {
    console.error('MONGO_URI is not set in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(DB_URI, { tls: true, serverSelectionTimeoutMS: 10000 });
    console.log('Connected to MongoDB (listItems)');
    console.log('DB name:', mongoose.connection.name);

    const items = await Item.find({}).limit(20).lean();
    console.log(`Found ${items.length} items (showing up to 20):`);
    items.forEach((it, idx) => {
      console.log(`${idx + 1}. serial=${it.serialNumber} name=${it.name} category=${it.category} status=${it.status}`);
    });

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('listItems error:', err.message || err);
    process.exit(1);
  }
}

listItems();
