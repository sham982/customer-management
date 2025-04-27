import React, { useState, useEffect } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    IconButton,
    TablePagination,
    Tooltip,
    Menu,
    MenuItem,
} from '@mui/material';
import { Edit, Delete, FilterList, Search, PictureAsPdf, GridOn } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // State for column-specific filters
    const [columnFilters, setColumnFilters] = useState({
        full_name: '',
        phone_number: '',
        tin: '',
        vat_reg_no: '',
        registration_date: '',
        address: '',
        status: '',
    });

    // State for dropdown menus
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeColumn, setActiveColumn] = useState('');

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/customers', {
                params: { search, page: page + 1, per_page: rowsPerPage, ...columnFilters },
            });
            setCustomers(res.data.data || []);
        } catch (err) {
            console.error('Error fetching customers:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [search, page, rowsPerPage, columnFilters]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this customer?')) return;

        try {
            await axios.delete(`/api/customers/${id}`);
            setCustomers(customers.filter((customer) => customer.id !== id));
            alert('Customer deleted successfully.');
        } catch (err) {
            console.error('Error deleting customer:', err);
            alert('Failed to delete customer. Please try again.');
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(customers);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
        XLSX.writeFile(workbook, 'customers.xlsx');
    };

    const handleExportToPDF = () => {
        const doc = new jsPDF();
        doc.text('Customer List', 10, 10);
        doc.autoTable({
            head: [['Full Name', 'Phone Number', 'TIN', 'VAT Reg No', 'Address', 'Status']],
            body: customers.map(customer => [
                customer.full_name,
                customer.phone_number,
                customer.tin,
                customer.vat_reg_no,
                customer.address,
                customer.status ? '✓' : '✗',
            ]),
        });
        doc.save('customers.pdf');
    };

    const handleFilterClick = (event, column) => {
        setAnchorEl(event.currentTarget);
        setActiveColumn(column);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
        setActiveColumn('');
    };

    const handleFilterChange = (event) => {
        setColumnFilters({ ...columnFilters, [activeColumn]: event.target.value });
    };

    return (
        <Box sx={{ p: 3, fontFamily: 'Inter, Poppins, sans-serif' }}>
            {/* Header Actions Bar */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                }}
            >
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="contained"
                        component={Link}
                        to="/add-customer"
                        sx={{
                            backgroundColor: '#2563EB',
                            color: '#fff',
                            borderRadius: 2,
                            '&:hover': { backgroundColor: '#1E40AF' },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        Add New Customer
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<GridOn />}
                        onClick={handleExportToExcel}
                        sx={{
                            borderColor: '#2563EB',
                            color: '#2563EB',
                            borderRadius: 2,
                            '&:hover': { backgroundColor: '#E0F2FE' },
                        }}
                    >
                        Excel
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<PictureAsPdf />}
                        onClick={handleExportToPDF}
                        sx={{
                            borderColor: '#2563EB',
                            color: '#2563EB',
                            borderRadius: 2,
                            '&:hover': { backgroundColor: '#E0F2FE' },
                        }}
                    >
                        PDF
                    </Button>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                        size="small"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: <Search sx={{ mr: 1, color: '#6B7280' }} />,
                        }}
                        sx={{
                            backgroundColor: '#F3F4F6',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': { borderColor: '#E5E7EB' },
                                '&:hover fieldset': { borderColor: '#2563EB' },
                                '&.Mui-focused fieldset': { borderColor: '#2563EB' },
                            },
                        }}
                    />
                </Box>
            </Box>

            {/* Table Container */}
            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 3,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    p: 3,
                    backgroundColor: '#fff',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Actions</TableCell>
                            {['full_name', 'phone_number', 'tin', 'vat_reg_no', 'registration_date', 'address', 'status'].map((column) => (
                                <TableCell key={column}>
                                    <Box display="flex" alignItems="center">
                                        {column.replace('_', ' ').toUpperCase()}
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleFilterClick(e, column)}
                                        >
                                            <FilterList fontSize="small" />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer, index) => (
                            <TableRow key={customer.id}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                component={Link}
                                                to={`/edit-customer/${customer.id}`}
                                                size="small"
                                            >
                                                <Edit fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDelete(customer.id)}
                                            >
                                                <Delete fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                                <TableCell>{customer.full_name}</TableCell>
                                <TableCell>{customer.phone_number}</TableCell>
                                <TableCell>{customer.tin || '-'}</TableCell>
                                <TableCell>{customer.vat_reg_no || '-'}</TableCell>
                                <TableCell>{new Date(customer.registration_date).toLocaleDateString()}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell sx={{ 
                                    color: customer.status ? 'green' : 'red',
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }}>
                                    {customer.status ? '✓' : '✗'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Filter Dropdown */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleFilterClose}
            >
                <MenuItem>
                    <TextField
                        size="small"
                        placeholder={`Filter by ${activeColumn}`}
                        value={columnFilters[activeColumn] || ''}
                        onChange={handleFilterChange}
                        sx={{ width: 200 }}
                    />
                </MenuItem>
            </Menu>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={customers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default Customers;