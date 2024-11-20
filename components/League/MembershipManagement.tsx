import {useEffect, useState} from "react";
import LeagueMembers, {LeagueMember} from "@/components/League/LeagueMembers";
import {LeagueMembershipResponse, useData} from "@/hooks/useData";
import {View} from "react-native";
import LeagueMemberSearch from "@/components/League/LeagueMemberSearch";
import {useOrganizationStore} from "@/stores/organizationStore";

export interface MembershipManagementProps {
    leagueId: string | null
}
export default function MembershipManagement(props: MembershipManagementProps) {
    const [leagueMembers, setLeagueMembers] = useState<LeagueMember[]>([]);
    const {fetchData, fetching, error} = useData<LeagueMembershipResponse[]>();
    const {organization}= useOrganizationStore();

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

    const handleOnRemove = (teamId: string): void => {
        console.log(teamId);
    }
    useEffect(() => {
        fetchMembership();
    }, []);
    return (
        <View style={{flex: 1}}>
            <LeagueMembers members={leagueMembers} onRemove={handleOnRemove}/>
            <View style={{marginTop: 8}}>
                <LeagueMemberSearch organizationId={organization ? organization : ''}/>
            </View>
        </View>

    )
}
