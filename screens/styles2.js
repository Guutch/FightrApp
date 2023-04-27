/* TO-DO Items:
1) Remove redundant text at the start of each object. For example "birthdayfightrText" must be "fightrText" 
2) Clean-up of redundant comments
3) Delete styles.js once all cleaned up 
*/

import { StyleSheet, Dimensions } from 'react-native';

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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const navbarStyles = StyleSheet.create({
  banner: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight * 0.1,
    top: 0, // Add this line
    left: 0, // Add this line
    right: 0, // Add this line
    zIndex: 1000, // Add this line
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fightrText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: screenWidth * 0.1,
    lineHeight: screenHeight * 0.064,
    color: '#FFFFFF',
  },
  backButton: {
    position: 'absolute',
    left: screenWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const firstNameScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // fightrText: {
  //   fontSize: screenWidth * 0.1,
  //   fontWeight: '700',
  //   lineHeight: screenHeight * 0.064,
  //   color: 'black',
  //   position: 'absolute',
  //   left: screenWidth * 0.037,
  //   top: screenHeight * 0.092,
  // },
  questionText: {
    fontSize: screenWidth * 0.06,
    fontWeight: '700',
    lineHeight: screenHeight * 0.038,
    color: 'black',
    position: 'absolute',
    left: screenWidth * 0.037,
    top: screenHeight * 0.15,
  },
  rectangle: {
    backgroundColor: 'black',
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    borderRadius: 40,
    position: 'absolute',
    left: screenWidth * 0.1,
    top: screenHeight * 0.227,
    paddingLeft: screenWidth * 0.04,
    fontSize: screenWidth * 0.04,
    color: 'white',
  },
});
// const bottomButtons = StyleSheet.create({
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     position: 'absolute',
//     bottom: screenHeight * 0.05,
//     width: screenWidth,
//   },
//   button: {
//     backgroundColor: '#000000',
//     paddingHorizontal: screenWidth * 0.1,
//     paddingVertical: screenHeight * 0.015,
//     borderRadius: 5,
//   },
//   buttonText: {
//     fontFamily: 'Inter',
//     fontSize: screenWidth * 0.04,
//     fontWeight: '700',
//     color: 'white',
//   },
// });
const lastNameScreen = StyleSheet.create({
  questionText: {
    fontSize: screenWidth * 0.06,
    fontWeight: '700',
    lineHeight: screenHeight * 0.038,
    color: 'black',
    position: 'absolute',
    left: screenWidth * 0.037,
    top: screenHeight * 0.357,
  },
  rectangle: {
    backgroundColor: 'black',
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    borderRadius: 40,
    position: 'absolute',
    left: screenWidth * 0.1,
    top: screenHeight * 0.427,
    paddingLeft: screenWidth * 0.04,
    fontSize: screenWidth * 0.04,
    color: 'white',
  },
});

const birthdayScreen = StyleSheet.create({
  ...commonStyles,
  birthdaycontainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: screenHeight * 0.1,
  },
  // birthdayfightrText: {
  //   ...commonStyles.firstText,
  //   fontSize: screenWidth * 0.1,
  //   lineHeight: screenHeight * 0.065,
  //   letterSpacing: 0,
  // },
  // birthdayquestionText: {
  //   fontSize: screenWidth * 0.06,
  //   ...commonStyles.firstText,
  //   letterSpacing: 0,
  //   marginTop: screenHeight * 0.02,
  // },
  birthdaydateText: {
    fontFamily: 'Inter',
    fontSize: screenWidth * 0.12,
    fontWeight: '700',
    lineHeight: screenHeight * 0.08,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'black',
    // marginTop: screenHeight * 0.1,
    // left: screenWidth * 0,
    top: screenHeight * 0.14,
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
    fontSize: screenWidth * 0.04,
    fontWeight: '700',
    color: 'white',
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: screenHeight * 0.05,
  },
});

