import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="bg-mesh" aria-hidden="true"/>
      <div className="bg-grid" aria-hidden="true"/>
      <App/>
      <Toaster position="bottom-right" toastOptions={{
        style:{ background:'#111827', color:'#eef2ff', border:'1px solid #1e2d47', fontFamily:"'Plus Jakarta Sans',sans-serif", fontSize:'14px' },
        success:{ iconTheme:{ primary:'#10b981', secondary:'#111827' } },
        error:  { iconTheme:{ primary:'#ef4444', secondary:'#111827' } },
      }}/>
    </BrowserRouter>
  </React.StrictMode>
)
