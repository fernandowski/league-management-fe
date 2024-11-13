import {View, StyleSheet} from "react-native";
import {Button, Text} from "react-native-paper";
import TeamList from "@/components/Teams/TeamList";
import {useOrganizationStore} from "@/stores/organizationStore";
import {useCallback, useState} from "react";
import {apiRequest} from "@/api/api";
import {useFocusEffect} from "expo-router";

export interface Team {
    id: string
    name: string
    organizationId: string
}

export default function TeamOverview() {
    const {organization} = useOrganizationStore();
    const [teams, setTeams] = useState<Team[]>([]);

    const fetchTeams = useCallback(async () => {
        try {
            const response = await apiRequest(`/v1/teams/?organization_id=${organization}`, {method: 'GET'});
            setTeams(response.map((team: Record<string, string>) => ({
                id: team.id,
                name: team.name,
                organizationName: team.organization_name
            })));
        } catch (e) {
            setTeams([]);
        }
    }, [organization])

    useFocusEffect(
        useCallback(() => {
            fetchTeams();
            return () => {
                // todo clean up everything.
            }
        }, [fetchTeams])
    )

    return (
        <View style={[styles.outerContainer]}>
            <View style={[styles.viewContainer]}>
                <Button style={[styles.addTeamButton]} mode={"elevated"}> + Add Team </Button>
                <TeamList data={teams}/>
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
    viewContainer: {
        flex: 1,
        width: '80%',
        marginTop: 16,
        gap: 16
    },
    addTeamButton: {
        alignSelf: "flex-end"
    }
})
