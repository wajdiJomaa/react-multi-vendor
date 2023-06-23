import React, { useState, useEffect } from 'react';
import './css/CategorySection.css';

const SellProductsPage = () => {
  const [category, setCategory] = useState(-1);

  // fetching categories from api

  const [categories, set_categories] = useState([]);
  const [isNew, setIsNew] = useState(false); 
  const [discount, setDiscount] = useState(0); 
  

  const getCategories = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/get_categories/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    let response_data = await response.json()
    if (response.status === 200) {
      set_categories(response_data)
      setCategory(response_data[0].id)
      getCategoryOptions(response_data[0].id)
    }
  }


  const [options, set_options] = useState([])

  const getCategoryOptions = async (category_id) => {
    let response = await fetch(`http://127.0.0.1:8000/api/get_category_options/${category_id}/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
    let response_data = await response.json()
    if (response.status === 200) {
      set_options(response_data)
    }
  }

  const addOption = async () => {
    const element = document.getElementById('add_option');

    let response = await fetch('http://127.0.0.1:8000/api/add_category_option/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'name': element.value, 'category': category })
      }
    )
    let response_data = await response.json()
    if (response.status === 201) {
      set_options([...options, response_data])
    }
  }


  useEffect(() => {
    getCategories()
  },[])


  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    getCategoryOptions(event.target.value);
  };

  const addProductOptions = async (options, product_id) => {
    
    options.forEach(option => {
        option["product"] = product_id
    });

    let response = await fetch('http://127.0.0.1:8000/api/add_product_categoryOptions/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
      }
    )
    let response_data = await response.json()
    if (response.status === 201) {
      
    }
  }

  const handleSaveItem = async (e) => {
    e.preventDefault()
    let op = options.map((option) => {
      let value = e.target[option.name].value
      if (value == "") return null
      else return { "category_option": option.id, "value": e.target[option.name].value }
    }).filter((option) => { return option ? true : false })

    let image = e.target.image.files[0];
    
    let formData = new FormData()
    formData.append("title", e.target.title.value)
    formData.append("description", e.target.description.value)
    formData.append("price", e.target.price.value)
    formData.append("discount", e.target.discount.value)
    formData.append("countInStock", e.target.quantity.value)
    formData.append("created_by", 1)
    formData.append("category", e.target.category.value)
    formData.append("is_new", e.target.is_new.checked)
    formData.append("image", image)


    let response = await fetch('http://127.0.0.1:8000/api/add_product/',
      {
        method: 'POST',
        body: formData
      }
    )
    let data = await response.json()
    if (response.status === 201) {
      addProductOptions(op, data["id"])
    };
  }

  return (
    <div className="sell-products-page">
      <h1>Sell Products</h1>
      <form id='add_product' onSubmit={handleSaveItem}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea name="description" />
        </div>
        <div className="form-group">
        <label htmlFor="is_new">Is New:</label>
        <input
          type="checkbox"
          id="is_new"
          name="is_new"
          checked={isNew}
          onChange={(e) => setIsNew(e.target.checked)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="discount">Discount:</label>
        <input
          type="text"
          name="discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select name="category" onChange={handleCategoryChange} value={category}>
            {categories.map((c) => {
              return <option key={c.id} value={c.id}>{c.name}</option>
            })}

          </select>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="text" name="price" />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" name="quantity" />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" accept='image/*' id="image" name="image" />
        </div>

        <div className="d-flex justify-content-between">

          <label>Category Options</label>
          <div className="d-flex">
            <input plceholder="add option" id="add_option" />
            <button type='button' className="btn btn-primary" onClick={addOption}>+</button>
          </div>
        </div>

        <table className="table">
          <tbody>
            {
              options.map((option) => {
                return (
                  <tr key={option.id}>
                    <td><label> {option.name} </label></td>
                    <td>
                      <div className="form-group">
                        <input name={option.name} type="text" placeholder="value" form="add_product" />
                      </div>
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>

        <div className="form-group">
          <button type="submit">Save Item</button>
        </div>
      </form>
    </div>
  );
};


export default SellProductsPage;

