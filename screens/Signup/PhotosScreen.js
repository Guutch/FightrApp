import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import ProgressBar from '../../components/ProgressBar';
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
        // console.log('Selected photo path:', response.path);

        // Already 'been selected' code
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
        newImages[index] = { path: response.path, data: response.data, name: response.path.split("/").pop(), type: 'image/jpeg', position: index + 1 };
        setImages(newImages);



        // setImagePaths((prevPaths) => [...prevPaths, response.path]);
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

  // const handleBackPress = () => {
  //   navigation.navigate('Birthday');
  // };

  const handlePress = () => {
    navigation.navigate('FightingScreen', {
      ...route.params,
      images, // Pass the images array instead of imagePaths
    });
  };


  return (
    <View style={photosScreen.photoscontainer}>
      {/* <Navbar navigation={navigation} backNavigation={handleBackPress} /> */}
      <Navbar
        backgroundColor="#000000"
        textColor="#FFFFFF"
        navigation={navigation}
        showBackButton={true}
        showNextButton={true}
        onNext={handlePress}
      />
      <ProgressBar progress={6 / 8} />
      <View style={photosScreen.headerContainer}>
        <Text style={firstNameScreen.questionText}>
          Add some photos{'\n'}Upload at least one photo
        </Text>
      </View>
      <View style={{width: 371, height: 261, borderRadius: 20, alignSelf: 'center', backgroundColor: '#D9D9D9'}}>
        {images[0] && (
          <Image source={{ uri: images[0].path }} style={{width: 371, height: 361, borderRadius: 20, alignSelf: 'center'}} />
        )}
        <View style={{position: 'absolute', bottom: 10, left: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 10, padding: 5}}>
          <Text style={{color: 'black'}}>Profile Picture</Text>
        </View>
        <View style={photosScreen.icon}>
                <Icon name="plus" size={35} color="#000" />
              </View>
      </View>
      <FlatList
      style={{marginTop: 20}}
        data={images.slice(1)}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={item ? photosScreen.selectedPhotoContainer : photosScreen.photosrectangle}
            onPress={() => (item ? null : selectPhoto(index + 1))}
          >
            {item ? (
              <Image
                source={{ uri: item.path }}
                style={photosScreen.photosrectangle}
              />
            ) : (
              <View style={photosScreen.icon}>
                <Icon name="plus" size={35} color="#000" />
              </View>
            )}
            {item && (
              <TouchableOpacity
                onPress={() => removePhoto(index + 1)}
                style={photosScreen.deleteIcon}
              >
                <Icon name="times-circle" size={35} color="#000" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        )}
      />
      {/* <NextButton onPress={handleNextPress} /> */}
    </View>
  );
  
  

};

export default Photos;