// Navbar.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navbarStyles } from './styles2';

// const Navbar = ({ navigation, backNavigation }) => {
//   const handleBackPress = () => {
//     if (backNavigation) {
//       backNavigation();
//     } else {
//       navigation.goBack();
//     }
//   };

//   return (
//     <View style={navbarStyles.banner}>
//       <TouchableOpacity style={navbarStyles.backButton} onPress={handleBackPress}>
//         <Icon name="arrow-left" size={35} color="#FFFFFF" />
//       </TouchableOpacity>
//       <Text style={navbarStyles.fightrText}>Fightr.</Text>
//     </View>
//   );
// };

const Navbar = ({ navigation }) => {
    return (
        <View style={navbarStyles.banner}>
            <TouchableOpacity style={navbarStyles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={30} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={navbarStyles.fightrText}>Fightr.</Text>
        </View>
    );
};

export default Navbar;
