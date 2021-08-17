import React from 'react';
import { Container, Button, Image, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NotFound = ({
  message,
  backBtn = false,
  redirectTo = '',
  redirectBtn = '',
}) => {
  return (
    <>
      <Container>
        <Row className='justify-content-md-center mt-2 text-center'>
          <div style={{ maxWidth: '600px' }}>
            <Image src='/images/notfound.png' alt='Not Found' fluid />
          </div>
        </Row>
        <Row className='justify-content-md-center mt-2 text-center'>
          {message}
        </Row>
        <Row sm={6} className='justify-content-md-center mt-2'>
          {backBtn && (
            <Button onClick={() => window.history.back()}>Go Back</Button>
          )}
          {redirectBtn && redirectTo && (
            <LinkContainer to={redirectTo}>
              <Button>{redirectBtn}</Button>
            </LinkContainer>
          )}
        </Row>
      </Container>
    </>
  );
};

export default NotFound;
