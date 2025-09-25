// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importa telas
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import TicketScreen from "./screens/TicketScreen";
import IntervaloScreen from "./screens/IntervaloScreen";
// import LocalizacaoScreen from "./screens/LocalizacaoScreen";
import AdmScreen from "./screens/AdmScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Menu" }}
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
        {/* <Stack.Screen
          name="Localizacao"
          component={LocalizacaoScreen}
          options={{ title: "Localização" }}
        /> */}
        <Stack.Screen
          name="Adm"
          component={AdmScreen}
          options={{ title: "Painel ADM" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
