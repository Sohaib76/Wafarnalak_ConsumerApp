// import React from "react";
// import {
//   View,
//   Image,
//   AsyncStorage,
//   Dimensions,
//   TouchableOpacity,
//   BackHandler
// } from "react-native";
// import {
//   Container,
//   Accordion,
//   Title,
//   Header,
//   Content,
//   Text,
//   Left,
//   Toast,
//   Right,
//   Footer
// } from "native-base";
// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// import VarientbaseJob from "./jobs/varientbaseJob";
// import SizebaseJob from "./jobs/sizebaseJob";
// import DecoCategory from "./jobs/DecoCategory";
// import Cleaning from "./jobs/Cleaning";
// import SelectableJob from "./jobs/selectableJob";
// import QuantitybaseJob from "./jobs/quantitybaseJob";
// import * as Analytics from "expo-firebase-analytics";
// import SecuritybaseJobs from "./jobs/SecuritybaseJobs";
// export default class PromotionService extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       services: [],
//       lan: "en",
//       services: {},
//       selectedServices: [],
//       totalOrderPrice: 0,
//       isRefresh: false,
//       toolTipVisible: -1
//     };
//     console.log("props ======", this.props.navigation.state.params);
//   }
//   componentDidMount = async () => {
//     const { navigation } = this.props;
//     this.getServiceObj(navigation.getParam("serviceid"));
//     let jobs = await AsyncStorage.getItem("jobs");

//     this.setState({
//       lan: navigation.getParam("lan"),
//       selectedServices: jobs !== null ? JSON.parse(jobs) : []
//     });
//     let lan = await AsyncStorage.getItem("lan");
//     this.setState({ lan: lan });
//     BackHandler.addEventListener(
//       "hardwareBackPress",
//       this.handleBackButtonClick
//     );
//   };
//   getServiceObj = serviceid => {
//     fetch(
//       "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/v1.2/get_service_object",
//       {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           serviceid: serviceid
//         })
//       }
//     )
//       .then(response => response.json())
//       .then(responseJson => {
//         if (responseJson.error == false) {
//           this.setState({ services: responseJson.services });
//           console.log("service-----", this.state.services);
//         }
//       })
//       .catch(error => {
//         this.setState({ loading: false });
//       });
//   };
//   handleBackButtonClick = () => {
//     this.props.navigation.navigate("LandingSecreen");
//     return true;
//   };
//   componentWillUnmount = () => {
//     BackHandler.removeEventListener(
//       "hardwareBackPress",
//       this.handleBackButtonClick
//     );
//   };
//   _renderHeader = (data, expanded) => {
//     return (
//       <View
//         style={{
//           flexDirection: "row",
//           padding: 10,
//           backgroundColor: expanded ? "#d8d8d8" : "#F5F5F5",
//           alignSelf: "center",
//           width: Dimensions.get("screen").width - 30,
//           height: 67,
//           borderWidth: 1,
//           borderBottomColor: "lightgray"
//         }}
//       >
//         <Left style={{ flexDirection: "row" }}>
//           <Image
//             source={{
//               uri:
//                 data.seo_name !== null
//                   ? data.seo_name
//                   : "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/image-placeholder.png?alt=media&token=10ced05a-f905-4951-9298-ff47e771f070"
//             }}
//             style={{
//               width: 45,
//               height: 45,
//               marginTop: 4
//             }}
//             resizeMode="contain"
//           />
//           <View style={{ marginTop: 4 }}>
//             <Text
//               style={{
//                 fontSize: 13,

//                 textAlign: "left",

