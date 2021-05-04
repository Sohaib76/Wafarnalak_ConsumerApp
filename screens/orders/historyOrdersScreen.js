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
import Spinner from "react-native-loading-spinner-overlay";
import { NavigationEvents } from "react-navigation";

export default class HistoryOrdersSecreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historyOrders: [],
      loading: false
    };
  }
  componentDidMount = () => {
    this.setState({ loading: true });
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/customer_completed_order_requests",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ customerid: this.props.user.customerid })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error === false) {
          this.setState({
            historyOrders: responseJson.Orders,
            loading: false
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(error => {});
  };
  render() {
    return (
      <View style={{ marginTop: 18 }}>
        <Spinner visible={this.state.loading} textContent={""} />
        {
          <NavigationEvents
            onWillFocus={() => {
              this.componentDidMount();
            }}
          />
        }
        <View
          style={{
            width: Dimensions.get("screen").width,
            height: 1,
            backgroundColor: "lightgray"
          }}
        ></View>
        {this.state.historyOrders &&
          this.state.historyOrders.map(
            function(order, index) {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("OrderDetails", {
                        order: order,
                        isHistory: true,
                        lan: this.props.lan,
                        user: this.props.user
                      })
                    }
                  >
                    <View
                      style={{
                        marginTop: 2,
                        flexDirection: "row",
                        height: 75,
                        width: Dimensions.get("screen").width,
                        backgroundColor: "#F5F5F5"
                      }}
                    >
                      <Left style={{ position: "absolute", flex: 1, left: 6 }}>
                        <Image
                          source={require("../../assets/Job-Icon-min.png")}
                          style={{
                            width: 55,
                            height: 55,
                            borderRadius: 10
                          }}
                          resizeMode="contain"
                        />
                      </Left>
                      <View
                        style={{
                          marginLeft: 75,
                          marginRight: 35,
                          marginTop: 10
                        }}
                      >
                        <Text
                          style={{
                            color: "#283a97",
                            fontSize: 12,
                            fontWeight: "bold",
                            marginTop: 4,
                            textAlign:'left'
                          }}
                        >
                          {this.props.lan == "en" ? "Order#" : "طلب#"}:{" "}
                          {order.orderid}
                        </Text>
                        <Text
                          style={{
                            color: "#4a4b4c",
                            fontSize: 10,
                            marginTop: 2,
                            textAlign:'left'
                          }}
                        >
                          {this.props.lan == "en" ? "Date" : "الطلبات السابقة"}
                          {order.appointmentdate}
                        </Text>
                        <Text style={{ color: "#4a4b4c", fontSize: 10, textAlign:'left' }}>
                          {this.props.lan == "en" ? "Status:" : "الحالة:"}{" "}
                          {order.statusid === 1
                            ? this.props.lan == "en"
                              ? "Request Sent"
                              : "تم ارسال الطلب"
                            : order.statusid === 2
                            ? this.props.lan == "en"
                              ? "Professional Assigned"
                              : "تم تعيين المهني"
                            : order.statusid === 3
                            ? this.props.lan == "en"
                              ? "Cancelled"
                              : "تم الحذف"
                            : order.statusid === 4
                            ? this.props.lan == "en"
                              ? "Job Started"
                              : "المهمة بدأت"
                            : order.statusid === 5
                            ? this.props.lan == "en"
                              ? "Completed"
                              : "تم إنجاز المهمة"
                            : order.statusid === 6
                            ? this.props.lan == "en"
                              ? "Rescheduled"
                              : "إعادة جدولة"
                            : ""}
                        </Text>
                      </View>
                      <Right
                        style={{ position: "absolute", right: 26, flex: 1 }}
                      >
                        <Ionicons
                          name={this.props.lan == 'en' ? "chevron-forward-outline" : "chevron-back-outline"}
                          size={24}
                          color={"#6ea8cd"}
                        />
                      </Right>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: Dimensions.get("screen").width,
                      height: 1,
                      backgroundColor: "lightgray"
                    }}
                  ></View>
                </View>
              );
            }.bind(this)
          )}
      </View>
    );
  }
}
