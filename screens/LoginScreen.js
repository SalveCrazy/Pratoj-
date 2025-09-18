import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [modo, setModo] = useState("aluno"); 
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [users, setUsers] = useState([]);

  // 🔑 Admin fixo
  const admin = { email: "admin@escola.com", senha: "1234" };

  
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem("users");
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        }
      } catch (error) {
        Alert.alert("Erro", "Falha ao carregar usuários!");
      }
    };
    loadUsers();
  }, []);

  const saveUsers = async (newUsers) => {
    try {
      setUsers(newUsers);
      await AsyncStorage.setItem("users", JSON.stringify(newUsers));
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar usuário!");
    }
  };

 
  const handleRegister = () => {
    if (!matricula || !senha) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }
    const exists = users.find((u) => u.matricula === matricula);
    if (exists) {
      Alert.alert("Erro", "Matrícula já cadastrada!");
      return;
    }
    const newUser = { matricula, senha };
    const newUsers = [...users, newUser];
    saveUsers(newUsers);
    Alert.alert("Sucesso", "Cadastro realizado! Agora faça login.");
    setMatricula("");
    setSenha("");
    setModo("aluno");
  };

  
  const handleLogin = () => {
    if (modo === "admin") {
      if (!email || !senha) {
        Alert.alert("Erro", "Preencha todos os campos!");
        return;
      }
      if (email === admin.email && senha === admin.senha) {
        navigation.replace("HomeAdm");
      } else {
        Alert.alert("Erro", "E-mail ou senha do admin inválidos!");
      }
    } else {
      if (!matricula || !senha) {
        Alert.alert("Erro", "Preencha todos os campos!");
        return;
      }
      const user = users.find((u) => u.matricula === matricula && u.senha === senha);
      if (user) {
        navigation.replace("HomeAluno", { aluno: { matricula } });
      } else {
        Alert.alert("Erro", "Matrícula ou senha inválidos!");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎟️ Ticket Refeição</Text>

      <View style={styles.box}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, modo === "aluno" && styles.toggleActive]}
            onPress={() => setModo("aluno")}
          >
            <Text style={[styles.toggleText, modo === "aluno" && styles.toggleTextActive]}>Aluno</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, modo === "admin" && styles.toggleActive]}
            onPress={() => setModo("admin")}
          >
            <Text style={[styles.toggleText, modo === "admin" && styles.toggleTextActive]}>Admin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, modo === "cadastro" && styles.toggleActive]}
            onPress={() => setModo("cadastro")}
          >
            <Text style={[styles.toggleText, modo === "cadastro" && styles.toggleTextActive]}>Cadastro</Text>
          </TouchableOpacity>
        </View>

        {modo === "admin" ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="E-mail do Admin"
              placeholderTextColor="#d1c4e9"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#d1c4e9"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar como Admin</Text>
            </TouchableOpacity>
          </>
        ) : modo === "cadastro" ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Matrícula (ex: 123456)"
              placeholderTextColor="#d1c4e9"
              value={matricula}
              onChangeText={setMatricula}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#d1c4e9"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: "#7cb342" }]} onPress={handleRegister}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Matrícula (ex: 123456)"
              placeholderTextColor="#d1c4e9"
              value={matricula}
              onChangeText={setMatricula}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#d1c4e9"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar como Aluno</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#4a148c", 
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "#ede7f6", 
  },
  box: {
    backgroundColor: "#6a1b9a", 
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    width: "100%",
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#7b1fa2", 
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  toggleActive: {
    backgroundColor: "#ce93d8", 
  },
  toggleText: {
    color: "#d1c4e9",
    fontWeight: "bold",
    fontSize: 14,
  },
  toggleTextActive: {
    color: "#4a148c",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ba68c8", 
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#7b1fa2", 
    color: "#ede7f6", 
  },
  button: {
    backgroundColor: "#ab47bc", 
    padding: 15,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#ede7f6",
    fontSize: 16,
    fontWeight: "bold",
  },
});
