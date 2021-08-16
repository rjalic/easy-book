import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { DateHelper } from '../utils/dateUtils';

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [rating, setRating] = useState(0);
  const [fromDate, setFromDate] = useState(new Date(DateHelper.today()));
  const [toDate, setToDate] = useState(new Date(DateHelper.tomorrow()));

  const submitHandler = (e) => {
    e.preventDefault();
    const queryParams = [];
    if (keyword.trim()) {
      queryParams.push(`keyword=${keyword}`);
    }
    if (capacity > 1) {
      queryParams.push(`capacity=${capacity}`);
    }
    if (minPrice > 0) {
      queryParams.push(`minPrice=${minPrice}`);
    }
    if (maxPrice > 0 && maxPrice > minPrice) {
      queryParams.push(`maxPrice=${maxPrice}`);
    }
    if (city.trim()) {
      queryParams.push(`city=${city}`);
    }
    if (country.trim()) {
      queryParams.push(`country=${country}`);
    }
    if (rating > 0) {
      queryParams.push(`rating=${rating}`);
    }
    const query = queryParams.length > 0 ? queryParams.join('&') : '';
    if (query.trim()) {
      history.push(`/home?${query}`);
    } else {
      history.push('/');
    }
  };

  useEffect(() => {}, [fromDate, toDate]);

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          name='keyword'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search by name'
          className='mr-sm-2 ml-sm-5'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Capacity</Form.Label>
        <Form.Control
          type='number'
          name='capacity'
          onChange={(e) => setCapacity(e.target.value)}
          placeholder='Search by capacity'
          className='mr-sm-2 ml-sm-5'
          min='1'
        />
      </Form.Group>
      <Row>
        <Form.Group>
          <Form.Label>Price range</Form.Label>
          <Row>
            <Col sm={6}>
              <Form.Control
                type='number'
                name='minPrice'
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder='Min'
                className='mr-sm-2 ml-sm-5'
                min='0'
              />
            </Col>
            <Col sm={6}>
              <Form.Control
                type='number'
                name='maxPrice'
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder='Max'
                className='mr-sm-2 ml-sm-5'
                min='0'
              />
            </Col>
          </Row>
        </Form.Group>
      </Row>
      {/* <Form.Group>
        <Form.Label>Date Range</Form.Label>
        <Row>
          <Col>
            <DatePicker
              selected={fromDate}
              onChange={(date) =>
                setFromDate(new Date(DateHelper.normalizeDate(date)))
              }
              selectsStart
              startDate={fromDate}
              endDate={toDate}
              minDate={Date.now()}
            />
          </Col>
          <Col>
            <DatePicker
              selected={toDate}
              onChange={(date) =>
                setToDate(new Date(DateHelper.normalizeDate(date)))
              }
              selectsEnd
              startDate={fromDate}
              endDate={toDate}
              minDate={new Date(DateHelper.addDays(fromDate, 1))}
            />
          </Col>
        </Row>
      </Form.Group> */}
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          type='text'
          name='city'
          onChange={(e) => setCity(e.target.value)}
          placeholder='Search by city'
          className='mr-sm-2 ml-sm-5'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Control
          type='text'
          name='country'
          onChange={(e) => setCountry(e.target.value)}
          placeholder='Search by country'
          className='mr-sm-2 ml-sm-5'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Rating</Form.Label>
        <Form.Control
          type='number'
          name='rating'
          onChange={(e) => setRating(e.target.value)}
          placeholder='Ratings higher than'
          className='mr-sm-2 ml-sm-5'
          min='0'
        />
      </Form.Group>
      {/* <Form.Group>
        <Form.Label>Sort by price</Form.Label>
        <Form.Control
          type='text'
          name='country'
          onChange={(e) => setCountry(e.target.value)}
          placeholder='Search by country'
          className='mr-sm-2 ml-sm-5'
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Sort by rating</Form.Label>
        <Form.Control
          type='text'
          name='country'
          onChange={(e) => setCountry(e.target.value)}
          placeholder='Search by country'
          className='mr-sm-2 ml-sm-5'
        />
      </Form.Group> */}

      <div className='d-grid gap-2 mt-2'>
        <Button type='submit' variant='primary' className='p-2'>
          Filter
        </Button>
      </div>
    </Form>
  );
};

export default SearchBar;
