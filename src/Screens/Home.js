import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import { Accelerometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "react-native-vector-icons/Ionicons";




const Home = ({ navigation }) => {
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [numE, setNumE] = useState("");
  const [image, setImage] = useState(null);
  const [fondo, setFondo] = useState(null);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      await AsyncStorage.setItem("fondo", result.uri);
    }
  };

  const getImageFromLibrary = async () => {
    const foto = await AsyncStorage.getItem("fondo");
    setFondo(foto)
  };

  useEffect(()=>{
    getImageFromLibrary();
  },[getImageFromLibrary()])

  return (
    <ImageBackground source={{ uri: fondo }}>
    
        <View style={{alignItems: "center", justifyContent: "center"}}>
       
        <TouchableOpacity >
     
    <View style={{flexDirection: "row"}}>
      <Ionicons   
      onPress={() => navigation.navigate("NumeroEmergencia")}
                      name="person-add-outline"
                      color="#0062ff"
                      size={80}
                      style={{ padding: "10%" }}
                    />

<Ionicons   
      onPress={() => navigation.navigate("Contactos")}
                      name="people-outline"
                      color="#0062ff"
                      size={80}
                      style={{ padding: "10%" }}
                    />
                    </View>
          </TouchableOpacity>

      <TouchableOpacity >
     
     <View style={{flexDirection: "row"}}>
       <Ionicons   
       onPress={() => navigation.navigate("HoraTemperatura")}
                       name="time-outline"
                       color="#0062ff"
                       size={80}
                       style={{ padding: "10%" }}
                     />
 
 <Ionicons   
       onPress={() => navigation.navigate("VideoFav")}
                       name="videocam-outline"
                       color="#0062ff"
                       size={80}
                       style={{ padding: "10%" }}
                     />
                     </View>
           </TouchableOpacity>



           <TouchableOpacity >
     
     <View style={{flexDirection: "row"}}>
       <Ionicons   
       onPress={() => navigation.navigate("Camara")}
                       name="camera-outline"
                       color="#0062ff"
                       size={80}
                       style={{ padding: "10%" }}
                     />
 
 <Ionicons   
                       name="image-outline"
                       color="#0062ff"
                       size={80}
                       style={{ padding: "10%" }}
                       onPress={() => pickImage()}
                     />
                     </View>
           </TouchableOpacity>

           <TouchableOpacity >
     
     <Ionicons   
     onPress={() => navigation.navigate("About")}
                     name="qr-code-outline"
                     color="#0062ff"
                     size={80}
                     style={{ padding: "10%" }}
                   />


         </TouchableOpacity>
         </View>

      <StatusBar style="auto" />
    </ImageBackground>
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
