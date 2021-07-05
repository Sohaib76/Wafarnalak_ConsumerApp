// import React from "react";
// import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0

// import Fire from "./Fire";

// type Props = {
//   name?: string
// };

// class Chat extends React.Component<Props> {
//   static navigationOptions = ({ navigation }) => ({
//     title: (navigation.state.params || {}).name || "Chat!"
//   });

//   state = {
//     messages: []
//   };

//   get user() {
//     return {
//       name: this.props.navigation.state.params.name,
//       _id: "12"
//       // _id: Fire.shared.uid,
//     };
//   }

//   render() {
//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={Fire.shared.send}
//         user={this.user}
//       />
//     );
//   }

//   componentDidMount() {
//     Fire.shared.on(message =>
//       this.setState(previousState => ({
//         messages: GiftedChat.append(previousState.messages, message)
//       }))
//     );
//   }
//   componentWillUnmount() {
//     Fire.shared.off();
//   }
// }

// export default Chat;
import React, { useState, useCallback, useEffect } from "react";
import {
  GiftedChat,
  InputToolbar,
  Bubble,
  Send,
} from "react-native-gifted-chat";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  AsyncStorage,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import Fire from "./Fire";
import Ionicons from "react-native-vector-icons/Ionicons";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import CameraComponent from "./Common/Camera";
const recordingSettings = {
  android: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: ".m4a",
    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MIN,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};
