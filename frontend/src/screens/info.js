import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

export default function Info() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("../assets/logo.png")} // put your logo here
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Krishopaj</Text>
      </View>

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

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c9485",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },

  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0a0a0a",
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
});
