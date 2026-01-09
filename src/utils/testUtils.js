// Test utilities for the application
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '../Provider/AuthProvider';

// Mock user data for testing
export const mockUsers = {
    admin: {
        uid: 'admin-123',
        email: 'admin@test.com',
        displayName: 'Admin User',
        photoURL: 'https://example.com/admin.jpg'
    },
    donor: {
        uid: 'donor-123',
        email: 'donor@test.com',
        displayName: 'Donor User',
        photoURL: 'https://example.com/donor.jpg'
    },
    volunteer: {
        uid: 'volunteer-123',
        email: 'volunteer@test.com',
        displayName: 'Volunteer User',
        photoURL: 'https://example.com/volunteer.jpg'
    }
};

// Mock donation requests
export const mockDonationRequests = [
    {
        _id: 'req-1',
        requesterName: 'John Doe',
        requesterEmail: 'john@test.com',
        recipientName: 'Jane Smith',
        bloodGroup: 'A+',
        recipientDistrict: 'Dhaka',
        recipientUpazila: 'Dhanmondi',
        hospitalName: 'Dhaka Medical College',
        donationDate: '2024-02-15',
        status: 'pending',
        createdAt: '2024-02-10T10:00:00Z'
    },
    {
        _id: 'req-2',
        requesterName: 'Alice Johnson',
        requesterEmail: 'alice@test.com',
        recipientName: 'Bob Wilson',
        bloodGroup: 'O-',
        recipientDistrict: 'Chittagong',
        recipientUpazila: 'Kotwali',
        hospitalName: 'Chittagong Medical College',
        donationDate: '2024-02-20',
        status: 'inprogress',
        createdAt: '2024-02-12T14:30:00Z'
    }
];

// Custom render function with providers
export const renderWithProviders = (ui, options = {}) => {
    const { initialEntries = ['/'], user = null, ...renderOptions } = options;

    const Wrapper = ({ children }) => (
        <BrowserRouter>
            <AuthProvider initialUser={user}>
                {children}
            </AuthProvider>
        </BrowserRouter>
    );

    return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Mock API responses
export const mockApiResponses = {
    getDonationRequests: {
        success: true,
        requests: mockDonationRequests,
        total: mockDonationRequests.length
    },

    createDonationRequest: {
        success: true,
        message: 'Request created successfully',
        requestId: 'new-req-123'
    },

    updateRequestStatus: {
        success: true,
        message: 'Status updated successfully'
    },

    searchDonors: {
        success: true,
        donors: [
            {
                name: 'Test Donor',
                email: 'testdonor@test.com',
                bloodGroup: 'A+',
                district: 'Dhaka',
                upazila: 'Dhanmondi'
            }
        ]
    },

    getStats: {
        success: true,
        stats: {
            totalUsers: 150,
            totalDonors: 120,
            totalRequests: 45,
            pendingRequests: 12,
            completedRequests: 28,
            totalFunding: 5000
        }
    }
};

// Test data generators
export const generateMockUser = (role = 'donor', overrides = {}) => ({
    uid: `${role}-${Date.now()}`,
    email: `${role}@test.com`,
    displayName: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`,
    photoURL: `https://example.com/${role}.jpg`,
    ...overrides
});

export const generateMockRequest = (overrides = {}) => ({
    _id: `req-${Date.now()}`,
    requesterName: 'Test Requester',
    requesterEmail: 'requester@test.com',
    recipientName: 'Test Recipient',
    bloodGroup: 'A+',
    recipientDistrict: 'Dhaka',
    recipientUpazila: 'Dhanmondi',
    hospitalName: 'Test Hospital',
    donationDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    createdAt: new Date().toISOString(),
    ...overrides
});

// Assertion helpers
export const expectElementToBeVisible = (element) => {
    expect(element).toBeInTheDocument();
    expect(element).toBeVisible();
};

export const expectElementToHaveText = (element, text) => {
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(text);
};

// Mock localStorage
export const mockLocalStorage = () => {
    const store = {};

    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => {
            store[key] = value.toString();
        }),
        removeItem: jest.fn((key) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            Object.keys(store).forEach(key => delete store[key]);
        })
    };
};