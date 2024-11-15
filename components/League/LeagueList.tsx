import {leagues} from "@/components/League/LeagueOverview";
import {Animated, StyleSheet, View} from "react-native";
import ScrollView = Animated.ScrollView;
import {Button, Card, Text} from "react-native-paper";
import id from "ajv/lib/vocabularies/core/id";

interface LeagueListProps {
    data: leagues[]
}

export function LeagueList(props: LeagueListProps) {
    const leagueData: leagues[] = props.data

    const onPressInviteTeam = (e: any) => (console.log(e));

    return (
        <View style={{flex: 1}}>
                <ScrollView>
                    {
                        leagueData.map((league: leagues) => (
                            <Card style={{marginBottom: 8, marginLeft: 1, marginRight: 1}} key={league.id}>
                                <Card.Content>
                                    <Text>{league.name}</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Button mode={'elevated'} onPress={() => (onPressInviteTeam(league.id))}> Invite Team </Button>
                                </Card.Actions>
                            </Card>
                        ))
                    }
                </ScrollView>
        </View>
    )
}
