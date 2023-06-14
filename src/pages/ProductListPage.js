import React from 'react';
import './css/ProductListPage.css'

const ProductListPage = ({ products }) => {
  return (
    <div className="product-list-page">
      <h2>Product List</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index} className="product-item">
            <h3>Category: {product.category}</h3>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
