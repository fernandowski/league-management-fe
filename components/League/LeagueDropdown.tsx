import {useLeagueData} from "@/hooks/useLeagueData";
import {useOrganizationStore} from "@/stores/organizationStore";
import {StyleSheet, Text, View} from "react-native";
import {Select} from "@/components/Select/Select";
import {useEffect} from "react";


export interface Props {
    onChange: (value: string) => void
}
export default function LeagueDropdown(props: Props) {
    const {organization} = useOrganizationStore();
    const {fetchData, data} = useLeagueData()

    useEffect(() => {
        fetchData({organization_id: organization})
    }, [organization])

    const onSelectChange = (value: string) => {
        // props.onChange(value)
    }

    return (
        <View style={[styles.select]}>
            <Text>Leagues: </Text>
            <Select onChange={onSelectChange} data={data.map(league => ({label: league.name, value: league.id}))}/>
        </View>
    )
}


const styles = StyleSheet.create({
    select: {
        flex: 1,
        flexDirection: "row",
        marginTop: 18
    }
});
