import React, { useState, useEffect } from "react";
import axios from "axios";
import AddItem from "./AddItem";
import Update from "./PutUpdate";
import Delete from "./Delete";
import "../../../public/assets/css/Inventory.css";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:3009/inventory");
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleDelete = async () => {
    const id = selectedItem.id;
    try {
      await axios.delete(`http://localhost:3009/inventory/${id}`);
      setInventory(inventory.filter((item) => item.id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleUpdate = (item) => {
    setSelectedItem(item);
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="inventory-container">
      <h1 className="inventory-heading">INVENTORY</h1>
      <div>
        <button onClick={() => setShowAddModal(true)} className="add-button">
          Add
        </button>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Barcode</th>
              <th>Category</th>
              <th>BIN#</th>
              <th>Location</th>
              <th>Unit Cost</th>
              <th>QTY</th>
              <th>Total Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id}>
                <td>{item.item_name}</td>
                <td>{item.barcode}</td>
                <td>{item.category}</td>
                <td>{item.bin}</td>
                <td>{item.location}</td>
                <td>{item.unit_cost}</td>
                <td>{item.quantity}</td>
                <td>{item.value}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowDeleteModal(true);
                    }}
                    className="delete-button"
                  >
                    Delete
                  </button>
                  <button onClick={() => handleUpdate(item)} className="update-button">
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddItem
          setShowAddModal={setShowAddModal}
          fetchInventory={fetchInventory}
          handleCloseModal={handleCloseModal}
        />
      )}

      {showUpdateModal && (
        <Update
          setShowUpdateModal={setShowUpdateModal}
          fetchInventory={fetchInventory}
          handleCloseModal={handleCloseModal}
          selectedItem={selectedItem}
        />
      )}

{showDeleteModal && selectedItem && (  // Ensure selectedItem is not null before rendering Delete modal
  <Delete
    item={selectedItem}  // Pass selectedItem as item prop
    handleDelete={handleDelete}
    handleCloseModal={handleCloseModal}
  />
)}
    </div>
  );
};

export default Inventory;