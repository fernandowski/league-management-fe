import {Text} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import LeagueDropdown from "@/components/League/LeagueDropdown";
import {useLocalSearchParams, useRouter} from "expo-router";
import ViewContent from "@/components/Layout/ViewContent";
import Tabs from "@/components/Layout/Tabs";
import {useEffect, useState} from "react";
import MembershipView from "@/components/Membership/MembershipView";
import LeagueDetails from "@/components/League/LeagueDetails";
import SeasonsView from "@/components/Seasons/SeasonsView";

export default function Index() {
    const router = useRouter();

    const {id} = useLocalSearchParams();
    const [leagueId, setLeagueId] = useState<string>(Array.isArray(id) ? id[0] : id || "");
    const [refreshLeagueDetails, setRefreshLeagueDetails] = useState(false);


    const onLeagueChange = (newLeagueId: string) => {
        if (newLeagueId !== leagueId) {
            router.setParams({
                id: newLeagueId
            });
            setLeagueId(newLeagueId);
        }
    }

    const onMemberRefresh = () => {
        setRefreshLeagueDetails(!refreshLeagueDetails);
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
            <View style={{flexDirection: 'row', paddingHorizontal: 16}}>
                <LeagueDetails  leagueId={leagueId} refresh={refreshLeagueDetails}/>
            </View>
            <Tabs tabs={[
                {key: 'membership', title: 'Membership', view: <MembershipView leagueId={leagueId} onMemberRefresh={onMemberRefresh}/>},
                {key: 'season', title: 'Seasons', view: <SeasonsView leagueId={leagueId}/>},
            ]}>
            </Tabs>
        </ViewContent>
    )
}

const styles = StyleSheet.create({});
