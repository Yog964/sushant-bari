import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { DevProvider } from './context/DevContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <DevProvider>
        <App />
      </DevProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
