import { IItem } from "@/data/todos";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

interface IListItem {
  item: IItem;
  isCompleted: boolean;
  viewStyle: ViewStyle;
  textStyle: TextStyle;
  handleOnDelete: (id: number) => void;
  handleOnToggle: (id: number) => void;
}

const ListItem = ({
  item,
  isCompleted,
  viewStyle,
  textStyle,
  handleOnDelete,
  handleOnToggle,
}: IListItem) => {
  return (
    <View style={[viewStyle, styles.item]}>
      <Text
        style={[textStyle, isCompleted && styles.completedText]}
        onPress={() => handleOnToggle(item.id)}
      >
        {item.title}
      </Text>

      <Pressable onPress={() => handleOnDelete(item.id)}>
        <Ionicons
          name="trash-outline"
          size={24}
          color="rgba(167, 63, 63, 0.88)"
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    pointerEvents: "auto",
  },
});

export default ListItem;
