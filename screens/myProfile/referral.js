import React from "react";
import {
  Image,
  View,
  Platform,
  ImageBackground,
  Dimensions,
  AsyncStorage,
  Share,
  Linking,
  Clipboard,
  TouchableOpacity,
  BackHandler
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Text
} from "native-base";
import { Ionicons } from "@expo/vector-icons";

export default class ReferralScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: "en",
      user: {}
    };
  }
  getUser = async () => {
    let user = await AsyncStorage.getItem("user");
    if (user !== null) {
      this.setState({ user: JSON.parse(user) });
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
    this.setState({ lan: navigation.getParam("lan") });
    this.getUser();
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  onShare = async () => {
    try {
      await Share.share({
        message:
          this.state.lan === "en"
            ? "Order home repair and maintenance services 💇🏻‍♀ 🏡 and Get SAR 15 on your first order from Wafarnalak 🤩🥳 Download the app📲 https://onelink.to/p56krz and use my referral code " +
              this.state.user.referralcode
            : "اطلب خدمات اصلاح وصيانة المنزل 💇🏻‍♀ 🏡 واحصل على 15 ريال في طلبك الأول من وفرنالك 🤩🥳 عند تنزيل التطبيق https://onelink.to/wg5k82 📲 واستخدم رمز الدعوة الخاص بي " +
              this.state.user.referralcode
      });
    } catch (error) {
      alert(error.message);
    }
  };
  onWhatsAppShare = () => {
    if (this.state.lan == "en") {
      Linking.openURL(
        "https://wa.me/?text=Order home repair and maintenance services 💇🏻‍♀ 🏡 and Get SAR 15 on your first order from Wafarnalak 🤩🥳 !Download the app📲 https://onelink.to/p56krz and use my referral code" +
          this.state.user.referralcode
      );
    } else {
      Linking.openURL(
        "https://wa.me/?text=اطلب خدمات اصلاح وصيانة المنزل 💇🏻‍♀ 🏡 واحصل على 15 ريال في طلبك الأول من وفرنالك 🤩🥳 عند تنزيل التطبيق https://onelink.to/wg5k82 📲 واستخدم رمز الدعوة الخاص بي " +
          this.state.user.referralcode
      );
    }
  };
  onEmailShare = async () => {
    if (this.state.lan == "en") {
      Linking.openURL(
        "mailto:?subject=Referral Code&body=Order home repair and maintenance services 💇🏻‍♀ 🏡 and Get SAR 15 on your first order from Wafarnalak 🤩🥳 !Download the app📲 https://onelink.to/p56krz and use my referral code " +
          this.state.user.referralcode
      );
    } else {
      Linking.openURL(
        "mailto:?subject=Referral Code&body=اطلب خدمات اصلاح وصيانة المنزل 💇🏻‍♀ 🏡 واحصل على 15 ريال في طلبك الأول من وفرنالك 🤩🥳 عند تنزيل التطبيق https://onelink.to/wg5k82 📲 واستخدم رمز الدعوة الخاص بي " +
          this.state.user.referralcode
      );
    }
  };
  onMessageShare = () => {
    if (this.state.lan == "en") {
      Linking.openURL(
        "sms://&body=Order home repair and maintenance services 💇🏻‍♀ 🏡 and Get SAR 15 on your first order from Wafarnalak 🤩🥳 !Download the app📲 https://onelink.to/p56krz and use my referral code " +
          this.state.user.referralcode
      );
    } else {
      Linking.openURL(
        "sms://&body=اطلب خدمات اصلاح وصيانة المنزل 💇🏻‍♀ 🏡 واحصل على 15 ريال في طلبك الأول من وفرنالك 🤩🥳 عند تنزيل التطبيق https://onelink.to/wg5k82 📲 واستخدم رمز الدعوة الخاص بي " +
          this.state.user.referralcode
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          style={{
            backgroundColor: "white",
            height: 60,
            borderBottomColor: "#0866b0",
            borderBottomWidth: 1,
            justifyContent: "center"
          }}
        >
          <Left style={{ marginLeft: 10 }}>
            {this.state.lan === "en" ? (
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
              flex: 2.5,
              justifyContent: "center",
              alignItems: "center",
              position: Platform.OS === "android" ? "absolute" : "relative",
              alignSelf: "center"
            }}
          >
            {this.state.lan === "en" ? (
              <Title
                style={{
                  fontFamily: "montserrat_semi_blod",
                  color: "#0866b0",
                  fontSize: 18
                }}
              >
                Wafarnalak Referral
              </Title>
            ) : (
              <Title
                style={{
                  color: "#0866b0",
                  fontSize: 18
                }}
              >
                إحالة وفرنا لك (رمز الدعوة)
              </Title>
            )}
          </View>
          <Right />
        </Header>
        <View>
          <ImageBackground
            source={require("../../assets/background-images/Category-Background-Image.png")}
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height - 60
            }}
          >
            <View style={{ marginTop: 40 }}>
              <Image
                source={require("../../assets/referral-icons/Refferal-Icon-min.png")}
                style={{ width: 90, height: 45, alignSelf: "center" }}
              />
            </View>

            <View
              style={{
                alignItems: "center",
                alignSelf: "center",
                marginTop: 50
              }}
            >
              {this.state.lan === "en" ? (
                <Text style={{ color: "#0866b0" }}>Your referral code:</Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "montserrat_semi_blod",
                    color: "#0866b0"
                  }}
                >
                  رمز الإحالة الخاص بك
                </Text>
              )}
            </View>
            <View
              style={{
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: 8,
                width: 150,
                height: 40,
                backgroundColor: "white"
              }}
            >
              <Text
                style={{
                  color: "#0866b0",
                  textAlign: "center",
                  marginLeft: 35,
                  fontWeight: "bold"
                }}
              >
                {this.state.user.referralcode}
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  await Clipboard.setString(this.state.user.referralcode);
                }}
              >
                <Ionicons
                  name="ios-copy"
                  size={22}
                  color="black"
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30 }}>
              {this.state.lan === "en" ? (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 14,
                    color: "#4a4b4c"
                  }}
                >
                  Share your code with your friends, after their {"\n"} first
                  order you’ll get 300 points which equals{"\n"} SAR 15 and
                  they’ll get 300 points as well{"\n"} Start Sharing NOW!
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "montserrat_semi_blod",
                    textAlign: "center",
                    fontSize: 12,
                    lineHeight: 18
                  }}
                >
                  شارك الرمز الخاص بك مع أصدقائك ، بمجرد إجرائهم اول طلب خدمة
                  ستربح 300 نقطة والتي تساوي 15 ر.س، وسيحصلون هم على 300 نقطة
                  ايضاً، ابدأ المشاركة الآن{" "}
                </Text>
              )}
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 120,
                justifyContent: "space-between",
                flexDirection: "row",
                alignSelf: "center",
                backgroundColor: "white",
                width: Dimensions.get("screen").width,
                height: 90
              }}
            >
              <TouchableOpacity onPress={this.onMessageShare}>
                <View>
                  <Image
                    source={require("../../assets/referral-icons/Messages-min.png")}
                    style={{
                      marginTop: 12,
                      paddingLeft: 28,
                      width: 60,
                      height: 30
                    }}
                    resizeMode="contain"
                  />
                  {this.state.lan === "en" ? (
                    <Text style={{ textAlign: "center" }}>Messages</Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "montserrat_semi_blod",
                        textAlign: "center",
                        marginTop: 3,
                        paddingLeft: 4
                      }}
                    >
                      رسائل اسم ام اس
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 5,
                  borderWidth: 1,
                  height: 55,
                  borderColor: "black"
                }}
              ></View>
              <TouchableOpacity onPress={this.onWhatsAppShare}>
                <View>
                  <Image
                    source={require("../../assets/referral-icons/WHatsapp-min.png")}
                    style={{
                      marginLeft: 5,
                      marginTop: 12,
                      width: 60,
                      height: 30
                    }}
                    resizeMode="contain"
                  />
                  {this.state.lan === "en" ? (
                    <Text style={{ textAlign: "center" }}>Whatsapp</Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "montserrat_semi_blod",
                        textAlign: "center",
                        marginTop: 3
                      }}
                    >
                      واتساب
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 5,
                  borderWidth: 1,
                  height: 55,
                  borderColor: "black"
                }}
              ></View>
              <TouchableOpacity onPress={this.onEmailShare}>
                <View>
                  <Image
                    source={require("../../assets/referral-icons/Mail-min.png")}
                    style={{ marginTop: 12, width: 60, height: 30 }}
                    resizeMode="contain"
                  />
                  {this.state.lan === "en" ? (
                    <Text style={{ textAlign: "center" }}>Mail</Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "montserrat_semi_blod",
                        textAlign: "center",
                        marginTop: 3
                      }}
                    >
                      البريد الإلكتروني
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <View
                style={{
                  marginTop: 5,
                  borderWidth: 1,
                  height: 55,
                  borderColor: "black"
                }}
              ></View>
              <TouchableOpacity onPress={this.onShare}>
                <View>
                  <Image
                    source={require("../../assets/referral-icons/Others-min.png")}
                    style={{
                      marginTop: 12,
                      paddingRight: 25,
                      width: 60,
                      height: 30
                    }}
                    resizeMode="contain"
                  />
                  {this.state.lan === "en" ? (
                    <Text style={{ textAlign: "center" }}>Others</Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "montserrat_semi_blod",
                        textAlign: "center",
                        marginTop: 3
                      }}
                    >
                      اخرى
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}
