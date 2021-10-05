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
  TextInput,
  Button,
} from "react-native";
import Signature from "react-native-signature-canvas";
import { Thumbnail } from "react-native-thumbnail-video";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
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
    title_ar: "متجر التطبيقات",
  },
  {
    image: require("../../assets/FeedbackIcons/Fb-min.png"),
    title: "Facebook / Instagram",
    title_ar: "الفيسبوك / الانستغرام",
  },
  {
    image: require("../../assets/FeedbackIcons/Youtube-min.png"),
    title: "Youtube",
    title_ar: "Youtube" + "موقع ",
  },
  {
    image: require("../../assets/FeedbackIcons/Twitter-min.png"),
    title: "Twitter",
    title_ar: "تويتر",
  },
  {
    image: require("../../assets/FeedbackIcons/Google-min.png"),
    title: "Google",
    title_ar: "غوغل",
  },
  {
    image: require("../../assets/FeedbackIcons/Friends-min.png"),
    title: "Friends and Family",
    title_ar: "الأصدقاء والعائلة",
  },
  {
    image: require("../../assets/FeedbackIcons/Others-min.png"),
    title: "Other",
    title_ar: "الآخرين",
  },
];

// const handleClear = () => {
//   this.callRef.current.clearSignature();
// };

// const handleConfirm = () => {
//   console.log("end");
//   this.callRef.current.readSignature();
// };

