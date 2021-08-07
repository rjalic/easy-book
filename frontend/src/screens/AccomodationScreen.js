import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listAccomodationDetails } from '../actions/accomodationActions';

const AccomodationScreen = ({ match }) => {
  const dispatch = useDispatch();

  const accomodationDetails = useSelector((state) => state.accomodationDetails);
  const { loading, error, accomodation } = accomodationDetails;

  useEffect(() => {
    dispatch(listAccomodationDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link className='btn btn-primary my-3' to='/'>
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={accomodation.image} alt={accomodation.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{accomodation.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={accomodation.rating}
                  text={`${accomodation.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${accomodation.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {accomodation.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${accomodation.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {accomodation.countInStock > 0
                        ? 'In Stock'
                        : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid gap-2'>
                    <Button
                      variant='primary'
                      disabled={accomodation.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default AccomodationScreen;
