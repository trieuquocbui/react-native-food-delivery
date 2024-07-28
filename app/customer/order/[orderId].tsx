import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const OrderDetails: React.FC = () => {
  const { orderId } = useLocalSearchParams();

  return (
    <>
      <View>
        <Text>{orderId}</Text>
      </View>
    </>
  );
};

export default OrderDetails;
