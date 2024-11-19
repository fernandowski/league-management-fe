import {useEffect, useState} from "react";
import LeagueMembers, {LeagueMember} from "@/components/League/LeagueMembers";
import {LeagueMembershipResponse, useData} from "@/hooks/useData";

export interface MembershipManagementProps {
    leagueId: string | null
}
export default function MembershipManagement(props: MembershipManagementProps) {
    const [leagueMembers, setLeagueMembers] = useState<LeagueMember[]>([]);
    const {fetchData, fetching, error} = useData<LeagueMembershipResponse[]>();

    const fetchMembership = async () => {
        const response = await fetchData(`/v1/leagues/${props.leagueId}/members`);
        if (response) {
            const leagueMembers: LeagueMember[] = response.map((member: LeagueMembershipResponse) => ({
                leagueId: member.league_id,
                teamName: member.team_name,
                teamId: member.team_id,
                id: member.membership_id,
            }));
            setLeagueMembers(leagueMembers);
        }
    }
    useEffect(() => {
        fetchMembership();
    }, []);
    return (
        <LeagueMembers members={leagueMembers}/>
    )
}