//                 marginLeft: 12,
//                 width: Dimensions.get("screen").width - 30,
//                 color: "#0865b0"
//               }}
//             >
//               {this.state.lan == "en" ? data.name : data.name_ar}
//             </Text>
//             <View style={{ flexDirection: "row" }}>
//               <Text
//                 style={{
//                   color: "#4a4b4c",
//                   fontSize: 11,
//                   marginLeft: 12,
//                   marginRight: 10
//                 }}
//               >
//                 {this.state.lan == "en" ? "Total Services" : "مجموع الخدمات"}
//               </Text>
//               <View
//                 style={{
//                   backgroundColor: "#0865b0",
//                   marginLeft: 5,
//                   paddingLeft: 4,
//                   paddingRight: 4
//                 }}
//               >
//                 <Text style={{ color: "white", fontSize: 10 }}>
//                   {data.jobs ? data.jobs.length : 0}
//                 </Text>
//               </View>
//             </View>
//             <Text
//               style={{
//                 textAlign: "left",
//                 color: "#4a4b4c",
//                 fontSize: 10,
//                 marginLeft: 12
//               }}
//             >
//               {this.state.lan == "en" ? "24/7 Booking" : "حجز على مدار الساعة"}
//             </Text>
//           </View>
//         </Left>
//         <Right>
//           <View style={{ flexDirection: "row" }}>
//             {/* <Image
//               source={require("../assets/Promoted-min.png")}
//               style={{ width: 55, height: 35, marginRight: 40 }}
//               resizeMode="contain"
//             /> */}
//             {expanded ? (
//               <Ionicons
//                 style={{ fontSize: 24 }}
//                 name="ios-chevron-down"
//                 color="#0865b0"
//               />
//             ) : (
//               <Ionicons
//                 style={{ fontSize: 24 }}
//                 name={
//                   this.state.lan == "en"
//                     ? "chevron-forward-outline"
//                     : "chevron-back-outline"
//                 }
//                 color="#0865b0"
//               />
//             )}
//           </View>
//         </Right>
//       </View>
//     );
//   };
//   minusMeters = job => {
//     if (job.meter && job.meter >= 50) {
//       job.meter = job.meter - 50;
//       job.m_price = job.meter * job.price;
//     } else {
//       job.meter = 0;
//       job.m_price = job.meter * job.price;
//     }
//     if (job.items) {
//       job.t_price = job.items * job.m_price;
//     } else {
//       job.items = 1;
//       job.t_price = job.items * job.m_price;
//     }

//     this.setState({ isRefresh: !this.state.isRefresh });
//   };
//   plusMeters = job => {
//     if (job.meter) {
//       job.meter = job.meter + 50;
//       job.m_price = job.meter * job.price;
//     } else {
//       job.meter = 50;
//       job.m_price = job.meter * job.price;
//     }
//     if (job.items) {
//       job.t_price = job.items * job.m_price;
//     } else {
//       job.items = 1;
//       job.t_price = job.items * job.m_price;
//     }
//     this.setState({ isRefresh: !this.state.isRefresh });
//   };
//   plusFloors = job => {
//     if (job.items) {
//       job.items++;
//     } else {
//       job.items = 1;
//     }
//     if (job.m_price) {
//       job.t_price = job.items * job.m_price;
//     } else {
//       job.meter = 50;
//       job.m_price = job.meter * job.price;
//       job.t_price = job.items * job.m_price;
//     }

