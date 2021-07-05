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
} from "react-native";
import { IMAGES } from "../../assets/Images";
import LocationView from "./LocationView";
import AudioView from "./AudioView";
const MessageView = (props) => {
  const openDocument = async (path) => {
    // await FileViewer.open(path);
  };
  const onStartPlay = async (path) => {};
  if (props.currentMessage.type == "document") {
    return (
      <TouchableOpacity onPress={() => openDocument(props.currentMessage.uri)}>
        <View
          style={{
            backgroundColor: "#631255",
            // borderBottomRightRadius: 0,
            // borderTopRightRadius: 0,
            borderRadius: 20,
            width: 170,
            height: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 5,
            paddingTop: 7,
          }}
        >
          <Image
            resizeMode="contain"
            style={{ height: 30, width: 40 }}
            source={IMAGES.DOCUMENT}
          />
          <Text style={{ color: "white", fontSize: 18 }}>
            {props.currentMessage.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else if (props.currentMessage.type == "audio" || props.currentMessage.uri) {
    return <AudioView data={props.currentMessage} />;
  } else if (props.currentMessage.type == "location") {
    return (
      <LocationView data={props.currentMessage} navigation={props.navigation} />
    );
  }
  return null;
};
export default MessageView;
