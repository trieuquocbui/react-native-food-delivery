import { Stack } from "expo-router"

const LayoutAuth = () => {
    return (<>
        <Stack screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="login"></Stack.Screen>
            <Stack.Screen name="register"></Stack.Screen>
        </Stack>
    </>)
}

export default LayoutAuth