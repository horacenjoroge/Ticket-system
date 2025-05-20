import { useState } from 'react';
import { Music, Theater, Film, Coffee, Utensils, Monitor, Users, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryOption {
  id: string;
  label: string;
  icon: JSX.Element;
}

interface EventCategoriesProps {
  onCategorySelect: (category: string) => void;
}

const EventCategories = ({ onCategorySelect }: EventCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const categories: CategoryOption[] = [
    { id: 'concerts', label: 'Concerts', icon: <Music size={24} /> },
    { id: 'theater', label: 'Theater', icon: <Theater size={24} /> },
    { id: 'movies', label: 'Movies', icon: <Film size={24} /> },
    { id: 'food', label: 'Food & Drink', icon: <Utensils size={24} /> },
    { id: 'tech', label: 'Tech', icon: <Monitor size={24} /> },
    { id: 'social', label: 'Social', icon: <Users size={24} /> },
    { id: 'festivals', label: 'Festivals', icon: <Award size={24} /> },
    { id: 'workshops', label: 'Workshops', icon: <Coffee size={24} /> },
  ];
  
  const handleCategoryClick = (category: string) => {
    const newCategory = category === selectedCategory ? '' : category;
    setSelectedCategory(newCategory);
    onCategorySelect(newCategory);
  };
  
  return (
    <div className="py-6 overflow-x-auto">
      <div className="flex space-x-4 min-w-max pb-2">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex flex-col items-center justify-center px-4 py-3 rounded-xl cursor-pointer transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-500 text-white'
                : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
            } shadow-apple`}
          >
            <div className="mb-2">{category.icon}</div>
            <span className="text-sm font-medium">{category.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventCategories;