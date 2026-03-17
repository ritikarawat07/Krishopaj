import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { authStyles } from "../styles/authStyles";
import API from "../config/api";
import { API_ENDPOINTS } from "../config/apiConfig";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(API_ENDPOINTS.FORGOT_PASSWORD_REQUEST_OTP, {
        email: email,
      });

      if (res.data?.success) {
        navigation.navigate("OtpVerify", {
          email: email,
          from: "forgot",
        });
      } else {
        Alert.alert("Error", res.data?.error || "Failed to send OTP");
      }
    } catch (error) {
      console.log("Forgot password error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <StatusBar backgroundColor="#0c9485" barStyle="light-content" />

      <Text style={authStyles.header}>Krishopaj</Text>

      <Text style={authStyles.subHeader}>Forgot Password</Text>
      
      <Text style={authStyles.description}>
        Enter your email address and we'll send you an OTP to reset your password.
      </Text>

      <TextInput
        style={authStyles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={authStyles.button}
        onPress={handleSendOtp}
        disabled={loading}
      >
        <Text style={authStyles.buttonText}>
          {loading ? "Sending OTP..." : "Send OTP"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={authStyles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}