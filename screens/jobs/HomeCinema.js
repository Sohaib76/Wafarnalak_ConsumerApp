import React from "react";
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
  View,
  Text
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("screen");
import AllVideos from "../Common/AllVideos";
import VideoPlayerPopup from "../Common/VideoPlayerPopup";
const SPACING = (height / width) * 8;
const AVATAR_SIZE = (height / width) * 34;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const HomeCinema = ({ job, selectJob, lan, index }) => {
  const [popup, setPopup] = React.useState(false);
  const [videoPopup, setVideoPopup] = React.useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        borderWidth: 2,
        borderColor: "#283a97"
      }}
    >
      <AllVideos
        visible={popup}
        lan={lan}
        openVideoPlayer={() => {
          setPopup(false);
          setVideoPopup(true);
        }}
        setPopupfalse={() => {
          setPopup(false);
        }}
      />
      <VideoPlayerPopup
        visible={videoPopup}
        lan={lan}
        setPopupfalse={() => {
          setVideoPopup(false);
        }}
      />
      <Text
        style={{
          //  alignSelf: 'center',
          textAlign: "center",
          fontSize: SPACING / 1.5,
          color: "#0764af",
          fontWeight: "800",
          marginTop: SPACING / 4
        }}
      >
        {" "}
        {lan == "en" ? "PRODUCT DETAILS" : "تفاصيل المنتج"}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: SPACING / 2,
          padding: SPACING / 2
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: SPACING / 1.5,
            color: "#0764af",
            fontWeight: "600"
          }}
        >
          {" "}
          {lan == "en"
            ? "1080P HD RESOLUTION PROJECTOR"
            : "1080P HD جهاز عرض بدقة"}
        </Text>
        <View
          style={{
            backgroundColor: "#0764af",
            paddingHorizontal: SPACING / 4,
            flexDirection: lan == "en" ? "row" : "row-reverse",
            paddingVertical: SPACING / 8
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: SPACING / 1.5,
              color: "white",
              fontWeight: "600"
            }}
          >
            {"SAR "}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: SPACING / 1.5,
              color: "#d89801",
              fontWeight: "600"
            }}
          >
            1,500 - 5000
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: SPACING / 2,
          padding: SPACING / 2
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: SPACING / 1.5,
            color: "#0764af",
            fontWeight: "600"
          }}
        >
          {lan == "en" ? "Sound System" : "نظام الصوت"}
        </Text>
        <View
          style={{
            backgroundColor: "#0764af",
            paddingHorizontal: SPACING / 4,
            flexDirection: lan == "en" ? "row" : "row-reverse",
            paddingVertical: SPACING / 8
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: SPACING / 1.5,
              color: "white",
              fontWeight: "600"
            }}
          >
            {"SAR "}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: SPACING / 1.5,
              color: "#d89801",
              fontWeight: "600"
            }}
          >
            1,500 - 5000
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: SPACING / 2,
          padding: SPACING / 2
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: SPACING / 1.5,
            color: "#0764af",
            fontWeight: "600"
          }}
        >
          {" "}
          {lan == "en" ? "Rolling Screens" : "شاشات المتداول"}
        </Text>
        <View
          style={{
            backgroundColor: "#0764af",
            paddingHorizontal: SPACING / 4,
            flexDirection: lan == "en" ? "row" : "row-reverse",
            paddingVertical: SPACING / 8
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: SPACING / 1.5,
              color: "white",
              fontWeight: "600"
            }}
          >
            {"SAR "}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: SPACING / 1.5,
              color: "#d89801",
              fontWeight: "600"
            }}
          >
            1,500 - 5000
          </Text>
        </View>
      </View>
      <Text
        style={{
          marginLeft: SPACING / 2,
          fontSize: SPACING / 1.5,
          color: "gray",
          fontWeight: "600",
          textAlign: "left"
        }}
      >
        {" "}
        {lan == "en" ? "Other Products Include" : "تشمل المنتجات الأخرى"}
      </Text>
      <View
        style={{
          flexDirection: "row",
          padding: SPACING,
          justifyContent: "space-between"
        }}
      >
        <View
          style={{
            backgroundColor: "#0764af",
            paddingHorizontal: SPACING / 4,
            flexDirection: "row",
            paddingVertical: SPACING / 8,
            height: 20
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: SPACING / 1.5,
              color: "white"
              //fontWeight: "600"
            }}
          >
            {" "}
            {lan == "en" ? "Ceiling Stand" : "حامل سقف"}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#0764af",
            paddingHorizontal: SPACING / 4,
            flexDirection: "row",
            paddingVertical: SPACING / 8,
            height: 20
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: SPACING / 1.5,
              color: "white"
              //fontWeight: "600"
            }}
          >
            {lan == "en" ? " Cables" : "الكابلات"}
          </Text>
        </View>
        <View>
          <View
            style={{
              backgroundColor: "#0764af",
              paddingHorizontal: SPACING / 4,
              flexDirection: "row",
              paddingVertical: SPACING / 8,
              height: 20
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: SPACING / 1.5,
                color: "white"
                //fontWeight: "600"
              }}
            >
              {" "}
              {lan == "en" ? "Additional Speakers" : "مكبرات صوت إضافية"}
            </Text>
          </View>
          <Text
            style={{
              textAlign: "right",
              fontSize: SPACING / 1.5,
              textAlign: "left"
              //fontWeight: "600"
            }}
          >
            {" "}
            {lan == "en" ? "if Required" : "إذا لزم الأمر"}
          </Text>
        </View>
      </View>

      <Text
        style={{
          textAlign: "left",
          fontSize: SPACING / 1.5,
          textAlign: "left",
          marginLeft: SPACING / 2,
          //fontWeight: "600",
          marginBottom: SPACING / 2
        }}
      >
        {lan == "en"
          ? "1. The product details and prices shared above can be changed depending upon the requirements.\n" +
            "2. We are not selling the products used in this project and we are not responsible for warranty of these products.\n" +
            "3. Product Manufacturer will be responsible for the support and warranty of products.\n" +
            "4. Professional will buy the products on your behalf from the product manufacturer with the transaction margin of 5-10% on each product."
          : "1. يمكن تغيير تفاصيل المنتج والأسعار المشتركة أعلاه حسب المتطلبات" +
            "\n" +
            "2.  نحن لا نبيع المنتجات المستخدمة في هذا المشروع ولسنا مسؤولين عن ضمان هذه المنتجات." +
            "\n" +
            "3. ستكون الشركة المصنعة للمنتج مسؤولة عن دعم المنتجات وضمانها." +
            "\n" +
            "4.  المحترف سوف يشتري المنتجات نيابة عنك من الشركة المصنعة للمنتج و ياخذ زياده القيمه  من 5-10٪ على كل منتج."}
      </Text>
      <View
        style={{
          padding: SPACING / 2,
          borderTopWidth: 2,
          borderColor: "#283a97"
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: SPACING / 1.5,
            color: "#0764af",
            fontWeight: "800",
            marginVertical: SPACING / 4
          }}
        >
          {" "}
          {lan == "en" ? "SERVICE DETAILS" : "تفاصيل الخدمة"}
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontSize: SPACING / 1.5,
            textAlign: "left"
            // marginLeft: SPACING / 4
            //fontWeight: "600"
          }}
        >
          {lan == "en"
            ? "1. Professional will visit you to get requirements \n" +
              "2. Professional will guide you in choosing the products \n" +
              "3. Professional will purchase the products on your behalf \n" +
              "4. Professional will start the project and will complete it in 2-4 days depending upon project complexity \n " +
              "5. 6 Months free support will be provided for the implemented solution which includes \n" +
              "- Setup of the projector \n" +
              "- Connecting the devices \n " +
              "- Installation & Setup of the ceiling stand \n " +
              "- Ensuring the right functioning of cables \n " +
              "6. Enjoy home cinema system at your home \n \n" +
              "Have a look at one of our projects"
            : "1. سيقوم محترف بزيارتك للحصول على المتطلبات" +
              "\n" +
              "2. سيرشدك المحترف في اختيار المنتجات" +
              "\n" +
              "3.سيقوم المحترف بشراء المنتجات نيابة عنك" +
              "\n" +
              "4. سيبدأ المحترف في المشروع وسيكمله في 2-4 أيام حسب تعقيد المشروع" +
              "\n" +
              "5.سيتم تقديم دعم مجاني لمدة 6 أشهر للحل المنفذ والذي يشمل" +
              "\n" +
              " - إعداد جهاز العرض" +
              "\n" +
              " -  توصيل الأجهزة" +
              "\n" +
              " -  تركيب وتجهيز حامل السقف" +
              "\n" +
              " - ضمان حسن سير الكابلات" +
              "\n" +
              "6.  استمتع بنظام السينما المنزلية في منزلك" +
              "\n\n" +
              " الق نظرة على أحد مشاريعنا"}
        </Text>
        <TouchableOpacity onPress={() => setPopup(true)}>
          <Image
            style={{ alignSelf: "flex-start", width: 70, height: 20 }}
            resizeMode="contain"
            source={require("../../assets/Services-Icons-min.png")}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: SPACING / 2,
          borderTopWidth: 2,
          borderColor: "#283a97"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: SPACING / 2,
            padding: SPACING / 2
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: SPACING / 1.5,
              color: "#0764af",
              fontWeight: "600"
            }}
          >
            {" "}
            {lan == "en"
              ? " I Want to Schedule a visit"
              : "أريد تحديد موعد الزيارة"}
          </Text>
          <View
            style={{
              // backgroundColor: "#0764af",
              paddingHorizontal: SPACING / 4,
              flexDirection: lan == "en" ? "row" : "row-reverse",
              paddingVertical: SPACING / 8
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: SPACING / 1.5,
                color: "#0764af",
                fontWeight: "600"
              }}
            >
              {"TOTAL SAR "}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: SPACING / 1.5,
                color: "#d89801",
                fontWeight: "600"
              }}
            >
              1500
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: SPACING,
            paddingVertical: SPACING / 2
          }}
        >
          <View
            style={{
              backgroundColor: "#0764af",
              paddingHorizontal: SPACING / 2,
              flexDirection: lan == "en" ? "row" : "row-reverse",
              justifyContent: "center",
              alignItems: "center"
              // paddingVertical: -SPACING / 8
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: SPACING / 1.5,
                color: "white",
                fontWeight: "600"
              }}
            >
              {"SAR "}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: SPACING / 1.5,
                color: "#d89801",
                fontWeight: "600"
              }}
            >
              25
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: SPACING / 1.5,
                color: "white",
                fontWeight: "600",
                marginTop: lan == "en" ? 0 : -1
              }}
            >
              {lan == "en" ? "/Visit" : "يزور/"}
            </Text>
          </View>
          <Ionicons
            name={
              job.selected && job.selected == true
                ? "ios-checkmark-circle"
                : "ios-checkmark-circle-outline"
            }
            size={SPACING * 1.5}
            color={"#0764af"}
            style={{}}
          />
        </View>
        <Text style={{ textAlign: "left", fontSize: SPACING / 1.7 }}>
          {lan == "en"
            ? "By scheduling the visit, you agree that this is only the visit/inspection charge. In case you dont take the service after visit, you are required to pay visit charge (SAR 25) to professional. "
            : " من خلال تحديد موعد الزيارة ، أنت توافق على أن هذه هي رسوم الزيارة /الإستشارة ، وسيشارك المحترف في أسعار الخدمة بعد الإستشارة. في حالة عدم تلقي الخدمة ، يتعين عليك دفع رسوم الزيارة    (25 ر.س) إلى المحترف."}
        </Text>
      </View>
    </View>
  );
};
export default HomeCinema;
