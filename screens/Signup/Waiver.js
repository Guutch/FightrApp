import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Navbar from '../../components/Navbar';
import boxingIcon from '../../assets/boxing-glove-icon2.png';
import { welcomeStyles, waiverStyles, firstNameScreen } from '../../components/styles2';
import { handleWaiver } from '../../api';
import { useSelector } from 'react-redux';

const WaiverScreen = ({ navigation }) => {

  const userId = useSelector((state) => state.user.userId); // replace 'state.user.userId' with the correct path to the user ID in your Redux state


  const handleAgreement = async () => {
    console.log('User ID:', userId); 
    try {
      await handleWaiver(userId);
      navigation.navigate('MainFlow');
    } catch (error) {  // the error is now defined as 'error'
      console.warn(error);
    }
  }

  return (
    <View style={waiverStyles.container}>
      <Navbar backgroundColor="#000000"
        textColor="#FFFFFF"
        showBackButton={false}
        showNextButton={false}
      />

      
<Image 
  source={boxingIcon} 
  style={[
    waiverStyles.boxingIcon, 
    Platform.OS === 'ios' ? firstNameScreen.iPhone : {}
  ]} 
/>
<View style={Platform.OS === 'ios' ? firstNameScreen.iPhone : {}}>
      <Text style={waiverStyles.welcomeText}>A little waiver before getting started...</Text>

      <View style={waiverStyles.waiverBox}>
        <ScrollView>
          <Text style={{color: 'black'}}>
          This Release for Personal Injury (this "Release") is made on X day of X, 20XX between:
Fytr Ltd at X Address and
Releasee: XX at X Address.
1. ________________________ [Releasor name] and anyone claiming on Releasor’s behalf release and forever discharge ________________________ [Releasee name] and its affiliates, successors and assignees, officers, employees, representatives, partners, agents and anyone claiming through them (collectively, the “Released Parties”), in their individual and/or corporate capacities from any and all causes of action known or unknown, which Releasor has, had, or may in the future have against any of the Released Parties arising out of or relating to the injuries (physical or psychological) sustained by Releasor on ...
________________________ [Releasor name] and anyone claiming on Releasor’s behalf release and forever discharge ________________________ [Releasee name] and its affiliates, successors and assignees, officers, employees, representatives, partners, agents, and anyone claiming through them (collectively, the "Released Parties"), in their individual and/or corporate capacities from any and all causes of action known or unknown, which Releasor has, had, or may in the future have against any of the Released Parties arising out of or relating to the injuries (physical or psychological) sustained by Releasor on the date of ________________________ [insert date].

Releasor acknowledges that participating in the activity/event organized by ________________________ [Releasee name], or utilizing any services provided by the Released Parties, involves certain inherent risks. These risks include, but are not limited to, the risk of accidents, injuries, property damage, or death. Releasor understands and voluntarily assumes all such risks and agrees that the Released Parties shall not be held liable for any resulting harm or damages.

Releasor acknowledges that this Release covers all injuries, losses, or damages, whether known or unknown, anticipated or unanticipated, that may arise as a direct or indirect result of Releasor's participation in the activity/event organized by ________________________ [Releasee name] or utilization of any services provided by the Released Parties.

Releasor agrees to indemnify and hold harmless the Released Parties from and against any and all claims, suits, actions, liabilities, costs, expenses, damages, or demands, including but not limited to attorney's fees, arising out of or in connection with Releasor's participation in the activity/event organized by ________________________ [Releasee name] or utilization of any services provided by the Released Parties.

Releasor represents that they are of lawful age and have read and understand this Release before signing it. Releasor further acknowledges that they are signing this Release freely and voluntarily, without any inducement, coercion, or undue influence.

This Release shall be binding upon Releasor, their heirs, executors, administrators, successors, and assigns. It shall also be binding upon the Released Parties and their respective heirs, executors, administrators, successors, and assigns.

In the event that any provision of this Release is determined to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.

IN WITNESS WHEREOF, Releasor has executed this Release as of the day and year first above written.

Releasor:
________________________ [Releasor name]

Date:
________________________ [Date]

Signed in the presence of:

Witness:
________________________ [Witness name]

Date:
________________________ [Date]
          </Text>
        </ScrollView>
      </View>
      </View>
      <Text style={waiverStyles.termsAndConditions}>By pressing I agree, we will use your provided details to agree to the above waiver..</Text>

      <TouchableOpacity style={waiverStyles.agreeButton} onPress={handleAgreement}>
        <Text style={waiverStyles.agreeButtonText}>I Agree</Text>
      </TouchableOpacity>

      
    </View>
  );
};


export default WaiverScreen;
