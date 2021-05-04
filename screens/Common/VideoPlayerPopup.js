import React from "react";
import {
  View,
  Image,
  Platform,
  Dimensions,
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
import Modal from "react-native-modal";
import { Video } from "expo-av";
const { width, height } = Dimensions.get("screen");
const SPACING = (height / width) * 9;
const AVATAR_SIZE = (height / width) * 40;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { AllVideosJson } from "./VideosJson";
const VideosLink = [
  {
    Video: "https://youtu.be/oVC4WxslwSg",
    Video_ar: "https://youtu.be/ESvbQh9r_2w"
  },
  {
    Video: "https://youtu.be/Ljap9x7mFF8",
    Video_ar: "https://youtu.be/XhyhT-AZqzc"
  },
  {
    Video: "https://youtu.be/nYyL2aof26I",
    Video_ar: "https://youtu.be/RNbnQB5IYF0"
  },
  {
    Video: "https://youtu.be/ljoD66rS43I",
    Video_ar: "https://youtu.be/WbOTdGSV26g"
  },
  {
    Video: "https://youtu.be/XwhsSY0p8dI",
    Video_ar: "https://youtu.be/E0aLaL9zELs"
  },
  {
    Video: "https://youtu.be/MpW7MvG7gcM",
    Video_ar: "https://youtu.be/peNY4Scojz8"
  },
  {
    Video: "https://youtu.be/RDo6jQjwRnQ",
    Video_ar: "https://youtu.be/CO-OyIcsqls"
  },
  {
    Video: "https://youtu.be/NMI_h_aGW-g",
    Video_ar: "https://youtu.be/TIYpQDwYLsU"
  },
  {
    Video: "https://youtu.be/7g5pEDeegSw",
    Video_ar: "https://youtu.be/jWtNgwoVb5k"
  },
  {
    Video: "https://youtu.be/JIjPsYM8Yag",
    Video_ar: "https://youtu.be/jDsWdumxjJc"
  },
  {
    Video: "https://youtu.be/eS_MLxu9Ehk",
    Video_ar: "https://youtu.be/7df4aSMdwIQ"
  },
  {
    Video: "https://youtu.be/CbMMivza1Es",
    Video_ar: "https://youtu.be/hQu0FOt58K4"
  },
  {
    Video: "https://youtu.be/tOWLH4WjhMI",
    Video_ar: "https://youtu.be/pQPeyYkYcXE"
  }
];
const VideoPlayerPopup = props => {
  // const [AllServices, setAllServices] = React.useState(AllVideosJson);
  // const [selectedId, setSelected] = React.useState(props.selectedItem);
  // const [AllVideos, setAllVideos] = React.useState(VideosLink);
  // const [VideoLink, setVideoLink] = React.useState(
  //   props.lan ? AllVideos[0].Video : AllVideos[0].Video_ar
  // );
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const refContainer = React.useRef();
  // React.useEffect(() => {
  //   console.log(
  //     "props.selectedItem in video player popup ",
  //     props.selectedItem
  //   );
  //   // setSelected(props.selectedItem);
  //   // setAllVideos(AllServices[selectedId].products);
  //   // scrollToIndex();
  // }, [props.selectedItem]);

  const getItemLayout = (data, index) => ({
    length: 80,
    offset: 80 * index,
    index
  });

  const scrollToIndex = () => {
    // if (
    //   refContainer !== null &&
    //   selectedId !== null &&
    //   refContainer !== undefined &&
    //   selectedId !== undefined
    // ) {
    //   refContainer.current.scrollToIndex({
    //     animated: true,
    //     index: selectedId
    //   });
    // }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      coverScreen={false}
    >
      <View
        style={{
          alignSelf: "center",
          height: height,
          width: wp(100),
          paddingTop: Platform.OS === "ios" ? height / 12 : height / 12,
          backgroundColor: "rgba(128,128,128,1)",
          paddingHorizontal: wp(0),

          justifyContent: "space-between"
          // alignItems: "flex-start"
        }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
            // height: height,
            // width: wp(100),
            // flex: 1
          }}
        >
          {/* <Video
          // source={{
          //   uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
          // }}
          source={require("../../assets/Wafarnalak.mp4")}
          shouldPlay={playVideo}
          isMuted={mute}
          isLooping={true}
          resizeMode="cover"
          style={{
            width: wp(85),
            height: hp(20),
            alignSelf: "center",
            // borderRadius: SPACING,
            borderWidth: SPACING / 8,
            borderColor: "white"
          }}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}></View>
        </Video> */}
          <View
            style={{
              width: wp(100),
              height: 550,
              alignSelf: "center",
              // borderRadius: SPACING,
              borderWidth: SPACING / 8,
              borderColor: "white"
              // shadowColor: "rgba(255,255,255,1)",
              // shadowOffset: {
              //   width: 0,
              //   height: 0
              // },
              // elevation: 6,
              // // borderBottomWidth: 2,
              // borderBottomColor: "#f8f8f8",
              // shadowOpacity: 0.7
              // shadowRadius: 50
            }}
          >
            <WebView
              allowsFullscreenVideo={Platform.OS === "ios" ? true : false}
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction
              scalesPageToFit
              mixedContentMode="always"
              javaScriptEnabled={true}
              source={{
                uri:
                  props.lan == "en"
                    ? VideosLink[props.selectedItem].Video
                    : VideosLink[props.selectedItem].Video_ar
              }}
              style={{
                flex: 1,
                width: wp(98.8),
                height: 400,
                alignSelf: "center",
                //  marginBottom: -hp(2.5),
                // borderRadius: SPACING,
                borderWidth: SPACING / 8,
                borderColor: "white"
              }}
            />
          </View>
          {/* <View style={styles.controlBar}>
          <MaterialIcons
            name={playVideo ? "pause" : "play-arrow"}
            size={SPACING * 1.5}
            color="white"
            onPress={handlePlayAndPause}
          />
          <MaterialIcons
            name={mute ? "volume-mute" : "volume-up"}
            size={SPACING * 1.5}
            color="white"
            onPress={handleVolume}
          />
        </View> */}
          {/* <FlatList
            horizontal
            data={AllServices}
            ref={refContainer}
            keyExtractor={item => item.key}
            getItemLayout={getItemLayout}
            initialScrollIndex={props.selectedItem}
            initialNumToRender={0}
            contentContainerStyle={{
              marginVertical: hp(1),
              height: 40,
              marginHorizontal: wp(1)
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
                    backgroundColor: selectedId == index ? "#0865b0" : "white",
                    marginHorizontal: wp(2),
                    paddingHorizontal: 20,
                    paddingVertical: 7,
                    borderRadius: SPACING
                  }}
                >
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 12,
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
          <View
            style={{
              //  height: Platform.OS == "android" ? hp(44) : hp(42),
              // justifyContent: "flex-start"
              height: hp(48),
              // marginTop: 3
              justifyContent: "flex-start"
            }}
          >
            <FlatList
              data={AllServices[selectedId].products}
              key={item => item.key}
              onScroll={Animated.event([
                { nativeEvent: { contentOffset: { y: scrollY } } }
              ])}
              contentContainerStyle={
                {
                  // marginBottom: SPACING * 3
                  // flex: 1
                  // justifyContent: "flex-start"
                }
              }
              renderItem={({ item, index }) => {
                console.log(index, "item ", item);
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
                      setVideoLink(
                        props.lan == "en" ? item.Video : item.Video_ar
                      );
                      // console.log("services ", item.services);
                    }}
                  >
                    <Animated.View
                      style={{
                        flexDirection: "row",
                        // paddingVertical: SPACING / 2,
                        paddingLeft: SPACING,
                        // marginBottom: SPACING / 5,
                        // borderRadius: 12,
                        backgroundColor:
                          Platform.OS === "android" ? "#b7b7b7" : "#b7b7b7",
                        // shadowColor: "rgba(255,255,255,0.8)",
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
                        height: hp(10),
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
                            marginRight: SPACING / 2
                          }}
                          showPlayIcon={false}
                          url={props.lan == "en" ? item.Video : item.Video_ar}
                          onPress={() => {
                            setVideoLink(
                              props.lan == "en" ? item.Video : item.Video_ar
                            );
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
                            textAlign: "left"

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
          </View> */}
          <View
            style={{
              backgroundColor: "white",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
              marginTop: hp(8.5),
              height: 40
            }}
          >
            <Entypo
              name="cross"
              size={40}
              color="black"
              onPress={() => props.setPopupfalse(false)}
            />
          </View>
        </ScrollView>
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
  },
  controlBar: {
    position: "absolute",
    width: wp(84),
    top: hp(17.8) + height / 10,
    left: wp(8),
    alignSelf: "center",
    paddingHorizontal: SPACING / 2,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  }
});
export default VideoPlayerPopup;
