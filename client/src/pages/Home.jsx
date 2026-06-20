import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ShoppingBag, Calendar, Sparkles, Flame, Clock, Compass } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { addToCart } = useCart();
  
  // Parallax Scroll Tracking
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, -60]);
  const heroImageY = useTransform(scrollY, [0, 500], [0, 40]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Framer Motion Drag Constraints for the Horizontal Slider
  const sliderRef = useRef();
  const innerRef = useRef();
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    if (innerRef.current && sliderRef.current) {
      setDragWidth(innerRef.current.scrollWidth - sliderRef.current.offsetWidth + 32);
    }
  }, [innerRef.current, sliderRef.current]);

  // Signature creations (matching our seed data)
  const signatureDishes = [
    {
      _id: '1',
      name: 'Tandoori Truffle Malai Broccoli',
      description: 'Roasted broccoli florets marinated in a creamy cheese mixture infused with aromatic white truffle oil.',
      price: 650,
      isVeg: true,
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600'
    },
    {
      _id: '2',
      name: 'Awadhi Nalli Nihari',
      description: 'Slow-cooked lamb shanks in a rich, velvety bone-marrow gravy flavored with exotic royal spices.',
      price: 1250,
      isVeg: false,
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'
    },
    {
      _id: '3',
      name: 'Nawabi Butter Chicken',
      description: 'Charcoal-smoked tandoori chicken cooked in a silky, buttery tomato sauce finished with dried fenugreek.',
      price: 1100,
      isVeg: false,
      imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=80&w=600'
    },
    {
      _id: '4',
      name: 'Swad Vatika Special Dum Biryani',
      description: 'Fragrant Basmati rice and tender spring lamb slow-cooked under a sealed dough crust with pure saffron.',
      price: 1200,
      isVeg: false,
      imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600'
    },
    {
      _id: '5',
      name: 'Shahi Tukda Gold Leaf',
      description: 'Crispy ghee-fried bread soaked in cardamom syrup, topped with 24-karat edible gold leaf and rich rabri.',
      price: 550,
      isVeg: true,
      imageUrl: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600'
    },
    {
      _id: '6',
      name: 'Rose Petal Kulfi',
      description: 'Traditional reduced milk ice cream flavored with organic rose-water, candied petals, and green pistachios.',
      price: 450,
      isVeg: true,
      imageUrl: 'https://images.unsplash.com/photo-1505394033774-4334f3a0ae36?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-bg-main text-text-light overflow-hidden min-h-screen relative"
    >
      
      {/* ========================================== */}
      {/* 3D GLOWING FLOATING GEOMETRIC ELEMENTS */}
      {/* ========================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Glow Sphere 1 (Top Left) */}
        <motion.div 
          animate={{ 
            y: [0, -30, 0], 
            x: [0, 20, 0],
            scale: [1, 1.15, 1] 
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-accent-brand/10 blur-[120px]"
        />

        {/* Glow Sphere 2 (Bottom Right) */}
        <motion.div 
          animate={{ 
            y: [0, 40, 0], 
            x: [0, -30, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-accent-glow/10 blur-[130px]"
        />

        {/* Floating Ring/Donut shape (Blurred 3D effect in foreground) */}
        <motion.div 
          animate={{ 
            y: [0, -40, 0], 
            rotate: 360 
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-[25%] right-[15%] w-32 h-32 rounded-full border-[16px] border-white/5 backdrop-blur-[6px] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] opacity-50 hidden md:block"
        />

        {/* Floating small glowing sphere (Top Center) */}
        <motion.div 
          animate={{ 
            y: [0, 25, 0],
            x: [0, -15, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[45%] w-6 h-6 rounded-full bg-gradient-to-tr from-accent-brand to-accent-glow shadow-[0_0_20px_rgba(255,59,48,0.6)] opacity-70"
        />
      </div>

      {/* ========================================== */}
      {/* HERO SECTION */}
      {/* ========================================== */}
      <section className="relative min-h-[92vh] flex items-center px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <motion.div 
            style={{ y: heroTextY, opacity: heroOpacity }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            {/* Tag Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4.5 py-2 rounded-full shadow-lg"
            >
              <Flame className="h-4 w-4 text-accent-brand animate-pulse" />
              <span className="text-xxs uppercase tracking-[0.2em] font-bold text-text-light font-sans">
                Vibrant Indian Taste Odyssey
              </span>
            </motion.div>

            {/* Main Title Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-text-light font-montserrat">
              Order Tasty & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-brand to-accent-glow drop-shadow-[0_4px_15px_rgba(255,59,48,0.25)]">Fresh Food</span> Anytime!
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-base sm:text-lg font-light leading-relaxed max-w-xl font-sans">
              Welcome to Swad Vatika. Explore spices of the royal estates, prepared fresh and delivered smoking hot to your chamber door.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
              
              {/* Order Now */}
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/order"
                  className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-accent-brand hover:bg-accent-brand/90 text-white font-bold tracking-wider text-xs px-8 py-4.5 rounded-full shadow-[0_8px_25px_rgba(255,59,48,0.4)] transition-all duration-300"
                >
                  <ShoppingBag className="h-4.5 w-4.5" />
                  <span>ORDER NOW</span>
                </Link>
              </motion.div>

              {/* See Menu */}
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/menu"
                  className="flex items-center justify-center space-x-2 w-full sm:w-auto bg-white/5 border border-white/10 hover:border-white/20 text-text-light font-bold tracking-wider text-xs px-8 py-4.5 rounded-full transition-all duration-300"
                >
                  <Compass className="h-4.5 w-4.5 text-accent-brand" />
                  <span>SEE MENU</span>
                </Link>
              </motion.div>
            </div>

            {/* Quick Metrics */}
            <div className="pt-6 grid grid-cols-3 gap-6 max-w-md border-t border-white/5">
              <div>
                <p className="text-2xl font-black text-text-light">10k+</p>
                <p className="text-xxs uppercase tracking-wider text-gray-500 font-bold mt-1">Happy Feasts</p>
              </div>
              <div>
                <p className="text-2xl font-black text-text-light">16+</p>
                <p className="text-xxs uppercase tracking-wider text-gray-500 font-bold mt-1">Royal Chefs</p>
              </div>
              <div>
                <p className="text-2xl font-black text-text-light">30 Min</p>
                <p className="text-xxs uppercase tracking-wider text-gray-500 font-bold mt-1">Fast Delivery</p>
              </div>
            </div>

          </motion.div>

          {/* Hero Right Content (Massive Food Image Overflow) */}
          <motion.div 
            style={{ y: heroImageY, opacity: heroOpacity }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            {/* Ring Backdrop */}
            <div className="absolute w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-accent-brand/20 to-accent-glow/5 animate-pulse blur-xl z-0" />
            
            {/* Image Wrapper */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.2 }}
              className="relative z-10 w-full max-w-[420px] lg:max-w-none aspect-square overflow-visible"
            >
              <img 
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=900" 
                alt="Vibrant Spiced Biryani Platter" 
                className="w-full h-full object-cover rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:rotate-6 transition-transform duration-700"
              />

              {/* Floating Chef Recommendation Overlay Tag */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-card-dark/95 border border-white/10 p-4.5 rounded-2xl shadow-2xl flex items-center space-x-3 max-w-[210px]"
              >
                <div className="p-2 rounded-lg bg-accent-brand/10 text-accent-brand">
                  <Clock className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Dum Biryani</p>
                  <p className="text-xs font-bold text-text-light">Fresh & Piping Hot</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ========================================== */}
      {/* SIGNATURE CREATIONS SECTION (Dark Glassmorphism) */}
      {/* ========================================== */}
      <section className="py-24 bg-card-dark/50 border-t border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-accent-brand uppercase tracking-[0.25em] text-xxs font-bold font-sans mb-3">
              Most Popular
            </h2>
            <h3 className="text-4xl sm:text-5xl font-black text-text-light mb-4 font-montserrat">
              Signature Creations
            </h3>
            <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
              Order our absolute best sellers. Handcrafted with precision, packed in premium containers, and delivered in record time.
            </p>
          </div>

          {/* Draggable Cards Slider */}
          <div ref={sliderRef} className="overflow-hidden cursor-grab active:cursor-grabbing px-2 py-4">
            <motion.div
              ref={innerRef}
              drag="x"
              dragConstraints={{ right: 0, left: -dragWidth }}
              className="flex gap-8 w-fit"
            >
              {signatureDishes.map((dish) => (
                <motion.div
                  key={dish._id}
                  whileHover={{ y: -8 }}
                  className="w-[290px] sm:w-[340px] flex-shrink-0 bg-card-dark/80 backdrop-blur-xl border border-white/5 rounded-3xl p-5 shadow-[0_15px_35px_rgba(0,0,0,0.3)] hover:border-accent-brand/20 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden rounded-2xl bg-black mb-5">
                    <motion.img 
                      src={dish.imageUrl} 
                      alt={dish.name} 
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full object-cover origin-center"
                      loading="lazy"
                    />
                    <span className={`absolute top-4 right-4 text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border bg-black/80 backdrop-blur-md shadow-sm ${
                      dish.isVeg 
                        ? 'text-emerald-400 border-emerald-950' 
                        : 'text-rose-400 border-rose-950'
                    }`}>
                      {dish.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="space-y-3 px-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-montserrat text-base font-bold text-text-light leading-snug">
                        {dish.name}
                      </h4>
                      <span className="font-sans text-accent-brand font-extrabold text-base ml-2">
                        ₹{dish.price}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                      {dish.description}
                    </p>
                  </div>

                  {/* Add to Platter Button */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center px-1">
                    <span className="text-[9px] tracking-widest text-accent-brand uppercase font-bold flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5" /> Best Seller
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(dish)}
                      className="h-10 w-10 rounded-full bg-accent-brand text-white hover:bg-accent-brand/90 flex items-center justify-center transition-all duration-300 shadow-[0_4px_15px_rgba(255,59,48,0.3)] hover:shadow-[0_4px_20px_rgba(255,59,48,0.5)]"
                      aria-label="Add to cart"
                    >
                      <ShoppingBag className="h-4.5 w-4.5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Hint */}
            <div className="flex justify-center items-center space-x-2 text-xxs text-gray-500 font-bold uppercase tracking-widest mt-8">
              <span>Swipe left or right to explore best sellers</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================== */}
      {/* STORY & HERITAGE SECTION */}
      {/* ========================================== */}
      <section className="py-28 bg-bg-main relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Story Text */}
            <div className="space-y-6">
              <span className="text-accent-brand uppercase tracking-[0.25em] text-xxs font-bold font-sans">
                Our Kitchen Story
              </span>
              <h2 className="text-4xl sm:text-5xl font-black text-text-light leading-tight font-montserrat">
                Crafting Culinary Legacies Since Eras Past
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base font-light">
                At Swad Vatika, dining is not just a meal; it is a meticulously choreographed journey through spice coordinates. Drawing inspiration from ancient Vedic slow-cooking and contemporary gastronomy, our chefs craft items that taste royal yet feel fresh.
              </p>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base font-light">
                Every recipe is prepared with hand-milled spices, fresh premium organic components, and served with record delivery speed.
              </p>
              <div className="pt-4">
                <Link 
                  to="/book" 
                  className="inline-flex items-center space-x-2 font-bold tracking-wider text-xs text-accent-brand hover:text-text-light transition-colors duration-300"
                >
                  <span>RESERVE A ROYAL EXPERIENCE</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Premium Story Image */}
            <div className="relative">
              <div className="bg-card-dark/80 border border-white/5 p-4 rounded-3xl shadow-xl max-w-lg mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800" 
                  alt="Swad Vatika Royal Dining Setup" 
                  className="rounded-2xl w-full h-[350px] sm:h-[450px] object-cover shadow-inner"
                />
              </div>
              {/* Floating Accent Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="absolute -bottom-6 -left-6 bg-card-dark border border-white/10 p-6 rounded-2xl shadow-2xl max-w-xs hidden sm:block"
              >
                <p className="font-montserrat italic text-accent-brand text-base font-bold mb-1">“Food fit for kings, crafted for connoisseurs.”</p>
                <p className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">— Executive Chef</p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
