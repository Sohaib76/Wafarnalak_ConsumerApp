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
  Title,
  Button,
  Textarea,
  Toast,
  Footer
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default class ComplaintFormScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: "en",
      complaintText: "",
      complaintType: "",
      orderId: "",
      isComplaintSubmitted: false,
      support: null
    };
  }
  componentWillMount = () => {
    const { navigation } = this.props;
    this.getComplaintTicket(navigation.getParam("orderId"));
  };
  componentDidMount = () => {
    const { navigation } = this.props;
    this.setState({
      lan: navigation.getParam("lan"),
      orderId: navigation.getParam("orderId"),
      complaintType: navigation.getParam("complaintType")
    });
  };
  getComplaintTicket = orderid => {
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/get_ticket",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderid: orderid
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ support: responseJson });
      })
      .catch(error => {});
  };
  submitComplaint = () => {
    if (this.state.complaintText !== "") {
      fetch(
        "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/add_ticket",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            orderid: this.state.orderId,
            type: this.state.complaintType,
            message: this.state.complaintText
          })
        }
      )
        .then(response => response.json())
        .then(responseJson => {
          Toast.show({
            text: responseJson.message,
            position: "bottom"
          });
          this.setState({ isComplaintSubmitted: true });
        })
        .catch(error => {});
    } else {
      Toast.show({
        text: this.state.lan == 'en' ? "Please write the complaint note first" : "يرجى كتابة الشكوى اولاً",
        position: "bottom"
      });
    }
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
                    color={"#0866b0"}
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
                    color={"#0866b0"}
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
                style={{ color: "#0866b0", fontSize: 18, fontWeight: "bold" }}
              >
                Complaint
              </Title>
            ) : (
              <Title
                style={{
                  fontFamily: "montserrat_arabic_regular",
                  fontSize: 18,
                  color: "#0866b0"
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
              width: Dimensions.get("screen").width - 30,
              alignSelf: "center",
              backgroundColor: "#F5F5F5"
            }}
          >
            <View
              style={{
                width: Dimensions.get("screen").width - 30,
                alignSelf: "center",
                height: 95,
                marginTop: 40,
                backgroundColor: "#0764af"
              }}
            >
              <View style={{ alignSelf: "center", marginTop: -18 }}>
                <Image
                  source={require("../../../assets/complaints-icons/logo-min.png")}
                  style={{ width: 40, height: 40 }}
                />
              </View>
              <View>
                {this.state.support && this.state.support.supportstatus < 2 ? (
                  this.state.lan === "en" ? (
                    <Text
                      style={{
                        color: "white",
                        paddingTop: 5,
                        paddingBottom: 5,
                        textAlign: "center",
                        marginLeft: 8,
                        marginRight: 8,
                        fontWeight: "bold"
                      }}
                    >
                      Please leave your comment here and {"\n"}we would get back
                      to you.
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "montserrat_arabic_regular",
                        color: "white",
                        paddingTop: 5,
                        paddingBottom: 5,
                        textAlign: "center",
                        marginLeft: 8,
                        marginRight: 8,
                        fontSize: 14
                      }}
                    >
                      يرجى ترك ملاحظاتكم هنا وسنرد عليكم
                    </Text>
                  )
                ) : this.state.lan === "en" ? (
                  <Text
                    style={{
                      color: "white",
                      paddingTop: 5,
                      paddingBottom: 5,
                      textAlign: "center",
                      marginLeft: 8,
                      marginRight: 8,
                      fontWeight: "bold"
                    }}
                  >
                    Dear Customer, your issue has been resolved. Let us know if
                    you have any query.{'\n'} Ticket #{" "}
                    {this.state.support && this.state.support.supportticketid}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: "montserrat_arabic_regular",
                      color: "white",
                      paddingTop: 5,
                      paddingBottom: 5,
                      textAlign: "center",
                      marginLeft: 8,
                      marginRight: 8,
                      fontSize: 12
                    }}
                  >
                    عزيزي العميل، تم حل مشكلتك. اخبرنا اذا كان لديك اي استفسار
                    اخر رقم البطاقة{" "}
                    {this.state.support && this.state.support.supportticketid}{" "}
                  </Text>
                )}
              </View>
            </View>
            <View style={{ marginLeft: 8, marginTop: 20 }}>
              {this.state.support == null &&
              this.state.isComplaintSubmitted == false ? (
                this.state.lan === "en" ? (
                  <Text style={{ fontWeight: "bold", color: "#283a97" }}>
                    Comment
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
                    تعليق
                  </Text>
                )
              ) : this.state.lan === "en" ? (
                <Text style={{ fontWeight: "bold", color: "#283a97" }}>
                  Your Response
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
                  ردك
                </Text>
              )}
            </View>
            <View style={{ marginLeft: 4, marginTop: 6, flexDirection: "row" }}>
              <Image
                source={require("../../../assets/complaints-icons/Text-min.png")}
                style={{ width: 30, height: 30, marginRight: 5 }}
                resizeMode="contain"
              />
              {this.state.support &&
              this.state.support.supportmessage === null &&
              this.state.isComplaintSubmitted == false ? (
                <Textarea
                  style={{
                    textAlign: this.state.lan === "en" ? "left" : "right",
                    width: Dimensions.get("screen").width - 76,
                    height: 120,
                    backgroundColor: "white"
                  }}
                  rowSpan={7}
                  bordered
                  onChangeText={text => {
                    this.setState({ complaintText: text });
                  }}
                  placeholder={this.state.lan === "en" ? "Text" : "نص"}
                />
              ) : (
                <View
                  style={{
                    flexDirection: "column",
                    width: Dimensions.get("screen").width / 2,
                    display: "flex",
                    backgroundColor: "lightgray",
                    marginLeft: 4
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                      color: "black",
                      paddingLeft: 5
                    }}
                  >
                    {this.state.support &&
                    this.state.support.supportmessage !== null
                      ? this.state.support.supportmessage
                      : this.state.complaintText}
                  </Text>
                </View>
              )}
            </View>
            {this.state.support &&
            this.state.support.supportstatus !== null &&
            this.state.isComplaintSubmitted === false ? (
              <View>
                <View>
                  {this.state.support.supportstatus >= 1 ? (
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "flex-end",
                        marginTop: 6
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          width: 120,
                          display: "flex",
                          backgroundColor: "lightgray",
                          borderTopLeftRadius: 12,
                          borderBottomLeftRadius: 12,
                          justifyContent: "center"
                        }}
                      >
                        {this.state.lan === "en" ? (
                          <Text
                            style={{
                              color: "white",
                              alignItems: "center",
                              paddingLeft: 5
                            }}
                          >
                            Under Review
                          </Text>
                        ) : (
                          <Text
                            style={{
                              textAlign: "left",
                              fontFamily: "montserrat_arabic_regular",
                              color: "white",
                              alignItems: "center",
                              paddingLeft: 5
                            }}
                          >
                            في إنتظار المراجعة
                          </Text>
                        )}
                      </View>
                      <Image
                        source={require("../../../assets/complaints-icons/logo-min.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                      />
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
                <View>
                  {this.state.support &&
                  this.state.support.supportreply !== "" &&
                  this.state.support.supportreply !== null &&
                  this.state.isComplaintSubmitted == false ? (
                    <View
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        justifyContent: "flex-end",
                        marginTop: 20
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: "#0866B0",
                          borderTopLeftRadius: 12,
                          borderBottomLeftRadius: 12,
                          flexDirection: "column",
                          width: Dimensions.get("screen").width / 2,
                          display: "flex",
                          justifyContent: "center"
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            alignItems: "center",
                            paddingLeft: 5
                          }}
                        >
                          {this.state.support.supportreply}
                        </Text>
                      </View>
                      <Image
                        source={require("../../../assets/complaints-icons/logo-min.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                      />
                    </View>
                  ) : (
                    <View></View>
                  )}
                </View>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </Content>
        <Footer style={{ backgroundColor: "white", borderColor: "white" }}>
          <View
            style={{ width: Dimensions.get("screen").width - 30, marginTop: 3 }}
          >
            {this.state.support &&
            this.state.support.supportmessage === null &&
            this.state.isComplaintSubmitted == false ? (
              <TouchableOpacity onPress={this.submitComplaint}>
                <View
                  style={{
                    backgroundColor: "#0764af",
                    borderRadius: 12,
                    width: Dimensions.get("screen").width - 120,
                    alignSelf: "center"
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
                        alignSelf: "center"
                      }}
                    >
                      {this.state.lan == "en" ? "Submit" : "تسليم"}
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            ) : (
              <View></View>
            )}
          </View>
        </Footer>
      </Container>
    );
  }
}
