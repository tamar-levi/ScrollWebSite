import React, { useState } from 'react';
import { Slider, Button, RadioGroup, FormControlLabel, Typography, Radio, Box } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const FilterComponent = ({ onFilter, products }) => {
    const maxPrice = products && products.length > 0
        ? Math.max(...products.map(product => product.price))
        : 1000000;
    const [priceRange, setPriceRange] = useState([100, maxPrice]);
    const [fontType, setFontType] = useState('');
    const [scrollType, setScrollType] = useState('');

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };

    const handleFontTypeChange = (event) => {
        setFontType(event.target.value);
    };

    const handleScrollTypeChange = (event) => {
        setScrollType(event.target.value);
    };

    const applyFilters = () => {
        console.log('Applying filters:', {
            priceRange,
            fontType,
            scrollType,
        });
        onFilter({
            priceRange,
            fontType: fontType || null,
            scrollType: scrollType || null,
        });
    };

    const resetFilters = () => {
        setPriceRange([100, maxPrice]);
        setFontType('');
        setScrollType('');
        onFilter({ priceRange: [100, 10000], fontType: null, scrollType: null });
    };

    return (
        <div
            style={{
                width: '260px',
                padding: '20px',
                borderRadius: '12px',
                backgroundColor: 'white',
                boxShadow: '2px 4px 12px rgba(0,0,0,0.15)',
                position: 'fixed',
                top: '68px',
                right: '0',
                height: 'calc(100vh - 68px)',
                textAlign: 'right',
                direction: 'rtl',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                zIndex: 1000,
            }}
        >
            <Typography variant="subtitle2" style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                סינון מוצרים
            </Typography>
            <div style={{ width: '90%' }}>
                <Typography variant="subtitle2" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    בחר סוג כתב:
                </Typography>
                <RadioGroup
                    value={fontType}
                    onChange={handleFontTypeChange}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        padding: '10px 0'
                    }}
                >
                    {['בית יוסף', 'האר"י', 'ספרדי', 'חב"ד', 'תימני'].map((type) => (
                        <FormControlLabel
                            key={type}
                            value={type}
                            control={<Radio size="small" style={{ padding: '2px' }} />}
                            label={<span style={{ fontSize: '0.85rem' }}>{type}</span>}
                            style={{ margin: 0 }}
                        />
                    ))}
                </RadioGroup>
            </div>
            <div style={{ width: '90%' }}>
                <Typography variant="subtitle2" style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    בחר סוג מגילה:
                </Typography>
                <RadioGroup
                    value={scrollType}
                    onChange={handleScrollTypeChange}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        padding: '10px 0'
                    }}
                >
                    {['המלך 28 שורות', 'המלך 21 שורות', '11 שורות', '42 שורות', '11 שורות הרב עובדיה'].map((type) => (
                        <FormControlLabel
                            key={type}
                            value={type}
                            control={<Radio size="small" style={{ padding: '2px' }} />}
                            label={<span style={{ fontSize: '0.85rem' }}>{type}</span>}
                            style={{ margin: 0 }}
                        />
                    ))}
                </RadioGroup>
            </div>
            <div style={{ width: '90%' }}>
                <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                    טווח מחירים:
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Slider
                        value={priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={100}
                        max={maxPrice}
                        style={{ width: '85%' }}
                    />
                </div>
            </div>
            <Box display="flex" justifyContent="center" gap="10px" width="90%">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={applyFilters}
                    endIcon={<FilterListIcon />}
                    sx={{ flex: 1, gap: '6px' }}
                >
                    סנן
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={resetFilters}
                    endIcon={<RestartAltIcon />}
                    sx={{ flex: 1, gap: '6px' }}
                >
                    איפוס
                </Button>
            </Box>
        </div>
    );
};

export default FilterComponent;
