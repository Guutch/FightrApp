import React, { useRef, useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Animated, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { swipingStyles } from './styles2';
import MissedMatchAlert from './MissedMatchAlert';
import ProgressBar from './ProgressBar';

const UserProfileCard = ({ 
  user, navigation, viewOnly, pan, handlers, currentImageIndex, setCurrentImageIndex, handleImagePress,
  style, level, weightClass, handleSwipe, showMissedMatchAlert, matchMade, fightingStyleDict
  }) => {
  const [alertVisible, setAlertVisible] = useState(false);
  const totalImages = user.images.length;
const progress = (currentImageIndex + 1) / totalImages;

  useEffect(() => {
    let timer;
    if (showMissedMatchAlert) {
      setAlertVisible(true);
      timer = setTimeout(() => {
        setAlertVisible(false);
      }, 3000); // milli seconds
    }
    return () => {
      clearTimeout(timer);
    };
    
  }, [showMissedMatchAlert]);

  const rotate = pan?.x?.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-15deg", "0deg", "15deg"],
  });

  const animatedStyle = (matchMade || viewOnly) ? {} : {
    transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
  };
  

  const swipeRight = () => {
    Animated.timing(pan, {
      toValue: { x: 800, y: -125 }, // change 500 to the value you want
      duration: 150, // change 500 to the duration you want
      useNativeDriver: false,
    }).start(() => {
      // reset the position of the card after the animation is done
      handleSwipe("right")

      // remove the swiped card from the stack and load the next card
      // you'll need to implement this part
    });
  };

  const swipeRightAfterMatch = () => {
    Animated.timing(pan, {
      toValue: { x: 800, y: -125 }, // change 500 to the value you want
      duration: 150, // change 500 to the duration you want
      useNativeDriver: false,
    }).start(() => {
      // reset the position of the card after the animation is done
      // Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
  
      // handle the rest of the swipe
      handleSwipe("afterMatch");
    });
  };
  

  const swipeLeft = () => {
    Animated.timing(pan, {
      toValue: { x: -800, y: -125 }, // change 500 to the value you want
      duration: 150, // change 500 to the duration you want
      useNativeDriver: false,
    }).start(() => {
      // reset the position of the card after the animation is done
      handleSwipe("left")
      // remove the swiped card from the stack and load the next card
      // you'll need to implement this part
    });
  };

const handleImageTap = () => {
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      // If nextIndex is out of bounds, reset it to 0
      if (nextIndex >= user.images.length) {
        return 0;
      }
      return nextIndex;
    });
  };

  const CardContainer = Animated.View;

  if (matchMade) {
    // Display the match screen
    console.log("lol")
    return (
      <CardContainer style={[swipingStyles.cardContainer, { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }] }]}>
  <TouchableOpacity activeOpacity={1} onPress={handleImageTap}>
    
  <Image
    source={{ uri: user.images[currentImageIndex].url }}
    style={swipingStyles.cardImage}
  />
</TouchableOpacity>

<View style={{ position: 'absolute', top: '50%', alignSelf: 'center', alignItems: 'center' }}>
  <Text style={swipingStyles.gameOnText}>Game on!</Text>
  <Text style={swipingStyles.matchText}>You've got a match</Text>
</View>


  {/* <TouchableOpacity style={swipingStyles.previewProfileButton}>
  <Text style={swipingStyles.previewProfileText}>Preview Profile</Text>
</TouchableOpacity>
  <TouchableOpacity style={swipingStyles.sendMessageContainer}>
  <Text style={swipingStyles.previewProfileText}>Send them a message</Text>
</TouchableOpacity> */}

  <Text style={swipingStyles.keepSwipingText}>Keep Swiping?</Text>

  <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
    <TouchableOpacity onPress={swipeRightAfterMatch}>
      <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: '#8AFF9D', justifyContent: 'center', alignItems: 'center' }}>
        <Icon name="arrow-right" size={30} color="#8AFF9D" />
      </View>
    </TouchableOpacity>
  </View>
</CardContainer>

    );
  } else {
  
    console.log("No lol")
        return (
    
    <CardContainer style={[swipingStyles.cardContainer, animatedStyle]} {...(viewOnly ? {} : handlers)}>

<ProgressBar progress={progress} isInsideCard={true} />

      <Image
        source={{ uri: user.images[currentImageIndex].url }}
        style={swipingStyles.cardImage}
      />

      {/* User's Details Cards */}
      <View style={swipingStyles.card2}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5, paddingTop: 0 }}>
          {alertVisible && <MissedMatchAlert />}
          {/* {showMissedMatchAlert && <MissedMatchAlert />} */}
          <View>
            <Text style={swipingStyles.userInfoText}>{`${user.firstName} ${(new Date().getFullYear() - new Date(user.birthday).getFullYear())}`}</Text>
            <View style={swipingStyles.weightTextContainer}>
              <Text style={[swipingStyles.weightText, { alignSelf: 'flex-start' }]}>{`${weightClass}`}</Text>
            </View>

            <View style={swipingStyles.fightingStylesContainer}>
              {style}
            </View>
            {/* <Text style={swipingStyles.xxxText}>{'xxx miles away'}</Text> */}
          </View>
          <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={() => { navigation.navigate('ViewProfileScreen', { user, weightClass, level, fightingStyleDict, totalImages }); }}>
            <Icon name="info-circle" size={25} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Icon Card */}
      <View style={swipingStyles.card1}>
        <View style={swipingStyles.iconContainer}>
          {/* <TouchableOpacity onPress={() => console.log('step-backward pressed')}>
            <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: '#FF4D00', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="step-backward" size={30} color="#FF4D00" />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={swipeLeft}>
            <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: '#FA3030', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="arrow-left" size={30} color="#FA3030" />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => console.log('refresh pressed')}>
            <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: '#5D5FEF', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="refresh" size={30} color="#5D5FEF" />
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={swipeRight}>
            <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: '#8AFF9D', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="arrow-right" size={30} color="#8AFF9D" />
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => console.log('step-forward pressed')}>
            <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, borderColor: '#FFB800', justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="step-forward" size={30} color="#FFB800" />
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </CardContainer>
  );

};
};

export default UserProfileCard;