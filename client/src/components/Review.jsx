import * as React from 'react';
import {
  CreditCard,
  ShoppingCart,
  Description,
  LocalShipping
} from '@mui/icons-material';
import {
  Typography,
  Stack,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button
} from '@mui/material';

export default function Review({ productData, paymentData, onNext, onBack }) {
  return (
    <Stack spacing={2} sx={{ position: 'relative', minHeight: '400px', pr: 3, pt: 5 }}>
      <Box sx={{ textAlign: 'right', mb: 4 }}>
         <Stack spacing={3}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, pr: 0 }}>
              <Typography variant="subtitle">פרטי המוצר</Typography>
              <ShoppingCart />
            </Box>
            <Box sx={{ pr: 0 }}>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ textAlign: 'right', mt: 1 }}>{`סוג כתב: ${productData?.scriptType}`}</Typography>
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ textAlign: 'right', mt: 1 }}>{`סוג קלף: ${productData?.scrollType}`}</Typography>
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ textAlign: 'right', mt: 1 }}>₪{productData?.price}</Typography>
              </Box>
            </Box>
          </Box>
          {productData?.price >= 1000 && (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, pr: 0 }}>
              <Typography variant="subtitle">פרטי תשלום</Typography>
              <CreditCard />
            </Box>
            <Box sx={{ pr: 0 }}>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ textAlign: 'right', mt: 1 }}>{`מספר כרטיס: ${paymentData?.cardNumber}`}</Typography>
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ textAlign: 'right', mt: 1 }}>{`תוקף: ${paymentData?.expirationDate}`}</Typography>
              </Box>
              <Box sx={{ mb: 1.5 }}>
                <Typography variant="subtitle2" sx={{ textAlign: 'right', mt: 1 }}>{`cvv : ${paymentData?.cvv} `}</Typography>
              </Box>
            </Box>
          </Box>)}
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={[{
          position: 'absolute',
          bottom: '-9%',
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          alignItems: 'end',
          gap: 1,
          width: '100%',
          maxWidth: 600,
          justifyContent: 'space-between'
        }]}>
          <Button
            onClick={onBack}
            variant="text"
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            הקודם
          </Button>
          <Button
            variant="contained"
            onClick={onNext}
            sx={{ width: { xs: '100%', sm: 'fit-content' } }}
          >
            סיום
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
