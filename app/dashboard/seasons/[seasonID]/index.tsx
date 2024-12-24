import {View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {Text} from "react-native-paper";
import SeasonManagement from "@/components/Seasons/SeasonManagement";
import ViewContent from "@/components/Layout/ViewContent";
import SeasonList from "@/components/Seasons/SeasonList";


export default function SeasonDetails() {
    const {seasonID: urlParamSeasonID} = useLocalSearchParams();
    const [seasonId, setSeasonID] = useState<string>(Array.isArray(urlParamSeasonID) ? urlParamSeasonID[0] : urlParamSeasonID || "");

    useEffect(() => {
        const newSeasonId = Array.isArray(urlParamSeasonID) ? urlParamSeasonID[0] : urlParamSeasonID || ""
        setSeasonID(newSeasonId)
    }, [urlParamSeasonID]);
    return (
        <ViewContent>
            {
                seasonId ? <SeasonManagement seasonId={seasonId}/> : <View><SeasonList/></View>
            }
        </ViewContent>)
}

