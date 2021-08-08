import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Col, Row } from 'react-bootstrap';
import Rating from '../components/Rating';

const Accomodation = ({ accomodation }) => {
  // https://react-bootstrap.netlify.app/components/list-group/#horizontal
  return (
    <Row>
      <li className='list-group-item d-flex p-3'>
        <Col sm={4}>
          <Link to={`/accomodations/${accomodation._id}`} target='_blank'>
            <Image src={accomodation.image} fluid />
          </Link>
        </Col>
        <Col sm={8} className='px-3'>
          <Row>
            <Col>
              <Link to={`/accomodations/${accomodation._id}`} target='_blank'>
                <strong className='fs-4'>{accomodation.name}</strong>
              </Link>
            </Col>
            <Col className='m-auto text-end'>
              <Rating
                value={accomodation.rating}
                text={`${accomodation.numReviews} reviews`}
              />
            </Col>
          </Row>
          <Row>
            <h5>info ph</h5>
          </Row>
        </Col>
      </li>
    </Row>
  );
};

export default Accomodation;
