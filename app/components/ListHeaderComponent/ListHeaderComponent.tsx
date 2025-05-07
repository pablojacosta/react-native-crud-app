import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";
import { ColorSchemeName, StyleSheet } from "react-native";
import AddItem from "../AddItem/AddItem";
import HeaderComp from "../HeaderComp/HeaderComp";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

interface IListHeaderComponent {
  newItem: string;
  onChangeText: (text: string) => void;
  handleOnAdd: (item: string) => void;
}

const ListHeaderComponent = ({
  newItem,
  onChangeText,
  handleOnAdd,
}: IListHeaderComponent) => {
  const { colorScheme } = useContext(ThemeContext);
  const styles = createStyles(colorScheme);

  return (
    <>
      <ThemeToggle />

      <HeaderComp
        headerViewStyle={styles.header}
        headerTextStyle={styles.text}
      />

      <AddItem
        newItem={newItem}
        onChangeText={onChangeText}
        handleOnAdd={handleOnAdd}
      />
    </>
  );
};

export default ListHeaderComponent;

const createStyles = (colorScheme: ColorSchemeName) => {
  const isDark = colorScheme === "dark";

  return StyleSheet.create({
    header: {
      marginHorizontal: "auto",
    },
    text: {
      color: isDark ? "#e1e1e1" : "#000000",
      fontFamily: "Inter_500Medium",
    },
  });
};
