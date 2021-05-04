import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import Constants from "expo-constants";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import BookingDetailHeader from "./Common/BookingDetailHeader";
import theme from "../assets/Colors";
import { ScrollView } from "react-native-gesture-handler";
import ApiServices from "./Services/ApiServices";
import Spinner from "react-native-loading-spinner-overlay";

const MyBookings = ({ navigation }) => {
  const [upcoming, setupcoming] = useState(true);
  const [history, sethistory] = useState(false);
  const [location, setLocation] = useState("");
  const [Salon, setSalon] = useState(false);
  const [cart, setcart] = useState(true);
  const [Profile, setProfile] = useState(false);
  const [lan, setlan] = useState("");
  const [user, setuser] = useState(null);
  const [array, setarray] = useState([]);
  const [loading, setloading] = useState(false);
  const [historyOrder, sethistoryOrder] = useState([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    setloading(true);
    let userJ = await AsyncStorage.getItem("user");
    let userinfo = await JSON.parse(userJ);
    let lan = await AsyncStorage.getItem("lan");
    console.log("language----", lan);
    setlan(lan !== null ? lan : "en");
    setuser(userinfo);
    if (userinfo !== null) {
      ApiServices.getonGoing(userinfo.customerid, res => {
        if (res.isSuccess) {
          setloading(false);
          setarray(res.response.Orders);
        } else {
          setloading(false);
        }
      });
      ApiServices.historyorders(userinfo.customerid, his => {
        if (res.isSuccess) {
          sethistoryOrder(his.response.Orders);
        } else {
          setloading(false);
        }
      });
    } else {
      setloading(false);
    }
  };
  const renderText = item => {
    if (item.statusid == 1) {
      return "Requested";
    }
  };
  return (
    <View style={styles.containerStyle}>
      <BookingDetailHeader
        HeaderText="My Bookings"
        onBackPress={() => navigation.goBack()}
        borderbottomWidth
      />
      <Spinner visible={loading} textContent={""} />
      <View>
        {user !== null ? (
          <View>
            <View
              style={{
                width: wp(100),
                paddingVertical: hp(3),
                justifyContent: "space-around",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  { backgroundColor: upcoming ? theme.brownColor : "white" }
                ]}
                onPress={() => {
                  setupcoming(true);
                  sethistory(false);
                }}
              >
                <Text
                  style={[
                    styles.locationTextStyle,
                    { color: history ? theme.brownColor : "white" }
                  ]}
                >
                  {lan == "en" ? "Upcoming" : "القادمة"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  { backgroundColor: history ? theme.brownColor : "white" }
                ]}
                onPress={() => {
                  setupcoming(false);
                  sethistory(true);
                }}
              >
                <Text
                  style={[
                    styles.locationTextStyle,
                    { color: !history ? theme.brownColor : "white" }
                  ]}
                >
                  {lan == "en" ? "History" : "التاريخ"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* ----------------Card view------------- */}
            <View style={{ height: hp(70) }}>
              <ScrollView showsHorizontalScrollIndicator={false}>
                {upcoming &&
                  array !== undefined &&
                  array.map(i => {
                    return (
                      <TouchableOpacity
                        style={[styles.cardContainerStyle]}
                        onPress={() =>
                          navigation.navigate("OrderStatus", { item: i })
                        }
                      >
                        <View style={styles.imageContainerStyle}>
                          <Image
                            style={styles.imageStyleLogo}
                            source={{ uri: i.saloonicon }}
                            resizeMode="contain"
                          />
                          <Image style={styles.starImageStyle} />
                        </View>
                        <View style={styles.cardinfoConatainerStyle}>
                          <View style={styles.rowStyle}></View>
                          <View style={styles.rowStyle}>
                            <Text style={styles.titleTextStyle}>
                              {lan == "en" ? i.saloonname : i.saloonname_ar}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.rowStyle,
                              { flexDirection: "row", marginTop: hp(0.7) }
                            ]}
                          >
                            <View style={styles.timeTextStyleContainer}>
                              <Text style={styles.timeTextStyle}>
                                Order#: {i.orderid}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.availableboxStyle,
                                { width: wp(25) }
                              ]}
                            >
                              <View
                                style={[styles.promotionTextContainerStyle]}
                              >
                                <Text style={styles.promotionTextStyle}>
                                  {i.statusid == 1
                                    ? "Requested"
                                    : i.statusid == 2
                                    ? "Accepted"
                                    : "Complete"}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={[styles.rowStyle, { marginTop: hp(2) }]}>
                            <Text style={styles.timeTextStyle}>
                              {lan == "en" ? "Timing:" : "توقيت "}
                              {i.appointmentdate}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                {history &&
                  historyOrder !== undefined &&
                  historyOrder.map(i => {
                    return (
                      <TouchableOpacity
                        style={[styles.cardContainerStyle]}
                        onPress={() =>
                          navigation.navigate("SalonHistoryTab", { item: i })
                        }
                      >
                        <View style={styles.imageContainerStyle}>
                          <Image
                            style={styles.imageStyleLogo}
                            source={{ uri: i.saloonicon }}
                          />
                          <Image
                            style={styles.starImageStyle}
                            source={{
                              uri:
                                "https://image.shutterstock.com/image-vector/star-icon-christmas-decoration-holidays-600w-1524451280.jpg"
                            }}
                          />
                        </View>
                        <View style={styles.cardinfoConatainerStyle}>
                          <View style={styles.rowStyle}></View>
                          <View style={styles.rowStyle}>
                            <Text style={styles.titleTextStyle}>
                              {i.saloonname}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.rowStyle,
                              { flexDirection: "row", marginTop: hp(0.7) }
                            ]}
                          >
                            <View style={styles.timeTextStyleContainer}>
                              <Text style={styles.timeTextStyle}>
                                Order#: {i.orderid}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.availableboxStyle,
                                { width: wp(25) }
                              ]}
                            >
                              <View
                                style={[styles.promotionTextContainerStyle]}
                              >
                                <Text style={styles.promotionTextStyle}>
                                  {i.statusid == 1
                                    ? "Requested"
                                    : i.statusid == 2
                                    ? "Accepted"
                                    : "Completed"}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={styles.rowStyle}>
                            <Text style={styles.timeTextStyle}>
                              {"Timing: "}
                              {i.appointmentdate}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <View
            style={{
              height: hp(88),
              alignItems: "center",
              justifyContent: "space-around"
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("SalonLogin")}
              style={[
                styles.footerItemContainerStyle,
                {
                  flexDirection: "row",
                  backgroundColor: theme.brownColor,
                  justifyContent: "space-around",
                  borderRadius: wp(2)
                }
              ]}
            >
              <Ionicons name="md-log-in" size={20} color={"#fff"} />
              <Text
                style={[
                  styles.tabtextStyle,
                  { color: "#fff", fontSize: wp(4) }
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {/* ------------tab view----------- */}

        {/* ---------------footer------------- */}
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
      </View>
    </View>
  );
};
export default MyBookings;
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
  buttonStyle: {
    width: wp(47),
    height: hp(7),
    backgroundColor: theme.brownColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(10),
    borderWidth: 2,
    borderColor: theme.brownColor
  },
  locationTextStyle: {
    fontSize: wp(3),
    color: "#fff",
    fontFamily: "montserrat_arabic_regular",
    fontWeight: "600"
  },
  cardContainerStyle: {
    width: wp(97),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderColor: "#f3f3f3",
    paddingBottom: hp(0.5),
    backgroundColor: "#f9f9f9",
    marginVertical: hp(1),
    borderRadius: wp(2)
  },
  imageContainerStyle: {
    width: wp(30),
    // backgroundColor: "red",
    height: hp(13),
    paddingVertical: hp(0.5),
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "black"
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
    height: hp(4),
    alignSelf: "center",
    width: wp(20),
    borderRadius: wp(5),
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
  },
  imageStyleLogo: {
    height: hp(10),
    width: wp(20)
  }
});
