import React from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {Header} from "@/components/Header/Header";

interface ViewContentProps {
    children: React.ReactNode
}

const ViewContent = (props: ViewContentProps) => {
    return (
        <View>
            <View><Header/></View>
            <View style={styles.outerContainer}>
                <View style={styles.scrollContainer}>
                    <ScrollView
                        style={styles.viewContainer}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {props.children}
                    </ScrollView>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    viewContainer: {
        flexGrow: 1,
        width: '80%',
        maxWidth: '80%',
        marginTop: 16,
        gap: 16,
        paddingHorizontal: 8,
    },
    scrollContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center"
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 8,
    },
})

export default  ViewContent
