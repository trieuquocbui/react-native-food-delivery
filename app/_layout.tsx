import { Stack, useRouter } from "expo-router";
import { Provider } from "react-redux";
import store from "@/stores/Store";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getRole from "@/helpers/DecodeHelper";
import RoleHelper from "@/helpers/RoleHelper";

const LayoutRoot: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          let role: string = await getRole(token!);
          if ((role = RoleHelper.USER)) {
            router.push("/home");
          } else if (role == RoleHelper.EMPLOYEE) {
          }
        }
      } catch (error) {
        console.error("Failed to load token:", error);
      }
    };

    checkToken();
  }, []);

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="(auth)"
      >
        <Stack.Screen name="(customer)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
};

export default LayoutRoot;
