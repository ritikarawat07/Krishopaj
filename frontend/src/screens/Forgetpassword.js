import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { authStyles } from "../styles/authStyles";

export default function ForgetPassword({ navigation }) {
  const [phone, setPhone] = useState("");

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
        onPress={() => navigation.navigate("OtpVerify")}
      >
        <Text style={authStyles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
}
