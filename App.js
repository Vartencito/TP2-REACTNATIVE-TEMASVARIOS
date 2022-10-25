import React from "react";
import MainStack from "./src/Navigation/MainStack";
import { ImageBackground } from "react-native";

export default function App() {
  return (
    // <ImageBackground source={{uri: 'https://reactjs.org/logo-og.png"'}} styles={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
      <MainStack />
    // </ImageBackground>
  );
}
