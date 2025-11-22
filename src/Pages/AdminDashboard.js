import React, { useState } from 'react';
import { useProducts } from '../Contexts/ProductContext'; // ✅ adjust path if needed

const AdminDashboard = () => {
  const { productsByType, addProduct, deleteProduct } = useProducts();
  const [selectedType, setSelectedType] = useState('medicines');
  const [formData, setFormData] = useState({});
  const [nextId, setNextId] = useState(31); // ✅ Start from 31

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddProduct = () => {
  const newProduct = { ...formData, id: nextId, type: selectedType };
  addProduct(selectedType, newProduct);
  setNextId((prev) => prev + 1); // ✅ Increment for next product
  setFormData({});
};

  const handleDelete = (type, id) => {
    deleteProduct(type, id);
  };

  const checkbox = (name, label) => (
    <label>
      <input type="checkbox" name={name} checked={formData[name] || false} onChange={handleChange} /> {label}
    </label>
  );

  const renderCommonFields = () => (
    <>
      <input name="productTitle" placeholder="Product Title" onChange={handleChange} value={formData.productTitle || ''} />
      <textarea name="description" placeholder="Description" onChange={handleChange} value={formData.description || ''} />
      <input name="priceInDollar" type="number" placeholder="Price ($)" onChange={handleChange} value={formData.priceInDollar || ''} />
      <input name="thumbnail" placeholder="Image URL" onChange={handleChange} value={formData.thumbnail || ''} />
      <input name="category" placeholder="Category" onChange={handleChange} value={formData.category || ''} />
      <input name="stock" type="number" placeholder="Stock" onChange={handleChange} value={formData.stock || ''} />
      <input name="brand" placeholder="Brand" onChange={handleChange} value={formData.brand || ''} />
    </>
  );

  const renderFields = () => {
    const common = renderCommonFields();

    const fields = {
      medicines: (
        <>
          {common}
          <input name="tablets" type="number" placeholder="Tablets" onChange={handleChange} value={formData.tablets || ''} />
          <input name="mg" placeholder="MG" onChange={handleChange} value={formData.mg || ''} />
          <input name="expirationDate" type="date" onChange={handleChange} value={formData.expirationDate || ''} />
          <input name="form" placeholder="Form" onChange={handleChange} value={formData.form || ''} />
          <input name="dosagePerDay" placeholder="Dosage Per Day" onChange={handleChange} value={formData.dosagePerDay || ''} />
          <input name="ingredients" placeholder="Ingredients (comma-separated)" onChange={handleChange} value={formData.ingredients || ''} />
          {checkbox('isVegetarian', 'Vegetarian')}
          {checkbox('isGlutenFree', 'Gluten-Free')}
          <input name="countryOfOrigin" placeholder="Country of Origin" onChange={handleChange} value={formData.countryOfOrigin || ''} />
          <textarea name="safetyWarnings" placeholder="Safety Warnings" onChange={handleChange} value={formData.safetyWarnings || ''} />
          <input name="barcode" placeholder="Barcode" onChange={handleChange} value={formData.barcode || ''} />
          <input name="rating" type="number" placeholder="Rating" onChange={handleChange} value={formData.rating || ''} />
          <input name="reviewsCount" type="number" placeholder="Reviews Count" onChange={handleChange} value={formData.reviewsCount || ''} />
        </>
      ),
      vitamins: null, // same as medicines
      medicalequipment: (
        <>
          {common}
          <input name="model" placeholder="Model" onChange={handleChange} value={formData.model || ''} />
          <input name="warrantyPeriod" placeholder="Warranty Period" onChange={handleChange} value={formData.warrantyPeriod || ''} />
          <input name="powerSource" placeholder="Power Source" onChange={handleChange} value={formData.powerSource || ''} />
          <input name="dimensions" placeholder="Dimensions" onChange={handleChange} value={formData.dimensions || ''} />
          <input name="weight" placeholder="Weight" onChange={handleChange} value={formData.weight || ''} />
          <textarea name="usageInstructions" placeholder="Usage Instructions" onChange={handleChange} value={formData.usageInstructions || ''} />
          <input name="countryOfOrigin" placeholder="Country of Origin" onChange={handleChange} value={formData.countryOfOrigin || ''} />
          {checkbox('isRechargeable', 'Rechargeable')}
          <input name="barcode" placeholder="Barcode" onChange={handleChange} value={formData.barcode || ''} />
          <input name="rating" type="number" placeholder="Rating" onChange={handleChange} value={formData.rating || ''} />
          <input name="reviewsCount" type="number" placeholder="Reviews Count" onChange={handleChange} value={formData.reviewsCount || ''} />
        </>
      ),
      firstaid: (
        <>
          {common}
          <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} value={formData.quantity || ''} />
          {checkbox('sterile', 'Sterile')}
          <input name="dimensions" placeholder="Dimensions" onChange={handleChange} value={formData.dimensions || ''} />
          <textarea name="usageInstructions" placeholder="Usage Instructions" onChange={handleChange} value={formData.usageInstructions || ''} />
          <input name="countryOfOrigin" placeholder="Country of Origin" onChange={handleChange} value={formData.countryOfOrigin || ''} />
          <input name="expirationDate" type="date" onChange={handleChange} value={formData.expirationDate || ''} />
          <input name="barcode" placeholder="Barcode" onChange={handleChange} value={formData.barcode || ''} />
          <input name="rating" type="number" placeholder="Rating" onChange={handleChange} value={formData.rating || ''} />
          <input name="reviewsCount" type="number" placeholder="Reviews Count" onChange={handleChange} value={formData.reviewsCount || ''} />
        </>
      ),
      personalcare: (
        <>
          {common}
          <input name="quantity" placeholder="Quantity" onChange={handleChange} value={formData.quantity || ''} />
          <input name="form" placeholder="Form" onChange={handleChange} value={formData.form || ''} />
          <input name="scent" placeholder="Scent" onChange={handleChange} value={formData.scent || ''} />
          <input name="skinType" placeholder="Skin Type" onChange={handleChange} value={formData.skinType || ''} />
          <textarea name="usageInstructions" placeholder="Usage Instructions" onChange={handleChange} value={formData.usageInstructions || ''} />
          <input name="expirationDate" type="date" onChange={handleChange} value={formData.expirationDate || ''} />
          {checkbox('isDermatologistTested', 'Dermatologist Tested')}
          {checkbox('isCrueltyFree', 'Cruelty-Free')}
          {checkbox('isParabenFree', 'Paraben-Free')}
          <input name="countryOfOrigin" placeholder="Country of Origin" onChange={handleChange} value={formData.countryOfOrigin || ''} />
          <input name="barcode" placeholder="Barcode" onChange={handleChange} value={formData.barcode || ''} />
          <input name="rating" type="number" placeholder="Rating" onChange={handleChange} value={formData.rating || ''} />
          <input name="reviewsCount" type="number" placeholder="Reviews Count" onChange={handleChange} value={formData.reviewsCount || ''} />
        </>
      ),
      babycare: (
        <>
          {common}
          <input name="quantity" placeholder="Quantity" onChange={handleChange} value={formData.quantity || ''} />
          <input name="form" placeholder="Form" onChange={handleChange} value={formData.form || ''} />
          <input name="scent" placeholder="Scent" onChange={handleChange} value={formData.scent || ''} />
          <textarea name="usageInstructions" placeholder="Usage Instructions" onChange={handleChange} value={formData.usageInstructions || ''} />
          {checkbox('isDermatologistTested', 'Dermatologist Tested')}
          {checkbox('isHypoallergenic', 'Hypoallergenic')}
          {checkbox('isParabenFree', 'Paraben-Free')}
          <input name="expirationDate" type="date" onChange={handleChange} value={formData.expirationDate || ''} />
          <input name="countryOfOrigin" placeholder="Country of Origin" onChange={handleChange} value={formData.countryOfOrigin || ''} />
          <input name="barcode" placeholder="Barcode" onChange={handleChange} value={formData.barcode || ''} />
          <input name="rating" type="number" placeholder="Rating" onChange={handleChange} value={formData.rating || ''} />
          <input name="reviewsCount" type="number" placeholder="Reviews Count" onChange={handleChange} value={formData.reviewsCount || ''} />
        </>
      )
    };

    return fields[selectedType] || fields['medicines'];
  };

  const renderTable = (type) => {
    const products = productsByType[type] || [];
    if (products.length === 0) return <p>No products added yet.</p>;

    // return (
    //   <table border="1" style={{ width: '100%', marginTop: '1rem' }}>
    //     <thead>
    //       <tr>
    //         <th>Title</th>
    //         <th>Price ($)</th>
    //         <th>Category</th>
    //         <th>Stock</th>
    //         <th>Brand</th>
    //         <th>Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {products.map((prod) => (
    //         <tr key={prod.id}>
    //           <td>{prod.productTitle}</td>
    //           <td>{prod.priceInDollar}</td>
    //           <td>{prod.category}</td>
    //           <td>{prod.stock}</td>
    //           <td>{prod.brand}</td>
    //           <td>
    //             <button onClick={() => handleDelete(type, prod.id)}>Delete</button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // );
  
  return (
  <div className="overflow-x-auto mt-4">
    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
      <thead className="bg-blue-100 text-blue-800 text-sm uppercase">
        <tr>
          <th className="px-6 py-3 text-left font-semibold">Title</th>
          <th className="px-6 py-3 text-left font-semibold">Price ($)</th>
          <th className="px-6 py-3 text-left font-semibold">Category</th>
          <th className="px-6 py-3 text-left font-semibold">Stock</th>
          <th className="px-6 py-3 text-left font-semibold">Brand</th>
          <th className="px-6 py-3 text-left font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm">
        {products.map((prod) => (
          <tr key={prod.id} className="border-t hover:bg-gray-50">
            <td className="px-6 py-4">{prod.productTitle}</td>
            <td className="px-6 py-4">${Number(prod.priceInDollar).toFixed(2)}</td>
            <td className="px-6 py-4">{prod.category}</td>
            <td className="px-6 py-4">{prod.stock}</td>
            <td className="px-6 py-4">{prod.brand}</td>
            <td className="px-6 py-4">
              <button
                onClick={() => handleDelete(type, prod.id)}
                className="text-red-600 hover:text-red-800 font-medium px-3 py-1 border border-red-600 rounded transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
  
  };

  // return (
  //   <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
  //     <h1>Admin Product Dashboard</h1>

  //     <label>
  //       Select Product Type:{' '}
  //       <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
  //         <option value="medicines">Medicines</option>
  //         <option value="vitamins">Vitamins</option>
  //         <option value="medicalequipment">Medical Equipment</option>
  //         <option value="firstaid">First Aid</option>
  //         <option value="personalcare">Personal Care</option>
  //         <option value="babycare">Baby Care</option>
  //       </select>
  //     </label>

  //     <div style={{ marginTop: '1rem', display: 'grid', gap: '0.5rem' }}>
  //       {renderFields()}
  //       <button onClick={handleAddProduct} style={{ marginTop: '1rem' }}>
  //         Add Product
  //       </button>
  //     </div>

  //     <h2 style={{ marginTop: '2rem' }}>{selectedType} Table</h2>
  //     {renderTable(selectedType)}
  //   </div>
  // );

return (
  <div className="p-8 font-sans bg-gray-50 min-h-screen">
    <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Admin Product Dashboard</h1>

    {/* Product Type Selector */}
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Product Type:
      </label>
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="medicines">Medicines</option>
        <option value="vitamins">Vitamins</option>
        <option value="medicalequipment">Medical Equipment</option>
        <option value="firstaid">First Aid</option>
        <option value="personalcare">Personal Care</option>
        <option value="babycare">Baby Care</option>
      </select>
    </div>

    {/* Product Form */}
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4 mb-10">
      <div className="grid gap-4">{renderFields()}</div>
      <button
        onClick={handleAddProduct}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Product
      </button>
    </div>

    {/* Table Title */}
    <h2 className="text-2xl font-semibold text-gray-800 mb-4 capitalize">
      {selectedType} Table
    </h2>

    {/* Table Render */}
    <div className="overflow-x-auto">{renderTable(selectedType)}</div>
  </div>
);


};

export default AdminDashboard;