import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddIngredient from './AddIngredient';
import { IngredientForm } from '../interface/InventoryTypes';

jest.mock('./UpdateIngredientForm', () => (props: any) => (
    props.open ? (
        <div>
            <div>{props.title}</div>
            <button onClick={() => props.handleUpdateIngredient(props.ingredientData)}>Submit</button>
            <button onClick={props.handleClose}>Close</button>
        </div>
    ) : null
));

describe('AddIngredient Component', () => {
    const mockHandleAddIngredient = jest.fn();

    beforeEach(() => {
        mockHandleAddIngredient.mockClear();
    });

    it('renders Add New button', () => {
        render(<AddIngredient handleAddIngredient={mockHandleAddIngredient} />);

        expect(screen.getByText('Add New')).toBeInTheDocument();
    });

    it('opens form when Add New button is clicked', () => {
        render(<AddIngredient handleAddIngredient={mockHandleAddIngredient} />);

        fireEvent.click(screen.getByText('Add New'));

        expect(screen.getByText('Add new Ingredient')).toBeInTheDocument();
        expect(screen.getByText('Submit')).toBeInTheDocument();
        expect(screen.getByText('Close')).toBeInTheDocument();
    });

    it('closes form when Close button is clicked', () => {
        render(<AddIngredient handleAddIngredient={mockHandleAddIngredient} />);

        fireEvent.click(screen.getByText('Add New'));
        fireEvent.click(screen.getByText('Close'));

        expect(screen.queryByText('Add new Ingredient')).not.toBeInTheDocument();
    });
});