const OrderPopup = (props) => {
  const [selectedId, setSelected] = React.useState(-1);
  const [data, setdata] = React.useState(json);
  const [input, setInput] = React.useState("");
  const [input2, setInput2] = React.useState("");
  const ref = React.useRef();

  const handleOK = (signature) => {
    props.onEnterSignature(signature);
  };

  const handleConfirm = () => {
    console.log("end");
    ref.current.readSignature();
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={props.visible}>
      <View
        style={{
          alignSelf: "center",
          height: props.showSubmitBtn ? 380 : 290, //310 //380
          width: wp(85),
          marginTop: height / 4.2, //marginTop: height / 12,  ... height/4.2
          borderRadius: SPACING,
          borderWidth: 2,
          borderColor: "#283a97",
          // backgroundColor: "rgba(255,255,255,10)",
          backgroundColor: "#0865b0",
          paddingHorizontal: SPACING / 4,
          paddingVertical: SPACING / 2,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            //  alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              height: 120,
              width: 120,
              borderRadius: 100,
              justifyContent: "center",
              // alignItems: "center",
              alignSelf: "center",
              marginTop: -80,
              marginLeft: wp(85) / 3.5,
            }}
          >
            <Image
              style={{
                height: 100,
                width: 100,
                alignSelf: "center",
                // marginTop: -50,
              }}
              resizeMode="contain"
              source={require("../../assets/FeedbackIcons/Top-Icon-min.png")}
            />
          </View>
          {/* <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Ionicons
              // onPress={() => this.setState({ referralModalVisible: false })}
              name="ios-close-circle-outline"
              size={30}
              color="red"
              onPress={() => props.setPopupfalse()}
            />
          </View> */}
        </View>
        <Text
          style={{
            fontSize: SPACING,
            alignSelf: "center",
            marginTop: 1,
            color: "white",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {props.lan == "en"
            ? "THANKS FOR TAKING THE SERVICE"
            : "شكرا لأخذ الخدمة"}
        </Text>
        {/* <Text
          style={{
            fontSize: SPACING / 1.8,
            alignSelf: "center",
            // color: "gray",
            width: "60%",
            marginTop: 1,
            textAlign: "center",
            // marginTop: 20
          }}
        >
          {props.lan == "en"
            ? "It helps us to continously improve your experience and our listed prices"
            : "يساعدنا ذلك على تحسين تجربتك باستمرار وأسعارنا المدرجة"}
        </Text> */}

        <View>
          <Text
            style={{
              fontSize: SPACING / 1.8,
              alignSelf: "center",
              // color: "gray",
              width: "80%",
              marginTop: 0,
              textAlign: "center",
              color: "white",
              fontSize: 12,
              fontWeight: "400",
            }}
          >
            {props.lan == "en"
              ? `Please enter the price you paid on order # ${props.orderNo}`
              : `${props.orderNo} الرجاء إدخال السعر الذي دفعته عند الطلب`}
          </Text>
          <TextInput
            keyboardType={"numeric"}
            maxLength={5}
            require={true}
            style={{
              width: "55%", //50%
              height: 40, //30
              borderWidth: 1,
              borderColor: "rgb(211,211,211)",
              alignSelf: "center",
              // paddingHorizontal: "12%", //10
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
              backgroundColor: "white",
              margin: 15,
              textAlign: "center",
              // marginTop:-10
            }}
            placeholder={
              props.lan == "en" ? "Enter Amount" : "     " + "أدخل المبلغ "
            }
            onChangeText={(text) => {
              props.onEnterFeedback(text);
              setInput(text);
            }}
            value={input}
          />
        </View>

        {props.showFeedbackBox && (
          <View>
            {/* <Text>Test</Text> */}
            <Text
              style={{
                fontSize: SPACING / 1.8,
                alignSelf: "center",
                // color: "gray",
                width: "80%",
                marginBottom: -6,
                textAlign: "center",
                color: "white",
                fontSize: 12,
                fontWeight: "400",
              }}
            >
              {props.lan == "en" ? "Your Feedback" : "أدخل الملاحظات"}
            </Text>
            <TextInput
              maxLength={50}
              multiline={true}
              require={true}
              style={{
                width: "75%", //50% //55%
                height: 90, //30
                borderWidth: 1,
                borderColor: "rgb(211,211,211)",
                alignSelf: "center",
                paddingHorizontal: "12%", //10
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                backgroundColor: "white",
                margin: 15,
                textAlign: "center",
                textAlignVertical: "center",
                // texAl
                // marginTop:-10
              }}
              placeholder={
                props.lan == "en" ? "Comments" : "     " + "تعليقات "
              }
              onChangeText={(text) => {
                props.onEnterRealFeedback(text);
                setInput2(text);
              }}
              value={input2}
            />
          </View>
        )}

        {/* Sign In View */}
        {props.showSignatureBox && (
          <View>
            <Text
              style={{
                fontSize: SPACING / 1.8,
                alignSelf: "center",
                // color: "gray",
                width: "80%",
                marginTop: 1,
                textAlign: "center",
                color: "white",
                fontSize: 12,
                marginBottom: 10,
                marginTop: -10,
              }}
            >
              {props.lan == "en"
                ? "Please Sign to approve the work"
                : "الرجاء التوقيع للموافقة على العمل"}
            </Text>

            <View
              style={{
                height: 100,
                // borderRadius: 50,
                width: "70%",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                backgroundColor: "white",
              }}
            >
              <Signature
                ref={ref}
                // ref={this.callRef}
                // handle when you click save button
                onOK={handleOK} //console.log(img)
                onEmpty={() => console.log("empty")}
                // description text for signature
                descriptionText="Sign"
                // clear button text
                clearText="Clear"
                // save button text
                confirmText="Save"
                // String, webview style for overwrite default style, all style: https://github.com/YanYuanFE/react-native-signature-canvas/blob/master/h5/css/signature-pad.css
                webStyle={`.m-signature-pad--footer
          .button {
            background-color: red;
            color: #FFF;
            border-radius: 25px;
          }`}
                // autoClear={true}
                imageType={"image/svg+xml"}
                // placeholder="LLL"
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  // justifyContent: "flex-start",
                }}
              >
                {/* <Button title="Clear" onPress={this.handleClear} /> */}
                {/* <Button title="Confirm" onPress={handleConfirm} /> */}
                <Ionicons
                  // onPress={() => this.setState({ referralModalVisible: false })}
                  name="checkmark-circle-outline"
                  size={30}
                  color="green"
                  onPress={handleConfirm}
                />

                <Ionicons
                  // onPress={() => this.setState({ referralModalVisible: false })}
                  name="ios-close-circle-outline"
                  size={30}
                  color="red"
                  onPress={handleClear}
                />
              </View>
            </View>
          </View>
        )}

        {props.showSubmitBtn ? (
          <TouchableOpacity
            disabled={props.isDisabled}
            onPress={() => props.popupSubmit()}
          >
            <View
              //colors={["#fff", "#fff"]} //            colors={["#0764af", "#6ea8cd"]}
              // start={[0.9, 0.2]}
              // end={[0.1, 0.1]}
              style={{
                backgroundColor: props.isDisabled ? "grey" : "white",
                borderRadius: 10,
                height: 40,
                width: "80%",
                alignSelf: "center",
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <View
                style={{
                  // backgroundColor: "white",
                  flexDirection: "row",
                  margin: 0,
                  borderRadius: 4,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                <Text
                  style={{
                    color: "#0865b0",
                    fontSize: 14,
                    // fontWeight: "bold",
                  }}
                >
                  {props.lan == "en" ? "Submit" : "تسليم"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 10,
              // backgroundColor: "red",
              // width: "100%",
            }}
          >
            <TouchableOpacity onPress={() => props.popupAccept()}>
              <View
                //colors={["#fff", "#fff"]} //            colors={["#0764af", "#6ea8cd"]}
                // start={[0.9, 0.2]}
                // end={[0.1, 0.1]}
                style={{
                  backgroundColor: props.isDisabled ? "grey" : "white",
                  borderRadius: 10,
                  height: 40,
                  width: "290%",
                  alignSelf: "center",
                  padding: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    // backgroundColor: "white",
                    flexDirection: "row",
                    margin: 0,
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                  }}
                >
                  <Text
                    style={{
                      color: "#0865b0",
                      fontSize: 14,
                      // fontWeight: "bold",
                    }}
                  >
                    {props.lan == "en" ? "Accept" : "تسليم"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.popupReject()}>
              <View
                //colors={["#fff", "#fff"]} //            colors={["#0764af", "#6ea8cd"]}
                // start={[0.9, 0.2]}
                // end={[0.1, 0.1]}
                style={{
                  backgroundColor: props.isDisabled ? "grey" : "white",
                  borderRadius: 10,
                  height: 40, //40
                  width: "290%",
                  alignSelf: "center",
                  padding: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    // backgroundColor: "white",
                    flexDirection: "row",
                    margin: 0,
                    borderRadius: 4,
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                  }}
                >
                  <Text
                    style={{
                      color: "#0865b0",
                      fontSize: 14,
                      // fontWeight: "bold",
                    }}
                  >
                    {props.lan == "en" ? "Reject" : "رفض"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({});
export default OrderPopup;
