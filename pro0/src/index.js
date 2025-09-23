import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App, Profile } from './App';
// import Profile from './Comp1';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <Profile />
  </React.StrictMode>
);