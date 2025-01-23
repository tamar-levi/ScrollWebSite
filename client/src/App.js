import React, { useState } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import CreateUser from './components/CreateUser';
import GoogleAuth from './components/GoogleAuth';
import ProductList from './components/ProductList';
import AccountMenu from './components/AccountMenu.jsx';
import PaymentForm from './components/PaymentForm.tsx';
import NavBar from './components/NavBar';
import LoginDialog from './components/LoginDialog.tsx';

function App() {
  const [openLogin, setOpenLogin] = useState(true);

  const handleClose = () => {
    setOpenLogin(false);
  };

  return (
    <Router>
      <Box sx={{ width: '100%', height: '100vh' }}>
        <NavBar user={{ name: 'Tamar Levi', email: "T0527144636@example.com" }} />
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
            <Route path="/" element={
              <LoginDialog
                open={openLogin}
                onClose={handleClose}
              />
            } />
            <Route path="/products" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/payment" element={<PaymentForm />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
