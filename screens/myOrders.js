// import * as Analytics from "expo-firebase-analytics";

// import {
//   AsyncStorage,
//   BackHandler,
//   Dimensions,
//   Platform,
//   TouchableOpacity,
//   View,
//   Image
// } from "react-native";
// import {
//   Badge,
//   Container,
//   Content,
//   Footer,
//   Header,
//   Left,
//   Right,
//   Text,
//   Title,
//   Toast
// } from "native-base";

// import HistoryOrdersSecreen from "../screens/orders/historyOrdersScreen";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { NavigationEvents } from "react-navigation";
// import OngoingOrdersSecreen from "../screens/orders/ongoinOrdersScreen";
// import React from "react";

// export default class MyOrdersSecreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activePage: 1,
//       user: null,
//       lan: "en",
//       cartItem: 0,
//       location: ""
//     };
//   }
//   _renderComponent = () => {
//     if (this.state.activePage === 1)
//       return (
//         <OngoingOrdersSecreen
//           navigation={this.props.navigation}
//           isHistory={false}
//           lan={this.state.lan}
//           user={this.state.user}
//         />
//       );
//     else
//       return (
//         <HistoryOrdersSecreen
//           navigation={this.props.navigation}
//           isHistory={true}
//           lan={this.state.lan}
//           user={this.state.user}
//         />
//       );
//   };
//   selectComponent = activePage => {
//     this.setState({ activePage: activePage });
//   };
//   handleBackButtonClick = () => {
//     this.props.navigation.navigate("LandingSecreen");
//     return true;
//   };
//   componentDidMount = async () => {
//     const { navigation } = this.props;
//     let user = await AsyncStorage.getItem("user");
//     let lan = navigation.getParam("lan");
//     if (user !== null) {
//       this.setState({
//         cartItem: navigation.getParam("cartItem"),
//         user: JSON.parse(user),
//         lan: lan !== null ? lan : "en",
//         location: navigation.getParam("location")
//       });
//     } else {
//       this.setState({ user: null, lan: lan !== null ? lan : "en" });
//     }
//     BackHandler.addEventListener(
//       "hardwareBackPress",
//       this.handleBackButtonClick
//     );
//   };
//   navigationSetup = async option => {
//     if (option == 1) {
//       this.props.navigation.navigate("LandingSecreen", { lan: this.state.lan });
//     }
//     if (option == 3) {
//       if (this.state.cartItem > 0) {
//         if (
//           this.state.location == "Riyadh" ||
//           this.state.location == "Al-Kharj"
//         ) {
//           this.props.navigation.navigate("MyCart", { lan: this.state.lan });
//           await Analytics.logEvent("Cart", {
//             name: "Cart",
//             isPackage: false,
//             screen: "myOrdersScreen",
//             purpose: "checkout order from myOrders screen"
//           });
//         } else {
//           Toast.show({
//             text:
//               this.state.lan == "en"
//                 ? "Sorry, currently we are not delivering services in your city, soon we will be with you"
//                 : "عفوا، في الوقت الحالي لا نقدم الخدمة بمدينتك. سنكون عندك قريباً",
//             position: "bottom"
//           });
//         }
//       } else {
//         Toast.show({
//           text:
//             this.state.lan == "en" ? "Your cart is empty" : "سلة الطلبات فارغة",
//           position: "bottom"
//         });
//       }
//     }
//     if (option == 4) {
//       this.props.navigation.navigate("ProfileSecreen", {
//         cartItem: this.state.cartItem,
//         lan: this.state.lan
//       });
//     }
//   };
//   render() {
//     return (
//       <Container style={{ backgroundColor: "white" }}>
//         <Header
//           style={{
//             marginTop: 0,
//             borderBottomColor: "#0866b0",
//             backgroundColor: "#ffffff",
//             height: 60,
//             justifyContent: "center",
//             borderBottomWidth: 1
//           }}
//         >
//           <Left style={{ marginLeft: 10 }}></Left>
//           <View
//             style={{
//               flex: 2,
//               justifyContent: "center",
//               alignItems: "center",
//               position: Platform.OS === "android" ? "absolute" : "relative",
//               alignSelf: "center"
//             }}
//           >
//             <Title
//               style={{
//                 fontFamily: "montserrat_semi_blod",
//                 color: "#0866b0",
//                 fontSize: 18
//               }}
//             >
//               {this.state.lan == "en" ? "My Orders" : "طلباتي"}
//             </Title>
//           </View>
//           <Right />
//         </Header>
//         <Content
//           style={{ backgroundColor: "white", marginLeft: 10, marginRight: 10 }}
//         >
//           {
//             <NavigationEvents
//               onWillFocus={() => {
//                 this.componentDidMount();
//               }}
//             />
//           }
//           <View
//             style={{
//               backgroundColor: "#F5F5F5"
//             }}
//           >
//             <View
//               style={{
//                 marginTop: 16,
//                 flexDirection: "row",
//                 alignSelf: "center"
//               }}
//             >
//               <LinearGradient
//                 colors={["#0764af", "#6ea8cd"]}
//                 start={[0.9, 0.2]}
//                 end={[0.1, 0.1]}
//                 style={{
//                   borderWidth: 0,
//                   borderRadius: 6,
//                   width: 160,
//                   height: 40,
//                   marginRight: 6,
//                   borderColor: "transparent"
//                 }}
//               >
//                 <TouchableOpacity onPress={() => this.selectComponent(1)}>
//                   <View
//                     style={{
//                       backgroundColor:
//                         this.state.activePage === 1 ? "transparent" : "white",
//                       borderRadius: 6,
//                       width: 160,
//                       height: 40,
//                       borderWidth: 0
//                     }}
//                   >
//                     <View
//                       style={{
//                         flex: 1,
//                         alignItems: "center",
//                         justifyContent: "center"
//                       }}
//                     >
//                       <Text
//                         style={{
//                           color:
//                             this.state.activePage === 1 ? "white" : "#6ea8cd",

