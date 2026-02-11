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

  // phone passed from Signup / Forgot Password
  const { phone, from } = route.params || {};

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(API_ENDPOINTS.VERIFY_OTP, {
        phone: phone,
        otp: otp,
      });
      console.log("OTP verify response:", res.data, "from:", from);

      if (res.data?.success) {
        if (from === "forgot") {
          // Forgot password: go to SetPassword screen
          navigation.navigate("SetPassword", { phone, from });
        } else {
          // Signup: go directly to Dashboard
          navigation.replace("Dashboard");
        }
      } else {
        if (res.data?.error?.includes("Invalid OTP")) {
          Alert.alert("OTP Already Used", "This OTP has already been used. Please request a new OTP.");
          navigation.goBack();
        } else {
          Alert.alert("OTP Failed", res.data?.error || "Invalid OTP");
        }
      }
    } catch (error) {
      Alert.alert("Error", "OTP verification failed");
    } finally {
      setLoading(false);
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
