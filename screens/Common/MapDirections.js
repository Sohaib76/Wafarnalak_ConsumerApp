import React, { PureComponent } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  StatusBar,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { IMAGES } from "../../assets/Images";
import { Entypo } from "@expo/vector-icons";
import BookingDetailHeader from "./BookingDetailHeader";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const origin = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
};
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const GOOGLE_MAPS_APIKEY = "AIzaSyCZenxJupQXwOicw8u9pBnFiniI8w03Vus";
const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d",
      },
    ],
  },
];
class MapDirections extends PureComponent {
  constructor(props) {
    super(props);

    // AirBnB's Office, and Apple Park
    this.state = {
      coordinates: [],
    };

    this.mapView = null;
  }
  componentDidMount() {
    console.log(
      "this.props.navigation.state.params.destination",
      this.props.navigation.state.params.destination
    );
    const coordinates = [
      {
        latitude: this.props.navigation.state.params.origin.latitude,
        longitude: this.props.navigation.state.params.origin.longitude,
      },
      {
        latitude: this.props.navigation.state.params.destination.latitude,
        longitude: this.props.navigation.state.params.destination.longitude,
      },
    ];
    // const coordinates = [
    //   {
    //     latitude: 29.404832582489618,
    //     longitude: 71.69979440987426
    //   },
    //   {
    //     latitude: 29.404835631159094,
    //     longitude: 71.69972217208782
    //   }
    // ];
    this.setState(
      { coordinates: coordinates },
      console.log("this.state.coordinates", this.state.coordinates)
    );
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [...this.state.coordinates, e.nativeEvent.coordinate],
    });
  };

  render() {
    return (
      <SafeAreaView
        style={{
          height: hp("100%"),
          wp: wp("100%"),
          marginTop: StatusBar.statusBarHeight,
        }}
      >
        <BookingDetailHeader
          HeaderText={"en" == "en" ? "Location" : "Ø¯Ø±Ø¯Ø´Ø©"}
          onBackPress={() => this.props.navigation.goBack()}
          lan={"en"}
          lineWidth={hp(0.2)}
        />
        {/* 
<SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        marginTop: StatusBar.statusBarHeight,
      }}
    > */}
        {/* <Header
          title={""}
          backButton={true}
          style={{ position: "absolute", top: 30, zIndex: 1 }}
          backgroundColor="transparent"
          imageColor={"orange"}
          onPress={() => this.props.navigation.goBack()}
        /> */}
        <MapView
          initialRegion={{
            latitude: this.props.navigation.state.params.origin.latitude,
            longitude: this.props.navigation.state.params.origin.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          customMapStyle={mapStyle}
          style={{ height: hp(80), width: wp(100) }}
          ref={(c) => (this.mapView = c)}
        >
          {this.state.coordinates.map((coordinate, index) => (
            <Marker key={`coordinate_${index}`} coordinate={coordinate}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={IMAGES.MARKER}
                  style={{ width: 30, height: 30, resizeMode: "contain" }}
                />
                <View
                  style={{
                    width: 18,
                    height: 18,
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    position: "absolute",
                    top: 4,
                  }}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {index + 1}
                  </Text>
                </View>
              </View>
            </Marker>
          ))}
          {this.state.coordinates.length > 1 && (
            <MapViewDirections
              origin={this.state.coordinates[0]}
              waypoints={
                this.state.coordinates.length >= 2
                  ? this.state.coordinates.slice(1, -1)
                  : null
              }
              destination={
                this.state.coordinates[this.state.coordinates.length - 1]
              }
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="orange"
              mode="DRIVING"
              optimizeWaypoints={false}
              onStart={(params) => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`
                );
              }}
              onReady={(result) => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20,
                  },
                });
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <View
          style={{
            backgroundColor: "white",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25,
            position: "absolute",
            bottom: 20,
            height: 40,
          }}
        >
          <Entypo
            name="cross"
            size={40}
            color="black"
            onPress={() => this.props.navigation.goBack("")}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default MapDirections;
