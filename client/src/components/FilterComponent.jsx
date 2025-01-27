import React, { useState } from 'react';

const FilterComponent = ({ applyFilters }) => {
    const [filter, setFilter] = useState({
        category: '',
        writingType: null,
        priceRange: null,
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter((prevState) => ({
            ...prevState,
            [name]: value === '' ? null : value,
        }));
    };

    const handlePriceChange = (e) => {
        const { value } = e.target;
        const price = parseInt(value, 10);
        const priceLowerLimit = Math.max(price - 50, 0);
        const priceUpperLimit = price + 50;
        setFilter((prevFilter) => ({
            ...prevFilter,
            priceRange: { min: priceLowerLimit, max: priceUpperLimit },
        }));
    };

    const handleApplyFilter = () => {
        console.log('Applying filter with state:', filter);  // Debugging log
        applyFilters(filter);
    };

    return (
        <div className="filter-container">
            <h3>סינון מוצרים</h3>

            <div className="filter-category">
                <h4>סוג מגילה</h4>
                <div>
                    <label className="filter-option">
                        <input
                            type="radio"
                            name="category"
                            value="melech28"
                            checked={filter.category === 'melech28'}
                            onChange={handleFilterChange}
                        />
                        <span>המלך 28 שורות</span>
                    </label>
                </div>
                <div>
                    <label className="filter-option">
                        <input
                            type="radio"
                            name="category"
                            value="melech21"
                            checked={filter.category === 'melech21'}
                            onChange={handleFilterChange}
                        />
                        <span>המלך 21 שורות</span>
                    </label>
                </div>
                <div>
                    <label className="filter-option">
                        <input
                            type="radio"
                            name="category"
                            value="11line"
                            checked={filter.category === '11line'}
                            onChange={handleFilterChange}
                        />
                        <span>11 שורות</span>
                    </label>
                </div>
                <div>
                    <label className="filter-option">
                        <input
                            type="radio"
                            name="category"
                            value="42line"
                            checked={filter.category === '42line'}
                            onChange={handleFilterChange}
                        />
                        <span>42 שורות</span>
                    </label>
                </div>
                <div>
                    <label className="filter-option">
                        <input
                            type="radio"
                            name="category"
                            value="ovadia"
                            checked={filter.category === 'ovadia'}
                            onChange={handleFilterChange}
                        />
                        <span>11 שורות הרב עובדיה</span>
                    </label>
                </div>
                <div>
                    <label className="filter-option">
                        <input
                            type="radio"
                            name="category"
                            value="other"
                            checked={filter.category === 'other'}
                            onChange={handleFilterChange}
                        />
                        <span>אחר</span>
                    </label>
                </div>
            </div>

            <br />

            <div className="filter-category">
                <h4>סוג הכתב</h4>
                <div>
                    <label className="filter-option">
                        <input
                            type="radio"
                            name="writingType"
                            value="בית יוסף"
                            checked={filter.writingType === 'בית יוסף'}
                            onChange={handleFilterChange}
                        />
                        <span>בית יוסף</span>
                    </label>
                </div>
                <div>
                    <label className="filter-option">
                        <input
                            type="radio"
                            name="writingType"
                            value="הארי"
                            checked={filter.writingType === 'הארי'}
                            onChange={handleFilterChange}
                        />
                        <span>האר"י</span>
                    </label>
                </div>
                <div>
                    <label className="filter-option">
                        <input
                            type="radio"
                            name="writingType"
                            value="ספרדי"
                            checked={filter.writingType === 'ספרדי'}
                            onChange={handleFilterChange}
                        />
                        <span>ספרדי</span>
                    </label>
                </div>
                <div>
                    <label className="filter-option">
                        <input
                            type="radio"
                            name="writingType"
                            value="חבד"
                            checked={filter.writingType === 'חבד'}
                            onChange={handleFilterChange}
                        />
                        <span>חב"ד</span>
                    </label>
                </div>
                <div>
                    <label className="filter-option">
                        <input
                            type="radio"
                            name="writingType"
                            value="תימני"
                            checked={filter.writingType === 'תימני'}
                            onChange={handleFilterChange}
                        />
                        <span>תימני</span>
                    </label>
                </div>
                <div>
                    <label className="filter-option">
                        <input
                            type="radio"
                            name="writingType"
                            value="אחר"
                            checked={filter.writingType === 'אחר'}
                            onChange={handleFilterChange}
                        />
                        <span>אחר</span>
                    </label>
                </div>
            </div>

            <br />

            <div className="filter-price">
                <h4>טווח מחירים</h4>
                <div>
                    <input
                        type="range"
                        name="priceRange"
                        min="100"
                        max="3000"
                        step="10"
                        value={filter.priceRange?.min + 50 || 100}
                        onChange={handlePriceChange}
                        className="price-range-slider"
                    />
                    <div className="price-value">{filter.priceRange?.min + 50 || 100} ₪</div>
                </div>
            </div>

            <br />

            <button onClick={handleApplyFilter}>סנן מוצרים</button>
        </div>
    );
};

export default FilterComponent;
