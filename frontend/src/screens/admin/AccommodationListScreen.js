import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  deleteAccommodation,
  listAccommodations,
} from '../../actions/accommodationActions';
import {
  ACCOMMODATION_CREATE_RESET,
  ACCOMMODATION_DELETE_RESET,
  ACCOMMODATION_DETAILS_RESET,
} from '../../constants/accommodationConstants';
import { AccommodationTable } from '../../components/tables/AccommodationTable';

const AccommodationListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const accommodationList = useSelector((state) => state.accommodationList);
  const { loading, error, accommodations } = accommodationList;

  const accommodationDelete = useSelector((state) => state.accommodationDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = accommodationDelete;

  const accommodationCreate = useSelector((state) => state.accommodationCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    accommodation: createdAccommodation,
  } = accommodationCreate;

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const pageNumber = query.get('page') ? query.get('page') : 1;

  useEffect(() => {
    dispatch({ type: ACCOMMODATION_CREATE_RESET });
    dispatch({ type: ACCOMMODATION_DETAILS_RESET });
    dispatch({ type: ACCOMMODATION_DELETE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/accommodations/${createdAccommodation._id}/edit`);
    } else {
      dispatch(listAccommodations('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdAccommodation,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteAccommodation(id));
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Accommodations</h1>
        </Col>
        <Col className='text-end'>
          <LinkContainer to='/createAccommodation' className='my-3 mx-1'>
            <Button>
              <i className='fas fa-plus' /> Create Accommodation
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <AccommodationTable
          accommodations={accommodations}
          deleteHandler={deleteHandler}
        />
      )}
    </>
  );
};

export default AccommodationListScreen;
