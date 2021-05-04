// import React from "react";
// import {
//   View,
//   Image,
//   Platform,
//   Dimensions,
//   Modal,
//   Alert,
//   ImageBackground,
//   TouchableOpacity,
//   AsyncStorage,
//   I18nManager,
//   ScrollView
// } from "react-native";
// import {
//   Container,
//   Accordion,
//   Toast,
//   Title,
//   Header,
//   Content,
//   Thumbnail,
//   Button,
//   Text,
//   Badge,
//   Left,
//   Right,
//   Footer
// } from "native-base";
// import * as StoreReview from "expo-store-review";
// import { Ionicons } from "@expo/vector-icons";
// import * as Updates from "expo-updates";
// import * as Notifications from "expo-notifications";
// import { LinearGradient } from "expo-linear-gradient";
// import { NavigationEvents } from "react-navigation";
// import * as Analytics from "expo-firebase-analytics";

// export default class ProfileSecreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLogin: false,
//       modalVisible: false,
//       lan: "en",
//       user: {},
//       cartItem: 0,
//       location: ""
//     };
//   }
//   componentDidMount = async () => {
//     const { navigation } = this.props;
//     let user = await AsyncStorage.getItem("user");
//     if (user !== null) {
//       this.setState({
//         cartItem: navigation.getParam("cartItem"),
//         user: JSON.parse(user),
//         isLogin: true,
//         lan: navigation.getParam("lan"),
//         location: navigation.getParam("location")
//       });
//     } else {
//       this.setState({ lan: navigation.getParam("lan") });
//     }
//   };
//   logoutUser = async () => {
//     await AsyncStorage.removeItem("user");
//     await AsyncStorage.removeItem("jobs");
//     await AsyncStorage.removeItem("address");
//     this.setState({ isLogin: false, cartItem: 0 });
//   };
//   authenticateUser = () => {
//     this.props.navigation.navigate("Login", { lan: this.state.lan });
//   };
//   displayLanguageModal = () => {
//     this.setState({ modalVisible: true });
//   };
//   hideModal = () => {
//     this.setState({ modalVisible: false });
//   };
//   likeForense = () => {
//     if (this.state.lan === "en") {
//       Alert.alert(
//         "Would you mind rating Wafarnalak?",
//         "It wont take more than a minute and helps to promote our app. Thanks for your support!",
//         [
//           { text: "RATE IT NOW", onPress: () => StoreReview.requestReview() },
//           {
//             text: "REMIND ME LATER",

//             style: "cancel"
//           },
//           {
//             text: "NO, THANKS",

//             style: "cancel"
//           }
//         ],
//         { cancelable: false }
//       );
//     } else {
//       Alert.alert(
//         "هلا تفضلت بتقييم وفرنا لك ؟",
//         "لن يستغرق الأمر اكثر من دقيقة والذي بدوره سيسهم في تحسين تطبيقنا، شكراً لدعمك",
//         [
//           {
//             text: "ذكرني بوقت اخر",

//             style: "cancel"
//           },
//           {
//             text: "لا، شكراً",

//             style: "cancel"
//           },
//           { text: "تقييم الآن", onPress: () => StoreReview.requestReview() }
//         ],
//         { cancelable: false }
//       );
//     }
//   };
//   rateForense = () => {
//     if (this.state.lan === "en") {
//       Alert.alert(
//         "Do you like using Wafarnalak?",
//         "",
//         [
//           {
//             text: "Ask me later"
//           },
//           {
//             text: "Not Really",

//             style: "cancel"
//           },
//           {
//             text: "Yes!",
//             onPress: () => this.likeForense()
//           }
//         ],
//         { cancelable: false }
//       );
//     } else {
//       Alert.alert(
//         "هل احببت استخدام وفرنا لك ؟",
//         "",
//         [
//           {
//             text: "ذكرني بوقت اخر"
//           },
//           {
//             text: "ليس صحيحاً",

//             style: "cancel"
//           },
//           {
//             text: "نعم",
//             onPress: () => this.likeForense()
//           }
//         ],
//         { cancelable: false }
//       );
//     }
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
//             screen: "myProfileScreen",
//             purpose: "checkout order from myProfile screen"
//           });
//         } else {
//           Toast.show({
//             text:
//               this.state.lan == "en"
//                 ? "Sorry, currently we are not delivering services in your city, soon we will be with you"
//                 : "سلة الطلبات فارغة",
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
//     if (option == 2) {
//       this.props.navigation.navigate("MyOrders", {
//         cartItem: this.state.cartItem,
//         lan: this.state.lan
//       });
//     }
//   };

//   changetoEnglish = async () => {
//     await AsyncStorage.setItem("lan", "en");
//     I18nManager.isRTL = false;
//     I18nManager.forceRTL(false);
//     await Updates.reloadAsync();
//     //this.updateLanguage(1);
//   };
//   changetoArabic = async () => {
//     await AsyncStorage.setItem("lan", "ar");
//     I18nManager.isRTL = true;
//     I18nManager.forceRTL(true);
//     await Updates.reloadAsync();
//     //this.updateLanguage(2);
//   };
//   render() {
//     return (
//       <View style={{ flex: 1 }}>
//         {/* <Header
//           style={{
//             marginTop: 0,
//             borderBottomWidth: 2,
//             borderBottomColor: "#0866b0",
//             backgroundColor: "#ffffff",
//             height: 60,
//             justifyContent: "center"
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
//               {this.state.lan == "en" ? "My Profile" : "ملفي الشخصي"}
//             </Title>
//           </View>
//           <Right />
//         </Header> */}
//         <View
//           style={{
//             width: "100%",
//             borderBottomWidth: 2,
//             borderBottomColor: "#0866b0",
//             backgroundColor: "#ffffff",
//             height: 60,
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center"
//           }}
//         >
//           <View
//             style={{
//               flex: 2,
//               justifyContent: "center",
//               alignItems: "center",
//               position: Platform.OS === "android" ? "absolute" : "relative",
//               alignSelf: "center"
//             }}
//           >
//             <Text
//               style={{
//                 fontFamily: "montserrat_semi_blod",
//                 color: "#0866b0",
//                 fontSize: 18
//               }}
//             >
//               {this.state.lan == "en" ? "My Profile" : "ملفي الشخصي"}
//             </Text>
//           </View>
//         </View>
//         {
//           <NavigationEvents
//             onWillFocus={() => {
//               this.componentDidMount();
//             }}
//           />
//         }