//                           fontSize: 14,

//                           fontWeight: "bold"
//                         }}
//                       >
//                         {this.state.lan == "en" ? "Ongoing" : "الجاريه"}
//                       </Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               </LinearGradient>
//               <LinearGradient
//                 colors={["#0764af", "#6ea8cd"]}
//                 start={[0.9, 0.2]}
//                 end={[0.1, 0.1]}
//                 style={{
//                   borderRadius: 6,
//                   height: 40,
//                   width: 160,
//                   marginLeft: 6
//                 }}
//               >
//                 <TouchableOpacity onPress={() => this.selectComponent(2)}>
//                   <View
//                     style={{
//                       backgroundColor:
//                         this.state.activePage === 2 ? "transparent" : "white",
//                       borderWidth: 0,
//                       height: 40,
//                       width: 160,
//                       borderRadius: 6
//                     }}
//                   >
//                     <View
//                       style={{
//                         flex: 1,
//                         alignItems: "center",
//                         justifyContent: "center"
//                       }}
//                     >
//                       <Text
//                         style={{
//                           color:
//                             this.state.activePage === 2 ? "white" : "#6ea8cd",
//                           fontSize: 14,
//                           fontWeight: "bold"
//                         }}
//                       >
//                         {this.state.lan == "en" ? "History" : "الطلبات السابقة"}
//                       </Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               </LinearGradient>
//             </View>

//             {this.state.user !== null ? (
//               this._renderComponent()
//             ) : (
//               <View
//                 style={{
//                   flex: 1,
//                   alignItems: "center",
//                   marginTop: Dimensions.get("screen").height / 2
//                 }}
//               >
//                 {this.state.lan === "en" ? (
//                   <Text
//                     style={{
//                       alignSelf: "center",
//                       marginBottom: 10,
//                       color: "#4a4b4c"
//                     }}
//                   >
//                     You're not logged in.
//                   </Text>
//                 ) : (
//                   <Text
//                     style={{
//                       fontFamily: "montserrat_semi_blod",
//                       alignSelf: "center",
//                       marginBottom: 10
//                     }}
//                   >
//                     لم يتم تسجيل الدخول
//                   </Text>
//                 )}

