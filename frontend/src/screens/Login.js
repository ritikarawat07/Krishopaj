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

export default function Login({ navigation }) {
  const [name, setName] = useState(""); // optional (backend may ignore)
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Error", "Phone and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(API_ENDPOINTS.LOGIN, {
        phone: phone,
        password: password,
      });

      if (res.data?.success) {
        navigation.replace("Dashboard");
      } else {
        Alert.alert("Login Failed", res.data?.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Login failed. Try again.");
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
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={authStyles.buttonText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
        <Text style={authStyles.link}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={authStyles.link}>New user? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
