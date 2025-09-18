import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeAluno from "./screens/HomeAluno";
import HomeAdm from "./screens/HomeAdm";
const Stack  = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: "Login" }} />
        <Stack.Screen name="HomeAluno" component={HomeAluno} options={{ title: "Aluno" }} />
        <Stack.Screen name="HomeAdm" component={HomeAdm} options={{ title: "Administrador" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
