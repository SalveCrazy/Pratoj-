// HomeScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function HomeScreen({ navigation, route }) {
  const { userType } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao App!</Text>

      {userType === "aluno" && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Ticket")}
        >
          <Text style={styles.buttonText}>Receber Ticket</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Intervalo")}
      >
        <Text style={styles.buttonText}>Intervalo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Localizacao")}
      >
        <Text style={styles.buttonText}>Localização</Text>
      </TouchableOpacity>

      {userType === "admin" && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Adm")}
        >
          <Text style={styles.buttonText}>Painel Admin</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 30 },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
