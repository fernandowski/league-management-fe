import {useOrganizationStore} from "@/stores/organizationStore";
import {useCallback, useEffect, useState} from "react";
import {apiRequest} from "@/api/api";
import {LeagueList} from "@/components/League/LeagueList";
import {StyleSheet, View} from "react-native";
import {Button, Modal, Text} from "react-native-paper";
import ControlledTextInput from "@/components/FormControls/ControlledTextInput";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import Joi from "joi";
import {useFocusEffect} from "expo-router";
import {useLeagueData} from "@/hooks/useLeagueData";
import LeagueDropdown from "@/components/League/LeagueDropdown";


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

export default function LeagueOverview() {
    const {organization} = useOrganizationStore();
    const [showModal, setShowModal] = useState(false);
    const {fetchData, fetching, error, data} = useLeagueData();

    const {control, handleSubmit, formState: {errors}} = useForm<CreateLeagueData>(
        {
            resolver: joiResolver(schema),
        }
    );
    const handleOpenModal = () => {
        setShowModal(!showModal);
    };

    const handleSave = async (data: CreateLeagueData) => {
        try {
            await apiRequest('/v1/leagues', {
                method: 'POST',
                body: {
                    name: data.name,
                    organization_id: organization
                }
            })
            fetchData({organization_id: organization})
            setShowModal(!showModal);
        } catch (e) {

        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchData({organization_id: organization})
            return () => {
                setShowModal(false);
            };
        }, [organization])
    );

    return (
        <View style={[styles.outerContainer]}>
            <View>
                <LeagueDropdown></LeagueDropdown>
            </View>
            <View style={[styles.viewContainer]}>
                <Button style={[{alignSelf: 'flex-end'}]} mode={'elevated'} onPress={handleOpenModal}>+ Add League </Button>
                <LeagueList data={data}></LeagueList>
            </View>
            <Modal visible={showModal} dismissable={false} contentContainerStyle={[styles.modal]}>
                <View style={[styles.formContainer]}>
                    <Text>Organization Name</Text>
                    <ControlledTextInput label='Name' name={'name'} control={control} error={errors.name?.message}/>
                    <Button style={{alignSelf: "flex-end"}} onPress={handleSubmit(handleSave)}>Save</Button>
                </View>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        width: '80%',
        marginTop: 16,
        gap: 16
    },
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
    outerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
