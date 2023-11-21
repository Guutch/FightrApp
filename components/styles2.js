import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const commonStyles = StyleSheet.create({
  absolutePosition: {
    position: 'absolute',
  },
  primaryText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    color: 'black',
  },
  buttonStyle: {
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#000000',
    marginBottom: 8,
  },
});


const loginScreen = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  buttonContainer: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    bottom: 80, // Adjust this value to position the button above the terms text
  },
  title: {
    ...commonStyles.primaryText,
    ...commonStyles.absolutePosition,
    fontSize: 64,
    lineHeight: 77,
    color: 'white',
    top: 63,
  },
  fytrImg: {
    position: 'absolute',
    top: 43,
    resizeMode: 'contain',
},

  subtitle: {
    ...commonStyles.primaryText,
    ...commonStyles.absolutePosition,
    fontSize: 32,
    lineHeight: 39,
    color: 'white',
    top: 169,
  },
  topButton: {
    ...commonStyles.buttonStyle,
    width: 356.9675,
    height: 60.779438,
  },
  middleButton: {
    ...commonStyles.buttonStyle,
    width: 356.9675,
    height: 60.779438,
  },
  bottomButton: {
    // Inherits commonStyles.buttonStyle, if there's anything to add or override, do it here
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: '80%', // Width set to 80% of the screen width, adjust as needed
    height: 50, // Adjust the height as needed
    backgroundColor: 'white', // Set the button color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40, // Rounded corners
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  termsAndConditions: {
    fontSize: 12, // Adjust the font size as needed
    color: 'white',
    position: 'absolute',
    bottom: 30, // Adjust this value to control the distance from the bottom of the screen
    paddingHorizontal: 20, // Side padding for longer texts
    textAlign: 'center',
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundColor: 'transparent',
});



const navbarStyles = StyleSheet.create({
  banner: {
    position: 'absolute',
    width: screenWidth,
    // paddingTop: screenHeight * 0.01,
    height: screenHeight * 0.1, // Need to fiddle with this. Doesn't work for islands
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  banneriPhone: {
    height: screenHeight * 0.13
  },
  fightrText: {
    ...commonStyles.primaryText,
    fontSize: screenWidth * 0.075,
    lineHeight: screenHeight * 0.064,
    color: '#FFFFFF',
  },
  logoStyle: {
    // transform: [{scale: 0.8}],
    // position: 'absolute',
  // left: screenWidth * 0.05, // You might need to adjust this value
  // top: "50%", // Adjust this value to align it vertically
  // marginTop: -25, // Half of your image height after scale to center it
  },
  backButton: {
    position: 'absolute',
    left: screenWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    position: 'absolute',
    right: screenWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: screenWidth * 0.05,
  },

  homeNextButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 10, // add space to the right of the icon
  },

  iconSize: {
    width: screenWidth * 0.08, // Adjust this value to change the size of the icons
  },
});


const notificationStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainContainer: {
    paddingTop: screenHeight * 0.1
  },
  notificationItem: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50
  },
  textContainer: {
    marginLeft: 10
  },
  titleText: {
    fontWeight: 'bold'
  }
});

