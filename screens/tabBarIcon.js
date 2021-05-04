import React from 'react';
import { Icon } from 'native-base';
import { Ionicons } from "@expo/vector-icons";

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={{ marginBottom: -3, color: props.focused ? '#283a97' : '#ccc'}}
    />
  );
}
