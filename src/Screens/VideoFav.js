import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video } from "expo-av";

const VideoFav = () => {
  const [URL, setURL] = useState(null);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [image, setImage] = useState(null);

  const guardarVideo = async () => {
    try {
      await AsyncStorage.setItem("Video", URL);
      alert("guardada la url");
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerVideo = async () => {
    try {
      const video = await AsyncStorage.getItem("Video");
      if (video !== null) {
        setURL(video);
      } else {
        setURL(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerVideo();
  }, []);

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
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.TextInput}
            value={URL}
            placeholder={"URL del video"}
            onChangeText={setURL}
          />
          <Pressable
            style={styles.boton}
            onPress={() => guardarVideo()}
          >
            <Text style={{color: "#fff", fontWeight: "bold"}}>Guardar URL</Text>
          </Pressable>
        </View>
        {/* <View style={styles.VideoPlayer}></View> */}
        {URL ? (
          <Video
            ref={video}
            style={styles.VideoPlayer}
            source={{
              uri: URL,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        ) : (
          <Text style={{ margin: 10 }}>Ingrese un video</Text>
        )}
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    margin: 10,
  },
  VideoPlayer: {
    width: 390,
    height: 200,
    padding: 10,
    margin: 10,
  },
    TextInput: {
      backgroundColor: "#fff",
      width: 260,
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
      borderRadius: 10,
      height: 50,
      justifyContent: "center"
    }
});

export default VideoFav;
