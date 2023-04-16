import React from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import {firstNameScreen, birthdayScreen} from './styles2';

const Details = ({ navigation, route }) => {

  return (

    <View style={firstNameScreen.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Text style={firstNameScreen.fightrText}>Fightr.</Text>
      <Text style={firstNameScreen.questionText}>What's your first name?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <View style={firstNameScreen.rectangle}></View>
        {/* <Text style={colour = 'red'}>Click to go home</Text> */}
      </TouchableOpacity>
      


      <View style={birthdayScreen.birthdaycontainer}>
        <TouchableOpacity style={birthdayScreen.birthdaybutton} onPress={() => navigation.navigate('Login')}>
          <Text style={birthdayScreen.birthdaybuttonText}>Go to Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={birthdayScreen.birthdaybutton} onPress={() => navigation.navigate('Birthday')}>
          <Text style={birthdayScreen.birthdaybuttonText}>Go to Birthday</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default Details