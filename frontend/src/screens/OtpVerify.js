import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const OtpVerify = ({ navigation }) => {
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      // TODO: verify OTP with backend
      navigation.navigate("SetPassword");
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit OTP sent to your registered number
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 30,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 3,
    marginBottom: 20,
    width: "60%",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#0c9485",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});
