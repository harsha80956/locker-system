import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookings } from "../actions/bookingActions";
import Header from "../common/Header";
import "../css/Booking.css";

const Bookings = () => {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  console.log(bookings);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    // Fetch the booking list when the component mounts
    dispatch(fetchBookings());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <span>
        <Header />
      </span>
      <h2>Bookings</h2>
      {bookings?.length === 0 ? (
        <div>No bookings found.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Date</th>
              <th>QR code</th>
              {/* <th>Time Slot</th>
              <th>Locker ID</th> */}
              {/* Add other relevant columns */}
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings?.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>
                    {new Date(booking.bookingTime).toLocaleDateString("en-GB")}
                  </td>
                  <td>
                    <img src={booking.qrCode} alt="QR Code" />
                  </td>
                  {/* <td>{booking.bookingTime}</td>
                  <td>{booking.lockerId}</td> */}
                  {/* Add other relevant columns */}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;
