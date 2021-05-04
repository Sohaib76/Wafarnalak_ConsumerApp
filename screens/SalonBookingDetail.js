import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Modal,
  AsyncStorage,
  Linking,
  TouchableOpacity
} from "react-native";
import Constants from "expo-constants";
import { Thumbnail, Input, Button, Toast } from "native-base";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import BookingDetailHeader from "./Common/BookingDetailHeader";
import theme from "../assets/Colors";
import CalendarPicker from "react-native-calendar-picker";
import actualTimeInterval from "../screens/TimeSlotArray/TimeSlot";
import * as Location from "expo-location";

import { ScrollView, TextInput, FlatList } from "react-native-gesture-handler";
import ApiServices from "./Services/ApiServices";
import Spinner from "react-native-loading-spinner-overlay";

let itemquantity = 0;
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
let params = [];
class SalonBookingDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      timeInterval: [],
      slotId: null,
      location: "",
      Salon: true,
      salonDetail: {},
      cart: false,
      Profile: false,
      selectTime: false,
      loading: false,
      orderdate: "",
      actualSelectedDate: "",
      // item: "",
      actualSelectedDate: "",
      time: "",
      Phone: "",
      timeModalVisible: false,
      popup: false,
      user: null,
      otpOBJ: [],
      otp: null,
      catJobs: [],
      finalDate: "",
      orderArray: [],
      grandTotal: 0,
      selectedId: null,
      selectedJobId: 0,
      isSelected: false,
      counter: 0,
      lan: "",
      orderItemsArray: []
    };
    console.log(
      " navigation.state.params.item",
      this.props.navigation.state.params.item
    );
  }

  componentDidMount() {
    this.checkUser();
  }
  ß;
  // setcatJobs(item.services[0].jobs);

  checkUser = async () => {
    let lan = await AsyncStorage.getItem("lan");
    console.log("language----", lan);

    this.setState({ lan: lan });
    // setlan(lan !== null ? lan : "en");
    this.setState({ loading: true });
    console.log("if----", this.props.navigation.state.params.item.services);
    if (
      this.props.navigation.state.params.item.services === undefined ||
      this.props.navigation.state.params.item.services.length == 0
    ) {
      null;
    } else {
      console.log("here");
      this.props.navigation.state.params.item.services[0].jobs.forEach(function(
        element
      ) {
        element.quantity = 0;
      });
      this.setState({
        selectedId: this.props.navigation.state.params.item.services[0]
          .productid,
        catJobs: this.props.navigation.state.params.item.services[0].jobs
      });
    }
    let location = await Location.getCurrentPositionAsync();
    let userJ = await AsyncStorage.getItem("user");
    let userinfo = await JSON.parse(userJ);
    console.log(
      " navigation.state.params.item",
      this.props.navigation.state.params.item
    );

    this.setState({
      timeInterval: actualTimeInterval,
      item: this.props.navigation.state.params.item,
      location: location,
      user: userinfo
    });

    console.log(
      "this.props.navigation.state.params.item.services[0].jobs",
      this.props.navigation.state.params.item
    );
    ApiServices.getsalonJobs(
      this.props.navigation.state.params.item.spid,
      this.props.navigation.state.params.item.location.latitude,
      this.props.navigation.state.params.item.location.longitude,
      res => {
        this.setState({ loading: false });
        this.setState({ salonDetail: res.response });
        console.log("get salonD &&&&&&&&&etail------", this.state.salonDetail);
        console.log("get salon0000", res.response);
        this.setState({ selectedId: item.services[0].productid });

        if (res.isSuccess) {
          this.setState({ salonDetail: res.response });
          console.log("get salonDetail------", this.state.salonDetail);
        }
      }
    );
  };

  // ---------------time picker functiaon----------
  onDateChange = async date => {
    this.setState({ selectTime: true });
    let slotArray = [];
    var today = new Date();

    var dd = today.getDate();
    var today = new Date(date);
    var selected = today.getDate();

    if (dd == selected) {
      let time = new Date().getHours() + "." + new Date().getMinutes();
      let t = parseFloat(time) + 0.75;

      actualTimeInterval.forEach(slot => {
        if (parseFloat(slot.ceil) > t) {
          slotArray.push(slot);
        }
      });
      this.setState({ settimeInterval: slotArray });
    } else {
      this.setState({ settimeInterval: actualTimeInterval });
    }

    let month = new Date(date).getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let finalDate =
      new Date(date).getDate() +
      "/" +
      month +
      "/" +
      new Date(date).getFullYear();
    this.setState({ finalDate: finalDate });

    // this.setState({
    //   orderdate: finalDate,
    //   actualSelectedDate: date
    // });
  };
  // -----------------slot pickaer-----------------

  selectThisSlot = slot => {
    this.setState({ slotId: slot.id });
    let index = this.state.timeInterval.findIndex(t => t.id === slot.id);
    let selectedIndex = this.state.timeInterval.findIndex(
      s => s.isSelected === true
    );
    let copyIntervals = this.state.timeInterval.slice();
    if (selectedIndex > -1) {
      copyIntervals[selectedIndex].isSelected = false;
    }
    if (slot.isSelected === true) {
      slot.isSelected = false;
      copyIntervals[index] = slot;
    } else {
      slot.isSelected = true;
      copyIntervals[index] = slot;
    }
    this.setState({ settimeInterval: copyIntervals });
  };

  setInputField = value => {
    this.setState({ Phone: value });
    if (typeof value === "string") {
      for (var i = 0; i < 10; i++) {
        value = value.replace(arabicNumbers[i], i);
      }
    }
    if (value.length == 10) {
      ApiServices.loginUser(value, login => {
        console.log("user", login);
        if (login.isSuccess) {
          this.setState({
            otpOBJ: login.response,
            loading: true,
            popup: true
          });
        }
      });
    }
  };

  submitButton = () => {
    this.setState({ loading: true });

    if (this.state.user == null) {
      this.setState({ loading: false });

      Toast.show({
        text: "Please Login to submit order"
      });
    } else if (this.state.orderArray == []) {
      this.setState({ loading: false });
      Toast.show({
        text: "Please select desire services first"
      });
    } else if (this.state.finalDate == "") {
      this.setState({ loading: false });
      Toast.show({
        text: "Please select date first"
      });
    } else {
      ApiServices.placeorder(
        this.state.user.customerid,
        this.props.navigation.state.params.item.spid,
        this.props.navigation.state.params.item.location.latitude,
        this.props.navigation.state.params.item.location.longitude,
        this.state.finalDate,
        this.state.orderArray,
        this.state.grandTotal,
        this.state.slotId,
        res => {
          this.setState({ loading: false });
          if (res.isSuccess) {
            Toast.show({
              text: res.response.message
            });
          } else {
            Toast.show({
              text: res.error.message
            });
          }
        }
      );
    }
  };
  verifyReferralcode = () => {
    const { otp, otpOBJ } = this.state;
    ApiServices.verifyReferral(otp, otpOBJ, codeVerify => {
      if (codeVerify.isSuccess) {
        this.saveUserInformation(codeVerify.response);
      } else {
        Toast.show({
          text: codeVerify.error.message
        });
      }
    });
  };

  saveUserInformation = async user => {
    let userInfo = await JSON.stringify(user);

    try {
      await AsyncStorage.setItem("user", userInfo);
      this.setState({
        loading: false,
        popup: false,
        user: JSON.stringify(user)
      });
    } catch (error) {}
  };
  saveTimeSlot = async () => {
    this.setState({ timeModalVisible: false });
    let index = this.state.timeInterval.findIndex(t => t.isSelected === true);
    if (index > -1) {
      this.setState({
        item: this.state.timeInterval[index].txt,
        timeModalVisible: false
      });
    }
    await Analytics.logEvent("TimeSelection", {
      name: "TimeSelection",
      screen: "orderDetailScreen",
      purpose: "selecting time"
    });
  };

  plusjob = (item, index) => {
    console.log("item", item);
    this.setState({ counter: this.state.counter + 1 });
    let jobs = {
      jobid: item.jobid,
      price: item.price,
      quantity: item.quantity
    };
    var elementPos = this.state.orderArray
      .map(function(x) {
        return x.jobid;
      })
      .indexOf(item.jobid);
    console.log("order elementPos plus", elementPos);

    if (elementPos !== -1) {
      for (var i in this.state.orderArray) {
        console.log("i", i);
        if (this.state.orderArray[i].jobid == item.jobid) {
          this.state.orderArray[i].quantity =
            this.state.orderArray[i].quantity + 1;
          console.log("this.state.orderArray[i]", this.state.orderArray[i]);
          this.state.orderArray[i].price =
            item.price * this.state.orderArray[i].quantity;
          break;
        }
      }
      console.log("order array plus", this.state.orderArray);
    } else {
      this.state.orderArray.push(jobs);
      console.log("order array plus else", this.state.orderArray);
    }

    let price = this.state.orderArray.reduce(
      (accumulator, current) => accumulator + current.price,
      0
    );
    this.setState({ grandTotal: price });
  };

  decrementjob = (item, index) => {
    console.log("item", item, "index", index);
    this.setState({ counter: this.state.counter - 1 });
    let jobs = {
      jobid: item.jobid,
      price: item.price,
      quantity: item.quantity
    };
    var elementPos = this.state.orderArray
      .map(function(x) {
        return x.jobid;
      })
      .indexOf(item.jobid);
    console.log("order elementPos plus", elementPos);
    if (elementPos !== -1) {
      for (var i in this.state.orderArray) {
        console.log("i", i);
        if (this.state.orderArray[i].jobid == item.jobid) {
          this.state.orderArray[i].quantity =
            this.state.orderArray[i].quantity - 1;
          console.log("this.state.orderArray[i]", this.state.orderArray[i]);
          this.state.orderArray[i].price =
            item.price * this.state.orderArray[i].quantity;
          break;
        }
      }
      console.log("order array plus", this.state.orderArray);
    } else {
      this.state.orderArray.push(jobs);
      console.log("order array plus else", this.state.orderArray);
    }

    let price = this.state.orderArray.reduce(
      (accumulator, current) => accumulator - current.price,
      0
    );
    this.setState({ grandTotal: price });
  };
  presedItem = id => {
    if (this.state.selectedId == id) {
      this.setState({ isSelected: true });
    }
  };
  OpenMap = () => {
    let lat = parseFloat(this.state.salonDetail.location.latitude);
    let long = parseFloat(this.state.salonDetail.location.longitude);

    let originLat = this.state.location.coords.latitude;
    let originLong = this.state.location.coords.longitude;

    params.push(
      {
        key: "destination",
        value: `${lat},${long}`
      },
      {
        key: "origin",
        value: `${originLat},${originLong}`
      }
    );
    console.log("params", params);
    const getParams = (params = []) => {
      return params
        .map(({ key, value }) => {
          const encodedKey = encodeURIComponent(key);
          const encodedValue = encodeURIComponent(value);
          return `${encodedKey}=${encodedValue}`;
        })
        .join("&");
    };
    console.log("params", params);
    const url = `https://www.google.com/maps/dir/?api=1&${getParams(params)}`;
    return Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log("Error---->>>", supported);
      } else {
        return Linking.openURL(url);
      }
    });
  };
  render() {
    // const {
    //   item,
    //   timeInterval,
    //   slotId,
    //   location,
    //   Salon,
    //   salonDetail,
    //   cart,
    //   Profile,
    //   selectTime,
    //   loading,
    //   orderdate,
    //   actualSelectedDate,
    //   actualSelectedDate,
    //   time,
    //   Phone,
    //   timeModalVisible,
    //   popup,
    //   user,
    //   otpOBJ,
    //   otp,
    //   catJobs,
    //   finalDate,
    //   orderArray,
    //   grandTotal,
    //   selectedId,
    //   selectedJobId,
    //   isSelected,
    //   counter,
    //   lan
    // } = this.status;
    const { navigation } = this.props;
    return (
      <View style={styles.containerStyle}>
        <BookingDetailHeader
          HeaderText="Booking Details"
          onBackPress={() => navigation.goBack()}
          lan={this.state.lan}
        />
        <Spinner visible={this.state.loading} textContent={""} />
        <View style={{ height: hp(81.3) }}>
          <ScrollView
            style={
              {
                // paddingBottom: hp(20)
              }
            }
          >
            <View style={styles.imagecontainerStyle}>
              <Image
                source={{ uri: this.state.item.saloonbanner }}
                style={{ width: wp(100), height: hp(25), resizeMode: "cover" }}
              />
            </View>
            <View style={styles.locationContainerStyle}>
              <View style={styles.leftContainerStyle}>
                <Image
                  source={{ uri: navigation.state.params.item.profileimage }}
                  style={styles.logoimageStyle}
                />
                <Text
                  style={{ marginTop: hp(0.5), color: theme.fontLightBlack }}
                >
                  reviews {this.state.salonDetail.reviews}
                </Text>
                <View style={styles.distancecontainerBoxStyle}>
                  <Text style={styles.locationTextStyle}>
                    {this.state.salonDetail.distance} away
                  </Text>
                </View>
                <Text
                  style={{ marginTop: hp(0.5), color: theme.fontLightBlack }}
                >
                  {this.state.salonDetail.openingtime} -{" "}
                  {this.state.salonDetail.closingtime}
                </Text>
              </View>
              <View style={styles.rightcontainerStyle}>
                <TouchableOpacity
                  style={styles.locationButtonStyle}
                  onPress={() => this.OpenMap()}
                >
                  <Text style={styles.locationTextStyle}>
                    {this.state.lan == "en" ? "Salon location" : "موقع الصالون"}{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* ----------TAbs-------- */}
            <View
              style={{
                // backgroundColor: "red",
                width: wp(100),
                paddingTop: hp(2)
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <FlatList
                  horizontal
                  data={this.state.item.services}
                  renderItem={({ item }) => (
                    <View>
                      <TouchableOpacity
                        style={[
                          styles.tabsbuttonStyle,
                          {
                            borderWidth: 1,
                            borderColor: theme.brownColor,
                            backgroundColor:
                              this.state.selectedId == item.productid
                                ? theme.brownColor
                                : "white"
                          }
                        ]}
                        onPress={() => {
                          item.jobs.forEach(function(element) {
                            element.quantity = 0;
                          });
                          this.setState({ catJobs: item.jobs });
                          this.setState({ selectedId: item.productid });
                        }}
                      >
                        <Image
                          source={{ uri: item.productseoname }}
                          style={{
                            height: hp(3),
                            width: wp(4),
                            resizeMode: "contain",
                            tintColor: "white",
                            marginLeft: wp(2),
                            tintColor:
                              this.state.selectedId == item.productid
                                ? "white"
                                : theme.brownColor
                          }}
                        />
                        <Text
                          style={[
                            styles.locationTextStyle,
                            {
                              paddingHorizontal: hp(2),
                              color:
                                this.state.selectedId == item.productid
                                  ? "white"
                                  : theme.brownColor
                            }
                          ]}
                        >
                          {/* {item.productname} */}
                          {this.state.lan == "en"
                            ? item.productname
                            : item.productname_ar}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                />
                {/* {item.services !== undefined &&
                  item.services.map((button, index) => {
                    console.log("button----", button);
                    return (
                      <View>
                        <TouchableOpacity
                          style={[styles.tabsbuttonStyle]}
                          onPress={() => {
                            setcatJobs(button.jobs);
                            setselectedId(button.productid);
                            // let index = item.services.findIndex(button);
                            let selectedIndex = item.services.findIndex(
                              s => s.productid === button.productid
                            );
                            if (selectedIndex == 1) {
                              item.services[selectedIndex].isSelected == true;
                            }
                            console.log("selected button", selectedIndex);
                            console.log("item.services", item.services);
                          }}
                        >
                          <Image
                            source={{ uri: button.productseoname }}
                            style={{
                              height: hp(3),
                              width: wp(4),
                              resizeMode: "contain",
                              tintColor: "white",
                              marginLeft: wp(2)
                            }}
                          />
                          <Text
                            style={[
                              styles.locationTextStyle,
                              { paddingHorizontal: hp(2) }
                            ]}
                          >
                            {button.productname}
                           
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })} */}
              </View>

              {/* -------------- */}

              <FlatList
                data={this.state.catJobs}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.jobCardStyle}>
                      <View
                        style={{ flexDirection: "row", paddingLeft: wp(5) }}
                      >
                        <Image
                          source={{ uri: item.jobimage }}
                          style={[styles.cardlogoStle]}
                        />
                        <Text style={styles.titleTextStyle}>
                          {this.state.lan == "en"
                            ? item.jobname
                            : item.jobname_ar}
                        </Text>
                      </View>
                      <View style={styles.bottomviewStyle}>
                        <View
                          style={{ width: wp(20), justifyContent: "center" }}
                        >
                          <Text style={styles.priceTextstyle}>
                            SAR {item.price}
                          </Text>
                        </View>
                        <View style={styles.quantitycontainerStyle}>
                          <Text style={styles.unitsTextStyle}>
                            {this.state.lan == "en"
                              ? "Number of units"
                              : "عدد الوحدات"}
                          </Text>
                          <View style={styles.buttonscontainerStyle}>
                            <TouchableOpacity
                              style={styles.incrementButtonContainerStyle}
                              onPress={() => {
                                if (this.state.counter > 0) {
                                  console.log("item quantity", item.quantity);
                                  console.log("counter", this.state.counter);
                                  this.setState({ selectedJobId: item.jobid });
                                  if (this.state.selectedJobId == item.jobid) {
                                    this.setState({
                                      counter: this.state.counter - 1
                                    });
                                    let copyarray = [...this.state.catJobs];
                                    copyarray[index].quantity -= 1;
                                  }
                                  if (this.state.counter > 0) {
                                    this.decrementjob(item, index);
                                  }
                                }
                              }}
                            >
                              <Ionicons
                                size={20}
                                color="#fff"
                                name={"md-remove"}
                              />
                            </TouchableOpacity>
                            <Text style={styles.quantityTextStyle}>
                              {item.quantity}
                            </Text>
                            <TouchableOpacity
                              style={styles.incrementButtonContainerStyle}
                              onPress={() => {
                                this.setState({ selectedJobId: item.jobid });

                                if (this.state.selectedJobId == item.jobid) {
                                  this.setState({
                                    counter: this.state.counter + 1
                                  });
                                  let copyarray = [...this.state.catJobs];
                                  copyarray[index].quantity += 1;
                                  this.plusjob(item, index);
                                }
                              }}
                            >
                              <Ionicons
                                size={20}
                                color="#fff"
                                name={"md-add"}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
            <View style={styles.tabscontainerStyle}>
              {/* {item !== null &&
                item.services.map(button => (
                  <View style={{}}>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity style={styles.tabsbuttonStyle}>
                        <Text
                          style={[
                            styles.locationTextStyle,
                            { paddingHorizontal: hp(2) }
                          ]}
                        >
                          {lan == "en"
                            ? button.productname
                            : button.productname_ar}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {button.jobs.map(job => (
                    <View>
                      <View style={styles.jobCardStyle}>
                        <View
                          style={{ flexDirection: "row", paddingLeft: wp(5) }}
                        >
                          <Image
                            source={{ uri: item.logo }}
                            style={styles.cardlogoStle}
                          />
                          <Text style={styles.titleTextStyle}>{item.title}</Text>
                        </View>
                        <View style={styles.bottomviewStyle}>
                          <View
                            style={{ width: wp(20), justifyContent: "center" }}
                          >
                            <Text style={styles.priceTextstyle}>SAR 148</Text>
                          </View>
                          <View style={styles.quantitycontainerStyle}>
                            <Text style={styles.unitsTextStyle}>
                              Number of units
                            </Text>
                            <View style={styles.buttonscontainerStyle}>
                              <TouchableOpacity
                                style={styles.incrementButtonContainerStyle}
                                onPress={() => {
                                  if (counter > 0) {
                                    setcounter(counter - 1);
                                  }
                                }}
                              >
                                <Ionicons
                                  size={20}
                                  color="#fff"
                                  name={"md-remove"}
                                />
                              </TouchableOpacity>
                              <Text style={styles.quantityTextStyle}>
                                {counter}
                              </Text>
                              <TouchableOpacity
                                style={styles.incrementButtonContainerStyle}
                                onPress={() => setcounter(counter + 1)}
                              >
                                <Ionicons
                                  size={20}
                                  color="#fff"
                                  name={"md-add"}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                  </View>
                ))} */}
            </View>
            {/* ----------tabs cards-------- */}

            {/* -------------time model visible----------- */}

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.timeModalVisible}
            >
              <View style={styles.modelView}>
                <View style={styles.modelViewRow}>
                  <View>
                    <Text
                      style={[styles.unitsTextStyle, { alignSelf: "center" }]}
                    >
                      Select time
                    </Text>
                  </View>
                  <View style={[styles.modelScrollView]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {this.state.timeInterval.map(i => {
                        return (
                          <TouchableOpacity
                            style={[styles.modelrow]}
                            onPress={() => this.selectThisSlot(i)}
                          >
                            <View style={styles.modelleft}></View>

                            <View
                              style={[
                                styles.modeltextcontainercenter,
                                { borderBottomWidth: 1 }
                              ]}
                            >
                              <Text onPress={() => this.selectThisSlot(i)}>
                                {i.txt}
                              </Text>
                            </View>
                            <View style={styles.modelright}>
                              {i.isSelected && (
                                <Ionicons
                                  name={"ios-checkmark-circle-outline"}
                                  size={16}
                                  color={theme.brownColor}
                                />
                              )}
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>
                  </View>
                  <View style={styles.modelbottomViewstyle}>
                    <Text
                      style={styles.cancelbuttonStyle}
                      onPress={() => this.setState({ timeModalVisible: false })}
                    >
                      Cancel
                    </Text>
                    <Text
                      style={styles.cancelbuttonStyle}
                      onPress={() => this.saveTimeSlot()}
                    >
                      OK
                    </Text>
                  </View>
                </View>
              </View>
            </Modal>
            {/* ------------popup----- */}

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.popup}
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
                    onPress={() => this.setState({ popup: false })}
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
                      // this.setotpCode(ref);
                      this.setState({ otp: ref });
                    }}
                    placeholderTextColor="#cdd0d4"
                    // placeholder={lan === "en" ? "Code" : "رمز"}
                    placeholder={this.state.lan === "en" ? "XXXX" : "XXXX"}
                  />
                  <Button
                    onPress={() => this.verifyReferralcode()}
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

            {/* -------payment section------ */}
            <View style={styles.rowStyle}>
              <Text style={{ color: theme.brownColor, fontWeight: "600" }}>
                PAYMENT MODE
              </Text>
              <View style={styles.cashBosSTyle}>
                <Text style={styles.locationTextStyle}>CASH</Text>
                <Ionicons
                  name={"ios-checkmark-circle"}
                  size={16}
                  color={"white"}
                />
              </View>
            </View>
            {this.state.user == null && (
              <View style={[styles.rowStyle, { borderTopWidth: 0 }]}>
                <Text style={{ color: theme.brownColor, fontWeight: "600" }}>
                  MOBILE#
                </Text>
                <TextInput
                  placeholder={"966586825880"}
                  style={styles.textInputStyle}
                  value={text => {
                    this.setState({ Phone: text });
                  }}
                  onChangeText={phone => {
                    this.setInputField(phone);
                  }}
                />
              </View>
            )}

            <View
              style={[
                styles.rowStyle,
                { borderTopWidth: 0, flexDirection: "column" }
              ]}
            >
              <Text style={styles.datetestStyle}>DATE & TIME</Text>

              <CalendarPicker
                nextTitleStyle={{ marginRight: 15, color: theme.yellow }}
                previousTitleStyle={{
                  marginLeft: 12,
                  color: theme.yellow
                }}
                selectedDayStyle={{ backgroundColor: theme.brownColor }}
                selectedDayTextColor="white"
                todayBackgroundColor="#6ea8cd"
                width={275}
                height={230}
                onDateChange={this.onDateChange}
              />
              <View style={{ marginTop: hp(1) }}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => this.setState({ timeModalVisible: true })}
                >
                  <Text style={styles.locationTextStyle}>Select Time</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                styles.rowStyle,
                { borderTopWidth: 0, flexDirection: "column" }
              ]}
            >
              <Text style={styles.datetestStyle}>PAYMENT DETAILS</Text>
              <View style={styles.rowSubstyle}>
                <Text style={{ fontWeight: "300" }}>
                  {this.state.lan == "en" ? "Order Total" : "الطلب الكلي"}{" "}
                </Text>
                <Text style={{ fontWeight: "300" }}>
                  SAR {this.state.grandTotal}
                </Text>
              </View>
              {/* <View style={styles.rowSubstyle}>
                <Text style={{ fontWeight: "300" }}>Discounts</Text>
                <Text style={{ fontWeight: "300" }}>SAR 0</Text>
              </View> */}
              <View style={styles.rowSubstyle}>
                <Text> {this.state.lan == "en" ? "Order Total" : "مجموع"}</Text>
                <Text>SAR {this.state.grandTotal}</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* ----------tabs-------- */}

        <View>
          <View
            style={{
              bottom: 0,
              position: "relative",
              alignSelf: "center",
              // paddingBottom: hp(5),
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <TouchableOpacity
              style={[styles.buttonStyle]}
              onPress={() => this.submitButton()}
            >
              <Text style={styles.locationTextStyle}>Book Slot</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    marginHorizontal: wp(1),
    flexDirection: "row"
  },
  locationButtonStyle: {
    backgroundColor: theme.brownColor,
    height: hp(5),
    alignSelf: "center",
    width: wp(28),
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
    height: hp(2.5),
    backgroundColor: theme.yellow,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(0.5),
    borderRadius: wp(0.5),
    paddingHorizontal: wp(2)
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
    width: wp(40),
    height: hp(8),
    resizeMode: "contain",
    marginTop: hp(1)
  },
  cardlogoStle: {
    width: wp(8.7),
    height: hp(5),
    // resizeMode: "cover",
    overflow: "hidden",
    borderRadius: wp(100)
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
  cancelbuttonStyle: {
    fontFamily: "montserrat_arabic_regular",
    color: theme.fontLightBlack,
    fontSize: wp(2.5)
  },
  incrementButtonContainerStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(6) / 2,
    height: hp(4),
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
  },
  modelView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modelViewRow: {
    height: hp(42),
    width: wp(50),
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: wp(1)
  },
  modelScrollView: {
    height: hp(35),
    width: wp(70)
  },
  modelrow: {
    flexDirection: "row",
    width: wp(50)
    // borderColor: "#ccc"
  },
  modelleft: {
    flexDirection: "row",
    width: wp(10)
  },
  modeltextcontainercenter: {
    flexDirection: "row",
    width: wp(30),
    justifyContent: "center",
    alignItems: "center"
  },
  modelright: {
    flexDirection: "row",
    height: hp(4),
    width: wp(10),
    justifyContent: "center",
    alignItems: "center"
  },
  modelbottomViewstyle: {
    height: hp(4),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(4),
    justifyContent: "space-between"
  }
});
export default SalonBookingDetail;
