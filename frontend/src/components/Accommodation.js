import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Col, Row } from 'react-bootstrap';
import Rating from '../components/Rating';

const Accommodation = ({ accommodation }) => {
  return (
    <li className='list-group-item d-flex p-3'>
      <Row>
        <Col sm={4}>
          <Link to={`/accommodations/${accommodation._id}`} target='_blank'>
            <Image
              src={accommodation.image}
              fluid
              onError={(e) => {
                e.target.onError = null;
                e.target.src = '/images/placeholder.png';
              }}
            />
          </Link>
        </Col>
        <Col sm={8} className='px-3'>
          <Row className='mt-2'>
            <Col>
              <Link to={`/accommodations/${accommodation._id}`} target='_blank'>
                <strong className='fs-4'>{accommodation.name}</strong>
              </Link>
            </Col>
            <Col className='m-auto text-end'>
              <Rating
                value={accommodation.rating}
                text={`${accommodation.numReviews} reviews`}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <i className='fas fa-map-marker-alt'></i>{' '}
              {accommodation.location.city}, {accommodation.location.country}
            </Col>
            <Col className='m-auto text-end'>
              <strong className='fs-6'>${accommodation.price}</strong> / night
            </Col>
          </Row>
          <Row className='mt-2'>
            <Col></Col>
            <Col className='m-auto text-end'>
              <Link
                to={`/accommodations/${accommodation._id}`}
                target='_blank'
                className='btn btn-primary'
              >
                See Details <i className='fas fa-angle-right'></i>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </li>
  );
};

export default Accommodation;
