import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import QRCode from "react-native-qrcode-svg";
import { BarCodeScanner } from "expo-barcode-scanner";

const About = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState();
  const [modalShown, setModalShown] = useState(false);

  const getPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanData(data);
    setModalShown(!modalShown);
  };

  return (
    <>
      <Modal visible={modalShown} animationType="slide" transparent={true}>
        <View style={styles.modalContainer1}>
          <View style={styles.modalContainer2}>
            <Text style={{ margin: 10 }}>{scanData}</Text>
            <Button title="volver" onPress={() => setModalShown(!modalShown)} />
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <QRCode value="Hecho por valen y vicky" />
        <TouchableOpacity style={styles.button}>
          <Text>Escanear código QR</Text>
        </TouchableOpacity>
        <BarCodeScanner
          style={{ height: 600, width: 300 }}
          onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
        {scanData && (
          <Button
            title="Volver a escanear"
            onPress={() => setScanData(undefined)}
          />
        )}
      </View>
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
    flexDirection: "column",
  },
  button: {
    margin: 10,
    width: 150,
    alignItems: "center",
    height: 25,
    justifyContent: "center",
    backgroundColor: "lightgreen",
  },
  modalContainer1: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalContainer2: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#84b6f4",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 30,
  },
});

export default About;

{
  /* <Modal visible={true} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <Text style={{ margin: 10 }}>dame acceso</Text>
          <Button title="pedir Permisos" onPress={() => getPermissions()} />
        </View>
      </Modal> */
}