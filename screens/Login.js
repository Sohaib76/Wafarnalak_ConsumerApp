import { Button } from "native-base";
import React from "react";
import { View, Text } from "react-native";

export default function Login() {
  return (
    <View>
      <Button style={{ justifyContent: "center" }}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
      </Button>
    </View>
  );
}
