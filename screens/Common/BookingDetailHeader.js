import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import theme from "../../assets/Colors";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
const Header = ({
  location,
  chatButtonPress,
  onBackPress,
  onLanguageSwitch,
  HeaderText,
  borderbottomWidth,
  lan
}) => {
  return (
    <View
      style={[
        styles.containerStyle,
        {
          borderBottomWidth: 2,
          flexDirection: lan == "en" ? "row" : "row-reverse"
        }
      ]}
    >
      <View style={styles.leftContainer}>
        <Ionicons
          name={lan == "en" ? "md-arrow-back" : "md-arrow-back"}
          size={26}
          color={theme.brownColor}
          onPress={onBackPress}
        />
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.headerTextStyle}>{HeaderText}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={onLanguageSwitch}>
          {/* <Text style={styles.languageTextStyle}>
            {lan == "en" ? "العربية" : "English"}
          </Text> */}
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
    borderColor: theme.brownColor
  },
  leftContainer: {
    width: wp(10),
    height: hp(7),
    justifyContent: "center",
    alignItems: "center"
  },
  middleContainer: {
    width: wp(80),
    height: hp(7),
    justifyContent: "center",
    alignItems: "center"
  },
  rightContainer: {
    width: wp(10),
    height: hp(7),
    justifyContent: "center",
    alignItems: "center"
  },
  locationTextStyle: {
    color: theme.brownColor,
    fontSize: 16,
    fontFamily: "montserrat_arabic_regular"
  },
  languageTextStyle: {
    color: theme.brownColor,
    fontSize: 16,
    textAlign: "right",
    fontFamily: "montserrat_arabic_regular"
  },
  headerTextStyle: {
    color: theme.brownColor,
    fontSize: 18,
    fontFamily: "montserrat_arabic_regular"
    // fontWeight: "bold"
  }
});