//         <LinearGradient
//           colors={["#0764af", "#6ea8cd"]}
//           start={[0.9, 0.2]}
//           end={[0.1, 0.1]}
//           style={{
//             width: Dimensions.get("screen").width,
//             height: Dimensions.get("screen").height - 110
//           }}
//         >
//           <ScrollView
//             contentContainerStyle={{
//               flexGrow: 1,
//               height: Dimensions.get("screen").height - 120,
//               flex: 1
//             }}
//           >
//             <ImageBackground
//               source={require("../assets/Profile-with-Stroke-min.png")}
//               style={{
//                 width: Dimensions.get("screen").width - 60,
//                 height: 210,
//                 alignSelf: "center",
//                 marginTop: 10
//               }}
//               resizeMode="contain"
//             >
//               {this.state.isLogin === true ? (
//                 <View
//                   style={{
//                     position: "absolute",
//                     right: 10,
//                     top: Platform.OS === "ios" ? 10 : 22
//                   }}
//                 >
//                   <Text style={{ color: "white" }}>{this.state.user.name}</Text>
//                   <TouchableOpacity onPress={this.logoutUser}>
//                     <View
//                       style={{
//                         backgroundColor: "#6ea8cd",
//                         width: 60,
//                         height: 16,
//                         borderRadius: 5,
//                         alignSelf: "flex-end"
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 10,
//                           alignSelf: "center",
//                           paddingTop: Platform.OS === "ios" ? 1 : 0,
//                           color: "white"
//                         }}
//                       >
//                         {this.state.lan == "en" ? "Log out" : "خروج"}
//                       </Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               ) : (
//                 <View></View>
//               )}
//             </ImageBackground>
//             <View
//               style={{
//                 backgroundColor: "white",
//                 width: Dimensions.get("screen").width - 64,
//                 marginTop: 15,
//                 borderRadius: 12,
//                 alignSelf: "center"
//               }}
//             >
//               {this.state.isLogin === true ? (
//                 <TouchableOpacity
//                   onPress={() =>
//                     this.props.navigation.navigate("ProfileUpdate", {
//                       user: this.state.user,
//                       lan: this.state.lan
//                     })
//                   }
//                 >
//                   <View>
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                         margin: 12,
//                         backgroundColor: "white"
//                       }}
//                     >
//                       <View style={{ flexDirection: "row" }}>
//                         <Image
//                           source={require("../assets/Profile-Icon/Profile-Icon-min.png")}
//                           style={{ width: 30, height: 30 }}
//                           resizeMode="contain"
//                         />
//                         <Text
//                           style={{
//                             paddingTop: 4,
//                             marginLeft: 16,
//                             color: "#4a4b4c"
//                           }}
//                         >
//                           {this.state.lan == "en" ? "Profile" : "ملفي الشخصي"}
//                         </Text>
//                       </View>
//                       <View style={{ paddingTop: 5 }}>
//                         <Ionicons
//                           name={
//                             this.state.lan == "en"
//                               ? "chevron-forward-outline"
//                               : "chevron-back-outline"
//                           }
//                           size={24}
//                           color={"#6ea8cd"}
//                         />
//                       </View>
//                     </View>
//                     <View
//                       style={{
//                         height: 1,
//                         backgroundColor: "lightgray",
//                         width: Dimensions.get("screen").width - 64
//                       }}
//                     ></View>
//                   </View>
//                 </TouchableOpacity>
//               ) : (
//                 <View></View>
//               )}
//               <TouchableOpacity onPress={this.displayLanguageModal}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     margin: 12,
//                     backgroundColor: "white"
//                   }}
//                 >
//                   <View style={{ flexDirection: "row" }}>
//                     <Image
//                       source={require("../assets/Profile-Icon/Change-Language-min.png")}
//                       style={{ width: 30, height: 30 }}
//                       resizeMode="contain"
//                     />
//                     <Text
//                       style={{
//                         paddingTop: 4,
//                         marginLeft: 16,
//                         color: "#4a4b4c"
//                       }}
//                     >
//                       {this.state.lan == "en"
//                         ? "Change Language"
//                         : "تغيير اللغة"}
//                     </Text>
//                   </View>
//                   <View style={{ paddingTop: 5 }}>
//                     <Ionicons
//                       name={
//                         this.state.lan == "en"
//                           ? "chevron-forward-outline"
//                           : "chevron-back-outline"
//                       }
//                       size={24}
//                       color={"#6ea8cd"}
//                     />
//                   </View>
//                 </View>
//               </TouchableOpacity>
//               <View
//                 style={{
//                   height: 1,
//                   backgroundColor: "lightgray",
//                   width: Dimensions.get("screen").width - 64
//                 }}
//               ></View>
//               <TouchableOpacity
//                 onPress={() =>
//                   this.props.navigation.navigate("HelpScreen", {
//                     lan: this.state.lan
//                   })
//                 }
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     margin: 12,
//                     backgroundColor: "white"
//                   }}
//                 >
//                   <View style={{ flexDirection: "row" }}>
//                     <Image
//                       source={require("../assets/Profile-Icon/Help-min.png")}
//                       style={{ width: 30, height: 30 }}
//                       resizeMode="contain"
//                     />
//                     <Text
//                       style={{
//                         paddingTop: 4,
//                         marginLeft: 20,
//                         color: "#4a4b4c"
//                       }}
//                     >
//                       {this.state.lan == "en" ? "Help" : "مساعدة"}
//                     </Text>
//                   </View>
//                   <View style={{ paddingTop: 5 }}>
//                     <Ionicons
//                       name={
//                         this.state.lan == "en"
//                           ? "chevron-forward-outline"
//                           : "chevron-back-outline"
//                       }
//                       size={24}
//                       color={"#6ea8cd"}
//                     />
//                   </View>
//                 </View>
//               </TouchableOpacity>
//               <View
//                 style={{
//                   height: 1,
//                   backgroundColor: "lightgray",
//                   width: Dimensions.get("screen").width - 64
//                 }}
//               ></View>
//               <TouchableOpacity
//                 onPress={() =>
//                   this.props.navigation.navigate("AboutScreen", {
//                     lan: this.state.lan
//                   })
//                 }
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     margin: 12,
//                     backgroundColor: "white"
//                   }}
//                 >
//                   <View style={{ flexDirection: "row" }}>
//                     <Image
//                       source={require("../assets/Profile-Icon/About-min.png")}
//                       style={{ width: 30, height: 30 }}
//                       resizeMode="contain"
//                     />
//                     <Text
//                       style={{
//                         paddingTop: 4,
//                         marginLeft: 20,
//                         color: "#4a4b4c"
//                       }}
//                     >
//                       {this.state.lan == "en"
//                         ? "About Wafarnalak"
//                         : "عن وفرنا لك"}
//                     </Text>
//                   </View>
//                   <View style={{ paddingTop: 5 }}>
//                     <Ionicons
//                       name={
//                         this.state.lan == "en"
//                           ? "chevron-forward-outline"
//                           : "chevron-back-outline"
//                       }
//                       size={24}
//                       color={"#6ea8cd"}
//                     />
//                   </View>
//                 </View>
//               </TouchableOpacity>
//               <View
//                 style={{
//                   height: 1,
//                   backgroundColor: "lightgray",
//                   width: Dimensions.get("screen").width - 64
//                 }}
//               ></View>
//               <TouchableOpacity onPress={this.rateForense}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     margin: 12,
//                     backgroundColor: "white"
//                   }}
//                 >
//                   <View style={{ flexDirection: "row" }}>
//                     <Image
//                       source={require("../assets/Profile-Icon/Rate-min.png")}
//                       style={{ width: 30, height: 30 }}
//                       resizeMode="contain"
//                     />
//                     <Text
//                       style={{
//                         paddingTop: 4,
//                         marginLeft: 20,
//                         color: "#4a4b4c"
//                       }}
//                     >
//                       {this.state.lan == "en"
//                         ? "Rate Wafarnalak"
//                         : "قيٌم وفرنا لك"}
//                     </Text>
//                   </View>
//                   <View style={{ paddingTop: 5 }}>
//                     <Ionicons
//                       name={
//                         this.state.lan == "en"
//                           ? "chevron-forward-outline"
//                           : "chevron-back-outline"
//                       }
//                       size={24}
//                       color={"#6ea8cd"}
//                     />
//                   </View>
//                 </View>
//               </TouchableOpacity>

//               {this.state.isLogin === true ? (
//                 <View>
//                   <View
//                     style={{
//                       height: 1,
//                       backgroundColor: "lightgray",
//                       width: Dimensions.get("screen").width - 64
//                     }}
//                   ></View>
//                   <TouchableOpacity
//                     onPress={() =>
//                       this.props.navigation.navigate("MyOrdersSecreen")
//                     }
//                   >
//                     <TouchableOpacity
//                       onPress={() =>
//                         this.props.navigation.navigate("PointsScreen", {
//                           lan: this.state.lan
//                         })
//                       }
//                     >
//                       <View
//                         style={{
//                           flexDirection: "row",
//                           justifyContent: "space-between",
//                           margin: 12,
//                           backgroundColor: "white"
//                         }}
//                       >
//                         <View style={{ flexDirection: "row" }}>
//                           <Image
//                             source={require("../assets/Profile-Icon/Points-min.png")}
//                             style={{ width: 30, height: 30 }}
//                             resizeMode="contain"
//                           />
//                           <Text
//                             style={{
//                               paddingTop: 4,
//                               marginLeft: 20,
//                               color: "#4a4b4c"
//                             }}
//                           >
//                             {this.state.lan == "en"
//                               ? "Wafarnalak Points"
//                               : "نقاط وفرنا لك"}
//                           </Text>
//                         </View>
//                         <View style={{ paddingTop: 5 }}>
//                           <Ionicons
//                             name={
//                               this.state.lan == "en"
//                                 ? "chevron-forward-outline"
//                                 : "chevron-back-outline"
//                             }
//                             size={24}
//                             color={"#6ea8cd"}
//                           />
//                         </View>
//                       </View>
//                     </TouchableOpacity>
//                   </TouchableOpacity>
//                   <View
//                     style={{
//                       height: 1,
//                       backgroundColor: "lightgray",
//                       width: Dimensions.get("screen").width - 64
//                     }}
//                   ></View>
//                 </View>
//               ) : (
//                 <View></View>
//               )}