const { width, height } = Dimensions.get("screen");
const SPACING = (height / width) * 9;
const AVATAR_SIZE = (height / width) * 40;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
import MessageView from "./CustomMessageView/MessageView";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore();
// import firebase from "firebase/app";
// import "firebase/storage";
// import * as firebase from "firebase";
db.settings({ experimentalForceLongPolling: true });
import { IMAGES } from "../assets/Images";
import Popup from "./Common/Popup";
import { Audio } from "expo-av";
import BookingDetailHeader from "./Common/BookingDetailHeader";
import * as ImagePicker from "expo-image-picker";
import VideoPlayerPopup from "./CustomMessageView/videoPlayerPopup";
import * as Permissions from "expo-permissions";
import * as DocumentPicker from "expo-document-picker";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { AntDesign } from "@expo/vector-icons";
const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [lan, setlan] = useState("en");
  const [isTyping, setisTyping] = useState(false);
  const [popupVisible, setpopupVisible] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [playAudio, setPlayAudio] = useState(false);

  const [videoSource, setvideoSource] = useState("");
  const [VideoPopup, setVideoPopup] = useState(false);
  const [query, setQuery] = useState("desc");
  useEffect(() => {
    console.log(
      "user ",
      props.navigation.state.params.user.customerid.toString()
    );

    // props.navigation.state.params.noGoBackLogin
    getLan();
    getGalleryPermissions();
    let temp = [];

    ////////////

    /////////

    db.collection(
      "-1" + props.navigation.state.params.user.customerid.toString()
    )
      .orderBy("timestamp") // ,query
      .onSnapshot(
        (snapshot) => {
          // setQuery('asc')
          snapshot.docChanges().forEach((change) => {
            console.log("message recieved real time ", change.doc.data());
            const { key: _id } = change;
            if (change.doc.data().type == "text") {
              const msg = {
                _id: change.doc.data()._id,
                timestamp: change.doc.data().createdAt,
                text: change.doc.data().text,
                user: change.doc.data().user,
                senderId: change.doc.data().senderId,
                receiverId: change.doc.data().receiverId,
                senderMobile: change.doc.data().senderMobile,
                createdAt: change.doc.data().createdAt,
                type: change.doc.data().type,
              };
              if (msg.user._id == -1) {
                msg.user.avatar = require("../assets/Profile2-min.png");
              } else {
                msg.user.avatar = require("../assets/Profile1-min.png");
              }
              setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, msg)
              );
            } else if (change.doc.data().type == "image") {
              const msg = {
                _id: change.doc.data()._id,
                timestamp: change.doc.data().createdAt,
                text: change.doc.data().text,
                user: change.doc.data().user,
                senderId: change.doc.data().senderId,
                receiverId: change.doc.data().receiverId,
                senderMobile: change.doc.data().senderMobile,
                createdAt: change.doc.data().createdAt,
                image: change.doc.data().image,
                type: change.doc.data().type,
              };
              if (msg.user._id == -1) {
                msg.user.avatar = require("../assets/Profile2-min.png");
              } else {
                msg.user.avatar = require("../assets/Profile1-min.png");
              }
              setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, msg)
              );
            } else if (change.doc.data().type == "audio") {
              const msg = {
                _id: change.doc.data()._id,
                timestamp: change.doc.data().createdAt,
                text: change.doc.data().text,
                user: change.doc.data().user,
                senderId: change.doc.data().senderId,
                receiverId: change.doc.data().receiverId,
                senderMobile: change.doc.data().senderMobile,
                createdAt: change.doc.data().createdAt,
                uri: change.doc.data().uri,
                type: change.doc.data().type,
              };
              if (msg.user._id == -1) {
                msg.user.avatar = require("../assets/Profile2-min.png");
              } else {
                msg.user.avatar = require("../assets/Profile1-min.png");
              }
              setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, msg)
              );
            } else if (change.doc.data().type == "location") {
              const msg = {
                _id: change.doc.data()._id,
                timestamp: change.doc.data().createdAt,
                text: change.doc.data().text,
                user: change.doc.data().user,
                senderId: change.doc.data().senderId,
                receiverId: change.doc.data().receiverId,
                senderMobile: change.doc.data().senderMobile,
                createdAt: change.doc.data().createdAt,
                location: change.doc.data().location,
                type: change.doc.data().type,
              };
              if (msg.user._id == -1) {
                msg.user.avatar = require("../assets/Profile2-min.png");
              } else {
                msg.user.avatar = require("../assets/Profile1-min.png");
              }
              setMessages((previousMessages) =>
                GiftedChat.append(previousMessages, msg)
              );
            }
          });
          // setMessages(temp);
        },
        (error) => {
          //...
        }
      );

    // db.collection(
    //   "-1" + props.navigation.state.params.user.customerid.toString()
    // )
    //   // .orderBy('timestamp', 'asc')
    //   .onSnapshot(snapshot => {
    //     snapshot.docChanges().forEach(change => {
    //      // console.log("message recieved real time ", change.doc.data());
    //       if (change.doc.data().type) {
    //         const { key: _id } = change;
    //         if (change.doc.data().type == "text") {
    //           const msg = {
    //             _id: change.doc.data()._id,
    //             timestamp: change.doc.data().createdAt,
    //             text: change.doc.data().text,
    //             user: change.doc.data().user,
    //             senderId: change.doc.data().senderId,
    //             receiverId: change.doc.data().receiverId,
    //             senderMobile: change.doc.data().senderMobile,
    //             createdAt: change.doc.data().createdAt
    //           };
    //           if (msg.user._id == -1) {
    //             msg.user.avatar = require("../assets/Profile2-min.png");
    //           } else {
    //             msg.user.avatar = require("../assets/Profile1-min.png");
    //           }
    //           temp.push(msg);
    //         } else if (change.doc.data().type == "image") {
    //           const msg = {
    //             _id: change.doc.data()._id,
    //             timestamp: change.doc.data().createdAt,
    //             text: change.doc.data().text,
    //             user: change.doc.data().user,
    //             senderId: change.doc.data().senderId,
    //             receiverId: change.doc.data().receiverId,
    //             senderMobile: change.doc.data().senderMobile,
    //             createdAt: change.doc.data().createdAt,
    //             image: change.doc.data().image
    //           };
    //           if (msg.user._id == -1) {
    //             msg.user.avatar = require("../assets/Profile2-min.png");
    //           } else {
    //             msg.user.avatar = require("../assets/Profile1-min.png");
    //           }
    //           temp.push(msg);
    //         } else if (change.doc.data().type == "audio") {
    //           const msg = {
    //             _id: change.doc.data()._id,
    //             timestamp: change.doc.data().createdAt,
    //             text: change.doc.data().text,
    //             user: change.doc.data().user,
    //             senderId: change.doc.data().senderId,
    //             receiverId: change.doc.data().receiverId,
    //             senderMobile: change.doc.data().senderMobile,
    //             createdAt: change.doc.data().createdAt,
    //             uri: change.doc.data().uri
    //           };
    //           if (msg.user._id == -1) {
    //             msg.user.avatar = require("../assets/Profile2-min.png");
    //           } else {
    //             msg.user.avatar = require("../assets/Profile1-min.png");
    //           }
    //           temp.push(msg);
    //         }
    //         //  console.log('message listened in document ', msg);

    //         // setMessages(previousMessages =>
    //         //   GiftedChat.append(previousMessages, msg)
    //         // );
    //       }
    //     });

    //     // setMessages(temp);
    //   }, (error) => {
    //       console.log('error in firebase listening',error)
    //   });

    //   setMessages(temp);

    let d = new Date();
    let created = d.toISOString();

    // const help_msg = {
    //   _id: "21a9a5ff-caf0-4dfa-b999-366cc888e094",
    //   createdAt: created, // "2021-04-15T10:17:45.079Z"
    //   receiverId: "12",
    //   senderId: "-1",
    //   senderMobile: "0568600000000",
    //   text: "Welcome , How we may help you?",
    //   timestamp: created,
    //   type: "text",
    //   user: {
    //     _id: -1,
    //     avatar: 6,
    //     name: "Wafarnalak",
    //     // avatar: require("../assets/Profile2-min.png"), //Wafarnalk logo
    //   },
    // };

    // help_msg.user.avatar = require("../assets/Profile2-min.png"); //Wafarnalk logo

    // console.log("Help:", help_msg);

    // const help = {
    //   _id: 0,
    //   text: "Welcome.",
    //   createdAt: new Date().getTime().toString(),
    //   system: true,
    // };

    // setWelcome();

    //setMessages((oldArray) => console.log(oldArray));

    var newArr2 = {
      _id: 1,
      text: "Welcome to Wafarnalak Help care. How can we help you?",
      createdAt: new Date(),
      user: {
        _id: -1,
        name: "Wafarnalak",
        avatar: require("../assets/Profile2-min.png"),
      },
    };

    var delayInMilliseconds = 2000; //1 second

    setTimeout(function () {
      //your code to be executed after 1 second
      setMessages((oldArray) => [newArr2, ...oldArray]);

      console.log(messages, "End");
    }, delayInMilliseconds);

    // var delayInMillisecond = 1000; //1 second

    // setTimeout(function () {
    //   //your code to be executed after 1 second

    //   console.log(messages, "End");
    // }, delayInMillisecond);

    console.log(new Date().getTime().toString());
  }, [props.navigation]);

  //useEffect(() => {
  //   const setWelcome = async () => {
  //     var newArr2 = {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: -1,
  //         name: "Wafarnalak",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     };
  //     console.log("on send call ", newArr2);
  //     //Fire.shared.send(newArr2);

  //     // await setMessages((prev) => GiftedChat.append(prev, newArr2));

  //     // await setMessages(newArr2);

  //     setMessages((oldArray) => [...oldArray, newArr2]);

  //     //alert(messages);
  //     console.log("Messages", messages);

  //     // alert(GiftedChat);
  //   };

  //   setWelcome();
  // }, [messages]);

  const getGalleryPermissions = async () => {
    // const { stat } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  const takePicture = async () => {
    console.log("hello");
    props.navigation.navigate("CameraComponent", {
      // onGoBack: sendImageMessage
      onGoBack: uploadImagetofirebaseConsole,
    });
    // return <CameraComponent />;
  };
  const uploadImagetofirebaseConsole = async (image) => {
    console.log("hello", image); //image.uri
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true); //image.uri
      xhr.send(null);
    });
    let d = new Date();
    let current_time = d.toISOString();
    const ref = firebase.storage().ref("/chatImages").child(current_time);
    const snapshot = ref.put(blob);
    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        console.log("success");
      },
      (error) => {
        console.log("error", error);
      },
      () => {
        snapshot.snapshot.ref
          .getDownloadURL()
          .then((url) => {
            console.log("url", url);
            sendImageMessage(url);
            blob.close();
          })
          .catch((e) => {
            console.log("erreo", e);
          });
      }
    );
    // firebase
    //   .storage()
    //   .ref("image123")
    //   .put(image.uri)
    //   .then(snapshot => {
    //     //You can check the image is now uploaded in the storage bucket
    //     console.log("uploaded");
    //   })
    //   .catch(e => console.log("uploading image error => ", e));
  };
  const sendImageMessage = useCallback(async (path) => {
    let id = await messageIdGenerator();
    console.log("id > ", id);
    let msg = [
      {
        _id: id,
        createdAt: new Date().getTime(),
        receiverId: "-1",
        senderId: props.navigation.state.params.user.customerid.toString(),
        senderMobile: props.navigation.state.params.user.mobile,
        text: "",
        timestamp: new Date().getTime(),
        image: path,
        type: "image",
        user: {
          _id: props.navigation.state.params.user.customerid,
          name: props.navigation.state.params.user.name,
          avatar: require("../assets/Profile1-min.png"),
        },
      },
    ];
    console.log("new msg ", msg);
    Fire.shared.send(msg);
  });
  const onSend = useCallback(
    (messages = []) => {
      // setisTyping(true);

      var newArr2 = messages.map((v) => ({
        ...v,
        senderId: props.navigation.state.params.user.customerid.toString(),
        receiverId: "-1",
        senderMobile: props.navigation.state.params.user.mobile,
        type: "text",
      }));
      console.log("on send call ", newArr2);
      Fire.shared.send(newArr2);
      // var newArr2 = messages.map(v => ({
      //   ...v,
      //   sent: true,
      //   received: true,
      //   pending: false
      // }));
      // setMessages(previousMessages =>
      //   GiftedChat.append(previousMessages, newArr2)
      // );
    },
    [props.navigation]
  );
  async function startRecording() {
    if (sound !== null) {
      await sound.unloadAsync();
      sound.setOnPlaybackStatusUpdate(null);
      setSound(null);
    }

    console.log("Requesting permissions..");
    await Audio.requestPermissionsAsync();

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const _recording = new Audio.Recording();
    try {
      await _recording.prepareToRecordAsync(recordingSettings);
      setRecording(_recording);
      await _recording.startAsync();
      console.log("recording");
      setIsRecording(true);
    } catch (error) {
      console.log("error while recording:", error);
    }
    // try {
    //   console.log("Requesting permissions..");
    //   await Audio.requestPermissionsAsync();
    //   await Audio.setAudioModeAsync({
    //     allowsRecordingIOS: true,
    //     interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
    //     playsInSilentModeIOS: true,
    //     shouldDuckAndroid: true,
    //     interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX
    //   });
    //   console.log("Starting recording..");
    //   const recording = new Audio.Recording();
    //   await recording.prepareToRecordAsync(
    //     Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
    //   );
    //   await recording.startAsync();
    //   setRecording(recording);
    //   console.log("Recording started");
    // } catch (err) {
    //   console.error("Failed to start recording", err);
    // }
  }

  async function stopRecording() {
    try {
      await recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(recording.getURI());
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true,
    });
    const { sound: _sound, status } = await recording.createNewLoadedSoundAsync(
      {
        isLooping: true,
        isMuted: false,
        volume: 1.0,
        rate: 1.0,
        shouldCorrectPitch: true,
      }
    );
    setSound(_sound);
    setIsRecording(false);
    uploadAudioFirebase(_sound);
    console.log("sound >>> ", _sound);
    // console.log("Stopping recording..");
    // setRecording(undefined);
    // await recording.stopAndUnloadAsync();
    // const uri = recording.getURI();
    // uploadAudioFirebase(uri, "audio", "audio");
    // console.log("Recording stopped and stored at", uri);
  }
  const uploadAudioFirebase = async (url, type, name) => {
    const uri = recording.getURI();
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          try {
            resolve(xhr.response);
          } catch (error) {
            console.log("error:", error);
          }
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      if (blob != null) {
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        let d = new Date();
        let current_time = d.toISOString();
        firebase
          .storage()
          .ref("/chatAudio")
          .child(`${current_time}.${fileType}`)
          .put(blob, {
            contentType: `audio/${fileType}`,
          })
          .then(async () => {
            console.log("Sent!");
            const uri = await firebase
              .storage()
              .ref("/chatAudio")
              .child(`${current_time}.${fileType}`)
              .getDownloadURL();
            sendAudio(uri, "audio", "audio");
            console.log("uri:", uri);
          })
          .catch((e) => console.log("error:", e));
      } else {
        console.log("erroor with blob");
      }
    } catch (error) {
      console.log("error:", error);
    }
    // console.log("hello", uri);
    // const blob = await new Promise((resolve, reject) => {
    //   const xhr = new XMLHttpRequest();
    //   xhr.onload = function() {
    //     resolve(xhr.response);
    //   };
    //   xhr.onerror = function() {
    //     reject(new TypeError("network request failed"));
    //   };
    //   xhr.responseType = "blob";
    //   xhr.open("GET", uri, true);
    //   xhr.send(null);
    // });
    // let d = new Date();
    // let current_time = d.toISOString();
    // const ref = firebase
    //   .storage()
    //   .ref("/chatAudio")
    //   .child(current_time);
    // const snapshot = ref.put(blob);
    // snapshot.on(
    //   firebase.storage.TaskEvent.STATE_CHANGED,
    //   () => {
    //     console.log("success");
    //   },
    //   error => {
    //     console.log("error", error);
    //   },
    //   () => {
    //     snapshot.snapshot.ref
    //       .getDownloadURL()
    //       .then(url => {
    //         console.log("url", url);
    //         sendAudio(url, "audio", "audio");
    //         blob.close();
    //       })
    //       .catch(e => {
    //         console.log("erreo", e);
    //       });
    //   }
    // );
  };
  const sendAudio = useCallback(async (path, type, name) => {
    let id = await messageIdGenerator();
    // console.log("id > ", id);
    let msg = [
      {
        _id: id,
        createdAt: new Date().getTime().toString(),
        receiverId: "-1",
        senderId: props.navigation.state.params.user.customerid.toString(),
        senderMobile: props.navigation.state.params.user.mobile,
        text: "",
        name: name,
        timestamp: new Date().getTime().toString(),
        uri: path,
        type: type,
        user: {
          _id: props.navigation.state.params.user.customerid,
          name: props.navigation.state.params.user.name,
          avatar: require("../assets/Profile1-min.png"),
        },
      },
    ];
    Fire.shared.send(msg);
    // console.log("new msg ", msg);
    // setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
  });

  const pickImage = async () => {
    const { status: cameraPermission } = await Permissions.askAsync(
      Permissions.CAMERA
    );
    const { status: cameraRollPermission } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const { status } = await Camera.requestPermissionsAsync();
    const { status: imageLibrary } = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY
    );
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log(permissionResult, "permissionResult");
    if (permissionResult.status == "granted") {
      let result = await ImagePicker.launchImageLibraryAsync();
      console.log("pickerResult ", result);
      if (!result.cancelled) {
        if (result.type == "image") {
          uploadImagetofirebaseConsole(result.uri);
        } else if (result.type == "video") {
          sendVideoMsg(result.uri);
        }
      }
    }

    // try {
    //   const pickerResponse = await DocumentPicker.getDocumentAsync();
    //   if (pickerResponse.type === "cancel") {
    //     console.log(pickerResponse);
    //   } else if (pickerResponse.type === "success") {
    //     console.log(pickerResponse);
    //   } else {
    //     console.log(pickerResponse);
    //   }
    // } catch (exception) {
    //   console.log(`[DocumentPicker]: ${exception}`);
    // }

    // console.log("value", cameraRollPermission, " value_cam", imageLibrary);
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1
    // });

    // console.log(result);

    // if (!result.cancelled) {
    //   if (result.type == "image") {
    //     sendImageMessage(result.uri);
    //   } else if (result.type == "video") {
    //     sendVideoMsg(result.uri);
    //   }
    // }
    // if (
    //   cameraRollPermission == "granted" &&
    //   cameraRollPermission == "granted"
    // ) {
    //   console.log("image picker before");
    //   let pickerResult = await ImagePicker.launchImageLibraryAsync({
    //     allowsEditing: true,
    //     aspect: [4, 3]
    //   });
    //     if (!result.cancelled) {
    //   if (result.type == "image") {
    //     sendImageMessage(result.uri);
    //   } else if (result.type == "video") {
    //     sendVideoMsg(result.uri);
    //   }
    // }
    //   console.log('pick result ',pickerResult)
    // }
  };
  const sendVideoMsg = useCallback(async (path) => {
    let id = await messageIdGenerator();
    console.log("id > ", id);
    let msg = {
      _id: id,
      createdAt: new Date().getTime(),
      receiverId: "-1",
      senderId: props.navigation.state.params.user.customerid.toString(),
      senderMobile: props.navigation.state.params.user.mobile,
      text: "",
      timestamp: new Date().getTime(),
      video: path,
      user: {
        _id: props.navigation.state.params.user.customerid,
        name: props.navigation.state.params.user.name,
        avatar: require("../assets/Profile1-min.png"),
      },
    };
    console.log("new msg ", msg);
    setMessages((previousMessages) => GiftedChat.append(previousMessages, msg));
  });
  const getLan = async () => {
    let lan = await AsyncStorage.getItem("lan");
    setlan(lan !== null ? lan : "en");
  };

  const messageIdGenerator = () => {
    // generates uuid.
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const renderInputToolbar = (props) => {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar
        {...props}
        containerStyle={{ backgroundColor: "white", borderTopWidth: hp(0.2) }}
      />
    );
  };
  //save single group message
  const sendLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log("status ", status);
    if (status !== "granted") {
      Toast.show({
        text:
          this.state.lan == "en"
            ? "Please allow location permission"
            : "ÙŠØ±Ø¬Ù‰ Ø§Ù„Ø³Ù…Ø§Ø­ Ù„ØªØ­Ø¯ÙŠØ¯ Ø§Ù„Ù…ÙˆÙ‚Ø¹",
        position: "bottom",
      });
    } else {
      // console.log("else ");
      const mylocation = await Location.getCurrentPositionAsync({});
      console.log("mylocation", mylocation);
      let val = {
        latitude: mylocation.coords.latitude,
        longitude: mylocation.coords.longitude,
      };
      sendLocationMessage(val);
    }
  };
  const sendLocationMessage = async (location) => {
    let id = await messageIdGenerator();
    // console.log("id > ", id);
    let msg = [
      {
        _id: id,
        createdAt: new Date().getTime().toString(),
        receiverId: "-1",
        senderId: props.navigation.state.params.user.customerid.toString(),
        senderMobile: props.navigation.state.params.user.mobile,
        text: "",
        name: "location",
        timestamp: new Date().getTime().toString(),
        location: location,
        type: "location",
        user: {
          _id: props.navigation.state.params.user.customerid,
          name: props.navigation.state.params.user.name,
          avatar: require("../assets/Profile1-min.png"),
        },
        isDeleted: false,
      },
    ];
    Fire.shared.send(msg);
    // console.log("new msg ", msg);
    // setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
  };

  // Just Created

  // const playSound = async (uri) => {
  //   setPlayAudio(true);

  //   setPlayAudio(false);

  //   console.log(uri);
  //   // console.log(val.currentMessage.uri);

  //   // const sound = new Audio.Sound();
  //   // try {
  //   //   await sound.loadAsync({ uri: props.currentMessage.uri });
  //   //   await sound.playAsync();
  //   //   // Your sound is playing!
  //   //   console.log("Playing");

  //   //   // Don't forget to unload the sound from memory
  //   //   // when you are done using the Sound object
  //   //   await sound.unloadAsync();

  //   setPlayAudio(false);
  //   // } catch (error) {
  //   //   // An error occurred!
  //   //   console.log(error);
  //   // }
  // };

  // renderAudio = (props) => {
  //   console.log("Rendering");
  //   console.log(props.currentMessage);
  //   return props.currentMessage.type != "audio" ? (
  //     <View />
  //   ) : (
  //     <Ionicons
  //       name="ios-play"
  //       size={35}
  //       color={playAudio ? "blue" : "red"}
  //       style={{
  //         left: 90,
  //         position: "relative",
  //         shadowColor: "#000",
  //         shadowOffset: { width: 0, height: 0 },
  //         shadowOpacity: 0.5,
  //         backgroundColor: "transparent",
  //       }}
  //       onPress={playSound(props.currentMessage.uri)}

  //       // const sound = new Sound(props.currentMessage.audio, "", (error) => {
  //       //   if (error) {
  //       //     console.log("failed to load the sound", error);
  //       //   }
  //       //     setPlayAudio(false);
  //       //     sound.play((success) => {
  //       //       console.log(success, "success play");
  //       //       if (!success) {
  //       //         Alert.alert("There was an error playing this audio");
  //       //       }
  //       //     });
  //       //   });
  //       // }}
  //     />
  //   );
  // };

  // const playMic = async (uri) => {
  //   console.log(uri);
  //   console.log("TTT");
  // };

  const renderBubble = (props) => {
    console.log("renderBubble");
    // {this.renderAudio(props)}

    // return (
    //   <View>
    //     {/* {renderAudio(props)} */}

    //     <Bubble {...props} style={{ borderRadius: 10 }} />
    //   </View>
    // );

    // Uncomment
    return (
      <Bubble
        {...props}
        textStyle={{
          left: {
            color: "#4a4b4c",
          },
          right: {
            color: "white",
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: "#d6d6d6",
            borderRadius: 10,
            borderColor: "#c9c9c9",
          },
          right: {
            backgroundColor: "#631255",
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
            borderRadius: 10,
          },
        }}
        tickStyle={{
          color: "white",
          height: 20,
        }}
        timeTextStyle={{
          left: { color: "#8b8d8f", alignSelf: "flex-end" },
          right: { color: "#8b8d8f" },
        }}
      />
    );
  };

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    );
  }

  function renderActions(props) {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={{ justifyContent: "flex-start" }}
          onPress={() => onPressActionButton()}
        >
          <Image
            style={{
              width: 30,
              height: 50,
              alignSelf: "center",
              marginLeft: wp(1),
              marginTop: -20,
            }}
            resizeMode="contain"
            source={require("../assets/Add-min.png")}
          />
        </TouchableOpacity>
        {/* Uncomment */}
        <View>
          <TouchableOpacity
            style={{ justifyContent: "flex-start" }}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Image
              style={{
                width: 30,
                height: 50,
                alignSelf: "center",
                marginLeft: wp(2),
                marginTop: -20,
                // tintColor: recording ? "#631255" : "black"
                tintColor: isRecording ? "red" : "black",
              }}
              resizeMode="contain"
              source={IMAGES.MIC}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function onPressActionButton(props) {
    setpopupVisible(true);
    //  console.log('hello Action button pressed ');
  }
  function renderTicks(currentMessage) {
    // console.log("currentMessage  >> ", currentMessage);
    if (currentMessage.user._id === 1) {
      return (
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 5,
            paddingBottom: 5,
          }}
        >
          <Image
            source={IMAGES.CHECKED}
            resizeMode="contain"
            style={{
              width: 10,
              height: 10,
              tintColor: "white",
              alignSelf: "center",
            }}
          />
          {/* <Image
              source={IMAGES.CHECKED}
              resizeMode="contain"
              style={{ width: 10, height: 10, tintColor: "white" }}
            /> */}
        </View>
      );
    }
  }
  function renderFooter(props) {
    if (isTyping == true) {
      return (
        <View
          style={{
            backgroundColor: "#d6d6d6",
            marginBottom: hp(2),
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: "5%",
            width: "50%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              color: "#8b8d8f",
              paddingVertical: "5%",
            }}
          >
            Wafarnalak is typing...
          </Text>
        </View>
      );
    } else {
      return <View></View>;
    }
  }
  function renderSend(props) {
    return (
      <Send {...props}>
        <View
          style={{
            height: "100%",
            width: 50,
            padding: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={lan == "en" ? IMAGES.SEND_ICON : IMAGES.SEND_ICON_AR}
            resizeMode="contain"
            style={{ height: 40, width: 40, alignSelf: "center" }}
          />
        </View>
      </Send>
    );
  }
  const renderMessageVideo = (props) => {
    const { currentMessage } = props;
    return (
      <TouchableOpacity
        onPress={() => {
          setvideoSource(currentMessage.video);
          setVideoPopup(true);
        }}
      >
        <View style={{ padding: 10, height: 110, width: 190 }}>
          <Image
            source={{ uri: currentMessage.video }}
            style={{ height: 98, width: 170 }}
          />
          {/* <VideoPlayer
            resizeMode="contain"
            disableBack
            disableVolume
            // navigator={props.navigation}
            source={{ uri: currentMessage.video }}
            style={{ height: 98, width: 170 }}
          /> */}
        </View>
      </TouchableOpacity>
    );
  };
  const renderCustomView = (props) => {
    return <MessageView {...props} />;
  };

  const scrollToBottomComponent = (props) => {
    console.log(props, "pp");
    return (
      <View>
        <TouchableOpacity
          {...props}
          // onPress={props}
          // hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }}
        >
          {/* <Text>VV</Text> */}
          <AntDesign name="down" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  // const scrollToBottomComponent = (
  //   <View>
  //     <TouchableOpacity hitSlop={{ top: 5, left: 5, right: 5, bottom: 5 }}>
  //       <Text>V</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        marginTop: StatusBar.statusBarHeight,
      }}
    >
      <Popup
        visible={popupVisible}
        setPopupFalse={() => setpopupVisible(false)}
        sendLocation={() => {
          setpopupVisible(false);
          sendLocation();
        }}
        pickDocument={() => {
          setpopupVisible(false);
          pickImage();
        }}
        uploadPicture={() => {
          setpopupVisible(false);
          pickImage();
        }}
        setTakePicture={() => {
          setpopupVisible(false);
          takePicture();
        }}
      />
      <BookingDetailHeader
        HeaderText={lan == "en" ? "Chat" : "Ø¯Ø±Ø¯Ø´Ø©"}
        onBackPress={() =>
          props.navigation.state.params.noGoBackLogin
            ? props.navigation.navigate("LandingSecreen")
            : props.navigation.goBack()
        }
        lan={lan}
        lineWidth={hp(0.2)}
      />
      <VideoPlayerPopup
        visible={VideoPopup}
        setPopupFalse={() => setVideoPopup(false)}
        source={videoSource}
      />
      <GiftedChat
        {...props}
        messages={messages} //{messages.reverse()}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: props.navigation.state.params.user.customerid,
          name: props.navigation.state.params.user.name,
          avatar: require("../assets/Profile1-min.png"),
        }}
        // renderInputToolbar={renderInputToolbar}
        placeholder={" Write a new message..."}
        textInputStyle={{
          justifyContent: "center",
          backgroundColor: "white",
          // borderRadius: 10
        }}
        // renderTicks={renderTicks} // Issue infinite scroll
        // isTyping={isTyping}
        listViewProps={{
          style: {
            backgroundColor: "#ebebeb",
          },
        }}
        renderMessageVideo={renderMessageVideo}
        renderCustomView={renderCustomView}
        renderBubble={renderBubble}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        renderUsernameOnMessage={true}
        alwaysShowSend
        // inverted={true} //Commented false
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderLoading={renderLoading}
        isAnimated={true}
        renderSend={renderSend}
        renderActions={renderActions}
        // onPressActionButton={() => onPressActionButton()}
        // renderFooter={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  senderName: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  onlineText: {
    color: "#a2a2a2",
    marginLeft: 3,
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Chat;

// onDelete(messageIdToDelete) {
//   this.setState(previousState =>
//     ({ messages: previousState.messages.filter(message => message.id !== messageIdToDelete) }))
// }

// https://stackoverflow.com/questions/59284331/delete-and-copy-mesage-in-gifted-chat

// renderMessage (props) {
//   if(!props.currentMessage.isDeleted) {
//   return (
//     <Message
//       {...props}
//     />
//   )
// }
// else return null;
// }
// But if message on firebase marked as isDeleted=true then the chat view NOT update itself automatically.
// Do you know about this ?
