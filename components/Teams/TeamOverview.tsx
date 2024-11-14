import {View, StyleSheet} from "react-native";
import {Button, Modal, Text} from "react-native-paper";
import TeamList from "@/components/Teams/TeamList";
import {useOrganizationStore} from "@/stores/organizationStore";
import {useCallback, useState} from "react";
import {apiRequest} from "@/api/api";
import {useFocusEffect} from "expo-router";
import ControlledTextInput from "@/components/FormControls/ControlledTextInput";
import Joi from "joi";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

export interface Team {
    id: string
    name: string
    organizationId: string
}

export interface CreateTeamData {
    name: string
}

const schema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "string.empty": "Team name is required",
        })
});

export default function TeamOverview() {
    const {organization} = useOrganizationStore();
    const [teams, setTeams] = useState<Team[]>([]);
    const [showModal, setShowModal] = useState(false);
    const {control, handleSubmit, formState: {errors}} = useForm<CreateTeamData>(
        {
            resolver: joiResolver(schema),
        }
    );
    const handleOpenModal = () => {
        setShowModal(!showModal);
    };

    const handleSave = async (data: CreateTeamData) => {
        try {
            await apiRequest('/v1/teams', {
                method: 'POST',
                body: {
                    name: data.name,
                    organization_id: organization
                }
            })
            fetchTeams();
            setShowModal(!showModal);
        } catch (e) {

        }
    }

    const fetchTeams = useCallback(async () => {
        try {
            const response = await apiRequest(`/v1/teams/?organization_id=${organization}`, {method: 'GET'});
            setTeams(response.map((team: Record<string, string>) => ({
                id: team.id,
                name: team.name,
                organizationName: team.organization_name
            })));
        } catch (e) {
            setTeams([]);
        }
    }, [organization])

    useFocusEffect(
        useCallback(() => {
            fetchTeams();
            return () => {
                setShowModal(false)
            }
        }, [fetchTeams])
    )

    return (
        <View style={[styles.outerContainer]}>
            <View style={[styles.viewContainer]}>
                <Button style={[styles.addTeamButton]} mode={"elevated"} onPress={handleOpenModal}> + Add Team </Button>
                <TeamList data={teams}/>
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
    addTeamButton: {
        alignSelf: "flex-end"
    },
    formContainer: {
        flex: 0.7,
        padding: 16
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
    }
})
