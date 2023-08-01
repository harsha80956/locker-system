import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLockers } from "../actions/lockerActions";
import "../css/LockerPage.css";
import Header from "../common/Header";
import { makeBooking } from "../actions/bookingActions";
import { useNavigate } from "react-router-dom";

const Lockers = () => {
  const dispatch = useDispatch();
  const lockers = useSelector((state) => state.lockers);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLockers());
  }, [dispatch]);

  const handleBookingSubmit = async (locker) => {
    try {
      await dispatch(makeBooking(locker));
      navigate("/bookings");
    } catch (error) {
      console.log("eee", error);
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized request. Please log in again.");
        navigate("/login");
      } else {
        console.log(
          "An error occurred during booking submission:",
          error.message
        );
      }
    }
  };

  return (
    <div>
      <Header />
      <h2>Locker List</h2>
      <table>
        <thead>
          <tr>
            <th>Locker ID</th>
            <th>Dimensions</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lockers?.map((locker) => (
            <tr key={locker._id}>
              <td>{locker.id}</td>
              <td>{`${locker.dimensions.length} x ${locker.dimensions.width} x ${locker.dimensions.height}`}</td>
              <td>{locker.capacity}</td>
              <td>{locker.availabilityStatus}</td>
              <td>
                {locker.availabilityStatus === "available" ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBookingSubmit(locker)}
                  >
                    Book
                  </button>
                ) : (
                  <button type="button" className="btn btn-primary disabled">
                    Booked
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lockers;
