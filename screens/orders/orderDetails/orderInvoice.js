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

export default class OrderInvoiceSecreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: "en"
    };
  }
  render() {
    return (
      <View style={{ height: Dimensions.get("screen").height / 2.5 }}>
        <View
          style={{
            width: Dimensions.get("screen").width - 30,
            height: 1,
            marginTop: 25,
            backgroundColor: "lightgray"
          }}
        ></View>

        <View>
          <View
            style={{
              marginTop: 6,
              marginLeft: 10,
              marginRight: 10
            }}
          >
            <View>
              <View>
                <Text style={{ color: "#0865b0", textAlign: "left" }}>
                  {this.props.lan == "en" ? "Service Charges:" : "رسوم الخدمة"}
                </Text>
                {this.props.orderDetail !== {} &&
                  this.props.orderDetail.services.map(
                    function(order, index) {
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                          }}
                        >
                          <Text
                            style={{
                              color: "#4a4b4c",
                              fontSize: 14,
                              textAlign: "left"
                            }}
                          >
                            ({order.quantity}x){" "}
                            {this.props.lan == "en"
                              ? order.jobname
                              : order.jobname_ar}
                          </Text>
                          <Text
                            style={{
                              color: "#4a4b4c",
                              fontSize: 14,
                              marginLeft: 4
                            }}
                          >
                            SAR {order.price}
                          </Text>
                        </View>
                      );
                    }.bind(this)
                  )}
              </View>
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
        </View>

        <View
          style={{
            marginTop: 6,
            marginLeft: 10,
            marginRight: 10,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View>
            {this.props.lan === "en" ? (
              <Text style={{ color: "#0865b0" }}>Material Charges:</Text>
            ) : (
              <Text
                style={{
                  fontFamily: "montserrat_arabic_regular",
                  textAlign: "left",
                  color: "#0865b0"
                }}
              >
                تكلفة المواد
              </Text>
            )}
          </View>
          <Text style={{ color: "#4a4b4c", fontSize: 14 }}>
            SAR{" "}
            {this.props.invoice && this.props.invoice.materialcost
              ? this.props.invoice.materialcost
              : 0}
          </Text>
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
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View>
            {this.props.lan === "en" ? (
              <Text style={{ color: "#0865b0" }}>Total Amount:</Text>
            ) : (
              <Text
                style={{
                  fontFamily: "montserrat_arabic_regular",
                  textAlign: "left",
                  color: "#0865b0"
                }}
              >
                المبلغ الإجمالي المدفوع
              </Text>
            )}
          </View>
          <Text style={{ color: "#4a4b4c" }}>
            SAR {this.props.invoice && this.props.invoice.totalamount}
          </Text>
        </View>
        <View
          style={{
            width: Dimensions.get("screen").width - 30,
            height: 1,
            marginTop: 6,
            backgroundColor: "lightgray"
          }}
        ></View>
        {this.props.lan === "en" ? (
          <Text
            style={{
              fontSize: 10,
              textAlign: "right",
              margin: 8,
              color: "#4a4b4c"
            }}
          >
            The charges include VAT
          </Text>
        ) : (
          <Text
            style={{
              fontFamily: "montserrat_arabic_regular",
              fontSize: 10,
              textAlign: "right",
              margin: 8
            }}
          >
            التكلفة تشمل ضريبة القيمة المضافة
          </Text>
        )}
      </View>
    );
  }
}
