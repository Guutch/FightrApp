import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // or the library you're using for icons

const InfoComponent = ({ infoText }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="info-circle" style={styles.icon} size={30}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{infoText}</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 5,
    left: 0,
    padding: 8,
    // marginBottom: 15
  },
  iconContainer: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 46,
    padding: 1.5833333730697632,
    borderRadius: 2,
  },
  icon: {
    color: 'black',
  },
  textContainer: {
    // backgroundColor: 'blue',
    width: 298,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    color: 'black',
    fontFamily: 'Inter',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 16,
    letterSpacing: 0,
    textAlign: 'left',
  },
});

export default InfoComponent;
