// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Dimensions
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { widthPercentageToDP } from "react-native-responsive-screen";

// const DecoCategory = ({ job, selectJob, lan, index }) => {
//   console.log("deco type job ", job);
//   return (

//     <View>
//       <Text>hi</Text>
//       {job.note && job.note !== null && index == 0 ? (
//         <View
//           style={{
//             backgroundColor: "white",
//             marginLeft: 1,
//             marginRight: 1,
//             width: widthPercentageToDP(92),
//             alignSelf: "center"
//           }}
//         >
//           <Text
//             style={{
//               fontWeight: "bold",
//               textAlign: "left",
//               paddingHorizontal: widthPercentageToDP(2)
//             }}
//           >
//             {lan == "en" ? "Notes:" : "ملاحظات:"}
//           </Text>
//           <Text
//             style={{
//               fontSize: 12,
//               textAlign: "left",
//               paddingHorizontal: widthPercentageToDP(2)
//             }}
//           >
//             {lan == "en"
//               ? job.note
//               : "1-" +
//                 " سيقوم فنيونا بزيارتك لتحديد المواد المستخدمة للأرضية، وكذلك التصميم والحجم" +
//                 "\n" +
//                 "2-" +
//                 " كل الأسعار قابلة للتخفيض"}
//           </Text>
//         </View>
//       ) : (
//         <View></View>
//       )}
//       <TouchableOpacity onPress={() => selectJob(job)}>
//         <View
//           style={{
//             marginLeft: 15,
//             marginRight: 15,
//             backgroundColor: "white",
//             borderWidth: 1,
//             borderTopWidth: index == 0 ? 1 : 0,
//             borderColor: "#283a97",
//             borderTopWidth: 1
//           }}
//         >
//           <View style={{ alignSelf: "center" }}>
//             <Text
//               style={{
//                 color: "#0764af",
//                 fontFamily: "montserrat_semi_blod",
//                 fontSize: 12,
//                 textAlign: "left",
//                 marginTop: 7,
//                 alignSelf: "center"
//               }}
//               numberOfLines={2}
//             >
//               {lan == "en" ? job.name : job.name_ar}
//             </Text>
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               paddingHorizontal: widthPercentageToDP(3)
//             }}
//           >
//             <View
//               style={{
//                 marginTop: 4
//               }}
//             >
//               <Text
//                 style={{
//                   color: "#0764af",
//                   fontFamily: "montserrat_semi_blod",
//                   fontSize: 12,
//                   textAlign: "left",
//                   marginTop: 7
//                 }}
//                 numberOfLines={2}
//               >
//                 {lan == "en" ? "Approx Charges" : "تقريبا"}
//               </Text>
//             </View>
//             <View style={{ marginLeft: 5 }}>
//               <View>
//                 <View
//                   style={{
//                     backgroundColor: "#0764af",
//                     width: 90,
//                     paddingVertical: 5
//                   }}
//                 >
//                   <View
//                     style={{
//                       // flexDirection: lan == "en" ? "row" : "row-reverse",
//                       flexDirection: "row",
//                       alignSelf: "center",
//                       alignContent: "center",
//                       alignItems: "center",
//                       flex: 1,
//                       justifyContent: "flex-start"
//                     }}
//                   >
//                     <Text
//                       style={{
//                         color: "white",
//                         fontSize: 12
//                       }}
//                     >
//                       SAR{" "}
//                     </Text>
//                     <Text
//                       style={{
//                         color: "#ff9c00",
//                         fontSize: 12
//                       }}
//                     >
//                       {job.meterprice}
//                     </Text>
//                     <Text
//                       style={{
//                         color: "white",
//                         fontSize: 12
//                       }}
//                     >
//                       {lan == "en" ? "/meter" : " م/ "}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             </View>
//           </View>

