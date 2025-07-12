import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // File ini biasanya digunakan untuk CSS global jika diperlukan

// Baris ini mencari <div id="root"> di index.html...
ReactDOM.createRoot(document.getElementById('root')).render(
  // ...lalu merender komponen <App /> Anda di dalamnya.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

