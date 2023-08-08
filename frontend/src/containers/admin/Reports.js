import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReports } from "../../actions/reportActions";

const Reports = () => {
  const dispatch = useDispatch();
  const reportsData = useSelector((state) => state.report.reportsData);

  useEffect(() => {
    // Fetch reports data when the component mounts
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Reports</h2>
      {reportsData && (
        <div>
          <h4>Total Lockers: {reportsData.totalLockers}</h4>
          <h4>Bookings Today: {reportsData.bookingsToday}</h4>
          {/* Add more reports as needed */}
        </div>
      )}
    </div>
  );
};

export default Reports;
