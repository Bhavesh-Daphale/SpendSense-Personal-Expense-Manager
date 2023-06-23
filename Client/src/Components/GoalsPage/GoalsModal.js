import React, { useState } from "react";
import axios from "axios";

const GoalsModal = ({userId, fetchGoals}) => {
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState(null);

  const handleSetGoals = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/goals", {
        goalName,
        goalAmount,
        userId,
      });
      if (response.data.success) {
        setGoalName("");
        setGoalAmount("");
        fetchGoals();

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
      id="goals-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="goals-modal-label"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="expense-modal-label">
              Set New Goals
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
            <form id="-form-fields" onSubmit={handleSetGoals}>
              <div class="form-group my-2">
                <label for="goal-name">Goal Name</label>
                <input
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  class="form-control"
                  id="goal-name"
                  required
                />
              </div>
              <div class="form-group my-2">
                <label for="goal-amount">Goal Amount</label>
                <input
                  type="number"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(e.target.value)}
                  class="form-control"
                  id="goal-amount"
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

export default GoalsModal;
