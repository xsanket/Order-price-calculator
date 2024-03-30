import React, { useState } from 'react';
import axios from 'axios';



const PriceCalculationForm = () => {
  const [zone, setZone] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [totalDistance, setTotalDistance] = useState('');
  const [itemType, setItemType] = useState('');
  const [totalPrice, setTotalPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
                                            //access backend api using env
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/pricing`,{
        zone,
        organizationId,
        totalDistance: parseFloat(totalDistance),
        itemType,
      });

      setTotalPrice(response.data.total_price);
    } catch (error) {
      console.error('Error calculating price:', error);
    }
  };

  return (
    <div className="w-1/2 mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 className="text-2xl text-center font-bold mb-4">Calculate Order Price</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="zone" className="block font-medium mb-2 ml-2">
          Zone:
        </label>
        <select
          id="zone"
          required
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select a zone</option>
          <option value="central">Central</option>
          <option value="western">Western</option>
          <option value="eastern">Eastern</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="organizationId" className="block font-medium mb-2 ml-2">
          Organization ID:
        </label>
        <input
          type="text"
          required 
          id="organizationId"
          placeholder='Org ID e.g. 001'
          value={organizationId}
          onChange={(e) => setOrganizationId(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="totalDistance" className="block font-medium mb-2 ml-2">
          Total Distance (km):
        </label>
        <input
          type="number"
          required
          id="totalDistance"
          placeholder='Delivery distance in KM'
          value={totalDistance}
          onChange={(e) => setTotalDistance(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          step="0.1"
          min="0"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="itemType" className="block font-medium mb-2 ml-2">
          Item Type:
        </label>
        <select
          id="itemType"
          value={itemType}
          required
          onChange={(e) => setItemType(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select an item type</option>
          <option value="perishable">Perishable</option>
          <option value="non-perishable">Non-Perishable</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Calculate Price
      </button>
    </form>
    {totalPrice && <p className="mt-4 ">Total Price: {totalPrice}</p>}
  </div>

  );
};

export default PriceCalculationForm;