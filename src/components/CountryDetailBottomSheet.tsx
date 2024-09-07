import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Country from "src/types/country";
import CountryDetails from "src/components/CountryDetails";

type CountryDetailBottomSheetProps = {
  selectedCountry: Country | null;
  onClose: () => void;
};

const CountryDetailBottomSheet = React.memo(
  ({ selectedCountry, onClose }: CountryDetailBottomSheetProps) => {
    const [index, setIndex] = useState(-1);

    useEffect(() => {
      if (selectedCountry) {
        setIndex(0);
      } else {
        setIndex(-1);
      }
    }, [selectedCountry]);

    const snapPoints = useMemo(() => ["50%", "90%"], []);

    const handleSheetChanges = useCallback(
      (index: number) => {
        setIndex(index);
        if (index === -1) {
          onClose();
        }
      },
      [onClose],
    );

    const renderBackdrop = useCallback(
      (props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      [],
    );

    return (
      <View
        style={styles.bottomSheetContainer}
        pointerEvents={index === -1 ? "none" : "auto"}
      >
        <BottomSheet
          index={index}
          snapPoints={snapPoints}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
        >
          <BottomSheetScrollView
            contentContainerStyle={styles.contentContainer}
          >
            <Text style={styles.title}>Country Details</Text>
            {selectedCountry && (
              <CountryDetails country={selectedCountry}></CountryDetails>
            )}
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    );
  },
);

CountryDetailBottomSheet.displayName = "CountryDetailBottomSheet";

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: "absolute",
    zIndex: 1,
    height: "100%",
    width: "100%",
  },
  contentContainer: {
    backgroundColor: "white",
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
    alignSelf: "center",
  },
});

export default CountryDetailBottomSheet;
