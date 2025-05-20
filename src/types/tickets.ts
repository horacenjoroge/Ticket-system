export interface Ticket {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  venue: string;
  seatInfo: string;
  price: number;
  purchaseDate: string;
  ticketCode: string;
  status: 'valid' | 'used' | 'cancelled';
}