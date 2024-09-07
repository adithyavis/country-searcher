import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Country from "src/types/country";

type CountryCardProps = {
  item: Country;
  onPressSeeMoreButton?: (item: Country) => void;
};
const CountryCard = React.memo(
  ({ item, onPressSeeMoreButton }: CountryCardProps) => {
    const listOfCapitals = item.capital.join(", ");
    const handlePressSeeMoreButton = () => {
      onPressSeeMoreButton(item);
    };
    return (
      <View style={styles.countryItem}>
        <Image
          style={styles.countryFlag}
          source={item.flags.png}
          contentFit="contain"
        />
        <View style={styles.countryDetails}>
          <Text style={styles.countryName}>{item.name.common}</Text>
          <Text style={styles.countryCapitals}>
            Capital(s): {listOfCapitals}
          </Text>
          <TouchableOpacity onPress={handlePressSeeMoreButton}>
            <Text style={styles.countrySeeMoreButton}>See More</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);
CountryCard.displayName = "CountryCard";

const styles = StyleSheet.create({
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  countryFlag: { width: 100, height: 100 },
  countryDetails: {
    flexDirection: "column",
    paddingLeft: 12,
    flex: 1,
  },
  countryName: {
    fontSize: 22,
    color: "#333",
  },
  countryCapitals: {
    fontSize: 16,
    color: "#333",
  },
  countrySeeMoreButton: {
    fontSize: 16,
    color: "#999",
  },
});

export default CountryCard;
