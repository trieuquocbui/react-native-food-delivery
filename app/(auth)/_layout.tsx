import { Stack } from "expo-router";

const LayoutAuth: React.FC = () => {
  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index"></Stack.Screen>
      <Stack.Screen name="register"></Stack.Screen>
    </Stack>
  );
};

export default LayoutAuth;
