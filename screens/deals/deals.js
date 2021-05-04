import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
const Deals = ({ props, deal, navigation, lan }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate( "PackageOffer", { lan: lan, deal: deal })}
  >
    <View
      style={{
        width: 90,
        height: 85,
        backgroundColor: "transparent",
        marginTop: 15,
        marginRight: 5,
        
      }}
    >
      <Image
        source={{ uri: lan == "en" ? deal.offerimage : deal.offerimage_ar }}
        style={{ width: 80, height: 75, alignSelf: "center" }}
        resizeMode="contain"
      />
    </View>
  </TouchableOpacity>
);
export default Deals;
