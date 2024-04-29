import React from 'react';
import InventoryView from './InventoryView';

function HomePage() {

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Inventory management - City of Tea Silverdale</h1>
      <InventoryView />
    </div>
  );
}

export default HomePage;