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

  if (userData.sex === "Male") {
    data.append('sex', 1);
  } else {
    data.append('sex', 2);
  }

  if (userData.heightUnit === "cm") {
    data.append('heightUnit', 1);
  } else {
    data.append('heightUnit', 2);
  }

  if (userData.weightUnit === "kg") {
    data.append('weightUnit', 1);
  } else {
    data.append('weightUnit', 2);
  }

  // data.append('sex', userData.sex);
  // data.append('heightUnit', userData.heightUnit);
  // data.append('weightUnit', userData.weightUnit);

  data.append('fightingStyle', JSON.stringify(userData.fightingStyle));
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
          position: photo.position // add the position property
        };
        data.append('photos', photoBlob);
      } else {
        // if on iOS or photo data is not available, append as a file
        data.append('photos', {
          uri: photo.path, // Change from photo.uri to photo.path
          type: 'image/jpeg',
          name: photo.name || `photo_${index}.jpg`,
          position: photo.position // add the position property
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

export const handleTnCs = async (userId) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}/tncs`);

    return response.data;
  } catch (error) {  // <-- Add 'error' here
    console.error('[api.js] Error agreeing to Ts & Cs:', error);
  }
}

export const handleWaiver = async (userId) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}/waiver`);
    console.log(response.data)
    return response.data;
  } catch (error) {  // <-- Add 'error' here
    console.error('[api.js] Error agreeing to waiver', error);
  }
}

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('[api.js] Error logging in:', error);
  }
};

export const fetchImage = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/image`); // Note the template string
    if (response.data) {
      console.log(response.data)
      return response.data;
    } else {
      throw new Error("No data in response");
    }
  } catch (error) {
    console.error('[api.js] Error fetching image:', error);
  }
};

export const fetchImages = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/medias/${userId}/getAllimages`); // Note the template string
    if (response.data) {
      // console.log(response.data)
      return response.data;
    } else {
      throw new Error("No data in response");
    }
  } catch (error) {
    console.error('[api.js - fetchImages] Error fetching image:', error);
  }
};

// Definitely used in settings screen
export const changeUserPreferences = async (userId, data) => {
  try {
    const response = await axios.put(`${API_URL}/preferences/${userId}/prefUpdateFromSettings`, data);
    console.log(response.data)
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Definitely used in settings screen
export const fetchUserPreferences = async (userId) => {
  try {
    const [preferenceResponse, metricsResponse, weightResponse, fightLevelResponse] = await Promise.all([
      axios.get(`${API_URL}/preferences/${userId}/preferences`),
      axios.get(`${API_URL}/profiles/${userId}/metrics`),
      axios.get(`${API_URL}/profiles/${userId}/getWeight`),
      axios.get(`${API_URL}/profiles/${userId}/getFightLevel`)
    ]);

    // let weight = weightResponse.data;
    // const weightUnit = metricsResponse.data.weightUnit;

    // Convert the weight to lbs if it's currently in kgs
    // if (weightUnit === 'kg') {
    //   weight *= 2.20462; // Conversion factor from kg to lbs
    // }

    // Merging all responses
    const data = {
      ...preferenceResponse.data,
      ...metricsResponse.data,
      // weight: weight, // ???
      // weightUnit: 'lbs', // The weight unit is now always lbs
      usersFightLevel: fightLevelResponse.data
    };

    console.log("Here")

    console.log("response.data");
    console.log(data);



    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Definitely used in settings screen
export const fetchEditProfileData = async (userId) => {
  try {
    const [metricsResponse, weightResponse, editProfileResponse] = await Promise.all([
      axios.get(`${API_URL}/preferences/${userId}/metrics`),
      axios.get(`${API_URL}/users/${userId}/getWeight`),
      axios.get(`${API_URL}/users/${userId}/getEditProfileData`),
    ]);

    // console.log(editProfileResponse.data)

    // Merging all responses
    const data = {
      ...metricsResponse.data,
      ...weightResponse.data,
      ...editProfileResponse.data
    };

    // console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    // console.error(error);
    // console.error(error);
    return null;
  }
};

// Finds all users + their images with respect to user's preferences
export const fetchUsersAndImages = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/matches/${userId}`); // replace with your API endpoint to fetch users
    const users = response.data; // Use .data to get response body with axios
    // console.log("HI")
    // console.log(users[0].userId)
    // console.log("HI")

    const swipeData = await axios.get(`${API_URL}/swipes/${userId}/getAll`);
    const swipes = swipeData.data
    console.log("Swipe Data")
    console.log(swipes)
    console.log("Swipe Data")
    const filteredUsers = users.filter(user => swipeData[user.userId] !== 'left');

    filteredUsers.forEach(user => {
      if (swipes[user.userId] === 'right') {
        user.swiped = true;
      } else {
        user.swiped = null;
      }
      console.log("test ->", user.userId)
      console.log(user.swiped)
    });

    // Only select relevant information
    for (let user of filteredUsers) {
      // console.log(user.userId)
      const images = await fetchImages(user.userId);
      // console.log(images)
      user.images = images;
      // console.log(user.images)
    }

    return filteredUsers;
  } catch (error) {
    console.error("Error fetching users and images: ", error);
  }
};























