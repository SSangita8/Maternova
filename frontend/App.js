import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "./screens/SignupScreen";
import LoginScreen from "./screens/LoginScreen";
import Question1Screen from "./screens/Question1Screen";
import Question2Screen from "./screens/Question2Screen";
import Question3Screen from "./screens/Question3Screen";
import Question4Screen from "./screens/Question4Screen";
import Question5Screen from "./screens/Question5Screen";
import HomeScreen from "./screens/HomeScreen";
import PredictionScreen from "./screens/PredictionScreen";
import RiskAbortion from "./screens/RiskAbortion";
import RiskChildDeath from "./screens/RiskChildDeath";
import RiskDeliveries from "./screens/RiskDeliveries";
import RiskLiveBirth from "./screens/RiskLiveBirth";
import RiskNumConceived from "./screens/RiskNumConceived";
import RiskBodyTemp from "./screens/RiskBodyTemp";
import RiskDiastolicBP from "./screens/RiskDiastolicBP";
import RiskHB from "./screens/RiskHB";
import RiskHBA1C from "./screens/RiskHBA1C";
import RiskHeartRate from "./screens/RiskHeartRate";
import RiskRBS from "./screens/RiskRBS";
import RiskRR from "./screens/RiskRR";
import RiskSystolicBP from "./screens/RiskSystolicBP";
import PredictionHistoryScreen from "./screens/PredictionHistoryScreen";
import MaternalGuideScreen from "./screens/MaternalGuideScreen";
import DosDontsScreen from "./screens/DosDontsScreen";
import YogaExerciseScreen from "./screens/YogaExerciseScreen";
import DietPlanScreen from "./screens/DietPlanScreen";
import { AuthProvider } from "./context/authContext";
import { HealthProvider } from "./context/HealthContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <HealthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Question1" component={Question1Screen} />
            <Stack.Screen name="Question2" component={Question2Screen} />
            <Stack.Screen name="Question3" component={Question3Screen} />
            <Stack.Screen name="Question4" component={Question4Screen} />
            <Stack.Screen name="Question5" component={Question5Screen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="RiskAbortion" component={RiskAbortion} />
            <Stack.Screen name="RiskChildDeath" component={RiskChildDeath} />
            <Stack.Screen name="RiskDeliveries" component={RiskDeliveries} />
            <Stack.Screen name="RiskLiveBirth" component={RiskLiveBirth} />
            <Stack.Screen
              name="RiskNumConceived"
              component={RiskNumConceived}
            />
            <Stack.Screen name="RiskBodyTemp" component={RiskBodyTemp} />
            <Stack.Screen name="RiskDiastolicBP" component={RiskDiastolicBP} />
            <Stack.Screen name="RiskHB" component={RiskHB} />
            <Stack.Screen name="RiskHBA1C" component={RiskHBA1C} />
            <Stack.Screen name="RiskHeartRate" component={RiskHeartRate} />
            <Stack.Screen name="RiskRBS" component={RiskRBS} />
            <Stack.Screen name="RiskRR" component={RiskRR} />
            <Stack.Screen name="RiskSystolicBP" component={RiskSystolicBP} />
            <Stack.Screen name="Prediction" component={PredictionScreen} />
            <Stack.Screen name="History" component={PredictionHistoryScreen} />
            <Stack.Screen
              name="MaternalGuide"
              component={MaternalGuideScreen}
            />
            <Stack.Screen name="DietPlan" component={DietPlanScreen} />
            <Stack.Screen name="YogaExercise" component={YogaExerciseScreen} />
            <Stack.Screen name="DosDonts" component={DosDontsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </HealthProvider>
    </AuthProvider>
  );
}
