import {View, StyleSheet, useWindowDimensions} from "react-native";
import React, {useEffect, useState} from "react";
import {LeagueDetailResponse, useData} from "@/hooks/useData";
import LeagueDetailsCard from "@/components/League/LeagueDetailsCard";
import AddSeasonModal from "@/components/Seasons/AddSeasonModal";
import {Button, Portal} from "react-native-paper";
import SeasonDetailsCard from "@/components/League/SeasonDetailsCard";

interface LeagueDetailsProps {
    leagueId: string
    refresh: boolean
}


export default function LeagueDetails(props: LeagueDetailsProps): React.JSX.Element {
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;
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
        <View style={isLargeScreen ? styles.container : styles.smallScreen}>
            <LeagueDetailsCard data={data}/>
            {!data.season ?
                (
                    <View style={styles.addSeasonContainer}>
                        <Button mode={'elevated'} onPress={openSeasonModal}>+ Add Season</Button>
                    </View>)
                :
                (
                    <SeasonDetailsCard data={data}/>
                )
            }
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    addSeasonContainer: {
        flex: 1
    },
    button: {
        alignItems: "flex-end"
    },
    smallScreen: {
        flexDirection: "column",
        gap: 18
    }
});
