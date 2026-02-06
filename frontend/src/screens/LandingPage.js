import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#0c9485" barStyle="light-content" />

      {/* Center Content */}
      <View style={styles.center}>
        <Text style={styles.appName}>Krishopaj</Text>

        <Text style={styles.tagline}>
          Smart Decisions for Every Farmer
        </Text>

        {/* Farmer Image */}
        <Image
          source={require("../assets/farmer.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Info")}
      >
      <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c9485",
    paddingHorizontal: 20,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  appName: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#0a0a0a",
    letterSpacing: 1.5,
  },

  tagline: {
    fontSize: 15,
    color: "#D9D9D9",
    marginTop: 6,
    marginBottom: 20,
    textAlign: "center",
  },

  image: {
    width: 260,
    height: 260,
  },

  button: {
    backgroundColor: "#DBBF90",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 30,
  },

  buttonText: {
    color: "#0a0a0a",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
