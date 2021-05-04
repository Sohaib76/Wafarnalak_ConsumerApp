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
import { Icon } from "native-base";
import ApiServices from "./Services/ApiServices";

let array = [
  {
    title: "X Men salon",
    location: "2 km Away",
    timefrom: "9 Am",
    timeTo: "11Pm",
    address: "Bahria Town LHR, Pak",
    promotion: true,
    available: false,
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    logo:
      "https://image.shutterstock.com/image-vector/beauty-haircut-salon-logo-scissor-260nw-1362739286.jpg"
  }
];
const OrderStatus = ({ navigation }) => {
  const [status, setstatus] = useState(true);
  const [summery, setsummery] = useState(false);
  const [location, setLocation] = useState("");
  const [Salon, setSalon] = useState(false);
  const [cart, setcart] = useState(true);
  const [order, setorder] = useState({});
  const [summary, setsummary] = useState({});

  const [Profile, setProfile] = useState(false);
  const [lan, setlan] = useState("");
  useEffect(() => {
    loaddata();
  }, []);
  const loaddata = async () => {
    let lan = await AsyncStorage.getItem("lan");
    console.log("language----", lan);
    setlan(lan !== null ? lan : "en");
    setorder(navigation.state.params.item);
    ApiServices.geordersummery(order.orderid, res => {
      if (res.isSuccess) {
        setsummary(res.response);
      }
    });
  };
  return (
    <View style={styles.containerStyle}>
      <BookingDetailHeader
        HeaderText="My Bookings"
        onBackPress={() => navigation.goBack()}
        borderbottomWidth
      />
      {/* ------------tab view----------- */}
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
            { backgroundColor: status ? theme.brownColor : "white" }
          ]}
          onPress={() => {
            setstatus(true);
            setsummery(false);
          }}
        >
          <Text
            style={[
              styles.locationTextStyle,
              { color: summery ? theme.brownColor : "white" }
            ]}
          >
            {lan == "en" ? "Booking Status" : "وضع الحجز"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            { backgroundColor: summery ? theme.brownColor : "white" }
          ]}
          onPress={() => {
            setstatus(false);
            setsummery(true);
          }}
        >
          <Text
            style={[
              styles.locationTextStyle,
              { color: !summery ? theme.brownColor : "white" }
            ]}
          >
            {lan == "en" ? "Booking Summary" : "ملخص الكتاب"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ----------------Card view------------- */}
      <View style={{ height: hp(70) }}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.cardContainerStyle]}>
            <View style={styles.imageContainerStyle}>
              <Image
                style={styles.logoimageStyle}
                source={{ uri: navigation.state.params.item.saloonicon }}
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
              <View style={styles.rowStyle}>
                <Text style={styles.titleTextStyle}>
                  {lan == "en"
                    ? navigation.state.params.item.saloonname
                    : navigation.state.params.item.saloonname_ar}
                </Text>
                {!status && (
                  <Icon
                    name="md-radio-button-on"
                    size={20}
                    color={theme.brownColor}
                    style={{ marginRight: wp(5), color: theme.brownColor }}
                  />
                )}
              </View>
              <View style={[styles.locationbuttonContainerStyle]}>
                <Text style={styles.timeTextStyle}>
                  Order#: {navigation.state.params.item.orderid}
                </Text>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {!status && (
                    <Text style={styles.timeTextStyle}>
                      {lan == "en" ? "Salon Location" : "موقع الصالون"}{" "}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {!status ? (
            <View>
              <View style={styles.inforowstyle}>
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    fontSize: wp(3)
                  }}
                >
                  {lan == "en" ? "Date:" : ":تاريخ"}
                </Text>
                <Text style={styles.timeTextStyle}>20-03-2012</Text>
              </View>
              <View style={styles.inforowstyle}>
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    fontSize: wp(3)
                  }}
                >
                  {lan == "en" ? "Time:" : ":زمن"}
                </Text>
                <Text style={styles.timeTextStyle}>11:30 am</Text>
              </View>
              <View style={styles.inforowstyle}>
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    fontSize: wp(3)
                  }}
                >
                  {lan == "en" ? "Service Booked:" : ":الخدمة محجوزة"}
                </Text>
                {navigation.state.params.item.services.map(i => (
                  <Text style={styles.timeTextStyle}>
                    {lan == "en" ? i.jobname : i.jobname_ar}
                  </Text>
                ))}
              </View>
              <View style={styles.inforowstyle}>
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    fontSize: wp(3)
                  }}
                >
                  {lan == "en" ? "Price:" : ": السعر"}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{
                      height: hp(2),
                      width: wp(5),
                      resizeMode: "contain"
                    }}
                    source={require("../assets/Price-Tag-min.png")}
                  />
                  <Text style={styles.timeTextStyle}>
                    SAR {navigation.state.params.item.grandtotal}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                width: wp("100"),
                justifyContent: "center",
                marginTop: hp(4),
                paddingLeft: wp(4)
              }}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#f9f9f9",
                      paddingHorizontal: wp(3),
                      borderRadius: wp(2),
                      paddingVertical: hp(1),
                      borderWidth: 1,
                      borderColor: "#ccc"
                    }}
                  >
                    <Image
                      source={require("../assets/Booking-Request-min.png")}
                      style={{
                        width: wp(12),
                        resizeMode: "contain",
                        height: hp(9),
                        tintColor:
                          navigation.state.params.item.statusid == 1 &&
                          theme.brownColor
                      }}
                    />
                  </View>
                  <View>
                    <View
                      style={{
                        width: wp(15),
                        borderWidth: 1,
                        borderColor:
                          navigation.state.params.item.statusid == 1 &&
                          theme.brownColor
                      }}
                    ></View>
                  </View>
                </View>
                <View style={styles.textcontainerStyle}>
                  <Text style={{ alignSelf: "flex-start", fontSize: wp(4) }}>
                    {lan == "en" ? "Booking Request" : "طلب الحجز"}
                  </Text>
                </View>
              </View>

              {/* --------------- */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#f9f9f9",
                      paddingHorizontal: wp(3),
                      borderRadius: wp(2),
                      paddingVertical: hp(1),
                      borderWidth: 1,
                      borderColor: "#ccc"
                    }}
                  >
                    <Image
                      source={require("../assets/Booking-Accept-min.png")}
                      style={{
                        width: wp(12),
                        resizeMode: "contain",
                        height: hp(9),
                        tintColor:
                          navigation.state.params.item.statusid == 2 &&
                          theme.brownColor
                      }}
                    />
                  </View>
                  <View>
                    <View
                      style={{
                        width: wp(15),
                        borderWidth: 1,
                        borderColor:
                          navigation.state.params.item.statusid == 2 &&
                          theme.brownColor
                      }}
                    ></View>
                  </View>
                </View>
                <View style={styles.textcontainerStyle}>
                  <Text style={{ alignSelf: "flex-start", fontSize: wp(4) }}>
                    {lan == "en" ? "Booking Accepted" : "تم قبول الحجز"}
                  </Text>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#f9f9f9",
                      paddingHorizontal: wp(3),
                      borderRadius: wp(2),
                      paddingVertical: hp(1),
                      borderWidth: 1,
                      borderColor: "#ccc"
                    }}
                  >
                    <Image
                      source={require("../assets/Booking-Complete-min.png")}
                      style={{
                        width: wp(12),
                        resizeMode: "contain",
                        height: hp(9)
                      }}
                    />
                  </View>
                  <View></View>
                </View>
                <View style={styles.textcontainerStyle}>
                  <Text style={{ alignSelf: "flex-start", fontSize: wp(4) }}>
                    {lan == "en" ? "Booking Completed" : "اكتمل الحجز"}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      {/* ---------------footer------------- */}
      <View style={styles.footerStyle}>
        <TouchableOpacity style={styles.footerItemContainerStyle}>
          <Image
            style={{
              height: hp(4),
              width: wp(6),
              resizeMode: "contain",
              tintColor: "#ccc"
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
        <TouchableOpacity style={styles.footerItemContainerStyle}>
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
  );
};
export default OrderStatus;
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
  logoimageStyle: {
    width: wp(25),
    height: hp(10),
    resizeMode: "cover",
    marginTop: hp(1)
  },
  inforowstyle: {
    backgroundColor: "#f9f9f9",
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
    width: wp(97),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(1),
    borderRadius: wp(2)
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
    // paddingVertical: hp(0.5),
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "black"
  },
  cardinfoConatainerStyle: {
    height: hp(10),
    width: wp(67),
    alignItems: "center",
    justifyContent: "center"
  },
  rowStyle: {
    width: wp(67),
    paddingVertical: hp(0.1),
    alignItems: "center",
    flexDirection: "row",
    width: wp(60),
    alignSelf: "center",
    justifyContent: "space-between"
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
  locationbuttonContainerStyle: {
    flexDirection: "row",
    // marginTop: hp(0.7),
    width: wp(60),
    justifyContent: "space-between",
    // paddingVertical: hp(0.3),
    alignItems: "center",
    alignSelf: "center"
  },
  statuscontainerStyle: {
    backgroundColor: "pink",
    paddingBottom: hp(3),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: wp(95)
  },
  iconboxstyle: {
    backgroundColor: "blue",
    width: wp(33),
    justifyContent: "center",
    paddingVertical: hp(1),
    justifyContent: "center",
    alignSelf: "center"
  },
  iconStyle: {
    height: hp(8),
    width: wp(18),
    resizeMode: "contain",
    alignSelf: "center"
  },
  textcontainerStyle: {
    marginTop: hp(2),
    width: wp(25)
  }
});
