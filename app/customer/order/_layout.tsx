import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

const LayoutOrder: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryBackground,
        },
        headerTintColor: Colors.whiteColor,
        title: "Đặt hàng",
      }}

    >
      {/* <Stack.Screen name="order" options={{ title: "Đặt hàng" }} /> */}
      <Stack.Screen name="infor" options={{ title: "Thông tin người nhận" }} />
      <Stack.Screen name="location" options={{ title: "Bản đồ" }} />
      <Stack.Screen name="[orderId]" options={{ title: "Xem đơn hàng" }} />
    </Stack>
  );
};

export default LayoutOrder;
