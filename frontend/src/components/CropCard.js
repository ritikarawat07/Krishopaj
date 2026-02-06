import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CropCard = ({ cropData }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{cropData.name}</Text>
      <Text style={styles.prediction}>Recommended: {cropData.recommended ? 'Yes' : 'No'}</Text>
      <Text style={styles.confidence}>Confidence: {cropData.confidence}%</Text>
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
    color: '#2e7d32',
  },
  prediction: {
    fontSize: 14,
    marginVertical: 5,
  },
  confidence: {
    fontSize: 14,
    color: '#666',
  },
});

export default CropCard;
