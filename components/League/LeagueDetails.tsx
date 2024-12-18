import {View, StyleSheet, useWindowDimensions} from "react-native";
import React, {useEffect, useState} from "react";
import {LeagueDetailResponse, useData} from "@/hooks/useData";
import LeagueDetailsCard from "@/components/League/LeagueDetailsCard";
import AddSeasonModal from "@/components/Seasons/AddSeasonModal";
import {Button, Portal} from "react-native-paper";
import SeasonDetailsCard from "@/components/League/SeasonDetailsCard";
import MembershipView from "@/components/Membership/MembershipView";
import SeasonsView from "@/components/Seasons/SeasonsView";
import Tabs from "@/components/Layout/Tabs";

interface LeagueDetailsProps {
    leagueId: string
    refresh: boolean
}


export default function LeagueDetails(props: LeagueDetailsProps): React.JSX.Element {
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;
    const [openModal, setOpenModal] = useState<boolean>(false);

    const {fetchData, data} = useData<LeagueDetailResponse>();

    const fetch = async () => {
        fetchData(`/v1/leagues/${props.leagueId}`);
    }

    const onMemberRefresh = () => {
        fetch();
    }

    useEffect(() => {
        fetch();
    }, [props.leagueId, props.refresh]);

    const handleSave = () => {
        fetch();
        setOpenModal(false);
    };

    const openSeasonModal = () => {
        setOpenModal(!openModal);
    }

    if (!data) {
        return <></>
    }

    return (
        <View>
            <View style={ isLargeScreen ? styles.container : styles.smallScreen}>
                <View style={isLargeScreen ? {flex: 0.5} : styles.fullWidthCard}>
                    <LeagueDetailsCard data={data}/>

                </View>
                {!data.season ?
                    (
                        <View style={styles.addSeasonContainer}>
                            <Button mode={'elevated'} onPress={openSeasonModal}>+ Add Season</Button>
                        </View>
                    )
                    :
                    (
                        <View style={isLargeScreen ? {flex: 0.5} : styles.fullWidthCard}>
                            <SeasonDetailsCard data={data}/>
                        </View>
                    )
                }
            </View>
            <View>
                <Tabs tabs={[
                    {key: 'membership', title: 'Membership', view: <MembershipView leagueId={props.leagueId} onMemberRefresh={onMemberRefresh}/>},
                    {key: 'season', title: 'Season', view: <SeasonsView seasonId={data.season?.id}/>},
                ]}>
                </Tabs>
            </View>
            <Portal>
                <AddSeasonModal onSave={handleSave} onClose={openSeasonModal} open={openModal} leagueId={props.leagueId}/>
            </Portal>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 18
    },
    addSeasonContainer: {
    },
    button: {
        alignItems: "flex-end"
    },
    smallScreen: {
        flexDirection: "column",
        alignItems: "center",
        gap: 12
    },
    fullWidthCard: {
        width: "99%",
    },
});
