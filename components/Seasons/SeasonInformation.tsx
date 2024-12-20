import {SeasonDetailResponse} from "@/hooks/useData";
import {StyleSheet, View} from "react-native";
import {Surface,Text} from "react-native-paper";

export interface SeasonInformationProps {
    season: SeasonDetailResponse
}
export default function SeasonInformation(props: SeasonInformationProps) {
    return (
            <View style={styles.surfaceCard}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name: </Text>
                        <Text style={styles.value}>{props.season.name} </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Status: </Text>
                        <Text style={styles.value}>{props.season.status} </Text>
                    </View>
                    {
                        props.season.rounds.length > 0 ?? (
                            <View style={styles.row}>
                                <Text style={styles.label}>Status: </Text>
                                <Text style={styles.value}>{props.season.status} </Text>
                            </View>
                        )
                    }
            </View>
    )
}


const styles = StyleSheet.create({
    surfaceCard: {
        padding: 18
    },
    row: {
        marginBottom: 8,
        flexGrow: 0,
        flexDirection: "row",
        alignItems: "center"
    },
    label: {
        fontWeight: "bold",
        paddingRight: 18,
        width: 80
    },
    value: {
        flex: 1
    }
})
