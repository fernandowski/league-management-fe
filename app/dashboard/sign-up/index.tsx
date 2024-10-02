import {SafeAreaView, View, StyleSheet, Dimensions} from "react-native";
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import ControlledTextInput from "@/components/FormControls/ControlledTextInput";
import { Button } from 'react-native-paper'

interface SignUpData {
    email: string;
    password: string;
}
export default function SignUp() {
    const { control, handleSubmit, formState: { errors} } = useForm<SignUpData>();
    const onSubmit: SubmitHandler<SignUpData> = (data) => {
        console.log(data)
    }

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <ControlledTextInput<SignUpData> style={styles.formElement} control={control} label='Email' name={'email'}/>
                <ControlledTextInput<SignUpData> style={styles.formElement} control={control} label='Password' name={'password'} secureTextEntry/>
                <Button style={[styles.submitButton, styles.formElement]} onPress={handleSubmit(onSubmit)} >Submit</Button>
            </SafeAreaView>
        </View>
    )
}


const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: windowHeight * .30,
        alignItems: 'center'
    },
    submitButton: {
        alignSelf: 'flex-end'
    },
    formElement: {
        marginTop: 8
    }
});