const emailLogin = StyleSheet.create({
  forgottenPasswordText: {
    color: 'grey',
    position: 'absolute',
    left: screenWidth * 0.1,
    top: screenHeight * 0.57,
  },
  signUpContainer: {
    alignItems: 'center', // center the child element horizontally
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: screenHeight * 0.075, // adjust the top position to move it up slightly
  },
  signUpText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  signInButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    left: screenWidth * 0.278,
    top: screenHeight * 0.5,
  },
  signInButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

const firstNameScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iPhone: {
    marginTop: 25
  },
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
    top: screenHeight * 0.205,
    paddingLeft: screenWidth * 0.04,
    fontSize: screenWidth * 0.04,
    color: 'white',
  },
});
const lastNameScreen = StyleSheet.create({
  questionText: {
    fontSize: screenWidth * 0.06,
    fontWeight: '700',
    lineHeight: screenHeight * 0.038,
    color: 'black',
    position: 'absolute',
    left: screenWidth * 0.037,
    top: screenHeight * 0.325,
  },
  rectangle: {
    backgroundColor: 'black',
    width: screenWidth * 0.8,
    height: screenHeight * 0.1,
    borderRadius: 40,
    position: 'absolute',
    left: screenWidth * 0.1,
    top: screenHeight * 0.38,
    paddingLeft: screenWidth * 0.04,
    fontSize: screenWidth * 0.04,
    color: 'white',
    justifyContent: 'center'
  },
  rectangleText: {
    //  alignItems: 'center', 
    fontSize: screenWidth * 0.04,
    color: 'white',
  }
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
  birthdayTouchable: {
    // backgroundColor: 'red',
    justifyContent: 'center', // This will center the text vertically within the touchable
    alignItems: 'center', // This will center the text horizontally within the touchable
    width: "80%", // Set the width of the button
    height: screenHeight * 0.075, // You might need to adjust this value based on your design needs
    top: screenHeight * 0.08, // Keep the touchable at the desired position from the top
    alignSelf: 'center', // This will center the touchable horizontally within its parent
  },
  
  birthdaydateText: {
    fontFamily: 'Inter',
    fontSize: screenWidth * 0.12,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center', // Ensures the text is centered within the touchable
  },
  sexPicker: {
    color: "green"
    // width: 100,
    //   height: screenHeight * 0.1,
    // top: 0,
    // right: 0
  },
  // rectangle: {
  //   backgroundColor: 'black',
  //   width: screenWidth * 0.8,
  //   height: screenHeight * 0.1,
  //   borderRadius: 40,
  //   position: 'absolute',
  //   left: screenWidth * 0.1,
  //   top: screenHeight * 0.427,
  //   paddingLeft: screenWidth * 0.04,
  //   fontSize: screenWidth * 0.04,
  //   color: 'white',
  // },

  birthdaybutton: {
    ...commonStyles.buttonStyle,
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
    height: screenHeight * 0.11,
  },
  photosrectanglesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: screenHeight * 0.08,
    backgroundColor: "blue"
  },
  questionText: {
    fontSize: screenWidth * 0.06,
    fontWeight: '700',
    lineHeight: screenHeight * 0.038,
    color: 'black',
    position: 'absolute',
    paddingTop: screenHeight * 0.01,
    // left: screenWidth * 0.02,
    // top: screenHeight * 0.15,
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
    width: (screenWidth * 0.8) / 2 - screenWidth * 0.04, // Updated width property
    height: screenHeight * 0.15,
    marginBottom: screenHeight * 0.025,
    marginRight: screenWidth * 0.015, // Updated marginRight property
    marginLeft: screenWidth * 0.015, // Added marginLeft property
  },
  extendedPhotosRectangle: {
    height: screenHeight * 0.2,
    width: screenWidth * 0.35, // Updated width property
    borderRadius: 20,
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
  flatListStyle: {
    marginTop: 10,
    // backgroundColor: "red",
    paddingTop: 10,
    // height: screenHeight * 0.15,
    // flexGrow: 0
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
    right: screenWidth * 0.03,
    bottom: screenHeight * 0.03,
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
  deleteIcon: {
    zIndex: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

const heightWeightScreen = StyleSheet.create({
  heightUnitToggle: {
    position: 'absolute',
    right: screenWidth * 0.1,
    top: screenHeight * 0.31,
    flexDirection: 'row',
  },
  weightUnitToggle: {
    position: 'absolute',
    right: screenWidth * 0.1,
    top: screenHeight * 0.49,
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
    // top: screenHeight * 0.193,
    paddingTop: screenHeight * 0.02,
    // paddingTop: screenHeight * 0.02,
  },
  list: {
    alignItems: "center",
    paddingTop: screenHeight * 0.06,
  },
  listLevel: {
    paddingTop: screenHeight * 0.03, // Overwrites or adds properties
  },
  
  listPrefSel: {
    alignItems: "center",
    paddingTop: screenHeight * 0.07,
    marginTop: screenHeight * 0.11,
    paddingBottom: screenHeight * 0.11
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
const signUpLocation = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#000',
    borderRadius: 100,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.25,
  },
  textContainer: {
    marginTop: screenHeight * 0.075,
    marginBottom: screenHeight * 0.075,
  },
  mainText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: screenHeight * 0.02,
    width: screenWidth * 0.8,
  },
  subText: {
    fontSize: 20,
    color: 'darkgrey',
    textAlign: 'center',
    width: screenWidth * 0.8,
  },
  enableLocationButton: {
    backgroundColor: 'blue',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: screenHeight * 0.1,
    alignSelf: 'center',
    width: screenWidth * 0.8,
  },
  enableLocationButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

const waiverStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start', // Align items from the start
  },
  boxingIcon: {
    position: 'absolute',
    top: screenHeight * 0.12,  // responsive top position
    // left: screenWidth * 0.435,  // responsive left position
    height: screenHeight * 0.06,  // responsive height
    width: screenWidth * 0.12,  // responsive width
  },
  welcomeText: {
    marginTop: screenHeight * 0.185,
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  waiverBox: {
    width: 349,
    height: 415,
    marginTop: 10, // Adjust as needed
    marginBottom: 10, // Adjust as needed
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'grey',
    padding: 10, // Add some padding
  },
  agreeButton: {
    marginBottom: screenHeight * 0.02,
    height: screenHeight * 0.08,  // responsive height
    width: screenWidth * 0.67,  // responsive width
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  termsAndConditions: {
    marginBottom: screenHeight * 0.01,
    width: screenWidth * 0.7,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
  },
  agreeButtonText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
  },
  // Rest of your styles
});

const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  boxingIcon: {
    position: 'absolute',
    top: screenHeight * 0.15,  // responsive top position
    // left: screenWidth * 0.435,  // responsive left position
    height: screenHeight * 0.06,  // responsive height
    width: screenWidth * 0.12,  // responsive width
  },
  welcomeText: {
    marginTop: screenHeight * 0.205,
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  waiverBox: {
    width: 349,
    height: 415,
    position: 'absolute',
    top: 294,
    left: 23,
  },
  subText: {
    width: screenWidth * 0.7,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
  },
  rulesContainer: {
    marginTop: screenHeight * 0.02,
    alignSelf: 'flex-start',
    marginLeft: 25,
    width: screenWidth * 0.8,
  },
  rule: {
    flexDirection: 'row',
    marginBottom: screenHeight * 0.03,
    alignItems: 'flex-start',
    // backgroundColor: 'red', // Keep this if you want to see the boundary
  },
  tickIcon: {
    marginRight: screenWidth * 0.03,
    height: screenHeight * 0.042,  // responsive height
    width: screenWidth * 0.08,  // responsive width
    // height: 30,
    // width: 30,
  },
  ruleTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  ruleText: {
    marginTop: screenHeight * 0.01,
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
  avoidText: {
    position: 'absolute',
    textAlign: 'center',
    width: screenWidth * 0.7, // adjust this as needed
    left: screenWidth * 0.175, // adjust this as needed
    top: screenHeight * 0.48, // adjust this as needed
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14, // adjust this as needed
    // fontSize: screenHeight * 0.02, // adjust this as needed
    // lineHeight: screenHeight * 0.025, // adjust this as needed
    color: '#000000',
  },

  termsAndConditions: {
    marginBottom: screenHeight * 0.01,
    width: screenWidth * 0.7,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
  },
  agreeButton: {
    marginBottom: screenHeight * 0.02,
    height: screenHeight * 0.08,  // responsive height
    width: screenWidth * 0.67,  // responsive width
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  agreeButtonText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
  },
  ruleContent: {
    width: '85%', // adjust this as needed
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },
  underline: {
    textDecorationLine: 'underline',
  },
});

const settingsStyles = StyleSheet.create({
  container: {
    paddingTop: screenHeight * 0.1, // this adds padding on top equal to navbar height
    padding: 20, // this can be adjusted as needed
    // height: screenHeight,
    // backgroundColor: "red",
  },
  fytrPlus: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 24,
    color: '#000000',
    marginTop: 20,
    marginBottom: 20, // adjust as needed
  },
  sectionContainer: {
    marginBottom: 20, // adjust as needed
  },
  sectionTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 18,
    color: '#000000',
    // marginBottom: 10, // adjust as needed
  },
  preferenceText: {
    color: 'white'
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleAndValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  sectionRectangle: {
    width: '100%',
    height: 45,
    backgroundColor: '#000000',
    borderRadius: 40,
    marginTop: 10,
    justifyContent: 'center',  // center items vertically
    alignItems: 'flex-start',  // align items to the left
    paddingLeft: 10  // padding on the left
  },
  sectionHeightRec: {
    width: '98%', // Adjust the width to fit two in a row
    height: 45,
    backgroundColor: '#000000',
    borderRadius: 40,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },

  insideRectangleText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 18,
    color: '#ffffff'  // white color
  },
  slider: {
    marginTop: 20,
  },
  sliderValue: {
    fontSize: 15, // adjust this as needed
    lineHeight: 18, // adjust this as needed
    color: '#000000', // adjust this as needed
  },
  sliderMarker: {
    height: 15,
    width: 15,
    borderRadius: 15,
    backgroundColor: 'black',
  },
  sliderTrack: {
    height: 5,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  unitToggle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  metricsMargin: {
    marginBottom: 10
  },
  unitText: {
    color: 'grey',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 25,
    lineHeight: 24,
    paddingTop: 2,
    color: '#000000',
    // alignSelf: 'center',  // to center the title horizontally
    marginVertical: 10,  // adds spacing above and below the title
  },
  activeUnit: {
    color: 'black',
  },
  separator: {
    color: 'black',
    marginHorizontal: 5, // Added for spacing between units
  },
});

const swipingStyles = StyleSheet.create({
  firstContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: screenHeight * 0.1,
    // backgroundColor: '#000' // black background
  },
  firstiPhoneContainer: {
    // height: '70%',
    // paddingTop: screenHeight * 0.35,
  },
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: screenHeight * 0.1, // this adds padding on top equal to navbar height
    padding: 20, // this can be adjusted as needed
    // backgroundColor: '#000' // black background
  },
  cardImage: {
    width: screenWidth * 0.92,
    // height: screenHeight * 0.78, looks nice on iPhone (15)
    height: screenHeight * 0.82,
    resizeMode: "cover",
    borderRadius: 20,
  },
  cardContainer: {
    position: 'absolute',
    paddingTop: screenHeight * 0.03,
    // width: screenWidth * 0.92,
    height: screenHeight * 0.82,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: screenHeight * 0.02,
  },
  card1: {
    position: 'absolute',
    width: '95%', // Adjust as per your requirement
    height: '10%', // Adjust as per your requirement
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% opaque black
    borderRadius: 10,
    bottom: 0, // Makes the card hug the bottom of the cardContainer
    alignSelf: 'center', // This will center the card horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% opaque black
  },
  card2: {
    position: 'absolute',
    width: '90%', // Adjust as per your requirement
    height: '23%', // Adjust as per your requirement
    backgroundColor: 'rgba(137, 137, 137, 0.5)', // 50% opaque gray
    borderRadius: 10,
    // marginBotton: 20,
    bottom: '10%', // Position from the bottom of the cardContainer. Adjust this to position card2 above card1
    alignSelf: 'center', // This will center the card horizontally
  },

  userInfoText: {
    fontSize: 38,
    color: '#000000',
    fontWeight: '700',
  },
  weightTextContainer: {
    backgroundColor: '#fff', // white background
    borderRadius: 15, // rounded corners
    paddingHorizontal: 5, // padding on the sides
    paddingVertical: 2, // padding on the top and bottom
    alignSelf: 'flex-start', // make the container only as wide as the text
  },
  weightText: {
    fontSize: 18,
    color: '#000', // black
    fontWeight: 'bold', // bold text
    // remove padding and background color from here
  },
  fightingStylesContainer: {
    flexDirection: 'row', // display styles in a row
    flexWrap: 'wrap', // allow wrapping to the next line
  },
  fightingStyleText: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingVertical: 2,
    marginRight: 5,
    marginTop: 5,
    color: '#fff', // white
    backgroundColor: '#000', // black background
    borderRadius: 15, // rounded corners
    fontWeight: 'bold', // bold text
    fontSize: 18,
  },

  xxxText: {
    color: '#000', // black
    fontSize: 16,
    paddingLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    color: '#000',
  },
  missedMatchAlert: {
    position: 'absolute',
    borderRadius: 15, // rounded corners
    width: '102.8%',
    height: '40%',
    backgroundColor: '#FF4D00',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  missedMatchAlertTitle: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    color: '#fff',
    textAlign: 'center',

  },
  missedMatchAlertSubtitle: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 17,
    color: '#fff',
    textAlign: 'center',
  },
  // progressBarContainer: {
  //   width: screenWidth * 0.95,
  //   height: 4,
  //   backgroundColor: '#D9D9D9',
  //   borderRadius: 2,
  //   alignSelf: 'center',
  //   position: 'absolute', // This will allow the progress bar to overlay the image
  //   top: 0, // This will position the progress bar at the top of the container
  // },

  gameOnText: {
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: 40,
    fontWeight: '700',
    lineHeight: 40,
    textAlign: 'center',
    textShadowColor: 'black', // Shadow color
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 1
  },
  
  matchText: {
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: 40,
    fontWeight: '400', // Less weight for thinner text
    lineHeight: 40,
    textAlign: 'center',
    textShadowColor: 'black', // Shadow color
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 1
  },
  
  keepSwipingText: {
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
    color: '#8AFF9D', // the same color as the green arrow
    position: 'absolute',
    bottom: screenHeight * 0.03, // adjust this as needed
    alignSelf: 'center',
  },

  previewProfileButton: {
    width: '90%',
    height: 45,
    backgroundColor: '#FAF4F4',
    borderRadius: 40,
    marginTop: 10,
    justifyContent: 'center',  // center items vertically
    alignItems: 'flex-start',  // align items to the left
    paddingLeft: 10, // padding on the left
    position: 'absolute',
    height: screenHeight * 0.032,
    top: screenHeight * 0.64, // adjust this as needed
    left: screenWidth * 0.031, // adjust this as needed
    // marginVertical: 50,
  },

  sendMessageContainer: {
    width: '90%',
    height: 45,
    backgroundColor: '#FAF4F4',
    borderRadius: 40,
    marginTop: 10,
    justifyContent: 'center',  // center items vertically
    alignItems: 'flex-start',  // align items to the left
    paddingLeft: 10, // padding on the left
    position: 'absolute',
    height: screenHeight * 0.032,
    top: screenHeight * 0.68, // adjust this as needed
    left: screenWidth * 0.031, // adjust this as needed
  },


  sendMessageInput: {
    flex: 1,
    color: '#000', // change this to the color you want
  },

  sendButton: {
    marginLeft: 10,
  },
  previewProfileText: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 18,
    color: '#000'  // black color
  },
  sendButtonText: {
    fontFamily: 'Inter',
    fontSize: 16, // adjust this as needed
    fontWeight: '700',
    lineHeight: 24,
    color: '#fff', // change this to the color you want
  },
});

