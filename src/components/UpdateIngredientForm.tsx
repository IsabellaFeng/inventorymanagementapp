import React, { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { IngredientForm } from '../interface/InventoryTypes'


interface UpdateIngredientFormProps {
    open: boolean;
    ingredientData: IngredientForm;
    title: string;
    handleClose: () => void;
    handleUpdateIngredient: (ingredient: IngredientForm) => void;
}

const UpdateIngredientForm: React.FC<UpdateIngredientFormProps> = (props) => {
    const { open, ingredientData, title, handleClose, handleUpdateIngredient } = props;
    const [formData, setFormData] = useState<IngredientForm>(ingredientData);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const isValidForm = () => {
        return formData.name.trim() !== '' && formData.unit.trim() !== '';
    };

    const handleConfirm = () => {
        const newFormData = { ...formData, lastUpdatedAt: new Date().toLocaleDateString() };
        handleUpdateIngredient(newFormData);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    name="name"
                    value={formData.name}
                    error={!formData.name.trim()}
                    required
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="unit"
                    label="Unit"
                    type="text"
                    fullWidth
                    variant="standard"
                    name="unit"
                    value={formData.unit}
                    error={!formData.unit.trim()}
                    required
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="quantity"
                    label="Quantity"
                    type="number"
                    fullWidth
                    variant="standard"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    id="unitPrice"
                    label="Unit Price"
                    type="number"
                    fullWidth
                    variant="standard"
                    name="unitPrice"
                    value={formData.unitPrice}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button disabled={!isValidForm()} onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}


export default UpdateIngredientForm;