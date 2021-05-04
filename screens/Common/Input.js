import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import Reinput from "reinput";
class Input extends Component {
  render() {
    const {
      showEye,
      leftImage,
      leftImageSrc,
      rightImage,
      rightImageSrc,
      placeholder,
      onChangeText,
      value,
      keyboardType,
      returnType,
      secureTextEntry,
      onFocus,
      onBlur,
      onEyeButtonPress,
      renderReinput,
      reinputLabel,
      onRightIconPress,
      onTouchStart,
      borderColor,
      editable
    } = this.props;
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 55,
          width: wp("90%"),
          paddingLeft: wp("2%"),
          marginTop: hp("2%"),
          borderRadius: wp("7%"),
          borderWidth: 1,
          borderColor: "white",
          backgroundColor: "white"
        }}
      >
        {leftImage ? (
          <Image source={leftImageSrc} style={styles.leftImage} />
        ) : null}
        <View style={{ width: wp("70%") }}>
          {!renderReinput ? (
            <TextInput
              placeholder={placeholder}
              keyboardType={keyboardType}
              placeholderTextColor={"gray"}
              style={{
                width: wp("70%"),
                color: "white",
                paddingLeft: wp("3%")
              }}
              editable={editable}
              onChangeText={onChangeText}
              value={value}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              onFocus={onFocus}
              onTouchStart={onTouchStart}
            />
          ) : (
            <Reinput
              label={reinputLabel}
              value={value}
              labelActiveColor="orange"
              labelColor={value.length > 0 ? "orange" : "#757575"}
              underlineHeight={0}
              underlineActiveHeight={0}
              onChangeText={onChangeText}
              onFocus={onFocus}
              onBlur={onBlur}
              marginBottom={0}
              paddingBottom={0}
              paddingTop={15}
              marginLeft={15}
              labelActiveTop={-17}
              secureTextEntry={secureTextEntry}
              height={50}
              color="white"
              fontSize={14}
              keyboardType={keyboardType}
            />
          )}
        </View>
        {showEye ? (
          <TouchableOpacity
            style={styles.eyeButtonView}
            onPress={onEyeButtonPress}
          >
            {/* {
                                secureTextEntry ?
                                    <Icon name='ios-eye-off-outline' size={25} color='white' style={{ alignSelf: 'center' }} /> :
                                    <Icon name='ios-eye-outline' size={25} color='white' style={{ alignSelf: 'center' }} />
                            } */}
          </TouchableOpacity>
        ) : rightImageSrc !== null ? (
          <TouchableOpacity
            style={styles.eyeButtonView}
            onPress={onRightIconPress}
          >
            <Image source={rightImageSrc} style={styles.rightImage} />
          </TouchableOpacity>
        ) : (
          <View style={styles.eyeButtonView} />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  InputView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 55,
    width: wp("90%"),
    paddingLeft: wp("2%"),
    marginTop: hp("2%"),
    borderRadius: wp("7%"),
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white"
  },
  input: {
    width: wp("70%"),
    color: "white",
    paddingLeft: wp("3%")
  },
  eyeButtonView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    right: wp("4%"),
    zIndex: 1
  },
  leftImage: {
    width: 30,
    height: 30,
    left: wp("2%")
  },
  rightImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    right: wp("2%")
  }
});
export default Input;
