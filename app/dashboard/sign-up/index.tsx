import {SafeAreaView, View, StyleSheet, Dimensions} from "react-native";
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import ControlledTextInput from "@/components/FormControls/ControlledTextInput";
import {Button, Card} from 'react-native-paper'

interface SignUpData {
    email: string;
    password: string;
}

export default function SignUp() {
    const {control, handleSubmit, formState: {errors}} = useForm<SignUpData>();
    const onSubmit: SubmitHandler<SignUpData> = (data) => {
        console.log(data)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title={'Sign-Up'}/>
                <Card.Content>
                    <ControlledTextInput<SignUpData> style={styles.formElement} control={control} label='Email'
                                                     name={'email'}/>
                    <ControlledTextInput<SignUpData> style={styles.formElement} control={control} label='Password'
                                                     name={'password'} secureTextEntry/>
                </Card.Content>
                <Card.Actions>
                    <Button style={[styles.submitButton]} onPress={handleSubmit(onSubmit)}>Sign-up</Button>
                </Card.Actions>
            </Card>
        </SafeAreaView>
    )
}


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: windowHeight * .30,
        alignItems: 'center',
    },
    submitButton: {
        alignSelf: 'flex-end'
    },
    formElement: {
        marginTop: 8,
    },
    card: {
        maxWidth: 500,
        width: '90%'
    }
});
