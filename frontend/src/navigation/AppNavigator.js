import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ROUTES } from "./routes";

import LandingPage from "../screens/LandingPage";
import Info from "../screens/Info";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import OtpVerify from "../screens/OtpVerify";
import ForgetPassword from "../screens/ForgetPassword";
import SetPassword from "../screens/SetPassword";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ROUTES.LANDING} component={LandingPage} />
      <Stack.Screen name={ROUTES.INFO} component={Info} />
      <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      <Stack.Screen name={ROUTES.SIGNUP} component={Signup} />
      <Stack.Screen name={ROUTES.OTP_VERIFY} component={OtpVerify} />
      <Stack.Screen name={ROUTES.FORGET_PASSWORD} component={ForgetPassword} />
      <Stack.Screen name={ROUTES.SET_PASSWORD} component={SetPassword} />
    </Stack.Navigator>
  );
}
