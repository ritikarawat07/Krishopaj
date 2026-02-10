import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import WeatherCard from '../components/WeatherCard';
const DashboardScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      
      <View style={styles.cardContainer}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('SensorData')}
        >
          <Text style={styles.cardTitle}>Sensor Data</Text>
          <Text style={styles.cardDescription}>View real-time IoT sensor readings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('CropPrediction')}
        >
          <Text style={styles.cardTitle}>Crop Prediction</Text>
          <Text style={styles.cardDescription}>Get AI-powered crop recommendations</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('MediaUpload')}
        >
          <Text style={styles.cardTitle}>Media Upload</Text>
          <Text style={styles.cardDescription}>Upload farm images and videos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.cardTitle}>Profile</Text>
          <Text style={styles.cardDescription}>Manage your account and farm info</Text>
        </TouchableOpacity>
    

      {/* WEATHER BOX */}
      <TouchableOpacity
        style={styles.weatherBox}
        onPress={() => navigation.navigate('Weather')}
      >
        <Text style={styles.temp}>35°C</Text>
        <Text>Partly Cloudy</Text>
      </TouchableOpacity>

  
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    padding: 20,
    color: '#4CAF50',
  },
  cardContainer: {
    padding: 10,
  },
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
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15
  },
  weatherBox: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 15
  },
  temp: {
    fontSize: 22,
    fontWeight: 'bold'
  }
});

export default DashboardScreen;
