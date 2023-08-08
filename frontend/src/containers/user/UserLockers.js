import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLockers } from "../../actions/lockerActions";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

const UserLockers = () => {
  const dispatch = useDispatch();
  const lockers = useSelector((state) => state.locker.lockers);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getLockers());
  }, [dispatch]);

  const handleBookLocker = (lockerId) => {
    // Implement your booking logic here
    console.log("Booking locker:", lockerId);
    navigate(`user/lockers/${lockerId}`);
  };
  return (
    <Container>
      <h2>User Lockers</h2>
      <Row>
        {lockers.map((locker) => (
          <Col key={locker._id} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Locker {locker.lockerId}</Card.Title>
                <Card.Text>Dimension: {locker.dimension}</Card.Text>
                <Card.Text>Capacity: {locker.capacity}</Card.Text>
                <Card.Text>Status: {locker.status}</Card.Text>
                <Button
                  className="col-12"
                  onClick={() => handleBookLocker(locker.lockerId)}
                  variant="primary"
                >
                  Book
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserLockers;
