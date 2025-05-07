import { ThemeContext } from "@/context/ThemeContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useContext } from "react";
import {
  ColorSchemeName,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

interface IAddItem {
  newItem: string;
  onChangeText: (text: string) => void;
  handleOnAdd: (item: string) => void;
}

const AddItem = ({ newItem, onChangeText, handleOnAdd }: IAddItem) => {
  const { colorScheme } = useContext(ThemeContext);
  const styles = createStyles(colorScheme);

  const handleOnPress = (newItem: string) => {
    if (!newItem) {
      return;
    }

    handleOnAdd(newItem);
  };

  return (
    <View style={styles.row}>
      <TextInput
        value={newItem}
        placeholder={"Add new item!"}
        placeholderTextColor="gray"
        onChangeText={(text) => onChangeText(text)}
        style={styles.input}
        maxLength={30}
      />

      <Pressable onPress={() => handleOnPress(newItem)} style={styles.button}>
        <Ionicons
          name="add-outline"
          size={24}
          color="rgba(167, 63, 63, 0.88)"
        />
      </Pressable>
    </View>
  );
};

export default AddItem;

const createStyles = (colorScheme: ColorSchemeName) => {
  const isDark = colorScheme === "dark";

  return StyleSheet.create({
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 48,
      width: "100%",
      marginTop: 10,
    },
    input: {
      width: "100%",
      height: 48,
      backgroundColor: "#ffffff",
      borderWidth: 2,
      borderRadius: 10,
      borderColor: isDark ? "rgba(167, 63, 63, 0.88)" : "#000000",
      padding: 10,
      flex: 1,
      fontFamily: "Inter_500Medium",
    },
    button: {
      paddingHorizontal: 13,
      position: "absolute",
      right: 0,
    },
  });
};
