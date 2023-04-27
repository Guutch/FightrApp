import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { photosScreen, firstNameScreen } from './styles2';
import ImagePicker from 'react-native-image-crop-picker';
import Navbar from './Navbar';
import NextButton from './NextButton';

const Photos = ({ navigation }) => {
  const selectPhoto = (index) => {
    const options = {
      mediaType: 'photo',
      width: 1000,
      height: 1000,
      cropping: true,
    };

    ImagePicker.openPicker(options)
      .then((response) => {
        console.log('Selected photo/video:', response);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const handleBackPress = () => {
    navigation.navigate('Birthday');
  };

  return (
    <View style={photosScreen.photoscontainer}>
      <Navbar navigation={navigation} backNavigation={handleBackPress} />
      <View style={photosScreen.headerContainer}>
      
      
        {/* <Text style={photosScreen.photosfightrText}>Fightr.</Text> */}
        <Text style={firstNameScreen.questionText}>
          Add some photos{'\n'}Upload at least one photo
        </Text>
      </View>
      <View style={photosScreen.photosrectanglesContainer}>
  {Array(6).fill(0).map((_, index) => (
    <TouchableOpacity
      key={index}
      style={photosScreen.photosrectangle}
      onPress={() => selectPhoto(index)}
    >
      <View style={photosScreen.icon}>
        <Icon name="plus" size={35} color="#000" />
      </View>
    </TouchableOpacity>
  ))}
</View>
{/* <TouchableOpacity
        style={photosScreen.nextButton}
        onPress={() => navigation.navigate('FightingScreen')}
      >
        <Text style={photosScreen.nextButtonText}>Next</Text>
      </TouchableOpacity> */}
      <NextButton
          onPress={() => navigation.navigate('FightingScreen')}
        />
    </View>
  );
};

export default Photos;
