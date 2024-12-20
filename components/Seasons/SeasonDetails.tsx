import {Card} from "react-native-paper";
import {View} from "react-native";
import React, {useEffect} from "react";
import {SeasonDetailResponse, useData} from "@/hooks/useData";


export interface SeasonDetailsProps {
    seasonId: string
    leagueId: string
}
export default function SeasonDetail(props: SeasonDetailsProps) {
    const {fetchData, data: seasonDetails, fetching, error} = useData<SeasonDetailResponse>();

    const fetchRoundDetails = async () => {
            await fetchData(`/v1/leagues/${props.leagueId}/seasons/${props.seasonId}`);
    }

    useEffect(() => {
        fetchRoundDetails()
    }, [props.seasonId, props.leagueId]);
    return (
        <View>
            <Card>
                <Card.Title title={seasonDetails?.name ? seasonDetails.name : "Season Details"}/>
            </Card>
        </View>
    )
}
