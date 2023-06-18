import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

    const getProductDetails = async (productId) => {
      try {
        let response = await fetch('http://127.0.0.1:8000/api/get_product_details/${productId}', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
      const data = await response.json();
      if (response.status === 200) {
        setProduct(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading product details...</div>;
  }
  console.log(product)

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
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
