import React from "react";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity
} from "react-native";
import {
  Text,
  Content,
  Container,
  Header,
  Left,
  Right,
  Title
} from "native-base";

import { Ionicons } from "@expo/vector-icons";
export default class ComplaintTypesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: "en",
      orderId: {},
      support: {}
    };
  }
  componentDidMount = () => {
    const { navigation } = this.props;
    this.setState({
      lan: navigation.getParam("lan"),
      support: navigation.getParam("support"),
      orderId: navigation.getParam("orderId")
    });
  };
  render() {
    return (
      <Container>
        <Header
          style={{
            marginTop: 0,
            backgroundColor: "white",
            borderBottomColor: "#0866b0",
            borderBottomWidth: 1,
            height: 60,
            justifyContent: "center"
          }}
        >
          <Left style={{ marginLeft: 10 }}>
            {this.state.lan === "en" ? (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <View style={{ width: 30, height: 30 }}>
                  <Ionicons
                    name={"chevron-back-outline"}
                    size={40}
                    color={"#0865b0"}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <View style={{ width: 30, height: 30 }}>
                  <Ionicons
                    name={"chevron-forward-outline"}
                    size={40}
                    color={"#0865b0"}
                  />
                </View>
              </TouchableOpacity>
            )}
          </Left>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              position: Platform.OS === "android" ? "absolute" : "relative",
              alignSelf: "center"
            }}
          >
            {this.state.lan === "en" ? (
              <Title
                style={{ color: "#0865b0", fontSize: 18, fontWeight: "bold" }}
              >
                Complaint
              </Title>
            ) : (
              <Title
                style={{
                  fontFamily: "montserrat_arabic_regular",
                  fontSize: 18,
                  color: "#0865b0"
                }}
              >
                شكوى
              </Title>
            )}
          </View>
          <Right></Right>
        </Header>
        <Content style={{ backgroundColor: "white" }}>
          <View
            style={{
              backgroundColor: "#F5F5F5",
              width: Dimensions.get("screen").width - 30,
              alignSelf: "center"
            }}
          >
            <View style={{ height: Dimensions.get("screen").height - 60 }}>
              <View
                style={{
                  width: Dimensions.get("screen").width - 30,
                  height: 95,
                  marginTop: 40,
                  backgroundColor: "#0764af"
                }}
              >
                <View style={{ alignSelf: "center", marginTop: -18 }}>
                  <Image
                    source={require("../../../assets/Icon2.png")}
                    style={{ width: 40, height: 40 }}
                  />
                </View>
                <View>
                  {this.state.lan === "en" ? (
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: "white",
                        paddingTop: 5,
                        paddingBottom: 5,
                        textAlign: "center",
                        marginLeft: 8,
                        marginRight: 8
                      }}
                    >
                      We would love to hear your thoughts, concerns, or problems
                      so we can improve.
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "montserrat_arabic_regular",
                        fontWeight: "bold",
                        color: "white",
                        paddingTop: 5,
                        paddingBottom: 5,
                        textAlign: "center",
                        marginLeft: 8,
                        marginRight: 8
                      }}
                    >
                      يسعدنا سماع أفكاركم ومخاوفكم او المشاكل التي تواجهكم والذي
                      بدوره يمكنا من تحسين الخدمة.
                    </Text>
                  )}
                </View>
              </View>
              <View style={{ marginLeft: 8, marginTop: 20 }}>
                {this.state.lan === "en" ? (
                  <Text style={{ fontWeight: "bold", color: "#283a97" }}>
                    Feedback Type:
                  </Text>
                ) : (
                  <Text
                    style={{
                      textAlign: "left",
                      fontFamily: "montserrat_arabic_regular",
                      fontWeight: "bold",
                      color: "#283a97"
                    }}
                  >
                    نوع الملاحظات:
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("ComplaintForm", {
                    lan: this.state.lan,
                    support: this.state.support,
                    complaintType: 1,
                    orderId: this.state.orderId
                  });
                }}
              >
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",

                    width: Dimensions.get("screen").width - 70,
                    alignSelf: "center",
                    height: 60,
                    backgroundColor: "white"
                  }}
                >
                  <View style={{ marginLeft: 20 }}>
                    <Image
                      source={require("../../../assets/complaints-icons/app-experience-min.png")}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    {this.state.lan === "en" ? (
                      <Text>App Experience</Text>
                    ) : (
                      <Text style={{ fontFamily: "montserrat_arabic_regular" }}>
                        تجربتكم في التطبيق
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("ComplaintForm", {
                    lan: this.state.lan,
                    support: this.state.support,
                    complaintType: 2,
                    orderId: this.state.orderId
                  });
                }}
              >
                <View
                  style={{
                    marginTop: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",

                    width: Dimensions.get("screen").width - 70,
                    height: 60,
                    backgroundColor: "white"
                  }}
                >
                  <View style={{ marginLeft: 20 }}>
                    <Image
                      source={require("../../../assets/complaints-icons/Supplier-FB-min.png")}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    {this.state.lan === "en" ? (
                      <Text>Supplier Feedback</Text>
                    ) : (
                      <Text style={{ fontFamily: "montserrat_arabic_regular" }}>
                        ملاحظات على مقدم الخدمة
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("ComplaintForm", {
                    lan: this.state.lan,
                    support: this.state.support,
                    complaintType: 3,
                    orderId: this.state.orderId
                  });
                }}
              >
                <View
                  style={{
                    marginTop: 8,
                    marginBottom: 8,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",

                    width: Dimensions.get("screen").width - 70,
                    height: 60,
                    backgroundColor: "white"
                  }}
                >
                  <View style={{ marginLeft: 20 }}>
                    <Image
                      source={require("../../../assets/complaints-icons/Service-Exp-min.png")}
                      style={{ width: 30, height: 30 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{ marginLeft: 10 }}>
                    {this.state.lan === "en" ? (
                      <Text>Service Experience</Text>
                    ) : (
                      <Text style={{ fontFamily: "montserrat_arabic_regular" }}>
                        تجربتكم في الخدمات
                      </Text>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
