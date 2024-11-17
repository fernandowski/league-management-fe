import {useState} from "react";
import {apiRequest} from "@/api/api";
export interface LeagueSearchParams  {
    organization_id: string | null
}

export interface League {
    id: string
    name: string
    teamIds: string[]
}

export interface LeagueResponse {
    id: string
    name: string
    team_ids: string[]
}

export function useLeagueData(): {fetchData: (params: LeagueSearchParams) => Promise<void>, fetching: boolean, error: null | string, data: League[]}  {
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<League[]>([])

    const fetchData = async (params: LeagueSearchParams): Promise<void> => {
        setFetching(true);
        try {
            const response: LeagueResponse[] = await apiRequest(
                `/v1/leagues?organization_id=${params.organization_id}`,
                {method: "GET"}
            );
            setFetching(false);
            const leagues : League[] =  response.map((league: LeagueResponse) => ({
                id: league.id,
                name: league.name,
                teamIds: league.team_ids
            }))

            setData(leagues)
        } catch (e) {
            setError("Error Fetching leagues");
            setFetching(false);
        }
    };

    return { fetchData, fetching, error, data};
}
