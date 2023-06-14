import React, { useState } from 'react';
import './css/CategorySection.css';

const SellProductsPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [fields, setFields] = useState([]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddField = () => {
    const newField = { name: '', value: '' };
    setFields([...fields, newField]);
  };

  const handleFieldChange = (index, fieldKey, event) => {
    const updatedFields = [...fields];
    updatedFields[index][fieldKey] = event.target.value;
    setFields(updatedFields);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleSaveItem = () => {
    // Save the item
    const newItem = {
      title,
      description,
      category,
      price,
      quantity,
      image,
      fields,
    };
    // Perform the necessary actions to save the item (e.g., API call, storing in state/Redux, etc.)
    console.log('Item saved:', newItem);
    // Reset form fields
    setTitle('');
    setDescription('');
    setCategory('');
    setPrice('');
    setQuantity('');
    setImage(null);
    setFields([]);
  };

  return (
    <div className="sell-products-page">
      <h1>Sell Products</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" value={title} onChange={handleTitleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" value={description} onChange={handleDescriptionChange} />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" value={category} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="text" id="price" value={price} onChange={handlePriceChange} />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <div className="form-group">
          <button type="button" onClick={handleAddField}>Add Field</button>
        </div>
        {fields.map((field, index) => (
          <div className="form-group" key={index}>
            <input
              type="text"
              placeholder="Field Name"
              value={field.name}
              onChange={(event) => handleFieldChange(index, 'name', event)}
            />
            <input
              type="text"
              placeholder="Field Value"
              value={field.value}
              onChange={(event) => handleFieldChange(index, 'value', event)}
            />
            <button type="button" onClick={() => handleRemoveField(index)}>Remove</button>
          </div>
        ))}
        <div className="form-group">
          <button type="button" onClick={handleSaveItem}>Save Item</button>
        </div>
        {title && (
          <div className="product-preview">
            <h2>Product Preview:</h2>
            <p><strong>Title:</strong> {title}</p>
            <p><strong>Description:</strong> {description}</p>
            <p><strong>Category:</strong> {category}</p>
            <p><strong>Price:</strong> {price}</p>
            <p><strong>Quantity:</strong> {quantity}</p>
            {fields.length > 0 && (
              <>
                <h3>Additional Fields:</h3>
                <ul>
                  {fields.map((field, index) => (
                    <li key={index}>
                      <strong>{field.name}: </strong>
                      {field.value}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {image && (
              <>
                <h3>Product Image:</h3>
                <img src={URL.createObjectURL(image)} alt="Product" />
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SellProductsPage;
