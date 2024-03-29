import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useEffect } from "react";
import AppView from "../components/AppView";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoading, selectUser } from "../redux/slices/userSlice";
import {
  useNavigation,
  useTheme,
  useIsFocused,
} from "@react-navigation/native";
import {
  moderateScale,
  scale,
  shadowStyle,
  verticalScale,
} from "../assets/Styles";
import AppButton from "../components/AppButton";
import { ActivityIndicator, ProgressBar } from "react-native-paper";
import { useFonts, Lobster_400Regular } from "@expo-google-fonts/lobster";
import { AntDesign } from "@expo/vector-icons";
import AppTouchable from "../components/AppTouchable";
import TouchableCard from "../components/TouchableCard";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const ProfileScreen = () => {
  const { colors } = useTheme();
  const nav = useNavigation();
  const userProfile = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const scrollRef = useRef(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    Lobster_400Regular,
  });

  useEffect(() => {
    if (!isFocused) scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }, [isFocused]);

  const userLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout()); //set the user state in redux to be null
      })
      .catch((err) => console.log("Error signing user out ", err));
  };

  const handleNav = (type) => nav.navigate("EditInformation", { type: type });

  if (loading || !fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <AppView style={{ flex: 1 }}>
      {!userProfile ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => nav.navigate("Login")}>
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              Sign in to view your profile
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View
            style={[
              {
                backgroundColor: colors.primary,
                width: "100%",
                height: verticalScale(170),
              },
              shadowStyle,
            ]}>
            <View style={styles.innerTopContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <View style={styles.nameContainer}>
                <Text style={styles.nameText}>
                  {userProfile.fname} {userProfile.lname}
                </Text>
                <Image
                  resizeMode="contain"
                  style={{ width: "12%", height: "70%" }}
                  source={require("../assets/pizza.png")}
                />
              </View>
            </View>
            <View style={styles.innerBottomContainer}>
              <View style={styles.progressBarContainer}>
                <Text style={styles.pointsText}>Points:</Text>
                <View style={styles.progressBarWrapper}>
                  <ProgressBar
                    style={{
                      width: "100%",
                      height: scale(10),
                      borderRadius: 8,
                    }}
                    progress={userProfile.rewards / 12}
                    color="white"
                  />
                </View>
                <AppTouchable>
                  <AntDesign
                    style={{ marginBottom: scale(2) }}
                    name="infocirlce"
                    size={20}
                    color="white"
                  />
                </AppTouchable>
              </View>
              <Text style={{ color: "white" }}>{userProfile.rewards}/12</Text>
            </View>
          </View>
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingVertical: scale(15),
              paddingHorizontal: scale(10),
              justifyContent: "space-between",
            }}>
            <View style={{ marginBottom: scale(20) }}>
              <TouchableCard
                onPress={() => handleNav("profile")}
                name="Personal Information"
              />
              <TouchableCard
                onPress={() => handleNav("address")}
                name="Saved Address"
              />
              <TouchableCard
                onPress={() => handleNav("payment")}
                name="Payment Method"
              />
              <TouchableCard
                onPress={() => alert("Coming in the future")}
                name="Rewards"
              />
              <TouchableCard
                onPress={() => alert("Coming soon...")}
                name="Customer Support"
              />
              <TouchableCard
                onPress={() => alert("No information is collected")}
                name="Private Policy"
              />
              <TouchableCard
                onPress={() => alert("It is a mystery")}
                name="Terms and Services"
              />
            </View>
            <AppButton
              buttonContainerStyle={{
                paddingVertical: moderateScale(12),
                width: "100%",
              }}
              bgColor={colors.primary}
              btnText="Logout"
              onPress={userLogout}
            />
          </ScrollView>
        </>
      )}
    </AppView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerTopContainer: {
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontFamily: "Lobster_400Regular",
    color: "white",
    fontSize: moderateScale(35),
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? scale(-10) : 0,
  },
  nameText: {
    fontFamily: "Lobster_400Regular",
    fontSize: moderateScale(30),
    color: "white",
  },
  innerBottomContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: scale(20),
  },
  progressBarContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  pointsText: {
    color: "white",
    fontSize: scale(14),
    marginBottom: scale(2),
  },
  progressBarWrapper: {
    marginHorizontal: scale(5),
    width: scale(233),
    justifyContent: "center",
  },
});
