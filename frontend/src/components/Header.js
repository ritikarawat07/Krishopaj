import React from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0c9485" barStyle="light-content" />

      <Text style={styles.title}>Krishopaj</Text>

      <TouchableOpacity style={styles.profileButton}>
        <Ionicons name="person-circle-outline" size={40} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0c9485",
    paddingTop: 36,
    paddingBottom: 12,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 4,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 1,
  },

  profileButton: {
    paddingLeft: 12,
  },
});
