import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">TicketNova</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Your premium destination for tickets to the best events, concerts, theater shows, 
              and sporting events.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/events" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/tickets" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                  My Tickets
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
              Stay updated with the latest events and offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-lg bg-white dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              &copy; {year} TicketNova. All rights reserved.
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 md:mt-0">
              Made with <Heart size={16} className="inline text-accent-500" /> by TicketNova Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;