
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import TicketScreen from "./screens/TicketScreen";
import IntervaloScreen from "./screens/IntervaloScreen";
import LocalizacaoScreen from "./screens/LocalizacaoScreen";
import AdmScreen from "./screens/AdmScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="HomeAluno" screenOptions={{ headerShown: false }}> 

        
        <Stack.Screen
          name="HomeAluno" 
          component={HomeScreen}
          options={{ title: "Menu" }}
        />

        
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        
        
        <Stack.Screen
          name="Ticket"
          component={TicketScreen}
          options={{ title: "Receber Ticket" }}
        />
        <Stack.Screen
          name="Intervalo"
          component={IntervaloScreen}
          options={{ title: "Intervalo" }}
        />
        <Stack.Screen
          name="Localizacao"
          component={LocalizacaoScreen}
          options={{ title: "Localização" }}
        /> 
        <Stack.Screen
          name="AdmScreen"
          component={AdmScreen}
          options={{ title: "Painel ADM" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}