//     job.selected = true;
//     this.addRemoveIntoSelectedServices(job, true);
//   };
//   minusFloors = job => {
//     if (job.items && job.items >= 1) {
//       job.items--;
//       if (job.m_price) {
//         job.t_price = job.items * job.m_price;
//       } else {
//         job.meter = 50;
//         job.m_price = job.meter * job.price;
//         job.t_price = job.items * job.m_price;
//       }
//       this.addRemoveIntoSelectedServices(job, true);
//     } else {
//       job.items = 0;
//       job.t_price = 0;
//       job.meter = 0;
//       job.m_price = 0;
//       job.selected = false;
//       this.addRemoveIntoSelectedServices(job, false);
//     }
//   };
//   cahngeToolTip = tIndex => {
//     if (this.state.toolTipVisible == -1) {
//       this.setState({ toolTipVisible: tIndex });
//     } else {
//       this.setState({ toolTipVisible: -1 });
//     }
//   };
//   _renderContent = data => {
//     console.log("data", data, "jobs ", data.jobs[5]);
//     return (
//       <View
//         style={{
//           width: Dimensions.get("screen").width,
//           alignSelf: "center"
//         }}
//       >
//         {data.jobs &&
//           data.jobs.map(
//             function(job, index) {
//               console.log("job ", job);
//               if (job.pricetype == 1) {
//                 return (
//                   <QuantitybaseJob
//                     job={job}
//                     lan={this.state.lan}
//                     key={index}
//                     index={index}
//                     plus={this.plusQuantity}
//                     minus={this.minusQuantity}
//                     toolTipVisible={this.state.toolTipVisible}
//                     cahngeToolTip={this.cahngeToolTip}
//                   />
//                 );
//               }
//               if (job.pricetype == 2) {
//                 return (
//                   <SelectableJob
//                     lan={this.state.lan}
//                     job={job}
//                     index={index}
//                     key={index}
//                     selectJob={this.selectJob}
//                   />
//                 );
//               }
//               if (job.pricetype == 5) {
//                 return (
//                   <VarientbaseJob
//                     lan={this.state.lan}
//                     job={job}
//                     index={index}
//                     key={index}
//                     plusVarient={this.plusVarient}
//                     minusVarient={this.minusVarient}
//                     calculateVarient={this.calculateVarient}
//                     calculateSubVariant={this.calculateSubVariant}
//                     plus={this.plusQuantity}
//                     minus={this.minusQuantity}
//                   />
//                 );
//               }
//               if (job.pricetype == 6) {
//                 return (
//                   <SizebaseJob
//                     plusMeters={this.plusMeters}
//                     minusMeters={this.minusMeters}
//                     plusFloors={this.plusFloors}
//                     index={index}
//                     minusFloors={this.minusFloors}
//                     lan={this.state.lan}
//                     job={job}
//                     key={index}
//                   />
//                 );
//               }
//               if (job.pricetype == 7) {
//                 return (
//                   <DecoCategory
//                     lan={this.state.lan}
//                     job={job}
//                     index={index}
//                     key={index}
//                     selectJob={this.selectJob}
//                   />
//                 );
//               }
//               if (job.pricetype == 8) {
//                 return (
//                   <SecuritybaseJobs
//                     job={job}
//                     cahngeToolTip={this.cahngeToolTip}
//                     index={index}
//                     toolTipVisible={this.state.toolTipVisible}
//                     lan={this.state.lan}
//                     key={index}
//                     plus={this.plusQuantity}
//                     minus={this.minusQuantity}
//                   />
//                 );
//               }
//               if (job.pricetype == 9) {
//                 return (
//                   <Cleaning
//                     lan={this.state.lan}
//                     job={job}
//                     index={index}
//                     key={index}
//                     selectJob={this.selectJob}
//                   />
//                 );
//               }
//             }.bind(this)
//           )}
//       </View>
//     );
//   };
//   minusVarient = (varient, job) => {
//     if (job.selected && job.selected == true) {
//       let total = 0;
//       varient.variants_attr.forEach(var_attr => {
//         var_attr.attr.forEach(attr => {
//           if (attr.selected && attr.t_price) {
//             total = total + attr.t_price;
//           }
//         });
//       });
//       if (varient.items) varient.items--;
//       else varient.items = 1;
//       varient.t_price = varient.items * total;
//       this.addRemoveIntoSelectedServices(job, true);
//     }
//   };
//   plusVarient = (varient, job) => {
//     if (job.selected && job.selected == true) {
//       let total = 0;
//       varient.variants_attr.forEach(var_attr => {
//         var_attr.attr.forEach(attr => {
//           if (attr.selected && attr.t_price) {
//             total = total + attr.t_price;
//           }
//         });
//       });
//       if (varient.items) varient.items++;
//       else varient.items = 1;
//       varient.t_price = varient.items * total;
//       this.addRemoveIntoSelectedServices(job, true);
//     }
//   };
//   calculateSubVariant = (attr, varient, job) => {
//     if (job.selected && job.selected == true) {
//       varient.subvariants &&
//         varient.subvariants.forEach(subvariant => {
//           subvariant.subvariants_attr.forEach(sub_atr => {
//             sub_atr.attr.forEach(in_attr => {
//               if (
//                 in_attr.selected == true &&
//                 in_attr.attr_type == attr.attr_type
//               ) {
//                 in_attr.selected = false;
//               }
//             });
//           });
//         });
//       attr.selected = !attr.selected;
//       if (attr.attr_type == 1) {
//         attr.t_price =
//           attr.selected && attr.selected == true ? attr.attr_price : 0;
//       }

//       varient.t_price = varient.items * attr.t_price ? attr.t_price : 0;
//       let copySelectedJobs = this.state.selectedServices;
//       this.setState({ selectedServices: copySelectedJobs });
//     }
//   };
//   calculateVarient = (attr, varient, job) => {
//     if (job.selected && job.selected == true) {
//       varient.variants_attr.forEach(var_attr => {
//         var_attr.attr.forEach(inner_attr => {
//           if (
//             inner_attr.selected == true &&
//             inner_attr.attr_type == attr.attr_type
//           ) {
//             inner_attr.selected = false;
//           }
//         });
//       });

//       attr.selected = !attr.selected;
//       if (attr.attr_type == 1) {
//         attr.t_price =
//           attr.selected && attr.selected == true ? attr.attr_price : 0;
//       }
//       if (attr.attr_price) {
//         varient.t_price = varient.items * attr.t_price;
//       }

//       let copySelectedJobs = this.state.selectedServices;
//       this.setState({ selectedServices: copySelectedJobs });
//     }
//   };
//   plusQuantity = job => {
//     if (job.items) job.items++;
//     else job.items = 1;
//     if (job.id === 70 || job.id === 61 || job.id === 82) {
//       job.t_price =
//         parseFloat(job.items > 1 ? job.saleprice : job.price) * job.items;
//     } else {
//       job.t_price =
//         parseFloat(job.saleprice ? job.saleprice : job.price) * job.items;
//     }

