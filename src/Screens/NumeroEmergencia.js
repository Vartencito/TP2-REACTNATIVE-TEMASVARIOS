import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Vibration,
  ImageBackground,
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
        <Button title="Guardar nuevo número" onPress={() => guardarNum()} />
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
    margin: 10,
  },
  TextInput: {
    borderWidth: 1,
    width: 300,
    padding: 10,
    margin: 10,
    alignItems: "center",
  },
});

export default NumeroEmergencia;
