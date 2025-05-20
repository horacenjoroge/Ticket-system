import { useState } from 'react';
import { motion } from 'framer-motion';
import { Stage } from 'lucide-react';

type SeatStatus = 'available' | 'selected' | 'reserved';

interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
  price: number;
}

interface SeatMapProps {
  onSeatSelect: (selectedSeats: Seat[]) => void;
}

const SeatMap = ({ onSeatSelect }: SeatMapProps) => {
  // Generate some example seats
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    
    rows.forEach((row, rowIndex) => {
      const seatsInRow = 12;
      for (let i = 1; i <= seatsInRow; i++) {
        // Make some seats randomly reserved
        const isReserved = Math.random() < 0.3;
        
        seats.push({
          id: `${row}${i}`,
          row,
          number: i,
          status: isReserved ? 'reserved' : 'available',
          price: 50 + (rows.length - rowIndex) * 10, // Price based on row
        });
      }
    });
    
    return seats;
  };
  
  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  
  const handleSeatClick = (seatId: string) => {
    const updatedSeats = seats.map(seat => {
      if (seat.id === seatId && seat.status !== 'reserved') {
        const newStatus = seat.status === 'available' ? 'selected' : 'available';
        return { ...seat, status: newStatus };
      }
      return seat;
    });
    
    setSeats(updatedSeats);
    
    // Pass selected seats to parent
    const selectedSeats = updatedSeats.filter(seat => seat.status === 'selected');
    onSeatSelect(selectedSeats);
  };
  
  const getColorBySeatStatus = (status: SeatStatus): string => {
    switch (status) {
      case 'available':
        return 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600';
      case 'selected':
        return 'bg-primary-500 text-white';
      case 'reserved':
        return 'bg-neutral-400 dark:bg-neutral-600 cursor-not-allowed opacity-50';
      default:
        return '';
    }
  };
  
  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);
  
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex flex-col items-center min-w-[600px]">
        {/* Stage */}
        <div className="w-3/4 mb-8 flex flex-col items-center">
          <Stage size={36} className="text-primary-500 mb-2" />
          <div className="w-full h-6 bg-neutral-300 dark:bg-neutral-700 rounded-t-full opacity-50"></div>
          <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-400">STAGE</p>
        </div>
        
        {/* Seat map */}
        <div className="grid gap-y-4">
          {Object.keys(seatsByRow).map(row => (
            <div key={row} className="flex items-center">
              <div className="w-8 font-bold text-center">{row}</div>
              <div className="flex gap-2">
                {seatsByRow[row].map(seat => (
                  <motion.button
                    key={seat.id}
                    whileHover={seat.status !== 'reserved' ? { scale: 1.1 } : {}}
                    whileTap={seat.status !== 'reserved' ? { scale: 0.9 } : {}}
                    onClick={() => handleSeatClick(seat.id)}
                    disabled={seat.status === 'reserved'}
                    className={`w-8 h-8 flex items-center justify-center rounded-t-lg text-xs font-medium ${getColorBySeatStatus(seat.status)}`}
                    title={`Row ${seat.row}, Seat ${seat.number} - $${seat.price}`}
                  >
                    {seat.number}
                  </motion.button>
                ))}
              </div>
              <div className="w-8 font-bold text-center">{row}</div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="mt-8 flex gap-6 items-center">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-neutral-200 dark:bg-neutral-700 mr-2"></div>
            <span className="text-xs">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-primary-500 mr-2"></div>
            <span className="text-xs">Selected</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-sm bg-neutral-400 dark:bg-neutral-600 opacity-50 mr-2"></div>
            <span className="text-xs">Reserved</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;