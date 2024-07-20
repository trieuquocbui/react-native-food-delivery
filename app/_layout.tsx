import { Stack } from "expo-router"

const LayoutRoot = () => {
    return (
        <Stack screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="index"></Stack.Screen>            
        </Stack>
    )
}

export default LayoutRoot