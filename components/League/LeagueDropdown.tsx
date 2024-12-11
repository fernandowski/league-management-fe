import {useLeagueData} from "@/hooks/useLeagueData";
import {useOrganizationStore} from "@/stores/organizationStore";
import {StyleSheet, Text, View} from "react-native";
import {Select} from "@/components/Select/Select";
import {useEffect} from "react";


export interface Props {
    onChange: (value: string) => void
    selected?: string
}

export default function LeagueDropdown(props: Props) {
    const {organization} = useOrganizationStore();
    const {fetchData, data} = useLeagueData()

    useEffect(() => {
        if (organization !== null) {
            fetchData({organization_id: organization, limit: 0, offset: 0, term: ""})
        }
    }, [organization])

    useEffect(() => {
        if (data.length > 0) props.onChange(data[0].id)
    }, [data]);

    const onSelectChange = (value: string) => {
        props.onChange(value)
    }

    return (
        <View style={[styles.select]}>
            <Text>Leagues: </Text>
            <Select
                onChange={onSelectChange}
                data={data.map(league => ({label: league.name, value: league.id}))}
                selected={data.length > 0 ? data[0].id : null}
            />
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
