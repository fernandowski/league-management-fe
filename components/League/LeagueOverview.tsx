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


export interface leagues {
    id: string
    name: string
    teamIds: string[]
}

export interface leagueResponse {
    id: string
    name: string
    team_ids: string[]
}

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
    const [leagues, setLeagues] = useState<leagues[]>([]);
    const [showModal, setShowModal] = useState(false);
    const {control, handleSubmit, formState: {errors}} = useForm<CreateLeagueData>(
        {
            resolver: joiResolver(schema),
        }
    );
    const handleOpenModal = () => {
        setShowModal(!showModal);
    };

    const fetchLeagues = useCallback(async () => {
        try {
            const response = await apiRequest(`/v1/leagues/?organization_id=${organization}`, {method: 'GET'});
            setLeagues(response.map((league: leagueResponse) => ({
                id: league.id,
                name: league.name,
                teamIds: league.team_ids
            })));
        } catch (e) {
            setLeagues([]);
        }
    }, [organization]);

    const handleSave = async (data: CreateLeagueData) => {
        try {
            await apiRequest('/v1/leagues', {
                method: 'POST',
                body: {
                    name: data.name,
                    organization_id: organization
                }
            })
            fetchLeagues();
            setShowModal(!showModal);
        } catch (e) {

        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchLeagues();
            return () => {
                setShowModal(false);
            };
        }, [fetchLeagues])
    );

    return (
        <View style={[styles.outerContainer]}>
            <View style={[styles.viewContainer]}>
                <Button style={[{alignSelf: 'flex-end'}]} mode={'elevated'} onPress={handleOpenModal}>+ Add League </Button>
                <LeagueList data={leagues}></LeagueList>
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
