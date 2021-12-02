// import * as Analytics from "expo-firebase-analytics";

// import {
//   AsyncStorage,
//   Dimensions,
//   Image,
//   Modal,
//   Platform,
//   Share,
//   TouchableOpacity,
//   View
// } from "react-native";
// import {
//   Button,
//   Container,
//   Content,
//   Footer,
//   Header,
//   Input,
//   Item,
//   Left,
//   Right,
//   Text,
//   Thumbnail,
//   Title,
//   Toast
// } from "native-base";

// import Dash from "react-native-dash";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import React from "react";
// import Spinner from "react-native-loading-spinner-overlay";

// let totalPrice = 0;
// export default class Promotion extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lan: "en",
//       job: null,
//       selectedServices: [],
//       totalPrice: 0,
//       user: null,
//       url: "",
//       toolTipVisible: false
//     };
//   }
//   cahngeToolTip = () => {
//     this.setState({ toolTipVisible: !this.state.toolTipVisible });
//   };
//   componentDidMount = async () => {
//     const { navigation } = this.props;
//     let user = await AsyncStorage.getItem("user");
//     let jobs = await AsyncStorage.getItem("jobs");

//     let newJob = navigation.getParam("job");
//     newJob.items = 0;
//     newJob.t_price = 0;
//     this.setState({
//       url: navigation.getParam("url"),
//       selectedServices: jobs !== null ? JSON.parse(jobs) : [],
//       job: newJob,
//       user: user !== null ? JSON.parse(user) : null,
//       lan: navigation.getParam("lan")
//     });
//   };
//   addRemoveIntoSelectedServices = async (job, add) => {
//     job.jobServiceIcon = job.productseoname;
//     job.jobserviceName = job.productname;
//     job.jobserviceNameAr = job.productname_ar;

//     let totalPrice = 0;
//     let allServices = this.state.selectedServices;
//     let index = allServices.findIndex(service => service.id == job.id);

//     if (add === false && job.items > 0) {
//       allServices.splice(index, 1);
//       allServices.forEach(element => {
//         totalPrice = parseInt(totalPrice) + parseInt(element.t_price);
//       });
//       this.setState({ selectedServices: allServices, totalPrice: totalPrice });
//     }
//     if (add === true) {
//       if (job.items < 1) {
//         allServices.splice(index, 1);
//         allServices.forEach(element => {
//           totalPrice = parseInt(totalPrice) + parseInt(element.t_price);
//         });
//         this.setState({
//           selectedServices: allServices,
//           totalPrice: totalPrice
//         });
//       } else {
//         if (index > -1) {
//           allServices[index] = job;
//         } else {
//           allServices.push(job);
//         }
//         allServices.forEach(element => {
//           totalPrice = parseInt(totalPrice) + parseInt(element.t_price);
//         });
//         this.setState({
//           selectedServices: allServices,
//           totalPrice: totalPrice
//         });
//       }
//     }
//     await AsyncStorage.setItem("jobs", JSON.stringify(allServices));
//   };
//   plus = job => {
//     if (job.items) job.items++;
//     else job.items = 1;
//     if (
//       job.id === 70 ||
//       job.id === 61 ||
//       job.id === 82 ||
//       job.id === 46 ||
//       job.id === 47
//     ) {
//       job.t_price =
//         parseFloat(job.items > 1 ? job.saleprice : job.price) * job.items;
//       // if (job.items > 1 && job.items < 4) {
//       //   console.log("1 ----------", job.items);

//       //   job.t_price = job.saleprice * job.items;
//       // } else if (job.items >= 4) {
//       //   console.log("4----------", job.items);
//       //   job.t_price = 50 * job.items;
//       //   console.log("job.t_price----------", 50 * job.items);
//       // } else {
//       //   job.t_price = job.price * job.items;
//       // }
//       // let totalPrice =
//       //   (job.items > 1 ? job.saleprice : job.items > 4 ? 50 : job.price) *
//       //   job.items;
//     } else {
//       job.t_price =
//         parseFloat(job.saleprice ? job.saleprice : job.price) * job.items;
//     }

//     job.selected = true;
//     this.addRemoveIntoSelectedServices(job, true);
//   };

//   minus = job => {
//     if (job.items && job.items >= 1) {
//       job.items--;
//       if (
//         job.id === 70 ||
//         job.id === 61 ||
//         job.id === 82 ||
//         job.id === 46 ||
//         job.id === 47
//       ) {
//         if (job.items > 1 && job.items < 4) {
//           job.t_price = job.saleprice * job.items;
//         } else if (job.items >= 4) {
//           job.t_price = 50 * job.items;
//         } else {
//           job.t_price = job.price * job.items;
//         }
//         // job.t_price =
//         //   parseFloat(job.items > 1 ? job.saleprice : job.price) * job.items;
//       } else {
//         job.t_price =
//           parseFloat(job.saleprice ? job.saleprice : job.price) * job.items;
//       }
//       this.addRemoveIntoSelectedServices(job, true);
//     } else {
//       job.items = 0;
//       job.t_price = 0;
//       job.selected = false;
//       this.addRemoveIntoSelectedServices(job, false);
//     }
//   };
//   onShare = async () => {
//     try {
//       await Share.share({
//         message:
//           this.state.lan === "en"
//             ? "Order home repair and maintenance services 💇🏻‍♀ 🏡 and Get SAR 15 on your first order from Wafarnalak 🤩🥳 !Download the app📲 https://onelink.to/p56krz and use my referral code " +
//               this.state.user.referralcode
//             : "اطلب خدمات اصلاح وصيانة المنزل 💇🏻‍♀ 🏡 واحصل على 15 ريال في طلبك الأول من وفرنالك 🤩🥳 عند تنزيل التطبيق https://onelink.to/wg5k82 📲 واستخدم رمز الدعوة الخاص بي " +
//               this.state.user.referralcode
//       });
//     } catch (error) {
//       alert(error.message);
//     }
//   };
//   selectIt = job => {
//     job.selected = !job.selected;
//     job.items = 1;
//     if (job.selected) job.t_price = job.saleprice ? job.saleprice : job.price;
//     else job.t_price = 0;

//     if (job.selected) this.addRemoveIntoSelectedServices(job, true);
//     else this.addRemoveIntoSelectedServices(job, false);
//   };
//   proceedOrder = async () => {
//     await AsyncStorage.setItem(
//       "jobs",
//       JSON.stringify(this.state.selectedServices)
//     );
//     await Analytics.logEvent("PromotionalCheckout", {
//       name: "PromotionalCheckout",
//       screen: "promotionScreen",
//       purpose: "promotion checkout"
//     });
//     this.props.navigation.navigate("MyCart", {
//       lan: this.state.lan,
//       isPackage: false
//     });
//   };
//   render() {
//     return (
//       <Container style={{ backgroundColor: "#F5F5F5" }}>
//         <Header
//           style={{
//             marginTop: 0,
//             borderBottomColor: "#0865b0",
//             borderBottomWidth: 1,
//             backgroundColor: "white",
//             height: 60,
//             justifyContent: "center"
//           }}
//         >
//           <Left style={{ marginLeft: 10 }}>
//             {this.state.lan === "en" ? (
//               <Ionicons
//                 onPress={() => {
//                   this.props.navigation.goBack();
//                 }}
//                 name={"ios-arrow-back"}
//                 size={40}
//                 color={"#0865b0"}
//               />
//             ) : (
//               <Ionicons
//                 onPress={() => {
//                   this.props.navigation.goBack();
//                 }}
//                 name={"ios-arrow-forward"}
//                 size={34}
//                 color={"#0865b0"}
//               />
//             )}
//           </Left>
//           <View
//             style={{
//               flex: 3,
//               justifyContent: "center",
//               alignItems: "center",
//               position: Platform.OS === "android" ? "absolute" : "relative",
//               alignSelf: "center"
//             }}
//           >
//             {this.state.lan === "en" ? (
//               <Title style={{ color: "#0865b0", fontSize: 18 }}>
//                 Promotions
//               </Title>
//             ) : (
//               <Title
//                 style={{
//                   fontFamily: "montserrat_semi_blod",
//                   color: "#0866b0",
//                   fontSize: 18
//                 }}
//               >
//                 عروض وتخفيضات
//               </Title>
//             )}
//           </View>
//           <Right />
//         </Header>
//         <Content>
//           {this.state.url !== "" ? (
//             <View style={{ alignSelf: "center", marginTop: 6 }}>
//               <Image
//                 source={{
//                   uri:
//                     "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/" +
//                     this.state.url
//                 }}
//                 style={{
//                   width: Dimensions.get("screen").width,
//                   height: 150,
//                   borderRadius: 6
//                 }}
//                 resizeMode="contain"
//               />
//             </View>
//           ) : (
//             <View></View>
//           )}