//     job.selected = true;
//     this.addRemoveIntoSelectedServices(job, true);
//   };
//   minusQuantity = job => {
//     if (job.items && job.items >= 1) {
//       job.items--;
//       if (job.id === 70 || job.id === 61 || job.id === 82) {
//         job.t_price =
//           parseFloat(job.items > 1 ? job.saleprice : job.price) * job.items;
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
//   selectJob = job => {
//     job.selected = !job.selected;
//     job.items = 1;
//     if (job.selected) job.t_price = job.saleprice ? job.saleprice : job.price;
//     else job.t_price = 0;

//     if (job.selected) this.addRemoveIntoSelectedServices(job, true);
//     else this.addRemoveIntoSelectedServices(job, false);
//   };
//   addRemoveIntoSelectedServices = async (job, add) => {
//     (job.serviceId = this.state.services.id),
//       (job.jobserviceName = this.state.services.name),
//       (job.jobserviceNameAr = this.state.services.name_ar),
//       (job.jobServiceIcon = this.state.services.seo_name);

//     let allServices = this.state.selectedServices;
//     let index = allServices.findIndex(service => service.id === job.id);

//     if (add === false && job.items > 0) {
//       allServices.splice(index, 1);

//       this.setState({ selectedServices: allServices });
//     }
//     if (add === true) {
//       if (job.items < 1) {
//         allServices.splice(index, 1);

//         this.setState({
//           selectedServices: allServices
//         });
//       } else {
//         if (index > -1) {
//           allServices[index] = job;
//         } else {
//           allServices.push(job);
//         }
//         this.setState({
//           selectedServices: allServices
//         });
//       }
//     }
//     await AsyncStorage.setItem("jobs", JSON.stringify(allServices));
//     this.calculateTotalOrderPrices();
//   };
//   calculateTotalOrderPrices = () => {
//     let total = 0;
//     this.state.selectedServices.forEach(service => {
//       total = total + service.t_price;
//     });
//     this.setState({ totalOrderPrice: total });
//   };
//   checkout = async () => {
//     if (this.state.selectedServices.length > 0) {
//       await AsyncStorage.setItem(
//         "jobs",
//         JSON.stringify(this.state.selectedServices)
//       );
//       await Analytics.logEvent(this.state.services.name, {
//         name: this.state.services.name,
//         screen: "promotionScreen",
//         purpose: "checkout order from categories screen"
//       });
//       this.props.navigation.navigate("MyCart", {
//         lan: this.state.lan,
//         isPackage: false
//       });
//     } else {
//       Toast.show({
//         text:
//           this.state.lan == "en"
//             ? "Select any service first to proceed"
//             : "أختر اي خدمة للإستمرار",
//         position: "bottom"
//       });
//     }
//   };
//   render() {
//     const { navigation } = this.props;
//     var lan = navigation.getParam("lan");
//     return (
//       <Container>
//         <Header
//           style={{
//             marginTop: 0,
//             borderBottomWidth: 1,
//             borderBottomColor: "#0866b0",
//             backgroundColor: "#ffffff",
//             height: 60,
//             justifyContent: "center"
//           }}
//         >
//           <Left style={{ marginLeft: 10 }}>
//             <Ionicons
//               onPress={() => this.props.navigation.navigate("LandingSecreen")}
//               name={lan == "en" ? "chevron-back-outline" : "chevron-forward-outline"}
//               size={34}
//               color={"#0866b0"}
//             />
//           </Left>
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
//               {lan == "en"
//                 ? this.state.services.name
//                 : this.state.services.name_ar}
//             </Title>
//           </View>
//           <Right />
//         </Header>

