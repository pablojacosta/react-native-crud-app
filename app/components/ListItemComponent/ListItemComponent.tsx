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

interface IListComponent {
  item: IItem;
  isCompleted: boolean;
  viewStyle: ViewStyle;
  textStyle: TextStyle;
  handleOnDelete: (id: number) => void;
}

const ListItemComponent = ({
  item,
  isCompleted,
  viewStyle,
  textStyle,
  handleOnDelete,
}: IListComponent) => {
  return (
    <View style={[viewStyle, styles.item]}>
      <Text style={[textStyle, isCompleted && styles.completedText]}>
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ListItemComponent;