//           <View style={{ width: Dimensions.get("screen").width, marginTop: 5 }}>
//             <View
//               style={{
//                 width: Dimensions.get("screen").width,
//                 height: 48,
//                 backgroundColor: "#d8d8d8"
//               }}
//             >
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between"
//                 }}
//               >
//                 <View style={{ flexDirection: "row" }}>
//                   {this.state.job ? (
//                     <Image
//                       source={{ uri: this.state.job.productseoname }}
//                       style={{
//                         marginLeft: 5,
//                         marginTop: 1.3,
//                         width: 45,
//                         height: 45
//                       }}
//                       resizeMode="contain"
//                     />
//                   ) : (
//                     <View></View>
//                   )}

//                   <Text
//                     style={{
//                       fontSize: 13,
//                       fontFamily:
//                         this.state.lan === "ar"
//                           ? "montserrat_semi_blod"
//                           : "Roboto",
//                       marginTop: 14,
//                       textAlign: "left",
//                       marginLeft: 5,
//                       width: Dimensions.get("screen").width - 30,
//                       color: "#4a4b4c"
//                     }}
//                   >
//                     {" "}
//                     {this.state.job && this.state.lan == "en"
//                       ? this.state.job.productname
//                       : this.state.job && this.state.job.productname_ar}
//                   </Text>
//                 </View>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     backgroundColor: "white",
//                     position: "absolute",
//                     right: 5,
//                     top: 12
//                   }}
//                 >
//                   <Image
//                     source={require("../../assets/tag.png")}
//                     style={{ margin: 4, width: 20, height: 20 }}
//                     resizeMode="contain"
//                   />
//                   <Text
//                     style={{
//                       fontFamily:
//                         this.state.lan === "ar"
//                           ? "montserrat_semi_blod"
//                           : "Roboto",
//                       fontSize: 12,
//                       color: "#ff9c00",
//                       margin: 5
//                     }}
//                   >
//                     {this.state.lan == "en" ? "Promoted" : "عليها عروض"}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//             {this.state.job && this.state.job.pricetype == 1 ? (
//               <View
//                 style={{
//                   marginLeft: 0,
//                   marginRight: 0,
//                   backgroundColor: "white",
//                   borderWidth: 1,
//                   borderTopWidth: 1,
//                   borderColor: "#283a97"
//                 }}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     marginLeft: 8,
//                     marginRight: 6
//                   }}
//                 >
//                   <View style={{ marginTop: 4 }}>
//                     <Text
//                       style={{
//                         color: "#0764af",
//                         fontFamily: "montserrat_semi_blod",
//                         fontSize: 12,
//                         textAlign: "left",
//                         width: Dimensions.get("screen").width - 140
//                       }}
//                       numberOfLines={2}
//                     >
//                       {this.state.lan == "en"
//                         ? this.state.job.name
//                         : this.state.job.name_ar}
//                     </Text>
//                   </View>
//                   <View style={{ marginTop: 8, marginRight: 26 }}>
//                     <View
//                       style={{
//                         flexDirection:
//                           this.state.lan == "en" ? "row" : "row-reverse"
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 10,
//                           color: "#0764af",
//                           fontWeight: "bold"
//                         }}
//                       >
//                         Total SAR{" "}
//                       </Text>
//                       <Text style={{ color: "#ff9c00", fontSize: 10 }}>
//                         {this.state.job.t_price ? this.state.job.t_price : 0}{" "}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     justifyContent: "space-between",
//                     marginTop: 15,
//                     marginBottom: 15
//                   }}
//                 >
//                   <View style={{ marginLeft: 12, marginTop: 12 }}>
//                     <View
//                       style={{
//                         backgroundColor: "#0764af",
//                         width: 90
//                       }}
//                     >
//                       <View
//                         style={{
//                           flexDirection:
//                             this.state.lan == "en" ? "row" : "row-reverse",
//                           alignSelf: "center",
//                           alignContent: "center",
//                           alignItems: "center",
//                           flex: 1
//                         }}
//                       >
//                         <Text style={{ color: "white", fontSize: 12 }}>
//                           SAR{" "}
//                         </Text>
//                         <Text
//                           style={{
//                             color: "#ff9c00",
//                             fontSize: 12
//                           }}
//                         >
//                           {this.state.job.items > 1
//                             ? this.state.job.saleprice
//                             : this.state.job.price}
//                         </Text>
//                         <Text style={{ color: "white", fontSize: 12 }}>
//                           {this.state.lan == "en" ? "/Unit" : "وحدة /"}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                   <View>
//                     {this.state.job.id == 228 ||
//                     this.state.job.id == 232 ||
//                     this.state.job.id == 223 ||
//                     this.state.job.id == 230 ? (
//                       <View
//                         style={{
//                           alignSelf: "center",
//                           marginTop: 0,
//                           marginLeft: 12
//                         }}
//                       >
//                         {this.state.lan == "en" ? (
//                           <Image
//                             source={require("../../assets/waranty.png")}
//                             style={{ width: 40, height: 40 }}
//                             resizeMode="contain"
//                           />
//                         ) : (
//                           <Image
//                             source={require("../../assets/warranty-ar.png")}
//                             style={{ width: 40, height: 40 }}
//                             resizeMode="contain"
//                           />
//                         )}
//                       </View>
//                     ) : (
//                       <View></View>
//                     )}
//                   </View>
//                   {this.state.job && this.state.job.i_notes ? (
//                     <View
//                       style={{
//                         alignSelf: "flex-start",
//                         flex: 1,
//                         marginLeft: 10,
//                         marginTop: 9
//                       }}
//                     >
//                       <TouchableOpacity onPress={this.cahngeToolTip}>
//                         <View>
//                           {this.state.toolTipVisible == true &&
//                           this.state.job.i_notes ? (
//                             <View
//                               style={{
//                                 backgroundColor: "white",
//                                 borderRadius: 6,
//                                 top: 7,
//                                 right: 10,
//                                 left: 10,
//                                 borderStyle: "solid",
//                                 position: "absolute",
//                                 borderWidth: 2,
//                                 marginLeft: 5,
//                                 borderColor: "#0764af",
//                                 alignSelf: "flex-start",
//                                 borderTopLeftRadius: 0,
//                                 zIndex: 0
//                               }}
//                             >
//                               <Text
//                                 style={{
//                                   textAlign: "center",
//                                   fontSize: 7
//                                 }}
//                               >
//                                 {this.state.lan == "en"
//                                   ? this.state.job.i_notes &&
//                                     this.state.job.i_notes
//                                   : this.state.job.i_notes_ar &&
//                                     this.state.job.i_notes_ar}
//                               </Text>
//                             </View>
//                           ) : (
//                             <View></View>
//                           )}
//                           <View style={{ alignSelf: "flex-start" }}>
//                             <Ionicons
//                               name="ios-information-circle"
//                               size={20}
//                               color={"#0764af"}
//                             />
//                           </View>
//                         </View>
//                       </TouchableOpacity>
//                     </View>
//                   ) : (
//                     <View></View>
//                   )}

//                   <View style={{ marginRight: 15 }}>
//                     <View style={{ marginLeft: 0, marginBottom: 3 }}>
//                       <Text
//                         style={{
//                           textAlign: "center",
//                           fontSize: 12,
//                           color: "#4a4b4c"
//                         }}
//                       >
//                         {this.state.lan == "en"
//                           ? "Number of units"
//                           : "عدد الوحدات"}
//                       </Text>
//                     </View>

