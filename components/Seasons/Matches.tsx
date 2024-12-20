import {SeasonDetailResponse} from "@/hooks/useData";
import {View,StyleSheet} from "react-native";
import MatchesPagination from "@/components/Seasons/MatchesPagination";
import MatchUpList from "@/components/Seasons/MatchUpList";
import {useState} from "react";
import {Surface, Text} from "react-native-paper";

export interface MatchesProps {
    season: SeasonDetailResponse
}
export default function Matches (props: MatchesProps) {
    const [roundNumber, setRoundNumber] = useState(0);

    const handleHandleNextRound = () => {
        if (props.season.rounds[roundNumber + 1]) {
            setRoundNumber(roundNumber + 1)
        }

    }

    const handlePreviousRound = () => {
        if (props.season.rounds[roundNumber -1]) {
            setRoundNumber(roundNumber - 1);
        }
    }

    return (
        <Surface>
            <View style={styles.paginationContainer}>
                <Text style={styles.seasonSchedule}>Season Schedule</Text>
                <MatchesPagination onNext={handleHandleNextRound} onPrevious={handlePreviousRound} currentRound={props.season.rounds[roundNumber].round_number}/>
            </View>
            <View>
                <MatchUpList round={props.season.rounds.sort((a,b) => (Number(b.round_number)-Number(a.round_number)))[roundNumber]}/>
            </View>
        </Surface>
    )
}

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 18
    },
    seasonSchedule: {
        fontWeight: "bold"
    }
})
