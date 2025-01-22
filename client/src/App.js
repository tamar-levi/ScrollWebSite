import React from 'react';
import ProductDisplay from './components/AllProducts';
import AddProduct from './components/AddProduct';
import CreateUser from './components/CreateUser';
import GoogleAuth from './components/GoogleAuth';
import { Box } from '@mui/material';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <GoogleAuth />
          <CreateUser />
        </Box>
        <Routes>
          
          <Route path="/" element={<GoogleAuth />} />
          <Route path="/" element={<CreateUser />} />
          <Route path="/products" element={<ProductDisplay />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
