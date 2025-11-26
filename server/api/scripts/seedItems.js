// Dev seed script: insert realistic military inventory items
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const mongoose = require('mongoose');
const Item = require('../../models/Item');

const DB_URI = process.env.MONGO_URI;

// Реалістичні дані військового майна роти
const items = [
  // === ЗБРОЯ ===
  { name: 'Автомат АК-74', serialNumber: 'AK-2024-001', category: 'Зброя', status: 'На складі' },
  { name: 'Автомат АК-74', serialNumber: 'AK-2024-002', category: 'Зброя', status: 'Видано' },
  { name: 'Кулемет ПКМ', serialNumber: 'PKM-2023-015', category: 'Зброя', status: 'На складі' },
  { name: 'Гранатомет РПГ-7', serialNumber: 'RPG-2024-003', category: 'Зброя', status: 'На складі' },
  { name: 'Пістолет Форт-17', serialNumber: 'FT17-2024-021', category: 'Зброя', status: 'Видано' },
  { name: 'Снайперська гвинтівка СВД', serialNumber: 'SVD-2023-007', category: 'Зброя', status: 'На складі' },
  
  // === БОЄПРИПАСИ ===
  { name: 'Набої 5.45x39 (ящик 1080 шт)', serialNumber: 'AM-545-001', category: 'Боєприпаси', status: 'На складі' },
  { name: 'Набої 7.62x54R (ящик 440 шт)', serialNumber: 'AM-762-002', category: 'Боєприпаси', status: 'На складі' },
  { name: 'Гранати Ф-1 (ящик 20 шт)', serialNumber: 'GR-F1-015', category: 'Боєприпаси', status: 'На складі' },
  { name: 'Постріли ПГ-7ВМ (ящик)', serialNumber: 'PG7-2024-008', category: 'Боєприпаси', status: 'На складі' },
  
  // === ОПТИКА ===
  { name: 'Приціл коліматорний Eotech', serialNumber: 'OPT-EOT-101', category: 'Оптика', status: 'На складі' },
  { name: 'Приціл оптичний ПСО-1', serialNumber: 'OPT-PSO-045', category: 'Оптика', status: 'Видано' },
  { name: 'Бінокль БПЦ 10x50', serialNumber: 'BIN-2024-012', category: 'Оптика', status: 'На складі' },
  { name: 'Тепловізор Pulsar', serialNumber: 'TRM-PLS-003', category: 'Оптика', status: 'На складі' },
  { name: 'Приціл нічного бачення ПН-3', serialNumber: 'NV-PN3-007', category: 'Оптика', status: 'Ремонт' },
  
  // === ЗАСОБИ ЗВ'ЯЗКУ ===
  { name: 'Радіостанція Motorola DP4800', serialNumber: 'RAD-MOT-201', category: "Засоби зв'язку", status: 'На складі' },
  { name: 'Радіостанція Motorola DP4800', serialNumber: 'RAD-MOT-202', category: "Засоби зв'язку", status: 'Видано' },
  { name: 'Радіостанція Baofeng UV-5R', serialNumber: 'RAD-BF-055', category: "Засоби зв'язку", status: 'На складі' },
  { name: 'Антена підсилювач сигналу', serialNumber: 'ANT-2024-011', category: "Засоби зв'язку", status: 'На складі' },
  
  // === ТРАНСПОРТ ===
  { name: 'Автомобіль HMMWV (Хамві)', serialNumber: 'TR-HMV-2024-01', category: 'Транспорт', status: 'На складі' },
  { name: 'Автомобіль УАЗ-469', serialNumber: 'TR-UAZ-2022-15', category: 'Транспорт', status: 'Ремонт' },
  { name: 'Мотоцикл Shineray XY250GY', serialNumber: 'TR-MTC-2024-03', category: 'Транспорт', status: 'На складі' },
  { name: 'Причіп 1-ПН-2', serialNumber: 'TR-PRC-2023-07', category: 'Транспорт', status: 'На складі' },
  
  // === ТЕХНІКА ===
  { name: 'Генератор Honda EU22i', serialNumber: 'TH-GEN-2024-01', category: 'Техніка', status: 'На складі' },
  { name: 'Дрон DJI Mavic 3', serialNumber: 'TH-DRN-2024-05', category: 'Техніка', status: 'На складі' },
  { name: 'Дрон FPV камікадзе', serialNumber: 'TH-FPV-2024-12', category: 'Техніка', status: 'Видано' },
  { name: 'Зарядна станція EcoFlow', serialNumber: 'TH-ECO-2024-02', category: 'Техніка', status: 'На складі' },
  
  // === РЕЧОВЕ МАЙНО ===
  { name: 'Бронежилет 4 класу', serialNumber: 'RM-BZH-2024-001', category: 'Речове майно', status: 'На складі' },
  { name: 'Бронежилет 4 класу', serialNumber: 'RM-BZH-2024-002', category: 'Речове майно', status: 'Видано' },
  { name: 'Шолом балістичний', serialNumber: 'RM-HLM-2024-015', category: 'Речове майно', status: 'На складі' },
  { name: 'Форма польова (комплект)', serialNumber: 'RM-UNI-2024-045', category: 'Речове майно', status: 'На складі' },
  { name: 'Берці зимові', serialNumber: 'RM-BOT-2024-078', category: 'Речове майно', status: 'На складі' },
  
  // === СПОРЯДЖЕННЯ ===
  { name: 'Рюкзак тактичний 45л', serialNumber: 'SP-BAG-2024-011', category: 'Спорядження', status: 'На складі' },
  { name: 'Спальний мішок зимовий', serialNumber: 'SP-SLP-2024-023', category: 'Спорядження', status: 'Видано' },
  { name: 'Намет 4-місний', serialNumber: 'SP-TNT-2024-005', category: 'Спорядження', status: 'На складі' },
  { name: 'Плита керамічна для БЖ', serialNumber: 'SP-PLT-2024-033', category: 'Спорядження', status: 'На складі' },
  
  // === МЕДИЧНЕ ЗАБЕЗПЕЧЕННЯ ===
  { name: 'Аптечка IFAK тактична', serialNumber: 'MED-IFAK-2024-01', category: 'Медичне забезпечення', status: 'На складі' },
  { name: 'Турнікет CAT Gen 7', serialNumber: 'MED-TRN-2024-15', category: 'Медичне забезпечення', status: 'На складі' },
  { name: 'Носилки евакуаційні', serialNumber: 'MED-STR-2024-03', category: 'Медичне забезпечення', status: 'На складі' },
  { name: 'Дефібрилятор AED', serialNumber: 'MED-AED-2024-01', category: 'Медичне забезпечення', status: 'На складі' },
  
  // === ЕЛЕКТРОНІКА ===
  { name: 'GPS-навігатор Garmin', serialNumber: 'EL-GPS-2024-007', category: 'Електроніка', status: 'На складі' },
  { name: 'Планшет захищений Getac', serialNumber: 'EL-TAB-2024-003', category: 'Електроніка', status: 'Видано' },
  { name: 'Ліхтар тактичний Fenix', serialNumber: 'EL-FLH-2024-021', category: 'Електроніка', status: 'На складі' },
  
  // === ІНСТРУМЕНТИ ===
  { name: 'Набір інструментів автомобільний', serialNumber: 'IN-SET-2024-01', category: 'Інструменти', status: 'На складі' },
  { name: 'Лопата саперна МПЛ-50', serialNumber: 'IN-SHV-2024-15', category: 'Інструменти', status: 'На складі' },
  { name: 'Бензопила Stihl MS 180', serialNumber: 'IN-CHN-2024-02', category: 'Інструменти', status: 'На складі' },
  
  // === ВИМІРЮВАЛЬНА АПАРАТУРА ===
  { name: 'Далекомір лазерний', serialNumber: 'VA-RNG-2024-05', category: 'Вимірювальна апаратура', status: 'На складі' },
  { name: 'Метеостанція портативна', serialNumber: 'VA-MET-2024-02', category: 'Вимірювальна апаратура', status: 'На складі' },
  
  // === МАТЕРІАЛИ ТА ЗАПЧАСТИНИ ===
  { name: 'Масло моторне 5W-40 (20л)', serialNumber: 'MZ-OIL-2024-01', category: 'Матеріали та запчастини', status: 'На складі' },
  { name: 'Фільтр повітряний УАЗ', serialNumber: 'MZ-FLT-2024-08', category: 'Матеріали та запчастини', status: 'На складі' },
  
  // === ПАЛИВНО-ЕНЕРГЕТИЧНЕ ОБЛАДНАННЯ ===
  { name: 'Каністра паливна 20л', serialNumber: 'PE-CAN-2024-01', category: 'Паливно-енергетичне обладнання', status: 'На складі' },
  { name: 'Акумулятор 12V 100Ah', serialNumber: 'PE-BAT-2024-03', category: 'Паливно-енергетичне обладнання', status: 'На складі' },
  
  // === ІНШЕ ===
  { name: 'Маскувальна сітка 3x6м', serialNumber: 'IN-MSK-2024-05', category: 'Інше', status: 'На складі' },
  { name: 'Мішки з піском (100 шт)', serialNumber: 'IN-SND-2024-01', category: 'Інше', status: 'На складі' }
];

async function seed() {
  if (!DB_URI) {
    console.error('MONGO_URI is not set in .env');
    process.exit(1);
  }

  await mongoose.connect(DB_URI, { tls: true, serverSelectionTimeoutMS: 10000 });
  console.log('✅ Connected to MongoDB for seeding');

  try {
    // Очищаємо стару колекцію
    await Item.deleteMany({});
    console.log('🗑️  Cleared old items');

    // Додаємо нові items
    const created = await Item.insertMany(items);
    console.log(`✅ Seed complete! Inserted ${created.length} items.`);

    // Статистика по категоріях
    const stats = await Item.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📊 Статистика по категоріях:');
    stats.forEach(s => console.log(`   ${s._id}: ${s.count} шт`));
    
    const total = await Item.countDocuments();
    console.log(`\n📦 Всього майна в базі: ${total} одиниць`);

  } catch (err) {
    console.error('❌ Seed error:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();
