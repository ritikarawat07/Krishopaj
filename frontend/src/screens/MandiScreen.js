import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Footer from '../components/Footer';
import { SafeAreaView } from 'react-native-safe-area-context';

const MandiScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Mandi Screen</Text>
        <View style={styles.content}>
          <Text>Market prices and trading information will appear here</Text>
        </View>
        <Footer navigation={navigation} activeTab="Mandi" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default MandiScreen;
