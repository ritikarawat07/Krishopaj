import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { authStyles } from "../styles/authStyles";

export default function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleGetOtp = () => {
    console.log(name, phone);
    navigation.navigate("OtpVerify");
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

      <TouchableOpacity style={authStyles.button} onPress={handleGetOtp}>
        <Text style={authStyles.buttonText}>Get OTP</Text>
      </TouchableOpacity>
    </View>
  );
}
