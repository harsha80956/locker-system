import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addLocker } from "../../actions/lockerActions";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Headers from "../../components/common/Headers";

const CreateLocker = () => {
  const dispatch = useDispatch();
  const [lockerId, setLockerId] = useState("");
  const [dimension, setDimension] = useState("");
  const [capacity, setCapacity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newLocker = {
      lockerId,
      dimension,
      capacity: Number(capacity),
    };

    // Dispatch the createLocker action
    try {
      const data = await dispatch(addLocker(newLocker));
      navigate("/admin/dashboard");
    } catch (err) {}
  };

  return (
    <div>
      <Headers />
      <div className="container mt-4">
        <h2>Create Locker</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="lockerId">Locker ID</label>
            <input
              type="text"
              className="form-control"
              id="lockerId"
              value={lockerId}
              onChange={(e) => setLockerId(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dimension">Dimension</label>
            <input
              type="text"
              className="form-control"
              id="dimension"
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              className="form-control"
              id="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
          <Link to="/admin/dashboard" className="btn btn-primary ml-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateLocker;
