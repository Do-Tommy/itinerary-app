import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TripPlanner from './TripPlanner.jsx'

createRoot(document.getElementById('root')).render(
  <TripPlanner/>
  
)
