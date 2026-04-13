import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HealCrop = () => {
  return (
    <View style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>Heal your Crop</Text>

      {/* STEPS */}
      <View style={styles.steps}>

        <View style={styles.step}>
          <Text style={styles.icon}>🌱</Text>
          <Text style={styles.stepText}>Take a{'\n'}Picture</Text>
        </View>

        <Text style={styles.arrow}>➜</Text>

        <View style={styles.step}>
          <Text style={styles.icon}>📱</Text>
          <Text style={styles.stepText}>See{'\n'}diagnosis</Text>
        </View>

        <Text style={styles.arrow}>➜</Text>

        <View style={styles.step}>
          <Text style={styles.icon}>🧴</Text>
          <Text style={styles.stepText}>Get{'\n'}Medicine</Text>
        </View>

      </View>

      {/* BUTTON */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Take a picture</Text>
      </TouchableOpacity>

    </View>
  );
};

export default HealCrop;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    margin: 10,
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  steps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  step: {
    alignItems: 'center',
  },

  icon: {
    fontSize: 30,
  },

  stepText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },

  arrow: {
    fontSize: 18,
    color: '#777',
  },

  button: {
    marginTop: 15,
    backgroundColor: '#0b3d02',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
