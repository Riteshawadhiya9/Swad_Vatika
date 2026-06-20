import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from './models/MenuItem.js';

// Load environment variables
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/swad_vatika';

const dishes = [
  // --- STARTERS ---
  {
    name: 'Tandoori Truffle Malai Broccoli',
    description: 'Fresh broccoli florets marinated in a creamy cheese and yogurt mixture infused with aromatic white truffle oil, roasted to perfection in our traditional clay oven.',
    price: 650,
    category: 'Starters',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Shahi Paneer Tikka',
    description: 'Handcrafted cottage cheese chunks marinated in a royal red yogurt marinade, grilled with organic bell peppers and Spanish onions.',
    price: 700,
    category: 'Starters',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Galouti Kebab',
    description: 'Melt-in-your-mouth minced lamb patties infused with home-ground rose petals, vetiver, and 150 royal spices, grilled on a mahi tawa.',
    price: 950,
    category: 'Starters',
    isVeg: false,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600'
  },
  // --- MAINS ---
  {
    name: 'Awadhi Nalli Nihari',
    description: 'Slow-cooked baby lamb shanks in a rich, velvety bone-marrow gravy, flavored with exotic mace and cardamom, simmered for 12 hours.',
    price: 1250,
    category: 'Mains',
    isVeg: false,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Nawabi Butter Chicken',
    description: 'Charcoal-smoked tandoori chicken cooked in a silky, buttery tomato sauce finished with dried organic fenugreek leaves and fresh cream.',
    price: 1100,
    category: 'Mains',
    isVeg: false,
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Kashmiri Dum Aloo',
    description: 'Fried baby potatoes cooked in a rich, aromatic yogurt gravy flavored with dry ginger and Kashmiri fennel, cooked under dum.',
    price: 850,
    category: 'Mains',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Paneer Lababdar',
    description: 'Fresh cottage cheese cubes folded in a sweet, spicy, onion-tomato-cashew gravy with a touch of butter and grated paneer.',
    price: 900,
    category: 'Mains',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600'
  },
  // --- BIRYANI ---
  {
    name: 'Swad Vatika Special Dum Biryani',
    description: 'Fragrant premium Basmati rice and tender spring lamb slow-cooked under a sealed dough crust (purdah) with saffron threads, rose water, and mint.',
    price: 1200,
    category: 'Biryani',
    isVeg: false,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Subz Saffron Biryani',
    description: 'Seasonal vegetables layered with aromatic long-grain Basmati rice, caramelized red onions, fresh coriander, and pure Kashmiri saffron.',
    price: 1000,
    category: 'Biryani',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=600'
  },
  // --- BREADS ---
  {
    name: 'Truffle Butter Naan',
    description: 'Traditional leavened bread baked in the clay oven, brushed with decadent black truffle butter and topped with microgreens.',
    price: 250,
    category: 'Breads',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Peshawari Naan',
    description: 'Leavened bread stuffed with sweet ground pistachios, almonds, raisins, and desiccated coconut, baked to a golden brown.',
    price: 275,
    category: 'Breads',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Garlic Rosemary Naan',
    description: 'Tandoori naan topped with fresh minced garlic, wild rosemary sprigs, and a generous brush of A2 cow ghee.',
    price: 220,
    category: 'Breads',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=600'
  },
  // --- DESSERTS ---
  {
    name: 'Shahi Tukda',
    description: 'Crispy ghee-fried bread soaked in aromatic cardamom milk syrup, topped with 24-karat edible gold leaf and pistachio rabri.',
    price: 550,
    category: 'Desserts',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Rose Petal Kulfi',
    description: 'Traditional Indian ice cream made from slow-reduced milk, organic rose-water, candied petals, and chopped pistachios.',
    price: 450,
    category: 'Desserts',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1505394033774-4334f3a0ae36?auto=format&fit=crop&q=80&w=600'
  },
  // --- DRINKS ---
  {
    name: 'Kesar Pista Lassi',
    description: 'Thick, creamy yogurt beverage flavored with handpicked saffron threads, green cardamom, and crushed Iranian pistachios.',
    price: 350,
    category: 'Drinks',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1517093602195-b40af9688b46?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Royal Rose Thandai',
    description: 'A refreshing, coolant milk beverage infused with almonds, melon seeds, fennel, black pepper, and real rose petals.',
    price: 380,
    category: 'Drinks',
    isVeg: true,
    imageUrl: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&q=80&w=600'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully.');

    console.log('Clearing existing MenuItem database...');
    await MenuItem.deleteMany({});
    console.log('Database cleared.');

    console.log(`Seeding ${dishes.length} premium Indian dishes into Menu...`);
    const seeded = await MenuItem.insertMany(dishes);
    console.log(`Success! Inserted ${seeded.length} items.`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    console.log('Closing MongoDB connection...');
    await mongoose.connection.close();
    console.log('Connection closed.');
  }
}

seedDatabase();
