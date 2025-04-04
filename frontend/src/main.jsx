import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import VotingApp from './VotingApp.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <VotingApp />
  </StrictMode>,
)
