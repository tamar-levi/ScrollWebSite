import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import AddProduct from './AddProduct';
import Info from './Info';
import PaymentForm from './PaymentForm';
import Review from './Review';
import InfoMobile from './InfoMobile';
import { Link } from 'react-router-dom';

const steps = ['פרטי המוצר', 'תשלום', 'סיום'];

export default function Checkout() {
    const [activeStep, setActiveStep] = useState(0);
    const [productData, setProductData] = useState(null);
    const [paymentData, setPaymentData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <AddProduct onNext={handleNext} onFormSubmit={handleProductData} productData={productData} />;
            case 1:
                return <PaymentForm onNext={handleNext} onBack={handleBack} onFormSubmit={handlePaymentData} paymentData={paymentData} productData={productData} />
            case 2:
                return <Review onNext={handleNext} onBack={handleBack} productData={productData} paymentData={paymentData} />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = () => {
        if (activeStep === 2) {
            handleFinalSubmit();
        }
        else {
            if (activeStep < 2) { setActiveStep((prev) => prev + 1); }
        }
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleProductData = (data) => {
        setProductData(data);
        console.log(data);
    };

    const handlePaymentData = (paymentData) => {
        setPaymentData(paymentData);
        console.log(paymentData);
    }

    const handleFinalSubmit = async () => {
        await addProduct(productData);
    };

    const processPayment = async (paymentDetails) => {
        console.log("The payment details are:", paymentDetails);
    };

    const addProduct = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        console.log("Adding product:", productData);

        try {
            const formData = new FormData();
            formData.append('scriptType', productData.scriptType);
            formData.append('scrollType', productData.scrollType);
            formData.append('price', productData.price);
            formData.append('note', productData.note);
            formData.append('isPremiumAd', productData.isPremiumAd);
            formData.append('primaryImage', productData.primaryImage);
            productData.additionalImages.forEach((image) => {
                formData.append('additionalImages', image);
            });

            const response = await fetch('http://localhost:5000/productsApi/addProduct', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: formData
            });

            if (response.ok) {
                setActiveStep((prev) => prev + 1);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <CssBaseline enableColorScheme />
            <Grid
                container
                sx={{
                    mt: {
                        xs: 4,
                        sm: 8,
                    },
                    direction: 'rtl',
                    // height: '100vh',
                    // overflow: 'hidden',
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={5}
                    lg={4}
                    sx={{
                        order: { sm: 1 },
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        backgroundColor: 'background.paper',
                        borderLeft: { sm: 'none', md: '1px solid' },
                        borderColor: { sm: 'none', md: 'divider' },
                        alignItems: 'start',
                        pt: 6,
                        px: 10,
                        gap: 4,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            width: '100%',
                            maxWidth: 500,
                            textAlign: 'right',
                            '& .MuiTypography-root': {
                                textAlign: 'right'
                            },
                            '& .MuiFormControl-root': {
                                textAlign: 'right'
                            }
                        }}
                    >
                        <Info />
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={7}
                    lg={8}
                    sx={{
                        order: { sm: 2 },
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '100%',
                        width: '100%',
                        backgroundColor: { xs: 'transparent', sm: 'background.default' },
                        alignItems: 'start',
                        pt: { xs: 0, sm: 6 },
                        px: { xs: 2, sm: 10 },
                        gap: { xs: 4, md: 8 },
                        overflow: 'hidden',
                    }}
                >
<Card 
    sx={{
        display: { xs: 'flex', md: 'none' },
        width: '100%',
        mb: 2,
        mt: 3,
        padding: 0
    }}
>
    <CardContent
        sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '4px !important',
            '&:last-child': {
                paddingBottom: '4px !important'
            },
            '& > *': {
                textAlign: 'center'
            }
        }}
    >
        <InfoMobile />
    </CardContent>
</Card>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { sm: 'space-between', md: 'flex-end', ml: 2 },
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: { sm: '100%', md: 600 },
                        }}
                    >
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                                flexGrow: 1,
                            }}
                        >
                            <Stepper
                                id="desktop-stepper"
                                activeStep={activeStep}
                                sx={{ width: '100%', height: 40 }}
                            >
                                {steps.map((label) => (
                                    <Step
                                        sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                                        key={label}
                                    >
                                        <StepLabel sx={{
                                            '& .MuiStepLabel-iconContainer': {
                                                paddingLeft: '8px',
                                            },
                                            '& .MuiStepLabel-labelContainer': {
                                                paddingLeft: '8px',
                                            }
                                        }}>
                                            {label}
                                        </StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            width: '100%',
                            maxWidth: { sm: '100%', md: 600 },
                            maxHeight: '720px',
                            gap: { xs: 0, md: 'none' },
                            mt: -8
                        }}
                    >
                        <Stepper
                            id="mobile-stepper"
                            activeStep={activeStep}
                            alternativeLabel
                            sx={{
                                display: { sm: 'flex', md: 'none' },
                                '& .MuiStepConnector-root': {
                                    display: 'none'
                                }
                            }}
                        >
                            {steps.map((label) => (
                                <Step
                                    sx={{
                                        ':first-child': { pl: 0 },
                                        ':last-child': { pr: 0 },
                                        '& .MuiStepConnector-root': { top: { xs: 4, sm: 12 } },
                                    }}
                                    key={label}
                                >
                                    <StepLabel
                                        sx={{ '.MuiStepLabel-labelContainer': { maxWidth: '70px' } }}
                                    >
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <Stack spacing={2} useFlexGap>
                                <Typography variant="h2" sx={{ mt: 4 }}>📜</Typography>
                                <Typography variant="h5">המוצר שלך התווסף בהצלחה!</Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    לינק לשיתוף המוצר
                                    <strong> #140396</strong>
                                </Typography>
                                <Button
                                    component={Link}
                                    to="/products"
                                    variant="contained"
                                    sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
                                >
                                    מעבר לדף המוצרים
                                </Button>
                            </Stack>
                        ) : (
                            <>
                                {getStepContent(activeStep)}
                            </>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
