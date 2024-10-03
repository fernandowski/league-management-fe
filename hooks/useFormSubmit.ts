import {useState} from "react";
import {apiRequest} from "@/api/api";

export function useFormSubmit() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)

    const submitForm = async (endpoint: string, data: any) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiRequest(endpoint, {
                method: 'POST',
                body: data
            });
            setLoading(false);
            return response;

        } catch (e: any) {
            setError(e.message || `Error making request: ${endpoint}`);
            setLoading(false);
        }
    }

    return { submitForm, error, loading };
}
