import { Tabs } from "expo-router";
import React from "react";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Colors } from "@/constants/Colors";
import SearchBar from "@/components/SearchBar";
import { StyleSheet, View } from "react-native";
import AvatarHeader from "@/components/AvatarHeader";
import { DrawerActions, useNavigation } from "@react-navigation/native";

const LayoutTabs: React.FC = () => {
  const navigation = useNavigation();
  return (
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
              <SearchBar></SearchBar>
            </View>
          ),
          headerRight: () => (
            <View style={styles.marginR12}>
              <AvatarHeader
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
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
