import {
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AppView from "../components/AppView";
import AppText from "../components/AppText";
import { useSelector } from "react-redux";
import { selectAllOrders } from "../redux/slices/orderSlice";
import { scale, shadowStyle } from "../assets/Styles";
import {
  useTheme,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { returnPizzaImage } from "../assets/pizza_data";
import moment from "moment";
import { formatPrice } from "../lib/helper";
import { ProgressBar, Searchbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { selectUser } from "../redux/slices/userSlice";

const ListHeader = ({ colors }) => (
  <>
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
  </>
);

const PizzaOrder = ({ item: order, colors }) => (
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
              resizeMode="contain"
              source={returnPizzaImage(item?.pizzaName)}
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
);

const OrdersScreen = () => {
  const orders = useSelector(selectAllOrders);
  const { colors } = useTheme();
  const scrollRef = useRef(null);
  const isFocused = useIsFocused();
  const [orderChange, setOrderChange] = useState(false);
  const userProfile = useSelector(selectUser);
  const nav = useNavigation();

  useEffect(() => {
    setOrderChange(true);
  }, [orders]);

  useEffect(() => {
    if (isFocused && orderChange) {
      scrollRef.current?.scrollToOffset({ offset: 0 });
      setOrderChange(false);
    }
  }, [orderChange, isFocused]);

  return (
    <AppView style={{ flex: 1 }}>
      {userProfile ? (
        <FlatList
          ref={scrollRef}
          ListHeaderComponent={<ListHeader colors={colors} />}
          maxToRenderPerBatch={10}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: scale(5) }}
          data={orders}
          keyExtractor={(order) => order.id}
          renderItem={({ item }) => <PizzaOrder item={item} colors={colors} />}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => nav.navigate("Login")}>
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              Sign in first to check your last order
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
