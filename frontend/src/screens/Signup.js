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

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetOtp = async () => {
    if (!name || !phone || !password) {
      Alert.alert("Error", "Please enter name, phone number and password");
      return;
    }

    try {
      setLoading(true);

      await API.post(API_ENDPOINTS.REGISTER, {
        name: name,
        phone: phone,
        password: password,
      });

      navigation.navigate("OtpVerify", {
        phone: phone,
        from: "signup",
      });
    } catch (error) {
      console.log("Signup error:", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <StatusBar backgroundColor="#0c9485" barStyle="light-content" />

      <Text style={authStyles.header}>Krishopaj</Text>

      <TextInput
        style={authStyles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={authStyles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={authStyles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={authStyles.button}
        onPress={handleGetOtp}
        disabled={loading}
      >
        <Text style={authStyles.buttonText}>
          {loading ? "Sending OTP..." : "Get OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
