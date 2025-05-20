import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, CreditCard, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import { Event } from '../../types/events';

interface Seat {
  id: string;
  row: string;
  number: number;
  price: number;
}

interface OrderSummaryProps {
  event: Event;
  selectedSeats: Seat[];
  onCheckout: () => void;
}

const OrderSummary = ({ event, selectedSeats, onCheckout }: OrderSummaryProps) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  // Calculate subtotal
  const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  
  // Service fee calculation (10% of subtotal)
  const serviceFee = subtotal * 0.10;
  
  // Discount calculation (apply 15% if promo code is applied)
  const discount = promoApplied ? subtotal * 0.15 : 0;
  
  // Total calculation
  const total = subtotal + serviceFee - discount;
  
  const handleApplyPromo = () => {
    if (promoCode.trim().toLowerCase() === 'discount15') {
      setPromoApplied(true);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-neutral-800 rounded-xl shadow-apple-lg p-6"
    >
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      <div className="mb-6">
        <div className="flex items-start mb-4">
          <Ticket className="h-5 w-5 text-primary-500 mt-1 mr-2" />
          <div>
            <h3 className="font-semibold">{event.title}</h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{event.location}</p>
          </div>
        </div>
        
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
          <h4 className="font-medium mb-2">Selected Seats ({selectedSeats.length})</h4>
          {selectedSeats.length > 0 ? (
            <div className="space-y-2">
              {selectedSeats.map(seat => (
                <div key={seat.id} className="flex justify-between text-sm">
                  <span>Row {seat.row}, Seat {seat.number}</span>
                  <span>${seat.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">No seats selected</p>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-grow px-3 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            disabled={promoApplied}
          />
          <Button
            onClick={handleApplyPromo}
            disabled={promoApplied || promoCode.trim() === ''}
            size="sm"
            variant={promoApplied ? 'secondary' : 'primary'}
          >
            {promoApplied ? 'Applied' : 'Apply'}
          </Button>
        </div>
        
        {promoApplied && (
          <div className="text-sm text-success-500 mb-4">
            Promo code applied! 15% discount.
          </div>
        )}
      </div>
      
      <div className="mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600 dark:text-neutral-400">Service Fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
        {promoApplied && (
          <div className="flex justify-between text-sm text-success-500">
            <span>Discount (15%)</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <Button
        onClick={onCheckout}
        disabled={selectedSeats.length === 0}
        fullWidth
        icon={<CreditCard size={16} />}
        iconPosition="left"
        className="group"
      >
        Proceed to Checkout
        <ChevronRight size={16} className="ml-1 transform transition-transform group-hover:translate-x-1" />
      </Button>
    </motion.div>
  );
};

export default OrderSummary;