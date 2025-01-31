import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const products = [
  {
    name: 'מודעות עד 1000 ש"ח',
    desc: 'ללא עלות',
    price: '₪0',
  },
  {
    name: 'מודעות עד 1500 ש"ח',
    desc: 'החל מ 1000 ש"ח',
    price: '₪10',
  },
  {
    name: 'מודעת פרימיום',
    desc: 'מודעה מודגשת בתוספת תשלום',
    price: '₪5',
  },
  {
    name: 'מודעות עד 2000 ש"ח',
    desc: 'החל מ 1500 ש"ח',
    price: '₪20',
  },
];

export default function Info() {
  return (
    <>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary', paddingRight: "5%"}}>
        מחירון
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={product.desc}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {product.price}
            </Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
}
