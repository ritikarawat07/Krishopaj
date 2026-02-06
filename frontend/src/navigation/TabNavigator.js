import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import SensorDataScreen from '../screens/SensorDataScreen';
import CropPredictionScreen from '../screens/CropPredictionScreen';
import MediaUploadScreen from '../screens/MediaUploadScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="SensorData" 
        component={SensorDataScreen}
        options={{
          tabBarLabel: 'Sensors',
        }}
      />
      <Tab.Screen 
        name="CropPrediction" 
        component={CropPredictionScreen}
        options={{
          tabBarLabel: 'Crops',
        }}
      />
      <Tab.Screen 
        name="MediaUpload" 
        component={MediaUploadScreen}
        options={{
          tabBarLabel: 'Upload',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
