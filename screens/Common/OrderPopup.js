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
  Animated,
  TextInput
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
const OrderPopup = props => {
  const [selectedId, setSelected] = React.useState(-1);
  const [data, setdata] = React.useState(json);
  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View
        style={{
          alignSelf: "center",
          height: 310,
          width: wp(85),
          marginTop: height / 12,
          borderRadius: SPACING,
          borderWidth: 2,
          borderColor: "#283a97",
          backgroundColor: "rgba(255,255,255,10)",
          paddingHorizontal: SPACING / 4,
          paddingVertical: SPACING / 2,
          justifyContent: "space-between"
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
            source={require("../../assets/FeedbackIcons/2-min.png")}
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
        <Text style={{ fontSize: SPACING, alignSelf: "center", marginTop: 1 }}>
          {props.lan == "en"
            ? "YOUR FEEDBACK IS VALUEABLE"
            : "ملاحظاتك ذات قيمة"}
        </Text>
        <Text
          style={{
            fontSize: SPACING / 1.8,
            alignSelf: "center",
            // color: "gray",
            width: "60%",
            marginTop: 1,
            textAlign: "center"
            // marginTop: 20
          }}
        >
          {props.lan == "en"
            ? "It helps us to continously improve your experience and our listed prices"
            : "يساعدنا ذلك على تحسين تجربتك باستمرار وأسعارنا المدرجة"}
        </Text>
        <Text
          style={{
            fontSize: SPACING / 1.8,
            alignSelf: "center",
            // color: "gray",
            width: "80%",
            marginTop: 1,
            textAlign: "center"
          }}
        >
          {props.lan == "en"
            ? "Please Enter the Price you paid in order#1234"
            : "الرجاء إدخال السعر الذي دفعته بالترتيب" + "#1234"}
        </Text>
        <TextInput
          style={{
            width: "50%",
            height: 30,
            borderWidth: 1,
            borderColor: "rgb(211,211,211)",
            alignSelf: "center",
            paddingHorizontal: "10%",
            justifyContent: "center",
            alignItems: "center"
          }}
          placeholder={
            props.lan == "en" ? "Enter Amount" : "     " + "أدخل المبلغ "
          }
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
              alignItems: "center"
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
                {props.lan == "en" ? "Submit" : "تسليم"}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({});
export default OrderPopup;
