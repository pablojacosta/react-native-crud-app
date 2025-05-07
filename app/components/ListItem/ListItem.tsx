import { ThemeContext } from "@/context/ThemeContext";
import { IItem } from "@/data/todos";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext } from "react";
import {
  ColorSchemeName,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface IListItem {
  item: IItem;
  isCompleted: boolean;
  handleOnDelete: (id: number) => void;
  handleOnToggle: (id: number) => void;
  handleEdit: (id: number) => void;
}

const ListItem = ({
  item,
  isCompleted,
  handleOnDelete,
  handleOnToggle,
  handleEdit,
}: IListItem) => {
  const { colorScheme } = useContext(ThemeContext);
  const styles = createStyles(colorScheme);

  return (
    <Pressable
      onPress={() => handleEdit(item.id)}
      onLongPress={() => handleOnToggle(item.id)}
    >
      <View style={styles.item}>
        <Text style={[styles.text, isCompleted && styles.completedText]}>
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
    </Pressable>
  );
};

const createStyles = (colorScheme: ColorSchemeName) => {
  const isDark = colorScheme === "dark";

  return StyleSheet.create({
    completedText: {
      textDecorationLine: "line-through",
      color: "gray",
    },
    item: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      pointerEvents: "auto",
      width: "100%",
      padding: 10,
      borderWidth: 2,
      borderRadius: 10,
      borderColor: isDark ? "rgba(167, 63, 63, 0.88)" : "#000000",
    },
    text: {
      color: isDark ? "#e1e1e1" : "#000000",
      fontFamily: "Inter_500Medium",
    },
  });
};

export default ListItem;
