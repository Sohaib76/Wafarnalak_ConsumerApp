import React from "react";
import { Platform, AsyncStorage, Alert } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import LandingSecreen from "../screens/landingScreen";
import MyOrdersSecreen from "../screens/myOrders";
import ProfileSecreen from "../screens/profileScreen";
import TabBarIcon from "../screens/tabBarIcon";
import OrderSummaryScreen from "../screens/orderSummaryScreen";

let categoriesStack = createStackNavigator(
  {
    Categories: LandingSecreen
  },
  {
    headerMode: "none"
  }
);
let myOrdersStack = createStackNavigator(
  {
    MyOrders: MyOrdersSecreen
  },
  {
    headerMode: "none"
  }
);

let profileStack = createStackNavigator(
  {
    Profile: ProfileSecreen
  },
  {
    headerMode: "none"
  }
);

let myCartStack = createStackNavigator(
  {
    myCart: OrderSummaryScreen
  },
  {
    headerMode: "none"
  }
);
AsyncStorage.getItem("lan").then(lan => {
  categoriesStack.navigationOptions = {
    tabBarOptions: {
      activeTintColor: "#0F2271",
      flexDirection: "row-reverse",
      labelStyle: {
        fontFamily: lan === "ar" ? "montserrat_arabic_regular" : "Roboto"
      }
    },
    tabBarLabel: lan === "en" || lan === null ? "Categories" : "فئات الخدمات",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === "ios" ? `md-apps` : "md-apps"}
      />
    )
  };

  categoriesStack.path = "Catagories";

  myCartStack.navigationOptions = {
    tabBarOptions: {
      activeTintColor: "#0F2271",
      flexDirection: "row-reverse",
      labelStyle: {
        fontFamily: lan === "ar" ? "montserrat_arabic_regular" : "Roboto"
      }
    },
    tabBarLabel: lan === "en" || lan === null ? "My Cart" : "فئات الخدمات",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === "ios" ? `md-cart` : "md-cart"}
      />
    )
  };
  myCartStack.path = "myCart";

  myOrdersStack.navigationOptions = {
    tabBarOptions: {
      activeTintColor: "#0F2271",
      labelStyle: {
        fontFamily: lan === "ar" ? "montserrat_arabic_regular" : "Roboto"
      }
    },
    tabBarLabel: lan === "en" || lan === null ? "My Orders" : "طلباتي",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === "ios" ? "ios-list-box" : "ios-list-box"}
      />
    )
  };

  myOrdersStack.path = "MyOrders";

  profileStack.navigationOptions = {
    tabBarOptions: {
      activeTintColor: "#0F2271",
      labelStyle: {
        fontFamily: lan === "ar" ? "montserrat_arabic_regular" : "Roboto"
      }
    },

    tabBarLabel: lan === "en" || lan === null ? "More" : "ملفي الشخصي",
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === "ios" ? "ios-more" : "ios-more"}
      />
    )
  };

  profileStack.path = "Profile";
});

const tabNavigator = createBottomTabNavigator({
  categoriesStack,
  myOrdersStack,
  myCartStack,
  profileStack
});

export default tabNavigator;
