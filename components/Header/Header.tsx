import {Dimensions, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {DrawerNavigationOptions, DrawerNavigationProp} from "@react-navigation/drawer";
import {ParamListBase, RouteProp} from "@react-navigation/native";
import {Select} from "@/components/Select/Select";
import {Button} from "react-native-paper";


interface HeaderProps {
    navigation: DrawerNavigationProp<ParamListBase>
    route: RouteProp<ParamListBase>
    options: DrawerNavigationOptions
}

export function Header(_props: HeaderProps) {

    const onSelectChange = (value: string) => {
        // TODO CREATE GENERIC STORE.
    }

    const data = [
        {value: 'hello', label: "Hello  Option 1 "},
        {value: 'hello 2', label: "Hello  Option 2 "},
        {value: 'hello 3', label: "Hello  Option 3"},
    ]

    return (
        <View style={[styles.view]}>
            <View style={[styles.select]}>
                <Text>Organizations: </Text>
                <Select onChange={onSelectChange} data={data}/>
            </View>
        </View>
    )
}

const {height: screenHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
    view: {
        height: screenHeight * .05,
        backgroundColor: "white",
    },
    select: {
        flex: 1,
        flexDirection: "row",
        gap: 16,
        marginTop: 18
    }
});
