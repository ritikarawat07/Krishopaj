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

  // phone and source passed from OtpVerify
  const { phone, from } = route.params || {};

  const handleSetPasswordAndLogin = async () => {
    if (!password || password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      // Update password first
      await API.post(API_ENDPOINTS.UPDATE_PASSWORD, {
        phone: phone,
        password: password,
      });

      // Login with new password
      const res = await API.post(API_ENDPOINTS.LOGIN, {
        phone: phone,
        password: password,
      });

      if (res.data?.success) {
        navigation.replace("Dashboard");
      } else {
        Alert.alert(
          "Login Failed",
          res.data?.message || "Unable to login"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
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
        onPress={handleSetPasswordAndLogin}
        disabled={loading}
      >
        <Text style={authStyles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
