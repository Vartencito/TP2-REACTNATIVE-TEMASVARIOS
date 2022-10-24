import { View, Text, StyleSheet, Button } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Location from "expo-location";

const HoraTemperatura = () => {
  const API_KEY = "9f7379c62630adec3cdcf7e1bb0b1515";
  const [dateTime, setDateTime] = useState("");
  const [temperatura, setTemperatura] = useState(null);
  const [localizacion, setLocalizacion] = useState(null);

  const getDateTime = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    setDateTime(`${date}/${month}/${year} ${hours}:${min}`);
  };

  const getTemperatura = async () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${localizacion.lat}&lon=${localizacion.lon}&appid=${API_KEY}`
      )
      .then((response) => {
        const template = {
          temp: response.data.main.temp,
          sensacion: response.data.main.feels_like,
          min: response.data.main.temp_min,
          max: response.data.main.temp_max,
        };
        setTemperatura(template);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const template = {
      lat: location.coords.altitude,
      lon: location.coords.longitude,
    };
    setLocalizacion(template);
    // await getTemperatura(template);
  };

  useEffect(() => {
    getDateTime();
    getLocation();
    if(localizacion){
      getTemperatura();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ margin: 10, fontWeight: "bold" }}>Fecha y hora</Text>
      <Text style={{ margin: 10 }}> {dateTime} </Text>
      <Text style={{ margin: 10, fontWeight: "bold" }}>Temperatura</Text>
      <Button
        title="Obtener Temperatura"
        onPress={()=>getTemperatura()} 
      />
      {temperatura ? (
        <>
          <Text style={{ margin: 10 }}>
            Temperatura: {temperatura.temp}° {`kelvin`}
          </Text>
          <Text style={{ margin: 10 }}>
            Temperatura máxima: {temperatura.max}° {`kelvin`}
          </Text>
          <Text style={{ margin: 10 }}>
            Temperatura mínima: {temperatura.min}° {`kelvin`}
          </Text>
          <Text style={{ margin: 10 }}>
            Sensación térmica: {temperatura.sensacion}° {`kelvin`}
          </Text>
        </>
      ) : null}
      <Text style={{ margin: 10, fontWeight: "bold" }}>Localización</Text>
      <View style={{ margin: 10 }}>
        {localizacion ? (
          <>
            <Text>latitud: {localizacion.lat}</Text>
            <Text>longitud: {localizacion.lon}</Text>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: 10,
  },
});

export default HoraTemperatura;
