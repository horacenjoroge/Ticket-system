export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  imageUrl: string;
  price: number;
  category: string;
  organizer: string;
  featured: boolean;
  seats: number;
  availableSeats: number;
}