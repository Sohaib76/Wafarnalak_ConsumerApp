import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Cleaning = ({ job, selectJob, lan, index }) => {
  console.log("cleaning ", job);
  return (
    <View>
      {/* <View style={{ marginLeft: 15, marginRight: 15 }}>
      {job.note && job.note !== null && index == 0 ? (
        <View
          style={{ backgroundColor: "white", marginLeft: 1, marginRight: 1 }}
        >
          <Text style={{ fontWeight: "bold", textAlign: "left" }}>
            {" "}
            {lan == "en" ? "Notes:" : "ملاحظات:"}
          </Text>
          <Text style={{ textAlign: "left", fontSize: 12 }}>
            {lan == "en" ? job.note : job.note_ar}
            By scheduling the visit you agree that this only visit/ inspection charge the professional would share the service prices after the inspection.
          </Text>
        </View>
      ) : (
        <View></View>
      )}
    </View> */}
      {job.jobserviceName == "Carpet Cleaning" ||
      job.name == "Carpet Cleaning  [4X3m]" ? (
        <TouchableOpacity onPress={() => selectJob(job)}>
          <View>
            <View
              style={{
                backgroundColor: "white",
                marginLeft: 15,
                marginRight: 15,
                marginBottom: 5
              }}
            >
              <Text style={{ fontWeight: "bold", textAlign: "left" }}>
                {lan == "en" ? "Notes:" : "ملاحظات:"}
              </Text>
              <Text style={{ textAlign: "left", fontSize: 9 }}>
                {lan == "en"
                  ? "1- The mentioned carpet cleaning price are approx charges, professional will share the actual price after inspecting the carpet(s).\n" +
                    "2- The per meter price can be reduced and you may get additional discount, if number of carpets are more than 3."
                  : "1-" +
                    " السعر المحدد لتنظيف الموكيت فقط تقريبي حيث سيقوم الفني بتحديد السعر الحقيقي بعد الفحص" +
                    "\n" +
                    "2-" +
                    " بالإمكان الحصول على تخفيض اضافي في السعر لكل متر اذا كان عدد الموكيت اكثر من ثلاث"}
              </Text>
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
              <View style={{ alignSelf: "center" }}>
                <Text
                  style={{
                    color: "#0764af",
                    fontFamily: "montserrat_semi_blod",
                    fontSize: 12,
                    textAlign: "center",
                    marginTop: 7
                    // alignSelf: "center"
                  }}
                  numberOfLines={2}
                >
                  {job.jobserviceName == "Carpet Cleaning" ||
                  job.name == "Carpet Cleaning  [4X3m]"
                    ? null
                    : lan == "en"
                    ? job.name
                    : job.name_ar}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: 8,
                  marginRight: 6
                }}
              >
                <View
                  style={{
                    marginTop: 4,
                    width: 200
                  }}
                >
                  <Text
                    style={{
                      color: "#0764af",
                      fontFamily: "montserrat_semi_blod",
                      fontSize: 12,
                      textAlign: "left",
                      width: Dimensions.get("screen").width - 140,
                      marginTop: 7
                    }}
                    numberOfLines={2}
                  >
                    {lan == "en" ? "Approx Charges" : "تقريبا"}
                  </Text>
                </View>
                <View style={{ marginLeft: 5, marginTop: 10 }}>
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
                          {job.jobserviceName !== "Carpet Cleaning" &&
                          job.name !== "Carpet Cleaning  [4X3m]"
                            ? 10 * 3
                            : lan == "en"
                            ? "8-10/m"
                            : " 8-10 م"}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 12
                          }}
                        >
                          {/* {lan == "en" ? "/meter" : "م /"} */}
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
                  marginLeft: 8,
                  marginRight: 6,
                  alignItems: "center"
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
                      marginTop: 20,
                      textAlign: "left",
                      width: Dimensions.get("screen").width - 140
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
                        {/* {job.price} */}
                        {job.id == 333 ? 400 : job.price}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12
                        }}
                      >
                        {/* {lan == "en" ? "/Unit" : "وحدة /"} */}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View
                    style={{
                      backgroundColor: "#0764af",
                      width: 90,
                      paddingVertical: 5,
                      marginTop: 27
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
                        {/* {lan == "en" ? "/Unit" : "وحدة /"} */}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 7,
                  marginBottom: 15
                }}
              >
                <View style={{ marginLeft: 12, marginTop: 0 }}>
                  <View>
                    {/* <View
                 style={{
                   backgroundColor: "#0764af",
                   width: 90,
                   paddingVertical: 5,
                   marginTop: 27
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
               </View> */}
                  </View>
                </View>

                <View
                  style={{
                    alignSelf: "center",
                    marginRight: lan == "en" ? 15 : 20,
                    paddingLeft: "50%"
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
                      marginRight: 20,
                      marginTop: 0,
                      marginLeft: 25
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  marginLeft: 15,
                  marginRight: 15,
                  marginBottom: 5
                }}
              >
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
          </View>
        </TouchableOpacity>
      ) : (
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
                  textAlign: "center",
                  marginTop: 7,
                  alignSelf: "center"
                }}
                numberOfLines={2}
              >
                {job.jobserviceName == "Carpet Cleaning" ||
                job.name == "Carpet Cleaning  [4X3m]"
                  ? null
                  : lan == "en"
                  ? job.name
                  : job.name_ar}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginLeft: 8,
                marginRight: 6
              }}
            >
              <View
                style={{
                  marginTop: 4,
                  width: 200
                }}
              >
                <Text
                  style={{
                    color: "#0764af",
                    fontFamily: "montserrat_semi_blod",
                    fontSize: 12,
                    textAlign: "left",
                    width: Dimensions.get("screen").width - 140,
                    marginTop: 7
                  }}
                  numberOfLines={2}
                >
                  {lan == "en" ? "Approx Charges" : "تقريبا"}
                </Text>
              </View>
              <View style={{ marginLeft: 5, marginTop: 10 }}>
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
                        {job.jobserviceName !== "Carpet Cleaning" &&
                        job.name !== "Carpet Cleaning  [4X3m]"
                          ? job.id == 332
                            ? 400
                            : job.id == 333
                            ? 500
                            : job.id == 334
                            ? 600
                            : job.id == 335
                            ? 1800
                            : job.id == 336
                            ? 1400
                            : job.id == 337
                            ? 400
                            : job.id == 338
                            ? 400
                            : job.id == 339
                            ? 500
                            : job.id == 341
                            ? 300
                            : job.id == 342
                            ? 550
                            : job.price
                          : lan == "en"
                          ? "8-10/m"
                          : " 8-10 م"}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 12
                        }}
                      >
                        {/* {lan == "en" ? "/meter" : "م /"} */}
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
                marginLeft: 8,
                marginRight: 6,
                alignItems: "center"
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
                    marginTop: 20,
                    textAlign: "left",
                    width: Dimensions.get("screen").width - 140
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
                    <Text
                      style={{
                        color: "white",
                        fontSize: 12
                      }}
                    >
                      {/* {lan == "en" ? "/Unit" : "وحدة /"} */}
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: "#0764af",
                    width: 90,
                    paddingVertical: 5,
                    marginTop: 27
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
                      {/* {lan == "en" ? "/Unit" : "وحدة /"} */}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 7,
                marginBottom: 15
              }}
            >
              <View style={{ marginLeft: 12, marginTop: 0 }}>
                {/* <View
                style={{
                  backgroundColor: "#0764af",
                  width: 90,
                  paddingVertical: 5,
                  marginTop: 27
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
              </View> */}
              </View>

              <View
                style={{
                  alignSelf: "flex-end",
                  marginRight: lan == "en" ? 15 : 20,
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
      )}
    </View>
  );
};

export default Cleaning;
