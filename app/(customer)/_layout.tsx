import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "@/stores/Store";
import React from "react";

const LayoutCustomer: React.FC = () => {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="(drawer)"
      >
        <Stack.Screen name="(drawer)" />
      </Stack>
    </Provider>
  );
};

export default LayoutCustomer;
