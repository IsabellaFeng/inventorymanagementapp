import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import inventoryData from '../data.json';
import { Item } from '../Interface/InventoryTypes';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';


interface InventoryProps {
    title?: string;
}
const InventoryView: React.FC<InventoryProps> = (props) => {
    const [inventories, setInventories] = useState<Item[]>(inventoryData);
    const [newInventory, setNewInventory] = useState<Item>({
        id: 0,
        name: '',
        unit: '',
        stock: 0,
        unitPrice: 0,
        lastUpdated: new Date().toDateString()
    });

    const columnNames = [
        "Id",
        "Name",
        "Unit",
        "Stock",
        "Unit Price",
        "Last Updated"
    ]

    const theme = useTheme();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: keyof Item
    ) => {
        setNewInventory({ ...newInventory, [field]: e.target.value });
    };

    const handleAddInventory = () => {
        if (newInventory.name && newInventory.unit && newInventory.stock) {
            setInventories([
                ...inventories,
                { ...newInventory, id: inventories.length + 1 },
            ]);
            setNewInventory({ id: 0, name: '', unit: '', stock: 0, unitPrice: 0 });
        }
    };
    return (
        <div className="container">
            <div className="inventory-list ">
                <div className='font-semibold my-2'>Inventories</div>
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
                            {inventories.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {Object.keys(row).map((key) =>
                                        <TableCell key={key}>{row[key]}</TableCell>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <h2>Add New Inventory</h2>
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
                <button onClick={handleAddInventory}>Add</button>
            </div>
        </div>
    )
};


export default InventoryView;

