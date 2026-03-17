import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { authStyles } from "../styles/authStyles";
import API from "../config/api";
import { API_ENDPOINTS } from "../config/apiConfig";

export default function SetPassword({ navigation, route }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // email, source and otp passed from OtpVerify
  const { email, from, otp } = route.params || {};

  const handleSetPasswordAndVerify = async () => {
    if (!password || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      // For signup: verify OTP and set password
      if (from === "signup") {
        const res = await API.post(API_ENDPOINTS.SET_PASSWORD, {
          email: email,
          password: password,
          name: route.params?.name || "",
          age: route.params?.age || 0,
          otp: otp, // Pass the OTP directly
        });

        if (res.data?.success) {
          Alert.alert("Success", "Account created successfully!");
          navigation.replace("Dashboard");
        } else {
          Alert.alert("Error", res.data?.error || "Failed to verify account");
        }
      }
    } catch (error) {
      console.log("Set password error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.header}>Krishopaj</Text>

      <TextInput
        style={authStyles.input}
        placeholder="Set Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={authStyles.button}
        onPress={handleSetPasswordAndVerify}
        disabled={loading}
      >
        <Text style={authStyles.buttonText}>
          {loading ? "Creating Account..." : "Create Account"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
