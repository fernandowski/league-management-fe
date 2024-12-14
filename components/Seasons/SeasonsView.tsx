import {StyleSheet, View} from "react-native";
import {Button, Portal} from "react-native-paper";
import {useState} from "react";
import AddSeasonModal from "@/components/Seasons/AddSeasonModal";
import SeasonsTable from "@/components/Seasons/SeasonsTable";

interface SeasonsViewProps {
    leagueId: string
}

const SeasonsView = (props: SeasonsViewProps) => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [refresh, setRefresh] = useState(false);

    const openSeasonModal = () => {
        setOpenModal(!openModal);
    }

    const handleSave = () => {
        setOpenModal(false);
        setRefresh(!refresh);
    };

    return (
        <View>
            <View style={styles.container}>

                <View style={styles.button}><Button mode={'elevated'} onPress={openSeasonModal}>+ Add Season</Button> </View>
                <View>
                    <SeasonsTable leagueId={props.leagueId} refresh={refresh}></SeasonsTable>
                </View>
            </View>
            <Portal>
                <AddSeasonModal onSave={handleSave} open={openModal} leagueId={props.leagueId}/>
            </Portal>
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
