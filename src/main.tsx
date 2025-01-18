import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='text-emerald-600 h-screen bg-gray-900'>
    <App />
    </div>
  </StrictMode>,
)
