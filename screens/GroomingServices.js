import * as Analytics from "expo-firebase-analytics";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import {
  Accordion,
  Badge,
  Container,
  Left,
  Right,
  Text,
  Toast
} from "native-base";
import {
  Animated,
  AsyncStorage,
  Dimensions,
  FlatList,
  I18nManager,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  View
} from "react-native";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";

import CategoryCard from "./categories/categoryCard";
import Constants from "expo-constants";
import Deals from "./deals/deals";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import QuantitybaseJob from "./jobs/quantitybaseJob";
import React from "react";
import SelectableJob from "./jobs/selectableJob";
import SizebaseJob from "./jobs/sizebaseJob";
import { SliderBox } from "react-native-image-slider-box";
import Spinner from "react-native-loading-spinner-overlay";
import VarientbaseJob from "./jobs/varientbaseJob";

``;

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = Platform.OS == "android" ? 320 : 335;
const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const SCROLL_HEIGHTBTN = IMAGE_HEIGHT + HEADER_HEIGHT;

export default class GroomingServices extends React.Component {
  nScroll = new Animated.Value(0);
  scroll = new Animated.Value(0);
  imgScale = this.nScroll.interpolate({
    inputRange: [-25, 0],
    outputRange: [1.2, 1],
    extrapolateRight: "clamp"
  });
  tabY = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1]
  });
  tabYButton = this.nScroll.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.7, 0]
  });
  constructor(props) {
    super(props);

    this.state = {
      lan: "en",
      offersUrls: [],
      dataSource: [],
      deals: [],
      categories: [],
      isEnabled: false,
      isRefresh: false,
      setIsEnabled: true,
      services: [],
      selectedCategoryId: 0,
      products: [],
      selectedServices: [],
      cartDetails: [],
      freshCategories: [],
      isReversed: false,
      toolTipVisible: -1,
      scrollY: new Animated.Value(0),
      location: "",
      user: null,
      jobs: [],
      womens: false
    };
  }
  componentDidMount = async () => {
    this.getOffers();
    this.getCategories();
    await AsyncStorage.removeItem("jobs");
    let lan = await AsyncStorage.getItem("lan");
    let user = await AsyncStorage.getItem("user");
    this.setState({
      lan: lan !== null ? lan : "en",
      user: user !== null ? JSON.parse(user) : null
    });
    this.checkUserLocation();
  };
  checkUserLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Toast.show({
        text:
          this.state.lan == "en"
            ? "Please allow location permission"
            : "يرجى السماح لتحديد الموقع",
        position: "bottom"
      });
    } else {
      const mylocation = await Location.getCurrentPositionAsync({});

      const geocode = await Location.reverseGeocodeAsync(mylocation.coords);
      this.setState({ location: geocode[0].city });
    }
  };
  _renderHeader = (data, expanded) => {
    let index = data.jobs.findIndex(job => job.selected == true);

    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          backgroundColor: expanded ? "#d8d8d8" : "#F5F5F5",
          marginBottom: 0,
          alignSelf: "center",
          borderBottomWidth: 1,
          borderColor: "#bababa",
          width: Dimensions.get("screen").width - 30,
          height: 70
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
                color: this.state.womens ? "#f02fc2" : "#0865b0"
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
                  backgroundColor: this.state.womens ? "#f02fc2" : "#0865b0",
                  justifyContent: "center",
                  margin: 2
                }}
              >
                <Text
                  style={{
                    padding: 2,
                    paddingLeft: 3,
                    paddingRight: 3,
                    color: "white",
                    fontSize: 7,
                    textAlign: "center"
                  }}
                >
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
        {index > -1 ? (
          <Image
            source={require("../assets/Cart-Icon.png")}
            style={{
              width: 15,
              marginTop: 2,
              height: 15,
              position: "absolute",
              left: Dimensions.get("screen").width / 2
            }}
          />
        ) : (
          <View></View>
        )}
        <Right>
          <View style={{ flexDirection: "row" }}>
            {data.is_promoted == true ? (
              this.state.lan == "en" ? (
                <Image
                  source={require("../assets/Promoted-min.png")}
                  style={{ width: 55, height: 35, marginRight: 40 }}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../assets/Promoted-Arabic.png")}
                  style={{ width: 55, height: 35, marginRight: 40 }}
                  resizeMode="contain"
                />
              )
            ) : (
              <View></View>
            )}

            {expanded ? (
              <Ionicons
                style={{ fontSize: 24 }}
                name="ios-chevron-down"
                color={this.state.womens ? "#f02fc2" : "#0865b0"}
              />
            ) : (
              <Ionicons
                style={{ fontSize: 24 }}
                name={
                  this.state.lan == "en"
                    ? "chevron-forward-outline"
                    : "chevron-back-outline"
                }
                color={this.state.womens ? "#f02fc2" : "#0865b0"}
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
      if (job.meter > 0) {
        job.items = 1;
        job.t_price = job.items * job.m_price;
      }
    }
    if (job.meter == 0) {
      job.items = 0;
      job.selected = false;
      this.addRemoveIntoSelectedServices(job, false);
    } else {
      job.selected = true;
      this.addRemoveIntoSelectedServices(job, true);
    }
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
    job.selected = true;
    this.addRemoveIntoSelectedServices(job, true);
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
      if (job.items == 0) {
        job.items = 0;
        job.t_price = 0;
        job.meter = 0;
        job.m_price = 0;
        job.selected = false;
      }
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
    return (
      <View
        style={{
          width: Dimensions.get("screen").width,
          alignSelf: "center",
          marginTop: -5
        }}
      >
        {data.jobs &&
          data.jobs.map(
            function(job, index) {
              job.jobserviceName = data.name;
              job.jobserviceNameAr = data.name_ar;
              job.jobServiceIcon = data.seo_name;
              return (
                <QuantitybaseJob
                  job={job}
                  cahngeToolTip={this.cahngeToolTip}
                  index={index}
                  toolTipVisible={this.state.toolTipVisible}
                  lan={this.state.lan}
                  key={index}
                  plus={this.plusQuantity}
                  minus={this.minusQuantity}
                  womens={this.state.womens}
                />
              );
              {
                /* if (job.pricetype == 1) {
                return (
                  <QuantitybaseJob
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
              } */
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
      if (total > 0) {
        if (varient.items) varient.items--;
        else varient.items = 1;
        varient.t_price = varient.items * total;
        this.addRemoveIntoSelectedServices(job, true);
      }
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
      if (total > 0) {
        if (varient.items) varient.items++;
        else varient.items = 1;
        varient.t_price = varient.items * total;
        this.addRemoveIntoSelectedServices(job, true);
      }
    }
  };
  calculateSubVariant = (attr, varient, job) => {
    if (job.selected && job.selected == true) {
      varient.subvariants &&
        varient.subvariants.forEach(subvariant => {
          subvariant.subvariants_attr &&
            subvariant.subvariants_attr.forEach(sub_atr => {
              sub_atr.attr.forEach(in_attr => {
                if (
                  in_attr.selected == true &&
                  in_attr.attr_id == attr.attr_id
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
            inner_attr.attr_id == attr.attr_id
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
  clearVariantsAndSubVariants = job => {
    if (job.variants) {
      job.variants.forEach(variant => {
        if (variant.items > 0) {
          variant.items = 0;
        }
        variant.variants_attr.forEach(var_atr => {
          var_atr.attr.forEach(atr => {
            if (atr.selected && atr.selected == true) {
              atr.selected = false;
            }
          });
        });
        if (variant.subvariants) {
          variant.subvariants.forEach(sub_variant => {
            sub_variant.subvariants_attr &&
              sub_variant.subvariants_attr.forEach(sub_var_atr => {
                sub_var_atr.attr.forEach(atr => {
                  if (atr.selected && atr.selected == true) {
                    atr.selected = false;
                  }
                });
              });
          });
        }
      });
    }
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
      if (job.items == 0) {
        job.items = 0;
        job.t_price = 0;
        job.selected = false;
        this.clearVariantsAndSubVariants(job);
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
    let catIndex = this.state.categories.findIndex(
      cat => cat.id == this.state.selectedCategoryId
    );
    // let cartIndex = this.state.cartDetails
    //   ? this.state.cartDetails.findIndex(
    //       cartService =>
    //         cartService.serviceId ==
    //         this.state.categories[this.state.selectedCategoryId].id
    //     )
    //   : -1;
    // if (cartIndex !== -1) {
    //   this.state.cartDetails[cartIndex].jobs.push(job);
    // } else {
    //   let array = this.state.cartDetails;
    //   let data = {
    //     serviceId: this.state.categories[index].id,
    //     serviceName: this.state.categories[index].name,
    //     serviceIcon: this.state.categories[index].seo_name,
    //     jobs: [job]
    //   };
    //   array.push(data);
    //   this.setState({ cartDetails: data });
    // }
    job.serviceId = this.state.categories[catIndex].id;

    let allServices =
      this.state.selectedServices && this.state.selectedServices.length > 0
        ? this.state.selectedServices
        : ([] = []);
    let index =
      allServices && allServices.length > 0
        ? allServices.findIndex(service => service.id === job.id)
        : -1;

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
      await AsyncStorage.setItem("jobs", JSON.stringify(allServices));
    }
  };
  openChat = () => {
    Linking.openURL("https://wa.me/+966577311430");
  };
  getOffers = () => {
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/get_banners",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let ban = ([] = []);
        let urls = ([] = []);
        ban =
          this.state.lan === "en"
            ? responseJson.banners.enbanners
            : responseJson.banners.arbanners;
        ban.forEach(ban => {
          let actualUrl =
            "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/" +
            ban.banner.url;
          urls.push(actualUrl);
        });
        this.setState({ dataSource: ban, offersUrls: urls });
      })
      .catch(error => {});
  };
  toggleSwitch = value => {
    this.setState({ isEnabled: !this.state.isEnabled });
  };
  categorySelection = async category => {
    if (category.id == 44) {
      this.setState({
        womens: true
      });
    } else if (category.id == 49) {
      this.setState({
        womens: false
      });
    }
    this._accordion.setSelected(-1);
    this.setState({
      selectedCategoryId: category.id,
      products: category.products,
      toolTipVisible: false
    });
  };

  // http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/get_grooming

  // -------------------------------------------

  getCategories = () => {
    this.setState({ loading: true });
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/get_grooming",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error === false) {
          this.setState(
            {
              categories: responseJson.services,
              deals: responseJson.offers,
              loading: false,
              freshCategories: responseJson.services,
              products: responseJson.services[0].products,
              jobs: responseJson.services[0].products,
              selectedCategoryId: responseJson.services[0].id
            },
            () => {
              this._notificationSubscription = Notifications.addNotificationReceivedListener(
                this._handleNotification
              );
            }
          );
        } else {
          this.setState({ loading: false });
        }
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };
  clearJobs = async () => {
    let jobs = await AsyncStorage.getItem("jobs");
    let user = await AsyncStorage.getItem("user");
    if (jobs == null) {
      this.setState({
        selectedServices: [],
        user: user !== null ? JSON.parse(user) : null
      });
      this.getCategories();
    }
    let allJobs = JSON.parse(jobs);

    if (allJobs.length > 0) {
      this.state.categories.forEach(category => {
        category.products.forEach(product => {
          product.jobs.forEach(job => {
            let index = allJobs.findIndex(
              j => j.id == job.id && j.selected == true && job.selected == true
            );
            if (index == -1) {
              job.selected = false;
              job.items = 0;
              job.t_price = 0;
            }
          });
        });
      });
    }
    this.setState({ selectedServices: jobs !== null ? JSON.parse(jobs) : [] });
  };
  navigationSetup = async option => {
    if (option == 4) {
      this.props.navigation.navigate("ProfileSecreen", {
        cartItem: this.state.selectedServices.length,
        lan: this.state.lan,
        location: this.state.location
      });
    }
    if (option == 3) {
      if (this.state.selectedServices.length > 0) {
        this.props.navigation.navigate("MyCart", {
          lan: this.state.lan,
          isPackage: false
        });
        await Analytics.logEvent("Cart", {
          name: "Cart",
          screen: "landingScreen",
          purpose: "checkout order from landing screen"
        });
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
        cartItem: this.state.selectedServices.length,
        lan: this.state.lan,
        location: this.state.location
      });
    }
  };
  switchLanguage = async () => {
    let lan = await AsyncStorage.getItem("lan");
    let previousLan = lan !== null ? lan : "en";
    if (previousLan == "en") {
      this.changetoArabic();
    } else {
      this.changetoEnglish();
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
  openPromotionScreen = async index => {
    if (
      Platform.OS === "android" &&
      this.state.lan === "ar" &&
      this.state.isReversed === false
    ) {
      this.state.dataSource.reverse();
      this.setState({ isReversed: true });
    }
    if (this.state.dataSource[index].job !== false) {
      this.props.navigation.navigate("Promotion", {
        job: this.state.dataSource[index].job,
        lan: this.state.lan,
        url: this.state.dataSource[index].banner.url
      });
      await Analytics.logEvent("PromotionalBanners", {
        name: "PromotionalBanners",
        screen: "landingScreen",
        purpose: "promotion banner clicked"
      });
    }
    if (
      this.state.dataSource[index].openCategory &&
      this.state.dataSource[index].openCategory == true
    ) {
      this.props.navigation.navigate("PromotionService", {
        serviceid: this.state.dataSource[index].categoryid,
        lan: this.state.lan
      });
    }
  };
  _handleNotification = notification => {
    if (
      notification.origin === "received" ||
      notification.origin === "selected"
    ) {
      if (notification.data.isPromoted) {
        this.props.navigation.navigate("Promotion", {
          job: notification.data.job,
          lan: this.state.lan,
          url:
            this.state.lan == "en"
              ? notification.data.bannerUrl
              : notification.data.bannerUrl_ar
        });
      }
      if (notification.data.isOffer) {
        this.props.navigation.navigate("PackageOffer", {
          lan: this.state.lan,
          offerid: notification.data.offerId,
          isOffer: notification.data.isOffer
        });
      }
      if (notification.data.is_point_screen == "true") {
        this.props.navigation.navigate("PointsScreen", {
          lan: this.state.lan
        });
      }
      if (notification.data.serviceid) {
        this.props.navigation.navigate("PromotionService", {
          serviceid: notification.data.serviceid,
          lan: this.state.lan
        });
      }
      if (notification.data.statusid) {
        this.props.navigation.navigate("OrderDetails", {
          order: notification.data,
          lan: this.state.lan,
          isHistory: notification.data.statusid == 5 ? true : false,
          isFeedback: false
        });
      }
    }
  };
  render() {
    const portion = Dimensions.get("screen").width / 4;

    return (
      <Container>
        <View
          style={{
            backgroundColor: "white",
            marginTop: Constants.statusBarHeight,
            marginBottom: 110
          }}
        >
          {
            <NavigationEvents
              onWillFocus={() => {
                this.clearJobs();
              }}
            />
          }
          <Spinner visible={this.state.loading} textContent={""} />
          <View>
            <View
              style={{
                width: Dimensions.get("screen").width - 30,
                alignSelf: "center",
                borderTopWidth: 0,
                borderBottomWidth: 0,
                borderColor: this.state.womens ? "#f02fc2" : "#0764af",

                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View
                style={{
                  width: portion,
                  height: 50
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-start",
                    justifyContent: "center",
                    flex: 2
                  }}
                >
                  {this.state.lan == "en" ? (
                    <Text
                      style={{
                        color: "#0764af",
                        fontSize: 16,
                        fontFamily: "montserrat_semi_blod",
                        color: this.state.womens ? "#f02fc2" : "#0764af"
                      }}
                    >
                      {this.state.location}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: this.state.womens ? "#f02fc2" : "#0764af",
                        fontSize: 16,

                        alignSelf: "flex-end"
                      }}
                    >
                      {this.state.location}
                    </Text>
                  )}
                </View>
              </View>

              <TouchableOpacity onPress={this.openChat}>
                <View
                  style={{
                    width: portion,
                    borderRightWidth: 0,
                    borderRightColor: "#0764af"
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                      flex: 1
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../assets/Help-min.png")}
                        style={{
                          width: 25,
                          height: 25,
                          tintColor: this.state.womens ? "#f02fc2" : "#0764af"
                        }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.switchLanguage}>
                <View>
                  <View
                    style={{
                      alignSelf: "flex-end",
                      justifyContent: "center",
                      flex: 2
                    }}
                  >
                    <View style={{ width: portion }}>
                      <View
                        style={{
                          justifyContent: "center"
                        }}
                      >
                        <Text
                          style={{
                            color: this.state.womens ? "#f02fc2" : "#0764af",
                            fontSize: 16,
                            textAlign: "right",
                            fontFamily: "montserrat_arabic_regular"
                          }}
                        >
                          {this.state.lan == "en" ? "العربية" : "English"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Animated.ScrollView
            ref={s => (this._anScrollView = s)}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.nScroll } } }],
              { useNativeDriver: true }
            )}
            style={{ zIndex: 0 }}
          >
            <LinearGradient
              colors={
                this.state.womens
                  ? ["#f02fc2", "#6094ea"]
                  : ["#0ff0b3", "#036ed9"]
              }
              start={this.state.womens ? [-3, 1] : [-0.6, 1]}
              end={[1, 1]}
              style={{}}
            >
              <View style={{ marginTop: 15 }}>
                <SliderBox
                  images={this.state.offersUrls}
                  sliderBoxHeight={153}
                  onCurrentImagePressed={index =>
                    this.openPromotionScreen(index)
                  }
                  dotColor="#ff8a29"
                  inactiveDotColor="#F5F5F5"
                  paginationBoxVerticalPadding={20}
                  autoplay
                  resizeMode={"contain"}
                  circleLoop={true}
                />
              </View>
              <View
                style={{
                  width: Dimensions.get("screen").width - 30,
                  alignSelf: "center"
                }}
              >
                <FlatList
                  data={this.state.deals}
                  horizontal={true}
                  renderItem={({ item }) => (
                    <Deals
                      deal={item}
                      navigation={this.props.navigation}
                      lan={this.state.lan}
                    />
                  )}
                  keyExtractor={item => item.id}
                  showsHorizontalScrollIndicator={false}
                />
              </View>

              <Animated.View
                style={{
                  zIndex: 1,
                  transform: [{ translateY: this.tabY }],
                  zIndex: 1,
                  width: "100%",
                  width: Dimensions.get("screen").width - 30,
                  alignSelf: "center",
                  height: 48,
                  alignItems: "flex-start"
                }}
              >
                {/* <LinearGradient
                  colors={
                    this.state.womens
                      ? ["#6094ea", "#f02fc2"]
                      : ["#036ed9", "#0ff0b3"]
                  }
                  start={[0.9, 0.2]}
                  end={[0.1, 0.1]}
                  style={{
                    width: Dimensions.get("screen").width - 30,
                    alignItems: "flex-start",
                  }}
                > */}
                <Animated.FlatList
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.categories}
                  renderItem={({ item }) => (
                    <CategoryCard
                      category={item}
                      lan={this.state.lan}
                      categorySelection={this.categorySelection}
                      selectedCategoryId={this.state.selectedCategoryId}
                      women={this.state.womens}
                      white
                    />
                  )}
                  keyExtractor={item => item.id}
                />
                {/* </LinearGradient> */}
              </Animated.View>
              <View style={{ marginTop: 10, marginBottom: 12 }}>
                <Accordion
                  style={{ borderWidth: 0 }}
                  ref={c => (this._accordion = c)}
                  dataArray={this.state.products}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                />
              </View>
            </LinearGradient>
          </Animated.ScrollView>
        </View>

        <Animated.View
          style={{
            height: 100,
            width: 100,
            right: 10,
            bottom: 70,
            position: "absolute",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Image
              style={{
                height: 100,
                width: 100
              }}
              source={
                this.state.lan == "en"
                  ? require("../assets/House-Repair-Button.gif")
                  : require("../assets/House-Repair-Arabic.gif")
              }
              resizeMode="contain"
            />
          </TouchableOpacity>
        </Animated.View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            alignSelf: "center"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignSelf: "center",
              justifyContent: "space-between",
              margin: 12,
              width: Dimensions.get("screen").width - 30
            }}
          >
            <View>
              <View style={{ alignSelf: "center" }}>
                <Ionicons
                  name="md-apps"
                  size={26}
                  color={this.state.womens ? "#f02fc2" : "#0865b0"}
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: this.state.womens ? "#f02fc2" : "#0865b0"
                }}
              >
                {this.state.lan === "en" ? "Categories" : "فئات الخدمات"}
              </Text>
            </View>
            <TouchableOpacity onPress={() => this.navigationSetup(2)}>
              <View>
                <View style={{ alignSelf: "center" }}>
                  <Ionicons name="ios-list-box" size={26} color={"#ccc"} />
                </View>
                <Text
                  style={{ textAlign: "center", fontSize: 12, color: "#ccc" }}
                >
                  {this.state.lan === "en" ? "My Orders" : "طلباتي"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.navigationSetup(3)}>
              <View>
                <View style={{ alignSelf: "center", flexDirection: "row" }}>
                  <Ionicons name="md-cart" size={26} color={"#ccc"} />
                  {this.state.selectedServices &&
                  this.state.selectedServices.length > 0 ? (
                    <Badge
                      danger
                      style={{ width: 20, height: 20, borderRadius: 10 }}
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
                          {this.state.selectedServices &&
                            this.state.selectedServices.length}
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
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons
                      name={
                        this.state.user !== null
                          ? "ios-person"
                          : "ios-information-circle"
                      }
                      size={26}
                      color={"#ccc"}
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
        </View>
      </Container>
    );
  }
}
