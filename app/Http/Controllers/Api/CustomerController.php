<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // Get all customers (with search)
    public function index(Request $request)
    {
        $query = Customer::query();
        
        // Add search functionality for all attributes
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('full_name', 'like', "%$search%")
                  ->orWhere('phone_number', 'like', "%$search%")
                  ->orWhere('tin', 'like', "%$search%")
                  ->orWhere('vat_reg_no', 'like', "%$search%")
                  ->orWhere('registration_date', 'like', "%$search%")
                  ->orWhere('address', 'like', "%$search%")
                  ->orWhere('status', 'like', "%$search%");
            });
        }
        
        // Get paginated results
        $customers = $query->paginate(10);
        
        // Return structured JSON response
        return response()->json([
            'data' => $customers->items(),
            'meta' => [
                'total' => $customers->total(),
                'current_page' => $customers->currentPage(),
                'per_page' => $customers->perPage(),
                'last_page' => $customers->lastPage(),
            ]
        ]);
    }

    // Add new customer
    public function store(Request $request)
    {
        \Log::info('Request Data:', $request->all()); // Log the incoming data

        // Validate incoming data
        $request->validate([
            'full_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'tin' => 'nullable|string|max:50',
            'vat_reg_no' => 'nullable|string|max:50',
            'registration_date' => 'required|date',
            'address' => 'required|string',
            'status' => 'required|boolean',
        ]);

        // Create and save the customer
        $customer = Customer::create($request->all());

        \Log::info('Customer Created:', $customer->toArray()); // Log the saved customer

        // Return the new customer with 201 status code
        return response()->json($customer, 201);
    }

    // Update a customer
    public function update(Request $request, Customer $customer)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'tin' => 'nullable|string|max:50',
            'vat_reg_no' => 'nullable|string|max:50',
            'registration_date' => 'required|date',
            'address' => 'required|string',
            'status' => 'required|boolean',
        ]);

        $customer->update($request->all());
        return response()->json($customer);
    }

    // Delete a customer
    public function destroy(Customer $customer)
    {
        $customer->delete();
        return response()->json(['message' => 'Customer deleted']);
    }

    // Show a customer
    public function show(Customer $customer)
    {
        return response()->json($customer);
    }
}