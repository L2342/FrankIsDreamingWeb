
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ParallaxProvider } from "react-scroll-parallax";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  </StrictMode>,
)
