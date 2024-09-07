import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  FlatListProps,
} from "react-native";

import Country from "../types/country";
import useCountries from "../hooks/useCountries";
import useFilterCountries from "src/hooks/useFilterCountries";
import CountryCard from "src/components/CountryCard";

export const CountrySearcher = React.memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: countries, isLoading, error } = useCountries();

  const data: FlatListProps<Country>["data"] = useFilterCountries(
    countries,
    searchQuery,
  );

  const renderItem: FlatListProps<Country>["renderItem"] = useCallback(
    ({ item }) => {
      return <CountryCard item={item} />;
    },
    [],
  );

  const keyExtractor: FlatListProps<Country>["keyExtractor"] = useCallback(
    (item) => item.name.common,
    [],
  );

  const listHeaderComponent: FlatListProps<Country>["ListHeaderComponent"] =
    useMemo(
      () => (
        <View>
          <Text style={styles.title}>Country Searcher</Text>
          <TextInput
            style={styles.searchBar}
            placeholder="Search Countries"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      ),
      [searchQuery],
    );

  if (error) {
    return <Text>Error loading countries</Text>;
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
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
    width: "100%",
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
  searchBar: {
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#333",
  },
});
