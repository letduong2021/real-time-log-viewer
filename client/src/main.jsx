import React from 'react';
import ReactDOM from 'react-dom/client';
import WebSocketLogger from './App.jsx';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <WebSocketLogger />
    </React.StrictMode>
);