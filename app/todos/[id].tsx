import { ITheme } from "@/constants/Colors";
import { ThemeContext } from "@/context/ThemeContext";
import { IItem } from "@/data/todos";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import {
  ColorSchemeName,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";

const EditScreen = () => {
  const { id } = useLocalSearchParams();
  const { theme, colorScheme } = useContext(ThemeContext);
  const router = useRouter();
  const styles = createStyles(theme, colorScheme);
  const [loaded, error] = useFonts({ Inter_500Medium });
  const [storageData, setStorageData] = useState<IItem[]>();
  const [todo, setTodo] = useState<IItem>();

  useEffect(() => {
    const fetchData = async (id: string | string[]) => {
      try {
        const json = await AsyncStorage.getItem("CrudApp");
        const storageData = json !== null ? JSON.parse(json) : null;
        setStorageData(storageData);

        if (storageData && storageData.length > 0) {
          const newTodo = storageData.find(
            (item: IItem) => item.id.toString() === id,
          );
          setTodo(newTodo);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!id) {
      return;
    }

    fetchData(id);
  }, [id]);

  if (!loaded && !error) {
    return null;
  }

  const handleSave = async () => {
    if (!todo) {
      return;
    }

    try {
      const savedTodo = { ...todo, title: todo.title };

      if (storageData && storageData.length > 0) {
        const otherTodos = storageData.filter(
          (item: IItem) => item.id.toString() !== id,
        );
        const updatedData = [...otherTodos, savedTodo];

        await AsyncStorage.setItem("CrudApp", JSON.stringify(updatedData));
      } else {
        await AsyncStorage.setItem("CrudApp", JSON.stringify([savedTodo]));
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemeToggle />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Edit todo"
          placeholderTextColor="gray"
          value={todo?.title || ""}
          onChangeText={(text) =>
            setTodo((prevState) => {
              if (prevState?.id) return { ...prevState, title: text };
            })
          }
          maxLength={30}
        />
      </View>

      <View style={styles.inputContainer}>
        <Pressable onPress={() => handleSave()} style={styles.button}>
          <Text style={styles.text}>Save</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/")}
          style={[
            styles.button,
            { backgroundColor: "rgba(167, 63, 63, 0.88)" },
          ]}
        >
          <Text style={[styles.text, { color: "white" }]}>Cancel</Text>
        </Pressable>
      </View>

      <StatusBar style={"dark"} />
    </SafeAreaView>
  );
};

export default EditScreen;

const createStyles = (theme: ITheme, colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      width: "100%",
      gap: 10,
      backgroundColor: theme.background,
      paddingVertical: 16,
      minHeight: "100%",
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      gap: 16,
      width: "100%",
      maxWidth: 1024,
      marginHorizontal: "auto",
      pointerEvents: "auto",
      justifyContent: "center",
    },
    input: {
      flex: 1,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      fontFamily: "Inter_500Medium",
      minWidth: 0,
      color: theme.text,
    },
    button: {
      backgroundColor: theme.button,
      borderRadius: 5,
      padding: 10,
      height: 42,
      width: 100,
    },
    text: {
      fontSize: 18,
      fontFamily: "Inter_500Medium",
      color: colorScheme === "dark" ? "black" : "white",
      textAlign: "center",
    },
  });
