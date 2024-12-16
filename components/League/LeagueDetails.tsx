import {View, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import {LeagueDetailResponse, useData} from "@/hooks/useData";
import LeagueDetailsCard from "@/components/League/LeagueDetailsCard";
import AddSeasonModal from "@/components/Seasons/AddSeasonModal";
import {Button, Portal} from "react-native-paper";

interface LeagueDetailsProps {
    leagueId: string
    refresh: boolean
}
export default function LeagueDetails(props: LeagueDetailsProps): React.JSX.Element {
    const [openModal, setOpenModal] = useState<boolean>(false);

    const {fetchData, data} = useData<LeagueDetailResponse>();

    useEffect(() => {
        const fetch = async () => {
            fetchData(`/v1/leagues/${props.leagueId}`);
        }
        fetch();
    }, [props.leagueId, props.refresh]);

    const handleSave = () => {
        setOpenModal(false);
    };

    const openSeasonModal = () => {
        setOpenModal(!openModal);
    }

    if (!data) {
        return <></>
    }

    return (
        <View style={[styles.container]}>
            <LeagueDetailsCard data={data}/>
            {!data.season && <View style={styles.button}><Button mode={'elevated'} onPress={openSeasonModal}>+ Add Season</Button></View>}
            <Portal>
                <AddSeasonModal onSave={handleSave} onClose={openSeasonModal} open={openModal} leagueId={props.leagueId}/>
            </Portal>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    button: {
        alignItems: "flex-end"
    },
});
