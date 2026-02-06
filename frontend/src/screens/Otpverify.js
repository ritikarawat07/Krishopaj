import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { authStyles } from "../styles/authStyles";

export default function OtpVerify({ navigation }) {
  const [otp, setOtp] = useState("");

  return (
    <View style={authStyles.container}>
      <Text style={authStyles.header}>Krishopaj</Text>

      <TextInput
        style={authStyles.input}
        placeholder="Enter OTP"
        keyboardType="numeric"
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity
        style={authStyles.button}
        onPress={() => navigation.navigate("SetPassword")}
      >
        <Text style={authStyles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
}
