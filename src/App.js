import './App.css';
import HomePage from './pages/HomePage';
import LogingPage from './pages/LogingPage';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { AuthProvider } from './context/AuthContext';

import Header from './components/Header';
import LoginRequired from './utils/LoginRequired';
import NoLoginRequired from './utils/NoLoginRequired'
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div>
      <Router>
      <AuthProvider>
        <Header/>
        <Routes>
      
          <Route element={ <LoginRequired/>} path="/">
            <Route element= { <HomePage/>} path="/" exact />
          </Route>

          <Route element={<NoLoginRequired/>} path="/register">
            <Route element= { <RegisterPage/> } path="/register" />
          </Route>
          
          <Route element={<NoLoginRequired/>} path="/login">
            <Route element={ <LogingPage/> } path="/login"/>
          </Route>  
          
        
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
