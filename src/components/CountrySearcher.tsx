import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  FlatListProps,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Country from "src/types/country";
import CountryDetailBottomSheet from "src/components/CountryDetailBottomSheet";
import useCountries from "src/hooks/useCountries";
import useFilterCountries from "src/hooks/useFilterCountries";
import CountryCard from "src/components/CountryCard";

export const CountrySearcher = React.memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const resetSelectedCountry = () => setSelectedCountry(null);

  const { data: countries, isLoading, error } = useCountries();

  const data: FlatListProps<Country>["data"] = useFilterCountries(
    countries,
    searchQuery,
  );

  const renderItem: FlatListProps<Country>["renderItem"] = useCallback(
    ({ item }) => {
      return (
        <CountryCard item={item} onPressSeeMoreButton={setSelectedCountry} />
      );
    },
    [],
  );

  const keyExtractor: FlatListProps<Country>["keyExtractor"] = useCallback(
    (item) => item.name.common,
    [],
  );

  const listHeaderComponent: FlatListProps<Country>["ListHeaderComponent"] =
    useMemo(() => {
      const resetSearchQuery = () => setSearchQuery("");
      return (
        <View>
          <Text style={styles.title}>Country Searcher</Text>
          <View style={styles.searchBarContainer}>
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
        </View>
      );
    }, [searchQuery]);

  if (error) {
    return <Text>Error loading countries</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <CountryDetailBottomSheet
        selectedCountry={selectedCountry}
        onClose={resetSelectedCountry}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContentContainer}
        ListHeaderComponent={listHeaderComponent}
        ListHeaderComponentStyle={styles.listHeaderComponentStyle}
      />
    </View>
  );
});
CountrySearcher.displayName = "CountrySearcher";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    minWidth: "100%",
  },
  listContentContainer: {
    paddingVertical: 10,
  },
  listHeaderComponentStyle: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  searchBarContainer: { justifyContent: "center" },
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
