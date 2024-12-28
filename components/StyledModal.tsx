import {Portal, Modal, Button} from "react-native-paper";
import {View, StyleSheet} from "react-native";

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}

export default function StyledModal(props: ModalProps) {
    return (
        <Portal>
            <Modal
                visible={props.isOpen}
                dismissable={false}
                contentContainerStyle={styles.modal}>
                <View style={styles.modalMainContent}>
                    {props.children}
                </View>
            </Modal>
        </Portal>
    );
}

const styles = StyleSheet.create({
    modal: {
        width: "80%",
        height: "80%",
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 8,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalMainContent: {
        flex: 1,
    },
});
