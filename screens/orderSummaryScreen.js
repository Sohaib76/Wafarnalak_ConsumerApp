import * as Analytics from "expo-firebase-analytics";
import * as Permissions from "expo-permissions";

import {
  AsyncStorage,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import {
  Container,
  Content,
  Footer,
  Header,
  Input,
  Item,
  Left,
  Right,
  Text,
  Thumbnail,
  Title,
  Toast,
  Button,
} from "native-base";

import CalendarPicker from "react-native-calendar-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationEvents } from "react-navigation";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { StatusBar } from "expo-status-bar";
const withPaint =
  "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job\n3- The price of the paint is not included in the prices\r\n4- These prices are inclusive of the visit charge\r\n5- The professional would charge SAR 25 for the visit, in case the job is not finalized";
const withOutPaint =
  "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job";
const withPaint_ar =
  "1 ) هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل." +
  "\n" +
  "2) السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل." +
  "\n" +
  "3)السعر لا يشمل سعر الطلاء" +
  "\n" +
  "4) الأسعار تشمل تكاليف الزيارة" +
  "\n" +
  "5)سيكون عليك دفع 25 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة";
const withOutPaint_ar =
  "1 ) هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل." +
  "\n" +
  "2) السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.";
let persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g,
];
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
  /٩/g,
];
export default class OrderSummaryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disableOrder: false,
      userForensePoints: 0,
      lan: "en",
      points: 0,
      loading: false,
      discount: 0,
      modalVisible: false,
      jobs: [],
      phone: "",
      address: "",
      orderdate: "",
      actualSelectedDate: "",
      orderTotal: 0,
      hour: 0,
      minute: "00",
      isConsultation: false,
      limitMessage: "",
      user: null,
      isLogin: false,
      isPackage: false,
      isloaded: true,
      timeModalVisible: false,
      selectTime: false,
      currentTime: new Date(),
      time: "",
      token: "",
      package: {},
      timeInterval: [],
      referralModalVisible: false,
      otpid: "",
      referralCode: "",
      found: false,
      cartNotesAdds: "",
      cartNotesAdds_ar: "",
      promoCode: "",
      promoSuccess: false,
      alertVisible: true,
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
        //   id: 28,
        //   ceil: 23,
        // },
        // {
        //   txt: "12:00AM",
        //   id: 28,
        //   ceil: 23,
        // },
        // {
        //   txt: "12:30AM",
        //   id: 28,
        //   ceil: 23,
        // },
        // {
        //   txt: "01:00AM",
        //   id: 28,
        //   ceil: 23,
        // },
        // {
        //   txt: "01:30AM",
        //   id: 28,
        //   ceil: 23,
        // },
      ],
    };
  }
  setUserPoints = (points) => {
    this.setState({
      points: points,
      disocunt:
        parseInt(this.state.userForensePoints) >= parseInt(points) &&
        parseInt(this.state.userForensePoints) >= 500
          ? parseInt(points) * 0.05
          : 0,
    });
  };
  setModalVisible = () => {
    // this.setState({ modalVisible: true });
    this.setState({ modalVisible: true });
  };
  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  componentDidMount = async () => {
    this.setState({ alertVisible: true });
    const { navigation } = this.props;
    let getJobs = await AsyncStorage.getItem("jobs");
    console.log("getJobs", getJobs);
    let getPackgaeJobs = await AsyncStorage.getItem("packgaeJobs");

    let isPackage = navigation.getParam("isPackage");
    let address = await AsyncStorage.getItem("address");
    let user = await AsyncStorage.getItem("user");
    let lan = navigation.getParam("lan");

    if (getJobs !== null || getPackgaeJobs !== null) {
      let jobs = JSON.parse(getJobs);

      let packgaeJobs = JSON.parse(getPackgaeJobs);

      let cconsultationFind =
        isPackage == true
          ? packgaeJobs.jobs.findIndex((j) => j.pricetype == 2)
          : jobs.findIndex((j) => j.pricetype == 2);
      let time = new Date().getHours() + "." + new Date().getMinutes();
      let t = parseFloat(time) + 1.25; //changed 1.25 , 2.5
      console.log("ttt", t);
      console.log("time", time);
      let copyIntervals = ([] = []);

      var today = new Date();
      if (today.getDay() == 5) console.log("Firday");

      this.state.actualTimeInterval.forEach((slot) => {
        if (parseFloat(slot.ceil) > t) {
          copyIntervals.push(slot);
        }
      });
      if (copyIntervals.length === 0) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1); //tried 2 here, was 1 here
        this.setState({ currentTime: tomorrow });
      }

      this.setState({
        isPackage: isPackage,
        timeInterval:
          copyIntervals.length > 0
            ? copyIntervals
            : this.state.actualTimeInterval,
        jobs: isPackage == true ? packgaeJobs.jobs : jobs,
        package: isPackage == true ? packgaeJobs : {},
        isConsultation: cconsultationFind > -1 ? true : false,
        isloaded: false,
        lan: lan,
        address: address ? JSON.parse(address) : "",
        hour:
          new Date().getHours() + 3 < 23 && new Date().getHours() >= 9
            ? new Date().getHours() + 3
            : 9,
        minute: "00",
        user: user !== null ? JSON.parse(user) : null,
      });

      this.calculateTotalPrice(isPackage == true ? packgaeJobs.jobs : jobs);
    }
    if (user == null) {
      this.registerForPushNotificationAsync();
    }

    if (user !== null) {
      this.getUserPoints(JSON.parse(user));
    }
    var found = this.state.jobs.map((value) => {
      return value.serviceid;
      // if (value.serviceid !== 53) {
      //   return false;
      // } else return true;
    });
    console.log("found", found);
    const temp = found.find((element) => element === 53);
    console.log("temp", temp);
    console.log("jobsssss", this.state.jobs);
    if (temp !== undefined && temp !== null) {
      this.setState({
        cartNotesAdds: withPaint,
        cartNotesAdds_ar: withPaint_ar,
      });
    } else {
      this.setState({
        cartNotesAdds: withOutPaint,
        cartNotesAdds_ar: withOutPaint_ar,
      });
    }
    // let unique = this.state.jobs.filter(
    //   (v, i, a) => a.findIndex(t => t.serviceid === v.serviceid) === i
    // );

    // this.setState({
    //   cartNotesAdds: unique
    // });

    // // this.setState({
    // //   cartNotesAdds: this.unique(this.state.jobs, it => it.carttype)
    // // });
    // console.log("cartNotesAdds", this.state.cartNotesAdds);
    // this.unique(this.state.jobs, it => it.carttype);
  };
  unique(data, key) {
    return [...new Map(data.map((x) => [key[x], x])).values()];
  }
  getUserPoints = (user) => {
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/get_forense_points",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerid: user.customerid,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error === false) {
          this.setState({
            userForensePoints: responseJson.forensepoints,
            loading: false,
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {});
  };
  registerForPushNotificationAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();
    this.setState({ token: token });
  };
  calculateTotalPrice = (jobs) => {
    let total = 0;
    jobs.forEach((job) => {
      console.log("calculateTotalPrice ", job);
      if (job.offerId == 1) {
        total = 25;
      } else {
        total = total + job.t_price;
      }
    });
    if (this.state.promoCode.toUpperCase() == "WATA") {
      total = total - (total / 100) * 5;
      this.setState({ orderTotal: total, promoSuccess: true });
    } else {
      this.setState({ orderTotal: total });
    }
  };
  verifyPromoCode = () => {
    if (this.state.promoCode.toUpperCase() == "WATA") {
      let total = this.state.orderTotal - (this.state.orderTotal / 100) * 5;
      this.setState({ orderTotal: total, promoSuccess: true });
    }
  };
  verifyDiscount = () => {
    if (
      parseInt(this.state.userForensePoints) >= parseInt(this.state.points) &&
      parseInt(this.state.userForensePoints) >= 500
    ) {
      this.setState({
        discount: parseInt(this.state.points) * 0.05,
        modalVisible: false,
      });
    } else {
      Toast.show({
        text:
          this.state.lan == "en"
            ? "You Don't Have Enough Points to Avail Discount!"
            : "ليس لديك نقاط كافية للإستفادة من الخصم",
        position: "top",
      });
    }
  };
  setInputField = (property, value) => {
    if (typeof value === "string") {
      for (var i = 0; i < 10; i++) {
        value = value.replace(arabicNumbers[i], i);
      }
    }
    this.setState({ [property]: value });
    if (value.length == 10) {
      this.loginUser(value);
    }
  };

  verifyReferral = () => {
    if (this.state.referralCode !== "") {
      fetch(
        "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/verify_customer_login_otp",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otpid: this.state.otpid,
            otpentered: this.state.referralCode,
          }),
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error == false) {
            this.saveUser(responseJson);
            this.setState({ referralModalVisible: false, user: responseJson });
            // Toast.show({
            //   text: responseJson.message,
            //   position: "bottom",
            //   duration: 3000
            // });
          } else {
            Toast.show({
              text: responseJson.message,
              position: "bottom",
              duration: 3000,
            });
          }

          this.setState({ loading: false });
        })
        .catch((error) => {});
    } else {
      Toast.show({
        text:
          this.state.lan === "en"
            ? "Please enter referral code, if any?"
            : "يرجى ادخال رمز الدعوة، اذا موجود؟",
        position: "bottom",
      });
    }
  };
  loginUser = (mobile) => {
    this.setState({ loading: true });
    if (
      mobile !== "" &&
      mobile.charAt(0) == 0 &&
      mobile.charAt(1) == 5 &&
      mobile.length == 10
    ) {
      fetch(
        "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/customer_login",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mobile: mobile,
            customerdeviceid: this.state.token,
          }),
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error == false) {
            this.setState({ otpid: responseJson.otpid });

            this.setState({ referralModalVisible: true, loading: false });
          }
        })
        .catch((error) => {
          this.setState({ loading: false });
        });
    } else {
      this.setState({ loading: false });
      Toast.show({
        text:
          this.state.lan === "en"
            ? "Please enter your valid mobile number!"
            : "يرجى إدخال رقم الجوال بشكل صحيح",
        position: "bottom",
      });
    }
  };
  saveUser = async (user) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    await Analytics.logEvent("PhoneNoSelection", {
      name: "PhoneNoSelection",
      screen: "orderDetailScreen",
      purpose: "user signed in from order summary screen",
    });
  };
  removeSelectedJob = async (selectedJob) => {
    let index = this.state.jobs.findIndex((job) => job.id == selectedJob.id);
    let newJobs = this.state.jobs;
    if (index > -1) {
      newJobs.splice(index, 1);
      this.setState({ jobs: newJobs });
      await AsyncStorage.setItem("jobs", JSON.stringify(newJobs));
      this.calculateTotalPrice(newJobs);
    }
    var found = this.state.jobs.map((value) => {
      return value.serviceid;
      // if (value.serviceid !== 53) {
      //   return false;
      // } else return true;
    });
    console.log("found", found);
    const temp = found.find((element) => element === 53);
    console.log("temp", temp);
    console.log("jobsssss", this.state.jobs);
    if (temp !== undefined && temp !== null) {
      this.setState({
        cartNotesAdds: withPaint,
        cartNotesAdds_ar: withPaint_ar,
      });
    } else {
      this.setState({
        cartNotesAdds: withOutPaint,
        cartNotesAdds_ar: withOutPaint_ar,
      });
    }
  };
  onDateChange = async (date) => {
    this.setState({
      disableOrder: false,
    });
    this.setState({ selectTime: true });
    let slotArray = [];
    var today = new Date();
    console.log(today, "today");
    var dd = today.getDate();
    var today = new Date(date);
    var selected = today.getDate();
    console.log(date, "date");
    var datee = new Date(date);
    console.log(datee.getDay(), "Day");

    // alert(datee.getDate());

    // if (
    //   datee.getDate() == "20" ||
    //   datee.getDate() == "21" ||
    //   datee.getDate() == "22" ||
    //   datee.getDate() == "23" ||
    //   datee.getDate() == "24" ||
    //   datee.getDate() == "25" ||
    //   datee.getDate() == "26"
    // ) {
    //   this.setState((prev) => {
    //     return { disableOrder: true };
    //   });
    //   alert(
    //     "You can't place order during 20th July to 26th July due to Eid Vacations!"
    //   );
    // }

    if (datee.getDay() == 5) {
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

    if (dd == selected) {
      console.log(
        "todayHourse",
        (today.getTime() / (1000 * 60 * 60)).toFixed(1)
      );
      let time = new Date().getHours() + "." + new Date().getMinutes();
      let t = parseFloat(time) + 2; //1.25, 2.5
      console.log("t", t);
      this.state.actualTimeInterval.forEach((slot) => {
        console.log("parseFloat(slot.ceil -----", parseFloat(slot.ceil));
        console.log("t-----", t);
        if (parseFloat(slot.ceil) > t) {
          slotArray.push(slot);
        }
      });
      console.log("slot", slotArray);
      this.setState({ timeInterval: slotArray });
    } else {
      console.log("hrerrr ");
      this.setState({ timeInterval: this.state.actualTimeInterval });
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
    this.setState({
      orderdate: finalDate,
      actualSelectedDate: date,
    });
  };
  plusHours = () => {
    let currentHour = this.state.hour;
    let hourMaxLimit = 0.723; //0.723
    if (this.state.hour < hourMaxLimit) {
      let h = currentHour + 1; //here 1
      this.setState({ hour: h });
    }
  };
  minusHours = () => {
    let hourMinLimit =
      this.state.actualSelectedDate &&
      new Date(this.state.actualSelectedDate).getDate() > new Date().getDate()
        ? 9
        : new Date().getHours() + 3;
    if (this.state.hour > hourMinLimit) {
      let h = this.state.hour - 1;
      this.setState({ hour: h });
    }
  };
  plusMinutes = () => {
    if (this.state.minute < 30) {
      this.setState({ minute: "30" });
    }
  };
  minusMinutes = () => {
    if (this.state.minute >= 30) {
      this.setState({ minute: "00" });
    }
  };
  backBehaviour = () => {
    this.props.navigation.goBack();
  };
  checkLimts = () => {
    let total = 0;
    let limit = 0;
    let isConsultation = false;
    let electricianJobs = this.state.jobs.filter((job) => job.serviceid == 1);
    let actechnicianJobs = this.state.jobs.filter((job) => job.serviceid == 29);
    let plumbingJobs = this.state.jobs.filter((job) => job.serviceid == 3);
    let carpentarJobs = this.state.jobs.filter((job) => job.serviceid == 4);
    let actectronicsJobs = this.state.jobs.filter((job) => job.serviceid == 48);
    let packersMoversJobs = this.state.jobs.filter(
      (job) => job.serviceid == 17
    );
    let sanitizationJobs = this.state.jobs.filter((job) => job.serviceid == 45);
    let pestControlJobs = this.state.jobs.filter((job) => job.serviceid == 47);
    let gardningServices = this.state.jobs.filter((job) => job.serviceid == 29);
    if (electricianJobs.length > 0) {
      electricianJobs.forEach((electrician) => {
        if (electrician.variants) {
          electrician.variants.forEach((variant) => {
            variant.variants_attr.forEach((var_atr) => {
              var_atr.attr.forEach((attr) => {
                if (attr.selected) {
                  total = total + attr.attr_price * variant.items;
                }
              });
            });
          });
        }
        total = total + electrician.t_price;
        limit = electrician.pricelimit;
        isConsultation = electrician.pricetype == 2 ? true : false;
      });

      if (total < limit && isConsultation == false) {
        this.setState({
          limitMessage:
            this.state.lan == "en"
              ? "Order Limit for this category is SAR " +
                limit +
                ". Select any other service or schedule a consultation visit"
              : "الحد الأدنى لهذه الخدمة 49 ر.س. يرجى اضافة خدمة اخرى او ترتيب زيارة إستشارات",
        });
      }
      total = 0;
      limit = 0;
      isConsultation = false;
    }
    if (actechnicianJobs.length > 0) {
      actechnicianJobs.forEach((technician) => {
        total = total + technician.t_price;
        limit = technician.pricelimit;
        isConsultation = technician.pricetype == 2 ? true : false;
      });
      if (total < 49 && isConsultation == false) {
        this.setState({
          limitMessage:
            "Order Limit for this category is SAR 49. Select any other service or schedule a consultation visit",
        });
      }
      total = 0;
      limit = 0;
      isConsultation = false;
    }
    if (plumbingJobs.length > 0) {
      plumbingJobs.forEach((plumber) => {
        total = total + plumber.t_price;
        limit = plumber.pricelimit;
        isConsultation = plumber.pricetype == 2 ? true : false;
      });
      if (total < limit && isConsultation == false) {
        this.setState({
          limitMessage:
            "Order Limit for this category is SAR " +
            limit +
            ". Select any other service or schedule a consultation visit",
        });
      }
      total = 0;
      limit = 0;
      isConsultation = false;
    }
    if (carpentarJobs.length > 0) {
      carpentarJobs.forEach((carpanter) => {
        total = total + carpanter.t_price;
        limit = carpanter.pricelimit;
        isConsultation = carpanter.pricetype == 2 ? true : false;
      });
      if (total < limit && isConsultation == false) {
        this.setState({
          limitMessage:
            "Order Limit for this category is SAR " +
            limit +
            ". Select any other service or schedule a consultation visit",
        });
      }
      total = 0;
      limit = 0;
      isConsultation = false;
    }
    if (actectronicsJobs.length > 0) {
      actectronicsJobs.forEach((electronics) => {
        total = total + electronics.t_price;
        limit = electronics.pricelimit;
        isConsultation = electronics.pricetype == 2 ? true : false;
      });
      if (total < limit && isConsultation == false) {
        this.setState({
          limitMessage:
            "Order Limit for this category is SAR " +
            limit +
            ". Select any other service or schedule a consultation visit",
        });
      }
      total = 0;
      limit = 0;
      isConsultation = false;
    }
    if (packersMoversJobs.length > 0) {
      packersMoversJobs.forEach((packer) => {
        total = total + packer.t_price;
        limit = packer.pricelimit;
        isConsultation = packer.pricetype == 2 ? true : false;
      });
      if (total < limit && isConsultation == false) {
        this.setState({
          limitMessage:
            "Order Limit for this category is SAR " +
            limit +
            ". Select any other service or schedule a consultation visit",
        });
      }
      total = 0;
      limit = 0;
      isConsultation = false;
    }
    if (sanitizationJobs.length > 0) {
      sanitizationJobs.forEach((sanitization) => {
        total = total + sanitization.t_price;
        limit = sanitization.pricelimit;
        isConsultation = sanitization.pricetype == 2 ? true : false;
      });

      if (total < limit && isConsultation == false) {
        this.setState({
          limitMessage:
            "Order Limit for this category is SAR " +
            limit +
            ". Select any other service or schedule a consultation visit",
        });
      }
      total = 0;
      limit = 0;
      isConsultation = false;
    }
    if (pestControlJobs.length > 0) {
      pestControlJobs.forEach((pest) => {
        total = total + pest.t_price;
        limit = pest.pricelimit;
        isConsultation = pest.pricetype == 2 ? true : false;
      });
      if (total < limit && isConsultation == false) {
        this.setState({
          limitMessage:
            "Order Limit for this category is SAR " +
            limit +
            ". Select any other service or schedule a consultation visit",
        });
      }
      total = 0;
      limit = 0;
      isConsultation = false;
    }
    // ----------------------
    if (gardningServices.length > 0) {
      pestControlJobs.forEach((pest) => {
        total = total + pest.t_price;
        limit = pest.pricelimit;
        isConsultation = pest.pricetype == 2 ? true : false;
      });
      if (total < limit && isConsultation == false) {
        this.setState({
          limitMessage:
            "Order Limit for this category is SAR " +
            limit +
            ". Select any other service or schedule a consultation visit",
        });
      }
      total = 0;
      limit = 0;
      isConsultation = false;
    }
  };
  logEventOrderPlaced = async () => {
    await Analytics.logEvent("PlaceOrder", {
      name: "PlaceOrder",
      screen: "orderDetailScreen",
      purpose: "placing order",
    });
    this.setState({ loading: false });
  };
  finder = (jobs) => {
    for (var i = 0; i < jobs.length; i++) {
      if (
        jobs[i].jobserviceName == "Garden Maintenance" ||
        jobs[i].jobserviceName == "Apartment" ||
        jobs[i].jobserviceName == "Villa" ||
        jobs[i].jobserviceName == "Tile" ||
        jobs[i].jobserviceName == "Commercial Building" ||
        jobs[i].jobserviceName == "Painter Visit" ||
        jobs[i].jobserviceName == "Gypsum Board" ||
        jobs[i].jobserviceName == "Wooden" ||
        jobs[i].jobserviceName == "Indoor / Outdoor"
      ) {
        this.setState({ found: true });
      }
    }
  };
  submitOrder = async () => {
    let address = this.state.address.addressdetail;
    let ads = "4994 King Fahd Rd, Al Muntazah, Al-Kharj 16439, Saudi Arabia";
    await this.finder(this.state.jobs);
    console.log("find ", this.state.found);

    // if (this.state.found && address == ads) {
    //   console.log("true");
    //   Toast.show({
    //     text: "Services is not available in Al-Kharj"
    //   });
    // } else {
    this.setState({ limitMessage: "" });
    await this.checkLimts();

    let orderDetails = ([] = []);
    let varients = ([] = []);
    let attr = ([] = []);
    let subVariants = ([] = []);
    let subattr = ([] = []);
    let subid = "";
    let vitems = "";
    let vid = "";
    let svobj = {};
    let vobj = {};
    this.state.jobs.forEach((job) => {
      let obj = {
        jobid: job.id,
        price: job.t_price,
        quantity: job.items,
        meters: job.meter ? job.meter : 0,
      };
      if (job.variants) {
        job.variants.forEach((varient) => {
          varient.variants_attr.forEach((var_atr) => {
            var_atr.attr.forEach((element_atr) => {
              if (element_atr.selected) {
                attr.push({ id: element_atr.attr_id });
                vitems = varient.items;
                vid = varient.variant_id;
              }
            });
          });
          if (varient.subvariants) {
            varient.subvariants.forEach((subvariant) => {
              subvariant.subvariants_attr &&
                subvariant.subvariants_attr.forEach((sub_var_atr) => {
                  sub_var_atr.attr.forEach((attr) => {
                    if (attr.selected) {
                      subattr.push({ id: attr.attr_id });
                      subid = subvariant.subvariantid;
                    }
                  });
                });
            });
          }
        });

        let svobj = {
          id: subid,
          attr: subattr,
        };
        let vobj = {
          id: vid,
          quantity: vitems,
          attr: attr,
          subvariants: [svobj],
        };
        varients.push(vobj);
      }

      obj.variants = varients;

      orderDetails.push(obj);
    });

    if (this.state.user !== null) {
      if (this.state.address !== null && this.state.address !== "") {
        if (this.state.orderdate !== "") {
          if (this.state.time !== "") {
            if (this.state.limitMessage == "") {
              this.setState({ loading: true });
              let index2 = this.state.timeInterval.findIndex(
                (t) => t.txt === this.state.time
              );
              let order = {
                customerid: this.state.user.customerid,
                latitude: this.state.address.latitude,
                longitude: this.state.address.longitude,
                servicedate: this.state.orderdate,
                offerid: this.state.jobs[0].offerId
                  ? this.state.jobs[0].offerId
                  : "",
                discountprice: this.state.discount,
                wfpointsconsumed: this.state.points,
                grandtotalprice: this.state.orderTotal,
                servicetimeid: this.state.timeInterval[index2].id,
                paymenttype: "1",
                orderdetails: orderDetails,
              };
              console.log("order  ", order); // Problem
              fetch(
                "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/add_order",
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(order),
                }
              )
                .then((response) => response.json())
                .then((responseJson) => {
                  console.log("add order response", responseJson);
                  if (responseJson.errorcode === 1010) {
                    this.setState({ loading: false });
                    this.state.lan === "en"
                      ? Toast.show({
                          text: "Order are only allowed from Riyadh and Al Kharj!",
                          position: "bottom",
                        })
                      : Toast.show({
                          text: "الطلب مسموح فقط من الرياض والخرج",
                          position: "bottom",
                        });
                  } else if (responseJson.errorcode === 1012) {
                    this.setState({ loading: false });
                    this.state.lan === "en"
                      ? Toast.show({
                          text: responseJson.message,
                          position: "bottom",
                        })
                      : Toast.show({
                          text: "الطلب مسموح فقط من الرياض والخرج",
                          position: "bottom",
                        });
                  } else {
                    this.setState({ loading: false });
                    this.state.lan === "en"
                      ? Toast.show({
                          text: "Order placed successfully!",
                          position: "bottom",
                        })
                      : Toast.show({
                          text: "تم ارسال الطلب بنجاح",
                          position: "bottom",
                        });
                    this.cleanOrder();
                    let order = {
                      orderid: responseJson.orderid,
                    };
                    this.props.navigation.navigate("OrderDetails", {
                      order: order,
                      isHistory: false,
                      lan: this.state.lan,
                      user: this.state.user,
                    });
                  }
                  this.logEventOrderPlaced();
                })
                .catch((error) => {
                  console.log("erroorr in placing order ", error);
                });
            } else {
              Toast.show({
                text: this.state.limitMessage,
                position: "bottom",
              });
            }
          } else {
            Toast.show({
              text:
                this.state.lan == "en"
                  ? "Please select the start time of your order!"
                  : "يرجى تحديد وقت بدء طلبك!",
              position: "bottom",
            });
          }
        } else {
          Toast.show({
            text:
              this.state.lan == "en"
                ? "Please select the start date of your order!"
                : "يرجى تحديد تاريخ بدء طلبك!",
            position: "bottom",
          });
        }
      } else {
        Toast.show({
          text:
            this.state.lan == "en"
              ? "Please select your address first!"
              : "يرجى تحديد عنوانك اولاً",
          position: "bottom",
        });
      }
    } else {
      Toast.show({
        text:
          this.state.lan == "en"
            ? "Please login with your valid mobile number!"
            : "يرجى تسجيل الدخول برقم جوالك الصحيح!",
        position: "bottom",
      });
    }
    // }
    // if (
    //   this.state.jobs.some(
    //     job =>
    //       (job.jobserviceName = "Garden Maintenance") &&
    //       this.state.address.addressdetail ==
    //         "4994 King Fahd Rd, Al Muntazah, Al-Kharj 16439, Saudi Arabia"
    //   )
    // ) {
    //   Toast.show({
    //     text: "Garden services is not available in Al-Kharj"
    //   });
    // } else {

    // }
  };

  clearOrder = async () => {
    if (this.state.jobs.length == 0) {
      await AsyncStorage.removeItem("jobs");
      await AsyncStorage.removeItem("address");
      this.setState({ loading: false, jobs: [] });
    } else {
      this.setState({ loading: false });
    }
    this.props.navigation.goBack();
    this.setState({ manually: true });
  };
  cleanOrder = async () => {
    await AsyncStorage.removeItem("jobs");
    await AsyncStorage.removeItem("address");
    this.setState({ loading: false, jobs: [] });
  };
  moveToSelectAddress = async () => {
    this.props.navigation.navigate("GoogleMapScreen", {
      lan: this.state.lan,
    });
    await Analytics.logEvent("AddressSelection", {
      name: "AddressSelection",
      screen: "orderDetailScreen",
      purpose: "selecting address",
    });
  };
  removePackage = async () => {
    await AsyncStorage.removeItem("packgaeJobs");
    await AsyncStorage.removeItem("address");
    this.setState({ loading: false, jobs: [] });
  };
  showTimeModalVisible = () => {
    this.state.selectTime
      ? this.setState({ timeModalVisible: true })
      : Toast.show({
          text: "Please select date first",
        });
  };
  closeTimeModal = () => {
    this.setState({ timeModalVisible: false });
  };
  selectThisSlot = (slot) => {
    console.log("slottttttttt-----", slot);
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
  saveTimeSlot = async () => {
    let index = this.state.timeInterval.findIndex((t) => t.isSelected === true);
    if (index > -1) {
      this.setState({
        time: this.state.timeInterval[index].txt,
        timeModalVisible: false,
      });
    }
    await Analytics.logEvent("TimeSelection", {
      name: "TimeSelection",
      screen: "orderDetailScreen",
      purpose: "selecting time",
    });
  };
  render() {
    const today = new Date();
    const tomorrow = new Date(today);
    var minDate = new Date();
    // For Eid
    // minDate = new Date().getDate() + 7;
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (new Date().getHours() + 3 > 23) {
      minDate = tomorrow;
    }
    const { navigation } = this.props;
    let lanConfirm = navigation.getParam("lan");
    return (
      <Container style={{ backgroundColor: "white" }}>
        <StatusBar
          barStyle="dark-content"
          // dark-content, light-content and default
          hidden={false}
          //To hide statusBar
          backgroundColor="#ffffff"
          //Background color of statusBar
          translucent={false}
          //allowing light, but not detailed shapes
          networkActivityIndicatorVisible={true}
        />
        <Header
          style={{
            marginTop: 0,
            borderBottomWidth: 1,
            borderBottomColor: "#0866b0",
            backgroundColor: "#ffffff",
            height: 55,
            justifyContent: "center",
          }}
        >
          <Left style={{ marginLeft: 10 }}>
            <Ionicons
              onPress={this.clearOrder}
              name={
                lanConfirm == "en"
                  ? "chevron-back-outline"
                  : "chevron-forward-outline"
              }
              size={34}
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
              {lanConfirm == "en" ? "Order Summary" : "ملخص الطلب"}
            </Title>
          </View>
          <Right />
        </Header>

        {/* CUSTOM ALERT MODAL */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.alertVisible}
        >
          <View
            style={{
              marginTop: 290, //215
              height: 240, //225
              borderRadius: 20,
              width: 330,
              backgroundColor: "#0764af",
              alignSelf: "center",
            }}
          >
            <View style={{ flex: 1, alignSelf: "center", marginTop: -24 }}>
              {/* marginTop:24 */}
              <Thumbnail
                style={{ width: 43, height: 43 }}
                source={require("../assets/Alert-Icon.png")}
              />
            </View>
            {/* 
              <View style={{ position: "absolute", right: 6, top: 10 }}>
                <Ionicons
                  onPress={this.hideModal}
                  name="ios-close-circle-outline"
                  size={35}
                  color="red"
                />
              </View> */}

            {/* <View
                style={{ alignSelf: "center", position: "absolute", top: 50 }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  {this.state.lan == "en" ? "Get Discount" : "احصل على تخفيض"}
                </Text>
              </View> */}
            <View
              style={{ position: "absolute", top: 80, alignSelf: "center" }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    // textAlign: "center",
                    margin: 20,
                    marginTop: -40,
                  }}
                >
                  {this.state.lan == "en"
                    ? "Dear Customer, \nTo continue providing you with the best experience, we will be undergoing maintenance that may cause service interruption till 18th August 2021. We apologize for the inconvenience."
                    : "Dear Customer, \nTo continue providing you with the best experience, we will be undergoing maintenance that may cause service interruption till 18th August 2021. We apologize for the inconvenience."}
                </Text>
                {/* <Image
                    source={require("../assets/Forense-Points-Icon.png")}
                    style={{ width: 20, height: 20, marginLeft: 5 }}
                    resizeMode="contain"
                  />
                  <Text style={{ color: "white", fontSize: 16 }}>
                    {this.state.userForensePoints - this.state.points > 0
                      ? this.state.userForensePoints - this.state.points
                      : this.state.userForensePoints}
                  </Text> */}
              </View>
              {/* <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    marginTop: 6,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>
                    {this.state.lan == "en" ? "Cash Equals to" : "نقداً يساوي"}
                  </Text> */}
              {/* <Image
                    source={require("../assets/Riyal.png")}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Text style={{ color: "white", fontSize: 16 }}>
                    SAR
                    {this.state.userForensePoints - this.state.points > 0
                      ? (
                          (this.state.userForensePoints - this.state.points) *
                          0.05
                        ).toFixed(2)
                      : this.state.userForensePoints * 0.05}
                  </Text> */}
              {/* </View> */}
            </View>

            <View
              style={{
                alignSelf: "center",
                position: "absolute",
                top: 140,
              }}
            >
              {/* <Item
                  regular
                  style={{ height: 30, width: 230, backgroundColor: "white" }}
                >
                  <Input
                    placeholder={
                      this.state.lan == "en"
                        ? "Enter Points"
                        : "ادخل رقم النقاط"
                    }
                    placeholderTextColor="lightgray"
                    style={{ textAlign: "center" }}
                    value={this.state.points}
                    keyboardType="decimal-pad"
                    returnKeyType="done"
                    onChangeText={(text) => {
                      this.setUserPoints(text);
                    }}
                  />
                </Item> */}

              {this.state.disocunt > 0 ? (
                <View style={{ alignSelf: "center", paddingTop: 6 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "#ff9c00", fontSize: 16 }}>
                      {this.state.lan == "en"
                        ? "Amount Redeemed:"
                        : " المبلغ بالريال:"}
                    </Text>
                    <Text style={{ color: "#ff9c00", fontSize: 16 }}>
                      SAR {this.state.disocunt.toFixed(2)}
                    </Text>
                  </View>
                </View>
              ) : (
                <View></View>
              )}
              <TouchableOpacity
                onPress={() => this.setState({ alertVisible: false })}
              >
                <View
                  small
                  rounded
                  style={{
                    marginTop: 40, //15
                    backgroundColor: "#6ea8cd",
                    alignSelf: "center",
                    width: 160,
                    height: 35,
                    borderRadius: 16,
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",

                        fontWeight: "bold",
                      }}
                    >
                      {this.state.lan == "en" ? "OK" : "تسليم"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.referralModalVisible}
        >
          <View
            style={{
              marginTop: 150,
              alignSelf: "center",
              height: 235,
              borderRadius: 20,
              width: 330,
              backgroundColor: "#283a97",
            }}
          >
            <View
              style={{
                flex: 1,
                alignSelf: "center",
                marginTop: -24,
              }}
            >
              <Thumbnail source={require("../assets/Icon2.png")} />
            </View>
            <View style={{ position: "absolute", right: 6, top: 8 }}>
              <Ionicons
                onPress={() => this.setState({ referralModalVisible: false })}
                name="ios-close-circle-outline"
                size={30}
                color="red"
              />
            </View>
            <View
              style={{
                alignSelf: "center",
                position: "absolute",
                top: 70,
              }}
            >
              {this.state.lan === "en" ? (
                <Text
                  style={{
                    color: "white",
                    fontSize: 12,
                    alignSelf: "center",
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
                    alignSelf: "center",
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
                  alignSelf: "center",
                }}
                keyboardType="default"
                maxLength={4}
                returnKeyType="done"
                onChangeText={(ref) => {
                  if (typeof ref === "string") {
                    for (var i = 0; i < 10; i++) {
                      ref = ref.replace(arabicNumbers[i], i);
                    }
                  }
                  this.setState({ referralCode: ref });
                }}
                placeholderTextColor="#cdd0d4"
                placeholder={this.state.lan === "en" ? "XXXX" : "XXXX"}
              />
              <Button
                onPress={this.verifyReferral}
                style={{
                  borderRadius: 15,
                  height: 32,
                  backgroundColor: "#6ea8cd",
                  top: 15,
                  alignSelf: "center",
                }}
              >
                <View>
                  {this.state.lan === "en" ? (
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Login
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "montserrat_arabic_regular",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      تسليم
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
                    textAlign: "center",
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
                    textAlign: "center",
                  }}
                >
                  {/* للإستمرار بدون رمز الدعوة، اغلق الشاشه المنبثقة */}
                </Text>
              )}
            </View>
          </View>
        </Modal>
        {/* --------------------model------------------ */}
        <ScrollView style={{ backgroundColor: "white" }}>
          {
            <NavigationEvents
              onWillFocus={() => {
                this.componentDidMount();
              }}
            />
          }
          <Spinner visible={this.state.loading} textContent={""} />
          {this.state.isloaded == false ? (
            this.state.jobs.length > 0 ? (
              <View
                style={{
                  marginLeft: 20,
                  backgroundColor: "#f1f1f1",
                  marginRight: 20,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "montserrat_semi_blod",
                      fontWeight: "bold",
                      padding: 10,
                      color: "#0866b0",
                      textAlign: "left",
                    }}
                  >
                    {this.state.lan == "en" ? "ORDER DETAILS" : "تفاصيل الطلب"}
                  </Text>
                  {this.state.isPackage == true ? (
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginLeft: 30,
                          marginRight: 20,
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={{
                              width: 30,
                              height: 30,
                              borderRadius: 15,
                              borderWidth: 1,
                              borderColor: "#0764af",
                            }}
                          >
                            <Image
                              source={{
                                uri: this.state.package.jobServiceIcon,
                              }}
                              style={{
                                width: 20,
                                height: 20,
                                alignSelf: "center",
                                marginTop: 5,
                              }}
                              resizeMode="contain"
                            />
                          </View>
                          <Text
                            style={{
                              fontFamily: "montserrat_semi_blod",
                              paddingTop: 4,
                              paddingLeft: 6,
                              fontSize: 12,
                            }}
                          >
                            {this.state.lan == "en"
                              ? this.state.package.jobserviceName
                              : this.state.package.jobserviceNameAr}
                          </Text>
                        </View>
                        <TouchableOpacity onPress={this.removePackage}>
                          <View>
                            <Ionicons
                              name={"ios-close-circle-outline"}
                              size={20}
                              color={"red"}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>

                      {/* ---------------Model---------------- */}

                      <View>
                        {this.state.jobs &&
                          this.state.jobs.map(
                            function (job, index) {
                              return (
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginLeft: 30,
                                    marginRight: 20,
                                  }}
                                  key={index}
                                >
                                  <View
                                    style={{
                                      width:
                                        Dimensions.get("screen").width - 184,
                                    }}
                                  >
                                    <Text
                                      numberOfLines={2}
                                      style={{
                                        color: "#4a4b4c",
                                        fontSize: 10,
                                        textAlign: "left",
                                      }}
                                    >
                                      ({job.items}x)
                                      {this.state.lan == "en"
                                        ? job.name
                                        : job.name_ar}
                                    </Text>
                                  </View>
                                  <View>
                                    <Text
                                      style={{
                                        color: "#4a4b4c",
                                        fontSize: 12,
                                      }}
                                    >
                                      SAR
                                      {job.offerId && job.offerId == 1
                                        ? (index == 1 && job.id == 67) ||
                                          job.id == 73 ||
                                          job.id == 62 ||
                                          job.id == 80 ||
                                          job.id == 78 ||
                                          job.id == 76
                                          ? 0
                                          : job.t_price
                                        : job.t_price}
                                    </Text>
                                  </View>
                                </View>
                              );
                            }.bind(this)
                          )}
                      </View>
                    </View>
                  ) : (
                    <View>
                      {this.state.jobs &&
                        this.state.jobs.map(
                          function (job, index) {
                            return (
                              <View>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginLeft: 30,
                                    marginRight: 20,
                                  }}
                                  key={index}
                                >
                                  {this.state.isPackage == false ? (
                                    <View style={{ flexDirection: "row" }}>
                                      <View
                                        style={{
                                          width: 30,
                                          height: 30,
                                          borderRadius: 15,
                                          borderWidth: 1,
                                          borderColor: "#0764af",
                                        }}
                                      >
                                        <Image
                                          source={{ uri: job.jobServiceIcon }}
                                          style={{
                                            width: 20,
                                            height: 20,
                                            alignSelf: "center",
                                            marginTop: 5,
                                          }}
                                          resizeMode="contain"
                                        />
                                      </View>
                                      <Text
                                        style={{
                                          fontFamily: "montserrat_semi_blod",
                                          paddingTop: 4,
                                          paddingLeft: 6,
                                          fontSize: 12,
                                        }}
                                      >
                                        {this.state.lan == "en"
                                          ? job.jobserviceName
                                          : job.jobserviceNameAr}
                                      </Text>
                                    </View>
                                  ) : (
                                    <View></View>
                                  )}
                                  <TouchableOpacity
                                    onPress={() => this.removeSelectedJob(job)}
                                  >
                                    <View>
                                      <Ionicons
                                        name={"ios-close-circle-outline"}
                                        size={20}
                                        color={"red"}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginLeft: 30,
                                    marginRight: 20,
                                  }}
                                >
                                  <View
                                    style={{
                                      width:
                                        Dimensions.get("screen").width - 184,
                                    }}
                                  >
                                    <Text
                                      style={{
                                        color: "#4a4b4c",
                                        fontSize: 10,
                                        textAlign: "left",
                                      }}
                                    >
                                      ({job.items}x)
                                      {this.state.lan == "en"
                                        ? job.name
                                        : job.name_ar}
                                    </Text>
                                  </View>
                                  <View>
                                    <Text
                                      style={{
                                        color: "#4a4b4c",
                                        fontSize: 12,
                                      }}
                                    >
                                      SAR {job.t_price}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            );
                          }.bind(this)
                        )}
                    </View>
                  )}

                  {/* <View
                    style={{ alignSelf: "center", marginTop: 14, margin: 8 }}
                  >
                    <View>
                      {this.state.cartNotesAdds.map(i => {
                        console.log("cart job", i);
                        return (
                          <View>
                            {i.cartnotes ? (
                              <Text style={{ textAlign: "left" }}>
                                {this.state.lan == "en" ? "Notes:" : "ملاحظات"}
                              </Text>
                            ) : null}
                            <Text
                              style={{
                                fontSize: 11,
                                marginRight: 1,
                                color: "gray",
                                textAlign: "left",
                                fontFamily: "montserrat_semi_blod",
                                marginVertical: 5
                              }}
                            >
                              {this.state.lan == "en"
                                ? i.cartnotes
                                : i.cartnotes_ar}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View> */}
                  <View
                    style={{ alignSelf: "center", marginTop: 14, margin: 8 }}
                  >
                    <Text style={{ textAlign: "left" }}>
                      {this.state.lan == "en" ? "Notes:" : "ملاحظات"}
                    </Text>

                    <Text
                      style={{
                        fontSize: 11,
                        marginRight: 1,
                        color: "gray",
                        textAlign: "left",
                        fontFamily: "montserrat_semi_blod",
                        marginVertical: 5,
                      }}
                    >
                      {this.state.lan == "en"
                        ? this.state.cartNotesAdds
                        : this.state.cartNotesAdds_ar}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginLeft: 10,
                      marginRight: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#0866b0",
                        fontFamily: "montserrat_semi_blod",
                        paddingTop: 8,
                        textAlign: "left",
                      }}
                    >
                      {this.state.lan == "en" ? "PAYMENT MODE" : "طريقة الدفع"}
                    </Text>
                    <LinearGradient
                      colors={["#0764af", "#6ea8cd"]}
                      start={[0.9, 0.2]}
                      end={[0.1, 0.1]}
                      style={{ borderRadius: 4, marginTop: 10, height: 20 }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          margin: 0,
                          borderRadius: 4,
                        }}
                      >
                        <View style={{ alignSelf: "center", paddingLeft: 2 }}>
                          <Text
                            style={{
                              color: "white",
                              justifyContent: "center",
                              fontSize: 12,
                              paddingTop: 0,
                            }}
                          >
                            {this.state.lan == "en" ? "CASH" : "نقد"}
                          </Text>
                        </View>
                        <View
                          style={{
                            marginLeft: 5,
                            marginTop: 2,
                            paddingRight: 2,
                          }}
                        >
                          <Ionicons
                            name={"ios-checkmark-circle"}
                            size={16}
                            color={"white"}
                          />
                        </View>
                      </View>
                    </LinearGradient>
                  </View>
                  {/* <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginLeft: 10,
                      marginRight: 10,
                      marginTop: 8,
                      height: 30
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "#0866b0",
                        fontFamily: "montserrat_semi_blod",
                        textAlign: "left"
                      }}
                    >
                      {this.state.lan == "en" ? "PROMO CODE" : "طريقة الدفع"}
                    </Text>
                    <TextInput
                      style={{
                        alignSelf: "center",
                        borderColor: "lightgray",
                        borderWidth: 1,
                        backgroundColor: "white",
                        borderRadius: 4,
                        marginLeft: 20,
                        width: Dimensions.get("screen").width / 4,
                        height: "100%",
                        paddingHorizontal: "1%",
                        paddingVertical: "1%"
                      }}
                      keyboardType="number-pad"
                      value={this.state.promoCode}
                      onChangeText={value => {
                        if (!this.state.promoSuccess) {
                          this.setState({ promoCode: value }, () =>
                            this.verifyPromoCode()
                          );
                        }
                      }}
                    />
                  </View> */}
                </View>
                <View
                  style={{
                    width: Dimensions.get("screen").width - 40,
                    height: 1,
                    marginTop: 10,
                    backgroundColor: "lightgray",
                  }}
                ></View>
                {this.state.user == null ? (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginLeft: 10,
                        marginRight: 10,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontFamily: "montserrat_semi_blod",
                            fontWeight: "bold",
                            marginTop: 10,
                            color: "#0866b0",
                          }}
                        >
                          {this.state.lan == "en" ? "MOBILE#" : "الجوال#"}
                        </Text>
                      </View>
                      <View style={{ marginTop: 9 }}>
                        <Input
                          placeholder="05XXXXXXXX"
                          placeholderTextColor="lightgray"
                          maxLength={10}
                          keyboardType="number-pad"
                          returnKeyType="done"
                          style={{
                            textAlign: "right",
                            borderWidth: 1,
                            borderColor: "lightgray",
                            width: 160,
                            height: 25,
                          }}
                          onChangeText={(phone) => {
                            this.setInputField("phone", phone);
                          }}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        width: Dimensions.get("screen").width - 40,
                        height: 1,
                        marginTop: 10,
                        backgroundColor: "lightgray",
                      }}
                    ></View>
                  </View>
                ) : (
                  <View></View>
                )}

                <View>
                  <Text
                    style={{
                      fontFamily: "montserrat_semi_blod",
                      fontWeight: "bold",
                      padding: 10,
                      color: "#0866b0",
                    }}
                  >
                    {this.state.lan == "en" ? "ADDRESS" : ""}
                  </Text>
                  <View
                    style={{
                      alignSelf: "center",
                      borderColor: "lightgray",
                      borderWidth: 1,
                      backgroundColor: "white",
                      borderRadius: 6,
                      marginLeft: 20,
                      marginRight: 20,
                      width: Dimensions.get("screen").width - 90,
                    }}
                  >
                    <Text style={{ color: "lightgray", margin: 8 }}>
                      {this.state.address && this.state.address.addressdetail}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={this.moveToSelectAddress}>
                    <View
                      style={{
                        backgroundColor: "#0764af",
                        borderRadius: 12,
                        marginTop: 12,
                        marginRight: 40,
                        marginLeft: 40,
                      }}
                    >
                      <LinearGradient
                        colors={["#0764af", "#6ea8cd"]}
                        start={[0.9, 0.2]}
                        end={[0.1, 0.1]}
                        style={{ borderRadius: 12 }}
                      >
                        <Text
                          style={{
                            fontFamily: "montserrat_semi_blod",
                            color: "white",
                            margin: 12,
                            alignSelf: "center",
                          }}
                        >
                          {this.state.lan == "en"
                            ? "Select Address"
                            : "حدد العنوان"}
                        </Text>
                      </LinearGradient>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: Dimensions.get("screen").width - 40,
                    height: 1,
                    marginTop: 10,
                    backgroundColor: "lightgray",
                  }}
                ></View>
                <View>
                  <Text
                    style={{
                      fontFamily: "montserrat_semi_blod",
                      margin: 10,
                      fontWeight: "bold",
                      color: "#0866b0",
                      textAlign: "left",
                    }}
                  >
                    {this.state.lan == "en" ? "DATE & TIME" : "التاريخ و الوقت"}
                  </Text>
                  <View>
                    <View>
                      <CalendarPicker
                        selectedDayColor="#7ECAEC"
                        nextTitle={this.state.lan == "en" ? "Next" : "التالي"}
                        previousTitle={
                          this.state.lan == "en" ? "Prev" : "السابق"
                        }
                        nextTitleStyle={{ marginRight: 15, color: "#4a4b4c" }}
                        previousTitleStyle={{
                          marginLeft: 12,
                          color: "#4a4b4c",
                        }}
                        minDate={minDate}
                        initialDate={minDate}
                        // For Eid
                        //initialDate={new Date()}
                        selectedStartDate={this.state.currentTime}
                        selectedDayStyle={{ backgroundColor: "#0764af" }}
                        selectedDayTextColor="white"
                        // todayBackgroundColor="#6ea8cd"
                        width={275}
                        height={230}
                        onDateChange={this.onDateChange}
                        disabledDates={[
                          new Date(2021, 6, 20),

                          new Date(2021, 7, 10),
                          new Date(2021, 7, 11),
                          new Date(2021, 7, 12),
                          new Date(2021, 7, 13),
                          new Date(2021, 7, 14),
                          new Date(2021, 7, 15),
                          new Date(2021, 7, 16),
                          new Date(2021, 7, 17),
                          new Date(2021, 7, 18),
                        ]}
                        // disabledDatesTextStyle={{ color: "red" }}
                      />
                    </View>
                    <View>
                      <TouchableOpacity
                        disabled={this.state.disableOrder}
                        onPress={this.showTimeModalVisible}
                      >
                        <View
                          style={{
                            backgroundColor: "#0764af",
                            borderRadius: 12,
                            marginTop: 12,
                            marginRight: 40,
                            marginLeft: 40,
                          }}
                        >
                          <LinearGradient
                            colors={["#0764af", "#6ea8cd"]}
                            start={[0.9, 0.2]}
                            end={[0.1, 0.1]}
                            style={{ borderRadius: 12 }}
                          >
                            <Text
                              style={{
                                fontFamily: "montserrat_semi_blod",
                                color: "white",
                                margin: 12,
                                alignSelf: "center",
                              }}
                            >
                              {this.state.time == "" ? (
                                <Text style={{ color: "white" }}>
                                  {this.state.lan == "en"
                                    ? "Select Time"
                                    : "حدد الوقت"}
                                </Text>
                              ) : (
                                <Text style={{ color: "white" }}>
                                  {this.state.time}
                                </Text>
                              )}
                            </Text>
                          </LinearGradient>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      width: Dimensions.get("screen").width - 40,
                      height: 1,
                      marginTop: 10,
                      backgroundColor: "lightgray",
                    }}
                  ></View>
                  <View
                    style={{
                      margin: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row", marginLeft: 4 }}>
                      <Text
                        style={{
                          fontFamily: "montserrat_semi_blod",
                          fontWeight: "bold",
                          color: "#0866b0",
                          marginRight: 4,
                          marginTop: 5,
                        }}
                      >
                        {this.state.lan == "en"
                          ? "GET DISCOUNT"
                          : "احصل على تخفيض"}
                      </Text>

                      <Image
                        source={require("../assets/Forense-Points-Icon.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                      />
                    </View>
                    <TouchableOpacity onPress={this.setModalVisible}>
                      <Text
                        style={{
                          fontFamily: "montserrat_semi_blod",
                          color: "#4a4b4c",
                          fontSize: 14,
                          marginTop: 7,
                        }}
                      >
                        {this.state.lan == "en"
                          ? "Convert Points"
                          : "حول النقاط"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: Dimensions.get("screen").width - 40,
                      height: 1,
                      marginTop: 5,
                      backgroundColor: "lightgray",
                    }}
                  ></View>
                  <View style={{ margin: 10 }}>
                    <View>
                      <Text
                        style={{
                          fontFamily: "montserrat_semi_blod",
                          fontWeight: "bold",
                          color: "#0866b0",
                        }}
                      >
                        {this.state.lan == "en" ? "PAYMENT DETAILS" : ""}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 6,
                      }}
                    >
                      <View>
                        <Text style={{ color: "#4a4b4c" }}>
                          {this.state.lan == "en"
                            ? "Order Total"
                            : "تكلفة الطلب الكلية"}
                        </Text>
                      </View>
                      <View>
                        <Text style={{ color: "#4a4b4c" }}>
                          SAR {this.state.orderTotal}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 4,
                      }}
                    >
                      <View>
                        <Text style={{ color: "#4a4b4c" }}>
                          {this.state.lan == "en" ? "Discounts" : "التخفيضات"}
                        </Text>
                      </View>
                      <View>
                        <Text style={{ color: "#4a4b4c" }}>
                          SAR {this.state.discount}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 4,
                      }}
                    >
                      <View>
                        <Text>
                          {this.state.lan == "en" ? "Total" : "المجموع"}
                        </Text>
                      </View>
                      <View>
                        <Text style={{ color: "#0764af" }}>
                          SAR
                          {parseInt(this.state.orderTotal) -
                            parseInt(this.state.discount)}
                        </Text>
                      </View>
                    </View>
                    <View style={{ marginTop: 6 }}>
                      <Text style={{ textAlign: "right", fontSize: 13 }}>
                        {this.state.lan == "en"
                          ? "All Prices are 15% VAT inclusive"
                          : "جميع الأسعار شاملة ضريبة القيمة المضافة بنسبة %15"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,

                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                  marginTop: Dimensions.get("screen").height / 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#4a4b4c",
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  {lanConfirm == "en" ? "Your Cart" : "سلة الطلب خاصتي"}
                </Text>
                <Text style={{ color: "#4a4b4c", textAlign: "center" }}>
                  {lanConfirm == "en"
                    ? "You have not selected any service."
                    : "لم تقم بإختيار اي خدمة"}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={this.clearOrder}>
                    <View
                      style={{
                        backgroundColor: "#0764af",
                        borderRadius: 12,
                        width: Dimensions.get("screen").width - 120,
                        alignSelf: "center",
                      }}
                    >
                      <LinearGradient
                        colors={["#0764af", "#6ea8cd"]}
                        start={[0.9, 0.2]}
                        end={[0.1, 0.1]}
                        style={{ borderRadius: 12 }}
                      >
                        <Text
                          style={{
                            color: "white",
                            margin: 12,
                            alignSelf: "center",
                          }}
                        >
                          {lanConfirm == "en"
                            ? "Click here to select the service"
                            : "اضغط هنا لإختيار الخدمة"}
                        </Text>
                      </LinearGradient>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )
          ) : (
            <View></View>
          )}
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View
              style={{
                marginTop: 215,
                height: 255,
                borderRadius: 20,
                width: 330,
                backgroundColor: "#0764af",
                alignSelf: "center",
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
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  {this.state.lan == "en" ? "Get Discount" : "احصل على تخفيض"}
                </Text>
              </View>
              <View
                style={{ position: "absolute", top: 80, alignSelf: "center" }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    {this.state.lan == "en"
                      ? "Remaining Points"
                      : "النقاط المتبقية"}
                  </Text>
                  <Image
                    source={require("../assets/Forense-Points-Icon.png")}
                    style={{ width: 20, height: 20, marginLeft: 5 }}
                    resizeMode="contain"
                  />
                  <Text style={{ color: "white", fontSize: 16 }}>
                    {this.state.userForensePoints - this.state.points > 0
                      ? this.state.userForensePoints - this.state.points
                      : this.state.userForensePoints}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    marginTop: 6,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>
                    {this.state.lan == "en" ? "Cash Equals to" : "نقداً يساوي"}
                  </Text>
                  <Image
                    source={require("../assets/Riyal.png")}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Text style={{ color: "white", fontSize: 16 }}>
                    SAR
                    {this.state.userForensePoints - this.state.points > 0
                      ? (
                          (this.state.userForensePoints - this.state.points) *
                          0.05
                        ).toFixed(2)
                      : this.state.userForensePoints * 0.05}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  top: 140,
                }}
              >
                <Item
                  regular
                  style={{ height: 30, width: 230, backgroundColor: "white" }}
                >
                  <Input
                    placeholder={
                      this.state.lan == "en"
                        ? "Enter Points"
                        : "ادخل رقم النقاط"
                    }
                    placeholderTextColor="lightgray"
                    style={{ textAlign: "center" }}
                    value={this.state.points}
                    keyboardType="decimal-pad"
                    returnKeyType="done"
                    onChangeText={(text) => {
                      this.setUserPoints(text);
                    }}
                  />
                </Item>

                {this.state.disocunt > 0 ? (
                  <View style={{ alignSelf: "center", paddingTop: 6 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#ff9c00", fontSize: 16 }}>
                        {this.state.lan == "en"
                          ? "Amount Redeemed:"
                          : " المبلغ بالريال:"}
                      </Text>
                      <Text style={{ color: "#ff9c00", fontSize: 16 }}>
                        SAR {this.state.disocunt.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View></View>
                )}
                <TouchableOpacity onPress={this.verifyDiscount}>
                  <View
                    small
                    rounded
                    style={{
                      marginTop: 15,
                      backgroundColor: "#6ea8cd",
                      alignSelf: "center",
                      width: 160,
                      height: 35,
                      borderRadius: 16,
                    }}
                  >
                    <View
                      style={{
                        alignSelf: "center",
                        flex: 1,
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",

                          fontWeight: "bold",
                        }}
                      >
                        {this.state.lan == "en" ? "Submit" : "تسليم"}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
                  {this.state.timeInterval.map(
                    function (slot, index) {
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
                                  color: slot.isSelected ? "#283a97" : "black",
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
                    }.bind(this)
                  )}
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
                    <View style={{ width: 120 }}>
                      {this.state.lan === "en" ? (
                        <Text
                          style={{
                            marginTop: 6,
                            marginRight: 55,
                            textAlign: "center",
                            color: "#4a4b4c",
                            fontWeight: "bold",
                            fontSize: 16,
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
                            fontWeight: "bold",
                            fontSize: 16,
                          }}
                        >
                          إلغاء
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.saveTimeSlot}>
                    <View style={{ width: 50 }}>
                      {this.state.lan === "en" ? (
                        <Text
                          style={{
                            marginTop: 6,
                            textAlign: "center",
                            color: "#4a4b4c",
                            fontWeight: "bold",
                            fontSize: 16,
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
                            fontSize: 16,
                          }}
                        >
                          اوك
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* CUSTOM ALERT MODAL END */}
        </ScrollView>

        {this.state.jobs.length > 0 ? (
          <Footer
            style={{ backgroundColor: "white", borderWidth: 0, height: 90 }}
          >
            <TouchableOpacity
              disabled={this.state.disableOrder}
              onPress={this.submitOrder}
            >
              <View
                style={{
                  backgroundColor: "#0764af",
                  borderRadius: 10,
                  width: Dimensions.get("screen").width - 120,
                  alignSelf: "center",
                }}
              >
                <LinearGradient
                  colors={["#0764af", "#6ea8cd"]}
                  start={[0.9, 0.2]}
                  end={[0.1, 0.1]}
                  style={{ borderRadius: 12 }}
                >
                  <Text
                    style={{
                      color: "white",
                      margin: 12,
                      alignSelf: "center",
                    }}
                  >
                    {this.state.lan == "en" ? "Place Order" : "قدم الطلب"}
                  </Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </Footer>
        ) : (
          <View></View>
        )}
      </Container>
    );
  }
}
