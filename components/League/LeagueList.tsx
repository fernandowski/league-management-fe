import {leagues} from "@/components/League/LeagueOverview";
import {Animated} from "react-native";
import ScrollView = Animated.ScrollView;
import {Card, Text} from "react-native-paper";

interface LeagueListProps {
    data: leagues[]
}

export function LeagueList(props: LeagueListProps) {
    const leagueData: leagues[] = props.data
    return (
        <ScrollView style={{paddingLeft: 8, paddingRight: 8}}>
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
    )
}
