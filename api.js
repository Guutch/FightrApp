// api.js
import axios from 'axios';
import { userLoggedIn } from 'redux/actions'; // import the action

const API_URL = 'http://10.0.2.2:3000';

export const createUser = async (userData) => {

  // Create a new FormData instance
  let data = new FormData();

  data.append('firstName', userData.firstName);
  data.append('lastName', userData.lastName);
  data.append('email', userData.email);
  data.append('phoneNumber', userData.phoneNumber);
  data.append('birthday', userData.birthday);
  data.append('height', userData.height);
  data.append('weight', userData.weight);
  data.append('heightUnit', userData.heightUnit);
  data.append('weightUnit', userData.weightUnit);
  data.append('fightingStyle', userData.fightingStyle);
  data.append('fightingLevel', userData.fightingLevel);
  data.append('password', userData.password);

  // Append location data
  data.append('location[type]', userData.location.type);
  data.append('location[coordinates]', JSON.stringify(userData.location.coordinates));

  // Append photos
  for (const [index, photo] of userData.photos.entries()) {
    if (photo) {
      if (Platform.OS === 'android' && photo.data) {
        // if on Android and photo data is available, append as a blob
        const photoBlob = {
          uri: `data:image/jpeg;base64,${photo.data}`,
          type: 'image/jpeg',
          name: photo.name || `photo_${index}.jpg`,
        };
        data.append('photos', photoBlob);
      } else {
        // if on iOS or photo data is not available, append as a file
        data.append('photos', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: photo.name || `photo_${index}.jpg`,
        });
      }
    }
  }

  try {
    const response = await axios.post(`${API_URL}/users/register`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('User created successfully:', response.data);

    // dispatch(userLoggedIn(response.data.user)); // dispatch the action here

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

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('[api.js] Error logging in:', error);
  }
};

export const fetchUserPreferences = async (userId) => {
  try {
    const [preferenceResponse, metricsResponse] = await Promise.all([
      axios.get(`${API_URL}/preferences/${userId}/preferences`),
      axios.get(`${API_URL}/preferences/${userId}/metrics`),
    ]);
    
    // Merging both responses
    const data = {
      ...preferenceResponse.data,
      ...metricsResponse.data,
    };
    
    console.log("response.data");
    console.log(data);
    
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// export const postmanTest = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/medias/testMedia`);
//     console.log('Get response:', response.data);
//   } catch (error) {
//     console.error('Error during GET request:', error);
//     if (error.response) {
//       console.error('Error response data:', error.response.data);
//       console.error('Error response status:', error.response.status);
//       console.error('Error response headers:', error.response.headers);
//     } else if (error.request) {
//       console.error('Error request:', error.request);
//     } else {
//       console.error('Error message:', error.message);
//     }
//   }
// };
