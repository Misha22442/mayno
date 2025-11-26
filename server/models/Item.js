const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  // Назва майна (напр., "Бронежилет 4 класу")
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  
  // Унікальний ідентифікатор (напр., серійний номер, інвентарний номер)
  serialNumber: { 
    type: String, 
    required: true, 
    unique: true, // Гарантує, що не буде дублікатів
    trim: true
  },
  
  // Категорія майна (напр., "Зброя", "Оптика", "Речове майно")
  category: { 
    type: String, 
    required: true,
    enum: [
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
    ], // Розширений перелік категорій (15)
    default: 'Інше'
  },
  
  // Поточний стан майна (напр., "На складі", "Видано Іванову")
  status: { 
    type: String, 
    required: true,
    enum: ['На складі', 'Видано', 'Списано', 'Ремонт'],
    default: 'На складі'
  },
  
  // Поле для прив'язки до користувача (залишимо для майбутньої логіки видачі)
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // Дата останнього оновлення або додавання
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', ItemSchema);