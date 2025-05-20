import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import EventList from '../components/events/EventList';
import { mockEvents } from '../data/mockData';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredEvents, setFeaturedEvents] = useState(mockEvents.slice(0, 4));
  
  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div>
      {/* Hero Section */}
      <motion.section 
        className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.pexels.com/photos/1716296/pexels-photo-1716296.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
            alt="Concert" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/80 to-neutral-900/50 dark:from-neutral-900/90 dark:to-neutral-900/70"></div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              variants={itemVariants}
            >
              Find and book <span className="text-primary-500">amazing events</span> near you
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-8"
              variants={itemVariants}
            >
              Discover concerts, theater shows, sports events and more in your area
            </motion.p>
            
            <motion.div 
              className="bg-white dark:bg-neutral-800 rounded-lg shadow-apple-lg p-4 mb-8"
              variants={itemVariants}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Search size={20} className="text-neutral-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search for events, venues, or artists"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-700 border-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Calendar size={20} className="text-neutral-500" />
                  </div>
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-700 border-none focus:ring-2 focus:ring-primary-500 transition-all"
                  />
                </div>
                
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <MapPin size={20} className="text-neutral-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-neutral-100 dark:bg-neutral-700 border-none focus:ring-2 focus:ring-primary-500 transition-all"
                  />
                </div>
                
                <Button 
                  variant="primary" 
                  size="lg"
                  className="group"
                >
                  Search Events
                  <ChevronRight size={18} className="ml-1 transform transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Featured Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Events</h2>
            <Link 
              to="/events" 
              className="text-primary-500 hover:text-primary-600 flex items-center transition-colors"
            >
              View all
              <ChevronRight size={16} />
            </Link>
          </div>
          
          <EventList events={featuredEvents} />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-500 dark:bg-primary-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Host Your Own Event?</h2>
              <p className="text-white/90 mb-6">
                Get started with our easy-to-use platform and reach thousands of potential attendees.
              </p>
              <Button 
                variant="outlined" 
                className="bg-white text-primary-500 hover:bg-white/90"
              >
                Create Event
              </Button>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="Event hosting" 
                className="w-full h-64 object-cover rounded-xl shadow-apple-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;