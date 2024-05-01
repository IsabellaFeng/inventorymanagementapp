import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import inventoryData from '../data.json';
import { Ingredients } from '../interface/InventoryTypes';
import PropTypes from 'prop-types';
import { fetchIngredients } from '../services/inventory/inventoryService';


interface InventoryProps {
    title?: string;
    shopId: number;
}
const InventoryView: React.FC<InventoryProps> = (props) => {
    const [inventories, setInventories] = useState<Ingredients[]>(inventoryData);
    const [newInventory, setNewInventory] = useState<Ingredients>({
        ingredientId: 0,
        name: '',
        unit: '',
        quantity: 0,
        unitPrice: 0,
        lastUpdatedAt: new Date().toDateString()
    });
    const { title, shopId } = props;
    const columnNames = [
        "Id",
        "Name",
        "Unit",
        "Stock",
        "Unit Price",
        "Last Updated"
    ]

    useEffect(() => {
        fetchIngredients().then(data => {
            console.log(data);
        })
    }, [shopId]);


    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof Ingredients
    ) => {
        setNewInventory({ ...newInventory, [field]: e.target.value });
    };

    const handleAddInventory = () => {
        if (newInventory.name && newInventory.unit && newInventory.quantity) {
            setInventories([
                ...inventories,
                { ...newInventory, ingredientId: inventories.length + 1 },
            ]);
            setNewInventory({ ingredientId: 0, name: '', unit: '', quantity: 0, unitPrice: 0 });
        }
    };
    return (
        <div className="container">
            <div className="inventory-list ">
                <div className='font-semibold my-2'>Inventory</div>
                <TableContainer component={Paper}>
                    <Table className='min-w-80'>
                        <TableHead className='bg-primary' >
                            <TableRow>
                                {columnNames.map((name) =>
                                    <TableCell sx={{ fontWeight: 600 }} key={name}>{name}</TableCell>
                                )}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {inventories.map((row, index) => (
                                <TableRow
                                    key={row.name}
                                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {Object.keys(row).map((key) =>
                                        <TableCell key={key}>{row[key as keyof Ingredients]}</TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <h2>Add New Inventory</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newInventory.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                />
                <input
                    type="text"
                    placeholder="Unit"
                    value={newInventory.unit}
                    onChange={(e) => handleInputChange(e, 'unit')}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newInventory.stock}
                    onChange={(e) => handleInputChange(e, 'stock')}
                />
                <button onClick={handleAddInventory}>Add</button> */}
            </div>
        </div>
    )
};


export default InventoryView;

