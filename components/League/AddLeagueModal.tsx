import {StyleSheet, View} from "react-native";
import {Button, Modal, Text} from "react-native-paper";
import ControlledTextInput from "@/components/FormControls/ControlledTextInput";
import {useState} from "react";
import Joi from "joi";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {apiRequest} from "@/api/api";
import {useOrganizationStore} from "@/stores/organizationStore";

const schema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "string.empty": "Organization name is required",
        })
});

interface CreateLeagueData {
    name: string
}

export interface AddLeagueModalProps {
    onSave: () => void,
    open: boolean
}

export default function AddLeagueModal(props: AddLeagueModalProps) {
    const {organization} = useOrganizationStore();
    const {control, handleSubmit, formState: {errors}} = useForm<CreateLeagueData>(
        {
            resolver: joiResolver(schema),
        }
    );

    const handleSave = async (data: CreateLeagueData) => {
        try {
            await apiRequest('/v1/leagues', {
                method: 'POST',
                body: {
                    name: data.name,
                    organization_id: organization
                }
            })
            props.onSave();
        } catch (e) {

        }
    }

    return (
        <Modal visible={props.open} dismissable={true} contentContainerStyle={[styles.modal]}>
            <View style={[styles.formContainer]}>
                <Text>Organization Name</Text>
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


