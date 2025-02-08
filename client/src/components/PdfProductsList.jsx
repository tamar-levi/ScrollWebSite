import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import font from '../fonts/DavidLibre-Regular-normal';

const PdfProductList = () => {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/productsApi/getAllProducts');
        const data = await response.json();
        setProducts(data);

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

  const isHebrew = (text) => {
    const hebrewRegex = /[\u0590-\u05FF]/;
    return hebrewRegex.test(text);
  };

  const exportToPDF = async () => {
    const doc = new jsPDF();
    doc.addFileToVFS('DavidLibre-Regular.ttf', font);
    doc.addFont('DavidLibre-Regular.ttf', 'DavidLibre', 'normal');
    doc.setFont('DavidLibre');
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
      const seller = sellers[product.userId];
      if (yOffset > 270) {
        doc.addPage();
        yOffset = 20;
      }
      if (product.primaryImage) {
        const img = `data:image/jpeg;base64,${product.primaryImage}`;
        const imgProps = doc.getImageProperties(img);
        const imgWidth = 70;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        doc.addImage(img, 'JPEG', 120, yOffset, imgWidth, imgHeight);
      }

      const textOffsetX = 50;
      const lineHeight = 10;
      const textWidth = 100;

      const drawText = (text, yPosition) => {
        if (isHebrew(text)) {
          doc.setR2L(true);
        } else {
          doc.setR2L(false);
        }
        doc.text(text, textOffsetX, yPosition);
      };

      drawText(`מוצר ${index + 1}:`, yOffset + 5);
      drawText(`סוג המגילה: ${product.scrollType || 'לא צויין'}`, yOffset + 5 + lineHeight);
      drawText(`סוג הכתב: ${product.scriptType || 'לא צויין'}`, yOffset + 5 + 2 * lineHeight);
      drawText(`הערות: ${product.note || 'אין הערות'}`, yOffset + 5 + 3 * lineHeight);
      drawText(`מחיר: ${product.price ? `${product.price} ₪` : 'לא צויין'}`, yOffset + 5 + 4 * lineHeight);

      if (seller) {
        drawText(`פרטי המוכר:`, yOffset + 5 + 5 * lineHeight);
        let sellerOffsetY = yOffset + 5 + 6 * lineHeight;

        if (seller.fullName) {
          drawText(seller.fullName, sellerOffsetY);
          sellerOffsetY += lineHeight;
        }
        if (seller.phoneNumber) {
          drawText(seller.phoneNumber, sellerOffsetY);
          sellerOffsetY += lineHeight;
        }
        if (seller.email) {
          drawText(seller.email, sellerOffsetY);
          sellerOffsetY += lineHeight;
        }
      }

      yOffset += 130;
    });

    const pdfData = doc.output('datauristring'); 

    const response = await fetch('http://localhost:5000/send-catalog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pdfData, 
      }),
    });

    if (response.ok) {
      console.log('Catalog sent successfully!');
    } else {
      console.error('Failed to send catalog.');
    }
  };

  return (
    <Box sx={{ marginTop: 4 }}>
      <Button variant="contained" onClick={exportToPDF}>
        ייצא ל-PDF
      </Button>
    </Box>
  );
};

export default PdfProductList;
