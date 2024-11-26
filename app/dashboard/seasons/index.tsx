import {View, StyleSheet} from "react-native";
import SeasonSearchBar from "@/components/Seasons/SeasonSearchBar";
import {Button} from "react-native-paper";
import AddSeasonModal from "@/components/Seasons/AddSeasonModal";
import {useState} from "react";

export default function Index() {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [leagueId, setLeagueId] = useState<null | string>(null)
    const onLeagueSelection = (value: string) =>  {
      setLeagueId(value);
    };

    const openSeasonModal = () => {
        setOpenModal(!openModal);
    }


    return (
        <View style={[styles.outerContainer]}>
            <View style={[styles.viewContainer]}>
                <View style={[styles.searchContainer]}>
                    <SeasonSearchBar onLeagueSelection={onLeagueSelection}/>
                    <Button mode={'elevated'} onPress={openSeasonModal}>+ Add Season</Button>
                </View>
                <View style={[styles.tableContainer]}>

                </View>
            </View>
            <AddSeasonModal onSave={() => setOpenModal(!openModal)} open={openModal} leagueId={leagueId || ""}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        marginTop: 16,
        marginLeft: 16,
        gap: 16,
        justifyContent: "center"
    },
    searchContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    tableContainer: {},
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
})
