import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';

const PaymentContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  height: 400,
  padding: theme.spacing(3),
  fontFamily: '"Inter", sans-serif',
}));

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
}));

const checkCreditCard = async (cardNumber, cvv, expirationDate) => {
  try {
    const response = await fetch('/api/check-card', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cardNumber,
        cvv,
        expirationDate,
      }),
    });

    const result = await response.json();
    return result.isValid;
  } catch (error) {
    console.error('Error checking credit card:', error);
    return false;
  }
};

export default function PaymentForm({ onNext, onBack, onFormSubmit, paymentData, productData }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (paymentData) {
      setCardNumber(paymentData.cardNumber || '');
      setCvv(paymentData.cvv || '');
      setExpirationDate(paymentData.expirationDate || '');
    }
  }, [paymentData]);

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (value.length <= 16) setCardNumber(formattedValue);
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 3) setCvv(value);
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 4) setExpirationDate(formattedValue);
  };

  const handlePayment = () => {
    if (!cardNumber || !cvv || !expirationDate) {
      setError('יש למלא את כל השדות');
      return;
    }
    const isValidCardNumber = cardNumber.replace(/\D/g, '').length === 16;
    const isValidCvv = cvv.length === 3;
    const isValidExpirationDate = expirationDate.length === 5 && expirationDate.includes('/');
    if (isValidCardNumber && isValidCvv && isValidExpirationDate) {
      setLoading(true);
      handleSubmit();
    } else {
      setError('פרטי האשראי לא תקינים');
    }
  };

  const handleSubmit = () => {
    const cardData = {
      cardNumber: cardNumber,
      cvv: cvv,
      expirationDate: expirationDate,
      cardHolderName: document.getElementById('card-name').value,
    };
    console.log('Card Data:', cardData);
    onFormSubmit(cardData);
    onNext();
  };
  return (
    <>
      <Typography variant="h6" sx={{ direction: 'rtl', color: 'primary.secondry', fontSize: '0.9rem', marginRight: '3%', marginTop: '2%' }}>
        {productData?.price < 1000 ? (
          "מודעות עד 1000 ש״ח ללא עלות"
        ) : productData?.price <= 1500 ? (
          "עלות: 15 ש״ח"
        ) : productData?.price <= 2000 ? (
          "עלות: 20 ש״ח"
        ) : null}
      </Typography>
      {productData?.price > 1000 ? (
        <PaymentContainer>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2" sx={{ fontSize: '1rem' }}>פרטי כרטיס אשראי</Typography>
            <CreditCardRoundedIcon sx={{ color: 'text.secondary', fontSize: '2rem' }} />
          </Box>

          <SimCardRoundedIcon
            sx={{
              fontSize: 80,
              transform: 'rotate(90deg)',
              color: 'text.secondary',
            }}
          />

          <Box sx={{ display: 'flex', gap: 4 }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-number" required sx={{ fontSize: '0.9rem' }}>מספר אשראי</FormLabel>
              <OutlinedInput
                id="card-number"
                placeholder="0000 0000 0000 0000"
                required
                size="small"
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
            </FormGrid>
            <FormGrid sx={{ width: '25%' }}>
              <FormLabel htmlFor="cvv" required sx={{ fontSize: '0.8rem' }}>CVV</FormLabel>
              <OutlinedInput
                id="cvv"
                placeholder="123"
                required
                size="small"
                value={cvv}
                onChange={handleCvvChange}
              />
            </FormGrid>
          </Box>

          <Box sx={{ display: 'flex', gap: 4 }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-name" required sx={{ fontSize: '0.9rem' }}>שם בעל הכרטיס</FormLabel>
              <OutlinedInput
                id="card-name"
                placeholder="John Smith"
                required
                size="small"
              />
            </FormGrid>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-expiration" required sx={{ fontSize: '0.9rem' }}>תוקף הכרטיס</FormLabel>
              <OutlinedInput
                id="card-expiration"
                placeholder="MM/YY"
                required
                size="small"
                value={expirationDate}
                onChange={handleExpirationDateChange}
              />
            </FormGrid>
          </Box>

          {error && (
            <Typography color="error" sx={{ textAlign: 'center', marginTop: 3, fontSize: '1rem' }}>
              {error}
            </Typography>
          )}
          <Box
            sx={[
              {
                position: 'absolute',
                bottom: '10%',
                display: 'flex',
                flexDirection: { xs: 'column-reverse', sm: 'row' },
                alignItems: 'end',
                gap: 1,
                pb: { xs: 12, sm: 0 },
                mt: { xs: 0, sm: 0 },
                width: '100%',
                maxWidth: 600,
                justifyContent: 'space-between'
              },
            ]}>
            <Button
              onClick={onBack}
              variant="text"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              הקודם
            </Button>
            <Button
              variant="contained"
              onClick={handlePayment}
              sx={{ width: { xs: '100%', sm: 'fit-content' } }}
            >
              הבא
            </Button>
          </Box>
        </PaymentContainer>) :
        <Box
          sx={[
            {
              position: 'absolute',
              bottom: '10%',
              display: 'flex',
              flexDirection: { xs: 'column-reverse', sm: 'row' },
              alignItems: 'end',
              gap: 1,
              pb: { xs: 12, sm: 0 },
              mt: { xs: 0, sm: 0 },
              width: '100%',
              maxWidth: 600,
              justifyContent: 'space-between'
            },
          ]}>
          <Button
            onClick={onBack}
            variant="text"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            הקודם
          </Button>
          <Button
            variant="contained"
            onClick={() => onNext()}
            sx={{ width: { xs: '100%', sm: 'fit-content' } }}
          >
            הבא
          </Button>
        </Box>
      }
    </>
  );
}
