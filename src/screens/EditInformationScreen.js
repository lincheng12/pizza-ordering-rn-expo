import { StyleSheet, Text, View, Pressable, Keyboard } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { useNavigation } from "@react-navigation/native";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import AppFloatingInput from "../components/AppFloatingInput";
import { scale } from "../assets/Styles";

const EditInformationScreen = ({ route }) => {
  const { type } = route.params;
  const nav = useNavigation();
  const userProfile = useSelector(selectUser);
  const [fname, setFname] = useState(userProfile.fname);
  const [lname, setLname] = useState(userProfile.lname);
  const [phone, setPhone] = useState(userProfile.phone);
  const [address, setAddress] = useState(userProfile.address);
  const [city, setCity] = useState(userProfile.city);
  const [state, setState] = useState(userProfile.state);
  const [zipcode, setZipcode] = useState(userProfile.zipcode);

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

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <AppView style={{ padding: scale(8) }}>
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
          </>
        )}
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
      </AppView>
    </Pressable>
  );
};

export default EditInformationScreen;

const styles = StyleSheet.create({});
