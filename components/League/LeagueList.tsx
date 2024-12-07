import {Animated, View} from "react-native";
import ScrollView = Animated.ScrollView;
import {Button, Card, Text} from "react-native-paper";
import {League, useLeagueData} from "@/hooks/useLeagueData";
import React, {useEffect, useState} from "react";
import {useOrganizationStore} from "@/stores/organizationStore";

interface LeagueListProps {
    onPressInviteTeam: (id: string) => void
    refresh?: boolean
}

export function LeagueList(props: LeagueListProps): React.JSX.Element {
    const {fetchData, fetching, error, data} = useLeagueData();
    const {organization} = useOrganizationStore()

    useEffect(() => {
        fetchData({organization_id: organization, limit: 0, offset: 0, term: ""});
    }, [organization, props.refresh]);

    return (
        <View style={{flex: 1}}>
                <ScrollView>
                    {
                        data.map((league) => (
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
