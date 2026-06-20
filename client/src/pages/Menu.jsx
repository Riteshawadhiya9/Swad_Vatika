import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Loader2, Search, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Starters', 'Mains', 'Biryani', 'Breads', 'Desserts', 'Drinks'];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/menu');
        setMenuItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError('Failed to load the menu. Please try again later.');
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Stagger reveal animation variants
  const gridVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 14 }
    }
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-light pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[-5%] w-[30vw] h-[30vw] rounded-full bg-accent-brand/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[35vw] h-[35vw] rounded-full bg-accent-glow/5 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Banner/Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-card-dark/60 backdrop-blur-md border border-white/5 px-4.5 py-2 rounded-full mb-4 shadow-lg"
          >
            <Star className="h-4 w-4 text-accent-brand fill-accent-brand animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-light font-sans">
              Imperial Culinary Catalog
            </span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-6xl font-black text-text-light mb-4 font-montserrat uppercase tracking-wider">
            The Royal Platter
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-light max-w-xl mx-auto font-sans">
            Browse through our select catalog of traditional Indian dishes, cooked to order with imperial spices and premium organic ingredients.
          </p>
        </div>

        {/* Search & Categories Section */}
        <div className="mb-14 space-y-8">
          {/* Search bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4.5 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search royal dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-13 pr-5 py-4 rounded-full border border-white/10 bg-black/40 text-xs text-text-light shadow-[0_10px_30px_rgba(0,0,0,0.3)] focus:outline-none focus:border-accent-brand focus:ring-1 focus:ring-accent-brand/25 transition-all duration-300"
            />
          </div>

          {/* Category Tabs (Floating Glass Pills) */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
                  activeCategory === category 
                    ? 'bg-accent-brand text-white border-accent-brand shadow-lg shadow-accent-brand/20' 
                    : 'bg-card-dark/60 backdrop-blur-md border-white/5 text-gray-400 hover:text-text-light hover:border-white/10'
                }`}
              >
                <span>{category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-24 space-y-4">
            <Loader2 className="h-10 w-10 text-accent-brand animate-spin" />
            <p className="font-montserrat text-sm uppercase tracking-widest text-gray-500 font-bold">Preparing royal selection...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-card-dark/80 backdrop-blur-xl rounded-3xl max-w-xl mx-auto p-8 border border-white/5 shadow-2xl">
            <p className="text-rose-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-accent-brand text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-accent-brand/90 shadow-lg shadow-accent-brand/10"
            >
              Retry
            </button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-sans text-sm text-gray-500 italic">No dishes match your selection.</p>
          </div>
        ) : (
          <motion.div 
            variants={gridVariants}
            initial="hidden"
            animate="show"
            style={{ perspective: 1200 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  variants={cardVariants}
                  whileHover={{ rotateX: 6, rotateY: -6, y: -10, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                  className="bg-card-dark/80 backdrop-blur-2xl rounded-3xl overflow-hidden flex flex-col h-full border border-white/5 shadow-[0_20px_45px_rgba(0,0,0,0.3)] hover:border-accent-brand/20 duration-300 origin-center"
                >
                  {/* Dish Image */}
                  <div className="relative h-64 overflow-hidden shadow-inner">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    {/* Veg/Non-Veg Tag */}
                    <span className={`absolute top-4 right-4 text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border bg-black/80 backdrop-blur-md shadow-sm ${
                      item.isVeg 
                        ? 'text-emerald-400 border-emerald-950/30 bg-emerald-950/20' 
                        : 'text-rose-400 border-rose-950/30 bg-rose-950/20'
                    }`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${item.isVeg ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>

                  {/* Dish Details */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-montserrat text-base font-bold text-text-light leading-snug">
                          {item.name}
                        </h3>
                        <span className="font-sans text-accent-brand font-extrabold text-base flex-shrink-0 ml-2">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Add to Cart Footer */}
                    <div className="mt-6 pt-5 border-t border-white/5 flex justify-between items-center">
                      <span className="text-[10px] tracking-widest text-gray-500 uppercase font-bold">
                        {item.category}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(item)}
                        className="flex items-center space-x-2 bg-accent-brand text-white px-5 py-2.5 rounded-full text-xxs font-bold tracking-wider uppercase hover:shadow-[0_0_18px_rgba(255,59,48,0.6)] transition-all duration-300 shadow-lg shadow-accent-brand/25 cursor-pointer"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>ADD TO PLATTER</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;
