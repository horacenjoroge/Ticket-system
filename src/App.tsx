import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './context/ThemeContext';
import Layout from './components/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const EventDetailsPage = lazy(() => import('./pages/EventDetailsPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const TicketsPage = lazy(() => import('./pages/TicketsPage'));

function App() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-neutral-900 text-neutral-100' : 'bg-neutral-50 text-neutral-900'} transition-colors duration-300`}>
      <Router>
        <Layout>
          <Suspense fallback={<div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailsPage />} />
              <Route path="/checkout/:id" element={<CheckoutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/tickets" element={<TicketsPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </div>
  );
}

export default App;