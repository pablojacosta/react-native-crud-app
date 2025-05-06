import { Colors, ITheme } from "@/constants/Colors";
import { TODO_DATA } from "@/data/todos";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { useState } from "react";
import {
  Appearance,
  ColorSchemeName,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddItem from "./components/AddItem/AddItem";
import HeaderComp from "./components/HeaderComp/HeaderComp";
import ListItem from "./components/ListItem/ListItem";

export default function Index() {
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);
  const [data, setData] = useState(TODO_DATA.sort((a, b) => b.id - a.id));
  const [newItem, setNewItem] = useState("");

  const [loaded, error] = useFonts({ Inter_500Medium });

  if (!loaded && !error) {
    return null;
  }

  const handleOnDelete = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleOnAdd = (text: string) => {
    setData([{ id: data.length + 1, title: text, completed: false }, ...data]);
    setNewItem("");
  };

  const handleOnToggle = (id: number) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            <HeaderComp
              headerViewStyle={styles.header}
              headerTextStyle={styles.text}
            />
            <AddItem
              newItem={newItem}
              onChangeText={setNewItem}
              inputStyles={styles.input}
              handleOnAdd={handleOnAdd}
            />
          </>
        }
        renderItem={({ item }) => (
          <ListItem
            item={item}
            isCompleted={item.completed}
            viewStyle={styles.row}
            textStyle={styles.text}
            handleOnDelete={handleOnDelete}
            handleOnToggle={handleOnToggle}
          />
        )}
      ></FlatList>
    </Container>
  );
}

const createStyles = (theme: ITheme, colorScheme: ColorSchemeName) => {
  const isDark = colorScheme === "dark";

  return StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      width: "100%",
      gap: 10,
      backgroundColor: theme.background,
      paddingVertical: 16,
      minHeight: "100%",
    },
    row: {
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
    header: {
      marginHorizontal: "auto",
    },
    input: {
      width: "100%",
      height: 48,
      backgroundColor: "#ffffff",
      borderWidth: 2,
      borderRadius: 10,
      borderColor: isDark ? "rgba(167, 63, 63, 0.88)" : "#000000",
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
};
