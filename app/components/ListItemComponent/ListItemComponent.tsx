import { IItem } from "@/data/todos";
import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

interface IListComponent {
  item: IItem;
  isCompleted: boolean;
  viewStyle: ViewStyle;
  textStyle: TextStyle;
}

const ListItemComponent = ({
  item,
  isCompleted,
  viewStyle,
  textStyle,
}: IListComponent) => {
  return (
    <View style={viewStyle}>
      <Text style={[textStyle, isCompleted && styles.completedText]}>
        {item.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});

export default ListItemComponent;
