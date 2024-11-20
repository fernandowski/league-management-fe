import {Button, Card, Divider, IconButton, Text} from "react-native-paper";
import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";
import {View, StyleSheet} from "react-native";

export interface LeagueMember {
    teamName: string
    id: string
    teamId: string
    leagueId: string
}

export interface LeagueMembersProps {
    members: LeagueMember[]
    onRemove: (id: string) => void
}

export default function LeagueMembers(props: LeagueMembersProps) {
    return (
        <View>
            <Card>
                <Card.Title title={"League Members"}/>
                <Card.Content>
                        {
                            props.members.map((member: LeagueMember) => {
                                return (
                                    <View style={styles.row}>
                                        <Text key={member.id}>{member.teamName}</Text>
                                        <Button mode={'contained'} style={[styles.button]} onPress={() => props.onRemove(member.id)}>Remove</Button>
                                    </View>
                                )
                            })
                        }
                </Card.Content>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 'auto',
        borderRadius: 0,
        alignSelf: "flex-end"
    },
    row: {
        marginTop: 6,
        flex: 1,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems: "center"
    }
});
