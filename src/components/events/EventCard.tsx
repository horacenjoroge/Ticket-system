import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import Card from '../ui/Card';
import { Event } from '../../types/events';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const {
    id,
    title,
    imageUrl,
    date,
    location,
    price,
    category,
  } = event;

  const formattedDate = format(new Date(date), 'MMM d, yyyy');
  const formattedTime = format(new Date(date), 'h:mm a');

  return (
    <Link to={`/events/${id}`} className="block">
      <Card hover>
        <div className="relative">
          <div className="h-40 bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="absolute top-3 right-3">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-500/80 backdrop-blur-xs text-white rounded-lg">
              {category}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold line-clamp-1 mb-2">{title}</h3>
          
          <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            <Calendar size={16} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            <Clock size={16} className="mr-1" />
            <span>{formattedTime}</span>
          </div>
          
          <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mb-4">
            <MapPin size={16} className="mr-1" />
            <span className="line-clamp-1">{location}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">${price.toFixed(2)}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors"
            >
              Buy Tickets
            </motion.button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default EventCard;