import {Button, Text, View} from "react-native";
import {Stack} from "expo-router";

export default function Index() {
    return (
        <Stack /*screenOptions={{
            headerShown: false,
        }}*/>
            <Stack.Screen name="sign-up" />
        </Stack>
    );
}