const noUsersStyles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#0f0f0f",
  },
  cardImage: {
    ...swipingStyles.cardImage,
    justifyContent: 'space-around', // Change this to space-around
    alignItems: 'center',
    paddingVertical: 100, // Add some padding
    backgroundColor: 'red',
    // marginBottom: 40,
  },
  noUsersText: {
    fontFamily: 'Inter',
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 44,
    color: '#fff',
    textAlign: 'center',
  },
  worldIcon: {
    textAlign: 'center',
  },
  preferencesText: {
    fontFamily: 'Inter',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 29,
    color: '#fff',
    textAlign: 'center',
  },
  rectangle: {
    width: screenWidth * 0.8,
    height: 45,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
  },
  sectionRectangle: {
    width: '100%',
    height: 45,
    backgroundColor: '#000000',
    borderRadius: 40,
    marginTop: 10,
    justifyContent: 'center',  // center items vertically
    alignItems: 'flex-start',  // align items to the left
    paddingLeft: 10  // padding on the left
  },
  insideRectangleText: {
    color: '#ffffff',  // white color
    fontFamily: 'Inter',
    fontSize: screenWidth * 0.06,
    fontWeight: '700',
    lineHeight: screenHeight * 0.036,
  },
});

const progressBarStyles = StyleSheet.create({
  progressBarContainer: {
    width: screenWidth * 0.95,
    height: 4,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: screenHeight * 0.11,
  },
  progressBarContainerInsideCard: {
    position: 'absolute',
    top: 0,
    width: screenWidth * 0.85,
    height: 4,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 11,
    zIndex: 2,
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
  },
});

