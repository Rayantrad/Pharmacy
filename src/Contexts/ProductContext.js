import React, { createContext, useContext, useState } from 'react';
import { ProductsList } from '../Data/ProductsList'; 

const ProductContext = createContext();

// ✅ Organize initial products by type
const initialProductsByType = ProductsList.data.reduce((acc, product) => {
  const type = product.type;
  if (!acc[type]) acc[type] = [];
  acc[type].push(product);
  return acc;
}, {});

export const ProductProvider = ({ children }) => {
  const [productsByType, setProductsByType] = useState(initialProductsByType);
  const [globalProductList, setGlobalProductList] = useState(ProductsList.data);

  const addProduct = (type, product) => {
    const updatedTypeList = [...(productsByType[type] || []), product];
    const updatedProducts = { ...productsByType, [type]: updatedTypeList };
    setProductsByType(updatedProducts);
    setGlobalProductList(Object.values(updatedProducts).flat());
  };

  const deleteProduct = (type, id) => {
    const updatedTypeList = productsByType[type].filter((p) => p.id !== id);
    const updatedProducts = { ...productsByType, [type]: updatedTypeList };
    setProductsByType(updatedProducts);
    setGlobalProductList(Object.values(updatedProducts).flat());
  };

  return (
    <ProductContext.Provider
      value={{
        productsByType,
        globalProductList,
        addProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);