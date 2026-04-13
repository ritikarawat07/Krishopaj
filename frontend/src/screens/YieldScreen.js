import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const YieldScreen = ({ navigation, route }) => {
  const { tips, title } = route.params || {};

  // Convert tips to array if it's a string, otherwise use as-is
  const tipsArray = Array.isArray(tips) ? tips : [tips];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1F1A" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title || 'Tips'}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* CONTENT */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.tipsContainer}>
          {tipsArray.map((tip, index) => (
            <View key={index} style={styles.tipRow}>
              <Text style={styles.tipNumber}>{index + 1}.</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default YieldScreen;

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
    width: 60,
  },
  content: {
    flex: 1,
    backgroundColor: '#0B1F1A',
  },
  contentContainer: {
    padding: 20,
  },
  tipsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tipsText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },

  // Row styles for tips
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  tipNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginRight: 10,
    minWidth: 20,
  },

  tipText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    flex: 1,
  },
});