const photosScreen = StyleSheet.create({
  ...commonStyles,
  photoscontainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: screenWidth * 0.05,
  },
  headerContainer: {
    height: screenHeight * 0.25,
  },
  photosrectanglesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: screenHeight * 0.08,

  },
  photosfightrText: {
    fontSize: screenWidth * 0.1,
    fontWeight: '700',
    lineHeight: screenHeight * 0.064,
    color: 'black',
    position: 'absolute',
    left: screenWidth * 0.037,
    top: screenHeight * 0.092,
  },
  photosaddPhotosText: {
    ...commonStyles.firstText,
    fontSize: screenHeight * 0.03,
    top: screenHeight * 0.15,
  },
  icon: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  photosrectangle: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    width: (screenWidth * 0.9) / 3 - screenWidth * 0.03, // Updated width property
    height: screenHeight * 0.15,
    marginBottom: screenHeight * 0.025,
    marginRight: screenWidth * 0.015, // Updated marginRight property
    marginLeft: screenWidth * 0.015, // Added marginLeft property
  },
  photosbutton: {
    backgroundColor: '#000000',
    paddingHorizontal: screenWidth * 0.06,
    paddingVertical: screenHeight * 0.012,
    borderRadius: 5,
    marginVertical: screenHeight * 0.0125,
  },
  photosbuttonText: {
    fontFamily: 'Inter',
    fontSize: screenHeight * 0.02,
    fontWeight: '700',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: screenHeight * 0.0125,
    left: screenWidth * 0.025,
    right: screenWidth * 0.025,
  },
  nextButton: {
    position: 'absolute',
    right: screenWidth * 0.05,
    bottom: screenHeight * 0.05,
    width: screenHeight * 0.1,
    height: screenHeight * 0.1,
    borderRadius: screenHeight * 0.05,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: 'Inter',
    fontSize: screenHeight * 0.02,
    fontWeight: '700',
    color: 'white',
  },
});

const heightWeightScreen = StyleSheet.create({
  heightUnitToggle: {
    position: 'absolute',
    right: screenWidth * 0.1,
    top: screenHeight * 0.33,
    flexDirection: 'row',
  },
  weightUnitToggle: {
    position: 'absolute',
    right: screenWidth * 0.1,
    top: screenHeight * 0.53,
    flexDirection: 'row',
  },
  unitText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeUnit: {
    color: 'black',
  },
  separator: {
    color: 'black',
  },
});

const fightingStyleScreen = StyleSheet.create({
  // Add this to the existing styles
  rectangleText: {
    fontFamily: 'Inter',
    fontSize: screenWidth * 0.06,
    fontWeight: '700',
    lineHeight: screenHeight * 0.036,
    color: 'white',
  },
  firstRectangle: {
    marginTop: screenHeight * 0.05,
  },
  // Level screen
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 18,
  },
  radioButtonInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  // End of level screen
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fightrText: {
    fontSize: screenWidth * 0.1,
    fontWeight: '700',
    lineHeight: screenHeight * 0.064,
    color: 'black',
    position: 'absolute',
    left: screenWidth * 0.037,
    top: screenHeight * 0.092,
  },
  questionText: {
    fontSize: screenWidth * 0.06,
    fontWeight: '700',
    lineHeight: screenHeight * 0.038,
    color: 'black',
    position: 'absolute',
    left: screenWidth * 0.037,
    top: screenHeight * 0.193,
  },
  list: {
    paddingTop: screenHeight * 0.27,
    paddingHorizontal: screenWidth * 0.1,
  },
  rectangle: {
    backgroundColor: 'black',
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: screenWidth * 0.04,
    paddingRight: screenWidth * 0.05,
    marginBottom: screenHeight * 0.02,
  },
  textStyle: {
    fontSize: screenWidth * 0.04,
    fontWeight: '700',
    color: 'white',
  },
  checkBox: {
    width: screenHeight * 0.035,
    height: screenHeight * 0.035,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  checked: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: screenHeight * 0.025,
  },
  photosbutton: {
    backgroundColor: '#000000',
    paddingHorizontal: screenWidth * 0.06,
    paddingVertical: screenHeight * 0.012,
    borderRadius: 5,
    marginVertical: screenHeight * 0.0125,
  },
  photosbuttonText: {
    fontFamily: 'Inter',
    fontSize: screenHeight * 0.02,
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
  lastNameScreen,
  heightWeightScreen,
  birthdayScreen,
  photosScreen,
  fightingStyleScreen,
  fightingLevelScreen,
  navbarStyles,
};
