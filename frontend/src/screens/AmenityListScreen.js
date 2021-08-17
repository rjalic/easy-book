import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
// import Paginate from '../components/Paginate';
import {
  createAmenity,
  deleteAmenity,
  listAmenities,
} from '../actions/amenityActions';
import { AMENITY_CREATE_RESET } from '../constants/amenityConstants';

const AmenityListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');

  const amenityList = useSelector((state) => state.amenityList);
  const { loading, error, amenities } = amenityList; // page, pages

  const amenityDelete = useSelector((state) => state.amenityDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = amenityDelete;

  const amenityCreate = useSelector((state) => state.amenityCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = amenityCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // function useQuery() {
  //   return new URLSearchParams(useLocation().search);
  // }

  // const query = useQuery();
  // const pageNumber = query.get('page') ? query.get('page') : 1;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      setName('');
      setIcon('');
    }
    dispatch({ type: AMENITY_CREATE_RESET });

    dispatch(listAmenities());
  }, [
    dispatch,
    userInfo,
    history,
    successCreate,
    successDelete,
    // pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteAmenity(id));
    }
  };

  const createHandler = (e) => {
    e.preventDefault();
    dispatch(createAmenity({ name, icon }));
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col md={6}>
          <h1>Amenities</h1>
        </Col>
        <Col md={6} className='text-end'>
          <Form onSubmit={createHandler} className='row'>
            <Form.Group controlId='name' className='col'>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='icon' className='col m-auto text-end'>
              <Form.Control
                type='icon'
                placeholder='Enter icon'
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='col-3 m-auto'>
              <Button type='submit' className='col'>
                <i className='fas fa-plus'></i> Add
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      {loadingDelete && <Loader /> && !loading}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader /> && !loading}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>ICON</th>
                <th>ICON NAME</th>
                <th>NAME</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {amenities.map((amenity) => (
                <tr key={amenity._id}>
                  <td>{amenity._id}</td>
                  <td>
                    <i className={amenity.icon}></i>
                  </td>
                  <td>{amenity.icon}</td>
                  <td>{amenity.name}</td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(amenity._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <div className='d-flex justify-content-center'>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </div> */}
        </>
      )}
    </>
  );
};

export default AmenityListScreen;
