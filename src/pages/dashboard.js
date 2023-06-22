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
      const totalReviews = response.data.length;
      const positiveReviews = response.data.filter((review) => review.rating >= 4).length;
      const negativeReviews = response.data.filter((review) => review.rating < 4).length;
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
      await axios.delete(`/api/products/${productId}`);
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      console.error(error);
      message.error('Failed to delete product');
    }
  };

  const handleUpdateProduct = async (values) => {
    try {
      await axios.put(`/api/products/${values.id}`, values);
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

  return (
    <div>
      <div className="dashboard-container">
        <h2 className="dashboard-section-header">Orders</h2>
        {isLoading ? (
          <p>Loading orders...</p>
        ) : (
          <Table dataSource={orders}>
            <Table.Column title="Order ID" dataIndex="id" key="id" />
            <Table.Column title="Customer Name" dataIndex="customerName" key="customerName" />
            <Table.Column title="Total Price" dataIndex="totalPrice" key="totalPrice" />
          </Table>
        )}

        <h2>Reviews</h2>
        {isLoading ? (
          <p>Loading reviews...</p>
        ) : (
          <>
            {reviewsChartData && (
              <div className="circular-diagram-container-small">
                <CircularProgressbar
                  value={(reviewsChartData[0].value / reviews.length) * 100}
                  text={`${reviewsChartData[0].value}/${reviews.length}`}
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
              </div>
            )}
            <Table dataSource={reviews}>
              <Table.Column title="Review ID" dataIndex="id" key="id" />
              <Table.Column title="Customer Name" dataIndex="customerName" key="customerName" />
              <Table.Column title="Rating" dataIndex="rating" key="rating" />
              <Table.Column title="Comment" dataIndex="comment" key="comment" />
            </Table>
          </>
        )}

        <h2>Products</h2>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <Table dataSource={products} columns={columns} />
        )}

        <Modal visible={visible} title="Edit Product" onCancel={handleCancel} footer={null}>
          <Form form={form} onFinish={handleUpdateProduct}>
            <Form.Item name="id" hidden />
            <Form.Item
              name="name"
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