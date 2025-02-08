import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Mail, Phone } from 'lucide-react';

const ContactUs = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // רקע אפור לכל העמוד
      }}
    >
      <Card
        sx={{
          maxWidth: 600, // הגדלתי את הרוחב של הכרטיס
          width: '90%',
          padding: 4,
          textAlign: 'center',
          borderRadius: 4,
          boxShadow: 5,
          backgroundColor: 'white',
        }}
      >
        <CardContent>
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            gutterBottom
            sx={{ color: '#333', textShadow: '2px 2px 5px rgba(0,0,0,0.2)' }} // טקסט עם אפקט זוהר
          >
            📜 צור קשר
          </Typography>
          <Typography 
            variant="h6" 
            color="textSecondary" 
            sx={{ mb: 3, fontSize: '1.2rem', fontWeight: '500' }}
          >
            לכל מקרה ובעיה, אנחנו פה איתך!  
            ניתן לפנות אלינו במייל או בטלפון
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1} sx={{ mb: 2 }}>
            <Mail size={24} color="#1976d2" />
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
            ScrollsSite@gmail.com
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
            <Phone size={24} color="#1976d2" />
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
              +972-50-1234567
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContactUs;