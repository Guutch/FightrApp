// api.js
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import { getWebSocketInstance } from  './Backend/websocketInstance'



const API_URL = 'https://fytr-a7c0fafcc4ad.herokuapp.com';

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

     // Store the token securely
     await Keychain.setGenericPassword('userToken', response.data.token);

    // console.log('User created successfully:', response.data);

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
    ///console.log(response.data)
    return response.data;
  } catch (error) {  // <-- Add 'error' here
    console.error('[api.js] Error agreeing to waiver', error);
  }
}

export const emailTaken = async (email) => {
  console.log("Email in api.js", email)
  try {
    const response = await axios.put(`${API_URL}/users/findEmail`, {email});
    const data = await response.json();
    return data.emailTaken;
  } catch (error) {
    console.log('error with emailTaken', error);
    return true; // Assume true (email taken) if there's an error, for safety.
  }
}


export const handleWeightChange = async (userId, weightClass, sex) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}/weightPrefUpdate`, {weightClass, sex});
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('[api.js] Error updating weight preference ', error);
  }
}

// Will need to use SecureStore in the future... HIGHLY RECOMMENDED
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    // console.log(response.data);

    // Store the token securely
    await Keychain.setGenericPassword('userToken', response.data.token);

    return response.data;
  } catch (error) {
    console.log('[api.js] Error logging in:', error);
  }
};

export const fetchImage = async (userId) => {
  if (!userId) {
    console.log('[api.js] User ID is not available. Skipping fetchImage.');
    return null;
  }

  try {
    
    console.log("This is the user's ID in fetchImage", userId);
    const response = await axios.get(`${API_URL}/users/${userId}/image`); // Note the template string
    if (response.data) {
      return response.data;
    } else {
      throw new Error("No data in response");
    }
  } catch (error) {
    console.error('[api.js] Error fetching image:', error);
  }
};


export const fetchName = async (userId) => {
 
  if (!userId) {
    console.log('[api.js] User ID is not available. Skipping fetchName.');
    return null;
  }
  
  try {

    const response = await axios.get(`${API_URL}/users/${userId}/getName`); // Note the template string
    if (response.data) {
      // console.log(response.data)
      return response.data;
    } else {
      throw new Error("No data in response");
    }
  } catch (error) {
    console.error('[api.js] Error fetching name:', error);
  }
};

export const fetchImages = async (userId) => {
  if (!userId) {
    console.log('[api.js] User ID is not available. Skipping fetchImage.');
    return null;
  }
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
    // console.log(data)
    // console.log("data")
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
    // console.log(data.fightingStyles)
    // console.log("data")
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

// Saves messages to the backend
export const saveMessageToDatabase = async (senderId, receiverId, content) => {
  try {
    const response = await axios.post(`${API_URL}/connections/saveMessage`, {
      sender_id: senderId,  // changed to sender_id
      receiver_id: receiverId,  // changed to receiver_id
      content
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error while saving message", error);
    return null;
  }
};

// Fetches messages from the backend
export const fetchMessages = async (user1Id, user2Id, lastOnly = false) => {
  try {
    const response = await axios.get(`${API_URL}/connections/fetchMessages/${user1Id}/${user2Id}`, {
      params: {
        lastOnly
      }
    });

    console.log("response.data.messages")
    console.log(response.data.messages)

    return response.data.messages;
  } catch (error) {
    console.error("Error while fetching messages", error);
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

    // console.log(weightResponseActual.data.weight)
    // console.log(heightResponseActual.data)

    // Merging all responses
    const data = {
      ...preferenceResponse.data,
      ...metricsResponse.data,
      ...weightResponse.data,
      actualWeight: weightResponseActual.data.weight,
      actualHeight: heightResponseActual.data.height,
      usersFightLevel: fightLevelResponse.data.fightingLevel
    };

    // console.log("Here")

    // console.log("response.data");
    // console.log(data);



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
  if (!userId) {
    console.log('[api.js] User ID is not available. Skipping fetchImage');
    return null;
  }

  try {
    // Fetch potential matches for the logged-in user
    const response = await axios.get(`${API_URL}/matches/${userId}`);
    const users = response.data; // this should be an array of user objects

    console.log("users", users);

    // Fetch all swipe data for the logged-in user
    const swipeData = await axios.get(`${API_URL}/swipes/${userId}/getAll`);
    const swipes = swipeData.data; // this should be an array of swipe objects

    console.log("swipes", swipes);

    // Filter users based on swipe history
    const usersToDisplay = users.filter(potentialMatch => {
      // Check if the current user has swiped on the potential match
      const userSwiped = swipes.some(swipe =>
        swipe.swiper_id === userId && swipe.swiped_id === potentialMatch.userId
      );

      // Check if the potential match has swiped left on the current user
      const matchSwipedLeft = swipes.some(swipe =>
        swipe.swiper_id === potentialMatch.userId && swipe.swiped_id === userId && swipe.direction === 'left'
      );

      // A user should be displayed if the current user hasn't swiped on them and they haven't swiped left on the current user
      return !userSwiped && !matchSwipedLeft;
    });

    console.log("usersToDisplay", usersToDisplay)

    // Add property to indicate if a user has swiped right on the current user
    const enhancedUsersToDisplay = usersToDisplay.map(user => {
      const swipedRightOnUser = swipes.some(swipe =>
        swipe.swiper_id === user.userId && swipe.swiped_id === userId && swipe.direction === 'right'
      );

      return { ...user, swipedRightOnUser };
    });

    console.log("enhancedUsersToDisplay ", enhancedUsersToDisplay);

    // Only select relevant information
    for (let user of enhancedUsersToDisplay) {
      // Assuming fetchImages is a function that you've defined elsewhere
      const images = await fetchImages(user.userId);
      user.images = images;
    }

    return enhancedUsersToDisplay;

  } catch (error) {
    console.error("Error fetching users and images: ", error);
    return null; // Return null or appropriate error handling
  }
};


// Used SwipingScreen
export const handleNewSwipe = async (swipeData) => {
  try {
    const response = await axios.post(`${API_URL}/swipes/newSwipe`, swipeData);
    // console.log(response.data)
    return response.data;
  } catch (error) {  // <-- Add 'error' here
    console.error('[api.js] Error agreeing to waiver ', error);
  }
}

/// Used SwipingScreen
export const handleNewMatch = async (matchData) => {
  // const ws = getWebSocketInstance();
  try {
    // Assume matchData contains all the relevant information about the match.
    // ws.send(JSON.stringify({ 
    //     type: 'NEW_MATCH',
    //   payload: matchData,  // You might want to send only the parts of matchData that are actually needed for the notification.
    // }));

    const response = await axios.post(`${API_URL}/swipes/newMatch`, matchData);
    return response.data;
  } catch (error) {
    console.error('[api.js] Error creating match', error);
  }
}


export const fetchAdditionalUserData = async (userId) => {
  try {
    const bioResponse = await axios.get(`${API_URL}/profiles/${userId}/getBio`);
    const metricsResponse = await axios.get(`${API_URL}/profiles/${userId}/metrics`);
    const actualWeightResponse = await axios.get(`${API_URL}/profiles/${userId}/getActualWeight`);
    const actualHeightResponse = await axios.get(`${API_URL}/profiles/${userId}/getActualHeight`);

    // Return just the values we need
    return {
      bio: bioResponse.data.bio,
      distanceUnit: metricsResponse.data.distanceUnit,
      heightUnit: metricsResponse.data.heightUnit,
      weightUnit: metricsResponse.data.weightUnit,
      weight: actualWeightResponse.data.weight,
      height: actualHeightResponse.data.height,
    };

  } catch (error) {
    console.error("An error occurred while fetching additional user data:", error);
    return null;
  }
};

export const fetchMetrics = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/profiles/${userId}/metrics`);
    return {
      heightUnit: response.data.heightUnit,
      weightUnit: response.data.weightUnit
    };
  } catch (error) {
    console.error("An error occurred while fetching metrics:", error);
    return null;
  }
};

