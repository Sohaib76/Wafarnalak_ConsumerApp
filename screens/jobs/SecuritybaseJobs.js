import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";

const SecuritybaseJobs = ({
  job,
  plus,
  minus,
  lan,
  index,
  toolTipVisible,
  cahngeToolTip,
  womens
}) => {
  console.log("security base job ", job);
  return (
    <View>
      <View style={{ marginLeft: 15, marginRight: 15 }}>
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
                // textAlign: lan == "en" ? "left" : "right",
                textAlign: "left",
                paddingRight: widthPercentageToDP(2)
              }}
            >
              {lan == "en" ? "Notes:" : "ملاحظات:"}
            </Text>
            <Text
              style={{
                textAlign: "left",
                fontSize: 12,
                paddingRight: widthPercentageToDP(2)
              }}
            >
              {lan == "en" ? job.note : job.note_ar}
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
          backgroundColor: job.is_promoted == true ? "#9dbacd" : "white",
          borderLeftWidth: 1,
          borderLeftWidth: 1,
          borderRightWidth: 1,
          borderTopWidth: index == 0 ? 1 : 0,
          borderColor: "#283a97",
          alignItems: "center",
          paddingVertical: 10
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 8,
            marginRight: 6,
            alignSelf: "center"
          }}
        >
          <View style={{ marginTop: 4 }}>
            <Text
              style={{
                color: womens ? "#f02fc2" : "#0764af",
                fontFamily: "montserrat_semi_blod",
                fontSize: 12,
                textAlign: "left",
                width: Dimensions.get("screen").width - 140
              }}
              numberOfLines={2}
            >
              {lan == "en" ? job.name : job.name_ar}
            </Text>
          </View>
          {/* <View style={{ marginTop: 6, marginRight: 26 }}>
          <View style={{ flexDirection: lan == "en" ? "row" : "row-reverse" }}>
            <Text
              style={{
                fontSize: 10,
                color: "#0764af",
                fontWeight: "bold"
              }}
            >
              Total SAR{" "}
            </Text>
            <Text
              style={{
                color: job.is_promoted == true ? "white" : "#ff9c00",
                fontSize: 10
              }}
            >
              {job.t_price ? job.t_price : 0}{" "}
            </Text>
          </View>
        </View> */}
          <View
            style={{
              backgroundColor: "#0764af",
              width: 90,
              marginRight: 10
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
              <Text style={{ color: "white", fontSize: 12 }}>SAR </Text>
              <Text
                style={{
                  color: "#ff9c00",
                  fontSize: 12
                }}
              >
                {job.items > 1 && job.saleprice ? job.saleprice : job.price}
              </Text>
              <Text style={{ color: "white", fontSize: 12 }}>
                {lan == "en" ? "/Unit" : "وحدة /"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SecuritybaseJobs;
