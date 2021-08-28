import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import {
  listAccomodationDetails,
  updateAccomodation,
} from '../actions/accomodationActions';
import {
  ACCOMODATION_UPDATE_RESET,
  ACCOMODATION_DETAILS_RESET,
} from '../constants/accomodationConstants';
import { listAmenities } from '../actions/amenityActions';

const AccomodationEditScreen = ({ match, history }) => {
  const accomodationId = match.params.id;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [locationCountry, setLocationCountry] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [amenities, setAmenities] = useState([]);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const accomodationDetails = useSelector((state) => state.accomodationDetails);
  const { loading, error, accomodation } = accomodationDetails;

  const amenityList = useSelector((state) => state.amenityList);
  const {
    loading: amenityLoading,
    error: amenityError,
    amenities: amenitiesList,
  } = amenityList;

  const accomodationUpdate = useSelector((state) => state.accomodationUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = accomodationUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push('/');
    }

    if (successUpdate) {
      dispatch({ type: ACCOMODATION_UPDATE_RESET });
      dispatch({ type: ACCOMODATION_DETAILS_RESET });
      if (userInfo.isAdmin) {
        history.push('/admin/accomodationList');
      } else {
        history.push('/myAccomodations');
      }
    } else {
      if (!accomodation.name || accomodation._id !== accomodationId) {
        dispatch({ type: ACCOMODATION_UPDATE_RESET });
        dispatch(listAccomodationDetails(accomodationId));
        dispatch(listAmenities());
      } else {
        setName(accomodation.name);
        setImage(accomodation.image);
        setPrice(accomodation.price);
        setDescription(accomodation.description);
        setLocationCity(accomodation.location.city);
        setLocationCountry(accomodation.location.country);
        setCapacity(accomodation.capacity);
        setAmenities(accomodation.amenities);
      }
    }
  }, [
    dispatch,
    accomodationId,
    accomodation,
    history,
    successUpdate,
    amenities,
    userInfo,
  ]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      console.log(file);
      console.log(formData);

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAccomodation({
        _id: accomodationId,
        name,
        image,
        price,
        description,
        location: { city: locationCity, country: locationCountry },
        capacity,
        amenities,
      })
    );
  };

  return (
    <>
      <Link
        to={userInfo.isAdmin ? '/admin/accomodationList' : '/myAccomodations'}
        className='btn btn-light my-3'
      >
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Accommodation</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading || amenityLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
                className='image-file-upload'
              />
              {uploading && <Loader />}
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='locationcity'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter City'
                value={locationCity}
                onChange={(e) => setLocationCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='locationcountry'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Country'
                value={locationCountry}
                onChange={(e) => setLocationCountry(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId='capacity'>
              <Form.Label>Capacity</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Capacity'
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='row'>
              <Form.Label>Amenities</Form.Label>
              {amenityError ? (
                <Message variant='danger'>{amenityError}</Message>
              ) : (
                <>
                  {amenitiesList.map((amenityItem) => (
                    <Form.Check
                      label={amenityItem.name}
                      id={amenityItem.name}
                      key={amenityItem._id}
                      className='col-4'
                      defaultChecked={
                        accomodation.amenities &&
                        accomodation.amenities.includes(amenityItem._id)
                      }
                      onChange={(e) => {
                        let temp = amenities;
                        if (temp.includes(amenityItem._id)) {
                          temp = temp.splice(temp.indexOf(amenityItem._id), 1);
                        } else {
                          temp.push(amenityItem._id);
                        }
                        setAmenities(temp);
                        console.log(amenities);
                      }}
                    />
                  ))}
                </>
              )}
            </Form.Group>
            <Button type='submit' variant='primary' className='my-2'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AccomodationEditScreen;
