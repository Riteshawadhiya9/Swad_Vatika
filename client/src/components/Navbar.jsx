import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Utensils, Calendar, ShoppingBag, BarChart2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleCart, cartCount } = useCart();

  const navLinks = [
    { name: 'Home', path: '/', icon: null },
    { name: 'Menu', path: '/menu', icon: Utensils },
    { name: 'Book a Table', path: '/book', icon: Calendar },
    { name: 'Admin', path: '/admin', icon: BarChart2 }
  ];

  const activeStyle = ({ isActive }) => 
    `relative py-2 text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
      isActive 
        ? 'text-accent-brand after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-accent-brand' 
        : 'text-gray-400 hover:text-accent-brand after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-accent-brand hover:after:w-full after:transition-all after:duration-300'
    }`;

  const mobileActiveStyle = ({ isActive }) =>
    `flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
      isActive
        ? 'bg-accent-brand/10 text-accent-brand'
        : 'text-gray-400 hover:bg-white/5 hover:text-accent-brand'
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-bg-main/80 border-b border-white/10 shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex flex-col">
              <span className="font-montserrat text-2xl font-black tracking-widest text-light">
                SWAD <span className="text-accent-brand">VATIKA</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-bold -mt-0.5">
                M O D E R N   E A T E R Y
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links & Buttons */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <NavLink 
                key={link.name} 
                to={link.path} 
                className={activeStyle}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Desktop Cart Button */}
            <button
              onClick={toggleCart}
              id="cart-trigger-desktop"
              className="relative p-2 text-gray-400 hover:text-accent-brand transition-colors duration-300 ml-4 focus:outline-none"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-accent-brand text-white leading-none transform translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(255,59,48,0.5)]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now Button */}
            <Link
              to="/order"
              className="bg-accent-brand hover:bg-accent-brand/90 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(255,59,48,0.3)] hover:shadow-[0_4px_25px_rgba(255,59,48,0.5)] transition-all duration-300"
            >
              ORDER NOW
            </Link>
          </div>

          {/* Mobile Menu Button & Cart Icon */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Mobile Cart Button */}
            <button
              onClick={toggleCart}
              id="cart-trigger-mobile"
              className="relative p-2 text-gray-400 hover:text-accent-brand transition-colors duration-300 focus:outline-none"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-accent-brand text-white leading-none transform translate-x-1/3 -translate-y-1/3 shadow-[0_0_10px_rgba(255,59,48,0.5)]">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-accent-brand hover:bg-white/5 focus:outline-none transition-all duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-bg-main transition-all duration-300 ease-in-out">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 shadow-inner">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={mobileActiveStyle}
                  onClick={() => setIsOpen(false)}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
            
            {/* Mobile Order Now Link */}
            <Link
              to="/order"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full bg-accent-brand text-white font-bold text-sm py-3.5 rounded-xl mt-3 shadow-[0_4px_15px_rgba(255,59,48,0.3)] hover:bg-accent-brand/90"
            >
              ORDER NOW
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
