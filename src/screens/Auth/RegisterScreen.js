import { StyleSheet, View, Alert, Text } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  StackActions,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import {
  addressRegex,
  creditCardType,
  emailRegex,
  phoneRegex,
  stateRegex,
  zipcodeRegex,
} from "../../lib/helper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppView from "../../components/AppView";
import { moderateScale, scale } from "../../assets/Styles";
import { Fontisto } from "@expo/vector-icons";
import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Controller, useForm } from "react-hook-form";
import PaperTextInput from "../../components/PaperTextInput";
import { TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/slices/userSlice";

const RegisterScreen = () => {
  const { colors } = useTheme();
  const nav = useNavigation();
  const [passVisible, setPassVisible] = useState(true);
  const loadingState = useSelector(selectLoading);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: "",
      lname: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
      card: "",
      cvv: "",
    },
  });

  useLayoutEffect(() => {
    // Customizing the top header
    nav.setOptions({
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTitleStyle: {
        color: "white",
        fontSize: 20,
      },
      headerTintColor: "white",
      headerTitle: "Create your account",
    });
  }, []);

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      const copiedObj = {
        ...data,
        rewards: 2,
        createdAt: serverTimestamp(),
        id: user.uid,
      };
      delete copiedObj.password;

      await setDoc(doc(db, "users", user.uid), copiedObj);
      nav.dispatch(StackActions.popToTop());
      Alert.alert(
        "Thank you for creating your account! You earned 2 reward points."
      );
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <AppView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        enableOnAndroid={false}
        extraHeight={scale(20)}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          padding: scale(5),
          paddingTop: scale(10),
        }}
        style={{ flex: 1 }}>
        <View style={styles.sectionContainer}>
          <AppText style={styles.text}>Fill out the information below:</AppText>
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
          <Controller
            control={control}
            rules={{
              required: "Field cannot be empty",
            }}
            render={({ field: { onChange, value } }) => (
              <PaperTextInput
                label="Password"
                value={value}
                onChangeText={onChange}
                secureTextEntry={passVisible}
                maxLength={8}
                right={
                  <TextInput.Icon
                    name={passVisible ? "eye" : "eye-off"}
                    onPress={() => setPassVisible(!passVisible)}
                    color="#aaa"
                  />
                }
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
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
          <AppText
            style={{
              fontSize: scale(11),
              marginLeft: scale(3),
              marginTop: scale(2),
              marginBottom: scale(5),
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
        <AppButton
          buttonContainerStyle={{
            paddingVertical: moderateScale(15),
            marginTop: scale(10),
            width: "100%",
          }}
          bgColor={colors.primary}
          btnText="Register"
          isLoading={loadingState}
          onPress={handleSubmit(onSubmit)}
        />
      </KeyboardAwareScrollView>
    </AppView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: moderateScale(17),
    marginLeft: scale(5),
    marginBottom: scale(12),
  },
  sectionContainer: {
    marginTop: 10,
  },
  error: {
    color: "red",
    marginLeft: scale(3),
  },
});
