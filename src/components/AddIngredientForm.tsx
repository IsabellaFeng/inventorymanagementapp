import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const AddIngredientForm = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        unit: '',
        quantity: 0,
        unitPrice: 0
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        console.log(formData);
        setOpen(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value
        });
    };

    const isValidaForm = () => {
        return formData.name.trim() !== '' && formData.unit.trim() !== '';
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add New
            </Button>
            <Dialog open={open}>
                <DialogTitle>Add new Ingredient</DialogTitle>
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
                    <Button disabled={!isValidaForm()} onClick={handleConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddIngredientForm;