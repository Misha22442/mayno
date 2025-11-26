// Dev seed script: insert one sample item per category
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const mongoose = require('mongoose');
const Item = require('../../models/Item');

const DB_URI = process.env.MONGO_URI;

const categories = [
  'Зброя',
  'Боєприпаси',
  'Оптика',
  "Засоби зв'язку",
  'Транспорт',
  'Техніка',
  'Речове майно',
  'Спорядження',
  'Медичне забезпечення',
  'Електроніка',
  'Інструменти',
  'Вимірювальна апаратура',
  'Матеріали та запчастини',
  'Паливно-енергетичне обладнання',
  'Інше'
];

async function seed() {
  if (!DB_URI) {
    console.error('MONGO_URI is not set in .env');
    process.exit(1);
  }

  await mongoose.connect(DB_URI, { tls: true, serverSelectionTimeoutMS: 10000 });
  console.log('Connected to MongoDB for seeding');

  try {
    const created = [];
    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i];
      const serial = `SEED-${String(i + 1).padStart(3, '0')}`;
      const name = `${cat} (приклад ${i + 1})`;

      const doc = await Item.findOneAndUpdate(
        { serialNumber: serial },
        {
          name,
          serialNumber: serial,
          category: cat,
          status: 'На складі'
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      created.push(doc);
      console.log('Upserted:', serial, cat);
    }

    console.log(`Seed complete. Inserted/updated ${created.length} items.`);

    // Показати загальну кількість документів у колекції items після seed
    try {
      const total = await Item.countDocuments();
      console.log('Total items in collection `items`:', total);
    } catch (countErr) {
      console.warn('Could not count documents in items collection:', countErr.message || countErr);
    }
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
