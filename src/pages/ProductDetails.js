import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/ProductListPage.css';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

    const getProductDetails = async () => {
      try {
        let response = await fetch(`http://127.0.0.1:8000/api/get_product_details/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data)
        setProduct(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  if (!product) {
    return <div>Loading product details...</div>;
  }

  return (
    <div className="product-details">
      <div className="product-image-container">
        <img src={product.image} alt={product.title}  className="product-image" />
      </div>
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">Price: ${product.price}</p>
        <p className="product-description">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
