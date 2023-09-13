import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { settingsStyles, matchedUsersInterface, photosScreen } from '../components/styles2';
import Navbar from '../../components/Navbar';
import { notificationStyles } from '../../components/styles2';

const NotificationScreen = ({ navigation }) => {

  const dummyData = [
    {
      id: '1',
      type: 'match',
      title: 'New Match',
      content: 'You have a new match with Alex!',
      image: 'https://phantom-marca.unidadeditorial.es/f2014af1e6729eed9cbf3188b06e741a/resize/828/f/jpg/assets/multimedia/imagenes/2022/09/12/16630035401268.jpg',
      timestamp: '2023-09-13T12:34:56Z'
    },
    {
      id: '2',
      type: 'event',
      title: 'Event Invitation',
      content: 'Invitation to SparFest 2023',
      image: null,
      timestamp: '2023-09-12T09:30:21Z'
    },
    {
      id: '3',
      type: 'system',
      title: 'Profile Update',
      content: 'Your profile is 80% complete. Finish setting up to get better matches!',
      image: null,
      timestamp: '2023-09-11T17:05:45Z'
    },
    {
      id: '4',
      type: 'follow',
      title: 'New Follower',
      content: 'Sarah started following you!',
      image: 'https://phantom-marca.unidadeditorial.es/f2014af1e6729eed9cbf3188b06e741a/resize/828/f/jpg/assets/multimedia/imagenes/2022/09/12/16630035401268.jpg',
      timestamp: '2023-09-10T14:22:30Z'
    },
    {
      id: '5',
      type: 'system',
      title: 'Profile Update',
      content: 'Your profile is 80% complete. Finish setting up to get better matches!',
      image: null,
      timestamp: '2023-09-11T17:05:45Z'
    },
    {
      id: '6',
      type: 'system',
      title: 'Profile Update',
      content: 'Your profile is 80% complete. Finish setting up to get better matches!',
      image: null,
      timestamp: '2023-09-11T17:05:45Z'
    },
    {
      id: '7',
      type: 'system',
      title: 'Profile Update',
      content: 'Your profile is 80% complete. Finish setting up to get better matches!',
      image: null,
      timestamp: '2023-09-11T17:05:45Z'
    },
    {
      id: '8',
      type: 'system',
      title: 'Profile Update',
      content: 'Your profile is 80% complete. Finish setting up to get better matches!',
      image: null,
      timestamp: '2023-09-11T17:05:45Z'
    },
    {
      id: '9',
      type: 'system',
      title: 'Profile Update',
      content: 'Your profile is 80% complete. Finish setting up to get better matches!',
      image: null,
      timestamp: '2023-09-11T17:05:45Z'
    },
    {
      id: '10',
      type: 'follow',
      title: 'New Follower',
      content: 'Sarah started following you!',
      image: 'https://phantom-marca.unidadeditorial.es/f2014af1e6729eed9cbf3188b06e741a/resize/828/f/jpg/assets/multimedia/imagenes/2022/09/12/16630035401268.jpg',
      timestamp: '2023-09-10T14:22:30Z'
    },
    {
      id: '11',
      type: 'follow',
      title: 'New Follower',
      content: 'Sarah started following you!',
      image: 'https://phantom-marca.unidadeditorial.es/f2014af1e6729eed9cbf3188b06e741a/resize/828/f/jpg/assets/multimedia/imagenes/2022/09/12/16630035401268.jpg',
      timestamp: '2023-09-10T14:22:30Z'
    },
    {
      id: '12',
      type: 'follow',
      title: 'New Follower',
      content: 'Sarah started following you!',
      image: 'https://phantom-marca.unidadeditorial.es/f2014af1e6729eed9cbf3188b06e741a/resize/828/f/jpg/assets/multimedia/imagenes/2022/09/12/16630035401268.jpg',
      timestamp: '2023-09-10T14:22:30Z'
    },
  ];



  const [notifications, setNotifications] = useState(dummyData);

  const renderItem = ({ item }) => (
    <View style={notificationStyles.notificationItem}>
      <View style={notificationStyles.row}>
        {item.image ? <Image source={{ uri: item.image }} style={notificationStyles.image} /> : null}
        <View style={notificationStyles.textContainer}>
          <Text style={notificationStyles.titleText}>{item.title}</Text>
          <Text>{item.content}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={notificationStyles.container}>
      <Navbar navigation={navigation} textColor="#FFFFFF" backgroundColor="#000000" showBackButton={true} />
      <View style={notificationStyles.mainContainer}>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </View>
      
    </View>
  );

};

export default NotificationScreen;
