import React, { useState, useEffect } from 'react';
import { Slider, Button, RadioGroup, FormControlLabel, Typography, Radio, Box } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';

const FilterComponent = ({ onFilter, products }) => {
    const maxPrice = products && products.length > 0
        ? Math.max(...products.map(product => product.price))
        : 1000000;
    const [priceRange, setPriceRange] = useState([100, maxPrice]);
    const [fontType, setFontType] = useState('');
    const [scrollType, setScrollType] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 900);
            if (window.innerWidth >= 900) {
                setIsFilterOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        const normalizedFontType = fontType
            .replace(/["']/g, '')
            .replace('הארי', 'האר"י')
            .replace('חבד', 'חב"ד');
            
        onFilter({
            priceRange,
            fontType: normalizedFontType || null,
            scrollType: scrollType || null,
        });
        if (isMobile) setIsFilterOpen(false);
    };

    const resetFilters = () => {
        setPriceRange([100, maxPrice]);
        setFontType('');
        setScrollType('');
        onFilter({ priceRange: [100, 10000], fontType: null, scrollType: null });
        if (isMobile) setIsFilterOpen(false);
    };

    const FilterToggleButton = () => (
        isMobile && (
            <Button
                variant="contained"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                sx={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    zIndex: 999,
                    borderRadius: '50%',
                    minWidth: '50px',
                    height: '50px',
                    backgroundColor: '#1976d2',
                }}
            >
                <FilterListIcon />
            </Button>
        )
    );

    return (
        <>
            <FilterToggleButton />
            <div
                style={{
                    width: '260px',
                    padding: '20px',
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    boxShadow: '2px 4px 12px rgba(0,0,0,0.15)',
                    position: 'fixed',
                    top: '68px',
                    right: isMobile ? (isFilterOpen ? '0' : '-300px') : '0',
                    height: 'calc(100vh - 68px)',
                    textAlign: 'right',
                    direction: 'rtl',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                    zIndex: 1000,
                    transition: 'right 0.3s ease-in-out',
                    overflowY: 'auto',
                }}
            >
                {isMobile && (
                    <Button
                        onClick={() => setIsFilterOpen(false)}
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            minWidth: '40px',
                        }}
                    >
                        <CloseIcon />
                    </Button>
                )}

                <Typography variant="subtitle2" style={{ fontWeight: 'bold', fontSize: '1rem', marginTop: isMobile ? '20px' : '0' }}>
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

                <Box display="flex" justifyContent="center" gap="10px" width="90%" style={{ paddingBottom: '20px' }}>
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
        </>
    );
};

export default FilterComponent;
