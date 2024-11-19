import {Animated, View} from "react-native";
import ScrollView = Animated.ScrollView;
import {Button, Card, Text} from "react-native-paper";
import {League} from "@/hooks/useLeagueData";

interface LeagueListProps {
    data: League[],
    onPressInviteTeam: (id: string) => void
}

export function LeagueList(props: LeagueListProps) {
    const leagueData = props.data


    return (
        <View style={{flex: 1}}>
                <ScrollView>
                    {
                        leagueData.map((league) => (
                            <Card style={{marginBottom: 8, marginLeft: 1, marginRight: 1}} key={league.id}>
                                <Card.Content>
                                    <Text>{league.name}</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Button mode={'elevated'} onPress={() => (props.onPressInviteTeam(league.id))}> Invite Team </Button>
                                </Card.Actions>
                            </Card>
                        ))
                    }
                </ScrollView>
        </View>
    )
}