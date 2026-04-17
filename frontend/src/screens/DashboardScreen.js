import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import Footer from '../components/Footer';
import Header from '../components/Header';
import HealCrop from '../components/HealCrop';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getTips } from '../services/geminiService';
import AlertService from '../services/alertService';

const features = [
  { title: 'Yield Optimization', icon: '🌾' },
  { title: 'Irrigation Tips', icon: '💧' },
  { title: 'Fertilizer Tips', icon: '🧪' },
  { title: 'Pest Alerts', icon: '🐛' },
];

const DashboardScreen = ({ navigation, route }) => {
  const [name] = useState(route?.params?.name || 'User');

  // State for farms - initially empty, only user-created farms
  const [farms, setFarms] = useState([]);

  // Initialize services on component mount
  useEffect(() => {
    loadFarms();
    AlertService.initialize();
  }, []);

  // Check if we need to refresh farms (after adding new farm)
  useEffect(() => {
    if (route?.params?.refreshFarms) {
      loadFarms();
      navigation.setParams({ refreshFarms: undefined });
    }
  }, [route?.params?.refreshFarms, navigation]);

  // Load farms from SecureStore
  const loadFarms = async () => {
    try {
      const farmsJson = await SecureStore.getItemAsync('userFarms');
      const savedFarms = farmsJson ? JSON.parse(farmsJson) : [];
      setFarms(savedFarms);
    } catch (error) {
      console.error('Error loading farms:', error);
    }
  };

  const handlePress = async (type) => {
    try {
      const result = await getTips(type);
      navigation.navigate('Yield', { tips: result, title: type });
    } catch (error) {
      console.error('Error getting tips:', error);
      navigation.navigate('Yield', { 
        tips: ['Failed to load tips. Please try again.'], 
        title: type 
      });
    }
  };

  // Delete farm function
  const handleDeleteFarm = async (farmId) => {
    try {
      // Remove from state
      setFarms(prevFarms => prevFarms.filter(farm => farm.id !== farmId));
      
      // Remove from SecureStore
      const farmsJson = await SecureStore.getItemAsync('userFarms');
      const savedFarms = farmsJson ? JSON.parse(farmsJson) : [];
      const updatedFarms = savedFarms.filter(farm => farm.id !== farmId);
      await SecureStore.setItemAsync('userFarms', JSON.stringify(updatedFarms));
    } catch (error) {
      console.error('Error deleting farm:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      <View style={styles.container}>

        {/* HEADER */}
        <Header name={name} navigation={navigation} />

        <ScrollView style={styles.scrollBackground}>

          {/* WEATHER + ALERT */}
          <View style={styles.row}>
            <View style={styles.weather}>
              <Text style={styles.temp}>35°C</Text>
              <Text>Partly Cloudy</Text>
            </View>

            <View style={styles.alert}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>⚠ Alerts</Text>
              <Text style={{ color: '#fff' }}>Soil moisture low</Text>
            </View>
          </View>

          {/* FARMS */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.title}>My Farms</Text>
              <TouchableOpacity 
                style={styles.addBtn}
                onPress={() => navigation.navigate('Recommendation')}
              >
                <Text style={{ color: '#fff' }}>+ Add</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {farms.map((farm) => (
                <TouchableOpacity 
                  key={farm.id} 
                  style={styles.farmCard}
                  onPress={() => navigation.navigate('FarmInfo', { farm })}
                >
                  <View style={styles.farmHeader}>
                    <Text style={styles.farmName}>{farm.name}</Text>
                    <TouchableOpacity 
                      style={styles.deleteButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        handleDeleteFarm(farm.id);
                      }}
                    >
                      <Text style={styles.deleteButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                  <Text>🌾 Crop: {farm.crop}</Text>
                  <Text>📏 Area: {farm.area}</Text>
                  <Text>📍 Location: {farm.location}</Text>
                  {farm.predictedYield && (
                    <Text style={styles.yieldText}>📊 Yield: {farm.predictedYield} tons</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* HEAL CROP */}
          <HealCrop />

          {/* TIPS GRID */}
          <View style={styles.grid}>
            {features.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.box}
                onPress={() => handlePress(item.title)}
              >
                <Text style={styles.icon}>{item.icon}</Text>
                <Text style={styles.text}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>

        {/* FOOTER */}
        <Footer navigation={navigation} activeTab="Home" />

      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  scrollBackground: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },

  weather: {
    backgroundColor: '#90caf9',
    padding: 15,
    borderRadius: 10,
    width: '48%',
  },

  alert: {
    backgroundColor: '#ef5350',
    padding: 15,
    borderRadius: 10,
    width: '48%',
  },

  temp: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  section: {
    margin: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  addBtn: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  farmCard: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#c8e6c9',
    width: 200,
  },

  farmName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#2e7d32',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },

  box: {
    width: '48%',
    backgroundColor: '#c8e6c9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },

  icon: {
    fontSize: 28,
    marginBottom: 10,
  },

  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },

  yieldText: {
    color: '#2e7d32',
    fontWeight: '600',
    marginTop: 5,
  },

  farmHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },

  deleteButton: {
    backgroundColor: '#ef5350',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});