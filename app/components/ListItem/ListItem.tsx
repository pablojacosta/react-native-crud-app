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
}

const ListItem = ({
  item,
  isCompleted,
  handleOnDelete,
  handleOnToggle,
}: IListItem) => {
  const { colorScheme } = useContext(ThemeContext);
  const styles = createStyles(colorScheme);

  return (
    <View style={styles.item}>
      <Text
        style={[styles.text, isCompleted && styles.completedText]}
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
