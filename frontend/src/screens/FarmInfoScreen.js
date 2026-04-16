import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FarmInfoScreen = ({ navigation, route }) => {
  const { farm } = route.params || {};

  // State for tracking completed tasks
  const [completedTasks, setCompletedTasks] = useState([]);

  // Generate farm-specific recommendations based on crop and data
  const generateFarmRecommendations = () => {
    const recommendations = {
      irrigation: [
        { day: 'Today', time: '6:00 AM', action: 'Light watering - Check soil moisture', priority: 'high' },
        { day: 'Tomorrow', time: '6:00 AM', action: 'Deep watering - 2 inches', priority: 'medium' },
        { day: 'Day 3', time: '6:00 AM', action: 'Skip watering - Check weather', priority: 'low' },
        { day: 'Day 4', time: '6:00 AM', action: 'Moderate watering - 1.5 inches', priority: 'medium' },
      ],
      fertilization: [
        { stage: 'Current Stage', action: 'Apply NPK fertilizer (20-20-20)', timing: 'This week', amount: '50kg/acre' },
        { stage: 'Growing Stage', action: 'Apply urea for nitrogen boost', timing: '2 weeks from now', amount: '25kg/acre' },
        { stage: 'Pre-flowering', action: 'Apply potash for flower development', timing: '4 weeks from now', amount: '30kg/acre' },
        { stage: 'Harvest prep', action: 'Stop fertilization 2 weeks before harvest', timing: 'Before harvest', amount: 'N/A' },
      ],
      pestControl: [
        { pest: 'General prevention', action: 'Apply neem oil spray', frequency: 'Weekly', status: 'scheduled' },
        { pest: 'Common insects', action: 'Monitor for aphids and mites', frequency: 'Daily check', status: 'monitoring' },
        { pest: 'Fungal diseases', action: 'Apply fungicide if humidity > 80%', frequency: 'As needed', status: 'monitoring' },
      ],
      harvesting: [
        { milestone: 'Estimated harvest date', date: calculateHarvestDate(farm?.crop) },
        { milestone: 'Pre-harvest preparations', date: '1 week before harvest' },
        { milestone: 'Optimal moisture for harvest', date: 'Harvest day' },
      ]
    };

    return recommendations;
  };

  // Calculate estimated harvest date based on crop
  const calculateHarvestDate = (crop) => {
    const harvestDays = {
      'Wheat': 120,
      'Rice': 130,
      'Corn': 90,
      'Cotton': 160,
      'Sugarcane': 365,
    };

    const days = harvestDays[crop] || 100;
    const harvestDate = new Date();
    harvestDate.setDate(harvestDate.getDate() + days);
    return harvestDate.toLocaleDateString();
  };

  const recommendations = generateFarmRecommendations();

  const toggleTaskCompletion = (task) => {
    setCompletedTasks(prev => 
      prev.includes(task) 
        ? prev.filter(t => t !== task)
        : [...prev, task]
    );
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ef5350';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#757575';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0B1F1A" />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{farm?.name || 'Farm Details'}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        
        {/* FARM OVERVIEW */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Farm Overview</Text>
          <View style={styles.overviewGrid}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>🌾 Crop</Text>
              <Text style={styles.overviewValue}>{farm?.crop || 'N/A'}</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>📏 Area</Text>
              <Text style={styles.overviewValue}>{farm?.area || 'N/A'}</Text>
            </View>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewLabel}>📍 Location</Text>
              <Text style={styles.overviewValue}>{farm?.location || 'N/A'}</Text>
            </View>
            {farm?.predictedYield && (
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>📊 Expected Yield</Text>
                <Text style={styles.overviewValue}>{farm.predictedYield} tons</Text>
              </View>
            )}
          </View>
        </View>

        {/* IRRIGATION SCHEDULE */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>💧 Irrigation Schedule</Text>
          {recommendations.irrigation.map((item, index) => (
            <View key={index} style={styles.scheduleItem}>
              <View style={styles.scheduleHeader}>
                <Text style={styles.scheduleDay}>{item.day}</Text>
                <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(item.priority) }]} />
              </View>
              <Text style={styles.scheduleTime}>{item.time}</Text>
              <Text style={styles.scheduleAction}>{item.action}</Text>
              <TouchableOpacity 
                style={styles.completeButton}
                onPress={() => toggleTaskCompletion(`irrigation-${index}`)}
              >
                <Text style={[
                  styles.completeButtonText,
                  completedTasks.includes(`irrigation-${index}`) && styles.completedText
                ]}>
                  {completedTasks.includes(`irrigation-${index}`) ? '✓ Completed' : 'Mark Complete'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* FERTILIZATION PLAN */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🧪 Fertilization Plan</Text>
          {recommendations.fertilization.map((item, index) => (
            <View key={index} style={styles.fertilizerItem}>
              <View style={styles.fertilizerHeader}>
                <Text style={styles.fertilizerStage}>{item.stage}</Text>
                <Text style={styles.fertilizerTiming}>{item.timing}</Text>
              </View>
              <Text style={styles.fertilizerAction}>{item.action}</Text>
              <Text style={styles.fertilizerAmount}>Amount: {item.amount}</Text>
              <TouchableOpacity 
                style={styles.completeButton}
                onPress={() => toggleTaskCompletion(`fertilizer-${index}`)}
              >
                <Text style={[
                  styles.completeButtonText,
                  completedTasks.includes(`fertilizer-${index}`) && styles.completedText
                ]}>
                  {completedTasks.includes(`fertilizer-${index}`) ? '✓ Completed' : 'Mark Complete'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* PEST CONTROL */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🐛 Pest Control</Text>
          {recommendations.pestControl.map((item, index) => (
            <View key={index} style={styles.pestItem}>
              <Text style={styles.pestType}>{item.pest}</Text>
              <Text style={styles.pestAction}>{item.action}</Text>
              <Text style={styles.pestFrequency}>Frequency: {item.frequency}</Text>
              <View style={[styles.statusBadge, { 
                backgroundColor: item.status === 'scheduled' ? '#2ECC71' : '#ff9800' 
              }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* HARVESTING TIMELINE */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🌾 Harvesting Timeline</Text>
          {recommendations.harvesting.map((item, index) => (
            <View key={index} style={styles.harvestItem}>
              <Text style={styles.harvestMilestone}>{item.milestone}</Text>
              <Text style={styles.harvestDate}>{item.date}</Text>
            </View>
          ))}
        </View>

        {/* WEATHER IMPACT */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🌤️ Weather Impact</Text>
          <View style={styles.weatherGrid}>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherLabel}>Temperature</Text>
              <Text style={styles.weatherValue}>28°C - Optimal</Text>
            </View>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherLabel}>Humidity</Text>
              <Text style={styles.weatherValue}>65% - Good</Text>
            </View>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherLabel}>Rainfall</Text>
              <Text style={styles.weatherValue}>Expected in 3 days</Text>
            </View>
            <View style={styles.weatherItem}>
              <Text style={styles.weatherLabel}>Soil Moisture</Text>
              <Text style={styles.weatherValue}>45% - Adequate</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default FarmInfoScreen;

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
  overviewCard: {
    backgroundColor: '#122B24',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1F3D36',
  },
  overviewTitle: {
    color: '#E8F5E9',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewItem: {
    width: '48%',
    backgroundColor: '#0B1F1A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  overviewLabel: {
    color: '#7FAF9F',
    fontSize: 12,
    marginBottom: 5,
  },
  overviewValue: {
    color: '#E8F5E9',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionCard: {
    backgroundColor: '#122B24',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1F3D36',
  },
  sectionTitle: {
    color: '#E8F5E9',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  scheduleItem: {
    backgroundColor: '#0B1F1A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  scheduleDay: {
    color: '#E8F5E9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  scheduleTime: {
    color: '#A5D6A7',
    fontSize: 14,
    marginBottom: 5,
  },
  scheduleAction: {
    color: '#E8F5E9',
    fontSize: 14,
    marginBottom: 10,
  },
  completeButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  completeButtonText: {
    color: '#0B1F1A',
    fontSize: 12,
    fontWeight: 'bold',
  },
  completedText: {
    color: '#A5D6A7',
  },
  fertilizerItem: {
    backgroundColor: '#0B1F1A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  fertilizerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  fertilizerStage: {
    color: '#E8F5E9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fertilizerTiming: {
    color: '#A5D6A7',
    fontSize: 12,
  },
  fertilizerAction: {
    color: '#E8F5E9',
    fontSize: 14,
    marginBottom: 5,
  },
  fertilizerAmount: {
    color: '#7FAF9F',
    fontSize: 12,
    marginBottom: 10,
  },
  pestItem: {
    backgroundColor: '#0B1F1A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  pestType: {
    color: '#E8F5E9',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pestAction: {
    color: '#E8F5E9',
    fontSize: 14,
    marginBottom: 5,
  },
  pestFrequency: {
    color: '#7FAF9F',
    fontSize: 12,
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  harvestItem: {
    backgroundColor: '#0B1F1A',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  harvestMilestone: {
    color: '#E8F5E9',
    fontSize: 14,
    flex: 1,
  },
  harvestDate: {
    color: '#2ECC71',
    fontSize: 14,
    fontWeight: 'bold',
  },
  weatherGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  weatherItem: {
    width: '48%',
    backgroundColor: '#0B1F1A',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  weatherLabel: {
    color: '#7FAF9F',
    fontSize: 12,
    marginBottom: 5,
  },
  weatherValue: {
    color: '#E8F5E9',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
