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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{}}
      >
        <Drawer.Screen
          name="a"
          options={{
            drawerLabel: "asd",
            title: "overview",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
