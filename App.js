// import { AppLoading, SplashScreen } from "expo";
// "enabled":false
// https://fnd.io/#/pk/search?mediaType=all&term=Google
// https://theappstore.org/

// defaults:
// "updates": {
//   "fallbackToCacheTimeout": 290000 > how to increase
// },

import {
  AsyncStorage,
  Dimensions,
  I18nManager,
  Image,
  Platform,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
} from "react-native";
import * as Updates from "expo-updates";
import * as Notifications from "expo-notifications";
import React, { useState } from "react";
import * as Analytics from "expo-firebase-analytics";
import AppNavigator from "./appNavigator";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { Root } from "native-base";
import * as firebase from "firebase";
console.disableYellowBox = true;
import * as SplashScreen from "expo-splash-screen";
import * as Permissions from "expo-permissions";
//import messaging from "@react-native-firebase/messaging";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isSplashReady: false,
      isAppReady: false,
      lan: "en",
      isUpdateAvailable: false,
    };
    this.checkLangugae();
  }
  checkLangugae = async () => {
    let lan = await AsyncStorage.getItem("lan");
    console.log("lan in check functionr ", lan);
    this.setState({ lan: lan !== null ? lan : "en" });
    if (lan) {
      if (lan !== "en") {
        I18nManager.isRTL = true;
        I18nManager.forceRTL(true);
      } else {
        I18nManager.isRTL = false;
        I18nManager.forceRTL(false);
      }
    }
    this.firebaseConfig();
    if (lan !== null && lan !== "") {
      return lan;
    } else {
      return "en";
    }
  };

  _cacheSplashResourcesAsync = async () => {
    const gif = require("./assets/splash1.gif");
    const gif2 = require("./assets/splash-ar1.gif");
    Asset.fromModule(gif2).downloadAsync();
    return Asset.fromModule(gif).downloadAsync();
  };
  firebaseConfig() {
    let firebaseConfig = {
      apiKey: "AIzaSyA4be4vwXO-Zn5IYcxA-trViY3j6LtODjg",
      authDomain: "foren-se-customers.firebaseapp.com",
      databaseURL: "https://foren-se-customers.firebaseio.com",
      projectId: "foren-se-customers",
      storageBucket: "foren-se-customers.appspot.com",
      messagingSenderId: "200064457252",
      appId: "1:200064457252:web:7ec8aa4d569aac16b156b1",
      measurementId: "G-VFK8LKML45",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // firebase.Analytics();
  }

  _cacheResourcesAsync = async () => {
    await Asset.loadAsync([
      require("./assets/icon.png"),
      require("./assets/Profile-Image.png"),
      require("./assets/Help-min.png"),
      require("./assets/Job-Icon-min.png"),
    ]),
      await Expo.Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        montserrat_semi_blod: require("./assets/Fonts/English/Montserrat-SemiBold.otf"),
        montserrat_medium: require("./assets/Fonts/English/Montserrat-Medium.otf"),
        montserrat_arabic_regular: require("./assets/Fonts/Arabic/ArbFONTS-Montserrat-Arabic-Regular.ttf"),
      });

    loadApp = () => {
      this.setState({ isAppReady: true });
    };
    setTimeout(
      function () {
        this.loadApp();
      },
      Platform.OS === "android" ? 1800 : 2500
    );
  };

  componentDidMount = async () => {
    //Prevent native splash screen from autohiding
    // this.requestPermission();
    Updates.checkForUpdateAsync().then((update) => {
      if (update.isAvailable) {
        this.setState({ isUpdateAvailable: true });
        updateDownload = () => {
          Updates.reload();
        };
        setTimeout(function () {
          this.updateDownload();
        }, 5000);
      }
    });
    // const token = (await Notifications.getDevicePushTokenAsync()).data;
    // console.log("token in did mount ", token);
    // this.enablePushNotifications();
    // try {
    //   await SplashScreen.preventAutoHideAsync();
    // } catch (e) {
    //   console.log("error splash auto hiding ", e);
    // }
    Analytics.setDebugModeEnabled(true);
    if (Platform.OS === "android") {
      await Notifications.createChannelAndroidAsync("order-status", {
        name: "order",
        sound: true,
      });
    }

    Notifications.setBadgeNumberAsync(0);
  };

  render() {
    // if (!this.state.isSplashReady) {
    //   return (
    //     <AppLoading
    //       startAsync={this._cacheSplashResourcesAsync}
    //       onFinish={() => this.setState({ isSplashReady: true })}

    //     />
    //   );
    // }
    if (this.state.isUpdateAvailable === true) {
      return (
        <Image
          style={{
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
          }}
          source={require("./assets/updating.gif")}
          resizeMode="contain"
        />
      );
    }
    if (!this.state.isAppReady && !this.state.isUpdateAvailable) {
      this._cacheResourcesAsync();
      // return null;
      if (this.state.lan === "en") {
        return (
          <Image
            style={{
              height: Dimensions.get("window").height,
              width: Dimensions.get("window").width,
            }}
            source={require("./assets/splash1.gif")}
            resizeMode="contain"
            onLoadStart={this._cacheResourcesAsync}
          />
        );
      } else {
        return (
          <Image
            style={{
              height: Dimensions.get("window").height,
              width: Dimensions.get("window").width,
            }}
            source={require("./assets/splash-ar1.gif")}
            resizeMode="contain"
            onLoadStart={this._cacheResourcesAsync}
          />
        );
      }
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Root>
          <AppNavigator lan={this.state.lan} />
        </Root>
      </SafeAreaView>
    );
  }
  registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;
    if (finalStatus !== "granted") {
      console.log("permissions not granted ", finalStatus);
    } else {
      let token = await Notifications.getExpoPushTokenAsync();
      console.log(" push notifications token ", token);
    }
  };
  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return false;
    }
    return true;
  };

  registerForPushNotifications = async () => {
    const enabled = await this.askPermissions();
    if (!enabled) {
      return Promise.resolve();
    }
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    return token;
  };
  enablePushNotifications = async () => {
    let token = await this.registerForPushNotifications();
    if (token) {
      console.log("token ", token);

      // this.setState({ token });
    }
  };
}
