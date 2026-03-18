// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#111624', color: '#eef2ff', border: '1px solid #1c2840', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' },
        success: { iconTheme: { primary: '#10b981', secondary: '#111624' } },
        error: { iconTheme: { primary: '#ef4444', secondary: '#111624' } },
      }} />
    </BrowserRouter>
  </React.StrictMode>
)
