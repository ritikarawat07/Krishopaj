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
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetOtp = async () => {
    if (!name || !email || !age) {
      Alert.alert("Error", "Please enter name, email and age");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(API_ENDPOINTS.SIGNUP_REQUEST_OTP, {
        name: name,
        email: email,
        age: parseInt(age),
      });

      navigation.navigate("OtpVerify", {
        email: email,
        from: "signup",
        name: name,
        age: parseInt(age),
      });
    } catch (error) {
      console.log("Signup error:", error.response?.data || error.message);
      console.log("Full error:", error);
      console.log("Request URL:", API_ENDPOINTS.SIGNUP_REQUEST_OTP);
      console.log("API Base URL:", "http://192.168.1.8:8000/api");
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
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={authStyles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
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
