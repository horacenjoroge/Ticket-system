import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Ticket, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? `${theme === 'dark' ? 'bg-neutral-900/95 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'} shadow-apple` 
          : `${theme === 'dark' ? 'bg-transparent' : 'bg-transparent'}`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Ticket className="h-6 w-6 mr-2 text-primary-500" />
              <span className="text-xl font-semibold bg-gradient-to-r from-primary-500 to-secondary-500 text-transparent bg-clip-text">
                TicketNova
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/events" 
              className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                location.pathname.includes('/events') ? 'text-primary-500' : ''
              }`}
            >
              Events
            </Link>
            
            <Link 
              to="/tickets" 
              className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                location.pathname === '/tickets' ? 'text-primary-500' : ''
              }`}
            >
              My Tickets
            </Link>
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <Link 
              to="/profile" 
              className="flex items-center text-sm font-medium"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white"
              >
                <User size={16} />
              </motion.div>
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleTheme}
              className="p-2 mr-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`md:hidden ${theme === 'dark' ? 'bg-neutral-900' : 'bg-white'} shadow-apple-lg`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/events" 
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                location.pathname.includes('/events') ? 'text-primary-500' : ''
              }`}
            >
              Events
            </Link>
            <Link 
              to="/tickets" 
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                location.pathname === '/tickets' ? 'text-primary-500' : ''
              }`}
            >
              My Tickets
            </Link>
            <Link 
              to="/profile" 
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${
                location.pathname === '/profile' ? 'text-primary-500' : ''
              }`}
            >
              Profile
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;