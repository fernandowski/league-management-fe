import {View} from "react-native";
import MembershipManagement from "@/components/League/MembershipManagement";

export const MembershipView = ({leagueId}: { leagueId: string }) => {
    return (
        <View style={{flex: 1}}>
            <MembershipManagement leagueId={leagueId}/>
        </View>
    )
}

export default MembershipView
