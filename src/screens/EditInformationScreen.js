import { StyleSheet, Text, View, Pressable, Keyboard } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  selectUpdating,
  selectUser,
  updateUserById,
} from "../redux/slices/userSlice";
import {
  addressRegex,
  creditCardType,
  phoneRegex,
  stateRegex,
  zipcodeRegex,
} from "../lib/helper";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { moderateScale, scale } from "../assets/Styles";
import { Fontisto } from "@expo/vector-icons";
import AppButton from "../components/AppButton";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import PaperTextInput from "../components/PaperTextInput";

const EditInformationScreen = ({ route }) => {
  const { type } = route.params;
  const { colors } = useTheme();
  const nav = useNavigation();
  const userProfile = useSelector(selectUser);
  const updatingState = useSelector(selectUpdating);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      fname: userProfile.fname,
      lname: userProfile.lname,
      phone: userProfile.phone,
      address: userProfile.address,
      city: userProfile.city,
      state: userProfile.state,
      zipcode: userProfile.zipcode,
      card: userProfile.card,
      cvv: userProfile.cvv,
    },
  });

  useLayoutEffect(() => {
    // Customizing the top header
    nav.setOptions({
      headerTitle: evaluateType(),
    });
  }, []);

  const evaluateType = () => {
    switch (type) {
      case "profile":
        return "Personal Information";
      case "address":
        return "Saved Address";
      case "payment":
        return "Payment Method";
    }
  };

  const onSubmit = (data) => {
    const res = Object.keys(dirtyFields).reduce(
      (previousValue, currentValue) => ({
        ...previousValue,
        [currentValue]: data[currentValue],
      }),
      {}
    );
    if (isDirty)
      dispatch(updateUserById(res))
        .unwrap()
        .then(() => alert("Information updated successfully"));
    else alert("No fields has change.");
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <AppView style={{ padding: scale(8), position: "relative", flex: 1 }}>
        {/* edit profile */}
        {type === "profile" && (
          <>
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
            <View style={{ paddingLeft: scale(3), marginTop: scale(12) }}>
              <AppText>Note: The email you provided is permanent.</AppText>
              <Text
                style={{
                  color: "#aaa",
                  fontSize: scale(14),
                  marginVertical: scale(2),
                }}>
                Email: {userProfile.email}
              </Text>
              <View
                style={{
                  borderBottomColor: colors.text,
                  borderBottomWidth: 1,
                  marginVertical: scale(8),
                }}
              />
              <AppText style={{ marginTop: scale(3), fontSize: scale(14) }}>
                Date created: {moment(userProfile.createdAt).format("LL")}
              </AppText>
            </View>
          </>
        )}
        {/* edit address */}
        {type === "address" && (
          <>
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
          </>
        )}
        {/* edit payment */}
        {type === "payment" && (
          <>
            <AppText
              style={{
                fontSize: scale(11),
                marginBottom: scale(8),
                marginLeft: scale(3),
              }}>
              Accepting American Express, MasterCard, Visa, and Discover
            </AppText>
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
            {errors.cvv && (
              <Text style={styles.error}>{errors.cvv.message}</Text>
            )}
          </>
        )}
        <AppButton
          buttonContainerStyle={{
            paddingVertical: moderateScale(13),
            marginTop: scale(18),
            width: "100%",
            position: "absolute",
            alignSelf: "center",
            bottom: scale(40),
          }}
          isLoading={updatingState}
          bgColor={colors.primary}
          btnText="Update"
          onPress={handleSubmit(onSubmit)}
        />
      </AppView>
    </Pressable>
  );
};

export default EditInformationScreen;

const styles = StyleSheet.create({
  error: {
    color: "red",
    marginLeft: scale(3),
  },
});