//                     <View
//                       style={{
//                         backgroundColor: "#6ea8cd",
//                         flexDirection: "row",
//                         justifyContent: "space-between",
//                         width: 95,
//                         height: 25,
//                         borderRadius: 12,
//                         alignSelf: "flex-end"
//                       }}
//                     >
//                       <View
//                         style={{
//                           width: 25,
//                           height: 25,
//                           borderRadius: 12.5,
//                           backgroundColor: "#0764af",
//                           alignSelf: "center",
//                           marginTop: -1
//                         }}
//                       >
//                         <TouchableOpacity
//                           onPress={() => this.minus(this.state.job)}
//                         >
//                           <View style={{ alignSelf: "center", marginTop: 0 }}>
//                             <Ionicons
//                               name="ios-remove"
//                               size={26}
//                               color={"white"}
//                             />
//                           </View>
//                         </TouchableOpacity>
//                       </View>
//                       <View>
//                         <Text
//                           style={{
//                             color: "white",
//                             fontSize: 13,
//                             paddingTop: 4
//                           }}
//                         >
//                           {this.state.job.items ? this.state.job.items : 0}
//                         </Text>
//                       </View>
//                       <View
//                         style={{
//                           width: 25,
//                           height: 25,
//                           borderRadius: 12.5,
//                           backgroundColor: "#0764af",
//                           marginTop: 0
//                         }}
//                       >
//                         <TouchableOpacity
//                           onPress={() => this.plus(this.state.job)}
//                         >
//                           <View style={{ alignSelf: "center", marginTop: 0 }}>
//                             <Ionicons
//                               name="ios-add"
//                               size={26}
//                               color={"white"}
//                             />
//                           </View>
//                         </TouchableOpacity>
//                       </View>
//                     </View>
//                   </View>
//                 </View>
//               </View>
//             ) : this.state.job && this.state.job.pricetype == 4 ? (
//               <TouchableOpacity
//                 onPress={() => {
//                   this.selectIt(this.state.job);
//                 }}
//               >
//                 <View>
//                   <View style={{ marginTop: 8, flexDirection: "row" }}>
//                     <View
//                       style={{
//                         marginLeft: 10,
//                         width: Dimensions.get("screen").width / 2 + 80
//                       }}
//                     >
//                       <View>
//                         <Text
//                           style={{
//                             fontFamily:
//                               this.state.lan === "ar"
//                                 ? "montserrat_semi_blod"
//                                 : "Roboto",
//                             color: "#0764af",
//                             textAlign: "left",
//                             fontSize: 12,
//                             flexWrap: "wrap"
//                           }}
//                         >
//                           {this.state.lan === "en"
//                             ? this.state.job.name
//                             : this.state.job.name_ar}
//                         </Text>
//                         <Dash
//                           dashGap={1}
//                           dashColor="#283a97"
//                           style={{
//                             marginTop: 5,
//                             width: Dimensions.get("screen").width - 120,
//                             height: 1
//                           }}
//                         />
//                       </View>
//                       <View style={{ marginTop: 5 }}>
//                         <Text
//                           style={{
//                             fontFamily:
//                               this.state.lan === "ar"
//                                 ? "montserrat_semi_blod"
//                                 : "Roboto",
//                             fontSize: 10,
//                             flex: 1,
//                             flexWrap: "wrap",
//                             textAlign: "left"
//                           }}
//                         >
//                           {this.state.lan === "en"
//                             ? this.state.job.description
//                             : this.state.job.description_ar}
//                         </Text>
//                         <Dash
//                           dashGap={1}
//                           dashColor="#283a97"
//                           style={{
//                             marginTop: 5,
//                             width: Dimensions.get("screen").width - 120,
//                             height: 1
//                           }}
//                         />
//                       </View>
//                       <View style={{ marginTop: 5 }}>
//                         <Text
//                           style={{
//                             fontFamily:
//                               this.state.lan === "ar"
//                                 ? "montserrat_semi_blod"
//                                 : "Roboto",
//                             fontSize: 10,
//                             flex: 1,
//                             flexWrap: "wrap",
//                             textAlign: "left"
//                           }}
//                         >
//                           {this.state.lan === "en"
//                             ? this.state.job.tips_en
//                             : this.state.job.tips_ar}
//                         </Text>
//                         <Dash
//                           dashGap={1}
//                           dashColor="#283a97"
//                           style={{
//                             marginTop: 5,
//                             width: Dimensions.get("screen").width - 120,
//                             height: 1
//                           }}
//                         />
//                       </View>
//                     </View>
//                     {this.state.job.saleprice &&
//                     this.state.job.saleprice > 0 ? (
//                       <View style={{ position: "absolute", right: 10 }}>
//                         <Text
//                           style={{
//                             position: "absolute",
//                             top: 0,
//                             right: 10,
//                             fontSize: 13,
//                             fontFamily:
//                               this.state.lan === "ar"
//                                 ? "montserrat_semi_blod"
//                                 : "Roboto"
//                           }}
//                         >
//                           {this.state.lan === "en" ? "Discount" : "خصم"}{" "}
//                           {this.state.lan === "en"
//                             ? (
//                                 ((this.state.job.price -
//                                   this.state.job.saleprice) /
//                                   this.state.job.price) *
//                                 100
//                               ).toFixed()
//                             : (
//                                 ((this.state.job.price -
//                                   this.state.job.saleprice) /
//                                   this.state.job.price) *
//                                 100
//                               ).toFixed()}
//                           %
//                         </Text>
//                         <View
//                           style={{
//                             flexDirection: "row",
//                             position: "absolute",
//                             top: 20,
//                             right: 10,
//                             backgroundColor: "#283a97",
//                             width: 60
//                           }}
//                         >
//                           <View
//                             style={{
//                               position: "absolute",
//                               transform: [{ rotate: "13deg" }],
//                               top: 7,
//                               backgroundColor: "red",
//                               width: 58,
//                               height: 2.3
//                             }}
//                           />
//                           <View
//                             style={{
//                               flexDirection: "row",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               flex: 1,
//                               alignSelf: "center"
//                             }}
//                           >
//                             <Text
//                               style={{
//                                 textAlign: "center",
//                                 fontSize: 12,
//                                 fontFamily:
//                                   this.state.lan === "ar"
//                                     ? "montserrat_semi_blod"
//                                     : "Roboto",
//                                 color: "white"
//                               }}
//                             >
//                               SAR
//                             </Text>
//                             {this.state.lan === "en" ? (
//                               <View>
//                                 <Text
//                                   style={{
//                                     textAlign: "center",
//                                     fontSize: 13,
//                                     color: "#ff9c00"
//                                   }}
//                                 >
//                                   {this.state.job.price}{" "}
//                                 </Text>
//                               </View>
//                             ) : (
//                               <Text
//                                 style={{
//                                   textAlign: "center",
//                                   fontSize: 10,
//                                   color: "#ff9c00"
//                                 }}
//                               >
//                                 {" "}
//                                 {this.state.job.price}{" "}
//                               </Text>
//                             )}
//                           </View>
//                         </View>
//                         <View
//                           style={{
//                             flexDirection: "row",
//                             position: "absolute",
//                             top: 40,
//                             right: 10,
//                             backgroundColor: "#283a97",
//                             width: 60
//                           }}
//                         >
//                           <View
//                             style={{
//                               flexDirection: "row",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               flex: 1,
//                               alignSelf: "center"
//                             }}
//                           >
//                             <Text
//                               style={{
//                                 textAlign: "center",
//                                 fontSize: 12,
//                                 fontFamily:
//                                   this.state.lan === "ar"
//                                     ? "montserrat_semi_blod"
//                                     : "Roboto",
//                                 color: "white"
//                               }}
//                             >
//                               SAR
//                             </Text>
//                             {this.state.lan === "en" ? (
//                               <Text
//                                 style={{
//                                   textAlign: "center",
//                                   fontSize: 13,
//                                   color: "#ff9c00"
//                                 }}
//                               >
//                                 {this.state.job.saleprice}{" "}
//                               </Text>
//                             ) : (
//                               <Text
//                                 style={{
//                                   textAlign: "center",
//                                   fontSize: 10,
//                                   color: "#ff9c00"
//                                 }}
//                               >
//                                 {" "}
//                                 {this.state.job.saleprice}{" "}
//                               </Text>
//                             )}
//                           </View>
//                         </View>
//                       </View>
//                     ) : (
//                       <View
//                         style={{
//                           flexDirection: "row",
//                           position: "absolute",
//                           top: 10,
//                           right: 10,
//                           backgroundColor: "#283a97",
//                           width: 60
//                         }}
//                       >
//                         <View
//                           style={{
//                             flexDirection: "row",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             flex: 1,
//                             alignSelf: "center"
//                           }}
//                         >
//                           <Text
//                             style={{
//                               textAlign: "center",
//                               fontSize: 12,
//                               fontFamily:
//                                 this.state.lan === "ar"
//                                   ? "montserrat_semi_blod"
//                                   : "Roboto",
//                               color: "white"
//                             }}
//                           >
//                             SAR
//                           </Text>
//                           {this.state.lan === "en" ? (
//                             <Text
//                               style={{
//                                 textAlign: "center",
//                                 fontSize: 13,
//                                 color: "#ff9c00"
//                               }}
//                             >
//                               {this.state.job.price}{" "}
//                             </Text>
//                           ) : (
//                             <Text
//                               style={{
//                                 textAlign: "center",
//                                 fontSize: 10,
//                                 color: "#ff9c00"
//                               }}
//                             >
//                               {" "}
//                               {this.state.job.price}{" "}
//                             </Text>
//                           )}
//                         </View>
//                       </View>
//                     )}

