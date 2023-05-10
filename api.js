// api.js
import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000';

export const createUser = async (userData) => {
  console.log(userData.firstName)
  const data = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    birthday: userData.birthday, // Need to test this
    height: userData.height,
    weight: userData.weight,
    photos: userData.photos,
    fightingStyle: userData.fightingStyle,
    fightingLevel: userData.fightingLevel,
    location: {
      type: "Point",
      coordinates: [userData.location.coordinates[0], userData.location.coordinates[1]]
    }
  };


  try {
    const response = await axios.post(`${API_URL}/users/register`, data);
    console.log('User created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

