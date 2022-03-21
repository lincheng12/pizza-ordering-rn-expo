import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { menu } from "../assets/menu";
import { RadioButton } from "react-native-paper";
import { capitalize, formatPrice } from "../lib/helper";
import { useTheme } from "@react-navigation/native";
import { moderateScale, scale, shadowStyle } from "../assets/Styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePreviousState from "../hooks/usePreviousState";

const ConfigurePizzaScreen = ({ route }) => {
  const { item, startPrice } = route.params;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [sizeIndex, setSizeIndex] = useState(null);
  const [crustIndex, setCrustIndex] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(item?.price | startPrice);
  const [saucePicked, setSaucePicked] = useState([]);
  const [toppingsPicked, setToppingsPicked] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const prevSizeIndex = usePreviousState(sizeIndex);
  const prevCrustIndex = usePreviousState(crustIndex);

  useEffect(() => {
    let totalCost = price;
    const { type } = menu;

    if (type[prevSizeIndex]?.size === "large")
      totalCost -= type[prevSizeIndex].extraCost;
    else if (type[sizeIndex]?.size === "large")
      totalCost += type[sizeIndex].extraCost;
    setPrice(totalCost);
  }, [sizeIndex]);

  useEffect(() => {
    let totalCost = price;
    const { crust } = menu;

    if (crust[prevCrustIndex]?.type === "stuffed")
      totalCost -= crust[prevCrustIndex].extraCost;
    else if (crust[crustIndex]?.type === "stuffed")
      totalCost += crust[crustIndex].extraCost;

    setPrice(totalCost);
  }, [crustIndex]);

  useEffect(() => {
    const mappedSize = menu.type[sizeIndex]?.size;
    const mappedCrust = menu.crust[crustIndex]?.type;
    const mappedToppings = toppingsPicked.map(
      (item) => menu.toppings[item].type
    );
    const mappedSauces = saucePicked.map((item) => menu.sauces[item].type);

    let joinedResult;
    if (mappedSize !== undefined && mappedCrust !== undefined)
      joinedResult = [`${mappedSize} size`, `${mappedCrust} crust`].concat(
        mappedToppings.concat(mappedSauces)
      );
    else joinedResult = mappedToppings.concat(mappedSauces);

    setIngredients(joinedResult);
  }, [sizeIndex, crustIndex, toppingsPicked, saucePicked]);

  return (
    <AppView style={{ flex: 1, paddingBottom: insets.bottom }}>
      <ScrollView style={{ flex: 1 }}>
        {/* if a pre-configure pizza is clicked, the pizza image will be shown  */}
        {item ? (
          <Image
            resizeMode="cover"
            style={{ width: "100%", height: 280 }}
            source={{ uri: item?.image }}
          />
        ) : (
          <Image
            style={{
              height: 140,
              width: "100%",
              marginBottom: scale(-10),
            }}
            resizeMode="contain"
            source={require("../assets/pizza_backdrop.png")}
          />
        )}
        <View style={{ marginLeft: scale(5), marginVertical: scale(3) }}>
          {item ? (
            <>
              <AppText
                style={{ fontSize: moderateScale(22), fontWeight: "bold" }}>
                {item.name}
              </AppText>
              <AppText style={{ color: colors.primary, paddingTop: scale(2) }}>
                {item.ingredients.join(", ")}
              </AppText>
            </>
          ) : (
            <>
              <AppText style={styles.selectionHeading}>Name:</AppText>
              <TextInput
                style={{
                  backgroundColor: colors.card,
                  height: 45,
                  paddingVertical: scale(12),
                  paddingHorizontal: scale(10),
                  color: colors.text,
                  fontSize: moderateScale(15),
                  borderRadius: 10,
                }}
                placeholderTextColor={colors.text}
                placeholder="Name of your custom pizza"
              />
              {ingredients.length !== 0 ? (
                <AppText
                  style={{
                    color: colors.primary,
                    textTransform: "capitalize",
                    paddingTop: scale(2),
                  }}>
                  {ingredients.join(", ")}
                </AppText>
              ) : (
                <AppText style={{ color: colors.primary }}>Ingredients</AppText>
              )}
            </>
          )}
        </View>
        <View style={{ padding: scale(5) }}>
          {/* Pizza size type */}
          <AppText style={styles.selectionHeading}>Type:</AppText>
          {menu.type.map((choice, index) => (
            <RadioButton.Group
              key={index}
              value={sizeIndex}
              onValueChange={setSizeIndex}>
              <View
                style={[
                  styles.selectionContainer,
                  { backgroundColor: colors.card },
                  shadowStyle,
                ]}>
                <AppText style={{ marginLeft: scale(5) }}>
                  {capitalize(choice.size)} {choice.diameter}'' ({choice.slices}{" "}
                  Slices)
                </AppText>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {choice.extraCost && (
                    <AppText>+{formatPrice(choice.extraCost)}</AppText>
                  )}
                  <RadioButton.Android
                    uncheckedColor={colors.text}
                    color={colors.primary}
                    value={index}
                  />
                </View>
              </View>
            </RadioButton.Group>
          ))}
          {/* Pizza crust type */}
          <AppText style={styles.selectionHeading}>Choose Crust:</AppText>
          {menu.crust.map((choice, index) => (
            <RadioButton.Group
              key={index}
              value={crustIndex}
              onValueChange={setCrustIndex}>
              <View
                style={[
                  styles.selectionContainer,
                  { backgroundColor: colors.card },
                  shadowStyle,
                ]}>
                <AppText style={{ marginLeft: scale(5) }}>
                  {capitalize(choice.type)}
                </AppText>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {choice.extraCost && (
                    <AppText>+{formatPrice(choice.extraCost)}</AppText>
                  )}
                  <RadioButton.Android
                    uncheckedColor={colors.text}
                    color={colors.primary}
                    value={index}
                  />
                </View>
              </View>
            </RadioButton.Group>
          ))}
          {/* Custom pizza toppings option (will only display if custom pizza option is selected) */}
          {startPrice && (
            <>
              <AppText style={styles.selectionHeading}>Toppings:</AppText>
              {menu.toppings.map((choice, index) => (
                <View
                  key={index}
                  style={[
                    styles.selectionContainer,
                    { backgroundColor: colors.card },
                    shadowStyle,
                  ]}>
                  <AppText style={{ marginLeft: scale(5) }}>
                    {capitalize(choice.type)}
                  </AppText>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AppText>+{formatPrice(choice.cost)}</AppText>
                    <RadioButton.Android
                      uncheckedColor={colors.text}
                      color={colors.primary}
                      value={choice.type}
                      status={
                        toppingsPicked.includes(index) ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        if (!toppingsPicked.includes(index)) {
                          setToppingsPicked((prev) => [...prev, index]);
                          setPrice((prev) => prev + menu.toppings[index].cost);
                        } else {
                          setToppingsPicked((prev) =>
                            prev.filter((item) => item !== index)
                          );
                          setPrice((prev) => prev - menu.toppings[index].cost);
                        }
                      }}
                    />
                  </View>
                </View>
              ))}
              {/* Custom pizza sauces option */}
              <AppText style={styles.selectionHeading}>Sauces:</AppText>
              {menu.sauces.map((choice, index) => (
                <View
                  key={index}
                  style={[
                    styles.selectionContainer,
                    { backgroundColor: colors.card },
                    shadowStyle,
                  ]}>
                  <AppText style={{ marginLeft: scale(5) }}>
                    {capitalize(choice.type)}
                  </AppText>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AppText>+{formatPrice(choice.cost)}</AppText>
                    <RadioButton.Android
                      uncheckedColor={colors.text}
                      color={colors.primary}
                      value={choice.type}
                      status={
                        saucePicked.includes(index) ? "checked" : "unchecked"
                      }
                      onPress={() => {
                        if (!saucePicked.includes(index)) {
                          setSaucePicked((prev) => [...prev, index]);
                          setPrice((prev) => prev + menu.sauces[index].cost);
                        } else {
                          setSaucePicked((prev) =>
                            prev.filter((item) => item !== index)
                          );
                          setPrice((prev) => prev - menu.sauces[index].cost);
                        }
                      }}
                    />
                  </View>
                </View>
              ))}
            </>
          )}
          {/* quantity option */}
          {sizeIndex !== null && crustIndex !== null && (
            <View style={styles.quantityContainer}>
              <AppText style={styles.selectionHeading}>Quantity:</AppText>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  disabled={quantity === 1}
                  onPress={() => setQuantity((prev) => prev - 1)}
                  style={[
                    styles.circleButton,
                    { backgroundColor: colors.card },
                    shadowStyle,
                  ]}>
                  <AntDesign name="minus" size={24} color={colors.text} />
                </TouchableOpacity>
                <AppText
                  style={[styles.quantityText, { borderColor: colors.text }]}>
                  {quantity}
                </AppText>
                <TouchableOpacity
                  onPress={() => setQuantity((prev) => prev + 1)}
                  style={[
                    styles.circleButton,
                    { backgroundColor: colors.card },
                    shadowStyle,
                  ]}>
                  <AntDesign name="plus" size={24} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      {/* bottom page container */}
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
          <Text
            style={{
              color: "white",
              fontSize: moderateScale(16),
              fontWeight: "bold",
            }}>
            {formatPrice(price)} (x{quantity}) Checkout
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
    padding: scale(5),
    marginVertical: scale(2),
    borderRadius: 10,
  },
  selectionHeading: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginVertical: scale(5),
    marginTop: scale(10),
  },
  circleButton: {
    padding: scale(10),
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutButton: {
    paddingVertical: scale(8),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "70%",
    marginRight: scale(5),
    flexDirection: "row",
    height: 45,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(8),
    justifyContent: "space-around",
  },
  circleButtonContainer: {
    flexDirection: "row",
    width: moderateScale(95),
    justifyContent: "space-evenly",
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scale(10),
  },
  quantityText: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: scale(10),
    paddingHorizontal: scale(18),
    marginHorizontal: scale(8),
  },
});
