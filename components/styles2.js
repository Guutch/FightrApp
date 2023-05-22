import { StyleSheet, Dimensions } from 'react-native';

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
  title: {
    ...commonStyles.primaryText,
    ...commonStyles.absolutePosition,
    fontSize: 64,
    lineHeight: 77,
    color: 'white',
    top: 63,
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
    ...commonStyles.buttonStyle,
    paddingHorizontal: 30,
    paddingVertical: 10,
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
    bottom: 30,
    paddingHorizontal: 20,
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

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const navbarStyles = StyleSheet.create({
  banner: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight * 0.1,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fightrText: {
    ...commonStyles.primaryText,
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
  nextButton: {
    position: 'absolute',
    right: screenWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconSize: {
    width: screenWidth * 0.08, // Adjust this value to change the size of the icons
  },
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
    ...commonStyles.buttonStyle,
    backgroundColor: 'blue',
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
    right: screenWidth * 0.1,
    top: screenHeight * 0.56,
  },
  signInButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const firstNameScreen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    top: screenHeight * 0.227,
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
  birthdayTouchable: {
    top: screenHeight * 0.127,
  },
  birthdaydateText: {
    fontFamily: 'Inter',
    fontSize: screenWidth * 0.12,
    fontWeight: '700',
    lineHeight: screenHeight * 0.08,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'black',
  },
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
    position: 'absolute',
    bottom: 0,
    right: 0,
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
const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
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
  navbarStyles,
};
