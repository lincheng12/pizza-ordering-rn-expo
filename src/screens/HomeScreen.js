import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import {
  moderateScale,
  scale,
  shadowStyle,
  verticalScale,
  wHeight,
} from "../assets/Styles";
import { pizzData } from "../assets/pizza_data";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Foundation } from "@expo/vector-icons";
import AppTouchable from "../components/AppTouchable";
import PizzaCard from "../components/PizzaCard";
import AppButton from "../components/AppButton";

const HomeScreen = () => {
  const { colors } = useTheme();
  const nav = useNavigation();
  return (
    <AppView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        style={{ flex: 1 }}>
        <View style={{ height: scale(240) }}>
          <View style={styles.headerTopContainer}>
            <AppText style={styles.heading}>Place order</AppText>
            <TouchableOpacity
              onPress={() => nav.navigate("PizzaSelectionDetails")}>
              <AppText
                style={{
                  color: colors.primary,
                  marginRight: scale(8),
                  fontSize: scale(14.5),
                }}>
                View in details
              </AppText>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.horizontalScrollContainer}
            style={{ flex: 1 }}>
            {pizzData.map((item, index) => (
              <PizzaCard
                key={index}
                pizzaCardContainerStyle={{
                  height: "100%",
                  width: moderateScale(200),
                  marginHorizontal: scale(3),
                }}
                pizzaImageStyle={{ width: moderateScale(200), height: "65%" }}
                image={item.image}
                name={item.name}
                price={item.price}
                ingredients={item.ingredients}
                numberOfLines={1}
                onPress={() => nav.navigate("ConfigurePizza", { item })}
              />
            ))}
            <AppTouchable
              onPress={() => nav.navigate("ConfigurePizza", { startPrice: 6 })}>
              <View
                style={[
                  styles.diyCard,
                  { backgroundColor: colors.card },
                  shadowStyle,
                ]}>
                <Foundation name="plus" size={24} color={colors.primary} />
                <AppText
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: scale(3),
                  }}>
                  Make your own pizza
                </AppText>
                <AppText>+$6.00</AppText>
              </View>
            </AppTouchable>
          </ScrollView>
        </View>
        <View
          style={{
            backgroundColor: colors.card,
            height: scale(200),
            marginTop: scale(5),
          }}>
          <AppText style={styles.heading}>Last order</AppText>
          <View
            style={{
              backgroundColor: colors.background,
              height: scale(140),
              marginHorizontal: scale(8),
              // width: "100%",
              // marginHorizontal: scale(8),
            }}></View>
        </View>
        <View
          style={[
            {
              height: scale(440),
              backgroundColor: colors.card,
              marginTop: scale(5),
              paddingBottom: scale(20),
            },
            shadowStyle,
          ]}>
          <AppText style={styles.heading}>Running Deals</AppText>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.horizontalScrollContainer}>
            <View style={styles.dealContainer}>
              <Text style={styles.dealTitle}>10% Off Any Large Pizza</Text>
              <Image
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: "55%",
                }}
                source={require("../assets/elephant.png")}
              />
              <AppButton
                buttonContainerStyle={styles.dealBtn}
                btnText="Learn More"
                btnTextStyle={{ color: "black" }}
                bgColor="white"
                onPress={() => alert("Go away!")}
              />
            </View>
            <View style={styles.dealContainer}>
              <Text style={styles.dealTitle}>Spend $30 Get $10 Off</Text>
              <Image
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: "55%",
                }}
                source={require("../assets/koala.png")}
              />
              <AppButton
                buttonContainerStyle={styles.dealBtn}
                btnText="Learn More"
                btnTextStyle={{ color: "black" }}
                bgColor="white"
                onPress={() => alert("You wish!")}
              />
            </View>
            <View style={styles.dealContainer}>
              <Text style={styles.dealTitle}>Buy 3 Get 1 Free Pizza</Text>
              <Image
                resizeMode="contain"
                style={{
                  width: "100%",
                  height: "55%",
                }}
                source={require("../assets/cat.png")}
              />
              <AppButton
                buttonContainerStyle={styles.dealBtn}
                btnText="Learn More"
                btnTextStyle={{ color: "black" }}
                bgColor="white"
                onPress={() => alert("Meow!!!")}
              />
            </View>
          </ScrollView>
          <View
            style={{
              marginTop: scale(15),
              paddingHorizontal: scale(8),
            }}>
            <AppButton
              buttonContainerStyle={{ paddingVertical: scale(15) }}
              btnText="Learn more about us"
              bgColor={colors.primary}
            />
          </View>
        </View>
        {/* <AppText style={styles.heading}>Saved Pizzas:</AppText>
        <View style={{ flex: 0.8 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              flex: 1,
            }}>
            {pizzData.map((item, index) => (
              <AppTouchable key={index}>
                <View
                  style={[
                    {
                      backgroundColor: colors.card,
                      height: 80,
                      margin: 3,
                      borderRadius: 10,
                      flexDirection: "row",
                    },
                    shadowStyle,
                  ]}>
                  <Image
                    style={{
                      backgroundColor: "pink",
                      width: 80,
                      height: "100%",
                      borderBottomLeftRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                  />
                </View>
              </AppTouchable>
            ))}
          </ScrollView>
        </View> */}
      </ScrollView>
    </AppView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  horizontalScrollContainer: {
    paddingVertical: scale(2),
    paddingLeft: scale(6),
  },
  heading: {
    fontSize: moderateScale(25),
    fontWeight: "bold",
    paddingVertical: scale(10),
    paddingLeft: scale(8),
    letterSpacing: scale(0.6),
  },
  diyCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    marginHorizontal: scale(3),
    width: moderateScale(120),
    borderRadius: scale(10),
  },
  dealContainer: {
    backgroundColor: "black",
    height: "100%",
    width: scale(210),
    marginHorizontal: scale(2),
    alignItems: "center",
    position: "relative",
    padding: scale(10),
    borderRadius: 10,
  },
  dealTitle: {
    color: "white",
    fontSize: scale(25),
    fontWeight: "bold",
    textAlign: "center",
  },
  dealBtn: {
    width: "90%",
    position: "absolute",
    bottom: scale(20),
  },
});
