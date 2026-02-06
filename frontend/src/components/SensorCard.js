import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SensorCard = ({ sensorData }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Sensor Data</Text>
      <Text style={styles.data}>Temperature: {sensorData.temperature}°C</Text>
      <Text style={styles.data}>Humidity: {sensorData.humidity}%</Text>
      <Text style={styles.data}>Soil Moisture: {sensorData.soilMoisture}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  data: {
    fontSize: 14,
    marginVertical: 5,
  },
});

export default SensorCard;
