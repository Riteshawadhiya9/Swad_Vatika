import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Book from './pages/Book';
import Admin from './pages/Admin';

import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-bg-main text-text-light font-sans">
          {/* Sticky Navbar */}
          <Navbar />
          
          {/* Global Cart Drawer */}
          <CartSidebar />

          {/* Main Content Area */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/order" element={<Order />} />
              <Route path="/book" element={<Book />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
