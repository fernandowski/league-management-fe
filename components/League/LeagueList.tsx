import {Animated, View} from "react-native";
import ScrollView = Animated.ScrollView;
import {Button, Card, Text} from "react-native-paper";
import {League, useLeagueData} from "@/hooks/useLeagueData";
import React, {useEffect, useState} from "react";
import {useOrganizationStore} from "@/stores/organizationStore";
import Pagination from "@/components/Pagination/Pagination";

interface LeagueListProps {
    onPressInviteTeam: (id: string) => void
    refresh?: boolean
}

export function LeagueList(props: LeagueListProps): React.JSX.Element {
    const {fetchData, fetching, error, data} = useLeagueData();
    const {organization} = useOrganizationStore()

    const [page, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if (organization !== null) {
            setPage(0)
            fetchData({organization_id: organization, limit: itemsPerPage, offset: 0, term: ""});
        }

    }, [organization, props.refresh]);


    useEffect(() => {
        if (organization !== null) {
            fetchData({
                organization_id: organization,
                limit: itemsPerPage,
                offset: itemsPerPage * page,
                term: "",
            });
        }
    }, [page, itemsPerPage]);

    return (
        <View style={{flex: 1}}>
            <Pagination currentPage={page} totalItems={100} itemsPerPage={itemsPerPage} onPageChange={setPage}/>
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
