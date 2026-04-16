import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Alert,
  PermissionsAndroid,
  Platform,
} from "react-native";
import * as SecureStore from 'expo-secure-store';

import {
  generateLiveData,
  fakeApiCall,
  getRecommendation,
} from "../services/fakeApi";

const RecommendationScreen = ({ navigation }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [predictLoading, setPredictLoading] = useState(false);
  const [error, setError] = useState(null);

  // Yield prediction states
  const [showYieldForm, setShowYieldForm] = useState(false);
  const [yieldData, setYieldData] = useState({
    state: '',
    district: '',
    crop: '',
    year: new Date().getFullYear(),
    season: 'Rabi',
    area: ''
  });
  const [yieldPrediction, setYieldPrediction] = useState(null);
  const [yieldLoading, setYieldLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  // 📡 Live data
  useEffect(() => {
    const interval = setInterval(() => {
      const live = generateLiveData();
      setData(live);
      setLoading(false);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Prediction
  const handlePredict = async () => {
    setPredictLoading(true);
    setError(null);

    try {
      const crop = getRecommendation(data);
      const final = await fakeApiCall(crop);
      setResult(final);
      // Auto-fill crop in yield form
      setYieldData(prev => ({ ...prev, crop: final }));
    } catch (err) {
      setError("API failed. Please try again.");
      console.error("Prediction error:", err);
    } finally {
      setPredictLoading(false);
    }
  };

  // Yield Prediction
  const handleYieldPrediction = async () => {
    // Validation
    if (!yieldData.state || !yieldData.district || !yieldData.crop || !yieldData.area) {
      Alert.alert('Missing Information', 'Please fill all required fields');
      return;
    }

    setYieldLoading(true);

    try {
      // Mock API call - replace with actual API
      const mockResponse = {
        message: "Yield predicted successfully",
        predicted_yield: (Math.random() * 2 + 0.5).toFixed(2) // Random yield between 0.5-2.5
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const totalYield = (parseFloat(mockResponse.predicted_yield) * parseFloat(yieldData.area)).toFixed(2);
      setYieldPrediction({
        ...mockResponse,
        totalYield: totalYield,
        yieldPerAcre: mockResponse.predicted_yield
      });
      
    } catch (error) {
      Alert.alert('Error', 'Failed to predict yield. Please try again.');
    } finally {
      setYieldLoading(false);
    }
  };

  // 📍 Location Fetching
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This app needs to access your location to auto-fill state and district',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const fetchLocation = async () => {
    setLocationLoading(true);
    
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Location permission is required to auto-fill location');
        setLocationLoading(false);
        return;
      }

      // For React Native, you would typically use @react-native-community/geolocation
      // For this demo, we'll simulate location fetching
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock location data (in real app, use actual GPS coordinates)
      const mockLocationData = {
        state: 'Delhi',
        district: 'Delhi NCR'
      };
      
      setYieldData(prev => ({
        ...prev,
        state: mockLocationData.state,
        district: mockLocationData.district
      }));
      
      Alert.alert('Location Found', `State: ${mockLocationData.state}, District: ${mockLocationData.district}`);
      
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert('Error', 'Failed to fetch location. Please enter manually.');
    } finally {
      setLocationLoading(false);
    }
  };

  // Add to Farm function
  const handleAddToFarm = async () => {
    // Create new farm object
    const newFarm = {
      id: Date.now(), // Use timestamp as unique ID
      name: `${yieldData.crop} Farm`,
      crop: yieldData.crop,
      area: `${yieldData.area} Acre`,
      location: `${yieldData.state}, ${yieldData.district}`,
      predictedYield: yieldPrediction.totalYield,
      yieldPerAcre: yieldPrediction.yieldPerAcre
    };

    try {
      // Get existing farms from SecureStore
      const existingFarmsJson = await SecureStore.getItemAsync('userFarms');
      let existingFarms = existingFarmsJson ? JSON.parse(existingFarmsJson) : [];
      
      // Add new farm to the array
      const updatedFarms = [...existingFarms, newFarm];
      
      // Save updated farms array to SecureStore
      await SecureStore.setItemAsync('userFarms', JSON.stringify(updatedFarms));
      
      Alert.alert(
        'Farm Added Successfully!',
        `${newFarm.name} has been added to your farms.\n\nLocation: ${newFarm.location}\nArea: ${newFarm.area}\nPredicted Yield: ${newFarm.predictedYield} tons`,
        [
          {
            text: 'View My Farms',
            onPress: () => navigation.navigate('Dashboard', { refreshFarms: true })
          },
          {
            text: 'Add Another',
            style: 'cancel'
          }
        ]
      );
    } catch (error) {
      console.error('Error saving farm:', error);
      Alert.alert('Error', 'Failed to add farm. Please try again.');
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live Soil Data 📡</Text>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2ECC71" />
          <Text style={styles.loadingText}>Fetching sensor data...</Text>
        </View>
      ) : (
        <View style={styles.dataCard}>
          <View style={styles.dataGrid}>
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Nitrogen</Text>
              <Text style={styles.dataValue}>{data.nitrogen}</Text>
              <Text style={styles.dataUnit}>mg/kg</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Phosphorus</Text>
              <Text style={styles.dataValue}>{data.phosphorus}</Text>
              <Text style={styles.dataUnit}>mg/kg</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Potassium</Text>
              <Text style={styles.dataValue}>{data.potassium}</Text>
              <Text style={styles.dataUnit}>mg/kg</Text>
            </View>
          </View>
          
          <View style={styles.dataGrid}>
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Temperature</Text>
              <Text style={styles.dataValue}>{data.temperature}</Text>
              <Text style={styles.dataUnit}>°C</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Humidity</Text>
              <Text style={styles.dataValue}>{data.humidity}</Text>
              <Text style={styles.dataUnit}>%</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>pH Level</Text>
              <Text style={styles.dataValue}>{data.ph}</Text>
              <Text style={styles.dataUnit}>pH</Text>
            </View>
          </View>
          
          <View style={styles.rainfallContainer}>
            <View style={styles.dataItem}>
              <Text style={styles.dataLabel}>Rainfall</Text>
              <Text style={styles.dataValue}>{data.rainfall}</Text>
              <Text style={styles.dataUnit}>mm</Text>
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handlePredict} disabled={predictLoading}>
        {predictLoading ? (
          <ActivityIndicator color="#0B1F1A" size="small" />
        ) : (
          <Text style={styles.buttonText}>Get Recommendation</Text>
        )}
      </TouchableOpacity>

      {error && (
        <View style={styles.errorCard}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {result && (
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Text style={styles.resultIcon}>🌾</Text>
            <Text style={styles.resultTitle}>Recommended Crop</Text>
          </View>
          <Text style={styles.resultText}>{result}</Text>
          <View style={styles.resultFooter}>
            <Text style={styles.confidenceText}>Based on current soil conditions</Text>
          </View>
        </View>
      )}

      {/* Yield Prediction Section */}
      <View style={styles.yieldSection}>
        <TouchableOpacity 
          style={styles.yieldToggleButton} 
          onPress={() => setShowYieldForm(!showYieldForm)}
        >
          <Text style={styles.yieldToggleText}>
            {showYieldForm ? '▼' : '▶'} Predict Yield 📊
          </Text>
        </TouchableOpacity>

        {showYieldForm && (
          <View style={styles.yieldFormCard}>
            <Text style={styles.yieldFormTitle}>Enter Farm Details</Text>
            
            <View style={styles.locationButtonContainer}>
              <TouchableOpacity 
                style={styles.locationButton} 
                onPress={fetchLocation}
                disabled={locationLoading}
              >
                {locationLoading ? (
                  <ActivityIndicator color="#0B1F1A" size="small" />
                ) : (
                  <>
                    <Text style={styles.locationButtonIcon}>📍</Text>
                    <Text style={styles.locationButtonText}>Auto-fill Location</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>State *</Text>
                <TextInput
                  style={styles.input}
                  value={yieldData.state}
                  onChangeText={(text) => setYieldData(prev => ({ ...prev, state: text }))}
                  placeholder="e.g., Delhi"
                  placeholderTextColor="#5A8A7A"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>District *</Text>
                <TextInput
                  style={styles.input}
                  value={yieldData.district}
                  onChangeText={(text) => setYieldData(prev => ({ ...prev, district: text }))}
                  placeholder="e.g., Delhi NCR"
                  placeholderTextColor="#5A8A7A"
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Crop *</Text>
                <TextInput
                  style={styles.input}
                  value={yieldData.crop}
                  onChangeText={(text) => setYieldData(prev => ({ ...prev, crop: text }))}
                  placeholder="e.g., rice"
                  placeholderTextColor="#5A8A7A"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Area (acres) *</Text>
                <TextInput
                  style={styles.input}
                  value={yieldData.area}
                  onChangeText={(text) => setYieldData(prev => ({ ...prev, area: text }))}
                  placeholder="e.g., 100"
                  placeholderTextColor="#5A8A7A"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Year</Text>
                <TextInput
                  style={styles.input}
                  value={yieldData.year.toString()}
                  onChangeText={(text) => setYieldData(prev => ({ ...prev, year: text }))}
                  placeholder="2026"
                  placeholderTextColor="#5A8A7A"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Season</Text>
                <TextInput
                  style={styles.input}
                  value={yieldData.season}
                  onChangeText={(text) => setYieldData(prev => ({ ...prev, season: text }))}
                  placeholder="e.g., Rabi"
                  placeholderTextColor="#5A8A7A"
                />
              </View>
            </View>

            <TouchableOpacity 
              style={styles.predictYieldButton} 
              onPress={handleYieldPrediction}
              disabled={yieldLoading}
            >
              {yieldLoading ? (
                <ActivityIndicator color="#0B1F1A" size="small" />
              ) : (
                <Text style={styles.predictYieldButtonText}>Predict Yield</Text>
              )}
            </TouchableOpacity>
          </View>
        )}

        {yieldPrediction && (
          <View style={styles.yieldResultCard}>
            <View style={styles.yieldResultHeader}>
              <Text style={styles.yieldResultIcon}>📊</Text>
              <Text style={styles.yieldResultTitle}>Yield Prediction</Text>
            </View>
            
            <View style={styles.yieldMetrics}>
              <View style={styles.yieldMetricItem}>
                <Text style={styles.yieldMetricLabel}>Yield per Acre</Text>
                <Text style={styles.yieldMetricValue}>{yieldPrediction.yieldPerAcre} tons</Text>
              </View>
              
              <View style={styles.yieldDivider} />
              
              <View style={styles.yieldMetricItem}>
                <Text style={styles.yieldMetricLabel}>Total Yield</Text>
                <Text style={styles.yieldMetricValue}>{yieldPrediction.totalYield} tons</Text>
              </View>
            </View>
            <View style={styles.yieldCalculationContainer}>
              <Text style={styles.yieldCalculation}>
                {yieldPrediction.yieldPerAcre} × {yieldData.area} acres = {yieldPrediction.totalYield} tons
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.addToFarmButton}
              onPress={handleAddToFarm}
            >
              <Text style={styles.addToFarmButtonText}>Add to My Farms</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
    </ScrollView>
  );
};

export default RecommendationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1F1A",
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E8F5E9",
  },

  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#122B24',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  liveDot: {
    width: 8,
    height: 8,
    backgroundColor: '#2ECC71',
    borderRadius: 4,
    marginRight: 6,
  },

  liveText: {
    color: '#2ECC71',
    fontSize: 12,
    fontWeight: 'bold',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: "#A5D6A7",
    textAlign: "center",
    marginTop: 15,
    fontSize: 16,
  },

  dataCard: {
    backgroundColor: "#122B24",
    padding: 20,
    borderRadius: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#1F3D36',
  },

  dataGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  dataItem: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0B1F1A',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 2,
  },

  dataLabel: {
    color: "#7FAF9F",
    fontSize: 12,
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  dataValue: {
    color: "#E8F5E9",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
  },

  dataUnit: {
    color: "#5A8A7A",
    fontSize: 11,
  },

  rainfallContainer: {
    alignItems: 'center',
  },

  button: {
    backgroundColor: "#2ECC71",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,

    shadowColor: "#2ECC71",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  buttonText: {
    color: "#0B1F1A",
    fontSize: 16,
    fontWeight: "bold",
  },

  resultCard: {
    marginTop: 20,
    padding: 25,
    backgroundColor: "#122B24",
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2ECC71",
    shadowColor: "#2ECC71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },

  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  resultIcon: {
    fontSize: 24,
    marginRight: 10,
  },

  resultTitle: {
    color: "#A5D6A7",
    fontSize: 18,
    fontWeight: '600',
  },

  resultText: {
    color: "#2ECC71",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 15,
  },

  resultFooter: {
    borderTopWidth: 1,
    borderTopColor: '#1F3D36',
    paddingTop: 15,
    width: '100%',
    alignItems: 'center',
  },

  confidenceText: {
    color: "#7FAF9F",
    fontSize: 12,
    fontStyle: 'italic',
  },

  errorCard: {
    marginTop: 25,
    padding: 20,
    backgroundColor: "#2C1F1A",
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E74C3C",
    flexDirection: 'row',
  },

  errorIcon: {
    fontSize: 20,
    marginRight: 10,
  },

  errorText: {
    color: "#E74C3C",
    fontSize: 14,
    textAlign: "center",
    flex: 1,
  },

  // Yield Prediction Styles
  yieldSection: {
    marginTop: 20,
  },

  yieldToggleButton: {
    backgroundColor: '#122B24',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F3D36',
  },

  yieldToggleText: {
    color: '#A5D6A7',
    fontSize: 16,
    fontWeight: '600',
  },

  yieldFormCard: {
    backgroundColor: '#122B24',
    padding: 20,
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#1F3D36',
  },

  yieldFormTitle: {
    color: '#E8F5E9',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  yieldCalculation:{
    color:'white'
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },

  inputLabel: {
    color: '#A5D6A7',
    fontSize: 12,
    marginBottom: 5,
    fontWeight: '600',
  },

  input: {
    backgroundColor: '#0B1F1A',
    color: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2ECC71',
    fontSize: 14,
  },

  predictYieldButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,

    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  predictYieldButtonText: {
    color: '#0B1F1A',
    fontSize: 16,
    fontWeight: 'bold',
  },

  yieldResultCard: {
    backgroundColor: '#122B24',
    padding: 20,
    borderRadius: 15,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#2ECC71',
    alignItems: 'center',

    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },

  yieldResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  yieldResultIcon: {
    fontSize: 24,
    marginRight: 10,
  },

  yieldResultTitle: {
    color: '#A5D6A7',
    fontSize: 18,
    fontWeight: '600',
  },

  yieldMetrics: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },

  yieldMetricItem: {
    flex: 1,
    alignItems: 'center',
  },

  yieldMetricLabel: {
    color: '#7FAF9F',
    fontSize: 12,
    marginBottom: 5,
  },

  yieldMetricValue: {
    color: '#2ECC71',
    fontSize: 24,
    fontWeight: 'bold',
  },

  yieldDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#1F3D36',
    marginHorizontal: 20,
  },

  // Location Button Styles
  locationButtonContainer: {
    marginBottom: 20,
  },

  locationButton: {
    backgroundColor: '#1F3D36',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#2ECC71',

    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  locationButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },

  locationButtonText: {
    color: '#A5D6A7',
    fontSize: 14,
    fontWeight: '600',
  },

  // Add to Farm Button Styles
  addToFarmButton: {
    backgroundColor: '#ff2c2c',
    paddingVertical: 14,
    borderRadius: 2,
    alignItems: 'center',
    marginTop: 20,

    shadowColor: '#2ECC71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },

  addToFarmButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  yieldCalculationContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
});