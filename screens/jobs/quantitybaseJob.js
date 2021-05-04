import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";

const QuantitybaseJob = ({
  job,
  plus,
  minus,
  lan,
  index,
  toolTipVisible,
  cahngeToolTip,
  womens
}) => {
  console.log("quantity base job ", job);
  return (
    <View>
      <View style={{ marginLeft: 15, marginRight: 15 }}>
        {job.note && job.note !== null && index == 0 ? (
          <View
            style={{ backgroundColor: "white", marginLeft: 1, marginRight: 1 }}
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
                paddingHorizontal: widthPercentageToDP(2),
                fontSize: 12,
                textAlign: "left"
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
          borderWidth: 1,
          borderTopWidth: index == 0 ? 1 : 0,
          borderColor: "#283a97"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 8,
            marginRight: 6
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
          <View style={{ marginTop: 6, marginRight: 26 }}>
            <View
              style={{ flexDirection: lan == "en" ? "row" : "row-reverse" }}
            >
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
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
            marginBottom: 15
          }}
        >
          <View style={{ marginLeft: 12, marginTop: 12 }}>
            <View
              style={{
                backgroundColor: "#0764af",
                width: 90
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
          {job.is_promoted ? (
            <View
              style={{
                alignSelf: "flex-start",
                flex: 1,
                marginLeft: 10,
                marginTop: 8,
                marginBottom: 4
              }}
            >
              <TouchableOpacity onPress={() => cahngeToolTip(index)}>
                <View>
                  {toolTipVisible == index && job.i_notes ? (
                    <View
                      style={{
                        backgroundColor: "white",
                        borderRadius: 6,
                        top: 7,
                        left: 10,
                        right: 10,
                        borderStyle: "solid",
                        position: "absolute",
                        borderWidth: 2,
                        marginLeft: 5,
                        borderColor: "#0764af",
                        alignSelf: "flex-start",
                        borderTopLeftRadius: 0,
                        zIndex: 2
                      }}
                    >
                      <Text
                        style={{ textAlign: "center", fontSize: 7, padding: 2 }}
                      >
                        {lan == "en"
                          ? job.i_notes && job.i_notes
                          : job.i_notes_ar && job.i_notes_ar}
                      </Text>
                    </View>
                  ) : (
                    <View></View>
                  )}
                  <View style={{ alignSelf: "flex-start" }}>
                    <Ionicons
                      name="ios-information-circle"
                      size={20}
                      color={"#0764af"}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View></View>
          )}
          <View style={{ marginRight: 15 }}>
            {job.id !== 285 &&
            job.id !== 286 &&
            job.id !== 288 &&
            job.id !== 289 ? (
              <View style={{ marginLeft: 0, marginBottom: 3 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: "#4a4b4c"
                  }}
                >
                  {lan == "en" ? "Number of units" : "عدد الوحدات"}
                </Text>
              </View>
            ) : (
              <View></View>
            )}

            <View
              style={{
                backgroundColor: "#6ea8cd",
                flexDirection: "row",
                justifyContent: "space-between",
                width: 95,
                height: 25,
                borderRadius: 12,
                alignSelf: "flex-end",
                marginTop: 5
              }}
            >
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 12.5,
                  backgroundColor: "#0764af",
                  alignSelf: "center",
                  marginTop: -1
                }}
              >
                <TouchableOpacity onPress={() => minus(job)}>
                  <View style={{ alignSelf: "center", marginTop: 0 }}>
                    <Ionicons name="ios-remove" size={26} color={"white"} />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ color: "white", fontSize: 13, paddingTop: 4 }}>
                  {job.items ? job.items : 0}
                </Text>
              </View>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 12.5,
                  backgroundColor: "#0764af",
                  marginTop: 0
                }}
              >
                <TouchableOpacity onPress={() => plus(job)}>
                  <View style={{ alignSelf: "center" }}>
                    <Ionicons name="ios-add" size={26} color={"white"} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default QuantitybaseJob;
