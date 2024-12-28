import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Header } from "@/components/Header/Header";

interface ViewContentProps {
    children: React.ReactNode;
}

const ViewContent = (props: ViewContentProps) => {
    return (
        <View style={styles.outerContainer}>
            {/* Header */}
            <View>
                <Header />
            </View>

            {/* Scrollable Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {props.children}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    scrollView: {
        flex: 1,
        width: "80%",
    },
    scrollContent: {
        paddingHorizontal: 32,
        paddingVertical: 16,
    },
});

export default ViewContent;
