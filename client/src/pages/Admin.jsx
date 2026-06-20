import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, TrendingUp, Calendar, ShoppingBag, Utensils, 
  Trash2, Plus, Loader2, CheckCircle, RefreshCw, AlertCircle
} from 'lucide-react';

const Admin = () => {
  // Authentication State
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('swad_admin_authenticated') === 'true';
  });
  const [authError, setAuthError] = useState('');

  // Tab State: 'analytics' | 'orders' | 'reservations' | 'menu'
  const [activeTab, setActiveTab] = useState('analytics');

  // Data States
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  
  // Loading States
  const [refreshing, setRefreshing] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Add Menu Item Form State
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Starters',
    price: '',
    description: '',
    isVeg: true,
    imageUrl: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'swad2024') {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('swad_admin_authenticated', 'true');
    } else {
      setAuthError('Incorrect vault code. Access denied.');
    }
  };

  const fetchData = async () => {
    try {
      setRefreshing(true);
      const [analyticsRes, ordersRes, reservationsRes, menuRes] = await Promise.all([
        axios.get('http://localhost:5000/api/analytics'),
        axios.get('http://localhost:5000/api/orders'),
        axios.get('http://localhost:5000/api/reservations'),
        axios.get('http://localhost:5000/api/menu')
      ]);

      setAnalytics(analyticsRes.data);
      setOrders(ordersRes.data);
      setReservations(reservationsRes.data);
      setMenuItems(menuRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error('Error changing order status:', err);
    }
  };

  const handleReservationStatusChange = async (resId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/reservations/${resId}`, { status: newStatus });
      fetchData();
    } catch (err) {
      console.error('Error changing reservation status:', err);
    }
  };

  const handleDeleteMenuItem = async (itemId) => {
    if (!window.confirm('Delete this dish from the menu?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/menu/${itemId}`);
      fetchData();
    } catch (err) {
      console.error('Error deleting menu item:', err);
    }
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    const defaultImages = {
      'Starters': 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=600',
      'Mains': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600',
      'Biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=600',
      'Breads': 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&q=80&w=600',
      'Desserts': 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=600',
      'Drinks': 'https://images.unsplash.com/photo-1517093602195-b40af9688b46?auto=format&fit=crop&q=80&w=600'
    };

    const payload = {
      ...newItem,
      price: parseFloat(newItem.price),
      imageUrl: newItem.imageUrl.trim() || defaultImages[newItem.category]
    };

    if (isNaN(payload.price) || payload.price <= 0) {
      setFormError('Please enter a valid price.');
      return;
    }

    try {
      setFormLoading(true);
      await axios.post('http://localhost:5000/api/menu', payload);
      setFormSuccess('Dish added to catalog!');
      setNewItem({
        name: '',
        category: 'Starters',
        price: '',
        description: '',
        isVeg: true,
        imageUrl: ''
      });
      fetchData();
    } catch (err) {
      console.error('Error adding item:', err);
      setFormError(err.response?.data?.message || 'Failed to add item.');
    } finally {
      setFormLoading(false);
    }
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('swad_admin_authenticated');
  };

  // --- LOGIN PANEL ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center pt-20 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 sm:p-10 bg-card-dark/80 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl text-center"
        >
          <div className="inline-flex p-3 rounded-full bg-accent-brand/10 border border-accent-brand/20 text-accent-brand mb-4 shadow-[0_0_15px_rgba(255,59,48,0.2)]">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-black text-text-light mb-2 font-montserrat uppercase tracking-wider">Admin Chambers</h1>
          <p className="text-gray-500 text-xs sm:text-sm font-light mb-6">
            Enter vault password to access command center.
          </p>

          {authError && (
            <div className="p-3.5 mb-5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black/40 text-sm text-text-light text-center focus:outline-none focus:border-accent-brand transition-all duration-300"
            />
            <button
              type="submit"
              className="w-full bg-accent-brand text-white font-bold tracking-widest text-xs py-4 rounded-full shadow-[0_8px_20px_rgba(255,59,48,0.3)] hover:bg-accent-brand/90 transition-all duration-300"
            >
              ACCESS VAULT
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- COMMAND CENTER DASHBOARD ---
  return (
    <div className="min-h-screen bg-bg-main text-text-light pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-6 border-b border-white/5">
          <div>
            <h1 className="text-3xl font-black font-montserrat flex items-center gap-3 text-text-light uppercase tracking-wider">
              Command Center
              {refreshing && <RefreshCw className="h-5 w-5 text-accent-brand animate-spin" />}
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm font-light mt-1 font-sans">
              Live orders, table reservations, and catalog manager dashboard.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="inline-flex items-center justify-center p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-text-light transition-all"
              aria-label="Refresh Data"
              title="Refresh Data"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={logoutAdmin}
              className="bg-accent-brand text-white hover:bg-accent-brand/90 text-xs tracking-widest font-bold uppercase px-6 py-3 rounded-xl transition-all shadow-[0_4px_15px_rgba(255,59,48,0.3)]"
            >
              LOCK VAULT
            </button>
          </div>
        </div>

        {/* Tab Navigation with layoutId sliding line */}
        <div className="flex flex-wrap gap-2 mb-8 bg-card-dark/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/5 w-fit">
          {[
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'reservations', label: 'Reservations', icon: Calendar },
            { id: 'menu', label: 'Menu Manager', icon: Utensils }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 z-10 ${
                  isActive ? 'text-white' : 'text-gray-500 hover:text-text-light'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeAdminTab"
                    className="absolute inset-0 bg-accent-brand rounded-xl z-[-1] shadow-[0_4px_15px_rgba(255,59,48,0.3)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Box */}
        <div className="bg-card-dark/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* ========================================== */}
            {/* ANALYTICS TAB */}
            {/* ========================================== */}
            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <h2 className="font-montserrat text-xl font-black text-text-light uppercase tracking-wider pb-3 border-b border-white/5">
                  Performance Metrics
                </h2>
                
                {analytics ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Revenue Card (Glowing Red) */}
                    <motion.div 
                      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(255, 59, 48, 0.12)" }}
                      className="bg-black/40 border border-white/5 p-6 rounded-2xl flex items-center space-x-5 transition-shadow"
                    >
                      <div className="p-4 rounded-xl bg-accent-brand/10 text-accent-brand border border-accent-brand/20">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Gross Revenue</p>
                        <p className="text-2xl font-black text-text-light mt-1">₹{analytics.totalRevenue.toLocaleString()}</p>
                        <p className="text-[9px] text-emerald-500 font-bold mt-1 uppercase">Live Confirmed</p>
                      </div>
                    </motion.div>

                    {/* Orders Card */}
                    <motion.div 
                      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(255, 59, 48, 0.12)" }}
                      className="bg-black/40 border border-white/5 p-6 rounded-2xl flex items-center space-x-5 transition-shadow"
                    >
                      <div className="p-4 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        <ShoppingBag className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Placed Orders</p>
                        <p className="text-2xl font-black text-text-light mt-1">{analytics.totalOrders}</p>
                        <p className="text-[9px] text-gray-500 font-light mt-1">Platter checkouts</p>
                      </div>
                    </motion.div>

                    {/* Reservations Card */}
                    <motion.div 
                      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(255, 59, 48, 0.12)" }}
                      className="bg-black/40 border border-white/5 p-6 rounded-2xl flex items-center space-x-5 transition-shadow"
                    >
                      <div className="p-4 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Bookings</p>
                        <p className="text-2xl font-black text-text-light mt-1">{analytics.totalReservations}</p>
                        <p className="text-[9px] text-gray-500 font-light mt-1">Hall table bookings</p>
                      </div>
                    </motion.div>

                    {/* Menu Items Card */}
                    <motion.div 
                      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(255, 59, 48, 0.12)" }}
                      className="bg-black/40 border border-white/5 p-6 rounded-2xl flex items-center space-x-5 transition-shadow"
                    >
                      <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        <Utensils className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Recipes Catalog</p>
                        <p className="text-2xl font-black text-text-light mt-1">{analytics.totalMenuItems}</p>
                        <p className="text-[9px] text-gray-500 font-light mt-1">Dishes active</p>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-20">
                    <Loader2 className="h-8 w-8 text-accent-brand animate-spin" />
                  </div>
                )}
              </motion.div>
            )}

            {/* ========================================== */}
            {/* ORDERS TAB */}
            {/* ========================================== */}
            {activeTab === 'orders' && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <h2 className="font-montserrat text-xl font-black text-text-light uppercase tracking-wider pb-3 border-b border-white/5">
                  Active Orders ({orders.length})
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider font-bold text-gray-500 bg-black/20">
                        <th className="py-4 px-4">Customer</th>
                        <th className="py-4 px-4">Phone</th>
                        <th className="py-4 px-4">Dishes Platter</th>
                        <th className="py-4 px-4">Address</th>
                        <th className="py-4 px-4">Total</th>
                        <th className="py-4 px-4">Date</th>
                        <th className="py-4 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs text-gray-400">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="py-8 text-center text-gray-500 italic">No orders received yet.</td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order._id} className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 font-semibold text-text-light">{order.customerName}</td>
                            <td className="py-4 px-4">{order.phone}</td>
                            <td className="py-4 px-4 max-w-xs text-text-light/95">
                              {order.items.map((i) => `${i.name} (x${i.quantity})`).join(', ')}
                            </td>
                            <td className="py-4 px-4 max-w-xxs truncate" title={order.address}>
                              {order.address}
                            </td>
                            <td className="py-4 px-4 font-bold text-accent-brand">₹{order.totalAmount}</td>
                            <td className="py-4 px-4 text-gray-500">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <select
                                value={order.status}
                                onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                                className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border focus:outline-none bg-bg-main transition-all ${
                                  order.status === 'Pending'
                                    ? 'text-amber-500 border-amber-500/20 hover:border-amber-500'
                                    : order.status === 'Confirmed'
                                    ? 'text-blue-400 border-blue-400/20 hover:border-blue-400'
                                    : 'text-emerald-400 border-emerald-400/20 hover:border-emerald-400'
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* RESERVATIONS TAB */}
            {/* ========================================== */}
            {activeTab === 'reservations' && (
              <motion.div
                key="reservations"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <h2 className="font-montserrat text-xl font-black text-text-light uppercase tracking-wider pb-3 border-b border-white/5">
                  Bookings Log ({reservations.length})
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] uppercase tracking-wider font-bold text-gray-500 bg-black/20">
                        <th className="py-4 px-4">Guest</th>
                        <th className="py-4 px-4">Contact</th>
                        <th className="py-4 px-4">Guests</th>
                        <th className="py-4 px-4">Slot</th>
                        <th className="py-4 px-4">Special Requests</th>
                        <th className="py-4 px-4">Booked Date</th>
                        <th className="py-4 px-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs text-gray-400">
                      {reservations.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="py-8 text-center text-gray-500 italic">No bookings found.</td>
                        </tr>
                      ) : (
                        reservations.map((res) => (
                          <tr key={res._id} className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 font-semibold text-text-light">{res.name}</td>
                            <td className="py-4 px-4">
                              <div>{res.phone}</div>
                              <div className="text-[10px] text-gray-600">{res.email}</div>
                            </td>
                            <td className="py-4 px-4 text-text-light font-semibold">{res.guests} Pax</td>
                            <td className="py-4 px-4">
                              <div className="text-text-light">{new Date(res.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                              <div className="text-[10px] text-accent-brand font-bold mt-0.5">{res.time}</div>
                            </td>
                            <td className="py-4 px-4 text-gray-500 max-w-xxs truncate italic" title={res.specialRequests}>
                              {res.specialRequests || 'None'}
                            </td>
                            <td className="py-4 px-4 text-gray-600">
                              {new Date(res.createdAt).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4 text-center">
                              <select
                                value={res.status}
                                onChange={(e) => handleReservationStatusChange(res._id, e.target.value)}
                                className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border focus:outline-none bg-bg-main transition-all ${
                                  res.status === 'Pending'
                                    ? 'text-amber-500 border-amber-500/20 hover:border-amber-500'
                                    : res.status === 'Confirmed'
                                    ? 'text-emerald-400 border-emerald-400/20 hover:border-emerald-400'
                                    : 'text-rose-500 border-rose-500/20 hover:border-rose-505'
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* ========================================== */}
            {/* MENU MANAGER TAB */}
            {/* ========================================== */}
            {activeTab === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                <h2 className="font-montserrat text-xl font-black text-text-light uppercase tracking-wider pb-3 border-b border-white/5">
                  Recipe Catalog Manager
                </h2>

                {/* Form to Add New Dish (Dark Glass) */}
                <div className="bg-black/30 border border-white/5 rounded-2xl p-6">
                  <h3 className="font-montserrat text-sm font-black text-text-light uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Plus className="h-4.5 w-4.5 text-accent-brand" />
                    Introduce Royal Dish
                  </h3>

                  {formError && <div className="p-3.5 mb-5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs">{formError}</div>}
                  {formSuccess && <div className="p-3.5 mb-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-500 text-xs">{formSuccess}</div>}

                  <form onSubmit={handleAddMenuItem} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    
                    {/* Dish Name */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Dish Name</label>
                      <input
                        type="text"
                        required
                        value={newItem.name}
                        onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Saffron Malai Kofta"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand focus:ring-1 focus:ring-accent-brand/25 transition-all"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Category</label>
                      <select
                        value={newItem.category}
                        onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand transition-all"
                      >
                        <option value="Starters">Starters</option>
                        <option value="Mains">Mains</option>
                        <option value="Biryani">Biryani</option>
                        <option value="Breads">Breads</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Drinks">Drinks</option>
                      </select>
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Price (in ₹)</label>
                      <input
                        type="number"
                        required
                        value={newItem.price}
                        onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="Price e.g. 850"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand focus:ring-1 focus:ring-accent-brand/25 transition-all"
                      />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Description</label>
                      <input
                        type="text"
                        required
                        value={newItem.description}
                        onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Describe the royal blend, spices, cooking style..."
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand focus:ring-1 focus:ring-accent-brand/25 transition-all"
                      />
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-2">Image URL (Optional)</label>
                      <input
                        type="url"
                        value={newItem.imageUrl}
                        onChange={(e) => setNewItem(prev => ({ ...prev, imageUrl: e.target.value }))}
                        placeholder="Image URL"
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/40 text-xs text-text-light focus:outline-none focus:border-accent-brand focus:ring-1 focus:ring-accent-brand/25 transition-all"
                      />
                    </div>

                    {/* Veg/Non-Veg toggle */}
                    <div className="flex items-center space-x-3 mb-2 h-[42px]">
                      <span className="text-xs font-bold text-gray-500">Recipe Type:</span>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newItem.isVeg}
                          onChange={(e) => setNewItem(prev => ({ ...prev, isVeg: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-white/10 border border-white/5 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-400 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500 peer-checked:after:bg-white"></div>
                      </label>
                      <span className={`text-xs font-extrabold tracking-wider ${newItem.isVeg ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {newItem.isVeg ? 'VEGETARIAN' : 'NON-VEGETARIAN'}
                      </span>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        disabled={formLoading}
                        className="w-full bg-accent-brand text-white font-bold tracking-widest text-xs py-3.5 rounded-xl hover:bg-accent-brand/90 transition-all flex items-center justify-center space-x-2 shadow-[0_4px_15px_rgba(255,59,48,0.25)]"
                      >
                        {formLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <span>ADD DISH TO MENU</span>}
                      </button>
                    </div>

                  </form>
                </div>

                {/* List Existing Items */}
                <div className="space-y-5">
                  <h3 className="font-montserrat text-sm font-black text-text-light uppercase tracking-wider">Catalog List ({menuItems.length} items)</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map((item) => (
                      <div key={item._id} className="border border-white/5 rounded-2xl overflow-hidden bg-black/20 flex space-x-4 p-4 items-center">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl border border-white/10 shadow-sm"
                        />
                        <div className="flex-grow min-w-0">
                          <h4 className="font-bold text-xs text-text-light truncate" title={item.name}>{item.name}</h4>
                          <p className="text-xs text-accent-brand font-extrabold mt-0.5">₹{item.price}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-[9px] uppercase tracking-widest text-gray-500 font-bold">{item.category}</span>
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                          </div>
                        </div>
                        
                        {/* Delete Button (Glowing Red) */}
                        <button
                          onClick={() => handleDeleteMenuItem(item._id)}
                          className="p-2.5 rounded-xl text-gray-500 hover:text-accent-brand hover:bg-accent-brand/10 border border-transparent hover:border-accent-brand/20 transition-all"
                          aria-label="Delete item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Admin;