export const fetchAllMatches = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/connections/allMatches/${userId}`);
    const matches = response.data;

    return matches;
  } catch (error) {
    console.error("An error occurred while fetching matches:", error);
    return null;
  }
};

export const markMessagesAsRead = async (senderId, receiverId) => {
  try {
    const response = await axios.put(`${API_URL}/connections/markAsRead`, {
      senderId,
      receiverId,
    });
    console.log("markMessagesAsRead", response.data)
    return response.data;
  } catch (error) {
    console.error("Error while marking messages as read", error);
    return null;
  }
};

// Handle report, unmatch, block
export const handleUserAction = async (actionType, userId, selectedUserId) => {

  try {
    // Remove the match record
    // console.log("Unmatch User replacement")
    await axios.delete(`${API_URL}/connections/unmatch`, {
      data: {
        userId,
        selectedUserId,
      }
    });

    console.log("Action Type:", actionType);  // Debug line

    switch (actionType) {
      case 'Block user':
        // API call to remove match record and create block record
        await axios.post(`${API_URL}/connections/handleSerious`, {
          actionType,
          userId,
          selectedUserId
        });
        break;
      case 'Report user':
        // API call to remove match record and create report record
        // You should also pass 'reason' here if you have it
        await axios.post(`${API_URL}/connections/handleSerious`, {
          actionType,
          userId,
          selectedUserId,
          reason: 'Your reason here'  // Replace with the actual reason
        });
        break;
      default:
      // Handle other cases or errors
    }

  } catch (error) {
    throw new Error(`Error handling action: ${error}`);
  }
};
