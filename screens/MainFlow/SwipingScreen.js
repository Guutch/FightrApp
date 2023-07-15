import React, { useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, View, PanResponder, Animated, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Navbar from '../../components/Navbar';
import { swipingStyles, settingsStyles } from '../../components/styles2';
import UserProfileCard from '../../components/UserProfileCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchUsersAndImages } from '../../api';
import { useSelector } from 'react-redux';
// import moment from 'moment'; // To calculate age from birthdate

const SwipingScreen = ({ navigation }) => {
  const userId = useSelector(state => state.user);
  const [users, setUsers] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);  // Add this line
  const [isLoading, setIsLoading] = useState(true);

  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const fetchData = async () => {
      const foundUsers = await fetchUsersAndImages(userId.userId);
  
      // Sort each user's images array by the 'position' attribute
      foundUsers.forEach(user => {
        user.images.sort((a, b) => a.position - b.position);
      });
  
      setUsers(foundUsers);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Handle card swipe to left or right
  const handleSwipe = (direction) => {
    if (direction === 'right' || direction === 'left') {
      setUsers(prevUsers => prevUsers.slice(1));
      setCurrentImageIndex(0); // reset image index for next user
    }
    // This is where the card goes back to the center
    Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
  };

  const handleImageTap = () => {
    setCurrentImageIndex(prevIndex => (prevIndex + 1) % users[0].images.length);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x, // dx is the accumulated distance of the gesture since the touch started
          dy: pan.y, // dy is the accumulated distance of the gesture since the touch started
        },
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      // If user swiped the card
      if (Math.abs(pan.x._value) > 180) {
        handleSwipe(pan.x._value > 0 ? 'right' : 'left');
      }
      // If user tapped the card
      else if (Math.abs(pan.x._value) < 5 && Math.abs(pan.y._value) < 5) {
        console.log("lol")
        handleImageTap();
      }
      // If user dragged the card but not enough to trigger a swipe
      else {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, friction: 5, useNativeDriver: false }).start();
      }
    },
  });
  return (
    <View>
      <Navbar
        backgroundColor="#FFFFFF"
        textColor="#000000"
        homeStyle={true}
        navigation={navigation}  // Here we pass navigation as a prop to Navbar
      />
      <View style={settingsStyles.container}>
      {isLoading ? (
  <ActivityIndicator size="large" color="#0000ff" />
) : (
  users.length > 0 &&
  users[0].images.length > 0 && (
    <UserProfileCard 
      user={users[0]} 
      navigation={navigation} 
      viewOnly={false}
      handlers={panResponder.panHandlers}
      pan={pan} 
      currentImageIndex={currentImageIndex} 
      handleImagePress={handleImageTap}
    />
  )
)}
      </View>
    </View>
  );

};

export default SwipingScreen;