import NotificationItem from "@/components/NotificationItem";
import { FlatList, StyleSheet } from "react-native";

const data = [
  { id: "1", name: "a" },
  { id: "2", name: "a" },
  { id: "3", name: "a" },
  { id: "4", name: "a" },
  { id: "5", name: "a" },
  { id: "6", name: "a" },
];

const NotificationScreen: React.FC = () => {
  return (
    <FlatList
      data={data}
      renderItem={(item) => <NotificationItem></NotificationItem>}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    ></FlatList>
  );
};

const styles = StyleSheet.create({});

export default NotificationScreen;
