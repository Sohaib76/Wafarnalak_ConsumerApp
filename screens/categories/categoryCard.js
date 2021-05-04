import { Image, Text, TouchableOpacity, View } from "react-native";

import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";

const CategoryCard = ({
  props,
  lan,
  category,
  categorySelection,
  selectedCategoryId,
  women,
  white,
  location,
  openVideoPopup,
  item
}) => {
  // console.log("item ", item);
  return (
    <View style={{ flex: 1, justifyContent: "space-around" }}>
      <TouchableOpacity onPress={() => categorySelection(category)}>
        <View
          style={{
            marginLeft: 0,
            marginTop: 10,
            marginBottom: 5,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 2,
            paddingHorizontal: 4,
            backgroundColor:
              selectedCategoryId == category.id
                ? women
                  ? "#f02fc2"
                  : "#0865b0"
                : "transparent",
            borderRadius: selectedCategoryId == category.id ? 6 : 0
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingLeft: 4,
              paddingRight: 4,
              paddingTop: 4,
              paddingBottom: 4
            }}
          >
            <Image
              source={{
                uri:
                  selectedCategoryId == category.id
                    ? category.white_icon
                    : category.seo_name
              }}
              style={{
                width: 25,
                height: 25,
                marginRight: 5,
                tintColor:
                  selectedCategoryId == category.id
                    ? "white"
                    : white
                    ? "white"
                    : "black"
              }}
              resizeMode="contain"
            />
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  paddingLeft: 6,
                  color: white
                    ? "white"
                    : selectedCategoryId == category.id
                    ? "white"
                    : "black",
                  fontSize: 12
                }}
              >
                {lan == "en" ? category.name : category.name_ar}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openVideoPopup(item)}>
        <Image
          style={{
            alignSelf: "center",
            width: 85,
            height: 75,
            marginRight: 5,
            marginTop: 5
          }}
          resizeMode="contain"
          source={
            lan == "en"
              ? require("../../assets/Services-Icons-min.png")
              : require("../../assets/Check-our-Video-Arabic-min.png")
          }
        />
      </TouchableOpacity>
    </View>
  );
};
export default CategoryCard;
