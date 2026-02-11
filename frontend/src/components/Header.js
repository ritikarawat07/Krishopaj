import React from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0c9485" barStyle="light-content" />

      <Text style={styles.title}>Krishopaj</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0c9485",
    paddingTop: 40,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 2,
  },
});
