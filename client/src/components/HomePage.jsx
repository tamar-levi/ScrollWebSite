import React, { useState } from 'react';
import Button from '@mui/material/Button';
import LoginDialog from './LoginDialog';

const HomePage = () => {
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };
  return (
    <div
      className="relative"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div
        className="bg-white/70 rounded-2xl p-8 shadow-xl z-10"
        style={{
          padding: "40px",
          marginTop: "10vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "6rem",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          לוח המגילות
        </h1>
        <p
          style={{
            fontSize: "3rem",
            color: "#4A4A4A",
            marginBottom: "30px",
          }}
        >
          תאור כללי
        </p>
        <Button
          variant="outlined"
          onClick={handleOpenLogin}
          sx={{
            fontSize: "1.2rem",
            padding: "12px 30px",
            borderRadius: "12px",
            alignSelf: "center",
          }}
        >
          התחברות
        </Button>
      </div>
      {openLogin && (
        <LoginDialog
          open={openLogin}
          onClose={handleCloseLogin}
        />
      )}
    </div>
  );
};

export default HomePage;
