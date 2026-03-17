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

export default function ResetPassword({ navigation, route }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // email, source and otp passed from OtpVerify
  const { email, from, otp } = route.params || {};

  const handleResetPassword = async () => {
    if (!password || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      // For forgot password: verify OTP and reset password
      if (from === "forgot") {
        const res = await API.post(API_ENDPOINTS.RESET_PASSWORD, {
          email: email,
          new_password: password,
        });

        if (res.data?.success) {
          Alert.alert("Success", "Password reset successfully!");
          navigation.replace("Login");
        } else {
          Alert.alert("Error", res.data?.error || "Failed to reset password");
        }
      }
    } catch (error) {
      console.log("Reset password error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.header}>Krishopaj</Text>

      <Text style={authStyles.subHeader}>Reset Password</Text>
      
      <Text style={authStyles.description}>
        Enter your new password below.
      </Text>

      <TextInput
        style={authStyles.input}
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={authStyles.button}
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={authStyles.buttonText}>
          {loading ? "Resetting..." : "Reset Password"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={authStyles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}