//               {this.state.isLogin === true ? (
//                 <TouchableOpacity
//                   onPress={() =>
//                     this.props.navigation.navigate("ReferralScreen", {
//                       user: this.state.user,
//                       lan: this.state.lan
//                     })
//                   }
//                 >
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       margin: 12,
//                       backgroundColor: "white"
//                     }}
//                   >
//                     <View style={{ flexDirection: "row" }}>
//                       <Image
//                         source={require("../assets/Profile-Icon/Referral-min.png")}
//                         style={{ width: 30, height: 30 }}
//                         resizeMode="contain"
//                       />
//                       <Text
//                         style={{
//                           paddingTop: 4,
//                           marginLeft: 20,
//                           color: "#4a4b4c"
//                         }}
//                       >
//                         {this.state.lan == "en"
//                           ? "Wafarnalak Referral"
//                           : "إحالة وفرنا لك (رمز الدعوة)"}
//                       </Text>
//                     </View>
//                     <View style={{ paddingTop: 5 }}>
//                       <Ionicons
//                         name={
//                           this.state.lan == "en"
//                             ? "chevron-forward-outline"
//                             : "chevron-back-outline"
//                         }
//                         size={24}
//                         color={"#6ea8cd"}
//                       />
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               ) : (
//                 <View></View>
//               )}
//             </View>
//             {this.state.isLogin === false ? (
//               <TouchableOpacity onPress={this.authenticateUser}>
//                 <View
//                   style={{
//                     backgroundColor: "#6ea8cd",
//                     borderRadius: 12,
//                     width: Dimensions.get("screen").width - 120,
//                     alignSelf: "center",
//                     marginTop: 15
//                   }}
//                 >
//                   <Text
//                     style={{ color: "white", margin: 12, alignSelf: "center" }}
//                   >
//                     {this.state.lan == "en" ? "Sign In" : "دخول"}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             ) : (
//               <View></View>
//             )}
//             <Modal
//               animationType="slide"
//               transparent={true}
//               visible={this.state.modalVisible}
//             >
//               <View
//                 style={{
//                   marginTop: 220,
//                   height: 255,
//                   borderRadius: 20,
//                   width: 350,
//                   backgroundColor: "#0764af",
//                   alignSelf: "center"
//                 }}
//               >
//                 <View style={{ flex: 1, alignSelf: "center", marginTop: -24 }}>
//                   <Thumbnail source={require("../assets/Icon2.png")} />
//                 </View>
//                 <View style={{ position: "absolute", right: 6, top: 10 }}>
//                   <Ionicons
//                     onPress={this.hideModal}
//                     name="ios-close-circle-outline"
//                     size={35}
//                     color="red"
//                   />
//                 </View>
//                 <View
//                   style={{ alignSelf: "center", position: "absolute", top: 50 }}
//                 >
//                   {this.state.lan === "en" ? (
//                     <Text
//                       style={{
//                         color: "white",
//                         fontSize: 20,
//                         fontWeight: "bold"
//                       }}
//                     >
//                       Select Language
//                     </Text>
//                   ) : (
//                     <Text
//                       style={{
//                         fontFamily: "montserrat_semi_blod",
//                         color: "white",
//                         fontSize: 30
//                       }}
//                     >
//                       اختار اللغة
//                     </Text>
//                   )}
//                 </View>
//                 <View
//                   style={{
//                     alignSelf: "center",
//                     position: "absolute",
//                     top: 100
//                   }}
//                 >
//                   <Button
//                     style={{
//                       width: 250,
//                       borderRadius: 12,
//                       height: 40,
//                       backgroundColor: "#4e9fd1",
//                       top: 0
//                     }}
//                     onPress={this.changetoEnglish}
//                   >
//                     <View
//                       style={{
//                         flex: 1,
//                         alignSelf: "center",
//                         alignItems: "center"
//                       }}
//                     >
//                       <Text style={{ color: "white" }}>English</Text>
//                     </View>
//                   </Button>
//                   <Button
//                     style={{
//                       width: 250,
//                       borderRadius: 12,
//                       height: 40,
//                       backgroundColor: "#4e9fd1",
//                       top: 14
//                     }}
//                     onPress={this.changetoArabic}
//                   >
//                     <View
//                       style={{
//                         flex: 1,
//                         alignSelf: "center",
//                         alignItems: "center"
//                       }}
//                     >
//                       <Text
//                         style={{
//                           color: "white",

//                           alignItems: "center"
//                         }}
//                       >
//                         العربية
//                       </Text>
//                     </View>
//                   </Button>
//                 </View>
//               </View>
//             </Modal>
//           </ScrollView>
//         </LinearGradient>

//         <View
//           style={{
//             flexDirection: "row",
//             height: 50,
//             alignSelf: "center",
//             justifyContent: "space-between",
//             width: "100%",
//             position: "absolute",
//             alignItems: "flex-end",
//             bottom: 0,
//             left: 0,
//             backgroundColor: "white",
//             paddingHorizontal: 12
//           }}
//         >
//           <TouchableOpacity onPress={() => this.navigationSetup(1)}>
//             <View>
//               <View style={{ alignSelf: "center" }}>
//                 <Ionicons name="md-apps" size={28} color={"#ccc"} />
//               </View>
//               <Text
//                 style={{ textAlign: "center", fontSize: 12, color: "#ccc" }}
//               >
//                 {this.state.lan == "en" ? "Categories" : "فئات الخدمات"}
//               </Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => this.navigationSetup(2)}>
//             <View>
//               <View style={{ alignSelf: "center" }}>
//                 <Image
//                   resizeMode="contain"
//                   source={require("../assets/myOrder.png")}
//                   style={{ height: 29, width: 30 }}
//                 />
//               </View>
//               <Text
//                 style={{
//                   textAlign: "center",
//                   fontSize: 12,
//                   color: "#ccc"
//                 }}
//               >
//                 {this.state.lan == "en" ? "My Orders" : "طلباتي"}
//               </Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => this.navigationSetup(3)}>
//             <View>
//               <View style={{ alignSelf: "center", flexDirection: "row" }}>
//                 <Ionicons name="md-cart" size={28} color={"#ccc"} />
//                 {this.state.cartItem > 0 ? (
//                   <Badge
//                     danger
//                     style={{ height: 20, width: 20, borderRadius: 10 }}
//                   >
//                     <View
//                       style={{
//                         left: 0,
//                         right: 0,
//                         bottom: 0,
//                         top: 0,
//                         position: "absolute"
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 10,

//                           justifyContent: "center"
//                         }}
//                       >
//                         {this.state.cartItem}
//                       </Text>
//                     </View>
//                   </Badge>
//                 ) : (
//                   <View></View>
//                 )}
//               </View>
//               <Text
//                 style={{ textAlign: "center", fontSize: 12, color: "#ccc" }}
//               >
//                 {this.state.lan == "en" ? "My Cart" : "سلة الطلب خاصتي"}
//               </Text>
//             </View>
//           </TouchableOpacity>
//           <View>
//             <View style={{ alignSelf: "center" }}>
//               <View style={{ flexDirection: "row" }}>
//                 <Ionicons
//                   name={
//                     this.state.isLogin == true
//                       ? "ios-person"
//                       : "ios-information-circle"
//                   }
//                   size={28}
//                   color={"#0865b0"}
//                 />
//                 {(this.state.user && this.state.user.name == "") ||
//                 (this.state.user && this.state.user.name == null) ||
//                 (this.state.user && this.state.user.email == "") ||
//                 (this.state.user && this.state.user.email == null) ? (
//                   <View
//                     style={{
//                       width: 4,
//                       height: 4,
//                       borderRadius: 2,
//                       backgroundColor: "red"
//                     }}
//                   ></View>
//                 ) : (
//                   <View></View>
//                 )}
//               </View>
//             </View>
//             <Text
//               style={{ textAlign: "center", fontSize: 12, color: "#0865b0" }}
//             >
//               {this.state.isLogin == true
//                 ? this.state.lan == "en"
//                   ? "My Profile"
//                   : "ملفي الشخصي"
//                 : this.state.lan == "en"
//                 ? "About"
//                 : "المزيد"}
//             </Text>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// import React from "react";
// import {
//   View,
//   Image,
//   Platform,
//   Dimensions,
//   Modal,
//   Alert,
//   ImageBackground,
//   TouchableOpacity,
//   AsyncStorage,
//   I18nManager
// } from "react-native";
// import {
//   Container,
//   Accordion,
//   Toast,
//   Title,
//   Header,
//   Content,
//   Thumbnail,
//   Button,
//   Text,
//   Badge,
//   Left,
//   Right,
//   Footer
// } from "native-base";
// import * as StoreReview from "expo-store-review";
// import { Ionicons } from "@expo/vector-icons";
// import * as Updates from "expo-updates";
// import * as Notifications from "expo-notifications";
// import { LinearGradient } from "expo-linear-gradient";
// import { NavigationEvents } from "react-navigation";
// import * as Analytics from "expo-firebase-analytics";

// export default class ProfileSecreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isLogin: false,
//       modalVisible: false,
//       lan: "en",
//       user: {},
//       cartItem: 0,
//       location: ""
//     };
//   }
//   componentDidMount = async () => {
//     const { navigation } = this.props;
//     let user = await AsyncStorage.getItem("user");
//     if (user !== null) {
//       this.setState({
//         cartItem: navigation.getParam("cartItem"),
//         user: JSON.parse(user),
//         isLogin: true,
//         lan: navigation.getParam("lan"),
//         location: navigation.getParam("location")
//       });
//     } else {
//       this.setState({ lan: navigation.getParam("lan") });
//     }
//   };
//   logoutUser = async () => {
//     await AsyncStorage.removeItem("user");
//     await AsyncStorage.removeItem("jobs");
//     await AsyncStorage.removeItem("address");
//     this.setState({ isLogin: false, cartItem: 0 });
//   };
//   authenticateUser = () => {
//     this.props.navigation.navigate("Login", { lan: this.state.lan });
//   };
//   displayLanguageModal = () => {
//     this.setState({ modalVisible: true });
//   };
//   hideModal = () => {
//     this.setState({ modalVisible: false });
//   };
//   likeForense = () => {
//     if (this.state.lan === "en") {
//       Alert.alert(
//         "Would you mind rating Wafarnalak?",
//         "It wont take more than a minute and helps to promote our app. Thanks for your support!",
//         [
//           { text: "RATE IT NOW", onPress: () => StoreReview.requestReview() },
//           {
//             text: "REMIND ME LATER",

//             style: "cancel"
//           },
//           {
//             text: "NO, THANKS",

//             style: "cancel"
//           }
//         ],
//         { cancelable: false }
//       );
//     } else {
//       Alert.alert(
//         "هلا تفضلت بتقييم وفرنا لك ؟",
//         "لن يستغرق الأمر اكثر من دقيقة والذي بدوره سيسهم في تحسين تطبيقنا، شكراً لدعمك",
//         [
//           {
//             text: "ذكرني بوقت اخر",

//             style: "cancel"
//           },
//           {
//             text: "لا، شكراً",

//             style: "cancel"
//           },
//           { text: "تقييم الآن", onPress: () => StoreReview.requestReview() }
//         ],
//         { cancelable: false }
//       );
//     }
//   };
//   rateForense = () => {
//     if (this.state.lan === "en") {
//       Alert.alert(
//         "Do you like using Wafarnalak?",
//         "",
//         [
//           {
//             text: "Ask me later"
//           },
//           {
//             text: "Not Really",

//             style: "cancel"
//           },
//           {
//             text: "Yes!",
//             onPress: () => this.likeForense()
//           }
//         ],
//         { cancelable: false }
//       );
//     } else {
//       Alert.alert(
//         "هل احببت استخدام وفرنا لك ؟",
//         "",
//         [
//           {
//             text: "ذكرني بوقت اخر"
//           },
//           {
//             text: "ليس صحيحاً",

//             style: "cancel"
//           },
//           {
//             text: "نعم",
//             onPress: () => this.likeForense()
//           }
//         ],
//         { cancelable: false }
//       );
//     }
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
//             screen: "myProfileScreen",
//             purpose: "checkout order from myProfile screen"
//           });
//         } else {
//           Toast.show({
//             text:
//               this.state.lan == "en"
//                 ? "Sorry, currently we are not delivering services in your city, soon we will be with you"
//                 : "سلة الطلبات فارغة",
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
//     if (option == 2) {
//       this.props.navigation.navigate("MyOrders", {
//         cartItem: this.state.cartItem,
//         lan: this.state.lan
//       });
//     }
//   };

//   changetoEnglish = async () => {
//     await AsyncStorage.setItem("lan", "en");
//     I18nManager.isRTL = false;
//     I18nManager.forceRTL(false);
//     await Updates.reloadAsync();
//     //this.updateLanguage(1);
//   };
//   changetoArabic = async () => {
//     await AsyncStorage.setItem("lan", "ar");
//     I18nManager.isRTL = true;
//     I18nManager.forceRTL(true);
//     await Updates.reloadAsync();
//     //this.updateLanguage(2);
//   };
//   render() {
//     return (
//       <Container>
//         <Header
//           style={{
//             marginTop: 0,
//             borderBottomWidth: 2,
//             borderBottomColor: "#0866b0",
//             backgroundColor: "#ffffff",
//             height: 60,
//             justifyContent: "center"
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
//               {this.state.lan == "en" ? "My Profile" : "ملفي الشخصي"}
//             </Title>
//           </View>
//           <Right />
//         </Header>
//         <Content>
//           {
//             <NavigationEvents
//               onWillFocus={() => {
//                 this.componentDidMount();
//               }}
//             />
//           }
//           <LinearGradient
//             colors={["#0764af", "#6ea8cd"]}
//             start={[0.9, 0.2]}
//             end={[0.1, 0.1]}
//             style={{
//               width: Dimensions.get("screen").width,
//               height: Dimensions.get("screen").height - 80
//             }}
//           >
//             <View>
//               <ImageBackground
//                 source={require("../assets/Profile-with-Stroke-min.png")}
//                 style={{
//                   width: Dimensions.get("screen").width - 60,
//                   height: 210,
//                   alignSelf: "center",
//                   marginTop: 15
//                 }}
//                 resizeMode="contain"
//               >
//                 {this.state.isLogin === true ? (
//                   <View
//                     style={{
//                       position: "absolute",
//                       right: 10,
//                       top: Platform.OS === "ios" ? 10 : 22
//                     }}
//                   >
//                     <Text style={{ color: "white" }}>
//                       {this.state.user.name}
//                     </Text>
//                     <TouchableOpacity onPress={this.logoutUser}>
//                       <View
//                         style={{
//                           backgroundColor: "#6ea8cd",
//                           width: 60,
//                           height: 16,
//                           borderRadius: 5,
//                           alignSelf: "flex-end"
//                         }}
//                       >
//                         <Text
//                           style={{
//                             fontSize: 10,
//                             alignSelf: "center",
//                             paddingTop: Platform.OS === "ios" ? 1 : 0,
//                             color: "white"
//                           }}
//                         >
//                           {this.state.lan == "en" ? "Log out" : "خروج"}
//                         </Text>
//                       </View>
//                     </TouchableOpacity>
//                   </View>
//                 ) : (
//                   <View></View>
//                 )}
//               </ImageBackground>
//             </View>
//             <View
//               style={{
//                 backgroundColor: "white",
//                 width: Dimensions.get("screen").width - 64,
//                 marginTop: 15,
//                 borderRadius: 12,
//                 alignSelf: "center"
//               }}
//             >
//               {this.state.isLogin === true ? (
//                 <TouchableOpacity
//                   onPress={() =>
//                     this.props.navigation.navigate("ProfileUpdate", {
//                       user: this.state.user,
//                       lan: this.state.lan
//                     })
//                   }
//                 >
//                   <View>
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                         margin: 12,
//                         backgroundColor: "white"
//                       }}
//                     >
//                       <View style={{ flexDirection: "row" }}>
//                         <Image
//                           source={require("../assets/Profile-Icon/Profile-Icon-min.png")}
//                           style={{ width: 30, height: 30 }}
//                           resizeMode="contain"
//                         />
//                         <Text
//                           style={{
//                             paddingTop: 4,
//                             marginLeft: 16,
//                             color: "#4a4b4c"
//                           }}
//                         >
//                           {this.state.lan == "en" ? "Profile" : "ملفي الشخصي"}
//                         </Text>
//                       </View>
//                       <View style={{ paddingTop: 5 }}>
//                         <Ionicons
//                           name={
//                             this.state.lan == "en"
//                               ? "chevron-forward-outline"
//                               : "chevron-back-outline"
//                           }
//                           size={24}
//                           color={"#6ea8cd"}
//                         />
//                       </View>
//                     </View>
//                     <View
//                       style={{
//                         height: 1,
//                         backgroundColor: "lightgray",
//                         width: Dimensions.get("screen").width - 64
//                       }}
//                     ></View>
//                   </View>
//                 </TouchableOpacity>
//               ) : (
//                 <View></View>
//               )}
//               <TouchableOpacity onPress={this.displayLanguageModal}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     margin: 12,
//                     backgroundColor: "white"
//                   }}
//                 >
//                   <View style={{ flexDirection: "row" }}>
//                     <Image
//                       source={require("../assets/Profile-Icon/Change-Language-min.png")}
//                       style={{ width: 30, height: 30 }}
//                       resizeMode="contain"
//                     />
//                     <Text
//                       style={{
//                         paddingTop: 4,
//                         marginLeft: 16,
//                         color: "#4a4b4c"
//                       }}
//                     >
//                       {this.state.lan == "en"
//                         ? "Change Language"
//                         : "تغيير اللغة"}
//                     </Text>
//                   </View>
//                   <View style={{ paddingTop: 5 }}>
//                     <Ionicons
//                       name={
//                         this.state.lan == "en"
//                           ? "chevron-forward-outline"
//                           : "chevron-back-outline"
//                       }
//                       size={24}
//                       color={"#6ea8cd"}
//                     />
//                   </View>
//                 </View>
//               </TouchableOpacity>
//               <View
//                 style={{
//                   height: 1,
//                   backgroundColor: "lightgray",
//                   width: Dimensions.get("screen").width - 64
//                 }}
//               ></View>
//               <TouchableOpacity
//                 onPress={() =>
//                   this.props.navigation.navigate("HelpScreen", {
//                     lan: this.state.lan
//                   })
//                 }
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     margin: 12,
//                     backgroundColor: "white"
//                   }}
//                 >
//                   <View style={{ flexDirection: "row" }}>
//                     <Image
//                       source={require("../assets/Profile-Icon/Help-min.png")}
//                       style={{ width: 30, height: 30 }}
//                       resizeMode="contain"
//                     />
//                     <Text
//                       style={{
//                         paddingTop: 4,
//                         marginLeft: 20,
//                         color: "#4a4b4c"
//                       }}
//                     >
//                       {this.state.lan == "en" ? "Help" : "مساعدة"}
//                     </Text>
//                   </View>
//                   <View style={{ paddingTop: 5 }}>
//                     <Ionicons
//                       name={
//                         this.state.lan == "en"
//                           ? "chevron-forward-outline"
//                           : "chevron-back-outline"
//                       }
//                       size={24}
//                       color={"#6ea8cd"}
//                     />
//                   </View>
//                 </View>
//               </TouchableOpacity>
//               <View
//                 style={{
//                   height: 1,
//                   backgroundColor: "lightgray",
//                   width: Dimensions.get("screen").width - 64
//                 }}
//               ></View>
//               <TouchableOpacity
//                 onPress={() =>
//                   this.props.navigation.navigate("AboutScreen", {
//                     lan: this.state.lan
//                   })
//                 }
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     margin: 12,
//                     backgroundColor: "white"
//                   }}
//                 >
//                   <View style={{ flexDirection: "row" }}>
//                     <Image
//                       source={require("../assets/Profile-Icon/About-min.png")}
//                       style={{ width: 30, height: 30 }}
//                       resizeMode="contain"
//                     />
//                     <Text
//                       style={{
//                         paddingTop: 4,
//                         marginLeft: 20,
//                         color: "#4a4b4c"
//                       }}
//                     >
//                       {this.state.lan == "en"
//                         ? "About Wafarnalak"
//                         : "عن وفرنا لك"}
//                     </Text>
//                   </View>
//                   <View style={{ paddingTop: 5 }}>
//                     <Ionicons
//                       name={
//                         this.state.lan == "en"
//                           ? "chevron-forward-outline"
//                           : "chevron-back-outline"
//                       }
//                       size={24}
//                       color={"#6ea8cd"}
//                     />
//                   </View>
//                 </View>
//               </TouchableOpacity>
//               <View
//                 style={{
//                   height: 1,
//                   backgroundColor: "lightgray",
//                   width: Dimensions.get("screen").width - 64
//                 }}
//               ></View>
//               <TouchableOpacity onPress={this.rateForense}>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     margin: 12,
//                     backgroundColor: "white"
//                   }}
//                 >
//                   <View style={{ flexDirection: "row" }}>
//                     <Image
//                       source={require("../assets/Profile-Icon/Rate-min.png")}
//                       style={{ width: 30, height: 30 }}
//                       resizeMode="contain"
//                     />
//                     <Text
//                       style={{
//                         paddingTop: 4,
//                         marginLeft: 20,
//                         color: "#4a4b4c"
//                       }}
//                     >
//                       {this.state.lan == "en"
//                         ? "Rate Wafarnalak"
//                         : "قيٌم وفرنا لك"}
//                     </Text>
//                   </View>
//                   <View style={{ paddingTop: 5 }}>
//                     <Ionicons
//                       name={
//                         this.state.lan == "en"
//                           ? "chevron-forward-outline"
//                           : "chevron-back-outline"
//                       }
//                       size={24}
//                       color={"#6ea8cd"}
//                     />
//                   </View>
//                 </View>
//               </TouchableOpacity>

//               {this.state.isLogin === true ? (
//                 <View>
//                   <View
//                     style={{
//                       height: 1,
//                       backgroundColor: "lightgray",
//                       width: Dimensions.get("screen").width - 64
//                     }}
//                   ></View>
//                   <TouchableOpacity
//                     onPress={() =>
//                       this.props.navigation.navigate("MyOrdersSecreen")
//                     }
//                   >
//                     <TouchableOpacity
//                       onPress={() =>
//                         this.props.navigation.navigate("PointsScreen", {
//                           lan: this.state.lan
//                         })
//                       }
//                     >
//                       <View
//                         style={{
//                           flexDirection: "row",
//                           justifyContent: "space-between",
//                           margin: 12,
//                           backgroundColor: "white"
//                         }}
//                       >
//                         <View style={{ flexDirection: "row" }}>
//                           <Image
//                             source={require("../assets/Profile-Icon/Points-min.png")}
//                             style={{ width: 30, height: 30 }}
//                             resizeMode="contain"
//                           />
//                           <Text
//                             style={{
//                               paddingTop: 4,
//                               marginLeft: 20,
//                               color: "#4a4b4c"
//                             }}
//                           >
//                             {this.state.lan == "en"
//                               ? "Wafarnalak Points"
//                               : "نقاط وفرنا لك"}
//                           </Text>
//                         </View>
//                         <View style={{ paddingTop: 5 }}>
//                           <Ionicons
//                             name={
//                               this.state.lan == "en"
//                                 ? "chevron-forward-outline"
//                                 : "chevron-back-outline"
//                             }
//                             size={24}
//                             color={"#6ea8cd"}
//                           />
//                         </View>
//                       </View>
//                     </TouchableOpacity>
//                   </TouchableOpacity>
//                   <View
//                     style={{
//                       height: 1,
//                       backgroundColor: "lightgray",
//                       width: Dimensions.get("screen").width - 64
//                     }}
//                   ></View>
//                 </View>
//               ) : (
//                 <View></View>
//               )}

//               {this.state.isLogin === true ? (
//                 <TouchableOpacity
//                   onPress={() =>
//                     this.props.navigation.navigate("ReferralScreen", {
//                       user: this.state.user,
//                       lan: this.state.lan
//                     })
//                   }
//                 >
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       margin: 12,
//                       backgroundColor: "white"
//                     }}
//                   >
//                     <View style={{ flexDirection: "row" }}>
//                       <Image
//                         source={require("../assets/Profile-Icon/Referral-min.png")}
//                         style={{ width: 30, height: 30 }}
//                         resizeMode="contain"
//                       />
//                       <Text
//                         style={{
//                           paddingTop: 4,
//                           marginLeft: 20,
//                           color: "#4a4b4c"
//                         }}
//                       >
//                         {this.state.lan == "en"
//                           ? "Wafarnalak Referral"
//                           : "إحالة وفرنا لك (رمز الدعوة)"}
//                       </Text>
//                     </View>
//                     <View style={{ paddingTop: 5 }}>
//                       <Ionicons
//                         name={
//                           this.state.lan == "en"
//                             ? "chevron-forward-outline"
//                             : "chevron-back-outline"
//                         }
//                         size={24}
//                         color={"#6ea8cd"}
//                       />
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               ) : (
//                 <View></View>
//               )}
//             </View>
//             {this.state.isLogin === false ? (
//               <TouchableOpacity onPress={this.authenticateUser}>
//                 <View
//                   style={{
//                     backgroundColor: "#6ea8cd",
//                     borderRadius: 12,
//                     width: Dimensions.get("screen").width - 120,
//                     alignSelf: "center",
//                     marginTop: 15
//                   }}
//                 >
//                   <Text
//                     style={{ color: "white", margin: 12, alignSelf: "center" }}
//                   >
//                     {this.state.lan == "en" ? "Sign In" : "دخول"}
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             ) : (
//               <View></View>
//             )}
//           </LinearGradient>
//           <Modal
//             animationType="slide"
//             transparent={true}
//             visible={this.state.modalVisible}
//           >
//             <View
//               style={{
//                 marginTop: 220,
//                 height: 255,
//                 borderRadius: 20,
//                 width: 350,
//                 backgroundColor: "#0764af",
//                 alignSelf: "center"
//               }}
//             >
//               <View style={{ flex: 1, alignSelf: "center", marginTop: -24 }}>
//                 <Thumbnail source={require("../assets/Icon2.png")} />
//               </View>
//               <View style={{ position: "absolute", right: 6, top: 10 }}>
//                 <Ionicons
//                   onPress={this.hideModal}
//                   name="ios-close-circle-outline"
//                   size={35}
//                   color="red"
//                 />
//               </View>
//               <View
//                 style={{ alignSelf: "center", position: "absolute", top: 50 }}
//               >
//                 {this.state.lan === "en" ? (
//                   <Text
//                     style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
//                   >
//                     Select Language
//                   </Text>
//                 ) : (
//                   <Text
//                     style={{
//                       fontFamily: "montserrat_semi_blod",
//                       color: "white",
//                       fontSize: 30
//                     }}
//                   >
//                     اختار اللغة
//                   </Text>
//                 )}
//               </View>
//               <View
//                 style={{ alignSelf: "center", position: "absolute", top: 100 }}
//               >
//                 <Button
//                   style={{
//                     width: 250,
//                     borderRadius: 12,
//                     height: 40,
//                     backgroundColor: "#4e9fd1",
//                     top: 0
//                   }}
//                   onPress={this.changetoEnglish}
//                 >
//                   <View
//                     style={{
//                       flex: 1,
//                       alignSelf: "center",
//                       alignItems: "center"
//                     }}
//                   >
//                     <Text style={{ color: "white" }}>English</Text>
//                   </View>
//                 </Button>
//                 <Button
//                   style={{
//                     width: 250,
//                     borderRadius: 12,
//                     height: 40,
//                     backgroundColor: "#4e9fd1",
//                     top: 14
//                   }}
//                   onPress={this.changetoArabic}
//                 >
//                   <View
//                     style={{
//                       flex: 1,
//                       alignSelf: "center",
//                       alignItems: "center"
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color: "white",

//                         alignItems: "center"
//                       }}
//                     >
//                       العربية
//                     </Text>
//                   </View>
//                 </Button>
//               </View>
//             </View>
//           </Modal>
//         </Content>
//         <Footer style={{ backgroundColor: "white" }}>
//           <View
//             style={{
//               flexDirection: "row",
//               flex: 1,
//               alignSelf: "center",
//               justifyContent: "space-between",
//               margin: 12
//             }}
//           >
//             <TouchableOpacity onPress={() => this.navigationSetup(1)}>
//               <View>
//                 <View style={{ alignSelf: "center" }}>
//                   <Ionicons name="md-apps" size={26} color={"#ccc"} />
//                 </View>
//                 <Text
//                   style={{ textAlign: "center", fontSize: 12, color: "#ccc" }}
//                 >
//                   {this.state.lan == "en" ? "Categories" : "فئات الخدمات"}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => this.navigationSetup(2)}>
//               <View>
//                 <View style={{ alignSelf: "center" }}>
//                   <Ionicons name="ios-list-box" size={26} color={"#ccc"} />
//                 </View>
//                 <Text
//                   style={{
//                     textAlign: "center",
//                     fontSize: 12,
//                     color: "#ccc"
//                   }}
//                 >
//                   {this.state.lan == "en" ? "My Orders" : "طلباتي"}
//                 </Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => this.navigationSetup(3)}>
//               <View>
//                 <View style={{ alignSelf: "center", flexDirection: "row" }}>
//                   <Ionicons name="md-cart" size={26} color={"#ccc"} />
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
//             <View>
//               <View style={{ alignSelf: "center" }}>
//                 <View style={{ flexDirection: "row" }}>
//                   <Ionicons
//                     name={
//                       this.state.isLogin == true
//                         ? "ios-person"
//                         : "ios-information-circle"
//                     }
//                     size={26}
//                     color={"#0865b0"}
//                   />
//                   {(this.state.user && this.state.user.name == "") ||
//                   (this.state.user && this.state.user.name == null) ||
//                   (this.state.user && this.state.user.email == "") ||
//                   (this.state.user && this.state.user.email == null) ? (
//                     <View
//                       style={{
//                         width: 4,
//                         height: 4,
//                         borderRadius: 2,
//                         backgroundColor: "red"
//                       }}
//                     ></View>
//                   ) : (
//                     <View></View>
//                   )}
//                 </View>
//               </View>
//               <Text
//                 style={{ textAlign: "center", fontSize: 12, color: "#0865b0" }}
//               >
//                 {this.state.isLogin == true
//                   ? this.state.lan == "en"
//                     ? "My Profile"
//                     : "ملفي الشخصي"
//                   : this.state.lan == "en"
//                   ? "About"
//                   : "المزيد"}
//               </Text>
//             </View>
//           </View>
//         </Footer>
//       </Container>
//     );
//   }
// }

import React from "react";
import {
  View,
  Image,
  Platform,
  Dimensions,
  Modal,
  Alert,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  I18nManager,
  ScrollView
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
  Text,
  Badge,
  Left,
  Right,
  Footer
} from "native-base";
import * as StoreReview from "expo-store-review";
import { Ionicons } from "@expo/vector-icons";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationEvents } from "react-navigation";
import * as Analytics from "expo-firebase-analytics";

