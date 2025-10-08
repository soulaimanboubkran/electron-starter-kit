import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Browser shim to provide a safe `window.electron` when running in a browser

import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
