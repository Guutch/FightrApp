import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { signUpLocation } from '../../components/styles2';
import Navbar from '../../components/Navbar';
import { createUser } from '../../api'; // Import the createUser function from your API file
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../../redux/actions';

const SignUpLocation = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const requestLocationPermission = useCallback(async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async (position) => {
            // console.log('Data from previous steps, photos, martial arts, and fighting level:', route.params);
            Alert.alert('Location granted', `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);

            let parts = route.params.birthday.split('/');
let mydate = new Date(parts[2], parts[1] - 1, parts[0]);


            // Call the createUser function with the user data and location
            const userData = {
              firstName: route.params.firstName,
              lastName: route.params.lastName,
              email: route.params.email,
              phoneNumber: route.params.phoneNumber,
              height: route.params.height,
              weight: route.params.weight,
              sex: route.params.sex,
              heightUnit: route.params.heightUnit,
              weightUnit: route.params.weightUnit,
              birthday: mydate.toISOString(),
              photos: route.params.images,
              fightingStyle: route.params.checkedMartialArts,
              fightingLevel: route.params.checkedLevel,
              password: route.params.password,
              location: {
                type: 'Point',
                coordinates: [position.coords.latitude, position.coords.longitude],
              }
            };
            const returnedUserData = await createUser(userData);

            // Use dispatch to fire the userLoggedIn action with the returned user data
            dispatch(userLoggedIn(returnedUserData.user));

            // Navigate to another screen if needed
            navigation.navigate('Welcome');
          },
          (error) => {
            console.log(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert('Permission not granted', 'Location permission was not granted');
      }
    } catch (err) {
      console.warn(err);
    }
  }, [route.params, navigation]);

  return (
    <View style={signUpLocation.container}>
      <Navbar navigation={navigation} />
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        navigation={navigation}
        showBackButton={true}
        showNextButton={false}
      // onNext={handlePress}
      />
      <View style={signUpLocation.iconContainer}>
        <Icon name="map-marker" size={150} color="#FFFFFF" />
      </View>
      <View style={signUpLocation.textContainer}>
        <Text style={signUpLocation.mainText}>Allow Location</Text>
        <Text style={signUpLocation.subText}>
          Before you can go ahead, you'll need to enable your location
        </Text>
      </View>
      <TouchableOpacity
        style={signUpLocation.enableLocationButton}
        // onPress={handlePress}
      onPress={requestLocationPermission}
      >
        <Text style={signUpLocation.enableLocationButtonText}>
          Enable Location
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpLocation;