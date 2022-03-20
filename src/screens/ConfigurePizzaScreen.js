import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { menu } from "../assets/menu";
import { RadioButton } from "react-native-paper";
import { capitalize, formatPrice } from "../lib/helper";
import { useTheme } from "@react-navigation/native";
import { shadowStyle } from "../assets/Styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePreviousState from "../hooks/usePreviousState";

const ConfigurePizzaScreen = ({ route }) => {
  const { item } = route.params;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [size, setSize] = useState(null);
  const [crustType, setCrustType] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(item.price);
  const prevSize = usePreviousState(size);
  const prevCrustType = usePreviousState(crustType);

  useEffect(() => {
    let totalCost = price;
    if (prevSize === "large") totalCost -= menu.type[1].extraCost;
    else if (size === "large") totalCost += menu.type[1].extraCost;
    setPrice(totalCost);
  }, [size]);

  useEffect(() => {
    let totalCost = price;
    if (prevCrustType === "stuffed") totalCost -= menu.crust[2].extraCost;
    else if (crustType === "stuffed") totalCost += menu.crust[2].extraCost;
    setPrice(totalCost);
  }, [crustType]);

  return (
    <AppView style={{ flex: 1, paddingBottom: insets.bottom }}>
      <ScrollView style={{ flex: 1 }}>
        <Image
          resizeMode="cover"
          style={{ width: "100%", height: 280 }}
          source={{ uri: item?.image }}
        />
        <View style={{ marginLeft: 5, marginVertical: 3 }}>
          <AppText style={{ fontSize: 22, fontWeight: "bold" }}>
            {item.name}
          </AppText>
          <AppText style={{ color: colors.primary }}>
            {item.ingredients.join(", ")}
          </AppText>
        </View>
        <View style={{ padding: 5 }}>
          <AppText style={styles.selectionHeading}>Type:</AppText>
          {menu.type.map((choice, index) => (
            <RadioButton.Group key={index} value={size} onValueChange={setSize}>
              <View
                style={[
                  styles.selectionContainer,
                  { backgroundColor: colors.card },
                  shadowStyle,
                ]}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 5,
                  }}>
                  <AppText>{capitalize(choice.size)} </AppText>
                  <AppText>{choice.diameter}'' </AppText>
                  <AppText>({choice.slices} Slices)</AppText>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {choice.extraCost && (
                    <AppText>+{formatPrice(choice.extraCost)}</AppText>
                  )}
                  <RadioButton.Android
                    uncheckedColor={colors.text}
                    color={colors.primary}
                    value={choice.size}
                  />
                </View>
              </View>
            </RadioButton.Group>
          ))}
          <AppText style={styles.selectionHeading}>Choose Crust:</AppText>
          {menu.crust.map((choice, index) => (
            <RadioButton.Group
              key={index}
              value={crustType}
              onValueChange={setCrustType}>
              <View
                style={[
                  styles.selectionContainer,
                  { backgroundColor: colors.card },
                  shadowStyle,
                ]}>
                <AppText style={{ marginLeft: 5 }}>
                  {capitalize(choice.type)}
                </AppText>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {choice.extraCost && (
                    <AppText>+{formatPrice(choice.extraCost)}</AppText>
                  )}
                  <RadioButton.Android
                    uncheckedColor={colors.text}
                    color={colors.primary}
                    value={choice.type}
                  />
                </View>
              </View>
            </RadioButton.Group>
          ))}
          <View style={styles.quantityContainer}>
            <AppText style={styles.selectionHeading}>Quantity:</AppText>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => prev + 1)}
                style={[
                  styles.circleButton,
                  { backgroundColor: colors.card },
                  shadowStyle,
                ]}>
                <AntDesign name="plus" size={24} color={colors.text} />
              </TouchableOpacity>
              <AppText
                style={[styles.quantityText, { borderColor: colors.text }]}>
                {quantity}
              </AppText>
              <TouchableOpacity
                onPress={() => setQuantity((prev) => prev - 1)}
                style={[
                  styles.circleButton,
                  { backgroundColor: colors.card },
                  shadowStyle,
                ]}>
                <AntDesign name="minus" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.circleButtonContainer}>
          <TouchableOpacity
            style={[
              styles.circleButton,
              { backgroundColor: colors.notification },
            ]}>
            <AntDesign name="hearto" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.circleButton, { backgroundColor: colors.card }]}>
            <Ionicons name="basket" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: colors.primary }]}>
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            {formatPrice(price)} Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </AppView>
  );
};

export default ConfigurePizzaScreen;

const styles = StyleSheet.create({
  selectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    marginVertical: 2,
    borderRadius: 10,
  },
  selectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  circleButton: {
    padding: 10,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButton: {
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexGrow: 0.9,
    marginRight: 5,
    flexDirection: "row",
    height: 45,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  circleButtonContainer: {
    flexDirection: "row",
    flexGrow: 0.1,
    justifyContent: "space-evenly",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  quantityText: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 8,
  },
});
