import React, { useCallback, useMemo, useState } from "react";
import { View, Text, StyleSheet, FlatListProps, FlatList } from "react-native";

import Country from "src/types/country";
import CountryDetailBottomSheet from "src/components/CountryDetailBottomSheet";
import useCountries from "src/hooks/useCountries";
import useFilterCountries from "src/hooks/useFilterCountries";
import CountryCard from "src/components/CountryCard";
import SearchBar from "src/components/SearchBar";

type FlatListCountryItem = { type: "country"; country: Country };
type FlatListItem =
  | {
      type: "title";
    }
  | { type: "searchBarContainer" }
  | FlatListCountryItem;

export const CountrySearcher = React.memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const resetSelectedCountry = () => setSelectedCountry(null);

  const { data: countries, isLoading, error } = useCountries();

  const filtedCountries = useFilterCountries(countries, searchQuery);

  const data: FlatListProps<FlatListItem>["data"] = useMemo(() => {
    return [
      {
        type: "title",
      },
      { type: "searchBarContainer" },
      ...filtedCountries.map<FlatListCountryItem>((country) => ({
        type: "country",
        country,
      })),
    ];
  }, [filtedCountries]);

  const renderItem: FlatListProps<FlatListItem>["renderItem"] = useCallback(
    ({ item }) => {
      if (item.type === "title") {
        return <Text style={styles.title}>Country Searcher</Text>;
      }
      if (item.type === "searchBarContainer") {
        return (
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      }
      return (
        <CountryCard
          item={item.country}
          onPressSeeMoreButton={setSelectedCountry}
        />
      );
    },
    [searchQuery],
  );

  const keyExtractor: FlatListProps<FlatListItem>["keyExtractor"] = useCallback(
    (item) => {
      if (item.type === "title" || item.type === "searchBarContainer") {
        return item.type;
      }

      return item.country.name.common;
    },
    [],
  );

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
        stickyHeaderIndices={[1]}
        contentContainerStyle={styles.listContentContainer}
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
