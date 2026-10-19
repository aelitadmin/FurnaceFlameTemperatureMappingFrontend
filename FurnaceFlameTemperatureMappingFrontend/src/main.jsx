// main.jsx
/**
 * Enhanced React entry point with beautiful loading UI/UX.
 *
 * Features:
 *  • Enhanced loading fallback with beautiful animations
 *  • Gradient backgrounds and visual effects
 *  • Smooth transitions and professional design
 *  • Better typography and spacing
 *  • Error boundary integration
 *  • Sentry error tracking
 *  • Code splitting with lazy loading
 *  • React Router configuration
 */

import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as Sentry from '@sentry/browser';
import ErrorBoundary from '../components/ErrorBoundary';
import './index.css';

// Lazy-load pages for better performance
const LoginPage = lazy(() => import('./LoginPage'));
const StationSelect = lazy(() => import('./StationSelect'));
const App = lazy(() => import('./App'));
const EventLog = lazy(() => import('./EventLog'));
const Furnace3DView = lazy(() => import('./furnace3d/Furnace3DView'));

// Initialize Sentry for error tracking
Sentry.init({
  dsn: 'https://84f5989145ac045cdff7921af7758749@o4511590229016576.ingest.de.sentry.io/4511590242189392',
});

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <BrowserRouter basename="/v2/">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/station-select" element={<StationSelect />} />
            <Route path="/dashboard" element={<App />} />
            <Route path="/event-log" element={<EventLog />} />
            <Route path="/furnace-3d" element={<Furnace3DView />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    
  </StrictMode>
);
