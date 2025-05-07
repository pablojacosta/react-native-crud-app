import { ITheme } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";
import { IItem, TODO_DATA } from "@/data/todos";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import ListHeaderComponent from "./components/ListHeaderComponent/ListHeaderComponent";
import ListItem from "./components/ListItem/ListItem";

export default function Index() {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const Container = Platform.OS === "web" ? ScrollView : SafeAreaView;
  const styles = createStyles(theme);
  const [data, setData] = useState<IItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [loaded, error] = useFonts({ Inter_500Medium });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await AsyncStorage.getItem("CrudApp");
        const storageData = json !== null ? JSON.parse(json) : null;

        if (storageData && storageData.length > 0) {
          setData(storageData.sort((a: IItem, b: IItem) => b.id - a.id));
        } else {
          setData(TODO_DATA.sort((a, b) => b.id - a.id));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storeData = async () => {
      try {
        const json = JSON.stringify(data);
        await AsyncStorage.setItem("CrudApp", json);
      } catch (error) {
        console.error(error);
      }
    };

    storeData();
  }, [data]);

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

  const handleEdit = (id: number) => {
    router.push(`/todos/${id}`);
  };

  return (
    <Container>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <ListHeaderComponent
            newItem={newItem}
            onChangeText={setNewItem}
            handleOnAdd={handleOnAdd}
          />
        }
        renderItem={({ item }) => (
          <ListItem
            item={item}
            isCompleted={item.completed}
            handleOnDelete={handleOnDelete}
            handleOnToggle={handleOnToggle}
            handleEdit={handleEdit}
          />
        )}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"
      />

      <StatusBar style={"dark"} />
    </Container>
  );
}

const createStyles = (theme: ITheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      width: "100%",
      gap: 10,
      backgroundColor: theme.background,
      paddingVertical: 16,
      minHeight: "100%",
    },
  });
