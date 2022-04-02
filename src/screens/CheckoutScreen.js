import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  selectItems,
  selectTotal,
  selectTotalCount,
} from "../redux/slices/basketSlice";
import {
  addressRegex,
  creditCardType,
  emailRegex,
  formatPrice,
  phoneRegex,
  stateRegex,
  zipcodeRegex,
} from "../lib/helper";
import AppText from "../components/AppText";
import AppView from "../components/AppView";
import { useSelector } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BasketCard from "../components/BasketCard";
import { moderateScale, scale } from "../assets/Styles";
import { Fontisto } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppButton from "../components/AppButton";
import { Controller, useForm } from "react-hook-form";
import PaperTextInput from "../components/PaperTextInput";
import { selectUser } from "../redux/slices/userSlice";

const CheckoutScreen = ({ route }) => {
  const { item, type } = route.params;
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const pizzaItems = useSelector(selectItems);
  const pizzaTotal = useSelector(selectTotal);
  const totalCount = useSelector(selectTotalCount);
  const userProfile = useSelector(selectUser);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: userProfile.fname,
      lname: userProfile.lname,
      email: userProfile.email,
      password: userProfile.password,
      phone: userProfile.phone,
      address: userProfile.address,
      city: userProfile.city,
      state: userProfile.state,
      zipcode: userProfile.zipcode,
      card: userProfile.card,
      cvv: userProfile.cvv,
    },
  });

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
          <Controller
            control={control}
            rules={{
              required: "Field cannot be empty",
            }}
            render={({ field: { onChange, value } }) => (
              <PaperTextInput
                label="First Name"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="fname"
          />
          {errors.fname && (
            <Text style={styles.error}>{errors.fname.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: "Field cannot be empty",
            }}
            render={({ field: { onChange, value } }) => (
              <PaperTextInput
                label="Last Name"
                value={value}
                onChangeText={onChange}
              />
            )}
            name="lname"
          />
          {errors.lname && (
            <Text style={styles.error}>{errors.lname.message}</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: "Field cannot be empty",
              pattern: {
                value: emailRegex,
                message: "Not a valid email format",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <PaperTextInput
                label="Email"
                placeholder="test@email.com"
                value={value.trim()}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}
        </View>
        <View style={styles.sectionContainer}>
          <AppText style={styles.text}>Enter your address:</AppText>
          <Controller
            control={control}
            rules={{
              required: "Field cannot be empty",
              pattern: {
                value: addressRegex,
                message: "Not a valid address input",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <PaperTextInput
                label="Address"
                placeholder="1234 Test St."
                value={value}
                onChangeText={onChange}
              />
            )}
            name="address"
          />
          {errors.address && (
            <Text style={styles.error}>{errors.address.message}</Text>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <Controller
              control={control}
              rules={{
                required: "City field cannot be empty",
              }}
              render={({ field: { onChange, value } }) => (
                <PaperTextInput
                  label="City"
                  value={value}
                  onChangeText={onChange}
                  style={{ width: "45%" }}
                />
              )}
              name="city"
            />
            <Controller
              control={control}
              rules={{
                required: "State field cannot be empty",
                pattern: {
                  value: stateRegex,
                  message: "State input is invalid",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <PaperTextInput
                  label="State"
                  placeholder="AB"
                  autoCapitalize="characters"
                  value={value}
                  onChangeText={onChange}
                  style={{ width: "20%" }}
                  maxLength={2}
                />
              )}
              name="state"
            />
            <Controller
              control={control}
              rules={{
                required: "Zipcode field cannot be empty",
                pattern: {
                  value: zipcodeRegex,
                  message: "zipcode input is invalid",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <PaperTextInput
                  label="Zipcode"
                  placeholder="12345"
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={onChange}
                  maxLength={5}
                  style={{ width: "30%" }}
                />
              )}
              name="zipcode"
            />
          </View>
          {errors.city && (
            <Text style={styles.error}>{errors.city.message}</Text>
          )}
          {errors.state && (
            <Text style={styles.error}>{errors.state.message}</Text>
          )}
          {errors.zipcode && (
            <Text style={styles.error}>{errors.zipcode.message}</Text>
          )}
        </View>
        <View style={styles.sectionContainer}>
          <AppText style={styles.text}>Enter the remaining:</AppText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "74%",
              }}>
              <Controller
                control={control}
                rules={{
                  required: "Credit card field cannot be empty",
                  validate: {
                    checkCard: (v) =>
                      creditCardType(v.split(" ").join(""))[1] ||
                      "Not a credit card that we accept",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <PaperTextInput
                    label="Credit Card"
                    placeholder="1234 1234 1234 1234"
                    keyboardType="number-pad"
                    value={value
                      .replace(/\s?/g, "")
                      .replace(/(\d{4})/g, "$1 ")
                      .trim()}
                    onChangeText={onChange}
                    style={{ width: "80%" }}
                    maxLength={19}
                  />
                )}
                name="card"
              />
              <Fontisto
                style={{ marginLeft: scale(5), marginTop: scale(8) }}
                name={creditCardType(watch("card").split(" ").join(""))[0]}
                size={25}
                color={colors.primary}
              />
            </View>
            <Controller
              control={control}
              rules={{
                required: "CVV field cannot be empty",
              }}
              render={({ field: { onChange, value } }) => (
                <PaperTextInput
                  label="CVV"
                  placeholder="123"
                  keyboardType="number-pad"
                  value={value}
                  onChangeText={onChange}
                  maxLength={3}
                  style={{ width: "25%" }}
                />
              )}
              name="cvv"
            />
          </View>
          {errors.card && (
            <Text style={styles.error}>{errors.card.message}</Text>
          )}
          {errors.cvv && <Text style={styles.error}>{errors.cvv.message}</Text>}
          <Controller
            control={control}
            rules={{
              required: "Field cannot be empty",
              minLength: 9,
              pattern: {
                value: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
                message: "Not a valid phone input",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <PaperTextInput
                label="Phone"
                keyboardType="phone-pad"
                placeholder="(123) 123-1234"
                value={value.replace(phoneRegex, "($1) $2-$3")}
                onChangeText={onChange}
                maxLength={14}
              />
            )}
            name="phone"
          />
          {errors.phone && (
            <Text style={styles.error}>{errors.phone.message}</Text>
          )}
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
  error: {
    color: "red",
    marginLeft: scale(3),
  },
});
