import {StyleSheet, View} from "react-native";
import {Button, Portal} from "react-native-paper";
import {useState} from "react";
import AddSeasonModal from "@/components/Seasons/AddSeasonModal";
import SeasonsTable from "@/components/Seasons/SeasonsTable";

interface SeasonsViewProps {
    leagueId: string
}

const SeasonsView = (props: SeasonsViewProps) => {
    const [refresh, setRefresh] = useState(false);

    return (
        <View>
            <View style={styles.container}>
                <SeasonsTable leagueId={props.leagueId} refresh={refresh}></SeasonsTable>
            </View>
        </View>
    )
}

export default SeasonsView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
        gap: 16,
    },
    button: {
        alignItems: "flex-end"
    },
})