export default class ProfileSecreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      modalVisible: false,
      lan: "en",
      user: {},
      cartItem: 0,
      location: ""
    };
  }
  componentDidMount = async () => {
    const { navigation } = this.props;
    let user = await AsyncStorage.getItem("user");
    if (user !== null) {
      this.setState({
        cartItem: navigation.getParam("cartItem"),
        user: JSON.parse(user),
        isLogin: true,
        lan: navigation.getParam("lan"),
        location: navigation.getParam("location")
      });
    } else {
      this.setState({ lan: navigation.getParam("lan") });
    }
  };
  logoutUser = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("jobs");
    await AsyncStorage.removeItem("address");
    this.setState({ isLogin: false, cartItem: 0 });
  };
  authenticateUser = () => {
    this.props.navigation.navigate("Login", { lan: this.state.lan });
  };
  displayLanguageModal = () => {
    this.setState({ modalVisible: true });
  };
  hideModal = () => {
    this.setState({ modalVisible: false });
  };
  likeForense = () => {
    if (this.state.lan === "en") {
      Alert.alert(
        "Would you mind rating Wafarnalak?",
        "It wont take more than a minute and helps to promote our app. Thanks for your support!",
        [
          { text: "RATE IT NOW", onPress: () => StoreReview.requestReview() },
          {
            text: "REMIND ME LATER",

            style: "cancel"
          },
          {
            text: "NO, THANKS",

            style: "cancel"
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "هلا تفضلت بتقييم وفرنا لك ؟",
        "لن يستغرق الأمر اكثر من دقيقة والذي بدوره سيسهم في تحسين تطبيقنا، شكراً لدعمك",
        [
          {
            text: "ذكرني بوقت اخر",

            style: "cancel"
          },
          {
            text: "لا، شكراً",

            style: "cancel"
          },
          { text: "تقييم الآن", onPress: () => StoreReview.requestReview() }
        ],
        { cancelable: false }
      );
    }
  };
  rateForense = () => {
    if (this.state.lan === "en") {
      Alert.alert(
        "Do you like using Wafarnalak?",
        "",
        [
          {
            text: "Ask me later"
          },
          {
            text: "Not Really",

            style: "cancel"
          },
          {
            text: "Yes!",
            onPress: () => this.likeForense()
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "هل احببت استخدام وفرنا لك ؟",
        "",
        [
          {
            text: "ذكرني بوقت اخر"
          },
          {
            text: "ليس صحيحاً",

            style: "cancel"
          },
          {
            text: "نعم",
            onPress: () => this.likeForense()
          }
        ],
        { cancelable: false }
      );
    }
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
            screen: "myProfileScreen",
            purpose: "checkout order from myProfile screen"
          });
        } else {
          Toast.show({
            text:
              this.state.lan == "en"
                ? "Sorry, currently we are not delivering services in your city, soon we will be with you"
                : "سلة الطلبات فارغة",
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
    if (option == 2) {
      this.props.navigation.navigate("MyOrders", {
        cartItem: this.state.cartItem,
        lan: this.state.lan
      });
    }
  };

  changetoEnglish = async () => {
    await AsyncStorage.setItem("lan", "en");
    I18nManager.isRTL = false;
    I18nManager.forceRTL(false);
    await Updates.reloadAsync();
    //this.updateLanguage(1);
  };
  changetoArabic = async () => {
    await AsyncStorage.setItem("lan", "ar");
    I18nManager.isRTL = true;
    I18nManager.forceRTL(true);
    await Updates.reloadAsync();
    //this.updateLanguage(2);
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: "100%",
            borderBottomWidth: 2,
            borderBottomColor: "#0866b0",
            backgroundColor: "#ffffff",
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "center",
              position: Platform.OS === "android" ? "absolute" : "relative",
              alignSelf: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "montserrat_semi_blod",
                color: "#0866b0",
                fontSize: 18
              }}
            >
              {this.state.lan == "en" ? "My Profile" : "ملفي الشخصي"}
            </Text>
          </View>
        </View>
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
            height: Dimensions.get("screen").height - 100
          }}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <LinearGradient
              colors={["#0764af", "#6ea8cd"]}
              start={[0.9, 0.2]}
              end={[0.1, 0.1]}
              style={{
                width: Dimensions.get("screen").width,
                height: Dimensions.get("screen").height
              }}
            >
              <ImageBackground
                source={require("../assets/Profile-with-Stroke-min.png")}
                style={{
                  width: Dimensions.get("screen").width - 60,
                  height: 210,
                  alignSelf: "center",
                  marginTop: 10
                }}
                resizeMode="contain"
              >
                {this.state.isLogin === true ? (
                  <View
                    style={{
                      position: "absolute",
                      right: 10,
                      top: Platform.OS === "ios" ? 10 : 22
                    }}
                  >
                    <Text style={{ color: "white" }}>
                      {this.state.user.name}
                    </Text>
                    <TouchableOpacity onPress={this.logoutUser}>
                      <View
                        style={{
                          backgroundColor: "#6ea8cd",
                          width: 60,
                          height: 16,
                          borderRadius: 5,
                          alignSelf: "flex-end"
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,
                            alignSelf: "center",
                            paddingTop: Platform.OS === "ios" ? 1 : 0,
                            color: "white"
                          }}
                        >
                          {this.state.lan == "en" ? "Log out" : "خروج"}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View></View>
                )}
              </ImageBackground>
              <View
                style={{
                  backgroundColor: "white",
                  width: Dimensions.get("screen").width - 64,
                  marginTop: 15,
                  borderRadius: 12,
                  alignSelf: "center"
                }}
              >
                {this.state.isLogin === true ? (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("ProfileUpdate", {
                        user: this.state.user,
                        lan: this.state.lan
                      })
                    }
                  >
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          margin: 12,
                          backgroundColor: "white"
                        }}
                      >
                        <View style={{ flexDirection: "row" }}>
                          <Image
                            source={require("../assets/Profile-Icon/Profile-Icon-min.png")}
                            style={{ width: 30, height: 30 }}
                            resizeMode="contain"
                          />
                          <Text
                            style={{
                              paddingTop: 4,
                              marginLeft: 16,
                              color: "#4a4b4c"
                            }}
                          >
                            {this.state.lan == "en" ? "Profile" : "ملفي الشخصي"}
                          </Text>
                        </View>
                        <View style={{ paddingTop: 5 }}>
                          <Ionicons
                            name={
                              this.state.lan == "en"
                                ? "chevron-forward-outline"
                                : "chevron-back-outline"
                            }
                            size={24}
                            color={"#6ea8cd"}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          height: 1,
                          backgroundColor: "lightgray",
                          width: Dimensions.get("screen").width - 64
                        }}
                      ></View>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
                <TouchableOpacity onPress={this.displayLanguageModal}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 12,
                      backgroundColor: "white"
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../assets/Profile-Icon/Change-Language-min.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          paddingTop: 4,
                          marginLeft: 16,
                          color: "#4a4b4c"
                        }}
                      >
                        {this.state.lan == "en"
                          ? "Change Language"
                          : "تغيير اللغة"}
                      </Text>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                      <Ionicons
                        name={
                          this.state.lan == "en"
                            ? "chevron-forward-outline"
                            : "chevron-back-outline"
                        }
                        size={24}
                        color={"#6ea8cd"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "lightgray",
                    width: Dimensions.get("screen").width - 64
                  }}
                ></View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("HelpScreen", {
                      lan: this.state.lan
                    })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 12,
                      backgroundColor: "white"
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../assets/Profile-Icon/Help-min.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          paddingTop: 4,
                          marginLeft: 20,
                          color: "#4a4b4c"
                        }}
                      >
                        {this.state.lan == "en" ? "Help" : "مساعدة"}
                      </Text>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                      <Ionicons
                        name={
                          this.state.lan == "en"
                            ? "chevron-forward-outline"
                            : "chevron-back-outline"
                        }
                        size={24}
                        color={"#6ea8cd"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "lightgray",
                    width: Dimensions.get("screen").width - 64
                  }}
                ></View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("AboutScreen", {
                      lan: this.state.lan
                    })
                  }
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 12,
                      backgroundColor: "white"
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../assets/Profile-Icon/About-min.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          paddingTop: 4,
                          marginLeft: 20,
                          color: "#4a4b4c"
                        }}
                      >
                        {this.state.lan == "en"
                          ? "About Wafarnalak"
                          : "عن وفرنا لك"}
                      </Text>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                      <Ionicons
                        name={
                          this.state.lan == "en"
                            ? "chevron-forward-outline"
                            : "chevron-back-outline"
                        }
                        size={24}
                        color={"#6ea8cd"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "lightgray",
                    width: Dimensions.get("screen").width - 64
                  }}
                ></View>
                <TouchableOpacity onPress={this.rateForense}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 12,
                      backgroundColor: "white"
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../assets/Profile-Icon/Rate-min.png")}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          paddingTop: 4,
                          marginLeft: 20,
                          color: "#4a4b4c"
                        }}
                      >
                        {this.state.lan == "en"
                          ? "Rate Wafarnalak"
                          : "قيٌم وفرنا لك"}
                      </Text>
                    </View>
                    <View style={{ paddingTop: 5 }}>
                      <Ionicons
                        name={
                          this.state.lan == "en"
                            ? "chevron-forward-outline"
                            : "chevron-back-outline"
                        }
                        size={24}
                        color={"#6ea8cd"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

                {this.state.isLogin === true ? (
                  <View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "lightgray",
                        width: Dimensions.get("screen").width - 64
                      }}
                    ></View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("MyOrdersSecreen")
                      }
                    >
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate("PointsScreen", {
                            lan: this.state.lan
                          })
                        }
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            margin: 12,
                            backgroundColor: "white"
                          }}
                        >
                          <View style={{ flexDirection: "row" }}>
                            <Image
                              source={require("../assets/Profile-Icon/Points-min.png")}
                              style={{ width: 30, height: 30 }}
                              resizeMode="contain"
                            />
                            <Text
                              style={{
                                paddingTop: 4,
                                marginLeft: 20,
                                color: "#4a4b4c"
                              }}
                            >
                              {this.state.lan == "en"
                                ? "Wafarnalak Points"
                                : "نقاط وفرنا لك"}
                            </Text>
                          </View>
                          <View style={{ paddingTop: 5 }}>
                            <Ionicons
                              name={
                                this.state.lan == "en"
                                  ? "chevron-forward-outline"
                                  : "chevron-back-outline"
                              }
                              size={24}
                              color={"#6ea8cd"}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </TouchableOpacity>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: "lightgray",
                        width: Dimensions.get("screen").width - 64
                      }}
                    ></View>
                  </View>
                ) : (
                  <View></View>
                )}

                {this.state.isLogin === true ? (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("ReferralScreen", {
                        user: this.state.user,
                        lan: this.state.lan
                      })
                    }
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        margin: 12,
                        backgroundColor: "white"
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={require("../assets/Profile-Icon/Referral-min.png")}
                          style={{ width: 30, height: 30 }}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            paddingTop: 4,
                            marginLeft: 20,
                            color: "#4a4b4c"
                          }}
                        >
                          {this.state.lan == "en"
                            ? "Wafarnalak Referral"
                            : "إحالة وفرنا لك (رمز الدعوة)"}
                        </Text>
                      </View>
                      <View style={{ paddingTop: 5 }}>
                        <Ionicons
                          name={
                            this.state.lan == "en"
                              ? "chevron-forward-outline"
                              : "chevron-back-outline"
                          }
                          size={24}
                          color={"#6ea8cd"}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View></View>
                )}
              </View>
              {this.state.isLogin === false ? (
                <TouchableOpacity onPress={this.authenticateUser}>
                  <View
                    style={{
                      backgroundColor: "#6ea8cd",
                      borderRadius: 12,
                      width: Dimensions.get("screen").width - 120,
                      alignSelf: "center",
                      marginTop: 15
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        margin: 12,
                        alignSelf: "center"
                      }}
                    >
                      {this.state.lan == "en" ? "Sign In" : "دخول"}
                    </Text>
                  </View>
                </TouchableOpacity>
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
                    marginTop: 220,
                    height: 255,
                    borderRadius: 20,
                    width: 350,
                    backgroundColor: "#0764af",
                    alignSelf: "center"
                  }}
                >
                  <View
                    style={{ flex: 1, alignSelf: "center", marginTop: -24 }}
                  >
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
                    style={{
                      alignSelf: "center",
                      position: "absolute",
                      top: 50
                    }}
                  >
                    {this.state.lan === "en" ? (
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          fontWeight: "bold"
                        }}
                      >
                        Select Language
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontFamily: "montserrat_semi_blod",
                          color: "white",
                          fontSize: 30
                        }}
                      >
                        اختار اللغة
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      alignSelf: "center",
                      position: "absolute",
                      top: 100
                    }}
                  >
                    <Button
                      style={{
                        width: 250,
                        borderRadius: 12,
                        height: 40,
                        backgroundColor: "#4e9fd1",
                        top: 0
                      }}
                      onPress={this.changetoEnglish}
                    >
                      <View
                        style={{
                          flex: 1,
                          alignSelf: "center",
                          alignItems: "center"
                        }}
                      >
                        <Text style={{ color: "white" }}>English</Text>
                      </View>
                    </Button>
                    <Button
                      style={{
                        width: 250,
                        borderRadius: 12,
                        height: 40,
                        backgroundColor: "#4e9fd1",
                        top: 14
                      }}
                      onPress={this.changetoArabic}
                    >
                      <View
                        style={{
                          flex: 1,
                          alignSelf: "center",
                          alignItems: "center"
                        }}
                      >
                        <Text
                          style={{
                            color: "white",

                            alignItems: "center"
                          }}
                        >
                          العربية
                        </Text>
                      </View>
                    </Button>
                  </View>
                </View>
              </Modal>
            </LinearGradient>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 50,
            alignSelf: "center",
            justifyContent: "space-between",
            width: "100%",
            position: "absolute",
            alignItems: "flex-end",
            bottom: 0,
            left: 0,
            backgroundColor: "white",
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
          <TouchableOpacity onPress={() => this.navigationSetup(2)}>
            <View>
              <View style={{ alignSelf: "center" }}>
                <Image
                  resizeMode="contain"
                  source={require("../assets/myOrder.png")}
                  style={{ height: 29, width: 30 }}
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "#ccc"
                }}
              >
                {this.state.lan == "en" ? "My Orders" : "طلباتي"}
              </Text>
            </View>
          </TouchableOpacity>
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
          <View>
            <View style={{ alignSelf: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name={
                    this.state.isLogin == true
                      ? "ios-person"
                      : "ios-information-circle"
                  }
                  size={28}
                  color={"#0865b0"}
                />
                {(this.state.user && this.state.user.name == "") ||
                (this.state.user && this.state.user.name == null) ||
                (this.state.user && this.state.user.email == "") ||
                (this.state.user && this.state.user.email == null) ? (
                  <View
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: "red"
                    }}
                  ></View>
                ) : (
                  <View></View>
                )}
              </View>
            </View>
            <Text
              style={{ textAlign: "center", fontSize: 12, color: "#0865b0" }}
            >
              {this.state.isLogin == true
                ? this.state.lan == "en"
                  ? "My Profile"
                  : "ملفي الشخصي"
                : this.state.lan == "en"
                ? "About"
                : "المزيد"}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
