import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => guardarVideo()}
          >
            <Text>Guardar URL</Text>
          </TouchableOpacity>
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
  TextInput: {
    borderWidth: 1,
    width: 150,
    padding: 10,
    margin: 10,
  },
  VideoPlayer: {
    width: 390,
    height: 200,
    padding: 10,
    margin: 10,
  },
  button: {
    backgroundColor: "#C6E5B1",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    width: 100,
  },
});

export default VideoFav;
