import React from "react";
import {
  Platform,
  View,
  Dimensions,
  ImageBackground,
  Image,
  AsyncStorage,
  BackHandler
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Left,
  Right,
  Text
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";

export default class PointsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "",
      points: 0,
      message: "",
      progress: 40,
      progressWithOnComplete: 0,
      progressCustomized: 0,
      lan: "en",
      interval1: 100,
      interval2: 200,
      interval3: 300,
      interval4: 400,
      interval5: 500,
      status: "Newbie",
      user: {}
    };
  }
  getUserPoints = user => {
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/get_forense_points",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerid: user.customerid
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error === false) {
          let points = "" + responseJson.forensepoints;
          if (points) {
            this.setState({ loading: false, points: points });
          }
          if (points < 1000) {
            let n1 = points.charAt(0);
            if (n1 <= 5) {
              n1 = 0;
            } else {
              n1 = 5;
            }
            let final = n1 + "00";
            var startLimit = parseInt(final);
            this.setState({
              loading: false,
              status:
                parseInt(points) >= 500
                  ? this.state.lan === "en"
                    ? "Buddy"
                    : "رفيق"
                  : this.state.lan === "en"
                  ? "Newbie"
                  : "مبتدئ",
              interval1: startLimit + 100,
              interval2: startLimit + 200,
              interval3: startLimit + 300,
              interval4: startLimit + 400,
              interval5: startLimit + 500
            });
          }
          if (points > 1000 && points < 10000) {
            let n1 = points.charAt(0);
            let n2 = points.charAt(1);

            if (n2 <= 5) {
              if (parseInt(n2) === 0) {
                n1 = n1 - 1;
                n2 = 5;
              } else {
                n2 = 0;
              }
            } else {
              n2 = 5;
            }
            let final = n1 + "" + n2 + "00";
            var startLimit = parseInt(final);
            this.setState({
              loading: false,
              status:
                parseInt(points) >= 5000
                  ? this.state.lan === "en"
                    ? "BFF"
                    : "افضل الاصدقاء الى الابد "
                  : this.state.lan === "en"
                  ? "Friend"
                  : "صديق",
              interval1: startLimit + 100,
              interval2: startLimit + 200,
              interval3: startLimit + 300,
              interval4: startLimit + 400,
              interval5: startLimit + 500
            });
          }

          if (parseInt(points) === 1000) {
            var startLimit = 500;
            this.setState({
              loading: false,
              status: this.state.lan === "en" ? "Friend" : "صديق",
              interval1: startLimit + 100,
              interval2: startLimit + 200,
              interval3: startLimit + 300,
              interval4: startLimit + 400,
              interval5: startLimit + 500
            });
          }
          if (parseInt(points) >= 10000) {
            let n3 = points.charAt(2);

            if (parseInt(n3) < 5) {
              if (parseInt(n3) === 0) {
                n3 = 5;
              } else {
                n3 = 0;
              }
            } else {
              n3 = 5;
            }

            let firstTwoNumbers = points.charAt(0) + points.charAt(1);
            let final =
              parseInt(points.charAt(2)) === 0
                ? parseInt(firstTwoNumbers) - 1 + "" + n3 + "00"
                : firstTwoNumbers + "" + n3 + "00";

            var startLimit = parseInt(final);
            this.setState({
              loading: false,
              status: this.state.lan === "en" ? "Partner" : "شريك",
              interval1: startLimit + 100,
              interval2: startLimit + 200,
              interval3: startLimit + 300,
              interval4: startLimit + 400,
              interval5: startLimit + 500
            });
          }
        }
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };
  handleBackButtonClick = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  componentDidMount = async () => {
    const { navigation } = this.props;
    if (navigation.getParam("lan")) {
      this.setState({ lan: navigation.getParam("lan"), loading: true });
    }
    let user = await AsyncStorage.getItem("user");
    if (user !== null) {
      this.setState({ user: JSON.parse(user) });
    }
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    this.getUserPoints(JSON.parse(user));
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          style={{
            marginTop: 0,
            borderBottomColor: "#0866b0",
            backgroundColor: "#ffffff",
            height: 60,
            justifyContent: "center",
            borderBottomWidth: 1
          }}
        >
          <Left style={{ marginLeft: 10 }}>
            <Ionicons
              onPress={() => this.props.navigation.goBack()}
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
              alignSelf: "center"
            }}
          >
            <Title
              style={{
                fontFamily: "montserrat_semi_blod",
                color: "#0866b0",
                fontSize: 18
              }}
            >
              {this.state.lan == "en" ? "Wafarnalak Points" : "نقاط وفرنا لك"}
            </Title>
          </View>
          <Right />
        </Header>
        <View style={{ backgroundColor: "white" }}>
          <Spinner visible={this.state.loading} textContent={""} />
          <ImageBackground
            source={require("../../assets/background-images/Category-Background-Image.png")}
            style={{
              width: Dimensions.get("screen").width - 30,
              height: Dimensions.get("screen").height - 60,
              alignSelf: "center"
            }}
          >
            <View style={{ marginTop: 110, alignSelf: "center" }}>
              <View
                style={{
                  width: Dimensions.get("screen").width - 60,
                  height: 30,
                  borderRadius: 8,
                  backgroundColor: "lightgray",
                  flexDirection: "row"
                }}
              >
                <View>
                  <View
                    style={{
                      width: (Dimensions.get("screen").width - 60) / 5,
                      height: 30,
                      backgroundColor:
                        this.state.points >= this.state.interval1
                          ? "#0865b0"
                          : "lightgray",
                      marginLeft: -1
                    }}
                  ></View>
                  {parseInt(this.state.points) < this.state.interval2 &&
                  parseInt(this.state.points) > 0 ? (
                    <View style={{ marginTop: -40 }}>
                      <View
                        style={{
                          width: 50,

                          height: 50,
                          borderRadius: 25,
                          backgroundColor: "white",
                          borderWidth: 1,
                          borderColor: "#6ea8cd"
                        }}
                      >
                        <View
                          style={{
                            alignSelf: "center",
                            justifyContent: "center",
                            flex: 1
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignSelf: "flex-end"
                            }}
                          >
                            <Text
                              style={{
                                color: "#0865b0",
                                fontWeight: "bold",
                                fontSize: 7
                              }}
                            >
                              {this.state.lan === "en"
                                ? this.state.points
                                : this.state.points}
                            </Text>
                            {this.state.lan === "en" ? (
                              <Text style={{ color: "gray", fontSize: 7 }}>
                                /{this.state.interval5}
                              </Text>
                            ) : (
                              <Text style={{ color: "gray", fontSize: 7 }}>
                                {this.state.interval5}/
                              </Text>
                            )}
                          </View>
                          <Text
                            style={{
                              fontFamily:
                                this.state.lan === "ar"
                                  ? "montserrat_arabic_regular"
                                  : "Roboto",
                              color: "#6ea8cd",
                              fontSize: 8,
                              textAlign: "center"
                            }}
                          >
                            {this.state.status}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          alignSelf: "center",
                          fontSize: 10,
                          marginLeft: 38,
                          color: "#0865b0"
                        }}
                      >
                        SAR {this.state.points * 0.05}
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={{
                        fontFamily:
                          this.state.lan === "ar"
                            ? "montserrat_arabic_regular"
                            : "Roboto",
                        color: "#0865b0",
                        fontSize: 8,
                        textAlign: "right"
                      }}
                    >
                      {this.state.lan === "en"
                        ? this.state.interval1
                        : this.state.interval1}{" "}
                      {this.state.lan === "en" ? "Pts" : "نقاط"}
                    </Text>
                  )}
                </View>
                <View>
                  <View
                    style={{
                      width: (Dimensions.get("screen").width - 60) / 5,
                      height: 30,
                      backgroundColor:
                        this.state.points >= this.state.interval2
                          ? "#0865b0"
                          : "lightgray",
                      marginLeft: -1
                    }}
                  ></View>
                  {parseInt(this.state.points) < this.state.interval3 &&
                  parseInt(this.state.points) >= this.state.interval2 ? (
                    <View style={{ marginTop: -40 }}>
                      <View
                        style={{
                          width: 50,

                          height: 50,
                          borderRadius: 25,
                          backgroundColor: "white",
                          borderWidth: 1,
                          borderColor: "#6ea8cd"
                        }}
                      >
                        <View
                          style={{
                            alignSelf: "center",
                            justifyContent: "center",
                            flex: 1
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignSelf: "flex-end"
                            }}
                          >
                            <Text
                              style={{
                                color: "#0865b0",
                                fontWeight: "bold",
                                fontSize: 7
                              }}
                            >
                              {this.state.lan === "en"
                                ? this.state.points
                                : this.state.points}
                            </Text>
                            {this.state.lan === "en" ? (
                              <Text style={{ color: "gray", fontSize: 7 }}>
                                /{this.state.interval5}
                              </Text>
                            ) : (
                              <Text style={{ color: "gray", fontSize: 7 }}>
                                {this.state.interval5}/
                              </Text>
                            )}
                          </View>
                          <Text
                            style={{
                              fontFamily:
                                this.state.lan === "ar"
                                  ? "montserrat_arabic_regular"
                                  : "Roboto",
                              color: "#6ea8cd",
                              fontSize: 8,
                              textAlign: "center"
                            }}
                          >
                            {this.state.status}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          alignSelf: "center",
                          fontSize: 10,
                          marginLeft: 38,
                          color: "#0865b0"
                        }}
                      >
                        SAR {this.state.points * 0.05}
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={{
                        fontFamily:
                          this.state.lan === "ar"
                            ? "montserrat_arabic_regular"
                            : "Roboto",
                        color: "#0865b0",
                        fontSize: 8,
                        textAlign: "right"
                      }}
                    >
                      {this.state.lan === "en"
                        ? this.state.interval2
                        : this.state.interval2}{" "}
                      {this.state.lan === "en" ? "Pts" : "نقاط"}
                    </Text>
                  )}
                </View>
                <View>
                  <View
                    style={{
                      width: (Dimensions.get("screen").width - 60) / 5,
                      height: 30,
                      marginLeft: -1,
                      backgroundColor:
                        this.state.points >= this.state.interval3
                          ? "#0865b0"
                          : "lightgray",
                      marginLeft: -1
                    }}
                  ></View>
                  {parseInt(this.state.points) < this.state.interval4 &&
                  parseInt(this.state.points) >= this.state.interval3 ? (
                    <View style={{ marginTop: -40 }}>
                      <View
                        style={{
                          width: 50,

                          height: 50,
                          borderRadius: 25,
                          backgroundColor: "white",
                          borderWidth: 1,
                          borderColor: "#6ea8cd"
                        }}
                      >
                        <View
                          style={{
                            alignSelf: "center",
                            justifyContent: "center",
                            flex: 1
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignSelf: "flex-end"
                            }}
                          >
                            <Text
                              style={{
                                color: "#0865b0",
                                fontWeight: "bold",
                                fontSize: 7
                              }}
                            >
                              {this.state.lan === "en"
                                ? this.state.points
                                : this.state.points}
                            </Text>
                            {this.state.lan === "en" ? (
                              <Text style={{ color: "gray", fontSize: 7 }}>
                                /{this.state.interval5}
                              </Text>
                            ) : (
                              <Text style={{ color: "gray", fontSize: 7 }}>
                                {this.state.interval5}/
                              </Text>
                            )}
                          </View>
                          <Text
                            style={{
                              fontFamily:
                                this.state.lan === "ar"
                                  ? "montserrat_arabic_regular"
                                  : "Roboto",
                              color: "#6ea8cd",
                              fontSize: 8,
                              textAlign: "center"
                            }}
                          >
                            {this.state.status}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          alignSelf: "center",
                          fontSize: 10,
                          marginLeft: 38,
                          color: "#0865b0"
                        }}
                      >
                        SAR {this.state.points * 0.05}
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={{
                        fontFamily:
                          this.state.lan === "ar"
                            ? "montserrat_arabic_regular"
                            : "Roboto",
                        color: "#0865b0",
                        fontSize: 8,
                        textAlign: "right"
                      }}
                    >
                      {this.state.lan === "en"
                        ? this.state.interval3
                        : this.state.interval3}{" "}
                      {this.state.lan === "en" ? "Pts" : "نقاط"}
                    </Text>
                  )}
                </View>
                <View>
                  <View
                    style={{
                      width: (Dimensions.get("screen").width - 60) / 5,
                      height: 30,
                      backgroundColor:
                        this.state.points >= this.state.interval4
                          ? "#0865b0"
                          : "lightgray",
                      marginLeft: -1
                    }}
                  ></View>
                  {parseInt(this.state.points) < this.state.interval5 &&
                  parseInt(this.state.points) >= this.state.interval4 ? (
                    <View style={{ marginTop: -40 }}>
                      <View
                        style={{
                          width: 50,

                          marginLeft: 30,
                          height: 50,
                          borderRadius: 25,
                          backgroundColor: "white",
                          borderWidth: 1,
                          borderRightWidth: 1.5,
                          borderColor: "#6ea8cd"
                        }}
                      >
                        <View
                          style={{
                            alignSelf: "center",
                            justifyContent: "center",
                            flex: 1
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignSelf: "flex-end"
                            }}
                          >
                            <Text
                              style={{
                                color: "#0865b0",
                                fontWeight: "bold",
                                fontSize: 7
                              }}
                            >
                              {this.state.lan === "en"
                                ? this.state.points
                                : this.state.points}
                            </Text>
                            {this.state.lan === "en" ? (
                              <Text style={{ color: "gray", fontSize: 7 }}>
                                /{this.state.interval5}
                              </Text>
                            ) : (
                              <Text style={{ color: "gray", fontSize: 7 }}>
                                {this.state.interval5}/
                              </Text>
                            )}
                          </View>
                          <Text
                            style={{
                              fontFamily:
                                this.state.lan === "ar"
                                  ? "montserrat_arabic_regular"
                                  : "Roboto",
                              color: "#6ea8cd",
                              fontSize: 8,
                              textAlign: "center"
                            }}
                          >
                            {this.state.status}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          alignSelf: "center",
                          fontSize: 10,
                          marginLeft: 38,
                          color: "#0865b0"
                        }}
                      >
                        SAR {this.state.points * 0.05}
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={{
                        fontFamily:
                          this.state.lan === "ar"
                            ? "montserrat_arabic_regular"
                            : "Roboto",
                        color: "#0865b0",
                        fontSize: 8,
                        textAlign: "right"
                      }}
                    >
                      {this.state.lan === "en"
                        ? this.state.interval4
                        : this.state.interval4}{" "}
                      {this.state.lan === "en" ? "Pts" : "نقاط"}
                    </Text>
                  )}
                </View>
                <View>
                  <View
                    style={{
                      width: (Dimensions.get("screen").width - 60) / 5,
                      height: 30,
                      marginLeft: -1,
                      backgroundColor:
                        this.state.points >= this.state.interval5
                          ? "#0865b0"
                          : "lightgray"
                    }}
                  ></View>
                  {parseInt(this.state.points) >= this.state.interval5 ? (
                    <View style={{ marginTop: -40 }}>
                      <View
                        style={{
                          width: 50,

                          height: 50,
                          borderRadius: 25,
                          backgroundColor: "white",
                          borderWidth: 1,
                          borderColor: "#6ea8cd"
                        }}
                      >
                        <View
                          style={{
                            alignSelf: "center",
                            justifyContent: "center",
                            flex: 1
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignSelf: "flex-end"
                            }}
                          >
                            <Text
                              style={{
                                color: "#0865b0",
                                fontWeight: "bold",
                                fontSize: 7
                              }}
                            >
                              {this.state.lan === "en"
                                ? this.state.points
                                : this.state.points}
                            </Text>
                            {this.state.lan === "en" ? (
                              <Text style={{ color: "gray", fontSize: 7 }}>
                                /{this.state.interval5}
                              </Text>
                            ) : (
                              <Text style={{ color: "gray", fontSize: 7 }}>
                                {this.state.interval5}/
                              </Text>
                            )}
                          </View>
                          <Text
                            style={{
                              fontFamily:
                                this.state.lan === "ar"
                                  ? "montserrat_arabic_regular"
                                  : "Roboto",
                              color: "#6ea8cd",
                              fontSize: 8,
                              textAlign: "center"
                            }}
                          >
                            {this.state.status}
                          </Text>
                        </View>
                      </View>
                      <Text
                        style={{
                          alignSelf: "center",
                          fontSize: 10,
                          marginLeft: 38,
                          color: "#0865b0"
                        }}
                      >
                        SAR {this.state.points * 0.05}
                      </Text>
                    </View>
                  ) : (
                    <Text
                      style={{
                        fontFamily:
                          this.state.lan === "ar"
                            ? "montserrat_arabic_regular"
                            : "Roboto",
                        color: "#0865b0",
                        fontSize: 8,
                        textAlign: "right"
                      }}
                    >
                      {this.state.lan === "en"
                        ? this.state.interval5
                        : this.state.interval5}{" "}
                      {this.state.lan === "en" ? "Pts" : "نقاط"}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#0865b0",
                width: Dimensions.get("screen").width - 30,
                marginTop: 90
              }}
            >
              <View
                style={{ alignSelf: "center", marginTop: 4, marginBottom: 4 }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 12,
                    textAlign: "center"
                  }}
                >
                  {this.state.lan == "en"
                    ? "100 points equals SAR 5."
                    : "100 نقطة تساوي 5 ر.س"}
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 12,
                    textAlign: "left"
                  }}
                >
                  {this.state.lan == "en"
                    ? "On each service user would get 200 points"
                    : "سيحصل المستخدم على 200 نقطة عند إجراء اي طلب  خدمة."}
                </Text>
              </View>
              <View
                style={{
                  width: Dimensions.get("screen").width - 60,
                  height: 2,
                  backgroundColor: "white",
                  alignSelf: "center"
                }}
              ></View>
              <View style={{ marginLeft: 15, marginBottom: 15, marginTop: 4 }}>
                <Text
                  style={{ color: "white", fontSize: 10, textAlign: "left" }}
                >
                  {"\u2022"}
                  {this.state.lan == "en"
                    ? "Wafarnalak Points can only be redeemed if they are above 500"
                    : "بالإمكان استرداد نقاط وفرنا لك إذا كانت اكثر من 500 نقطة"}
                </Text>
                <Text
                  style={{ color: "white", fontSize: 10, textAlign: "left" }}
                >
                  {"\u2022"}
                  {this.state.lan == "en"
                    ? "500 points equals SAR 25"
                    : "500 نقطة تساوي 25 ر.س"}
                </Text>
                <Text
                  style={{ color: "white", fontSize: 10, textAlign: "left" }}
                >
                  {"\u2022"}
                  {this.state.lan == "en"
                    ? "This amount redeemed would be discounted from the total \n order value."
                    : "سيتم خصم النقاط المستردة من قيمة الطلب الكلية."}
                </Text>
                <Text
                  style={{ color: "white", fontSize: 10, textAlign: "left" }}
                >
                  {"\u2022"}
                  {this.state.lan == "en"
                    ? "On each order you would receive 200 points"
                    : " ستحصل على 200 نقطة عند إجراء اي طلب  خدمة."}
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}
