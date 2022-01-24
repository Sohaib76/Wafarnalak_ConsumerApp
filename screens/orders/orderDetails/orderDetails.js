import {
  Accordion,
  Body,
  Button,
  Container,
  Content,
  Footer,
  Header,
  Icon,
  Input,
  Item,
  Left,
  Right,
  Text,
  Thumbnail,
  Title,
  Toast,
} from "native-base";
import {
  BackHandler,
  Dimensions,
  Image,
  Modal,
  Platform,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  AsyncStorage,
} from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import OrderInvoiceSecreen from "./orderInvoice";
import OrderStatusSecreen from "./orderStatus";
import OrderSummarySecreen from "./orderSummary";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { StatusBar } from "expo-status-bar";
import OrderPopup from "../../Common/OrderPopup";

export default class OrderDetailsSecreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopupFeedback: false,
      showSubmit: false,
      showSignDialog: false,
      disablePopupBtn: false,
      signatureInput: "",
      feedbackInput: "",
      realFeedbackInput: "",
      // feedbackSubmitted: false,
      activePage: 0,
      orderDetail: {},
      isHistory: false,
      lan: "en",
      order: {},
      user: {},
      reason: 0,
      cancelReason: [
        "I've hired someone outside Wafarnalak",
        "I submitted the request by mistake",
        "I didn't like the responses",
        "I've changed my plans",
        "Professional asked me to cancel",
      ],
      timeInterval: [
        {
          txt: "09:00AM",
          id: 0,
          ceil: 9,
        },
        {
          txt: "09:30AM",
          id: 1,
          ceil: 9.5,
        },
        {
          txt: "10:00AM",
          id: 2,
          ceil: 10,
        },
        {
          txt: "10:30AM",
          id: 3,
          ceil: 10.5,
        },
        {
          txt: "11:00AM",
          id: 4,
          ceil: 11,
        },
        {
          txt: "11:30AM",
          id: 5,
          ceil: 11.5,
        },
        {
          txt: "12:00PM",
          id: 6,
          ceil: 12,
        },
        {
          txt: "12:30PM",
          id: 7,
          ceil: 12.5,
        },
        {
          txt: "01:00PM",
          id: 8,
          ceil: 13,
        },
        {
          txt: "01:30PM",
          id: 9,
          ceil: 13.5,
        },
        {
          txt: "02:00PM",
          id: 10,
          ceil: 14,
        },
        {
          txt: "02:30PM",
          id: 11,
          ceil: 14.5,
        },
        {
          txt: "03:00PM",
          id: 12,
          ceil: 15,
        },
        {
          txt: "03:30PM",
          id: 13,
          ceil: 15.5,
        },
        {
          txt: "04:00PM",
          id: 14,
          ceil: 16,
        },
        {
          txt: "04:30PM",
          id: 15,
          ceil: 16.5,
        },
        {
          txt: "05:00PM",
          id: 16,
          ceil: 17,
        },
        {
          txt: "05:30PM",
          id: 17,
          ceil: 17.5,
        },
        {
          txt: "06:00PM",
          id: 18,
          ceil: 18,
        },
        {
          txt: "06:30PM",
          id: 19,
          ceil: 18.5,
        },
        {
          txt: "07:00PM",
          id: 20,
          ceil: 19,
        },
        {
          txt: "07:30PM",
          id: 21,
          ceil: 19.5,
        },
        {
          txt: "08:00PM",
          id: 22,
          ceil: 20,
        },
        {
          txt: "08:30PM",
          id: 23,
          ceil: 20.5,
        },
        {
          txt: "09:00PM",
          id: 24,
          ceil: 21,
        },
        {
          txt: "09:30PM",
          id: 25,
          ceil: 21.5,
        },
        {
          txt: "10:00PM",
          id: 26,
          ceil: 22,
        },
        {
          txt: "10:30PM",
          id: 27,
          ceil: 22.5,
        },
        {
          txt: "11:00PM",
          id: 28,
          ceil: 23,
        },
        {
          txt: "11:30PM",
          id: 29,
          ceil: 23.5,
        },
        {
          txt: "12:00AM",
          id: 30,
          ceil: 24,
        },
        {
          txt: "12:30AM",
          id: 31,
          ceil: 24.5,
        },
        {
          txt: "01:00AM",
          id: 32,
          ceil: 25,
        },
        {
          txt: "01:30AM",
          id: 33,
          ceil: 25.5,
        },
      ],
      modalVisible: false,
      timeModalVisible: false,
      showdatePicker: false,
      currentTime: new Date(),
      actualTimeInterval: [
        {
          txt: "09:00AM",
          id: 0,
          ceil: 9,
        },
        {
          txt: "09:30AM",
          id: 1,
          ceil: 9.5,
        },
        {
          txt: "10:00AM",
          id: 2,
          ceil: 10,
        },
        {
          txt: "10:30AM",
          id: 3,
          ceil: 10.5,
        },
        {
          txt: "11:00AM",
          id: 4,
          ceil: 11,
        },
        {
          txt: "11:30AM",
          id: 5,
          ceil: 11.5,
        },
        {
          txt: "12:00PM",
          id: 6,
          ceil: 12,
        },
        {
          txt: "12:30PM",
          id: 7,
          ceil: 12.5,
        },
        {
          txt: "01:00PM",
          id: 8,
          ceil: 13,
        },
        {
          txt: "01:30PM",
          id: 9,
          ceil: 13.5,
        },
        {
          txt: "02:00PM",
          id: 10,
          ceil: 14,
        },
        {
          txt: "02:30PM",
          id: 11,
          ceil: 14.5,
        },
        {
          txt: "03:00PM",
          id: 12,
          ceil: 15,
        },
        {
          txt: "03:30PM",
          id: 13,
          ceil: 15.5,
        },
        {
          txt: "04:00PM",
          id: 14,
          ceil: 16,
        },
        {
          txt: "04:30PM",
          id: 15,
          ceil: 16.5,
        },
        {
          txt: "05:00PM",
          id: 16,
          ceil: 17,
        },
        {
          txt: "05:30PM",
          id: 17,
          ceil: 17.5,
        },
        {
          txt: "06:00PM",
          id: 18,
          ceil: 18,
        },
        {
          txt: "06:30PM",
          id: 19,
          ceil: 18.5,
        },
        {
          txt: "07:00PM",
          id: 20,
          ceil: 19,
        },
        {
          txt: "07:30PM",
          id: 21,
          ceil: 19.5,
        },
        {
          txt: "08:00PM",
          id: 22,
          ceil: 20,
        },
        {
          txt: "08:30PM",
          id: 23,
          ceil: 20.5,
        },
        {
          txt: "09:00PM",
          id: 24,
          ceil: 21,
        },
        {
          txt: "09:30PM",
          id: 25,
          ceil: 21.5,
        },
        {
          txt: "10:00PM",
          id: 26,
          ceil: 22,
        },
        // {
        //   txt: "10:30PM",
        //   id: 27,
        //   ceil: 22.5,
        // },
        // {
        //   txt: "11:00PM",
        //   id: 28,
        //   ceil: 23,
        // },
        // {
        //   txt: "11:30PM",
        //   id: 29,
        //   ceil: 23.5,
        // },
        // {
        //   txt: "12:00AM",
        //   id: 30,
        //   ceil: 24,
        // },
        // {
        //   txt: "12:30AM",
        //   id: 31,
        //   ceil: 24.5,
        // },
        // {
        //   txt: "01:00AM",
        //   id: 32,
        //   ceil: 25,
        // },
        // {
        //   txt: "01:30AM",
        //   id: 33,
        //   ceil: 25.5,
        // },
      ],
      time: null,
      date: null,
      cancelOrderModalVisible: false,
    };
  }

  handleSignature = (img) => {
    // console.log(img);
    this.setState({ signatureInput: img });
  };

  handleFeedback = (text) => {
    // console.log("t", text);
    this.setState({ feedbackInput: text });
  };

  handleRealFeedback = (text) => {
    this.setState({ realFeedbackInput: text });
  };

  handlePopupAccept = () => {
    console.log("Accept");
    this.setState({ showSignDialog: true, showSubmit: true });
  };

  handlePopupReject = () => {
    console.log("Reject");
    this.setState({ showPopupFeedback: true, showSubmit: true });
  };

  handlePopupSubmit = async () => {
    console.log("sig", this.state.signatureInput);

    let sigInput = this.state.signatureInput;
    let realfeedInput = this.state.realFeedbackInput;
    if (this.state.showPopupFeedback) {
      sigInput = "None";
    } else if (this.state.showSignDialog) {
      realfeedInput = "None";
    }
    console.log(sigInput, this.state.feedbackInput, realfeedInput);
    if (
      sigInput == "" ||
      this.state.feedbackInput == "" ||
      realfeedInput == ""
    ) {
      // this.setState({ disablePopupBtn: true });
      console.log("Show Toast");
      Toast.show({
        text:
          this.state.lan === "en"
            ? "Please Enter Required Details"
            : "الرجاء إدخال التفاصيل المطلوبة",
        position: "bottom",
      });
    } else {
      // let feedbackShow = await AsyncStorage.getItem("PopUp_Feedback");
      // console.log("test", feedbackShow);
      await AsyncStorage.removeItem("PopUp_Feedback");
      console.log("Order Tag", this.state.order.orderid);
      fetch(
        `http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wfportal/api/cu/v.3/app/finish_order/${this.state.order.orderid}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_add_amount: this.state.feedbackInput,
            user_signature: this.state.signatureInput,
            user_feedback: this.state.realFeedbackInput,
            user: this.state.user,
            date_time: new Date().toLocaleString(),
          }),
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          // if (responseJson.error == false) {
          console.log("Response", responseJson);
          // }
        })
        .catch((error) => {
          console.log(error);
        });
      this.setState({ orderPopup: false });
    }
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    let order = navigation.getParam("order");
    let user = navigation.getParam("user");
    let isHistory = navigation.getParam("isHistory");
    let lan = navigation.getParam("lan");
    console.log("laaan", lan);
    let isFeedback = navigation.getParam("isFeedback");
    this.setState({ orderIdNum: order.order_id }); //.substring(3)
    // My Logic     //Enable It After Designing
    if (isFeedback == undefined) {
      isFeedback = false;
    }
    console.log(isFeedback);
    if (isHistory && isFeedback) {
      this.setState({ orderPopup: true });
    } else {
      this.setState({ orderPopup: false });
    }

    //Persistant Storage
    // await AsyncStorage.setItem("jobs", JSON.stringify(allServices));
    // let getuser = await AsyncStorage.getItem("user");
    // user = JSON.parse(getuser);
    // await AsyncStorage.removeItem("jobs");

    //Enable It For Designing
    // if (isHistory) {
    //   this.setState({ orderPopup: true });
    // }
    // alert(JSON.stringify(order.orderid.substring(3)));

    this.setState({ loading: true });
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/view_order",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderid: order.orderid }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.error === false) {
          this.setState({
            orderDetail: responseJson,
            activePage: isHistory == true ? 2 : 1,
            isHistory: isHistory,
            order: order,
            lan: lan,
            user: user,
            loading: false,
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {});

    //   ...
    let time = new Date().getHours() + "." + new Date().getMinutes();
    let t = parseFloat(time) + 2.75; //default - 0.72  (Timings Change)
    let copyIntervals = ([] = []);

    this.state.actualTimeInterval.forEach((slot) => {
      if (parseFloat(slot.ceil) > t) {
        copyIntervals.push(slot);
      }
    });
    if (copyIntervals.length === 0) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.setState({ currentTime: tomorrow });
    }
    this.setState({ timeInterval: copyIntervals });
  };
  _renderComponent = () => {
    if (this.state.activePage === 1) {
      return (
        <OrderStatusSecreen
          navigation={this.props.navigation}
          lan={this.state.lan}
          orderDetail={this.state.orderDetail ? this.state.orderDetail : null}
        />
      );
    }
    if (this.state.activePage == 2) {
      return (
        <OrderSummarySecreen
          navigation={this.props.navigation}
          lan={this.state.lan}
          orderDetail={this.state.orderDetail ? this.state.orderDetail : null}
        />
      );
    }
    if (this.state.activePage == 3) {
      return (
        <OrderInvoiceSecreen
          lan={this.state.lan}
          navigation={this.props.navigation}
          orderDetail={this.state.orderDetail}
          invoice={this.state.orderDetail.invoice}
        />
      );
    }
  };
  selectComponent = (activePage) => {
    this.setState({ activePage: activePage });
  };
  componentWillReceiveProps = (newProps) => {
    this.componentDidMount();
    // this.setState({
    //   isHistory: newProps.navigation.getParam("isHistory"),
    //   orderDetail: newProps.navigation.getParam("order")
    // });
  };
  selectReason = (index) => {
    if (index === this.state.reason) {
      this.setState({ reason: 0 });
    } else {
      this.setState({ reason: index });
    }
  };
  openSupportChannel = () => {
    console.log("OYD", orderDetail);
    if (this.state.orderDetail.is_support) {
      if (
        this.state.orderDetail.support &&
        this.state.orderDetail.support.supportstatus >= 1
      ) {
        this.props.navigation.navigate("ComplaintForm", {
          lan: this.state.lan,
          support: this.state.orderDetail.support,
          complaintType: this.state.orderDetail.supporttype,
          orderId: this.state.orderDetail.orderid,
        });
      } else {
        this.props.navigation.navigate("ComplaintTypes", {
          lan: this.state.lan,
          orderId: this.state.orderDetail.orderid,
          support: this.state.orderDetail.support,
        });
      }
    } else {
      Toast.show({
        text:
          this.state.lan === "en"
            ? "You can open a ticket for any order in 1 week from the date when the service has been delivered"
            : "تستطيع فتح شكوى لأي طلب خدمة خلال إسبوع واحد من تاريخ تسلٌم الخدمة",
        position: "bottom",
      });
    }
  };
  cancelThisOrder = () => {
    if (this.state.reason > 0) {
      let obj = {
        orderid: this.state.order.orderid,
        reason: this.state.cancelReason[this.state.reason - 1],
      };

      if (this.state.reason !== 0) {
        this.setState({ loading: true });
        fetch(
          "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/cancel_order",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.error === false) {
              Toast.show({
                text:
                  this.state.lan === "en"
                    ? "Your Order has been Canceled!"
                    : "تم إلغاء طلبك",
                position: "bottom",
              });
              this.props.navigation.goBack();
            } else {
              Toast.show({
                text:
                  this.state.lan === "en"
                    ? "Try again later!"
                    : "حاول مره اخرى لاحقاً",
                position: "bottom",
              });
            }
            this.setState({ cancelOrderModalVisible: false, loading: false });
          })
          .catch((error) => {});
      }
    } else {
      Toast.show({
        text:
          this.state.lan === "en"
            ? "Please select any reason first!"
            : "يرجى تحديد اي سبب اولاً",
        position: "bottom",
      });
    }
  };
  showCancelModal = () => {
    this.setState({ cancelOrderModalVisible: true });
  };
  hideModal = () => {
    this.setState({ modalVisible: false, showdatePicker: false });
  };
  selectThisSlot = (slot) => {
    let index = this.state.timeInterval.findIndex((t) => t.id === slot.id);
    let selectedIndex = this.state.timeInterval.findIndex(
      (s) => s.isSelected === true
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
    this.setState({ timeInterval: copyIntervals });
  };
  closeTimeModal = () => {
    this.setState({ timeModalVisible: false });
  };
  hideCancelOrderModal = () => {
    this.setState({ cancelOrderModalVisible: false });
  };
  saveTimeSlot = () => {
    let index = this.state.timeInterval.findIndex((t) => t.isSelected === true);
    this.setState({
      time: this.state.timeInterval[index].txt,
      timeModalVisible: false,
    });
  };
  showScheduleModal = () => {
    this.setState({ modalVisible: true });
  };

  handleDatePicked = async (date) => {
    console.log("Handle Date Picked");
    this.hideDatePicker();
    if (date.getDay() == 5) {
      console.log("Change Timings");
      await this.setState({
        actualTimeInterval: [
          {
            txt: "4:00PM",
            id: 14,
            ceil: 16,
          },
          {
            txt: "4:30PM",
            id: 15,
            ceil: 16.5,
          },
          {
            txt: "5:00PM",
            id: 16,
            ceil: 17,
          },
          {
            txt: "5:30PM",
            id: 17,
            ceil: 17.5,
          },
          {
            txt: "6:00PM",
            id: 18,
            ceil: 18,
          },
          {
            txt: "6:30PM",
            id: 19,
            ceil: 18.5,
          },
          {
            txt: "7:00PM",
            id: 20,
            ceil: 19,
          },
          {
            txt: "7:30PM",
            id: 21,
            ceil: 19.5,
          },
          {
            txt: "8:00PM",
            id: 22,
            ceil: 20,
          },
          {
            txt: "8:30PM",
            id: 23,
            ceil: 20.5,
          },
          {
            txt: "9:00PM",
            id: 24,
            ceil: 21,
          },
          {
            txt: "9:30PM",
            id: 25,
            ceil: 21.5,
          },
          {
            txt: "10:00PM",
            id: 26,
            ceil: 22,
          },
        ],
      });

      console.log(this.state.actualTimeInterval);
    } else {
      await this.setState({
        actualTimeInterval: [
          {
            txt: "9:00AM",
            id: 0,
            ceil: 9,
          },
          {
            txt: "9:30AM",
            id: 1,
            ceil: 9.5,
          },
          {
            txt: "10:00AM",
            id: 2,
            ceil: 10,
          },
          {
            txt: "10:30AM",
            id: 3,
            ceil: 10.5,
          },
          {
            txt: "11:00AM",
            id: 4,
            ceil: 11,
          },
          {
            txt: "11:30AM",
            id: 5,
            ceil: 11.5,
          },
          {
            txt: "12:00PM",
            id: 6,
            ceil: 12,
          },

          // Was Commented Above
          {
            txt: "12:30PM",
            id: 7,
            ceil: 12.5,
          },
          {
            txt: "1:00PM",
            id: 8,
            ceil: 13,
          },
          {
            txt: "1:30PM",
            id: 9,
            ceil: 13.5,
          },
          {
            txt: "2:00PM",
            id: 10,
            ceil: 14,
          },
          {
            txt: "2:30PM",
            id: 11,
            ceil: 14.5,
          },
          {
            txt: "3:00PM",
            id: 12,
            ceil: 15,
          },
          {
            txt: "3:30PM",
            id: 13,
            ceil: 15.5,
          },
          {
            txt: "4:00PM",
            id: 14,
            ceil: 16,
          },
          {
            txt: "4:30PM",
            id: 15,
            ceil: 16.5,
          },
          {
            txt: "5:00PM",
            id: 16,
            ceil: 17,
          },
          {
            txt: "5:30PM",
            id: 17,
            ceil: 17.5,
          },
          {
            txt: "6:00PM",
            id: 18,
            ceil: 18,
          },
          {
            txt: "6:30PM",
            id: 19,
            ceil: 18.5,
          },
          {
            txt: "7:00PM",
            id: 20,
            ceil: 19,
          },
          {
            txt: "7:30PM",
            id: 21,
            ceil: 19.5,
          },
          {
            txt: "8:00PM",
            id: 22,
            ceil: 20,
          },
          {
            txt: "8:30PM",
            id: 23,
            ceil: 20.5,
          },
          {
            txt: "9:00PM",
            id: 24,
            ceil: 21,
          },
          {
            txt: "9:30PM",
            id: 25,
            ceil: 21.5,
          },
          {
            txt: "10:00PM",
            id: 26,
            ceil: 22,
          },
        ],
      });
    }

    if (date > new Date()) {
      console.log("inside if");

      this.setState({
        time: null,
        timeInterval: this.state.actualTimeInterval,
      });
    } else {
      let copyIntervals = ([] = []);
      let time = new Date().getHours() + "." + new Date().getMinutes();
      let t = parseFloat(time) + 3; //default 0.72
      this.state.actualTimeInterval.forEach((slot) => {
        if (parseFloat(slot.ceil) > t) {
          copyIntervals.push(slot);
        }
      });
      if (copyIntervals.length === 0) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        this.setState({ currentTime: tomorrow });
      }
      this.setState({ time: null, timeInterval: copyIntervals });
      // console.log("Before", this.state.showdatePicker);
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let finalDate = date.getDate() + "/" + month + "/" + date.getFullYear();
    console.log(this.state.showdatePicker);
    this.setState({ date: finalDate, showdatePicker: false });
    console.log(this.state.showdatePicker);
  };
  submitRescheduleRequest = () => {
    this.setState({ loading: true, modalVisible: false });
    let index = this.state.timeInterval.findIndex(
      (t) => t.txt === this.state.time
    );
    if (this.state.time && this.state.date !== null) {
      let obj = {
        orderid: this.state.order.orderid,
        servicedate: this.state.date,
        servicetimeid: this.state.timeInterval[index].id,
      };
      fetch(
        "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/reschedule_order",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({ modalVisible: false, loading: false });
          if (responseJson.error === false) {
            Toast.show({
              text:
                this.state.lan === "en"
                  ? "Your Order has been rescheduled!"
                  : "تم إعادة جدولة طلبك",
              position: "bottom",
            });
            this.props.navigation.navigate("MyOrders", {
              lan: this.state.lan,
              cartItem: 0,
            });
          } else {
            Toast.show({
              text:
                this.state.lan === "en"
                  ? "Try again later!"
                  : "حاول مره اخرى لاحقاً",
              position: "bottom",
            });
          }
        })
        .catch((error) => {});
    } else {
      Toast.show({
        text:
          this.state.lan === "en"
            ? "Select Date and Time First!"
            : "اختر التاريخ والوقت اولاًاً",
        position: "bottom",
      });
    }
  };
  showTimeModalVisible = () => {
    this.setState({ timeModalVisible: true });
  };
  showThisDatePicker = () => {
    console.log("show this date picker");
    this.setState({ showdatePicker: true });
  };
  hideDatePicker = () => {
    console.log("hideDatePicker");
    this.setState({ showdatePicker: false });
  };
  onShare = async () => {
    try {
      await Share.share({
        message:
          this.state.lan === "en"
            ? "Order home repair and maintenance services 💇🏻‍♀ 🏡 and Get SAR 15 on your first order from Wafarnalak 🤩🥳 !Download the app📲 https://onelink.to/p56krz and use my referral code " +
              this.state.user.referralcode
            : "اطلب خدمات اصلاح وصيانة المنزل 💇🏻‍♀ 🏡 واحصل على 15 ريال في طلبك الأول من وفرنالك 🤩🥳 عند تنزيل التطبيق https://onelink.to/wg5k82 📲 واستخدم رمز الدعوة الخاص بي " +
              this.state.user.referralcode,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  setUpBackNavigation = () => {
    this.props.navigation.navigate("MyOrders", { lan: this.state.lan });
    // this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* {this.state.isHistory == true && this.state.activePage !== 3 ? (
          <OrderPopup
            visible={this.state.orderPopup}
            lan={this.state.lan}
            setPopupfalse={() => {
              this.setState({ orderPopup: false });
            }}
          />
        ) : (
          <></>
        )} */}

        {/* Enable It For Real App */}
        <OrderPopup
          visible={this.state.orderPopup}
          lan={this.state.lan}
          setPopupfalse={() => {
            this.setState({ orderPopup: false });
          }}
          onEnterFeedback={this.handleFeedback}
          onEnterRealFeedback={this.handleRealFeedback}
          onEnterSignature={this.handleSignature}
          popupSubmit={this.handlePopupSubmit}
          popupAccept={this.handlePopupAccept}
          popupReject={this.handlePopupReject}
          orderNo={this.state.orderDetail.order_id}
          isDisabled={false}
          showFeedbackBox={this.state.showPopupFeedback}
          showSignatureBox={this.state.showSignDialog} //false for test
          showSubmitBtn={this.state.showSubmit} //false for test or for real state.showSignDialog

          //https://stackoverflow.com/questions/38394015/how-to-pass-data-from-child-component-to-its-parent-in-reactjs
        />

        <Header
          style={{
            marginTop: 0,
            borderBottomColor: "#0866b0",
            backgroundColor: "#ffffff",
            height: 60,
            justifyContent: "center",
            borderBottomWidth: 1,
          }}
        >
          <Left style={{ marginLeft: 10 }}>
            <Ionicons
              onPress={this.setUpBackNavigation}
              name={
                this.state.lan == "en"
                  ? "chevron-back-outline"
                  : "chevron-forward-outline"
              }
              size={40}
              color={"#0866b0"}
            />
          </Left>
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center",
              position: Platform.OS === "android" ? "absolute" : "relative",
              alignSelf: "center",
            }}
          >
            <Title
              style={{
                fontFamily: "montserrat_semi_blod",
                color: "#0866b0",
                fontSize: 18,
              }}
            >
              {this.state.lan == "en" ? "My Orders" : "طلباتي"}
            </Title>
          </View>
          <Right />
        </Header>

        <View
          style={{
            backgroundColor: "white",
            marginLeft: 8,
            marginRight: 8,
            borderBottomWidth: 0,
          }}
        >
          <Spinner visible={this.state.activePage == 0} textContent={""} />
          <View
            style={{
              backgroundColor: "#F5F5F5",
              alignSelf: "center",
              height: "100%",
              width: Dimensions.get("screen").width - 30,
            }}
          >
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  margin: 16,
                }}
              >
                <View>
                  <Image
                    source={require("../../../assets/Job-Icon-min.png")}
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 10,
                    }}
                    resizeMode="contain"
                  />
                </View>
                <View
                  style={{
                    alignContent: "center",
                    justifyContent: "center",
                    marginLeft: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#4a4b4c",
                      fontSize: 12,
                      textAlign: "left",
                    }}
                  >
                    {this.state.lan === "en" ? "Order#:" : "طلب#"}{" "}
                    {this.state.orderDetail && this.state.orderDetail.order_id}
                  </Text>
                  <Text
                    style={{
                      color: "#4a4b4c",
                      fontSize: 10,
                      textAlign: "left",
                    }}
                  >
                    {this.state.lan == "en" ? "Date:" : "الطلبات السابقة"}{" "}
                    {this.state.orderDetail &&
                      this.state.orderDetail.appointmentdate}
                  </Text>
                  <Text
                    style={{
                      color: "#4a4b4c",
                      fontSize: 12,
                      textAlign: "left",
                    }}
                  >
                    {this.state.lan == "en" ? "Status:" : "الحالة:"}{" "}
                    {this.state.orderDetail.statusid === 1
                      ? this.state.lan == "en"
                        ? "Request Sent"
                        : "تم ارسال الطلب"
                      : this.state.orderDetail.statusid === 2
                      ? this.state.lan == "en"
                        ? "Professional Assigned"
                        : "تم تعيين المهني"
                      : this.state.orderDetail.statusid === 3
                      ? this.state.lan == "en"
                        ? "Cancelled"
                        : "تم الحذف"
                      : this.state.orderDetail.statusid === 4
                      ? this.state.lan == "en"
                        ? "Job Started"
                        : "المهمة بدأت"
                      : this.state.orderDetail.statusid === 5
                      ? this.state.lan == "en"
                        ? "Completed"
                        : "تم إنجاز المهمة"
                      : this.state.orderDetail.statusid === 6
                      ? this.state.lan == "en"
                        ? "Rescheduled"
                        : "إعادة جدولة"
                      : ""}
                  </Text>
                  {this.state.orderDetail.support &&
                  this.state.orderDetail.support.supportstatus !== null ? (
                    <View>
                      {this.state.lan === "en" ? (
                        <Text
                          style={{
                            color: "#4a4b4c",
                            fontSize: 12,
                          }}
                        >
                          Complaint Status:{" "}
                          {this.state.orderDetail.support.supportstatus == 0
                            ? "Submitted"
                            : this.state.orderDetail.support.supportstatus == 1
                            ? "Under Review"
                            : this.state.orderDetail.support.supportstatus == 2
                            ? "Replied"
                            : ""}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontFamily: "montserrat_arabic_regular",
                            color: "#4a4b4c",
                            fontSize: 12,
                            marginTop: 4,
                            textAlign: "left",
                          }}
                        >
                          حالة الشكوى:{" "}
                          {this.state.orderDetail.support.supportstatus == 0
                            ? "تم التسليم"
                            : this.state.orderDetail.support.supportstatus == 1
                            ? "قيد المراجعة "
                            : this.state.orderDetail.support.supportstatus == 2
                            ? "تم الرد"
                            : ""}
                        </Text>
                      )}
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
              <Right
                style={{ position: "absolute", right: 2, flex: 1, top: 10 }}
              >
                {this.state.isHistory == true && this.state.activePage !== 3 ? (
                  <TouchableOpacity onPress={this.openSupportChannel}>
                    <View>
                      <Image
                        source={require("../../../assets/chat.png")}
                        style={{ width: 40, height: 40, alignSelf: "center" }}
                        resizeMode="contain"
                      />
                      {this.state.lan === "en" ? (
                        <Text
                          style={{ color: "#4a4b4c", alignItems: "center" }}
                        >
                          Support
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontFamily: "montserrat_arabic_regular",
                            alignItems: "center",
                          }}
                        >
                          الدعم الفني
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </Right>
            </View>
            <View
              style={{ borderBottomWidth: 1, borderBottomColor: "lightgray" }}
            ></View>

            <View
              style={{
                marginTop: 25,
                flexDirection: "row",
                alignSelf: "center",
              }}
            >
              {this.state.isHistory == false ? (
                <LinearGradient
                  colors={["#0764af", "#6ea8cd"]}
                  start={[0.9, 0.2]}
                  end={[0.1, 0.1]}
                  style={{
                    borderWidth: 0,
                    borderRadius: 6,
                    width: 150,
                    height: 40,
                    marginRight: 6,
                    borderColor: "transparent",
                  }}
                >
                  <TouchableOpacity onPress={() => this.selectComponent(1)}>
                    <View
                      style={{
                        backgroundColor:
                          this.state.activePage === 1 ? "transparent" : "white",
                        borderRadius: 6,
                        width: 150,
                        height: 40,
                        borderWidth: 0,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color:
                              this.state.activePage === 1 ? "white" : "#6ea8cd",

                            fontSize: 14,

                            fontWeight: "bold",
                          }}
                        >
                          {this.state.lan == "en"
                            ? "Order Status"
                            : "حالة الطلب"}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <View></View>
              )}

              <LinearGradient
                colors={["#0764af", "#6ea8cd"]}
                start={[0.9, 0.2]}
                end={[0.1, 0.1]}
                style={{
                  borderRadius: 6,
                  height: 40,
                  width: 150,
                  marginLeft: 6,
                  marginRight: 6,
                }}
              >
                <TouchableOpacity onPress={() => this.selectComponent(2)}>
                  <View
                    style={{
                      backgroundColor:
                        this.state.activePage === 2 ? "transparent" : "white",
                      borderWidth: 0,
                      height: 40,
                      width: 150,
                      borderRadius: 6,
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color:
                            this.state.activePage === 2 ? "white" : "#6ea8cd",
                          fontSize: 14,
                          fontWeight: "bold",
                        }}
                      >
                        {this.state.lan == "en"
                          ? "Order Summary"
                          : "ملخص الطلب"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
              {this.state.isHistory === true ? (
                <LinearGradient
                  colors={["#0764af", "#6ea8cd"]}
                  start={[0.9, 0.2]}
                  end={[0.1, 0.1]}
                  style={{
                    borderRadius: 6,
                    height: 40,
                    width: 150,
                    marginLeft: 6,
                  }}
                >
                  <TouchableOpacity onPress={() => this.selectComponent(3)}>
                    <View
                      style={{
                        backgroundColor:
                          this.state.activePage === 3 ? "transparent" : "white",
                        borderWidth: 0,
                        height: 40,
                        width: 150,
                        borderRadius: 6,
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color:
                              this.state.activePage === 3 ? "white" : "#6ea8cd",
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          {this.state.lan == "en" ? "Invoice" : "فاتورة"}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              ) : (
                <View></View>
              )}
            </View>
            {this._renderComponent()}
            {(!this.state.isHistory &&
              this.state.orderDetail &&
              this.state.orderDetail.statusid < 4) ||
            this.state.orderDetail.statusid === 6 ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 40,
                  marginBottom: 10,
                  flex: 1,
                  backgroundColor: "#F5F5F5",
                  // width: "100%",
                  width: Dimensions.get("screen").width - 30,
                }}
              >
                {this.state.orderDetail &&
                this.state.orderDetail.statusid !== 6 ? (
                  <TouchableWithoutFeedback
                    onPress={this.showScheduleModal}
                    // disabled={true}
                    // style={{ opacity: 0 }}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        flex: 1,
                        // opacity: 0,
                      }}
                    >
                      <Image
                        source={require("../../../assets/order-status-icons/reschedule.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                      />
                      {this.state.lan === "en" ? (
                        <Text>Reschedule</Text>
                      ) : (
                        <Text>تغيير الموعد</Text>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <View></View>
                )}

                {this.state.orderDetail &&
                this.state.orderDetail.statusid < 2 ? (
                  <TouchableWithoutFeedback onPress={this.showCancelModal}>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                        flex: 1,
                      }}
                    >
                      <Image
                        source={require("../../../assets/order-status-icons/cancel-btn.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                      />
                      {this.state.lan === "en" ? (
                        <Text>Cancel</Text>
                      ) : (
                        <Text>إلغاء</Text>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                ) : (
                  <View></View>
                )}
              </View>
            ) : this.state.orderDetail &&
              this.state.orderDetail.statusid === 6 ? (
              <TouchableWithoutFeedback onPress={this.showCancelModal}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                    marginTop: 40,
                    marginBottom: 10,
                    flex: 1,
                    backgroundColor: "#F5F5F5",
                    width: Dimensions.get("screen").width - 30,
                  }}
                >
                  <Image
                    source={require("../../../assets/order-status-icons/cancel-btn.png")}
                    style={{ width: 30, height: 30 }}
                    resizeMode="contain"
                  />
                  {this.state.lan === "en" ? (
                    <Text>Cancel</Text>
                  ) : (
                    <Text>إلغاء</Text>
                  )}
                </View>
              </TouchableWithoutFeedback>
            ) : this.state.activePage == 2 || this.state.activePage == 3 ? (
              <View
                style={{
                  backgroundColor: "#F5F5F5",
                  width: Dimensions.get("screen").width - 30,
                  marginBottom: 5,
                }}
              >
                <View style={{ marginTop: 10, alignSelf: "center" }}>
                  {this.state.lan === "en" ? (
                    <Text style={{ color: "#0865b0", fontSize: 18 }}>
                      Your Referral Code:
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#0865b0",
                        fontSize: 18,
                      }}
                    >
                      كود الإحالة الخاص بك
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={this.onShare}>
                  <View
                    style={{
                      alignSelf: "center",
                      backgroundColor: "white",
                      width: Dimensions.get("screen").width - 70,
                      height: 40,
                      marginTop: 12,
                    }}
                  >
                    <View
                      style={{
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          color: "#0865b0",
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        {this.state.user.referralcode}
                      </Text>
                      <Image
                        source={require("../../../assets/share_ref.png")}
                        style={{ width: 30, height: 30, marginLeft: 14 }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    alignSelf: "center",
                    marginTop: 20,
                    marginBottom: 10,
                  }}
                >
                  {this.state.lan === "en" ? (
                    <Text
                      style={{
                        textAlign: "center",
                        paddingLeft: 20,
                        paddingRight: 20,
                        fontSize: 14,
                        color: "#4a4b4c",
                      }}
                    >
                      Share your code with your friends, after their first order
                      you'll get 300 points which equals SAR 15 and they'll get
                      😊 300 points as well{"\n"} 😊 Start Sharing it Now 🤩
                    </Text>
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        lineHeight: 18,
                        marginLeft: 6,
                        marginRight: 6,
                      }}
                    >
                      شارك الرمز الخاص بك مع أصدقائك ، بمجرد إجرائهم اول طلب
                      خدمة ستربح 😊 300 نقطة والتي تساوي 15 ر.س، وسيحصلون هم على
                      300 نقطة😊 ايضاً، ابدأ المشاركة الآن🤩{" "}
                    </Text>
                  )}
                </View>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.cancelOrderModalVisible}
        >
          <View
            style={{
              marginTop: 200,
              alignSelf: "center",
              height: 340,
              borderRadius: 20,
              width: 330,
              backgroundColor: "#0764af",
            }}
          >
            <View style={{ flex: 1, alignSelf: "center", marginTop: -24 }}>
              <Thumbnail source={require("../../../assets/Icon2.png")} />
            </View>
            <View style={{ position: "absolute", right: 6, top: 10 }}>
              <Ionicons
                onPress={this.hideCancelOrderModal}
                name="ios-close-circle-outline"
                size={35}
                color="red"
              />
            </View>
            <View
              style={{ alignSelf: "center", position: "absolute", top: 40 }}
            >
              {this.state.lan === "en" ? (
                <Text
                  style={{ color: "white", fontSize: 25, fontWeight: "bold" }}
                >
                  Cancel Order
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    color: "white",
                    fontSize: 25,
                  }}
                >
                  الغاء الطلب
                </Text>
              )}
            </View>
            <View
              style={{ alignSelf: "center", position: "absolute", top: 70 }}
            >
              {this.state.lan === "en" ? (
                <Text
                  style={{
                    color: "white",
                    fontSize: 13,
                    textAlign: "center",
                  }}
                >
                  Please tell us why you want to cancel this project?
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    color: "white",
                    fontSize: 13,
                    textAlign: "center",
                  }}
                >
                  الرجاء إخبارنا لماذا تريد إلغاء هذا المشروع
                </Text>
              )}
            </View>
            <View
              style={{ position: "absolute", alignSelf: "center", top: 110 }}
            >
              <TouchableOpacity onPress={() => this.selectReason(1)}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ marginRight: 14 }}>
                    {this.state.reason === 1 ? (
                      <Ionicons
                        name="ios-checkmark-circle"
                        size={22}
                        color="white"
                      />
                    ) : (
                      <Ionicons
                        name="ios-checkmark-circle-outline"
                        size={22}
                        color="white"
                      />
                    )}
                  </View>
                  {this.state.lan === "en" ? (
                    <Text
                      style={{ color: "white", fontSize: 13, marginTop: 3.5 }}
                    >
                      I've hired someone outside Wafarnalak
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "montserrat_arabic_regular",
                        color: "white",
                        fontSize: 13,
                        marginTop: 3.5,
                      }}
                    >
                      لقد استأجرت شخص ما خارج وفرنا لك
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.selectReason(2)}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <View style={{ marginRight: 14 }}>
                    {this.state.reason === 2 ? (
                      <Ionicons
                        name="ios-checkmark-circle"
                        size={22}
                        color="white"
                      />
                    ) : (
                      <Ionicons
                        name="ios-checkmark-circle-outline"
                        size={22}
                        color="white"
                      />
                    )}
                  </View>
                  {this.state.lan === "en" ? (
                    <Text
                      style={{ color: "white", fontSize: 13, marginTop: 3.5 }}
                    >
                      I submitted the request by mistake
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "montserrat_arabic_regular",
                        color: "white",
                        fontSize: 13,
                        marginTop: 3.5,
                      }}
                    >
                      قدمت الطلب عن طريق الخطأ
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.selectReason(3)}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <View style={{ marginRight: 14 }}>
                    {this.state.reason === 3 ? (
                      <Ionicons
                        name="ios-checkmark-circle"
                        size={22}
                        color="white"
                      />
                    ) : (
                      <Ionicons
                        name="ios-checkmark-circle-outline"
                        size={22}
                        color="white"
                      />
                    )}
                  </View>
                  {this.state.lan === "en" ? (
                    <Text
                      style={{ color: "white", fontSize: 13, marginTop: 3.5 }}
                    >
                      I didn't like the responses
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "montserrat_arabic_regular",
                        color: "white",
                        fontSize: 13,
                        marginTop: 3.5,
                      }}
                    >
                      لم يعجبني الردود
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.selectReason(4)}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <View style={{ marginRight: 14 }}>
                    {this.state.reason === 4 ? (
                      <Ionicons
                        name="ios-checkmark-circle"
                        size={22}
                        color="white"
                      />
                    ) : (
                      <Ionicons
                        name="ios-checkmark-circle-outline"
                        size={22}
                        color="white"
                      />
                    )}
                  </View>
                  {this.state.lan === "en" ? (
                    <Text
                      style={{ color: "white", fontSize: 13, marginTop: 3.5 }}
                    >
                      I've changed my plans
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "montserrat_arabic_regular",
                        color: "white",
                        fontSize: 13,
                        marginTop: 3.5,
                      }}
                    >
                      لقد غيرت خططي
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.selectReason(5)}>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <View style={{ marginRight: 14 }}>
                    {this.state.reason === 5 ? (
                      <Ionicons
                        name="ios-checkmark-circle"
                        size={22}
                        color="white"
                      />
                    ) : (
                      <Ionicons
                        name="ios-checkmark-circle-outline"
                        size={22}
                        color="white"
                      />
                    )}
                  </View>
                  {this.state.lan === "en" ? (
                    <Text
                      style={{ color: "white", fontSize: 13, marginTop: 3.5 }}
                    >
                      Professional asked me to cancel
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "montserrat_arabic_regular",
                        color: "white",
                        fontSize: 13,
                        marginTop: 3.5,
                      }}
                    >
                      طلب مني المهنية للإلغاء
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <Button
                disabled={this.state.loading}
                onPress={this.cancelThisOrder}
                style={{
                  width: 100,
                  borderRadius: 12,
                  height: 30,
                  backgroundColor: "#6ea8cd",
                  marginTop: 20,
                  alignSelf: "center",
                }}
              >
                {this.state.lan === "en" ? (
                  <Text
                    style={{ color: "white", marginLeft: 15, fontSize: 12 }}
                  >
                    Submit
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "montserrat_arabic_regular",
                      color: "white",
                      marginLeft: 15,
                    }}
                  >
                    تسليم
                  </Text>
                )}
              </Button>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View
            style={{
              marginTop: 200,
              alignSelf: "center",
              height: 300,
              borderRadius: 20,
              width: 330,
              backgroundColor: "#0764af",
            }}
          >
            <View style={{ flex: 1, alignSelf: "center", marginTop: -24 }}>
              <Thumbnail source={require("../../../assets/Icon2.png")} />
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
              style={{ alignSelf: "center", position: "absolute", top: 40 }}
            >
              {this.state.lan === "en" ? (
                <Text
                  style={{ color: "white", fontSize: 25, fontWeight: "bold" }}
                >
                  Reschedule Order
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    color: "white",
                    fontSize: 25,
                  }}
                >
                  إعادة جدولة الطلب
                </Text>
              )}
            </View>
            <View
              style={{ alignSelf: "center", position: "absolute", top: 80 }}
            >
              {this.state.lan === "en" ? (
                <Text style={{ fontSize: 12, color: "white" }}>
                  Please select date and time to reschedule order.
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "montserrat_arabic_regular",
                    fontSize: 12,
                    color: "white",
                  }}
                >
                  يرجى اختر التاريخ والوقت اولاً
                </Text>
              )}
            </View>
            <TouchableWithoutFeedback
              onPress={this.showThisDatePicker}
              // disabled={true}
            >
              <View
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  top: 110,
                  width: 230,
                  height: 35,
                  backgroundColor: "white",
                  borderRadius: 15,
                }}
              >
                {this.state.date === null ? (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#4a4b4c",
                      marginTop: 8,
                    }}
                  >
                    MM/DD/YYYY
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#4a4b4c",
                      marginTop: 8,
                    }}
                  >
                    {this.state.date}
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.showTimeModalVisible}>
              <View
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  top: 155,
                  marginTop: 10,
                  width: 230,
                  height: 35,
                  backgroundColor: "white",
                  borderRadius: 15,
                }}
              >
                {this.state.time !== null ? (
                  <Text
                    style={{
                      color: "#4a4b4c",
                      textAlign: "center",
                      marginTop: 8,
                    }}
                  >
                    {this.state.time}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: "#4a4b4c",
                      textAlign: "center",
                      marginTop: 8,
                    }}
                  >
                    00:00 AM - 00-00 PM
                  </Text>
                )}
              </View>
            </TouchableWithoutFeedback>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.timeModalVisible}
            >
              <View
                style={{
                  marginTop: 205,
                  alignSelf: "center",
                  height: 290,
                  borderRadius: 20,
                  width: 200,
                  backgroundColor: "white",
                }}
              >
                <View style={{ alignSelf: "center", marginTop: 18 }}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {this.state.timeInterval.map((slot, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => this.selectThisSlot(slot)}
                        >
                          <View style={{ width: 198 }}>
                            <View
                              style={{
                                flex: 2,
                                flexDirection: "row",
                                alignSelf: "center",
                                margin: 8,
                              }}
                            >
                              <Text
                                style={{
                                  marginLeft: slot.isSelected ? 26.5 : 0,
                                  fontSize: 20,
                                }}
                              >
                                {slot.txt}
                              </Text>
                              {slot.isSelected && slot.isSelected === true ? (
                                <View style={{ marginLeft: 12, marginTop: 2 }}>
                                  <Ionicons
                                    name="ios-checkmark-circle"
                                    size={18}
                                    color="#283a97"
                                  />
                                </View>
                              ) : (
                                <View></View>
                              )}
                            </View>
                            <View
                              style={{
                                width: 100,
                                height: 1,
                                backgroundColor: "black",
                                alignSelf: "center",
                                marginTop: 4,
                              }}
                            ></View>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                  <View
                    style={{
                      backgroundColor: "white",
                      flexDirection: "row",
                      alignSelf: "center",
                      marginBottom: 12,
                    }}
                  >
                    <TouchableOpacity onPress={this.closeTimeModal}>
                      {this.state.lan === "en" ? (
                        <Text
                          style={{
                            marginTop: 6,
                            marginRight: 55,
                            textAlign: "center",
                            color: "#4a4b4c",
                            fontWeight: "bold",
                          }}
                        >
                          Cancel
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontFamily: "montserrat_arabic_regular",
                            marginTop: 6,
                            marginRight: 55,
                            textAlign: "center",
                            color: "#4a4b4c",
                          }}
                        >
                          إلغاء
                        </Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.saveTimeSlot}>
                      {this.state.lan === "en" ? (
                        <Text
                          style={{
                            marginTop: 6,
                            textAlign: "center",
                            color: "#4a4b4c",
                            fontWeight: "bold",
                          }}
                        >
                          Ok
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontFamily: "montserrat_arabic_regular",
                            marginTop: 6,
                            textAlign: "center",
                            color: "#4a4b4c",
                            fontWeight: "bold",
                          }}
                        >
                          اوك
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <View
              style={{ alignSelf: "center", position: "absolute", top: 210 }}
            >
              <Button
                onPress={this.submitRescheduleRequest}
                style={{
                  width: 100,
                  borderRadius: 12,
                  height: 30,
                  backgroundColor: "#6ea8cd",
                  top: 10,
                }}
              >
                {this.state.lan === "en" ? (
                  <Text
                    style={{ color: "white", marginLeft: 15, fontSize: 12 }}
                  >
                    Submit
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "montserrat_arabic_regular",
                      color: "white",
                      marginLeft: 15,
                    }}
                  >
                    تسليم
                  </Text>
                )}
              </Button>
            </View>
          </View>
          {/* Change Date */}
          <DateTimePicker
            isVisible={this.state.showdatePicker}
            onConfirm={this.handleDatePicked}
            // minimumDate={new Date(2021, 7, 19)}
            minimumDate={new Date()}
            mode="date"
            confirmTextIOS="Ok"
            date={this.state.currentTime}
            cancelTextIOS="Cancel"
            onCancel={this.hideDatePicker}
            datePickerContainerStyleIOS={{ backgroundColor: "gray" }}
            confirmTextStyle={{ color: "white" }}
            cancelButtonContainerStyleIOS={{ backgroundColor: "gray" }}
            cancelTextStyle={{ color: "white" }}
            titleStyle={{ color: "white" }}
          />
        </Modal>
      </View>
    );
  }
}
