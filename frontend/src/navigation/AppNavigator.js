import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import AboutScreen from '../screens/AboutScreen';
import ForgotPasswordScreen from '../screens/ForgetPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen';
import SignupScreen from '../screens/SignupScreen';
import OTPScreen from '../screens/OTPScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ChatbotScreen from '../screens/ChatbotScreen';
import MandiScreen from '../screens/MandiScreen';
import YieldScreen from '../screens/YieldScreen';
import RecommendationScreen from "../screens/RecommendationScreen";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen 
          name="Landing" 
          component={LandingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="About"
          component={AboutScreen}
          options={{
            title: 'About'
          }}/>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Mandi" component={MandiScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Yield" component={YieldScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Recommendation" component={RecommendationScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );  
}


export default AppNavigator;
