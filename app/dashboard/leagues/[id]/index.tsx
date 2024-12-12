import {Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import LeagueDropdown from "@/components/League/LeagueDropdown";
import {useLocalSearchParams, useRouter} from "expo-router";
import ViewContent from "@/components/Layout/ViewContent";
import Tabs from "@/components/Layout/Tabs";
import {useEffect, useState} from "react";
import MembershipManagement from "@/components/League/MembershipManagement";

export default function Index() {
    const router = useRouter();

    const {id} = useLocalSearchParams();
    let [leagueId, setLeagueId] = useState<string>(id as string);


    const onLeagueChange = (leagueId: string) => {
        router.setParams({
            id: leagueId
        });
        setLeagueId(leagueId);
    }

    useEffect(() => {
        const selectedId = Array.isArray(id) ? id[0] : id || "";
        setLeagueId(selectedId);
    }, [id]);

    return (
        <ViewContent>
            <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
                <LeagueDropdown onChange={onLeagueChange} selected={leagueId}/>
            </View>
            <Tabs tabs={[
                {key: 'membership', title: 'Membership', view: <MembershipView leagueId={leagueId}/>},
                {key: 'season', title: 'Seasons', view: <SeasonView leagueId={leagueId}/>},
                {key: 'teams', title: 'Teams', view: <TeamsView/>},
            ]}>
            </Tabs>
        </ViewContent>
    )
}

const SeasonView = ({leagueId}: { leagueId: string }) => {
    return (
        <View>

        </View>
    )
}

const MembershipView = ({leagueId}: {leagueId: string}) => {
    return (
        <View style={{flex: 1}}>
            <MembershipManagement leagueId={leagueId}/>
        </View>
    )
}

const TeamsView = () => {
    return <View><Text>Teams View</Text></View>
}


const styles = StyleSheet.create({});
