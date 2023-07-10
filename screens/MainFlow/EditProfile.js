import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Navbar from '../../components/Navbar';
import { settingsStyles, welcomeStyles } from '../../components/styles2';
import { fetchEditProfileData } from '../../api';
import { useSelector } from 'react-redux';

const SettingSection = ({ title, onPress, titleInsideRectangle = false, data }) => {
    return (
        <View style={settingsStyles.sectionContainer}>
            {titleInsideRectangle ? null : <Text style={settingsStyles.sectionTitle}>{title}</Text>}
            <TouchableOpacity
                style={[
                    settingsStyles.sectionRectangle,
                    titleInsideRectangle ? { justifyContent: 'center', alignItems: 'center' } : null
                ]}
                onPress={onPress}
            >
                {data ?
                    <Text style={settingsStyles.preferenceText}>{data}</Text>
                    : <Text style={settingsStyles.preferenceText}>Loading...</Text>
                }
            </TouchableOpacity>
        </View>
    );
};

const EditProfileScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    const [heightUnit, setHeightUnit] = useState('');
    const [weightUnit, setWeightUnit] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [fightingLevel, setFightingLevel] = useState('');
    const [fightingStyle, setFightingStyle] = useState('');
    const [value, onChangeText] = useState('');

    const userId = useSelector(state => state.user);  // Gets the userId from the Redux state

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchEditProfileData(userId.userId);
            // console.log(data);

            if (data && data.firstName) {
                setFirstName(data.firstName)
            }
            if (data && data.lastName) {
                setLastName(data.lastName)
            }
            // Will need API (Google maps/OSM) to convert from coordinates to city/town
            if (data && data.location) {
                setLocation(data.location)
                console.log(location)
            }
            if (data && data.heightUnit) {
                setHeightUnit(data.heightUnit)
            }
            if (data && data.weightUnit) {
                setWeightUnit(data.weightUnit)
            }
            if (data && data.height) {
                setHeight(data.height);
                console.log(data.height)
            }
            if (data && data.weight) {
                setWeight(data.weight)
            }
            if (data && data.fightingStyle) {
                setFightingStyle(data.fightingStyle.join(', '));
            }
            if (data && data.fightingLevel) {
                setFightingLevel(data.fightingLevel);
            }

        };
        fetchData();
    }, [userId]);

    //   const onSelect = () => {
    //     // Implement the logic for the onSelect function here
    //     console.log('Button pressed!');
    //   };

    return (
        <View>
            <Navbar
                backgroundColor="#000000"
                textColor="#FFFFFF"
                showBackButton={true}
                navigation={navigation}  // Here we pass navigation as a prop to Navbar
                title="Edit Profile"  // Here's the custom title
            />
            <ScrollView contentContainerStyle={settingsStyles.container}>

                <SettingSection title="Name" onPress={() => navigation.navigate('SomeScreen')} data={`${firstName} ${lastName}`} />
                <SettingSection title="Fighting Style(s)" onPress={() => navigation.navigate('SomeScreen')} data={fightingStyle} />
                <SettingSection title="Fighting Level" onPress={() => navigation.navigate('SomeScreen')} data={fightingLevel} />
                <SettingSection title="Height" onPress={() => navigation.navigate('SomeScreen')} data={`${height} ${heightUnit}`} />
                <SettingSection title="Weight" onPress={() => navigation.navigate('SomeScreen')} data={`${weight} ${weightUnit}`} />
                <SettingSection title="Location" onPress={() => navigation.navigate('SomeScreen')} />
                <SettingSection title="Weight Class" onPress={() => navigation.navigate('SomeScreen')} />
                <SettingSection title="Years Experience" onPress={() => navigation.navigate('SomeScreen')} />
                <Text style={settingsStyles.sectionTitle}>Bio (Not connected/Doesn't work)</Text>
                {/* Doesn't work */}
                <View style={settingsStyles.sectionContainer}
                    style={{
                        backgroundColor: value,
                        borderColor: '#000000',
                        borderWidth: 1,
                    }}>
                    <TextInput
                        editable
                        multiline
                        // numberOfLines={4}
                        maxLength={40}
                        onChangeText={text => onChangeText(text)}
                        value={value}
                        style={{ padding: 40 }}
                    />
                </View>
            </ScrollView>


        </View>
    );
};

export default EditProfileScreen;
