// api.js
import axios from 'axios';
// import { userLoggedIn } from 'redux/actions'; // Not used?

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

export const fetchName = async (userId) => {
  try {

    const response = await axios.get(`${API_URL}/users/${userId}/getName`); // Note the template string
    if (response.data) {
      console.log(response.data)
      return response.data;
    } else {
      throw new Error("No data in response");
    }
  } catch (error) {
    console.error('[api.js] Error fetching name:', error);
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
    console.log(data)
    console.log("data")
    const response = await axios.put(`${API_URL}/preferences/${userId}/prefUpdateFromSettings`, data);
    console.log(response.data)
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Definitely used in settings screen
export const updateEditProfileData = async (userId, data) => {
  // console.log(data)
  try {
    console.log(data.fightingStyles)
    console.log("data")
    const response = await axios.put(`${API_URL}/profiles/${userId}/updatingEditProfile`, data);
    console.log(response.data)
  } catch (error) {
    console.error("Error with edit profile update", error);
    return null;
  }
};

export const changePhotoPositions = async (changedPhotos) => {
  try {
    for (const photo of changedPhotos) {
      const response = await axios.post(`${API_URL}/medias/changePosition`, { photo });
      // Optionally, do something with each response, e.g., logging
    }
    return 'Positions updated successfully';
  } catch (error) {
    console.error('An error occurred while changing photo positions:', error);
    throw error;
  }
};




export const handlePhotos = async (userId, data) => {
  try {


    // Handle deletions first
    if (data.deletedImages.length > 0) {
      // Make a call to your deleteImages API
      // ...  

      console.log("deletedImages", data.deletedImages)
      const response = await axios.post(`${API_URL}/users/${userId}/deleteImages`, { photoIdsToDelete: data.deletedImages });
    }

    // Handle uploads next
    if (data.newImages.length > 0) {

      const formData = new FormData();

      // Append each image to the form data
      for (let image of data.newImages) {
        // Assuming image.data is a Blob or File object
        formData.append('photos', {
          uri: image.path,
          type: image.type,
          name: image.name
        }, image.name);
        formData.append('position', image.position); // Add this line
        // console.log(image.position)
      }
      

      // console.log("Big josh")
      // console.log(data.newImages)
      const response = await axios.post(`${API_URL}/users/${userId}/uploadNewImages`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
            // console.log(response)
    }

  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log()
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in Node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    console.log()
  }
};



// Definitely used in settings screen
export const updateFightingLevelPref = async (userId, fightingLevel) => {
  try {
    const response = await axios.put(`${API_URL}/preferences/${userId}/fightingLevelPref`, { fightingLevel });
    console.log(response.data);
  } catch (error) {
    console.error("Error with fighting level pref", error);
    return null;
  }
};


// Definitely used in settings screen
export const fetchUserPreferences = async (userId) => {
  try {
    const [preferenceResponse, metricsResponse, weightResponse, fightLevelResponse, weightResponseActual, heightResponseActual] = await Promise.all([
      axios.get(`${API_URL}/preferences/${userId}/preferences`),
      axios.get(`${API_URL}/profiles/${userId}/metrics`),
      axios.get(`${API_URL}/profiles/${userId}/getWeight`),
      axios.get(`${API_URL}/profiles/${userId}/getFightLevel`),
      axios.get(`${API_URL}/profiles/${userId}/getActualWeight`),
      axios.get(`${API_URL}/profiles/${userId}/getActualHeight`),
    ]);

    // let weight = weightResponse.data;
    // const weightUnit = metricsResponse.data.weightUnit;

    // Convert the weight to lbs if it's currently in kgs
    // if (weightUnit === 'kg') {
    //   weight *= 2.20462; // Conversion factor from kg to lbs
    // }

    console.log(weightResponseActual.data.weight)
    console.log(heightResponseActual.data)

    // Merging all responses
    const data = {
      ...preferenceResponse.data,
      ...metricsResponse.data,
      ...weightResponse.data,
      // actualWeight: weightResponseActual.data.weight,
      // ...heightResponseActual.data,
      actualWeight: weightResponseActual.data.weight,
      actualHeight: heightResponseActual.data.height,
      // weightUnit: 'lbs', // The weight unit is now always lbs
      usersFightLevel: fightLevelResponse.data.fightingLevel
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

export const fetchEditProfileData = async (userId) => {
  try {
    const [metricsResponse, weightResponse, fightLevelResponse, fightStyleResponse, weightResponseActual, heightResponseActual, bioResponse, sexResponse] = await Promise.all([
      axios.get(`${API_URL}/profiles/${userId}/metrics`),
      axios.get(`${API_URL}/profiles/${userId}/getWeight`),
      axios.get(`${API_URL}/profiles/${userId}/getFightLevel`),
      axios.get(`${API_URL}/profiles/${userId}/getFightStyle`),
      axios.get(`${API_URL}/profiles/${userId}/getActualWeight`),
      axios.get(`${API_URL}/profiles/${userId}/getActualHeight`),
      axios.get(`${API_URL}/profiles/${userId}/getBio`),
      axios.get(`${API_URL}/users/${userId}/getSex`),
    ]);

    console.log(sexResponse.data)

    // // Merging all responses
    const data = {
      ...metricsResponse.data,
      ...weightResponse.data,
      actualWeight: weightResponseActual.data.weight,
      actualHeight: heightResponseActual.data.height,
      usersFightLevel: fightLevelResponse.data.fightingLevel,
      usersFightStyles: fightStyleResponse.data.fightingStyle,
      usersBio: bioResponse.data.bio,
      usersSex: sexResponse.data.userSex
    };

    // // console.log(data);

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
    const swipes = swipeData.data;

    // Filter out users who were ever swiped by the current user
    const unswipedUsers = users.filter(user => !swipes[user.userId]);

    // Filter out users who were swiped left by the current user
    const usersToDisplay = unswipedUsers.filter(user => swipes[user.userId] !== 'left');

    usersToDisplay.forEach(user => {
      if (swipes[user.userId] === 'right') {
        user.swiped = true;
      } else {
        user.swiped = null;
      }
    });


    // Only select relevant information
    for (let user of usersToDisplay) {
      const images = await fetchImages(user.userId);
      user.images = images;
    }

    return usersToDisplay;


  } catch (error) {
    console.error("Error fetching users and images: ", error);
  }
};

// Used SwipingScreen
export const handleNewSwipe = async (swipeData) => {
  try {
    const response = await axios.post(`${API_URL}/swipes/newSwipe`, swipeData);
    console.log(response.data)
    return response.data;
  } catch (error) {  // <-- Add 'error' here
    console.error('[api.js] Error agreeing to waiver', error);
  }
}

// Used SwipingScreen
export const handleNewMatch = async (matchData) => {
  try {
    const response = await axios.post(`${API_URL}/swipes/newMatch`, matchData);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('[api.js] Error creating match', error);
  }
}