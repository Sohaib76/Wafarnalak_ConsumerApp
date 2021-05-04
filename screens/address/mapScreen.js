import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import {
  AsyncStorage,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  View
} from "react-native";
import {
  Button,
  Container,
  Content,
  Footer,
  Header,
  Input,
  Left,
  Right,
  Spinner,
  Text,
  Thumbnail,
  Title,
  Toast
} from "native-base";

import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MapView from "react-native-maps";
import React from "react";

export default class GoogleMapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: {
        latitude: 23.8859,
        longitude: 45.0792
      },
      region: {
        latitude: 23.8859,
        longitude: 45.0792,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      },
      modalVisible: false,
      isMapLoaded: false,
      address: "",
      title: "",
      customerid: "",
      lan: "en",
      route: "AddressesScreen",
      order: {},
      categorySelected: "",
      categories: [],
      currentUserLocation: {}
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    this.setState({
      lan: navigation.getParam("lan")
    });
    this._getLocationAsync();
  }
  hideModal = () => {
    this.setState({ modalVisible: false });
  };
  showModal = () => {
    this.setState({ modalVisible: true });
  };
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      Toast.show({
        text:
          this.state.lan == "en"
            ? "Please allow location permission"
            : "يرجى السماح لتحديد الموقع",
        position: "bottom"
      });
      this.setState({ isMapLoaded: true });
    } else {
      if (Location.hasServicesEnabledAsync()) {
        let location = await Location.getCurrentPositionAsync();
        let obj = {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        };
        let obj2 = {
          longitude: location.coords.longitude,
          latitude: location.coords.latitude
        };
        this.fetchAddress(obj2);
        this.setState({
          region: obj,
          currentUserLocation: obj,
          x: obj2,
          isMapLoaded: true
        });
      } else {
        Toast.show({
          text:
            this.state.lan == "en"
              ? "Please enable Location service of your mobile setting"
              : "يرجى تمكين خدمة الموقع في إعدادات هاتفك",
          position: "bottom"
        });
      }
    }
  };
  onRegionChange = region => {
    this.setState({ region: region });
  };
  fetchAddress = lotlng => {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        lotlng.latitude +
        "," +
        lotlng.longitude +
        "&key=" +
        "AIzaSyA4be4vwXO-Zn5IYcxA-trViY3j6LtODjg"
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ address: responseJson.results[0].formatted_address });
      });
  };
  saveLocation = e => {
    this.fetchAddress(e.nativeEvent.coordinate);
    this.setState({ x: e.nativeEvent.coordinate });
  };
  navigateToCurrentLocation = () => {};
  saveAddress = async () => {
    if (this.state.address !== "") {
      let obj = {
        latitude: this.state.x.latitude,
        longitude: this.state.x.longitude,
        addressheader: this.state.title,
        addressdetail: this.state.address
      };
      await AsyncStorage.setItem("address", JSON.stringify(obj));
      this.props.navigation.goBack();
    } else {
      Toast.show({
        text: "Google Location is not correctely indentified please try again!",
        position: "bottom"
      });
    }
  };
  notifyChange = loc => {
    this.getCordsForName(loc);
  };
  getAddress = region => {
    let obj = {
      latitude: region.latitude,
      longitude: region.longitude
    };
    this.fetchAddress(obj);
  };
  getCordsForName = loc => {
    let obj = {
      latitude: loc.geometry.location.lat,
      longitude: loc.geometry.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    };
    this.mapView.animateToRegion(obj, 2000);
    this.setState({ x: obj, address: loc.formatted_address });
    this.updateState(obj);
  };
  updateState = location => {
    this.GooglePlacesRef.setAddressText("");
    this.setState({
      region: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
  };
  backScreenSetup = () => {
    if (this.state.route == "AddAddressScreen") {
      this.props.navigation.navigate(this.state.route, {
        order: this.state.order,
        lan: this.state.lan,
        categories: this.state.categories,
        categorySelected: this.state.categorySelected
      });
    } else {
      this.props.navigation.navigate("AddressesScreen");
    }
  };
  render() {
    const { navigation } = this.props;
    let lanConfirm = navigation.getParam("lan");
    return (
      <View>
        <Header
          style={{
            marginTop: 0,
            borderBottomWidth: 1,
            borderBottomColor: "#0866b0",
            backgroundColor: "#ffffff",
            height: 65,
            justifyContent: "center"
          }}
        >
          <Left style={{ marginLeft: 10 }}>
            <Ionicons
              onPress={() => this.props.navigation.goBack()}
              name={
                lanConfirm == "en"
                  ? "chevron-back-outline"
                  : "chevron-forward-outline"
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
              {lanConfirm == "en" ? "Select Location" : "حدد العنوان"}
            </Title>
          </View>
          <Right />
        </Header>
        <View>
          {this.state.isMapLoaded === true ? (
            <View>
              <MapView
                showsUserLocation={true}
                zoomEnabled={true}
                ref={ref => (this.mapView = ref)}
                initialRegion={this.state.region}
                onRegionChangeComplete={r => {
                  this.getAddress(r);
                }}
                style={{
                  height: Dimensions.get("window").height - 100,
                  width: Dimensions.get("window").width
                }}
              >
                {Platform.OS === "ios" ? (
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      alignSelf: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: 1
                    }}
                    source={require("../../assets/drop-pin.png")}
                    resizeMode="contain"
                  />
                ) : (
                  <View></View>
                )}
              </MapView>
              {Platform.OS === "android" ? (
                <View
                  style={{
                    alignSelf: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                  }}
                >
                  <Image
                    style={{ width: 40, height: 40 }}
                    source={require("../../assets/drop-pin.png")}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <View></View>
              )}

              <View
                style={{
                  alignSelf: "center",
                  fontSize: 10,
                  backgroundColor: "white",
                  width: 290,
                  position: "absolute",
                  top: 20
                }}
              >
                <GooglePlacesAutocomplete
                  placeholder={this.state.address}
                  minLength={3}
                  styles={{
                    textInputContainer: {
                      backgroundColor: "rgba(0,0,0,0)",
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                      borderRadius: 12
                    },
                    textInput: {
                      marginLeft: 0,
                      marginRight: 0,
                      height: 50,
                      color: "#5d5d5d",
                      fontSize: 16,
                      borderWidth: 1.4,
                      marginTop: 0,
                      borderColor: "lightgray"
                    }
                  }}
                  autoFocus={false}
                  returnKeyType={"search"}
                  listViewDisplayed={false}
                  currentLocation={false}
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    this.notifyChange(details);
                  }}
                  query={{
                    key: "AIzaSyA4be4vwXO-Zn5IYcxA-trViY3j6LtODjg",
                    Language: "en"
                  }}
                  nearbyPlacesAPI="GooglePlacesSearch"
                  debounce={200}
                  GooglePlacesAutocomplete
                  ref={instance => {
                    this.GooglePlacesRef = instance;
                  }}
                />
              </View>
            </View>
          ) : (
            <View
              style={{
                height: Dimensions.get("window").height - 100,
                width: Dimensions.get("window").width
              }}
            >
              <Spinner size="large" color="blue" />
            </View>
          )}
        </View>
        <View
          style={{
            height: 90,
            backgroundColor: "transparent",
            position: "absolute",
            bottom: 10,
            width: "100%"
          }}
        >
          <TouchableOpacity onPress={this.saveAddress}>
            <View
              style={{
                backgroundColor: "#0764af",
                borderRadius: 10,
                width: Dimensions.get("screen").width - 160,
                alignSelf: "center",
                justifyContent: "center"
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
                  {lanConfirm == "en" ? "Select Location" : "حدد العنوان"}
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <View style={{ position: "absolute", right: 10, bottom: 15 }}>
            <TouchableOpacity
              onPress={() => {
                this.mapView.animateToRegion(this.state.currentUserLocation);
              }}
            >
              <Image
                source={require("../../assets/navigation-button.png")}
                style={{ width: 60, height: 60 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
