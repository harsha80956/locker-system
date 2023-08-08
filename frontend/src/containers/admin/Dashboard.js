import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAdminDashboard } from "../../actions/dashboadActions";
import { useDispatch } from "react-redux";
import Headers from "../../components/common/Headers";

const AdminDashboard = () => {
  const { totalLockers, availableLockers, activeBookings, totalBookings } =
    useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminDashboard());
  }, []);

  return (
    <div>
      <Headers />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Lockers</h5>
                <p className="card-text">{totalLockers}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Available Lockers</h5>
                <p className="card-text">{availableLockers}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Active Bookings</h5>
                <p className="card-text">{activeBookings}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Bookings</h5>
                <p className="card-text">{totalBookings}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Link to="/admin/create-locker" className="btn btn-primary">
            Create Lockers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
