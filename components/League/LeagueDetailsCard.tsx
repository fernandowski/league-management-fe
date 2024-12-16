import {Card, Text} from "react-native-paper";
import {View, StyleSheet} from "react-native";
import React from "react";
import {LeagueDetailResponse} from "@/hooks/useData";


interface LeagueDetailsCardProps {
    data: LeagueDetailResponse
}
const LeagueDetailsCard = (props: LeagueDetailsCardProps) => {
    return (
        <Card>
            <Card.Title title={"League Info"}></Card.Title>
            <Card.Content>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.label}>League ID: </Text>
                        <Text style={styles.value}>{props.data.id}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name: </Text>
                        <Text style={styles.value}>{props.data.name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Active Members: </Text>
                        <Text style={styles.value}>{props.data.active_members}</Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
    )
}
export default LeagueDetailsCard;


const styles = StyleSheet.create({
    row: {
        marginBottom: 8,
        alignItems: "flex-start",
    },
    label: {
        fontWeight: "bold"
    },
    value: {

    }
})
