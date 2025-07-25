import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import NavB from './components/NavB';
import UserConsole from './components/UserConsole';

function App() {
  return (
    <>
      <NavB/>
      <UserConsole/>
    </>
     
  );
}

export default App;
