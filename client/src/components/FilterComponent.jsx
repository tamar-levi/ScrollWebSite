import React, { useState } from 'react';
import { Slider, Button, RadioGroup, Radio, FormControlLabel, Typography } from '@mui/material';

const FilterComponent = ({ onFilter }) => {
    const [priceRange, setPriceRange] = useState([100, 10000]);
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
        onFilter({
            priceRange,
            fontType: fontType || null,
            scrollType: scrollType || null,
        });
    };

    const resetFilters = () => {
        setPriceRange([100, 10000]);
        setFontType('');
        setScrollType('');
        onFilter({ priceRange: [100, 10000], fontType: null, scrollType: null });
    };

    return (
        <div
            style={{
                width: '250px',
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: 'white',
                boxShadow: '2px 2px 10px rgba(0,0,0,0.1)',
                position: 'fixed',
                top: '68px',
                right: '0',
                height: 'calc(100vh - 68px)',
                textAlign: 'right',
                direction: 'rtl',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                zIndex: 1000,
            }}
        >
            <Typography variant="subtitle2" style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '0.9rem' }}>
                סינון מוצרים
            </Typography>
            <div style={{ alignSelf: 'flex-start' }}>
                <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                    בחר סוג כתב:
                </Typography>
                <RadioGroup value={fontType} onChange={handleFontTypeChange} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <FormControlLabel value={'בית יוסף'} control={<Radio />} label="בית יוסף" />
                    <FormControlLabel value={'האר"י'} control={<Radio />} label={'האר"י'} />
                    <FormControlLabel value={'ספרדי'} control={<Radio />} label="ספרדי" />
                    <FormControlLabel value={'חב"ד'} control={<Radio />} label={'חב"ד'} />
                    <FormControlLabel value={'תימני'} control={<Radio />} label="תימני" />
                </RadioGroup>
            </div>
            <div style={{ alignSelf: 'flex-start' }}>
                <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                    בחר סוג מגילה:
                </Typography>
                <RadioGroup value={scrollType} onChange={handleScrollTypeChange} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <FormControlLabel value={'המלך 28 שורות'} control={<Radio />} label="המלך 28 שורות" />
                    <FormControlLabel value={'המלך 21 שורות'} control={<Radio />} label="המלך 21 שורות" />
                    <FormControlLabel value={'11 שורות'} control={<Radio />} label="11 שורות" />
                    <FormControlLabel value={'42 שורות'} control={<Radio />} label="42 שורות" />
                    <FormControlLabel value={'11 שורות הרב עובדיה'} control={<Radio />} label="11 שורות הרב עובדיה" />
                </RadioGroup>
            </div>
            <div style={{ marginBottom: '20px', alignSelf: 'stretch' }}>
                <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                    טווח מחירים:
                </Typography>
                <Slider
                    value={priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={100}
                    max={10000}
                    style={{ width: '100%' }}
                />
            </div>

            <Button variant="contained" color="primary" fullWidth onClick={applyFilters}>
                סנן
            </Button>
            <Button variant="outlined" color="primary" fullWidth onClick={resetFilters} style={{ marginTop: '10px', borderColor: '#64b5f6', color: '#64b5f6' }}>
                איפוס סינונים
            </Button>
        </div>
    );
};

export default FilterComponent;
