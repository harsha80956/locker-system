import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addBooking } from "../../actions/bookingActions";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const {id} = useParams()
  const selectedLocker = useSelector((state) => state.locker.selectedLocker);

  // Dummy function to handle PayPal payment (sandbox)
  const handlePayPalPayment = () => {
    // Simulate a successful PayPal payment
    // You can add actual payment integration code here
    alert("Payment successful!");
    // After successful payment, book the locker
    dispatch(addBooking(id));
    // Redirect to the user lockers page
    history("/user/lockers");
  };

  // Dummy function to handle Stripe payment (sandbox)
  const handleStripePayment = () => {
    // Simulate a successful Stripe payment
    // You can add actual payment integration code here
    alert("Payment successful!");
    // After successful payment, book the locker
    dispatch(addBooking(id));
    // Redirect to the user lockers page
    history("/user/lockers");
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Selected Locker: {selectedLocker.lockerId}</p>

      <h4>Pay with PayPal</h4>
      <button onClick={handlePayPalPayment}>Pay with PayPal</button>

      <h4>Pay with Stripe</h4>
      <button onClick={handleStripePayment}>Pay with Stripe</button>
    </div>
  );
};

export default PaymentPage;
