import {Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import LeagueDropdown from "@/components/League/LeagueDropdown";
import {useLocalSearchParams} from "expo-router";
import ViewContent from "@/components/Layout/ViewContent";
import Tabs from "@/components/Layout/Tabs";

export default function Index() {
    const {id} = useLocalSearchParams();
    let leagueId = Array.isArray(id) ? id[0] : id || "";

    return (
        <ViewContent>
            <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
                <LeagueDropdown onChange={() => {
                }} selected={leagueId}/>
            </View>
            <Tabs tabs={[
                {key: 'season', title: 'Seasons', view: <SeasonView/>},
                {key: 'membership', title: 'Seasons', view: <MembershipView/>},
                {key: 'teams', title: 'Teams', view: <TeamsView/>},
            ]}></Tabs>
        </ViewContent>
    )
}

const SeasonView = () => {
    return <Text>Season View</Text>
}

const MembershipView = () => {
    return <Text>Membership View</Text>
}

const TeamsView = () => {
    return <Text>Teams View</Text>
}


const styles = StyleSheet.create({
});
