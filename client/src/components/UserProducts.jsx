import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditableProductCard from './EditableProductCard';
import EditProductModal from './EditProductModal';

const UserProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchUserProducts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in localStorage');
                return;
            }
            try {
                const response = await axios.get('http://localhost:5000/productsApi/getAllProductsByUser', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user products:', error);
                setLoading(false);
            }
        };
        fetchUserProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleOpenEditModal = (product) => {
        console.log('Opening modal with product:', product);
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setSelectedProduct(null);
    };

    const handleDelete = (productId) => {
        setProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
    };
    return (
        <>
            <div style={{
                padding: '20px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '30px'
                }}>המוצרים שלי</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '30px',
                    padding: '20px'
                }}>
                    {products.map((product) => (
                        <EditableProductCard
                            product={product}
                            onDelete={handleDelete}
                            onOpenEditModal={handleOpenEditModal}
                        />
                    ))}
                </div>
            </div>
            {isEditModalOpen && selectedProduct && (
                <EditProductModal
                    product={selectedProduct}
                    open={isEditModalOpen}
                    onClose={handleCloseModal}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
};

export default UserProducts;
