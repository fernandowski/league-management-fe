import {View, StyleSheet} from "react-native";
import {Button, Text} from "react-native-paper";
import TeamList from "@/components/Teams/TeamList";

export default function TeamOverview () {
    return (
        <View style={[styles.outerContainer]}>
            <View style={[styles.viewContainer]}>
                <Button style={[styles.addTeamButton]} mode={"elevated"}> + Add Team </Button>
                <TeamList/>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewContainer: {
        flex: 1,
        width: '80%',
        marginTop: 16,
        gap: 16
    },
    addTeamButton: {
        alignSelf: "flex-end"
    }
})
