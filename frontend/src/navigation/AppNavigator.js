import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingPage from "../screens/LandingPage";
import info from "../screens/info";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Info" component={info} />
    </Stack.Navigator>
  );
}