//                 <TouchableOpacity
//                   onPress={() =>
//                     this.props.navigation.navigate("Login", {
//                       lan: this.state.lan
//                     })
//                   }
//                 >
//                   <View
//                     style={{
//                       backgroundColor: "#0764af",
//                       borderRadius: 12,
//                       width: Dimensions.get("screen").width - 120,
//                       alignSelf: "center"
//                     }}
//                   >
//                     <LinearGradient
//                       colors={["#0764af", "#6ea8cd"]}
//                       start={[0.9, 0.2]}
//                       end={[0.1, 0.1]}
//                       style={{ borderRadius: 12 }}
//                     >
//                       <Text
//                         style={{
//                           color: "white",
//                           margin: 12,
//                           alignSelf: "center"
//                         }}
//                       >
//                         {this.state.lan == "en" ? "Login" : "دخول"}
//                       </Text>
//                     </LinearGradient>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             )}
//           </View>
//         </Content>
//         <Footer style={{ backgroundColor: "white" }}>
//           <View
//             style={{
//               flexDirection: "row",
//               flex: 1,
//               alignSelf: "center",
//               justifyContent: "space-between",
//               marginLeft: 6,
//               marginRight: 8
//             }}
//           >
//             <TouchableOpacity onPress={() => this.navigationSetup(1)}>
//               <View>
//                 <View style={{ alignSelf: "center" }}>
//                   <Ionicons name="md-apps" size={28} color={"#ccc"} />
//                 </View>
//                 <Text
//                   style={{ textAlign: "center", fontSize: 12, color: "#ccc" }}
//                 >
//                   {this.state.lan == "en" ? "Categories" : "فئات الخدمات"}
//                 </Text>
//               </View>
//             </TouchableOpacity>

//             <View>
//               <View style={{ alignSelf: "center" }}>
//                 <Image
//                   resizeMode="contain"
//                   source={require("../assets/myOrder.png")}
//                   style={{ height: 29, width: 30, tintColor: "#0865b0" }}
//                 />
//               </View>
//               <Text
//                 style={{
//                   textAlign: "center",
//                   fontSize: 12,
//                   color: "#0865b0"
//                 }}
//               >
//                 {this.state.lan == "en" ? "My Orders" : "طلباتي"}
//               </Text>
//             </View>
//             <TouchableOpacity onPress={() => this.navigationSetup(3)}>
//               <View>
//                 <View style={{ alignSelf: "center", flexDirection: "row" }}>
//                   <Ionicons name="md-cart" size={28} color={"#ccc"} />
//                   {this.state.cartItem > 0 ? (
//                     <Badge
//                       danger
//                       style={{ height: 20, width: 20, borderRadius: 10 }}
//                     >
//                       <View
//                         style={{
//                           left: 0,
//                           right: 0,
//                           bottom: 0,
//                           top: 0,
//                           position: "absolute"
//                         }}
//                       >
//                         <Text
//                           style={{
//                             fontSize: 10,
//                             justifyContent: "center"
//                           }}
//                         >
//                           {this.state.cartItem}
//                         </Text>
//                       </View>
//                     </Badge>
//                   ) : (
//                     <View></View>
//                   )}
//                 </View>
//                 <Text
//                   style={{ textAlign: "center", fontSize: 12, color: "#ccc" }}
//                 >
//                   {this.state.lan == "en" ? "My Cart" : "سلة الطلب خاصتي"}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => this.navigationSetup(4)}>
//               <View>
//                 <View style={{ alignSelf: "center" }}>
//                   <Ionicons
//                     name={
//                       this.state.user !== null
//                         ? "ios-person"
//                         : "ios-information-circle"
//                     }
//                     size={28}
//                     color={"#ccc"}
//                   />
//                 </View>
//                 <Text
//                   style={{ textAlign: "center", fontSize: 12, color: "#ccc" }}
//                 >
//                   {this.state.user !== null
//                     ? this.state.lan == "en"
//                       ? "My Profile"
//                       : "ملفي الشخصي"
//                     : this.state.lan == "en"
//                     ? "About"
//                     : "المزيد"}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>
//         </Footer>
//       </Container>
//     );
//   }
// }

import * as Analytics from "expo-firebase-analytics";

