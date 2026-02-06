import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import CropCard from '../components/CropCard';
import UploadButton from '../components/UploadButton';
import { getPrediction } from '../utils/getPrediction';

const CropPredictionScreen = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetPrediction = async () => {
    setLoading(true);
    try {
      const data = await getPrediction();
      setPredictions(data);
    } catch (error) {
      console.error('Error getting prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Crop Prediction</Text>
      
      <UploadButton 
        title="Get Crop Recommendation" 
        onPress={handleGetPrediction}
      />
      
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
      ) : (
        predictions.map((crop, index) => (
          <CropCard key={index} cropData={crop} />
        ))
      )}
      
      {!loading && predictions.length === 0 && (
        <Text style={styles.noData}>No predictions yet. Click the button to get recommendations.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: '#4CAF50',
  },
  loader: {
    marginTop: 20,
  },
  noData: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default CropPredictionScreen;
