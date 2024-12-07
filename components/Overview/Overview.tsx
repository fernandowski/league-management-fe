import {useOrganizationStore} from "@/stores/organizationStore";
import AddOrganization from "@/components/Overview/AddOrganization";
import {OrganizationTable} from "@/components/Overview/OrganizationTable";
import {View} from "react-native";
import {Text} from "react-native-paper";
import LeagueOverview from "@/components/League/LeagueOverview";

export default function Overview() {

    const {organizations, loading} = useOrganizationStore();

    if (loading) {
        return <>loading</>
    }

    return (
        <LeagueOverview/>
    )
}
