import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

interface IAddItem {
  newItem: string;
  onChangeText: (text: string) => void;
  inputStyles: ViewStyle;
  handleOnAdd: (item: string) => void;
}

const AddItem = ({
  newItem,
  onChangeText,
  inputStyles,
  handleOnAdd,
}: IAddItem) => {
  const placeholder = "Add new item!";

  const styles = StyleSheet.create({
    input: {
      height: "100%",
      padding: 10,
      width: "100%",
      flex: 1,
      fontFamily: "Inter_500Medium",
    },
    button: {
      paddingHorizontal: 10,
    },
  });

  const handleOnPress = (newItem: string) => {
    if (!newItem) {
      return;
    }

    handleOnAdd(newItem);
  };

  return (
    <View style={inputStyles}>
      <TextInput
        value={newItem}
        placeholder={placeholder}
        placeholderTextColor="gray"
        onChangeText={(text) => onChangeText(text)}
        style={styles.input}
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
