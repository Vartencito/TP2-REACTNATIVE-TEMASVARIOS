import { View, Text, StyleSheet, Button, Linking } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { Accelerometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const Home = ({ navigation }) => {
  //accelerometer
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [numE, setNumE] = useState("");

  const _slow = () => {
    Accelerometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Accelerometer.setUpdateInterval(16);
  };

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((accelerometerData) => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const obtenerNumE = async () => {
    const numLocal = await AsyncStorage.getItem("Numero de emergencia");
    setNumE(numLocal);
  };

  useEffect(() => {
    obtenerNumE();
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;

  useEffect(() => {
    if (x > 2 || y > 2 || z > 2) {
      Linking.openURL(`https://wa.me/${numE}?text=probando accelerometer`);
    }
  }, [x, y, z]);

  function round(n) {
    if (!n) {
      return 0;
    }
    return Math.floor(n * 100) / 100;
  }

  //camera

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Button
          title="Configurar número de emergencia"
          color={"#B6DCB6"}
          onPress={() => navigation.navigate("NumeroEmergencia")}
        />
      </View>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Button
          title="Ver mis contactos"
          color={"#D2E9E1"}
          onPress={() => navigation.navigate("Contactos")}
        />
      </View>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Button
          title="Ver Hora y temperatura"
          color={"coral"}
          onPress={() => navigation.navigate("HoraTemperatura")}
        />
      </View>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Button
          title="Video Favorito"
          color={"#F8DDA9"}
          onPress={() => navigation.navigate("VideoFav")}
        />
      </View>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Button
          title="About"
          color={"#FCB6D0"}
          onPress={() => navigation.navigate("About")}
        />
      </View>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Button
          title="tomar foto"
          color={"#B399D4"}
          onPress={() => navigation.navigate("Camara")}
        />
        <Button
          title="cambiar fondo"
          color={"#B399D4"}
          onPress={() => alert("guardaste la foto")}
        />
      </View>
      <StatusBar style="auto" />
    </View>
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
});

export default Home;
