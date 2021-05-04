import * as Analytics from "expo-firebase-analytics";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import {
  Accordion,
  Badge,
  Container,
  Left,
  Right,
  Text,
  Toast
} from "native-base";
import {
  Animated,
  AsyncStorage,
  Dimensions,
  FlatList,
  I18nManager,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  View
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";

import CategoryCard from "./categories/categoryCard";
import Constants from "expo-constants";

import React from "react";

import Spinner from "react-native-loading-spinner-overlay";
import VarientbaseJob from "./jobs/varientbaseJob";

``;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = Platform.OS == "android" ? 320 : 335;
const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;

export default class Switching extends React.Component {
  nScroll = new Animated.Value(0);
  scroll = new Animated.Value(0);
  tabYButton = this.nScroll.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.7, 0]
  });
  imgScale = this.nScroll.interpolate({
    inputRange: [-25, 0],
    outputRange: [1.2, 1],
    extrapolateRight: "clamp"
  });
  tabY = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1]
  });
  constructor(props) {
    super(props);

    this.state = {
      lan: "en",
      offersUrls: [],
      dataSource: [],
      deals: [],
      categories: [],
      isEnabled: false,
      isRefresh: false,
      setIsEnabled: true,
      services: [],
      selectedCategoryId: 0,
      products: [],
      selectedServices: [],
      cartDetails: [],
      freshCategories: [],
      isReversed: false,
      toolTipVisible: -1,
      scrollY: new Animated.Value(0),
      location: "",
      user: null,
      note: ""
    };
  }
  componentDidMount = async () => {
    await AsyncStorage.removeItem("jobs");
    let lan = await AsyncStorage.getItem("lan");
    let user = await AsyncStorage.getItem("user");
    this.setState({
      lan: lan !== null ? lan : "en",
      user: user !== null ? JSON.parse(user) : null
    });
    this.checkUserLocation();
  };
  checkUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Toast.show({
        text:
          this.state.lan == "en"
            ? "Please allow location permission"
            : "يرجى السماح لتحديد الموقع",
        position: "bottom"
      });
    } else {
      const mylocation = await Location.getCurrentPositionAsync({});

      const geocode = await Location.reverseGeocodeAsync(mylocation.coords);

      this.setState({ location: geocode[0].city });
    }
  };

  openChat = () => {
    Linking.openURL("https://wa.me/+966577311430");
  };
  getOffers = () => {
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/get_banners",
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
        let ban = ([] = []);
        let urls = ([] = []);
        ban =
          this.state.lan === "en"
            ? responseJson.banners.enbanners
            : responseJson.banners.arbanners;
        ban.forEach(ban => {
          let actualUrl =
            "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/" +
            ban.banner.url;
          urls.push(actualUrl);
        });
        this.setState({ dataSource: ban, offersUrls: urls });
      })
      .catch(error => {});
  };
  toggleSwitch = value => {
    this.setState({ isEnabled: !this.state.isEnabled });
  };
  categorySelection = async category => {
    this._accordion.setSelected(-1);
    this.setState({
      selectedCategoryId: category.id,
      products: category.products,
      toolTipVisible: false
    });
  };

  switchLanguage = async () => {
    let lan = await AsyncStorage.getItem("lan");
    let previousLan = lan !== null ? lan : "en";
    if (previousLan == "en") {
      this.changetoArabic();
    } else {
      this.changetoEnglish();
    }
  };
  changetoEnglish = async () => {
    await AsyncStorage.setItem("lan", "en");
    I18nManager.isRTL = false;
    I18nManager.forceRTL(false);
    await Updates.reloadAsync();
    //this.updateLanguage(1);
  };
  changetoArabic = async () => {
    await AsyncStorage.setItem("lan", "ar");
    I18nManager.isRTL = true;
    I18nManager.forceRTL(true);
    await Updates.reloadAsync();
    //this.updateLanguage(2);
  };

  render() {
    const portion = Dimensions.get("screen").width / 4;

    return (
      <Container>
        <View
          style={{
            backgroundColor: "white",
            marginTop: Constants.statusBarHeight,
            marginBottom: 110
          }}
        >
          {
            <NavigationEvents
              onWillFocus={() => {
                this.clearJobs();
              }}
            />
          }
          <Spinner visible={this.state.loading} textContent={""} />
          <View>
            <View
              style={{
                width: Dimensions.get("screen").width - 30,
                alignSelf: "center",
                borderTopWidth: 0,
                borderBottomWidth: 2,
                borderColor: "#0764af",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  width: portion,
                  height: 50
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-start",
                    justifyContent: "center",
                    flex: 2
                  }}
                >
                  {this.state.lan == "en" ? (
                    <Text
                      style={{
                        color: "#0764af",
                        fontSize: 16,
                        fontFamily: "montserrat_semi_blod"
                      }}
                    >
                      {this.state.location}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#0764af",
                        fontSize: 16,
                        alignSelf: "flex-end"
                      }}
                    >
                      {this.state.location}
                    </Text>
                  )}
                </View>
              </View>

              <TouchableOpacity onPress={this.openChat}>
                <View
                  style={{
                    width: portion,
                    borderRightWidth: 0,
                    borderRightColor: "#0764af"
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                      flex: 1
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../assets/Help-min.png")}
                        style={{ width: 25, height: 25 }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.switchLanguage}>
                <View>
                  <View
                    style={{
                      alignSelf: "flex-end",
                      justifyContent: "center",
                      flex: 2
                    }}
                  >
                    <View style={{ width: portion }}>
                      <View
                        style={{
                          justifyContent: "center"
                        }}
                      >
                        <Text
                          style={{
                            color: "#0764af",
                            fontSize: 16,
                            textAlign: "right",
                            fontFamily: "montserrat_arabic_regular"
                          }}
                        >
                          {this.state.lan == "en" ? "العربية" : "English"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Image
            source={require("../assets/Logo-min.png")}
            style={{
              width: wp(40),
              height: hp(12),
              resizeMode: "contain",
              alignSelf: "center"
            }}
          />
          <View style={{ marginTop: hp(13) }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("LandingSecreen")}
            >
              <Image
                source={require("../assets/House-Repair-min.png")}
                style={{
                  width: wp(70),
                  height: hp(20),
                  resizeMode: "stretch",
                  alignSelf: "center"
                }}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => this.props.navigation.navigate("SalonsLanding")}
            >
              <Image
                source={require("../assets/Women-Salon-Booking-min.png")}
                style={{
                  width: wp(70),
                  height: hp(20),
                  resizeMode: "stretch",
                  alignSelf: "center",
                  marginTop: hp(4)
                }}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </Container>
    );
  }
}
