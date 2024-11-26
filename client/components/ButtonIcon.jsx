import React from "react";
import { StyleSheet } from "react-native";
import { Image, TouchableOpacity } from "react-native";

const ButtonIcon = ({ handleClick, iconPath }) => {
  return (
    <TouchableOpacity onPress={handleClick}>
      <Image source={iconPath} />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
