import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SelectableJob = ({ job, selectJob, lan, index }) => {
  console.log("selectable job ", job);
  return (
    <View>
      <View style={{ marginLeft: 15, marginRight: 15 }}>
        {job.note && job.note !== null && index == 0 ? (
          <View
            style={{ backgroundColor: "white", marginLeft: 1, marginRight: 1 }}
          >
            <Text style={{ fontWeight: "bold", textAlign: "left" }}>
              {lan == "en" ? "Notes:" : "ملاحظات:"}
            </Text>
            <Text style={{ textAlign: "left", fontSize: 12 }}>
              {lan == "en"
                ? job.note
                : job.id == 299 || job.id == 300
                ? "1-" +
                  " سيقوم الفني بزيارتك للسماح لك باختيار شركة الطلاء واللون" +
                  "\n" +
                  "2-" +
                  " لكل غرفة تختارها ستحصل على طلاء للحمام او المطبخ مجاناً" +
                  "\n" +
                  "3-" +
                  " كل الأسعار قابلة للتخفيض"
                : job.note_ar}
            </Text>
          </View>
        ) : (
          <View></View>
        )}
      </View>

      <View
        style={{
          marginLeft: 15,
          marginRight: 15,
          backgroundColor: "white",
          borderWidth: 1,
          borderTopWidth: index == 0 ? 1 : 0,
          borderColor: "#283a97",
          borderTopWidth: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 8,
            marginRight: 6,
          }}
        >
          <View
            style={{
              marginTop: 4,
            }}
          >
            <Text
              style={{
                color: "#0764af",
                fontFamily: "montserrat_semi_blod",
                fontSize: 12,
                textAlign: "left",
                width: Dimensions.get("screen").width - 140,
              }}
              numberOfLines={2}
            >
              {/* {lan == "en" ? job.name : " ترتيب زيارة"}{" "} */}
              {lan == "en" ? job.name : job.name_ar}{" "}
            </Text>
          </View>
          <View
            style={{
              marginRight: 26,
              marginTop: 8,

              marginLeft: 8,
            }}
          >
            <View
              style={{ flexDirection: lan == "en" ? "row" : "row-reverse" }}
            >
              <Text
                style={{ fontSize: 10, color: "#0764af", fontWeight: "bold" }}
              >
                Total SAR{" "}
              </Text>
              <Text style={{ color: "#ff9c00", fontSize: 10, paddingLeft: 4 }}>
                {job.t_price ? job.t_price : 0}{" "}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          <View style={{ marginLeft: 12, marginTop: 12 }}>
            <View>
              <View
                style={{
                  backgroundColor: "#0764af",
                  width: 90,
                }}
              >
                <View
                  style={{
                    flexDirection: lan == "en" ? "row" : "row-reverse",
                    alignSelf: "center",
                    alignContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                    }}
                  >
                    SAR{" "}
                  </Text>
                  <Text
                    style={{
                      color: "#ff9c00",
                      fontSize: 12,
                    }}
                  >
                    {job.price}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                    }}
                  >
                    {lan == "en" ? "/Visit" : "زيارة/"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginRight: lan == "en" ? 30 : 37 }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 12,
                color: "#4a4b4c",
                marginBottom: 3,
              }}
            >
              {lan == "en" ? "Inspection Visit" : "زيارة تفقدية"}
            </Text>
            <TouchableOpacity
              onPress={() => selectJob(job)}
              hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
            >
              <View style={{ alignSelf: "center" }}>
                <Ionicons
                  name={
                    job.selected && job.selected == true
                      ? "ios-checkmark-circle"
                      : "ios-checkmark-circle-outline"
                  }
                  size={26}
                  color={"#0764af"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginLeft: 15, marginRight: 15, marginBottom: 5 }}>
          <View
            style={{
              backgroundColor: "white",
              marginLeft: 1,
              marginRight: 1,
            }}
          >
            {/* <Text style={{ fontWeight: "bold", textAlign: "left" }}>
              {lan == "en" ? "Notes:" : "ملاحظات:"}
            </Text> */}
            {/* fontSize : 9 */}
            <Text style={{ textAlign: "justify", fontSize: 11 }}>
              {lan == "en"
                ? "By scheduling the visit, you agree that this is only the inspection visit charge. The technician will quote the price after inspection. In case you don't take the service after inspection, you are required to pay visit charge (SAR 30) to professional."
                : "من خلال تحديد موعد الزيارة ، فإنك توافق على أن هذه هي رسوم زيارة التفتيش فقط. سيقدم الفني السعر بعد الفحص. في حالة عدم أخذ الخدمة بعد الفحص ، يتعين عليك دفع رسوم الزيارة (25 ريال ) إلى المختص."}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SelectableJob;

