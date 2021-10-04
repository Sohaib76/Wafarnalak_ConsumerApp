import React from "react";
import {
  View,
  Image,
  Platform,
  Dimensions,
  Modal,
  ImageBackground,
  TouchableOpacity,
  Button,
} from "react-native";
import Signature from "react-native-signature-canvas";
import {
  Container,
  Accordion,
  Toast,
  Title,
  Header,
  Content,
  Thumbnail,
  // Button,
  Body,
  Input,
  Icon,
  Text,
  Item,
  Left,
  Right,
  Footer,
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
    this.callRef = React.createRef();

    this.state = {
      historyOrders: [],
      loading: false,
    };
  }
  componentDidMount = () => {
    // alert("Loaded");
    this.setState({ loading: true });
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/customer_completed_order_requests",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerid: this.props.user.customerid }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error === false) {
          this.setState({
            historyOrders: responseJson.Orders,
            loading: false,
          });
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {});
  };

  handleClear = () => {
    this.callRef.current.clearSignature();
  };

  handleConfirm = () => {
    console.log("end");
    this.callRef.current.readSignature();
  };
  render() {
    return (
      <View style={{ marginTop: 18 }}>
        {/* <View style={{ height: 250 }}>
          <Signature
            ref={this.callRef}
            // handle when you click save button
            onOK={(img) => console.log(img)}
            onEmpty={() => console.log("empty")}
            // description text for signature
            descriptionText="Sign"
            // clear button text
            clearText="Clear"
            // save button text
            confirmText="Save"
            // String, webview style for overwrite default style, all style: https://github.com/YanYuanFE/react-native-signature-canvas/blob/master/h5/css/signature-pad.css
            webStyle={`.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`}
            autoClear={true}
            imageType={"image/svg+xml"}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Button title="Clear" onPress={this.handleClear} />
            <Button title="Confirm" onPress={this.handleConfirm} />
          </View>
        </View> */}

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
            backgroundColor: "lightgray",
          }}
        ></View>
        {this.state.historyOrders &&
          this.state.historyOrders.map(
            function (order, index) {
              console.log("Orderr", order);
              return (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("OrderDetails", {
                        order: order,
                        isHistory: true,
                        lan: this.props.lan,
                        user: this.props.user,
                      })
                    }
                  >
                    <View
                      style={{
                        marginTop: 2,
                        flexDirection: "row",
                        height: 75,
                        width: Dimensions.get("screen").width,
                        backgroundColor: "#F5F5F5",
                      }}
                    >
                      <Left style={{ position: "absolute", flex: 1, left: 6 }}>
                        <Image
                          source={require("../../assets/Job-Icon-min.png")}
                          style={{
                            width: 55,
                            height: 55,
                            borderRadius: 10,
                          }}
                          resizeMode="contain"
                        />
                      </Left>
                      <View
                        style={{
                          marginLeft: 75,
                          marginRight: 35,
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#283a97",
                            fontSize: 12,
                            fontWeight: "bold",
                            marginTop: 4,
                            textAlign: "left",
                          }}
                        >
                          {this.props.lan == "en" ? "Order#" : "طلب#"}:{" "}
                          {order.order_id}
                        </Text>
                        <Text
                          style={{
                            color: "#4a4b4c",
                            fontSize: 10,
                            marginTop: 2,
                            textAlign: "left",
                          }}
                        >
                          {this.props.lan == "en" ? "Date" : "الطلبات السابقة"}
                          {order.appointmentdate}
                        </Text>
                        <Text
                          style={{
                            color: "#4a4b4c",
                            fontSize: 10,
                            textAlign: "left",
                          }}
                        >
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
                          name={
                            this.props.lan == "en"
                              ? "chevron-forward-outline"
                              : "chevron-back-outline"
                          }
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
                      backgroundColor: "lightgray",
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
