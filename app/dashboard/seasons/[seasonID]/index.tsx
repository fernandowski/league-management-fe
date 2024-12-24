import {View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useState} from "react";
import {Text} from "react-native-paper";
import SeasonManagement from "@/components/Seasons/SeasonManagement";
import ViewContent from "@/components/Layout/ViewContent";


export default function SeasonDetails() {
    const {seasonID: urlParamSeasonID} = useLocalSearchParams();
    const [seasonId, setSeasonID] = useState<string>(Array.isArray(urlParamSeasonID) ? urlParamSeasonID[0] : urlParamSeasonID || "");



    return (
        <ViewContent>
            {
                seasonId ? <SeasonManagement seasonId={seasonId}/> : <View><Text>Select a season</Text></View>
            }
        </ViewContent>)

}

