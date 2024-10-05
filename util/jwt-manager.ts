import AsyncStorage from "@react-native-async-storage/async-storage";

type Token = string | null
export const fetchJWT = async (): Promise<Token> => {
    try {
        const token = await AsyncStorage.getItem('jwt');
        return token;
    } catch (error) {
        return "";
    }
}

export const storeJWT = async (jwt: string) => {
    await AsyncStorage.setItem('jwt', jwt);
}
