import {Card, Text} from "react-native-paper";
import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";

export interface LeagueMember  {
    teamName: string
    id: string
    teamId: string
    leagueId: string
}

export interface LeagueMembersProps {
    members: LeagueMember[]
}

export default function LeagueMembers(props: LeagueMembersProps) {
    return (
        <Card>
            <Card.Title title={"League Members"}/>
            <Card.Content>
                {props.members.map(member => (<Text key={member.id}>{member.teamName}</Text>))}
            </Card.Content>
        </Card>
    )
}
