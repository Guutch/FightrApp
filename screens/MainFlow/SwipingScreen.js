import React, { useRef, useEffect, useState } from 'react';
import { Text, StyleSheet, View, PanResponder, Animated, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Navbar from '../../components/Navbar';
import { swipingStyles, settingsStyles } from '../../components/styles2';
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
    Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
  };

  const handleImageTap = () => {  // Add this function
    setCurrentImageIndex(prevIndex => prevIndex + 1 < users[0].images.length ? prevIndex + 1 : 0);
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
      if (Math.abs(pan.x._value) > 120) {
        handleSwipe(pan.x._value > 0 ? 'right' : 'left');
      }
      // If user tapped the card
      else if (Math.abs(pan.x._value) < 5 && Math.abs(pan.y._value) < 5) {
        handleImageTap();
      }
      // If user dragged the card but not enough to trigger a swipe
      else {
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      }
    },
  });
  return (
    <View >
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
            <View style={swipingStyles.cardContainer}>
              <Animated.View
                {...panResponder.panHandlers}
                style={{
                  ...swipingStyles.cardContainer,
                  transform: [{ translateX: pan.x }, { translateY: pan.y }],
                }}
              >
                <Image
                  source={{ uri: users[0].images[currentImageIndex].url }}
                  style={swipingStyles.cardImage}
                />
                <View style={swipingStyles.card2}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                    <Text style={{ fontSize: 18, color: 'black' }}>{`${users[0].firstName}, ${(users[0].birthday, 'years')}`}</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('ViewProfileScreen', { user: users[0] }); }}>
                      <Icon name="info-circle" size={20} color="#000" />
                    </TouchableOpacity>
                  </View>
                  <Text style={{ fontSize: 18, paddingLeft: 10 }}>{`Weight: ${users[0].weight}`}</Text>
                  <Text style={{ fontSize: 18, paddingLeft: 10 }}>{`Fighting Style: ${users[0].fightingStyle.join(', ')}`}</Text>
                  <Text style={{ fontSize: 16, paddingLeft: 10 }}>{'xxx'}</Text>
                </View>
                <View style={swipingStyles.card1}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', flex: 1 }}>
                    <TouchableOpacity onPress={() => { console.log('step-backward'); }}>
                      <Icon name="step-backward" size={30} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { console.log('arrow-left'); }}>
                      <Icon name="arrow-left" size={30} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { console.log('refresh'); }}>
                      <Icon name="refresh" size={30} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { console.log('arrow-right'); }}>
                      <Icon name="arrow-right" size={30} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { console.log('step-forward'); }}>
                      <Icon name="step-forward" size={30} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            </View>
          )
        )}
      </View>

    </View>
  );

};

export default SwipingScreen;
