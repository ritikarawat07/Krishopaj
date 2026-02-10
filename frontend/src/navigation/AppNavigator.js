import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens (PascalCase – must match file names exactly)
import LandingPage from "../screens/LandingPage";
import Info from "../screens/Info";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import OtpVerify from "../screens/OtpVerify";
import ForgetPassword from "../screens/ForgetPassword";
import SetPassword from "../screens/SetPassword";
import Dashboard from "../screens/Dashboard";
import WeatherScreen from '../screens/WeatherScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="OtpVerify" component={OtpVerify} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="SetPassword" component={SetPassword} />
      <Stack.Screen name="Dashboard" component= {Dashboard}/>
      <Stack.Screen name="Weather" component={WeatherScreen} />
    </Stack.Navigator>
  );
}

