import { Tabs, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Colors } from "@/constants/Colors";
import SearchBar from "@/components/SearchBar";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import AvatarHeader from "@/components/AvatarHeader";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  CartDetailsState,
  deleteCartDetailAsync,
  getCartDetailsListAsync,
} from "@/stores/CartDetailsSlice";
import { RootState } from "@/stores/Store";
import AutoHideModal from "@/components/AutoHideModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LayoutTabs: React.FC = () => {
  const navigation = useNavigation();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const [alertVisible, setAlertVisible] = useState(false);

  const cartDetailsState: CartDetailsState = useAppSelector(
    (state: RootState) => state.cart
  );

  const deleteCartDetails = () => {
    let total = cartDetailsState.list.reduce((total, item) => {
      if (item.checked) {
        return (total += 1);
      }
      return total;
    }, 0);
    if (total === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn ít nhất một mục để xóa.");
      return;
    }

    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa các mục đã chọn không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => {
            dispatch(deleteCartDetailAsync());
            setAlertVisible(true);
          },
        },
      ]
    );
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    dispatch(getCartDetailsListAsync());
  }, [dispatch]);

  const inputSearch = (search: string): void => {
    console.log(search);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primaryBackground,
          headerStyle: {
            backgroundColor: Colors.primaryBackground,
          },
          headerTintColor: Colors.whiteColor,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: () => null,
            headerLeft: () => (
              <View style={styles.marginL12}>
                <SearchBar inputSearch={() => inputSearch}></SearchBar>
              </View>
            ),
            headerRight: () => (
              <View style={styles.marginR12}>
                <AvatarHeader
                  onPress={
                    () => {
                      AsyncStorage.clear(), router.push("/");
                    }
                    // navigation.dispatch(DrawerActions.openDrawer())
                  }
                ></AvatarHeader>
              </View>
            ),
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                color={color}
                size={28}
                icon={faHouse}
              ></FontAwesomeIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "Giỏ hàng",
            headerRight: () => (
              <Pressable style={styles.marginR12} onPress={deleteCartDetails}>
                <FontAwesomeIcon
                  color={Colors.whiteColor}
                  size={28}
                  icon={faTrash}
                ></FontAwesomeIcon>
              </Pressable>
            ),
            tabBarBadge: cartDetailsState.list.length,
            tabBarBadgeStyle: {
              backgroundColor: Colors.primaryBackground,
              color: Colors.whiteColor,
              borderWidth: 1,
              borderColor: Colors.whiteColor,
            },
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                color={color}
                size={28}
                icon={faCartShopping}
              ></FontAwesomeIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: "Thông báo",
            tabBarBadge: 3,
            tabBarBadgeStyle: {
              backgroundColor: Colors.primaryBackground,
              color: Colors.whiteColor,
              borderWidth: 1,
              borderColor: Colors.whiteColor,
            },
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                color={color}
                size={28}
                icon={faBell}
              ></FontAwesomeIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Hồ sơ",
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon
                color={color}
                size={28}
                icon={faUser}
              ></FontAwesomeIcon>
            ),
          }}
        />
      </Tabs>
      <AutoHideModal
        visible={alertVisible}
        onClose={hideAlert}
        message="Xoá thành công"
      />
    </>
  );
};

const styles = StyleSheet.create({
  marginL12: {
    marginLeft: 12,
  },
  marginR12: {
    marginRight: 12,
  },
});

export default LayoutTabs;
