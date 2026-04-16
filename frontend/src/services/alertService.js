import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AlertService {
  constructor() {
    this.lastAlertTime = null;
    this.alertInterval = null;
    this.isInitialized = false;
  }

  // Initialize the alert service
  async initialize() {
    if (this.isInitialized) return;
    
    try {
      const lastAlert = await AsyncStorage.getItem('lastAlertTime');
      this.lastAlertTime = lastAlert ? new Date(lastAlert) : null;
      this.isInitialized = true;
      
      // Start checking for alerts every minute
      this.startAlertChecker();
    } catch (error) {
      console.error('Error initializing alert service:', error);
    }
  }

  // Start the alert checker
  startAlertChecker() {
    if (this.alertInterval) {
      clearInterval(this.alertInterval);
    }

    this.alertInterval = setInterval(() => {
      this.checkAndShowAlert();
    }, 60000); // Check every minute
  }

  // Check if 10 minutes have passed and show alert
  async checkAndShowAlert() {
    const now = new Date();
    
    // If no last alert time or 10 minutes have passed
    if (!this.lastAlertTime || (now - this.lastAlertTime) >= 10 * 60 * 1000) {
      await this.showRandomAlert();
      this.lastAlertTime = now;
      await AsyncStorage.setItem('lastAlertTime', now.toISOString());
    }
  }

  // Show a random alert about irrigation or fertilization
  async showRandomAlert() {
    const alerts = [
      {
        title: '💧 Irrigation Reminder',
        message: 'Don\'t forget to check your soil moisture! Your crops may need water.',
        type: 'irrigation'
      },
      {
        title: '🌾 Fertilizer Alert',
        message: 'Time to check NPK levels! Your soil might need nutrients.',
        type: 'fertilizer'
      },
      {
        title: '💧 Water Your Crops',
        message: 'Your fields are getting dry! Consider irrigation today.',
        type: 'irrigation'
      },
      {
        title: '🧪 Nutrient Check Needed',
        message: 'Check your soil nutrients! Add fertilizer if needed.',
        type: 'fertilizer'
      },
      {
        title: '🌱 Crop Care Alert',
        message: 'Your crops need attention! Check soil moisture and nutrients.',
        type: 'general'
      },
      {
        title: '💦 Irrigation Time',
        message: 'Optimal time for watering! Check your soil moisture levels.',
        type: 'irrigation'
      },
      {
        title: '🌿 Fertilizer Reminder',
        message: 'Your soil nutrients may be low! Consider adding fertilizer.',
        type: 'fertilizer'
      }
    ];

    // Pick a random alert
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];

    if (Platform.OS === 'web') {
      // Web alert
      window.alert(`${randomAlert.title}\n\n${randomAlert.message}`);
    } else {
      // Native alert
      Alert.alert(
        randomAlert.title,
        randomAlert.message,
        [
          {
            text: 'OK',
            onPress: () => console.log('Alert dismissed'),
            style: 'default',
          },
          {
            text: 'View Sensors',
            onPress: () => {
              console.log('Navigate to sensors');
              // This will be handled by the component
            },
            style: 'default',
          },
        ],
        { cancelable: false }
      );
    }

    return randomAlert;
  }

  // Show immediate alert (for testing)
  async showImmediateAlert(type = 'random') {
    if (type === 'random') {
      return await this.showRandomAlert();
    }
    
    const specificAlerts = {
      irrigation: {
        title: '💧 Irrigation Needed',
        message: 'Your soil moisture is low! Water your crops soon.',
      },
      fertilizer: {
        title: '🌾 Fertilizer Needed',
        message: 'Your soil nutrients are low! Add fertilizer today.',
      }
    };

    const alert = specificAlerts[type] || specificAlerts.irrigation;

    if (Platform.OS === 'web') {
      window.alert(`${alert.title}\n\n${alert.message}`);
    } else {
      Alert.alert(
        alert.title,
        alert.message,
        [
          {
            text: 'OK',
            style: 'default',
          },
        ],
        { cancelable: false }
      );
    }
  }

  // Stop the alert service
  stop() {
    if (this.alertInterval) {
      clearInterval(this.alertInterval);
      this.alertInterval = null;
    }
  }

  // Reset last alert time (for testing)
  async resetAlertTime() {
    this.lastAlertTime = null;
    await AsyncStorage.removeItem('lastAlertTime');
  }

  // Get time until next alert
  getTimeUntilNextAlert() {
    if (!this.lastAlertTime) return '0 minutes';
    
    const now = new Date();
    const timeSinceLastAlert = now - this.lastAlertTime;
    const timeUntilNextAlert = 10 * 60 * 1000 - timeSinceLastAlert;
    
    if (timeUntilNextAlert <= 0) return 'Any moment now';
    
    const minutes = Math.floor(timeUntilNextAlert / (60 * 1000));
    return `${minutes} minutes`;
  }
}

export default new AlertService();
