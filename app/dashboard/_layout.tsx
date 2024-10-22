import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Drawer} from "expo-router/drawer";
import {View, useWindowDimensions, Text} from "react-native";
import {Header} from "@/components/Header/Header";

export default function Layout() {

    const dimensions = useWindowDimensions();
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer screenOptions={{
                drawerType: dimensions.width >= 768 ? 'permanent' : 'slide',
                header: ({navigation, route, options}) => {

                    return <Header navigation={navigation} route={route} options={options}/>
                },
            }}

            >
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Home',
                        title: 'overview',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
