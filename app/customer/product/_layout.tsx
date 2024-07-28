import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

const LayoutProduct: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryBackground,
        },
        headerTintColor: Colors.whiteColor,
      }}
    >
      <Stack.Screen
        name="[productId]"
        options={{ title: "Chi tiết sản phẩm" }}
      />
    </Stack>
  );
};

export default LayoutProduct;
