import {StyleSheet, View} from "react-native";
import {Modal, Text} from "react-native-paper";

export interface LeagueMembershipModalProps {
    organizationId: string,
    leagueId: string | null,
    onDismiss: () => void,
    open: boolean
}
export default function LeagueMembershipModal(props: LeagueMembershipModalProps) {
    return (
        <Modal visible={props.open} dismissable={true} contentContainerStyle={[styles.modal]} onDismiss={props.onDismiss}>
            <View style={[styles.container]}>
                <Text>{props.leagueId}</Text>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modal: {
        flex: 1,
        padding: 16,
        backgroundColor: "white",
        width: "100%",
        maxHeight: 400,
        maxWidth: 400,
        zIndex: 200,
        alignSelf: "center"
    },
    container: {
        flex: 0.7,
        padding: 16
    }
})
