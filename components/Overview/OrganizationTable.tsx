import {View} from "react-native";
import {useOrganizationStore} from "@/stores/organizationStore";
import {Card, Text} from "react-native-paper";

export function OrganizationTable() {
    const {organizations} = useOrganizationStore();
    return (
        <View style={{paddingLeft: 8, paddingRight: 8}}>
            {organizations.map(organization =>
                <Card style={{marginTop: 8}} key={organization.id}>
                    <Card.Content>
                        <Text>{organization.name}</Text>
                    </Card.Content>
                </Card>)}
        </View>
    )
}
