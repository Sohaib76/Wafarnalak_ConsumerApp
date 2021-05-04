import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Dash from "react-native-dash";
import { widthPercentageToDP } from "react-native-responsive-screen";

const VarientbaseJob = ({
  job,
  plus,
  minus,
  lan,
  calculateVarient,
  calculateSubVariant,
  minusVarient,
  plusVarient,
  index
}) => {
  console.log("varient base job ", job);
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
                // textAlign: "justify",
                paddingHorizontal: widthPercentageToDP(2),
                fontSize: 12,
                textAlign: "left"
              }}
            >
              {lan == "en"
                ? job.note
                : job.id !== 299 && job.id !== 298 && job.id !== 297
                ? job.note_ar
                : " 1.سيقوم الفني بزيارتك للسماح لك باختيار شركة الطلاء واللون" +
                  "\n 2.لكل غرفة تختارها ستحصل على طلاء للحمام او المطبخ مجاناً"}
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
          borderTopWidth: 1
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
                color: "#0764af",
                fontFamily: "montserrat_semi_blod",
                fontSize: 12,
                textAlign: "left",
                width: Dimensions.get("screen").width - 140
              }}
            >
              {lan === "en" ? job.name : job.name_ar}
            </Text>
          </View>
          <View style={{ marginRight: 26, marginTop: 8 }}>
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
            marginBottom: 15
          }}
        >
          <View style={{ marginLeft: 12, marginTop: 12 }}>
            <View>
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
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12
                    }}
                  >
                    {lan == "en" ? "/Unit" : "وحدة /"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginRight: 15 }}>
            <View
              style={{
                marginLeft: -20,
                marginBottom: 3,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 10
              }}
            >
              <Text style={{ fontSize: 12, color: "#4a4b4c" }}>
                {lan == "en" ? "Number of rooms" : "عدد الوحدات"}
              </Text>
            </View>
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
                  alignSelf: "center"
                }}
              >
                <TouchableOpacity onPress={() => minus(job)}>
                  <View style={{ alignSelf: "center" }}>
                    <Ionicons name="ios-remove" size={24} color={"white"} />
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={{ color: "white", fontSize: 13, paddingTop: 2 }}>
                  {job.items ? job.items : 0}
                </Text>
              </View>
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 12.5,
                  backgroundColor: "#0764af",
                  marginTop: 0,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <TouchableOpacity onPress={() => plus(job)}>
                  <View
                    style={{
                      alignSelf: "center"
                    }}
                  >
                    <Ionicons name="ios-add" size={24} color={"white"} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* <View>
        <Text
          style={{
            color: "#0764af",
            fontSize: 12,
            alignSelf: "flex-start",
            marginTop: 4,
            marginBottom: 2,
            textAlign: "left"
          }}
        >
          {lan == "en"
            ? "Please select if you need a bulb (optional)"
            : "يرجى التحديد اذا كنت تريد مصابيح (إختياري)"}
        </Text>
      </View> */}
        {job.jobserviceName == "Appartment" && (
          <Dash
            dashColor={"#4a4b4c"}
            style={{ width: Dimensions.get("screen").width - 50 }}
            dashGap={1}
          />
        )}

        {job.variants &&
          job.variants.map(function(varient, index) {
            return (
              <View>
                <View
                  style={{
                    alignSelf: "flex-end",
                    justifyContent: "space-between",
                    flexDirection: "row"
                  }}
                >
                  <View
                    style={{ marginRight: Dimensions.get("screen").width / 5 }}
                  >
                    <Text style={{ color: "#0764af" }}>
                      {lan == "en"
                        ? varient.variant_name
                        : varient.variantname_ar}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row-reverse" }}>
                    <Text style={{ color: "#0764af" }}>Total SAR </Text>
                    <Text style={{ color: "#ff9c00" }}>
                      {varient.t_price ? varient.t_price : 0}
                    </Text>
                  </View>
                </View>
                {varient.variants_attr &&
                  varient.variants_attr.map(function(var_attr, index) {
                    return (
                      <View>
                        <View>
                          <Text style={{ color: "#4a4b4c", textAlign: "left" }}>
                            {lan == "en" ? var_attr.title : var_attr.title_ar}
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", flexWrap: "wrap" }}
                        >
                          {var_attr.attr.map(function name(attr, index) {
                            if (attr.attr_type == 1) {
                              return (
                                <TouchableOpacity
                                  onPress={() =>
                                    calculateVarient(attr, varient, job)
                                  }
                                >
                                  <View>
                                    <View style={{ alignSelf: "flex-start" }}>
                                      <View style={{ alignSelf: "center" }}>
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            color: "#4a4b4c"
                                          }}
                                        >
                                          {lan == "en"
                                            ? attr.attr_name
                                            : attr.attr_name_ar}
                                        </Text>
                                      </View>
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          marginLeft: 3,
                                          marginTop: -8
                                        }}
                                      >
                                        <View style={{ marginTop: 9 }}>
                                          <Ionicons
                                            name={
                                              attr.selected &&
                                              attr.selected == true
                                                ? "ios-checkmark-circle"
                                                : "ios-checkmark-circle-outline"
                                            }
                                            size={16}
                                            color={"#0865b0"}
                                          />
                                        </View>
                                        <View
                                          style={{
                                            backgroundColor: "#0764af",
                                            margin: 8
                                          }}
                                        >
                                          <View
                                            style={{
                                              flexDirection:
                                                lan == "en"
                                                  ? "row"
                                                  : "row-reverse"
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
                                              {attr.attr_price}
                                            </Text>
                                            <Text
                                              style={{
                                                color: "white",
                                                fontSize: 12
                                              }}
                                            >
                                              {lan == "en" ? "/Unit" : "وحدة /"}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              );
                            }
                            if (attr.attr_type == 2) {
                              return (
                                <TouchableOpacity
                                  onPress={() =>
                                    calculateVarient(attr, varient, job)
                                  }
                                >
                                  <View style={{ flexDirection: "column" }}>
                                    <View
                                      style={{
                                        alignSelf: "flex-start",
                                        flexDirection: "row"
                                      }}
                                    >
                                      <View style={{ flexDirection: "row" }}>
                                        <View style={{ flexDirection: "row" }}>
                                          <View
                                            style={{
                                              marginTop: 11,
                                              marginLeft: 4
                                            }}
                                          >
                                            <Ionicons
                                              name={
                                                attr.selected &&
                                                attr.selected == true
                                                  ? "ios-checkmark-circle"
                                                  : "ios-checkmark-circle-outline"
                                              }
                                              size={16}
                                              color={"#0865b0"}
                                            />
                                          </View>
                                          <View
                                            style={{
                                              backgroundColor: "#0764af",
                                              margin: 8
                                            }}
                                          >
                                            <Text
                                              style={{
                                                color: "white",
                                                padding: 2,
                                                fontSize: 12
                                              }}
                                            >
                                              {lan == "en"
                                                ? attr.attr_name
                                                : attr.attr_name_ar}
                                            </Text>
                                          </View>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              );
                            }
                            if (attr.attr_type == 3) {
                              return (
                                <TouchableOpacity
                                  onPress={() =>
                                    calculateVarient(attr, varient, job)
                                  }
                                >
                                  <View style={{ alignSelf: "flex-start" }}>
                                    <View style={{ flexDirection: "row" }}>
                                      <View style={{ flexDirection: "row" }}>
                                        <View
                                          style={{
                                            marginTop: 11,
                                            marginLeft: 4
                                          }}
                                        >
                                          <Ionicons
                                            name={
                                              attr.selected &&
                                              attr.selected == true
                                                ? "ios-checkmark-circle"
                                                : "ios-checkmark-circle-outline"
                                            }
                                            size={16}
                                            color={"#0865b0"}
                                          />
                                        </View>
                                        <View
                                          style={{
                                            backgroundColor: "#0764af",
                                            margin: 8
                                          }}
                                        >
                                          <Text
                                            style={{
                                              color: "white",
                                              padding: 2,
                                              fontSize: 12
                                            }}
                                          >
                                            {lan == "en"
                                              ? attr.attr_name
                                              : attr.attr_name_ar}
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              );
                            }
                          })}
                        </View>
                      </View>
                    );
                  })}
                {varient.subvariants &&
                  varient.subvariants.map(function(sub_var, index) {
                    return (
                      <View>
                        <View>
                          <Text style={{ color: "#4a4b4c", textAlign: "left" }}>
                            {lan == "en"
                              ? sub_var.subvariantname
                              : sub_var.subvariantname_ar}
                          </Text>
                        </View>
                        <View
                          style={{ flexDirection: "row", flexWrap: "wrap" }}
                        >
                          {sub_var.subvariants_attr &&
                            sub_var.subvariants_attr.map(function name(
                              sub_attr,
                              index
                            ) {
                              return (
                                <View>
                                  <View>
                                    <Text>
                                      {lan == "en"
                                        ? sub_attr.title
                                        : sub_attr.title_ar}
                                    </Text>
                                    {sub_attr.attr.map(function(attr) {
                                      if (attr.attr_type == 1) {
                                        return (
                                          <TouchableOpacity
                                            onPress={() =>
                                              calculateSubVariant(
                                                attr,
                                                varient,
                                                job
                                              )
                                            }
                                          >
                                            <View>
                                              <View
                                                style={{
                                                  alignSelf: "flex-start"
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    alignSelf: "center"
                                                  }}
                                                >
                                                  <Text
                                                    style={{
                                                      fontSize: 12,
                                                      color: "#4a4b4c"
                                                    }}
                                                  >
                                                    {lan == "en"
                                                      ? attr.attr_name
                                                      : attr.attr_name_ar}
                                                  </Text>
                                                </View>
                                                <View
                                                  style={{
                                                    flexDirection: "row",
                                                    marginLeft: 3,
                                                    marginTop: -8
                                                  }}
                                                >
                                                  <View
                                                    style={{ marginTop: 9 }}
                                                  >
                                                    <Ionicons
                                                      name={
                                                        attr.selected &&
                                                        attr.selected == true
                                                          ? "ios-checkmark-circle"
                                                          : "ios-checkmark-circle-outline"
                                                      }
                                                      size={16}
                                                      color={"#0865b0"}
                                                    />
                                                  </View>
                                                  <View
                                                    style={{
                                                      backgroundColor:
                                                        "#0764af",
                                                      margin: 8
                                                    }}
                                                  >
                                                    <View
                                                      style={{
                                                        flexDirection: "row"
                                                      }}
                                                    >
                                                      <Text
                                                        style={{
                                                          color: "white",
                                                          fontSize: 12
                                                        }}
                                                      >
                                                        {lan == "en"
                                                          ? "SAR"
                                                          : "ر.س"}{" "}
                                                      </Text>
                                                      <Text
                                                        style={{
                                                          color: "#ff9c00",
                                                          fontSize: 12
                                                        }}
                                                      >
                                                        {attr.attr_price}
                                                      </Text>
                                                      <Text
                                                        style={{
                                                          color: "white",
                                                          fontSize: 12
                                                        }}
                                                      >
                                                        {lan == "en"
                                                          ? "/Unit"
                                                          : "/وحدة"}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                </View>
                                              </View>
                                            </View>
                                          </TouchableOpacity>
                                        );
                                      }
                                      if (attr.attr_type == 2) {
                                        return (
                                          <TouchableOpacity
                                            onPress={() =>
                                              calculateSubVariant(
                                                attr,
                                                varient,
                                                job
                                              )
                                            }
                                          >
                                            <View
                                              style={{
                                                flexDirection: "column"
                                              }}
                                            >
                                              <View
                                                style={{
                                                  alignSelf: "flex-start",
                                                  flexDirection: "row"
                                                }}
                                              >
                                                <View
                                                  style={{
                                                    flexDirection: "row"
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      flexDirection: "row"
                                                    }}
                                                  >
                                                    <View
                                                      style={{
                                                        marginTop: 11,
                                                        marginLeft: 4
                                                      }}
                                                    >
                                                      <Ionicons
                                                        name={
                                                          attr.selected &&
                                                          attr.selected == true
                                                            ? "ios-checkmark-circle"
                                                            : "ios-checkmark-circle-outline"
                                                        }
                                                        size={16}
                                                        color={"#0865b0"}
                                                      />
                                                    </View>
                                                    <View
                                                      style={{
                                                        backgroundColor:
                                                          "#0764af",
                                                        margin: 8
                                                      }}
                                                    >
                                                      <Text
                                                        style={{
                                                          color: "white",
                                                          padding: 2,
                                                          fontSize: 12
                                                        }}
                                                      >
                                                        {lan == "en"
                                                          ? attr.attr_name
                                                          : attr.attr_name_ar}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                </View>
                                              </View>
                                            </View>
                                          </TouchableOpacity>
                                        );
                                      }
                                      if (attr.attr_type == 3) {
                                        return (
                                          <TouchableOpacity
                                            onPress={() =>
                                              calculateSubVariant(
                                                attr,
                                                varient,
                                                job
                                              )
                                            }
                                          >
                                            <View
                                              style={{
                                                alignSelf: "flex-start"
                                              }}
                                            >
                                              <View
                                                style={{ flexDirection: "row" }}
                                              >
                                                <View
                                                  style={{
                                                    flexDirection: "row"
                                                  }}
                                                >
                                                  <View
                                                    style={{
                                                      marginTop: 11,
                                                      marginLeft: 4
                                                    }}
                                                  >
                                                    <Ionicons
                                                      name={
                                                        attr.selected &&
                                                        attr.selected == true
                                                          ? "ios-checkmark-circle"
                                                          : "ios-checkmark-circle-outline"
                                                      }
                                                      size={16}
                                                      color={"#0865b0"}
                                                    />
                                                  </View>
                                                  <View
                                                    style={{
                                                      backgroundColor:
                                                        "#0764af",
                                                      margin: 8
                                                    }}
                                                  >
                                                    <Text
                                                      style={{
                                                        color: "white",
                                                        padding: 2,
                                                        fontSize: 12
                                                      }}
                                                    >
                                                      {lan == "en"
                                                        ? attr.attr_name
                                                        : attr.attr_name_ar}
                                                    </Text>
                                                  </View>
                                                </View>
                                              </View>
                                            </View>
                                          </TouchableOpacity>
                                        );
                                      }
                                    })}
                                  </View>
                                </View>
                              );
                            })}
                        </View>
                      </View>
                    );
                  })}
                <View
                  style={{
                    marginRight: 15,
                    marginBottom: 6
                  }}
                >
                  <View style={{ marginBottom: 3, alignSelf: "flex-end" }}>
                    {/* <Text style={{ fontSize: 12, color: "#4a4b4c" }}>
                    {lan == "en" ? "Number of units" : "عدد الوحدات"}
                  </Text> */}
                  </View>
                  <View
                    style={{
                      backgroundColor: "#6ea8cd",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: 70,
                      height: 20,
                      borderRadius: 8,
                      alignSelf: "flex-end"
                    }}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: "#0764af",
                        alignSelf: "center"
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => minusVarient(varient, job)}
                      >
                        <View style={{ alignSelf: "center" }}>
                          <Ionicons
                            name="ios-remove"
                            size={24}
                            color={"white"}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 13,
                          paddingTop: 2
                        }}
                      >
                        {varient.items ? varient.items : 0}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: "#0764af"
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => plusVarient(varient, job)}
                      >
                        <View style={{ alignSelf: "center", marginTop: -2 }}>
                          <Ionicons name="ios-add" size={24} color={"white"} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        <View></View>
      </View>
    </View>
  );
};
export default VarientbaseJob;
