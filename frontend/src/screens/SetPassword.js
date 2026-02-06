import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { authStyles } from "../styles/authStyles";

export default function Setpassword({ navigation }) {
  const [password, setPassword] = useState("");

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
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={authStyles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

