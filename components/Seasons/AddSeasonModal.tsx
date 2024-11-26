import {StyleSheet, View} from "react-native";
import {Button, Modal, Text} from "react-native-paper";
import ControlledTextInput from "@/components/FormControls/ControlledTextInput";
import {useOrganizationStore} from "@/stores/organizationStore";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import Joi from "joi";
import {apiRequest} from "@/api/api";

export interface AddSeasonModalProps {
    onSave: () => void
    open: boolean
    leagueId: string
}

const schema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "string.empty": "Season Name name is required",
        })
});

interface CreateSeasonData {
    name: string
}
export default function AddSeasonModal(props: AddSeasonModalProps) {
    const {control, handleSubmit, formState: {errors}} = useForm<CreateSeasonData>(
        {
            resolver: joiResolver(schema),
        }
    );

    const handleSave = async (data: CreateSeasonData) => {
        await apiRequest(`/v1/leagues/${props.leagueId}/seasons`, {method: "POST", body: {name: data.name}});
        props.onSave();
    };

    return (
        <Modal visible={props.open} dismissable={true} contentContainerStyle={[styles.modal]}>
            <View style={[styles.formContainer]}>
                <Text>Season Name</Text>
                <ControlledTextInput label='Name' name={'name'} control={control} error={errors.name?.message}/>
                <Button style={{alignSelf: "flex-end"}} onPress={handleSubmit(handleSave)}>Save</Button>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flex: 0.8,
        padding: 16,
        backgroundColor: "white",
        width: "80%",
        maxHeight: 400,
        maxWidth: 400,
        zIndex: 200,
        alignSelf: "center"
    },
    formContainer: {
        flex: 0.7,
        padding: 16
    },
})
