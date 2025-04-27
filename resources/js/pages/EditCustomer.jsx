import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditCustomer = () => {
    const { id } = useParams(); // Get the customer ID from the URL
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get(`/api/customers/${id}`);
                const customer = response.data;
                setFormData({
                    full_name: customer.full_name,
                    phone_number: customer.phone_number,
                    tin: customer.tin,
                    vat_reg_no: customer.vat_reg_no,
                    registration_date: customer.registration_date,
                    address: customer.address,
                    status: customer.status ? 'enabled' : 'disabled', // Convert boolean to string
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching customer:', error);
                alert('Failed to load customer data.');
                navigate('/');
            }
        };

        fetchCustomer();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                status: formData.status === 'enabled', // Convert "enabled"/"disabled" to boolean
            };
            await axios.put(`/api/customers/${id}`, payload);
            alert('Customer updated successfully.');
            navigate('/');
        } catch (error) {
            console.error('Error updating customer:', error.response?.data || error.message);
            alert('Failed to update customer. Please check the form and try again.');
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

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
                Edit Customer
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
                        placeholder="Enter phone number"
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
                        placeholder="Enter VAT Reg No"
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

export default EditCustomer;