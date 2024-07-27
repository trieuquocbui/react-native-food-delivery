import { Stack } from "expo-router";
import React from "react";

const LayoutCustomer: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="(drawer)"
    >
      <Stack.Screen name="(drawer)" />
      <Stack.Screen name="(order)" />
    </Stack>
  );
};

export default LayoutCustomer;
