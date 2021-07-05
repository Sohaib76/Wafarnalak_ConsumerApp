import React, { useState, useCallback, useEffect } from "react";
import {
  GiftedChat,
  InputToolbar,
  Bubble,
  Send,
} from "react-native-gifted-chat";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Alert,
} from "react-native";
import { IMAGES } from "../../assets/Images";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
const AudioView = (props) => {
  const onStartPlay = async (path) => {
    console.log(typeof path, path, ".............");
    // const soundObject = new Audio.Sound();
    // try {
    //   await soundObject.loadAsync({ path });
    //   await soundObject.playAsync();
    // } catch (error) {
    //   console.log("error:", error);
    // }

    // const { sound } = await Audio.Sound.createAsync(
    //   { uri: path }
    //   // null,
    //   // props.soundCallback
    // );

    const sound = new Audio.Sound();

    console.log("sound variable created");
    await Audio.setIsEnabledAsync(true);
    try {
      await sound.unloadAsync();
      console.log(path, "Path Just Before Load");
      await sound.loadAsync({
        uri: path,
        // "https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3"
      });
      await sound.setPositionAsync(0);
      await sound.playAsync().finally(async (response) => {
        console.log("finally");
        // await sound.unloadAsync();
        console.log(response);
      });
      console.log("playing ...........");
      // Your sound is playing!

      // Don't forget to unload the sound from memory
      // when you are done using the Sound object

      sound.setOnPlaybackStatusUpdate(null);
      // await sound.unloadAsync();
    } catch (error) {
      console.log("error occured playing the sound", error);
      // An error occurred!
    }
  };
  return (
    <View
      style={{
        backgroundColor: "#631255",
        // borderBottomRightRadius: 0,
        // borderTopRightRadius: 0,
        borderRadius: 10,
        width: 170,
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 5,
        paddingTop: 7,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          // setSound("file://" + props.data.uri);
          onStartPlay(props.data.uri);
        }}
      >
        <Image
          resizeMode="contain"
          style={{ height: 30, width: 40 }}
          source={IMAGES.PLAY}
        />
      </TouchableOpacity>
      <Text
        style={{ color: "white", fontSize: 12, width: "50%" }}
        adjustsFontSizeToFit
      >
        {props.data.name}
      </Text>
    </View>
  );
};
export default AudioView;
