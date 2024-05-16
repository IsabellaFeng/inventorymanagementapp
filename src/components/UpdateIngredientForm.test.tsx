import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UpdateIngredientForm from './UpdateIngredientForm';
import { IngredientForm } from '../interface/InventoryTypes';

describe('UpdateIngredientForm Component', () => {
    const mockHandleClose = jest.fn();
    const mockHandleUpdateIngredient = jest.fn();
    const ingredientData: IngredientForm = {
        name: 'Sugar',
        unit: 'kg',
        quantity: 10,
        unitPrice: 5,
    };

    beforeEach(() => {
        mockHandleClose.mockClear();
        mockHandleUpdateIngredient.mockClear();
    });


    it('renders the form with initial data', () => {
        render(
            <UpdateIngredientForm
                open={true}
                ingredientData={ingredientData}
                title="Update Ingredient"
                handleClose={mockHandleClose}
                handleUpdateIngredient={mockHandleUpdateIngredient}
            />
        );

        expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue('Sugar');
        expect(screen.getByRole('textbox', { name: /unit/i })).toHaveValue('kg');
        expect(screen.getByRole('spinbutton', { name: /quantity/i })).toHaveValue(10);
        expect(screen.getByRole('spinbutton', { name: /unit price/i })).toHaveValue(5);
    });

    it('validates form inputs', async () => {
        render(
            <UpdateIngredientForm
                open={true}
                ingredientData={ingredientData}
                title="Update Ingredient"
                handleClose={mockHandleClose}
                handleUpdateIngredient={mockHandleUpdateIngredient}
            />
        );


        await fireEvent.change((screen.getByRole('textbox', { name: /name/i })), { target: { value: '' } });
        await fireEvent.change(screen.getByRole('textbox', { name: /unit/i }), { target: { value: '' } });


        expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue('');
        expect(screen.getByRole('textbox', { name: /unit/i })).toHaveValue('');
        expect(screen.getByText('Confirm')).toBeDisabled();
    });

    it('enables the Confirm button when form is valid', async () => {
        render(
            <UpdateIngredientForm
                open={true}
                ingredientData={ingredientData}
                title="Update Ingredient"
                handleClose={mockHandleClose}
                handleUpdateIngredient={mockHandleUpdateIngredient}
            />
        );


        await fireEvent.change(screen.getByRole('textbox', { name: /name/i }), { target: { value: 'item1' } });
        await fireEvent.change(screen.getByRole('textbox', { name: /unit/i }), { target: { value: 'box' } });
        await fireEvent.change(screen.getByRole('spinbutton', { name: /quantity/i }), { target: { value: 1 } });
        await fireEvent.change(screen.getByRole('spinbutton', { name: /unit price/i }), { target: { value: 100 } });


        expect(screen.getByText('Confirm')).not.toBeDisabled();
    });

    it('submits the form with correct data', async () => {
        render(
            <UpdateIngredientForm
                open={true}
                ingredientData={ingredientData}
                title="Update Ingredient"
                handleClose={mockHandleClose}
                handleUpdateIngredient={mockHandleUpdateIngredient}
            />
        );

        await fireEvent.change(screen.getByRole('textbox', { name: /name/i }), { target: { value: 'item1' } });
        await fireEvent.change(screen.getByRole('textbox', { name: /unit/i }), { target: { value: 'box' } });
        await fireEvent.change(screen.getByRole('spinbutton', { name: /quantity/i }), { target: { value: 1 } });
        await fireEvent.change(screen.getByRole('spinbutton', { name: /unit price/i }), { target: { value: 100 } });


        fireEvent.click(screen.getByText('Confirm'));

        expect(mockHandleUpdateIngredient).toHaveBeenCalledWith({
            name: 'item1',
            unit: 'box',
            quantity: 1,
            unitPrice: 100,
            lastUpdatedAt: new Date().toLocaleDateString(),
        });
        expect(mockHandleClose).toHaveBeenCalled();
    });

    it('calls handleClose when Cancel button is clicked', async () => {
        render(
            <UpdateIngredientForm
                open={true}
                ingredientData={ingredientData}
                title="Update Ingredient"
                handleClose={mockHandleClose}
                handleUpdateIngredient={mockHandleUpdateIngredient}
            />
        );

        await fireEvent.click(screen.getByText('Cancel'));

        expect(mockHandleClose).toHaveBeenCalled();
    });
});