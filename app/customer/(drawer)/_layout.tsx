import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Button, View } from "react-native";

function CustomDrawerContent({ navigation }: any) {
  return (
    <View>
      <Button title="Close Drawer" onPress={() => navigation.closeDrawer()} />
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="(tabs)"
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "asd",
          title: "overview",
        }}
      />
    </Drawer>
  );
}
