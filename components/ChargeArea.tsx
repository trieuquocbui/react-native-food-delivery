import AppHelper from "@/helpers/AppHelper";
import { View, Text, StyleSheet } from "react-native";

interface ChargeProps {
  total: number;
  shipping: number;
}

const ChargeArea: React.FC<ChargeProps> = ({ total, shipping }) => {
  return (
    <>
      <View style={styles.charge}>
        <View>
          <Text style={styles.title}>Chi tiết thanh toán khi nhận hàng</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.name, styles.textSize]}>
            Tổng số tiền mua hàng
          </Text>
          <Text style={styles.textSize}>{total}</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.name, styles.textSize]}>Tiền vận chuyển</Text>
          <Text style={styles.textSize}>{shipping}</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.name, styles.textSize]}>Tổng thanh toán</Text>
          <Text style={[styles.textSize, styles.total]}>
            {total + shipping}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  charge: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    flex: 1,
  },
  textSize: {
    fontSize: 12,
  },
  total: {
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChargeArea;
