import React, { useState } from 'react';
import inventoryData from '../data.json';
import { Item } from '../Interface/InventoryTypes';
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
    });

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
            setNewInventory({ id: 0, name: '', unit: '', stock: 0 });
        }
    };
    return (
        <div className="container">
            <div className="inventory-list">
                <h2>Inventories</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventories.map((inventory) => (
                            <tr key={inventory.id}>
                                <td>{inventory.name}</td>
                                <td>{inventory.unit}</td>
                                <td>{inventory.stock}</td>
                                <td>
                                    <button>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button>Add Inventory</button>
            </div>
            <div className="add-inventory">
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

