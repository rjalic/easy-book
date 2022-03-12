import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  createAmenity,
  deleteAmenity,
  listAmenities,
} from '../../actions/amenityActions';
import { AMENITY_CREATE_RESET } from '../../constants/amenityConstants';
import { AmenityTable } from '../../components/tables/AmenityTable';

const AmenityListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');

  const amenityList = useSelector((state) => state.amenityList);
  const { loading, error, amenities } = amenityList;

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
  }, [dispatch, userInfo, history, successCreate, successDelete]);

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
        <AmenityTable amenities={amenities} deleteHandler={deleteHandler} />
      )}
    </>
  );
};

export default AmenityListScreen;
