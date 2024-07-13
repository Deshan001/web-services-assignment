// src/App.js
import React from 'react';
import './App.css';
import UserDataForm from './UserDataForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Submit User Data</h1>
        <UserDataForm />
      </header>
    </div>
  );
}

export default App;
