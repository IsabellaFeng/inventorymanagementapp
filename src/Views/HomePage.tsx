import React from 'react';
import InventoryView from './InventoryView';
import logo from '../assets/logo001.png';

function HomePage() {

  return (
    <div>
      <div className="flex items-center">
        <img src={logo} className="mr-4 h-8 w-8 rounded-full" />
        <h1 className="text-3xl font-bold underline">Inventory management - City of Tea Silverdale</h1>
      </div>
      <InventoryView shopId={1} />
    </div>
  );
}

export default HomePage;