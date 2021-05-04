import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SizebaseJob = ({
  job,
  plusFloors,
  minusFloors,
  plusMeters,
  minusMeters,
  lan,
  index
}) => {
  console.log("size base job ", job);
  return (
    <View>
      <View style={{ marginLeft: 15, marginRight: 15 }}>
        {job.note && job.note !== null && index == 0 ? (
          <View
            style={{ backgroundColor: "white", marginLeft: 1, marginRight: 1 }}
          >
            <Text style={{ textAlign: "left", fontWeight: "bold" }}>
              {" "}
              {lan == "en" ? "Notes:" : "ملاحظات:"}
            </Text>
            <Text style={{ textAlign: "left", fontSize: 12 }}>
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
          backgroundColor: "white",
          borderTopWidth: index == 0 ? 1 : 0,
          borderWidth: 1,
          borderColor: "#283a97"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between"
          }}
        >
          <View>
            <View style={{ marginTop: 4, marginLeft: 4 }}>
              <Text
                style={{
                  color: "#0764af",

                  fontSize: 12,
                  textAlign: "left",
                  marginLeft: 4
                }}
              >
                {lan == "en" ? job.name : job.name_ar}
              </Text>
              <Text
                style={{
                  color: "#4a4b4c",

                  fontSize: 10,
                  marginTop: 6,
                  marginLeft: 4,
                  textAlign: "left"
                }}
              >
                {lan == "en" ? job.title : job.title_ar}
              </Text>
            </View>
            <View style={{ marginTop: 16, marginLeft: 4, marginBottom: 2 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 15, alignSelf: "flex-start" }}>
                  <View
                    style={{
                      backgroundColor: "#6ea8cd",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: 95,
                      height: 25,
                      borderRadius: 12,
                      alignSelf: "flex-end"
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
                      <TouchableOpacity
                        onPress={() => minusMeters(job)}
                      >
                        <View style={{ alignSelf: "center", marginTop: 0 }}>
                          <Ionicons
                            name="ios-remove"
                            size={26}
                            color={"white"}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text
                        style={{ color: "white", fontSize: 13, paddingTop: 4 }}
                      >
                        {job.meter ? job.meter : 0}
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
                      <TouchableOpacity onPress={() => plusMeters(job)}>
                        <View style={{ alignSelf: "center", marginTop: 0 }}>
                          <Ionicons name="ios-add" size={26} color={"white"} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text style={{ fontSize: 10, color: "#4a4b4c" }}>
                    (1m = {job.price} SAR)
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginRight: 4,
              marginBottom: 6
            }}
          >
            <View
              style={{
                flexDirection: lan == "en" ? "row" : "row-reverse",
                marginTop: 6,
                marginRight: 0
              }}
            >
              <Text
                style={{ fontSize: 10, color: "#0764af", fontWeight: "bold" }}
              >
                Total SAR{" "}
              </Text>
              <Text style={{ color: "#ff9c00", fontSize: 10 }}>
                {job.t_price ? job.t_price : 0}{" "}
              </Text>
            </View>
            <View style={{ marginBottom: 16, marginRight: 0, marginTop: -14 }}>
              <Text
                style={{
                  color: "#4a4b4c",

                  fontSize: 10,
                  marginTop: 20
                }}
              >
                {lan == "en" ? "Number of floors" : "عدد الطوابق"}
              </Text>
            </View>
            <View
              style={{
                marginRight: 10,
                alignSelf: "flex-start",
                marginBottom: 4
              }}
            >
              <View
                style={{
                  backgroundColor: "#6ea8cd",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 96,
                  height: 25,
                  borderRadius: 12,
                  alignSelf: "flex-end"
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
                  <TouchableOpacity onPress={() => minusFloors(job)}>
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
                    marginTop: -1
                  }}
                >
                  <TouchableOpacity onPress={() => plusFloors(job)}>
                    <View style={{ alignSelf: "center", marginTop: 0 }}>
                      <Ionicons name="ios-add" size={26} color={"white"} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SizebaseJob;
