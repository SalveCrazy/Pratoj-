// screens/HomeScreen.js
import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const FOODS = ["🍔", "🍕", "🍎", "🍗", "🥗", "🍩", "🥪"];

export default function HomeScreen({ navigation }) {
  const animations = useRef(
    FOODS.map(() => ({
      y: new Animated.Value(-100),
      x: new Animated.Value(Math.random() * width),
    }))
  ).current;

  useEffect(() => {
    animations.forEach((anim, index) => {
      const loop = () => {
        
        anim.y.setValue(-100);
        anim.x.setValue(Math.random() * (width - 50));

        Animated.timing(anim.y, {
          toValue: height + 100,
          duration: Math.random() * 3000 + 2500, // 2.5s - 5.5s
          useNativeDriver: true,
        }).start(() => loop());
      };

      
      setTimeout(loop, index * 600);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Falling food */}
      {animations.map((anim, i) => (
        <Animated.Text
          key={i}
          style={[
            styles.food,
            { transform: [{ translateY: anim.y }, { translateX: anim.x }] },
          ]}
        >
          {FOODS[i]}
        </Animated.Text>
      ))}

      {/* App Title */}
      <Text style={styles.appTitle}>Prato Já!</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Escolha seu tipo de acesso</Text>

      <TouchableOpacity
        style={[styles.button, styles.adminButton]}
        onPress={() => navigation.navigate("Login", { userType: "admin" })}
      >
        <Text style={styles.buttonText}>Administrador</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.alunoButton]}
        onPress={() => navigation.navigate("Login", { userType: "aluno" })}
      >
        <Text style={styles.buttonText}>Aluno</Text>
      </TouchableOpacity>
      
      {/* NOVO: Botão para o atendente usar a tela de Validação */}
      <TouchableOpacity
        style={[styles.button, styles.atendenteButton]}
        onPress={() => navigation.navigate("Login", { userType: "atendente" })}
      >
        <Text style={styles.buttonText}>Atendente (Validar)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
    backgroundColor: "#FFF8E7",
  },
  appTitle: { 
    fontSize: 34, 
    fontWeight: "900", 
    marginBottom: 10, 
    color: "#E63946",
    textAlign: "center",
  },
  subtitle: { 
    fontSize: 20, 
    fontWeight: "600", 
    marginBottom: 40, 
    color: "#333",
    textAlign: "center",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginVertical: 12,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  adminButton: {
    backgroundColor: "#D62828",
  },
  alunoButton: {
    backgroundColor: "#0077B6",
  },
  atendenteButton: { 
    backgroundColor: "#6A0DAD", 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "600" 
  },
  food: {
    position: "absolute",
    fontSize: 32,
    opacity: 0.85,
  },
});