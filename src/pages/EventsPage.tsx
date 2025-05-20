import { useState } from 'react';
import { motion } from 'framer-motion';
import EventCategories from '../components/events/EventCategories';
import EventList from '../components/events/EventList';
import { mockEvents } from '../data/mockData';

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const filteredEvents = selectedCategory 
    ? mockEvents.filter(event => event.category.toLowerCase() === selectedCategory.toLowerCase())
    : mockEvents;
  
  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-6">Discover Events</h1>
        
        <EventCategories onCategorySelect={setSelectedCategory} />
        
        <EventList events={filteredEvents} />
      </motion.div>
    </div>
  );
};

export default EventsPage;