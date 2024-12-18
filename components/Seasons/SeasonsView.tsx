import {StyleSheet, View} from "react-native";
import {Card, Text} from "react-native-paper";
import {useEffect, useState} from "react";

interface SeasonsViewProps {
    seasonId: string
}

const SeasonsView = (props: SeasonsViewProps) => {

    useEffect(() => {

    }, [props.seasonId]);
    return (
        <View>
            <Card>
                <Card.Title title={"Season Name"}>
                </Card.Title>
            </Card>
        </View>
    )
}

export default SeasonsView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 16,
        gap: 16,
    },
    button: {
        alignItems: "flex-end"
    },
})
