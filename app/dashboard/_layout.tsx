import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Drawer} from "expo-router/drawer";
import {View, useWindowDimensions, Text} from "react-native";
import {Header} from "@/components/Header/Header";

export default function Layout() {
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer
                screenOptions={{
                    drawerType: isLargeScreen ? 'permanent': undefined,
                    header: () => {
                        return <Header/>
                    },
                    drawerPosition: 'left',
                }}
            >
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Organizations Overview',
                        title: 'organization overview',
                    }}
                />
                <Drawer.Screen
                    name="leagues/index"
                    options={{
                        drawerLabel: 'Leagues',
                        title: 'Leagues'
                    }}
                />
                <Drawer.Screen
                    name="teams/index"
                    options={{
                        drawerLabel: 'Teams',
                        title: 'Teams'
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
