import React from "react";
import {
  View,
  Image,
  Platform,
  Dimensions,
  Alert,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  I18nManager,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  Animated,
  Modal
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("screen");
const SPACING = (height / width) * 9;
const AVATAR_SIZE = (height / width) * 40;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
import { Video, AVPlaybackStatus } from "expo-av";
import { IMAGES } from "../../assets/Images";
const VideoPlayerPopup = props => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      coverScreen={false}
    >
      <View
        style={{
          alignSelf: "center",
          height: "100%",
          width: "100%",
          paddingTop: 0,
          backgroundColor: "rgba(128,128,128,1)",
          paddingHorizontal: 0,
          alignItems: "center",
          justifyContent: "space-between"
          // alignItems: "flex-start"
        }}
      >
        <Video
          ref={video}
          style={{ height: 400, width: "100%", alignSelf: "center" }}
          source={{
            uri: props.source
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          // onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        {/* <VideoPlayer
          resizeMode="contain"
          disableBack
          disableVolume
          // navigator={props.setPopupFalse}
          // onBack={() => props.setPopupFalse()}
          source={{ uri: props.source }}
          style={{ height: 200, width: "100%", alignSelf: "center" }}
        /> */}
        <View style={{ marginVertical: 40 }}>
          <TouchableOpacity onPress={() => props.setPopupFalse()}>
            <View
              style={{
                backgroundColor: "white",
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
                height: 40,
                width: 40
              }}
            >
              <Image
                resizeMode="contain"
                source={IMAGES.CROSS}
                style={{ width: 20, height: 20, tintColor: "black" }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  tabsbuttonStyle: {
    //  backgroundColor: "#631255",
    height: hp(4),
    alignSelf: "center",
    borderRadius: wp(5),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(1),
    flexDirection: "row"
  },
  locationTextStyle: {
    fontSize: SPACING,
    color: "#fff"
    //  fontFamily: "montserrat_arabic_regular"
  },
  controlBar: {
    position: "absolute",
    width: wp(84),
    top: hp(17.8) + height / 10,
    left: wp(8),
    alignSelf: "center",
    paddingHorizontal: SPACING / 2,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});
export default VideoPlayerPopup;