//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//               paddingHorizontal: widthPercentageToDP(3)
//             }}
//           >
//             <View
//               style={{
//                 backgroundColor: "white",
//                 justifyContent: "center",
//                 marginTop: 10
//               }}
//             >
//               <Text
//                 style={{
//                   color: "#0764af",
//                   fontFamily: "montserrat_semi_blod",
//                   fontSize: 12,
//                   // marginTop: 20,
//                   textAlign: "left",
//                   // width: Dimensions.get("screen").width - 140,
//                   marginTop: 10
//                 }}
//                 numberOfLines={2}
//               >
//                 {lan == "en" ? "Visit Charge" : " رتب زيارة"}
//               </Text>
//             </View>
//             {lan == "en" ? (
//               <View
//                 style={{
//                   backgroundColor: "#0764af",
//                   width: 90,
//                   paddingVertical: 0,
//                   marginTop: 15,
//                   height: 25
//                 }}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignSelf: "center",
//                     alignContent: "center",
//                     alignItems: "center",
//                     flex: 1
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: "white",
//                       fontSize: 12
//                     }}
//                   >
//                     SAR{" "}
//                   </Text>
//                   <Text
//                     style={{
//                       color: "#ff9c00",
//                       fontSize: 12
//                     }}
//                   >
//                     {job.price}
//                   </Text>
//                 </View>
//               </View>
//             ) : (
//               <View
//                 style={{
//                   backgroundColor: "#0764af",
//                   width: 90,
//                   paddingVertical: 5,
//                   marginTop: 27,
//                   marginLeft: widthPercentageToDP(1)
//                 }}
//               >
//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignSelf: "center",
//                     alignContent: "center",
//                     alignItems: "center",
//                     flex: 1
//                   }}
//                 >
//                   <Text
//                     style={{
//                       color: "white",
//                       fontSize: 12
//                     }}
//                   >
//                     SAR{" "}
//                   </Text>
//                   <Text
//                     style={{
//                       color: "#ff9c00",
//                       fontSize: 12
//                     }}
//                   >
//                     {job.price}
//                   </Text>
//                 </View>
//               </View>
//             )}
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               marginTop: 0,
//               marginBottom: 15
//             }}
//           >
//             <View style={{ marginTop: 0, marginLeft: 12 }}></View>

//             <View
//               style={{
//                 alignSelf: "right",
//                 marginRight: lan == "en" ? 15 : 28,
//                 marginTop: 0
//               }}
//             >
//               <Text
//                 style={{
//                   textAlign: "center",
//                   fontSize: 12,
//                   color: "#4a4b4c",
//                   marginBottom: 3,
//                   marginTop: 4
//                 }}
//                 numberOfLines={2}
//               >
//                 {lan == "en" ? "Schedule Visit" : " رتب زيارة"}
//               </Text>
//               <Ionicons
//                 name={
//                   job.selected && job.selected == true
//                     ? "ios-checkmark-circle"
//                     : "ios-checkmark-circle-outline"
//                 }
//                 size={26}
//                 color={"#0764af"}
//                 style={{
//                   alignSelf: "center",
//                   marginRight: 20,
//                   marginTop: 0,
//                   marginLeft: 25
//                 }}
//               />
//             </View>
//           </View>

//           <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 5 }}>
//             <View
//               style={{
//                 backgroundColor: "white",
//                 marginLeft: 1,
//                 marginRight: 1
//               }}
//             >
//               {/* <Text style={{ fontWeight: "bold", textAlign: "left" }}>
//               {lan == "en" ? "Notes:" : "ملاحظات:"}
//             </Text> */}
//               <Text style={{ textAlign: "left", fontSize: 9 }}>
//                 {lan == "en"
//                   ? "By scheduling the visit, you agree that this is only the visit/inspection charge. In case you dont take the service after visit, you are required to pay visit charge (SAR 25) to professional. "
//                   : "بإختيارك ترتيب زيارة، فإنك توافق على أن الـ 25 ريال سعودي هي فقط رسوم الزيارة/الفحص، ويتعين عليك الدفع في حال عدم اخذ الخدمة."}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };
// export default DecoCategory;
import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";

