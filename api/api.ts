import {fetchJWT} from "@/util/jwt-manager";

export interface RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: { [key: string]: string };
    body?: any;
}


const API_URL = process.env.EXPO_PUBLIC_API_URL;


export async function apiRequest(
    endpoint: string,
    { method, headers, body} : RequestOptions
){
    const url = `${API_URL}${endpoint}`;
    const jwt = await fetchJWT();

    const defaultHeaders = {
        'Content-Type': 'application/json',
        auth: jwt as string,
        ...(headers || {}),
    };

    const options: RequestInit = {
        method,
        credentials: 'include',
        headers: defaultHeaders,
        ...(body && { body: JSON.stringify(body) }),
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
