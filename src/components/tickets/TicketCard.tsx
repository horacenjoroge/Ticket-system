import { useState } from 'react';
import { Calendar, MapPin, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { format } from 'date-fns';
import QRCode from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../ui/Card';
import { Ticket } from '../../types/tickets';

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard = ({ ticket }: TicketCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const {
    id,
    eventName,
    eventDate,
    venue,
    seatInfo,
    price,
    purchaseDate,
    ticketCode,
    status,
  } = ticket;
  
  const formattedEventDate = format(new Date(eventDate), 'MMM d, yyyy');
  const formattedEventTime = format(new Date(eventDate), 'h:mm a');
  const formattedPurchaseDate = format(new Date(purchaseDate), 'MMM d, yyyy');
  
  // Status color mapping
  const statusColor = {
    valid: 'bg-success-500',
    used: 'bg-neutral-500',
    cancelled: 'bg-error-500',
  }[status] || 'bg-neutral-500';
  
  return (
    <Card className="overflow-visible">
      <div className="relative p-4">
        {/* Status indicator */}
        <div className="absolute top-4 right-4 flex items-center">
          <div className={`w-2 h-2 rounded-full ${statusColor} mr-2`}></div>
          <span className="text-xs font-medium capitalize">{status}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-3 pr-20">{eventName}</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <Calendar size={16} className="mr-2" />
            <span>{formattedEventDate}</span>
          </div>
          
          <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400">
            <Clock size={16} className="mr-2" />
            <span>{formattedEventTime}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          <MapPin size={16} className="mr-2" />
          <span>{venue}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">Seat</div>
            <div className="font-semibold">{seatInfo}</div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors"
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-neutral-200 dark:border-neutral-700"
          >
            <div className="p-4">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-white rounded-lg">
                  <QRCode 
                    value={ticketCode}
                    size={128}
                    renderAs="svg"
                    includeMargin={true}
                    bgColor="#FFFFFF"
                    fgColor="#000000"
                    level="H"
                  />
                </div>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-xs text-neutral-600 dark:text-neutral-400">Ticket Code</div>
                <div className="font-mono font-medium">{ticketCode}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-neutral-600 dark:text-neutral-400">Price</div>
                  <div className="font-semibold">${price.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-neutral-600 dark:text-neutral-400">Purchase Date</div>
                  <div>{formattedPurchaseDate}</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

export default TicketCard;