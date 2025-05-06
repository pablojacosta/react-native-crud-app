import { Colors, ITheme } from "@/constants/Colors";
import { TODO_DATA } from "@/data/todos";
import {
  Appearance,
  ColorSchemeName,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "./components/HeaderComp/HeaderComp";
import ListItemComponent from "./components/ListItemComponent/ListItemComponent";

const createStyles = (theme: ITheme, colorScheme: ColorSchemeName) => {
  const isDark = colorScheme === "dark";

  return StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      paddingHorizontal: 10,
      width: "100%",
      gap: 10,
      backgroundColor: theme.background,
      paddingVertical: 16,
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
    },
    header: {
      marginHorizontal: "auto",
    },
  });
};

export default function Index() {
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const colorScheme = Appearance.getColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;
  const styles = createStyles(theme, colorScheme);

  return (
    <Container>
      <FlatList
        data={TODO_DATA}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <HeaderComp
            headerViewStyle={styles.header}
            headerTextStyle={styles.text}
          />
        }
        renderItem={({ item }) => (
          <ListItemComponent
            item={item}
            isCompleted={item.completed}
            viewStyle={styles.row}
            textStyle={styles.text}
          />
        )}
      ></FlatList>
    </Container>
  );
}
