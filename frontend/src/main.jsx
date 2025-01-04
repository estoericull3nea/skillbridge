import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppWrapper from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrimeReactProvider } from 'primereact/api'

import 'primereact/resources/themes/lara-light-cyan/theme.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <AppWrapper />
      </PrimeReactProvider>
    </QueryClientProvider>
  </StrictMode>
)
