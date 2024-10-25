import {Dimensions, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {DrawerNavigationOptions, DrawerNavigationProp} from "@react-navigation/drawer";
import {ParamListBase, RouteProp} from "@react-navigation/native";
import {Select} from "@/components/Select/Select";
import {useOrganizationStore} from "@/stores/organizationStore";
import {useEffect} from "react";


interface HeaderProps {
    navigation: DrawerNavigationProp<ParamListBase>
    route: RouteProp<ParamListBase>
    options: DrawerNavigationOptions
}

export function Header(_props: HeaderProps) {
    const {organizations, loading, error, fetchOrganizations} = useOrganizationStore();
    const onSelectChange = (value: string) => {
    }

    useEffect(() => {
        fetchOrganizations();
    }, [])

    return (
        <View style={[styles.view]}>
            <View style={[styles.select]}>
                <Text>Organizations: </Text>
                <Select onChange={onSelectChange} data={organizations.map(organizations => ({label: organizations.name, value: organizations.id}))}/>
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
