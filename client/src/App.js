import './App.css';
import React from 'react';
import Sidebar from './components/Sidebar.js';
import Main from './components/Main.js';

function App() {
  return (
    <div className="App">
        <div className="sidebar">
            <Sidebar />
        </div>
        <div className="main">
            <Main />
        </div>
    </div>
);
}

export default App;