//                     <View
//                       style={{
//                         position: "absolute",
//                         right: this.state.lan === "en" ? 33 : 24,
//                         top:
//                           this.state.job.saleprice &&
//                           this.state.job.saleprice > 0
//                             ? 60
//                             : 40
//                       }}
//                     >
//                       {this.state.job &&
//                       this.state.job.selected &&
//                       this.state.job.selected === true ? (
//                         <Ionicons
//                           name="ios-checkmark-circle"
//                           size={20}
//                           color="#283a97"
//                         />
//                       ) : (
//                         <Ionicons
//                           name="ios-checkmark-circle-outline"
//                           size={20}
//                           color="#283a97"
//                         />
//                       )}
//                     </View>
//                   </View>
//                   <Dash
//                     dashGap={0}
//                     dashColor="#283a97"
//                     style={{
//                       marginTop: 10,
//                       width: Dimensions.get("screen").width,
//                       height: 1.5
//                     }}
//                   />
//                 </View>
//               </TouchableOpacity>
//             ) : (
//               <View></View>
//             )}
//           </View>
//           <View style={{ marginTop: 15 }}>
//             {this.state.user !== null ? (
//               <View
//                 style={{
//                   backgroundColor: "#F5F5F5",
//                   width: Dimensions.get("screen").width - 30,
//                   marginBottom: 5,
//                   alignSelf: "center"
//                 }}
//               >
//                 <View style={{ marginTop: 10, alignSelf: "center" }}>
//                   {this.state.lan === "en" ? (
//                     <Text style={{ color: "#0865b0", fontSize: 18 }}>
//                       Your Referral Code:
//                     </Text>
//                   ) : (
//                     <Text
//                       style={{
//                         color: "#0865b0",
//                         fontSize: 18
//                       }}
//                     >
//                       كود الإحالة الخاص بك
//                     </Text>
//                   )}
//                 </View>
//                 <TouchableOpacity onPress={this.onShare}>
//                   <View
//                     style={{
//                       alignSelf: "center",
//                       backgroundColor: "white",
//                       width: Dimensions.get("screen").width - 70,
//                       height: 40,
//                       marginTop: 12
//                     }}
//                   >
//                     <View
//                       style={{
//                         alignSelf: "center",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         flex: 1,
//                         flexDirection: "row"
//                       }}
//                     >
//                       <Text
//                         style={{
//                           color: "#0865b0",
//                           fontWeight: "bold",
//                           fontSize: 18
//                         }}
//                       >
//                         {this.state.user && this.state.user.referralcode}
//                       </Text>
//                       <Image
//                         source={require("../../assets/share_ref.png")}
//                         style={{ width: 30, height: 30, marginLeft: 14 }}
//                         resizeMode="contain"
//                       />
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//                 <View
//                   style={{
//                     alignSelf: "center",
//                     marginTop: 20,
//                     marginBottom: 10
//                   }}
//                 >
//                   {this.state.lan === "en" ? (
//                     <Text
//                       style={{
//                         textAlign: "center",
//                         paddingLeft: 20,
//                         paddingRight: 20,
//                         fontSize: 14,
//                         color: "#4a4b4c"
//                       }}
//                     >
//                       Share your code with your friends, after their first order
//                       you'll get 300 points which equals SAR 15 and they'll get
//                       😊 300 points as well{"\n"} 😊 Start Sharing it Now 🤩
//                     </Text>
//                   ) : (
//                     <Text
//                       style={{
//                         textAlign: "center",
//                         fontSize: 14,
//                         lineHeight: 18,
//                         marginLeft: 6,
//                         marginRight: 6
//                       }}
//                     >
//                       شارك الرمز الخاص بك مع أصدقائك ، بمجرد إجرائهم اول طلب
//                       خدمة ستربح 😊 300 نقطة والتي تساوي 15 ر.س، وسيحصلون هم على
//                       300 نقطة😊 ايضاً، ابدأ المشاركة الآن🤩{" "}
//                     </Text>
//                   )}
//                 </View>
//               </View>
//             ) : (
//               <View></View>
//             )}
//           </View>
//         </Content>
//         {this.state.selectedServices.length > 0 ? (
//           <Footer
//             style={{
//               borderTopColor: "#F5F5F5",
//               backgroundColor: "white",
//               borderTopWidth: 0,
//               height: 90
//             }}
//           >
//             <TouchableOpacity onPress={this.proceedOrder}>
//               <View
//                 style={{
//                   backgroundColor: "#0764af",
//                   borderRadius: 10,
//                   width: Dimensions.get("screen").width - 120,
//                   alignSelf: "center"
//                 }}
//               >
//                 <LinearGradient
//                   colors={["#0764af", "#6ea8cd"]}
//                   start={[0.9, 0.2]}
//                   end={[0.1, 0.1]}
//                   style={{ borderRadius: 12 }}
//                 >
//                   <Text
//                     style={{
//                       color: "white",
//                       margin: 12,
//                       alignSelf: "center"
//                     }}
//                   >
//                     {this.state.lan == "en" ? "Checkout" : "تقديم الطلب"} {"\t"}{" "}
//                     {"\t"} SAR{" "}
//                     {this.state.totalPrice > 0 ? this.state.totalPrice : ""}
//                   </Text>
//                 </LinearGradient>
//               </View>
//             </TouchableOpacity>
//           </Footer>
//         ) : (
//           <View></View>
//         )}
//       </Container>
//     );
//   }
// }
import * as Analytics from "expo-firebase-analytics";

import {
  AsyncStorage,
  Dimensions,
  Image,
  Modal,
  Platform,
  Share,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Button,
  Container,
  Content,
  Footer,
  Header,
  Input,
  Item,
  Left,
  Right,
  Text,
  Thumbnail,
  Title,
  Toast,
} from "native-base";

import Dash from "react-native-dash";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import Spinner from "react-native-loading-spinner-overlay";
import SelectableJob from "../jobs/selectableJob";

