import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./screens/loginscreen";
import OrderSummaryScreen from "./screens/orderSummaryScreen";
import PromotionService from "./screens/promotionServices";
import ProfileSecreen from "./screens/profileScreen";
import BookingProfileScreen from "./screens/BookingProfileScreen";

import MyOrdersSecreen from "./screens/myOrders";
import OrderDetailsSecreen from "./screens/orders/orderDetails/orderDetails";
import ComplaintTypesScreen from "./screens/orders/complaint/complaint-types";
import ComplaintFormScreen from "./screens/orders/complaint/complaint-form";
import AboutScreen from "./screens/myProfile/about";
import HelpScreen from "./screens/myProfile/help";
import ReferralScreen from "./screens/myProfile/referral";
import ProfileUpdateScreen from "./screens/myProfile/profileUpdate";
import LandingSecreen from "./screens/landingScreen";
import GroomingServices from "./screens/GroomingServices";
import PointsScreen from "./screens/myProfile/points";
import GoogleMapScreen from "./screens/address/mapScreen";
import Promotion from "./screens/promotions/promotion";
import PackageOfferScreen from "./screens/packageOffer";
import SalonsLanding from "./screens/SalonsLanding";
import MyBookings from "./screens/MyBookings";
import OrderStatus from "./screens/OrderStatus";
import SalonLogin from "./screens/SalonLogin";
import Switching from "./screens/Switching";
import SalonBookingDetail from "./screens/SalonBookingDetail";
import SalonHistoryTab from "./screens/SalonHistoryTab";
import SalonLocation from "./screens/address/SalonLocation";
import Splash from "./screens/Splash";
import Chat from "./screens/Chat";
import CameraComponent from "./screens/Common/Camera";
import MapDirections from "./screens/Common/MapDirections";
import Login from "./screens/Login";
const profileNavigator = createStackNavigator(
  {
    Splash: { screen: Splash },
    CameraComponent: { screen: CameraComponent },
    SalonsLanding: { screen: SalonsLanding },
    MapDirections: { screen: MapDirections },
    SalonsLandingMap: { screen: SalonLocation },
    MyBookings: { screen: MyBookings },
    OrderStatus: { screen: OrderStatus },
    SalonLogin: { screen: SalonLogin },
    Switching: { screen: Switching },
    SalonHistoryTab: { screen: SalonHistoryTab },
    Login: { screen: LoginScreen },
    MyCart: { screen: OrderSummaryScreen },
    PromotionService: { screen: PromotionService },
    ProfileSecreen: { screen: ProfileSecreen },
    MyOrders: { screen: MyOrdersSecreen },
    Promotion: { screen: Promotion },
    LandingSecreen: { screen: LandingSecreen },
    OrderDetails: { screen: OrderDetailsSecreen },
    ComplaintTypes: { screen: ComplaintTypesScreen },
    ComplaintForm: { screen: ComplaintFormScreen },
    AboutScreen: { screen: AboutScreen },
    HelpScreen: { screen: HelpScreen },
    GoogleMapScreen: { screen: GoogleMapScreen },
    ReferralScreen: { screen: ReferralScreen },
    ProfileUpdate: { screen: ProfileUpdateScreen },
    PointsScreen: { screen: PointsScreen },
    PackageOffer: { screen: PackageOfferScreen },
    GroomingServices: { screen: GroomingServices },
    SalonBookingDetail: { screen: SalonBookingDetail },
    BookingProfileScreen: { screen: BookingProfileScreen },
    Chat: { screen: Chat },
    // Login: { screen: Login },
  },
  {
    initialRouteName: "LandingSecreen",
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
  }
);

const AppNavigator = createAppContainer(profileNavigator, {
  headerMode: "none",
});

export default AppNavigator;
