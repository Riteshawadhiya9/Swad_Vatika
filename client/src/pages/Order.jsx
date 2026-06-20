import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShoppingBag, CheckCircle, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Order = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    specialInstructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError('Your cart is empty. Please add items to checkout.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Structure data for Order schema
      const orderData = {
        customerName: formData.customerName,
        phone: formData.phone,
        address: formData.address,
        items: cartItems.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: cartTotal
      };

      await axios.post('http://localhost:5000/api/orders', orderData);
      
      setSuccess(true);
      clearCart();
    } catch (err) {
      console.error('Error placing order:', err);
      setError(err.response?.data?.message || 'Failed to place your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center pt-20 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 sm:p-12 max-w-xl bg-card-dark/80 backdrop-blur-2xl border border-white/5 rounded-3xl shadow-2xl"
        >
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-accent-brand/10 border border-accent-brand/20 flex items-center justify-center text-accent-brand shadow-[0_0_15px_rgba(255,59,48,0.25)]">
              <CheckCircle className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-light mb-4 font-montserrat uppercase tracking-wider">Feast Ordered!</h1>
          <p className="text-accent-brand font-sans italic text-base mb-6 font-semibold">Your culinary journey is underway</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Your order has been sent to our royal kitchen. We are preparing it with maximum care, fresh herbs, and pure ghee. Our delivery partner will arrive at your address shortly.
          </p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-accent-brand text-white font-bold tracking-widest text-xs px-8 py-4 rounded-full shadow-lg shadow-accent-brand/25 hover:bg-accent-brand/90 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>RETURN TO PALACE</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-main text-text-light pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-light mb-3 font-montserrat uppercase tracking-wider">Checkout Platter</h1>
          <p className="text-gray-500 text-xs sm:text-sm font-light">Confirm your platter items and finalize your delivery details.</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 max-w-lg mx-auto bg-card-dark/80 backdrop-blur-xl border border-white/5 p-10 rounded-3xl shadow-2xl">
            <ShoppingBag className="h-16 w-16 text-gray-400 stroke-[1.5] mx-auto mb-4" />
            <p className="font-playfair text-lg text-gray-500 italic mb-6">Your cart is empty.</p>
            <Link
              to="/menu"
              className="inline-flex items-center space-x-2 bg-accent-brand text-white font-bold tracking-widest text-xs px-8 py-3.5 rounded-full hover:bg-accent-brand/90 transition-all duration-300 shadow-md shadow-accent-brand/20"
            >
              <span>EXPLORE MENU</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Order Summary */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="bg-card-dark/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
                <h2 className="font-montserrat text-lg font-bold text-text-light mb-4 pb-3 border-b border-white/5 uppercase tracking-wider">
                  Platter Summary
                </h2>
                
                {/* List items */}
                <div className="divide-y divide-white/5 max-h-[350px] overflow-y-auto pr-2 space-y-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between items-center pt-4 first:pt-0">
                      <div className="flex-grow pr-4">
                        <h4 className="text-sm font-semibold text-text-light leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-gray-500 mt-1">
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-text-light flex-shrink-0">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="border-t border-white/5 mt-6 pt-6 space-y-3.5">
                  <div className="flex justify-between text-xs text-gray-400 font-bold tracking-wider uppercase">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 font-bold tracking-wider uppercase">
                    <span>Standard Packing & Delivery</span>
                    <span className="text-emerald-500 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 font-bold tracking-wider uppercase pb-3 border-b border-white/5">
                    <span>Taxes & GST (5%)</span>
                    <span>₹{Math.round(cartTotal * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-text-light pt-2">
                    <span className="font-bold text-base uppercase tracking-wider">Grand Total</span>
                    <span className="font-montserrat text-2xl font-black text-accent-brand">
                      ₹{cartTotal + Math.round(cartTotal * 0.05)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Checkout Form */}
            <div className="lg:col-span-7">
              <div className="bg-card-dark/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center space-x-2.5 mb-6 pb-4 border-b border-white/5">
                  <Sparkles className="h-5 w-5 text-accent-brand" />
                  <h2 className="font-montserrat text-xl font-bold text-text-light uppercase tracking-wider">Delivery Details</h2>
                </div>

                {error && (
                  <div className="p-4 mb-6 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 text-xs">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="customerName" className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      required
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="e.g. Gayatri Devi"
                      className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand transition-all duration-300"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand transition-all duration-300"
                    />
                  </div>

                  {/* Delivery Address */}
                  <div>
                    <label htmlFor="address" className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">
                      Delivery Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      required
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your complete delivery address here..."
                      className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand transition-all duration-300"
                    ></textarea>
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label htmlFor="specialInstructions" className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">
                      Special Cooking / Delivery Instructions
                    </label>
                    <textarea
                      id="specialInstructions"
                      name="specialInstructions"
                      rows="2"
                      value={formData.specialInstructions}
                      onChange={handleChange}
                      placeholder="e.g. Make it mild spicy, ring doorbell on arrival..."
                      className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand transition-all duration-300"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full bg-accent-brand text-white font-bold tracking-widest text-xs py-4 rounded-full shadow-lg shadow-accent-brand/25 hover:bg-accent-brand/90 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>SENDING TO KITCHEN...</span>
                        </>
                      ) : (
                        <span>PLACE ROYAL ORDER</span>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
