import React from "react";
import {
  View,
  Image,
  Platform,
  Dimensions,
  Modal,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Accordion,
  Toast,
  Title,
  Header,
  Content,
  Thumbnail,
  Button,
  Body,
  Input,
  Icon,
  Text,
  Item,
  Left,
  Right,
  Footer
} from "native-base";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import { LinearGradient } from "expo-linear-gradient";
import Dash from "react-native-dash";

export default class OrderStatusSecreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderDetail: {
        status: 1
      }
    };
  }
  render() {
    return (
      <View
        style={{ width: 40, marginTop: 40, marginLeft: 15, marginBottom: 20 }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor:
                this.props.orderDetail.statusid >= 1 &&
                this.props.orderDetail.statusid !== 6
                  ? "#283a97"
                  : "#283a97",
              borderColor: "#283a97",
              borderWidth: 1
            }}
          >
            {this.props.orderDetail &&
            this.props.orderDetail.statusid >= 1 &&
            this.props.orderDetail.statusid !== 6 ? (
              <Image
                source={require("../../../assets/order-status-icons/thumbnail_Tick-Pressed.png")}
                style={{
                  width: 30,
                  height: 30,
                  alignSelf: "center",
                  marginTop: 4
                }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../../../assets/order-status-icons/thumbnail_Tick-Pressed.png")}
                style={{
                  width: 30,
                  height: 30,
                  alignSelf: "center",
                  marginTop: 4
                }}
                resizeMode="contain"
              />
            )}
          </View>
          <View
            style={{ marginLeft: 10, width: Dimensions.get("screen").width }}
          >
            {this.props.lan === "en" ? (
              <Text
                style={{ color: "#283a97", fontSize: 13, fontWeight: "bold" }}
              >
                Order Submitted
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: "left",
                  color: "#283a97",
                  fontSize: 13
                }}
              >
                تم تسليم الطلب
              </Text>
            )}
            {this.props.lan === "en" ? (
              <Text style={{ fontSize: 11, color: "#4a4b4c" }}>
                Your request is being processed.
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 11,
                  color: "#4a4b4c"
                }}
              >
                جاري تنفيذ طلبك
              </Text>
            )}
          </View>
        </View>
        <Dash
          dashGap={
            this.props.orderDetail &&
            this.props.orderDetail.statusid >= 1 &&
            this.props.orderDetail.statusid !== 6
              ? 0
              : 1
          }
          dashColor="#283a97"
          style={{
            width: 1,
            height: 40,
            flexDirection: "column",
            alignSelf: "center"
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor:
                this.props.orderDetail.statusid >= 2 &&
                this.props.orderDetail.statusid !== 6
                  ? "#283a97"
                  : "white",
              borderColor: "#283a97",
              borderWidth: 1
            }}
          >
            {this.props.orderDetail &&
            this.props.orderDetail.statusid >= 2 &&
            this.props.orderDetail.statusid !== 6 ? (
              <Image
                source={require("../../../assets/order-status-icons/thumbnail_Tick-Pressed.png")}
                style={{
                  width: 30,
                  height: 30,
                  alignSelf: "center",
                  marginTop: 4
                }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../../../assets/order-status-icons/Professional-Assigned.png")}
                style={{
                  width: 26,
                  height: 30,
                  alignSelf: "center",
                  marginTop: 4
                }}
                resizeMode="contain"
              />
            )}
          </View>
          <View
            style={{ marginLeft: 10, width: Dimensions.get("screen").width }}
          >
            {this.props.lan === "en" ? (
              <Text
                style={{ color: "#283a97", fontSize: 13, fontWeight: "bold" }}
              >
                Professional Assigned
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: "left",
                  color: "#283a97",
                  fontSize: 13
                }}
              >
                تم تعيين المهني
              </Text>
            )}
            {this.props.lan === "en" ? (
              <Text style={{ fontSize: 11, color: "#4a4b4c" }}>
                We found an expert for this job.
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 11,
                  color: "#4a4b4c"
                }}
              >
                لقد حصلنا على خبير لهذا العمل
              </Text>
            )}
          </View>
        </View>
        <Dash
          dashGap={
            this.props.orderDetail &&
            this.props.orderDetail.statusid >= 2 &&
            this.props.orderDetail.statusid !== 6
              ? 0
              : 1
          }
          dashColor="#283a97"
          style={{
            width: 1,
            height: 40,
            flexDirection: "column",
            alignSelf: "center"
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor:
                this.props.orderDetail.statusid >= 4 &&
                this.props.orderDetail.statusid !== 6
                  ? "#283a97"
                  : "white",
              borderColor: "#283a97",
              borderWidth: 1
            }}
          >
            {this.props.orderDetail &&
            this.props.orderDetail.statusid >= 4 &&
            this.props.orderDetail.statusid !== 6 ? (
              <Image
                source={require("../../../assets/order-status-icons/thumbnail_Tick-Pressed.png")}
                style={{
                  width: 30,
                  height: 30,
                  alignSelf: "center",
                  marginTop: 4
                }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../../../assets/order-status-icons/Job-Started.png")}
                style={{
                  width: 30,
                  height: 30,
                  alignSelf: "center",
                  marginTop: 4
                }}
                resizeMode="contain"
              />
            )}
          </View>
          <View
            style={{ marginLeft: 10, width: Dimensions.get("screen").width }}
          >
            {this.props.lan === "en" ? (
              <Text
                style={{ color: "#283a97", fontSize: 13, fontWeight: "bold" }}
              >
                Job Started
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: "left",
                  color: "#283a97",
                  fontSize: 13
                }}
              >
                المهمة بدأت
              </Text>
            )}
            {this.props.lan === "en" ? (
              <Text style={{ fontSize: 11, color: "#4a4b4c" }}>
                Thanks for agreeing on the price.
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 11,
                  color: "#4a4b4c"
                }}
              >
                شكراً للموافقة لى السعر
              </Text>
            )}
          </View>
        </View>
        <Dash
          dashGap={
            this.props.orderDetail &&
            this.props.orderDetail.statusid >= 4 &&
            this.props.orderDetail.statusid !== 6
              ? 0
              : 1
          }
          dashColor="#283a97"
          style={{
            width: 1,
            height: 40,
            flexDirection: "column",
            alignSelf: "center"
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor:
                this.props.orderDetail.statusid >= 5 &&
                this.props.orderDetail.statusid !== 6
                  ? "#283a97"
                  : "white",
              borderColor: "#283a97",
              borderWidth: 1
            }}
          >
            {this.props.orderDetail &&
            this.props.orderDetail.statusid >= 5 &&
            this.props.orderDetail.statusid !== 6 ? (
              <Image
                source={require("../../../assets/order-status-icons/thumbnail_Tick-Pressed.png")}
                style={{
                  width: 30,
                  height: 30,
                  alignSelf: "center",
                  marginTop: 4
                }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("../../../assets/order-status-icons/Job-Finished.png")}
                style={{
                  width: 30,
                  height: 30,
                  alignSelf: "center",
                  marginTop: 4
                }}
                resizeMode="contain"
              />
            )}
          </View>
          <View
            style={{ marginLeft: 10, width: Dimensions.get("screen").width }}
          >
            {this.props.lan === "en" ? (
              <Text
                style={{ color: "#283a97", fontSize: 13, fontWeight: "bold" }}
              >
                Job Finished
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: "left",
                  color: "#283a97",
                  fontSize: 13
                }}
              >
                تم الإنتهاء من العمل
              </Text>
            )}
            {this.props.lan === "en" ? (
              <Text style={{ fontSize: 11, color: "#4a4b4c" }}>
                Thank you for using Wafarnalak.
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 11,
                  color: "#4a4b4c"
                }}
              >
                شكراً لإستخدامكم وفرنا لك
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  }
}
