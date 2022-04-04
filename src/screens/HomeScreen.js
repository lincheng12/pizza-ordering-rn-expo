import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
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
import {
  useNavigation,
  useTheme,
  useIsFocused,
} from "@react-navigation/native";
import { Foundation, Entypo } from "@expo/vector-icons";
import AppTouchable from "../components/AppTouchable";
import PizzaCard from "../components/PizzaCard";
import AppButton from "../components/AppButton";
import { useSelector } from "react-redux";
import { selectLastOrder } from "../redux/slices/orderSlice";
import { selectUser } from "../redux/slices/userSlice";
import moment from "moment";
import Modal from "react-native-modal";

const HomeScreen = () => {
  const { colors } = useTheme();
  const nav = useNavigation();
  const userProfile = useSelector(selectUser);
  const lastOrder = useSelector(selectLastOrder);
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused();
  const mainScrollRef = useRef(null);
  const lastOrderRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      mainScrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      lastOrderRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }
  }, [isFocused]);

  const toggleModal = () => setVisible(!visible);

  return (
    <AppView style={{ flex: 1 }}>
      <ScrollView
        ref={mainScrollRef}
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
            <TouchableOpacity disabled={!userProfile} onPress={toggleModal}>
              <AppText
                style={{
                  color: !userProfile ? "#aaa" : colors.primary,
                  marginRight: scale(8),
                  fontSize: scale(14.5),
                }}>
                Summary
              </AppText>
            </TouchableOpacity>
            <Modal
              useNativeDriver
              useNativeDriverForBackdrop
              animationIn="slideInDown"
              animationOut="slideOutUp"
              isVisible={visible}
              onBackdropPress={toggleModal}>
              <View
                style={{
                  position: "relative",
                  width: scale(300),
                  height: scale(400),
                  backgroundColor: colors.card,
                  borderRadius: 10,
                }}>
                <Pressable
                  onPress={toggleModal}
                  style={{
                    position: "absolute",
                    backgroundColor: colors.notification,
                    padding: scale(10),
                    top: scale(-12),
                    right: scale(-10),
                    borderRadius: 50,
                    zIndex: 20,
                  }}>
                  <Entypo name="cross" size={24} color="white" />
                </Pressable>
                <AppText>Hello</AppText>
              </View>
            </Modal>
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
                          // marginHorizontal: scale(8),
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
                  <Text>Looks like you have not place any order yet</Text>
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
