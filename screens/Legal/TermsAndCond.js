import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Navbar from '../../components/Navbar';
import boxingIcon from '../../assets/boxing-glove-icon2.png';
import tickIcon from '../../assets/FightrTick.png';
import { welcomeStyles, settingsStyles } from '../../components/styles2';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
    title: {
        color: "black",
      fontFamily: 'Inter',
      fontSize: 32,
      fontWeight: '700',
      lineHeight: 39,
      textAlign: 'left',
      marginBottom: 10,
      marginLeft: 11,
    },
    subtitle: {
        color: "black",
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 19,
      textAlign: 'left',
      marginBottom: 20,
      marginLeft: 11,
    },
    scrollContainer: {
      paddingHorizontal: 11,
    },
    scrollText: {
        color: "black",
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 19,
      textAlign: 'left',
      marginBottom: 100
    },
  });

const TermsAndCond = ({ navigation }) => {
  return (
    <View style={settingsStyles.container}>
      <Navbar
      navigation={navigation}
        backgroundColor="#000000"
        textColor="#FFFFFF"
        showBackButton={true}
        showNextButton={false}
        homeStyle={false}
      />
      <Text style={styles.title}>TERMS OF USE</Text>
      <Text style={styles.subtitle}>Last revised 24 April 2023</Text>
      <ScrollView style={styles.scrollContainer}>
      <Text style={styles.scrollText}>
  {"Table of contents\n\n" +
  "1. Acceptance of Terms of Use Agreement\n" +
  "2. Eligibility\n" +
  "3. Your Account\n" +
  "4. Modifying the Service and Termination\n" +
  "5. Safety\n" +
  "6. Your Rights\n" +
  "7. Community Rules\n" +
  "8. Other Member’s Content\n" +
  "9. In-App Purchases\n" +
  "10. Notice and Procedure for Making Claims of Copyright Infringement\n" +
  "11. Disclaimers\n" +
  "12. Third Party Services\n" +
  "13. Limitation of Liability\n" +
  "14. Arbitration, Class-Action Waiver, and Jury Waiver\n" +
  "15. Governing Law\n" +
  "16. Venue\n" +
  "17. Indemnity by You\n" +
  "18. Entire Agreement; Other.\n\n" +
    "ACCEPTANCE OF TERMS OF USE AGREEMENT\n\n" +
    "\n" +
    "Welcome to our platform. This Terms of Use Agreement (\"Agreement\") constitutes a legally binding agreement between you and [Company Name]. By accessing or using our platform, you agree to be bound by this Agreement and any additional terms and conditions incorporated by reference herein. Please read this Agreement carefully before accessing or using our platform.\n\n" +
    "\n" +
    "ELIGIBILITY\n\n" +
    "\n" +
    "You must be at least 18 years old and have the legal capacity to enter into contracts to access or use our platform. By accessing or using our platform, you represent and warrant that you meet these eligibility requirements.\n\n" +
    "\n" +
    "YOUR ACCOUNT\n\n" +
    "\n" +
    "To access certain features of our platform, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when creating an account and to promptly update any information that may have changed.\n\n" +
    "\n" +
    "MODIFYING THE SERVICE AND TERMINATION\n\n" +
    "\n" +
    "We reserve the right to modify or discontinue our platform, in whole or in part, at any time and without prior notice. We may also terminate or suspend your access to our platform for any reason, including without limitation, if you violate any provision of this Agreement.\n\n" +
    "\n" +
    "SAFETY\n\n" +
    "\n" +
    "Your safety is important to us. While using our platform, you agree to exercise caution and comply with all applicable laws and regulations. You acknowledge that we cannot guarantee the safety or security of our platform or the information transmitted through it.\n\n" +
    "\n" +
    "YOUR RIGHTS\n\n" +
    "\n" +
    "By using our platform, you retain any rights you have in your own content. However, by submitting or posting content on our platform, you grant us a non-exclusive, royalty-free, worldwide, perpetual, and irrevocable license to use, reproduce, modify, adapt, publish, distribute, and display such content in connection with our platform.\n\n" +
    "\n" +
    "COMMUNITY RULES\n\n" +
    "\n" +
    "You agree to abide by our community rules while using our platform. These rules include, but are not limited to, refraining from engaging in any illegal, harmful, or abusive behavior, respecting the rights of others, and refraining from posting or transmitting any content that violates any applicable laws or regulations.\n\n" +
    "\n" +
    "OTHER MEMBER'S CONTENT\n\n" +
    "\n" +
    "Our platform may contain content submitted by other members. We do not endorse, guarantee, or assume any responsibility for the accuracy, reliability, or legality of such content. You acknowledge that any reliance on such content is at your own risk.\n\n" +
    "\n" +
    "IN-APP PURCHASES\n\n" +
    "\n" +
    "Our platform may offer in-app purchases. If you choose to make such purchases, you agree to pay all applicable fees and taxes and to comply with any additional terms and conditions imposed by the relevant app store or payment processor.\n\n" +
    "\n" +
    "NOTICE AND PROCEDURE FOR MAKING CLAIMS OF COPYRIGHT INFRINGEMENT\n\n" +
    "\n" +
    "If you believe that any content on our platform infringes your copyright, please follow our designated procedure for reporting copyright infringement as outlined in our Copyright Policy.\n\n" +
    "\n" +
    "DISCLAIMERS\n\n" +
    "\n" +
    "Our platform is provided on an \"as is\" and \"as available\" basis, without warranties of any kind, whether express or implied. We do not warrant that our platform will be uninterrupted, error-free, or secure, or that any defects will be corrected. You use our platform at your own risk.\n\n" +
    "\n" +
    "THIRD-PARTY SERVICES\n\n" +
    "\n" +
    "Our platform may include links to third-party websites or services that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.\n\n" +
    "\n" +
    "LIMITATION OF LIABILITY\n\n" +
    "\n" +
    "To the fullest extent permitted by applicable law, in no event shall we be liable to you or any third party for any indirect, consequential, incidental, special, or punitive damages, including lost profits, arising from or related to your use of our platform, even if we have been advised of the possibility of such damages.\n\n" +
    "\n" +
    "ARBITRATION, CLASS-ACTION WAIVER, AND JURY WAIVER\n\n" +
    "\n" +
    "Any disputes arising out of or relating to this Agreement or your use of our platform shall be resolved through binding arbitration, subject to the terms and conditions set forth in our Dispute Resolution Policy. By accepting this Agreement, you waive your right to participate in class actions and jury trials.\n\n" +
    "\n" +
    "GOVERNING LAW\n\n" +
    "\n" +
    "This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.\n\n" +
    "\n" +
    "VENUE\n\n" +
    "\n" +
    "Any legal action or proceeding arising out of or relating to this Agreement shall be brought exclusively in the courts of [Jurisdiction], and you hereby consent to the personal jurisdiction and venue of such courts.\n\n" +
    "\n" +
    "INDEMNITY BY YOU\n\n" +
    "\n" +
    "You agree to indemnify and hold us harmless from any claims, damages, liabilities, and expenses (including attorneys' fees) arising out of or relating to your breach of this Agreement or your use of our platform.\n\n" +
    "\n" +
    "ENTIRE AGREEMENT; OTHER\n\n" +
    "\n" +
    "This Agreement, together with any additional terms and conditions incorporated by reference herein, constitutes the entire agreement between you and [Company Name] regarding your use of our platform. Any failure by us to exercise or enforce any right or provision of this Agreement shall not operate as a waiver of such right or provision."}
</Text>

      </ScrollView>
    </View>
  );
};

export default TermsAndCond;
