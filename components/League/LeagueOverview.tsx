import {useOrganizationStore} from "@/stores/organizationStore";
import {useEffect, useState} from "react";
import {apiRequest} from "@/api/api";
import {LeagueList} from "@/components/League/LeagueList";


export interface leagues {
    id: string
    name: string
    teamIds: string[]
}

export interface leagueResponse {
    id: string
    name: string
    team_ids: string[]
}

export default function LeagueOverview() {
    const {organization} = useOrganizationStore();
    const [leagues, setLeagues] = useState<leagues[]>([]);

    useEffect(() => {
        const fetchLeagues = async () => {
            // todo: check the response
            const response = await apiRequest(`/v1/leagues/?organization_id=${organization}`, {method: 'GET'});

            setLeagues(response.map((league: leagueResponse) => ({
                id: league.id,
                name: league.name,
                teamIds: league.team_ids
            })));
        }

        fetchLeagues();
    }, [organization]);
    return (
        <>
            {leagues.length <= 0 ? <></> : <LeagueList data={leagues}></LeagueList>}
        </>
    )
}
