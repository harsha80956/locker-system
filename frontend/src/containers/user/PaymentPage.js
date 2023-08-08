import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addBooking } from "../../actions/bookingActions";
import Modal from "react-modal";
import QRCode from "react-qr-code";
import Headers from "../../components/common/Headers";

const PaymentPage = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const lockers = useSelector((state) => state.locker.lockers);
  const selectedLocker = lockers.find((obj) => obj.lockerId === id);
  // Dummy function to handle PayPal payment (sandbox)
  const handlePayPalPayment = () => {
    // Simulate a successful PayPal payment
    // You can add actual payment integration code here
    alert("Payment successful!");
    // After successful payment, book the locker
    // After successful payment, send the booking data to the backend
    const bookingData = {
      lockerId: id,
      bookingDate: new Date(bookingDate),
      startTime: null,
      endTime: null,
      // Add any additional data needed for booking
    };
    dispatch(addBooking(bookingData));
    setShowQRCode(true);
  };

  // Function to handle the QR code modal close
  const handleCloseQRCode = () => {
    setShowQRCode(false);
    // Redirect to the user lockers page
    history("/user/lockers");
  };

  return (
    <div className="payment-page">
      <Headers />
      <h2>Payment Page</h2>
      <div>
        <label>Booking Date:</label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <p>Selected Locker: {selectedLocker.lockerId}</p>

      <div className="payment-options">
        <div className="payment-option">
          <h4>Pay with PayPal</h4>
          <button className="paypal-button" onClick={handlePayPalPayment}>
            <img
              src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/checkout-logo-large.png"
              alt="PayPal"
            />
          </button>
        </div>
      </div>
      <Modal
        isOpen={showQRCode}
        onRequestClose={handleCloseQRCode}
        contentLabel="QR Code Modal"
      >
        <h2>Scan QR Code to Complete Payment</h2>
        <QRCode value="Your QR code data here" size={512} />
        <button className="btn btn-primary ml-5" onClick={handleCloseQRCode}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default PaymentPage;
