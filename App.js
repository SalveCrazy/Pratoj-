// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";  
import TicketScreen from "./screens/TicketScreen";
import HomeAluno from "./screens/HomeAluno";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AlunoHome"
          component={HomeAluno}
          options={{ title: "Home do Aluno" }}
        />

        <Stack.Screen
          name="Ticket"
          component={TicketScreen}
          options={{ title: "Receber Ticket" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
