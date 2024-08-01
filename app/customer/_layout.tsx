import { Stack } from "expo-router";
import React from "react";

const LayoutCustomer: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(drawer)" />
      <Stack.Screen name="order" />
      <Stack.Screen name="product" />
    </Stack>
  );
};

export default LayoutCustomer;
