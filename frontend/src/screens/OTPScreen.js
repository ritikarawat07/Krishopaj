import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const OTPScreen = ({ route, navigation }) => {
  const [otp, setOtp] = useState('123456');
  const { phone, type } = route.params;

  const handleVerify = () => {
    console.log("OTP Verified:", otp);

    if (type === 'login') {
      navigation.replace('Dashboard', { name: route?.params?.name || 'User' });
    } else {
      navigation.navigate('SetPassword', { phone, name: route?.params?.name || 'User' });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter OTP sent to {phone}</Text>

      <TextInput
        placeholder="Enter 6-digit OTP"
        placeholderTextColor="#888"
        keyboardType="numeric"
        maxLength={6}
        style={styles.input}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendButton}>
        <Text style={styles.resendText}>Resend OTP</Text>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A5D6A7',
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
    fontSize: 18,
    textAlign: 'center',
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
  resendButton: {
    marginTop: 10,
  },
  resendText: {
    color: '#2ECC71',
    fontSize: 14,
  },
});

export default OTPScreen;
