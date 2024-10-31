import {leagues} from "@/components/League/LeagueOverview";
import {Animated, StyleSheet, View} from "react-native";
import ScrollView = Animated.ScrollView;
import {Card, Text} from "react-native-paper";

interface LeagueListProps {
    data: leagues[]
}

export function LeagueList(props: LeagueListProps) {
    const leagueData: leagues[] = props.data
    return (
        <View style={[styles.outerContainer]}>
            <View style={[styles.container]}>
                <ScrollView>
                    {
                        leagueData.map((league: leagues) => (
                            <Card style={{marginTop: 8}} key={league.id}>
                                <Card.Content>
                                    <Text>{league.name}</Text>
                                </Card.Content>
                            </Card>
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        minWidth: '80%',
        flexDirection: 'row',
        marginTop: 16
    },
    addLeagueButton: {
        alignSelf: 'flex-end'
    }
});
