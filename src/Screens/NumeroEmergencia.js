import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Vibration,
  ImageBackground,
  Pressable
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NumeroEmergencia = () => {
  const [valor, setValor] = useState("");
  const [num, setNum] = useState("");
  const [numE, setNumE] = useState("");
  const [image, setImage] = useState(null);

  const guardarNum = async () => {
    if (num.length < 17) {
      alert('pone bien el numero');
      Vibration.vibrate();
    } else {
      setValor("");
      await AsyncStorage.setItem("Numero de emergencia", num);
    }
  };

  const obtenerNumE = async () => {
    const numLocal = await AsyncStorage.getItem("Numero de emergencia");
    setNumE(numLocal);
  };

  useEffect(() => {
    if (valor.length > 8) {
      setValor(valor.substring(0, valor.length - 1));
    }
    const primerG = valor.substring(0, 4);
    const segundoG = valor.substring(4, 8);
    setNum(`+54 9 11 ${primerG}-${segundoG}`);
  }, [valor]);

  useEffect(() => {
    obtenerNumE();
  }, [num]);

  const getImageFromLibrary = async () => {
    const foto = await AsyncStorage.getItem("fondo");
    if (foto === null) {
      setImage(null);
    } else {
      setImage(foto);
    }
  };

  useEffect(() => {
    getImageFromLibrary();
  }, [image]);

  return (
    <>
      <ImageBackground style={styles.container} source={{ uri: image }}>
        <TextInput
          style={styles.TextInput}
          placeholder={"Ingrese el numero de emergencia"}
          keyboardType={"numeric"}
          value={valor}
          onChangeText={(value) => setValor(value)}
        />

        <Text style={{ margin: 10 }}>Nuevo número de emergencia: {num} </Text>

        <Pressable
        style={styles.boton}
         onPress={() => guardarNum()} 
        ><Text style={{color: "#fff", fontWeight: "bold"}}>Guardar nuevo número</Text></Pressable>
        <Text style={{ margin: 10 }}>Número de emergencia actual: {numE} </Text>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  TextInput: {
    backgroundColor: "#fff",
    width: 300,
    padding: 10,
    margin: 10,
    alignItems: "center",
    borderRadius: 10,
    hadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 6,
  },
  boton: {
    backgroundColor: "#0062ff",
    padding: "3%",
    borderRadius: 10
  }
});

export default NumeroEmergencia;
