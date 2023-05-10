import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { signUpLocation } from '../../components/styles2';
import Navbar from '../../components/Navbar';
import { createUser } from '../../api'; // Import the createUser function from your API file

const SignUpLocation = ({ navigation, route }) => {
  const requestLocationPermission = useCallback(async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async (position) => {
            console.log('Data from previous steps, photos, martial arts, and fighting level:', route.params);
            Alert.alert('Location granted', `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
  
            // Call the createUser function with the user data and location
            const userData = {
              firstName: route.params.firstName,
              lastName: route.params.lastName,
              email: route.params.email,
              phoneNumber: route.params.phoneNumber,
              height: route.params.height,
              weight: route.params.weight,
              birthday: route.params.birthday,
              photos: route.params.imagePaths,
              fightingStyle: route.params.checkedMartialArts.join(', '), // Assuming the fighting styles are stored as an array and should be joined into a single string
              fightingLevel: route.params.checkedLevel,
              location: {
                type: 'Point',
                coordinates: [position.coords.latitude, position.coords.longitude],
              },
            };

            console.log(userData.location.coordinates[0])
            await createUser(userData);
  
            // Navigate to another screen if needed
            navigation.navigate('SomeScreen');
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
