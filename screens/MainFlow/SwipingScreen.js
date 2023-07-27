import React, { useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, View, PanResponder, Animated, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Navbar from '../../components/Navbar';
import { swipingStyles } from '../../components/styles2';
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
  const [showMissedMatchAlert, setShowMissedMatchAlert] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);


  const pan = useRef(new Animated.ValueXY()).current;

  const fightingStyles = {
    1: 'Boxing',
    2: 'Brazilian Jiu-Jitsu',
    3: 'Muay Thai',
    4: 'Wrestling',
    5: 'Kickboxing',
    6: 'Jiu-Jitsu',
    7: 'Judo',
    8: 'Karate',
    9: 'Kung Fu',
    10: 'Taekwondo',
  };

  const fightingLevels = {
    1: 'Professional',
    2: 'Amateur Competitor',
    3: 'Advanced',
    4: 'Intermediate',
    5: 'Beginner',
    6: 'Novice',
  };

  const weightClasses = {
    1: 'Heavyweight',
    2: 'Light Heavyweight',
    3: 'Middleweight',
    4: 'Welterweight',
    5: 'Lightweight',
    6: 'Featherweight',
    7: 'Bantamweight',
    8: 'Flyweight',
    9: 'Strawweight',
  };

  const getWeightClass = (classNumber) => {
    return weightClasses[classNumber] || 'Unknown';
  };


  const getFightingStyles = (styleNumbers) => {
    return styleNumbers.map(styleNumber => (
      <Text style={swipingStyles.fightingStyleText} key={styleNumber}>
        {fightingStyles[styleNumber]}
      </Text>
    ));
  };


  const getFightingLevel = (levelNumber) => {
    return fightingLevels[levelNumber] || 'Unknown';
  };

  useEffect(() => {
    const fetchData = async () => {
      const foundUsers = await fetchUsersAndImages(userId.userId);

      // Sort each user's images array by the 'position' attribute
      foundUsers.forEach(user => {
        user.images.sort((a, b) => a.position - b.position);
        console.log(user.userId)
      });



      setUsers(foundUsers);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Handle card swipe to left or right
  const handleSwipe = (direction) => {
    if (direction === 'right' || direction === 'left') {
      setUsers(prevUsers => {
        // Reset position for the next card
        pan.setValue({ x: 0, y: 0 });
  
        return prevUsers.slice(1);
      });
      setCurrentImageIndex(0); // reset image index for next user
      if (direction === 'left') {
        console.log(users[0])
        if (users[0].swiped === true) {
          setShowMissedMatchAlert(true);
        }
      }
    }
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
    <View style={swipingStyles.firstContainer}>
      <Navbar
        backgroundColor="#FFFFFF"
        textColor="#000000"
        homeStyle={true}
        navigation={navigation}  // Here we pass navigation as a prop to Navbar
      />
      <View style={swipingStyles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          users.length > 0 &&
          users[0].images.length > 0 && (
            <> 
            
            <UserProfileCard
              user={users[1]}
              navigation={navigation}
              viewOnly={true}
              // handlers={panResponder.panHandlers}
              // pan={pan}
              currentImageIndex={0}
              // handleImagePress={handleImageTap}
              style={getFightingStyles(users[1].fightingStyle)}
              level={getFightingLevel(users[1].fightingLevel)}
              weightClass={getWeightClass(users[1].weightClass)}
              showMissedMatchAlert={showMissedMatchAlert}
              // handleSwipe={handleSwipe}
            />
            <UserProfileCard
              user={users[0]}
              navigation={navigation}
              viewOnly={false}
              handlers={panResponder.panHandlers}
              pan={pan}
              currentImageIndex={currentImageIndex}
              handleImagePress={handleImageTap}
              style={getFightingStyles(users[0].fightingStyle)}
              level={getFightingLevel(users[0].fightingLevel)}
              weightClass={getWeightClass(users[0].weightClass)}
              showMissedMatchAlert={showMissedMatchAlert}
              handleSwipe={handleSwipe}
            />
            </>
            
          )
        )}
      </View>
    </View>
  );

};

export default SwipingScreen;