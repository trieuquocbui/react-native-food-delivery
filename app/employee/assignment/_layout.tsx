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
        name="[assignmentId]"
        options={{ title: "Chi tiết đơn hàng" }}
      />
    </Stack>
  );
};

export default LayoutProduct;
