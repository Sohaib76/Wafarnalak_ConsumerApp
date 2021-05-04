import React from "react";
import {
  View,
  Image,
  Platform,
  Dimensions,
  Modal,
  Alert,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  I18nManager,
  StyleSheet
} from "react-native";
import {
  Container,
  Accordion,
  Toast,
  Title,
  Content,
  Thumbnail,
  Button,
  Text,
  Badge,
  Left,
  Right,
  Footer
} from "native-base";
import * as StoreReview from "expo-store-review";
import { Ionicons } from "@expo/vector-icons";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationEvents } from "react-navigation";
import * as Analytics from "expo-firebase-analytics";
import theme from "../assets/Colors";
import Header from "../screens/Common/Header";

export default class BookingProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      modalVisible: false,
      lan: "en",
      user: {},
      cartItem: 0,
      location: "",
      Salon: false,
      cart: false,
      Profile: true
    };
  }
  componentDidMount = async () => {
    const { navigation } = this.props;
    let user = await AsyncStorage.getItem("user");
    if (user !== null) {
      this.setState({
        cartItem: navigation.getParam("cartItem"),
        user: JSON.parse(user),
        isLogin: true,
        lan: navigation.getParam("lan"),
        location: navigation.getParam("location")
      });
    } else {
      this.setState({ lan: navigation.getParam("lan") });
    }
    this.checkUserLocation();
  };

  checkUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Toast.show({
        text:
          lan == "en"
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
  logoutUser = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("jobs");
    await AsyncStorage.removeItem("address");
    this.setState({ isLogin: false, cartItem: 0 });
  };
  authenticateUser = () => {
    this.props.navigation.navigate("SalonLogin", { lan: this.state.lan });
  };
  displayLanguageModal = () => {
    this.setState({ modalVisible: true });
  };
  hideModal = () => {
    this.setState({ modalVisible: false });
  };
  likeForense = () => {
    if (this.state.lan === "en") {
      Alert.alert(
        "Would you mind rating Wafarnalak?",
        "It wont take more than a minute and helps to promote our app. Thanks for your support!",
        [
          { text: "RATE IT NOW", onPress: () => StoreReview.requestReview() },
          {
            text: "REMIND ME LATER",

            style: "cancel"
          },
          {
            text: "NO, THANKS",

            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "هلا تفضلت بتقييم وفرنا لك ؟",
        "لن يستغرق الأمر اكثر من دقيقة والذي بدوره سيسهم في تحسين تطبيقنا، شكراً لدعمك",
        [
          {
            text: "ذكرني بوقت اخر",

            style: "cancel"
          },
          {
            text: "لا، شكراً",

            style: "cancel"
          },
          { text: "تقييم الآن", onPress: () => StoreReview.requestReview() }
        ],
        { cancelable: false }
      );
    }
  };
  rateForense = () => {
    if (this.state.lan === "en") {
      Alert.alert(
        "Do you like using Wafarnalak?",
        "",
        [
          {
            text: "Ask me later"
          },
          {
            text: "Not Really",

            style: "cancel"
          },
          {
            text: "Yes!",
            onPress: () => this.likeForense()
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "هل احببت استخدام وفرنا لك ؟",
        "",
        [
          {
            text: "ذكرني بوقت اخر"
          },
          {
            text: "ليس صحيحاً",

            style: "cancel"
          },
          {
            text: "نعم",
            onPress: () => this.likeForense()
          }
        ],
        { cancelable: false }
      );
    }
  };
  navigationSetup = async option => {
    if (option == 1) {
      this.props.navigation.navigate("LandingSecreen", { lan: this.state.lan });
    }
    if (option == 3) {
      if (this.state.cartItem > 0) {
        if (
          this.state.location == "Riyadh" ||
          this.state.location == "Al-Kharj"
        ) {
          this.props.navigation.navigate("MyCart", { lan: this.state.lan });
          await Analytics.logEvent("Cart", {
            name: "Cart",
            isPackage: false,
            screen: "myProfileScreen",
            purpose: "checkout order from myProfile screen"
          });
        } else {
          Toast.show({
            text:
              this.state.lan == "en"
                ? "Sorry, currently we are not delivering services in your city, soon we will be with you"
                : "سلة الطلبات فارغة",
            position: "bottom"
          });
        }
      } else {
        Toast.show({
          text:
            this.state.lan == "en" ? "Your cart is empty" : "سلة الطلبات فارغة",
          position: "bottom"
        });
      }
    }
    if (option == 2) {
      this.props.navigation.navigate("MyOrders", {
        cartItem: this.state.cartItem,
        lan: this.state.lan
      });
    }
  };

  switchLanguage = async () => {
    let lan = await AsyncStorage.getItem("lan");
    this.setState({ lan: lan });
    let previousLan = lan !== null ? lan : "en";
    if (previousLan == "en") {
      changetoArabic();
    } else {
      changetoEnglish();
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
    return (
      <Container style={styles.containerStyle}>
        {/* <Header
          style={{
            marginTop: 0,
            borderBottomWidth: 1,
            borderBottomColor: theme.brownColor,
            backgroundColor: "#ffffff",
            height: 60,
            justifyContent: "center"
          }}
        >
          <Left style={{ marginLeft: 10 }}></Left>
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center",
              position: Platform.OS === "android" ? "absolute" : "relative",
              alignSelf: "center"
            }}
          >
            <Title
              style={{
                fontFamily: "montserrat_semi_blod",
                color: theme.brownColor,
                fontSize: 18
              }}
            >
              {this.state.lan == "en" ? "My Profile" : "ملفي الشخصي"}
            </Title>
          </View>
          <Right />
        </Header> */}
        <Header
          location={this.state.location}
          chatButtonPress={this.openChat}
          onLanguageSwitch={this.switchLanguage}
          lan={this.state.lan}
        />
        <Content>
          {
            <NavigationEvents
              onWillFocus={() => {
                this.componentDidMount();
              }}
            />
          }
          <LinearGradient
            colors={["#fff", "#fff"]}
            start={[0.9, 0.2]}
            end={[0.1, 0.1]}
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height - 80
            }}
          >
            <View>
              <ImageBackground
                source={require("../assets/loginProfile.png")}
                style={{
                  width: Dimensions.get("screen").width - 60,
                  height: 210,
                  alignSelf: "center",
                  marginTop: 15,
                  borderColor: theme.brownColor
                }}
                resizeMode="contain"
              >
                {this.state.isLogin === true ? (
                  <View
                    style={{
                      position: "absolute",
                      right: 10,
                      // top: Platform.OS === "ios" ? 8 : 18,
                      bottom: 0,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: wp(80),
                      height: hp(5),
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: "white" }}>
                      {this.state.user.name}
                    </Text>
                    <TouchableOpacity onPress={this.logoutUser}>
                      <View
                        style={{
                          backgroundColor: theme.brownColor,
                          width: 60,
                          height: hp(3),
                          borderRadius: 5,
                          alignSelf: "flex-end",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            alignSelf: "center",
                            color: "white"
                          }}
                        >
                          {this.state.lan == "en" ? "Log out" : "خروج"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View></View>
                )}
              </ImageBackground>
            </View>
            <View
              style={{
                backgroundColor: "#f9f9f9",
                width: Dimensions.get("screen").width - 64,
                marginTop: 15,
                borderRadius: 12,
                alignSelf: "center"
              }}
            >
              {this.state.isLogin === true ? (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ProfileUpdate", {
                      user: this.state.user,
                      lan: this.state.lan
                    })
                  }
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 12,
                        backgroundColor: "#f9f9f9"
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={require("../assets/Profile-Icon/Profile-Icon-min.png")}
                          style={{ width: 30, height: 30 }}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            paddingTop: 4,
                            marginLeft: 16,
                            color: "#4a4b4c"
                          }}
                        >
                          {this.state.lan == "en" ? "Profile" : "ملفي الشخصي"}
                        </Text>
                      </View>
                      <View style={{ paddingTop: 5 }}>
                        <Ionicons
                          name={
                            this.state.lan == "en"
                              ? "chevron-forward-outline"
                              : "chevron-back-outline"
                          }
                          size={24}
                          color={theme.brownColor}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "lightgray",
                        width: Dimensions.get("screen").width - 64
                      }}
                    ></View>
                  </View>
                </TouchableOpacity>
              ) : (
                <View></View>
              )}
              <TouchableOpacity onPress={this.displayLanguageModal}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 12,
                    backgroundColor: "#f9f9f9"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../assets/Profile-Icon/Change-Language-min.png")}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        paddingTop: 4,
                        marginLeft: 16,
                        color: "#4a4b4c"
                      }}
                    >
                      {this.state.lan == "en"
                        ? "Change Language"
                        : "تغيير اللغة"}
                    </Text>
                  </View>
                  <View style={{ paddingTop: 5 }}>
                    <Ionicons
                      name={
                        this.state.lan == "en"
                          ? "chevron-forward-outline"
                          : "chevron-back-outline"
                      }
                      size={24}
                      color={theme.brownColor}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  backgroundColor: "lightgray",
                  width: Dimensions.get("screen").width - 64
                }}
              ></View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("HelpScreen", {
                    lan: this.state.lan
                  })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 12,
                    backgroundColor: "#f9f9f9"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../assets/Profile-Icon/Help-min.png")}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        paddingTop: 4,
                        marginLeft: 20,
                        color: "#4a4b4c"
                      }}
                    >
                      {this.state.lan == "en" ? "Help" : "مساعدة"}
                    </Text>
                  </View>
                  <View style={{ paddingTop: 5 }}>
                    <Ionicons
                      name={
                        this.state.lan == "en"
                          ? "chevron-forward-outline"
                          : "chevron-back-outline"
                      }
                      size={24}
                      color={theme.brownColor}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  backgroundColor: "lightgray",
                  width: Dimensions.get("screen").width - 64
                }}
              ></View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("AboutScreen", {
                    lan: this.state.lan
                  })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 12,
                    backgroundColor: "#f9f9f9"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../assets/Profile-Icon/About-min.png")}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        paddingTop: 4,
                        marginLeft: 20,
                        color: "#4a4b4c"
                      }}
                    >
                      {this.state.lan == "en"
                        ? "About Wafarnalak"
                        : "عن وفرنا لك"}
                    </Text>
                  </View>
                  <View style={{ paddingTop: 5 }}>
                    <Ionicons
                      name={
                        this.state.lan == "en"
                          ? "chevron-forward-outline"
                          : "chevron-back-outline"
                      }
                      size={24}
                      color={theme.brownColor}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  height: 1,
                  backgroundColor: "lightgray",
                  width: Dimensions.get("screen").width - 64
                }}
              ></View>
              <TouchableOpacity onPress={this.rateForense}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    margin: 12,
                    backgroundColor: "#f9f9f9"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../assets/Profile-Icon/Rate-min.png")}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        paddingTop: 4,
                        marginLeft: 20,
                        color: "#4a4b4c"
                      }}
                    >
                      {this.state.lan == "en"
                        ? "Rate Wafarnalak"
                        : "قيٌم وفرنا لك"}
                    </Text>
                  </View>
                  <View style={{ paddingTop: 5 }}>
                    <Ionicons
                      name={
                        this.state.lan == "en"
                          ? "chevron-forward-outline"
                          : "chevron-back-outline"
                      }
                      size={24}
                      color={theme.brownColor}
                    />
                  </View>
                </View>
              </TouchableOpacity>

              {this.state.isLogin === true ? (
                <View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "lightgray",
                      width: Dimensions.get("screen").width - 64
                    }}
                  ></View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("MyOrdersSecreen")
                    }
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("PointsScreen", {
                          lan: this.state.lan
                        })
                      }
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          margin: 12,
                          backgroundColor: "#f9f9f9"
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Image
                            source={require("../assets/Profile-Icon/Points-min.png")}
                            style={{ width: 30, height: 30 }}
                            resizeMode="contain"
                          />
                          <Text
                            style={{
                              paddingTop: 4,
                              marginLeft: 20,
                              color: "#4a4b4c"
                            }}
                          >
                            {this.state.lan == "en"
                              ? "Wafarnalak Points"
                              : "نقاط وفرنا لك"}
                          </Text>
                        </View>
                        <View style={{ paddingTop: 5 }}>
                          <Ionicons
                            name={
                              this.state.lan == "en"
                                ? "chevron-forward-outline"
                                : "chevron-back-outline"
                            }
                            size={24}
                            color={theme.brownColor}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </TouchableOpacity>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "lightgray",
                      width: Dimensions.get("screen").width - 64
                    }}
                  ></View>
                </View>
              ) : (
                <View></View>
              )}

              {this.state.isLogin === true ? (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ReferralScreen", {
                      user: this.state.user,
                      lan: this.state.lan
                    })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 12,
                      backgroundColor: "#f9f9f9"
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../assets/Profile-Icon/Referral-min.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          paddingTop: 4,
                          marginLeft: 20,
                          color: "#4a4b4c"
                        }}
                      >
                        {this.state.lan == "en"
                          ? "Wafarnalak Referral"
                          : "إحالة وفرنا لك (رمز الدعوة)"}
                      </Text>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                      <Ionicons
                        name={
                          this.state.lan == "en"
                            ? "chevron-forward-outline"
                            : "chevron-back-outline"
                        }
                        size={24}
                        color={theme.brownColor}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <View></View>
              )}
            </View>
            {this.state.isLogin === false ? (
              <TouchableOpacity onPress={this.authenticateUser}>
                <View
                  style={{
                    backgroundColor: theme.brownColor,
                    borderRadius: 12,
                    width: Dimensions.get("screen").width - 120,
                    alignSelf: "center",
                    marginTop: 15
                  }}
                >
                  <Text
                    style={{ color: "white", margin: 12, alignSelf: "center" }}
                  >
                    {this.state.lan == "en" ? "Sign In" : "دخول"}
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
          </LinearGradient>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View
              style={{
                marginTop: 220,
                height: 255,
                borderRadius: 20,
                width: 350,
                backgroundColor: "#0764af",
                alignSelf: "center"
              }}
            >
              <View style={{ flex: 1, alignSelf: "center", marginTop: -24 }}>
                <Thumbnail source={require("../assets/Icon2.png")} />
              </View>
              <View style={{ position: "absolute", right: 6, top: 10 }}>
                <Ionicons
                  onPress={this.hideModal}
                  name="ios-close-circle-outline"
                  size={35}
                  color="red"
                />
              </View>
              <View
                style={{ alignSelf: "center", position: "absolute", top: 50 }}
              >
                {this.state.lan === "en" ? (
                  <Text
                    style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                  >
                    Select Language
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "montserrat_semi_blod",
                      color: "white",
                      fontSize: 30
                    }}
                  >
                    اختار اللغة
                  </Text>
                )}
              </View>
              <View
                style={{ alignSelf: "center", position: "absolute", top: 100 }}
              >
                <Button
                  style={{
                    width: 250,
                    borderRadius: 12,
                    height: 40,
                    backgroundColor: "#4e9fd1",
                    top: 0
                  }}
                  onPress={this.changetoEnglish}
                >
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text style={{ color: "white" }}>English</Text>
                  </View>
                </Button>
                <Button
                  style={{
                    width: 250,
                    borderRadius: 12,
                    height: 40,
                    backgroundColor: "#4e9fd1",
                    top: 14
                  }}
                  onPress={this.changetoArabic}
                >
                  <View
                    style={{
                      flex: 1,
                      alignSelf: "center",
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        color: "white",

                        alignItems: "center"
                      }}
                    >
                      العربية
                    </Text>
                  </View>
                </Button>
              </View>
            </View>
          </Modal>
        </Content>
        <View style={styles.footerStyle}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SalonsLanding")}
            style={styles.footerItemContainerStyle}
          >
            <Image
              style={{ height: hp(4), width: wp(6), resizeMode: "contain" }}
              source={require("../assets/Salon-min.png")}
            />
            <Text
              style={[
                styles.tabtextStyle,
                { color: this.state.Salon ? theme.brownColor : "#ccc" }
              ]}
            >
              {this.state.lan == "en" ? "Salons" : "صالونات"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("MyBookings")}
            style={styles.footerItemContainerStyle}
          >
            <Ionicons
              name="md-cart"
              size={30}
              color={this.state.cart ? theme.brownColor : "#ccc"}
            />
            <Text
              style={[
                styles.tabtextStyle,
                { color: this.state.cart ? theme.brownColor : "#ccc" }
              ]}
            >
              {this.state.lan == "en" ? " My Bookings" : "حجوزاتي"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerItemContainerStyle}>
            <Ionicons
              name="ios-person"
              size={30}
              color={this.state.Profile ? theme.brownColor : "#ccc"}
            />
            <Text
              style={[
                styles.tabtextStyle,
                { color: this.state.Profile ? theme.brownColor : "#ccc" }
              ]}
            >
              {this.state.lan == "en" ? "My Profile" : "ملفي"}
            </Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
  imagecontainerStyle: {
    height: hp(25),
    width: wp(100)
  },
  tabsbuttonStyle: {
    backgroundColor: theme.brownColor,
    height: hp(4),
    alignSelf: "center",
    borderRadius: wp(5),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(1)
  },
  locationButtonStyle: {
    backgroundColor: theme.brownColor,
    height: hp(4),
    alignSelf: "center",
    width: wp(25),
    borderRadius: wp(5),
    justifyContent: "center",
    alignItems: "center"
  },
  locationTextStyle: {
    fontSize: wp(3),
    color: "#fff",
    fontFamily: "montserrat_arabic_regular"
  },
  quantityTextStyle: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: wp(3),
    fontSize: wp(2.1),
    color: "#fff",
    fontFamily: "montserrat_arabic_regular"
  },
  distancecontainerBoxStyle: {
    width: wp(20),
    height: hp(2.5),
    backgroundColor: theme.yellow,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(0.5),
    borderRadius: wp(0.5)
  },
  locationContainerStyle: {
    width: wp(95),
    paddingVertical: hp(1),
    alignSelf: "center",
    marginTop: hp(2),
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: wp(1),
    borderColor: "#f3f3f3"
  },
  leftContainerStyle: {
    width: wp(40),
    height: hp(17),
    alignSelf: "center",
    marginVertical: hp(2),
    borderRightWidth: 1,
    borderColor: "#f3f3f3",
    alignItems: "center",
    borderLeftColor: "#f3f3f3"
  },
  logoimageStyle: {
    width: wp(30),
    height: hp(7),
    resizeMode: "cover",
    marginTop: hp(1)
  },
  cardlogoStle: {
    width: wp(8.7),
    height: hp(5),
    // resizeMode: "cover",
    overflow: "hidden",
    borderRadius: wp(9) / 2
  },
  rightcontainerStyle: {
    width: wp(55),
    height: hp(17),
    alignSelf: "center",
    marginVertical: hp(2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  tabscontainerStyle: {
    width: wp(96),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: hp(2)
  },
  titleTextStyle: {
    marginTop: hp(1),
    marginLeft: wp(3),
    fontFamily: "montserrat_arabic_regular"
  },
  jobCardStyle: {
    backgroundColor: "#f5f5f5",
    paddingTop: hp(2),
    width: wp(100),
    alignSelf: "center",
    marginTop: hp(2),
    paddingBottom: hp(1),
    borderColor: "#dedcdc"
  },
  bottomviewStyle: {
    flexDirection: "row",
    width: wp(78),
    alignSelf: "flex-end",
    justifyContent: "center"
  },
  priceTextstyle: {
    marginTop: hp(1),
    fontFamily: "montserrat_arabic_regular",
    color: theme.fontLightBlack,
    fontSize: wp(2.5)
  },
  quantitycontainerStyle: {
    width: wp(58),
    justifyContent: "flex-end",
    flexDirection: "row",
    paddingRight: wp(2)
  },
  unitsTextStyle: {
    marginTop: hp(1),
    fontFamily: "montserrat_arabic_regular",
    color: theme.fontLightBlack,
    fontSize: wp(2.5),
    marginRight: wp(2)
  },
  incrementButtonContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(6) / 2,
    height: hp(2.7),
    backgroundColor: theme.brownColor,
    width: wp(6)
  },
  buttonscontainerStyle: {
    width: wp(20),
    padding: 0,
    backgroundColor: "#4a4b4c",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: wp(3)
  },
  rowStyle: {
    width: wp(100),
    paddingVertical: hp(1),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: wp(5),
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#dedcdc"
  },
  cashBosSTyle: {
    backgroundColor: theme.yellow,
    width: wp(20),
    height: hp(3),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: wp(2),
    borderRadius: wp(1)
  },
  textInputStyle: {
    borderWidth: 1,
    width: wp(40),
    height: hp(3.5),
    backgroundColor: "#f3f3f3",
    paddingLeft: wp(2),
    borderColor: "#dedcdc"
  },
  datetestStyle: {
    color: theme.brownColor,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginBottom: hp(3)
  },
  buttonStyle: {
    width: wp(80),
    height: hp(5.5),
    backgroundColor: theme.brownColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(2)
  },
  footerStyle: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    height: hp(7),
    width: wp(100),
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#f3f3f3",
    backgroundColor: "white"
  },
  footerItemContainerStyle: {
    height: hp(7),
    width: wp(33.33),
    justifyContent: "center",
    alignItems: "center"
  },
  tabtextStyle: {
    textAlign: "center",
    fontSize: 12
  },
  rowSubstyle: {
    flexDirection: "row",
    width: wp(95),
    paddingHorizontal: wp(5),
    justifyContent: "space-between",
    marginVertical: hp(0.5)
  }
});
