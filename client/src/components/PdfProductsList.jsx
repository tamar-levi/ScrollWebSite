import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import PdfProductCard from './PdfProductCard';
import font from '../fonts/DavidLibre-Regular-normal'; // מייבא את הפונט בעברית

const PdfProductList = () => {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState({}); // לשמור פרטי מוכרים לפי ID

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/productsApi/getAllProducts');
        const data = await response.json();
        setProducts(data);
        
        // שליפת פרטי המוכרים
        const sellerIds = data.map(product => product.userId);
        const uniqueSellerIds = [...new Set(sellerIds)];
        
        uniqueSellerIds.forEach(async (sellerId) => {
          const sellerResponse = await fetch(`http://localhost:5000/usersApi/getUserById/${sellerId}`);
          const sellerData = await sellerResponse.json();
          setSellers((prevSellers) => ({ ...prevSellers, [sellerId]: sellerData }));
        });
        
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF();

    // טעינת הפונט בעברית
    doc.addFileToVFS('DavidLibre-Regular.ttf', font);
    doc.addFont('DavidLibre-Regular.ttf', 'DavidLibre', 'normal');
    doc.setFont('DavidLibre');

    // הגדרת כיוון טקסט מימין לשמאל
    doc.setR2L(true);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);

    let yOffset = 20;

    if (products.length === 0) {
      doc.text("אין מוצרים להציג", 10, yOffset);
      doc.save('products-list.pdf');
      return;
    }

    products.forEach((product, index) => {
      const seller = sellers[product.userId]; // שליפת פרטי המוכר
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20;
      }

      // הצגת התמונה בצד ימין (גודל יותר גדול)
      if (product.primaryImage) {
        const img = `data:image/jpeg;base64,${product.primaryImage}`;
        doc.addImage(img, 'JPEG', 120, yOffset, 70, 70); // הגדלתי את הגודל
      }

      // הצגת המידע בצד שמאל
      const textOffsetX = 50; // קרבתי את הטקסט לתמונה
      const lineHeight = 10; // גובה השורות
      const textWidth = 100; // רוחב הטקסט

      // הוצאת הטקסט עם יישור מדויק מההתחלה
      const drawText = (text, yPosition) => {
        doc.text(text, textOffsetX, yPosition);
      };

      drawText(`מוצר ${index + 1}:`, yOffset + 5);
      drawText(`סוג המגילה: ${product.scrollType || 'לא צויין'}`, yOffset + 5 + lineHeight);
      drawText(`סוג הכתב: ${product.scriptType || 'לא צויין'}`, yOffset + 5 + 2 * lineHeight);
      drawText(`הערות: ${product.note || 'אין הערות'}`, yOffset + 5 + 3 * lineHeight);
      drawText(`מחיר: ${product.price ? `${product.price} ₪` : 'לא צויין'}`, yOffset + 5 + 4 * lineHeight);

      // הצגת פרטי המוכר
      if (seller) {
        drawText(`בעל המוצר: ${seller.fullName || 'לא צויין'}`, yOffset + 5 + 5 * lineHeight);
        drawText(`טלפון: ${seller.phoneNumber || 'לא צויין'}`, yOffset + 5 + 6 * lineHeight);
        drawText(`אימייל: ${seller.email || 'לא צויין'}`, yOffset + 5 + 7 * lineHeight);
      }

      yOffset += 90; // עדכון המרווח עבור המוצר הבא
    });

    doc.save('products-list.pdf');
  };

  return (
    <div>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
          maxWidth: '100%',
          width: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          justifyContent: 'start',
          '@media (max-width: 1200px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media (max-width: 600px)': {
            gridTemplateColumns: '1fr',
          },
        }}
      >
        {products.map((product) => (
          <Box key={product._id} sx={{ marginBottom: 2 }}>
            <PdfProductCard product={product} sellerId={product.userId} />
          </Box>
        ))}
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Button variant="contained" onClick={exportToPDF}>
          ייצא ל-PDF
        </Button>
      </Box>
    </div>
  );
};

export default PdfProductList;
