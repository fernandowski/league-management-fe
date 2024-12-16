import {View, StyleSheet} from "react-native";
import React, {useEffect} from "react";
import {Card, Text} from "react-native-paper";
import {LeagueDetailResponse, useData} from "@/hooks/useData";

interface LeagueDetailsProps {
    leagueId: string
    refresh: boolean
}
export default function LeagueDetails(props: LeagueDetailsProps): React.JSX.Element {
    const {fetchData, data} = useData<LeagueDetailResponse>();

    useEffect(() => {
        const fetch = async () => {
            fetchData(`/v1/leagues/${props.leagueId}`);
        }
        fetch();
    }, [props.leagueId, props.refresh]);

    if (!data) {
        return <></>
    }

    return (
        <View>
            <Card>
                <Card.Title title={"League Info"}></Card.Title>
                <Card.Content>
                    <View>
                        <View style={styles.row}>
                            <Text style={styles.label}>League ID: </Text>
                            <Text style={styles.value}>{data.id}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Name: </Text>
                            <Text style={styles.value}>{data.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Active Members: </Text>
                            <Text style={styles.value}>{data.active_members}</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f8f4ff",
        borderRadius: 8,
        margin: 16,
        elevation: 3, // Adds shadow for Android
        shadowColor: "#000", // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    row: {
        marginBottom: 8,
        alignItems: "flex-start",
    },
    label: {
        fontWeight: "bold"
    },
    value: {

    }
});
