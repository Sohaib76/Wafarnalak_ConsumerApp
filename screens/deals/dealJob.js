import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const DealJob = ({ job, plus, minus, lan }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom:5
    }}
  >
    <View style={{flexWrap:'wrap', flex:1}}>
      <Text
        style={{
          fontSize: 10,
          color: "4a4b4c",
          margin: 8,
          textAlign:'left'
        }}
        numberOfLines={2}
        lineBreakMode="middle"
      >
        {lan == 'en' ? job.name : job.name_ar}
      </Text>
     
        <View
          style={{
            backgroundColor: "#0764af",
            marginLeft: 8,
           
            width: 90
          }}
        >
          <View
            style={{
              flexDirection: lan == "en" ? "row" : "row-reverse",
              alignSelf: "center",
              alignContent: "center",
                alignItems: "center",
              flex:1
            }}
          >
            <Text style={{ color: "white", fontSize: 12 }}>
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
            <Text style={{ color: "white", fontSize: 12 }}>
            {lan == "en" ? "/Unit" : "وحدة /"}
            </Text>
          </View>
        </View>
      
    </View>
    <View
      style={{
        backgroundColor: "#6ea8cd",
        flexDirection: "row",
        justifyContent: "space-between",
        width: 95,
        height: 25,
        marginRight:8,
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
          borderRadius: 12.5,
          marginTop:-1
        }}
      >
        <TouchableOpacity
          onPress={() => {
            minus(job);
          }}
        >
          <View
            style={{
              alignSelf: "center",
              marginTop: 0
            }}
          >
            <Ionicons name="ios-remove" size={26} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            color: "white",
            fontSize: 13,
            paddingTop: 4
          }}
        >
          {job.items ? job.items : 0}
        </Text>
      </View>
      <View
        style={{
          width: 25,
          height: 25,
         
          backgroundColor: "#0764af",
          borderRadius: 12.5,
          marginTop:0
        }}
      >
        <TouchableOpacity
          onPress={() => {
            plus(job);
          }}
        >
          <View
            style={{
              alignSelf: "center",
              marginTop: 0
            }}
          >
            <Ionicons name="ios-add" size={26} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
export default DealJob;
