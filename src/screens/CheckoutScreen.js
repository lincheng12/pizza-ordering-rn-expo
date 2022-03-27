import { StyleSheet, View } from "react-native";
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
import { moderateScale, scale } from "../assets/Styles";
import { creditCardType, formatPrice } from "../lib/helper";
import { Fontisto } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppButton from "../components/AppButton";
import AppFloatingInput from "../components/AppFloatingInput";

const CheckoutScreen = ({ route }) => {
  const { item, type } = route.params;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const pizzaItems = useSelector(selectItems);
  const pizzaTotal = useSelector(selectTotal);
  const totalCount = useSelector(selectTotalCount);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [card, setCard] = useState("");
  const [cvv, setCVV] = useState("");
  const [phone, setPhone] = useState("");

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
        contentContainerStyle={{ padding: scale(5) }}
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
          <AppFloatingInput
            style={{ marginTop: scale(8) }}
            label="First Name"
            value={fname}
            onChangeText={setFname}
          />
          <AppFloatingInput
            style={{ marginTop: scale(8) }}
            label="Last Name"
            value={lname}
            onChangeText={setLname}
          />
          <AppFloatingInput
            style={{ marginTop: scale(8) }}
            label="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.sectionContainer}>
          <AppText style={styles.text}>Enter your address:</AppText>
          <AppFloatingInput
            style={{ marginTop: scale(8) }}
            label="Address"
            value={address}
            onChangeText={setAddress}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: scale(8),
            }}>
            <AppFloatingInput
              totalWidth="45%"
              label="City"
              value={city}
              onChangeText={setCity}
            />
            <AppFloatingInput
              totalWidth="20%"
              label="State"
              hint="AB"
              mask="AB"
              autoCapitalize="characters"
              value={state}
              onChangeText={setState}
            />
            <AppFloatingInput
              totalWidth="30%"
              label="Zipcode"
              hint="12345"
              mask="12345"
              keyboardType="number-pad"
              value={zipcode}
              onChangeText={setZipcode}
            />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <AppText style={styles.text}>Enter the remaining:</AppText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: scale(8),
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "68%",
              }}>
              <AppFloatingInput
                totalWidth="80%"
                label="Credit Card"
                maskType="card"
                hint="1234 1234 1234 1234"
                mask="1234 1234 1234 1234"
                keyboardType="number-pad"
                maxLength={19}
                value={card}
                onChangeText={setCard}
              />
              <Fontisto
                style={{ marginLeft: scale(5) }}
                name={creditCardType(card.split(" ").join(""))}
                size={25}
                color={colors.primary}
              />
            </View>
            <AppFloatingInput
              totalWidth="30%"
              label="Card CVV"
              hint="123"
              mask="123"
              keyboardType="number-pad"
              value={cvv}
              onChangeText={setCVV}
            />
          </View>
          <AppFloatingInput
            style={{ marginTop: scale(8) }}
            label="Phone"
            maskType="phone"
            mask="(123) 123-1234"
            hint="(123) 123-1234"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
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
    marginBottom: scale(3),
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
