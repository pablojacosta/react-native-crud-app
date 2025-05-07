import { ThemeContext } from "@/context/ThemeContext";
import Octicons from "@expo/vector-icons/Octicons";
import React, { useContext } from "react";
import { Pressable } from "react-native";

const ThemeToggle = () => {
  const { theme, colorScheme, setColorScheme } = useContext(ThemeContext);
  const isDark = colorScheme === "dark";

  return (
    <Pressable
      onPress={() => setColorScheme(!isDark ? "dark" : "light")}
      style={{
        marginHorizontal: "auto",
        marginBottom: 16,
      }}
    >
      {isDark && <Octicons name="sun" size={28} color={theme.text} />}

      {!isDark && <Octicons name="moon" size={28} color={theme.text} />}
    </Pressable>
  );
};

export default ThemeToggle;
