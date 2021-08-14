import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/home?keyword=${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Label>Search by name</Form.Label>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search accomodations...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <div className='d-grid gap-2 mt-2'>
        <Button type='submit' variant='primary' className='p-2'>
          Filter
        </Button>
      </div>
    </Form>
  );
};

export default SearchBar;
