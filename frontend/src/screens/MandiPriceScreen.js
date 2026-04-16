import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { SafeAreaView as SafeAreaContext } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const MandiPriceScreen = ({ navigation }) => {
  const [cropName, setCropName] = useState('');
  const [location, setLocation] = useState('');
  const [amount, setAmount] = useState('');
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Simulated mandi price data
  const getMandiPrices = (crop, loc, qty) => {
    const basePrices = {
      'wheat': { min: 2000, max: 2500, avg: 2250, unit: 'quintal' },
      'rice': { min: 1800, max: 2200, avg: 2000, unit: 'quintal' },
      'corn': { min: 1500, max: 1900, avg: 1700, unit: 'quintal' },
      'cotton': { min: 6000, max: 7500, avg: 6750, unit: 'quintal' },
      'sugarcane': { min: 300, max: 400, avg: 350, unit: 'quintal' },
      'pulses': { min: 4000, max: 5500, avg: 4750, unit: 'quintal' },
      'soybean': { min: 3500, max: 4500, avg: 4000, unit: 'quintal' },
      'mustard': { min: 4500, max: 5500, avg: 5000, unit: 'quintal' },
    };

    const cropKey = crop.toLowerCase();
    const defaultPrice = { min: 2000, max: 3000, avg: 2500, unit: 'quintal' };
    const priceInfo = basePrices[cropKey] || defaultPrice;

    // Add location-based price variation
    const locationMultiplier = {
      'haryana': 1.05,
      'punjab': 1.08,
      'up': 1.02,
      'rajasthan': 0.98,
      'maharashtra': 1.03,
      'gujarat': 1.06,
    };

    const multiplier = locationMultiplier[loc.toLowerCase()] || 1.0;

    return {
      crop: crop,
      location: loc,
      quantity: qty,
      minPrice: Math.round(priceInfo.min * multiplier),
      maxPrice: Math.round(priceInfo.max * multiplier),
      avgPrice: Math.round(priceInfo.avg * multiplier),
      unit: priceInfo.unit,
      estimatedValue: Math.round(priceInfo.avg * multiplier * (parseFloat(qty) || 0)),
      marketTrend: Math.random() > 0.5 ? 'up' : 'down',
      trendPercent: (Math.random() * 10).toFixed(1),
      lastUpdated: new Date().toLocaleString(),
    };
  };

  const handleGetPrice = () => {
    if (!cropName.trim()) {
      Alert.alert('Error', 'Please enter crop name');
      return;
    }
    if (!location.trim()) {
      Alert.alert('Error', 'Please enter location');
      return;
    }
    if (!amount.trim() || isNaN(amount)) {
      Alert.alert('Error', 'Please enter valid amount');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const prices = getMandiPrices(cropName, location, amount);
      setPriceData(prices);
      setLoading(false);
    }, 1500);
  };

  const handleReset = () => {
    setCropName('');
    setLocation('');
    setAmount('');
    setPriceData(null);
  };

  return (
    <SafeAreaContext style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1F1A" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Mandi Price Checker</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        
        {/* INPUT FORM */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>🌾 Get Market Prices</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Crop Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Wheat, Rice, Corn"
              placeholderTextColor="#7FAF9F"
              value={cropName}
              onChangeText={setCropName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Haryana, Punjab, UP"
              placeholderTextColor="#7FAF9F"
              value={location}
              onChangeText={setLocation}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount (in Quintals)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 10, 50, 100"
              placeholderTextColor="#7FAF9F"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.getButton]}
              onPress={handleGetPrice}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Loading...' : 'Get Price'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={handleReset}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* PRICE RESULTS */}
        {priceData && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>📊 Market Price Analysis</Text>
            
            <View style={styles.priceHeader}>
              <View>
                <Text style={styles.cropName}>{priceData.crop}</Text>
                <Text style={styles.cropLocation}>📍 {priceData.location}</Text>
                <Text style={styles.cropQuantity}>📦 {priceData.quantity} {priceData.unit}</Text>
              </View>
              <View style={styles.trendContainer}>
                <Text style={styles.trendLabel}>Market Trend</Text>
                <View style={[
                  styles.trendBadge,
                  { backgroundColor: priceData.marketTrend === 'up' ? '#4caf50' : '#ef5350' }
                ]}>
                  <Text style={styles.trendText}>
                    {priceData.marketTrend === 'up' ? '↑' : '↓'} {priceData.trendPercent}%
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.priceGrid}>
              <View style={styles.priceItem}>
                <Text style={styles.priceLabel}>Min Price</Text>
                <Text style={styles.priceValue}>₹{priceData.minPrice}</Text>
                <Text style={styles.priceUnit}>per {priceData.unit}</Text>
              </View>
              
              <View style={styles.priceItem}>
                <Text style={styles.priceLabel}>Avg Price</Text>
                <Text style={styles.priceValue}>₹{priceData.avgPrice}</Text>
                <Text style={styles.priceUnit}>per {priceData.unit}</Text>
              </View>
              
              <View style={styles.priceItem}>
                <Text style={styles.priceLabel}>Max Price</Text>
                <Text style={styles.priceValue}>₹{priceData.maxPrice}</Text>
                <Text style={styles.priceUnit}>per {priceData.unit}</Text>
              </View>
            </View>

            <View style={styles.estimatedValueCard}>
              <Text style={styles.estimatedLabel}>Estimated Total Value</Text>
              <Text style={styles.estimatedValue}>₹{priceData.estimatedValue.toLocaleString()}</Text>
            </View>

            <View style={styles.updateInfo}>
              <Text style={styles.updateText}>
                Last Updated: {priceData.lastUpdated}
              </Text>
              <Text style={styles.disclaimer}>
                * Prices are indicative and may vary based on quality and market conditions
              </Text>
            </View>
          </View>
        )}

        {/* HELPFUL TIPS */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Selling Tips</Text>
          <Text style={styles.tipText}>• Check multiple mandis for best prices</Text>
          <Text style={styles.tipText}>• Consider quality grading for better rates</Text>
          <Text style={styles.tipText}>• Monitor market trends before selling</Text>
          <Text style={styles.tipText}>• Government MSP may apply for certain crops</Text>
        </View>

      </ScrollView>
    </SafeAreaContext>
  );
};

