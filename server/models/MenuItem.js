import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Menu item description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Menu item price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Menu item category is required'],
    enum: {
      values: ['Starters', 'Mains', 'Biryani', 'Breads', 'Desserts', 'Drinks'],
      message: '{VALUE} is not a valid category'
    }
  },
  isVeg: {
    type: Boolean,
    required: true,
    default: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;
