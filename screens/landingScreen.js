import React from "react";
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
  Toast,
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
  View,
  Modal,
  StatusBar,
  Alert,
} from "react-native";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import AllVideos from "./Common/AllVideos";
import VideoPlayerPopup from "./Common/VideoPlayerPopup";
import CategoryCard from "./categories/categoryCard";
import Constants from "expo-constants";
import Deals from "./deals/deals";
import { Ionicons } from "@expo/vector-icons";
import QuantitybaseJob from "./jobs/quantitybaseJob";
import SecuritybaseJobs from "./jobs/SecuritybaseJobs";
import HomeCinema from "./jobs/HomeCinema";
import FindPoup from "./Common/FindPopup";
import OrderPopup from "./Common/OrderPopup";
import SelectableJob from "./jobs/selectableJob";
import DecoCategory from "./jobs/DecoCategory";
import Cleaning from "./jobs/Cleaning";
import SizebaseJob from "./jobs/sizebaseJob";
import { SliderBox } from "react-native-image-slider-box";
import Spinner from "react-native-loading-spinner-overlay";
import VarientbaseJob from "./jobs/varientbaseJob";
import axios from "axios";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
Analytics.setUnavailabilityLogging(false);
Analytics.setDebugModeEnabled(true);

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IMAGE_HEIGHT = Platform.OS == "android" ? 320 : 335;
const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;

const AcBanners_ar = [
  //"https://i.ibb.co/LdrtWXw/Window-AC-Refill-Cleaning-Banner-Ar-min.png", //window  Ac
  //"https://i.ibb.co/f4Lrt9j/AC-installation-Arabic-06.png", //window ac
  // "https://i.ibb.co/Vp9QFWw/Ac-app-banner-Arabic-Text-Change.png", //split Ac
  //[url=https://ibb.co/CPK4xjK][img]https://i.ibb.co/Bn2v8h2/Ac-app-banner-Arabic-2.png[/img][/url]
  //"https://i.ibb.co/YchN3YR/Split-ac-Installation-arabic-1.png", //split ac
  // "https://i.ibb.co/Y8fghB0/Tower-AC-Refill-Cleaning-Banner-Ar-min.png" //Tower  Ac

  // "https://i.ibb.co/m4QJKyC/Water-Heater-Banner-Arabic.png",
  "https://i.ibb.co/N2d9ySH/window-ac-unit-Arabic.png",

  "https://i.ibb.co/JRKxMkZ/Electrician-Banner-1-Arabic.png",
  // "https://i.ibb.co/dJXJXmJ/banner-image-arabic-17.png",
  // "https://i.ibb.co/HBnwpS4/Split-AC-Cleaning-Arabic.png",
  "https://i.ibb.co/ZJC8XVd/Splt-AC-Cleaning-Arabic.jpg",
  "https://i.ibb.co/J3D5p6Q/Split-Ac-app-banner-Arabic.png",

  "https://i.ibb.co/BgxfyHm/Schedule-AC-Technician-Visit-Arabic.png",

  // "https://i.ibb.co/5xn6Dm4/Ac-app-banner-Arabic.png", //Split Indoor Cleanin
  // "https://i.ibb.co/BrV4mZQ/Feron-refil-Cleaning-arabic.png",
];
const AcBanners = [
  //"https://i.ibb.co/WPLQwM1/Window-AC-Refill-Cleaning-Banner-Eng-min.png", //window ac
  //"https://i.ibb.co/y4GL1HY/AC-installation-2.png", //window ac
  // "https://i.ibb.co/0hKJ02H/Ac-app-banner-2-Text-Change.png", //split ac
  // "https://i.ibb.co/ys57G29/Split-Installation-eng.png", // split ac installation
  // "https://i.ibb.co/8x8cvqp/Tower-AC-Refill-Cleaning-Banner-Eng-min.png" //tower ac

  // "https://i.ibb.co/Ltq2ZfT/Water-Heater-Banner-Eng.png",
  "https://i.ibb.co/VqfQLNQ/window-ac-unit-Eng.png",

  "https://i.ibb.co/whNMW9s/Electrician-Banner-1.png",
  // "https://i.ibb.co/SmTM14q/water-heater-banner-image-15.png",
  // "https://i.ibb.co/H2DRM0X/Split-AC-Cleaning-Eng.png",
  "https://i.ibb.co/F4yBH30/Split-AC-Cleaning-Eng.jpg",
  "https://i.ibb.co/ZhPNmp5/Split-Ac-app-banner.png",

  "https://i.ibb.co/cCJDnFf/Schedule-AC-Technician-Visit-Eng.png",

  // "https://i.ibb.co/PWSc9QP/Ac-app-banner.png", //Split AC Indoor CLeaning
  // "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",

  //https://i.ibb.co/WPLQwM1/Window-AC-Refill-Cleaning-Banner-Eng-min.png

  // "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png", //dessert cooler
  // "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png", //dessert cooler
  // "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png", //dessert cooler
  // "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png", //window unit
  // "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png", //window unit
  // "https://i.ibb.co/89v6MK4/Split-Ac-35-Per-Off-Arabic.png", //split unit
  // "https://i.ibb.co/KVyLYnw/Split-Ac-35-Per-Off-Eng.png", //split unit
  // "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png", //casette unit
  // "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png", //casette unit
  // "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png", //Tower  unit
  // "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png", //Tower unit
  // "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png" //central Ac
  //require("../assets/AcBanners/Desert-Cooler-Cleaning-1.png"), //central Ac
];
const AcOffersDataEng = [
  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      i_notes: "2 or more = SAR  84 / Unit",
      i_notes_ar: "( لعدد وحدتين او أكثر، السعر 84 ريال للوحدة (مكيف",
      id: 230,
      is_promoted: true,
      jobServiceIcon:
        "https://i.ibb.co/WPLQwM1/Window-AC-Refill-Cleaning-Banner-Eng-min.png",
      jobserviceName: "Window Unit",
      jobserviceNameAr: "مكيف ويندو (شباك)  ",
      name: "Freon Refill + Cleaning",
      name_ar: "تعبئة فريون + تنظيف",
      price: 120,
      pricelimit: 49,
      pricetype: 1,
      serviceid: 29,
      t_price: 0,
      saleprice: 84,

      productseoname:
        "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FWindow-min.png?alt=media&token=6338733b-3d6f-43dc-a744-cb60b1d74448",
    },
    webbanner:
      "https://i.ibb.co/WPLQwM1/Window-AC-Refill-Cleaning-Banner-Eng-min.png",
    banner: {
      url: "https://i.ibb.co/VqfQLNQ/window-ac-unit-Eng.png",
    },
    //--htttps://i.ibb.co/WPLQwM1/Window-AC-Refill-Cleaning-Banner-Eng-min.png
  },
  // {
  //   job: {
  //     jobserviceName: "Water Heater",
  //     jobserviceNameAr: "سخان الماء  ",
  //     id: 60,
  //     serviceid: 3,
  //     pricelimit: 49,
  //     name: "Installation of water heater",
  //     name_ar: "تركيب سخان الماء",
  //     price: 110,
  //     pricetype: 1,
  //     saleprice: 79,
  //     is_promoted: true,
  //     t_price: 0,
  //     i_notes: "Get 2 or more Water Heater Installation  Only in SAR 79 Each",
  //     i_notes_ar: "ركُب سخانين او أكثر فقط 79 ريال للسخان",
  //     cartnotes:
  //       "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
  //     cartnotes_ar:
  //       "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
  //     carttype: 1,

  //     productseoname: "https://i.ibb.co/Ltq2ZfT/Water-Heater-Banner-Eng.png",
  //   },
  //   webbanner: "https://i.ibb.co/Ltq2ZfT/Water-Heater-Banner-Eng.png",
  //   banner: {
  //     url: "https://i.ibb.co/Ltq2ZfT/Water-Heater-Banner-Eng.png",
  //   },

  //   //htttps://i.ibb.co/XZngvwL/Window-ac-installation-english.png
  // },
  {
    job: {
      jobserviceName: "Electrician",
      jobserviceNameAr: "كهربائي",
      id: 290,
      serviceid: 3,
      pricelimit: 49,
      name: "Electrician Visit",
      name_ar: "زيارة كهربائي",
      price: 35,
      pricetype: 2,
      saleprice: 35,
      is_promoted: true,
      t_price: 0,
      // i_notes: "Get 2 or more Water Heater Installation  Only in SAR 79 Each",
      // i_notes_ar: "ركُب سخانين او أكثر فقط 79 ريال للسخان",
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,

      productseoname: "https://i.ibb.co/whNMW9s/Electrician-Banner-1.png",
    },
    webbanner: "https://i.ibb.co/whNMW9s/Electrician-Banner-1.png",
    banner: {
      url: "https://i.ibb.co/whNMW9s/Electrician-Banner-1.png",
    },

    //htttps://i.ibb.co/XZngvwL/Window-ac-installation-english.png
  },

  // {
  //   job: {
  //     jobserviceName: "Plumbing",
  //     jobserviceNameAr: "سباك",
  //     id: 25,
  //     serviceid: 3,
  //     pricelimit: 49,
  //     name: "Plumber Visit",
  //     name_ar: "زيارة سباك",
  //     price: 35,
  //     pricetype: 2,
  //     saleprice: 35,
  //     is_promoted: true,
  //     t_price: 0,
  //     // i_notes: "Get 2 or more Water Heater Installation  Only in SAR 79 Each",
  //     // i_notes_ar: "ركُب سخانين او أكثر فقط 79 ريال للسخان",
  //     cartnotes:
  //       "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
  //     cartnotes_ar:
  //       "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
  //     carttype: 1,

  //     productseoname:
  //       "https://i.ibb.co/SmTM14q/water-heater-banner-image-15.png",
  //   },
  //   webbanner: "https://i.ibb.co/SmTM14q/water-heater-banner-image-15.png",
  //   banner: {
  //     url: "https://i.ibb.co/SmTM14q/water-heater-banner-image-15.png",
  //   },

  //   //htttps://i.ibb.co/XZngvwL/Window-ac-installation-english.png
  // },

  // {
  //   id: 98,
  //   name: "Electrician Visit",
  //   name_ar: "زيارة كهربائي",
  //   seo_name:
  //     "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FElectrician-Visit-min.png?alt=media&token=5d672cea-38aa-4bdb-be4d-9a37d220402b",
  //   jobs: [
  //     {
  //       id: 290,
  //       serviceid: 1,
  //       pricelimit: 49,
  //       name: "Schedule Visit",
  //       name_ar: "ترتيب زيارة",
  //       price: 35,
  //       pricetype: 2,
  //       cartnotes:
  //         "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
  //       cartnotes_ar:
  //         "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
  //       carttype: 1,
  //     },

  // {
  //   job: {
  //     cartnotes:
  //       "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
  //       "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
  //     cartnotes_ar:
  //       "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
  //       " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
  //     carttype: 1,
  //     i_notes: "2 or more = SAR  199 / Unit",
  //     i_notes_ar: "(لعدد وحدتين او أكثر، السعر 199 ريال للوحدة (مكيف",
  //     id: 223,
  //     is_promoted: true,
  //     jobServiceIcon: "https://i.ibb.co/3yz3LHy/Ac-app-banner-2.png",
  //     jobserviceName: "Split Unit",
  //     jobserviceNameAr: "مكيف اسبليت",
  //     name: "Deep Cleaning + Gas Top up", //Freon Refill + Cleaning
  //     name_ar: "تعبئة فريون + تنظيف",
  //     price: 229, //150
  //     pricelimit: 49,
  //     pricetype: 1,
  //     serviceid: 29,
  //     saleprice: 199, //105
  //     t_price: 0,

  //     productseoname:
  //       "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FSplit-min.png?alt=media&token=1a0943d3-ae9a-4422-b82c-d3d1862910de",
  //   },
  //   webbanner: "https://i.ibb.co/3yz3LHy/Ac-app-banner-2.png",
  //   banner: {
  //     url: "https://i.ibb.co/0hKJ02H/Ac-app-banner-2-Text-Change.png",
  //   },
  //   //??

  //   // htttps://i.ibb.co/L6XdvKV/Split-Ac-35-Per-Off-Eng-min.png
  // },
  // {
  //   job: {
  //     cartnotes:
  //       "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
  //       "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
  //     cartnotes_ar:
  //       "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
  //       " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
  //     carttype: 1,
  //     jobServiceIcon:
  //       "https://i.ibb.co/DVx43S1/AC-installation-1.pnghttps://i.ibb.co/ys57G29/Split-Installation-eng.png",
  //     jobserviceName: "Split Unit",
  //     jobserviceNameAr: "مكيف اسبليت",
  //     id: 65,
  //     serviceid: 29,
  //     pricelimit: 49,
  //     name: "Installation",
  //     name_ar: "تركيب",
  //     price: 200, //200
  //     pricetype: 1,
  //     is_promoted: true,
  //     t_price: 0,
  //     saleprice: 150, //150
  //     i_notes: "Get 2 or more units installed in SAR 150 each",
  //     i_notes_ar: "تركيب وحدتين أو اكثر بـ 150 ريال  لكل وحدة",

  //     productseoname: "https://i.ibb.co/ys57G29/Split-Installation-eng.png",
  //   },
  //   webbanner: "https://i.ibb.co/ys57G29/Split-Installation-eng.png",
  //   banner: {
  //     url: "https://i.ibb.co/ys57G29/Split-Installation-eng.png",
  //   },

  //   //htttps://i.ibb.co/17MmDg0/Split-ac-installation-eng.png
  // },

  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      jobServiceIcon: "https://i.ibb.co/PWSc9QP/Ac-app-banner.png",
      jobserviceName: "Split Unit",
      jobserviceNameAr: "مكيف اسبليت",
      id: 70,
      serviceid: 29,
      pricelimit: 49,
      name: "Cleaning (Indoor)",
      name_ar: "التنظيف (داخلي)",
      price: 89, //200
      pricetype: 1,
      is_promoted: true,
      t_price: 0,
      saleprice: 80, //150
      i_notes: "Get 2 or more units cleaned in SAR 80 each",
      i_notes_ar: "تركيب وحدتين أو اكثر بـ 150 ريال  لكل وحدة",

      productseoname: "https://i.ibb.co/PWSc9QP/Ac-app-banner.png",
    },
    webbanner: "https://i.ibb.co/PWSc9QP/Ac-app-banner.png",
    banner: {
      url: "https://i.ibb.co/F4yBH30/Split-AC-Cleaning-Eng.jpg",
    },

    //htttps://i.ibb.co/17MmDg0/Split-ac-installation-eng.png
  },

  // {
  //   job: {
  //     cartnotes:
  //       "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
  //       "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
  //     cartnotes_ar:
  //       "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
  //       " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
  //     carttype: 1,
  //     i_notes: "2 or more = SAR 168 / Unit",
  //     i_notes_ar: "(لعدد وحدتين او أكثر، السعر 168 ريال للوحدة (مكيف",
  //     id: 228,
  //     is_promoted: true,
  //     jobServiceIcon: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
  //     // name: "Tower Unit",
  //     // name_ar: "مكيف تاور (برج/نقال)",
  //     name: "Freon Refill + Cleaning",
  //     name_ar: "تعبئة فريون + تنظيف",
  //     jobserviceName: "Tower Unit",
  //     jobserviceNameAr: "مكيف تاور (برج/نقال)",
  //     price: 240,
  //     pricelimit: 49,
  //     pricetype: 1,
  //     serviceid: 29,
  //     saleprice: 168,
  //     t_price: 0,
  //     productseoname:
  //       "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FTower-Unit-min.png?alt=media&token=57032c5d-3e16-4476-ac59-ddb5ba4a7973",
  //   },
  //   webbanner: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
  //   banner: {
  //     url: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
  //   },
  //   // htttps://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png
  // },
  {
    job: {
      i_notes: "Cleaning & Freon refill on 2 or more units in SAR 105 each",
      i_notes_ar:
        "التنظيف وإعادة تعبئة الفريون على وحدتين أو أكثر ب 105 ريال  لكل وحدة",
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      id: 228,
      is_promoted: true,
      jobServiceIcon: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
      // name: "Tower Unit",
      // name_ar: "مكيف تاور (برج/نقال)",
      name: "Indoor Cleaning + Freon Refill (Partial)",
      name_ar: "التنظيف الداخلي + إعادة تعبئة الفريون (جزئي)",
      jobserviceName: "Split Unit",
      jobserviceNameAr: "مكيف تاور (برج/نقال)",
      price: 150,
      pricelimit: 49,
      pricetype: 1,
      serviceid: 29,
      saleprice: 105,
      t_price: 0,
      productseoname:
        "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FTower-Unit-min.png?alt=media&token=57032c5d-3e16-4476-ac59-ddb5ba4a7973",
    },
    webbanner: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
    banner: {
      url: "https://i.ibb.co/ZhPNmp5/Split-Ac-app-banner.png",
    },
    // htttps://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png
  },

  {
    job: {
      i_notes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      i_notes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      id: 228,
      is_promoted: true,
      jobServiceIcon: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
      // name: "Tower Unit",
      // name_ar: "مكيف تاور (برج/نقال)",
      name: "AC Technician Visit",
      name_ar: "زيارة فني تكييف",
      jobserviceName: "Schedule Visit",
      jobserviceNameAr: "ترتيب زيارة",
      price: 35,
      pricelimit: 49,
      pricetype: 2,
      serviceid: 29,
      saleprice: 35,
      t_price: 0,
      productseoname:
        "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FTower-Unit-min.png?alt=media&token=57032c5d-3e16-4476-ac59-ddb5ba4a7973",
    },
    webbanner: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
    banner: {
      url: "https://i.ibb.co/cCJDnFf/Schedule-AC-Technician-Visit-Eng.png",
    },
    // htttps://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png
  },
];
const AcOffersData_ar = [
  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      i_notes: "2 or more = SAR  84 / Unit",
      i_notes_ar: "( لعدد وحدتين او أكثر، السعر 84 ريال للوحدة (مكيف",
      id: 230,
      is_promoted: true,
      jobServiceIcon:
        "https://i.ibb.co/WPLQwM1/Window-AC-Refill-Cleaning-Banner-Eng-min.png",
      jobserviceName: "Window Unit",
      jobserviceNameAr: "مكيف ويندو (شباك)  ",
      name: "Freon Refill + Cleaning",
      name_ar: "تعبئة فريون + تنظيف",
      price: 120,
      pricelimit: 49,
      pricetype: 1,
      serviceid: 29,
      t_price: 0,
      saleprice: 84,

      productseoname:
        "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FWindow-min.png?alt=media&token=6338733b-3d6f-43dc-a744-cb60b1d74448",
    },
    webbanner:
      "https://i.ibb.co/WPLQwM1/Window-AC-Refill-Cleaning-Banner-Eng-min.png",
    banner: {
      url: "https://i.ibb.co/N2d9ySH/window-ac-unit-Arabic.png",
    },
    //--htttps://i.ibb.co/WPLQwM1/Window-AC-Refill-Cleaning-Banner-Eng-min.png
  },

  {
    job: {
      jobserviceName: "Electrician",
      jobserviceNameAr: "كهربائي",
      id: 290,
      serviceid: 3,
      pricelimit: 49,
      name: "Electrician Visit",
      name_ar: "زيارة كهربائي",
      price: 35,
      pricetype: 2,
      saleprice: 35,
      is_promoted: true,
      t_price: 0,
      // i_notes: "Get 2 or more Water Heater Installation  Only in SAR 79 Each",
      // i_notes_ar: "ركُب سخانين او أكثر فقط 79 ريال للسخان",
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,

      productseoname: "https://i.ibb.co/whNMW9s/Electrician-Banner-1.png",
    },
    webbanner: "https://i.ibb.co/whNMW9s/Electrician-Banner-1.png",
    banner: {
      url: "https://i.ibb.co/JRKxMkZ/Electrician-Banner-1-Arabic.png",
    },

    //htttps://i.ibb.co/XZngvwL/Window-ac-installation-english.png
  },
  {
    job: {
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
        "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
        " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      jobServiceIcon: "https://i.ibb.co/PWSc9QP/Ac-app-banner.png",
      jobserviceName: "Split Unit",
      jobserviceNameAr: "مكيف اسبليت",
      id: 70,
      serviceid: 29,
      pricelimit: 49,
      name: "Cleaning (Indoor)",
      name_ar: "التنظيف (داخلي)",
      price: 89, //200
      pricetype: 1,
      is_promoted: true,
      t_price: 0,
      saleprice: 80, //150
      i_notes: "Get 2 or more units cleaned in SAR 80 each",
      i_notes_ar: "تركيب وحدتين أو اكثر بـ 150 ريال  لكل وحدة",

      productseoname: "https://i.ibb.co/PWSc9QP/Ac-app-banner.png",
    },
    webbanner: "https://i.ibb.co/PWSc9QP/Ac-app-banner.png",
    banner: {
      url: "https://i.ibb.co/ZJC8XVd/Splt-AC-Cleaning-Arabic.jpg",
    },

    //htttps://i.ibb.co/17MmDg0/Split-ac-installation-eng.png
  },
  {
    job: {
      i_notes: "Cleaning & Freon refill on 2 or more units in SAR 105 each",
      i_notes_ar:
        "التنظيف وإعادة تعبئة الفريون على وحدتين أو أكثر ب 105 ريال  لكل وحدة",
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      id: 228,
      is_promoted: true,
      jobServiceIcon: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
      // name: "Tower Unit",
      // name_ar: "مكيف تاور (برج/نقال)",
      name: "Indoor Cleaning + Freon Refill (Partial)",
      name_ar: "التنظيف الداخلي + إعادة تعبئة الفريون (جزئي)",
      jobserviceName: "Split Unit",
      jobserviceNameAr: "مكيف تاور (برج/نقال)",
      price: 150,
      pricelimit: 49,
      pricetype: 1,
      serviceid: 29,
      saleprice: 105,
      t_price: 0,
      productseoname:
        "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FTower-Unit-min.png?alt=media&token=57032c5d-3e16-4476-ac59-ddb5ba4a7973",
    },
    webbanner: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
    banner: {
      url: "https://i.ibb.co/J3D5p6Q/Split-Ac-app-banner-Arabic.png",
    },
    // htttps://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png
  },

  {
    job: {
      i_notes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      i_notes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      cartnotes:
        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
      cartnotes_ar:
        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
      carttype: 1,
      id: 228,
      is_promoted: true,
      jobServiceIcon: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
      // name: "Tower Unit",
      // name_ar: "مكيف تاور (برج/نقال)",
      name: "AC Technician Visit",
      name_ar: "زيارة فني تكييف",
      jobserviceName: "Schedule Visit",
      jobserviceNameAr: "ترتيب زيارة",
      price: 35,
      pricelimit: 49,
      pricetype: 2,
      serviceid: 29,
      saleprice: 35,
      t_price: 0,
      productseoname:
        "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FTower-Unit-min.png?alt=media&token=57032c5d-3e16-4476-ac59-ddb5ba4a7973",
    },
    webbanner: "https://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png",
    banner: {
      url: "https://i.ibb.co/BgxfyHm/Schedule-AC-Technician-Visit-Arabic.png",
    },
    // htttps://i.ibb.co/pKhLVCz/Feron-refil-Cleaning-eng.png
  },
];

// const AcOffersDataEng = [
//   {
//     job: {
//       cartnotes:
//         "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
//         "2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
//       cartnotes_ar:
//         "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل." +
//         " السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
//       carttype: 1,
//       i_notes: "2 or more = SAR 70 / Unit",
//       i_notes_ar: "لعدد وحدتين او أكثر، السعر 91 ريال للوحدة (المبرد)",
//       id: 81,
//       is_promoted: true,
//       jobServiceIcon:
//         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FDessert-Cooler-min.png?alt=media&token=478fe594-de43-47b7-8656-4fef181249d2",
//       jobserviceName: "Desert Cooler",
//       jobserviceNameAr: "مكيف صحراوي (مبرد)",
//       name: "Small Desert Cooler Cleaning",
//       name_ar: "تنظيف المبرد الصغير ",
//       price: 130,
//       pricelimit: 49,
//       pricetype: 1,
//       serviceid: 29,
//       productseoname: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     },
//     webbanner: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//     banner: {
//       url: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     }
//   },
//   {
//     job: {
//       cartnotes:
//         "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
//         "2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
//       cartnotes_ar:
//         "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل." +
//         " السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
//       carttype: 1,
//       carttype: 1,
//       i_notes: "2 or more = SAR 112 / Unit",
//       i_notes_ar: "لعدد وحدتين او أكثر، السعر 120 ريال للوحدة (المبرد)",
//       id: 79,
//       is_promoted: true,
//       jobServiceIcon: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//       jobserviceName: "Desert Cooler",
//       jobserviceNameAr: "مكيف صحراوي (مبرد)",
//       name: "Large Dessert Cooler Installation",
//       name_ar: "تركيب مبرد حلويات كبير",
//       price: 160,
//       pricelimit: 49,
//       pricetype: 1,
//       serviceid: 29,

