import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";

export default function Info({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Common Header */}
      <Header />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1 */}
        <View style={styles.card}>
          <Text style={styles.title}>🌱 What is Krishopaj?</Text>
          <Text style={styles.text}>
            Krishopaj is a smart farming app that helps farmers take the right
            decisions at the right time using technology and data.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.card}>
          <Text style={styles.title}>📲 How to use Krishopaj?</Text>
          <Text style={styles.text}>
            1. Open the app and select your crop.{"\n"}
            2. Enter basic details like land size and location.{"\n"}
            3. Get simple suggestions for irrigation, fertilizer, and care.{"\n"}
            4. Follow the advice to improve your crop health.
          </Text>
        </View>

        {/* Section 3 */}
        <View style={styles.card}>
          <Text style={styles.title}>🌾 How Krishopaj helps farmers</Text>
          <Text style={styles.text}>
            • Predicts crop performance early{"\n"}
            • Reduces crop loss{"\n"}
            • Saves money on water and fertilizer{"\n"}
            • Increases overall crop yield and income
          </Text>
        </View>

        {/* Section 4 */}
        <View style={styles.card}>
          <Text style={styles.title}>⭐ Why Krishopaj is different</Text>
          <Text style={styles.text}>
            • Simple language, easy for every farmer{"\n"}
            • Smart advice based on data, not guesswork{"\n"}
            • Focused on farmer profit, not just information{"\n"}
            • Designed specially for Indian farming needs
          </Text>
        </View>

        {/* Auth buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.primaryText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.secondaryText}>New user? Sign Up</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c9485",
    // keep header flush with top; padding will be applied to scroll content
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0a0a0a",
    marginBottom: 8,
  },

  text: {
    fontSize: 14,
    color: "#0a0a0a",
    lineHeight: 22,
  },

  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
  },

  primaryButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },

  primaryText: {
    color: "#0a0a0a",
    fontSize: 16,
    fontWeight: "bold",
  },

  secondaryButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ffffff",
  },

  secondaryText: {
    color: "#0a0a0a",
    fontSize: 16,
    fontWeight: "bold",
  },
});