const DecoCategory = ({ job, selectJob, lan, index }) => {
  console.log("deco type job ", job, selectJob, lan, index);
  return (
    <View>
      {job.note && job.note !== null && index == 0 ? (
        <View
          style={{
            backgroundColor: "white",
            marginLeft: 1,
            marginRight: 1,
            width: widthPercentageToDP(92),
            alignSelf: "center"
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "left",
              paddingHorizontal: widthPercentageToDP(2)
            }}
          >
            {lan == "en" ? "Notes:" : "ملاحظات:"}
          </Text>
          <Text
            style={{
              fontSize: 12,
              textAlign: "left",
              paddingHorizontal: widthPercentageToDP(2)
            }}
          >
            {lan == "en" ? job.note : job.note_ar
            // : "1-" +
            //   " سيقوم فنيونا بزيارتك لتحديد المواد المستخدمة للأرضية، وكذلك التصميم والحجم" +
            //   "\n" +
            //   "2-" +
            // " كل الأسعار قابلة للتخفيض"
            }
          </Text>
        </View>
      ) : (
        <View></View>
      )}
      <TouchableOpacity onPress={() => selectJob(job)}>
        <View
          style={{
            marginLeft: 15,
            marginRight: 15,
            backgroundColor: "white",
            borderWidth: 1,
            borderTopWidth: index == 0 ? 1 : 0,
            borderColor: "#283a97",
            borderTopWidth: 1
          }}
        >
          <View style={{ alignSelf: "center" }}>
            <Text
              style={{
                color: "#0764af",
                fontFamily: "montserrat_semi_blod",
                fontSize: 12,
                textAlign: "left",
                marginTop: 7,
                alignSelf: "center"
              }}
              numberOfLines={2}
            >
              {lan == "en" ? job.name : job.name_ar}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: widthPercentageToDP(3)
            }}
          >
            <View
              style={{
                marginTop: 4
              }}
            >
              <Text
                style={{
                  color: "#0764af",
                  fontFamily: "montserrat_semi_blod",
                  fontSize: 12,
                  textAlign: "left",
                  marginTop: 7
                }}
                numberOfLines={2}
              >
                {lan == "en" ? "Approx Charges" : "تقريبا"}
              </Text>
            </View>
            <View style={{ marginLeft: 5 }}>
              <View>
                <View
                  style={{
                    backgroundColor: "#0764af",
                    width: 90,
                    paddingVertical: 5
                  }}
                >
                  <View
                    style={{
                      flexDirection: lan == "en" ? "row" : "row-reverse",
                      // flexDirection: "row",
                      alignSelf: "center",
                      alignContent: "center",
                      alignItems: "center",
                      flex: 1,
                      justifyContent: "flex-start"
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12
                      }}
                    >
                      SAR{" "}
                    </Text>
                    <Text
                      style={{
                        color: "#ff9c00",
                        fontSize: 12
                      }}
                    >
                      {job.meterprice}
                    </Text>
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12
                      }}
                    >
                      {lan == "en" ? " /m" : " م/ "}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: widthPercentageToDP(3)
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                marginTop: 10
              }}
            >
              <Text
                style={{
                  color: "#0764af",
                  fontFamily: "montserrat_semi_blod",
                  fontSize: 12,
                  // marginTop: 20,
                  textAlign: "left",
                  // width: Dimensions.get("screen").width - 140,
                  marginTop: 10
                }}
                numberOfLines={2}
              >
                {lan == "en" ? "Visit Charge" : " رتب زيارة"}
              </Text>
            </View>
            {lan == "en" ? (
              <View
                style={{
                  backgroundColor: "#0764af",
                  width: 90,
                  paddingVertical: 0,
                  marginTop: 15,
                  height: 25
                }}
              >
                <View
                  style={{
                    flexDirection: lan == "en" ? "row" : "row-reverse",
                    alignSelf: "center",
                    alignContent: "center",
                    alignItems: "center",
                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12
                    }}
                  >
                    SAR{" "}
                  </Text>
                  <Text
                    style={{
                      color: "#ff9c00",
                      fontSize: 12
                    }}
                  >
                    {job.price}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: "#0764af",
                  width: 90,
                  paddingVertical: 5,
                  marginTop: 27,
                  marginLeft: widthPercentageToDP(1)
                }}
              >
                <View
                  style={{
                    flexDirection: lan == "en" ? "row" : "row-reverse",
                    alignSelf: "center",
                    alignContent: "center",
                    alignItems: "center",
                    flex: 1
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12
                    }}
                  >
                    SAR{" "}
                  </Text>
                  <Text
                    style={{
                      color: "#ff9c00",
                      fontSize: 12
                    }}
                  >
                    {job.price}
                  </Text>
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 0,
              marginBottom: 15
            }}
          >
            <View style={{ marginTop: 0, marginLeft: 12 }}></View>

            <View
              style={{
                alignSelf: "center",
                marginRight: lan == "en" ? 15 : 28,
                marginTop: 0
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "#4a4b4c",
                  marginBottom: 3,
                  marginTop: 4
                }}
                numberOfLines={2}
              >
                {lan == "en" ? "Schedule Visit" : " رتب زيارة"}
              </Text>
              <Ionicons
                name={
                  job.selected && job.selected == true
                    ? "ios-checkmark-circle"
                    : "ios-checkmark-circle-outline"
                }
                size={26}
                color={"#0764af"}
                style={{
                  // alignSelf: "center",
                  marginRight: 20,
                  marginTop: 0,
                  marginLeft: 25
                }}
              />
            </View>
          </View>

          <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 5 }}>
            <View
              style={{
                backgroundColor: "white",
                marginLeft: 1,
                marginRight: 1
              }}
            >
              {/* <Text style={{ fontWeight: "bold", textAlign: "left" }}>
              {lan == "en" ? "Notes:" : "ملاحظات:"}
            </Text> */}
              <Text style={{ textAlign: "left", fontSize: 9 }}>
                {lan == "en"
                  ? "By scheduling the visit, you agree that this is only the visit/inspection charge. In case you dont take the service after visit, you are required to pay visit charge (SAR 25) to professional. "
                  : "بإختيارك ترتيب زيارة، فإنك توافق على أن الـ 25 ريال سعودي هي فقط رسوم الزيارة (الفحص)، ويتعين عليك الدفع في حال عدم اخذ الخدمة."}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default DecoCategory;