//       productseoname: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     },
//     webbanner: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//     banner: {
//       url: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     }
//   },
//   {
//     job: {
//       cartnotes:
//         "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
//         "2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
//       cartnotes_ar:
//         "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل." +
//         " السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
//       carttype: 1,
//       carttype: 1,
//       i_notes: "2 or more = SAR 70 / Unit",
//       i_notes_ar: "لعدد وحدتين او أكثر، السعر 70 ريال للوحدة (المبرد)",
//       id: 79,
//       is_promoted: true,
//       jobServiceIcon: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//       jobserviceName: "Desert Cooler",
//       jobserviceNameAr: "مكيف صحراوي (مبرد)",
//       name: "Small Dessert Cooler Installation",
//       name_ar: "تركيب مبرد حلويات صغير",
//       price: 100,
//       pricelimit: 49,
//       pricetype: 1,
//       serviceid: 29,

//       productseoname: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     },
//     webbanner: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//     banner: {
//       url: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     }
//   },
//   {
//     job: {
//       cartnotes:
//         "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
//         "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
//       cartnotes_ar:
//         "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
//         " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
//       carttype: 1,
//       i_notes: "2 or more = SAR  84 / Unit",
//       i_notes_ar: "( لعدد وحدتين او أكثر، السعر 84 ريال للوحدة (مكيف",
//       id: 230,
//       is_promoted: true,
//       jobServiceIcon: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//       jobserviceName: "Window Unit",
//       jobserviceNameAr: "( لعدد وحدتين او أكثر، السعر 84 ريال للوحدة (مكيف",
//       name: "Freon Refill + Cleaning",
//       name_ar: "تعبئة فريون + تنظيف",
//       price: 120,
//       pricelimit: 49,
//       pricetype: 1,
//       serviceid: 29,

//       productseoname: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     },
//     webbanner: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//     banner: {
//       url: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     }
//   },
//   {
//     job: {
//       cartnotes:
//         "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
//         "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
//       cartnotes_ar:
//         "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
//         " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
//       carttype: 1,
//       i_notes: "2 or more = SAR 150 / Unit",
//       i_notes_ar: "(لعدد وحدتين او أكثر، السعر 150 ريال للوحدة (مكيف)",
//       id: 65,
//       is_promoted: true,
//       jobServiceIcon: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//       jobserviceName: "Split Unit",
//       jobserviceNameAr: "مكيف اسبليت",
//       name: "Installation",
//       name_ar: "تركيب",
//       price: 200,
//       pricelimit: 49,
//       pricetype: 1,
//       serviceid: 29,

//       productseoname: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     },
//     webbanner: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//     banner: {
//       url: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     }
//   },
//   {
//     job: {
//       cartnotes:
//         "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
//         "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
//       cartnotes_ar:
//         "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
//         " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
//       carttype: 1,
//       i_notes: "2 or more = SAR 148 / Unit",
//       i_notes_ar: "(لعدد وحدتين او أكثر، السعر 150 ريال للوحدة (مكيف)",
//       id: 65,
//       is_promoted: true,
//       jobServiceIcon: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//       jobserviceName: "Split Unit",
//       jobserviceNameAr: "مكيف اسبليت",
//       name: "Installation",
//       name_ar: "تركيب",
//       price: 200,
//       pricelimit: 49,
//       pricetype: 1,
//       serviceid: 29,

//       productseoname: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     },
//     webbanner: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//     banner: {
//       url: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     }
//   },
//   {
//     job: {
//       cartnotes:
//         "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
//         "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
//       cartnotes_ar:
//         "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
//         " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
//       carttype: 1,
//       i_notes: "2 or more = SAR  105 / Unit",
//       i_notes_ar: "(لعدد وحدتين او أكثر، السعر 105 ريال للوحدة (مكيف",
//       id: 223,
//       is_promoted: true,
//       jobServiceIcon: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//       jobserviceName: "Split Unit",
//       jobserviceNameAr: "مكيف اسبليت",
//       name: "Freon Refill + Cleaning",
//       name_ar: "تعبئة فريون + تنظيف",
//       price: 150,
//       pricelimit: 49,
//       pricetype: 1,
//       serviceid: 29,

//       productseoname: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     },
//     webbanner: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//     banner: {
//       url: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     }
//   },
//   {
//     job: {
//       cartnotes:
//         "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
//         "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
//       cartnotes_ar:
//         "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
//         " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
//       id: 232,
//       serviceid: 29,
//       pricelimit: 49,
//       name: "Freon Refill + Cleaning",
//       name_ar: "تعبئة فريون + تنظيف",
//       price: 150,
//       pricetype: 1,
//       is_promoted: true,
//       i_notes: "2 or more = SAR  105 / Unit",
//       i_notes_ar: "(لعدد وحدتين او أكثر، السعر 105 ريال للوحدة (مكيف",
//       carttype: 1,
//       jobServiceIcon: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//       productseoname: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     },
//     webbanner: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//     banner: {
//       url: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     }
//   },
//   {
//     job: {
//       cartnotes:
//         "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
//         "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
//       cartnotes_ar:
//         "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
//         " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
//       id: 74,
//       serviceid: 29,
//       pricelimit: 49,
//       name: "Installation",
//       name_ar: "تركيب",
//       is_promoted: true,
//       i_notes: "2 or more = SAR  188 / Unit",
//       i_notes_ar: "(لعدد وحدتين او أكثر، السعر 188 ريال للوحدة (مكيف",
//       price: 249,
//       pricetype: 1,
//       carttype: 1,
//       jobServiceIcon: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//       productseoname: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     },
//     webbanner: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//     banner: {
//       url: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     }
//   },
//   {
//     job: {
//       id: 228,
//       serviceid: 29,
//       pricelimit: 49,
//       name: "Freon Refill + Cleaning",
//       name_ar: "تعبئة فريون + تنظيف",
//       price: 240,
//       is_promoted: true,
//       pricetype: 1,
//       i_notes: "2 or more = SAR 168 / Unit",
//       i_notes_ar: "(لعدد وحدتين او أكثر، السعر 168 ريال للوحدة (مكيف",
//       carttype: 1,
//       jobServiceIcon: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//       productseoname: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     },
//     webbanner: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//     banner: {
//       url: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     }
//   },
//   {
//     job: {
//       cartnotes:
//         "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
//         "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
//       cartnotes_ar:
//         "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
//         " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
//       id: 74,
//       serviceid: 29,
//       pricelimit: 49,
//       name: "Installation",
//       name_ar: "تركيب",
//       is_promoted: true,
//       i_notes: "2 or more = SAR  187 / Unit",
//       i_notes_ar: "(لعدد وحدتين او أكثر، السعر 187 ريال للوحدة (مكيف",
//       price: 249,
//       pricetype: 1,
//       carttype: 1,
//       jobServiceIcon: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//       productseoname: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     },
//     webbanner: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//     banner: {
//       url: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     }
//   },
//   {
//     job: {
//       cartnotes:
//         "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work" +
//         "- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
//       cartnotes_ar:
//         "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. " +
//         " ↵السعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
//       id: 77,
//       serviceid: 29,
//       pricelimit: 49,
//       name: "Cleaning",
//       name_ar: "تنظيف",
//       price: 240,
//       pricetype: 1,
//       is_promoted: true,
//       i_notes: "2 or more = SAR 168 / Unit",
//       i_notes_ar: "(لعدد وحدتين او أكثر، السعر 168 ريال للوحدة (مكيف)",
//       carttype: 1,
//       jobServiceIcon: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//       productseoname: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     },
//     webbanner: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png",
//     banner: {
//       url: "https://i.ibb.co/61nTkWV/Desert-Cooler-Cleaning-1.png"
//     }
//   }
// ];

