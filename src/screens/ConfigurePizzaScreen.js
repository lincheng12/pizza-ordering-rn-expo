import {
  Alert,
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
import RadioItemCard from "../components/RadioItemCard";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, selectItems } from "../redux/slices/basketSlice";

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
  const pizzaItems = useSelector(selectItems);
  const dispatch = useDispatch();

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
    const mappedToppings = toppingsPicked.map((item) =>
      capitalize(menu.toppings[item].type)
    );
    const mappedSauces = saucePicked.map((item) =>
      capitalize(menu.sauces[item].type)
    );

    let joinedResult;
    if (mappedSize !== undefined && mappedCrust !== undefined)
      joinedResult = [
        `${capitalize(mappedSize)} size`,
        `${capitalize(mappedCrust)} crust`,
      ].concat(mappedToppings.concat(mappedSauces));
    else joinedResult = mappedToppings.concat(mappedSauces);

    setIngredients(joinedResult);
  }, [sizeIndex, crustIndex, toppingsPicked, saucePicked]);

  //For selecting toppings and sauces
  const onItemSelect = (state, setState, menuItem, index) => {
    if (!state.includes(index)) {
      setState((prev) => [...prev, index]);
      setPrice((prev) => prev + menuItem[index].cost);
    } else {
      setState((prev) => prev.filter((item) => item !== index));
      setPrice((prev) => prev - menuItem[index].cost);
    }
  };

  const addCustomPizza = () => {
    if (
      sizeIndex !== null &&
      crustIndex !== null &&
      toppingsPicked.length > 0 &&
      saucePicked.length > 0
    ) {
      const item = {
        id: uuid.v4(),
        pizzaBase: [sizeIndex, crustIndex],
        pizzaDetails: toppingsPicked.concat(saucePicked),
        quantity,
        price,
      };
      dispatch(addToBasket(item));
      console.log(item);
    } else Alert.alert("Cannot add empty items to the basket");
  };

  const addPrefiguredPizza = () => {
    const ingredients = item.ingredients;
    if (sizeIndex !== null && crustIndex !== null) {
      const item = {
        id: uuid.v4(),
        pizzaBase: [sizeIndex, crustIndex],
        pizzaDetails: ingredients,
        quantity,
        price,
      };
      dispatch(addToBasket(item));
      console.log(item);
    } else Alert.alert("Cannot add empty items to the basket");
  };

  return (
    <AppView style={{ flex: 1, paddingBottom: insets.bottom }}>
      <ScrollView style={{ flex: 1 }}>
        {/* if a pre-configured pizza is clicked, the pizza image will be shown  */}
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
            <RadioButton.Group key={index}>
              <RadioItemCard
                onSelect={() => setSizeIndex(index)}
                itemName={`${choice.size} ${choice.details}`}
                itemPrice={choice.extraCost}
                itemCheckedStatus={
                  sizeIndex === index ? "checked" : "unchecked"
                }
              />
            </RadioButton.Group>
          ))}
          {/* Pizza crust type */}
          <AppText style={styles.selectionHeading}>Choose Crust:</AppText>
          {menu.crust.map((choice, index) => (
            <RadioButton.Group key={index}>
              <RadioItemCard
                onSelect={() => setCrustIndex(index)}
                itemName={choice.type}
                itemPrice={choice.extraCost}
                itemCheckedStatus={
                  crustIndex === index ? "checked" : "unchecked"
                }
              />
            </RadioButton.Group>
          ))}
          {/* Custom pizza toppings option (will only display if custom pizza option is selected) */}
          {startPrice && (
            <>
              <AppText style={styles.selectionHeading}>Toppings:</AppText>
              {menu.toppings.map((choice, index) => (
                <RadioItemCard
                  key={index}
                  onSelect={() =>
                    onItemSelect(
                      toppingsPicked,
                      setToppingsPicked,
                      menu.toppings,
                      index
                    )
                  }
                  itemName={choice.type}
                  itemPrice={choice.cost}
                  itemCheckedStatus={
                    toppingsPicked.includes(index) ? "checked" : "unchecked"
                  }
                />
              ))}
              {/* Custom pizza sauces option */}
              <AppText style={styles.selectionHeading}>Sauces:</AppText>
              {menu.sauces.map((choice, index) => (
                <RadioItemCard
                  key={index}
                  onSelect={() =>
                    onItemSelect(
                      saucePicked,
                      setSaucePicked,
                      menu.sauces,
                      index
                    )
                  }
                  itemName={choice.type}
                  itemPrice={choice.cost}
                  itemCheckedStatus={
                    saucePicked.includes(index) ? "checked" : "unchecked"
                  }
                />
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
            style={[styles.circleButton, { backgroundColor: "#F08080" }]}>
            <AntDesign name="hearto" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={item ? addPrefiguredPizza : addCustomPizza}
            style={[
              styles.circleButton,
              { backgroundColor: colors.card, position: "relative" },
            ]}>
            {pizzaItems.length !== 0 && (
              <View
                style={[
                  {
                    backgroundColor: colors.notification,
                    width: 20,
                    height: 20,
                    position: "absolute",
                    top: 0,
                    right: 0,
                    borderRadius: 20 / 2,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  shadowStyle,
                ]}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {pizzaItems.length}
                </Text>
              </View>
            )}
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
