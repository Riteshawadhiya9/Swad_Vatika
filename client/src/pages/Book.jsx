import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, ArrowLeft, Loader2, Users, Clock, Mail, Phone, User, CalendarDays } from 'lucide-react';

const Book = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [reservationDetails, setReservationDetails] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '7:00 PM',
    guests: 2,
    specialRequests: ''
  });

  const timeOptions = [
    '12:00 PM',
    '2:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === 'guests' ? parseInt(value, 10) : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('http://localhost:5000/api/reservations', formData);
      setReservationDetails(response.data);
      setTimeout(() => {
        setSuccess(true);
      }, 500);
    } catch (err) {
      console.error('Error reserving table:', err);
      setError(err.response?.data?.message || 'Failed to book table. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatVisualDate = (dateStr) => {
    if (!dateStr) return '';
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-bg-main text-text-light pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative z-10">
      {/* Glow backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[20%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-accent-brand/5 blur-[100px]" />
      </div>

      <div 
        style={{ perspective: 1200 }} 
        className="w-full max-w-xl z-10"
      >
        {/* 3D Flip Card Container */}
        <motion.div
          animate={{ rotateY: success ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full min-h-[640px] sm:min-h-[685px]"
        >
          {/* ========================================== */}
          {/* CARD FRONT: RESERVATION FORM */}
          {/* ========================================== */}
          <div 
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0 w-full h-full bg-card-dark/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex p-3 rounded-full bg-accent-brand/10 border border-accent-brand/20 text-accent-brand mb-3 shadow-[0_0_15px_rgba(255,59,48,0.15)]">
                <Calendar className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold text-text-light mb-2 font-montserrat uppercase tracking-wider">Book a Table</h1>
              <p className="text-gray-500 text-xs sm:text-sm font-light">
                Secure your seat in the dining hall. We welcome you to experience culinary royalty.
              </p>
            </div>

            {error && (
              <div className="p-4 mb-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-500 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 flex-grow">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-4.5 w-4.5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Gayatri Devi"
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand transition-all duration-300"
                  />
                </div>
              </div>

              {/* Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-4.5 w-4.5" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="maharaja@royal.com"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-4.5 w-4.5" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 99999 88888"
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Date */}
                <div className="sm:col-span-1">
                  <label htmlFor="date" className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3.2 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand transition-all duration-300"
                  />
                </div>

                {/* Time */}
                <div className="sm:col-span-1">
                  <label htmlFor="time" className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">
                    Time Slot
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand transition-all"
                  >
                    {timeOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Guests */}
                <div className="sm:col-span-1">
                  <label htmlFor="guests" className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">
                    Guests Count
                  </label>
                  <select
                    id="guests"
                    name="guests"
                    required
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand transition-all"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label htmlFor="specialRequests" className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows="2"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="e.g. Birthday setup, wheelchair accessibility..."
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand transition-all duration-300"
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
                      <span>CONFIRMING TABLE...</span>
                    </>
                  ) : (
                    <span>RESERVE MY TABLE</span>
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          {/* ========================================== */}
          {/* CARD BACK: RESERVATION RECEIPT */}
          {/* ========================================== */}
          <div 
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            className="absolute inset-0 w-full h-full bg-card-dark/80 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between items-center text-center"
          >
            {/* Success Details */}
            <div className="w-full flex flex-col items-center">
              <div className="flex justify-center mb-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={success ? { scale: 1 } : { scale: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.4 }}
                  className="h-20 w-20 rounded-full bg-accent-brand/10 border border-accent-brand/20 flex items-center justify-center text-accent-brand shadow-[0_0_15px_rgba(255,59,48,0.25)]"
                >
                  <CheckCircle className="h-12 w-12" />
                </motion.div>
              </div>
              
              <h2 className="text-3xl font-bold text-text-light mb-2 font-montserrat uppercase tracking-wider">Table Reserved!</h2>
              <p className="text-accent-brand font-sans italic text-base mb-6">We await your arrival at Swad Vatika</p>
              
              {/* Receipt Plate */}
              {reservationDetails && (
                <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mb-6 text-left space-y-3.5 w-full shadow-sm">
                  <div className="flex items-center space-x-3 text-text-light">
                    <User className="h-4.5 w-4.5 text-accent-brand flex-shrink-0" />
                    <span className="text-sm font-semibold">{reservationDetails.name}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <CalendarDays className="h-4.5 w-4.5 text-accent-brand flex-shrink-0" />
                    <span className="text-sm">{formatVisualDate(reservationDetails.date)}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Clock className="h-4.5 w-4.5 text-accent-brand flex-shrink-0" />
                    <span className="text-sm">{reservationDetails.time}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Users className="h-4.5 w-4.5 text-accent-brand flex-shrink-0" />
                    <span className="text-sm">{reservationDetails.guests} Guests</span>
                  </div>
                  {reservationDetails.specialRequests && (
                    <div className="pt-2 border-t border-white/5">
                      <p className="text-[9px] uppercase tracking-wider text-gray-500 font-bold mb-1">Special Requests</p>
                      <p className="text-xs text-gray-400 italic leading-relaxed">"{reservationDetails.specialRequests}"</p>
                    </div>
                  )}
                </div>
              )}
              
              <p className="text-gray-500 text-xxs leading-relaxed max-w-sm">
                A confirmation has been sent to your email address. If you need to make changes or cancel, please contact us at least 2 hours in advance.
              </p>
            </div>

            {/* Back Home Button */}
            <div className="w-full pt-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center space-x-2 w-full bg-accent-brand text-white font-bold tracking-widest text-xs py-4 rounded-full shadow-lg shadow-accent-brand/25 hover:bg-accent-brand/90 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>RETURN TO PALACE</span>
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Book;
