import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SetPasswordScreen = ({ navigation, route }) => {
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const { phone, name } = route.params || {};

  const handleSave = () => {
    console.log("Password Set:", password);
    if (password === confirmPassword) {
      navigation.replace('Dashboard', { name });
    } else {
      console.log("Passwords don't match");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Password</Text>

      <TextInput
        placeholder="Enter Password"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Password</Text>
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
});

export default SetPasswordScreen;
