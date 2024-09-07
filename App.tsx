import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { CountrySearcher } from "src/components/CountrySearcher";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <CountrySearcher />
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
