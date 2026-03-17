import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import API from "../config/api";
import { API_ENDPOINTS } from "../config/apiConfig";

const OtpVerify = ({ navigation, route }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // email passed from Signup / Forgot Password
  const { email, from } = route.params || {};

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(API_ENDPOINTS.VERIFY_OTP, {
        email: email,
        otp: otp,
        purpose: from === "signup" ? "signup" : "forgot_password",
      });

      if (res.data?.message) {
        if (from === "signup") {
          // For signup: navigate to SetPassword screen with OTP
          navigation.navigate("SetPassword", { 
            email, 
            from, 
            otp,
            name: route.params?.name,
            age: route.params?.age
          });
        } else if (from === "forgot") {
          // For forgot password: navigate to ResetPassword screen with OTP
          navigation.navigate("ResetPassword", { email, from, otp });
        }
      }
    } catch (error) {
      console.log("OTP verification error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.error || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit OTP sent to your email
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleVerifyOtp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Verifying..." : "Verify OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

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
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default OtpVerify;
