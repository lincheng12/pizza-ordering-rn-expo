import {
  StyleSheet,
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
import { capitalize, formatPrice, mapSauces, mapToppings } from "../lib/helper";
import { useNavigation, useTheme } from "@react-navigation/native";
import { moderateScale, scale, shadowStyle } from "../assets/Styles";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import usePreviousState from "../hooks/usePreviousState";
import RadioItemCard from "../components/RadioItemCard";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, selectTotalCount } from "../redux/slices/basketSlice";
import QuantityCounter from "../components/QuantityCounter";
import AppButton from "../components/AppButton";
import * as Haptics from "expo-haptics";
import { selectUser } from "../redux/slices/userSlice";

const ConfigurePizzaScreen = ({ route }) => {
  const { item, startPrice } = route.params;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [sizeIndex, setSizeIndex] = useState(0); //default small pizza size
  const [crustIndex, setCrustIndex] = useState(0); //default regular crust
  const [quantity, setQuantity] = useState(1); //default quantity start at 1
  const [price, setPrice] = useState(item?.price | startPrice);
  const [saucePicked, setSaucePicked] = useState([]);
  const [toppingsPicked, setToppingsPicked] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const prevSizeIndex = usePreviousState(sizeIndex);
  const prevCrustIndex = usePreviousState(crustIndex);
  const totalCount = useSelector(selectTotalCount);
  const userProfile = useSelector(selectUser);
  const dispatch = useDispatch();
  const nav = useNavigation();
  const [name] = useState(item?.name);

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
    if (item) {
      setIngredients(item.ingredients.map((e) => capitalize(e)));
    } else {
      const mappedToppings = mapToppings(toppingsPicked);
      const mappedSauces = mapSauces(saucePicked);
      const joinedResult = mappedToppings.concat(mappedSauces);
      setIngredients(joinedResult);
    }
  }, [toppingsPicked, saucePicked]);

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

  const pizzaObj = () => {
    let item;
    if (ingredients.length > 0) {
      item = {
        id: uuid.v4(),
        pizzaName: name !== undefined ? name : "Custom Pizza",
        pizzaBase: [sizeIndex, crustIndex],
        pizzaDetails: ingredients,
        quantity,
        price,
      };
    } else alert("Pizza is not properly configure");
    return item;
  };

  const addPizza = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const item = pizzaObj();
    dispatch(addToBasket(item));
    nav.goBack();
  };

  const checkoutSinglePizza = () => {
    if (!userProfile)
      alert("You are not logged in, so your order will not be save.");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const item = pizzaObj();
    nav.navigate("Checkout", { item, type: "single" });
  };

  return (
    <AppView style={{ flex: 1, paddingBottom: insets.bottom }}>
      <ScrollView style={{ flex: 1 }}>
        {/* if a pre-configured pizza is clicked, the pizza image will be shown  */}
        {item ? (
          <Image
            resizeMode="contain"
            style={{ width: "100%", height: 280 }}
            source={item?.image}
          />
        ) : (
          <Image
            style={{
              height: 140,
              width: "100%",
              marginBottom: scale(-5),
            }}
            resizeMode="contain"
            source={require("../assets/pizza_backdrop.png")}
          />
        )}
        <View style={{ marginLeft: scale(5), marginVertical: scale(3) }}>
          <AppText style={{ fontSize: moderateScale(22), fontWeight: "bold" }}>
            {item ? item.name : "Custom Pizza"}
          </AppText>
          <AppText
            style={{
              color: colors.primary,
              paddingTop: scale(2),
            }}>
            {ingredients.length !== 0 ? ingredients.join(", ") : "Ingredients"}
          </AppText>
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
          <View style={styles.quantityContainer}>
            <AppText style={styles.selectionHeading}>Quantity:</AppText>
            <QuantityCounter
              disabled={quantity === 1}
              onDecrease={() => setQuantity((prev) => prev - 1)}
              onIncrease={() => setQuantity((prev) => prev + 1)}
              quantity={quantity}
              iconSize={24}
            />
          </View>
        </View>
      </ScrollView>
      {/* bottom page container */}
      <View style={styles.footer}>
        {/* <View style={styles.circleButtonContainer}> */}
        <TouchableOpacity
          onPress={addPizza}
          style={[
            styles.circleButton,
            { backgroundColor: colors.card },
            shadowStyle,
          ]}>
          {/* {totalCount !== 0 && (
            <View
              style={[
                { backgroundColor: colors.notification },
                shadowStyle,
                styles.countBadge,
              ]}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {totalCount}
              </Text>
            </View>
          )} */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="basket" size={24} color={colors.primary} />
            <AppText style={{ marginLeft: scale(5) }}>{totalCount}</AppText>
          </View>
        </TouchableOpacity>
        {/* </View> */}
        <AppButton
          onPress={checkoutSinglePizza}
          buttonContainerStyle={styles.checkoutButton}
          bgColor={colors.primary}
          btnText={`${formatPrice(price)} (x${quantity}) Checkout`}
        />
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
    width: "25%",
    borderRadius: 10,
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
    //marginRight: scale(5),
    flexDirection: "row",
    height: 45,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(8),
    justifyContent: "space-evenly",
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
  countBadge: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: 20 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
