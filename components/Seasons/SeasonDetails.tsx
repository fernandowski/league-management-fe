import {Card, Divider, Surface, Text} from "react-native-paper";
import {View, StyleSheet} from "react-native";
import React, {useEffect} from "react";
import {SeasonDetailResponse, useData} from "@/hooks/useData";
import SeasonInformation from "@/components/Seasons/SeasonInformation";


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

    if (!seasonDetails) {
        return (
            <View>
                <Card>
                    <Card.Title title="Loading..." />
                </Card>
            </View>
        );
    }

    return (
        <View>
            <Surface style={{ padding: 18}}>
                <SeasonInformation season={seasonDetails}/>
                <Divider/>
            </Surface>
        </View>
    )
}

const styles = StyleSheet.create({

});


