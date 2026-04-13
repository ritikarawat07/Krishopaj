import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [name, setName] = useState('Ritika Rawat');
  const [phone, setPhone] = useState('7248324329');

  const handleSignup = () => {
    navigation.navigate('OTP', { phone, type: 'signup', name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Enter Name"
        placeholderTextColor="#888"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        placeholder="Enter Phone Number"
        placeholderTextColor="#888"
        keyboardType="numeric"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1F1A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E8F5E9',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#2ECC71',
    borderRadius: 10,
    paddingHorizontal: 15,
    color: 'black',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2ECC71',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#081C15',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#2ECC71',
    fontSize: 14,
    marginTop: 10,
  },
});

export default SignupScreen;