const styles = StyleSheet.create({
  container: {
    paddingTop: screenHeight * 0.11,
    // height: screenHeight,
    // backgroundColor: "red",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 115 * screenHeight / 812,
  },
  text: {
    marginVertical: 10,
    fontFamily: 'Inter',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38.73,
    color: '#000',
    textAlign: 'center',

  }
});

const photoSelector = StyleSheet.create({
  mainContainer: {
    width: screenWidth * 0.95, // 98% of screen width
    height: screenHeight * 0.45, // 45% of screen height
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
  },
  mainContainerEdit: {
    width: screenWidth * 0.95, // 98% of screen width
    height: screenHeight * 0.35, // 45% of screen height
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#D9D9D9',
  },
  image: {
    width: screenWidth * 0.95,
    height: screenHeight * 0.45,
    borderRadius: 20,
    alignSelf: 'center',
  },
  imageEdit: {
    width: screenWidth * 0.95,
    height: screenHeight * 0.35, // Smaller height for edit profile screen
    borderRadius: 20,
    alignSelf: 'center',
  },
  profilePictureLabel: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 5,
  },
  profilePictureText: {
    color: 'black',
  },
});

const matchedUsersInterface = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: screenHeight * 0.11,
    
  },
  rtMsgCont: {
    flex: 1,
    paddingTop: 0,
    marginBottom: screenHeight * 0.08,
    justifyContent: 'flex-end'
  },
  centeredTextContainer: {
    flex: 1,
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainText: {
    fontSize: screenHeight * 0.03, // Responsive font size
  },
  subText: {
    fontSize: screenHeight * 0.0225, // Responsive font size
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    height: screenHeight * 0.05, // Responsive height
    borderRadius: screenHeight * 0.05, // Responsive border radius
    backgroundColor: '#D9D9D9',
    borderColor: '#FAF4F4',
    borderWidth: 1,
    position: 'absolute',
    bottom: screenHeight * 0.02, // Responsive position
    alignSelf: 'center'
  },
  matchesAndMessages: {
    fontSize: screenHeight * 0.025, // Responsive font size
    marginLeft: screenWidth * 0.025
  },
  textInput: {
    flex: 0.8,
    paddingLeft: screenWidth * 0.04, // Responsive padding
  },
  sendText: {
    flex: 0.2,
    textAlign: 'center',
    color: '#000',
    fontSize: screenHeight * 0.02, // Responsive font size
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: screenHeight * 0.01, // Responsive padding
  },
  profilePicture: {
    width: screenWidth * 0.12, // Responsive width
    height: screenWidth * 0.12, // Responsive height, keeping aspect ratio
    borderRadius: screenWidth * 0.06, // Responsive border radius
    marginRight: screenWidth * 0.025,
  },
  senderName: {
    fontWeight: 'bold',
    fontSize: screenHeight * 0.02, // Responsive font size
  },
  lastMessage: {
    maxWidth: screenWidth * 0.5, // Responsive max width
  },
  redDot: {
    width: screenWidth * 0.025, // Responsive width
    height: screenWidth * 0.025, // Responsive height
    borderRadius: 50,
    backgroundColor: 'red',
    position: 'absolute',
    left: screenWidth * 0.015,
    top: screenHeight * 0.001,
  },
  matchedMainContainer: {
    flex: 1, 
    backgroundColor: '#fff'
  },
  matchedMessageItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: screenHeight * 0.02, // Responsive padding
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    width: '95%',
    alignSelf: 'center',
    marginBottom: screenHeight * 0.005, // Responsive margin
  },
  matchedMessageItemImage: {
    width: screenWidth * 0.175, // Responsive width
    height: screenWidth * 0.175, // Responsive height, keeping aspect ratio
    borderRadius: screenWidth * 0.0875, // Responsive border radius
  },
  matchedMessageItemTextContainer: {
    marginLeft: screenWidth * 0.025,
  },
  matchedMessageItemName: {
    fontSize: screenHeight * 0.025, // Responsive font size
    fontWeight: 'bold', 
    color: '#000'
  },
  matchedMessageItemText: {
    fontSize: screenHeight * 0.0175, // Responsive font size
    color: '#000'
  },
  matchedMessagesSection: {
    flex: 0.7, 
    paddingTop: screenHeight * 0.0125, // Responsive padding
  },
});



const popUpStyles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    // marginTop: 15,    
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const chatMessageStyles = StyleSheet.create({
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: 'grey',
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: 'blue',
  },
  messageText: {
    color: 'white',
  },
});


export {
  loginScreen,
  emailLogin,
  firstNameScreen,
  lastNameScreen,
  heightWeightScreen,
  birthdayScreen,
  photosScreen,
  fightingStyleScreen,
  fightingLevelScreen,
  signUpLocation,
  welcomeStyles,
  waiverStyles,
  settingsStyles,
  swipingStyles,
  navbarStyles,
  noUsersStyles,
  progressBarStyles,
  photoSelector,
  styles,
  matchedUsersInterface,
  popUpStyles,
  chatMessageStyles,
  notificationStyles,
};
