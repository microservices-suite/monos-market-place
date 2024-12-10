const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
    imageUrl: {
      type: String,
      required: false, // Optional, depending on whether you use images
    },
    merchant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Merchant', // Reference to the Merchant model
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'archived'],
      default: 'active',
    },
  },
  {
    timestamps: true, 
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
