import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert, Animated } from 'react-native';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import ProgressBar from '../../components/ProgressBar';
import { photosScreen, firstNameScreen } from '../../components/styles2';
import Navbar from '../../components/Navbar';
import * as Animatable from 'react-native-animatable';
import InfoComponent from '../../components/InfoComponent';
import PhotoSelector from '../../components/PhotoSelector';



const Photos = ({ navigation, route }) => {
  const [images, setImages] = useState(Array(6).fill(null));
  const [imagePaths, setImagePaths] = useState([]);
  const nextIndex = useRef(0);
  // const BounceFlatList = Animatable.createAnimatableComponent(FlatList);

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
    // This will trigger the bounce animation when the component mounts
    // this.myListRef.bounce(800);
  }, []);

  const selectPhoto = async (index) => {

    console.log("Just pressed on grey box", nextIndex)

    if (index !== nextIndex.current) {
      Alert.alert("Please select photos in order");
      return;
    }

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
        nextIndex.current = nextIndex.current + 1;


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
  
      // Remove null values from the array and add them to the end.
      const filteredImages = updatedImages.filter((item) => item !== null);
      while (filteredImages.length < updatedImages.length) {
        filteredImages.push(null);
      }
  
      // Update positions of the images.
      for (let i = 0; i < filteredImages.length; i++) {
        if (filteredImages[i] !== null) {
          filteredImages[i].position = i + 1;
        }
      }
  
      setImagePaths((prevPaths) => prevPaths.filter((path) => path !== removedImagePath));
      nextIndex.current = filteredImages.indexOf(null);
  
      return filteredImages;
    });
  };


  const handlePress = () => {

    // Must enter 1 photo validation
    // if (images[0]===null) {
    //   Alert.alert('Validation error', 'You must upload at least one photo.');
    //   return;
    // }

    // images.forEach((image, index) => {
    //   if (image) {
    //     console.log(`Image at index ${index} has position ${image.position}`);
    //   } else {
    //     console.log(`No image at index ${index}`);
    //   }
    // });
    
    
    

    navigation.navigate('FightingScreen', {
      ...route.params,
      images, // Pass the images array instead of imagePaths
    });
  };


  return (
    <View style={photosScreen.photoscontainer}>
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
        <Text style={photosScreen.questionText}>
          Add some photos{'\n'}Upload at least one photo
        </Text>
      </View>
      <PhotoSelector
        images={images}
        selectPhoto={selectPhoto}
        removePhoto={removePhoto}
        // styles={styles} // If you're passing styles as a prop
      />
      {/* <TouchableOpacity
        style={{ width: 371, height: 361, borderRadius: 20, alignSelf: 'center', backgroundColor: '#D9D9D9' }}
        // onPress={() => console.log("0")}
        onPress={() => selectPhoto(0)}
      >
        {images[0] && (
          <Image source={{ uri: images[0].path }} style={{ width: 371, height: 361, borderRadius: 20, alignSelf: 'center' }} />

        )}
        {images[0] && (
  <TouchableOpacity
    onPress={() => removePhoto(0)}
    style={photosScreen.deleteIcon}
  >
    <Icon name="times-circle" size={35} color="#000" />
  </TouchableOpacity>
)}
        {!images[0] && (
          <View style={photosScreen.icon}>
            <Icon name="plus" size={35} color="#000" />
          </View>
        )}
        <View style={{ position: 'absolute', bottom: 10, left: 10, backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 10, padding: 5 }}>
          <Text style={{ color: 'black' }}>Profile Picture</Text>
        </View>
      </TouchableOpacity>
      <View style={photosScreen.flatListStyle}>
        <FlatList
          data={images.slice(1)}
          horizontal
          bounces={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={item ? photosScreen.selectedPhotoContainer : photosScreen.photosrectangle}
            >
              <TouchableOpacity
                onPress={() => (item ? null : selectPhoto(index + 1))}
                style={{ flex: 1 }}
              >
                {item ? (
                  <View>
                    <Image
                      source={{ uri: item.path }}
                      style={photosScreen.photosrectangle}
                    />
                    <TouchableOpacity
                      onPress={() => removePhoto(index + 1)}
                      style={photosScreen.deleteIcon}
                    >
                      <Icon name="times-circle" size={35} color="#000" />
                    </TouchableOpacity>
                  </View>

                ) : (
                  <View style={photosScreen.icon}>
                    <Icon name="plus" size={35} color="#000" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      </View> */}

      <InfoComponent infoText="Do not upload any rude or nude photos. Also, don't upload a photo that can cause a feud." />

    </View>
  );




};

export default Photos;