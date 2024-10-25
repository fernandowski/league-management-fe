import {fetchJWT, JwtIsExpired, removeJWT} from "@/util/jwt-manager";
import {router} from "expo-router";
import {bool} from "yup";

export interface RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: { [key: string]: string };
    body?: any;
}


const API_URL = process.env.EXPO_PUBLIC_API_URL;


export async function apiRequest(
    endpoint: string,
    {method, headers, body}: RequestOptions,
    secure: boolean = true
) {
    const url: string = `${API_URL}${endpoint}`;
    const jwt: string = await fetchJWT() as string;

    console.log(secure)
    if (secure && JwtIsExpired(jwt)) {
        console.log('expired', jwt)
        await removeJWT();
        router.push("/login")
        throw new Error("jwt is expried")
    }

    const defaultHeaders: Record<string, any> = {
        'Content-Type': 'application/json',
        ...(headers || {}),
    };

    if (secure) {
        defaultHeaders["auth"] = jwt
        console.log(jwt)
    }

    const options: RequestInit = {
        method,
        credentials: 'include',
        headers: defaultHeaders,
        ...(body && {body: JSON.stringify(body)}),
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || errorResponse.error || 'Request failed');
        }
        return response.json();
    } catch (error) {
        throw error;
    }
}