let totalPrice = 0;
export default class Promotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: "en",
      job: null,
      selectedServices: [],
      totalPrice: 0,
      user: null,
      url: "",
      toolTipVisible: false,
    };
  }
  selectJob = (job) => {
    job.selected = !job.selected;
    job.items = 1;
    if (job.selected) job.t_price = job.saleprice ? job.saleprice : job.price;
    else job.t_price = 0;

    if (job.selected) this.addRemoveIntoSelectedServices(job, true);
    else this.addRemoveIntoSelectedServices(job, false);
  };

  calculateTotalOrderPrices = () => {
    let total = 0;
    this.state.selectedServices.forEach((service) => {
      total = total + service.t_price;
    });
    this.setState({ totalOrderPrice: total });
  };

  cahngeToolTip = () => {
    this.setState({ toolTipVisible: !this.state.toolTipVisible });
  };
  componentDidMount = async () => {
    const { navigation } = this.props;
    let user = await AsyncStorage.getItem("user");
    let jobs = await AsyncStorage.getItem("jobs");

    let newJob = navigation.getParam("job");
    newJob.items = 0;
    newJob.t_price = 0;
    console.log("param url ", navigation.getParam("url"));
    this.setState({
      url: navigation.getParam("url"),
      selectedServices: jobs !== null ? JSON.parse(jobs) : [],
      job: newJob,
      user: user !== null ? JSON.parse(user) : null,
      lan: navigation.getParam("lan"),
    });
  };
  addRemoveIntoSelectedServices = async (job, add) => {
    job.jobServiceIcon = job.productseoname;
    job.jobserviceName = job.jobserviceName;
    job.jobserviceNameAr = job.jobserviceNameAr;

    let totalPrice = 0;
    let allServices = this.state.selectedServices;
    let index = allServices.findIndex((service) => service.id == job.id);

    if (add === false && job.items > 0) {
      allServices.splice(index, 1);
      allServices.forEach((element) => {
        totalPrice = parseInt(totalPrice) + parseInt(element.t_price);
      });
      this.setState({ selectedServices: allServices, totalPrice: totalPrice });
    }
    if (add === true) {
      if (job.items < 1) {
        allServices.splice(index, 1);
        allServices.forEach((element) => {
          totalPrice = parseInt(totalPrice) + parseInt(element.t_price);
        });
        this.setState({
          selectedServices: allServices,
          totalPrice: totalPrice,
        });
      } else {
        if (index > -1) {
          allServices[index] = job;
        } else {
          allServices.push(job);
        }
        allServices.forEach((element) => {
          totalPrice = parseInt(totalPrice) + parseInt(element.t_price);
        });
        this.setState({
          selectedServices: allServices,
          totalPrice: totalPrice,
        });
      }
    }
    await AsyncStorage.setItem("jobs", JSON.stringify(allServices));
  };
  plus = (job) => {
    if (job.items) job.items++;
    else job.items = 1;
    if (
      // job.id === 70 ||
      // job.id === 82 ||
      // job.id === 46 ||
      // job.id === 230 ||
      // job.id === 60 ||
      // job.id === 223 ||
      // job.id === 232 ||
      // job.id === 65 ||
      // job.id === 71 ||
      // job.id === 74 ||
      // job.id === 288 ||
      // job.id === 228 ||
      // job.id === 77 ||
      // job.id === 79 ||
      // job.id === 82 ||
      // job.id === 81 ||
      // job.id === 46 ||
      // job.id === 47
      job.items > 1
    ) {
      job.t_price =
        parseFloat(job.items > 1 ? job.saleprice : job.price) * job.items;
      // if (job.items > 1 && job.items < 4) {
      //   console.log("1 ----------", job.items);

      //   job.t_price = job.saleprice * job.items;
      // } else if (job.items >= 4) {
      //   console.log("4----------", job.items);
      //   job.t_price = 50 * job.items;
      //   console.log("job.t_price----------", 50 * job.items);
      // } else {
      //   job.t_price = job.price * job.items;
      // }
      // let totalPrice =
      //   (job.items > 1 ? job.saleprice : job.items > 4 ? 50 : job.price) *
      //   job.items;
    } else {
      job.t_price =
        // parseFloat(job.saleprice ? job.saleprice : job.price) * job.items;
        parseFloat(job.price) * job.items;

      console.log("ppp", parseFloat(job.price) * job.items);
    }

    job.selected = true;
    this.addRemoveIntoSelectedServices(job, true);
  };

  minus = (job) => {
    if (job.items && job.items >= 1) {
      job.items--;
      if (
        // job.id === 70 ||
        job.id === 82 ||
        job.id === 46 ||
        job.id === 230 ||
        job.id === 60 ||
        job.id === 223 ||
        job.id === 232 ||
        job.id === 65 ||
        job.id === 71 ||
        job.id === 74 ||
        job.id === 288 ||
        job.id === 228 ||
        job.id === 77 ||
        job.id === 79 ||
        job.id === 82 ||
        job.id === 81 ||
        job.id === 46 ||
        job.id === 47
      ) {
        if (job.items > 1 && job.items < 4) {
          job.t_price = job.saleprice * job.items;
        } else if (job.items >= 4) {
          job.t_price = 50 * job.items;
        } else {
          job.t_price = job.price * job.items;
        }
        // job.t_price =
        //   parseFloat(job.items > 1 ? job.saleprice : job.price) * job.items;
      } else {
        if (job.items > 1) {
          job.t_price =
            parseFloat(job.saleprice ? job.saleprice : job.price) * job.items;
        } else {
          console.log("Goes to else");

          job.t_price = parseFloat(job.price) * job.items;

          // parseFloat(job.saleprice ? job.saleprice : job.price) * job.items;
        }
      }
      console.log("Goes to el");
      this.addRemoveIntoSelectedServices(job, true);
    } else {
      console.log("Goes to else last");
      job.items = 0;
      job.t_price = 0;
      job.selected = false;
      this.addRemoveIntoSelectedServices(job, false);
    }
  };
  onShare = async () => {
    try {
      await Share.share({
        message:
          this.state.lan === "en"
            ? "Order home repair and maintenance services 💇🏻‍♀ 🏡 and Get SAR 15 on your first order from Wafarnalak 🤩🥳 !Download the app📲 https://onelink.to/p56krz and use my referral code " +
              this.state.user.referralcode
            : "اطلب خدمات اصلاح وصيانة المنزل 💇🏻‍♀ 🏡 واحصل على 15 ريال في طلبك الأول من وفرنالك 🤩🥳 عند تنزيل التطبيق https://onelink.to/wg5k82 📲 واستخدم رمز الدعوة الخاص بي " +
              this.state.user.referralcode,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  selectIt = (job) => {
    job.selected = !job.selected;
    job.items = 1;
    if (job.selected) job.t_price = job.saleprice ? job.saleprice : job.price;
    else job.t_price = 0;

    if (job.selected) this.addRemoveIntoSelectedServices(job, true);
    else this.addRemoveIntoSelectedServices(job, false);
  };
  proceedOrder = async () => {
    await AsyncStorage.setItem(
      "jobs",
      JSON.stringify(this.state.selectedServices)
    );
    await Analytics.logEvent("PromotionalCheckout", {
      name: "PromotionalCheckout",
      screen: "promotionScreen",
      purpose: "promotion checkout",
    });
    this.props.navigation.navigate("MyCart", {
      lan: this.state.lan,
      isPackage: false,
      manualy: true,
    });
  };
  render() {
    return (
      <View style={{ backgroundColor: "#F5F5F5", flex: 1 }}>
        <Header
          style={{
            marginTop: 0,
            borderBottomColor: "#0865b0",
            borderBottomWidth: 1,
            backgroundColor: "white",
            height: 60,
            justifyContent: "center",
          }}
        >
          <Left style={{ marginLeft: 10 }}>
            {this.state.lan === "en" ? (
              <Ionicons
                onPress={() => {
                  // this.setState({ totalPrice: 0, selectedServices: [] });
                  // this.addRemoveIntoSelectedServices(this.state.job, true);
                  this.props.navigation.goBack();
                }}
                name={"chevron-back-outline"}
                size={40}
                color={"#0865b0"}
              />
            ) : (
              <Ionicons
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                name={"chevron-forward-outline"}
                size={34}
                color={"#0865b0"}
              />
            )}
          </Left>
          <View
            style={{
              flex: 3,
              justifyContent: "center",
              alignItems: "center",
              position: Platform.OS === "android" ? "absolute" : "relative",
              alignSelf: "center",
            }}
          >
            {this.state.lan === "en" ? (
              <Title style={{ color: "#0865b0", fontSize: 18 }}>
                Promotions
              </Title>
            ) : (
              <Title
                style={{
                  fontFamily: "montserrat_semi_blod",
                  color: "#0866b0",
                  fontSize: 18,
                }}
              >
                عروض وتخفيضات
              </Title>
            )}
          </View>
          <Right />
        </Header>
        <View>
          {this.state.url !== "" ? (
            <View style={{ alignSelf: "center", marginTop: 6 }}>
              <Image
                source={{
                  uri:
                    //   "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/" +
                    this.state.url,
                }}
                style={{
                  width: Dimensions.get("screen").width,
                  height: 150,
                  borderRadius: 6,
                }}
                resizeMode="contain"
              />
            </View>
          ) : (
            <View></View>
          )}

          <View style={{ width: Dimensions.get("screen").width, marginTop: 5 }}>
            <View
              style={{
                width: Dimensions.get("screen").width,
                height: 48,
                backgroundColor: "#d8d8d8",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  {this.state.job ? (
                    <Image
                      source={{ uri: this.state.job.service_icon }}
                      style={{
                        marginLeft: 10,
                        marginTop: 1.3,
                        width: 45,
                        height: 45,
                      }}
                      resizeMode="contain"
                    />
                  ) : (
                    <View></View>
                  )}

                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily:
                        this.state.lan === "ar"
                          ? "montserrat_semi_blod"
                          : "Roboto",
                      marginTop: 14,
                      textAlign: "left",
                      marginLeft: 5,
                      width: Dimensions.get("screen").width - 30,
                      color: "#4a4b4c",
                    }}
                  >
                    {" "}
                    {this.state.job && this.state.lan == "en"
                      ? this.state.job.jobserviceName
                      : this.state.job && this.state.job.jobserviceName_ar}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                    position: "absolute",
                    right: 5,
                    top: 12,
                  }}
                >
                  <Image
                    source={require("../../assets/tag.png")}
                    style={{ margin: 4, width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontFamily:
                        this.state.lan === "ar"
                          ? "montserrat_semi_blod"
                          : "Roboto",
                      fontSize: 12,
                      color: "#ff9c00",
                      margin: 5,
                    }}
                  >
                    {this.state.lan == "en" ? "Promoted" : "عليها عروض"}
                  </Text>
                </View>
              </View>
            </View>
            {this.state.job && this.state.job.pricetype == 1 ? (
              // this.state.job.pricetype == 1
              <View
                style={{
                  marginLeft: 0,
                  marginRight: 0,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderTopWidth: 1,
                  borderColor: "#283a97",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginLeft: 8,
                    marginRight: 6,
                  }}
                >
                  <View style={{ marginTop: 4 }}>
                    <Text
                      style={{
                        color: "#0764af",
                        fontFamily: "montserrat_semi_blod",
                        fontSize: 12,
                        textAlign: "left",
                        width: Dimensions.get("screen").width - 140,
                      }}
                      numberOfLines={2}
                    >
                      {this.state.lan == "en"
                        ? this.state.job.name
                        : this.state.job.name_ar}
                    </Text>
                  </View>
                  <View style={{ marginTop: 8, marginRight: 26 }}>
                    <View
                      style={{
                        flexDirection:
                          this.state.lan == "en" ? "row" : "row-reverse",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#0764af",
                          fontWeight: "bold",
                        }}
                      >
                        Total SAR{" "}
                      </Text>
                      <Text style={{ color: "#ff9c00", fontSize: 10 }}>
                        {this.state.job.t_price ? this.state.job.t_price : 0}{" "}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                >
                  <View style={{ marginLeft: 12, marginTop: 12 }}>
                    <View
                      style={{
                        backgroundColor: "#0764af",
                        width: 90,
                        paddingVertical: 4,
                        marginTop: 4,
                      }}
                    >
                      <View
                        style={{
                          flexDirection:
                            this.state.lan == "en" ? "row" : "row-reverse",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 12 }}>
                          SAR{" "}
                        </Text>
                        <Text
                          style={{
                            color: "#ff9c00",
                            fontSize: 12,
                          }}
                        >
                          {this.state.job.items > 1
                            ? this.state.job.saleprice
                            : this.state.job.price}
                        </Text>
                        <Text style={{ color: "white", fontSize: 12 }}>
                          {this.state.lan == "en" ? "/Unit" : "وحدة /"}
                        </Text>
                      </View>

                      {/* <View
                        style={{
                          flexDirection:
                            this.state.lan == "en" ? "row" : "row-reverse",
                          alignSelf: "center",
                          alignContent: "center",
                          alignItems: "center",
                          flex: 1
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 12 }}>
                          SAR{" "}
                        </Text>
                        <Text
                          style={{
                            color: "#ff9c00",
                            fontSize: 12
                          }}
                        >
                          {this.state.job.items > 1
                            ? this.state.job.saleprice
                            : this.state.job.price}
                        </Text>
                        <Text style={{ color: "white", fontSize: 12 }}>
                          {this.state.lan == "en" ? "/Unit" : "وحدة /"}
                        </Text>
                      </View> */}
                    </View>
                  </View>
                  <View>
                    {/* {this.state.job.id == 228 ||
                    this.state.job.id == 232 ||
                    this.state.job.id == 223 ||
                    this.state.job.id == 230 ? ( */}

                    {this.state.job.isWarranty == 1 ? (
                      <View
                        style={{
                          alignSelf: "center",
                          marginTop: 0,
                          marginLeft: 12,
                        }}
                      >
                        {this.state.lan == "en" ? (
                          <Image
                            source={require("../../assets/waranty.png")}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                          />
                        ) : (
                          <Image
                            source={require("../../assets/warranty-ar.png")}
                            style={{ width: 40, height: 40 }}
                            resizeMode="contain"
                          />
                        )}
                      </View>
                    ) : (
                      <View></View>
                    )}
                  </View>
                  {this.state.job && this.state.job.i_notes ? (
                    <View
                      style={{
                        alignSelf: "flex-start",
                        flex: 1,
                        marginLeft: 10,
                        marginTop: 9,
                      }}
                    >
                      <TouchableOpacity onPress={this.cahngeToolTip}>
                        <View>
                          {this.state.toolTipVisible == true &&
                          this.state.job.i_notes ? (
                            <View
                              style={{
                                backgroundColor: "white",
                                borderRadius: 6,
                                top: 7,
                                right: 10,
                                left: 10,
                                borderStyle: "solid",
                                position: "absolute",
                                borderWidth: 2,
                                marginLeft: 5,
                                borderColor: "#0764af",
                                alignSelf: "flex-start",
                                borderTopLeftRadius: 0,
                                zIndex: 0,
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 7,
                                }}
                              >
                                {this.state.lan == "en"
                                  ? this.state.job.i_notes &&
                                    this.state.job.i_notes
                                  : this.state.job.i_notes_ar &&
                                    this.state.job.i_notes_ar}
                              </Text>
                            </View>
                          ) : (
                            <View></View>
                          )}
                          <View style={{ alignSelf: "flex-start" }}>
                            <Ionicons
                              name="ios-information-circle"
                              size={20}
                              color={"#0764af"}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View></View>
                  )}

                  <View style={{ marginRight: 15 }}>
                    <View style={{ marginLeft: 0, marginBottom: 3 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 12,
                          color: "#4a4b4c",
                        }}
                      >
                        {this.state.lan == "en"
                          ? "Number of units"
                          : "عدد الوحدات"}
                      </Text>
                    </View>

                    <View
                      style={{
                        backgroundColor: "#6ea8cd",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: 95,
                        height: 25,
                        borderRadius: 12,
                        alignSelf: "flex-end",
                      }}
                    >
                      <View
                        style={{
                          width: 25,
                          height: 25,
                          borderRadius: 12.5,
                          backgroundColor: "#0764af",
                          alignSelf: "center",
                          marginTop: -1,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => this.minus(this.state.job)}
                        >
                          <View style={{ alignSelf: "center", marginTop: 0 }}>
                            <Ionicons
                              name="ios-remove"
                              size={26}
                              color={"white"}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 13,
                            paddingTop: 4,
                          }}
                        >
                          {this.state.job.items ? this.state.job.items : 0}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: 25,
                          height: 25,
                          borderRadius: 12.5,
                          backgroundColor: "#0764af",
                          marginTop: 0,
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => this.plus(this.state.job)}
                        >
                          <View style={{ alignSelf: "center", marginTop: 0 }}>
                            <Ionicons
                              name="ios-add"
                              size={26}
                              color={"white"}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ) : this.state.job && this.state.job.pricetype == 4 ? (
              <TouchableOpacity
                onPress={() => {
                  this.selectIt(this.state.job);
                }}
              >
                <View>
                  <View style={{ marginTop: 8, flexDirection: "row" }}>
                    <View
                      style={{
                        marginLeft: 10,
                        width: Dimensions.get("screen").width / 2 + 80,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontFamily:
                              this.state.lan === "ar"
                                ? "montserrat_semi_blod"
                                : "Roboto",
                            color: "#0764af",
                            textAlign: "left",
                            fontSize: 12,
                            flexWrap: "wrap",
                          }}
                        >
                          {this.state.lan === "en"
                            ? this.state.job.name
                            : this.state.job.name_ar}
                        </Text>
                        <Dash
                          dashGap={1}
                          dashColor="#283a97"
                          style={{
                            marginTop: 5,
                            width: Dimensions.get("screen").width - 120,
                            height: 1,
                          }}
                        />
                      </View>
                      <View style={{ marginTop: 5 }}>
                        <Text
                          style={{
                            fontFamily:
                              this.state.lan === "ar"
                                ? "montserrat_semi_blod"
                                : "Roboto",
                            fontSize: 10,
                            flex: 1,
                            flexWrap: "wrap",
                            textAlign: "left",
                          }}
                        >
                          {this.state.lan === "en"
                            ? this.state.job.description
                            : this.state.job.description_ar}
                        </Text>
                        <Dash
                          dashGap={1}
                          dashColor="#283a97"
                          style={{
                            marginTop: 5,
                            width: Dimensions.get("screen").width - 120,
                            height: 1,
                          }}
                        />
                      </View>
                      <View style={{ marginTop: 5 }}>
                        <Text
                          style={{
                            fontFamily:
                              this.state.lan === "ar"
                                ? "montserrat_semi_blod"
                                : "Roboto",
                            fontSize: 10,
                            flex: 1,
                            flexWrap: "wrap",
                            textAlign: "left",
                          }}
                        >
                          {this.state.lan === "en"
                            ? this.state.job.tips_en
                            : this.state.job.tips_ar}
                        </Text>
                        <Dash
                          dashGap={1}
                          dashColor="#283a97"
                          style={{
                            marginTop: 5,
                            width: Dimensions.get("screen").width - 120,
                            height: 1,
                          }}
                        />
                      </View>
                    </View>
                    {this.state.job.saleprice &&
                    this.state.job.saleprice > 0 ? (
                      <View style={{ position: "absolute", right: 10 }}>
                        <Text
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 10,
                            fontSize: 13,
                            fontFamily:
                              this.state.lan === "ar"
                                ? "montserrat_semi_blod"
                                : "Roboto",
                          }}
                        >
                          {this.state.lan === "en" ? "Discount" : "خصم"}{" "}
                          {this.state.lan === "en"
                            ? (
                                ((this.state.job.price -
                                  this.state.job.saleprice) /
                                  this.state.job.price) *
                                100
                              ).toFixed()
                            : (
                                ((this.state.job.price -
                                  this.state.job.saleprice) /
                                  this.state.job.price) *
                                100
                              ).toFixed()}
                          %
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            position: "absolute",
                            top: 20,
                            right: 10,
                            backgroundColor: "#283a97",
                            width: 60,
                          }}
                        >
                          <View
                            style={{
                              position: "absolute",
                              transform: [{ rotate: "13deg" }],
                              top: 7,
                              backgroundColor: "red",
                              width: 58,
                              height: 2.3,
                            }}
                          />
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              flex: 1,
                              alignSelf: "center",
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "center",
                                fontSize: 12,
                                fontFamily:
                                  this.state.lan === "ar"
                                    ? "montserrat_semi_blod"
                                    : "Roboto",
                                color: "white",
                              }}
                            >
                              SAR
                            </Text>
                            {this.state.lan === "en" ? (
                              <View>
                                <Text
                                  style={{
                                    textAlign: "center",
                                    fontSize: 13,
                                    color: "#ff9c00",
                                  }}
                                >
                                  {this.state.job.price}{" "}
                                </Text>
                              </View>
                            ) : (
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 10,
                                  color: "#ff9c00",
                                }}
                              >
                                {" "}
                                {this.state.job.price}{" "}
                              </Text>
                            )}
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            position: "absolute",
                            top: 40,
                            right: 10,
                            backgroundColor: "#283a97",
                            width: 60,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              flex: 1,
                              alignSelf: "center",
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "center",
                                fontSize: 12,
                                fontFamily:
                                  this.state.lan === "ar"
                                    ? "montserrat_semi_blod"
                                    : "Roboto",
                                color: "white",
                              }}
                            >
                              SAR
                            </Text>
                            {this.state.lan === "en" ? (
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 13,
                                  color: "#ff9c00",
                                }}
                              >
                                {this.state.job.saleprice}{" "}
                              </Text>
                            ) : (
                              <Text
                                style={{
                                  textAlign: "center",
                                  fontSize: 10,
                                  color: "#ff9c00",
                                }}
                              >
                                {" "}
                                {this.state.job.saleprice}{" "}
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>
                    ) : (
                      <View
                        style={{
                          flexDirection: "row",
                          position: "absolute",
                          top: 10,
                          right: 10,
                          backgroundColor: "#283a97",
                          width: 60,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: 1,
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 12,
                              fontFamily:
                                this.state.lan === "ar"
                                  ? "montserrat_semi_blod"
                                  : "Roboto",
                              color: "white",
                            }}
                          >
                            SAR
                          </Text>
                          {this.state.lan === "en" ? (
                            <Text
                              style={{
                                textAlign: "center",
                                fontSize: 13,
                                color: "#ff9c00",
                              }}
                            >
                              {this.state.job.price}{" "}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                textAlign: "center",
                                fontSize: 10,
                                color: "#ff9c00",
                              }}
                            >
                              {" "}
                              {this.state.job.price}{" "}
                            </Text>
                          )}
                        </View>
                      </View>
                    )}

                    <View
                      style={{
                        position: "absolute",
                        right: this.state.lan === "en" ? 33 : 24,
                        top:
                          this.state.job.saleprice &&
                          this.state.job.saleprice > 0
                            ? 60
                            : 40,
                      }}
                    >
                      {this.state.job &&
                      this.state.job.selected &&
                      this.state.job.selected === true ? (
                        <Ionicons
                          name="ios-checkmark-circle"
                          size={20}
                          color="#283a97"
                        />
                      ) : (
                        <Ionicons
                          name="ios-checkmark-circle-outline"
                          size={20}
                          color="#283a97"
                        />
                      )}
                    </View>
                  </View>
                  <Dash
                    dashGap={0}
                    dashColor="#283a97"
                    style={{
                      marginTop: 10,
                      width: Dimensions.get("screen").width,
                      height: 1.5,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ) : this.state.job && this.state.job.pricetype == 2 ? (
              <View>
                <SelectableJob
                  lan={this.state.lan}
                  job={this.state.job}
                  index={0}
                  selectJob={this.selectJob}
                  isBanner={true}
                />
              </View>
            ) : (
              // <View
              //   style={{
              //     marginLeft: 15,
              //     marginRight: 15,
              //     backgroundColor: "white",
              //     borderWidth: 1,
              //     borderTopWidth: 1,
              //     borderColor: "#283a97",
              //     borderTopWidth: 1,
              //   }}
              // >
              //   <View
              //     style={{
              //       flexDirection: "row",
              //       justifyContent: "space-between",
              //       marginLeft: 8,
              //       marginRight: 6,
              //     }}
              //   >
              //     <View
              //       style={{
              //         marginTop: 4,
              //       }}
              //     >
              //       <Text
              //         style={{
              //           color: "#0764af",
              //           fontFamily: "montserrat_semi_blod",
              //           fontSize: 12,
              //           textAlign: "left",
              //           width: Dimensions.get("screen").width - 140,
              //         }}
              //         numberOfLines={2}
              //       >
              //         {/* {lan == "en" ? job.name : " ترتيب زيارة"}{" "} */}
              //         {this.state.lan == "en"
              //           ? this.state.job.name
              //           : this.state.job.name_ar}{" "}
              //       </Text>
              //     </View>
              //     <View
              //       style={{
              //         marginRight: 26,
              //         marginTop: 8,

              //         marginLeft: 8,
              //       }}
              //     >
              //       <View
              //         style={{
              //           flexDirection:
              //             this.state.lan == "en" ? "row" : "row-reverse",
              //         }}
              //       >
              //         <Text
              //           style={{
              //             fontSize: 10,
              //             color: "#0764af",
              //             fontWeight: "bold",
              //           }}
              //         >
              //           Total SAR{" "}
              //         </Text>
              //         <Text
              //           style={{
              //             color: "#ff9c00",
              //             fontSize: 10,
              //             paddingLeft: 4,
              //           }}
              //         >
              //           {this.state.job.t_price ? this.state.job.t_price : 0}{" "}
              //         </Text>
              //       </View>
              //     </View>
              //   </View>
              //   <View
              //     style={{
              //       flexDirection: "row",
              //       justifyContent: "space-between",
              //       marginTop: 15,
              //       marginBottom: 15,
              //     }}
              //   >
              //     <View style={{ marginLeft: 12, marginTop: 12 }}>
              //       <View>
              //         <View
              //           style={{
              //             backgroundColor: "#0764af",
              //             width: 90,
              //           }}
              //         >
              //           <View
              //             style={{
              //               flexDirection:
              //                 this.state.lan == "en" ? "row" : "row-reverse",
              //               alignSelf: "center",
              //               alignContent: "center",
              //               alignItems: "center",
              //               flex: 1,
              //             }}
              //           >
              //             <Text
              //               style={{
              //                 color: "white",
              //                 fontSize: 12,
              //               }}
              //             >
              //               SAR{" "}
              //             </Text>
              //             <Text
              //               style={{
              //                 color: "#ff9c00",
              //                 fontSize: 12,
              //               }}
              //             >
              //               {this.state.job.price}
              //             </Text>
              //             <Text
              //               style={{
              //                 color: "white",
              //                 fontSize: 12,
              //               }}
              //             >
              //               {this.state.lan == "en" ? "/Visit" : "زيارة/"}
              //             </Text>
              //           </View>
              //         </View>
              //       </View>
              //     </View>
              //     <View
              //       style={{ marginRight: this.state.lan == "en" ? 20 : 37 }}
              //     >
              //       {/* 30 */}
              //       <Text
              //         style={{
              //           // textAlign: "center",
              //           fontSize: 12,
              //           color: "#4a4b4c",
              //           marginBottom: 3,
              //           //marginLeft: 50,
              //         }}
              //       >
              //         {this.state.lan == "en"
              //           ? "Book Appointment"
              //           : "إحجز موعد"}
              //       </Text>
              //       <TouchableOpacity
              //         onPress={() => this.selectJob(this.state.job)}
              //         hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
              //       >
              //         <View style={{ alignSelf: "center" }}>
              //           <Ionicons
              //             name={
              //               this.state.job.selected &&
              //               this.state.job.selected == true
              //                 ? "ios-checkmark-circle"
              //                 : "ios-checkmark-circle-outline"
              //             }
              //             size={26}
              //             color={"#0764af"}
              //           />
              //         </View>
              //       </TouchableOpacity>
              //     </View>
              //   </View>
              //   <View
              //     style={{ marginLeft: 15, marginRight: 15, marginBottom: 5 }}
              //   >
              //     <View
              //       style={{
              //         backgroundColor: "white",
              //         marginLeft: 1,
              //         marginRight: 1,
              //       }}
              //     >
              //       {/* <Text style={{ fontWeight: "bold", textAlign: "left" }}>
              //       {lan == "en" ? "Notes:" : "ملاحظات:"}
              //     </Text> */}
              //       {/* fontSize : 9 */}
              //       <Text style={{ textAlign: "justify", fontSize: 11 }}>
              //         {this.state.lan == "en"
              //           ? "This is only visit charge, our technician will quote the service price after survey."
              //           : "هذه ليست سوى رسوم زيارة ، سيقوم الفني لدينا بتحديد سعر الخدمة بعد فحص المشكلة."}
              //       </Text>
              //     </View>
              //   </View>
              // </View>
              <View></View>
            )}
          </View>
          <View style={{ marginTop: 15 }}>
            {this.state.user !== null ? (
              <View
                style={{
                  backgroundColor: "#F5F5F5",
                  width: Dimensions.get("screen").width - 30,
                  marginBottom: 5,
                  alignSelf: "center",
                }}
              >
                <View style={{ marginTop: 10, alignSelf: "center" }}>
                  {this.state.lan === "en" ? (
                    <Text style={{ color: "#0865b0", fontSize: 18 }}>
                      Your Referral Code:
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#0865b0",
                        fontSize: 18,
                      }}
                    >
                      كود الإحالة الخاص بك
                    </Text>
                  )}
                </View>
                <TouchableOpacity onPress={this.onShare}>
                  <View
                    style={{
                      alignSelf: "center",
                      backgroundColor: "white",
                      width: Dimensions.get("screen").width - 70,
                      height: 40,
                      marginTop: 12,
                    }}
                  >
                    <View
                      style={{
                        alignSelf: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: 1,
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          color: "#0865b0",
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        {this.state.user && this.state.user.referralcode}
                      </Text>
                      <Image
                        source={require("../../assets/share_ref.png")}
                        style={{ width: 30, height: 30, marginLeft: 14 }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    alignSelf: "center",
                    marginTop: 20,
                    marginBottom: 10,
                  }}
                >
                  {this.state.lan === "en" ? (
                    <Text
                      style={{
                        textAlign: "center",
                        paddingLeft: 20,
                        paddingRight: 20,
                        fontSize: 14,
                        color: "#4a4b4c",
                      }}
                    >
                      Share your code with your friends, after their first order
                      you'll get 300 points which equals SAR 15 and they'll get
                      😊 300 points as well{"\n"} 😊 Start Sharing it Now 🤩
                    </Text>
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 14,
                        lineHeight: 18,
                        marginLeft: 6,
                        marginRight: 6,
                      }}
                    >
                      شارك الرمز الخاص بك مع أصدقائك ، بمجرد إجرائهم اول طلب
                      خدمة ستربح 😊 300 نقطة والتي تساوي 15 ر.س، وسيحصلون هم على
                      300 نقطة😊 ايضاً، ابدأ المشاركة الآن🤩{" "}
                    </Text>
                  )}
                </View>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        </View>
        {this.state.selectedServices.length > 0 ? (
          <View
            style={{
              borderTopColor: "#F5F5F5",
              backgroundColor: "white",
              borderTopWidth: 0,
              height: 90,
              position: "absolute",
              bottom: 0,
              width: "100%",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={this.proceedOrder}>
              <View
                style={{
                  backgroundColor: "#0764af",
                  borderRadius: 10,
                  width: Dimensions.get("screen").width - 120,
                  alignSelf: "center",
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
                      alignSelf: "center",
                    }}
                  >
                    {this.state.lan == "en" ? "Checkout" : "تقديم الطلب"} {"\t"}{" "}
                    {"\t"} SAR{" "}
                    {this.state.totalPrice > 0 ? this.state.totalPrice : ""}
                  </Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  }
}
