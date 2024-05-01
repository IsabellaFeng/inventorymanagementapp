import React, { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import { Ingredient } from '../interface/InventoryTypes';
import { IngredientForm } from '../interface/InventoryTypes'
import UpdateIngredientForm from './UpdateIngredientForm';


interface UpdateIngredientFormProps {
    ingredient: Ingredient;
    handleEditIngredient: (ingredient: Ingredient) => void;
}

const UpdateIngredient: React.FC<UpdateIngredientFormProps> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const { ingredient, handleEditIngredient } = props;

    const getIngredientData = () => {
        return {
            name: ingredient.name,
            unit: ingredient.unit,
            quantity: ingredient.quantity,
            unitPrice: ingredient.unitPrice,
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateIngredient = (formData: IngredientForm) => {
        const newFormData = { ...formData, lastUpdatedAt: new Date().toLocaleDateString(), ingredientId: ingredient.ingredientId };
        handleEditIngredient(newFormData);
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit
            </Button>
            <UpdateIngredientForm open={open} title='Edit Existing Ingredient' ingredientData={getIngredientData()} handleClose={handleClose} handleUpdateIngredient={handleUpdateIngredient}></UpdateIngredientForm>
        </div>
    );
};

export default UpdateIngredient;