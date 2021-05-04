import React from "react";
import {
  Platform,
  View,
  Image,
  Dimensions,
  Share,
  ImageBackground,
  Linking,
  TouchableOpacity,
  BackHandler
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  ActionSheet,
  Button,
  Left,
  Right,
  Text
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import Spinner from "react-native-loading-spinner-overlay";
import call from "react-native-phone-call";
var BUTTONS = ["Call", "Email", "Cancel"];
var ArBUTTONS = ["اتصل", "البريد الإلكتروني", "إلغاء"];
var CANCEL_INDEX = 2;
export default class HelpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "",
      lan: "en",
      help: {},
      loading: false
    };
  }
  openFaqs = () => {
    if (this.state.lan === "en") {
      WebBrowser.openBrowserAsync(this.state.help.faq.en_url);
    } else {
      WebBrowser.openBrowserAsync(this.state.help.faq.en_url);
      // WebBrowser.openBrowserAsync(this.state.help.faq.ar_url);
    }
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
  componentDidMount = () => {
    const { navigation } = this.props;
    const lan = navigation.getParam("lan");
    this.setState({ loading: true });
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/testApi/V1/help",
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
        this.setState({ help: responseJson, lan: lan, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  openPrivacyFaqs = () => {
    if (this.state.lan === "en") {
      WebBrowser.openBrowserAsync(this.state.help.privacy_faq.en_url);
    } else {
      WebBrowser.openBrowserAsync(this.state.help.privacy_faq.en_url);
      // WebBrowser.openBrowserAsync(this.state.help.privacy_faq.ar_url);
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
                Help
              </Title>
            ) : (
              <Title
                style={{
                  fontFamily: "montserrat_arabic_regular",
                  textAlign: "left",
                  color: "#0866b0",
                  fontSize: 18
                }}
              >
                مساعدة
              </Title>
            )}
          </View>
          <Right />
        </Header>
        <View>
          <Spinner visible={this.state.loading} textContent={""} />
          <ImageBackground
            source={require("../../assets/background-images/Category-Background-Image.png")}
            resizeMode="cover"
            style={{
              width: Dimensions.get("screen").width - 30,
              alignSelf: "center",
              height: Dimensions.get("screen").height - 60
            }}
          >
            <View style={{ marginTop: Dimensions.get("screen").height / 3.5 }}>
              <TouchableOpacity onPress={this.openFaqs}>
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
                      {this.state.lan == "en" ? "FAQs" : "اسئلة مكرره"}
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

              <TouchableOpacity onPress={this.openPrivacyFaqs}>
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
                        ? "Privacy FAQs"
                        : "أسئلة شائعة حول سياسة الخصوصية"}
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
                onPress={() =>
                  ActionSheet.show(
                    {
                      options: lan === "en" ? BUTTONS : ArBUTTONS,
                      cancelButtonIndex: CANCEL_INDEX,
                      title: lan === "en" ? "Contact Us" : "تواصل بنا"
                    },
                    buttonIndex => {
                      if (
                        BUTTONS[buttonIndex] === "Email" ||
                        buttonIndex == 1
                      ) {
                        Linking.openURL("mailto:info@wafarnalak.com");
                      }
                      if (BUTTONS[buttonIndex] === "Call" || buttonIndex == 0) {
                        const args = {
                          number: "+966577311430",
                          prompt: false
                        };
                        call(args);
                      }
                    }
                  )
                }
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
                      {this.state.lan == "en" ? "Contact Us" : "تواصل بنا"}
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
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}
