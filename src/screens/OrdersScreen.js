import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { useSelector } from "react-redux";
import { selectAllOrders } from "../redux/slices/orderSlice";
import { scale, shadowStyle } from "../assets/Styles";
import AppButton from "../components/AppButton";
import { useTheme } from "@react-navigation/native";
import { returnPizzaImage } from "../assets/pizza_data";
import moment from "moment";
import { formatPrice } from "../lib/helper";
import { ProgressBar } from "react-native-paper";

const OrdersScreen = () => {
  const orders = useSelector(selectAllOrders);
  const { colors } = useTheme();

  return (
    <AppView style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: scale(5) }}
        data={orders}
        keyExtractor={(order) => order.id}
        renderItem={({ item: order }) => (
          <View
            style={[
              {
                backgroundColor: colors.card,
                marginBottom: scale(5),
                padding: scale(10),
                borderRadius: 10,
              },
              shadowStyle,
            ]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <AppText>Order id: {order.id.slice(0, 8)}</AppText>
              <AppText>{order.delivery ? "Delivery" : "Pick up"}</AppText>
            </View>
            {/* {console.log(order)} */}
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ flex: 1, marginVertical: scale(6) }}>
              {order.items.map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: colors.background,
                    height: scale(100),
                    // marginHorizontal: scale(6),
                    width: scale(100),
                    // marginHorizontal: scale(8),
                    padding: scale(8),
                    borderRadius: 10,
                    // justifyContent: "space-between",
                  }}>
                  <View>
                    <AppText
                      numberOfLines={1}
                      style={{
                        fontWeight: "bold",
                        // fontSize: scale(16),
                        marginBottom: scale(5),
                      }}>
                      {item.pizzaName}
                    </AppText>
                    <Image
                      source={returnPizzaImage(item.pizzaName)}
                      style={{
                        width: scale(50),
                        height: scale(50),
                        // alignSelf: "center",
                        // borderWidth: 1,
                        // borderColor: "black",
                      }}
                    />
                  </View>
                  <AppText
                    style={{
                      fontSize: scale(11.5),
                      alignSelf: "flex-end",
                      marginTop: scale(-5),
                    }}>
                    Qty: {item.quantity}
                  </AppText>
                  {/* <AppButton
                    buttonContainerStyle={{
                      paddingVertical: scale(7.5),
                    }}
                    btnTextStyle={{ fontSize: scale(13.5) }}
                    bgColor={colors.primary}
                    btnText="Order again"
                  /> */}
                </View>
              ))}
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <AppText>Ordered: {moment(order.timePlaced).fromNow()}</AppText>
              <AppText>Total: {formatPrice(order.price)}</AppText>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // borderWidth: 1,
                justifyContent: "space-between",
                marginTop: scale(5),
              }}>
              <AppText style={{ fontWeight: "bold" }}>Status:</AppText>
              <View style={{ width: "82.5%", marginTop: scale(2) }}>
                <ProgressBar
                  style={{ width: "100%", height: scale(5), borderRadius: 8 }}
                  indeterminate
                  color={colors.primary}
                />
              </View>
            </View>
          </View>
        )}
      />
    </AppView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
