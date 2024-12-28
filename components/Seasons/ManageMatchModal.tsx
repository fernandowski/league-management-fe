import StyledModal from "@/components/StyledModal";
import {Button, Text, TextInput} from "react-native-paper";
import {View, StyleSheet} from "react-native";
import {useState} from "react";
import {MatchScore} from "@/hooks/useData";

interface ManageMatchModalProps {
    isOpen: boolean;
    onClose: () => void;
    matchDetails: MatchScore;
}

export default function ManageMatchModal(props: ManageMatchModalProps) {
    const [homeScore, setHomeScore] = useState(String(props.matchDetails.home_score));
    const [awayScore, setAwayScore] = useState(String(props.matchDetails.away_score));

    const handleScoreChange = (
        value: string,
        setter: React.Dispatch<React.SetStateAction<string>>
    ) => {
        if (/^\d*$/.test(value)) {
            setter(value);
        }
    };

    if (!props.matchDetails) {
        return (
            <View>
                <Text>No Match Details</Text>
            </View>
        );
    }

    return (
        <StyledModal isOpen={props.isOpen}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {props.matchDetails.home_team} vs. {props.matchDetails.away_team}
                    </Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.scoreContainer}>
                        <View style={styles.team}>
                            <Text style={styles.teamName}>{props.matchDetails.home_team}</Text>
                            <TextInput
                                style={styles.scoreInput}
                                value={homeScore}
                                keyboardType="numeric"
                                onChangeText={(value) => handleScoreChange(value, setHomeScore)}
                            />
                        </View>
                        <Text style={styles.separator}> - </Text>
                        <View style={styles.team}>
                            <Text style={styles.teamName}>{props.matchDetails.away_team}</Text>
                            <TextInput
                                style={styles.scoreInput}
                                value={awayScore}
                                keyboardType="numeric"
                                onChangeText={(value) => handleScoreChange(value, setAwayScore)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Button onPress={props.onClose}>Cancel</Button>
                    <Button
                        onPress={() => {
                            const parsedHomeScore = Number(homeScore);
                            const parsedAwayScore = Number(awayScore);

                            console.log("Updated Scores:", {
                                home: parsedHomeScore,
                                away: parsedAwayScore,
                            });

                            props.onClose();
                        }}
                    >
                        Save
                    </Button>
                </View>
            </View>
        </StyledModal>
    );
}

const styles = StyleSheet.create({
    modal: {
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: "white",
        borderRadius: 8,
    },
    header: {
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    body: {
        marginBottom: 16,
    },
    scoreContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    team: {
        alignItems: "center",
    },
    teamName: {
        marginBottom: 8,
        fontWeight: "bold",
    },
    scoreInput: {
        width: 60,
        height: 40,
        borderWidth: 1,
        borderColor: "#ddd",
        textAlign: "center",
        borderRadius: 4,
    },
    separator: {
        fontSize: 24,
        fontWeight: "bold",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
