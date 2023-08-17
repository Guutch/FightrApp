import React, { useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, View, PanResponder, Animated, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Navbar from '../../components/Navbar';
import { swipingStyles } from '../../components/styles2';
import UserProfileCard from '../../components/UserProfileCard';
import NoUsersCard from '../../components/NoUsersCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchUsersAndImages, handleNewSwipe, handleNewMatch } from '../../api';
import { useSelector } from 'react-redux';
// import moment from 'moment'; // To calculate age from birthdate

const SwipingScreen = ({ navigation }) => {
  const userId = useSelector(state => state.user);
  const preferences = useSelector((state) => state.preferences);
  // const fightingLevel = useSelector(state => state.preferences.fightingLevel);

  const [users, setUsers] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);  // Add this line
  const [isLoading, setIsLoading] = useState(true);
  const [showMissedMatchAlert, setShowMissedMatchAlert] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [matchMade, setMatchMade] = useState(false);



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
    1: 'Strawweight',
    2: 'Flyweight',
    3: 'Bantamweight',
    4: 'Featherweight',
    5: 'Lightweight',
    6: 'Welterweight',
    7: 'Middleweight',
    8: 'Light Heavyweight',
    9: 'Heavyweight',
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
      console.log(userId)
      const foundUsers = await fetchUsersAndImages(userId.userId); // Pass userId directly

      // Sort each user's images array by the 'position' attribute
      foundUsers.forEach((user) => {
        user.images.sort((a, b) => a.position - b.position);
        console.log(`User ${user.userId} has ${user.images.length} images.`);
        console.log("HERES THE USER")
    console.log(user)
      });

      setUsers(foundUsers);
      setIsLoading(false);
    };
    fetchData();
  }, [preferences, userId]); // Re-run the effect when preferences or userId change

  // Handle card swipe to left or right
  const handleSwipe = (direction) => {
    if (direction === 'right' || direction === 'left' || direction === 'afterMatch') {
      //For now I am assuming there is always a match
      if (direction === 'right') {
        // Record the swipe (regard)
        
      
        if (users[0].swiped === true) {
          // If a match is made, ping the card back to its original position
          pan.setValue({ x: 0, y: 0 });
        
          // Set matchMade to true
          setMatchMade(true);
        
          // Create a match in the backend
          handleNewMatch({
            user1_id: userId.userId,
            user2_id: users[0].userId,
          });
        
          // Stop the function execution
          return;
        }else {
          // Log a right swipe
          handleNewSwipe({
            swiper_id: userId.userId,
            swiped_id: users[0].userId,
            direction: direction
          });
        }
        // If a match is not made, continue with the rest of the code
      } 
      
      else if (direction === 'afterMatch') {
        // If afterMatch is triggered, animate the card back to the center
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      
        // Set matchMade to false
        setMatchMade(false);
      } 
      else if (direction === 'left') {
        if (users[0].swiped === true) {
          setShowMissedMatchAlert(true);
        }
        // Log a left swipe 
        handleNewSwipe({
          swiper_id: userId.userId,
          swiped_id: users[0].userId,
          direction: direction
        });
      }
      // If a match is not made, remove the current user from the users array immediately
      setUsers(prevUsers => prevUsers.slice(1));
      setCurrentImageIndex(0); // reset image index for next user
  
      // Reset the position of the card after the swipe
      pan.setValue({ x: 0, y: 0 });
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
          <>
            {users.length <= 1 && <NoUsersCard />}
            {users.length > 1 && users[0].images.length > 0 && (
              <>
                <UserProfileCard
                  user={users[1]}
                  navigation={navigation}
                  viewOnly={true}
                  currentImageIndex={0}
                  style={getFightingStyles(users[1]?.fightingStyle)}
                  level={getFightingLevel(users[1]?.fightingLevel)}
                  weightClass={getWeightClass(users[1]?.weightClass)}
                  showMissedMatchAlert={showMissedMatchAlert}
                />
              </>
            )}
            {users.length > 0 && users[0].images.length > 0 && (
              <UserProfileCard
                user={users[0]}
                navigation={navigation}
                viewOnly={false}
                matchMade={matchMade}
                handlers={panResponder.panHandlers}
                pan={pan}
                currentImageIndex={currentImageIndex}
                setCurrentImageIndex={setCurrentImageIndex}
                handleImagePress={handleImageTap}
                style={getFightingStyles(users[0]?.fightingStyle)}
                level={getFightingLevel(users[0]?.fightingLevel)}
                weightClass={getWeightClass(users[0]?.weightClass)}
                showMissedMatchAlert={showMissedMatchAlert}
                handleSwipe={handleSwipe}
              />
            )}
          </>
        )}
      </View>
    </View>
  );
  
  

};

export default SwipingScreen;