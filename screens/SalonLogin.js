import * as Analytics from "expo-firebase-analytics";
import * as Permissions from "expo-permissions";

import {
  AsyncStorage,
  Dimensions,
  Image,
  Linking,
  Modal,
  TouchableOpacity,
  View
} from "react-native";
import {
  Body,
  Button,
  Container,
  Content,
  Icon,
  Input,
  Item,
  Text,
  Thumbnail,
  Title,
  Toast
} from "native-base";

import { Ionicons } from "@expo/vector-icons";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import theme from "../assets/Colors";

let persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g
];
let arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g
];
// let arabicNumbers = [
//   /0/g,
//   /1/g,
//   /2/g,
//   /3/g,
//   /4/g,
//   /5/g,
//   /6/g,
//   /7/g,
//   /8/g,
//   /9/g
// ];
export default class SalonLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      otp: "",
      token: "",
      loading: false,
      lan: "en",
      referralCode: "",
      user: {},
      referralModalVisible: false,
      otpid: ""
    };
  }
  componentDidMount = () => {
    this.registerForPushNotificationAsync();
    const { navigation } = this.props;
    let lan = navigation.getParam("lan");
    this.setState({ lan: lan });
  };
  registerForPushNotificationAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    this.setState({ token: token });
  };
  verifyReferral = () => {
    if (this.state.referralCode !== "") {
      fetch(
        "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/verify_customer_login_otp",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            otpid: this.state.otpid,
            otpentered: this.state.referralCode
          })
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error == false) {
            this.saveUserInformation(responseJson);
            // Toast.show({
            //   text: responseJson.message,
            //   position: "bottom",
            //   duration: 3000
            // });
          } else {
            Toast.show({
              text: responseJson.message,
              position: "bottom",
              duration: 3000
            });
          }

          this.setState({ loading: false });
        })
        .catch(error => {});
    } else {
      Toast.show({
        text:
          this.state.lan === "en"
            ? "Please enter referral code, if any?"
            : "يرجى ادخال رمز الدعوة، اذا موجود؟",
        position: "bottom"
      });
    }
  };
  saveUserInformation = async user => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {}
    if (this.state.referralModalVisible == true) {
      this.setState({ referralModalVisible: false });
    }
    this.setState({ loading: false, user: user, referralModalVisible: false });
    this.props.navigation.goBack();
  };
  hideReferralModal = () => {
    this.saveUserInformation(this.state.user);
  };
  loginUser = async () => {
    if (
      this.state.mobile !== "" &&
      this.state.mobile.charAt(0) == 0 &&
      this.state.mobile.charAt(1) == 5 &&
      this.state.mobile.length == 10
    ) {
      await Analytics.logEvent("Login", {
        name: "Login",
        screen: "loginScreen",
        purpose: "loggin in"
      });
      fetch(
        "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/customer_login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            mobile: this.state.mobile,
            customerdeviceid: this.state.token
          })
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error === false) {
            this.setState({
              fisttime: responseJson.firsttime,
              user: responseJson,
              // referralModalVisible: responseJson.firsttime == 1 ? true : false,
              referralModalVisible: true,
              otpid: responseJson.otpid,
              loading: false
            });
          } else {
            Toast.show({
              text: responseJson.message,
              position: "bottom"
            });
            this.setState({ loading: false });
          }
        })
        .catch(error => {
          this.setState({ loading: false });
        });
    } else {
      Toast.show({
        text:
          this.state.lan === "en"
            ? "Please enter your valid mobile number!"
            : "يرجى إدخال رقم الجوال بشكل صحيح",
        position: "bottom"
      });
    }
  };
  openChat = () => {
    Linking.openURL("https://wa.me/+966577311430");
  };
  render() {
    return (
      <Container style={{ backgroundColor: theme.brownColor }}>
        <Content>
          <Spinner visible={this.state.loading} textContent={""} />
          <View
            style={{
              alignSelf: "center",
              marginTop: 45,
              marginLeft: 7,
              marginRight: 7
            }}
          >
            {this.state.lan == "en" ? (
              <Image
                style={{
                  width: Dimensions.get("screen").width - 8,
                  height: 278,
                  alignSelf: "center"
                }}
                resizeMode="contain"
                source={require("../assets/Sign-In-Image-min.png")}
              />
            ) : (
              <Image
                style={{
                  width: Dimensions.get("screen").width - 8,
                  height: 278,
                  alignSelf: "center"
                }}
                resizeMode="contain"
                source={require("../assets/Sign-In-Image-min.png")}
              />
            )}

            <View
              style={{
                borderColor: "#9fc7db",
                backgroundColor: "#9fc7db",
                width: Dimensions.get("screen").width,
                height: 83
              }}
            >
              {this.state.lan == "en" ? (
                <Image
                  source={require("../assets/login-screen-icons/welcome-logo.png")}
                  style={{ width: 190, height: 70, alignSelf: "center" }}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../assets/login-screen-icons/Wellcome-Logo-min_ar.png")}
                  style={{ width: 190, height: 70, alignSelf: "center" }}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>

          <View
            style={{
              marginTop: 50,
              width: Dimensions.get("screen").width - 40,
              height: 170,
              backgroundColor: "white"
            }}
          >
            <View style={{ flexDirection: "row", marginTop: 30 }}>
              <View style={{ marginTop: 15, marginLeft: 8 }}>
                <Image
                  source={require("../assets/login-screen-icons/Mobile.png")}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
              </View>
              <Input
                style={{
                  textAlign: this.state.lan == "en" ? "left" : "right",
                  backgroundColor: "white",
                  paddingTop: 24
                }}
                placeholder="05XXXXXXXX"
                placeholderTextColor="lightgray"
                keyboardType="phone-pad"
                returnKeyType="done"
                maxLength={10}
                onChangeText={phone => {
                  // fixNumbers = phone => {
                  if (typeof phone === "string") {
                    for (var i = 0; i < 10; i++) {
                      phone = phone.replace(arabicNumbers[i], i);
                    }
                  }
                  // return phone;
                  this.setState({ mobile: phone.replace(/[^0-9]/g, "") });
                  // };
                }}
              />
            </View>

            <View
              style={{
                marginLeft: 14,
                width: Dimensions.get("screen").width - 120,
                borderWidth: 0.5,
                borderColor: "#6ea8cd",
                backgroundColor: "#6ea8cd"
              }}
            ></View>

            {/* <View style={{ flexDirection: "row", marginTop: 15 }}>
              <View style={{ marginTop: 15, marginLeft: 8 }}>
                <Image
                  source={require("../assets/login-screen-icons/OTP.png")}
                  style={{ width: 30, height: 30 }}
                  resizeMode="contain"
                />
              </View>
              <Input
                style={{
                  textAlign: this.state.lan == "en" ? "left" : "right",
                  backgroundColor: "white",
                  paddingTop: 24
                }}
                placeholder={this.state.lan == "en" ? "Enter OTP" : "الكود"}
                placeholderTextColor="lightgray"
                keyboardType="phone-pad"
                returnKeyType="done"
                maxLength={4}
                onChangeText={otp => {
                  this.setState({ otp: otp.replace(/[^0-9]/g, "") });
                }}
              />
            </View> */}
            <View
              style={{
                marginLeft: 14,
                width: Dimensions.get("screen").width - 120,
                borderWidth: 0.5,
                borderColor: "#6ea8cd",
                backgroundColor: "#6ea8cd"
              }}
            ></View>
            {/* <View
              style={{ marginLeft: 14, flexDirection: "row", marginTop: 50 }}
            >
              <Text style={{ color: "lightgray", paddingTop: 6 }}>
                {this.state.lan == "en"
                  ? "Did'nt Received OTP?"
                  : "لم استلم الكود؟"}
              </Text>
              <TouchableOpacity onPress={this.openChat}>
                <Image
                  source={require("../assets/login-screen-icons/Call.png")}
                  style={{ width: 30, height: 30, marginLeft: 4 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View> */}
            <View
              style={{
                position: "absolute",
                right: -15,
                width: 46,
                top: -5,
                height: 245,
                backgroundColor: theme.brownColor,
                transform: [{ rotate: "6deg" }]
              }}
            ></View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: "lightgray",
                  alignSelf: "center",
                  marginTop: 12
                }}
              >
                {this.state.lan == "en"
                  ? "Please Enter Your Mobile Number"
                  : "يرجى إدخال رقم جوالك"}
              </Text>
            </View>
            <TouchableOpacity onPress={this.loginUser}>
              <View style={{ position: "absolute", right: 0, bottom: 60 }}>
                {this.state.lan == "en" ? (
                  <Image
                    source={require("../assets/Submit-min.png")}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={require("../assets/Submit-min.png")}
                    style={{ width: 60, height: 60 }}
                    resizeMode="contain"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.referralModalVisible}
          >
            <View
              style={{
                marginTop: 150,
                alignSelf: "center",
                height: 235,
                borderRadius: 20,
                width: 330,
                backgroundColor: theme.brownColor
              }}
            >
              <View style={{ flex: 1, alignSelf: "center", marginTop: -24 }}>
                <Thumbnail source={require("../assets/OTP-min.png")} />
              </View>
              <View style={{ position: "absolute", right: 6, top: 8 }}>
                <Ionicons
                  onPress={() => this.setState({ referralModalVisible: false })}
                  name="ios-close-circle-outline"
                  size={30}
                  color="red"
                />
              </View>
              <View
                style={{ alignSelf: "center", position: "absolute", top: 70 }}
              >
                {this.state.lan === "en" ? (
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      alignSelf: "center"
                    }}
                  >
                    Please enter the 4 digit OTP code.
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "montserrat_arabic_regular",
                      color: "white",
                      fontSize: 12,
                      alignSelf: "center"
                    }}
                  >
                    أدخل الرمز 4 أرقام المرسل لجوالك
                  </Text>
                )}

                <Input
                  style={{
                    width: 160,
                    textAlign: "center",
                    height: 30,
                    backgroundColor: "white",
                    borderRadius: 2,
                    marginTop: 10,
                    alignSelf: "center"
                  }}
                  keyboardType="default"
                  maxLength={4}
                  returnKeyType="done"
                  onChangeText={ref => {
                    if (typeof ref === "string") {
                      for (var i = 0; i < 10; i++) {
                        ref = ref.replace(arabicNumbers[i], i);
                      }
                    }
                    this.setState({ referralCode: ref });
                  }}
                  placeholderTextColor="#cdd0d4"
                  // placeholder={this.state.lan === "en" ? "Code" : "رمز"}
                  placeholder={this.state.lan === "en" ? "XXXX" : "XXXX"}
                />
                <Button
                  onPress={this.verifyReferral}
                  style={{
                    borderRadius: 15,
                    height: 32,
                    backgroundColor: theme.yellow,
                    top: 15,
                    alignSelf: "center"
                  }}
                >
                  <View>
                    {this.state.lan === "en" ? (
                      <Text style={{ color: "white", textAlign: "center" }}>
                        Login
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontFamily: "montserrat_arabic_regular",
                          color: "white",
                          textAlign: "center"
                        }}
                      >
                        {" "}
                        تسليم{" "}
                      </Text>
                    )}
                  </View>
                </Button>
                {this.state.lan === "en" ? (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",
                      marginTop: 25,
                      flexWrap: "wrap",
                      flex: 1,
                      textAlign: "center"
                    }}
                  >
                    {/* To proceed without a referral code, close the pop-up */}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",
                      marginTop: 25,
                      flexWrap: "wrap",
                      flex: 1,
                      fontFamily: "montserrat_arabic_regular",
                      textAlign: "center"
                    }}
                  >
                    {/* للإستمرار بدون رمز الدعوة، اغلق الشاشه المنبثقة */}
                  </Text>
                )}
              </View>
            </View>
          </Modal>
        </Content>
      </Container>
    );
  }
}
