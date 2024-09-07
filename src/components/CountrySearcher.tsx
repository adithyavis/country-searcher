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
import { Image } from "expo-image";

export const CountrySearcher = React.memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: countries, isLoading, error } = useCountries();

  const data: FlatListProps<Country>["data"] = useMemo(
    () =>
      countries
        ? countries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
          )
        : [],
    [countries, searchQuery],
  );

  const renderItem: FlatListProps<Country>["renderItem"] = useCallback(
    ({ item }) => (
      <View style={styles.categoryItem}>
        <Image
          style={{ width: 100, height: 100 }}
          source={item.flags.png}
          contentFit="cover"
        />
        <Text style={styles.categoryName}>{item.name.common}</Text>
      </View>
    ),
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
    fontSize: 24,
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
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  categoryName: {
    fontSize: 16,
    color: "#333",
  },
});
