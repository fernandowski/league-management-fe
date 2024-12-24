import {View, StyleSheet} from "react-native";
import Tabs from "@/components/Layout/Tabs";
import SeasonStanding from "@/components/Seasons/SeasonStanding";
import {SeasonDetailResponse, useData} from "@/hooks/useData";
import {Text} from "react-native-paper";
import {useEffect} from "react";


export interface SeasonManagementProps {
    seasonId: string
}
export default function SeasonManagement(props: SeasonManagementProps) {
    return (
        <View>
            <View>
                <Tabs tabs={[{key: 'standing', title: 'Standings', view: <SeasonStanding seasonId={props.seasonId}/>}]}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})
