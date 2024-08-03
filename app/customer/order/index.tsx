import AutoHideModal from "@/components/AutoHideModal";
import ChargeArea from "@/components/ChargeArea";
import OrderingInforArea from "@/components/OrderingInforArea";
import OrderItem from "@/components/OrderItem";
import { Colors } from "@/constants/Colors";
import AppHelper from "@/helpers/AppHelper";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import CartDetailsModel from "@/models/CartDetailsModel";
import OrderDetailsModel from "@/models/OrderDetails";
import OrderModel from "@/models/OrderModel";
import ProductModel from "@/models/ProductModel";
import {
  CartDetailsState,
  deleteCartDetailAsync,
} from "@/stores/CartDetailsSlice";
import { createOrderAsync, OrderState } from "@/stores/OrderSlice";
import { RootState } from "@/stores/Store";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const Ordercreen: React.FC = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [alertVisible, setAlertVisible] = useState(false);

  const cartDetailsState: CartDetailsState = useAppSelector(
    (state: RootState) => state.cart
  );

  const orderState: OrderState = useAppSelector(
    (state: RootState) => state.order
  );

  const list: OrderDetailsModel[] = cartDetailsState.list
    .filter((item) => item.checked)
    .map((item) => {
      return {
        _id: item._id,
        product: item.product,
        price: item.product?.price,
        quantity: item.quantity,
      } as OrderDetailsModel;
    });

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const submitOrder = async () => {
    if (
      !orderState.newOrder.fullName &&
      !orderState.newOrder.phoneNumber &&
      !orderState.newOrder.address1 &&
      !orderState.newOrder.address2
    ) {
      return;
    }
    let order: OrderModel = {
      fullName: orderState.newOrder.fullName,
      phoneNumber: orderState.newOrder.phoneNumber,
      totalAmount: cartDetailsState.total + AppHelper.Shipping,
      shipping: AppHelper.Shipping,
      status: 0,
      address1: orderState.newOrder.address1,
      address2: orderState.newOrder.address2,
      latitude: orderState.newOrder.latitude,
      longitude: orderState.newOrder.longitude,
      orderDetails: list.map((item) => {
        let orderItem: OrderDetailsModel = {
          product: (item.product as ProductModel)._id!,
          quantity: item.quantity!,
          price: (item.product as ProductModel).price!,
        };
        return orderItem;
      }),
    };
    dispatch(createOrderAsync(order));
    dispatch(deleteCartDetailAsync());
    router.push("/customer");
  };

  return (
    <View style={styles.order}>
      <View style={styles.inforOrder}>
        <OrderingInforArea></OrderingInforArea>
      </View>
      <View style={styles.itemList}>
        <FlatList
          data={list}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <OrderItem item={item}></OrderItem>
            </View>
          )}
          ListFooterComponent={
            <View style={styles.container}>
              <ChargeArea
                total={cartDetailsState.total}
                shipping={AppHelper.Shipping}
              ></ChargeArea>
            </View>
          }
          keyExtractor={(item) => item._id!}
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
      <View style={styles.buyItemContainer}>
        <View style={styles.orderBtnContainer}>
          <Text>Tổng tiền: {cartDetailsState.total + AppHelper.Shipping}</Text>
          <TouchableOpacity style={styles.btnOrder} onPress={submitOrder}>
            <Text style={styles.textWhite}>Đặt hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AutoHideModal
        visible={alertVisible}
        onClose={hideAlert}
        message="Vui lòng điền đầy đủ thông tin"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textWhite: {
    color: Colors.whiteColor,
  },
  order: {
    flex: 1,
  },
  inforOrder: {
    height: "10%",
    backgroundColor: Colors.whiteColor,
    marginBottom: 4,
  },
  itemList: {
    height: "82%",
  },
  buyItemContainer: {
    height: "8%",
    backgroundColor: Colors.whiteColor,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  orderBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnOrder: {
    paddingHorizontal: 20,
    marginLeft: 6,
    backgroundColor: Colors.primaryBackground,
    height: "100%",
    justifyContent: "center",
  },
});

export default Ordercreen;
