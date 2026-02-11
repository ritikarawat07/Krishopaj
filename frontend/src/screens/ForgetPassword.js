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

export default function ForgetPassword({ navigation }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!phone) {
      Alert.alert("Error", "Please enter phone number");
      return;
    }

    try {
      setLoading(true);

      // Send OTP for password reset
      await API.post(API_ENDPOINTS.SEND_OTP, {
        phone: phone,
      });

      navigation.navigate("OtpVerify", {
        phone: phone,
        from: "forgot",
        forgot: true,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.header}>Krishopaj</Text>

      <TextInput
        style={authStyles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TouchableOpacity
        style={authStyles.button}
        onPress={handleResetPassword}
        disabled={loading}
      >
        <Text style={authStyles.buttonText}>
          {loading ? "Sending OTP..." : "Reset Password"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
