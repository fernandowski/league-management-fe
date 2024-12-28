import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {useEffect} from "react";
import {MatchesResponse, useData} from "@/hooks/useData";
import MatchUpRound from "@/components/Seasons/MatchUpRound";

export interface SeasonMatchUpManagementProps {
    seasonId: string
}

export default function SeasonMatchUpManagement(props: SeasonMatchUpManagementProps) {
    const {fetchData, data, error} = useData<MatchesResponse[]>();

    useEffect(() => {
        if (props.seasonId) {
            fetchData(`/v1/seasons/${props.seasonId}/matches`)
        }

    }, [props.seasonId]);

    if (!data) {
        return <View><Text>{error}</Text></View>
    }

    return (
        <View>
            {
                data.sort((a, b) => (a.round - b.round)).map((match: MatchesResponse) => {
                    return (
                        <View style={[styles.matchUpRoundContainer]} key={match.round}>
                            <MatchUpRound data={match}/>
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    matchUpRoundContainer: {
        marginTop: 18
    }
})
