import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  I18nManager,
  AsyncStorage,
  Animated,
  Image,
  Platform,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import { SliderBox } from "react-native-image-slider-box";
import { Toast } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import Spinner from "react-native-loading-spinner-overlay";

import { Ionicons } from "@expo/vector-icons";
import Header from "./Common/Header";
import * as Permissions from "expo-permissions";
import theme from "../assets/Colors";
import ApiServices from "./Services/ApiServices";

const SalonsLanding = ({ navigation }) => {
  const nScroll = new Animated.Value(0);
  const [location, setLocation] = useState("");
  const [Salon, setSalon] = useState(true);
  const [cart, setcart] = useState(false);
  const [Profile, setProfile] = useState(false);
  const [loading, setloading] = useState(false);

  const [lan, setlan] = useState("");
  const [allsalon, setallsalon] = useState([]);

  useEffect(() => {
    checkUserLocation();
    loadappdata();
  }, []);
  const loadappdata = async () => {
    setloading(true);
    let lan = await AsyncStorage.getItem("lan");
    console.log("language----", lan);
    setlan(lan !== null ? lan : "en");
    let location = await Location.getCurrentPositionAsync();

    const { latitude, longitude } = location.coords;
    ApiServices.getsalons(latitude, longitude, res => {
      setloading(false);
      if (res.isSuccess) {
        setallsalon(res.response);
      }
    });
  };
  // -----------=locationCheck function-----------=
  const checkUserLocation = async () => {
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
      setLocation(geocode[0].city);
    }
  };
  // -----------=Opent chat to Whatsapp-----------=
  const openChat = () => {
    Linking.openURL("https://wa.me/+966577311430");
  };
  // -----------------languate switch to english and arabic-----------------
  const switchLanguage = async () => {
    let lan = await AsyncStorage.getItem("lan");
    setlan(lan);
    let previousLan = lan !== null ? lan : "en";
    if (previousLan == "en") {
      changetoArabic();
    } else {
      changetoEnglish();
    }
  };
  const changetoEnglish = async () => {
    await AsyncStorage.setItem("lan", "en");
    I18nManager.isRTL = false;
    I18nManager.forceRTL(false);
    await Updates.reloadAsync();
    //this.updateLanguage(1);
  };
  const changetoArabic = async () => {
    await AsyncStorage.setItem("lan", "ar");
    I18nManager.isRTL = true;
    I18nManager.forceRTL(true);
    await Updates.reloadAsync();
    //this.updateLanguage(2);
  };

  return (
    <View style={styles.containerStyle}>
      <Header
        location={location}
        chatButtonPress={openChat}
        onLanguageSwitch={switchLanguage}
        lan={lan}
      />
      <View
        style={{
          height: Platform.OS == "ios" ? hp(81) : hp(84)
        }}
      >
        <Animated.ScrollView
          // ref={s => (this._anScrollView = s)}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: nScroll } } }],
            { useNativeDriver: true }
          )}
          style={{ zIndex: 0 }}
        >
          <View style={{ marginTop: 15 }}>
            <SliderBox
              images={[
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree" // Network image
              ]}
              sliderBoxHeight={153}
              onCurrentImagePressed={index => this.openPromotionScreen(index)}
              dotColor="#ff8a29"
              inactiveDotColor="#F5F5F5"
              paginationBoxVerticalPadding={20}
              autoplay
              resizeMode={"contain"}
              circleLoop={true}
            />
          </View>
          <Spinner visible={loading} textContent={""} />

          <View
            style={{
              backgroundColor: "#fff",
              marginTop: hp(3)
            }}
          >
            {allsalon.map(i => {
              console.log("iiiii", i);
              return (
                <TouchableOpacity
                  style={[styles.cardContainerStyle]}
                  onPress={() =>
                    navigation.navigate("SalonBookingDetail", { item: i })
                  }
                >
                  <View style={styles.imageContainerStyle}>
                    {i.worksimages.map(img => {
                      <Image
                        style={styles.imageStyleLogo}
                        source={{ uri: img.path }}
                      />;
                    })}
                    <Image
                      style={styles.imageStyleLogo}
                      source={{ uri: i.profileimage }}
                    />
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        style={styles.starImageStyle}
                        source={{
                          uri:
                            "https://image.shutterstock.com/image-vector/star-icon-christmas-decoration-holidays-600w-1524451280.jpg"
                        }}
                      />
                      <Text style={{ fontSize: 8, marginTop: 5 }}>
                        {i.reviews}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.cardinfoConatainerStyle]}>
                    <View style={styles.rowStyle}>
                      {i.availablity == 1 && (
                        <View style={styles.availableboxStyle}>
                          <Text style={styles.promotionTextStyle}>
                            {lan == "en"
                              ? " Booking Available today"
                              : "الحجز متاح اليوم"}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.rowStyle}>
                      <Text style={styles.titleTextStyle}>
                        {lan == "en" ? i.shopname : i.shopname_ar}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.rowStyle,
                        {
                          flexDirection: "row"
                          // paddingLeft: lan !== "en" && 0
                        }
                      ]}
                    >
                      <View style={styles.timeTextStyleContainer}>
                        <Text
                          style={[
                            styles.timeTextStyle,
                            { alignSelf: "flex-start" }
                          ]}
                        >
                          {i.distance} | {i.openingtime} - {i.closingtime}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.availableboxStyle,
                          { width: wp(25), backgroundColor: "#fff" }
                        ]}
                      >
                        {i.promotion && (
                          <View style={[styles.promotionTextContainerStyle]}>
                            <Text style={[styles.promotionTextStyle]}>
                              {lan == "en" ? "PROMOTED" : "ترقية"}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                    <View style={styles.rowStyle}>
                      <Text
                        style={[
                          styles.timeTextStyle,
                          { alignSelf: "flex-start" }
                        ]}
                      >
                        {/* {lan == "en"
                          ? i.location.addressname
                          : i.location.addressname_ar} */}
                        {i.location.addressname}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.ScrollView>
      </View>
      <Image
        source={require("../assets/Salon-Services-Button.gif")}
        style={{
          height: hp(5),
          width: wp(15),
          position: "relative",
          bottom: hp(10),
          right: wp(15)
        }}
      />

      {/* ----------------footer---------------- */}
      <View style={styles.footerStyle}>
        <TouchableOpacity style={styles.footerItemContainerStyle}>
          <Image
            style={{
              height: hp(4),
              width: wp(6),
              resizeMode: "contain",
              tintColor: theme.brownColor
            }}
            source={require("../assets/Salon-min.png")}
          />
          <Text
            style={[
              styles.tabtextStyle,
              { color: Salon ? theme.brownColor : "#ccc" }
            ]}
          >
            {lan == "en" ? "Salons" : "صالونات"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerItemContainerStyle}
          onPress={() => navigation.navigate("MyBookings")}
        >
          <Ionicons
            name="md-cart"
            size={30}
            color={cart ? theme.brownColor : "#ccc"}
          />
          <Text
            style={[
              styles.tabtextStyle,
              { color: cart ? theme.brownColor : "#ccc" }
            ]}
          >
            {lan == "en" ? " My Bookings" : "حجوزاتي"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerItemContainerStyle}
          onPress={() => navigation.navigate("BookingProfileScreen")}
        >
          <Ionicons
            name="ios-person"
            size={30}
            color={Profile ? theme.brownColor : "#ccc"}
          />
          <Text
            style={[
              styles.tabtextStyle,
              { color: Profile ? theme.brownColor : "#ccc" }
            ]}
          >
            {lan == "en" ? "My Profile" : "ملفي"}
          </Text>
        </TouchableOpacity>
      </View>
      {/* ---------------------------- */}
    </View>
  );
};
export default SalonsLanding;
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
  imageStyleLogo: {
    height: hp(10),
    width: wp(25)
  },
  starImageStyle: {
    height: hp(1),
    width: wp(3),
    marginTop: hp(1)
  },
  cardContainerStyle: {
    width: wp(97),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "#f3f3f3",
    paddingBottom: hp(0.5)
  },
  imageContainerStyle: {
    width: wp(30),
    // backgroundColor: "red",
    height: hp(13),
    paddingVertical: hp(0.5),
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#f3f3f3"
  },
  cardinfoConatainerStyle: {
    height: hp(13),
    width: wp(67)
  },
  rowStyle: {
    width: wp(67),
    height: hp(2.5),
    justifyContent: "center",
    paddingLeft: wp(3)
  },
  availableboxStyle: {
    width: wp(35),
    height: hp(2.5),
    backgroundColor: theme.yellow,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  titleTextStyle: {
    color: theme.brownColor,
    fontSize: 16,
    fontFamily: "montserrat_arabic_regular",
    fontWeight: "bold"
  },
  promotionTextContainerStyle: {
    backgroundColor: theme.brownColor,
    height: hp(2.5),
    alignSelf: "center",
    width: wp(20),
    borderRadius: wp(0.4),
    justifyContent: "center",
    alignItems: "center"
  },
  promotionTextStyle: {
    fontSize: wp(2.1),
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "montserrat_arabic_regular"
  },
  timeTextStyle: {
    fontSize: wp(2),
    fontFamily: "montserrat_arabic_regular",
    color: theme.fontLightBlack
  },
  timeTextStyleContainer: {
    width: wp(39),
    justifyContent: "center",
    fontFamily: "montserrat_arabic_regular"
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
  }
});
