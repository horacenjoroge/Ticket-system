import { useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket, Archive, ArrowDownAZ, Filter } from 'lucide-react';
import TicketCard from '../components/tickets/TicketCard';
import { mockTickets } from '../data/mockData';

const TicketsPage = () => {
  const [filter, setFilter] = useState<'all' | 'valid' | 'used' | 'cancelled'>('all');
  const [sortOrder, setSortOrder] = useState<'date-asc' | 'date-desc'>('date-desc');
  
  // Filter tickets
  const filteredTickets = mockTickets.filter(ticket => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });
  
  // Sort tickets
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const dateA = new Date(a.eventDate).getTime();
    const dateB = new Date(b.eventDate).getTime();
    return sortOrder === 'date-asc' ? dateA - dateB : dateB - dateA;
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            <Ticket className="h-6 w-6 mr-2 text-primary-500" />
            My Tickets
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage and view your purchased tickets
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={16} className="text-neutral-500" />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all appearance-none"
            >
              <option value="all">All Tickets</option>
              <option value="valid">Valid</option>
              <option value="used">Used</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ArrowDownAZ size={16} className="text-neutral-500" />
            </div>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              className="pl-9 pr-4 py-2 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all appearance-none"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>
      
      {sortedTickets.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sortedTickets.map((ticket) => (
            <motion.div key={ticket.id} variants={itemVariants}>
              <TicketCard ticket={ticket} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <Archive size={64} className="text-neutral-400 dark:text-neutral-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-md mb-6">
            {filter !== 'all' 
              ? `You don't have any ${filter} tickets at the moment.`
              : "You haven't purchased any tickets yet. Browse events to find your next experience!"}
          </p>
          <a 
            href="/events" 
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Explore Events
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default TicketsPage;