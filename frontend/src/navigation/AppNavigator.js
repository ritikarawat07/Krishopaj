import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingPage from "../screens/LandingPage"; // this is fine if file is LandingPage.js
import Info from "../screens/info";
import Login from "../screens/login";
import Signup from "../screens/signup";
import Otpverify from "../screens/otpverify";
import Forgetpassword from "../screens/forgetpassword";
import Setpassword from "../screens/setpassword";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="otpverify" component={Otpverify} />
      <Stack.Screen name="forgetpassword" component={Forgetpassword} />
      <Stack.Screen name="setpassword" component={Setpassword} />
</Stack.Navigator>
  );
}
