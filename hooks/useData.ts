import {apiRequest} from "@/api/api";
import {useState} from "react";


export interface LeagueMembershipResponse {
    league_id: string,
    membership_id: string,
    team_id: string,
    team_name: string,
}

export function useData<TResponse>() {
    const [fetching, setFetching] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const fetchData = async (endpoint: string): Promise<TResponse | undefined> => {
        setError(null);
        setFetching(true);
        try {
            const response: TResponse = await apiRequest(endpoint, {method: "GET"});
            setFetching(false)
            return response;
        } catch (e: any) {
            setError(e.message || "Error Fetching data.");
            setFetching(false);
        }
    }

    return { fetchData, fetching, error };
}