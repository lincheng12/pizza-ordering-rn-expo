import { StyleSheet, Text, View, Pressable, Keyboard } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { useNavigation, useTheme } from "@react-navigation/native";
import { selectUser, updateUserById } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import AppFloatingInput from "../components/AppFloatingInput";
import { moderateScale, scale, sWidth } from "../assets/Styles";
import { Fontisto } from "@expo/vector-icons";
import { creditCardType } from "../lib/helper";
import AppButton from "../components/AppButton";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";

const EditInformationScreen = ({ route }) => {
  const { type } = route.params;
  const { colors } = useTheme();
  const nav = useNavigation();
  const userProfile = useSelector(selectUser);
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
    return isDirty
      ? dispatch(updateUserById(res))
      : alert("No fields has change.");
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
                <AppFloatingInput
                  style={{ marginTop: scale(8) }}
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
                <AppFloatingInput
                  style={{ marginTop: scale(8) }}
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
                <AppFloatingInput
                  style={{ marginTop: scale(8) }}
                  label="Phone"
                  maskType="phone"
                  mask="(123) 123-1234"
                  hint="(123) 123-1234"
                  keyboardType="phone-pad"
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="phone"
            />
            {errors.phone && (
              <Text style={styles.error}>{errors.phone.message}</Text>
            )}
            <View style={{ paddingLeft: scale(3), marginTop: scale(5) }}>
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
                  value: /^\s*\S+(?:\s+\S+){2}/,
                  message: "Not a valid address input",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <AppFloatingInput
                  style={{ marginTop: scale(8) }}
                  label="Address"
                  hint="1234 Test St."
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
                marginTop: scale(8),
              }}>
              <Controller
                control={control}
                rules={{
                  required: "City field cannot be empty",
                }}
                render={({ field: { onChange, value } }) => (
                  <AppFloatingInput
                    totalWidth="45%"
                    label="City"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
                name="city"
              />
              <Controller
                control={control}
                rules={{
                  required: "State field cannot be empty",
                  pattern: {
                    value:
                      /^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/,
                    message: "State input is invalid",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <AppFloatingInput
                    totalWidth="20%"
                    label="State"
                    hint="AB"
                    mask="AB"
                    autoCapitalize="characters"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
                name="state"
              />
              <Controller
                control={control}
                rules={{
                  required: "Zipcode field cannot be empty",
                  pattern: {
                    value: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
                    message: "zipcode input is invalid",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <AppFloatingInput
                    totalWidth="30%"
                    label="Zipcode"
                    hint="12345"
                    mask="12345"
                    keyboardType="number-pad"
                    value={value}
                    onChangeText={onChange}
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
                fontSize: scale(11.5),
                marginLeft: scale(3),
                marginBottom: scale(5),
              }}>
              Accepts American Express, MasterCard, Visa, and Discover
            </AppText>
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
                    <AppFloatingInput
                      totalWidth="80%"
                      label="Credit Card"
                      maskType="card"
                      hint="1234 1234 1234 1234"
                      mask="1234 1234 1234 1234"
                      keyboardType="number-pad"
                      maxLength={19}
                      value={value}
                      onChangeText={onChange}
                    />
                  )}
                  name="card"
                />
                <Fontisto
                  style={{ marginLeft: scale(5) }}
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
                  <AppFloatingInput
                    totalWidth="30%"
                    label="Card CVV"
                    hint="123"
                    mask="123"
                    keyboardType="number-pad"
                    value={value}
                    onChangeText={onChange}
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
            paddingVertical: moderateScale(12),
            marginTop: scale(18),
            width: "100%",
            position: "absolute",
            alignSelf: "center",
            bottom: scale(50),
          }}
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
  },
});
