import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/css/common.css";
import "./assets/css/index.css";
import "./assets/css/rippleButton.css";
import "./assets/css/accordion.css";
import "./assets/css/scrollTriggeredAnimation.css";
import "./assets/css/modalDialog.css";
import "./assets/css/hamburgerMenu.css";
import "./assets/css/progressRate.css";
import "./assets/css/segmentButton.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
