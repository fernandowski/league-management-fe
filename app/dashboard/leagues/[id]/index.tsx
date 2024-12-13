import {Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import LeagueDropdown from "@/components/League/LeagueDropdown";
import {useLocalSearchParams, useRouter} from "expo-router";
import ViewContent from "@/components/Layout/ViewContent";
import Tabs from "@/components/Layout/Tabs";
import {useEffect, useState} from "react";
import {MembershipView} from "@/components/Membership/MembershipView";

export default function Index() {
    const router = useRouter();

    const {id} = useLocalSearchParams();
    const [leagueId, setLeagueId] = useState<string>(Array.isArray(id) ? id[0] : id || "");


    const onLeagueChange = (newLeagueId: string) => {
        if (newLeagueId !== leagueId) {
            router.setParams({
                id: newLeagueId
            });
            setLeagueId(newLeagueId);
        }
    }

    useEffect(() => {
        const selectedId = Array.isArray(id) ? id[0] : id || "";
        if (selectedId !== leagueId) {
            setLeagueId(selectedId);
        }
    }, [id]);

    return (
        <ViewContent>
            <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
                <LeagueDropdown onChange={onLeagueChange} selected={leagueId}/>
            </View>
            <Tabs tabs={[
                {key: 'membership', title: 'Membership', view: <MembershipView leagueId={leagueId}/>},
                /*{key: 'season', title: 'Seasons', view: <SeasonView leagueId={leagueId}/>},
                {key: 'teams', title: 'Teams', view: <TeamsView/>},*/
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

const TeamsView = () => {
    return <View><Text>Teams View</Text></View>
}


const styles = StyleSheet.create({});
