import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import About from "../Screens/About";
import Contactos from "../Screens/Contactos";
import Home from "../Screens/Home";
import HoraTemperatura from "../Screens/HoraTemperatura";
import NumeroEmergencia from "../Screens/NumeroEmergencia";
import VideoFav from "../Screens/VideoFav";
import Camara from "../Screens/Camara";

const Stack = createNativeStackNavigator();
const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
        <Stack.Screen name="NumeroEmergencia" component={NumeroEmergencia} />
        <Stack.Screen name="Contactos" component={Contactos} />
        <Stack.Screen name="HoraTemperatura" component={HoraTemperatura} />
        <Stack.Screen name="VideoFav" component={VideoFav} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Camara" component={Camara} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
