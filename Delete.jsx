import React from 'react';
import "./Inventorycss/delete.css"

const Delete = ({ item, handleDelete, handleCloseModal }) => {
  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <h2>Delete Confirmation</h2>
        <p>Are you sure you want to delete {item.item_name}?</p>
        <div className="delete-modal-buttons">
          <button onClick={() => handleDelete(item.id)}>Delete</button>
          <button onClick={handleCloseModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Delete