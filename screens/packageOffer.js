import React from "react";
import {
  View,
  Image,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Toast,
  Title,
  Header,
  Content,
  Text,
  Left,
  Right,
  Footer,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import DealJob from "./deals/dealJob";
import Spinner from "react-native-loading-spinner-overlay";
import * as Analytics from "expo-firebase-analytics";
import { ScrollView } from "react-native-gesture-handler";

export default class PackageOfferScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lan: "en",
      services: [],
      deal: {},
      totalOfferOnePrice: 0,
      totalOfferTwoPrice: 0,
      totalOfferThreePrice: 0,
      selectedServices: [],
      lan: "en",
      loading: false,
    };
  }
  getPackage = (offerid, lan) => {
    fetch(
      "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/get_offer",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offerid: offerid,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error == false) {
          this.setState({
            services: responseJson.offer.services,
            deal: responseJson.offer,
            lan: lan,
            loading: false,
          });
          this.clearSelectedServices(responseJson.offer.services);
        } else {
          this.setState({ loading: false });
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };
  compare = (a, b) => {
    if (a.choose_type == 3) {
      return -1;
    }
    if (a.choose_type == 1) {
      return 1;
    }
    return 0;
  };
  sortServices = (services) => {
    services.forEach((service) => {
      service.products.sort(this.compare);
    });
    this.setState({ services: services });
  };

  componentDidUpdate = () => {
    // state.product
    console.log("services", this.state.services);
    console.log("Deal", this.state.deal);
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    if (navigation.getParam("isOffer")) {
      this.setState({ loading: true });
      this.getPackage(
        navigation.getParam("offerid"),
        navigation.getParam("lan")
      );
    } else {
      this.sortServices(navigation.getParam("deal").services);
      this.setState({
        lan: navigation.getParam("lan"),
        deal: navigation.getParam("deal"),
      });
      this.clearSelectedServices(navigation.getParam("deal").services);
    }

    this.logPackageEvent();
  };
  clearSelectedServices = (services) => {
    services.forEach((service) => {
      if (service.products) {
        service.products.forEach((product) => {
          product.jobs.forEach((job) => {
            if (job.selected && job.selected == true) {
              (job.selected = false), (job.items = 0);
            }
          });
        });
      } else {
        service.jobs.forEach((job) => {
          if (job.selected && job.selected == true) {
            (job.selected = false), (job.items = 0);
          }
        });
      }
    });
  };
  logPackageEvent = async () => {
    await Analytics.logEvent("PackagesIcon", {
      name: "PackagesIcon",
      screen: "landingScreen",
      purpose: "package open",
    });
  };
  calculateTotalOfferPrice = (allServices) => {
    let totaloffer1 = 0;
    let totaloffer2 = 0;
    let totaloffer3 = 0;
    this.state.services.forEach(function (service, index) {
      if (index == 0) {
        let firstOffers = allServices.filter(
          (ser) => ser.serviceid == service.serviceid
        );
        if (service.is_same_price) {
          totaloffer1 = firstOffers[0] ? firstOffers[0].price : 0;
        } else {
          firstOffers.forEach((offer) => {
            totaloffer1 = totaloffer1 + offer.t_price;
          });
        }
      }
      if (index == 1) {
        let firstOffers = allServices.filter(
          (ser) => ser.serviceid == service.serviceid
        );
        if (service.is_same_price) {
          totaloffer2 = firstOffers[0] ? firstOffers[0].price : 0;
        } else {
          firstOffers.forEach((offer) => {
            totaloffer2 = totaloffer2 + offer.t_price;
          });
        }
      }
      if (index == 2) {
        let firstOffers = allServices.filter(
          (ser) => ser.serviceid == service.serviceid
        );
        if (service.is_same_price) {
          totaloffer3 = firstOffers[0] ? firstOffers[0].price : 0;
        } else {
          firstOffers.forEach((offer) => {
            totaloffer3 = totaloffer3 + offer.t_price;
          });
        }
      }
    });
    this.setState({
      totalOfferOnePrice: totaloffer1,
      totalOfferTwoPrice: totaloffer2,
      totalOfferThreePrice: totaloffer3,
    });
  };
  addRemoveIntoSelectedServices = async (job, add) => {
    job.offerId = this.state.deal.offerid;

    let allServices = this.state.selectedServices;
    let index = allServices.findIndex((service) => service.id === job.id);

    if (add === false && job.items > 0) {
      allServices.splice(index, 1);

      this.setState({ selectedServices: allServices });
    }
    if (add === true) {
      if (job.items < 1) {
        allServices.splice(index, 1);

        this.setState({
          selectedServices: allServices,
        });
      } else {
        if (index > -1) {
          allServices[index] = job;
        } else {
          allServices.push(job);
        }
        this.setState({
          selectedServices: allServices,
        });
      }
      this.calculateTotalOfferPrice(allServices);
      let obj = {
        jobserviceName: this.state.deal.offername,
        jobserviceNameAr: this.state.deal.offername_ar,
        jobServiceIcon: this.state.deal.offerimage,

        jobs: allServices,
      };
      await AsyncStorage.setItem("packgaeJobs", JSON.stringify(obj));
    }
  };
  minus = (job) => {
    if (job.items && job.items >= 1) {
      job.items--;
      if (job.choose_type == 3) {
        job.t_price = 0;
      } else {
        job.t_price =
          job.id == 67 || job.id == 73 || job.id == 62
            ? job.price
            : job.price * job.items;
      }

      if (job.items == 0) {
        job.items = 0;
        job.t_price = 0;
        job.selected = false;
      }
      this.addRemoveIntoSelectedServices(job, true);
    } else {
      job.items = 0;
      job.t_price = 0;
      job.selected = false;
      this.addRemoveIntoSelectedServices(job, false);
    }
  };
  plus = (job) => {
    if (job.items) job.items++;
    else job.items = 1;
    if (job.choose_type == 3) {
      job.t_price = 0;
    } else {
      job.t_price =
        job.id == 67 || job.id == 73 || job.id == 62
          ? job.price
          : job.price * job.items;
    }

    job.selected = true;
    this.addRemoveIntoSelectedServices(job, true);
  };
  checkOutOrder = async () => {
    let pruductsCatOneChooseType1 = ([] = []);
    let pruductsCatTwoChooseType1 = ([] = []);
    let pruductsCatThreeChooseType1 = ([] = []);
    let pruductsCatFourChooseType1 = ([] = []);
    let pruductsCatFiveChooseType1 = ([] = []);

    let secOne = false;
    let secTwo = false;
    let secThree = false;
    let secFour = false;
    let secFive = false;
    let index = 0;

    if (
      this.state.deal.offerid !== 1 &&
      this.state.selectedServices.length > 0
    ) {
      this.state.services.forEach((service) => {
        if (service.products) {
          service.products.forEach((product) => {
            index = index + 1;
            if (index == 1) {
              if (product.choose_type == 1) {
                secOne = true;
              }
              pruductsCatOneChooseType1 = product.jobs.filter(
                (p) => p.selected == true && p.choose_type == 1
              );
            }
            if (index == 2) {
              if (product.choose_type == 1) {
                secTwo = true;
              }
              pruductsCatTwoChooseType1 = product.jobs.filter(
                (p) => p.selected == true && p.choose_type == 1
              );
            }
            if (index == 3) {
              if (product.choose_type == 1) {
                secThree = true;
              }
              pruductsCatThreeChooseType1 = product.jobs.filter(
                (p) => p.selected == true && p.choose_type == 1
              );
            }
            if (index == 4) {
              if (product.choose_type == 1) {
                secFour = true;
              }
              pruductsCatFourChooseType1 = product.jobs.filter(
                (p) => p.selected == true && p.choose_type == 1
              );
            }
            if (index == 5) {
              if (product.choose_type == 1) {
                secFive = true;
              }
              pruductsCatFiveChooseType1 = product.jobs.filter(
                (p) => p.selected == true && p.choose_type == 1
              );
            }
          });
        }
      });
      if (
        (this.state.selectedServices.length > 0 &&
          secOne == true &&
          pruductsCatOneChooseType1.length > 0) ||
        secOne == false
      ) {
        if (
          (secTwo == true && pruductsCatTwoChooseType1.length > 0) ||
          secTwo == false
        ) {
          if (
            (secThree == true && pruductsCatThreeChooseType1.length > 0) ||
            secThree == false
          ) {
            if (
              (secFour == true && pruductsCatFourChooseType1.length > 0) ||
              secFour == false
            ) {
              if (
                (secFive == true && pruductsCatFiveChooseType1.length > 0) ||
                secFive == false
              ) {
                this.props.navigation.navigate("MyCart", {
                  lan: this.state.lan,
                  isPackage: true,
                });
              } else {
                Toast.show({
                  text:
                    this.state.lan == "en"
                      ? "Select Atleast 1 of the required services"
                      : "اختر خدمة واحدة على الأقل من الخدمات المطلوبة",
                  position: "bottom",
                });
              }
            } else {
              Toast.show({
                text:
                  this.state.lan == "en"
                    ? "Select Atleast 1 of the required services"
                    : "اختر خدمة واحدة على الأقل من الخدمات المطلوبة",
                position: "bottom",
              });
            }
          } else {
            Toast.show({
              text:
                this.state.lan == "en"
                  ? "Select Atleast 1 of the required services"
                  : "اختر خدمة واحدة على الأقل من الخدمات المطلوبة",
              position: "bottom",
            });
          }
        } else {
          Toast.show({
            text:
              this.state.lan == "en"
                ? "Select Atleast 1 of the required services"
                : "اختر خدمة واحدة على الأقل من الخدمات المطلوبة",
            position: "bottom",
          });
        }
      } else {
        Toast.show({
          text:
            this.state.lan == "en"
              ? "Select Atleast 1 of the required services"
              : "اختر خدمة واحدة على الأقل من الخدمات المطلوبة",
          position: "bottom",
        });
      }
    } else {
      if (this.state.selectedServices.length > 0) {
        this.props.navigation.navigate("MyCart", {
          lan: this.state.lan,
          isPackage: true,
        });
      } else {
        Toast.show({
          text:
            this.state.lan == "en"
              ? "Select Atleast 1 of the required services"
              : "اختر خدمة واحدة على الأقل من الخدمات المطلوبة",
          position: "bottom",
        });
      }
    }

    await Analytics.logEvent("PackagesCheckout", {
      name: "PackagesCheckout",
      screen: "packageScreen",
      purpose: "package checkout",
    });
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
            justifyContent: "center",
          }}
        >
          <Left style={{ marginLeft: 10 }}>
            <Ionicons
              onPress={() => this.props.navigation.goBack()}
              name={
                lan == "en" ? "chevron-back-outline" : "chevron-forward-outline"
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
              alignSelf: "center",
            }}
          >
            <Title
              style={{
                fontFamily: "montserrat_semi_blod",
                color: "#0866b0",
                fontSize: 18,
              }}
            >
              {this.state.lan == "en"
                ? this.state.deal.offername
                : this.state.deal.offername_ar}
            </Title>
          </View>
          <Right />
        </Header>

        <View
          style={{
            height: Dimensions.get("screen").height - 137,
          }}
        >
          <LinearGradient
            colors={["#0764af", "#6ea8cd"]}
            start={[0.9, 0.2]}
            end={[0.1, 0.1]}
          >
            <Spinner visible={this.state.loading} textContent={""} />
            <View>
              <Image
                source={{
                  uri:
                    "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/" +
                    this.state.deal.offerbanner,
                }}
                style={{
                  width: Dimensions.get("screen").width - 10,
                  marginTop: -28,
                  height: 199,
                  alignSelf: "center",
                }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                alignSelf: "center",
                marginLeft: 12,
                marginRight: 12,
                marginBottom: 16,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 12, textAlign: "justify" }}
              >
                {this.state.lan == "en"
                  ? this.state.deal.offerdescription
                  : this.state.deal.offerdescription_ar}
              </Text>
            </View>
            <View
              style={{
                // height: Dimensions.get("screen").height - 495, //470
                height: Dimensions.get("screen").height - 490,
                // borderTopWidth: 1,
                // borderTopLeftRadius: 20,
                // borderTopRightRadius: 20,
                borderTopColor: "lightgray",
                marginLeft: 8,
                marginRight: 8,
                marginBottom: 90,
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  backgroundColor: "white",

                  borderTopWidth: 1,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  // borderBottomWidth: 1,
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderTopColor: "lightgray",
                  paddingBottom: 20, //marginBottom: 90,
                }}
              >
                {this.state.services &&
                  this.state.services.map(
                    function (service, index) {
                      return (
                        <View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              margin: 8,
                              alignItems: "center",
                            }}
                          >
                            <View>
                              <Text
                                style={{
                                  fontSize: 14,
                                  fontWeight: "bold",
                                  color: "4a4b4c",
                                }}
                              >
                                {this.state.lan == "en"
                                  ? service.servicename
                                  : service.servicename_ar}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection:
                                  lan == "en" ? "row" : "row-reverse",
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
                                {index == 0
                                  ? this.state.totalOfferOnePrice
                                  : index == 1
                                  ? this.state.totalOfferTwoPrice
                                  : index == 2
                                  ? this.state.totalOfferThreePrice
                                  : 0}{" "}
                              </Text>
                            </View>
                          </View>
                          {service.jobs &&
                            service.jobs.map(
                              function (job, index) {
                                return (
                                  <DealJob
                                    job={job}
                                    minus={this.minus}
                                    plus={this.plus}
                                    lan={this.state.lan}
                                  />
                                );
                              }.bind(this)
                            )}
                          {service.products &&
                            service.products.map(
                              function (product, index) {
                                return (
                                  <View style={{ flex: 1 }}>
                                    <View
                                      style={{
                                        marginTop: 5,
                                        flex: 1,
                                        alignSelf: "center",
                                        width:
                                          Dimensions.get("screen").width - 30,
                                        height: 1,
                                        backgroundColor: "lightgray",
                                      }}
                                    ></View>
                                    <View
                                      style={{
                                        alignSelf: "center",
                                      }}
                                    >
                                      <Text
                                        style={{
                                          fontSize: 12,
                                          color: "#0764af",
                                          flexWrap: "wrap",
                                          fontWeight: "bold",
                                          textAlign: "center",
                                        }}
                                      >
                                        {this.state.lan == "en"
                                          ? product.title
                                          : product.title_ar}
                                      </Text>
                                    </View>
                                    <View>
                                      {product.jobs.map(
                                        function (job, index) {
                                          return (
                                            <DealJob
                                              job={job}
                                              plus={this.plus}
                                              minus={this.minus}
                                              lan={this.state.lan}
                                            />
                                          );
                                        }.bind(this)
                                      )}
                                    </View>
                                  </View>
                                );
                              }.bind(this)
                            )}
                          <View></View>
                        </View>
                      );
                    }.bind(this)
                  )}
              </ScrollView>
            </View>
          </LinearGradient>
        </View>
        <View
          style={{
            backgroundColor: "white", // white
            borderWidth: 0,
            height: 90,
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            width: "100%",
            marginBottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={this.checkOutOrder}>
            <View
              style={{
                backgroundColor: "#0764af", // backgroundColor: "#0764af",
                borderRadius: 12,
                width: Dimensions.get("screen").width - 120,
                alignSelf: "center",
                justifyContent: "center",
                marginBottom: 0,
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
                  {this.state.lan == "en" ? "Check out" : "تقديم الطلب"}
                  {"\t"} {"\t"}SAR{" "}
                  {this.state.totalOfferOnePrice +
                    this.state.totalOfferTwoPrice +
                    this.state.totalOfferThreePrice}
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
