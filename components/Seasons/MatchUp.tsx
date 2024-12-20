import {Match} from "@/hooks/useData";
import {View, StyleSheet} from "react-native";
import {Text} from "react-native-paper";


export interface MatchUpProps {
    match: Match
}

export default function MatchUp(props: MatchUpProps) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>{props.match.home_team}</Text>
            </View>
            <View>
                <Text>VS</Text>
            </View>
            <View>
                <Text style={styles.label}>{props.match.away_team}</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginVertical: 18
    },
    label: {
        fontWeight: "bold",
        width: 80,
    }
})