import {
  AsyncStorage,
  BackHandler,
  Dimensions,
  Platform,
  TouchableOpacity,
  View,
  Image
} from "react-native";
import {
  Badge,
  Container,
  Content,
  Footer,
  Header,
  Left,
  Right,
  Text,
  Title,
  Toast
} from "native-base";

import HistoryOrdersSecreen from "../screens/orders/historyOrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationEvents } from "react-navigation";
import OngoingOrdersSecreen from "../screens/orders/ongoinOrdersScreen";
import React from "react";

export default class MyOrdersSecreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      user: null,
      lan: "en",
      cartItem: 0,
      location: ""
    };
  }
  _renderComponent = () => {
    if (this.state.activePage === 1)
      return (
        <OngoingOrdersSecreen
          navigation={this.props.navigation}
          isHistory={false}
          lan={this.state.lan}
          user={this.state.user}
        />
      );
    else
      return (
        <HistoryOrdersSecreen
          navigation={this.props.navigation}
          isHistory={true}
          lan={this.state.lan}
          user={this.state.user}
        />
      );
  };
  selectComponent = activePage => {
    this.setState({ activePage: activePage });
  };
  handleBackButtonClick = () => {
    this.props.navigation.navigate("LandingSecreen");
    return true;
  };
  componentDidMount = async () => {
    const { navigation } = this.props;
    let user = await AsyncStorage.getItem("user");
    let lan = navigation.getParam("lan");
    if (user !== null) {
      this.setState({
        cartItem: navigation.getParam("cartItem"),
        user: JSON.parse(user),
        lan: lan !== null ? lan : "en",
        location: navigation.getParam("location")
      });
    } else {
      this.setState({ user: null, lan: lan !== null ? lan : "en" });
    }
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  navigationSetup = async option => {
    if (option == 1) {
      this.props.navigation.navigate("LandingSecreen", { lan: this.state.lan });
    }
    if (option == 3) {
      if (this.state.cartItem > 0) {
        if (
          this.state.location == "Riyadh" ||
          this.state.location == "Al-Kharj"
        ) {
          this.props.navigation.navigate("MyCart", { lan: this.state.lan });
          await Analytics.logEvent("Cart", {
            name: "Cart",
            isPackage: false,
            screen: "myOrdersScreen",
            purpose: "checkout order from myOrders screen"
          });
        } else {
          Toast.show({
            text:
              this.state.lan == "en"
                ? "Sorry, currently we are not delivering services in your city, soon we will be with you"
                : "عفوا، في الوقت الحالي لا نقدم الخدمة بمدينتك. سنكون عندك قريباً",
            position: "bottom"
          });
        }
      } else {
        Toast.show({
          text:
            this.state.lan == "en" ? "Your cart is empty" : "سلة الطلبات فارغة",
          position: "bottom"
        });
      }
    }
    if (option == 4) {
      this.props.navigation.navigate("ProfileSecreen", {
        cartItem: this.state.cartItem,
        lan: this.state.lan
      });
    }
  };
  render() {
    return (
      <Container style={{ backgroundColor: "white" }}>
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
          <Left style={{ marginLeft: 10 }}></Left>
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
              {this.state.lan == "en" ? "My Orders" : "طلباتي"}
            </Title>
          </View>
          <Right />
        </Header>

        {
          <NavigationEvents
            onWillFocus={() => {
              this.componentDidMount();
            }}
          />
        }
        <View
          style={{
            backgroundColor: "#F5F5F5"
          }}
        >
          <View
            style={{
              marginTop: 16,
              flexDirection: "row",
              alignSelf: "center"
            }}
          >
            <LinearGradient
              colors={["#0764af", "#6ea8cd"]}
              start={[0.9, 0.2]}
              end={[0.1, 0.1]}
              style={{
                borderWidth: 0,
                borderRadius: 6,
                width: 160,
                height: 40,
                marginRight: 6,
                borderColor: "transparent"
              }}
            >
              <TouchableOpacity onPress={() => this.selectComponent(1)}>
                <View
                  style={{
                    backgroundColor:
                      this.state.activePage === 1 ? "transparent" : "white",
                    borderRadius: 6,
                    width: 160,
                    height: 40,
                    borderWidth: 0
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        color:
                          this.state.activePage === 1 ? "white" : "#6ea8cd",

                        fontSize: 14,

                        fontWeight: "bold"
                      }}
                    >
                      {this.state.lan == "en" ? "Ongoing" : "الجاريه"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={["#0764af", "#6ea8cd"]}
              start={[0.9, 0.2]}
              end={[0.1, 0.1]}
              style={{
                borderRadius: 6,
                height: 40,
                width: 160,
                marginLeft: 6
              }}
            >
              <TouchableOpacity onPress={() => this.selectComponent(2)}>
                <View
                  style={{
                    backgroundColor:
                      this.state.activePage === 2 ? "transparent" : "white",
                    borderWidth: 0,
                    height: 40,
                    width: 160,
                    borderRadius: 6
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        color:
                          this.state.activePage === 2 ? "white" : "#6ea8cd",
                        fontSize: 14,
                        fontWeight: "bold"
                      }}
                    >
                      {this.state.lan == "en" ? "History" : "الطلبات السابقة"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {this.state.user !== null ? (
            this._renderComponent()
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: Dimensions.get("screen").height / 2
              }}
            >
              {this.state.lan === "en" ? (
                <Text
                  style={{
                    alignSelf: "center",
                    marginBottom: 10,
                    color: "#4a4b4c"
                  }}
                >
                  You're not logged in.
                </Text>
              ) : (
                <Text
                  style={{
                    fontFamily: "montserrat_semi_blod",
                    alignSelf: "center",
                    marginBottom: 10
                  }}
                >
                  لم يتم تسجيل الدخول
                </Text>
              )}

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("Login", {
                    lan: this.state.lan
                  })
                }
              >
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
                      {this.state.lan == "en" ? "Login" : "دخول"}
                    </Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignSelf: "center",
            justifyContent: "space-between",
            marginLeft: 6,
            marginRight: 8,
            backgroundColor: "white",
            position: "absolute",
            bottom: 0,
            width: "100%",
            paddingHorizontal: 12
          }}
        >
          <TouchableOpacity onPress={() => this.navigationSetup(1)}>
            <View>
              <View style={{ alignSelf: "center" }}>
                <Ionicons name="md-apps" size={28} color={"#ccc"} />
              </View>
              <Text
                style={{ textAlign: "center", fontSize: 12, color: "#ccc" }}
              >
                {this.state.lan == "en" ? "Categories" : "فئات الخدمات"}
              </Text>
            </View>
          </TouchableOpacity>

          <View>
            <View style={{ alignSelf: "center" }}>
              <Image
                resizeMode="contain"
                source={require("../assets/myOrders.png")}
                style={{ height: 29, width: 30 }}
              />
            </View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "#0865b0"
              }}
            >
              {this.state.lan == "en" ? "My Orders" : "طلباتي"}
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.navigationSetup(3)}>
            <View>
              <View style={{ alignSelf: "center", flexDirection: "row" }}>
                <Ionicons name="md-cart" size={28} color={"#ccc"} />
                {this.state.cartItem > 0 ? (
                  <Badge
                    danger
                    style={{ height: 20, width: 20, borderRadius: 10 }}
                  >
                    <View
                      style={{
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0,
                        position: "absolute"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          justifyContent: "center"
                        }}
                      >
                        {this.state.cartItem}
                      </Text>
                    </View>
                  </Badge>
                ) : (
                  <View></View>
                )}
              </View>
              <Text
                style={{ textAlign: "center", fontSize: 12, color: "#ccc" }}
              >
                {this.state.lan == "en" ? "My Cart" : "سلة الطلب خاصتي"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.navigationSetup(4)}>
            <View>
              <View style={{ alignSelf: "center" }}>
                <Ionicons
                  name={
                    this.state.user !== null
                      ? "ios-person"
                      : "ios-information-circle"
                  }
                  size={28}
                  color={"#ccc"}
                />
              </View>
              <Text
                style={{ textAlign: "center", fontSize: 12, color: "#ccc" }}
              >
                {this.state.user !== null
                  ? this.state.lan == "en"
                    ? "My Profile"
                    : "ملفي الشخصي"
                  : this.state.lan == "en"
                  ? "About"
                  : "المزيد"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}
