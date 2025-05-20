import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Share2, Heart, Users, Ticket } from 'lucide-react';
import { format } from 'date-fns';
import Button from '../components/ui/Button';
import { mockEvents } from '../data/mockData';

const EventDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  
  // Find the event
  const event = mockEvents.find(event => event.id === id);
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Event not found</h2>
        <p className="mb-8">The event you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/events')}>Back to Events</Button>
      </div>
    );
  }
  
  const formattedDate = format(new Date(event.date), 'EEEE, MMMM d, yyyy');
  const formattedTime = format(new Date(event.date), 'h:mm a');
  
  const handlePurchase = () => {
    navigate(`/checkout/${event.id}`);
  };
  
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-full mb-4">
                {event.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Event Info */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-apple p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Date</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">{formattedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Time</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">{formattedTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Location</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-primary-500 mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium mb-1">Organizer</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">{event.organizer}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    variant="outlined"
                    size="sm"
                    onClick={() => setLiked(!liked)}
                    icon={<Heart size={16} className={liked ? 'fill-current text-accent-500' : ''} />}
                  >
                    {liked ? 'Saved' : 'Save'}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="sm"
                    icon={<Share2 size={16} />}
                  >
                    Share
                  </Button>
                </div>
              </div>
              
              {/* Description */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-apple p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">About This Event</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {event.description || 'Join us for an unforgettable night filled with amazing music, performances, and memories that will last a lifetime. This event features world-class artists and state-of-the-art production in a venue known for its incredible atmosphere.'}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Don't miss this opportunity to be part of something special. Tickets are selling fast, so secure yours today!
                </p>
              </div>
              
              {/* Details */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-apple p-6">
                <h2 className="text-xl font-semibold mb-4">Event Details</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Event Schedule</h3>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li>Doors Open: 6:00 PM</li>
                    <li>Main Event: 7:30 PM</li>
                    <li>Estimated End: 10:30 PM</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Additional Information</h3>
                  <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                    <li>Age Restriction: 18+</li>
                    <li>Food and beverages will be available for purchase</li>
                    <li>Wheelchair accessible venue</li>
                    <li>No refunds or exchanges</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-apple-lg p-6 sticky top-24"
            >
              <h2 className="text-xl font-semibold mb-6">Get Tickets</h2>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-neutral-600 dark:text-neutral-400">Price</span>
                  <span className="text-2xl font-bold">${event.price.toFixed(2)}</span>
                </div>
                
                <div className="flex text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                  <Users size={16} className="mr-1" />
                  <span>100+ people have already booked</span>
                </div>
                
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="mb-4"
                  icon={<Ticket size={18} />}
                  onClick={handlePurchase}
                >
                  Buy Tickets
                </Button>
                
                <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                  Tickets are selling fast! Don't miss out.
                </p>
              </div>
              
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-6">
                <h3 className="font-medium mb-3">Event Location</h3>
                <div className="aspect-video bg-neutral-200 dark:bg-neutral-700 rounded-lg overflow-hidden mb-3">
                  <img 
                    src="https://images.pexels.com/photos/7078661/pexels-photo-7078661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750" 
                    alt="Venue location" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{event.location}</p>
                <a 
                  href="#" 
                  className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
                >
                  View on map
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;