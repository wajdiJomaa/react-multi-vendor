import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './css/dashboard.css';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [reviewsChartData, setReviewsChartData] = useState(null);
  const paginationConfig = {
    pageSize: 4,
  };

  useEffect(() => {
    fetchOrders();
    fetchReviews();
    fetchProducts();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/get_vendor_products/1');
      setOrders(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/get_vendor_products/1');
      setReviews(response.data);
  
      const nonEmptyReviews = response.data.filter((review) => review.comment !== "");
      const totalReviews = nonEmptyReviews.length;
      const positiveReviews = nonEmptyReviews.filter((review) => review.rating >= 4).length;
      const negativeReviews = nonEmptyReviews.filter((review) => review.rating < 4).length;
      setReviewsChartData([
        { label: 'Positive', value: positiveReviews },
        { label: 'Negative', value: negativeReviews },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/get_vendor_products/1');
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete_product/${productId}`);
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error(error);
      message.error('Failed to delete product');
    }
  };

  const handleUpdateProduct = async (values) => {
    try {
      const productId = values.id; // Extract the product ID from the form values
      delete values.id; // Remove the 'id' field from the form values
  
      await axios.put(`http://127.0.0.1:8000/api/update_product/${productId}/`, values);
      message.success('Product updated successfully');
      fetchProducts();
      setVisible(false);
    } catch (error) {
      console.error(error);
      message.error('Failed to update product');
    }
  };

  const handleEditProduct = (product) => {
    form.setFieldsValue(product);
    setVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  const columns = [
    { title: 'Product Name', dataIndex: 'title', key: 'title' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Product" className="product-image1" />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, product) => (
        <>
          <Button type="primary" onClick={() => handleEditProduct(product)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDeleteProduct(product.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];
  
  

  const renderCircularDiagram = () => {
    if (reviewsChartData) {
      const nonEmptyReviews = reviews.filter((review) => review.rating !== "" && review.rating >= 0);
      const totalReviews = nonEmptyReviews.length;
      const goodReviews = nonEmptyReviews.filter((review) => review.rating > 3).length;
      const badReviews = totalReviews - goodReviews;
      const goodReviewsPercentage = (goodReviews / totalReviews) * 100 || 0;
      const badReviewsPercentage = (badReviews / totalReviews) * 100 || 0; 
  
      return (
        <div className="circular-diagram-container-small">
          <div className="circular-diagram-part">
            <CircularProgressbar
              value={goodReviewsPercentage}
              text={`${goodReviewsPercentage.toFixed(1)}%`}
              strokeWidth={6}
              styles={buildStyles({
                pathColor: '#3e98c7',
                textColor: '#3e98c7',
                trailColor: '#f5f5f5',
                strokeLinecap: 'round',
                textSize: '12px',
                pathTransitionDuration: 0.5,
              })}
            />
            <div className="circular-diagram-legend">Good</div>
          </div>
          <div className="circular-diagram-part">
            <CircularProgressbar
              value={badReviewsPercentage}
              text={`${badReviewsPercentage.toFixed(1)}%`}
              strokeWidth={6}
              styles={buildStyles({
                pathColor: '#ff4d4f',
                textColor: '#ff4d4f',
                trailColor: '#f5f5f5',
                strokeLinecap: 'round',
                textSize: '12px',
                pathTransitionDuration: 0.5,
              })}
            />
            <div className="circular-diagram-legend">Bad</div>
          </div>
        </div>
      );
    }
  
    return null;
  };
  

  return (
    <div>
      <div className="dashboard-container">
        <h2 className="dashboard-section-header">Orders</h2>
        {isLoading ? (
          <p>Loading orders...</p>
        ) : (
          <Table dataSource={orders} pagination={paginationConfig}>
            <Table.Column title="Order ID" dataIndex="id" key="id" />
            <Table.Column title="Customer Name" dataIndex="customer" key="customer" />
            <Table.Column title="Total Price" dataIndex="totalPrice" key="totalPrice" />
          </Table>
        )}

        <h2>Reviews</h2>
        {isLoading ? (
          <p>Loading reviews...</p>
        ) : (
          <>
            {renderCircularDiagram()}
            <Table dataSource={reviews} pagination={paginationConfig}>
              <Table.Column title="Review ID" dataIndex="id" key="id" />
              <Table.Column title="Customer Name" dataIndex="customer" key="customer" />
              <Table.Column title="Rating" dataIndex="rating" key="rating" />
              <Table.Column title="Comment" dataIndex="comment" key="comment" />
            </Table>
          </>
        )}

        <h2>Products</h2>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <Table dataSource={products} columns={columns} pagination={paginationConfig} />
        )}

          <Modal visible={visible} title="Edit Product" onCancel={handleCancel} footer={null}>
          <Form form={form} onFinish={handleUpdateProduct}>
            <Form.Item name="id" hidden />
            <Form.Item
              name="title"
              label="Product Name"
              rules={[{ required: true, message: 'Please enter the product name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: 'Please enter the price' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}
            >
      <Input.TextArea />
    </Form.Item>

            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;