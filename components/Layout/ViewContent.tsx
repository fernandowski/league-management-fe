import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";

interface ViewContentProps {
    children: React.ReactNode
}

const ViewContent = (props: ViewContentProps) => {
    return (
        <View style={styles.outerContainer}>
            <ScrollView style={styles.viewContainer} showsVerticalScrollIndicator={false}>
                {props.children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewContainer: {
        flex: 1,
        width: '80%',
        marginTop: 16,
        gap: 16
    },
})

export default  ViewContent
