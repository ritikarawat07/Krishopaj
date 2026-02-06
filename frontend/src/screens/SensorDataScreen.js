import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import SensorCard from '../components/SensorCard';
import { fetchSensorData } from '../utils/fetchSensorData';

const SensorDataScreen = () => {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSensorData();
  }, []);

  const loadSensorData = async () => {
    try {
      const data = await fetchSensorData();
      setSensorData(data);
    } catch (error) {
      console.error('Error loading sensor data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sensor Data</Text>
      {sensorData ? (
        <SensorCard sensorData={sensorData} />
      ) : (
        <Text style={styles.noData}>No sensor data available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: '#4CAF50',
  },
  noData: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default SensorDataScreen;
