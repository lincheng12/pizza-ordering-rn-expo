import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { moderateScale, scale, shadowStyle } from "../assets/Styles";
import { pizzData } from "../assets/pizza_data";
import {
  useNavigation,
  useTheme,
  useIsFocused,
  TabActions,
} from "@react-navigation/native";
import { Foundation, Entypo } from "@expo/vector-icons";
import AppTouchable from "../components/AppTouchable";
import PizzaCard from "../components/PizzaCard";
import AppButton from "../components/AppButton";
import { useDispatch, useSelector } from "react-redux";
import { selectLastOrder } from "../redux/slices/orderSlice";
import { selectUser } from "../redux/slices/userSlice";
import moment from "moment";
import { addToBasket } from "../redux/slices/basketSlice";

const HomeScreen = () => {
  const { colors } = useTheme();
  const nav = useNavigation();
  const userProfile = useSelector(selectUser);
  const lastOrder = useSelector(selectLastOrder);
  const [timeoutId, setTimeoutId] = useState(null);
  const isFocused = useIsFocused();
  const mainScrollRef = useRef(null);
  const lastOrderRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    debugger;
    if (isFocused) {
      lastOrderRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      //clear the timeout so that it doesn't auto scroll after 1 minute
      clearTimeout(timeoutId);
    } else {
      //after 1 minute, if user has not returned to home screen, the scroll view will auto scroll to top
      const id = setTimeout(() => {
        mainScrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      }, 60000);
      setTimeoutId(id);
    }
  }, [isFocused]);

  return (
    <AppView style={{ flex: 1 }}>
      <ScrollView
        ref={mainScrollRef}
        // onScroll={scrollDirection}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{}}
        style={{ flex: 1 }}>
        {/* Place order section starts */}
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
                numberOfLines={1}
                item={item}
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
        {/* Place order section ends */}

        {/* Last order section starts */}
        <View
          style={{
            backgroundColor: colors.card,
            height: scale(190),
            marginTop: scale(5),
          }}>
          {/* Last order header starts */}
          <View style={styles.headerTopContainer}>
            <AppText style={styles.heading}>Last order</AppText>
            <TouchableOpacity
              disabled={!userProfile}
              onPress={() => nav.dispatch(TabActions.jumpTo("Orders"))}>
              <AppText
                style={{
                  color: !userProfile ? "#aaa" : colors.primary,
                  marginRight: scale(8),
                  fontSize: scale(14.5),
                }}>
                Details
              </AppText>
            </TouchableOpacity>
          </View>
          {/* Last order header ends */}

          {!userProfile ? (
            <View
              style={{
                height: scale(120),
                alignItems: "center",
                justifyContent: "center",
              }}>
              <TouchableOpacity onPress={() => nav.navigate("Login")}>
                <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                  Sign in first to check your last order
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {Object.keys(lastOrder).length > 0 ? (
                <ScrollView
                  ref={lastOrderRef}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  contentContainerStyle={styles.horizontalScrollContainer}
                  style={{ flex: 1 }}>
                  {lastOrder?.items?.map((item, index) => (
                    <View
                      key={index}
                      style={[
                        {
                          backgroundColor: colors.background,
                          height: scale(120),
                          marginHorizontal: scale(6),
                          width: scale(230),
                          padding: scale(10),
                          borderRadius: 10,
                          justifyContent: "space-between",
                        },
                        shadowStyle,
                      ]}>
                      <View>
                        <AppText
                          style={{
                            fontWeight: "bold",
                            fontSize: scale(16),
                            marginBottom: scale(2),
                          }}>
                          {item.pizzaName}
                        </AppText>
                        <AppText>
                          Ordered: {moment(lastOrder.timePlaced).fromNow()}
                        </AppText>
                      </View>
                      <AppButton
                        onPress={() => dispatch(addToBasket(item))}
                        buttonContainerStyle={{
                          paddingVertical: scale(7.5),
                        }}
                        btnTextStyle={{ fontSize: scale(13.5) }}
                        bgColor={colors.primary}
                        btnText="Order again"
                      />
                    </View>
                  ))}
                </ScrollView>
              ) : (
                <View
                  style={{
                    height: scale(120),
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  <AppText style={{ marginBottom: scale(5) }}>
                    Looks like you have not place any order yet
                  </AppText>
                  <TouchableOpacity
                    onPress={() => nav.navigate("PizzaSelectionDetails")}>
                    <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                      Place your first order
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </View>
        {/* Last order section ends */}

        {/* Deals */}
        <View
          style={[
            {
              height: scale(440),
              backgroundColor: colors.card,
              marginTop: scale(10),
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
