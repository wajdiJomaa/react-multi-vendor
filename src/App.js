import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import HomePage from './pages/HomePage';
import LogingPage from './pages/LogingPage';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { AuthProvider } from './context/AuthContext';

import Navbar from './components/Navbar';
import LoginRequired from './utils/LoginRequired';
import NoLoginRequired from './utils/NoLoginRequired'
import RegisterPage from './pages/RegisterPage';
import SellProductsPage from './pages/VendorPage';
import ProductListPage from './pages/ProductListPage';
import Dashboard from './pages/dashboard';

import UserProfilePage from './pages/settings';
import ProductDetails from './pages/ProductDetails';


function App() {
  console.log(
    "hi"
  )
  return (
    <div>
      <Router>
      <AuthProvider>
        <Navbar/>
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

          <Route element={<NoLoginRequired/>} path="/sell">
            <Route element= { <SellProductsPage/> } path="/sell" />
          </Route>

          <Route element={<NoLoginRequired/>} path="/ListProduct">
            <Route element= { <ProductListPage/> } path="/ListProduct" />
          </Route>
          <Route element={<NoLoginRequired/>} path="/settings">
            <Route element= { <UserProfilePage/> } path="/settings" />
          </Route>
          
          <Route element={<NoLoginRequired/>} path="/product-details/:id">
          <Route element= { <ProductDetails/> } path="/product-details/:id"/>
          </Route>

          <Route element={<NoLoginRequired/>} path="/dashboard">
          <Route element= { <Dashboard/> } path="/dashboard"/>
          </Route>
        
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;