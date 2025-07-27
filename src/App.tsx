import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import NavB from './components/User/NavB';
import UserConsole from './components/User/UserConsole';

function App() {
  return (
    <>
      <NavB/>
      <UserConsole/>
    </>
     
  );
}

export default App;
