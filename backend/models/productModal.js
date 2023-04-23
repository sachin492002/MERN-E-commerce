const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
    maxlength: 32,
  },
  image: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  category: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  shipping: {
    type: Boolean,
    default: false
  },
  seller:{
    type: String,
    required: false,
  },
  stock:{
    type: Number,
    required: true,
  },
  reviews:{
    type: Number,
    required:false,
  },
  stars:{
    type: Number,
    required:false,
  }
});

const ProductModal = mongoose.model('Product', productSchema);

module.exports = ProductModal