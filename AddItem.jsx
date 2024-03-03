import React, { useState } from "react";
import axios from "axios";
import "./Inventorycss/add.css";

const AddItem = ({ fetchInventory, handleCloseModal }) => {
  const [formData, setFormData] = useState({
    item_name: "",
    barcode: "",
    category: "",
    bin: "",
    location: "",
    unit_cost: "",
    quantity: "",
    value: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3009/putdata", formData);
      console.log("Form submitted successfully");
      fetchInventory(); // Refresh inventory after successful submission
      handleCloseModal(); // Close the modal
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleCloseModal}>
            &times;
          </span>
          <h2>Add New Item</h2>
          <form onSubmit={handleSubmit} className="form-container">
            {/* Input fields for each form field */}
            {/* Make sure to set 'value' and 'onChange' for each input */}
            {/* Example: */}
            <div className="form-group">
              <label htmlFor="item_name">Item Name:</label>
              <input
                type="text"
                id="item_name"
                name="item_name"
                value={formData.item_name}
                onChange={handleChange}
                required
              />
            </div>
          <div className="form-group">
            <label htmlFor="barcode">Barcode:</label>
            <input
              type="text"
              id="barcode"
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bin">BIN#:</label>
            <input
              type="text"
              id="bin"
              name="bin"
              value={formData.bin}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="unit_cost">Unit Cost:</label>
            <input
              type="text"
              id="unit_cost"
              name="unit_cost"
              value={formData.unit_cost}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">QTY:</label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="value">Total Value:</label>
            <input
              type="text"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;