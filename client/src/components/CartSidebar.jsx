import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartSidebar = () => {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/order');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Sliding Sidebar Panel (frosted dark glass) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[440px] bg-card-dark/95 backdrop-blur-3xl border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.4)] flex flex-col text-text-light"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/10">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="h-5 w-5 text-accent-brand animate-pulse" />
                <h2 className="font-montserrat text-lg font-bold uppercase tracking-wider">Your Platter</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full text-gray-500 hover:text-text-light hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                aria-label="Close cart"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                  <ShoppingBag className="h-16 w-16 text-gray-700 stroke-[1.5]" />
                  <p className="font-montserrat text-sm text-gray-500 font-bold uppercase tracking-wider">Your platter is empty.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs tracking-widest font-bold text-accent-brand uppercase hover:underline"
                  >
                    Start Adding Dishes
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} className="flex space-x-4 border-b border-white/5 pb-6 last:border-b-0 last:pb-0">
                    {/* Item Thumbnail */}
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-22 h-22 object-cover rounded-2xl border border-white/10 shadow-md"
                    />
                    
                    {/* Item Info & Actions */}
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-montserrat text-sm font-bold text-text-light leading-snug pr-2">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-gray-500 hover:text-accent-brand p-1 rounded-lg hover:bg-white/5 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-accent-brand font-bold text-xs mt-1">₹{item.price}</p>
                      </div>

                      {/* Quantity Controls (Physical Floating Buttons) */}
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-1.5 bg-black/40 border border-white/10 p-1 rounded-full">
                          {/* Minus Button */}
                          <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateQuantity(item._id, -1)}
                            className="h-7 w-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-text-light shadow-sm"
                          >
                            <Minus className="h-3 w-3" />
                          </motion.button>
                          
                          <span className="font-sans text-xs font-semibold px-2.5 text-text-light min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          
                          {/* Plus Button */}
                          <motion.button
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateQuantity(item._id, 1)}
                            className="h-7 w-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-text-light shadow-sm"
                          >
                            <Plus className="h-3 w-3" />
                          </motion.button>
                        </div>
                        
                        <span className="font-sans font-bold text-sm text-text-light">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary / Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-black/20 space-y-4">
                <div className="flex justify-between items-center text-text-light">
                  <span className="text-xs font-bold tracking-widest uppercase">Subtotal</span>
                  <span className="font-montserrat text-xl font-black text-accent-brand">₹{cartTotal}</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed font-light">
                  Standard packing fee and taxes are calculated at checkout.
                </p>
                
                {/* Glowing Gold Proceed button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-accent-brand text-white font-bold tracking-widest text-xs py-4.5 rounded-full shadow-[0_8px_25px_rgba(255,59,48,0.3)] hover:shadow-[0_8px_30px_rgba(255,59,48,0.5)] hover:bg-accent-brand/95 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>PROCEED TO CHECKOUT</span>
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
