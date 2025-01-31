import React, { useState } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import ProductList from './components/ProductList';
import PaymentForm from './components/PaymentForm';
import NavBar from './components/NavBar';
import LoginDialog from './components/LoginDialog';
import HomePage from './components/HomePage';
import About from './components/About'; 
import Checkout from './components/Checkout';
import UserProducts from './components/UserProducts';

function App() {
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <Router>
      <Box sx={{ width: '100%', height: '100vh' }}>
        <NavBar/>
        <Box sx={{ 
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: '2rem',
          minHeight: 'calc(100vh - 64px)' 
        }}>
          <Routes>
            <Route path="/" element={<HomePage onLoginClick={handleOpenLogin} />} /> {/* העברת הפונקציה */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/add-product" element={<Checkout />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/payment" element={<PaymentForm />} />
            <Route path="/about" element={<About />} /> 
            <Route path="/myProducts" element={<UserProducts />} /> 
          </Routes>
        </Box>

        {openLogin && (
          <LoginDialog
            open={openLogin}
            onClose={handleCloseLogin}
          />
        )}
      </Box>
    </Router>
  );
}

export default App;
