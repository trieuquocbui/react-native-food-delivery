import { Link, Stack } from 'expo-router';
import { View, StyleSheet } from "react-native";

const NotFoundScreen = () => {
    return (
        <>
          <Stack.Screen options={{ title: "Hmmm! Không tìm thấy màng hình này." }} />
          <View style={styles.container}>
            <Link href="/">Trang chủ</Link>
          </View>
        </>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default NotFoundScreen