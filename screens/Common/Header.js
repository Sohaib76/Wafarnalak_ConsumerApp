import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import theme from "../../assets/Colors";
import { TouchableHighlight } from "react-native-gesture-handler";
const Header = ({ location, chatButtonPress, lan, onLanguageSwitch }) => {
  console.log("lan");
  return (
    <View style={styles.containerStyle}>
      <View style={styles.leftContainer}>
        <Text style={styles.locationTextStyle}>{location}</Text>
      </View>
      <View style={styles.middleContainer}>
        <TouchableOpacity onPress={chatButtonPress}>
          <Image
            source={require("../../assets/Help-min.png")}
            style={{ width: 25, height: 25, tintColor: theme.brownColor }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={onLanguageSwitch}>
          <Text style={styles.languageTextStyle}>
            {lan == "en" ? "العربية" : "English"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: theme.brownColor
  },
  leftContainer: {
    width: wp(25),
    height: hp(7),
    justifyContent: "center",
    alignItems: "center"
  },
  middleContainer: {
    width: wp(50),
    height: hp(7),
    justifyContent: "center",
    alignItems: "center"
  },
  rightContainer: {
    width: wp(25),
    height: hp(7),
    justifyContent: "center",
    alignItems: "center"
  },
  locationTextStyle: {
    color: theme.brownColor,
    fontSize: wp(3),
    fontFamily: "montserrat_arabic_regular"
  },
  languageTextStyle: {
    color: theme.brownColor,
    fontSize: wp(3),
    textAlign: "right",
    fontFamily: "montserrat_arabic_regular"
  }
});
