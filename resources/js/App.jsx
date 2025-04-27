import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Customers from './pages/Customers';
import AddCustomer from './pages/AddCustomer';
import EditCustomer from './pages/EditCustomer';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Customers />} />
                <Route path="/add-customer" element={<AddCustomer />} />
                <Route path="/edit-customer/:id" element={<EditCustomer />} />
            </Routes>
        </Router>
    );
}

export default App;