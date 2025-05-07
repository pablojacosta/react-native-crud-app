import { createContext, ReactNode, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";
import { Colors, ITheme } from "../constants/Colors";

interface ThemeContextType {
  colorScheme: ColorSchemeName;
  setColorScheme: (colorScheme: ColorSchemeName) => void;
  theme: ITheme;
}

export const ThemeContext = createContext({} as ThemeContextType);

interface IThemeProvider {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: IThemeProvider) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider value={{ colorScheme, setColorScheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
