import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  Vibration,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Contacts from "expo-contacts";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Contactos = () => {
  const [contacts, setContacts] = useState([]);
  const [numE, setNumE] = useState([]);
  const [image, setImage] = useState(null);

  //HAY QUE MOSTRAR CUAL ES EL NUM DE EMERGENCIA
  const obtenerNumE = async () => {
    const numLocal = await AsyncStorage.getItem("Numero de emergencia");
    setNumE(numLocal);
  };

  const getContacts = async () => {
    const template = [];
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          template.push({
            firstName: data[i].firstName
              ? data[i].firstName
              : data[i].name
              ? data[i].name
              : "",
            lastName: data[i].lastName ? data[i].lastName : "",
            phoneNumber: data[i].phoneNumbers
              ? data[i].phoneNumbers[0].number
              : "",
            emergency: data[i].phoneNumbers
              ? data[i].phoneNumbers[0].number === numE
                ? true
                : false
              : false,
          });
        }
        setContacts(template);
      }
    } else {
      alert('necesito permisos');
      Vibration.vibrate();
    }
  };

  useEffect(() => {
    obtenerNumE();
    if (numE !== null) {
      getContacts();
    }
  }, [numE]);

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
    <ImageBackground style={styles.container} source={{uri: image}}>
      <FlatList
        data={contacts}
        renderItem={({ item }) => (
          <>
            <View style={styles.contactos}>
              <Text style={styles.data}>Nombre: {item.firstName}</Text>
              <Text style={styles.data}>Apellido: {item.lastName}</Text>
              <Text style={styles.data}>Número: {item.phoneNumber}</Text>
              {item.emergency === true ? (
                <Text style={styles.emergency}>
                  CONTACTO DE EMERGENCIA!!!!! 🆘
                </Text>
              ) : null}
            </View>
          </>
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    margin: 10,
  },
  contactos: {
    paddingBottom: 15,
  },
  data: {
    fontSize: 25,
  },
  emergency: {
    fontSize: 25,
    color: "red",
  },
});

export default Contactos;
