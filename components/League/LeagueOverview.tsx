import {useOrganizationStore} from "@/stores/organizationStore";
import {useCallback, useState} from "react";
import {LeagueList} from "@/components/League/LeagueList";
import {StyleSheet, View} from "react-native";
import {Button} from "react-native-paper";
import {useFocusEffect} from "expo-router";
import AddLeagueModal from "@/components/League/AddLeagueModal";
import LeagueMembershipModal from "@/components/League/LeagueMembershipModal";

export default function LeagueOverview() {
    const {organization} = useOrganizationStore();
    const [selectedLeague, setSelectedLeague] = useState<null | string>(null);
    const [openAddLeagueModal, setOpenAddLeagueModal] = useState<boolean>(false);
    const [showLeagueMembershipModal, setShowLeagueMembershipModal] = useState(false);
    const [refreshList, setRefreshList] = useState<boolean>(false);

    const handleLeagueMembershipOpenModal = (leagueId: string) => {
        setShowLeagueMembershipModal(!showLeagueMembershipModal);
        setSelectedLeague(leagueId);
    }

    const handleOpenAddLeagueModal = (): void => {
        setOpenAddLeagueModal(!openAddLeagueModal);
    }

    const handleSaveLeague = (): void => {
        setOpenAddLeagueModal(!openAddLeagueModal);
        setRefreshList(!refreshList);
    }


    useFocusEffect(
        useCallback(() => {
            return () => {
                setOpenAddLeagueModal(false);
                setShowLeagueMembershipModal(false);
            };
        }, [organization])
    );

    return (
        <View style={[styles.outerContainer]}>
            <View style={[styles.viewContainer]}>
                <Button style={[{alignSelf: 'flex-end'}]} mode={'elevated'} onPress={handleOpenAddLeagueModal}>+ Add League </Button>
                <LeagueList refresh={refreshList} onPressInviteTeam={handleLeagueMembershipOpenModal}></LeagueList>
            </View>
            <AddLeagueModal open={openAddLeagueModal} onSave={handleSaveLeague}/>
            <LeagueMembershipModal organizationId={organization ? organization : ""} leagueId={selectedLeague} open={showLeagueMembershipModal} onDismiss={() =>  (setShowLeagueMembershipModal(false))}/>
        </View>

    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        width: '80%',
        marginTop: 16,
        gap: 16
    },
    modal: {
        flex: 0.8,
        padding: 16,
        backgroundColor: "white",
        width: "80%",
        maxHeight: 400,
        maxWidth: 400,
        zIndex: 200,
        alignSelf: "center"
    },
    formContainer: {
        flex: 0.7,
        padding: 16
    },
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
