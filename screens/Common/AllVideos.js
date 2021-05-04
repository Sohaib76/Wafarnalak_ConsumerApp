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
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  Animated
} from "react-native";
import { Thumbnail } from "react-native-thumbnail-video";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
const { width, height } = Dimensions.get("screen");
const SPACING = (height / width) * 9;
const AVATAR_SIZE = (height / width) * 40;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
import { AllVideosJson } from "./VideosJson";
import Spinner from "react-native-loading-spinner-overlay";
import { Entypo } from "@expo/vector-icons";

const AllVideos = props => {
  const [AllServices, setAllServices] = React.useState(AllVideosJson);
  const [selectedId, setSelected] = React.useState(props.selectedItem);
  const [AllVideos, setAllVideos] = React.useState(
    AllServices[selectedId].products
  );
  const [loading, setLoading] = React.useState(true);
  const refContainer = React.useRef();
  const scrollY = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    // scrollToIndex();
    setLoading(true);
    setSelected(props.selectedItem);
    setAllVideos(AllServices[selectedId].products);
    setLoading(false);
  }, [props.selectedItem]);

  const getItemLayout = (data, index) => ({
    length: 80,
    offset: 80 * index,
    index
  });

  const scrollToIndex = () => {
    if (props.selectedItem) {
      refContainer.current.scrollToIndex({
        animated: true,
        index: props.selectedItem
      });
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View
        style={{
          alignSelf: "center",
          height: height,
          width: wp(100),
          paddingTop: height / 7,
          backgroundColor: "rgba(128,128,128,1)",
          paddingHorizontal: wp(0.2)
        }}
      >
        <Spinner visible={loading} textContent={""} />
        <View style={{ backgroundColor: "#0865b0", paddingTop: hp(5) }}>
          <View
            style={{
              backgroundColor: "white",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
              marginTop: -hp(6.8),
              paddingHorizontal: 3,
              paddingVertical: 3
            }}
          >
            <Entypo
              name="cross"
              size={23}
              color="black"
              onPress={() => props.setPopupfalse(false)}
            />
          </View>
          <FlatList
            horizontal
            data={AllServices}
            // flatListRef={flatListRef}
            ref={refContainer}
            keyExtractor={item => item.key}
            getItemLayout={getItemLayout}
            initialScrollIndex={props.selectedItem}
            initialNumToRender={1}
            contentContainerStyle={{
              marginBottom: hp(1),
              marginHorizontal: wp(1),
              marginTop: hp(5)
            }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelected(index);
                  setAllVideos(AllServices[index].products);
                }}
              >
                <View
                  style={{
                    backgroundColor: selectedId == index ? "#0A83e5" : "white",
                    marginHorizontal: wp(2),
                    paddingHorizontal: SPACING / 2,
                    paddingVertical: SPACING / 4,
                    borderRadius: SPACING
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: SPACING / 1.7,
                      color: selectedId == index ? "white" : "#0865b0",
                      fontWeight: "600"
                    }}
                  >
                    {props.lan == "en" ? item.name : item.name_ar}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <FlatList
          data={AllServices[selectedId].products}
          key={item => item.key}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ])}
          contentContainerStyle={{
            // padding: SPACING / 4,
            marginBottom: SPACING * 3
            // backgroundColor: "rgba(255,255,255,0.8)"
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2)
            ];
            const opacityInputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 1.5)
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0]
            });
            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0]
            });
            return (
              <TouchableOpacity
                onPress={() => {
                  props.openVideoPlayer(selectedId);
                  // console.log("services ", item.services);
                }}
              >
                <Animated.View
                  style={{
                    flexDirection: "row",
                    paddingVertical: SPACING / 2,
                    paddingLeft: SPACING,
                    // marginBottom: SPACING / 5,
                    // borderRadius: 12,
                    backgroundColor:
                      Platform.OS === "android" ? "#b7b7b7" : "#b7b7b7",
                    //shadowColor: "rgba(255,255,255,0.8)",
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 0.5
                    // },
                    // elevation: 3,
                    // borderBottomWidth: 2,
                    // borderBottomColor: "#f8f8f8",
                    // shadowOpacity: 0.7,
                    // shadowRadius: 20,
                    transform: [{ scale }],
                    opacity,
                    flex: 1,
                    height: 80,
                    borderBottomWidth: 1,
                    borderBottomColor: "#727272"
                  }}
                >
                  <View
                    style={{
                      //   borderRightWidth: 1,
                      //   borderRightColor: "#f8f8f8",
                      height: "100%",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Thumbnail
                      style={{
                        width: AVATAR_SIZE / 1.4,
                        height: AVATAR_SIZE / 1.4,
                        // borderWidth: 2,
                        // borderColor: "#495157",
                        marginRight: SPACING / 1.5
                      }}
                      showPlayIcon={false}
                      url={props.lan == "en" ? item.Video : item.Video_ar}
                      onPress={() => {
                        props.openVideoPlayer();
                        // console.log("services ", item.services);
                      }}
                    />
                  </View>
                  <View
                    style={{
                      paddingHorizontal: SPACING / 2,
                      width: "70%",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontSize: SPACING / 1.2,
                        fontWeight: "600",
                        textAlign: "left",
                        width: "80%"
                        // color: theme.brownColor
                      }}
                    >
                      {props.lan == "en" ? item.name : item.name_ar}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: SPACING / 1.7,
                          fontWeight: "600",
                          opacity: 0.7,
                          textAlign: "left",
                          color: "#4a4b4c"
                        }}
                      >
                        {props.lan == "en"
                          ? item.description
                          : item.description_ar}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          alignItems: "flex-start",
                          width: "35%"
                        }}
                      >
                        <Text
                          style={{
                            fontSize: SPACING / 1.9,
                            fontWeight: "600",
                            opacity: 0.7,
                            // textAlign: "left",
                            color: "#4a4b4c",
                            marginTop: -hp(0.2)
                          }}
                        >
                          {item.duration}
                        </Text>
                        <Image
                          source={require("../../assets/Play-Button-min.png")}
                          resizeMode="contain"
                          style={{
                            width: SPACING,
                            height: SPACING,
                            marginTop: -hp(0.7)
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  tabsbuttonStyle: {
    //  backgroundColor: "#631255",
    height: hp(4),
    alignSelf: "center",
    borderRadius: wp(5),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(1),
    flexDirection: "row"
  },
  locationTextStyle: {
    fontSize: SPACING,
    color: "#fff"
    //  fontFamily: "montserrat_arabic_regular"
  }
});
export default AllVideos;
