/* TO-DO Items:
1) Remove redundant text at the start of each object. For example "birthdayfightrText" must be "fightrText" 
2) Clean-up of redundant comments
3) Delete styles.js once all cleaned up 
*/

import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
  fightrText: {
    fontFamily: 'Inter',
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 48,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000',
    position: 'absolute',
    left: 14,
    top: 55,
  },
  firstText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    lineHeight: 29,
    textAlign: 'left',
    color: '#000000',
    position: 'absolute',
    left: 14,
  },
});

const loginScreen = StyleSheet.create({
  /// Start of loginscreen.js styles
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 64,
    fontWeight: '700',
    lineHeight: 77,
    color: 'white',
    position: 'absolute',
    top: 63,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 39,
    color: 'white',
    position: 'absolute',
    top: 169,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  topButton: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 8,
    width: 356.9675,
    height: 60.779438,
  },
  middleButton: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 8,
    width: 356.9675,
    height: 60.779438,
  },
  bottomButton: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 8,
    width: 239.96269,
    height: 40.857495,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  termsAndConditions: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 18,
    textAlign: 'center',
    position: 'absolute',
    bottom: 30, // <-- Changed from 20
    paddingHorizontal: 20,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundColor: 'transparent',
  /// End of index.js styles
});

const firstNameScreen = StyleSheet.create({
  ...commonStyles,
  /// Start of firstname.js styles
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  //   fightrText: {
  //     fontSize: 40,
  //     fontWeight: '700',
  //     lineHeight: 48,
  //     color: 'black',
  //     position: 'absolute',
  //     left: 14,
  //     top: 55,
  //   },
  questionText: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 29,
    color: 'black',
    position: 'absolute',
    left: 14,
    top: 115,
  },
  rectangle: {
    backgroundColor: 'black',
    width: 374.22193,
    height: 60.443413,
    borderRadius: 40,
    position: 'absolute',
    left: 8.072479,
    top: 161,
  },
  rectangle2: {
    backgroundColor: 'red',
    width: 374.22193,
    height: 60.443413,
    borderRadius: 40,
    position: 'absolute',
    left: 8.072479,
    top: 250,
  },
  icon: {
    backgroundColor: 'black',
    width: 34.833332,
    height: 34.833332,
    position: 'absolute',
    left: 1.583328,
    top: 1.583313,
  },
  didYouKnowText: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 29,
    color: 'black',
    position: 'absolute',
    left: 58,
    top: 783,
  },
  ellipse: {
    backgroundColor: '#D9D9D9',
    width: 58,
    height: 59,
    borderRadius: 29.5, // Half of width and height for a perfect ellipse
    position: 'absolute',
    left: 0,
    top: 0,
  },
  /// End of firstname.js styles
});

const birthdayScreen = StyleSheet.create({
  ...commonStyles,
  birthdaycontainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  birthdayfightrText: {
    ...commonStyles.firstText,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: 0,
    top: 60,
  },
  birthdayquestionText: {
    fontSize: 24,
    ...commonStyles.firstText,
    letterSpacing: 0,
    top: 115,

  },
  birthdaydateText: {
    fontFamily: 'Inter',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 58,
    letterSpacing: 0,
    textAlign: 'left',
    position: 'absolute',
    left: 30,
    top: 161,
    color: 'black'
  },
  birthdaybutton: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  birthdaybuttonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  birthdaycontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /// End of birthday.js styles
});

const photosScreen = StyleSheet.create({
  ...commonStyles,
  photoscontainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 18,
  },
  headerContainer: {
    height: 160, // Add this line
  },
  photosrectanglesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 50, // Adjust this value to fit your needs
  },
  photosfightrText: {
    fontFamily: 'Inter',
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 48,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000',
    position: 'absolute',
    left: 14,
    top: 60,
  },
  photosaddPhotosText: {
    ...commonStyles.firstText,
    fontSize: 24,
    top: 115,
  },
  icon: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  // photosrectanglesContainer: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-between',
  //   marginTop: 15,
  // },
  photosrectangle: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    width: 117,
    height: 109,
    marginBottom: 15,
  },
  photosbutton: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  photosbuttonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },

});

const fightingStyleScreen = StyleSheet.create({
  ...commonStyles,
  fightingstylecontainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  fightingstylefightrText: {
    fontFamily: 'Inter',
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 48,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#000000',
    position: 'absolute',
    left: 18,
    top: 61,
  },
  fightingstylesubtitle: {
    ...commonStyles.firstText,
    fontSize: 24,
    top: 115,
    width: 362,
  },
  fightingstylerectangle: {
    backgroundColor: '#000000',
    borderRadius: 40,
    width: 374.2219251726353,
    height: 60.443412997923744,
    position: 'absolute',
    left: 8.072509765625,
    top: 217,
  },
  // Added in textStyle and innerCircle for the text and rectangle elements in the
  // fighting screen + fighting level screen
  textStyle: {
    height: 31,
    width: 268,
    left: 67,
    top: 24,
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 29,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#FFFFFF', // set text color to white
  },
  innerRectangle: {
    height: 35,
    width: 36,
    left: 324,
    top: 13,
    borderRadius: 5,
    backgroundColor: '#000000',
    borderColor: '#000000',
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: '#FFFFFF', // set background color to white
  },
  fightingstylebuttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  fightingstylebutton: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  fightingstylebuttonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },

});

const fightingLevelScreen = StyleSheet.create({
  ...commonStyles,
  fightinglevelcontainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'flex-start',
  },
  fightinglevelfightrText: {
    ...commonStyles.fightrText,
    marginTop: 61,
    marginLeft: 18,
  },
  fightinglevelsubtitle: {
    // ...commonStyles.fightrText,
    // // fontFamily: 'Inter',
    // fontSize: 24,
    // // fontWeight: '700',
    // // lineHeight: 29,
    // // textAlign: 'left',
    // width: 362,
    // marginTop: 115,
    // marginLeft: 28,
    ...commonStyles.firstText,
    fontSize: 24,
    top: 115,
    width: 362,
  },
  fightinglevelrectangle: {
    backgroundColor: 'black',
    width: 374.22,
    height: 60.44,
    borderRadius: 40,
    marginLeft: 10,
    marginTop: 217,
  },
  fightinglevelbuttonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  fightinglevelbutton: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    margin: 5,
  },
  fightinglevelbuttonText: {
    color: 'white',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
  },
});

export {
  loginScreen,
  firstNameScreen,
  birthdayScreen,
  photosScreen,
  fightingStyleScreen,
  fightingLevelScreen,
};
