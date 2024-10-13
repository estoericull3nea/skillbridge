import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrimeReactProvider } from 'primereact/api'

import 'primereact/resources/themes/lara-light-cyan/theme.css'

// Initialize the QueryClient instance
const queryClient = new QueryClient()

// Use React's createRoot to render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </QueryClientProvider>
  </StrictMode>
)
