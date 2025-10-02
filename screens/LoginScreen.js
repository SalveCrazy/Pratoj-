import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function LoginScreen({ navigation, route }) {
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const userType = route.params?.userType; 

  const handleLogin = async () => {
    if (!matricula.trim() || !senha.trim()) {
      Alert.alert("Erro", "Digite sua matrícula e senha!");
      return;
    }

    
    if (userType === "admin" && matricula === "adm" && senha === "123") {
      navigation.navigate("AdmScreen");
      return;
    }

    
    if (userType === "atendente" && matricula === "valida" && senha === "999") { 
      navigation.navigate("Validacao");
      return;
    }
    
    
    if (userType === "aluno") {
      const alunosData = await AsyncStorage.getItem("alunos");
      const alunos = alunosData ? JSON.parse(alunosData) : [];
      const aluno = alunos.find(a => a.matricula === matricula);

      if (aluno && senha === "1234") {
        Alert.alert("Sucesso", `Bem-vindo(a), ${aluno.nome}!`);
        
        navigation.navigate("HomeAluno", { aluno }); 
      } else if (aluno) {
        Alert.alert("Erro", "Senha incorreta!");
      } else {
        Alert.alert("Erro", "Matrícula não encontrada.");
      }
      return;
    }
    
    
    Alert.alert("Erro", "Tipo de usuário não especificado ou credenciais incorretas.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login ({userType === 'admin' ? 'ADM' : userType === 'aluno' ? 'Aluno' : 'Validação'})</Text>

      <TextInput
        style={styles.input}
        placeholder="Matrícula"
        value={matricula}
        onChangeText={setMatricula}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", 
    fontSize: 18,
    fontWeight: "bold",
  },
});