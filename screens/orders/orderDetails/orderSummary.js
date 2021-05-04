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
  Toast
} from "native-base";
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Platform,
  TouchableOpacity,
  View
} from "react-native";

import CalendarPicker from "react-native-calendar-picker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default class OrderSummarySecreen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        {/* ,,,,,,,,,,,,,,, */}

        {/* ------------------ */}
        <View
          style={{
            width: Dimensions.get("screen").width - 30,
            height: 1,
            marginTop: 25,
            backgroundColor: "lightgray"
          }}
        ></View>
        <View
          style={{
            marginTop: 6,
            marginLeft: 10,
            marginRight: 10,
            alignSelf: "flex-start"
          }}
        >
          <View>
            <Text style={{ color: "#0865b0", textAlign: "left" }}>
              {this.props.lan == "en" ? "Address:" : "العنوان"}
            </Text>
            <Text style={{ color: "#4a4b4c" }}>
              {this.props.orderDetail && this.props.orderDetail.addressdetail
                ? this.props.orderDetail.addressdetail
                : ""}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: Dimensions.get("screen").width - 30,
            height: 1,
            marginTop: 6,
            backgroundColor: "lightgray"
          }}
        ></View>
        <View
          style={{
            marginTop: 6,
            marginLeft: 10,
            marginRight: 10,
            alignSelf: "flex-start"
          }}
        >
          <View>
            <Text style={{ color: "#0865b0", textAlign: "left" }}>
              {this.props.lan == "en" ? "Date & Time:" : "التاريخ و الوقت"}
            </Text>
            <Text style={{ color: "#4a4b4c" }}>
              {this.props.orderDetail.services &&
                this.props.orderDetail.appointmentdate}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: Dimensions.get("screen").width - 30,
            height: 1,
            marginTop: 25,
            backgroundColor: "lightgray"
          }}
        ></View>
        <View
          style={{
            marginTop: 6,
            marginLeft: 10,
            marginRight: 10,
            alignSelf: "flex-start"
          }}
        >
          <View>
            <Text style={{ color: "#0865b0", textAlign: "left" }}>
              {this.props.lan == "en" ? "Services name" : "اسم الخدمات"}
            </Text>
            {/* <Text style={{ color: "#4a4b4c", textAlign: "left" }}>
              {this.props.orderDetail.ispackage
                ? this.props.lan == "en"
                  ? this.props.orderDetail.packagename
                  : this.props.orderDetail.packagename_ar
                : thsi.props.lan == "en"
                ? this.props.orderDetail.services[0].servicename
                : this.props.orderDetail.services[0].servicename_ar}
            </Text> */}

            {this.props.orderDetail.services.map(i => {
              return (
                <View
                  style={{
                    width: 350,
                    paddingVertical: 0,
                    flexDirection: "row"
                  }}
                >
                  <View
                    style={{
                      width: 240,
                      paddingVertical: 2
                    }}
                  >
                    <Text
                      style={{
                        alignSelf: "flex-start",
                        color: "#4a4b4c",
                        fontSize: 12
                      }}
                    >
                      ({i.quantity}X){" "}
                      {this.props.lan == "en" ? i.jobname : i.jobname_ar}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: 70,
                      paddingVertical: 2
                    }}
                  >
                    <Text style={{ color: "#4a4b4c", fontSize: 12 }}>
                      SAR {i.price}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            width: Dimensions.get("screen").width - 30,
            height: 1,
            marginTop: 6,
            backgroundColor: "lightgray"
          }}
        ></View>
        <View
          style={{
            marginTop: 6,
            marginLeft: 10,
            marginRight: 10,
            alignSelf: "flex-start"
          }}
        >
          <View>
            <Text style={{ color: "#0865b0", textAlign: "left" }}>
              {this.props.lan == "en" ? "Payment Type:" : "طريقة الدفع"}
            </Text>
            <Text style={{ color: "#4a4b4c", textAlign: "left" }}>
              {this.props.lan == "en" ? "Cash" : "نقد"}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: Dimensions.get("screen").width - 30,
            height: 1,
            marginTop: 6,
            backgroundColor: "lightgray"
          }}
        ></View>
        <View
          style={{
            marginTop: 6,
            marginLeft: 10,
            marginRight: 10,
            alignSelf: "flex-start"
          }}
        >
          <View>
            <Text style={{ color: "#0865b0", textAlign: "left" }}>
              {this.props.lan == "en" ? "Total Price:" : "السعر الكلي"}
            </Text>
            <Text style={{ color: "#4a4b4c", textAlign: "left" }}>
              {this.props.orderDetail && this.props.orderDetail.grandtotal}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
