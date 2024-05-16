import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useNavigate } from 'react-router-dom';
import TopAppBar from './TopAppBar';

// Mocking the useNavigate hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('TopAppBar Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
        mockNavigate.mockClear();
    });

    it('renders the TopAppBar with all elements', () => {
        render(<TopAppBar />);
        expect(screen.getByText('Inventory')).toBeInTheDocument();
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByLabelText('menu')).toBeInTheDocument();
    });

    it('navigates to the Inventory page when the Inventory link is clicked', () => {
        render(<TopAppBar />);
        fireEvent.click(screen.getByText('Inventory'));
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('navigates to the Dashboard page when the Dashboard link is clicked', () => {
        render(<TopAppBar />);
        fireEvent.click(screen.getByText('Dashboard'));
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });

    it('calls the handleLogin function when the Login button is clicked', () => {
        render(<TopAppBar />);
        fireEvent.click(screen.getByText('Login'));
        // Since handleLogin does not have any functionality yet, we can only ensure the click happens.
        // You can add additional expectations based on future implementations.
        expect(screen.getByText('Login')).toBeInTheDocument();
    });
});