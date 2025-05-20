import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import SeatMap from '../components/checkout/SeatMap';
import OrderSummary from '../components/checkout/OrderSummary';
import { mockEvents } from '../data/mockData';

interface Seat {
  id: string;
  row: string;
  number: number;
  status: string;
  price: number;
}

const CheckoutPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [step, setStep] = useState(1);
  
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
  
  const handleSeatSelect = (seats: Seat[]) => {
    setSelectedSeats(seats);
  };
  
  const handleCheckout = () => {
    // Proceed to next step or complete purchase
    if (step === 1) {
      setStep(2);
    } else {
      // In a real app, this would process payment and create tickets
      navigate('/tickets');
    }
  };
  
  const stepTitles = ['1. Select Seats', '2. Payment'];
  
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">{event.title} - Checkout</h1>
      
      {/* Checkout Progress */}
      <div className="flex mb-8">
        {stepTitles.map((title, index) => (
          <div 
            key={index} 
            className="flex items-center"
          >
            <div 
              className={`flex items-center justify-center w-8 h-8 rounded-full font-medium text-sm mr-2 ${
                step > index 
                  ? 'bg-primary-500 text-white' 
                  : step === index + 1 
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-500 border-2 border-primary-500' 
                    : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500'
              }`}
            >
              {index + 1}
            </div>
            <span className={`mr-4 text-sm ${
              step > index 
                ? 'text-primary-500 font-medium' 
                : step === index + 1 
                  ? 'font-medium' 
                  : 'text-neutral-500'
            }`}>
              {title}
            </span>
            {index < stepTitles.length - 1 && (
              <div className="w-8 h-px bg-neutral-300 dark:bg-neutral-700 mr-4"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-apple p-6"
            >
              <h2 className="text-xl font-semibold mb-6">Select Your Seats</h2>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                Click on available seats to select them for purchase.
              </p>
              
              <SeatMap onSeatSelect={handleSeatSelect} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-apple p-6"
            >
              <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
              
              <div className="space-y-6">
                {/* Card Information */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Security Code (CVV)
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>
                </div>
                
                {/* Billing Information */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Billing Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main St"
                    className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all mb-4"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="City"
                      className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                    
                    <input
                      type="text"
                      placeholder="Zip Code"
                      className="w-full px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <OrderSummary 
            event={event}
            selectedSeats={selectedSeats}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;