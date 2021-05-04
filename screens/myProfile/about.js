import React from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Linking,
  BackHandler
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Text
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
export default class AboutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "",
      about: {},
      lan: "en"
    };
  }
  componentDidMount = () => {
    const { navigation } = this.props;
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/testApi/V1/about",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ about: responseJson, lan: navigation.getParam("lan") });
      })
      .catch(error => {});

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  showPrivacyPolicy = async lan => {
    if (lan === "en") {
      WebBrowser.openBrowserAsync(this.state.about.privacy_policy.en_url);
    } else {
      WebBrowser.openBrowserAsync(this.state.about.privacy_policy.ar_url);
    }
  };
  showTermsAndCondition = lan => {
    if (lan === "en") {
      WebBrowser.openBrowserAsync(this.state.about.terms_conditions.en_url);
    } else {
      WebBrowser.openBrowserAsync(this.state.about.terms_conditions.ar_url);
    }
  };
  showAboutUs = lan => {
    if (lan === "en") {
      WebBrowser.openBrowserAsync(this.state.about.about_us.en_url);
    } else {
      WebBrowser.openBrowserAsync(this.state.about.about_us.en_url);
    }
  };
  render() {
    const { navigation } = this.props;
    const lan = navigation.getParam("lan");
    return (
      <View style={{ flex: 1 }}>
        <Header
          style={{
            marginTop: 0,
            backgroundColor: "white",
            height: 60,
            borderBottomColor: "#0866b0",
            borderBottomWidth: 1,
            justifyContent: "center"
          }}
        >
          <Left style={{ marginLeft: 10 }}>
            {lan === "en" ? (
              <Ionicons
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                name={"chevron-back-outline"}
                size={40}
                color={"#0866b0"}
              />
            ) : (
              <Ionicons
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                name={"chevron-forward-outline"}
                size={40}
                color={"#0866b0"}
              />
            )}
          </Left>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              position: Platform.OS === "android" ? "absolute" : "relative",
              alignSelf: "center"
            }}
          >
            {lan === "en" ? (
              <Title
                style={{
                  fontFamily: "montserrat_semi_blod",
                  color: "#0866b0",
                  fontSize: 18
                }}
              >
                {this.state.lan == "en" ? "About" : "عن"}
              </Title>
            ) : (
              <Title
                style={{
                  fontFamily: "montserrat_semi_blod",
                  textAlign: "left",
                  color: "#0866b0",
                  fontSize: 18
                }}
              >
                عن
              </Title>
            )}
          </View>
          <Right />
        </Header>

        <View>
          <ImageBackground
            source={require("../../assets/background-images/Category-Background-Image.png")}
            resizeMode="cover"
            style={{
              width: Dimensions.get("screen").width - 30,
              alignSelf: "center",
              height: Dimensions.get("screen").height - 60
            }}
          >
            <View style={{ marginTop: Dimensions.get("screen").height / 4 }}>
              <TouchableOpacity onPress={() => this.showPrivacyPolicy(lan)}>
                <View
                  style={{
                    width: Dimensions.get("screen").width - 60,
                    backgroundColor: "white",
                    alignSelf: "center",

                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 15,
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: "#4a4b4c" }}>
                      {this.state.lan == "en"
                        ? "Privacy Policy"
                        : "سياسة الخصوصية"}
                    </Text>
                    <Ionicons
                      name={
                        this.state.lan == "en"
                          ? "chevron-forward-outline"
                          : "chevron-back-outline"
                      }
                      size={25}
                      color={"#0866b0"}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  width: Dimensions.get("screen").width - 60,
                  height: 1,
                  backgroundColor: "lightgray",
                  alignSelf: "center"
                }}
              ></View>
              <TouchableOpacity onPress={() => this.showTermsAndCondition(lan)}>
                <View
                  style={{
                    width: Dimensions.get("screen").width - 60,
                    backgroundColor: "white",
                    alignSelf: "center"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 15,
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: "#4a4b4c" }}>
                      {this.state.lan == "en"
                        ? "Terms & Conditions"
                        : "الشروط والاحكام"}
                    </Text>
                    <Ionicons
                      name={
                        this.state.lan == "en"
                          ? "chevron-forward-outline"
                          : "chevron-back-outline"
                      }
                      size={25}
                      color={"#0866b0"}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: Dimensions.get("screen").width - 60,
                  height: 1,
                  backgroundColor: "lightgray",
                  alignSelf: "center"
                }}
              ></View>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://وفرنالك.com");
                }}
              >
                <View
                  style={{
                    width: Dimensions.get("screen").width - 60,
                    backgroundColor: "white",
                    alignSelf: "center"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 15,
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: "#4a4b4c" }}>
                      {this.state.lan == "en"
                        ? "Our Website"
                        : "موقعنا الإلكتروني"}
                    </Text>
                    <Ionicons
                      name={
                        this.state.lan == "en"
                          ? "chevron-forward-outline"
                          : "chevron-back-outline"
                      }
                      size={25}
                      color={"#0866b0"}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <View
                style={{
                  width: Dimensions.get("screen").width - 60,
                  height: 1,
                  backgroundColor: "lightgray",
                  alignSelf: "center"
                }}
              ></View>
              <TouchableOpacity
                onPress={() => {
                  this.showAboutUs(lan);
                }}
              >
                <View
                  style={{
                    width: Dimensions.get("screen").width - 60,
                    backgroundColor: "white",
                    alignSelf: "center",
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 15,
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: "#4a4b4c" }}>
                      {this.state.lan == "en" ? "About Us" : "عنا"}
                    </Text>
                    <Ionicons
                      name={
                        this.state.lan == "en"
                          ? "chevron-forward-outline"
                          : "chevron-back-outline"
                      }
                      size={25}
                      color={"#0866b0"}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              <View style={{ marginTop: 60 }}>
                {lan === "en" ? (
                  <Text style={{ alignSelf: "center", color: "#4a4b4c" }}>
                    {this.state.lan == "en" ? "Follow Us on" : "تابعونا على"}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "montserrat_semi_blod",
                      textAlign: "left",
                      alignSelf: "center",
                      color: "#4a4b4c"
                    }}
                  >
                    تابعونا على
                  </Text>
                )}

                <View style={{ alignSelf: "center", flexDirection: "row" }}>
                  <View>
                    <Ionicons
                      onPress={() => {
                        Linking.openURL("https://www.facebook.com/wafarnalak/");
                      }}
                      name="logo-facebook"
                      size={35}
                      color="blue"
                    />
                  </View>
                  <View style={{ marginLeft: 20, marginRight: 20 }}>
                    <Ionicons
                      onPress={() => {
                        Linking.openURL("https://twitter.com/wafarnalak");
                      }}
                      name="logo-twitter"
                      size={35}
                      color="skyblue"
                    />
                  </View>
                  <View style={{ marginRight: 20 }}>
                    <Ionicons
                      onPress={() => {
                        Linking.openURL(
                          "https://www.instagram.com/wafarnalak/"
                        );
                      }}
                      name="logo-instagram"
                      size={35}
                      color="black"
                    />
                  </View>
                  <View>
                    <Ionicons
                      onPress={() => {
                        Linking.openURL(
                          "https://www.youtube.com/channel/UCIRIzrrUlFh47G8kCQXfCtw"
                        );
                      }}
                      name="logo-youtube"
                      size={35}
                      color="red"
                    />
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}
