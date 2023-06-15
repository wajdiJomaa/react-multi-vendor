import React from 'react';
import './css/ProductListPage.css';
import LetterAvatars from './profile';

const ProductDisplay = () => {
  const products = [
    {
      id: 1,
      title: 'Product 1',
      price: 10,
      image: '/images/Asus.png',
      attributes: [
        { name: 'Color', value: 'Red' },
        { name: 'Size', value: 'Small' },
      ],
    },
    {
      id: 2,
      title: 'Product 2',
      price: 15,
      image: '/images/Asus.png',
      attributes: [
        { name: 'Color', value: 'Blue' },
        { name: 'Size', value: 'Medium' },
      ],
    },
    // Add more products as needed
  ];

  return (
    <div className="product-display">
      <h1>Product Display</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={process.env.PUBLIC_URL + product.image} alt={product.title} className="product-image" />
            </div>
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-price">Price: ${product.price}</p>
              <ul className="attribute-list">
                {product.attributes.map((attribute, index) => (
                  <li key={index} className="attribute-item">
                    <span className="attribute-name">{attribute.name}:</span> {attribute.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
