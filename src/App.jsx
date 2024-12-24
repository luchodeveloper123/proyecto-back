import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './componentes/authpage';
import LoginForm from './componentes/loginform'
import RegisterPage from './componentes/register';
import SignupPage from './componentes/singupForm';
import ListaChats from './mensajeria/listachats'
import ChatDetails from './mensajeria/chatdetails';
import './App.css';
import './componentes/singupform.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/loginform" element={<LoginForm/>} /> 
        <Route path="/authpage" element={<AuthPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/SignupPage" element={<singupForm/>} />
        <Route path="/listachats" element={<ListaChats/>} />
        <Route path="/chat/:chatId" element={<ChatDetails />} />
      </Routes>
    </Router>
  );
}

export default App;