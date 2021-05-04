import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  AsyncStorage,
  TouchableOpacity
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

const SaloninvoiceTab = ({ navigation }) => {
  const [Booking, setBooking] = useState(true);
  const [invoice, setinvoice] = useState(false);
  const [location, setLocation] = useState("");
  const [Salon, setSalon] = useState(false);
  const [cart, setcart] = useState(true);
  const [Profile, setProfile] = useState(false);
  const [loading, setloading] = useState(false);

  const [lan, setlan] = useState("");
  const [nameService, setnameService] = useState("");
  const [item, setitem] = useState({});
  useEffect(() => {
    loadDAta();
  }, []);
  const loadDAta = async () => {
    let lan = await AsyncStorage.getItem("lan");
    console.log("language----", lan);
    setlan(lan !== null ? lan : "en");
    setitem(navigation.state.params.item);
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
            { backgroundColor: Booking ? theme.brownColor : "white" }
          ]}
          onPress={() => {
            setBooking(true);
            setinvoice(false);
          }}
        >
          <Text
            style={[
              styles.locationTextStyle,
              { color: invoice ? theme.brownColor : "white" }
            ]}
          >
            Booking Summary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            { backgroundColor: invoice ? theme.brownColor : "white" }
          ]}
          onPress={() => {
            setBooking(false);
            setinvoice(true);
          }}
        >
          <Text
            style={[
              styles.locationTextStyle,
              { color: !invoice ? theme.brownColor : "white" }
            ]}
          >
            Invoice
          </Text>
        </TouchableOpacity>
      </View>

      {/* ----------------Card view------------- */}
      <View style={{ height: hp(70) }}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {Booking && (
            <View>
              <TouchableOpacity style={[styles.cardContainerStyle]}>
                <View style={styles.imageContainerStyle}>
                  <Image
                    style={styles.imageStyleLogo}
                    source={{ uri: navigation.state.params.item.saloonicon }}
                  />
                  <Image
                    style={styles.l}
                    source={{
                      uri: navigation.state.params.item.saloonicon
                    }}
                  />
                </View>
                <View style={styles.cardinfoConatainerStyle}>
                  <View
                    style={[
                      styles.rowStyle,
                      {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingRight: wp(3)
                        // marginTop: hp(3)
                      }
                    ]}
                  >
                    <Text style={styles.titleTextStyle}>
                      {lan == "en"
                        ? navigation.state.params.item.saloonname
                        : navigation.state.params.item.saloonname_ar}
                    </Text>
                    <Icon
                      name="md-radio-button-on"
                      size={20}
                      color={theme.brownColor}
                      style={{ marginRight: wp(5), color: theme.brownColor }}
                    />
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
                      <Text style={styles.timeTextStyle}>
                        {lan == "en" ? "Salon Location" : ":  موقع الصالون"}{" "}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.inforowstyle}>
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    fontSize: wp(3)
                  }}
                >
                  {lan == "en" ? "Date :" : ":  تاريخ"}
                </Text>
                <Text style={styles.timeTextStyle}>
                  {navigation.state.params.item.appointmentdate.substring(
                    0,
                    10
                  )}
                </Text>
              </View>
              <View style={styles.inforowstyle}>
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    fontSize: wp(3)
                  }}
                >
                  {lan == "en" ? "Time :" : ":  زمن"}
                </Text>
                <Text style={styles.timeTextStyle}>
                  {navigation.state.params.item.appointmentdate.substring(
                    13,
                    30
                  )}
                </Text>
              </View>
              <View style={styles.inforowstyle}>
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    fontSize: wp(3)
                  }}
                >
                  {lan == "en" ? "Service Booked:" : ": الخدمة محجوزة"}
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
                  Payment Type:
                </Text>
                <Text style={styles.timeTextStyle}>
                  {/* {navigation.state.params.item.grandtotal} */}
                  Cash
                </Text>
              </View>
            </View>
          )}
          {invoice && (
            <View>
              <View
                style={[styles.cardContainerStyle]}
                onPress={() => navigation.navigate("SaloninvoiceTab")}
              >
                <View style={styles.imageContainerStyle}>
                  <Image
                    style={styles.imageStyleLogo}
                    source={{
                      uri: navigation.state.params.item.saloonicon
                    }}
                  />
                </View>
                <View style={styles.cardinfoConatainerStyle}>
                  {/* <View style={styles.rowStyle}></View> */}
                  <View style={styles.rowStyle}>
                    <Text style={styles.titleTextStyle}>
                      {lan == "en"
                        ? navigation.state.params.item.saloonname
                        : navigation.state.params.item.saloonname_ar}
                    </Text>
                  </View>
                  <View style={[styles.rowStyle, { flexDirection: "row" }]}>
                    <View style={styles.timeTextStyleContainer}>
                      <Text style={styles.timeTextStyle}>
                        Order#: {navigation.state.params.item.orderid}
                      </Text>
                    </View>
                    <View style={[styles.availableboxStyle, { width: wp(25) }]}>
                      {/* <View style={[styles.promotionTextContainerStyle]}>
                          <Text style={styles.promotionTextStyle}>
                            Finished
                          </Text>
                        </View> */}
                    </View>
                  </View>
                  <View style={styles.rowStyle}>
                    <Text style={styles.timeTextStyle}>
                      {lan == "en" ? "Status :" : ": الحالة"}: Job complete
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.inforowstyle}>
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    fontSize: wp(3)
                  }}
                >
                  {lan == "en"
                    ? "Hair Color with Blow Dry :"
                    : ":  صبغ الشعر مع سشوار"}
                  Hair Color with Blow Dry:
                </Text>
                <Text style={styles.timeTextStyle}>
                  SAR {navigation.state.params.item.invoice.materialcost}
                </Text>
              </View>
              <View style={styles.inforowstyle}>
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    fontSize: wp(3)
                  }}
                >
                  {lan == "en" ? "Service Charges:" : ": رسوم الخدمات"}
                </Text>
                <Text style={styles.timeTextStyle}>
                  SAR {navigation.state.params.item.invoice.servicecharges}
                </Text>
              </View>
              <View style={styles.inforowstyle}>
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    fontSize: wp(3)
                  }}
                >
                  {lan == "en" ? " Total Amount:" : ":المبلغ الإجمالي"}
                </Text>
                <Text style={styles.timeTextStyle}>
                  SAR {navigation.state.params.item.invoice.totalamount}
                </Text>
              </View>
              <Text
                style={{
                  alignSelf: "flex-end",
                  marginRight: wp(5),
                  fontFamily: "montserrat_arabic_regular",
                  fontSize: wp(2),
                  marginTop: hp(1)
                }}
              >
                {lan == "en"
                  ? "The Charges include VAT"
                  : "تشمل الرسوم ضريبة القيمة المضافة"}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
      {/* ---------------footer------------- */}
      <View style={styles.footerStyle}>
        <TouchableOpacity
          style={styles.footerItemContainerStyle}
          onPress={() => navigation.navigate("SalonsLanding")}
        >
          <Image
            style={{ height: hp(4), width: wp(6), resizeMode: "contain" }}
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
export default SaloninvoiceTab;
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
    width: wp(67),
    paddingTop: hp(2)
  },
  rowStyle: {
    width: wp(67),
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
    fontSize: wp(3),
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
  imageStyleLogo: {
    height: hp(10),
    width: wp(20)
  }
});
