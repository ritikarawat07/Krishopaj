import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SensorDataScreen = ({ navigation, route }) => {
  // Farm and sensor data state
  const [farms, setFarms] = useState([]);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [farmSensorData, setFarmSensorData] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Load farms on component mount
  useEffect(() => {
    loadFarms();
  }, []);

  // Load farms from SecureStore
  const loadFarms = async () => {
    try {
      const farmsJson = await SecureStore.getItemAsync('userFarms');
      const savedFarms = farmsJson ? JSON.parse(farmsJson) : [];
      setFarms(savedFarms);
      
      // Auto-select first farm if available
      if (savedFarms.length > 0 && !selectedFarm) {
        setSelectedFarm(savedFarms[0]);
      }
    } catch (error) {
      console.error('Error loading farms:', error);
    }
  };

  // Initialize sensor data for each farm
  const initializeFarmSensorData = () => {
    const initialData = {};
    farms.forEach(farm => {
      initialData[farm.id] = {
        nitrogen: 45 + Math.random() * 30,
        phosphorus: 25 + Math.random() * 25,
        potassium: 180 + Math.random() * 70,
        moisture: 35 + Math.random() * 25,
        ph: 6.2 + Math.random() * 1.6,
        temperature: 22 + Math.random() * 8,
        humidity: 55 + Math.random() * 25,
        isConnected: Math.random() > 0.2, // 80% chance of being connected
        lastUpdate: new Date(),
      };
    });
    setFarmSensorData(initialData);
  };

  // Initialize sensor data when farms are loaded
  useEffect(() => {
    if (farms.length > 0) {
      initializeFarmSensorData();
      setIsConnected(true);
    }
  }, [farms]);

  // Update sensor data for all farms
  const updateFarmSensorData = () => {
    setFarmSensorData(prevData => {
      const newData = { ...prevData };
      farms.forEach(farm => {
        if (newData[farm.id]) {
          // Simulate sensor data fluctuation
          newData[farm.id] = {
            ...newData[farm.id],
            nitrogen: Math.max(20, Math.min(80, newData[farm.id].nitrogen + (Math.random() - 0.5) * 5)),
            phosphorus: Math.max(15, Math.min(55, newData[farm.id].phosphorus + (Math.random() - 0.5) * 3)),
            potassium: Math.max(150, Math.min(280, newData[farm.id].potassium + (Math.random() - 0.5) * 10)),
            moisture: Math.max(25, Math.min(70, newData[farm.id].moisture + (Math.random() - 0.5) * 4)),
            ph: Math.max(5.5, Math.min(8.5, newData[farm.id].ph + (Math.random() - 0.5) * 0.2)),
            temperature: Math.max(18, Math.min(35, newData[farm.id].temperature + (Math.random() - 0.5) * 2)),
            humidity: Math.max(40, Math.min(90, newData[farm.id].humidity + (Math.random() - 0.5) * 5)),
            lastUpdate: new Date(),
            isConnected: Math.random() > 0.1, // 90% chance of staying connected
          };
        }
      });
      return newData;
    });
    setLastUpdate(new Date());
  };

  // Start live updates
  useEffect(() => {
    if (farms.length > 0) {
      const interval = setInterval(() => {
        updateFarmSensorData();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [farms]);

  // Get current farm sensor data
  const getCurrentSensorData = () => {
    if (!selectedFarm || !farmSensorData[selectedFarm.id]) {
      return {
        nitrogen: 0,
        phosphorus: 0,
        potassium: 0,
        moisture: 0,
        ph: 0,
        temperature: 0,
        humidity: 0,
      };
    }
    return farmSensorData[selectedFarm.id];
  };

  const sensorData = getCurrentSensorData();

  // Handle farm selection
  const handleFarmSelect = (farm) => {
    setSelectedFarm(farm);
  };

  // Get connection status for current farm
  const getCurrentFarmConnectionStatus = () => {
    if (!selectedFarm || !farmSensorData[selectedFarm.id]) {
      return false;
    }
    return farmSensorData[selectedFarm.id].isConnected;
  };

  const currentFarmConnected = getCurrentFarmConnectionStatus();

  // Get color based on value ranges
  const getValueColor = (value, type) => {
    switch (type) {
      case 'nitrogen':
        return value < 30 ? '#ef5350' : value < 50 ? '#ff9800' : '#4caf50';
      case 'phosphorus':
        return value < 20 ? '#ef5350' : value < 35 ? '#ff9800' : '#4caf50';
      case 'potassium':
        return value < 150 ? '#ef5350' : value < 200 ? '#ff9800' : '#4caf50';
      case 'moisture':
        return value < 30 ? '#ef5350' : value < 50 ? '#ff9800' : '#4caf50';
      case 'ph':
        return value < 6.0 ? '#ef5350' : value > 7.5 ? '#ff9800' : '#4caf50';
      default:
        return '#2196f3';
    }
  };

  // Get status text
  const getStatusText = (value, type) => {
    switch (type) {
      case 'nitrogen':
        return value < 30 ? 'Low' : value < 50 ? 'Medium' : 'Good';
      case 'phosphorus':
        return value < 20 ? 'Low' : value < 35 ? 'Medium' : 'Good';
      case 'potassium':
        return value < 150 ? 'Low' : value < 200 ? 'Medium' : 'Good';
      case 'moisture':
        return value < 30 ? 'Dry' : value < 50 ? 'Moderate' : 'Good';
      case 'ph':
        return value < 6.0 ? 'Acidic' : value > 7.5 ? 'Alkaline' : 'Optimal';
      default:
        return 'Normal';
    }
  };

  const SimpleSensorCard = ({ title, value, unit, icon, status, advice }) => (
  <View style={styles.simpleCard}>
    <View style={styles.cardHeader}>
      <Text style={styles.cardIcon}>{icon}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
    <Text style={styles.cardValue}>{value} {unit}</Text>
    <View style={[styles.statusRow, { backgroundColor: status === 'good' ? '#4caf50' : status === 'warning' ? '#ff9800' : '#ef5350' }]}>
      <Text style={styles.statusText}>
        {status === 'good' ? '✓ Good' : status === 'warning' ? '⚠ Warning' : '✗ Problem'}
      </Text>
    </View>
    <Text style={styles.adviceText}>{advice}</Text>
  </View>
);

const NPKRowCard = ({ nitrogen, phosphorus, potassium, nStatus, pStatus, kStatus }) => (
  <View style={styles.npkRowCard}>
    <Text style={styles.npkRowTitle}>🌾 NPK Fertilizers</Text>
    <View style={styles.npkRow}>
      <View style={styles.npkItem}>
        <Text style={styles.npkLabel}>Nitrogen</Text>
        <Text style={styles.npkValue}>{nitrogen.toFixed(0)}</Text>
        <Text style={styles.npkUnit}>mg/kg</Text>
        <View style={[styles.npkStatus, { backgroundColor: nStatus.status === 'good' ? '#4caf50' : nStatus.status === 'warning' ? '#ff9800' : '#ef5350' }]}>
          <Text style={styles.npkStatusText}>{nStatus.advice}</Text>
        </View>
      </View>
      
      <View style={styles.npkDivider} />
      
      <View style={styles.npkItem}>
        <Text style={styles.npkLabel}>Phosphorus</Text>
        <Text style={styles.npkValue}>{phosphorus.toFixed(0)}</Text>
        <Text style={styles.npkUnit}>mg/kg</Text>
        <View style={[styles.npkStatus, { backgroundColor: pStatus.status === 'good' ? '#4caf50' : pStatus.status === 'warning' ? '#ff9800' : '#ef5350' }]}>
          <Text style={styles.npkStatusText}>{pStatus.advice}</Text>
        </View>
      </View>
      
      <View style={styles.npkDivider} />
      
      <View style={styles.npkItem}>
        <Text style={styles.npkLabel}>Potassium</Text>
        <Text style={styles.npkValue}>{potassium.toFixed(0)}</Text>
        <Text style={styles.npkUnit}>mg/kg</Text>
        <View style={[styles.npkStatus, { backgroundColor: kStatus.status === 'good' ? '#4caf50' : kStatus.status === 'warning' ? '#ff9800' : '#ef5350' }]}>
          <Text style={styles.npkStatusText}>{kStatus.advice}</Text>
        </View>
      </View>
    </View>
  </View>
);

  const YouTubeTutorialCard = ({ title, videoId, description }) => (
    <TouchableOpacity style={styles.tutorialCard}>
      <View style={styles.tutorialHeader}>
        <View style={styles.youtubeIcon}>
          <Text style={styles.youtubeIconText}>▶</Text>
        </View>
        <View style={styles.tutorialInfo}>
          <Text style={styles.tutorialTitle}>{title}</Text>
          <Text style={styles.tutorialDescription}>{description}</Text>
        </View>
      </View>
      <Text style={styles.watchText}>Tap to watch tutorial</Text>
    </TouchableOpacity>
  );

  // Get status and advice for each sensor
  const getNitrogenStatus = () => {
    if (sensorData.nitrogen < 30) return { status: 'problem', advice: 'Add urea fertilizer' };
    if (sensorData.nitrogen < 50) return { status: 'warning', advice: 'Add some urea' };
    return { status: 'good', advice: 'Fertilizer is good' };
  };

  const getPhosphorusStatus = () => {
    if (sensorData.phosphorus < 20) return { status: 'problem', advice: 'Add DAP fertilizer' };
    if (sensorData.phosphorus < 35) return { status: 'warning', advice: 'Add some DAP' };
    return { status: 'good', advice: 'Fertilizer is good' };
  };

  const getPotassiumStatus = () => {
    if (sensorData.potassium < 150) return { status: 'problem', advice: 'Add potash fertilizer' };
    if (sensorData.potassium < 200) return { status: 'warning', advice: 'Add some potash' };
    return { status: 'good', advice: 'Fertilizer is good' };
  };

  const getMoistureStatus = () => {
    if (sensorData.moisture < 30) return { status: 'problem', advice: 'Water needed' };
    if (sensorData.moisture < 50) return { status: 'warning', advice: 'Add some water' };
    return { status: 'good', advice: 'Water is good' };
  };

  const getPhStatus = () => {
    if (sensorData.ph < 6.0) return { status: 'problem', advice: 'Add lime to soil' };
    if (sensorData.ph > 7.5) return { status: 'warning', advice: 'Add cow dung' };
    return { status: 'good', advice: 'Soil is good' };
  };

  const getTemperatureStatus = () => {
    if (sensorData.temperature < 20) return { status: 'warning', advice: 'Cold weather' };
    if (sensorData.temperature > 32) return { status: 'warning', advice: 'Hot weather' };
    return { status: 'good', advice: 'Temperature is good' };
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1F1A" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Farm Sensors</Text>
        <View style={[styles.connectionIndicator, { backgroundColor: currentFarmConnected ? '#4caf50' : '#ef5350' }]} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        
        {/* FARM SELECTION */}
        {farms.length > 0 && (
          <View style={styles.farmSelectionCard}>
            <Text style={styles.selectionTitle}>Select Farm:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {farms.map((farm) => (
                <TouchableOpacity
                  key={farm.id}
                  style={[
                    styles.farmChip,
                    selectedFarm?.id === farm.id && styles.selectedFarmChip
                  ]}
                  onPress={() => handleFarmSelect(farm)}
                >
                  <Text style={[
                    styles.farmChipText,
                    selectedFarm?.id === farm.id && styles.selectedFarmChipText
                  ]}>
                    🌾 {farm.name}
                  </Text>
                  <View style={[
                    styles.farmConnectionDot,
                    { backgroundColor: farmSensorData[farm.id]?.isConnected ? '#4caf50' : '#ef5350' }
                  ]} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* CURRENT FARM STATUS */}
        {selectedFarm && (
          <View style={styles.statusCard}>
            <Text style={styles.statusText}>{selectedFarm.name} - Sensor Status</Text>
            <Text style={styles.connectionText}>
              {currentFarmConnected ? '✓ Connected' : '✗ Not Connected'}
            </Text>
            <Text style={styles.updateText}>
              Update: {farmSensorData[selectedFarm.id]?.lastUpdate?.toLocaleTimeString() || 'Never'}
            </Text>
            <Text style={styles.farmInfo}>
              📍 {selectedFarm.location} • 🌾 {selectedFarm.crop} • 📏 {selectedFarm.area}
            </Text>
          </View>
        )}

        {/* NO FARMS MESSAGE */}
        {farms.length === 0 && (
          <View style={styles.noFarmsCard}>
            <Text style={styles.noFarmsTitle}>No Farms Found</Text>
            <Text style={styles.noFarmsText}>
              Please add a farm from the dashboard to view sensor data.
            </Text>
            <TouchableOpacity
              style={styles.addFarmButton}
              onPress={() => navigation.navigate('Recommendation')}
            >
              <Text style={styles.addFarmButtonText}>Add Farm</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* MAIN SENSORS GRID */}
        <Text style={styles.sectionTitle}>🌾 Fertilizer and Soil Information</Text>
        
        <View style={styles.simpleGrid}>
          <SimpleSensorCard
            title="Nitrogen"
            value={sensorData.nitrogen.toFixed(0)}
            unit="mg/kg"
            icon="🧪"
            {...getNitrogenStatus()}
          />
          
          <SimpleSensorCard
            title="Phosphorus"
            value={sensorData.phosphorus.toFixed(0)}
            unit="mg/kg"
            icon="⚗️"
            {...getPhosphorusStatus()}
          />
          
          <SimpleSensorCard
            title="Potassium"
            value={sensorData.potassium.toFixed(0)}
            unit="mg/kg"
            icon="🧫"
            {...getPotassiumStatus()}
          />
          
          <SimpleSensorCard
            title="Moisture"
            value={sensorData.moisture.toFixed(0)}
            unit="%"
            icon="💧"
            {...getMoistureStatus()}
          />
          
          <SimpleSensorCard
            title="pH Level"
            value={sensorData.ph.toFixed(1)}
            unit="pH"
            icon="🌡️"
            {...getPhStatus()}
          />
          
          <SimpleSensorCard
            title="Temperature"
            value={sensorData.temperature.toFixed(0)}
            unit="°C"
            icon="🌡️"
            {...getTemperatureStatus()}
          />
        </View>

        {/* QUICK ADVICE */}
        <View style={styles.adviceCard}>
          <Text style={styles.adviceTitle}>📝 Today's Advice</Text>
          <Text style={styles.adviceContent}>
            {sensorData.moisture < 40 ? "• Water your field today\n" : "• Water level is good\n"}
            {sensorData.nitrogen < 40 ? "• Add urea fertilizer\n" : "• Nitrogen level is good\n"}
            {sensorData.ph < 6.5 ? "• Add lime to soil" : "• Soil condition is good"}
          </Text>
        </View>

        {/* SIMPLE TUTORIALS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔧 Learn Sensor Setup</Text>
          
          <TouchableOpacity style={styles.simpleTutorialCard}>
            <Text style={styles.tutorialTitle}>📱 How to Install Sensors</Text>
            <Text style={styles.tutorialDescription}>Easy Video Tutorials</Text>
            <Text style={styles.watchText}>Tap to Watch</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SensorDataScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B1F1A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    fontSize: 16,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  connectionIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  content: {
    flex: 1,
    backgroundColor: '#0B1F1A',
  },
  contentContainer: {
    padding: 15,
  },
  statusCard: {
    backgroundColor: '#122B24',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1F3D36',
    alignItems: 'center',
  },
  statusText: {
    color: '#E8F5E9',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  connectionText: {
    color: '#A5D6A7',
    fontSize: 16,
    marginBottom: 5,
  },
  updateText: {
    color: '#7FAF9F',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#E8F5E9',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  simpleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  simpleCard: {
    backgroundColor: '#122B24',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#1F3D36',
    width: '48%',
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  cardTitle: {
    color: '#E8F5E9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statusRow: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  adviceText: {
    color: '#A5D6A7',
    fontSize: 12,
    textAlign: 'center',
  },
  adviceCard: {
    backgroundColor: '#1a4d3a',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2ECC71',
  },
  adviceTitle: {
    color: '#E8F5E9',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  adviceContent: {
    color: '#A5D6A7',
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 25,
  },
  simpleTutorialCard: {
    backgroundColor: '#122B24',
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#1F3D36',
    alignItems: 'center',
  },
  tutorialTitle: {
    color: '#E8F5E9',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tutorialDescription: {
    color: '#A5D6A7',
    fontSize: 14,
    marginBottom: 8,
  },
  watchText: {
    color: '#4caf50',
    fontSize: 14,
    fontWeight: 'bold',
  },
  // Farm Selection Styles
  farmSelectionCard: {
    backgroundColor: '#122B24',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1F3D36',
  },
  selectionTitle: {
    color: '#E8F5E9',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  farmChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F3D36',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedFarmChip: {
    backgroundColor: '#2E7D32',
    borderColor: '#4CAF50',
  },
  farmChipText: {
    color: '#A5D6A7',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  selectedFarmChipText: {
    color: '#FFFFFF',
  },
  farmConnectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  // No Farms Styles
  noFarmsCard: {
    backgroundColor: '#122B24',
    padding: 30,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1F3D36',
    alignItems: 'center',
  },
  noFarmsTitle: {
    color: '#E8F5E9',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noFarmsText: {
    color: '#A5D6A7',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  addFarmButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFarmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Farm Info Styles
  farmInfo: {
    color: '#A5D6A7',
    fontSize: 12,
    marginTop: 8,
    fontStyle: 'italic',
  },
});
