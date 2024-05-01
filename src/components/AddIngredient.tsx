import React, { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import UpdateIngredientForm from './UpdateIngredientForm';
import { IngredientForm } from '../interface/InventoryTypes'

interface AddIngredientFormProps {
    handleAddIngredient: (ingredient: IngredientForm & { lastUpdatedAt: string }) => void;
}

const initialFormData: IngredientForm = {
    name: '',
    unit: '',
    quantity: 0,
    unitPrice: 0,
};

const AddIngredient: React.FC<AddIngredientFormProps> = ({ handleAddIngredient }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [formData, setFormData] = useState<IngredientForm>(initialFormData);

    const handleClickOpen = () => {
        setFormData({ ...initialFormData });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdateIngredient = (formData: IngredientForm) => {
        const newFormData = { ...formData, lastUpdatedAt: new Date().toLocaleDateString() };
        handleAddIngredient(newFormData);
        handleClose();
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add New
            </Button>
            <UpdateIngredientForm open={open} title='Add new Ingredient' ingredientData={formData} handleClose={handleClose} handleUpdateIngredient={handleUpdateIngredient}></UpdateIngredientForm>

        </div>
    );
};

export default AddIngredient;