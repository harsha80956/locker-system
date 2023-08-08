import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLockers, deleteLocker } from "../../actions/lockerActions";

const ManageLockers = () => {
  const dispatch = useDispatch();
  const lockers = useSelector((state) => state.locker.lockers);

  useEffect(() => {
    // Fetch lockers when the component mounts
    dispatch(getLockers());
  }, [dispatch]);

  const onDeleteLocker = (lockerId) => {
    // Delete the locker when the delete button is clicked
    if (window.confirm("Are you sure you want to delete this locker?")) {
      dispatch(deleteLocker(lockerId));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Lockers</h2>
      {lockers && lockers.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Locker ID</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lockers.map((locker) => (
              <tr key={locker._id}>
                <td>{locker._id}</td>
                <td>{locker.capacity}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDeleteLocker(locker._id)}
                  >
                    Delete
                  </button>
                  {/* Add other actions (e.g., edit) as needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No lockers found.</p>
      )}
    </div>
  );
};

export default ManageLockers;
