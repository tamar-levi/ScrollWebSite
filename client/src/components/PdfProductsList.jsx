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

        const uniqueSellerIds = [...new Set(data.map(product => product.userId))];
        uniqueSellerIds.forEach(async (sellerId) => {
          const sellerResponse = await fetch(`http://localhost:5000/usersApi/getUserById/${sellerId}`);
          const sellerData = await sellerResponse.json();
          setSellers(prev => ({ ...prev, [sellerId]: sellerData }));
        });
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const exportToPDF = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    doc.addFileToVFS('DavidLibre-Regular.ttf', font);
    doc.addFont('DavidLibre-Regular.ttf', 'DavidLibre', 'normal');
    doc.setFont('DavidLibre');
    doc.setR2L(true);
    
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text("📜 רשימת מוצרים", 105, 15, { align: 'center' });

    let yOffset = 30;
    products.forEach((product, index) => {
      if (yOffset > 260) {
        doc.addPage();
        yOffset = 30;
      }

      doc.setDrawColor(150, 150, 150);
      doc.setLineWidth(0.5);
      doc.rect(10, yOffset - 5, 190, 80, 'S');

      doc.setFontSize(16);
      doc.setFont('DavidLibre', 'bold');
      doc.text(`✨ מוצר ${index + 1}`, 15, yOffset);
      yOffset += 10;
      doc.setFont('DavidLibre', 'normal');

      if (product.primaryImage) {
        const img = `data:image/jpeg;base64,${product.primaryImage}`;
        const imgWidth = 50;
        const imgHeight = 30;
        doc.addImage(img, 'JPEG', 140, yOffset - 10, imgWidth, imgHeight);
      }

      doc.setFontSize(12);
      doc.text(`📜 סוג מגילה: ${product.scrollType || '❌ לא צויין'}`, 15, yOffset);
      yOffset += 6;
      doc.text(`✍️ סוג כתב: ${product.scriptType || '❌ לא צויין'}`, 15, yOffset);
      yOffset += 6;
      doc.text(`💬 הערות: ${product.note || '✅ אין הערות'}`, 15, yOffset);
      yOffset += 6;
      
      doc.setFontSize(14);
      doc.text(`💰 מחיר: ${product.price ? `${product.price} ₪` : '❌ לא צויין'}`, 15, yOffset);
      yOffset += 10;

      const seller = sellers[product.userId];
      if (seller) {
        doc.setFontSize(12);
        doc.text("📌 פרטי המוכר:", 15, yOffset);
        yOffset += 6;
        doc.text(`👤 ${seller.fullName || '❌ לא צויין'}`, 15, yOffset);
        yOffset += 5;
        doc.text(`📞 ${seller.phoneNumber || '❌ לא צויין'}`, 15, yOffset);
        yOffset += 5;
        doc.text(`📧 ${seller.email || '❌ לא צויין'}`, 15, yOffset);
        yOffset += 15;
      }
    });

    doc.save('products-list.pdf');
  };

  return (
    <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>
      <Button variant="contained" color="primary" onClick={exportToPDF}>
        📄 ייצא ל-PDF
      </Button>
    </Box>
  );
};

export default PdfProductList;
