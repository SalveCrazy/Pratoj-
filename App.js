import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';

const Stack = createStackNavigator();


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');

  const validarLogin = () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

   
    if (email === 'admin@example.com' && senha === 'admin123') {
      navigation.navigate('Ticket');
    } else {
      Alert.alert('Erro', 'E-mail ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <Button title="Entrar" onPress={validarLogin} color="#6A1B9A" />
    </View>
  );
};


const TicketScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ticket Alimentação</Text>
      <Text>Bem-vindo à sua tela de tickets!</Text>
    </View>
  );
};


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Ticket" component={TicketScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A1B9A',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default App;
