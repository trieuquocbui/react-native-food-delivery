import { Colors } from "@/constants/Colors";
import { FlatList, StyleSheet, TouchableOpacity, Text } from "react-native";

interface StatusOrderListProps {
  onSelectStatus: (_id: number) => void;
}

const list = [
  { _id: -1, name: "Huỷ Đơn" },
  { _id: 0, name: "Xử lí" },
  { _id: 1, name: "Duyệt đơn" },
  { _id: 2, name: "Vận chuyển" },
  { _id: 3, name: "Thành công" },
];

const StatusOrderList: React.FC<StatusOrderListProps> = ({
  onSelectStatus,
}) => {
  return (
    <FlatList
      data={list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => onSelectStatus(item._id)}
        >
          <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item._id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 2,
    alignItems: "center",
    backgroundColor: Colors.primaryBackground,
    padding: 10,
    minWidth: 100,
    borderRadius: 6,
  },
  itemText: {
    color: Colors.whiteBackground,
  },
});

export default StatusOrderList;
