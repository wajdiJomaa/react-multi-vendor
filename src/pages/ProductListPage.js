import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/ProductListPage.css';


const ProductDisplay = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/get_vendor_products/1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    let response_data = await response.json();
    if (response.status === 200) {
      setProducts(response_data);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="product-display">
      <h1>Your Products:</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.image} alt={product.title} className="product-image" />
            </div>
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">Price: ${product.price}</p>
              <Link to={`/product-details/${product.id}`}>See Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
