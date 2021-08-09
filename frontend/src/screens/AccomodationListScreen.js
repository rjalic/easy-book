import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  createAccomodation,
  deleteAccomodation,
  listAccomodations,
} from '../actions/accomodationActions';
import { ACCOMODATION_CREATE_RESET } from '../constants/accomodationConstants';

const AccomodationListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const accomodationList = useSelector((state) => state.accomodationList);
  const { loading, error, accomodations } = accomodationList;

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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: ACCOMODATION_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/accomodations/${createdAccmodation._id}/edit`);
    } else {
      dispatch(listAccomodations());
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdAccmodation,
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
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CAPACITY</th>
              <th>HOST</th>
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
                <td>{accomodation.host.name}</td>
                <td>{accomodation.rating}</td>
                <td>
                  <LinkContainer
                    to={`/admin/accomodation/${accomodation._id}/edit`}
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
      )}
    </>
  );
};

export default AccomodationListScreen;