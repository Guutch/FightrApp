import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome icons

const PhotoSelector = ({ images, selectPhoto, removePhoto }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.mainPhotoContainer}
        onPress={() => selectPhoto(0)}
      >
        {images[0] && (
          <Image source={{ uri: images[0].path }} style={styles.mainImage} />
        )}
        {images[0] && (
          <TouchableOpacity
            onPress={() => removePhoto(0)}
            style={styles.deleteIcon}
          >
            <Icon name="times-circle" size={35} color="#000" />
          </TouchableOpacity>
        )}
        {!images[0] && (
          <View style={styles.icon}>
            <Icon name="plus" size={35} color="#000" />
          </View>
        )}
        <View style={styles.profilePictureLabel}>
          <Text style={{ color: 'black' }}>Profile Picture</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.flatListStyle}>
        <FlatList
          data={images.slice(1)}
          horizontal
          bounces={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={item ? styles.selectedPhotoContainer : styles.photosRectangle}
            >
              <TouchableOpacity
                onPress={() => (item ? null : selectPhoto(index + 1))}
                style={{ flex: 1 }}
              >
                {item ? (
                  <View>
                    <Image
                      source={{ uri: item.path }}
                      style={styles.photosRectangle}
                    />
                    <TouchableOpacity
                      onPress={() => removePhoto(index + 1)}
                      style={styles.deleteIcon}
                    >
                      <Icon name="times-circle" size={35} color="#000" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.icon}>
                    <Icon name="plus" size={35} color="#000" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainPhotoContainer: {
    width: 371,
    height: 361,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
  },
  mainImage: {
    width: 371,
    height: 361,
    borderRadius: 20,
    alignSelf: 'center',
  },
  deleteIcon: {
    // Define your delete icon style here
  },
  icon: {
    // Define your icon style here
  },
  profilePictureLabel: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 5,
  },
  flatListStyle: {
    // Define your flatListStyle here
  },
  selectedPhotoContainer: {
    // Define your selectedPhotoContainer style here
  },
  photosRectangle: {
    // Define your photosRectangle style here
  },
});

export default PhotoSelector;
