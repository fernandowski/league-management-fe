import {Animated, View} from "react-native";
import {useOrganizationStore} from "@/stores/organizationStore";
import {Card, Text} from "react-native-paper";
import ScrollView = Animated.ScrollView;

export function OrganizationTable() {
    const {organizations} = useOrganizationStore();
    return (
        <ScrollView style={{paddingLeft: 8, paddingRight: 8}}>
            {organizations.map(organization =>
                <Card style={{marginTop: 8}} key={organization.id}>
                    <Card.Content>
                        <Text>{organization.name}</Text>
                    </Card.Content>
                </Card>)}
        </ScrollView>
    )
}
