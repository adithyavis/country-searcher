import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
};
const SearchBar = React.memo(
  ({ searchQuery, setSearchQuery }: SearchBarProps) => {
    const resetSearchQuery = () => setSearchQuery("");
    return (
      <View style={[styles.searchBarContainer]}>
        {searchQuery.length !== 0 && (
          <TouchableOpacity
            onPress={resetSearchQuery}
            style={styles.searchBarResetButton}
          >
            <MaterialCommunityIcons name="close" size={20} color="gray" />
          </TouchableOpacity>
        )}
        <TextInput
          style={styles.searchBar}
          placeholder="Search Countries"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
    );
  },
);
SearchBar.displayName = "SearchBar";

const styles = StyleSheet.create({
  searchBarContainer: {
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  searchBar: {
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
  },
  searchBarResetButton: {
    position: "absolute",
    right: 16,
    zIndex: 1,
  },
});

export default SearchBar;
