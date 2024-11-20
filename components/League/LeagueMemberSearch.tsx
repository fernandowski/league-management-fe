import {useEffect, useState} from "react";
import {Searchbar, Text} from "react-native-paper";
import {View} from "react-native";
import {TeamResponse, useData} from "@/hooks/useData";
import LoadingView from "@expo/metro-runtime/build/LoadingView.native";

export interface LeagueMemberSearchProps {
    organizationId: string
}

export interface Team {
    id: string
    name: string
}
export default function LeagueMemberSearch(props: LeagueMemberSearchProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const {fetchData, fetching, error} = useData<TeamResponse[]>();
    const [teams, setTeams] = useState<Team[]>([]);

    const fetchTeams = async () => {
        const response = await fetchData(`/v1/teams/?organization_id=${props.organizationId}&term=${searchQuery}`);
        if (response) {
            const teams: Team[] = response.map((team: Team) => ({id: team.id, name: team.name}));
            setTeams(teams)
        }
    }
    useEffect(() => {
        if (searchQuery !== '') {
            fetchTeams()
        }
    }, [searchQuery]);

    return (
        <View>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            {
                teams.map((team: Team) => {
                    return (
                        <View key={team.id}>
                            <Text>{team.name}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}
