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
        <View>
            <View>
                <ScrollView>
                    {
                        leagueData.map((league: leagues) => (
                            <Card style={{marginBottom: 8, marginLeft: 1, marginRight: 1}} key={league.id}>
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
