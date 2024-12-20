import React, {useState} from "react";
import {TouchableOpacity, View, StyleSheet, useWindowDimensions} from "react-native";
import {Text} from "react-native-paper";

type tab = {
    key: string,
    title: string,
    view: React.ReactNode
}

interface TabsProps {
    tabs: tab[]
}

const Tabs = (props: TabsProps): React.ReactNode => {
    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;
    const [activeTab, setActiveTab] = useState(0); // Default to the second tab (Schedule)
    return (
        <View style={styles.container}>
            <View style={isLargeScreen ? styles.tabContainer : {...styles.tabContainer, flexDirection: "column"}}>
                {props.tabs.map(({key,title, view}, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.tab, activeTab === index && styles.activeTab]}
                        onPress={() => setActiveTab(index)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === index && styles.activeTabText,
                            ]}
                        >
                            {title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.content}>
                {props.tabs[activeTab].view}
            </View>
        </View>
    )
}

export default Tabs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    tabContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
    },
    activeTab: {
        borderBottomColor: "#0056b3",
    },
    tabText: {
        color: "#555",
        fontSize: 16,
    },
    activeTabText: {
        fontWeight: "bold",
        color: "black",
    },
    content: {
        flex: 1
    },
});
