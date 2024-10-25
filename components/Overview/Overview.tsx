import {useOrganizationStore} from "@/stores/organizationStore";
import AddOrganization from "@/components/Overview/AddOrganization";
import {OrganizationTable} from "@/components/Overview/OrganizationTable";

export default function Overview() {

    const {organizations, loading} = useOrganizationStore();

    if (loading) {
        return <>loading</>
    }

    return (

        <>
            {organizations.length >= 1 ? <OrganizationTable/> : <AddOrganization/>}
        </>

    )
}