//         <Content>
//           <LinearGradient
//             colors={["#0764af", "#6ea8cd"]}
//             start={[0.9, 0.2]}
//             end={[0.1, 0.1]}
//             style={{
//               width: Dimensions.get("screen").width,
//               height:
//                 this.state.services.id == 17 ||
//                 this.state.services.id == 45 ||
//                 this.state.services.id == 47
//                   ? Dimensions.get("screen").height + 60
//                   : "100%"
//             }}
//           >
//             <Image
//               source={{
//                 uri:
//                   "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/" +
//                   this.state.services.banner
//               }}
//               style={{
//                 width: Dimensions.get("screen").width,
//                 height: 196,
//                 alignSelf: "center"
//               }}
//               resizeMode="contain"
//             />
//             <View>
//               <Accordion
//                 style={{ borderRadius: 10 }}
//                 dataArray={this.state.services.products}
//                 expanded={false}
//                 renderHeader={this._renderHeader}
//                 renderContent={this._renderContent}
//               />
//             </View>
//           </LinearGradient>
//         </Content>
//         <Footer
//           style={{ backgroundColor: "white", borderWidth: 0, height: 90 }}
//         >
//           <TouchableOpacity onPress={this.checkout}>
//             <View
//               style={{
//                 backgroundColor: "#0764af",
//                 borderRadius: 12,
//                 width: Dimensions.get("screen").width - 120,
//                 alignSelf: "center"
//               }}
//             >
//               <LinearGradient
//                 colors={["#0764af", "#6ea8cd"]}
//                 start={[0.9, 0.2]}
//                 end={[0.1, 0.1]}
//                 style={{ borderRadius: 12 }}
//               >
//                 <Text
//                   style={{ color: "white", margin: 12, alignSelf: "center" }}
//                 >
//                   {this.state.lan == "en" ? " Check out" : " تقديم الطلب"}
//                   {"\t"} {"\t"}SAR {this.state.totalOrderPrice}
//                 </Text>
//               </LinearGradient>
//             </View>
//           </TouchableOpacity>
//         </Footer>
//       </Container>
//     );
//   }
// }
import React from "react";
import {
  View,
  Image,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  ScrollView
} from "react-native";
import {
  Container,
  Accordion,
  Title,
  Header,
  Content,
  Text,
  Left,
  Toast,
  Right,
  Footer
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import VarientbaseJob from "./jobs/varientbaseJob";
import SizebaseJob from "./jobs/sizebaseJob";
import DecoCategory from "./jobs/DecoCategory";
import Cleaning from "./jobs/Cleaning";
import SelectableJob from "./jobs/selectableJob";
import QuantitybaseJob from "./jobs/quantitybaseJob";
import * as Analytics from "expo-firebase-analytics";
import SecuritybaseJobs from "./jobs/SecuritybaseJobs";
export default class PromotionService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      lan: "en",
      services: {},
      selectedServices: [],
      totalOrderPrice: 0,
      isRefresh: false,
      toolTipVisible: -1
    };
    console.log("props ======", this.props.navigation.state.params);
  }
  componentDidMount = async () => {
    const { navigation } = this.props;
    this.getServiceObj(navigation.getParam("serviceid"));
    let jobs = await AsyncStorage.getItem("jobs");

    this.setState({
      lan: navigation.getParam("lan"),
      selectedServices: jobs !== null ? JSON.parse(jobs) : []
    });
    let lan = await AsyncStorage.getItem("lan");
    this.setState({ lan: lan });
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  getServiceObj = serviceid => {
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/v1.2/get_service_object",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          serviceid: serviceid
        })
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error == false) {
          this.setState({ services: responseJson.services });
          console.log("service-----", this.state.services);
        }
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };
  handleBackButtonClick = () => {
    this.props.navigation.navigate("LandingSecreen");
    return true;
  };
  componentWillUnmount = () => {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  };
  _renderHeader = (data, expanded) => {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          backgroundColor: expanded ? "#d8d8d8" : "#F5F5F5",
          alignSelf: "center",
          width: Dimensions.get("screen").width - 30,
          height: 67,
          borderWidth: 1,
          borderBottomColor: "lightgray"
        }}
      >
        <Left style={{ flexDirection: "row" }}>
          <Image
            source={{
              uri:
                data.seo_name !== null
                  ? data.seo_name
                  : "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/image-placeholder.png?alt=media&token=10ced05a-f905-4951-9298-ff47e771f070"
            }}
            style={{
              width: 45,
              height: 45,
              marginTop: 4
            }}
            resizeMode="contain"
          />
          <View style={{ marginTop: 4 }}>
            <Text
              style={{
                fontSize: 13,

                textAlign: "left",

                marginLeft: 12,
                width: Dimensions.get("screen").width - 30,
                color: "#0865b0"
              }}
            >
              {this.state.lan == "en" ? data.name : data.name_ar}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: "#4a4b4c",
                  fontSize: 11,
                  marginLeft: 12,
                  marginRight: 10
                }}
              >
                {this.state.lan == "en" ? "Total Services" : "مجموع الخدمات"}
              </Text>
              <View
                style={{
                  backgroundColor: "#0865b0",
                  marginLeft: 5,
                  paddingLeft: 4,
                  paddingRight: 4
                }}
              >
                <Text style={{ color: "white", fontSize: 10 }}>
                  {data.jobs ? data.jobs.length : 0}
                </Text>
              </View>
            </View>
            <Text
              style={{
                textAlign: "left",
                color: "#4a4b4c",
                fontSize: 10,
                marginLeft: 12
              }}
            >
              {this.state.lan == "en" ? "24/7 Booking" : "حجز على مدار الساعة"}
            </Text>
          </View>
        </Left>
        <Right>
          <View style={{ flexDirection: "row" }}>
            {/* <Image
              source={require("../assets/Promoted-min.png")}
              style={{ width: 55, height: 35, marginRight: 40 }}
              resizeMode="contain"
            /> */}
            {expanded ? (
              <Ionicons
                style={{ fontSize: 24 }}
                name="ios-chevron-down"
                color="#0865b0"
              />
            ) : (
              <Ionicons
                style={{ fontSize: 24 }}
                name={
                  this.state.lan == "en"
                    ? "chevron-forward-outline"
                    : "chevron-back-outline"
                }
                color="#0865b0"
              />
            )}
          </View>
        </Right>
      </View>
    );
  };
  minusMeters = job => {
    if (job.meter && job.meter >= 50) {
      job.meter = job.meter - 50;
      job.m_price = job.meter * job.price;
    } else {
      job.meter = 0;
      job.m_price = job.meter * job.price;
    }
    if (job.items) {
      job.t_price = job.items * job.m_price;
    } else {
      job.items = 1;
      job.t_price = job.items * job.m_price;
    }

    this.setState({ isRefresh: !this.state.isRefresh });
  };
  plusMeters = job => {
    if (job.meter) {
      job.meter = job.meter + 50;
      job.m_price = job.meter * job.price;
    } else {
      job.meter = 50;
      job.m_price = job.meter * job.price;
    }
    if (job.items) {
      job.t_price = job.items * job.m_price;
    } else {
      job.items = 1;
      job.t_price = job.items * job.m_price;
    }
    this.setState({ isRefresh: !this.state.isRefresh });
  };
  plusFloors = job => {
    if (job.items) {
      job.items++;
    } else {
      job.items = 1;
    }
    if (job.m_price) {
      job.t_price = job.items * job.m_price;
    } else {
      job.meter = 50;
      job.m_price = job.meter * job.price;
      job.t_price = job.items * job.m_price;
    }

    job.selected = true;
    this.addRemoveIntoSelectedServices(job, true);
  };
  minusFloors = job => {
    if (job.items && job.items >= 1) {
      job.items--;
      if (job.m_price) {
        job.t_price = job.items * job.m_price;
      } else {
        job.meter = 50;
        job.m_price = job.meter * job.price;
        job.t_price = job.items * job.m_price;
      }
      this.addRemoveIntoSelectedServices(job, true);
    } else {
      job.items = 0;
      job.t_price = 0;
      job.meter = 0;
      job.m_price = 0;
      job.selected = false;
      this.addRemoveIntoSelectedServices(job, false);
    }
  };
  cahngeToolTip = tIndex => {
    if (this.state.toolTipVisible == -1) {
      this.setState({ toolTipVisible: tIndex });
    } else {
      this.setState({ toolTipVisible: -1 });
    }
  };
  _renderContent = data => {
    console.log("data", data, "jobs ", data.jobs[5]);
    return (
      <View
        style={{
          width: Dimensions.get("screen").width,
          alignSelf: "center"
        }}
      >
        {data.jobs &&
          data.jobs.map(
            function(job, index) {
              console.log("job ", job);
              if (job.pricetype == 1) {
                return (
                  <QuantitybaseJob
                    job={job}
                    lan={this.state.lan}
                    key={index}
                    index={index}
                    plus={this.plusQuantity}
                    minus={this.minusQuantity}
                    toolTipVisible={this.state.toolTipVisible}
                    cahngeToolTip={this.cahngeToolTip}
                  />
                );
              }
              if (job.pricetype == 2) {
                return (
                  <SelectableJob
                    lan={this.state.lan}
                    job={job}
                    index={index}
                    key={index}
                    selectJob={this.selectJob}
                  />
                );
              }
              if (job.pricetype == 5) {
                return (
                  <VarientbaseJob
                    lan={this.state.lan}
                    job={job}
                    index={index}
                    key={index}
                    plusVarient={this.plusVarient}
                    minusVarient={this.minusVarient}
                    calculateVarient={this.calculateVarient}
                    calculateSubVariant={this.calculateSubVariant}
                    plus={this.plusQuantity}
                    minus={this.minusQuantity}
                  />
                );
              }
              if (job.pricetype == 6) {
                return (
                  <SizebaseJob
                    plusMeters={this.plusMeters}
                    minusMeters={this.minusMeters}
                    plusFloors={this.plusFloors}
                    index={index}
                    minusFloors={this.minusFloors}
                    lan={this.state.lan}
                    job={job}
                    key={index}
                  />
                );
              }
              if (job.pricetype == 7) {
                return (
                  <DecoCategory
                    lan={this.state.lan}
                    job={job}
                    index={index}
                    key={index}
                    selectJob={this.selectJob}
                  />
                );
              }
              if (job.pricetype == 8) {
                return (
                  <SecuritybaseJobs
                    job={job}
                    cahngeToolTip={this.cahngeToolTip}
                    index={index}
                    toolTipVisible={this.state.toolTipVisible}
                    lan={this.state.lan}
                    key={index}
                    plus={this.plusQuantity}
                    minus={this.minusQuantity}
                  />
                );
              }
              if (job.pricetype == 9) {
                return (
                  <Cleaning
                    lan={this.state.lan}
                    job={job}
                    index={index}
                    key={index}
                    selectJob={this.selectJob}
                  />
                );
              }
            }.bind(this)
          )}
      </View>
    );
  };
  minusVarient = (varient, job) => {
    if (job.selected && job.selected == true) {
      let total = 0;
      varient.variants_attr.forEach(var_attr => {
        var_attr.attr.forEach(attr => {
          if (attr.selected && attr.t_price) {
            total = total + attr.t_price;
          }
        });
      });
      if (varient.items) varient.items--;
      else varient.items = 1;
      varient.t_price = varient.items * total;
      this.addRemoveIntoSelectedServices(job, true);
    }
  };
  plusVarient = (varient, job) => {
    if (job.selected && job.selected == true) {
      let total = 0;
      varient.variants_attr.forEach(var_attr => {
        var_attr.attr.forEach(attr => {
          if (attr.selected && attr.t_price) {
            total = total + attr.t_price;
          }
        });
      });
      if (varient.items) varient.items++;
      else varient.items = 1;
      varient.t_price = varient.items * total;
      this.addRemoveIntoSelectedServices(job, true);
    }
  };
  calculateSubVariant = (attr, varient, job) => {
    if (job.selected && job.selected == true) {
      varient.subvariants &&
        varient.subvariants.forEach(subvariant => {
          subvariant.subvariants_attr.forEach(sub_atr => {
            sub_atr.attr.forEach(in_attr => {
              if (
                in_attr.selected == true &&
                in_attr.attr_type == attr.attr_type
              ) {
                in_attr.selected = false;
              }
            });
          });
        });
      attr.selected = !attr.selected;
      if (attr.attr_type == 1) {
        attr.t_price =
          attr.selected && attr.selected == true ? attr.attr_price : 0;
      }

      varient.t_price = varient.items * attr.t_price ? attr.t_price : 0;
      let copySelectedJobs = this.state.selectedServices;
      this.setState({ selectedServices: copySelectedJobs });
    }
  };
  calculateVarient = (attr, varient, job) => {
    if (job.selected && job.selected == true) {
      varient.variants_attr.forEach(var_attr => {
        var_attr.attr.forEach(inner_attr => {
          if (
            inner_attr.selected == true &&
            inner_attr.attr_type == attr.attr_type
          ) {
            inner_attr.selected = false;
          }
        });
      });

      attr.selected = !attr.selected;
      if (attr.attr_type == 1) {
        attr.t_price =
          attr.selected && attr.selected == true ? attr.attr_price : 0;
      }
      if (attr.attr_price) {
        varient.t_price = varient.items * attr.t_price;
      }

      let copySelectedJobs = this.state.selectedServices;
      this.setState({ selectedServices: copySelectedJobs });
    }
  };
  plusQuantity = job => {
    if (job.items) job.items++;
    else job.items = 1;
    if (job.id === 70 || job.id === 61 || job.id === 82) {
      job.t_price =
        parseFloat(job.items > 1 ? job.saleprice : job.price) * job.items;
    } else {
      job.t_price =
        parseFloat(job.saleprice ? job.saleprice : job.price) * job.items;
    }

    job.selected = true;
    this.addRemoveIntoSelectedServices(job, true);
  };
  minusQuantity = job => {
    if (job.items && job.items >= 1) {
      job.items--;
      if (job.id === 70 || job.id === 61 || job.id === 82) {
        job.t_price =
          parseFloat(job.items > 1 ? job.saleprice : job.price) * job.items;
      } else {
        job.t_price =
          parseFloat(job.saleprice ? job.saleprice : job.price) * job.items;
      }
      this.addRemoveIntoSelectedServices(job, true);
    } else {
      job.items = 0;
      job.t_price = 0;
      job.selected = false;
      this.addRemoveIntoSelectedServices(job, false);
    }
  };
  selectJob = job => {
    job.selected = !job.selected;
    job.items = 1;
    if (job.selected) job.t_price = job.saleprice ? job.saleprice : job.price;
    else job.t_price = 0;

    if (job.selected) this.addRemoveIntoSelectedServices(job, true);
    else this.addRemoveIntoSelectedServices(job, false);
  };
  addRemoveIntoSelectedServices = async (job, add) => {
    (job.serviceId = this.state.services.id),
      (job.jobserviceName = this.state.services.name),
      (job.jobserviceNameAr = this.state.services.name_ar),
      (job.jobServiceIcon = this.state.services.seo_name);

    let allServices = this.state.selectedServices;
    let index = allServices.findIndex(service => service.id === job.id);

    if (add === false && job.items > 0) {
      allServices.splice(index, 1);

      this.setState({ selectedServices: allServices });
    }
    if (add === true) {
      if (job.items < 1) {
        allServices.splice(index, 1);

        this.setState({
          selectedServices: allServices
        });
      } else {
        if (index > -1) {
          allServices[index] = job;
        } else {
          allServices.push(job);
        }
        this.setState({
          selectedServices: allServices
        });
      }
    }
    await AsyncStorage.setItem("jobs", JSON.stringify(allServices));
    this.calculateTotalOrderPrices();
  };
  calculateTotalOrderPrices = () => {
    let total = 0;
    this.state.selectedServices.forEach(service => {
      total = total + service.t_price;
    });
    this.setState({ totalOrderPrice: total });
  };
  checkout = async () => {
    if (this.state.selectedServices.length > 0) {
      await AsyncStorage.setItem(
        "jobs",
        JSON.stringify(this.state.selectedServices)
      );
      await Analytics.logEvent(this.state.services.name, {
        name: this.state.services.name,
        screen: "promotionScreen",
        purpose: "checkout order from categories screen"
      });
      this.props.navigation.navigate("MyCart", {
        lan: this.state.lan,
        isPackage: false
      });
    } else {
      Toast.show({
        text:
          this.state.lan == "en"
            ? "Select any service first to proceed"
            : "أختر اي خدمة للإستمرار",
        position: "bottom"
      });
    }
  };
  render() {
    const { navigation } = this.props;
    var lan = navigation.getParam("lan");
    return (
      <View>
        <Header
          style={{
            marginTop: 0,
            borderBottomWidth: 1,
            borderBottomColor: "#0866b0",
            backgroundColor: "#ffffff",
            height: 60,
            justifyContent: "center"
          }}
        >
          <Left style={{ marginLeft: 10 }}>
            <Ionicons
              onPress={() => this.props.navigation.navigate("LandingSecreen")}
              name={
                lan == "en" ? "chevron-back-outline" : "chevron-forward-outline"
              }
              size={34}
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
              {lan == "en"
                ? this.state.services.name
                : this.state.services.name_ar}
            </Title>
          </View>
          <Right />
        </Header>

        <View>
          <LinearGradient
            colors={["#0764af", "#6ea8cd"]}
            start={[0.9, 0.2]}
            end={[0.1, 0.1]}
            style={{
              width: Dimensions.get("screen").width,
              // paddingBottom: 50,
              height: Dimensions.get("screen").height - 130
              // this.state.services.id == 17 ||
              // this.state.services.id == 45 ||
              // this.state.services.id == 47
              //   ? Dimensions.get("screen").height + 60
              //   : "94%"
            }}
          >
            <Image
              source={{
                uri:
                  "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/" +
                  this.state.services.banner
              }}
              style={{
                width: Dimensions.get("screen").width,
                height: 196,
                alignSelf: "center"
              }}
              resizeMode="contain"
            />
            <ScrollView
              style={{ marginBottom: 10 }}
              contentContainerStyle={{ paddingBottom: 20, marginBottom: 30 }}
            >
              <Accordion
                style={{ borderRadius: 10 }}
                dataArray={this.state.services.products}
                expanded={false}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
              />
            </ScrollView>
          </LinearGradient>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderWidth: 0,
            height: 90,
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            width: "100%"
          }}
        >
          <TouchableOpacity onPress={this.checkout}>
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
                  style={{ color: "white", margin: 12, alignSelf: "center" }}
                >
                  {this.state.lan == "en" ? " Check out" : " تقديم الطلب"}
                  {"\t"} {"\t"}SAR {this.state.totalOrderPrice}
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
