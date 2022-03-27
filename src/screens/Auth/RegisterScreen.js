import { StyleSheet, Text, View, Image } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppView from "../../components/AppView";
import { moderateScale, scale } from "../../assets/Styles";
import AppFloatingInput from "../../components/AppFloatingInput";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import AppText from "../../components/AppText";
import AppButton from "../../components/AppButton";
import { creditCardType } from "../../lib/helper";

const RegisterScreen = () => {
  const { colors } = useTheme();
  const nav = useNavigation();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [card, setCard] = useState("");
  const [cvv, setCVV] = useState("");
  const [phone, setPhone] = useState("");

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

  return (
    <AppView style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        enableOnAndroid={false}
        extraHeight={scale(20)}
        contentContainerStyle={{ padding: scale(5), paddingTop: scale(10) }}
        style={{ flex: 1 }}>
        <View style={styles.sectionContainer}>
          <AppText style={styles.text}>Enter the required information:</AppText>
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
          <AppFloatingInput
            style={{ marginVertical: scale(8) }}
            label="Password"
            maxLength={8}
            showCountdown
            showCountdownStyles={{
              color: colors.text,
              position: "absolute",
              bottom: scale(-12),
            }}
            customShowPasswordComponent={
              <Ionicons
                style={{ marginRight: scale(10) }}
                name="eye-outline"
                size={24}
                color="gray"
              />
            }
            customHidePasswordComponent={
              <Ionicons
                style={{ marginRight: scale(10) }}
                name="eye-off-outline"
                size={24}
                color="gray"
              />
            }
            isPassword={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.sectionContainer}>
          <AppText style={styles.text}>Enter the optional information:</AppText>
          <AppText
            style={{
              fontSize: 11,
              marginLeft: scale(5),
              marginTop: scale(-2),
            }}>
            Note: The following information will eventually be required when
            placing an order.
          </AppText>
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
        <AppButton
          buttonContainerStyle={{
            // position: "absolute",
            // bottom: scale(35),
            paddingVertical: moderateScale(12),
            marginTop: scale(18),
            width: "100%",
          }}
          bgColor={colors.primary}
          btnText="Register"
          // onPress={() => nav.navigate("Register")}
        />
      </KeyboardAwareScrollView>
    </AppView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  outerInputContainer: {
    borderWidth: 2,
    paddingHorizontal: scale(3),
    borderColor: "gray",
    backgroundColor: "#fff",
    // marginVertical: Platform.OS === "android" ? scale(6) : scale(12),
  },
  labelContainerStyle: {
    paddingHorizontal: scale(5),
  },
  inputStyle: {
    color: "black",
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
  },
  text: {
    fontWeight: "bold",
    fontSize: moderateScale(17),
    marginLeft: scale(5),
    marginBottom: scale(5),
  },
  sectionContainer: {
    marginTop: 10,
  },
});
