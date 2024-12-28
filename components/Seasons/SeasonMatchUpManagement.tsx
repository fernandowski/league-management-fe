import {StyleSheet, View} from "react-native";
import {Text} from "react-native-paper";
import {useCallback, useEffect, useState} from "react";
import {MatchesResponse, MatchScore, useData} from "@/hooks/useData";
import MatchUpRound from "@/components/Seasons/MatchUpRound";
import StyledModal from "@/components/StyledModal";
import ManageMatchModal from "@/components/Seasons/ManageMatchModal";

export interface SeasonMatchUpManagementProps {
    seasonId: string
}

export default function SeasonMatchUpManagement(props: SeasonMatchUpManagementProps) {
    const {fetchData, data, error} = useData<MatchesResponse[]>();
    const [openManageMatch, setOpenMangeMatch] = useState(false);
    const [matchDetails, setMatchDetails] = useState<MatchScore>();

    const onMatchPress = useCallback((matchScoreDetails: MatchScore) => {
        setMatchDetails(matchScoreDetails);
        setOpenMangeMatch(true);
    }, [])

    const onModalClose = () => {
        setOpenMangeMatch(false);
    }

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
                            <MatchUpRound data={match} onMatchPress={onMatchPress}/>
                        </View>
                    )
                })
            }
            { matchDetails && <ManageMatchModal isOpen={openManageMatch} matchDetails={matchDetails} onClose={onModalClose}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    matchUpRoundContainer: {
        marginTop: 18
    }
})
