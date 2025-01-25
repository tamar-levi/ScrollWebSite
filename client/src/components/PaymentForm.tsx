import * as React from 'react';
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
  maxWidth: '500px',
  margin: '0 auto',
  height: 280,
  padding: theme.spacing(3),
  background: 'linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3), hsla(220, 20%, 88%, 0.3))',
}));

const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
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

export default function PaymentForm({ product, onClose, onPaymentSuccess }) {
  const [cardNumber, setCardNumber] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false); 

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

  const handlePayment = async () => {
    if (!cardNumber || !cvv || !expirationDate) {
      setError('יש למלא את כל השדות');
      return;
    }

    const isValidCard = cardNumber.replace(/\D/g, '').length === 16 && cvv.length === 3 && expirationDate.length === 5;

    if (isValidCard) {
      setLoading(true); 
      const isCardValid = await checkCreditCard(cardNumber.replace(/\D/g, ''), cvv, expirationDate);

      setLoading(false); 

      if (isCardValid) {
        onPaymentSuccess(); 
      } else {
        setError('פרטי האשראי לא תקינים');
      }
    } else {
      setError('פרטי האשראי לא תקינים');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { price } = product;

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography variant="h6" sx={{ direction: 'rtl', color: 'primary.main' }}>
          ₪{price ? price.toFixed(2) : 'לא זמין'}
        </Typography>
        <PaymentContainer>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2">Credit card</Typography>
            <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
          </Box>

          <SimCardRoundedIcon
            sx={{
              fontSize: 40,
              transform: 'rotate(90deg)',
              color: 'text.secondary',
            }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-number" required>Card number</FormLabel>
              <OutlinedInput
                id="card-number"
                placeholder="0000 0000 0000 0000"
                required
                size="small"
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
            </FormGrid>
            <FormGrid sx={{ width: '20%' }}>
              <FormLabel htmlFor="cvv" required>CVV</FormLabel>
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

          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-name" required>Name</FormLabel>
              <OutlinedInput
                id="card-name"
                placeholder="John Smith"
                required
                size="small"
              />
            </FormGrid>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel htmlFor="card-expiration" required>Expiration date</FormLabel>
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
            <Typography color="error" sx={{ textAlign: 'center', marginTop: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            fullWidth
            onClick={handlePayment}
            disabled={loading} 
          >
            {loading ? 'טוען...' : 'לתשלום'}
          </Button>
        </PaymentContainer>
      </DialogContent>
    </Dialog>
  );
}
