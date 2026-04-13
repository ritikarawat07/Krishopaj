import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const AboutScreen = ({navigation}) => {
  const goToLogin =() =>{
    navigation.navigate('Login');
  }
  const goToSignup =() =>{
    navigation.navigate('Signup');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.title}>       About Krishopaj 🌱</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          Krishopaj is a smart farming application designed to help farmers
          with modern agricultural solutions.
        </Text>
      </View>

      <Text style={styles.heading}>Features:</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>• 🌾 Crop yield prediction</Text>
        <Text style={styles.cardText}>• 📊 Yield improvement recommendations</Text>
        <Text style={styles.cardText}>• 💧 Smart irrigation tips and ⏱️ Right time to irrigate land</Text>
        <Text style={styles.cardText}>• 🌱 Fertilizer guidance and ⏰ Best time to fertilize crops</Text>
        <Text style={styles.cardText}>• ☁️ Live weather reports</Text>
        <Text style={styles.cardText}>• 🐛 Pest alerts and crop protection</Text>
        <Text style={styles.cardText}>• 💰 Real-time mandi prices</Text>
        <Text style={styles.cardText}>• 💬 Chatbot for instant help</Text>
      </View>

      <Text style={styles.heading}>Our Mission:</Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>
          To empower farmers with technology and make agriculture more efficient
          and profitable.
        </Text>
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={goToLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupBtn} onPress={goToSignup}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0B1F1A',
    flexGrow: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E8F5E9',
    marginBottom: 20,
    textAlign: 'center',
  },

  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    color: '#A5D6A7',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#122B24', // dark card
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,

    // subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  cardText: {
    fontSize: 14,
    color: '#E8F5E9',
    lineHeight: 22,
  },

  loginBtn: {
    backgroundColor: "#2ECC71",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
  },

  loginText: {
    color: "#081C15",
    fontWeight: "bold",
    fontSize: 16,
  },

  signupBtn: {
    borderWidth: 1,
    borderColor: "#2ECC71",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },

  signupText: {
    color: "#2ECC71",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default AboutScreen;
