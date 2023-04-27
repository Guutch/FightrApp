import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles';

const Home = ({ navigation }) => {

    return (
        <View style={styles.container}>
            {/* <StatusBar backgroundColor="black" barStyle="light-content" /> */}
            {/* <Video source={require('./assets/pexels.mp4')} style={styles.video} repeat={true} resizeMode='cover' /> */}
            <Text style={styles.title}>Fightr.</Text>
            <Text style={styles.subtitle}>The Game's The Game</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.topButton} onPress={() => console.log('Continue with Apple')}>
                    <Text style={styles.buttonText}>Continue with Apple</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.middleButton} onPress={() => console.log('Continue with Google')}>
                    <Text style={styles.buttonText}>Continue with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('FirstName', { name: 'Full Stack Dev', age: 25, email: 'test@test.com' })}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.termsAndConditions}>
                By proceeding, you consent to our terms and conditions. See <Text style={styles.linkText}>Terms and Conditions</Text> here.
            </Text>
        </View>
    )
}

export default Home