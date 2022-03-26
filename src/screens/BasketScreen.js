import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useLayoutEffect } from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBasket,
  decreaseItemCount,
  increaseItemCount,
  removeFromBasket,
  selectItems,
  selectTotal,
  selectTotalCount,
} from "../redux/slices/basketSlice";
import { formatPrice } from "../lib/helper";
import { useNavigation, useTheme } from "@react-navigation/native";
import { moderateScale, scale, shadowStyle } from "../assets/Styles";
import BasketCard from "../components/BasketCard";

const BasketScreen = () => {
  const { colors } = useTheme();
  const pizzaItems = useSelector(selectItems);
  const totalCost = useSelector(selectTotal);
  const totalCount = useSelector(selectTotalCount);
  const dispatch = useDispatch();
  const nav = useNavigation();

  useLayoutEffect(() => {
    nav.setOptions({
      headerRight: () => (
        <AppText
          style={{
            fontSize: scale(17),
            marginRight: scale(15),
          }}>
          Subtotal: {formatPrice(totalCost)}
        </AppText>
      ),
    });
  }, [totalCost]);

  return (
    <AppView style={{ flex: 1 }}>
      {pizzaItems.length === 0 ? (
        <View style={styles.container}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require("../assets/pizza_sad.png")}
          />
          <AppText style={styles.emptyTxt}>Your basket is empty</AppText>
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ padding: scale(2.5) }}
            style={{ flex: 1 }}>
            {pizzaItems.map((item, index) => (
              <BasketCard
                key={index}
                onRemoveItem={() => dispatch(removeFromBasket(item.id))}
                pizzaName={item.pizzaName}
                pizzaSize={item.pizzaBase[0]}
                pizzaSizeDetails={item.pizzaBase[0]}
                pizzaCrust={item.pizzaBase[1]}
                pizzaPrice={item.price}
                quantity={item.quantity}
                pizzaDetails={item.pizzaDetails}
                onDecreaseCount={() => dispatch(decreaseItemCount(item.id))}
                onIncreaseCount={() => dispatch(increaseItemCount(item.id))}
              />
            ))}
          </ScrollView>
          <View
            style={[{ backgroundColor: colors.card }, styles.footerContainer]}>
            <TouchableOpacity
              onPress={() => dispatch(clearBasket())}
              style={[
                { backgroundColor: colors.notification },
                styles.clearBtn,
                shadowStyle,
              ]}>
              <Text style={[{ fontSize: moderateScale(15.5) }, styles.btnText]}>
                Clear
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => nav.navigate("Checkout", { type: "multiple" })}
              style={[
                { backgroundColor: colors.primary },
                styles.checkoutBtn,
                shadowStyle,
              ]}>
              <Text style={[{ fontSize: moderateScale(16) }, styles.btnText]}>
                Checkout ({totalCount} items)
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </AppView>
  );
};

export default BasketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: moderateScale(280),
    marginTop: scale(-10),
  },
  emptyTxt: {
    fontSize: moderateScale(18),
    marginTop: scale(5),
    fontWeight: "bold",
  },
  footerContainer: {
    paddingVertical: scale(8),
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  clearBtn: {
    paddingVertical: moderateScale(12),
    flexGrow: 0.25,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  checkoutBtn: {
    paddingVertical: moderateScale(12),
    flexGrow: 0.7,
    borderRadius: 10,
  },
});
