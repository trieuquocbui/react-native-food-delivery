import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "@/stores/Store";
import React from "react";

const LayoutRoot: React.FC = () => {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="(customer)"
      >
        <Stack.Screen name="(customer)" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </Provider>
  );
};

export default LayoutRoot;
