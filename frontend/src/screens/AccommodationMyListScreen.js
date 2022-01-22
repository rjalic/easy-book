import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  deleteAccommodation,
  listMyAccommodations,
} from '../actions/accommodationActions';
import {
  ACCOMMODATION_CREATE_RESET,
  ACCOMMODATION_DELETE_RESET,
  ACCOMMODATION_DETAILS_RESET,
} from '../constants/accommodationConstants';
import NotFound from '../components/NotFound';

const AccommodationMyListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const accommodationList = useSelector((state) => state.accommodationMyList);
  const { loading, error, accommodations, page, pages } = accommodationList;

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
    accommodation: createdAccmodation,
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

    if (!userInfo) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/accommodations/${createdAccmodation._id}/edit`);
    } else {
      dispatch(listMyAccommodations('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdAccmodation,
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
          <LinkContainer to='/myBookings'>
            <Button>
              <i className='fas fa-bed' /> Bookings
            </Button>
          </LinkContainer>
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
      ) : accommodations.length === 0 ? (
        <NotFound
          message={`Looks like you have no accommodations listed... Create one!`}
        />
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CAPACITY</th>
                <th>RATING</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {accommodations.map((accommodation) => (
                <tr key={accommodation._id}>
                  <td>{accommodation._id}</td>
                  <td>{accommodation.name}</td>
                  <td>${accommodation.price}</td>
                  <td>{accommodation.capacity}</td>
                  <td>{accommodation.rating}</td>
                  <td>
                    <LinkContainer
                      to={`/accommodations/${accommodation._id}/edit`}
                    >
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(accommodation._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className='d-flex justify-content-center'>
            <Paginate pages={pages} page={page} path={'/myAccommodations'} />
          </div>
        </>
      )}
    </>
  );
};

export default AccommodationMyListScreen;
