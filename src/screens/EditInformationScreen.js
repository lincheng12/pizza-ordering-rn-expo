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

const EditInformationScreen = ({ route }) => {
  const { type } = route.params;
  const { colors } = useTheme();
  const nav = useNavigation();
  const userProfile = useSelector(selectUser);
  const dispatch = useDispatch();
  const [fname, setFname] = useState(userProfile.fname);
  const [lname, setLname] = useState(userProfile.lname);
  const [phone, setPhone] = useState(userProfile.phone);
  const [address, setAddress] = useState(userProfile.address);
  const [city, setCity] = useState(userProfile.city);
  const [state, setState] = useState(userProfile.state);
  const [zipcode, setZipcode] = useState(userProfile.zipcode);
  const [card, setCard] = useState(userProfile.card);
  const [cvv, setCVV] = useState(userProfile.cvv);

  useLayoutEffect(() => {
    // Customizing the top header
    nav.setOptions({
      headerTitle: displayHeaderTitle(),
    });
  }, []);

  const displayHeaderTitle = () => {
    switch (type) {
      case "profile":
        return "Personal Information";
      case "address":
        return "Saved Address";
      case "payment":
        return "Payment Method";
      case "rewards":
        return "Rewards";
    }
  };

  const updateProfile = () => {
    if (
      (fname !== userProfile.fname ||
        lname !== userProfile.lname ||
        phone !== userProfile.phone) &&
      fname !== "" &&
      lname !== "" &&
      phone !== ""
    ) {
      const doc = {
        fname: fname.trim(),
        lname: lname.trim(),
        phone,
      };
      dispatch(updateUserById(doc));
      alert("User profile updated");
    } else {
      alert("Can't update empty or same information");
    }
  };

  // const updateAddress = async () => {
  //   if (
  //     (address !== userProfile.address ||
  //       city !== userProfile.city ||
  //       state !== userProfile.state ||
  //       zipcode !== userProfile.zipcode) &&
  //     address !== "" &&
  //     city !== "" &&
  //     state !== "" &&
  //     zipcode !== ""
  //   ) {
  //     await updateDoc(doc(db, "users", userProfile.id), {});
  //   }
  // };

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <AppView style={{ padding: scale(8), position: "relative", flex: 1 }}>
        {/* edit profile */}
        {type === "profile" && (
          <>
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
              label="Phone"
              maskType="phone"
              mask="(123) 123-1234"
              hint="(123) 123-1234"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
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
          </>
        )}
        {/* edit payment */}
        {type === "payment" && (
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
          onPress={updateProfile}
        />
      </AppView>
    </Pressable>
  );
};

export default EditInformationScreen;

const styles = StyleSheet.create({});
