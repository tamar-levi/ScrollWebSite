import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import FilterComponent from './FilterComponent';
import '../App.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [noProductsFound, setNoProductsFound] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/productsApi/getAllProducts');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
                setNoProductsFound(false);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    const applyFilters = (currentFilters) => {
        console.log('Applying filters:', currentFilters);  // Debugging log
        const filtered = products.filter((product) => {
            const matchesCategory =
                !currentFilters.category || product.category === currentFilters.category;
            const matchesWritingType =
                !currentFilters.writingType || product.writingType === currentFilters.writingType;

            let matchesPrice = true;
            if (currentFilters.priceRange && currentFilters.priceRange.min !== undefined && currentFilters.priceRange.max !== undefined) {
                matchesPrice = product.price >= currentFilters.priceRange.min && product.price <= currentFilters.priceRange.max;
            }

            return matchesCategory && matchesWritingType && matchesPrice;
        });
        console.log('Filtered products:', filtered);  // Debugging log
        setFilteredProducts(filtered);
        setNoProductsFound(filtered.length === 0);
    };

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div className="product-page">
            <div className="product-list">
                {filteredProducts.length > 0
                    ? filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} onOpenModal={handleOpenModal} />
                    ))
                    : products.map((product) => (
                        <ProductCard key={product._id} product={product} onOpenModal={handleOpenModal} />
                    ))
                }
                {selectedProduct && <ProductModal product={selectedProduct} onClose={handleCloseModal} />}
            </div>
            <div className="filter-section">
                <FilterComponent applyFilters={applyFilters} />
                {noProductsFound && <p className="no-products-message">לא נמצאו מוצרים התואמים לסינון שבחרת.</p>}
            </div>
        </div>
    );
};

export default ProductList;
