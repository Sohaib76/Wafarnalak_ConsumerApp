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
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
// import { Header } from "react-native-elements";
const LocationView = (props) => {
  React.useEffect(() => {
    //  console.log("props ", props.data);
  }, [props]);
  const getCurrentPosition = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log("status ", status);
    if (status !== "granted") {
      Toast.show({
        text:
          this.state.lan == "en"
            ? "Please allow location permission"
            : "يرجى السماح لتحديد الموقع",
        position: "bottom",
      });
    } else {
      // console.log("else ");
      const mylocation = await Location.getCurrentPositionAsync({});
      console.log("mylocation", mylocation);

      let origin = {
        latitude: mylocation.coords.latitude,
        longitude: mylocation.coords.longitude,
      };
      let destination = {
        latitude: props.data.location.latitude,
        longitude: props.data.location.longitude,
      };
      props.navigation.navigate("MapDirections", {
        origin: origin,
        destination: destination,
      });
    }
  };

  // props.navigation.navigate("GoogleMapScreen", {
  //   lan: "en",
  // });

  const handleGetDirection = async (lat, long) => {
    // const data = {
    //   source: {
    //     latitude: lat, // this.props.location[0].fromPartyLat,
    //     longitude: long //this.props.location[0].fromPartyLong
    //   },
    //   destination: {
    //     latitude: props.data.location.lat,
    //     longitude: props.data.location.long
    //   },
    //   params: [
    //     {
    //       key: "travelmode",
    //       value: "driving" // may be "walking", "bicycling" or "transit" as well
    //     },
    //     {
    //       key: "dir_action",
    //       value: "navigate" // this instantly initializes navigation using the given travel mode
    //     }
    //   ]
    // };
    // getDirections(data);
  };
  return (
    <TouchableOpacity onPress={() => getCurrentPosition()}>
      <View
        style={{
          backgroundColor: "#631255",
          // borderBottomRightRadius: 0,
          borderTopRightRadius: 10,
          borderRadius: 10,
          width: 170,
          height: 140,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 5,
          paddingTop: 7,
        }}
      >
        <Image
          resizeMode="contain"
          style={{ height: 170, width: 140 }}
          source={IMAGES.MAP}
        />
      </View>
    </TouchableOpacity>
  );
};
export default LocationView;
