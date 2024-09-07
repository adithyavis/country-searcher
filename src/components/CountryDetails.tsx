import { Image } from "expo-image";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import Country from "src/types/country";

type CountryDetailsProps = {
  country: Country;
};
const CountryDetails = React.memo(({ country }: CountryDetailsProps) => {
  const countryName = useMemo(() => country?.name.common ?? "", [country]);
  const listOfCapitals = useMemo(
    () => country?.capital.join(", ") ?? "",
    [country],
  );
  const listOfTimezones = useMemo(
    () => country?.timezones.join(", ") ?? "",
    [country],
  );
  const listOfContinents = useMemo(
    () => country?.continents.join(", ") ?? "",
    [country],
  );
  const currencies = useMemo(
    () =>
      country
        ? Object.values(country.currencies)
            .map((currency) => `${currency.name} (${currency.symbol})`)
            .join(", ")
        : "",
    [country],
  );
  const languages = useMemo(
    () => (country ? Object.values(country.languages).join(", ") : ""),
    [country],
  );
  const population = useMemo(() => `${country?.population}` ?? "", [country]);

  return (
    <>
      <Image
        style={styles.countryFlag}
        source={country.flags.png}
        contentFit="contain"
      />
      <DetailItem label="Country Name" value={countryName}></DetailItem>
      <DetailItem label="Capital(s)" value={listOfCapitals} />
      <DetailItem label="Timezone(s)" value={listOfTimezones} />
      <DetailItem label="Population" value={population} />
      <DetailItem label="Continent(s)" value={listOfContinents} />
      <DetailItem label="Currency" value={currencies} />
      <DetailItem label="Language(s)" value={languages} />
    </>
  );
});
CountryDetails.displayName = "CountryDetails";

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}:</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  countryFlag: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 10,
  },
  detailItem: {
    marginBottom: 12,
    width: "100%",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    marginTop: 4,
  },
});

export default CountryDetails;
