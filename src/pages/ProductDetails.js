import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/ProductDetails.css'

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
        console.log(data);
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <img src={product.image} alt={product.title} className="card-img-top" />
            <div className="card-body">
              <h2 className="card-title text-primary">{product.title}</h2>
              <p className="card-text"><strong>Price:</strong> ${product.price}</p>
              <p className="card-text"><strong>Description:</strong> {product.description}</p>
              <span className="mr-2 text-success">
                <strong className="text-success">In Stock:</strong> {product.countInStock}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
