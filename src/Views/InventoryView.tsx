import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import inventoryData from '../data.json';
import { Ingredient } from '../interface/InventoryTypes';
import PropTypes from 'prop-types';
import { fetchIngredients } from '../services/inventory/inventoryService';
import AddIngredientForm from '../components/AddIngredientForm';


interface InventoryProps {
    title?: string;
    shopId: number;
}
const InventoryView: React.FC<InventoryProps> = (props) => {
    const [inventory, setInventory] = useState<Ingredient[]>(inventoryData);
    const { title, shopId } = props;
    const columnNames = {
        ingredientId: "Id",
        name: "Name",
        unit: "Unit",
        quantity: "Stock",
        unitPrice: "Unit Price",
        lastUpdatedAt: "Last Updated"
    }

    useEffect(() => {
        // fetchIngredients().then(data => {
        //     console.log(data);
        // })
    }, [shopId]);


    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof Ingredient
    ) => {
        console.log('inputChange')
    };

    const handleAddIngredient = (formData: Ingredient) => {
        const newIngredient = { ...formData, ingredientId: inventory.length }
        setInventory([...inventory, newIngredient]);

    };
    return (
        <div className="container">
            <div className="inventory-list ">
                <div className='flex justify-between items-center my-2'>
                    <div className='font-semibold' >Inventory</div>
                    <AddIngredientForm handleAddIngredient={handleAddIngredient} />
                </div>
                <TableContainer component={Paper}>
                    <Table className='min-w-80'>
                        <TableHead className='bg-primary' >
                            <TableRow>
                                {Object.keys(columnNames).map((key) =>
                                    <TableCell sx={{ fontWeight: 600 }} key={key}>{columnNames[key]}</TableCell>
                                )}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inventory.map((row, index) => (
                                <TableRow
                                    key={row.name}
                                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {Object.keys(columnNames).map((key) =>
                                        <TableCell key={key}>{row[key as keyof Ingredient]}</TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
};


export default InventoryView;

