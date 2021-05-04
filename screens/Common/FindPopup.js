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
import { Video } from "expo-av";
const { width, height } = Dimensions.get("screen");
const SPACING = 20;
const AVATAR_SIZE = (height / width) * 40;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const json = [
  {
    image: require("../../assets/FeedbackIcons/Play-min.png"),
    title: "App Store / Play Store",
    title_ar: "متجر التطبيقات"
  },
  {
    image: require("../../assets/FeedbackIcons/Fb-min.png"),
    title: "Facebook / Instagram",
    title_ar: "الفيسبوك / الانستغرام"
  },
  {
    image: require("../../assets/FeedbackIcons/Youtube-min.png"),
    title: "Youtube",
    title_ar: "Youtube" + "موقع "
  },
  {
    image: require("../../assets/FeedbackIcons/Twitter-min.png"),
    title: "Twitter",
    title_ar: "تويتر"
  },
  {
    image: require("../../assets/FeedbackIcons/Google-min.png"),
    title: "Google",
    title_ar: "غوغل"
  },
  {
    image: require("../../assets/FeedbackIcons/Friends-min.png"),
    title: "Friends and Family",
    title_ar: "الأصدقاء والعائلة"
  },
  {
    image: require("../../assets/FeedbackIcons/Others-min.png"),
    title: "Other",
    title_ar: "الآخرين"
  }
];
const FindPoup = props => {
  const [selectedId, setSelected] = React.useState(-1);
  const [data, setdata] = React.useState(json);
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View
        style={{
          alignSelf: "center",
          height: 390,
          width: wp(88),
          marginTop: height / 12,
          borderRadius: SPACING,
          borderWidth: 2,
          borderColor: "#283a97",
          backgroundColor: "rgba(255,255,255,10)",
          paddingHorizontal: SPACING / 2,
          paddingVertical: SPACING / 2
        }}
      >
        <View
          style={{
            //  alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <View></View>
          <Image
            style={{ height: 100, width: 100, alignSelf: "center" }}
            resizeMode="contain"
            source={
              props.lan == "en"
                ? require("../../assets/FeedbackIcons/1-min.png")
                : require("../../assets/FeedbackIcons/1-Arabic-min.png")
            }
          />
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            <Ionicons
              // onPress={() => this.setState({ referralModalVisible: false })}
              name="ios-close-circle-outline"
              size={30}
              color="red"
              onPress={() => props.setPopupfalse()}
            />
          </View>
        </View>
        <Text style={{ fontSize: SPACING, alignSelf: "center" }}>
          {props.lan == "en"
            ? "HOW DID YOU FIND WAFARNALAK?"
            : "كيف وجدت وفرنالك"}
        </Text>
        <FlatList
          data={data}
          key={item => item.key}
          contentContainerStyle={{
            paddingVertical: SPACING / 4,
            paddingHorizontal: SPACING,
            marginBottom: SPACING * 3
            // backgroundColor: "rgba(255,255,255,0.8)"
          }}
          renderItem={({ item, index }) => {
            console.log("item ", item);
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginHorizontal: 1,
                  marginVertical: 4,
                  alignItems: "center"
                }}
              >
                <Image
                  style={{ width: 20, height: 20 }}
                  resizeMode="contain"
                  source={item.image}
                />
                <Text
                  style={{
                    width: "50%",
                    fontSize: SPACING / 2,
                    textAlign: "left"
                  }}
                >
                  {props.lan == "en" ? item.title : item.title_ar}
                </Text>
                <Ionicons
                  name={
                    selectedId == index
                      ? "ios-checkmark-circle"
                      : "ios-checkmark-circle-outline"
                  }
                  size={18}
                  color={selectedId == index ? "#0764af" : "gray"}
                  onPress={() => setSelected(index)}
                />
              </View>
            );
          }}
        />
        <TouchableOpacity onPress={() => props.setPopupfalse()}>
          <LinearGradient
            colors={["#0764af", "#6ea8cd"]}
            start={[0.9, 0.2]}
            end={[0.1, 0.1]}
            style={{
              borderRadius: 4,
              height: 30,
              width: "80%",
              alignSelf: "center",
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                margin: 0,
                borderRadius: 4,
                justifyContent: "center",
                alignItems: "center",
                padding: 0
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 12
                }}
              >
                {props.lan == "en" ? "SUBMIT" : "تسليم"}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({});
export default FindPoup;
