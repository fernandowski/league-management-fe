import {apiRequest} from "@/api/api";
import {create} from 'zustand'
import {fetchJWT} from "@/util/jwt-manager";

interface OrganizationStore {
    organizations: any[];
    loading: boolean;
    error: string | null;
    fetchOrganizations: () => void;
}

export const useOrganizationStore = create<OrganizationStore>((set) => ({
    organizations: [],
    loading: false,
    error: null,
    fetchOrganizations: async () => {
        set({loading: true});
        try {
            const jwt = await fetchJWT();
            const response = await apiRequest('v1/organizations', {
                method: 'GET',
                headers: {
                    auth: jwt as string
                }
            });
            const data = await response.json();
            set({organizations: data, loading: false});

        } catch (error: any) {
            set({error: error.message, loading: false});
        }
    },
}));
