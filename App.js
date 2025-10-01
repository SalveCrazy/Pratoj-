// App.js
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importa telas
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import TicketScreen from "./screens/TicketScreen";
import IntervaloScreen from "./screens/IntervaloScreen";
// import LocalizacaoScreen from "./screens/LocalizacaoScreen";
import AdmScreen from "./screens/AdmScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* 🚀 AQUI está a mudança: 'initialRouteName' agora é "HomeAluno" e removemos a propriedade incorreta 'initialRouteHomeScreen' */}
      <Stack.Navigator initialRouteName="HomeAluno" screenOptions={{ headerShown: false }}> 

        {/* 1. Mova a HomeAluno para a primeira posição (Boa Prática) */}
        <Stack.Screen
          name="HomeAluno" // É este nome que deve estar em 'initialRouteName'
          component={HomeScreen}
          options={{ title: "Menu" }}
        />

        {/* 2. Login, agora é a segunda tela */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        
        {/* As outras telas continuam abaixo */}
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
          name="AdmScreen"
          component={AdmScreen}
          options={{ title: "Painel ADM" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}