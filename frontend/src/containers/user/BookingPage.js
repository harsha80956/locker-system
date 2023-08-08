// src/containers/user/BookingPage.js

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBooking } from "../../actions/bookingActions";

const BookingPage = () => {
  const dispatch = useDispatch();

  const [bookingData, setBookingData] = useState({
    lockerId: "", // set this to the selected locker's ID
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBooking(bookingData));
    // Redirect to payment page after successful booking
  };

  return (
    <div>
      <h1>Book Locker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="startDate"
          value={bookingData.startDate}
          onChange={handleChange}
          placeholder="Start Date"
        />
        <input
          type="date"
          name="endDate"
          value={bookingData.endDate}
          onChange={handleChange}
          placeholder="End Date"
        />
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookingPage;
