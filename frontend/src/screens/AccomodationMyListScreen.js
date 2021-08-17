import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  createAccomodation,
  deleteAccomodation,
  listMyAccomodations,
} from '../actions/accomodationActions';
import {
  ACCOMODATION_CREATE_RESET,
  ACCOMODATION_DELETE_RESET,
  ACCOMODATION_DETAILS_RESET,
} from '../constants/accomodationConstants';
import NotFound from '../components/NotFound';

const AccomodationMyListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const accomodationList = useSelector((state) => state.accomodationMyList);
  const { loading, error, accomodations, page, pages } = accomodationList;

  const accomodationDelete = useSelector((state) => state.accomodationDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = accomodationDelete;

  const accomodationCreate = useSelector((state) => state.accomodationCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    accomodation: createdAccmodation,
  } = accomodationCreate;

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const pageNumber = query.get('page') ? query.get('page') : 1;

  useEffect(() => {
    dispatch({ type: ACCOMODATION_CREATE_RESET });
    dispatch({ type: ACCOMODATION_DETAILS_RESET });
    dispatch({ type: ACCOMODATION_DELETE_RESET });

    if (!userInfo) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/accomodation/${createdAccmodation._id}/edit`);
    } else {
      dispatch(listMyAccomodations('', pageNumber));
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
      dispatch(deleteAccomodation(id));
    }
  };

  const createAccomodationHandler = () => {
    dispatch(createAccomodation());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Accomodations</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createAccomodationHandler}>
            <i className='fas fa-plus'></i> Create Accomodation
          </Button>
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
      ) : accomodations ? (
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
              {accomodations.map((accomodation) => (
                <tr key={accomodation._id}>
                  <td>{accomodation._id}</td>
                  <td>{accomodation.name}</td>
                  <td>${accomodation.price}</td>
                  <td>{accomodation.capacity}</td>
                  <td>{accomodation.rating}</td>
                  <td>
                    <LinkContainer
                      to={`/accomodation/${accomodation._id}/edit`}
                    >
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(accomodation._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className='d-flex justify-content-center'>
            <Paginate pages={pages} page={page} path={'/myAccomodations'} />
          </div>
        </>
      )}
    </>
  );
};

export default AccomodationMyListScreen;
