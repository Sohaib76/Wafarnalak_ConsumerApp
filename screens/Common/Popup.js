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
  Modal,
} from "react-native";
import { IMAGES } from "../../assets/Images";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("screen");
const SPACING = (height / width) * 9;
const AVATAR_SIZE = (height / width) * 40;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const Popup = (props) => {
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
          // height: 150,
          height: 100,
          // width: wp(70),
          width: wp(40),
          position: "absolute",
          bottom: 100,
          backgroundColor: "white",
          // paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 20,
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignSelf: "flex-end" }}>
          <TouchableOpacity onPress={() => props.setPopupFalse()}>
            <Image
              style={{ height: 20, width: 20, marginRight: 10 }}
              source={IMAGES.CROSS}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            height: "70%",
            width: "100%",
            marginTop: 10,
          }}
        >
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              alignSelf: "center",
              width: "60%"
            }}
          >
            <TouchableOpacity onPress={() => props.setTakePicture()}>
              <Image style={{ height: 40, width: 40 }} source={IMAGES.CAMERA} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.pickDocument()}>
              <Image
                style={{ height: 40, width: 40 }}
                source={IMAGES.DOCUMENT}
              />
            </TouchableOpacity>
          </View> */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              // alignSelf: "center",
              width: "30%",
            }}
          >
            <TouchableOpacity onPress={() => props.sendLocation()}>
              <Image
                style={{ height: 40, width: 40, marginLeft: 35 }}
                source={IMAGES.LOCATION}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.uploadPicture()}>
              <Image
                style={{ height: 40, width: 40, marginLeft: 20 }}
                source={IMAGES.IMAGES}
              />
            </TouchableOpacity>
          </View>
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
    flexDirection: "row",
  },
  locationTextStyle: {
    fontSize: SPACING,
    color: "#fff",
    //  fontFamily: "montserrat_arabic_regular"
  },
  controlBar: {
    position: "absolute",
    width: wp(84),
    top: hp(17.8) + height / 10,
    // left: wp(8),
    alignSelf: "center",
    paddingHorizontal: SPACING / 2,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
export default Popup;
