import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import AppText from "../components/AppText";
import AppView from "../components/AppView";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  selectItems,
  selectTotal,
  selectTotalCount,
} from "../redux/slices/basketSlice";
import BasketCard from "../components/BasketCard";
import { moderateScale, scale, shadowStyle, sWidth } from "../assets/Styles";
import AppTextInput from "../components/AppTextInput";
import { creditCardType, formatPrice } from "../lib/helper";
import { Fontisto } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppButton from "../components/AppButton";

const CheckoutScreen = ({ route }) => {
  const { item, type } = route.params;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const pizzaItems = useSelector(selectItems);
  const pizzaTotal = useSelector(selectTotal);
  const totalCount = useSelector(selectTotalCount);
  const [cardNumber, setCardNumber] = useState("");

  const handleCardNumber = (text) => {
    let formattedText = text.split(" ").join("");
    if (formattedText.length > 0) {
      formattedText = formattedText.match(new RegExp(".{1,4}", "g")).join(" ");
    }
    setCardNumber(formattedText);
    return formattedText;
  };

  return (
    <AppView style={{ flex: 1, paddingBottom: insets.bottom }}>
      <KeyboardAwareScrollView
        enableOnAndroid={false}
        extraHeight={scale(20)}
        contentContainerStyle={{ padding: 5 }}
        style={{ flex: 1 }}>
        <AppText style={styles.text}>
          {type === "single"
            ? "Item: (1)"
            : `${totalCount > 1 ? "Items" : "Item"}: (${totalCount})`}
        </AppText>
        {type === "single" ? (
          <BasketCard
            checkout
            pizzaName={item.pizzaName}
            pizzaSize={item.pizzaBase[0]}
            pizzaSizeDetails={item.pizzaBase[0]}
            pizzaCrust={item.pizzaBase[1]}
            pizzaPrice={item.price}
            quantity={item.quantity}
            pizzaDetails={item.pizzaDetails}
          />
        ) : (
          <>
            {pizzaItems.map((item, index) => (
              <BasketCard
                checkout
                key={index}
                pizzaName={item.pizzaName}
                pizzaSize={item.pizzaBase[0]}
                pizzaSizeDetails={item.pizzaBase[0]}
                pizzaCrust={item.pizzaBase[1]}
                pizzaPrice={item.price}
                quantity={item.quantity}
                pizzaDetails={item.pizzaDetails}
              />
            ))}
          </>
        )}
        <View style={styles.sectionContainer}>
          <AppText style={styles.text}>Enter your name:</AppText>
          <AppTextInput placeholder="First name" />
          <AppTextInput placeholder="Last name" />
        </View>
        <View style={styles.sectionContainer}>
          <AppText style={styles.text}>Enter your address:</AppText>
          <AppTextInput placeholder="Address" />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <AppTextInput
              containerStyle={{ width: sWidth / 2 }}
              placeholder="Enter your city"
            />
            <AppTextInput
              maxLength={2}
              containerStyle={{ width: sWidth / 4.6 }}
              placeholder="State"
            />
            <AppTextInput
              maxLength={5}
              keyboardType="number-pad"
              containerStyle={{ width: sWidth / 4 }}
              placeholder="Zipcode"
            />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <AppText style={styles.text}>Enter your credit card:</AppText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <AppTextInput
                containerStyle={{ width: sWidth / 1.9 }}
                maxLength={19}
                value={cardNumber}
                onChangeText={(text) => handleCardNumber(text)}
                keyboardType="number-pad"
                placeholder="Enter your credit card"
              />
              <Fontisto
                style={{ marginLeft: scale(5) }}
                name={creditCardType(cardNumber.split(" ").join(""))}
                size={25}
                color={colors.primary}
              />
            </View>

            <AppTextInput
              containerStyle={{ width: sWidth / 3.5 }}
              maxLength={3}
              keyboardType="number-pad"
              placeholder="Card CVV"
            />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <AppButton
            buttonContainerStyle={styles.checkoutBtn}
            bgColor={colors.primary}
            btnText={`Pay ${
              type === "single"
                ? formatPrice(item.price * item.quantity)
                : formatPrice(pizzaTotal)
            }`}
          />
        </View>
      </KeyboardAwareScrollView>
    </AppView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: moderateScale(17),
    marginLeft: scale(5),
    marginBottom: scale(5),
  },
  sectionContainer: {
    marginTop: 10,
  },
  checkoutBtn: {
    paddingVertical: moderateScale(12),
    flexGrow: 0.7,
    borderRadius: 10,
  },
});