// import React from "react";
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   TouchableWithoutFeedback
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// const { width, height } = Dimensions.get("screen");
// const SPACING = (height / width) * 8;
// const AVATAR_SIZE = (height / width) * 34;
// const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
// const SelectableJob = ({ job, selectJob, lan, index }) => {
//   console.log("selectable job ", job);
//   return (
//     <TouchableOpacity>
//       <View
//         style={{ paddingVertical: SPACING / 2, paddingHorizontal: SPACING }}
//       >
//         {job.note && job.note !== null && index == 0 ? (
//           <View>
//             <Text style={{ fontWeight: "bold", textAlign: "left" }}>
//               {lan == "en" ? "Notes:" : "ملاحظات:"}
//             </Text>
//             <Text style={{ textAlign: "left", fontSize: 12 }}>
//               {lan == "en"
//                 ? job.note
//                 : job.id == 299 || job.id == 300
//                 ? "1-" +
//                   " سيقوم الفني بزيارتك للسماح لك باختيار شركة الطلاء واللون" +
//                   "\n" +
//                   "2-" +
//                   " لكل غرفة تختارها ستحصل على طلاء للحمام او المطبخ مجاناً" +
//                   "\n" +
//                   "3-" +
//                   " كل الأسعار قابلة للتخفيض"
//                 : job.note_ar}
//             </Text>
//           </View>
//         ) : (
//           <View></View>
//         )}
//         <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//           <Text
//             style={{
//               color: "#0764af",
//               fontFamily: "montserrat_semi_blod",
//               fontSize: SPACING / 2,
//               textAlign: "left"
//             }}
//             numberOfLines={2}
//           >
//             {lan == "en" ? job.name : " ترتيب زيارة"}{" "}
//           </Text>
//           <View style={{ flexDirection: lan == "en" ? "row" : "row-reverse" }}>
//             <Text
//               style={{
//                 fontSize: SPACING / 2,
//                 color: "#0764af",
//                 fontWeight: "bold"
//               }}
//             >
//               Total SAR{" "}
//             </Text>
//             <Text
//               style={{
//                 color: "#ff9c00",
//                 fontSize: SPACING / 2,
//                 paddingLeft: 4
//               }}
//             >
//               {job.t_price ? job.t_price : 0}{" "}
//             </Text>
//           </View>
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-between",
//             marginTop: SPACING,
//             width: "100%"
//           }}
//         >
//           <View
//             style={{
//               backgroundColor: "#0764af",
//               paddingHorizontal: SPACING / 4,
//               flexDirection: lan == "en" ? "row" : "row-reverse",
//               paddingVertical: SPACING / 8
//             }}
//           >
//             <Text
//               style={{
//                 textAlign: "center",
//                 fontSize: SPACING / 1.5,
//                 color: "white",
//                 fontWeight: "600"
//               }}
//             >
//               {"SAR "}
//             </Text>
//             <Text
//               style={{
//                 textAlign: "center",
//                 fontSize: SPACING / 1.5,
//                 color: "#d89801",
//                 fontWeight: "600"
//               }}
//             >
//               {job.price}
//             </Text>
//             <Text
//               style={{
//                 color: "white",
//                 fontSize: SPACING / 1.5
//               }}
//             >
//               {lan == "en" ? "/Visit" : "زيارة/"}
//             </Text>
//           </View>
//         </View>
//       </View>
//     </TouchableOpacity>
//   );
// };
// export default SelectableJob;