export default class LandingSecreen extends React.Component {
  nScroll = new Animated.Value(0);
  scroll = new Animated.Value(0);
  tabYButton = this.nScroll.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.7, 0],
  });
  imgScale = this.nScroll.interpolate({
    inputRange: [-25, 0],
    outputRange: [1.2, 1],
    extrapolateRight: "clamp",
  });
  tabY = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1],
  });

  usersToLogout = [
    "0567948133",
    "0511111111",
    "0555291471",
    "0542639779",
    "0554833373",
    "0565650876",
    "0533366469",
    "0535113151",
    "0568625880",
    "0508650682",
    "0586000000",
    "0568000000",
    "0508288370",
    "0568888888",
    "0569966122",
    "0566888056",
    "0532481874",
    "0500243762",
    "0555598870",
    "0599565953",
    "0538251416",
    "0581353890",
    "0596666616",
    "0561726671",
    "0534777896",
    "0569221076",
    "0530268441",
    "0533465780",
    "0544577511",
    "0548200332",
    "0560019345",
    "0506795052",
    "0553030903",
    "0566544558",
    "0558667214",
    "0537672105",
    "0569696640",
    "0539105692",
    "0555427626",
    "0582071123",
    "0566313762",
    "0559444392",
    "0556786788",
    "0505737627",
    "0501543884",
    "0543110940",
    "0554955075",
    "0566387999",
    "0567474505",
    "0508835759",
    "0505616166",
    "0538061392",
    "0555645013",
    "0502716688",
    "0556259213",
    "0543745955",
    "0562558588",
    "0550435699",
    "0568226227",
    "0556944887",
    "0556976637",
    "0500860060",
    "0502104812",
    "0505556173",
    "0500079767",
    "0535647013",
    "0566633288",
    "0555115575",
    "0570215040",
    "0545449015",
    "0553947685",
    "0581379869",
    "0566559375",
    "0531147415",
    "0500453769",
    "0507092593",
    "0561116736",
    "0502024992",
    "0580628938",
    "0559676875",
    "0546679046",
    "0552252649",
    "0500816464",
    "0568258459",
    "0543221542",
    "0583298080",
    "0569796982",
    "0553433005",
    "0552053400",
    "0530184905",
    "0582048322",
    "0556043168",
    "0554971609",
    "0500086198",
    "0550794084",
    "0569400057",
    "0532624829",
    "0571129124",
    "0501861621",
    "0546348209",
    "0501145126",
    "0539072803",
    "0544451668",
    "0571167571",
    "0501411451",
    "0598446802",
    "0551452972",
    "0547075555",
    "0596934480",
    "0566041658",
    "0562089090",
    "0581600030",
    "0540523622",
    "0562661386",
    "0551898840",
    "0542114164",
    "0531626301",
    "0508863557",
    "0533399541",
    "0566011992",
    "0502929297",
    "0543169291",
    "0508746867",
    "0555510696",
    "0583065640",
    "0540640549",
    "0503721074",
    "0553344782",
    "0545301452",
    "0590622823",
    "0540414129",
    "0557723418",
    "0503739668",
    "0554456866",
    "0538425186",
    "0545006176",
    "0548444325",
    "0506632100",
    "0504584898",
    "0551714243",
    "0555588533",
    "0536387351",
    "0506491107",
    "0539433038",
    "0533820960",
    "0570364968",
    "0503102380",
    "0550558501",
    "0565057642",
    "0559993238",
    "0500781193",
    "0538383499",
    "0580355304",
    "0599196661",
    "0559115249",
    "0541405103",
    "0505260404",
    "0555203070",
    "0537044925",
    "0552980261",
    "0552980298",
    "0552980291",
    "0534356634",
    "0537497617",
    "0594090599",
    "0561477044",
    "0504174132",
    "0540760314",
    "0562594666",
    "0535721060",
    "0554804154",
    "0532249012",
    "0566747200",
    "0554212378",
    "0542150077",
    "0559002334",
    "0504283482",
    "0504145886",
    "0505883038",
    "0590850850",
    "0599990602",
    "0559031081",
    "0530909149",
    "0535233744",
    "0500883329",
    "0507902859",
    "0501482030",
    "0542209628",
    "0530415781",
    "0577974151",
    "0550645448",
    "0542293600",
    "0558666988",
    "0558882620",
    "0565241565",
    "0558113399",
    "0507960675",
    "0549177499",
    "0554132557",
    "0557552216",
    "0568413129",
    "0538413129",
    "0505411835",
    "0547470218",
    "0506185406",
    "0559476832",
    "0546755158",
    "0537230123",
    "0534230123",
    "0555210086",
    "0535084606",
    "0542560942",
    "0599638151",
    "0540772977",
    "0599684413",
    "0595641145",
    "0538991988",
    "0561013456",
    "0569352309",
    "0506040368",
    "0506043685",
    "0558539079",
    "0504167321",
    "0544305233",
    "0576200200",
    "0562711172",
    "0504186432",
    "0504186423",
    "0504186433",
    "0555205027",
    "0508139990",
    "0536347550",
    "0503394456",
    "0546000928",
    "0563236325",
    "0532700386",
    "0504661100",
    "0555690618",
    "0556199586",
    "0548781590",
    "0545767076",
    "0551567747",
    "0558335102",
    "0501459564",
    "0553013401",
    "0502070208",
    "0591115855",
    "0507555760",
    "0556852061",
    "0583100702",
    "0507495493",
    "0502517695",
    "0501251769",
    "0505446607",
    "0573141294",
    "0500088351",
    "0502534198",
    "0561111866",
    "0504248959",
    "0543494308",
    "0502728231",
    "0504703470",
    "0554888917",
    "0532926116",
    "0508284589",
    "0562410679",
    "0557469967",
    "0534360473",
    "0551117407",
    "0550625456",
    "0507928061",
    "0565720789",
    "0558269358",
    "0580088073",
    "0590364627",
    "0535345661",
    "0592042555",
    "0545187147",
    "0543256400",
    "0555117335",
    "0509329510",
    "0501459311",
    "0592866034",
    "0539450690",
    "0560568568",
    "0500299491",
    "0564686251",
    "0553813999",
    "0533624440",
    "0583460999",
    "0564020703",
    "0555098142",
    "0504162677",
    "0582530669",
    "0570073628",
    "0545787758",
    "0500038846",
    "0505766276",
    "0500004432",
    "0549383359",
    "0533752509",
    "0544225151",
    "0582922109",
    "0562438623",
    "0565155125",
    "0567655327",
    "0563511720",
    "0543382135",
    "0544211030",
    "0554229929",
    "0563635554",
    "0548131446",
    "0502081456",
    "0566455557",
    "0565858199",
    "0597995797",
    "0544684971",
    "0565863445",
    "0558584868",
    "0550609105",
    "0590323741",
    "0566687766",
    "0509741254",
    "0534943333",
    "0541308104",
    "0500323095",
    "0504225606",
    "0508418020",
    "0594285363",
    "0505969006",
    "0509690295",
    "0544590095",
    "0505276599",
    "0536558390",
    "0508637908",
    "0507930137",
    "0555225900",
    "0555225907",
    "0545622261",
    "0530302901",
    "0500818382",
    "0558273882",
    "0502966338",
    "0504128237",
    "0582838373",
    "0552012075",
    "0551875908",
    "0534341414",
    "0582251417",
    "0534341417",
    "0591460092",
    "0599908966",
    "0560391090",
    "0506664999",
    "0568229688",
    "0506334999",
    "0504484108",
    "0541953936",
    "0581321843",
    "0508177120",
    "0580007943",
    "0553087284",
    "0544669252",
    "0554485228",
    "0538588890",
    "0502069062",
    "0562084278",
    "0533227247",
    "0508984599",
    "0565003909",
    "0590909947",
    "0531281111",
    "0541644452",
    "0541644453",
    "0569985303",
    "0544781232",
    "0543671066",
    "0535598821",
    "0544431639",
    "0551335445",
    "0559845404",
    "0555112491",
    "0542226628",
    "0559913817",
    "0507699641",
    "0506906328",
    "0503435626",
    "0536255562",
    "0535839990",
    "0592222145",
    "0541055934",
    "0530872842",
    "0572113291",
    "0561279664",
    "0508676442",
    "0504309176",
    "0549533971",
    "0559205955",
    "0564949961",
    "0570567513",
    "0537057778",
    "0591678404",
    "0595506689",
    "0501843298",
    "0594500193",
    "0535889835",
    "0507265832",
    "0556550274",
    "0552860794",
    "0556283473",
    "0557775922",
    "0555396222",
    "0506415217",
    "0568625881",
    "0550224225",
    "0563314677",
    "0580138573",
    "0572149382",
    "0533232508",
    "0564901600",
    "0533393602",
    "0598914654",
    "0505843521",
    "0582230224",
    "0536106319",
    "0566009798",
    "0545398767",
    "0567996137",
    "0553200797",
    "0555554843",
    "0543147448",
    "0583777725",
    "0569990693",
    "0544455770",
    "0567166172",
    "0554709233",
    "0564816952",
    "0506492414",
    "0580802011",
    "0503405354",
    "0562418331",
    "0500000209",
    "0535233665",
    "0551919020",
    "0502496187",
    "0581153444",
    "0541420702",
    "0500560885",
    "0569522163",
    "0592389122",
    "0504231417",
    "0500849024",
    "0501011505",
    "0533565527",
    "0590705664",
    "0503539721",
    "0545996555",
    "0560000003",
    "0555611500",
    "0533681190",
    "0595511669",
    "0581656464",
    "0551412441",
    "0504618150",
    "0500600372",
    "0561644244",
    "0501270664",
    "0592006000",
    "0500433173",
    "0505836674",
    "0531332226",
    "0500805045",
    "0583388854",
    "0504930092",
    "0591234443",
    "0547112734",
    "0547690016",
    "0580292614",
    "0552778139",
    "0533453159",
    "0555887844",
    "0540862054",
    "0500813271",
    "0550112434",
    "0567771177",
    "0501539259",
    "0534288861",
    "0582888481",
    "0555022804",
    "0555880858",
    "0537703261",
    "0591408934",
    "0534936576",
    "0500202353",
    "0532406620",
    "0547488204",
    "0593385956",
    "0552280748",
    "0580080734",
    "0596666585",
    "0532841997",
    "0553474432",
    "0550924651",
    "0556465433",
    "0555295566",
    "0556457948",
    "0552112000",
    "0540002477",
    "0568994888",
    "0549855699",
    "0565104386",
    "0556108830",
    "0509148150",
    "0503762278",
    "0532778729",
    "0550550763",
    "0503423741",
    "0567289180",
    "0599929934",
    "0557468419",
    "0568899516",
    "0555597699",
    "0506976048",
    "0542868887",
    "0565555474",
    "0567819099",
    "0503959730",
    "0550916020",
    "0534448822",
    "0503341742",
    "0554994942",
    "0508333331",
    "0566283547",
    "0546070533",
    "0564560755",
    "0553783116",
    "0593426301",
    "0506604998",
    "0542643489",
    "0548623504",
    "0555499903",
    "0546632490",
    "0559271472",
    "0570560402",
    "0555233252",
    "0507201421",
    "0500298163",
    "0539264763",
    "0536447770",
    "0555780465",
    "0556149668",
    "0504371058",
    "0594936232",
    "0567262952",
    "0591807877",
    "0591504075",
    "0594227211",
    "0533493727",
    "0561577703",
    "0509870822",
    "0597431941",
    "0509898540",
    "0500585582",
    "0505362526",
    "0552222116",
    "0507797370",
    "0541557958",
    "0557070717",
    "0558707018",
    "058707018",
    "0566305368",
    "0561372264",
    "0504105410",
    "0532334122",
    "0567450847",
    "0504123786",
    "0540861560",
    "0597863691",
    "0564525676",
    "0505575460",
    "0592017728",
    "0544524539",
    "0559367065",
    "0562273182",
    "0560905834",
    "0538831054",
    "0502315807",
    "0580522081",
    "0508136742",
    "0546028148",
    "0500598971",
    "0563163288",
    "0535960286",
    "0582470629",
    "0580886580",
    "0548739171",
    "0503619024",
    "0502596627",
    "0542331968",
    "0595844064",
    "0580737130",
    "0556020118",
    "0568345407",
    "0547495337",
    "0556353523",
    "0555053167",
    "0503629778",
    "0556659592",
    "0542565133",
    "0560226681",
    "0504466580",
    "0556284100",
    "0593177980",
    "0500744728",
    "0533197520",
    "0547472000",
    "0505476610",
    "0566226046",
    "0555210253",
    "0564983193",
    "0568625880",
  ];

  //regex (\d{12})
  // replace "$1"

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
      note: "",
      loading: true,
      visible: false,
      popup: false,
      videoPopup: false,
      findPoup: false,
      orderPopup: false,
      videoSelected: 0,
    };
  }
  _handleNotificationBackground = (notification) => {
    this._handleNotification(notification.notification);
    console.log(
      "notification recieved in background ",
      notification.notification.request.content.data
    );
  };
  componentDidMount = async () => {
    // My Test
    let lan = await AsyncStorage.getItem("lan");
    let user = await AsyncStorage.getItem("user");
    let feedbackShow = await AsyncStorage.getItem("PopUp_Feedback");

    this.setState({
      lan: lan !== null ? lan : "en",
      user: user !== null ? JSON.parse(user) : null,
    });

    console.log("user_information", JSON.parse(user), lan);
    // if (
    //   // JSON.parse(user).mobile == "0568625880" ||
    //   // JSON.parse(user).mobile == "0567948133"
    //   this.usersToLogout.includes(JSON.parse(user).mobile)
    // ) {
    //   //or get from customer id
    //   await AsyncStorage.removeItem("user");
    // }

    console.log("My Language");

    // http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wfportal/api/cu/v.3/app

    if (feedbackShow != null) {
      console.log("Please give the Feedbackk");
      //alert(feedbackShow);
      this.props.navigation.navigate("OrderDetails", {
        order: JSON.parse(feedbackShow),
        lan: lan !== null ? lan : "en",
        user: user,
        isHistory: true,
        isFeedback: true,
      });
    } else {
      console.log("No Feedback");
    }
    // console.log("test", feedbackShow);
    // let lan = await AsyncStorage.getItem("lan");
    await AsyncStorage.removeItem("jobs");
    // let user = await AsyncStorage.getItem("user");
    this.setState({
      lan: lan !== null ? lan : "en",
      user: user !== null ? JSON.parse(user) : null,
    });
    this.checkUserLocation();
    this.getOffers();
    this.getCategories();
    this.getbanner();
    this._notificationSubscription =
      Notifications.addNotificationReceivedListener(this._handleNotification);
    this._notificationSubscriptionBackground =
      Notifications.addNotificationResponseReceivedListener(
        this._handleNotificationBackground
      );
  };

  getbanner = () => {
    let enBannersList = [];
    let arBannersList = [];
    axios
      .get(
        "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wfportal/api/cu/v.3/app",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Banners Reponse", response.data.slideshows);
        response.data.slideshows.map((bn) => {
          enBannersList.push(bn.image);
          arBannersList.push(bn.image_ar);
        });
        console.log("banners List", enBannersList, arBannersList);
        this.setState({ enBannersList, arBannersList });
      });
  };

  checkUserLocation = async () => {
    // let { audio_status } = await Permissions.askAsync(
    //   Permissions.AUDIO_RECORDING
    // );
    // if (audio_status !== "granted") {
    //   Toast.show({
    //     text:
    //       this.state.lan == "en"
    //         ? "Please grant audio permissions"
    //         : "Please grant audio permissions",
    //     position: "bottom",
    //   });
    //   await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    // }

    //  console.log("location function ");
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //  console.log("status ", status);
    if (status !== "granted") {
      Toast.show({
        text:
          this.state.lan == "en"
            ? "Please allow location permission"
            : "يرجى السماح لتحديد الموقع",
        position: "bottom",
      });
    } else {
      // console.log("else ");
      const mylocation = await Location.getCurrentPositionAsync({});
      // console.log("location ", mylocation);
      const geocode = await Location.reverseGeocodeAsync(mylocation.coords);
      // console.log("city ", geocode[0].city);

      this.setState({ location: geocode[0].city });
    }
  };
  _renderHeader = (data, expanded) => {
    let index = data.jobs.findIndex((job) => job.selected == true);

    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          backgroundColor: expanded ? "#d8d8d8" : "#F5F5F5",
          marginBottom: 4,
          alignSelf: "center",

          width: Dimensions.get("screen").width - 35,
          height: 70,
          borderWidth: 0,
        }}
      >
        <Left style={{ flexDirection: "row" }}>
          <Image
            source={{
              uri:
                data.seo_name !== null
                  ? data.seo_name
                  : "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/image-placeholder.png?alt=media&token=10ced05a-f905-4951-9298-ff47e771f070",
            }}
            style={{
              width: 45,
              height: 45,
              marginTop: 4,
            }}
            resizeMode="contain"
          />
          <View style={{ marginTop: 4 }}>
            <Text
              style={{
                fontSize: 13,

                textAlign: "left",
                marginLeft: 12,
                width: Dimensions.get("screen").width - 35,
                color: "#0865b0",
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
                  marginRight: 10,
                }}
              >
                {this.state.lan == "en" ? "Total Services" : "مجموع الخدمات"}
              </Text>
              <View
                style={{
                  backgroundColor: "#0865b0",
                  justifyContent: "center",
                  margin: 2,
                }}
              >
                <Text
                  style={{
                    padding: 2,
                    paddingLeft: 3,
                    paddingRight: 3,
                    color: "white",
                    fontSize: 7,
                    textAlign: "center",
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
                marginLeft: 12,
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
              left: Dimensions.get("screen").width / 2,
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
                color="#0865b0"
              />
            ) : (
              <Ionicons
                style={{ fontSize: 24 }}
                name={
                  this.state.lan == "en"
                    ? "chevron-forward-outline"
                    : "chevron-back-outline"
                }
                color="#0865b0"
              />
            )}
          </View>
        </Right>
      </View>
    );
  };
  minusMeters = (job) => {
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
  plusMeters = (job) => {
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
  // ------------------------increase counter --------------------
  plusFloors = (job) => {
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
  // ---------------------Decrease item-----------------------
  minusFloors = (job) => {
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
  cahngeToolTip = (tIndex) => {
    if (this.state.toolTipVisible == -1) {
      this.setState({ toolTipVisible: tIndex });
    } else {
      this.setState({ toolTipVisible: -1 });
    }
  };
  _renderContent = (data) => {
    return (
      <View
        style={{
          width: Dimensions.get("screen").width,
          alignSelf: "center",
          marginTop: -5,
        }}
      >
        {data.jobs &&
          data.jobs.map(
            function (job, index) {
              job.jobserviceName = data.name;
              job.jobserviceNameAr = data.name_ar;
              job.jobServiceIcon = data.seo_name;
              if (job.pricetype == 1) {
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
              if (job.pricetype == 7) {
                return (
                  <DecoCategory
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
              }
              if (job.pricetype == 8) {
                return (
                  <SecuritybaseJobs
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
              if (job.pricetype == 9) {
                return (
                  <Cleaning
                    lan={this.state.lan}
                    job={job}
                    index={index}
                    key={index}
                    selectJob={this.selectJob}
                  />
                );
              }
              // if (job.pricetype == 100) {
              //   return (
              //     <HomeCinema
              //       lan={this.state.lan}
              //       job={job}
              //       index={index}
              //       key={index}
              //       selectJob={this.selectJob}
              //     />
              //   );
              // }
            }.bind(this)
          )}
      </View>
    );
  };
  minusVarient = (varient, job) => {
    if (job.selected && job.selected == true) {
      let total = 0;
      varient.variants_attr.forEach((var_attr) => {
        var_attr.attr.forEach((attr) => {
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
      varient.variants_attr.forEach((var_attr) => {
        var_attr.attr.forEach((attr) => {
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
        varient.subvariants.forEach((subvariant) => {
          subvariant.subvariants_attr &&
            subvariant.subvariants_attr.forEach((sub_atr) => {
              sub_atr.attr.forEach((in_attr) => {
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
      varient.variants_attr.forEach((var_attr) => {
        var_attr.attr.forEach((inner_attr) => {
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
  plusQuantity = (job) => {
    //curr
    console.log("plusQuantity ", job);
    if (job.items) job.items++;
    else {
      if (job.id == 154) {
        job.items = 5;
      } else {
        job.items = 1;
      }
    }
    // if (job.id === 61) {
    //   if (job.items == 2) {
    //     job.t_price = parseFloat(job.saleprice) * job.items;
    //   } else if (job.items == 3) {
    //     job.t_price = parseFloat(job.saleprice3) * job.items;
    //   } else if (job.items == 4) {
    //     job.t_price = parseFloat(job.saleprice4) * job.items;
    //   } else if (job.items == 5) {
    //     job.t_price = parseFloat(job.saleprice5) * job.items;
    //   } else {
    //     job.t_price = parseFloat(job.price) * job.items;
    //   }
    // }
    if (
      job.id === 70 ||
      job.id === 61 ||
      job.id === 82 ||
      job.id === 46 ||
      job.id === 230 ||
      job.id === 60 ||
      job.id === 223 ||
      job.id === 232 ||
      job.id === 65 ||
      job.id === 71 ||
      job.id === 74 ||
      job.id === 288 ||
      job.id === 228 ||
      job.id === 77 ||
      job.id === 79 ||
      job.id === 82 ||
      job.id === 81 ||
      job.id === 46 ||
      job.id === 47
    ) {
      job.t_price =
        parseFloat(job.items > 1 ? job.saleprice : job.price) * job.items;
    } else {
      job.t_price =
        parseFloat(job.saleprice ? job.saleprice : job.price) * job.items;
    }

    job.selected = true;
    this.addRemoveIntoSelectedServices(job, true);
  };
  clearVariantsAndSubVariants = (job) => {
    if (job.variants) {
      job.variants.forEach((variant) => {
        if (variant.items > 0) {
          variant.items = 0;
        }
        variant.variants_attr.forEach((var_atr) => {
          var_atr.attr.forEach((atr) => {
            if (atr.selected && atr.selected == true) {
              atr.selected = false;
            }
          });
        });
        if (variant.subvariants) {
          variant.subvariants.forEach((sub_variant) => {
            sub_variant.subvariants_attr &&
              sub_variant.subvariants_attr.forEach((sub_var_atr) => {
                sub_var_atr.attr.forEach((atr) => {
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
  minusQuantity = (job) => {
    //curr
    if (job.items && job.items >= 1) {
      if (job.items <= 5 && job.id == 154) {
        job.items = 0;
      } else {
        job.items--;
      }
      if (
        job.id === 70 ||
        job.id === 61 ||
        job.id === 82 ||
        job.id === 46 ||
        job.id === 230 ||
        job.id === 60 ||
        job.id === 223 ||
        job.id === 232 ||
        job.id === 65 ||
        job.id === 71 ||
        job.id === 74 ||
        job.id === 288 ||
        job.id === 228 ||
        job.id === 77 ||
        job.id === 79 ||
        job.id === 82 ||
        job.id === 81 ||
        job.id === 46 ||
        job.id === 47
      ) {
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
  selectJob = (job) => {
    job.selected = !job.selected;
    job.items = 1;
    if (job.selected) job.t_price = job.saleprice ? job.saleprice : job.price;
    else job.t_price = 0;

    if (job.selected) this.addRemoveIntoSelectedServices(job, true);
    else this.addRemoveIntoSelectedServices(job, false);
  };
  addRemoveIntoSelectedServices = async (job, add) => {
    let catIndex = this.state.categories.findIndex(
      (cat) => cat.id == this.state.selectedCategoryId
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
        ? allServices.findIndex((service) => service.id === job.id)
        : -1;

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
      await AsyncStorage.setItem("jobs", JSON.stringify(allServices));
    }
  };
  openChat = () => {
    // if (this.state.user !== null) {
    //   // Linking.openURL("https://wa.me/+,0577311430");
    //   this.props.navigation.navigate("Chat", { user: this.state.user });
    // } else {
    //   Toast.show({
    //     text:
    //       this.state.lan == "en"
    //         ? "Please Login First to Start Chat"
    //         : "سلة الطلبات فارغة",
    //     position: "bottom",
    //   });
    //   this.props.navigation.navigate("Login", {
    //     goToHelp: true,
    //     user: this.state.user,
    //   });
    // }

    Linking.openURL("https://wa.me/+,0538154420"); //,0577311430 +,0 57 843 4985 +,0530576063
  };
  getOffers = () => {
    axios
      .get(
        "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/get_banners",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // console.log("get offers success");
        let responseJson = response.data;

        let ban = ([] = []);
        let urls = ([] = []);
        ban =
          this.state.lan === "en"
            ? responseJson.banners.enbanners
            : responseJson.banners.arbanners;
        ban.forEach((ban) => {
          let actualUrl =
            "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/" +
            ban.banner.url;
          urls.push(actualUrl);
        });
        console.log(" data source ", ban);
        if (this.state.lan == "en") {
          this.setState({ dataSource: AcOffersDataEng, offersUrls: urls });
        } else {
          this.setState({ dataSource: AcOffersData_ar, offersUrls: urls });
        }
      })
      .catch(async (error) => {
        console.log("error in get offers", error);
        await Analytics.logEvent("getOffersError", {
          getOffersError: error.toString(),
        });
      });
  };
  toggleSwitch = (value) => {
    this.setState({ isEnabled: !this.state.isEnabled });
  };
  categorySelection = async (category) => {
    this._accordion.setSelected(-1);
    this.setState({
      selectedCategoryId: category.id,
      products: category.products,
      toolTipVisible: false,
    });
  };

  getCategories = () => {
    axios
      .get(
        "http://ec2-13-234-48-248.ap-south-1.compute.amazonaws.com/wf/V1.2/all_categories_New",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        console.log("get categories success", response);
        let responseJson = {
          error: false,
          offers: [
            {
              offerid: 1,
              offername: "AC Checkup",
              offername_ar: "فحص المكيف",
              offerbanner: "uploads/banners/promotions/Ac-checkup.png",
              offerimage_ar:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/Ac-Checkup-Arabic-min.png?alt=media&token=930cd3c8-745e-4933-a4ee-85722227fd72",
              offerimage:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/Ac-Checkup-English-min.png?alt=media&token=fab2f92e-028c-4184-acb3-b7da3dc9ebd2",
              offerwebimage_ar:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/web_site_banners%2FPackages%2FAr%2FAC-Checkup-min.png?alt=media&token=0fb3b3e0-03c8-4bbd-9f96-aef83ca2f989",
              offerwebimage:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/web_site_banners%2FPackages%2FEng%2FAC-Checkup-min.png?alt=media&token=6ba6adee-9d6c-4332-bd8a-6008b41be2cf",
              offerdescription:
                "Book an AC Technician visit for an unlimited number of AC units and types and get as many consultation services as you want only in SAR 35",
              offerdescription_ar:
                "احجز زيارة فني التكييف لعدد غير محدود من المكيفات بكل أنواعها وأحصل على الإستشارات التي تبحث عنها فقط بـ 35 ريال. ",
              services: [
                {
                  serviceid: 29,
                  servicename: "AC Technician Services",
                  servicename_ar: "فني تكييف الهواء",
                  serviceseoname:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FAC-B.png?alt=media&token=7e7905c1-0e11-460d-9a7c-a74d1e3bb121",
                  products: [
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 67,
                          serviceid: 29,
                          name: "Repair Consultation of Split Unit",
                          name_ar: "إستشارة إصلاح مكيف اسبليت",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 73,
                          serviceid: 29,
                          name: "Repair Consultation of Cassette Unit",
                          name_ar: "إستشارة لإصلاح  مكيف الكاسيت (السقف)",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 62,
                          serviceid: 29,
                          name: "Repair Consultation of Window Unit",
                          name_ar: "إستشارة إصلاح مكيف ويندو (شباك)  ",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 80,
                          serviceid: 29,
                          name: "Repair Consultation of Desert Cooler",
                          name_ar: "إستشارة إصلاح مكيف صحراوي (مبرد)",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 78,
                          serviceid: 29,
                          name: "Repair Consultation of Central AC",
                          name_ar: "إستشارة إصلاح تكييف مركزي",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 76,
                          serviceid: 29,
                          name: "Repair Consultation of Tower Unit",
                          name_ar: "إستشارة إصلاح مكيف تاور (برج/نقال)",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                      ],
                    },
                  ],
                  is_same_price: true,
                },
              ],
            },
            {
              offerid: 2,
              offername: "Furnish My Room",
              offername_ar: "تجهيز غرفتي",
              offerbanner: "uploads/banners/promotions/Furnish-my-Room.png",
              offerimage_ar:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/Furnish-my-Room-Arabic-min.png?alt=media&token=398f7686-0112-4ff7-b6a8-7a1fa923d370",
              offerimage:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/Furnish-my-Room-English-min.png?alt=media&token=5a2f7d0c-c1ef-4070-b798-230745fe2ae1",
              offerwebimage_ar:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/web_site_banners%2FPackages%2FAr%2FFurnish-My-Room-min.png?alt=media&token=206394c3-1fe7-4213-99ed-c575cd66bba9",
              offerwebimage:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/web_site_banners%2FPackages%2FEng%2FFurnish-My-Room-min.png?alt=media&token=1c7ea7ca-1fbb-4e90-8caf-332d3793cbcc",
              offerdescription:
                "Furnish your room by getting the carpentry and AC technician services from experts. Carpentry services range from furniture assembly to curtain installation. For AC technician, you can choose unlimited consultation services only in SAR 35",
              offerdescription_ar:
                "قم بتأثيث غرفتك عبر خبراء النجارة والتكييف، تتوزع خدمات النجارة بين تركيب الأثاث إلى الستائر بينما التكييف بإمكانك طلب خدمات استشارية غير محدودة بـ 35 ريال فقط  ",
              services: [
                {
                  serviceid: 4,
                  servicename: "Carpenter Services",
                  servicename_ar: "خدمات النجارة",
                  serviceseoname:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCarpentry-B.png?alt=media&token=5f6904c9-f2fe-4da2-9ea5-6edc1eaaea40",
                  products: [
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 251,
                          serviceid: 4,
                          name: "Balance bed",
                          name_ar: "موازنة السرير ",
                          choose_type: 1,
                          pricetype: 1,
                          price: 69,
                        },
                        {
                          id: 250,
                          serviceid: 4,
                          name: "Remove or install bed",
                          name_ar: "إزالة أو تثبيت السرير",
                          choose_type: 1,
                          pricetype: 1,
                          price: 110,
                        },
                        {
                          id: 252,
                          serviceid: 4,
                          name: "Bed Repair",
                          name_ar: "إصلاح السرير",
                          choose_type: 1,
                          pricetype: 2,
                          price: 35,
                        },
                      ],
                    },
                    {
                      title: "Optional Services",
                      title_ar: "الخدمات الإختيارية",
                      choose_type: 0,
                      jobs: [
                        {
                          id: 260,
                          serviceid: 4,
                          name: "Rolls curtain installation",
                          name_ar: "تركيب ستائر (رولز)",
                          choose_type: 0,
                          pricetype: 1,
                          price: 69,
                        },
                        {
                          id: 261,
                          serviceid: 4,
                          name: "Single Layer curtain installation\r\nLess than 2.5m",
                          name_ar:
                            "تركيب ستارة (طبقات) | طبقة واحدة | اصغر من 2.5 م",
                          choose_type: 0,
                          pricetype: 1,
                          price: 69,
                        },
                        {
                          id: 262,
                          serviceid: 4,
                          name: "Single Layer curtain installation\r\nEqual or more than 2.5m",
                          name_ar:
                            "تركيب ستارة (طبقات) | طبقة واحدة | 2.5 م او اكثر  ",
                          choose_type: 0,
                          pricetype: 1,
                          price: 89,
                        },
                        {
                          id: 263,
                          serviceid: 4,
                          name: "Double Layer curtain installation\r\nLess than 2.5m",
                          name_ar:
                            "تركيب ستارة (طبقات) | طبقة مزدوجة | اصغر من 2.5 م",
                          choose_type: 0,
                          pricetype: 1,
                          price: 119,
                        },
                        {
                          id: 264,
                          serviceid: 4,
                          name: "Double Layer curtain installation\r\nEqual or more than 2.5m",
                          name_ar:
                            "تركيب ستارة (طبقات) | طبقة مزدوجة | 2.5 م او اكثر  ",
                          choose_type: 0,
                          pricetype: 1,
                          price: 129,
                        },
                      ],
                    },
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 275,
                          name: "Install or remove shelves",
                          serviceid: 4,
                          name_ar: "تركيب او إزالة الرفوف",
                          price: 49,
                          choose_type: 1,
                          pricetype: 1,
                        },
                        {
                          id: 253,
                          name: "Remove or install tables ",
                          serviceid: 4,
                          name_ar: "إزالة أو تثبيت الطاولات",
                          price: 79,
                          choose_type: 1,
                          pricetype: 1,
                        },
                        {
                          id: 259,
                          name: "Cabinet Repair",
                          serviceid: 4,
                          name_ar: "إصلاح الخزانة",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                      ],
                    },
                  ],
                },
                {
                  serviceid: 29,
                  servicename: "AC Technician Services",
                  servicename_ar: "فني تكييف الهواء",
                  serviceseoname:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FAC-B.png?alt=media&token=7e7905c1-0e11-460d-9a7c-a74d1e3bb121",
                  products: [
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 67,
                          serviceid: 29,
                          name: "Repair Consultation of Split Unit",
                          name_ar: "إستشارة إصلاح مكيف اسبليت",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 73,
                          serviceid: 29,
                          name: "Repair Consultation of Cassette Unit",
                          name_ar: "إستشارة لإصلاح  مكيف الكاسيت (السقف)",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 62,
                          serviceid: 29,
                          name: "Repair Consultation of Window Unit",
                          name_ar: "إستشارة إصلاح مكيف ويندو (شباك)  ",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 76,
                          serviceid: 29,
                          name: "Repair Consultation of Tower Unit",
                          name_ar: "إستشارة إصلاح مكيف تاور (برج/نقال)",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 80,
                          serviceid: 29,
                          name: "Repair Consultation of Desert Cooler",
                          name_ar: "إستشارة إصلاح مكيف صحراوي (مبرد)",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 78,
                          serviceid: 29,
                          name: "Repair Consultation of Central AC",
                          name_ar: "إستشارة إصلاح تكييف مركزي",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                      ],
                    },
                  ],
                  is_same_price: true,
                },
              ],
            },
            {
              offerid: 3,
              offername: "Electrical Doctor",
              offername_ar: "الدكتور الكهربائي",
              offerbanner: "uploads/banners/promotions/Electrical-Doctor.png",
              offerimage_ar:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/Electrical-Doctor-Arabic-min.png?alt=media&token=ce578c9e-9c25-4789-8ab2-7101a6164325",
              offerimage:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/Electrical-Doctor-English-min.png?alt=media&token=b93712bc-77d3-4c0e-b85f-c9c922a55f34",
              offerwebimage_ar:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/web_site_banners%2FPackages%2FAr%2FElectrical-Doctor-min.png?alt=media&token=b7b14265-bb71-4038-9220-5b2ffa25890f",
              offerwebimage:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/web_site_banners%2FPackages%2FEng%2FElectrical-Doctor-min.png?alt=media&token=b3e7cb5c-4dab-4d57-82b5-53a3541696fd",
              offerdescription:
                "Book an electrical doctor and get all your electrician work done. Along with this, get the free consultation services on wire repair and main distribution panel from our electrical expert",
              offerdescription_ar:
                "احجز طبيب الكهرباء لإنجاز جميع الأعمال الكهربائية، واحصل بنفس الوقت على خدمات استشارات مجانية في التسليك ولوحات التوزيع الرئيسية من خبراء الكهرباء لدينا. ",
              services: [
                {
                  serviceid: 1,
                  servicename: "Electrician Services",
                  servicename_ar: "الخدمات الكهربائية",
                  serviceseoname:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FElectrician-B.png?alt=media&token=9fe3a565-31bb-48c7-b940-d8e5a8a3b56d",
                  products: [
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 10,
                          serviceid: 1,
                          name: "Repair/replace switches",
                          name_ar: "إصلاح/استبدال من المفاتيح",
                          choose_type: 1,
                          pricetype: 1,
                          price: 17,
                        },
                      ],
                    },
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 11,
                          serviceid: 1,
                          name: "220 to 110 conversion",
                          name_ar: "محول كهربا ء من 220 الى 110",
                          choose_type: 1,
                          pricetype: 2,
                          price: 35,
                        },
                        {
                          id: 12,
                          serviceid: 1,
                          name: "110  to 220 conversion",
                          name_ar: "محول كهربا ء من 110 الى 220",
                          choose_type: 1,
                          pricetype: 2,
                          price: 35,
                        },
                      ],
                    },
                    {
                      title: "Free Services",
                      title_ar: "الخدمات المجانية",
                      choose_type: 3,
                      jobs: [
                        {
                          id: 235,
                          serviceid: 1,
                          name: "Wiring consultation",
                          name_ar: "إستشارة تسليك كهربائي",
                          choose_type: 3,
                          price: 35,
                          pricetype: 2,
                        },
                        {
                          id: 21,
                          serviceid: 1,
                          name: "Maintenance of distribution panel",
                          name_ar: "صيانة  لوحات التحكم والتوزيع الكهربائي",
                          choose_type: 3,
                          price: 35,
                          pricetype: 2,
                        },
                      ],
                    },
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 6,
                          name: "Changing normal lights",
                          serviceid: 1,
                          name_ar: "تغيير الاضواء العادية",
                          price: 10,
                          choose_type: 1,
                          pricetype: 1,
                        },
                        {
                          id: 8,
                          name: "Changing flourescent lights",
                          serviceid: 1,
                          name_ar: "تغيير أضواء الفلورسنت",
                          price: 10,
                          choose_type: 1,
                          pricetype: 1,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              offerid: 4,
              offername: "Restroom Facelift",
              offername_ar: "توضيب دورة المياة",
              offerbanner:
                "uploads/banners/promotions/Restroom-Facelift-min.png",
              offerimage_ar:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FRestroom-Facelift-Arabic-min.png?alt=media&token=7510436f-8609-44c7-a9e1-83a5e7f0fa5e",
              offerimage:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/Restroom-Facelift-English-min.png?alt=media&token=706aa54f-5c35-4635-a06a-814fface3798",
              offerwebimage_ar:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/web_site_banners%2FPackages%2FAr%2FRestroom-Facelift-min.png?alt=media&token=4e1b3cea-79e1-49a0-a2b1-eb5fd598cbdf",
              offerwebimage:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/web_site_banners%2FPackages%2FEng%2FRestroom-Facelift-min.png?alt=media&token=8a446ad1-431c-4431-8c5d-3231f6da4db7",
              offerdescription:
                "For high end and modern looking restroom, book our expert electrician and plumber and get a range of services. Also, get free consultation services on drain blockage, sink repair, and fan repair from our experts",
              offerdescription_ar:
                "للحصول على دورة المياة ذو مظهر أنيف وعصري، احجز خبير كهربائي وسباكة  واحصل على مجموعة من الخدمات. أيضًا، بإمكانك الحصول على خدمات استشارية مجانية حول انسداد مصارف المياة وإصلاح الأحواض والمراوح. ",
              services: [
                {
                  serviceid: 1,
                  servicename: "Electrician Services",
                  servicename_ar: "الخدمات الكهربائية",
                  serviceseoname:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FElectrician-B.png?alt=media&token=9fe3a565-31bb-48c7-b940-d8e5a8a3b56d",
                  products: [
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 10,
                          serviceid: 1,
                          name: "Repair/replace switches",
                          name_ar: "إصلاح/استبدال من المفاتيح",
                          choose_type: 1,
                          pricetype: 1,
                          price: 17,
                        },
                      ],
                    },
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 6,
                          name: "Changing normal lights",
                          serviceid: 1,
                          name_ar: "تغيير الاضواء العادية",
                          price: 10,
                          choose_type: 1,
                          pricetype: 1,
                        },
                        {
                          id: 8,
                          name: "Changing flourescent lights",
                          serviceid: 1,
                          name_ar: "تغيير أضواء الفلورسنت",
                          price: 10,
                          choose_type: 1,
                          pricetype: 1,
                        },
                      ],
                    },
                  ],
                },
                {
                  serviceid: 3,
                  servicename: "Plumbing Services",
                  servicename_ar: "خدمات السباكة",
                  serviceseoname:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FPLumbing-min.png?alt=media&token=cd789335-364d-4c1d-9330-f341aefe1bd3",
                  products: [
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 28,
                          serviceid: 3,
                          name: "Repair / Replacement of\r\njet spray",
                          name_ar: "إصلاح / استبدال مرحاض الحمام",
                          choose_type: 1,
                          pricetype: 2,
                          price: 35,
                        },
                        {
                          id: 29,
                          serviceid: 3,
                          name: "Repair / Replacement of\r\nshower head",
                          name_ar: "إصلاح رأس الدش",
                          choose_type: 1,
                          pricetype: 2,
                          price: 35,
                        },
                      ],
                    },
                    {
                      title: "Free Services",
                      title_ar: "الخدمات المجانية",
                      choose_type: 3,
                      jobs: [
                        {
                          id: 36,
                          serviceid: 3,
                          name: "Drain Blockages",
                          name_ar: "إنسداد المخارج ",
                          choose_type: 3,
                          price: 35,
                          pricetype: 1,
                        },
                        {
                          id: 18,
                          serviceid: 3,
                          name: "Installation of bathroom fans",
                          name_ar: "تركيب مراوح الحمام",
                          choose_type: 3,
                          price: 35,
                          pricetype: 2,
                        },
                      ],
                    },
                    {
                      jobs: [
                        {
                          id: 24,
                          name: "Repair of mixers",
                          serviceid: 3,
                          name_ar: "إصلاح الخلاطات",
                          price: 35,
                          choose_type: 0,
                          pricetype: 2,
                        },
                        {
                          id: 32,
                          name: "Repair of faucets",
                          serviceid: 3,
                          name_ar: "إصلاح / استبدال الصنابير",
                          price: 35,
                          choose_type: 0,
                          pricetype: 2,
                        },
                        {
                          id: 27,
                          name: "Repair sinks with drawers",
                          serviceid: 3,
                          name_ar: "تصليح المغاسل مع الأدراج",
                          price: 35,
                          choose_type: 0,
                          pricetype: 2,
                        },
                        {
                          id: 22,
                          name: "Repair of sinks",
                          serviceid: 3,
                          name_ar: "تصليح المغاسل",
                          price: 35,
                          choose_type: 0,
                          pricetype: 2,
                        },
                      ],
                      title: "Optional Services",
                      title_ar: "الخدمات الإختيارية",
                      choose_type: 0,
                    },
                  ],
                },
              ],
            },
            {
              offerid: 6,
              offername: "Lobby Setup",
              offername_ar: "تجهيز غرفة الجلوس",
              offerbanner: "uploads/banners/promotions/Lobby-Setup.png",
              offerimage_ar:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/Lobby-Setup-Arabic-min.png?alt=media&token=5f94826d-a0d0-4a85-ac00-465a0c61a7d4",
              offerimage:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/Lobby-Setup-English-min.png?alt=media&token=320c4211-d943-4bbd-bb47-f3cdc4ef9aec",
              offerwebimage_ar:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/web_site_banners%2FPackages%2FAr%2FLobby-Setup-min.png?alt=media&token=f9851bdc-8778-4c75-bb39-faa5e2734607",
              offerwebimage:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/web_site_banners%2FPackages%2FEng%2FLobby-Setup-min.png?alt=media&token=7f3d4ad2-ba0b-4a3f-97bb-e1573e5e3f74",
              offerdescription:
                "Set up an elegant and modern lobby by getting the carpentry and AC technician services. Carpentry services range from furniture assembly to curtain installation. For AC technician, you can choose unlimited consultation services only in SAR 2",
              offerdescription_ar:
                " جهز غرفة الإستراحة بشكل أنيق وعصري من خلال خدمات النجارة واالتكييف، تتوزع خدمات النجارة بين تركيف الأثاث إلى الستائر بينما التكييف بإمكانك طلب خدمات استشارية غير محدودة بـ 35 ريال فقط ",
              services: [
                {
                  serviceid: 4,
                  servicename: "Carpenter Services",
                  servicename_ar: "خدمات النجارة",
                  serviceseoname:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCarpentry-B.png?alt=media&token=5f6904c9-f2fe-4da2-9ea5-6edc1eaaea40",
                  products: [
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 251,
                          serviceid: 4,
                          name: "Balance bed",
                          name_ar: "موازنة السرير ",
                          choose_type: 1,
                          pricetype: 1,
                          price: 69,
                        },
                        {
                          id: 250,
                          serviceid: 4,
                          name: "Remove or install bed",
                          name_ar: "إزالة أو تثبيت السرير",
                          choose_type: 1,
                          pricetype: 1,
                          price: 110,
                        },
                        {
                          id: 252,
                          serviceid: 4,
                          name: "Bed Repair",
                          name_ar: "إصلاح السرير",
                          choose_type: 1,
                          pricetype: 2,
                          price: 35,
                        },
                      ],
                    },
                    {
                      title: "Optional Services",
                      title_ar: "الخدمات الإختيارية",
                      choose_type: 0,
                      jobs: [
                        {
                          id: 260,
                          serviceid: 4,
                          name: "Rolls curtain installation",
                          name_ar: "تركيب ستائر (رولز)",
                          choose_type: 0,
                          pricetype: 1,
                          price: 69,
                        },
                        {
                          id: 261,
                          serviceid: 4,
                          name: "Single Layer curtain installation\r\nLess than 2.5m",
                          name_ar:
                            "تركيب ستارة (طبقات) | طبقة واحدة | اصغر من 2.5 م",
                          choose_type: 0,
                          pricetype: 1,
                          price: 69,
                        },
                        {
                          id: 262,
                          serviceid: 4,
                          name: "Single Layer curtain installation\r\nEqual or more than 2.5m",
                          name_ar:
                            "تركيب ستارة (طبقات) | طبقة واحدة | 2.5 م او اكثر  ",
                          choose_type: 0,
                          pricetype: 1,
                          price: 89,
                        },
                        {
                          id: 263,
                          serviceid: 4,
                          name: "Double Layer curtain installation\r\nLess than 2.5m",
                          name_ar:
                            "تركيب ستارة (طبقات) | طبقة مزدوجة | اصغر من 2.5 م",
                          choose_type: 0,
                          pricetype: 1,
                          price: 119,
                        },
                        {
                          id: 264,
                          serviceid: 4,
                          name: "Double Layer curtain installation\r\nEqual or more than 2.5m",
                          name_ar:
                            "تركيب ستارة (طبقات) | طبقة مزدوجة | 2.5 م او اكثر  ",
                          choose_type: 0,
                          pricetype: 1,
                          price: 129,
                        },
                      ],
                    },
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 248,
                          serviceid: 4,
                          name: "IKEA or similar furniture assembly & installation",
                          name_ar: "تجميع وتركيب على طريقة ايكيا او غيرها",
                          choose_type: 1,
                          pricetype: 2,
                          price: 35,
                        },
                        {
                          id: 247,
                          serviceid: 4,
                          name: "General Furniture assembly",
                          name_ar: "تجميع الأثاث (عام)",
                          choose_type: 1,
                          pricetype: 2,
                          price: 35,
                        },
                      ],
                    },
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 275,
                          name: "Install or remove shelves",
                          serviceid: 4,
                          name_ar: "تركيب او إزالة الرفوف",
                          price: 49,
                          choose_type: 1,
                          pricetype: 1,
                        },
                        {
                          id: 253,
                          name: "Remove or install tables ",
                          serviceid: 4,
                          name_ar: "إزالة أو تثبيت الطاولات",
                          price: 79,
                          choose_type: 1,
                          pricetype: 1,
                        },
                        {
                          id: 259,
                          name: "Cabinet Repair",
                          serviceid: 4,
                          name_ar: "إصلاح الخزانة",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                      ],
                    },
                  ],
                },
                {
                  serviceid: 29,
                  servicename: "AC Technician Services",
                  servicename_ar: "فني تكييف الهواء",
                  serviceseoname:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FAC-B.png?alt=media&token=7e7905c1-0e11-460d-9a7c-a74d1e3bb121",
                  products: [
                    {
                      title: "Choose at least one of these",
                      title_ar: "اختر واحد على الأقل من",
                      choose_type: 1,
                      jobs: [
                        {
                          id: 67,
                          serviceid: 29,
                          name: "Repair Consultation of Split Unit",
                          name_ar: "إستشارة إصلاح مكيف اسبليت",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 73,
                          serviceid: 29,
                          name: "Repair Consultation of Cassette Unit",
                          name_ar: "إستشارة لإصلاح  مكيف الكاسيت (السقف)",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 62,
                          serviceid: 29,
                          name: "Repair Consultation of Window Unit",
                          name_ar: "إستشارة إصلاح مكيف ويندو (شباك)  ",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 76,
                          serviceid: 29,
                          name: "Repair Consultation of Tower Unit",
                          name_ar: "إستشارة إصلاح مكيف تاور (برج/نقال)",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 78,
                          serviceid: 29,
                          name: "Repair Consultation of Central AC",
                          name_ar: "إستشارة إصلاح تكييف مركزي",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                        {
                          id: 80,
                          serviceid: 29,
                          name: "Repair Consultation of Desert Cooler",
                          name_ar: "إستشارة إصلاح مكيف صحراوي (مبرد)",
                          price: 35,
                          choose_type: 1,
                          pricetype: 2,
                        },
                      ],
                    },
                  ],
                  is_same_price: true,
                },
              ],
            },
          ],
          services: [
            //categories
            //curr
            {
              id: 29,
              name: "AC Technician",
              name_ar: "خدمات التكييف",
              pricelimit: 49,
              seo_name:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FAC-B.png?alt=media&token=7e7905c1-0e11-460d-9a7c-a74d1e3bb121",
              banner: null,
              white_icon:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FAC-W.png?alt=media&token=d60027ef-4d44-4d29-b1b2-de8071b325f8",
              products: [
                //services
                {
                  id: 26,
                  name: "Window Unit",
                  name_ar: "مكيف ويندو (شباك)  ",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FWindow-min.png?alt=media&token=6338733b-3d6f-43dc-a744-cb60b1d74448",
                  is_promoted: true,
                  jobs: [
                    // {
                    //   id: 69,
                    //   serviceid: 29,
                    //   pricelimit: 49,
                    //   name: "Partial or Gas topup",
                    //   name_ar: "تعبئة الغاز جزئي او كامل",
                    //   price: 100,
                    //   pricetype: 1,
                    //   cartnotes:
                    //     "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                    //   cartnotes_ar:
                    //     "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                    //   carttype: 1,
                    // },
                    {
                      id: 231,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Freon Refill (Partial)",
                      name_ar: "تعبئة فريون (جزئي)",
                      price: 99,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 231,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Freon Refill (Full)",
                      name_ar: " تعبئة فريون (كامل)",
                      price: 200,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    // {
                    //   id: 230,
                    //   serviceid: 29,
                    //   pricelimit: 49,
                    //   name: "Freon Refill + Cleaning",
                    //   name_ar: "تعبئة فريون + تنظيف",
                    //   price: 120,
                    //   pricetype: 1,
                    //   is_promoted: true,
                    //   saleprice: 84,
                    //   t_price: 0,
                    //   i_notes:
                    //     "Cleaning & Freon refill on 2 or more units in SAR 84 each",
                    //   i_notes_ar:
                    //     "التنظيف وإعادة تعبئة الفريون على وحدتين أو أكثر ب 84 ريال  لكل وحدة",
                    //   cartnotes:
                    //     "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                    //   cartnotes_ar:
                    //     "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                    //   carttype: 1,
                    // },
                    // {
                    //   id: 61,
                    //   serviceid: 29,
                    //   pricelimit: 49,
                    //   name: "Cleaning",
                    //   name_ar: "تنظيف",
                    //   price: 65,
                    //   pricetype: 1,
                    //   is_promoted: true,
                    //   saleprice: 89,
                    //   saleprice3: 79,
                    //   saleprice4: 69,
                    //   saleprice5: 55,
                    //   t_price: 0,
                    //   i_notes: "Get 2 or more units cleaned in SAR 55 each",
                    //   i_notes_ar: "تنظيف وحدتين أو أكثر ب 55 ريال لكل وحدة",
                    //   cartnotes:
                    //     "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                    //   cartnotes_ar:
                    //     "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                    //   carttype: 1,
                    // },
                    //curr
                    // no blue color
                    // Book Offer
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: " Freon Refill + Cleaning For 1 AC unit",
                      name_ar: "إعادة تعبئة فريون + تنظيف لوحدة تكييف واحدة",
                      price: 180,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: " Freon Refill + Cleaning For 2 AC unit",
                      name_ar: "إعادة تعبئة فريون + تنظيف لوحدتي تكييف",
                      price: 170,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: " Freon Refill + Cleaning For 3 AC unit",
                      name_ar: "إعادة تعبئة فريون + تنظيف 3 وحدات تكييف",
                      price: 160,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: " Freon Refill + Cleaning For 4 AC unit",
                      name_ar: "إعادة تعبئة فريون + تنظيف 4 وحدات تكييف",
                      price: 150,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 154,
                      serviceid: 29,
                      pricelimit: 49,
                      name: " Freon Refill + Cleaning For 5 or 5+ AC units",
                      name_ar: "إعادة تعبئة فريون + تنظيف 5 أو 5+ وحدات تكييف",
                      price: 140,
                      pricetype: 1,
                      is_promoted: true,
                      saleprice: 140,
                      t_price: 0,
                      carttype: 1,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "1 Window AC Cleaning",
                      name_ar: " تنظيف مكيف 1 شباك",
                      price: 99,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "2 Window AC Cleaning",
                      name_ar: " تنظيف مكيف 2 شباك",
                      price: 89,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: " 3 Window AC Cleaning",
                      name_ar: "تنظيف مكيف 3 شباك",
                      price: 79,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "4 Window AC Cleaning",
                      name_ar: "تنظيف مكيف42 شباك",
                      price: 69,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 154,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "5 or 5+ Window AC Cleaning",
                      name_ar: " تنظيف 5 أو 5+ مكيفات شباك",
                      price: 55,
                      pricetype: 1,
                      is_promoted: true,
                      saleprice: 55,
                      t_price: 0,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 60,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Installation",
                      name_ar: "تركيب",
                      price: 35,
                      pricetype: 2,
                      is_promoted: true,
                      // saleprice: 75,
                      t_price: 0,
                      i_notes: "Get 2 or more units installed in SAR 75 each",
                      i_notes_ar: "تركيب وحدتين أو اكثر بـ 75 ريال  لكل وحدة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      // Change Can Be Here Of Schedule Visit (Window Unit)
                      // pricetype
                      id: 62,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Repair Consultation",
                      name_ar: "إستشارة إصلاح",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 63,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Removal",
                      name_ar: "إزالة",
                      price: 79,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 64,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Relocation",
                      name_ar: "نقل",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 27,
                  name: "Split Unit",
                  name_ar: "مكيف اسبليت",
                  is_promoted: true,
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FSplit-min.png?alt=media&token=1a0943d3-ae9a-4422-b82c-d3d1862910de",
                  jobs: [
                    {
                      id: 224,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Freon Refill (Partial)",
                      name_ar: " تعبئة فريون (جزئي)",
                      price: 99,
                      pricetype: 1,

                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },

                    {
                      id: 224,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Freon Refill (Full)",
                      name_ar: " تعبئة فريون (كامل)",
                      price: 200,
                      pricetype: 1,

                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    // {
                    //   id: 223,
                    //   serviceid: 29,
                    //   pricelimit: 49,
                    //   name: "Indoor Cleaning + Freon Refill (Partial)",
                    //   name_ar: "التنظيف الداخلي + إعادة تعبئة الفريون (جزئي)",
                    //   price: 150,
                    //   pricetype: 1,
                    //   is_promoted: true,
                    //   t_price: 0,
                    //   saleprice: 105,
                    //   i_notes:
                    //     "Cleaning & Freon refill on 2 or more units in SAR 105 each",
                    //   i_notes_ar:
                    //     "التنظيف وإعادة تعبئة الفريون على وحدتين أو أكثر ب 105 ريال  لكل وحدة",
                    //   cartnotes:
                    //     "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                    //   cartnotes_ar:
                    //     "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                    //   carttype: 1,
                    // },
                    // {
                    //   id: 70,
                    //   serviceid: 29,
                    //   pricelimit: 49,
                    //   name: "Cleaning (Indoor)",
                    //   name_ar: "التنظيف (داخلي)",
                    //   price: 89,
                    //   pricetype: 1,
                    //   pricetype: 1,
                    //   is_promoted: true,
                    //   t_price: 0,
                    //   saleprice: 80,
                    //   i_notes: "Get 2 or more units cleaned in SAR 80 each",
                    //   i_notes_ar: "تنظيف وحدتين أو أكثر ب 80 ريال لكل وحدة",
                    //   cartnotes:
                    //     "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                    //   cartnotes_ar:
                    //     "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                    //   carttype: 1,
                    // },

                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: " Freon Refill + Cleaning For 1 AC unit",
                      name_ar: "إعادة تعبئة فريون + تنظيف لوحدة تكييف واحدة",
                      price: 180,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: " Freon Refill + Cleaning For 2 AC unit",
                      name_ar: "إعادة تعبئة فريون + تنظيف لوحدتي تكييف",
                      price: 170,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: " Freon Refill + Cleaning For 3 AC unit",
                      name_ar: "إعادة تعبئة فريون + تنظيف 3 وحدات تكييف",
                      price: 160,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: " Freon Refill + Cleaning For 4 AC unit",
                      name_ar: "إعادة تعبئة فريون + تنظيف 4 وحدات تكييف",
                      price: 150,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 154,
                      serviceid: 29,
                      pricelimit: 49,
                      name: " Freon Refill + Cleaning For 5 or 5+ AC units",
                      name_ar: "إعادة تعبئة فريون + تنظيف 5 أو 5+ وحدات تكييف",
                      price: 140,
                      pricetype: 1,
                      is_promoted: true,
                      saleprice: 140,
                      t_price: 0,
                      carttype: 1,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "1 Split AC Cleaning",
                      name_ar: "  تنظيف 1 مكيفات سبلت",
                      price: 110,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "2 Split AC Cleaning",
                      name_ar: "  تنظيف2 مكيفات سبلت",
                      price: 95,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: " 3 Split AC Cleaning",
                      name_ar: " تنظيف 3 مكيفات سبلت",
                      price: 90,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 153,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "4 Split AC Cleaning",
                      name_ar: " تنظيف 4 مكيفات سبلت",
                      price: 85,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                    },
                    {
                      id: 154,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "5 or 5+ Split AC Cleaning",
                      name_ar: "   تنظيف 5 أو 5+ مكيفات سبلت",
                      price: 80,
                      pricetype: 1,
                      is_promoted: true,
                      saleprice: 55,
                      t_price: 0,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 65,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Installation",
                      name_ar: "تركيب",
                      price: 35,
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                      // saleprice: 150,
                      i_notes: "Get 2 or more units installed in SAR 150 each",
                      i_notes_ar: "تركيب وحدتين أو اكثر بـ 150 ريال  لكل وحدة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 67,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Repair Consultation",
                      name_ar: "إستشارة إصلاح",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 68,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Removal of a split unit",
                      name_ar: "إزالة",
                      price: 109,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    // {
                    //   id: 69,
                    //   serviceid: 29,
                    //   pricelimit: 49,
                    //   name: "Removal and installation",
                    //   name_ar: "إزالة وتركيب ",
                    //   price: 300,
                    //   pricetype: 1,
                    //   cartnotes:
                    //     "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                    //   cartnotes_ar:
                    //     "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                    //   carttype: 1,
                    // },
                    {
                      id: 69,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Relocation",
                      name_ar: "نقل",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    // {
                    //   id: 69,
                    //   serviceid: 29,
                    //   pricelimit: 49,
                    //   name: "Partial or Gas topup",
                    //   name_ar: "تعبئة الغاز جزئي او كامل",
                    //   price: 100,
                    //   pricetype: 1,
                    //   cartnotes:
                    //     "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                    //   cartnotes_ar:
                    //     "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                    //   carttype: 1,
                    // },
                  ],
                },
                {
                  id: 28,
                  name: "Cassette Unit",
                  name_ar: "مكيف الكاسيت (السقف)",
                  is_promoted: true,
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCassette-Unit-min.png?alt=media&token=72a6486b-b24e-4407-aba8-3355225c77fa",
                  jobs: [
                    {
                      id: 233,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Freon Refill (Full)",
                      name_ar: "(كامل) تعبئة فريون ",
                      price: 180,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 232,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Freon Refill + Cleaning",
                      name_ar: "تعبئة فريون + تنظيف",
                      price: 150,
                      pricetype: 1,
                      is_promoted: true,
                      t_price: 0,
                      saleprice: 105,
                      i_notes:
                        "Cleaning & Freon refill on 2 or more units in SAR 105 each",
                      i_notes_ar:
                        "تعبئة فريون وتنظيف  2+ وحدة ب 105 ريال لكل وحدة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 71,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Installation",
                      name_ar: "تركيبف",
                      price: 35, //250
                      pricetype: 2,
                      is_promoted: true,
                      t_price: 0,
                      saleprice: 35,
                      i_notes: "2 or more = SAR 35 / Unit",
                      i_notes_ar:
                        "(لعدد وحدتين او أكثر، السعر 35 ريال للوحدة (مكيف",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 72,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Cleaning",
                      name_ar: "تنظيف",
                      price: 35, //140
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 73,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Repair Consultation",
                      name_ar: "إستشارة لإصلاح ",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 73,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Relocation",
                      name_ar: "نقل",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 29,
                  name: "Tower Unit",
                  name_ar: "مكيف تاور (برج/نقال)",
                  is_promoted: true,
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FTower-Unit-min.png?alt=media&token=57032c5d-3e16-4476-ac59-ddb5ba4a7973",
                  jobs: [
                    {
                      id: 229,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Freon Refill (Full)",
                      name_ar: "تعبئة فريون (جزئي)",
                      price: 200, //300
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 228,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Freon Refill + Cleaning",
                      name_ar: "تعبئة فريون + تنظيف",
                      price: 240,
                      is_promoted: true,
                      t_price: 0,
                      saleprice: 168,
                      pricetype: 1,
                      i_notes:
                        "Cleaning & Freon refill on 2 or more units in SAR 168 each",
                      i_notes_ar:
                        "لتنظيف وإعادة تعبئة الفريون على وحدتين أو أكثر ب 168 ريال لكل وحدة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 74,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Installation",
                      name_ar: "تركيب",
                      is_promoted: true,
                      t_price: 0,
                      // saleprice: 179,
                      i_notes: "Get 2 or more units installed in SAR 179 each",
                      i_notes_ar: "تركيب وحدتين أو اكثر بـ 179 ريال  لكل وحدة",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 75,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Cleaning",
                      is_promoted: true,
                      t_price: 0,
                      saleprice: 78,
                      i_notes: "Get 2 or more units cleaned in SAR 78 each",
                      i_notes_ar: "تنظيف وحدتين أو أكثر ب 78 ريال لكل وحدة",
                      name_ar: "تنظيف",
                      price: 99,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 76,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Repair Consultation",
                      name_ar: "إستشارة إصلاح",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    // {
                    //   id: 69,
                    //   serviceid: 29,
                    //   pricelimit: 49,
                    //   name: "Partial or Gas topup",
                    //   name_ar: "تعبئة الغاز جزئي او كامل",
                    //   price: 100,
                    //   pricetype: 1,
                    //   cartnotes:
                    //     "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                    //   cartnotes_ar:
                    //     "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                    //   carttype: 1,
                    // },

                    {
                      id: 69,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Relocation",
                      name_ar: "نقل الى مكان أخر / داخل المنزل",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },

                    // {
                    //   id: 69,
                    //   serviceid: 29,
                    //   pricelimit: 49,
                    //   name: "Relocation to another place",
                    //   name_ar: "نقل إلى مكان آخر",
                    //   price: 329,
                    //   pricetype: 1,
                    //   cartnotes:
                    //     "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                    //   cartnotes_ar:
                    //     "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                    //   carttype: 1,
                    // },
                  ],
                },
                {
                  id: 35,
                  name: "Central AC",
                  name_ar: "تكييف مركزي",
                  is_promoted: true,
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCentral-Sc-min.png?alt=media&token=d0ee2382-65ef-4d8c-b295-53490b1c2a5e",
                  jobs: [
                    {
                      id: 77,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Cleaning",
                      name_ar: "تنظيف",
                      price: 240,
                      pricetype: 1,
                      t_price: 0,
                      saleprice: 168,
                      is_promoted: true,
                      i_notes: "Get 2 or more units cleaning in SAR 168 each",
                      i_notes_ar:
                        " خدمة تنظيف وحدتين أو أكثر ب168 ريال  لكل وحدة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 78,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Repair Consultation",

                      name_ar: "إستشارة إصلاح",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },

                    {
                      id: 78,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Installation",

                      name_ar: "تركيب",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },

                    {
                      id: 78,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Relocation",

                      name_ar: "نقل",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    // {
                    //   id: 69,
                    //   serviceid: 29,
                    //   pricelimit: 49,
                    //   name: "Partial or Gas topup",
                    //   name_ar: "تعبئة الغاز جزئي او كامل",
                    //   price: 100,
                    //   pricetype: 1,
                    //   cartnotes:
                    //     "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                    //   cartnotes_ar:
                    //     "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                    //   carttype: 1,
                    // },

                    {
                      id: 78,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Freon Refill (Partial)",
                      name_ar: " إستشارة إصلاح (جزئي)",
                      price: 99,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 31,
                  name: "Desert Cooler",
                  name_ar: "مكيف صحراوي (مبرد)",
                  is_promoted: true,
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FDessert-Cooler-min.png?alt=media&token=478fe594-de43-47b7-8656-4fef181249d2",
                  jobs: [
                    {
                      id: 82,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Large Desert Cooler Cleaning",
                      name_ar: "تنظيف المبرد الكبير",
                      price: 130,
                      pricetype: 1,
                      is_promoted: true,
                      t_price: 0,
                      saleprice: 91,
                      i_notes:
                        "Large Desert Cooler Cleaning on 2 or more units in SAR 91 each",
                      i_notes_ar: "تنظيف حدتين أو أكثر ب91 ريال لكل وحدة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                      note: "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      note_ar: null,
                    },
                    {
                      id: 79,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Installation",
                      name_ar: "تركيب",
                      is_promoted: true,
                      t_price: 0,
                      // saleprice: 120,
                      i_notes: "Get 2 or more units installed in SAR 120 each",
                      i_notes_ar: "ركيب وحدتين أو أكثر ب120 ريال لكل وحدة",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 80,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Repair Consultation",
                      name_ar: "إستشارة إصلاح",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 81,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Small Desert Cooler Cleaning",
                      name_ar: "تنظيف المبرد الصغير ",
                      price: 100,
                      pricetype: 1,
                      is_promoted: true,
                      t_price: 0,
                      saleprice: 70,
                      i_notes:
                        "Small Desert Cooler Cleaning on 2 or more units in SAR 70 each",
                      i_notes_ar: "تنظيف حدتين أو أكثر ب70 ريال لكل وحدة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    // {
                    //   id: 69,
                    //   serviceid: 29,
                    //   pricelimit: 49,
                    //   name: "Partial or Gas topup",
                    //   name_ar: "تعبئة الغاز جزئي او كامل",
                    //   price: 100,
                    //   pricetype: 1,
                    //   cartnotes:
                    //     "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                    //   cartnotes_ar:
                    //     "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                    //   carttype: 1,
                    // },
                  ],
                },
                {
                  id: 32,
                  name: "AC Technician Visit",
                  name_ar: "زيارة فني تكييف",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FElectrician-Visit-min.png?alt=media&token=5d672cea-38aa-4bdb-be4d-9a37d220402b",
                  jobs: [
                    {
                      id: 83,
                      serviceid: 29,
                      pricelimit: 49,
                      name: "Schedule Visit",
                      name_ar: "ترتيب زيارة",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    // {
                    //   id: 69,
                    //   serviceid: 29,
                    //   pricelimit: 49,
                    //   name: "Change of Miscellanoues AC Parts",
                    //   name_ar: "تغيير قطع المكيفات(استبدال او تغير)",
                    //   price: 99,
                    //   pricetype: 1,
                    //   cartnotes:
                    //     "This will include change of capacitors and other miscellaneous parts but with out the material ",
                    //   cartnotes_ar: "ملاحظات: يشمل هذا تغير المكثفات والقطع",
                    //   carttype: 1,
                    // },
                  ],
                },
              ],
            },
            {
              id: 3,
              name: "Plumbing",
              name_ar: "خدمات السباكة",
              pricelimit: 49,
              seo_name:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FPLumbing-min.png?alt=media&token=cd789335-364d-4c1d-9330-f341aefe1bd3",
              banner: null,
              white_icon:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FPLumbing-min-min.png?alt=media&token=0510ce85-06fd-44cb-9ba6-21c05007830a",
              products: [
                {
                  id: 21,
                  name: "Water Heater",
                  name_ar: "سخان الماء",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FWater-Heater-min.png?alt=media&token=d1ae0fc6-d079-4c23-a7ff-b932d6324a57",
                  is_promoted: true,
                  jobs: [
                    {
                      id: 46,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Installation of water heater",
                      name_ar: "تركيب سخان الماء",
                      price: 110,
                      pricetype: 1,
                      saleprice: 79,
                      is_promoted: true,
                      t_price: 0,
                      i_notes:
                        "Get 2 or more Water Heater Installation  Only in SAR 79 Each",
                      i_notes_ar: "ركُب سخانين او أكثر فقط 79 ريال للسخان",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 47,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Replace old heater with new heater",
                      name_ar: "استبدال سخان قديم مع سخان جديد",
                      price: 35,
                      pricetype: 2,
                      // saleprice: 99,
                      is_promoted: true,
                      i_notes:
                        "Replace two or more water heater in SAR 99 per unit.\r\n",
                      i_notes_ar:
                        "استبدل سخانين أو أكثر بـ99 ريال للسخان. \r\n",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 48,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Repair water heater",
                      name_ar: "إصلاح سخان المياه",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 11,
                  name: "Sinks",
                  name_ar: "المغاسل",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FSink-min.png?alt=media&token=b67bfbf8-e37e-4da4-8a55-6bd5166a0e0c",
                  jobs: [
                    {
                      id: 22,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Repair of sinks",
                      name_ar: "تصليح المغاسل",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 23,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Installation of sinks",
                      name_ar: "تركيب المغاسل",
                      price: 115,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 26,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Installation of sinks with drawers",
                      name_ar: "تركيب المغاسل مع الأدراج",
                      price: 160,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 27,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Repair sinks with drawers",
                      name_ar: "تصليح المغاسل مع الأدراج",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 12,
                  name: "Mixers",
                  name_ar: "خلاطات",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FMixers-min.png?alt=media&token=21c3c7b6-975a-4dd5-b0ac-37331ad6c86a",
                  jobs: [
                    {
                      id: 24,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Repair of mixers",
                      name_ar: "إصلاح الخلاطات",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 25,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Installation of mixers",
                      name_ar: "تركيب الخلاطات",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 203,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Replacement of mixers",
                      name_ar: "استبدال الخلاطات",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 15,
                  name: "Showers",
                  name_ar: "رأس الدش",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FShowers-min.png?alt=media&token=5ccd88cd-2041-4e43-b346-5dd5d6857d7f",
                  jobs: [
                    {
                      id: 28,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Repair / Replacement of\r\njet spray",
                      name_ar: "إصلاح / استبدال مرحاض الحمام",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 29,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Repair / Replacement of\r\nshower head",
                      name_ar: "إصلاح رأس الدش",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 35,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Installation of shower head",
                      name_ar: "تركيب رأس دش",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 16,
                  name: "Faucets",
                  name_ar: "الحنفيات",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FFaucet-min.png?alt=media&token=6d66ff71-17bd-4c5a-bac2-845747522c4e",
                  jobs: [
                    {
                      id: 31,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Installation / Replacement of faucets",
                      name_ar: "تركيب / استبدال الحنفيات",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 32,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Repair of faucets",
                      name_ar: "إصلاح / استبدال الصنابير",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 17,
                  name: "Leaks",
                  name_ar: "تسرب",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FLeaks-min.png?alt=media&token=0e801328-ea22-4cc5-9e11-bfd52439f1b6",
                  jobs: [
                    {
                      id: 33,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Repairing identified leaks",
                      name_ar: "إصلاح التسربات المحددة",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 34,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Finding and repairing concealed leaks",
                      name_ar: "العثور على وإصلاح تسرب غير مرئية",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 35,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Leakage detection - No breaking",
                      name_ar: "كشف التسرب - لا يوجد كسر",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 18,
                  name: "Drains",
                  name_ar: "المصارف",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FDrains-min.png?alt=media&token=60265471-fff8-44bb-b251-d1a4c6d0b512",
                  jobs: [
                    {
                      id: 36,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Drain Blockages",
                      name_ar: "إنسداد المخارج ",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 37,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Sink Drain Blockage",
                      name_ar: "إنسداد حوض المغاسل",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 38,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Mainhole Blockage",
                      name_ar: "إنسداد المرحاض",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 39,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Treatment of Sewer Blockages and Odours",
                      name_ar: "تنظيف المجاري والروائح ",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 19,
                  name: "Bathtubs",
                  name_ar: "احواض الاستحمام",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FBathtub-min.png?alt=media&token=df1fbe94-3f9d-4610-84a7-5f36c9e1285c",
                  jobs: [
                    {
                      id: 40,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Installation of bathtubs",
                      name_ar: "تركيب أحواض الاستحمام",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 41,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Repair of bathtubs",
                      name_ar: "إصلاح البانيو",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 20,
                  name: "Toilets",
                  name_ar: "مراحيض",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FToilets-min.png?alt=media&token=ce12ad42-7884-47a5-938c-aaef2c1b47fa",
                  jobs: [
                    {
                      id: 42,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Replacing toilet seats cover",
                      name_ar: "استبدال غطاء مقاعد المرحاض",
                      price: 49,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 43,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Replace or repair of flushing\r\nmechanism",
                      name_ar: "استبدال أو إصلاح آلية التنظيف",
                      price: 60,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 44,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Installation of toilets",
                      name_ar: "تركيب المراحيض",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 45,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Repair of toilets",
                      name_ar: "إصلاح المراحيض",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 22,
                  name: "Water Pumps",
                  name_ar: "مضخات المياه",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FWater-Pump-min.png?alt=media&token=2376e5e4-c211-4878-aa4c-676278aa27cc",
                  jobs: [
                    {
                      id: 49,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Installation of water pumps",
                      name_ar: "تركيب مضخات المياه",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 50,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Replace old pump with new one",
                      name_ar: "استبدال المضخة القديمة بأخرى جديدة",
                      price: 120,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 51,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Change pump floater",
                      name_ar: "تغيير المضخة الغير صالحة",
                      price: 65,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 52,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Repair of water pumps",
                      name_ar: "إصلاح مضخات المياه",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 23,
                  name: "Water Tanks",
                  name_ar: "خزانات المياة",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FWater-Tank-min.png?alt=media&token=325e4bdc-b39c-42e8-949a-dbec1d86f855",
                  jobs: [
                    {
                      id: 55,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Insulation of Water Tanks (Villa)",
                      name_ar: "عزل خزانات المياه  (فيلا)",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 56,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Insulation of Water Tanks (Building)",
                      name_ar: "عزل خزانات المياه (المبنى)",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 57,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Cleaning of Water Tank (Villa)",
                      name_ar: "تنظيف خزان المياه (فيلا)",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 58,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Cleaning of Water Tank (Building)",
                      name_ar: "تنظيف خزان المياه (بناء)",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 59,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Cleaning of Water Tank (Fiber)",
                      name_ar: "تنظيف خزان المياه (الألياف)",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 25,
                  name: "Plumber Visit",
                  name_ar: "زيارة سباك",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FPlumber-Visit-min.png?alt=media&token=4df9dd60-3d22-4232-9cfd-91ae137f1034",
                  jobs: [
                    {
                      id: 53,
                      serviceid: 3,
                      pricelimit: 49,
                      name: "Consultation for general plumbing",
                      name_ar: "إستشارة عامه بشأن اعمال السباكة ",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
              ],
            },
            {
              id: 1,
              name: "Electrician",
              name_ar: "الخدمات الكهربائية",
              pricelimit: 49,
              seo_name:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FElectrician-B.png?alt=media&token=9fe3a565-31bb-48c7-b940-d8e5a8a3b56d",
              banner: null,
              white_icon:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FElectrician-W.png?alt=media&token=30099f40-a3b5-45ea-8712-6f4bea4b7f14",
              products: [
                {
                  id: 1,
                  name: "Chandeliers and Other",
                  name_ar: "الثريات وغيرها",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FChandeliers-min.png?alt=media&token=56f71593-688d-4c94-9ff5-1a6629dda03a",
                  jobs: [
                    {
                      id: 1,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Replacing Chandeliers bulb",
                      name_ar: "استبدال لمبة الثريات ",
                      price: 10,
                      pricetype: 1,
                      description:
                        "The price of bulb, fixture or starter has been\r\n mentioned as an estimate, it might be changed depending upon the brand.",
                      description_ar:
                        "سعر المصباح والتيوب لايت او الفيوز (المشغل) محدد بشكل تقريبي، ربما يتغير على حسب الماركة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 2,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Installation of Chandeliers bulb",
                      name_ar: "تركيب لمبة الثريات",
                      price: 35,
                      pricetype: 2,
                      description:
                        "The price of bulb, fixture or starter has been\r\n mentioned as an estimate, it might be changed depending upon the brand.",
                      description_ar:
                        "سعر المصباح والتيوب لايت او الفيوز (المشغل) محدد بشكل تقريبي، ربما يتغير على حسب الماركة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 2,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Removal of Chandeliers bulb",
                      name_ar: "إزالة لمبة الثريات",
                      price: 35,
                      pricetype: 2,
                      description:
                        "The price of bulb, fixture or starter has been\r\n mentioned as an estimate, it might be changed depending upon the brand.",
                      description_ar:
                        "سعر المصباح والتيوب لايت او الفيوز (المشغل) محدد بشكل تقريبي، ربما يتغير على حسب الماركة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 2,
                  name: "Spotlights",
                  name_ar: "الكشافات",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FSpotlights-min.png?alt=media&token=c127369f-e40a-49cd-b500-e58ef058a0b8",
                  jobs: [
                    {
                      id: 3,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Change a small spotlight bulb",
                      name_ar: "تغيير لمبة الضوء الصغير",
                      price: 10,
                      pricetype: 1,
                      description:
                        "The price of bulb, fixture or starter has been  mentioned as an estimate, it might be changed depending upon the brand.",
                      description_ar:
                        "سعر المصباح والتيوب لايت او الفيوز (المشغل) محدد بشكل تقريبي، ربما يتغير على حسب الماركة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 4,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Change a large spotlight bulb\r\n(10 cm or more)",
                      name_ar: "تغيير لمبة الكشاف الكبيرة (10 سم أو أكثر)",
                      price: 12,
                      pricetype: 1,
                      description:
                        "The price of bulb, fixture or starter has been  mentioned as an estimate, it might be changed depending upon the brand.",
                      description_ar:
                        "سعر المصباح والتيوب لايت او الفيوز (المشغل) محدد بشكل تقريبي، ربما يتغير على حسب الماركة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 5,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Installation of spotlight bulb",
                      name_ar: "تركيب لمبة الكشاف",
                      price: 35,
                      pricetype: 2,
                      description:
                        "The price of bulb, fixture or starter has been  mentioned as an estimate, it might be changed depending upon the brand.",
                      description_ar:
                        "سعر المصباح والتيوب لايت او الفيوز (المشغل) محدد بشكل تقريبي، ربما يتغير على حسب الماركة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 3,
                  name: "Lightbulbs",
                  name_ar: "المصابيح الكهربائية",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FNormal-Light-min.png?alt=media&token=80f7c5d9-38aa-4ce9-9bb4-d869ac7f4d0f",
                  jobs: [
                    {
                      id: 6,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Changing lights",
                      name_ar: "تغيير الأضواء",
                      price: 10,
                      pricetype: 1,
                      description:
                        "The price of bulb, fixture or starter has been  mentioned as an estimate, it might be changed depending upon the brand.",
                      description_ar:
                        "سعر المصباح والتيوب لايت او الفيوز (المشغل) محدد بشكل تقريبي، ربما يتغير على حسب الماركة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 7,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Installation of light fixtures",
                      name_ar: "تركيب المصابيح",
                      price: 35,
                      pricetype: 2,
                      description:
                        "The price of bulb, fixture or starter has been  mentioned as an estimate, it might be changed depending upon the brand.",
                      description_ar:
                        "سعر المصباح والتيوب لايت او الفيوز (المشغل) محدد بشكل تقريبي، ربما يتغير على حسب الماركة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 4,
                  name: "Flourescent Lights",
                  name_ar: "أضواء الفلورسنت",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FFlourescent-min.png?alt=media&token=ac2eb355-71de-42c7-bd79-91e143bb12db",
                  jobs: [
                    {
                      id: 8,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Changing flourescent lights",
                      name_ar: "تغيير أضواء الفلورسنت",
                      price: 10,
                      pricetype: 1,
                      description:
                        "The price of bulb, fixture or starter has been  mentioned as an estimate, it might be changed depending upon the brand.",
                      description_ar:
                        "سعر المصباح والتيوب لايت او الفيوز (المشغل) محدد بشكل تقريبي، ربما يتغير على حسب الماركة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 9,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Installation of flourescent lights",
                      name_ar: "تركيب أضواء الفلورسنت",
                      price: 35,
                      pricetype: 2,
                      description:
                        "The price of bulb, fixture or starter has been  mentioned as an estimate, it might be changed depending upon the brand.",
                      description_ar:
                        "سعر المصباح والتيوب لايت او الفيوز (المشغل) محدد بشكل تقريبي، ربما يتغير على حسب الماركة",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 5,
                  name: "Switches and Outlets",
                  name_ar: "المفاتيح والمنافذ والتسليك",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FSwitches-min.png?alt=media&token=63d3dc54-a9ee-4095-9e84-be363aa09b58",
                  jobs: [
                    {
                      id: 10,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Repair/replace switches",
                      name_ar: "إصلاح/استبدال من المفاتيح",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 204,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Installation of switches",
                      name_ar: "تثبيت جديد من المفاتيح",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 6,
                  name: "Fans",
                  name_ar: "مراوح الهواء",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FFans-min.png?alt=media&token=c47c8b08-3b2b-43c2-98a8-b0563f27d261",
                  jobs: [
                    {
                      id: 13,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Repair of kitchen fans",
                      name_ar: "إصلاح مراوح المطبخ",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 14,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Installation of kitchen fans",
                      name_ar: "تركيب مراوح المطبخ",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 15,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Repair of ceiling fan",
                      name_ar: "إصلاح مروحة السقف",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 16,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Installation of ceiling fans",
                      name_ar: "تركيب مراوح السقف",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 17,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Repair of bathroom fans",
                      name_ar: "إصلاح مراوح الحمام",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 18,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Installation of bathroom fans",
                      name_ar: "تركيب مراوح الحمام",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 19,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Repair of any other fans",
                      name_ar: "إصلاح مراوح الهواء",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 20,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Installation of any other fans",
                      name_ar: "تركيب مراوح الهواء",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 10,
                  name: "Distribution Panels",
                  name_ar: "لوحات التحكم والتوزيع",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FDistribution-Panel-min.png?alt=media&token=b6cb4c88-e169-48c5-8257-c5b1bc25ba4f",
                  jobs: [
                    {
                      id: 21,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Maintenance of distribution panel",
                      name_ar: "صيانة  لوحات التحكم والتوزيع الكهربائي",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 93,
                  name: "Wiring",
                  name_ar: "تسليك كهربائي",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FWiring-min.png?alt=media&token=b00a2d8f-aaf6-4654-a9cb-855fcc1bd082",
                  jobs: [
                    {
                      id: 234,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Wiring installation",
                      name_ar: "توصيل أسلاك كهربائية \r\n",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    // {
                    //   id: 235,
                    //   serviceid: 1,
                    //   pricelimit: 49,
                    //   name: "Wiring consultation",
                    //   name_ar: "إستشارة تسليك كهربائي",
                    //   price: 35,
                    //   pricetype: 2,
                    //   cartnotes:
                    //     "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                    //   cartnotes_ar:
                    //     "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                    //   carttype: 1,
                    // },
                  ],
                },
                {
                  id: 94,
                  name: "Voltage Conversions",
                  name_ar: "المحولات الكهربائية",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FVoltage-min.png?alt=media&token=1210a854-36cb-4b13-8625-beafa4d5d884",
                  jobs: [
                    {
                      id: 11,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "220 to 110 conversion",
                      name_ar: "محول كهربا ء من 220 الى 110",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 12,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "110  to 220 conversion",
                      name_ar: "محول كهربا ء من 110 الى 220",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 98,
                  name: "Electrician Visit",
                  name_ar: "زيارة كهربائي",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FElectrician-Visit-min.png?alt=media&token=5d672cea-38aa-4bdb-be4d-9a37d220402b",
                  jobs: [
                    {
                      id: 290,
                      serviceid: 1,
                      pricelimit: 49,
                      name: "Schedule Visit",
                      name_ar: "ترتيب زيارة",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
              ],
            },
            // disabled on 12:09 AM
            {
              id: 4,
              name: "Carpenter",
              name_ar: "خدمات النجارة",
              pricelimit: 49,
              seo_name:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCarpentry-B.png?alt=media&token=5f6904c9-f2fe-4da2-9ea5-6edc1eaaea40",
              banner: null,
              white_icon:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCarpentry-Icon-W.png?alt=media&token=cfa0b713-b37b-4275-9c9e-5e4d9ed7f5d5",
              products: [
                {
                  id: 85,
                  name: "Furniture",
                  name_ar: "أثاث المنزل",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FFurniture.png?alt=media&token=8f53811b-20e2-4225-bc7b-9ce8828a6c54",
                  jobs: [
                    {
                      id: 245,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Making of furniture",
                      name_ar: "أعمال الأثاث",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 246,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Wooden furniture repair",
                      name_ar: "إصلاح الأثاث الخشبي",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 247,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "General Furniture assembly",
                      name_ar: "تجميع الأثاث (عام)",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 248,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "IKEA or similar furniture assembly & installation",
                      name_ar: "تجميع وتركيب على طريقة ايكيا او غيرها",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 249,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Furniture repair",
                      name_ar: "إصلاح الأثاث",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 86,
                  name: "Beds",
                  name_ar: "سرير (أسرة)",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FBed-min.png?alt=media&token=9898e9df-6541-40da-b7fa-8bc5a7e77859",
                  jobs: [
                    {
                      id: 250,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Remove or install bed",
                      name_ar: "إزالة أو تثبيت السرير",
                      price: 110,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 251,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Balance bed",
                      name_ar: "موازنة السرير ",
                      price: 69,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 252,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Bed Repair",
                      name_ar: "إصلاح السرير",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 87,
                  name: "Tables",
                  name_ar: "طاولات",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FTables-min.png?alt=media&token=85dcd301-f083-40d1-9e03-2dca2dd08a9f",
                  jobs: [
                    {
                      id: 253,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Remove or install tables ",
                      name_ar: "إزالة أو تثبيت الطاولات",
                      price: 79,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 254,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Repair table",
                      name_ar: "تصليح الطاولات",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 88,
                  name: "Cabinets",
                  name_ar: "خزانات",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCabnet-min.png?alt=media&token=3e4aecc5-5829-46f8-8740-81c9af2ce5fa",
                  jobs: [
                    {
                      id: 256,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Remove or install the 4 door\r\ncabinet",
                      name_ar: "إزالة أو تركيب خزانة ابو 4 أبواب",
                      price: 129,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 257,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Remove or install the 5 door cabinet rack",
                      name_ar: "إزالة أو تركيب خزانة ابو 5 أبواب ورف",
                      price: 149,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 258,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Remove or install a zipper door\r\ncabinet",
                      name_ar: "إزالة أو تركيب خزانة ابو باب سحاب",
                      price: 139,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 259,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Cabinet Repair",
                      name_ar: "إصلاح الخزانة",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 255,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Remove or install 3 door\r\ncabinet",
                      name_ar: "إزالة أو تركيب خزانة ابو 3 أبواب",
                      price: 110,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 89,
                  name: "Curtains",
                  name_ar: "ستائر",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCurtains-min.png?alt=media&token=d80d5a29-eceb-422f-a243-fc656311873d",
                  jobs: [
                    {
                      id: 260,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Rolls curtain installation",
                      name_ar: "تركيب ستائر (رولز)",
                      price: 69,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 261,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Single Layer curtain installation\r\nLess than 2.5m",
                      name_ar:
                        "تركيب ستارة (طبقات) | طبقة واحدة | اصغر من 2.5 م",
                      price: 69,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 262,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Single Layer curtain installation\r\nEqual or more than 2.5m",
                      name_ar:
                        "تركيب ستارة (طبقات) | طبقة واحدة | 2.5 م او اكثر  ",
                      price: 89,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 263,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Double Layer curtain installation\r\nLess than 2.5m",
                      name_ar:
                        "تركيب ستارة (طبقات) | طبقة مزدوجة | اصغر من 2.5 م",
                      price: 119,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 264,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Double Layer curtain installation\r\nEqual or more than 2.5m",
                      name_ar:
                        "تركيب ستارة (طبقات) | طبقة مزدوجة | 2.5 م او اكثر  ",
                      price: 129,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 265,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Roman curtain installation",
                      name_ar: "تركيب ستارة رومانية",
                      price: 109,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 266,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Have an issue/problem",
                      name_ar: "هل لديك اي مشكلة؟",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 90,
                  name: "Doors",
                  name_ar: "أبواب",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FDoors-min.png?alt=media&token=5c93e67a-bee4-49d1-a69a-68fd5513b4f8",
                  jobs: [
                    {
                      id: 267,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Open locked door",
                      name_ar: "فتح باب مغلق",
                      price: 79,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 268,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Change door lock",
                      name_ar: "تغيير قفل الباب",
                      price: 40,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 269,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Install new door",
                      name_ar: "تركيب باب جديد",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 270,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Wooden doors balancing",
                      name_ar: "موازنة الأبواب الخشبية",
                      price: 89,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 271,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Remove and install self door",
                      name_ar: "إزالة وتركيب الباب الاوتوماتيك (الألي)",
                      price: 49,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 272,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Rubber installation",
                      name_ar: "تركيب المطاط",
                      price: 50,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 273,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Door Abrasion",
                      name_ar: "كشط الباب",
                      price: 89,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 274,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Have an issue/problem",
                      name_ar: "هل لديك اي مشكلة؟",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 91,
                  name: "Hanging Items",
                  name_ar: "تعليق أغراض",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FHanging-Items-Icon.png?alt=media&token=a55ac2ea-bbd4-454a-9421-4f3d46e6678e",
                  jobs: [
                    {
                      id: 275,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Install or remove shelves",
                      name_ar: "تركيب او إزالة الرفوف",
                      price: 49,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 276,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Install or remove paintings and pictures",
                      name_ar: "تركيب او إزالة اللوحات والصور",
                      price: 29,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 277,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Remove or install a mirror",
                      name_ar: "إزالة أو تثبيت مرآة",
                      price: 29,
                      pricetype: 1,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 279,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Have an issue/problem",
                      name_ar: "هل لديك اي مشكلة؟",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 92,
                  name: "Carpenter Visit",
                  name_ar: "زيارة نجار",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCarpenter-Visit-min.png?alt=media&token=e0343fb3-3da0-45f4-9adf-703fc6adda70",
                  jobs: [
                    {
                      id: 280,
                      serviceid: 4,
                      pricelimit: 49,
                      name: "Carpenter Consultation",
                      name_ar: "زيارة نجار",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
              ],
            },
            {
              id: 53,
              name: "Paint Services",
              name_ar: " خدمات الدهان",
              pricelimit: 49,
              seo_name:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FPaint-Black-min.png?alt=media&token=d6c02ed5-1a7c-45e9-8234-f34860afacbf",
              banner: null,
              white_icon:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FPaint-min.png?alt=media&token=1ffb6f79-af8f-4e93-86f2-7d66af046146",
              products: [
                {
                  id: 102,
                  name: "Apartment",
                  name_ar: "الشقة",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FApartment-min.png?alt=media&token=0a61353d-951d-4d16-b29a-698dc7c3c710",
                  jobs: [
                    // {
                    //   id: 297,
                    //   serviceid: 53,
                    //   pricelimit: 49,
                    //   name: "Enter number of rooms",
                    //   name_ar: "أدخل عدد الغرف",
                    //   price: 199,
                    //   pricetype: 5,
                    //   description:
                    //     "1- The professional will visit you to let you chose the paint company & colour.\r\n2- For each room selected you will get a bathroom or a kitchen free of charge painted.",
                    //   description_ar:
                    //     "i- سيقوم الفني بزيارتك للسماح لك باختيار شركة الطلاء واللون.\r\nii- لكل غرفة تختارها ستحصل على طلاء للحمام او المطبخ مجاناً",
                    //   cartnotes:
                    //     "1- The price of the paint is not included in the prices\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
                    //   cartnotes_ar:
                    //     "السعر لا يشمل سعر الطلاء \r\nالأسعار تشمل تكاليف الزيارة\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
                    //   carttype: 2,
                    //   note: "1- The professional will visit you to let you chose the paint company & colour.\r\n2- For each room selected you will get a bathroom or a kitchen free of charge painted.\r\n3- All prices are subjected to discount.",
                    //   note_ar:
                    //     "سيقوم الفني بزيارتك للسماح لك باختيار شركة الطلاء واللون.\r\nلكل غرفة تختارها ستحصل على طلاء للحمام او المطبخ مجاناً\r\nكل الأسعار مخفضة",
                    // },
                    {
                      id: 297,
                      serviceid: 53,
                      pricelimit: 49,
                      name: "2 Bedroom Apartment",
                      name_ar: "شقة 2 غرف نوم",
                      price: 35,
                      pricetype: 2,
                      description:
                        "1- The professional will visit you to let you chose the paint company & colour.\r\n2- For each room selected you will get a bathroom or a kitchen free of charge painted.",
                      description_ar:
                        "i- سيقوم الفني بزيارتك للسماح لك باختيار شركة الطلاء واللون.\r\nii- لكل غرفة تختارها ستحصل على طلاء للحمام او المطبخ مجاناً",
                    },
                    {
                      id: 297,
                      name: "3 Bedroom Apartment",
                      name_ar: "شقة 3 غرف نوم",
                      price: 35,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "4 Bedroom Apartment",
                      name_ar: "شقة 4 غرف نوم",
                      price: 35,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Other",
                      name_ar: "آخر",
                      price: 35,
                      pricetype: 2,
                    },
                  ],
                },
                {
                  id: 103,
                  name: "Villa - less than 500 sq. m",
                  name_ar: "فيلا - أقل من 500 متر مربع",
                  seo_name: "https://i.ibb.co/c8q5MG9/Villa-Less-Than-500.png",
                  jobs: [
                    {
                      id: 298,
                      name: "Inside Only",
                      name_ar: "بالداخل فقط",
                      price: 35,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Inside & Outside",
                      name_ar: "داخل وخارج",
                      price: 35,
                      pricetype: 2,
                    },
                  ],
                },
                {
                  id: 103,
                  name: "Villa - more than 500 sq. m",
                  name_ar: "فيلا - أكثر من 500 متر مربع",
                  seo_name: "https://i.ibb.co/3M0mJKZ/Villa-More-Than-500.png",
                  jobs: [
                    {
                      id: 298,
                      name: "Inside Only",
                      name_ar: "بالداخل فقط",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Inside & Outside",
                      name_ar: "داخل وخارج",
                      price: 50,
                      pricetype: 2,
                    },
                  ],
                },
                {
                  id: 104,
                  name: "Office Building",
                  name_ar: "مبنى إداري",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCommercial-Buiding-min.png?alt=media&token=cbe60a88-33a7-463b-a3bc-5d8acaae0e6b",
                  jobs: [
                    {
                      id: 297,
                      name: "Schedule Visit",
                      name_ar: "جدولة الزيارة",
                      price: 50,
                      pricetype: 2,
                    },
                  ],
                },
                {
                  id: 105,
                  name: "Restaraunt/hotel",
                  name_ar: "مطعم / فندق",
                  seo_name: "https://i.ibb.co/9cCZ8DT/Restaurant.png",
                  jobs: [
                    {
                      id: 297,
                      name: "Schedule Visit",
                      name_ar: "جدولة الزيارة",
                      price: 50,
                      pricetype: 2,
                    },
                  ],
                },
                {
                  id: 106,
                  name: "Shop",
                  name_ar: "محل",
                  seo_name: "https://i.ibb.co/3kSL3My/Shop.png",
                  jobs: [
                    {
                      id: 297,
                      name: "Schedule Visit",
                      name_ar: "جدولة الزيارة",
                      price: 35,
                      pricetype: 2,
                    },
                  ],
                },
                // {
                //   id: 105,
                //   name: "Painter Visit",
                //   name_ar: " زيارة فني دهان",
                //   seo_name:
                //     "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FPaiter-Visit-min.png?alt=media&token=81fa1894-9056-4981-a9c3-d7ffce7e2686",
                //   jobs: [
                //     {
                //       id: 300,
                //       serviceid: 53,
                //       pricelimit: 49,
                //       name: "Schedule Visit",
                //       name_ar: "أدخل عدد الغرف",
                //       price: 35,
                //       pricetype: 2,
                //       description:
                //         "1- The professional will visit you to let you chose the paint company & colour.\r\n2- For each room selected you will get a bathroom or a kitchen free of charge painted.",
                //       description_ar:
                //         "i- سيقوم الفني بزيارتك للسماح لك باختيار شركة الطلاء واللون.\r\nii- لكل غرفة تختارها ستحصل على طلاء للحمام او المطبخ مجاناً",
                //       cartnotes:
                //         "1- The price of the paint is not included in the prices\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
                //       cartnotes_ar:
                //         "السعر لا يشمل سعر الطلاء \r\nالأسعار تشمل تكاليف الزيارة\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
                //       carttype: 2,
                //       note: "1- The professional will visit you to let you chose the paint company & colour.\r\n2- For each room selected you will get a bathroom or a kitchen free of charge painted.\r\n3- All prices are subjected to discount.",
                //       note_ar:
                //         "سيقوم الفني بزيارتك للسماح لك باختيار شركة الطلاء واللون.\r\nلكل غرفة تختارها ستحصل على طلاء للحمام او المطبخ مجاناً\r\nكل الأسعار مخفضة",
                //     },
                //   ],
                // },
              ],
            },

            {
              id: 54,
              name: "Ceiling Works",
              name_ar: " أعمال السقف",
              pricelimit: 49,
              seo_name: "https://i.ibb.co/19fcyN2/Ceiling-Black-Category.png",
              banner: null,
              white_icon: "https://i.ibb.co/19fcyN2/Ceiling-Black-Category.png",
              products: [
                {
                  id: 33,
                  name: "New Building",
                  name_ar: "المبنى جديد",
                  seo_name: "https://i.ibb.co/ZGc7p57/New-Building.png",
                  jobs: [
                    {
                      id: 297,
                      name: "Install Wooden board",
                      name_ar: "تركيب لوح خشبي",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Install Gybsum board",
                      name_ar: "تركيب ألواح الجبس",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Install Tile Ceiling",
                      name_ar: "تركيب لوح خشبي",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Install Metal Ceiling",
                      name_ar: "تركيب ألواح الجبس",
                      price: 50,
                      pricetype: 2,
                    },
                  ],
                },
                {
                  id: 34,
                  name: "Old Building",
                  name_ar: "المبنى القديم",
                  seo_name: "https://i.ibb.co/vJVXBxV/Old-Building.png",
                  jobs: [
                    {
                      id: 297,
                      name: "Repair/replace Wooden board",
                      name_ar: "إصلاح / استبدال لوح خشبي",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Repair/replace Gybsum board",
                      name_ar: "إصلاح / استبدال ألواح الجبس",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Repair/replace Tile Ceiling",
                      name_ar: "إصلاح / استبدال بلاط السقف",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Repair/replace Metal Ceiling",
                      name_ar: "إصلاح / استبدال السقف المعدني",
                      price: 50,
                      pricetype: 2,
                    },
                  ],
                },
              ],
            },
            {
              id: 55,
              name: "Flooring Works",
              name_ar: " أعمال الأرضيات",
              pricelimit: 49,
              seo_name: "https://i.ibb.co/Tq6c7qn/Flooring-Black-Category.png",
              banner: null,
              white_icon:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FPaint-min.png?alt=media&token=1ffb6f79-af8f-4e93-86f2-7d66af046146",
              products: [
                {
                  id: 33,
                  name: "New Building",
                  name_ar: "المبنى جديد",
                  seo_name: "https://i.ibb.co/ZGc7p57/New-Building.png",
                  jobs: [
                    {
                      id: 297,
                      name: "Install Ceramic Tiles",
                      name_ar: "تركيب بلاط السيراميك",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Install Gybsum board",
                      name_ar: "تركيب ألواح الجبس",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Install Natural Stone Tiles",
                      name_ar: "تركيب بلاط الحجر الطبيعي",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Install Marbles Floor",
                      name_ar: "تركيب ارضيات رخام",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Install Granite Floor",
                      name_ar: "تركيب ارضيات جرانيت",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Cement Floor",
                      name_ar: "أرضية أسمنتية",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Install Hardwood Floor",
                      name_ar: "تركيب أرضية خشبية مقوى",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Install Plywood Floor",
                      name_ar: "تركيب أرضية من الخشب الرقائقي",
                      price: 50,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Install Glass Floor",
                      name_ar: "تركيب أرضية زجاجية",
                      price: 50,
                      pricetype: 2,
                    },
                  ],
                },
                {
                  id: 34,
                  name: "Old Building",
                  name_ar: "المبنى القديم",
                  seo_name: "https://i.ibb.co/vJVXBxV/Old-Building.png",
                  jobs: [
                    {
                      id: 297,
                      name: "Repair/replace Ceramic Tiles",
                      name_ar: "إصلاح / استبدال بلاط السيراميك",
                      price: 35,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Repair/replace Natural Stones Tiles",
                      name_ar: "إصلاح / استبدال بلاط الحجر الطبيعي",
                      price: 35,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Repair/replace Hardwood floor",
                      name_ar: "إصلاح / استبدال الأرضيات الخشبية",
                      price: 35,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Repair/replace Plywood floor",
                      name_ar: "إصلاح / استبدال أرضية الخشب الرقائقي",
                      price: 35,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Repair/replace Glass floor",
                      name_ar: "إصلاح / استبدال أرضية زجاجية",
                      price: 35,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Repair/replace Marbles floor",
                      name_ar: "إصلاح / استبدال أرضية الرخام",
                      price: 35,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Repair/replace Granite floor",
                      name_ar: "إصلاح / استبدال أرضية الجرانيت",
                      price: 35,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Repair Cement floor",
                      name_ar: "إصلاح أرضية أسمنتية",
                      price: 35,
                      pricetype: 2,
                    },
                  ],
                },
              ],
            },
            {
              id: 57,
              name: "Walls Works",
              name_ar: "أعمال الجدران",
              pricelimit: 49,
              seo_name: "https://i.ibb.co/f4D9MxK/Wall-Black-Category.png",
              banner: null,
              white_icon:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FPaint-min.png?alt=media&token=1ffb6f79-af8f-4e93-86f2-7d66af046146",
              products: [
                {
                  id: 33,
                  name: "New Building",
                  name_ar: "المبنى جديد",
                  seo_name: "https://i.ibb.co/ZGc7p57/New-Building.png",
                  jobs: [
                    {
                      id: 297,
                      name: "Install New Wallpapers",
                      name_ar: "تركيب خلفيات جديدة",
                      price: 35,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Install New Wall Mirrors",
                      name_ar: "تركيب مرايا حائط جديدة",
                      price: 35,
                      pricetype: 2,
                    },
                  ],
                },
                {
                  id: 34,
                  name: "Old Building",
                  name_ar: "المبنى القديم",
                  seo_name: "https://i.ibb.co/vJVXBxV/Old-Building.png",
                  jobs: [
                    {
                      id: 297,
                      name: "Replace Wallpapers",
                      name_ar: "استبدال الخلفيات",
                      price: 35,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Replace Wall Mirrors",
                      name_ar: "استبدال مرايا الحائط",
                      price: 35,
                      pricetype: 2,
                    },
                    {
                      id: 297,
                      name: "Wall Fixing",
                      name_ar: "إصلاح  الجدار",
                      price: 50,
                      pricetype: 2,
                    },
                  ],
                },
              ],
            },
            {
              id: 48,
              name: "Electronics",
              name_ar: "تصليح الكتروني",
              pricelimit: 49,
              seo_name:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2Felectronic%20b.png?alt=media&token=5310a215-a609-49c5-9aac-b1e971ca108f",
              banner: null,
              white_icon:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2Felectronic%20W.png?alt=media&token=44466b84-55b0-4ebe-ae84-bb501812724b",
              products: [
                {
                  id: 33,
                  name: "Refrigerator Technician",
                  name_ar: "فني تبريد",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FRefrigerator-min.png?alt=media&token=ec44c2df-bfda-485c-9fdc-879c415cad70",
                  jobs: [
                    {
                      id: 84,
                      serviceid: 48,
                      pricelimit: 49,
                      name: "Cleaning",
                      name_ar: "تنظيفة",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 85,
                      serviceid: 48,
                      pricelimit: 49,
                      name: "Repair consultation",
                      name_ar: "استشارة لاصلاح ",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 34,
                  name: "Microwave Technician",
                  name_ar: "فني الميكروويف",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FMicrowave-min.png?alt=media&token=cfb24772-3934-4217-8a59-896fbbfb1728",
                  jobs: [
                    {
                      id: 86,
                      serviceid: 48,
                      pricelimit: 49,
                      name: "Repair consultation for microwave",
                      name_ar: "استشارة لاصلاح الميكرويف",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 35,
                  name: "Washing Machine Technician",
                  name_ar: "فنى آلة الغسيل",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FWashing-Machine-min.png?alt=media&token=902f12a4-c0df-433e-b0a7-52f543c3d0a7",
                  jobs: [
                    {
                      id: 87,
                      serviceid: 48,
                      pricelimit: 49,
                      name: "Repair of washing machine",
                      name_ar: "استشارة لاصلاح الغسالة ",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 36,
                  name: "Fridge",
                  name_ar: "ثلاجة",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FRefrigerator-min.png?alt=media&token=ec44c2df-bfda-485c-9fdc-879c415cad70",
                  jobs: [
                    // {
                    //   id: 278,
                    //   serviceid: 48,
                    //   pricelimit: 49,
                    //   name: "Remove or install a TV",
                    //   name_ar: "إزالة أو تثبيت  تلفزيون",
                    //   price: 69,
                    //   pricetype: 1,
                    //   cartnotes:
                    //     "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                    //   cartnotes_ar:
                    //     "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                    //   carttype: 1,
                    // },
                    {
                      id: 88,
                      serviceid: 48,
                      pricelimit: 49,
                      name: "Book Appointment",
                      name_ar: "موعد الكتاب",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 95,
                  name: "Dishwasher",
                  name_ar: "آلة غسيل الصحون",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FDishwasher-min.png?alt=media&token=e1d78cb1-873c-4e7f-9b18-c936068dd5d1",
                  jobs: [
                    {
                      id: 284,
                      serviceid: 48,
                      pricelimit: 49,
                      name: "Repair consultation of dishwasher",
                      name_ar: "إستشارة تصليح آلة غسيل الصحون",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
              ],
            },
            // {
            //   id: 56,
            //   name: "Cleaning",
            //   name_ar: "تنظيف",
            //   pricelimit: 49,
            //   seo_name:
            //     "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCleaning%2FCleaning-min.png?alt=media&token=23ef981d-1da1-47aa-bd89-df08e2640ef1",
            //   banner: null,
            //   white_icon:
            //     "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCleaning%2FCleaning-White-min.png?alt=media&token=5617d8d4-35c3-41f7-9f50-ca37cf52a1d5",
            //   products: [
            //     {
            //       id: 113,
            //       name: "Apartment",
            //       name_ar: "الشقة",
            //       seo_name:
            //         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FApartment-min.png?alt=media&token=0a61353d-951d-4d16-b29a-698dc7c3c710",
            //       jobs: [
            //         {
            //           id: 332,
            //           serviceid: 56,
            //           pricelimit: 49,
            //           name: "Unfurnished Dusty Apartment",
            //           name_ar: "تنظيف شقة غير مفروشة من الغبار",
            //           price: 35,
            //           pricetype: 9,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           approxprice: 400,
            //           note: "1. We use high quality product that cleans all type of dust and dirt with advance cleaning and drying machiary.\r\n2. All prices are subjected to discount",
            //           note_ar:
            //             "نستخدم آلات ومنتجًات تنظيف وتجفيف عالية الجودة لجميع أنواع الغبار والأوساخ\r\nالأسعار قابلة للتخفيض",
            //         },
            //         {
            //           id: 333,
            //           serviceid: 56,
            //           pricelimit: 49,
            //           name: "Unfurnished Dusty Apartment\r\nHave Stains",
            //           name_ar: "تنظيف شقة غير مفروشة من الغبار والبقع المتسخة",
            //           price: 35,
            //           pricetype: 9,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           approxprice: 500,
            //         },
            //         {
            //           id: 334,
            //           serviceid: 56,
            //           pricelimit: 49,
            //           name: "Furnished Dusty Apartment",
            //           name_ar: "تنظيف شقة مفروشة",
            //           price: 35,
            //           pricetype: 9,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           approxprice: 600,
            //         },
            //       ],
            //     },
            //     {
            //       id: 114,
            //       name: "Villa",
            //       name_ar: "فيلا",
            //       seo_name:
            //         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FVilla-min.png?alt=media&token=0357bab1-4116-40c6-9978-dc91b63fe92b",
            //       jobs: [
            //         {
            //           id: 335,
            //           serviceid: 56,
            //           pricelimit: 49,
            //           name: "Unfurnished Dusty Villa\r\n[300 x500 meters]",
            //           name_ar: "غير مفروشة من الغبار بمساحة\r\n[300X500م]",
            //           price: 35,
            //           pricetype: 9,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           approxprice: 1800,
            //           note: "1. We use high quality product that cleans all type of dust and dirt with advance cleaning and drying machiary.\r\n2. All prices are subjected to discount",
            //           note_ar:
            //             "نستخدم آلات ومنتجًات تنظيف وتجفيف عالية الجودة لجميع أنواع الغبار والأوساخ\r\nالأسعار قابلة للتخفيض",
            //         },
            //         {
            //           id: 336,
            //           serviceid: 56,
            //           pricelimit: 49,
            //           name: "Unfurnished Dusty Villa\r\n[200 x300 meters]",
            //           name_ar:
            //             "تنظيف فيلا غير مفروشة من الغبار بمساحة\r\n[200X300م]",
            //           price: 35,
            //           pricetype: 9,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           approxprice: 1400,
            //         },
            //       ],
            //     },
            //     {
            //       id: 115,
            //       name: "Sofa Cleaning",
            //       name_ar: "تنظيف الأريكة",
            //       seo_name:
            //         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCleaning%2FSofa-min-min.png?alt=media&token=caead5a6-d31e-41c0-ad8e-fb31c096eca7",
            //       jobs: [
            //         {
            //           id: 337,
            //           serviceid: 56,
            //           pricelimit: 49,
            //           name: "6 Seater Sofa",
            //           name_ar: "أريكة [6 مقاعد]",
            //           price: 35,
            //           pricetype: 9,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           approxprice: 400,
            //           note: "1. We use high quality product that cleans all type of dust and dirt with advance cleaning and drying machiary.\r\n2. All prices are subjected to discount",
            //           note_ar:
            //             "نستخدم آلات ومنتجًات تنظيف وتجفيف عالية الجودة لجميع أنواع الغبار والأوساخ\r\nالأسعار قابلة للتخفيض",
            //         },
            //         {
            //           id: 338,
            //           serviceid: 56,
            //           pricelimit: 49,
            //           name: "8 Seater Sofa",
            //           name_ar: "أريكة [8 مقاعد]",
            //           price: 35,
            //           pricetype: 9,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           approxprice: 400,
            //         },
            //         {
            //           id: 339,
            //           serviceid: 56,
            //           pricelimit: 49,
            //           name: "10 Seater Sofa",
            //           name_ar: "أريكة [10 مقاعد]",
            //           price: 35,
            //           pricetype: 9,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           approxprice: 500,
            //         },
            //       ],
            //     },
            //     {
            //       id: 116,
            //       name: "Carpet Cleaning",
            //       name_ar: "تنظيف السجاد",
            //       seo_name:
            //         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCleaning%2FCarpet-min-min.png?alt=media&token=b1dff645-ef52-474e-99e1-9607f901f97c",
            //       jobs: [
            //         {
            //           id: 340,
            //           serviceid: 56,
            //           pricelimit: 49,
            //           name: "Carpet Cleaning  [4X3m]",
            //           name_ar: "تنظيف السجاد [4x3 م]",
            //           price: 35,
            //           pricetype: 9,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           approxprice: 150,
            //           note: "1. We use high quality product that cleans all type of dust and dirt with advance cleaning and drying machiary.\r\n2. All prices are subjected to discount",
            //           note_ar:
            //             "نستخدم آلات ومنتجًات تنظيف وتجفيف عالية الجودة لجميع أنواع الغبار والأوساخ\r\nالأسعار قابلة للتخفيض",
            //         },
            //       ],
            //     },
            //     {
            //       id: 117,
            //       name: "Swimming Pool Cleaning",
            //       name_ar: "تنظيف أحواض السباحة",
            //       seo_name:
            //         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCleaning%2FSwimming-Pool-min-min.png?alt=media&token=983279f2-b5f4-4207-8b52-7c84fc8f774d",
            //       jobs: [
            //         {
            //           id: 341,
            //           serviceid: 56,
            //           pricelimit: 49,
            //           name: "Swimming Pool Cleaning  [12 x 20]",
            //           name_ar: "تنظيف حوض المياة بمساحة 12X20 م",
            //           price: 35,
            //           pricetype: 9,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           approxprice: 300,
            //           note: "1. We use high quality product that cleans all type of dust and dirt with advance cleaning and drying machiary.\r\n2. All prices are subjected to discount",
            //           note_ar:
            //             "نستخدم آلات ومنتجًات تنظيف وتجفيف عالية الجودة لجميع أنواع الغبار والأوساخ\r\nالأسعار قابلة للتخفيض",
            //         },
            //       ],
            //     },
            //     {
            //       id: 118,
            //       name: "Drawing Room",
            //       name_ar: "غرفة الجلوس",
            //       seo_name:
            //         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCleaning%2FDrawing-Room-min-min.png?alt=media&token=1814bf96-93da-4e71-9ae1-6d9f54b70538",
            //       jobs: [
            //         {
            //           id: 342,
            //           serviceid: 56,
            //           pricelimit: 49,
            //           name: "Drawing Room [4X5m] + Curtains + Carpet ",
            //           name_ar: "غرفة الجلوس 4x5 م + ستارة + سجاد",
            //           price: 35,
            //           pricetype: 9,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           approxprice: 500,
            //           note: "1. We use high quality product that cleans all type of dust and dirt with advance cleaning and drying machiary.\r\n2. All prices are subjected to discount",
            //           note_ar:
            //             "نستخدم آلات ومنتجًات تنظيف وتجفيف عالية الجودة لجميع أنواع الغبار والأوساخ\r\nالأسعار قابلة للتخفيض",
            //         },
            //       ],
            //     },
            //   ],
            // },
            // {
            //   id: 17,
            //   name: "Packers & Movers",
            //   name_ar: "نقل العفش",
            //   pricelimit: 49,
            //   seo_name:
            //     "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FPackers%20%26%20Movers-B.png?alt=media&token=95d19618-1903-480f-99a8-15240c7a1e4c",
            //   banner: null,
            //   white_icon:
            //     "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FPackers%20%26%20Movers-W.png?alt=media&token=a6a3c383-6102-443b-b21b-90afcb416556",
            //   products: [
            //     {
            //       id: 96,
            //       name: "Within City",
            //       name_ar: "داخل المدينة",
            //       seo_name:
            //         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FWithin-City-min.png?alt=media&token=a869bfcc-7e15-421f-a0e2-6316e95fd985",
            //       jobs: [
            //         {
            //           id: 285,
            //           serviceid: 17,
            //           pricelimit: 49,
            //           name: "Number of Kitchen",
            //           name_ar: "حدد عدد المطابخ",
            //           price: 179,
            //           pricetype: 1,
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           note: "1- Service Includes furniture and fixtures, curtains fixing, TV mounting, LCD/LED fixing, kitchen cabinet fixing and AC fixing.\r\n2- Please select how many kitchens, bedrooms, living rooms and halls do you have at your residence",
            //           note_ar:
            //             "1- الخدمة تشمل الآثاث والتجهيزات وتركيب الستائر واصلاح التلفاز بنوعيه LED او LCD وايضاً اصلاح المكيف وخزانات المطبخ. \r\n2- يرجى تحديد عدد المطابخ وغرف النوم والجلوس والصالات في سكنك",
            //         },
            //         {
            //           id: 286,
            //           serviceid: 17,
            //           pricelimit: 49,
            //           name: "Number of Bedroom",
            //           name_ar: "حدد عدد غرف النوم",
            //           price: 149,
            //           pricetype: 1,
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //         },
            //         {
            //           id: 288,
            //           serviceid: 17,
            //           pricelimit: 49,
            //           name: "Number of Living room / Lobby",
            //           name_ar: "حدد عدد صالات الجلوس",
            //           price: 159,
            //           pricetype: 1,
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //         },
            //         {
            //           id: 289,
            //           serviceid: 17,
            //           pricelimit: 49,
            //           name: "Number of Hall / Drawing Room",
            //           name_ar: "حدد عدد الصالات/الإستراحات",
            //           price: 179,
            //           pricetype: 1,
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //         },
            //         {
            //           id: 316,
            //           serviceid: 17,
            //           pricelimit: 49,
            //           name: "Schedule a visit",
            //           name_ar: "جدولة زيارة",
            //           price: 35,
            //           pricetype: 2,
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //         },
            //       ],
            //     },
            //     {
            //       id: 97,
            //       name: "Outside City",
            //       name_ar: "خارج المدينة",
            //       seo_name:
            //         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FOutside-City-min.png?alt=media&token=3899edc4-00c1-4739-993c-fcb1fb0b2f24",
            //       jobs: [
            //         {
            //           id: 287,
            //           serviceid: 17,
            //           pricelimit: 49,
            //           name: "Schedule a visit",
            //           name_ar: "جدولة زيارة",
            //           price: 35,
            //           pricetype: 2,
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //         },
            //       ],
            //     },
            //   ],
            // },
            {
              id: 52,
              name: "Gardening Services",
              name_ar: "تنسيق الحدائق",
              pricelimit: 49,
              seo_name:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2Fgardening%2FGardening-Black-min.png?alt=media&token=d435ff61-36a3-4b1d-a488-1d5bf4358fa7",
              banner: null,
              white_icon:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2Fgardening%2FGardening-White-min.png?alt=media&token=d7dba748-9b90-4303-ac8b-48071a15fc00",
              products: [
                {
                  id: 99,
                  name: "Garden Maintenance",
                  name_ar: "صيانة الحديقة",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2Fgardening%2FGarden-Maintenance-min.png?alt=media&token=4917336d-d742-4ea0-aa3e-6e2c60554f0b",
                  jobs: [
                    {
                      id: 291,
                      serviceid: 52,
                      pricelimit: 49,
                      name: "Garden Caring",
                      name_ar: "العناية بالحديقة",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 292,
                      serviceid: 52,
                      pricelimit: 49,
                      name: "Garden Trimming",
                      name_ar: "ترتيب وتقليم الحديقة",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 293,
                      serviceid: 52,
                      pricelimit: 49,
                      name: "Garden Soil Checking",
                      name_ar: "فحص تربة الحديقة",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 100,
                  name: "Garden Reconstructions",
                  name_ar: "بناء الحدائق",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2Fgardening%2FGarden-Reconstruct-min.png?alt=media&token=0bb643d3-b3b3-43c8-b6bb-ea70983709ed",
                  jobs: [
                    {
                      id: 294,
                      serviceid: 52,
                      pricelimit: 49,
                      name: "Recreation of a new area garden",
                      name_ar: "بناء حديقة جديدة",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 295,
                      serviceid: 52,
                      pricelimit: 49,
                      name: "Changing or updating garden",
                      name_ar: "تغيير او تحسين الحديقة",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 101,
                  name: "Garden Irrigation",
                  name_ar: "ري الحدائق",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2Fgardening%2FGarden-Irrigation-min.png?alt=media&token=f7d2bb5c-987d-4704-8140-1dbcdb0aa4d9",
                  jobs: [
                    {
                      id: 296,
                      serviceid: 52,
                      pricelimit: 49,
                      name: "Water supply over a garden",
                      name_ar: "توصيل المياة وري الحديقة",
                      price: 35,
                      pricetype: 2,
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
              ],
            },
            {
              id: 45,
              name: "Sanitization",
              name_ar: "خدمات التعقيم",
              pricelimit: 49,
              seo_name:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FSanitization-B.png?alt=media&token=9133661e-1aa5-4f68-a05b-155c60bcf948",
              banner: null,
              white_icon:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FSanitization-W.png?alt=media&token=e2b050d7-46bc-484e-a99c-92c1dd614f4a",
              products: [
                {
                  id: 79,
                  name: "Apartment Sanitization",
                  name_ar: "تعقيم الشقة",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FAPartment-min.png?alt=media&token=1fe1e686-ff04-4f65-b117-ba0d76833d63",
                  jobs: [
                    {
                      id: 225,
                      serviceid: 45,
                      pricelimit: 49,
                      name: "1 BHK (Bedroom, Hall, Kitchen) ",
                      name_ar: " شقة (غرفة نوم ، حمام ، صالة ، مطبخ)",
                      price: 35, //149
                      pricetype: 2,
                      description: "1 Bedroom, 1 Bathroom, 1 Hall, 1 Kitchen",
                      description_ar: "1 غرفة نوم، 1 حمام، 1 صالة ، 1 مطبخ",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                      note: "1- We use EPA approved products.",
                      note_ar: " نستخدم منتجات EPA المرخصة",
                    },
                    {
                      id: 226,
                      serviceid: 45,
                      pricelimit: 49,
                      name: "2 BHK (Bedroom, Hall, Kitchen)",
                      name_ar: "شقتين (غرفة نوم ، حمام ، صالة ، مطبخ)",
                      price: 35, //299
                      pricetype: 2,
                      description: "2 Bedroom, 2 Bathroom, 1 Hall, 1 Kitchen",
                      description_ar: "2 غرفة نوم، 2 حمام، 1 صالة ، 1 مطبخ",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 227,
                      serviceid: 45,
                      pricelimit: 49,
                      name: "3 BHK (Bedroom, Hall, Kitchen) ",
                      name_ar: "ثلاث شقق (غرفة نوم ، حمام ، صالة ، مطبخ)",
                      price: 35, //449
                      pricetype: 2,
                      description:
                        "3-4 Bedroom, 2-3 Bathroom, 1-2 Hall, 1-2 Kitchen",
                      description_ar:
                        "3-4 غرفة نوم، 2-3 حمام، 1-2 صالة ، 1-2 مطبخ",
                      i_notes: "Building of any size",
                      i_notes_ar: "",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 236,
                      serviceid: 45,
                      pricelimit: 49,
                      name: "4-5 BHK (Bedroom, Hall, Kitchen)",
                      name_ar: "4-5 شقق (غرفة نوم ، حمام ، صالة ، مطبخ)",
                      price: 35, //599
                      pricetype: 2,
                      description:
                        "4-6 Bedroom, 4-5 Bathroom, 2-3 Hall, 2-3 Kitchen",
                      description_ar: "4-5 شقق (غرفة نوم ، حمام ، صالة ، مطبخ)",
                      i_notes: "Building of any size",
                      i_notes_ar: "",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 80,
                  name: "Villa Sanitization",
                  name_ar: "تعقيم الفيلا",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FVilla-min.png?alt=media&token=0357bab1-4116-40c6-9978-dc91b63fe92b",
                  jobs: [
                    {
                      id: 237,
                      serviceid: 45,
                      pricelimit: 49,
                      name: "Enter the villa size\r\n",
                      name_ar: "ادخل مساحة الفيلا",
                      price: "35", //0.75
                      pricetype: 2, //6
                      description:
                        "Based on Villa sizes & no of floors.\r\nThe unit of villa would start from zero and increament in the multiple of 50\r\nThe unit of floor would start with 1 and as the user increases the number of floors, the price would be doubled or tripled accordingly",
                      description_ar:
                        "Based on Villa الحجم s & no of floors.\r\nThe وحدة  of villa would start from zero and increament in the multiple of 50\r\nThe وحدة  of floor would start with 1 and as the user increases the number of floors, the price would be ",
                      title: "What is your villa size (In Meters)",
                      title_ar: "ما مساحة الفيلا(بالمتر)",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                      note: "1- We use EPA approved products. ",
                      note_ar: " نستخدم منتجات EPA المرخصة",
                    },
                  ],
                },
                {
                  id: 81,
                  name: "Commercial Building Sanitization",
                  name_ar: "تعقيم المباني",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCommercial-Building-min.png?alt=media&token=5f6bb05d-ef82-4ab7-8bf4-3ecd07308fab",
                  jobs: [
                    {
                      id: 238,
                      serviceid: 45,
                      pricelimit: 49,
                      name: "Sanitization of Commerical\r\nBuilding",
                      name_ar: "تعقيم المباني التجارية",
                      price: 35, //449
                      pricetype: 2,
                      description: "Based on no of floors",
                      description_ar: "Based on no of floors",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                      note: "1- We use EPA approved products. ",
                      note_ar: " نستخدم منتجات EPA المرخصة",
                    },
                  ],
                },
              ],
            },
            {
              id: 47,
              name: "Pest Control",
              name_ar: "مكافحة الحشرات",
              pricelimit: 49,
              seo_name:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FPest%20control%20B.png?alt=media&token=4717fb56-dd6f-4a5a-a9b7-ab633adaa546",
              banner: null,
              white_icon:
                "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2Fpest%20control%20W.png?alt=media&token=0da83613-f064-45ad-81eb-cce00009b8ee",
              products: [
                {
                  id: 82,
                  name: "Apartment Pest Control",
                  name_ar: "مكافحة الحشرات بالشقة",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FAPartment-min.png?alt=media&token=1fe1e686-ff04-4f65-b117-ba0d76833d63",
                  jobs: [
                    {
                      id: 239,
                      serviceid: 47,
                      pricelimit: 49,
                      name: "1 BHK (Bedroom, Hall, Kitchen)",
                      name_ar: " شقة (غرفة نوم ، حمام ، صالة ، مطبخ)",
                      price: 35, //149
                      pricetype: 2,
                      description: "Apartment of any size",
                      description_ar: "لكل المقاسات",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                      note: "1- Leave the house for 4-5 hours until chemicals disappeared.\r\n2- We use EPA approved products. ",
                      note_ar:
                        "1- اترك المنزل من 4-5 ساعات حتى زوال المواد الكيميائية المستخدمة\r\n2- نستخدم منتجات EPA المرخصة",
                    },
                    {
                      id: 240,
                      serviceid: 47,
                      pricelimit: 49,
                      name: "2 BHK (Bedroom, Hall, Kitchen)",
                      name_ar: "شقتين (غرفة نوم ، حمام ، صالة ، مطبخ)",
                      price: 35, //299
                      pricetype: 2,
                      description: "Apartment of any size",
                      description_ar: "لكل المقاسات",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 241,
                      serviceid: 47,
                      pricelimit: 49,
                      name: "3 BHK (Bedroom, Hall, Kitchen)",
                      name_ar: "ثلاث شقق (غرفة نوم ، حمام ، صالة ، مطبخ)",
                      price: 35, //449
                      pricetype: 2,
                      description: "Apartment of any size",
                      description_ar: "لكل المقاسات",
                      i_notes: "Building of any size",
                      i_notes_ar: "",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                    {
                      id: 242,
                      serviceid: 47,
                      pricelimit: 49,
                      name: "4-5 BHK (Bedroom, Hall, Kitchen)",
                      name_ar: "4-5 شقق (غرفة نوم ، حمام ، صالة ، مطبخ)",
                      price: 35, //599
                      pricetype: 2,
                      description:
                        "4-6 Bedroom, 4-5 Bathroom, 2-3 Hall, 2-3 Kitchen",
                      description_ar: "4-5 شقق (غرفة نوم ، حمام ، صالة ، مطبخ)",
                      i_notes: "Building of any size",
                      i_notes_ar: "",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                    },
                  ],
                },
                {
                  id: 83,
                  name: "Villa Pest Control",
                  name_ar: "الفيلا",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FVilla-min.png?alt=media&token=0357bab1-4116-40c6-9978-dc91b63fe92b",
                  jobs: [
                    {
                      id: 243,
                      serviceid: 47,
                      pricelimit: 49,
                      name: "Villa size",
                      name_ar: " مساحة الفيلا",
                      price: "35", //0.75
                      pricetype: 2,
                      description:
                        "Based on Villa sizes & no of floors.\r\nThe unit of villa would start from zero and increament in the multiple of 50\r\nThe unit of floor would start with 1 and as the user increases the number of floors, the price would be doubled or tripled accordingly",
                      description_ar:
                        "Based on Villa الحجم s & no of floors.\r\nThe وحدة  of villa would start from zero and increament in the multiple of 50\r\nThe وحدة  of floor would start with 1 and as the user increases the number of floors, the price would be ",
                      title: "What is your villa size (In Meters)",
                      title_ar: "ما مساحة الفيلا(بالمتر)",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                      note: "1- Leave the house for 4-5 hours until chemicals disappeared.\r\n2- We use EPA approved products. ",
                      note_ar:
                        "1- اترك المنزل من 4-5 ساعات حتى زوال المواد الكيميائية المستخدمة\r\n2- نستخدم منتجات EPA المرخصة",
                    },
                  ],
                },
                {
                  id: 84,
                  name: "Commercial Building Pest Control",
                  name_ar: "المباني التجارية",
                  seo_name:
                    "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCommercial-Building-min.png?alt=media&token=5f6bb05d-ef82-4ab7-8bf4-3ecd07308fab",
                  jobs: [
                    {
                      id: 244,
                      serviceid: 47,
                      pricelimit: 49,
                      name: "Pest Control of Commercial\r\nBuilding",
                      name_ar: "مكافحة الحشرات في المباني التجارية",
                      price: 35, //449
                      pricetype: 2,
                      description: "Based on no of floors",
                      description_ar: "Based on no of floors",
                      cartnotes:
                        "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
                      cartnotes_ar:
                        "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
                      carttype: 1,
                      note: "1- Leave the house for 4-5 hours until chemicals disappeared.\r\n2- We use EPA approved products. ",
                      note_ar:
                        "1- اترك المنزل من 4-5 ساعات حتى زوال المواد الكيميائية المستخدمة\r\n2- نستخدم منتجات EPA المرخصة",
                    },
                  ],
                },
              ],
            },
            // {
            //   id: 54,
            //   name: "Decor",
            //   name_ar: "ديكور",
            //   pricelimit: 49,
            //   seo_name:
            //     "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FDecor-Black-min.png?alt=media&token=45089bbc-684a-4105-ab07-9ad5c54e7a58",
            //   banner: null,
            //   white_icon:
            //     "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FDecor-White-min.png?alt=media&token=54741198-bc26-4416-b9af-ab4a39974924",
            //   products: [
            //     {
            //       id: 110,
            //       name: "Flooring",
            //       name_ar: "الأرضيات",
            //       seo_name:
            //         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FDecore%2FFlooring-min.png?alt=media&token=70ea21ca-c840-4cb0-9c3a-29c13dccb02b",
            //       jobs: [
            //         {
            //           id: 317,
            //           serviceid: 54,
            //           pricelimit: 49,
            //           name: "New Ceramic Tile Installation",
            //           name_ar: "تركيب بلاط سيراميك جديد",
            //           price: 35,
            //           pricetype: 7,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- The price of the tiles are not included, this is only the price of the service\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
            //           cartnotes_ar:
            //             "السعر لا يشمل سعر الطلاء، فقط سعر الخدمة، الأسعار تشمل تكاليف الزيارة.\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
            //           carttype: 3,
            //           meterprice: 20,
            //           note: "1. Our Professional will visit you and let you choose the floor materials, design and size. \r\n2. All prices are subjected to discount. ",
            //           note_ar:
            //             "1-" +
            //             " سيقوم فنيونا بزيارتك لتحديد المواد المستخدمة للأرضية، وكذلك التصميم والحجم." +
            //             "\n" +
            //             "2-" +
            //             " كل الأسعار قابلة للتخفيض ",
            //         },
            //         {
            //           id: 318,
            //           serviceid: 54,
            //           pricelimit: 49,
            //           name: "Ceramic Tile Renovation",
            //           name_ar: "ترميم بلاط سيراميك",
            //           price: 35,
            //           pricetype: 7,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- The price of the tiles are not included, this is only the price of the service\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
            //           cartnotes_ar:
            //             "السعر لا يشمل سعر الطلاء، فقط سعر الخدمة، الأسعار تشمل تكاليف الزيارة.\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
            //           carttype: 3,
            //           meterprice: 35,
            //         },
            //         {
            //           id: 319,
            //           serviceid: 54,
            //           pricelimit: 49,
            //           name: "Natural Stone Tile Installation",
            //           name_ar: "تركيب بلاط أحجار طبيعية جديد",
            //           price: 35,
            //           pricetype: 7,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- The price of the tiles are not included, this is only the price of the service\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
            //           cartnotes_ar:
            //             "السعر لا يشمل سعر الطلاء، فقط سعر الخدمة، الأسعار تشمل تكاليف الزيارة.\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
            //           carttype: 3,
            //           meterprice: 20,
            //         },
            //         {
            //           id: 320,
            //           serviceid: 54,
            //           pricelimit: 49,
            //           name: "Natural Stone Tile Renovation",
            //           name_ar: "تركيب بلاط أحجار طبيعية جديد",
            //           price: 35,
            //           pricetype: 7,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- The price of the tiles are not included, this is only the price of the service\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
            //           cartnotes_ar:
            //             "السعر لا يشمل سعر الطلاء، فقط سعر الخدمة، الأسعار تشمل تكاليف الزيارة.\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
            //           carttype: 3,
            //           meterprice: 35,
            //         },
            //         {
            //           id: 321,
            //           serviceid: 54,
            //           pricelimit: 49,
            //           name: "Hardwood Floor Installation",
            //           name_ar: "تركيب أرضيات خشبية صلبة",
            //           price: 35,
            //           pricetype: 7,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- The price of the tiles are not included, this is only the price of the service\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
            //           cartnotes_ar:
            //             "السعر لا يشمل سعر الطلاء، فقط سعر الخدمة، الأسعار تشمل تكاليف الزيارة.\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
            //           carttype: 3,
            //           meterprice: 35,
            //         },
            //         {
            //           id: 322,
            //           serviceid: 54,
            //           pricelimit: 49,
            //           name: "Floor Mirror Installation",
            //           name_ar: "تركيب مرايا على الأرضيات",
            //           price: 35,
            //           pricetype: 7,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- The price of the tiles are not included, this is only the price of the service\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
            //           cartnotes_ar:
            //             "السعر لا يشمل سعر الطلاء، فقط سعر الخدمة، الأسعار تشمل تكاليف الزيارة.\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
            //           carttype: 3,
            //           meterprice: 55,
            //         },
            //         {
            //           id: 343,
            //           serviceid: 54,
            //           pricelimit: 49,
            //           name: "Wooden Floor Installation",
            //           name_ar: "تركيب أرضيات خشبية",
            //           price: 35,
            //           pricetype: 7,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- The price of the tiles are not included, this is only the price of the service\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
            //           cartnotes_ar:
            //             "السعر لا يشمل سعر الطلاء، فقط سعر الخدمة، الأسعار تشمل تكاليف الزيارة.\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
            //           carttype: 3,
            //           meterprice: 35,
            //         },
            //       ],
            //     },
            //     {
            //       id: 111,
            //       name: "Ceiling",
            //       name_ar: "السقف",
            //       seo_name:
            //         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FDecore%2FCeiling-min.png?alt=media&token=7c7fece8-a36e-48eb-8fff-ee7c66575d69",
            //       jobs: [
            //         {
            //           id: 324,
            //           serviceid: 54,
            //           pricelimit: 49,
            //           name: "Ceiling Wood Board  Installation",
            //           name_ar: "تركيب سقف خشبي",
            //           price: 35,
            //           pricetype: 7,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "The price of the tiles are not included, this is only the price of the service\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
            //           cartnotes_ar:
            //             "السعر لا يشمل سعر الطلاء، فقط سعر الخدمة، الأسعار تشمل تكاليف الزيارة.\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
            //           carttype: 3,
            //           meterprice: 35,
            //           note: "1. Our Professional will visit you and let you choose the ceiling materials, design and size. \r\n2. All prices are subjected to discount. ",
            //           note_ar:
            //             "1-" +
            //             "سيقوم فنيونا بزيارتك لتحديد المواد المستخدمة للسقف وكذلك التصميم والحجم." +
            //             "\n" +
            //             "2-" +
            //             " كل الأسعار قابلة للتخفيض ",
            //         },
            //         {
            //           id: 325,
            //           serviceid: 54,
            //           pricelimit: 49,
            //           name: "Ceiling Gypsum Board  Installation",
            //           name_ar: "تركيب سقف سيراميك",
            //           price: 35,
            //           pricetype: 7,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- The price of the tiles are not included, this is only the price of the service\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
            //           cartnotes_ar:
            //             "السعر لا يشمل سعر الطلاء، فقط سعر الخدمة، الأسعار تشمل تكاليف الزيارة.\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
            //           carttype: 3,
            //           meterprice: 75,
            //         },
            //         {
            //           id: 326,
            //           serviceid: 54,
            //           pricelimit: 49,
            //           name: "Ceiling Tile Installation",
            //           name_ar: "تركيب سقف بلاط",
            //           price: 35,
            //           pricetype: 7,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- The price of the tiles are not included, this is only the price of the service\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
            //           cartnotes_ar:
            //             "السعر لا يشمل سعر الطلاء، فقط سعر الخدمة، الأسعار تشمل تكاليف الزيارة.\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
            //           carttype: 3,
            //           meterprice: 75,
            //         },
            //         {
            //           id: 327,
            //           serviceid: 54,
            //           pricelimit: 49,
            //           name: "Ceiling Metal Installation",
            //           name_ar: "تركيب سقف معدني",
            //           price: 35,
            //           pricetype: 7,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- The price of the tiles are not included, this is only the price of the service\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
            //           cartnotes_ar:
            //             "السعر لا يشمل سعر الطلاء، فقط سعر الخدمة، الأسعار تشمل تكاليف الزيارة.\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
            //           carttype: 3,
            //           meterprice: 40,
            //         },
            //       ],
            //     },
            //     {
            //       id: 112,
            //       name: "Walls",
            //       name_ar: "الجدران",
            //       seo_name:
            //         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FDecore%2FWalls-min.png?alt=media&token=1e17d76a-7a80-401b-a61c-b03c5c8451e7",
            //       jobs: [
            //         {
            //           id: 329,
            //           serviceid: 54,
            //           pricelimit: 49,
            //           name: "Wallpaper Installation",
            //           name_ar: "تركيب حائط ورقي",
            //           price: 35,
            //           pricetype: 7,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- The price of the tiles are not included, this is only the price of the service\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
            //           cartnotes_ar:
            //             "السعر لا يشمل سعر الطلاء، فقط سعر الخدمة، الأسعار تشمل تكاليف الزيارة.\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
            //           carttype: 3,
            //           meterprice: 15,
            //           note: "1. Our Professional will visit you and let you choose the wall materials, design and size. \r\n2. All prices are subjected to discount. ",
            //           note_ar:
            //             "1-" +
            //             " سيقوم فنيونا بزيارتك لتحديد المواد المستخدمة للجدران وكذلك التصميم والحجم." +
            //             "\n" +
            //             "2-" +
            //             " كل الأسعار قابلة للتخفيض ",
            //         },
            //         {
            //           id: 330,
            //           serviceid: 54,
            //           pricelimit: 49,
            //           name: "Wall Mirrors Installation",
            //           name_ar: "تركيب مرايا الجدران",
            //           price: 35,
            //           pricetype: 7,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- The price of the tiles are not included, this is only the price of the service\r\n2- These prices are inclusive of the visit charge\r\n3- The professional would charge SAR 35 for the visit, in case the job is not finalized",
            //           cartnotes_ar:
            //             "السعر لا يشمل سعر الطلاء، فقط سعر الخدمة، الأسعار تشمل تكاليف الزيارة.\r\nسيكون عليك دفع 35 ريال بدل زيارة للفني في حالة لم يتم التوافق على الخدمة",
            //           carttype: 3,
            //           meterprice: 55,
            //         },
            //       ],
            //     },
            //   ],
            // },
            // {
            //   id: 55,
            //   name: "Security Camera",
            //   name_ar: "كاميرا الأمن",
            //   pricelimit: 49,
            //   seo_name:
            //     "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCCTV-Black-min.png?alt=media&token=fd7e3226-3731-4133-a651-ccc6bfd960aa",
            //   banner: null,
            //   white_icon:
            //     "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCCTC-White-min.png?alt=media&token=90a72c9d-b288-409a-ac2b-0ddf08e41a28",
            //   products: [
            //     {
            //       id: 109,
            //       name: "Indoor / Outdoor",
            //       name_ar: "داخلية/ خارجية",
            //       seo_name:
            //         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FIndoor-Outdor-min.png?alt=media&token=f1ea282c-eb4e-4cbc-89c6-5c51ab6a533a",
            //       jobs: [
            //         {
            //           id: 309,
            //           serviceid: 55,
            //           pricelimit: 49,
            //           name: "Hikvision camera 8MP",
            //           name_ar: "كاميرا هيك فيجن 8MP",
            //           price: 195,
            //           pricetype: 8,
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           note:
            //             "How would we do: \n" +
            //             "- choose the right position to ensure a wider coverage area.\n" +
            //             "- install the system, connect wires and test the monitoring system.\n" +
            //             "- get your security camera system up and run right away.\n" +
            //             "- guide you in how best to maintain the camera  connection \n\n" +
            //             "What we will use:\n" +
            //             "Each camera includes: Cables, mounting kit and the power adapter and/or receiver.\n" +
            //             "We bring all the necessary tools like drills, screwdrivers, ladder and every thing that is needed for installation of security cameras.",
            //           note_ar:
            //             "كيف نؤدي عملنا؟" +
            //             "\n" +
            //             "- تحديد الموقع الصحيح لضمان تغطية أوسع" +
            //             "\n" +
            //             "- تركيب نظام المراقبة وتوصيل الكابلات ومن ثم التجريب" +
            //             "\n" +
            //             "- تشغيل نظام المراقبة على الفور" +
            //             "\n" +
            //             "- إرشاد العميل كيفية الحفاظ على نظام المراقبة" +
            //             "\n\n" +
            //             "ماذا نستخدم؟" +
            //             "\n" +
            //             " كل كاميرا تشمل: كابلات، مجموعة منتجات المراقبة، محول الطاقة و/او جهاز الاستقبال." +
            //             "\n" +
            //             " نحن نجلب كل أدوات العمل الضرورية مثل الدريل والمفاتيح والسلم واي شيء مطلوب عند تنفيذ العمل.",
            //         },
            //         {
            //           id: 310,
            //           serviceid: 55,
            //           pricelimit: 49,
            //           name: "Hikvision camera 5MP",
            //           name_ar: "كاميرا هيك فيجن 5MP",
            //           price: 145,
            //           pricetype: 8,
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //         },
            //         {
            //           id: 311,
            //           serviceid: 55,
            //           pricelimit: 49,
            //           name: "Hikvision camera 2MP",
            //           name_ar: "كاميرا هيك فيجن 2MP",
            //           price: 65,
            //           pricetype: 8,
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //         },
            //         {
            //           id: 312,
            //           serviceid: 55,
            //           pricelimit: 49,
            //           name: "Hikvision DVR 4CH 5MP (Receiver)",
            //           name_ar: "هيك فيجن دي في ار 4 سي اتش 5 ميجا (ريسيفر)",
            //           price: 350,
            //           pricetype: 8,
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //         },
            //         {
            //           id: 313,
            //           serviceid: 55,
            //           pricelimit: 49,
            //           name: "Hard disk western digital 1 TB",
            //           name_ar: "هارد ديسك ويسترن ديجيتال 1 تيرا",
            //           price: 250,
            //           pricetype: 8,
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //         },
            //         {
            //           id: 314,
            //           serviceid: 55,
            //           pricelimit: 49,
            //           name: "Installation",
            //           name_ar: "تركيب",
            //           price: 150,
            //           pricetype: 8,
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //         },
            //         {
            //           id: 315,
            //           serviceid: 55,
            //           pricelimit: 49,
            //           name: "Schedule Visit",
            //           name_ar: "رتب زيارة",
            //           price: 35,
            //           pricetype: 2,
            //           description:
            //             "1- Our professional will visit you and let you chose the tiles design and size",
            //           description_ar: "سيزورك الفني لمعرفة التصميم والحجم",
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //         },
            //       ],
            //     },
            //   ],
            // },

            // {
            //   id: 100,
            //   name: "Home Cinema",
            //   name_ar: "سينما المنزلية",
            //   pricelimit: 49,
            //   seo_name:
            //     "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCCTV-Black-min.png?alt=media&token=fd7e3226-3731-4133-a651-ccc6bfd960aa",
            //   banner: null,
            //   white_icon:
            //     "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FCCTC-White-min.png?alt=media&token=90a72c9d-b288-409a-ac2b-0ddf08e41a28",
            //   products: [
            //     {
            //       id: 109,
            //       name: "I Want to Install Home Cinema System",
            //       name_ar: "أ ريد التثبيت نظام السينما المنزلية ",
            //       seo_name:
            //         "https://firebasestorage.googleapis.com/v0/b/foren-se-customers.appspot.com/o/wafarnalak1.2%2FIndoor-Outdor-min.png?alt=media&token=f1ea282c-eb4e-4cbc-89c6-5c51ab6a533a",
            //       jobs: [
            //         {
            //           id: 309,
            //           serviceid: 55,
            //           pricelimit: 49,
            //           name: "1080p HD",
            //           name_ar: "كاميرا هيك فيجن 8MP",
            //           price: 145,
            //           pricetype: 100,
            //           cartnotes:
            //             "1- This is an estimated price for the job, the actual price will be shared by the professional depending upon the distance and complexity of the work\r\n2- The price displayed is for service only and it does not include price for any parts or materials required to perform the job",
            //           cartnotes_ar:
            //             "هذا هو السعر التقريبي للعمل ، سيتم تحديد السعر الحقيقي بواسطة المهني (مقدم الخدمة) على حسب المسافة وتعقيد العمل. \r\nالسعر المعروض هنا -فقط - للخدمة ولا يشمل السعر قيمة اي أجزاء أو مواد مطلوبه لأنجاز العمل.",
            //           carttype: 1,
            //           note:
            //             "Our professional will help\r\n- get your security camera system up and running right away.\r\n- choosing the right position to ensure a wider coverage area.\r\nAll prices are subjected to discount",
            //           note_ar:
            //             "سوف يساعدكم خبراؤنا في\r\n- تركيب نظام كاميرا الأمان وتشغيله على الفور.\r\n- اختيار الموضع الصحيح لضمان تغطية أوسع.\r\nكل الأسعار قابلة للتخفيض"
            //         }
            //       ]
            //     }
            //   ]
            // }
          ],
        };
        if (responseJson.error === false) {
          // console.log("responseJson.services.", responseJson.services);
          if (
            this.state.location ==
            "4994 King Fahd Rd, Al Muntazah, Al-Kharj 16439, Saudi Arabia"
          ) {
            let servicesArray = responseJson.services.filter((i) => {
              return (
                i.name !== "Gardening Services" ||
                i.name !== "Paint" ||
                i.name !== "Decor" ||
                i.name !== "Security Camera"
              );
            });
            this.setState(
              {
                categories: servicesArray,
                deals: responseJson.offers,
                visible: true,
                freshCategories: responseJson.services,
                products: responseJson.services[0].products,
                selectedCategoryId: responseJson.services[0].id,
                // findPoup: true
              },

              () => {
                // this._notificationSubscription = Notifications.addNotificationReceivedListener(
                //   this._handleNotification
                // );
                // this._notificationSubscriptionBackground = Notifications.addNotificationResponseReceivedListener(
                //   this._handleNotification
                // );

                setTimeout(() => {
                  this.setState({ loading: false });
                }, 650);
              }
            );
          } else {
            this.setState(
              {
                categories: responseJson.services,
                deals: responseJson.offers,
                freshCategories: responseJson.services,
                products: responseJson.services[0].products,
                selectedCategoryId: responseJson.services[0].id,
                // findPoup: true
              },

              () => {
                // this._notificationSubscription = Notifications.addNotificationReceivedListener(
                //   this._handleNotification
                // );
                // this._notificationSubscriptionBackground = Notifications.addNotificationResponseReceivedListener(
                //   this._handleNotification
                // );
                setTimeout(() => {
                  this.setState({ loading: false });
                }, 650);
              }
            );
          }
        } else {
          console.log("why in else");
          this.setState({ loading: false });
          // setTimeout(() => {
          //   this.setState({ loading: false });
          // }, 500);
          console.log("get categories success", response);
          await Analytics.logEvent("getCategoriesError_True", {
            getCategoriesError: response.toString(),
          });
        }
      })
      .catch(async (error) => {
        //console.log(error, "error");
        await Analytics.logEvent("getCategoriesError", {
          getCategoriesError: error.toString(),
        });
      });
    this.setState({ loading: false });
  };

  clearJobs = async () => {
    let jobs = await AsyncStorage.getItem("jobs");
    let user = await AsyncStorage.getItem("user");
    if (jobs == null) {
      this.setState({
        selectedServices: [],
        user: user !== null ? JSON.parse(user) : null,
      });
      this.getCategories();
    }
    let allJobs = JSON.parse(jobs);

    if (allJobs.length > 0) {
      this.state.categories.forEach((category) => {
        category.products.forEach((product) => {
          product.jobs.forEach((job) => {
            let index = allJobs.findIndex(
              (j) =>
                j.id == job.id && j.selected == true && job.selected == true
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
  navigationSetup = async (option) => {
    if (option == 4) {
      this.props.navigation.navigate("ProfileSecreen", {
        cartItem: this.state.selectedServices.length,
        lan: this.state.lan,
        location: this.state.location,
      });
    }
    if (option == 3) {
      if (this.state.selectedServices.length > 0) {
        // alert(
        //   "Dear Customer, To continue providing you with the best experience, we will be undergoing maintenance that may cause service interruption till 10th August 2021. We apologize for the inconvenience."
        // );
        this.props.navigation.navigate("MyCart", {
          lan: this.state.lan,
          isPackage: false,
          manualy: false,
        });
        await Analytics.logEvent("Cart", {
          name: "Cart",
          screen: "landingScreen",
          purpose: "checkout order from landing screen",
        });
      } else {
        Toast.show({
          text:
            this.state.lan == "en" ? "Your cart is empty" : "سلة الطلبات فارغة",
          position: "bottom",
        });
      }
    }
    if (option == 2) {
      this.props.navigation.navigate("MyOrders", {
        cartItem: this.state.selectedServices.length,
        lan: this.state.lan,
        location: this.state.location,
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
    // this.props.navigation.replace("LandingSecreen");
    // setTimeout(() => {
    //   Updates.reload();
    // }, 1000);
    await Updates.reloadAsync();
    //this.updateLanguage(1);
  };
  changetoArabic = async () => {
    await AsyncStorage.setItem("lan", "ar");
    I18nManager.isRTL = true;
    I18nManager.forceRTL(true);

    // this.props.navigation.replace("LandingSecreen");
    await Updates.reloadAsync();
    //this.updateLanguage(2);
  };
  componentWillUnmount() {}
  openPromotionScreen = async (index) => {
    console.log(" promotion screen ", this.state.dataSource[index]);
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
        url: this.state.dataSource[index].banner.url,
      });
      await Analytics.logEvent("PromotionalBanners", {
        name: "PromotionalBanners",
        screen: "landingScreen",
        purpose: "promotion banner clicked",
      });
    }
    if (
      this.state.dataSource[index].openCategory &&
      this.state.dataSource[index].openCategory == true
    ) {
      this.props.navigation.navigate("PromotionService", {
        serviceid: this.state.dataSource[index].categoryid,
        lan: this.state.lan,
      });
    }
  };
  consoleNotificationFirebase = async (notification) => {
    // let notificationId = "";
    // if (notification.data.customerid !== undefined) {
    //   notificationId =
    //     notification.notificationId.toString() +
    //     "," +
    //     notification.data.customerid.toString();
    // } else {
    //   notificationId = notification.notificationId.toString;
    // }
    if (notification.request.content.data) {
      await Analytics.logEvent("notificationRecieved", {
        notificationRecieved:
          "notification valid" + this.state.user?.name.toString(),
      })
        .then((response) => {
          console.log("success firebase analytics  ", response);
        })
        .catch((error) => {
          console.log("ERRor firebase analytics  ", error);
        });
    } else {
      await Analytics.logEvent("notificationRecieved", {
        notificationRecieved:
          "notification Not valid" + this.state.user?.name.toString(),
      })
        .then((response) => {
          console.log("success firebase analytics  ", response);
        })
        .catch((error) => {
          console.log("ERRor firebase analytics  ", error);
        });
      await Analytics.logEvent("notificationRecieved_error", {
        notificationRecieved_error:
          "notification Not valid" + this.state.user?.name.toString(),
      })
        .then((response) => {
          console.log("success firebase analytics  ", response);
        })
        .catch((error) => {
          console.log("ERRor firebase analytics  ", error);
        });
    }
  };

  _handleNotification = async (notification) => {
    console.log("notifications recieved ", notification);
    // console.log("notifications > data  ", notification.request.content.data);
    // console.log("notifications > job  ", notification.request.content.data.job);
    // let parseData = JSON.parse(notification);
    // console.log("parseData ", parseData);
    if (
      notification.request.content.data
      // notification.origin === "received" ||
      // notification.origin === "selected"
    ) {
      this.consoleNotificationFirebase(notification);
      if (notification.request.content.data.isPromoted) {
        this.props.navigation.navigate("Promotion", {
          isNotification: true,
          job: notification.request.content.data.job,
          lan: this.state.lan,
          url:
            this.state.lan == "en"
              ? notification.request.content.data.bannerUrl
              : notification.request.content.data.bannerUrl_ar,
        });
      } else if (notification.request.content.data.isOffer) {
        this.props.navigation.navigate("PackageOffer", {
          lan: this.state.lan,
          offerid: notification.request.content.data.offerId,
          isOffer: notification.request.content.data.isOffer,
        });
      } else if (notification.request.content.data.is_point_screen == "true") {
        this.props.navigation.navigate("PointsScreen", {
          lan: this.state.lan,
        });
      } else if (notification.request.content.data.serviceid) {
        this.props.navigation.navigate("PromotionService", {
          serviceid: notification.request.content.data.serviceid,
          lan: this.state.lan,
        });
      } else if (notification.request.content.data.statusid == 5) {
        await AsyncStorage.setItem(
          "PopUp_Feedback",
          JSON.stringify(notification.request.content.data)
        );
        this.props.navigation.navigate("OrderDetails", {
          order: notification.request.content.data,
          lan: this.state.lan,
          user: this.state.user,
          isHistory:
            notification.request.content.data.statusid == 5 ? true : false,
          isFeedback: true,
        });
      } else if (notification.request.content.data.statusid == 2) {
        this.props.navigation.navigate("PromotionService", {
          serviceid: notification.request.content.data.serviceid,
          lan: this.state.lan,
        });
      } else if (notification.request.content.data.statusid) {
        this.props.navigation.navigate("PromotionService", {
          serviceid: notification.request.content.data.serviceid,
          lan: this.state.lan,
        });
        // Add condition for promotion
      } else {
        this.props.navigation.navigate("LandingSecreen", {
          order: notification.request.content.data,
          lan: this.state.lan,
          user: this.state.user,
          isHistory:
            notification.request.content.data.statusid == 5 ? true : false,
          isFeedback: true,
        });
      }
    } else {
      //   Alert.alert(
      //     "invalid data",
      //     "data not valid" +
      //       JSON.stringify(notification)[
      //         {
      //           text: "Ok",
      //           onPress: () => {}
      //         }
      //       ]
      //   );
      //
    }
  };
  render() {
    const portion = Dimensions.get("screen").width / 4;

    return (
      <Container style={{ marginTop: StatusBar.height }}>
        <StatusBar
          barStyle={Platform.OS == "ios" ? "dark-content" : "default"}
          // backgroundColor={Platform.OS == "ios" ? "transparent" : "blue"}
        />
        {/* <FindPoup
          visible={this.state.findPoup}
          lan={this.state.lan}
          setPopupfalse={() => {
            this.setState({ findPoup: false, orderPopup: true });
          }}
        />
        <OrderPopup
          visible={this.state.orderPopup}
          lan={this.state.lan}
          setPopupfalse={() => {
            this.setState({ orderPopup: false });
          }}
        /> */}
        <AllVideos
          visible={this.state.popup}
          lan={this.state.lan}
          selectedItem={0}
          openVideoPlayer={(index) => {
            this.setState({
              videoSelected: index,
              popup: false,
              videoPopup: true,
            });
          }}
          setPopupfalse={() => {
            this.setState({ popup: false });
          }}
        />
        <VideoPlayerPopup
          visible={this.state.videoPopup}
          lan={this.state.lan}
          selectedItem={this.state.videoSelected}
          setPopupfalse={() => {
            this.setState({ videoPopup: false });
          }}
        />
        <View
          style={{
            backgroundColor: "white",
            //marginTop: Constants.statusBarHeight,
            marginBottom: 110,
          }}
        >
          {
            <NavigationEvents
              onWillFocus={() => {
                this.clearJobs();
              }}
            />
          }

          <View>
            <View
              style={{
                width: Dimensions.get("screen").width - 35,
                alignSelf: "center",
                borderTopWidth: 0,
                borderBottomWidth: 2,
                borderColor: "#0764af",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: portion,
                  height: 50,
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-start",
                    justifyContent: "center",
                    flex: 2,
                  }}
                >
                  {this.state.lan == "en" ? (
                    <Text
                      style={{
                        color: "#0764af",
                        fontSize: 16,
                        fontFamily: "montserrat_semi_blod",
                      }}
                    >
                      {this.state.location}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        color: "#0764af",
                        fontSize: 16,
                        alignSelf: "flex-end",
                      }}
                    >
                      {this.state.location}
                    </Text>
                  )}
                </View>
              </View>

              {/* <TouchableOpacity onPress={this.openChat}>
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
                        style={{ width: 25, height: 25 }}
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity> */}
              <View
                style={{
                  width: portion,
                  flexDirection: "row",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity onPress={this.openChat}>
                  <Image
                    source={require("../assets/Help-min.png")}
                    style={{ width: 25, height: 25 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={this.switchLanguage}>
                <View
                  style={{
                    alignSelf: "flex-end",
                    justifyContent: "center",
                    flex: 2,
                    width: portion,
                  }}
                >
                  <Text
                    style={{
                      color: "#0764af",
                      fontSize: 16,
                      textAlign: "right",
                      fontFamily: "montserrat_arabic_regular",
                    }}
                  >
                    {this.state.lan == "en" ? "العربية" : "English"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Animated.ScrollView
            ref={(s) => (this._anScrollView = s)}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.nScroll } } }],
              { useNativeDriver: true }
            )}
            style={{ zIndex: 0 }}
          >
            <View style={{ marginTop: 15, borderRadius: 20 }}>
              <SliderBox
                images={this.state.lan == "en" ? AcBanners : AcBanners_ar}
                // images={this.state.offersUrls}
                sliderBoxHeight={153}
                ImageComponentStyle={{
                  width: "100%",
                }}
                onCurrentImagePressed={(index) =>
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
                width: Dimensions.get("screen").width - 35,
                alignSelf: "center",
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
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <Animated.View
              style={{
                zIndex: 1,
                transform: [{ translateY: this.tabY }],
                zIndex: 1,
                width: "100%",
                backgroundColor: "white",
                width: Dimensions.get("screen").width - 35,
                alignSelf: "center",
                height: 105,
              }}
            >
              <Animated.FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.categories}
                renderItem={({ item, index }) => (
                  <CategoryCard
                    category={item}
                    lan={this.state.lan}
                    categorySelection={this.categorySelection}
                    selectedCategoryId={this.state.selectedCategoryId}
                    location={this.state.location}
                    openVideoPopup={(item) => {
                      console.log(item, "item");
                      this.setState({ videoSelected: item }, () =>
                        this.setState({ videoPopup: true })
                      );
                    }}
                    item={index}
                  />
                )}
                keyExtractor={(item) => item.id}
              />
            </Animated.View>
            {/* <Animated.View
              style={{
                zIndex: 1,
                transform: [{ translateY: this.tabY }],
                zIndex: 1,
                width: "100%",
                backgroundColor: "white",
                width: Dimensions.get("screen").width - 35,
                alignSelf: "center",
                height: 48
              }}
            >
              <Animated.FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={this.state.categories}
                renderItem={({ item }) => (
                  // <CategoryCard
                  //   category={item}
                  //   lan={this.state.lan}
                  //   categorySelection={this.categorySelection}
                  //   selectedCategoryId={this.state.selectedCategoryId}
                  //   location={this.state.location}
                  // />
                  <View style={{
                    alignSelf: "flex-start",
                    width: wp(25),
                    height:hp(2),
                    paddingTop:12
                  }}>
                  <Image
                    style={{
                      alignSelf: "center",
                      width: wp(16),
                      height:hp(2),
                      
                    }}
                    resizeMode="contain"
                    source={require("../assets/Services-Icons-min.png")}
                  />
                  </View>
                )}
                keyExtractor={item => item.id}
              />
            </Animated.View> */}

            <View style={{ marginTop: 10, marginBottom: 12 }}>
              <Accordion
                style={{ borderWidth: 0 }}
                ref={(c) => (this._accordion = c)}
                dataArray={this.state.products}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
              />
            </View>
          </Animated.ScrollView>
        </View>
        {/* <Animated.View
          style={{
            height: 100,
            width: 100,
            right: 10,
            bottom: 70,
            position: "absolute",
            justifyContent: "center"
          }}
        >
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate("GroomingServices")}
          >
            <Image
              style={{
                height: 100,
                width: 100,
              }}
              source={
                this.state.lan == "en"
                  ? require("../assets/Salon-Services-Button.gif")
                  : require("../assets/Salon-ServicesArabic.gif")
              }
              resizeMode="contain"
            />
          </TouchableOpacity> */}
        {/* </Animated.View>  */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignSelf: "center",
              justifyContent: "space-between",
              margin: 12,
              width: Dimensions.get("screen").width - 35,
            }}
          >
            <View>
              <View style={{ alignSelf: "center" }}>
                <Ionicons name="md-apps" size={28} color={"#0865b0"} />
              </View>
              <Text
                style={{ textAlign: "center", fontSize: 12, color: "#0865b0" }}
              >
                {this.state.lan === "en" ? "Categories" : "فئات الخدمات"}
              </Text>
            </View>
            <TouchableOpacity onPress={() => this.navigationSetup(2)}>
              <View>
                <View style={{ alignSelf: "center" }}>
                  <Image
                    resizeMode="contain"
                    source={require("../assets/myOrder.png")}
                    style={{ height: 29, width: 35 }}
                  />
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
                  <Ionicons name="md-cart" size={28} color={"#ccc"} />
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
                          position: "absolute",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 10,

                            justifyContent: "center",
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
                      size={28}
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
                          backgroundColor: "red",
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
