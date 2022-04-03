import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { useSelector } from "react-redux";
import { selectAllOrders } from "../redux/slices/orderSlice";
import { scale, shadowStyle } from "../assets/Styles";
import { useTheme } from "@react-navigation/native";
import { returnPizzaImage } from "../assets/pizza_data";
import moment from "moment";
import { formatPrice } from "../lib/helper";
import { ProgressBar, Searchbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

const ListHeader = () => {
  const { colors } = useTheme();
  return (
    <View style={{}}>
      <Searchbar
        style={[{ backgroundColor: colors.card }, shadowStyle]}
        placeholder="Search"
        iconColor="#aaa"
        inputStyle={{ color: "#aaa" }}
        theme={{ colors: { placeholder: "#aaa" } }}
      />
      <View style={header.footer}>
        <AppText style={header.pastOrderTxt}>Past Orders</AppText>
        <TouchableOpacity
          onPress={() => alert("This is only for show")}
          activeOpacity={0.6}
          style={[
            header.filterBtn,
            shadowStyle,
            { backgroundColor: colors.card },
          ]}>
          <View style={header.filterInnerContainer}>
            <AntDesign name="filter" size={24} color={colors.text} />
            <AppText>Filter</AppText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const OrdersScreen = () => {
  const orders = useSelector(selectAllOrders);
  const { colors } = useTheme();

  return (
    <AppView style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={<ListHeader />}
        maxToRenderPerBatch={10}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: scale(5) }}
        data={orders}
        keyExtractor={(order) => order.id}
        renderItem={({ item: order }) => (
          <View
            style={[
              { backgroundColor: colors.card },
              shadowStyle,
              styles.orderCardContainer,
            ]}>
            <View style={styles.orderHeader}>
              <AppText style={{ fontWeight: "bold" }}>
                Order id: {order.id.slice(0, 8)}
              </AppText>
              <AppText>{order.delivery ? "Delivery" : "Pick up"}</AppText>
            </View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              style={{ flex: 1, marginVertical: scale(6) }}>
              {order.items.map((item, index) => (
                <View
                  key={index}
                  style={[
                    { backgroundColor: colors.background },
                    styles.pizzaScrollContainer,
                  ]}>
                  <View>
                    <AppText
                      numberOfLines={1}
                      style={{
                        fontWeight: "bold",
                        marginBottom: scale(5),
                      }}>
                      {item.pizzaName}
                    </AppText>
                    <Image
                      source={returnPizzaImage(item.pizzaName)}
                      style={{
                        width: scale(50),
                        height: scale(50),
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
                </View>
              ))}
            </ScrollView>
            <View style={styles.orderHeader}>
              <AppText>Ordered: {moment(order.timePlaced).calendar()}</AppText>
              <AppText>Total: {formatPrice(order.price)}</AppText>
            </View>
            <View style={styles.orderFooter}>
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

const header = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: scale(5),
  },
  pastOrderTxt: {
    fontSize: scale(14),
    fontWeight: "bold",
    marginLeft: scale(2),
  },
  filterBtn: {
    borderRadius: 4,
    paddingHorizontal: scale(2),
  },
  filterInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: scale(2),
  },
});

const styles = StyleSheet.create({
  orderCardContainer: {
    marginBottom: scale(5),
    padding: scale(10),
    borderRadius: 10,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pizzaScrollContainer: {
    height: scale(100),
    marginHorizontal: scale(2),
    width: scale(100),
    padding: scale(8),
    borderRadius: 10,
  },
  orderFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scale(5),
  },
});
