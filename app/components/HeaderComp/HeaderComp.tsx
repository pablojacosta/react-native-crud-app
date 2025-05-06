import React from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";

interface IHeaderComp {
  headerViewStyle: ViewStyle;
  headerTextStyle: TextStyle;
}

const HeaderComp = ({ headerViewStyle, headerTextStyle }: IHeaderComp) => (
  <View style={headerViewStyle}>
    <Text style={headerTextStyle}>TODO List</Text>
  </View>
);

export default HeaderComp;
