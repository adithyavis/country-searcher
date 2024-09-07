import React, { useCallback, useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatListProps, FlatList } from "react-native";

import Country from "src/types/country";
import CountryDetailBottomSheet from "src/components/CountryDetailBottomSheet";
import useCountries from "src/hooks/useCountries";
import useFilterCountries from "src/hooks/useFilterCountries";
import CountryCard from "src/components/CountryCard";
import SearchBar from "src/components/SearchBar";

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
      return (
        <View>
          <Text style={styles.title}>Country Searcher</Text>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
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
});
