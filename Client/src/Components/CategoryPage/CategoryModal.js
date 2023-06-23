import React, { useState } from "react";
import axios from "axios";

const CategoryModal = ({userId, fetchCategories}) => {
  const [categoryName, setCategoryName] = useState("");
  const [budget, setBudget] = useState(null);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    console.log(categoryName);
    console.log(budget);
    try {
      const response = await axios.post("http://localhost:3001/category", {
        categoryName,
        budget,
        userId,
      });
      if (response.data.success) {
        setCategoryName("");
        setBudget("");
        fetchCategories();

      } else {
        alert(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
        alert(error);
      console.log(error);
    }
  };
  return (
    <div
      class="modal fade"
      id="category-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="category-modal-label"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="expense-modal-label">
              Add Category
            </h5>
            <button
              type="button"
              class="close btn border"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="-form-fields" onSubmit={handleAddCategory}>
              <div class="form-group my-2">
                <label for="category-name">Category Name</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  class="form-control"
                  id="category-name"
                  required
                />
              </div>
              <div class="form-group my-2">
                <label for="budget">Budget</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  class="form-control"
                  id="budget"
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
