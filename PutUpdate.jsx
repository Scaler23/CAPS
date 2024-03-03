import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Inventorycss/update.css";

const Update = ({ showModal, setShowModal, handleCloseModal }) => {
  const { id } = useParams();
  const [inventory, setInventory] = useState({
    barcode: "",
    category: "",
    bin: "",
    location: "",
    unit_cost: "",
    quantity: "",
    item_name: "",
    value: "",
  });

  useEffect(() => {
    // Fetch inventory data based on the ID
    axios
      .get(`http://localhost:3009/inventorydetails/${id}`)
      .then((res) => {
        setInventory(res.data[0]); // Populate the state with fetched data
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setInventory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3009/inventory/${id}`, inventory);
      handleCloseModal(); // Close the modal after updating
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={showModal ? "modal display-block" : "modal display-none"}>
      <section className="modal-main">
        <h1>Edit Form</h1>
        <form>
          {/* Input fields for inventory properties */}
          <div className="mb-3 mt-3">
            <label className="form-label">Item Name:</label>
            <input
              type="text"
              className="form-control"
              name="item_name"
              value={inventory.item_name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">Barcode:</label>
            <input
              type="text"
              className="form-control"
              name="barcode"
              value={inventory.barcode}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">Category:</label>
            <input
              type="text"
              className="form-control"
              name="category"
              value={inventory.category}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">BIN#:</label>
            <input
              type="text"
              className="form-control"
              name="bin"
              value={inventory.bin}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">Location:</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={inventory.location}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">Unit Cost:</label>
            <input
              type="text"
              className="form-control"
              name="unit_cost"
              value={inventory.unit_cost}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">Quantity:</label>
            <input
              type="text"
              className="form-control"
              name="quantity"
              value={inventory.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="form-label">Total Value:</label>
            <input
              type="text"
              className="form-control"
              name="value"
              value={inventory.value}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-primary update"
              onClick={handleClick}
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-secondary cancel"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Update;