export default MandiPriceScreen;

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
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: '#0B1F1A',
  },
  contentContainer: {
    padding: 15,
  },
  formCard: {
    backgroundColor: '#122B24',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1F3D36',
  },
  formTitle: {
    color: '#E8F5E9',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#E8F5E9',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1F3D36',
    color: '#fff',
    fontSize: 16,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2ECC71',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  getButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#ef5350',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultCard: {
    backgroundColor: '#122B24',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  resultTitle: {
    color: '#E8F5E9',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#1F3D36',
  },
  cropName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cropLocation: {
    color: '#A5D6A7',
    fontSize: 14,
    marginBottom: 3,
  },
  cropQuantity: {
    color: '#A5D6A7',
    fontSize: 14,
  },
  trendContainer: {
    alignItems: 'flex-end',
  },
  trendLabel: {
    color: '#A5D6A7',
    fontSize: 12,
    marginBottom: 5,
  },
  trendBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  trendText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  priceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priceItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#1F3D36',
    borderRadius: 10,
    marginHorizontal: 5,
    minHeight: 80,

  },
  priceLabel: {
    color: '#A5D6A7',
    fontSize: 12,
    marginBottom: 5,
    flex:1,
    flexWrap:'row'
  },
  priceValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  avgPrice: {
    color: '#4CAF50',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
    marginTop: 10,
  },
  priceUnit: {
    color: '#7FAF9F',
    fontSize: 10,
    flex: 1,
    textAlign: 'center',
  },
  estimatedValueCard: {
    backgroundColor: '#1a4d3a',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#2ECC71',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: 80,
  },
  estimatedLabel: {
    color: '#A5D6A7',
    fontSize: 16,
    marginBottom: 8,
    flex: 1,
  },
  estimatedValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    flex: 2,
    textAlign: 'center',
  },
  updateInfo: {
    alignItems: 'center',
  },
  updateText: {
    color: '#7FAF9F',
    fontSize: 12,
    marginBottom: 5,
  },
  disclaimer: {
    color: '#7FAF9F',
    fontSize: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  tipsCard: {
    backgroundColor: '#122B24',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1F3D36',
  },
  tipsTitle: {
    color: '#E8F5E9',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  tipText: {
    color: '#A5D6A7',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
});
