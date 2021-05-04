import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";

export default function CameraComponent(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = React.useRef();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const takePicture = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      props.navigation.state.params.onGoBack(photo);
      props.navigation.goBack("");
      console.log("photo ", photo);
    }
  };
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={r => {
          camera = r;
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View
        style={{
          backgroundColor: "white",
          position: "absolute",
          bottom: 10,
          alignSelf: "center",
          width: "80%",
          height: 50,
          left: "10%",
          borderRadius: 25
        }}
      >
        <TouchableOpacity style={{ flex: 1 }} onPress={() => takePicture()}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ color: "black", fontSize: 15, fontWeight: "bold" }}>
              SNAP
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    height: "80%"
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center"
  },
  text: {
    fontSize: 18,
    color: "white"
  }
});
