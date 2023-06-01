const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['type1', 'type2', 'type3'], required: true },
  });

module.exports = mongoose.model('Product', productSchema);