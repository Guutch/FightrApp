import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import { photosScreen, firstNameScreen } from '../../components/styles2';
import Navbar from '../../components/Navbar';
import NextButton from '../../components/NextButton';

const Photos = ({ navigation, route }) => {
  const [images, setImages] = useState(Array(6).fill(null));
  const [imagePaths, setImagePaths] = useState([]);

  const requestCameraRollPermissions = async () => {
    try {
      const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
      if (result === RESULTS.GRANTED) {
        return true;
      } else {
        alert('Sorry, we need camera roll permissions to make this work!');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  useEffect(() => {
    requestCameraRollPermissions();
  }, []);

  const selectPhoto = async (index) => {
    const hasPermission = await requestCameraRollPermissions();
    if (!hasPermission) {
      return;
    }

    const options = {
      mediaType: 'photo',
      width: 1000,
      height: 1000,
      cropping: true,
      includeBase64: Platform.OS === 'android',
    };

    ImagePicker.openPicker(options)
      .then(async (response) => {
        console.log('Selected photo path:', response.path);

        if (Platform.OS === 'android') {
          for (const image of images) {
            if (image && image.data === response.data) {
              alert('This photo has already been selected. Please choose a different photo.');
              return;
            }
          }
        } else {
          if (images.some((image) => image && image.path === response.path)) {
            alert('This photo has already been selected. Please choose a different photo.');
            return;
          }
        }

        const newImages = [...images];
        newImages[index] = response;
        setImages(newImages);

        setImagePaths((prevPaths) => [...prevPaths, response.path]);
      })
      .catch((error) => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const removePhoto = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      const removedImagePath = updatedImages[index].path;
      updatedImages[index] = null;
      setImagePaths((prevPaths) => prevPaths.filter((path) => path !== removedImagePath));
      return updatedImages;
    });
  };

  const handleBackPress = () => {
    navigation.navigate('Birthday');
  };

  const handleNextPress = () => {
    navigation.navigate('FightingScreen', {
      ...route.params,
      imagePaths,
    });
  };

  return (
    <View style={photosScreen.photoscontainer}>
      <Navbar navigation={navigation} backNavigation={handleBackPress} />
      <View style={photosScreen.headerContainer}>
        <Text style={firstNameScreen.questionText}>
          Add some photos{'\n'}Upload at least one photo
        </Text>
      </View>
      <View style={photosScreen.photosrectanglesContainer}>
        {images.map((image, index) => (
          <TouchableOpacity
            key={index}
            style={image ? photosScreen.selectedPhotoContainer : photosScreen.photosrectangle}
            onPress={() => (image ? null : selectPhoto(index))}
          >
            {image ? (
              <Image
                source={{ uri: image.path }}
                style={photosScreen.photosrectangle}
              />
            ) : (
              <View style={photosScreen.icon}>
                <Icon name="plus" size={35} color="#000" />
              </View>
            )}
            {image && (
              <TouchableOpacity
                onPress={() => removePhoto(index)}
                style={photosScreen.deleteIcon}
              >
                <Icon name="times-circle" size={35} color="#000" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <NextButton onPress={handleNextPress} />
    </View>
  );
  
};

export default Photos;
