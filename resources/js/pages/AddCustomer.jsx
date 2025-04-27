import React, { useState } from 'react';
import { Box, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCustomer = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
        tin: '',
        vat_reg_no: '',
        registration_date: '',
        address: '',
        status: 'enabled',
    });
    const [errors, setErrors] = useState({
        phone_number: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Special handling for VAT Reg No
        if (name === 'vat_reg_no') {
            // Remove 'VAT' if it's already at the beginning
            const cleanedValue = value.replace(/^VAT/i, '');
            setFormData({ ...formData, [name]: `VAT${cleanedValue}` });
            return;
        }
        
        // For phone number validation
        if (name === 'phone_number') {
            // Only allow numbers
            const numericValue = value.replace(/\D/g, '');
            
            // Validate length and starting digits
            if (numericValue.length > 0 && !numericValue.startsWith('09')) {
                setErrors({ ...errors, phone_number: 'Phone number must start with 09' });
            } else if (numericValue.length > 10) {
                setErrors({ ...errors, phone_number: 'Phone number must be exactly 10 digits' });
            } else {
                setErrors({ ...errors, phone_number: '' });
            }
            
            setFormData({ ...formData, [name]: numericValue });
            return;
        }
        
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate phone number before submission
        if (formData.phone_number.length !== 10 || !formData.phone_number.startsWith('09')) {
            setErrors({ ...errors, phone_number: 'Phone number must be 10 digits starting with 09' });
            return;
        }
        
        try {
            const payload = {
                ...formData,
                status: formData.status === 'enabled', // Convert "enabled"/"disabled" to boolean
            };
            const response = await axios.post('/api/customers', payload);
            alert('Customer added successfully.');
            navigate('/'); // Redirect to the customers list
        } catch (error) {
            console.error('Error adding customer:', error.response?.data || error.message);
            alert('Failed to add customer. Please check the form and try again.');
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 600,
                mx: 'auto',
                p: 4,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff',
                fontFamily: 'Roboto, Poppins, Inter, sans-serif',
            }}
        >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
                Add New Customer
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                }}
            >
                <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Full Name <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                        fullWidth
                        name="full_name"
                        value={formData.full_name || ''}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        required
                        sx={{
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': { borderColor: '#1976d2' },
                                '&.Mui-focused fieldset': { borderColor: '#1976d2', boxShadow: '0 0 4px #1976d2' },
                            },
                        }}
                    />
                </Box>

                <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Phone Number <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                        fullWidth
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        placeholder="09XXXXXXXX"
                        required
                        error={!!errors.phone_number}
                        helperText={errors.phone_number}
                        inputProps={{
                            maxLength: 10,
                            inputMode: 'numeric'
                        }}
                        sx={{
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': { borderColor: '#1976d2' },
                                '&.Mui-focused fieldset': { borderColor: '#1976d2', boxShadow: '0 0 4px #1976d2' },
                            },
                        }}
                    />
                </Box>

                <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        TIN
                    </Typography>
                    <TextField
                        fullWidth
                        name="tin"
                        value={formData.tin}
                        onChange={handleChange}
                        placeholder="Enter TIN"
                        sx={{
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': { borderColor: '#1976d2' },
                                '&.Mui-focused fieldset': { borderColor: '#1976d2', boxShadow: '0 0 4px #1976d2' },
                            },
                        }}
                    />
                </Box>

                <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        VAT Reg No
                    </Typography>
                    <TextField
                        fullWidth
                        name="vat_reg_no"
                        value={formData.vat_reg_no}
                        onChange={handleChange}
                        placeholder="Enter VAT Reg No (numbers only)"
                        inputProps={{
                            inputMode: 'numeric'
                        }}
                        sx={{
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': { borderColor: '#1976d2' },
                                '&.Mui-focused fieldset': { borderColor: '#1976d2', boxShadow: '0 0 4px #1976d2' },
                            },
                        }}
                    />
                </Box>

                <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Registration Date <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                        fullWidth
                        type="date"
                        name="registration_date"
                        value={formData.registration_date}
                        onChange={handleChange}
                        required
                        sx={{
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': { borderColor: '#1976d2' },
                                '&.Mui-focused fieldset': { borderColor: '#1976d2', boxShadow: '0 0 4px #1976d2' },
                            },
                        }}
                    />
                </Box>

                <Box>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Address <span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                        fullWidth
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        required
                        sx={{
                            borderRadius: 1,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': { borderColor: '#1976d2' },
                                '&.Mui-focused fieldset': { borderColor: '#1976d2', boxShadow: '0 0 4px #1976d2' },
                            },
                        }}
                    />
                </Box>
            </Box>

            <Box sx={{ mt: 3 }}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    Status <span style={{ color: 'red' }}>*</span>
                </Typography>
                <RadioGroup
                    row
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    sx={{ gap: 2 }}
                >
                    <FormControlLabel value="enabled" control={<Radio />} label="Enable" />
                    <FormControlLabel value="disabled" control={<Radio />} label="Disable" />
                </RadioGroup>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                    type="button"
                    variant="outlined"
                    onClick={() => navigate('/')}
                    sx={{
                        color: '#333',
                        borderColor: '#ccc',
                        '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: '#1976d2',
                        color: '#fff',
                        borderRadius: 2,
                        '&:hover': { backgroundColor: '#1565c0' },
                        transition: 'all 0.3s ease',
                    }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default AddCustomer;