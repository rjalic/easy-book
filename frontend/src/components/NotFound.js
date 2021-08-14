import React from 'react';
import { Container, Button, Image, Row } from 'react-bootstrap';

const NotFound = ({ history }) => {
  return (
    <>
      <Container>
        <Row>
          <Image src='/images/notfound.png' alt='Not Found' fluid />
        </Row>
        <Row className='justify-content-md-center mt-2 text-center'>
          We couldn't find what you were looking for...
        </Row>
        <Row sm={6} className='justify-content-md-center mt-2'>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </Row>
      </Container>
    </>
  );
};

export default NotFound;
